// FoodCard.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

interface FoodItem {
  id: string;
  name: string;
  dish: string;
  price: string;
  time: string;
  distance: string;
  rating: string;
  offer: string;
  discount: string;
  images: any[]; // multiple images for slideshow
}

const data: FoodItem[] = [
  {
    id: "1",
    name: "The Wok",
    dish: "Paneer Roll",
    price: "₹75",
    time: "15-20 mins",
    distance: "1.3 km",
    rating: "3.9",
    offer: "Extra 20% OFF",
    discount: "FLAT 50% OFF",
    images: [
      require("../assets/food1.jpg"),
      require("../assets/north.jpg"), // add extra roll images
      require("../assets/roll.jpg"),
    ],
  },
  {
    id: "2",
    name: "Xona",
    dish: "North Indian",
    price: "₹450 for one",
    time: "30-40 mins",
    distance: "2.5 km",
    rating: "4.5",
    offer: "20% OFF",
    discount: "FLAT 40% OFF",
    images: [
      require("../assets/food.jpg"),
      require("../assets/roll.jpg"), // add extra north indian images
      require("../assets/north.jpg"),
    ],
  },
];

const FoodCard: React.FC<{ item: FoodItem }> = ({ item }) => {
  const [index, setIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Image change every 5s with fade animation
  useEffect(() => {
    const interval = setInterval(() => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setIndex((prev) => (prev + 1) % item.images.length);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [fadeAnim, item.images.length]);

  return (
    <View style={styles.card}>
      {/* Food Image with Fade Animation */}
      <Animated.Image
        source={item.images[index]}
        style={[styles.image, { opacity: fadeAnim }]}
      />

      {/* Top Labels */}
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>
          {item.dish} · {item.price}
        </Text>
      </View>

      {/* Bookmark Icon */}
      <TouchableOpacity style={styles.bookmark}>
        <Ionicons name="bookmark-outline" size={22} color="#000" />
      </TouchableOpacity>

      {/* Restaurant Info */}
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.row}>
          <Ionicons name="time-outline" size={14} color="#555" />
          <Text style={styles.subText}>
            {" "}
            {item.time} · {item.distance}
          </Text>
        </View>

        {/* Offers */}
        <View style={styles.offerRow}>
          <Text style={styles.offerText}>
            <MaterialIcons name="local-offer" size={14} color="orange" />{" "}
            {item.offer}
          </Text>
          <Text style={styles.discountText}>
            <Ionicons name="pricetag" size={14} color="blue" /> {item.discount}
          </Text>
        </View>
      </View>

      {/* Rating */}
      <View style={styles.rating}>
        <Text style={styles.ratingText}>{item.rating} ★</Text>
      </View>
    </View>
  );
};

const FoodList: React.FC = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff", paddingTop: 20 }}>
      <Text style={styles.header}>1028 RESTAURANTS DELIVERING TO YOU</Text>
      {data.map((item) => (
        <FoodCard key={item.id} item={item} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 20,
    elevation: 3,
    overflow: "hidden",
    marginHorizontal: 10,
  },
  image: {
    width: "100%",
    height: 160,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  labelContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  labelText: { color: "#fff", fontSize: 12, fontWeight: "600" },
  bookmark: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 20,
  },
  info: { padding: 12 },
  name: { fontSize: 16, fontWeight: "bold", color: "#222" },
  row: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  subText: { fontSize: 12, color: "#555" },
  offerRow: { flexDirection: "row", marginTop: 8 },
  offerText: {
    fontSize: 12,
    color: "orange",
    marginRight: 10,
    fontWeight: "600",
  },
  discountText: { fontSize: 12, color: "blue", fontWeight: "600" },
  rating: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#28a745",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  ratingText: { color: "#fff", fontWeight: "bold", fontSize: 12 },
});

export default FoodList;
