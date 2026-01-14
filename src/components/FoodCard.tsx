import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  FlatList,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Vendor } from "../../Vender.types";
import { useGetAllVendors } from "../api/hooks/useVender";
import { COLORS } from "../theme/color";
import { RootStack } from "../types/types";

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
  images: (ImageSourcePropType | { uri: string })[]; 
}

const mapVendorToFoodItem = (vendor: Vendor): FoodItem => {
  return {
    id: vendor.id.toString(),
    // Fallback to company name if shop name is missing
    name: vendor.shopName || vendor.companyName || "Unknown Restaurant", 
    // Static placeholders since these fields aren't in the backend response yet
    dish: "North Indian • Chinese", 
    price: "₹200 for one", 
    time: "30-45 mins",
    distance: "2.5 km",
    rating: "4.2",
    offer: "Extra 20% OFF",
    discount: "FLAT 40% OFF",
    // Backend returns single image object; UI expects array for carousel
    images: vendor.images?.url 
      ? [{ uri: vendor.images.url }] 
      : [require("../assets/food1.jpg")], // Fallback image if null
  };
};

// --- COMPONENT: FoodCard ---
const FoodCard: React.FC<{ item: FoodItem }> = ({ item }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStack>>();

  const [index, setIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [isFavorite, setIsFavorite] = useState(false);

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

  // Carousel Animation Logic
  useEffect(() => {
    // Only animate if there is more than 1 image
    if (item.images.length <= 1) return;

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
      onPress={() => navigation.navigate("ProductScreen", {
        vendorId: item.id,
        vendorName: item.name,
        vendorImage: (typeof item.images[0] === 'object' && 'uri' in item.images[0] 
          ? item.images[0].uri 
          : "") || ""
      })}
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

        {/* Floating Tag */}
        <View style={styles.glassTag}>
          <Text style={styles.glassTagText} numberOfLines={1}>
            {item.dish.split('•')[0]}
          </Text>
        </View>
      </View>

      {/* Content Section */}
      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <View style={styles.infoColumn}>
            <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
            <Text style={styles.cuisineText}>
              {item.dish} • {item.price}
            </Text>
            <View style={styles.metaRow}>
              <View style={styles.timePill}>
                 <Ionicons name="time-outline" size={12} color="#555" style={{marginRight: 3}} />
                 <Text style={styles.metaText}>{item.time}</Text>
              </View>
              <Text style={styles.metaDot}>•</Text>
              <Text style={styles.metaText}>{item.distance}</Text>
            </View>
          </View>
          
          <View style={styles.ratingBox}>
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Ionicons name="star" size={10} color="#fff" style={{ marginLeft: 2 }} />
          </View>
        </View>

        <View style={styles.divider} />

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

// --- MAIN COMPONENT: FoodList (Infinite Scroll) ---
const FoodList: React.FC = () => {
  // 1. Fetch Data with Infinite Query
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError
  } = useGetAllVendors({ limit: 10 }); // Fetch 10 items per page

  // 2. Flatten Pages into a single array & Map to FoodItem
  const foodItems = useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap((page) => 
      page.vendors.map((vendor) => mapVendorToFoodItem(vendor))
    );
  }, [data]);

  // 3. Render Footer Loader
  const renderFooter = () => {
    if (!isFetchingNextPage) return <View style={{ height: 40 }} />;
    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="small" color={COLORS.primary} />
      </View>
    );
  };

  // 4. Handle Empty State
  if (isLoading) {
    return (
      <View style={{ padding: 20, alignItems: 'center' }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={{ marginTop: 10, color: '#888' }}>Loading Restaurants...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={{ padding: 20, alignItems: 'center' }}>
         <Text style={{ color: 'red' }}>Failed to load restaurants.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Text style={styles.sectionHeader}>
        {foodItems.length > 0 
          ? `${foodItems.length}+ Restaurants near by you` 
          : "No Restaurants found"}
      </Text>

      <FlatList
        data={foodItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FoodCard item={item} />}
        
        // Infinite Scroll Props
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5} // Trigger when half a screen away from bottom
        
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
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
    marginTop: 15,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 20, 
    marginHorizontal: 16,
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
  divider: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginVertical: 12, 
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#eee', 
    borderRadius: 1,
  },
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