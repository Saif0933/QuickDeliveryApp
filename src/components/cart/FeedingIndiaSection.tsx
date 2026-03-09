

import React, { useMemo } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useGetUserCart } from '../../api/hooks/allCart';
import { useAddToCart } from '../../api/hooks/cart';
import { useGetVendorInventory } from '../../api/hooks/vendorInventory.ts';
import { COLORS } from "../../theme/color";

// Props interface to accept vendorId
interface FeedingIndiaSectionProps {
  vendorId?: string;
}

const FeedingIndiaSection: React.FC<FeedingIndiaSectionProps> = ({ vendorId }) => {
  // Get active cart vendor dynamically if not provided
  const { data: cartData } = useGetUserCart();
  // @ts-ignore
  let activeVendorId = vendorId || cartData?.vendors?.[0]?.vendorId || cartData?.vendors?.[0]?.vendor?.id || cartData?.items?.[0]?.vendorId || "1";

  // Fetch products from vendor inventory
  const { data: vendorData, isLoading } = useGetVendorInventory({ vendorId: activeVendorId.toString(), limit: 10 });
  
  // Add to cart mutation
  const { mutate: addToCart, isPending } = useAddToCart();

  // Flatten paginated data
  const products = useMemo(() => {
    if (!vendorData) return [];
    return vendorData.pages.flatMap((page: any) => page.products).slice(0, 8); // Limit to 8 items
  }, [vendorData]);

  // Handle add to cart
  const handleAddToCart = (item: any) => {
    // Get default variant if available
    const defaultVariant = item.productVariants?.find((v: any) => v.isDefault) || item.productVariants?.[0];
    
    const payload = {
      vendorProductId: Number(item.id),
      vendorId: Number(item.vendorId),
      productVariantId: defaultVariant ? Number(defaultVariant.id) : undefined,
      quantity: 1,
    };

    addToCart(payload, {
      onSuccess: () => {
        if (Platform.OS === 'android') {
          ToastAndroid.show(`${item.product.name} added to cart`, ToastAndroid.SHORT);
        } else {
          Alert.alert("Added", `${item.product.name} added to cart`);
        }
      },
      onError: (error) => {
        console.error("Error adding to cart:", error);
        Alert.alert("Error", "Failed to add item to cart");
      }
    });
  };

  // Loading state
  if (isLoading) {
    return (
      <View style={[styles.container, { alignItems: 'center', paddingVertical: 30 }]}>
        <ActivityIndicator size="small" color={COLORS.primary} />
      </View>
    );
  }

  // Empty state
  if (products.length === 0) {
    return null; // Don't show section if no products
  }

  return (
    <View style={styles.container}>
      
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.iconContainer}>
           <MaterialCommunityIcons name="view-grid-outline" size={20} color={COLORS.primary} />
        </View>
        <Text style={styles.headerTitle}>Complete your meal with</Text>
      </View>

      {/* Horizontal List */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        {products.map((item) => {
          // Get image URL
          const imageUrl = item.product.images?.[0]?.image?.url || 'https://via.placeholder.com/150';
          
          // Get price safely regardless of string or object
          let price = 0;
          let originalPrice = 0;

          if (item.price?.d?.[0]) {
            price = item.price.d[0];
          } else if (item.price && typeof item.price === 'string') {
            price = parseFloat(item.price);
          } else if (item.product?.sellingPrice) {
            price = parseFloat(item.product.sellingPrice);
          } else if (item.product?.marketPrice) {
            price = parseFloat(item.product.marketPrice);
          }

          if (item.product?.marketPrice?.d?.[0]) {
            originalPrice = item.product.marketPrice.d[0];
          } else if (item.product?.marketPrice && typeof item.product.marketPrice === 'string') {
            originalPrice = parseFloat(item.product.marketPrice);
          } else {
            originalPrice = price;
          }
          
          // Check if veg
          const isVeg = item.product.isVeg;

          return (
            <View key={item.id} style={styles.card}>
              
              {/* Image Section */}
              <View style={styles.imageContainer}>
                <Image source={{ uri: imageUrl }} style={styles.foodImage} />
                
                {/* Veg/Non-Veg Icon */}
                <View style={[
                  styles.vegIconContainer,
                  { borderColor: isVeg ? COLORS.highlight : 'red' }
                ]}>
                  <View style={[
                    styles.vegIconCircle,
                    { backgroundColor: isVeg ? COLORS.highlight : 'red' }
                  ]} />
                </View>

                {/* Add Button */}
                <TouchableOpacity 
                  style={[styles.addButton, isPending && { opacity: 0.6 }]}
                  onPress={() => handleAddToCart(item)}
                  activeOpacity={0.8}
                  disabled={isPending}
                >
                  <Text style={styles.addButtonText}>ADD</Text>
                </TouchableOpacity>
              </View>

              {/* Info Section */}
              <View style={styles.infoContainer}>
                <Text style={styles.itemName} numberOfLines={2}>
                  {item.product.name}
                </Text>
                <View style={styles.priceRow}>
                  <Text style={styles.price}>₹{price}</Text>
                  {originalPrice > price && (
                    <Text style={styles.originalPrice}>₹{originalPrice}</Text>
                  )}
                </View>
              </View>

            </View>
          );
        })}
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  iconContainer: {
    padding: 8,
    borderRadius: 12,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20, // Added padding to avoid shadow clipping
  },
  
  // CARD STYLES FIXED
  card: {
    width: 120, // Increased width to fit content properly
    marginRight: 16,
  },
  imageContainer: {
    width: '100%',
    height: 110, // Made square relative to card width
    borderRadius: 16,
    marginBottom: 8,
    position: 'relative',
    overflow: 'hidden', // Ensures image doesn't bleed out
  },
  foodImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    backgroundColor: COLORS.background, // Placeholder color
    borderRadius: 10,
  },

  // Veg Icon (Green Square)
  vegIconContainer: {
    position: 'absolute',
    top: 8, // Moved to top-left for standard food app look (or keep bottom if preferred)
    left: 8,
    width: 14,
    height: 14,
    borderWidth: 1,
    borderColor: COLORS.highlight, // Assuming Green
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
  },
  vegIconCircle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.highlight,
  },

  // Add Button
  addButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4, // Android Shadow
    shadowColor: '#000', // iOS Shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  addButtonText: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: '800',
  },

  infoContainer: {
    paddingHorizontal: 2,
  },
  itemName: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
    lineHeight: 18,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
    marginRight: 6,
  },
  originalPrice: {
    fontSize: 11,
    color: COLORS.muted, // Assuming light grey
    textDecorationLine: 'line-through',
    fontWeight: '500',
  },
});

export default FeedingIndiaSection;