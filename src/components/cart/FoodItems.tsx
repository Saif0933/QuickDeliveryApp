
// import React, { useMemo } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   ActivityIndicator,
// } from 'react-native';
// import {COLORS} from '../../theme/color';
// import { useGetUserCart } from '../../api/hooks/allCart'; 

// // We define a flexible interface here to handle the mismatch between 
// // your previous JSON (vendors) and new Interface (items).
// interface FlexibleCartItem {
//   id: number | string;
//   quantity: number;
//   // Handle both price structures (API vs Interface)
//   price?: { d: number[] };
//   unitPrice?: { d: number[] };
//   product: {
//     name: string;
//     images?: { image: { url: string } }[];
//   };
//   productVariant?: {
//     title: string;
//     images?: { image: { url: string } }[];
//   } | null;
// }

// const FoodItems: React.FC = () => {
//   const { data: cartData, isLoading } = useGetUserCart();

//   // --- 1. DATA FLATTENING FIX ---
//   const cartItems = useMemo(() => {
//     if (!cartData) return [];

//     // Check if data is nested in 'vendors' (Like your JSON)
//     // @ts-ignore: Ignoring type check to handle runtime data structure
//     if (cartData.vendors && Array.isArray(cartData.vendors)) {
//        // @ts-ignore
//        return cartData.vendors.flatMap(v => v.items);
//     }

//     // Check if data is flat in 'items' (Like your Interface)
//     if (cartData.items && Array.isArray(cartData.items)) {
//        return cartData.items;
//     }

//     return [];
//   }, [cartData]);
//   console.log("cartItems",cartItems)

//   // --- LOADING STATE ---
//   if (isLoading) {
//     return (
//       <View style={[styles.itemsContainer, { alignItems: 'center', padding: 20 }]}>
//         <ActivityIndicator size="small" color={COLORS.primary} />
//       </View>
//     );
//   }

//   // --- EMPTY CHECK ---
//   if (cartItems.length === 0) {
//     return (
//         <View style={[styles.itemsContainer, { paddingVertical: 20 }]}>
//             <Text style={{textAlign: 'center', color: COLORS.textSecondary}}>Your cart is empty</Text>
//         </View>
//     );
//   }

//   return (
//     <View style={styles.itemsContainer}>
      
//       {cartItems.map((item: FlexibleCartItem) => {
        
//         const productName = item.product?.name || "Unknown Item";
        
//         // PRICE FIX: Check 'unitPrice' (JSON) or 'price' (Interface)
//         const priceObj = item.unitPrice || item.price;
//         const priceValue = priceObj?.d?.[0] || 0;
//         const quantity = item.quantity;
        
//         // --- 2. IMAGE LOGIC ---
//         // Priority: Variant Image -> Product Image -> Placeholder
//         let imageUrl = 'https://via.placeholder.com/150';

//         if (item.productVariant?.images?.[0]?.image?.url) {
//             imageUrl = item.productVariant.images[0].image.url;
//         } else if (item.product?.images?.[0]?.image?.url) {
//             imageUrl = item.product.images[0].image.url;
//         }

//         // Variant Title
//         const variantTitle = item.productVariant?.title 
//           ? item.productVariant.title 
//           : "Standard";

//         // Default Veg (API missing this field in recent types)
//         const isVeg = true; 

//         return (
//           <View key={item.id} style={styles.foodItem}>
            
//             {/* Image Section */}
//             <View style={styles.imageContainer}>
//               <Image
//                 source={{ uri: imageUrl }}
//                 style={styles.foodImage}
//                 resizeMode="cover"
//               />
//               <View style={[isVeg ? styles.vegIndicator : styles.nonVegIndicator, styles.iconOverlay]}>
//                  {isVeg ? (
//                     <View style={styles.vegDot} />
//                  ) : (
//                     <View style={styles.nonVegTriangle} />
//                  )}
//               </View>
//             </View>

//             {/* Details Section */}
//             <View style={styles.itemDetails}>
//               <Text style={styles.itemName} numberOfLines={2}>{productName}</Text>
              
//               <Text style={styles.itemDescription}>
//                 {variantTitle}
//               </Text>
              
//               <TouchableOpacity>
//                 <Text style={styles.editText}>Edit ▸</Text>
//               </TouchableOpacity>
//             </View>

