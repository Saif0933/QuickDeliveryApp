import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  FlatList,
  ImageSourcePropType,
  RefreshControlProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useGetAllVendors } from "../api/hooks/useVender";
import { COLORS } from "../theme/color";
import { RootStack } from "../types/types";
import { Vendor } from "../types/Vender.types";

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
    name: vendor.shopName || vendor.companyName || "Unknown Store",
    // Static placeholders aligned with e-commerce (Flipkart) style UI
    dish: "Men Printed Round Neck T-shirt", // Mocked product description
    price: "₹499",
    time: "₹999", // Moved original price to `time` field for UI mapping
    distance: "50% off", // Moved discount to `distance` field for UI mapping
    rating: "4.2",
    offer: "Bank Offer",
    discount: "Buy 2 Get 1",
    // Use Menu Images if available (Zomato-style)
    // Map MenuImage objects to URI objects for the UI carousel
    images: vendor.menuImages && vendor.menuImages.length > 0
      ? vendor.menuImages.map(mi => ({ uri: (mi.imageUrl as any).url }))
      : vendor.images?.url
        ? [{ uri: vendor.images.url }]
        : [require("../assets/food1.jpg")], // Fallback image if null
  };
};

import { useWishlist } from "../Context/WishlistContext";

// --- COMPONENT: FoodCard ---
const FoodCard: React.FC<{ item: FoodItem }> = ({ item }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStack>>();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [index, setIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const isFavorite = isInWishlist(item.id);

  const handleFavorite = () => {
    toggleWishlist({
      id: item.id,
      title: item.dish,
      price: item.price,
      image: (typeof item.images[0] === 'object' && 'uri' in item.images[0] ? item.images[0].uri ?? "" : ""),
      brand: item.name,
      rating: parseFloat(item.rating)
    });
    
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
        category: "Recommended",
        vendorId: item.id,
        vendorName: item.name,
        productName: item.dish,
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

        {/* Wishlist Button */}
        <TouchableOpacity
          style={styles.wishlistWrapper}
          onPress={handleFavorite}
          activeOpacity={0.8}
        >
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={18}
              color={isFavorite ? "#E91E63" : "#666"}
            />
          </Animated.View>
        </TouchableOpacity>


        {/* Pagination Dots */}
        {item.images.length > 1 && (
          <View style={styles.dotContainer}>
            {item.images.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  { backgroundColor: i === index ? '#2874F0' : '#e0e0e0' }
                ]}
              />
            ))}
          </View>
        )}
      </View>

      {/* Content Section (Flipkart Style) */}
      <View style={styles.contentContainer}>
        {/* Brand Name */}
        <Text style={styles.brandName} numberOfLines={1}>{item.name}</Text>
        
        {/* Product Description */}
        <Text style={styles.productDesc} numberOfLines={1}>{item.dish}</Text>

        {/* Price Row */}
        <View style={styles.priceRow}>
          <Text style={styles.currentPrice}>{item.price}</Text>
          <Text style={styles.originalPrice}>{item.time}</Text> {/* Using `time` field as mocked original price */}
          <Text style={styles.discountText}>{item.distance}</Text> {/* Using `distance` field as mocked discount text */}
        </View>

        {/* Bottom Row - Rating and Assured Badge */}
        <View style={styles.extraRow}>
          <View style={styles.ratingWrapper}>
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Ionicons name="star" size={8} color="#fff" />
          </View>
          <View style={styles.assuredBadge}>
             <Text style={styles.assuredText}>F-Assured</Text>
          </View>
        </View>
      </View>
      
    </TouchableOpacity>
  );
};

// --- MAIN COMPONENT: FoodList (Infinite Scroll) ---
interface FoodListProps {
  ListHeaderComponent?: React.ReactElement;
  onScroll?: (event: any) => void;
  scrollEventThrottle?: number;
  refreshControl?: React.ReactElement<RefreshControlProps>;
  contentContainerStyle?: any;
  vendors?: Vendor[];
}

