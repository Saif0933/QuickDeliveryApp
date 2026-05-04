import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useGetCartByVendorId } from "../../api/hooks/allCart";
import { useAddToCart } from "../../api/hooks/cart";
import BottomSection from "../../components/cart/BottomSection";
import CancellationPolicy from "../../components/cart/CancellationPolicy";
import CouponsSection from "../../components/cart/CouponsSection";
import DeliverySection from "../../components/cart/DeliverySection";
import FeedingIndiaSection from "../../components/cart/FeedingIndiaSection";
import { COLORS } from "../../theme/color";

export const SingleResturantCart = ({ route }: { route: any }) => {
  const { vendorId } = route.params;
  const navigation = useNavigation<any>();

  const { data: cartData, isLoading: cartLoading } = useGetCartByVendorId(vendorId);
  const { mutate: updateCart, isPending: isUpdating } = useAddToCart();

  // Handle quantity adjustments
  const handleQuantityChange = (item: any, delta: number) => {
    const payloadQty = item.quantity + delta;

    if (payloadQty <= 0) {
      // Complete removal path
      updateCart({
        vendorId: Number(vendorId),
        vendorProductId: Number(item.vendorProductId),
        productVariantId: item.productVariantId ? Number(item.productVariantId) : undefined,
        quantity: 0,
      }, {
        onError: () => {
          console.error("Failed to remove cart quantity");
        }
      });
      return;
    }

    // Adjustment path
    const payload = {
      vendorProductId: Number(item.vendorProductId),
      productVariantId: item.productVariantId ? Number(item.productVariantId) : undefined,
      vendorId: Number(vendorId),
      quantity: Number(payloadQty),
    };
    
    updateCart(payload, {
      onError: () => {
        console.error("Failed to update cart quantity");
      }
    });
  };

  if (cartLoading) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </SafeAreaView>
    );
  }

  // Handle empty state gracefully
  const hasItems = cartData?.items && cartData.items.length > 0;
  if (!hasItems) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <MaterialIcons name="remove-shopping-cart" size={60} color={COLORS.muted} />
        <Text style={styles.emptyText}>Your cart from this store is empty.</Text>
        <TouchableOpacity style={styles.addMoreBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.addMoreText}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const vendor = cartData.vendor;
  const items = cartData.items;
  // Parse subtotal
  const subtotal = cartData.subtotal || cartData.cartTotal || 0;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.restaurantName} numberOfLines={1}>{vendor?.shopName || "Store"}</Text>
          <Text style={styles.deliveryTime}>30 mins delivery to Home</Text>
        </View>
        <TouchableOpacity style={styles.shareButton}>
          <MaterialIcons name="share" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        {/* Vendor Items Box */}
        <View style={styles.vendorBox}>
          <View style={styles.vendorHeader}>
            <Image 
              source={{ uri: vendor?.images?.url || vendor?.logo || "https://via.placeholder.com/150" }} 
              style={styles.vendorLogo} 
            />
            <View>
              <Text style={styles.vendorName}>{vendor?.shopName || "Store"}</Text>
              <Text style={styles.vendorSubtitle}>Items from this store</Text>
            </View>
          </View>

          {/* Map Items */}
          {items.map((item: any, index: number) => {
            const price = item.unitPrice || item.product?.sellingPrice || item.product?.marketPrice || 0;
            const isVeg = item.product?.isVeg;
            if (item.quantity === 0) return null; // Safe guard

            return (
              <View key={item.id || index} style={styles.itemRow}>
                {/* Info Text */}
                <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.product?.name || item.name || "Item"}</Text>
                  <Text style={styles.itemPrice}>₹{price}</Text>
                </View>

                {/* Controls */}
                <View style={styles.quantityControl}>
                  <TouchableOpacity
                    style={styles.qtyButton}
                    onPress={() => handleQuantityChange(item, -1)}
                    disabled={isUpdating}
                  >
                    <Ionicons name="remove" size={16} color={COLORS.primary} />
                  </TouchableOpacity>
                  
                  <Text style={styles.qtyText}>{item.quantity}</Text>
                  
                  <TouchableOpacity
                    style={styles.qtyButton}
                    onPress={() => handleQuantityChange(item, 1)}
                    disabled={isUpdating}
                  >
                    <Ionicons name="add" size={16} color={COLORS.primary} />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}

          <TouchableOpacity style={styles.addMoreBtn} onPress={() => navigation.goBack()}>
             <MaterialIcons name="add" size={16} color={COLORS.primary} style={{marginRight: 4}} />
             <Text style={styles.addMoreText}>Add more items</Text>
          </TouchableOpacity>
        </View>

        {/* Extra Checkout Sections */}
        <FeedingIndiaSection vendorId={vendorId} />
        <CouponsSection cartData={cartData} />
        <DeliverySection cartData={cartData} />
        <CancellationPolicy />
        <View style={{height: 100}} />

      </ScrollView>

      {/* Cart Summary Header over Bottom Section visually */}
      <BottomSection cartData={cartData} />
    </SafeAreaView>
  );
};

// Imports used natively inside dynamic map block
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F8',
  },
  centerContainer: {
    flex: 1,
    backgroundColor: '#F5F5F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  scrollView: {
    flex: 1,
  },
  // Header Style Zomato Clone
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
    backgroundColor: COLORS.white,
  },
  backButton: {
    padding: 4,
  },
  headerContent: {
    flex: 1,
    marginLeft: 12,
  },
  restaurantName: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1C1C1C',
  },
  deliveryTime: {
    fontSize: 12,
    color: COLORS.highlight,
    marginTop: 2,
  },
  shareButton: {
    padding: 4,
  },
  // Vendor Box Styles
  vendorBox: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 8,
  },
  vendorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  vendorLogo: {
    width: 45,
    height: 45,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#f2f2f2',
  },
  vendorName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  vendorSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  vegBadge: {
    width: 14,
    height: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    marginTop: 4,
  },
  vegDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
    marginRight: 16,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    lineHeight: 20,
  },
  itemPrice: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF1F3',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFE0E5',
  },
  qtyButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.primary,
    minWidth: 16,
    textAlign: 'center',
  },
  addMoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 4,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  addMoreText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
  }
});