//             {/* Quantity & Price */}
//             <View style={styles.quantityContainer}>
//               <View style={styles.quantityControls}>
//                 <TouchableOpacity style={styles.quantityButton}>
//                   <Text style={styles.quantityButtonText}>−</Text>
//                 </TouchableOpacity>

//                 <Text style={styles.quantityText}>{quantity}</Text>

//                 <TouchableOpacity style={styles.quantityButton}>
//                   <Text style={styles.quantityButtonText}>+</Text>
//                 </TouchableOpacity>
//               </View>

//               <Text style={styles.itemPrice}>₹{priceValue * quantity}</Text>
//             </View>
//           </View>
//         );
//       })}

//       <TouchableOpacity style={styles.addMoreItems}>
//         <Text style={styles.addMoreText}>+ Add more items</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   itemsContainer: {
//     paddingHorizontal: 16,
//     marginTop: 16,
//   },
//   foodItem: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     paddingVertical: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.background,
//   },
//   imageContainer: {
//     position: 'relative',
//     marginRight: 12, 
//   },
//   foodImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 8,
//     backgroundColor: '#eee', 
//   },
//   iconOverlay: {
//     position: 'absolute',
//     top: 4,
//     left: 4,
//     backgroundColor: 'white', 
//     borderRadius: 2,
//     padding: 1,
//   },
//   vegIndicator: {
//     width: 14,
//     height: 14,
//     borderWidth: 1,
//     borderColor: COLORS.highlight,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   vegDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 10,
//     backgroundColor: COLORS.highlight,
//   },
//   nonVegIndicator: {
//     width: 14,
//     height: 14,
//     borderWidth: 1,
//     borderColor: COLORS.primary,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   nonVegTriangle: {
//     width: 0,
//     height: 0,
//     borderLeftWidth: 4,
//     borderRightWidth: 4,
//     borderBottomWidth: 7,
//     borderLeftColor: 'transparent',
//     borderRightColor: 'transparent',
//     borderBottomColor: COLORS.primary, 
//   },
//   itemDetails: {
//     flex: 1,
//   },
//   itemName: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: COLORS.textPrimary,
//     lineHeight: 20,
//   },
//   itemDescription: {
//     fontSize: 12,
//     color: COLORS.textSecondary,
//     marginTop: 4,
//   },
//   editText: {
//     fontSize: 12,
//     color: COLORS.primary,
//     marginTop: 8,
//     fontWeight: '500',
//   },
//   quantityContainer: {
//     alignItems: 'flex-end',
//     marginLeft: 8,
//   },
//   quantityControls: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: COLORS.primary,
//     borderRadius: 4,
//     marginBottom: 8,
//   },
//   quantityButton: {
//     width: 25,
//     height: 25,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   quantityButtonText: {
//     fontSize: 18,
//     color: COLORS.primary,
//     fontWeight: '600',
//   },
//   quantityText: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: COLORS.primary,
//     paddingHorizontal: 8,
//   },
//   itemPrice: {
//     fontSize: 12,
//     fontWeight: '800',
//     color: COLORS.textPrimary,
//   },
//   addMoreItems: {
//     paddingVertical: 16,
//   },
//   addMoreText: {
//     fontSize: 14,
//     color: COLORS.primary,
//     fontWeight: '500',
//   },
// });

// export default FoodItems;
import React, { useMemo } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import { useGetUserCart } from '../../api/hooks/allCart';
import { useAddToCart } from '../../api/hooks/cart';
import { COLORS } from '../../theme/color';

interface FlexibleCartItem {
  id: number;
  quantity: number;
  vendorId: number;
  vendorProductId: number;
  productVariantId?: number;
  price?: { d: number[] } | string | number;
  unitPrice?: { d: number[] } | string | number;
  product: {
    name: string;
    images?: { image: { url: string } }[];
  };
  productVariant?: {
    id?: number;
    title: string;
    images?: { image: { url: string } }[];
  } | null;
}

interface VendorGroup {
  vendorId: number;
  vendorName: string;
  vendorLogo: string;
  items: FlexibleCartItem[];
}