const FoodList: React.FC<FoodListProps> = ({
  ListHeaderComponent,
  onScroll,
  scrollEventThrottle,
  refreshControl,
  contentContainerStyle,
  vendors
}) => {
  // 1. Fetch Data with Infinite Query
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError
  } = useGetAllVendors({ limit: 10 }); // Fetch 10 items per page

  // 2. Flatten Pages into a single array & Map to FoodItem and append static data
  const staticItems: FoodItem[] = [
    {
      id: "static-1",
      name: "Puma",
      dish: "Men Regular Fit Solid Shirt",
      price: "₹799",
      time: "₹1999",
      distance: "60% off",
      rating: "4.5",
      offer: "Special Price",
      discount: "New Arrival",
      images: [{ uri: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500&q=80" }],
    },
    {
      id: "static-2",
      name: "Roadster",
      dish: "Men Printed T-shirt",
      price: "₹349",
      time: "₹999",
      distance: "65% off",
      rating: "4.1",
      offer: "Combo Offer",
      discount: "Top Rated",
      images: [{ uri: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80" }],
    },
    {
      id: "static-3",
      name: "H&M",
      dish: "Women Relaxed Fit Jeans",
      price: "₹1299",
      time: "₹2499",
      distance: "45% off",
      rating: "4.8",
      offer: "Limited Time",
      discount: "Fast Delivery",
      images: [{ uri: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80" }],
    }
  ];

  const foodItems = useMemo(() => {
    let items = [...staticItems];
    
    // If vendors are passed via props, use them. Otherwise use data from API.
    const vendorsToDisplay = vendors || (data ? data.pages.flatMap((page) => page.vendors) : []);
    
    if (vendorsToDisplay.length > 0) {
      items = [
        ...items,
        ...vendorsToDisplay.map((vendor) => mapVendorToFoodItem(vendor))
      ];
    }
    return items;
  }, [data, vendors]);

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
  if (isLoading && !vendors) {
    return (
      <View style={{ padding: 20, alignItems: 'center' }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={{ marginTop: 10, color: '#888' }}>Loading Stores...</Text>
      </View>
    );
  }

  if (isError && !vendors) {
    return (
      <View style={{ padding: 20, alignItems: 'center' }}>
        <Text style={{ color: 'red' }}>Failed to load stores.</Text>
      </View>
    );
  }

  return (
    <View style={{ backgroundColor: "#fff", paddingVertical: 10 }}>
      {ListHeaderComponent}
      <Text style={styles.sectionHeader}>
        {foodItems.length > 0
          ? `Trending Deals (${foodItems.length}+)`
          : "No products found"}
      </Text>
      <FlatList
        data={foodItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FoodCard item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}

        // Infinite Scroll Props
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5} // Trigger when half a screen away from bottom

        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: 16,
    fontWeight: "600",
    color: "#212121",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#fff",
    width: 150, // Fixed width for horizontal scroll
    marginRight: 12,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    overflow: "hidden",
  },
  imageContainer: {
    height: 180, // Taller image for apparel
    width: "100%",
    position: "relative",
    backgroundColor: "#F9F9F9",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  wishlistWrapper: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#FFFFFF",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  dotContainer: {
    position: "absolute",
    bottom: 8,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    marginHorizontal: 2,
  },
  contentContainer: {
    padding: 10,
    backgroundColor: "#fff",
  },
  brandName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#878787", // Typical flipkart brand gray
    marginBottom: 2,
    textTransform: "uppercase",
  },
  productDesc: {
    fontSize: 12,
    color: "#212121", // Dark text for product
    marginBottom: 6,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    flexWrap: "wrap",
  },
  currentPrice: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#212121",
    marginRight: 6,
  },
  originalPrice: {
    fontSize: 12,
    color: "#878787",
    textDecorationLine: "line-through",
    marginRight: 6,
  },
  discountText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#388E3C", // Flipkart green discount
  },
  extraRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  assuredBadge: {
    backgroundColor: "#2874F0", // Flipkart blue
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 2,
  },
  assuredText: {
    color: "#fff",
    fontSize: 9,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  ratingWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#388E3C", // Green rating
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  ratingText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
    marginRight: 2,
  },
  fastDeliveryBox: {
    backgroundColor: "#F9F9F9",
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  fastDeliveryText: {
    fontSize: 11,
    color: "#212121",
    fontWeight: "500",
  }
});

export default FoodList;