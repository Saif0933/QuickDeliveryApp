
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { COLORS } from "../theme/color";

// Navigation Types
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types/types";

// Adding the interface here to ensure Type Safety based on your usage
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
  images: any[];
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
      require("../assets/north.jpg"),
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
      require("../assets/roll.jpg"),
      require("../assets/north.jpg"),
    ],
  },
];

const FoodCard: React.FC<{ item: FoodItem }> = ({ item }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [index, setIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const [isFavorite, setIsFavorite] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);

    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setIndex((prev) => (prev + 1) % item.images.length);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [fadeAnim, item.images.length]);

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.95}
      onPress={() => navigation.navigate("ProductScreen")}
    >
      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Animated.Image
          source={item.images[index]}
          style={[styles.image, { opacity: fadeAnim }]}
          resizeMode="cover"
        />

        {/* Favorite Button */}
        <TouchableOpacity 
          style={styles.bookmarkWrapper} 
          onPress={handleFavorite}
          activeOpacity={0.8}
        >
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <Ionicons
              name={isFavorite ? "bookmark" : "bookmark-outline"}
              size={20}
              color={isFavorite ? COLORS.primary : "#1C1C1C"}
            />
          </Animated.View>
        </TouchableOpacity>

        {/* Floating Tag (Dish/Price) */}
        <View style={styles.glassTag}>
          <Text style={styles.glassTagText}>
            {item.dish}
          </Text>
        </View>
      </View>

      {/* Content Section */}
      <View style={styles.contentContainer}>
        
        {/* Header Row: Name, Cuisine, Time & Rating */}
        <View style={styles.headerRow}>
          
          {/* Info Column */}
          <View style={styles.infoColumn}>
            <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
            
            <Text style={styles.cuisineText}>
              {item.dish} • {item.price}
            </Text>

            {/* 🔥 UPDATED: Time & Distance Row with Icon */}
            <View style={styles.metaRow}>
              <View style={styles.timePill}>
                 <Ionicons name="time-outline" size={12} color="#555" style={{marginRight: 3}} />
                 <Text style={styles.metaText}>{item.time}</Text>
              </View>
              <Text style={styles.metaDot}>•</Text>
              <Text style={styles.metaText}>{item.distance}</Text>
            </View>
          </View>
          
          {/* Rating Box */}
          <View style={styles.ratingBox}>
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Ionicons name="star" size={10} color="#fff" style={{ marginLeft: 2 }} />
          </View>
        </View>

        {/* Dashed Separator */}
        <View style={styles.divider} />

        {/* Footer: Offers & Discount */}
        <View style={styles.footerRow}>
          <View style={styles.offerItem}>
             <MaterialIcons name="local-offer" size={15} color="#1665D8" />
             <Text style={styles.offerText}>{item.offer}</Text>
          </View>
          
          <View style={styles.dotSeparator} />

          <View style={styles.offerItem}>
             <Ionicons name="trending-up" size={15} color="#28A745" />
             <Text style={styles.discountText}>{item.discount}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const FoodList: React.FC = () => {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      contentContainerStyle={{ paddingVertical: 15 }}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.sectionHeader}>RECOMMENDED FOR YOU</Text>
      {data.map((item) => (
        <FoodCard key={item.id} item={item} />
      ))}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: 13,
    fontWeight: "800",
    color: "#546E7A",
    letterSpacing: 1,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 20, 
    marginHorizontal: 16,
    // Refined Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  imageContainer: {
    height: 140, 
    width: "100%",
    position: 'relative',
    backgroundColor: '#f8f8f8',
  },
  image: {
    width: "100%",
    height: "100%",
  },
  // Floating Actions on Image
  bookmarkWrapper: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#fff",
    width: 34, 
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  glassTag: {
    position: "absolute",
    bottom: 10,
    left: 10,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    maxWidth: '70%',
    elevation: 2,
  },
  glassTagText: {
    color: "#fff",
    fontSize: 10, 
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  
  // Content Area
  contentContainer: {
    padding: 14, 
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  infoColumn: {
    flex: 1,
    paddingRight: 10,
  },
  name: {
    fontSize: 17, 
    fontWeight: "800",
    color: "#1C1C1C",
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  cuisineText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
    marginBottom: 6,
  },

  // 🔥 Meta Row Styling (Time & Distance)
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
  },
  metaText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#555',
  },
  metaDot: {
    fontSize: 10,
    color: '#ccc',
    marginHorizontal: 6,
  },

  // Rating
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#24963F",
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 2,
  },
  ratingText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 11,
  },

  // Separator
  divider: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginVertical: 12, 
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#eee', 
    borderRadius: 1,
  },

  // Footer
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  offerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  offerText: {
    fontSize: 11, 
    color: "#1665D8",
    fontWeight: "700",
    marginLeft: 5,
  },
  discountText: {
    fontSize: 11, 
    color: "#28A745",
    fontWeight: "700",
    marginLeft: 5,
  },
  dotSeparator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#ddd",
    marginHorizontal: 10,
  }
});

export default FoodList;