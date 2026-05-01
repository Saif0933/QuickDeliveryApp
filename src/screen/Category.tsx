
// HomeScreen.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FoodList from "../components/FoodCard";

const categories = [
  { name: "All", image: { uri: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=200&q=80" } },
  { name: "Shirts", image: { uri: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=200&q=80" } },
  { name: "Jeans", image: { uri: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=200&q=80" } },
  { name: "Sneakers", image: { uri: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80" } },
  { name: "Jackets", image: { uri: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&q=80" } },
  { name: "Activewear", image: { uri: "https://images.unsplash.com/photo-1518459031867-a89b944bffe4?w=200&q=80" } },
  { name: "Accessories", image: { uri: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=200&q=80" } },
];

const filters = [
  { label: "Flat 50% OFF", icon: "pricetag" },
  { label: "Under 30 mins", icon: "time-outline" },
  { label: "Top Rated", icon: "star-outline" },
  { label: "Summer Collection", icon: "sunny-outline" },
  { label: "Premium Brands", icon: "diamond-outline" },
];

const restaurants = [
  {
    name: "H&M Store",
    image: { uri: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&q=80" },
    rating: 4.8,
    time: "30 mins",
  },
  {
    name: "Zara Official",
    image: { uri: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&q=80" },
    rating: 4.7,
    time: "25-30 mins",
  },
  {
    name: "Nike Hub",
    image: { uri: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
    rating: 4.9,
    time: "30-35 mins",
  },
  {
    name: "Puma Outlet",
    image: { uri: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80" },
    rating: 4.5,
    time: "25-30 mins",
    offer: "FLAT 50% OFF",
  },
  {
    name: "Levi's Exclusive",
    image: { uri: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&q=80" },
    rating: 4.6,
    time: "25-30 mins",
  },
  {
    name: "Adidas Originals",
    image: { uri: "https://images.unsplash.com/photo-1518459031867-a89b944bffe4?w=400&q=80" },
    rating: 4.9,
    time: "30-35 mins",
    offer: "Up to 25% OFF",
  },
];

export default function CategoryScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="arrow-back" size={24} color="#000" style={{ marginRight: 10 }} />
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#FF3B5C" style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Brand name or clothing item"
            placeholderTextColor="#888"
            style={styles.searchInput}
          />
          <Ionicons name="mic-outline" size={20} color="#FF3B5C" />
        </View>
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
      >
        {categories.map((item, index) => (
          <View key={index} style={styles.category}>
            <Image source={item.image} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{item.name}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
      >
        <TouchableOpacity style={styles.filterBtn}>
          <MaterialIcons name="filter-list" size={16} color="#333" />
          <Text style={styles.filterText}>Filters</Text>
        </TouchableOpacity>
        {filters.map((filter, index) => (
          <TouchableOpacity key={index} style={styles.filterBtn}>
            <Ionicons name={filter.icon} size={16} color="#333" />
            <Text style={styles.filterText}>{filter.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Restaurant List (Horizontal Scroll) */}
      <Text style={styles.sectionTitle}>Top Clothing Brands</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.restaurantScroll}
      >
        {restaurants.map((res, index) => (
          <View key={index} style={styles.card}>
            <Image source={res.image} style={styles.cardImage} />
            {res.offer && (
              <View style={styles.offerTag}>
                <Text style={styles.offerText}>{res.offer}</Text>
              </View>
            )}
            <View style={styles.cardInfo}>
              <Text style={styles.restaurantName}>{res.name}</Text>
              <Text style={styles.time}>⏱ {res.time}</Text>
              <View style={styles.rating}>
                <Text style={styles.ratingText}>{res.rating}</Text>
                <Ionicons name="star" size={12} color="#fff" />
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Food List Component */}
      <FoodList />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  // Search bar
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 12,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 12,
    flex: 1,
    height: 44,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#333",
  },

  // Categories
  categoryScroll: { marginVertical: 10, paddingLeft: 10 },
  category: { alignItems: "center", marginRight: 18 },
  categoryImage: { width: 50, height: 50, borderRadius: 25, marginBottom: 5 },
  categoryText: { fontSize: 12, color: "#333" },

  // Filters
  filterScroll: { paddingLeft: 10, marginBottom: 15 },
  filterBtn: {
    flexDirection: "row",
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: "center",
    marginRight: 12,
    borderWidth: 0.5,
    borderColor: "#ddd",
  },
  filterText: { fontSize: 13, marginLeft: 5, color: "#333" },

  // Section Title
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
    marginHorizontal: 10,
    marginBottom: 10,
  },

  // Restaurants
  restaurantScroll: { paddingLeft: 10 },
  card: {
    width: 180,
    backgroundColor: "#fff",
    marginRight: 15,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: { width: "100%", height: 120, resizeMode: "cover" },
  cardInfo: { padding: 10 },
  restaurantName: { fontSize: 15, fontWeight: "600", color: "#222" },
  time: { fontSize: 12, color: "#666", marginTop: 4 },
  rating: {
    flexDirection: "row",
    backgroundColor: "green",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignItems: "center",
    marginTop: 5,
    alignSelf: "flex-start",
  },
  ratingText: { color: "#fff", fontSize: 12, marginRight: 3 },
  offerTag: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "black",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
  },
  offerText: { color: "white", fontSize: 11, fontWeight: "bold" },
});
