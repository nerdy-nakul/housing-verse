import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import * as Location from 'expo-location';
import { houseData } from '@/data';
import useFetchHouse from '@/react-query/query/useFetchHouse';
import useUnlockHouse from '@/react-query/mutation/useUnlockHouse';

type House = {
    createdAt: string;
    name: string;
    avatar: string;
    address_city: string;
    address_cityname: string;
    address_building_number: string;
    address_street_name: string;
    address_country: string;
    address_lat: string;
    address_long: string;
    description: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    area_sqft: number;
    unlocked: boolean;
    id: string;
    address_elevation: number;
};

export default function DetailsScreen() {
    const { id } = useLocalSearchParams() as { id: string };
    const { data: house, error, isLoading } = useFetchHouse(id);
    const { mutate: unlockHouse, status: unlockStatus, error: unlockError } = useUnlockHouse(); // Get status from mutation hook

    const [distance, setDistance] = useState<number | null>(null);
    const [isNearby, setIsNearby] = useState(false);
    const [isUnlocked, setIsUnlocked] = useState(false);

    const handleUnlock = () => {
        if (!house) return;
        unlockHouse({
            id: house.id,
            data: { unlocked: true },
            onSuccess: (res) => {
                setIsUnlocked(true); // Update the button to show "Unlocked"
                Alert.alert('Success', 'House unlocked successfully');
            },
            onError: (err) => {
                Alert.alert('Error', 'Failed to unlock the house');
            },
        });
    };

    useEffect(() => {
        const getLocationAndCalculateDistance = async () => {
            try {
                // Use cached location first for faster response
                const cachedLocation = await Location.getLastKnownPositionAsync({});
                const currentLocation =
                    cachedLocation ||
                    (await Location.getCurrentPositionAsync({
                        accuracy: Location.Accuracy.Balanced,
                    }));

                if (house) {
                    // Perform distance calculation
                    const dist = calculateHaversineDistance(
                        currentLocation.coords.latitude,
                        currentLocation.coords.longitude,
                        parseFloat(house.address_lat),
                        parseFloat(house.address_long)
                    );

                    setDistance(dist);
                    setIsNearby(dist <= 30);
                }
            } catch (error) {
                Alert.alert('Error', 'Failed to fetch location');
            }
        };

        getLocationAndCalculateDistance();
    }, [house]);

    const calculateHaversineDistance = (
        lat1: number,
        lon1: number,
        lat2: number,
        lon2: number
    ): number => {
        const toRad = Math.PI / 180; // Precompute the conversion factor
        const R = 6371e3; // Earth's radius in meters

        const φ1 = lat1 * toRad;
        const φ2 = lat2 * toRad;
        const Δφ = (lat2 - lat1) * toRad;
        const Δλ = (lon2 - lon1) * toRad;

        const a =
            Math.sin(Δφ / 2) ** 2 +
            Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c; // Distance in meters
    };

    if (!house) {
        return (
            <View style={styles.container}>
                <Text>House not found</Text>
            </View>
        );
    }

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text>Error: {error.message}</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: house.avatar }} style={styles.image} />
            <View style={styles.detailsContainer}>
                <Text style={styles.addressTitle}>
                    {house.address_building_number} {house.address_street_name}
                </Text>
                <Text style={styles.addressSubtitle}>
                    {house.address_city}, {house.address_cityname}, {house.address_country}
                </Text>
                <Text style={styles.price}>${house.price.toLocaleString()}</Text>
                <View style={styles.propertyDetails}>
                    <Text style={styles.propertyDetailText}>Bedrooms: {house.bedrooms}, Bathrooms: {house.bathrooms}</Text>
                    <Text style={styles.propertyDetailText}>
                        Area: {house.area_sqft} sqft
                    </Text>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionTitle}>Property Description</Text>
                    <Text style={styles.description}>{house.description}</Text>
                </View>
                {/* <Text>Distance: {distance ? `${distance} meters` : 'Calculating...'}</Text> */}
                {isNearby ? (
                    <Button
                        title={isUnlocked ? 'Unlocked' : unlockStatus === 'pending' ? 'Unlocking...' : 'Unlock'}
                        onPress={handleUnlock}
                        disabled={unlockStatus === 'pending' || isUnlocked} // Disable if unlocking or already unlocked
                    />
                ) : (
                    <Text style={styles.tooFarText}>Too far to unlock the button</Text>
                )}
                {unlockError && <Text style={styles.errorText}>Error unlocking house</Text>}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    image: {
        width: '100%',
        height: 250,
    },
    detailsContainer: {
        padding: 15,
    },
    addressTitle: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    addressSubtitle: {
        fontSize: 18,
        color: '#666',
        marginBottom: 10,
    },
    price: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        // marginVertical: 10,
    },
    propertyDetails: {
        // marginVertical: 10,
    },
    propertyDetailText: {
        fontSize: 16,
        color: '#555',
        // marginVertical: 5,
    },
    descriptionContainer: {
        marginVertical: 15,
        backgroundColor: '#F7F7F7',
        padding: 15,
        borderRadius: 10,
    },
    descriptionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
    },
    tooFarText: {
        color: 'red',
        fontSize: 16,
        marginTop: 10,
    },
    errorText: {
        color: 'red',
        marginTop: 10,
    },
});