const FoodItems: React.FC = () => {
  const { data: cartData, isLoading } = useGetUserCart();
  const { mutate: addToCart } = useAddToCart();

  // --- FIXED DATA LOGIC --- //
  const vendorGroups = useMemo<VendorGroup[]>(() => {
    if (!cartData) return [];

    const groupMap = new Map<number, VendorGroup>();

    // SCENARIO 1: Data is nested in 'vendors'
    // @ts-ignore
    if (cartData.vendors && Array.isArray(cartData.vendors)) {
       // @ts-ignore
       cartData.vendors.forEach(vendor => {
         const parentVendorId = vendor.id || vendor.vendorId || vendor.vendor?.id || 1;
         const vendorName = vendor.shopName || vendor.vendor?.shopName || "Restaurant";
         const vendorLogo = vendor.images?.url || vendor.vendor?.images?.url || vendor.logo || vendor.vendor?.logo || "https://via.placeholder.com/100";
         
         if (!groupMap.has(parentVendorId)) {
           groupMap.set(parentVendorId, { vendorId: parentVendorId, vendorName, vendorLogo, items: [] });
         }

         vendor.items.forEach((item: any) => {
           if (item.quantity > 0) {
             groupMap.get(parentVendorId)!.items.push({
               ...item,
               vendorId: item.vendorId || parentVendorId, 
             });
           }
         });
       });
    }
    // SCENARIO 2: Data is flat in 'items'
    else if (cartData.items && Array.isArray(cartData.items)) {
       cartData.items.forEach((item: any) => {
           if (item.quantity > 0) {
             const parentVendorId = item.vendorId || item.vendor?.id || 1;
             const vendorName = item.vendor?.shopName || item.vendor?.companyName || "Restaurant";
             const vendorLogo = item.vendor?.images?.url || item.vendor?.logo?.url || "https://via.placeholder.com/100";

             if (!groupMap.has(parentVendorId)) {
               groupMap.set(parentVendorId, { vendorId: parentVendorId, vendorName, vendorLogo, items: [] });
             }
             
             groupMap.get(parentVendorId)!.items.push({
                ...item,
                vendorId: parentVendorId 
             });
           }
       });
    }

    return Array.from(groupMap.values()).filter(group => group.items.length > 0);
  }, [cartData]);

  // Handle quantity increase/decrease
  const handleQuantityChange = (item: FlexibleCartItem, change: number) => {
    if (!item.vendorId || !item.vendorProductId) {
      console.error("❌ ERROR: Missing required IDs.");
      return;
    }

    const newQuantity = item.quantity + change;

    if (newQuantity <= 0) {
      addToCart({
        vendorId: item.vendorId,
        vendorProductId: item.vendorProductId,
        productVariantId: item.productVariantId || undefined,
        quantity: 0,
      }, {
        onSuccess: () => {
          if (Platform.OS === 'android') {
            ToastAndroid.show("Item removed from cart", ToastAndroid.SHORT);
          }
        },
        onError: () => {
          Alert.alert("Error", "Failed to remove item from cart");
        }
      });
      return;
    }

    addToCart({
        vendorId: item.vendorId,
        vendorProductId: item.vendorProductId,
        productVariantId: item.productVariantId || undefined,
        quantity: newQuantity,
    }, {
      onError: () => Alert.alert("Error", "Failed to update quantity")
    });
  };

  if (isLoading) {
    return (
      <View style={[styles.mainContainer, { alignItems: 'center', padding: 20 }]}>
        <ActivityIndicator size="small" color={COLORS.primary} />
      </View>
    );
  }

  if (vendorGroups.length === 0) {
    return (
        <View style={[styles.mainContainer, { paddingVertical: 20 }]}>
            <Text style={{textAlign: 'center', color: COLORS.textSecondary}}>Your cart is empty</Text>
        </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      {vendorGroups.map((group, groupIndex) => (
        <View key={group.vendorId} style={[styles.vendorGroupCard, groupIndex > 0 && { marginTop: 16 }]}>
          {/* Vendor Header Zomato Style */}
          <View style={styles.vendorHeader}>
            <Image source={{ uri: group.vendorLogo }} style={styles.vendorLogo} />
            <View style={styles.vendorInfo}>
              <Text style={styles.vendorName} numberOfLines={1}>{group.vendorName}</Text>
              <Text style={styles.vendorSubtitle}>Items from this restaurant</Text>
            </View>
          </View>

          {/* Vendor Items */}
          <View style={styles.itemsContainer}>
            {group.items.map((item: FlexibleCartItem) => {
              const productName = item.product?.name || "Unknown Item";
              
              // Handle string or object prices dynamically
              const priceObj = item.unitPrice || item.price;
              let priceValue = 0;
              if (priceObj && typeof priceObj === 'object' && 'd' in priceObj && priceObj.d) {
                  priceValue = priceObj.d[0];
              } else if (typeof item.unitPrice === 'string' || typeof item.unitPrice === 'number') {
                  priceValue = parseFloat(item.unitPrice as string);
              } else if (typeof item.price === 'string' || typeof item.price === 'number') {
                  priceValue = parseFloat(item.price as string);
              }

              const quantity = item.quantity;
              
              // Image logic priority
              let imageUrl = 'https://via.placeholder.com/150';
              if (item.productVariant?.images?.[0]?.image?.url) {
                  imageUrl = item.productVariant.images[0].image.url;
              } else if (item.product?.images?.[0]?.image?.url) {
                  imageUrl = item.product.images[0].image.url;
              }

              const variantTitle = item.productVariant?.title ? item.productVariant.title : "Standard";

              return (
                <View key={item.id} style={styles.foodItem}>
                  <View style={styles.imageContainer}>
                    <Image source={{ uri: imageUrl }} style={styles.foodImage} resizeMode="cover" />
                  </View>

                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName} numberOfLines={2}>{productName}</Text>
                    <Text style={styles.itemDescription}>{variantTitle}</Text>
                    <TouchableOpacity>
                      <Text style={styles.editText}>Edit ▸</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.quantityContainer}>
                    <View style={styles.quantityControls}>
                      <TouchableOpacity 
                          style={styles.quantityButton}
                          onPress={() => handleQuantityChange(item, -1)}
                      >
                        <Text style={styles.quantityButtonText}>−</Text>
                      </TouchableOpacity>

                      <Text style={styles.quantityText}>{quantity}</Text>

                      <TouchableOpacity 
                          style={styles.quantityButton}
                          onPress={() => handleQuantityChange(item, 1)}
                      >
                        <Text style={styles.quantityButtonText}>+</Text>
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.itemPrice}>₹{priceValue * quantity}</Text>
                  </View>
                </View>
              );
            })}
            
            {/* Add More Items for this specific vendor */}
            <TouchableOpacity style={styles.addMoreItems}>
              <Text style={styles.addMoreText}>+ Add more items from {group.vendorName}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  vendorGroupCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 8,
  },
  vendorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fc',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  vendorLogo: {
    width: 44,
    height: 44,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#eee',
  },
  vendorInfo: {
    flex: 1,
  },
  vendorName: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 2,
    textTransform: 'capitalize',
  },
  vendorSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  itemsContainer: {
    paddingHorizontal: 16,
  },
  foodItem: { 
    flexDirection: 'row', 
    alignItems: 'flex-start', 
    paddingVertical: 16, 
    borderBottomWidth: 1, 
    borderBottomColor: '#f7f7f7' 
  },
  imageContainer: { marginRight: 12 },
  foodImage: { width: 60, height: 60, borderRadius: 8, backgroundColor: '#eee' },
  itemDetails: { flex: 1 },
  itemName: { fontSize: 14, fontWeight: '700', color: COLORS.textPrimary, lineHeight: 20 },
  itemDescription: { fontSize: 12, color: COLORS.textSecondary, marginTop: 4 },
  editText: { fontSize: 12, color: COLORS.primary, marginTop: 8, fontWeight: '600' },
  quantityContainer: { alignItems: 'flex-end', marginLeft: 8 },
  quantityControls: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 8, marginBottom: 8, backgroundColor: '#fff' },
  quantityButton: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  quantityButtonText: { fontSize: 18, color: COLORS.primary, fontWeight: '600' },
  quantityText: { fontSize: 14, fontWeight: '700', color: COLORS.primary, paddingHorizontal: 6 },
  itemPrice: { fontSize: 14, fontWeight: '800', color: COLORS.textPrimary },
  addMoreItems: { paddingVertical: 16, alignItems: 'center' },
  addMoreText: { fontSize: 14, color: COLORS.primary, fontWeight: '700' },
});

export default FoodItems;