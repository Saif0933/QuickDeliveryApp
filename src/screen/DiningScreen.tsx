// DiningScreen.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import RestroCard from "../components/RestroCard";
import HomeScreen from "./HomeScreen";


const exploreOptions = [
  { title: "Up to 50% Off", color: "#ffe6ec" },
  { title: "Restaurants near me", color: "#f0f0f0" },
];

const categories = [
  { title: "Rooftops", image: "https://cdn-icons-png.flaticon.com/512/706/706164.png" },
  { title: "Cozy cafes", image: "https://cdn-icons-png.flaticon.com/512/924/924514.png" },
  { title: "Romantic dining", image: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png" },
  { title: "Drink & dine", image: "https://cdn-icons-png.flaticon.com/512/3082/3082031.png" },
  { title: "Pure veg", image: "https://cdn-icons-png.flaticon.com/512/184/184514.png" },
  { title: "Family dining", image: "https://cdn-icons-png.flaticon.com/512/3075/3075979.png" },
];

const mustTries = [
  { title: " The Great Cafes", image: "https://tse2.mm.bing.net/th/id/OIP.WqZILRKVGFfSdPInRbyJCQHaE7?pid=Api&P=0&h=180" },
  { title: "Luxury Dining Places", image: "https://tse4.mm.bing.net/th/id/OIP.Tm7Cwudv6CWy7TNxjbajtwHaFO?pid=Api&P=0&h=180" },
  { title: "The Bars & Lounges", image: "https://tse3.mm.bing.net/th/id/OIP.yPot9mFzGRJ1a7GF1LY8KgHaI9?pid=Api&P=0&h=180" },
];

const restaurants = [
  {
    name: "Anardana",
    location: "Kanka, Ranchi",
    type: "North Indian • Kebab",
    distance: "3.2 km",
    price: "₹2000 for two",
    rating: "4.5",
    image: "https://tse4.mm.bing.net/th/id/OIP.mVOIAEYF70LEzoPmS9o7XgHaE8?pid=Api&P=0&h=180",
  },
  {
    name: "Biryani By Kilo",
    location: "Ahirtoli, Ranchi",
    type: "Biryani • Hyderabadi",
    distance: "5.7 km",
    price: "₹600 for two",
    rating: "4.3",
    image: "https://tse4.mm.bing.net/th/id/OIP.pfk5JNbSATK_pTPNYbAevQHaEK?pid=Api&P=0&h=180",
  },
];

const DiningScreen = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.subLocation}>Delatoli, Ranchi</Text>
          <Text style={styles.location}>Harmu Housing Colony ▼</Text>
        </View>
        <Ionicons name="person-circle-outline" size={35} color="#666" />
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={20} color="#666" />
        <TextInput
          placeholder="Restaurant, location or more"
          placeholderTextColor="#888"
          style={styles.searchInput}
        />
        <Ionicons name="mic-outline" size={20} color="#666" />
      </View>

      {/* Filters */}
      <View style={styles.filterRow}>
        <TouchableOpacity style={styles.filterBtn}>
          <Ionicons name="filter-outline" size={16} color="#333" />
          <Text style={styles.filterText}>Filters</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterBtn}>
          <MaterialCommunityIcons name="tag-outline" size={16} color="#333" />
          <Text style={styles.filterText}>Offers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterBtn}>
          <Ionicons name="star-outline" size={16} color="#333" />
          <Text style={styles.filterText}>Near & Top Rated</Text>
        </TouchableOpacity>
      </View>

      {/* In the Limelight */}
      <Text style={styles.sectionTitle}>IN THE LIMELIGHT</Text>
      <Image
        source={{ uri: "https://tse1.mm.bing.net/th/id/OIP.6_HNJVtYRQmJVbOAxfIZrgHaET?pid=Api&P=0&h=180" }}
        style={styles.banner}
      />

      {/* Explore */}
      <Text style={styles.sectionTitle}>EXPLORE</Text>
      <View style={styles.exploreRow}>
        {exploreOptions.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.exploreBox, { backgroundColor: item.color }]}
          >
            <Text style={styles.exploreText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Categories */}
      <Text style={styles.sectionTitle}>WHAT ARE YOU LOOKING FOR?</Text>
      <View style={styles.categoryGrid}>
        {categories.map((item, index) => (
          <View key={index} style={styles.categoryCard}>
            <Image source={{ uri: item.image }} style={styles.categoryIcon} />
            <Text style={styles.categoryText}>{item.title}</Text>
          </View>
        ))}
      </View>

      {/* Must-Tries */}
      <Text style={styles.sectionTitle}>MUST-TRIES IN RANCHI</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {mustTries.map((item, index) => (
          <View key={index} style={styles.mustTryCard}>
            <Image source={{ uri: item.image }} style={styles.mustTryImage} />
            <Text style={styles.mustTryText}>{item.title}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Popular Restaurants */}
      <Text style={styles.sectionTitle}>POPULAR RESTAURANTS AROUND YOU</Text>
      {restaurants.map((item, index) => (
        <View key={index} style={styles.restaurantCard}>
          <Image source={{ uri: item.image }} style={styles.restaurantImage} />
          <View style={styles.restaurantInfo}>
            <Text style={styles.restaurantName}>{item.name}</Text>
            <Text style={styles.restaurantDetails}>{item.location}</Text>
            <Text style={styles.restaurantDetails}>{item.type}</Text>
            <Text style={styles.restaurantDetails}>{item.price}</Text>
            <Text style={styles.restaurantDistance}>{item.distance}</Text>
          </View>
          <View style={styles.ratingBox}>
            <Text style={styles.rating}>{item.rating} ★</Text>
          </View>
        </View>
      ))}
      <RestroCard />

      {/* 🔹 Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem}>
            <MaterialCommunityIcons name="bike-fast" size={22} color="#e23744" />
            <Text style={styles.navTextActive}>Delivery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <MaterialCommunityIcons name="silverware-fork-knife" size={22} color="#666" />
            <Text style={styles.navText}
            onPress={() => navigation.navigate('DiningScreen')}>Dining</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="map-outline" size={22} color="#666" />
            <Text style={styles.navText}>District</Text>
          </TouchableOpacity>
        </View>
    </ScrollView>
  );
};

export default DiningScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 12 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  subLocation: { fontSize: 12, color: "#888" },
  location: { fontSize: 15, fontWeight: "600", color: "#333" },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 25,
    paddingHorizontal: 12,
    marginTop: 12,
    height: 42,
  },
  searchInput: { marginLeft: 8, fontSize: 14, flex: 1, color: "#333" },
  filterRow: { flexDirection: "row", marginTop: 12 },
  filterBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  filterText: { marginLeft: 4, fontSize: 12, color: "#333" },
  sectionTitle: { fontSize: 14, fontWeight: "700", marginTop: 18, marginBottom: 10, color: "#555", textAlign: "center" },
  banner: { width: "100%", height: 180, borderRadius: 12 },
  exploreRow: { flexDirection: "row" },
  exploreBox: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  exploreText: { color: "#333", fontWeight: "600", fontSize: 13 },
  categoryGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  categoryCard: {
    width: "30%",
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    alignItems: "center",
    padding: 10,
    marginBottom: 15,
  },
  categoryIcon: { width: 45, height: 45, marginBottom: 6 },
  categoryText: { fontSize: 12, color: "#333", textAlign: "center" },
  mustTryCard: { marginRight: 12 },
  mustTryImage: { width: 150, height: 100, borderRadius: 10 },
  mustTryText: { marginTop: 6, fontSize: 13, fontWeight: "500", color: "#333" },
  restaurantCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 2,
  },
  restaurantImage: { width: 100, height: 100 },
  restaurantInfo: { flex: 1, padding: 8 },
  restaurantName: { fontSize: 15, fontWeight: "700", color: "#333" },
  restaurantDetails: { fontSize: 12, color: "#666" },
  restaurantDistance: { fontSize: 12, color: "#999", marginTop: 3 },
  ratingBox: {
    backgroundColor: "#4caf50",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
    alignSelf: "center",
    marginRight: 10,
  },
  rating: { color: "#fff", fontWeight: "600", fontSize: 12 },

  cardMeta: { fontSize: 9, color: '#666' },
  bottomNav: { // 🔹 Bottom Navigation
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    marginTop: 'auto',
  },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 12, color: '#666' },
  navTextActive: { fontSize: 12, color: '#e23744', fontWeight: 'bold' },
});
