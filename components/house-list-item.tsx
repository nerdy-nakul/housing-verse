import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

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

const HouseListItem = ({ house }: { house: House }) => {
    const router = useRouter();

    const handlePress = () => {
        router.push({ pathname: `/(home)/details/[id]`, params: { id: house.id } });
    };

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={handlePress}
        >
            <Image source={{ uri: house.avatar }} style={styles.image} />
            <View style={styles.details}>
                <Text style={styles.addressText}>
                    {house.address_building_number} {house.address_street_name}, {house.address_city}, {house.address_cityname}, {house.address_country}
                </Text>
                <Text style={styles.description}>{house.description}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        borderRadius: 10,
    },
    image: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    details: {
        justifyContent: 'center',
        padding: 15,
    },
    description: {
        color: '#696969',
        fontWeight: '400',
        fontSize: 16,
    },
    addressText: {
        color: '#000',
        marginBottom: 4,
        fontSize: 17,
        fontWeight: 'bold',
    }
});

export default HouseListItem;