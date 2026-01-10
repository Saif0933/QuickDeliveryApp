
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
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { COLORS } from '../../theme/color';
import { useGetUserCart, useAddToCart, useRemoveCartItem } from '../../api/hooks/allCart';

interface FlexibleCartItem {
  id: number;
  quantity: number;
  vendorId: number;
  vendorProductId: number;
  productVariantId?: number;
  notes?: string;
  price?: { d: number[] };
  unitPrice?: { d: number[] };
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

const FoodItems: React.FC = () => {
  const { data: cartData, isLoading } = useGetUserCart();
  
  const { mutate: addToCart } = useAddToCart();
  const { mutate: removeCartItem } = useRemoveCartItem();

  // --- FIXED DATA LOGIC ---
  const cartItems = useMemo(() => {
    if (!cartData) return [];

    let processedItems: FlexibleCartItem[] = [];

    // SCENARIO 1: Data is nested in 'vendors' (e.g. { vendors: [...] })
    // @ts-ignore
    if (cartData.vendors && Array.isArray(cartData.vendors)) {
       // @ts-ignore
       processedItems = cartData.vendors.flatMap(vendor => {
         // 1. Get Parent Vendor ID (Fallback to 1 if missing)
         const parentVendorId = vendor.id || vendor.vendorId || 1;

         return vendor.items.map((item: any) => ({
           ...item,
           // 2. Attach ID to item
           vendorId: item.vendorId || parentVendorId, 
         }));
       });
    }
    // SCENARIO 2: Data is flat in 'items' (e.g. { items: [...] })
    else if (cartData.items && Array.isArray(cartData.items)) {
       processedItems = cartData.items.map((item: any) => ({
           ...item,
           // 3. Fallback to 1 if vendorId is missing in the item
           vendorId: item.vendorId || 1 
       }));
    }

    return processedItems;
  }, [cartData]);

  const handleQuantityChange = (item: FlexibleCartItem, change: number) => {
    // Debug Logs
    console.log(`Action: ${change > 0 ? 'Add' : 'Remove'} | Item: ${item.product?.name}`);
    console.log(`Payload IDs -> VendorID: ${item.vendorId}, ProductID: ${item.vendorProductId}`);

    // Validation
    if (!item.vendorId || !item.vendorProductId) {
      console.error("❌ ERROR: Still missing IDs after fix.");
      return;
    }

    // 1. REMOVE ITEM LOGIC (If Qty is 1 and user clicks -)
    if (change === -1 && item.quantity === 1) {
        removeCartItem(item.id);
        return;
    }

    // 2. UPDATE QUANTITY LOGIC
    addToCart({
        vendorId: item.vendorId, // Now guaranteed to be at least 1
        vendorProductId: item.vendorProductId,
        productVariantId: item.productVariantId || undefined,
        quantity: change, // +1 or -1
        notes: item.notes
    });
  };

  if (isLoading) {
    return (
      <View style={[styles.itemsContainer, { alignItems: 'center', padding: 20 }]}>
        <ActivityIndicator size="small" color={COLORS.primary} />
      </View>
    );
  }

  if (cartItems.length === 0) {
    return (
        <View style={[styles.itemsContainer, { paddingVertical: 20 }]}>
            <Text style={{textAlign: 'center', color: COLORS.textSecondary}}>Your cart is empty</Text>
        </View>
    );
  }

  return (
    <View style={styles.itemsContainer}>
      {cartItems.map((item: FlexibleCartItem) => {
        const productName = item.product?.name || "Unknown Item";
        const priceObj = item.unitPrice || item.price;
        const priceValue = priceObj?.d?.[0] || 0;
        const quantity = item.quantity;
        
        // Image Logic
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
       <TouchableOpacity style={styles.addMoreItems}>
        <Text style={styles.addMoreText}>+ Add more items</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemsContainer: { paddingHorizontal: 16, marginTop: 16 },
  foodItem: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: COLORS.background },
  imageContainer: { marginRight: 12 },
  foodImage: { width: 60, height: 60, borderRadius: 8, backgroundColor: '#eee' },
  itemDetails: { flex: 1 },
  itemName: { fontSize: 14, fontWeight: '500', color: COLORS.textPrimary, lineHeight: 20 },
  itemDescription: { fontSize: 12, color: COLORS.textSecondary, marginTop: 4 },
  editText: { fontSize: 12, color: COLORS.primary, marginTop: 8, fontWeight: '500' },
  quantityContainer: { alignItems: 'flex-end', marginLeft: 8 },
  quantityControls: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: COLORS.primary, borderRadius: 4, marginBottom: 8 },
  quantityButton: { width: 30, height: 30, alignItems: 'center', justifyContent: 'center' },
  quantityButtonText: { fontSize: 18, color: COLORS.primary, fontWeight: '600' },
  quantityText: { fontSize: 14, fontWeight: '500', color: COLORS.primary, paddingHorizontal: 8 },
  itemPrice: { fontSize: 12, fontWeight: '800', color: COLORS.textPrimary },
  addMoreItems: { paddingVertical: 16 },
  addMoreText: { fontSize: 14, color: COLORS.primary, fontWeight: '500' },
});

export default FoodItems;