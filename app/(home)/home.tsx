import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import HouseListItem from "@/components/house-list-item";
import useFetchAllHouse from "@/react-query/query/useFetchAllHouse";

const Container = Platform.OS === "web" ? ScrollView : SafeAreaView;

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

const Home = () => {
  const { data: houses, isPending: isLoadingTasks, error } = useFetchAllHouse();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredHouses, setFilteredHouses] = useState<House[]>([]);

  useEffect(() => {
    if (houses) {
      const filtered = houses.filter((house: House) => {
        const searchFields = `${house.name} ${house.description} ${house.address_cityname} ${house.address_street_name} ${house.address_building_number} ${house.address_country}`.toLowerCase();
        return searchFields.includes(searchQuery.toLowerCase());
      });
      setFilteredHouses(filtered);
    }
  }, [searchQuery, houses]);

  if (isLoadingTasks) {
    return (
      <Container style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007bff" />
          <Text style={styles.loadingText}>Loading houses...</Text>
        </View>
      </Container>
    );
  }

  if (error) {
    return (
      <Container style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error.message}</Text>
        </View>
      </Container>
    );
  }

  return (
    <Container style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search houses..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredHouses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <HouseListItem house={item} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No houses match your search.</Text>
        }
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D8DBE2",
    padding: 16,
  },
  searchBar: {
    height: 40,
    borderColor: "#007bff",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#007bff",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
  listContainer: {
    paddingBottom: 20,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#555",
    marginTop: 20,
  },
});

export default Home;
