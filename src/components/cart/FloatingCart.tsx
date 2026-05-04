// import { useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import React, { useEffect, useMemo, useRef, useState } from 'react';
// import {
//   Animated,
//   Image,
//   Modal,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useGetUserCart } from '../../api/hooks/allCart';
// import { useClearCart } from '../../api/hooks/cart';
// import { COLORS } from '../../theme/color';

// // Define Types for Navigation
// type RootStackParamList = {
//   CheckoutScreen: undefined;
//   AllRestaurantCart: undefined;
//   ProductScreen: { category: string; vendorId: string; vendorName: string; vendorImage: string };
// };

// // Vendor Cart Interface
// interface VendorCart {
//   vendorId: number;
//   vendorName: string;
//   vendorLogo: string;
//   items: any[];
//   totalQuantity: number;
//   totalAmount: number;
// }

// interface FloatingCartProps {
//   onMenuPress?: () => void;
// }

// const FloatingCart: React.FC<FloatingCartProps> = ({ onMenuPress }) => {
//   const [showAllCarts, setShowAllCarts] = useState(false);
//   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

//   const swipeAnim = useRef(new Animated.Value(0)).current;
//   const cartOpacity = useRef(new Animated.Value(1)).current;
//   const cartTranslateY = useRef(new Animated.Value(0)).current;
//   const [isSwiped, setIsSwiped] = useState(false);
//   const [isClearing, setIsClearing] = useState(false);
//   const { mutate: clearCartMutate } = useClearCart();

//   const toggleSwipe = () => {
//     if (isSwiped) {
//       Animated.spring(swipeAnim, {
//         toValue: 0,
//         useNativeDriver: true,
//       }).start();
//       setIsSwiped(false);
//     } else {
//       Animated.spring(swipeAnim, {
//         toValue: -70,
//         useNativeDriver: true,
//       }).start();
//       setIsSwiped(true);
//     }
//   };

//   const handleClearCart = () => {
//     setIsClearing(true);
//     Animated.parallel([
//       Animated.timing(cartOpacity, {
//         toValue: 0,
//         duration: 250,
//         useNativeDriver: true,
//       }),
//       Animated.timing(cartTranslateY, {
//         toValue: 50,
//         duration: 250,
//         useNativeDriver: true,
//       })
//     ]).start(() => {
//       clearCartMutate();
//       setIsSwiped(false);
//       swipeAnim.setValue(0);
//       setIsClearing(false);
//     });
//   };

//   // --- FETCH CART DATA FROM API ---
//   const { data: cartData, isLoading: cartLoading } = useGetUserCart();

//   // --- Group cart items by vendor ---
//   const vendorCarts = useMemo<VendorCart[]>(() => {
//     if (!cartData) return [];

//     let rawItems: any[] = [];

//     // @ts-ignore
//     if (cartData.vendors && Array.isArray(cartData.vendors)) {
//         // @ts-ignore
//         rawItems = cartData.vendors.flatMap(v => v.items.map((item: any) => ({
//           ...item,
//           vendorId: item.vendorId || v.id || v.vendorId, 
//           vendor: v 
//         })));
//     } 
//     else if (cartData.items && Array.isArray(cartData.items)) {
//         rawItems = cartData.items;
//     }

//     if (rawItems.length === 0) return [];

//     const vendorMap = new Map<number, VendorCart>();

//     rawItems.forEach((item: any) => {
//       const vendorId = item.vendorId || item.vendor?.id || 1; 

//       if (!vendorMap.has(vendorId)) {
//         // Logic to grab the first product's image
//         const productImage = item.image?.url || item.product?.image || item.vendor?.images?.url || 'https://via.placeholder.com/100';
        
//         vendorMap.set(vendorId, {
//           vendorId,
//           vendorName: item.vendor?.shopName || item.vendor?.companyName || `Restaurant`,
//           vendorLogo: productImage, // Now stores the product image
//           items: [],
//           totalQuantity: 0,
//           totalAmount: 0,
//         });
//       }

//       const vendor = vendorMap.get(vendorId)!;
//       const displayPrice = item.price?.d?.[0] || item.unitPrice?.d?.[0] || 0;
      
//       vendor.items.push(item);
//       vendor.totalQuantity += item.quantity;
//       vendor.totalAmount += displayPrice * item.quantity;
//     });

//     return Array.from(vendorMap.values());
//   }, [cartData]);

//   const totalCartCount = vendorCarts.reduce((acc, curr) => acc + curr.totalQuantity, 0);
//   const hasMultipleCarts = vendorCarts.length > 1;
//   const hasCartItems = vendorCarts.length > 0;
//   const firstVendorCart = vendorCarts[0];

//   const handleVendorPress = (vendorCart: VendorCart) => {
//     setShowAllCarts(false);
//     navigation.navigate('ProductScreen', {
//       category: 'Cart',
//       vendorId: vendorCart.vendorId.toString(),
//       vendorName: vendorCart.vendorName,
//       vendorImage: vendorCart.vendorLogo,
//     });
//   };

//   useEffect(() => {
//     if (!hasCartItems) {
//       cartOpacity.setValue(1);
//       cartTranslateY.setValue(0);
//       swipeAnim.setValue(0);
//     }
//   }, [hasCartItems]);

//   if (cartLoading || !hasCartItems) {
//     return null; 
//   }

//   return (
//     <>
//       {/* --- FLOATING CART WRAPPER --- */}
//       <Animated.View 
//         pointerEvents={isClearing ? 'none' : 'auto'}
//         style={[styles.floatingWrapper, { opacity: cartOpacity, transform: [{ translateY: cartTranslateY }] }]}
//       >
        
//         {hasMultipleCarts && (
//           <View style={styles.allCartsBadgeContainer}>
//             <TouchableOpacity
//               style={styles.allCartsBadge}
//               activeOpacity={0.9}
//               onPress={() => setShowAllCarts(true)}
//               hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
//             >
//               <Text style={styles.allCartsText}>All carts ({vendorCarts.length})</Text>
//               <Ionicons
//                 name="caret-up-sharp"
//                 size={12}
//                 color={COLORS.primary}
//                 style={{ marginTop: 2, marginLeft: 2 }}
//               />
//             </TouchableOpacity>
//           </View>
//         )}

//         <View style={styles.innerCartContainer}>
//           <TouchableOpacity 
//             style={styles.deleteArea} 
//             onPress={handleClearCart}
//             activeOpacity={0.8}
//           >
//             <Ionicons name="trash-outline" size={22} color="#fff" />
//           </TouchableOpacity>

//           <Animated.View style={[
//             styles.cartContentAnimated,
//             { transform: [{ translateX: swipeAnim }] }
//           ]}>
//             <TouchableOpacity
//               style={styles.cartLeft}
//               onPress={() => handleVendorPress(firstVendorCart)}
//               activeOpacity={0.7}
//             >
//               {/* Added product image here */}
//               <Image source={{ uri: firstVendorCart?.vendorLogo }} style={styles.cartImg} />
//               <View>
//                 <Text style={styles.cartTitle} numberOfLines={1}>{firstVendorCart?.vendorName}</Text>
//                 <Text style={styles.cartSubtitle}>View Menu ➝</Text>
//               </View>
//             </TouchableOpacity>

//             <View style={styles.cartRightSide}>
//               <TouchableOpacity
//                 style={styles.viewCartBtn}
//                 onPress={() => navigation.navigate('CheckoutScreen')}
//               >
//                 <Text style={styles.viewCartText}>View Cart</Text>
//                 <Text style={styles.itemCount}>
//                   {totalCartCount} {totalCartCount === 1 ? 'item' : 'items'}
//                 </Text>
//               </TouchableOpacity>

//               <TouchableOpacity 
//                 style={styles.mainCartCloseBtn}
//                 onPress={toggleSwipe}
//               >
//                 <Ionicons name={isSwiped ? "arrow-forward" : "close"} size={16} color="#555" />
//               </TouchableOpacity>
//             </View>
//           </Animated.View>
//         </View>
//       </Animated.View>

//       {/* --- YOUR CARTS MODAL --- */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={showAllCarts}
//         onRequestClose={() => setShowAllCarts(false)}
//       >
//         <View style={styles.allCartsModalOverlay}>
//           <View style={styles.modalCloseContainer}>
//             <TouchableOpacity
//               style={styles.modalCloseBtn}
//               onPress={() => setShowAllCarts(false)}
//             >
//               <Ionicons name="close" size={24} color="#fff" />
//             </TouchableOpacity>
//           </View>

//           <View style={styles.allCartsModalContent}>
//             <div style={{ marginBottom: 10 }}>
                
//             </div>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Your Carts ({vendorCarts.length})</Text>
//               <TouchableOpacity
//                 style={styles.checkoutAllBtn}
//                 onPress={() => {
//                   setShowAllCarts(false);
//                   navigation.navigate('AllRestaurantCart');
//                 }}
//               >
//                 <Text style={styles.checkoutAllText}>Checkout all</Text>
//                 <Ionicons
//                   name="caret-forward-sharp"
//                   size={14}
//                   color={COLORS.primary}
//                 />
//               </TouchableOpacity>
//             </View>

//             <ScrollView style={styles.cartList} showsVerticalScrollIndicator={false}>
//               {vendorCarts.map((vendorCart) => (
//                 <View key={vendorCart.vendorId} style={styles.cartItemCard}>
//                   <TouchableOpacity
//                     style={styles.cartLeft}
//                     onPress={() => handleVendorPress(vendorCart)}
//                     activeOpacity={0.7}
//                   >
//                     {/* Added product image in modal list */}
//                     <Image source={{ uri: vendorCart.vendorLogo }} style={styles.cartImg} />
//                     <View style={{ flex: 1 }}>
//                       <Text style={styles.cartTitle} numberOfLines={1}>{vendorCart.vendorName}</Text>
//                       <Text style={styles.cartSubtitle}>View Menu ➝</Text>
//                     </View>
//                   </TouchableOpacity>
//                   <View style={styles.cartItemRight}>
//                     <TouchableOpacity
//                       style={styles.viewCartBtnSmall}
//                       onPress={() => {
//                         setShowAllCarts(false);
//                         navigation.navigate('CheckoutScreen');
//                       }}
//                     >
//                       <Text style={styles.viewCartTextSmall}>View Cart</Text>
//                       <Text style={styles.itemCountSmall}>
//                         {vendorCart.totalQuantity} {vendorCart.totalQuantity === 1 ? 'item' : 'items'}
//                       </Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity style={styles.closeCartBtn}>
//                       <Ionicons name="close" size={16} color="#666" />
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               ))}
//             </ScrollView>
//           </View>
//         </View>
//       </Modal>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   floatingWrapper: {
//     position: 'absolute',
//     bottom: 80,
//     width: '90%',
//     alignSelf: 'center',
//     alignItems: 'center',
//     zIndex: 100,
//     elevation: 20,
//   },
//   allCartsBadgeContainer: {
//     position: 'absolute',
//     top: -15,
//     zIndex: 102,
//     elevation: 25,
//   },
//   allCartsBadge: {
//     backgroundColor: '#fff',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 6,
//     borderRadius: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//     elevation: 25,
//     borderWidth: 0.5,
//     borderColor: '#e0e0e0',
//   },
//   allCartsText: {
//     fontSize: 11,
//     fontWeight: '800',
//     color: COLORS.primary,
//     marginRight: 0,
//   },
//   innerCartContainer: {
//     backgroundColor: '#fff',
//     width: '100%',
//     borderRadius: 16,
//     overflow: 'hidden',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 6,
//     elevation: 10,
//     zIndex: 101,
//     borderWidth: 0.5,
//     borderColor: '#f0f0f0',
//     position: 'relative',
//   },
//   cartContentAnimated: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     width: '100%',
//     backgroundColor: '#fff',
//   },
//   deleteArea: {
//     position: 'absolute',
//     right: 0,
//     top: 0,
//     bottom: 0,
//     width: 70,
//     backgroundColor: COLORS.RED,
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 0,
//   },
//   cartLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
//   cartImg: { width: 44, height: 44, borderRadius: 10, marginRight: 12, backgroundColor: '#f9f9f9' },
//   cartTitle: { fontSize: 15, fontWeight: 'bold', color: '#000', maxWidth: 120 },
//   cartSubtitle: { fontSize: 12, color: '#666', marginTop: 2 },
//   cartRightSide: { flexDirection: 'row', alignItems: 'center' },
//   viewCartBtn: {
//     backgroundColor: COLORS.primary,
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'column',
//   },
//   viewCartText: {
//     color: '#fff',
//     fontSize: 12,
//     fontWeight: 'bold',
//     marginBottom: 2,
//     marginRight: 0,
//   },
//   itemCount: {
//     color: '#fff',
//     fontSize: 10,
//     fontWeight: '600',
//   },
//   mainCartCloseBtn: {
//     marginLeft: 10,
//     padding: 4,
//     borderRadius: 50,
//     backgroundColor: '#f2f2f2',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   allCartsModalOverlay: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     backgroundColor: 'rgba(0, 0, 0, 0.7)',
//   },
//   modalCloseContainer: { alignItems: 'center', marginBottom: 15 },
//   modalCloseBtn: {
//     backgroundColor: '#333',
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 1,
//     borderColor: '#555',
//   },
//   allCartsModalContent: {
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 24,
//     borderTopRightRadius: 24,
//     padding: 20,
//     paddingBottom: 30,
//     maxHeight: '60%',
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   modalTitle: { fontSize: 18, fontWeight: '800', color: '#000' },
//   checkoutAllBtn: { flexDirection: 'row', alignItems: 'center' },
//   checkoutAllText: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: COLORS.primary,
//     marginRight: 4,
//   },
//   cartList: {},
//   cartItemCard: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 16,
//     padding: 16,
//     marginBottom: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 4,
//     borderWidth: 0.5,
//     borderColor: '#f0f0f0',
//   },
//   cartItemRight: { flexDirection: 'row', alignItems: 'center' },
//   viewCartBtnSmall: {
//     backgroundColor: COLORS.primary,
//     paddingHorizontal: 14,
//     paddingVertical: 8,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   viewCartTextSmall: { color: '#fff', fontSize: 13, fontWeight: 'bold' },
//   itemCountSmall: { color: '#fff', fontSize: 11 },
//   closeCartBtn: {
//     marginLeft: 12,
//     padding: 6,
//     borderRadius: 50,
//     backgroundColor: '#f8f8f8',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// export default FloatingCart;



import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    Animated,
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useGetUserCart } from '../../api/hooks/allCart';
import { useClearCart } from '../../api/hooks/cart';
import { COLORS } from '../../theme/color';

// Define Types for Navigation
type RootStackParamList = {
  CheckoutScreen: undefined;
  AllRestaurantCart: undefined;
  SingleResturantCart: { vendorId: number | string };
  ProductScreen: { category: string; vendorId: string; vendorName: string; vendorImage: string };
  cart: undefined;
};

// Vendor Cart Interface
interface VendorCart {
  vendorId: number;
  vendorName: string;
  vendorLogo: string;
  productImage: string;
  items: any[];
  totalQuantity: number;
  totalAmount: number;
}

interface FloatingCartProps {
  onMenuPress?: () => void;
}

const FloatingCart: React.FC<FloatingCartProps> = ({ onMenuPress }) => {
  const [showAllCarts, setShowAllCarts] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const swipeAnim = useRef(new Animated.Value(0)).current;
  const cartOpacity = useRef(new Animated.Value(1)).current;
  const cartTranslateY = useRef(new Animated.Value(0)).current;
  const [isSwiped, setIsSwiped] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const { mutate: clearCartMutate } = useClearCart();

  const toggleSwipe = () => {
    if (isSwiped) {
      Animated.spring(swipeAnim, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
      setIsSwiped(false);
    } else {
      Animated.spring(swipeAnim, {
        toValue: -70,
        useNativeDriver: true,
      }).start();
      setIsSwiped(true);
    }
  };

  const handleClearCart = () => {
    setIsClearing(true);
    Animated.parallel([
      Animated.timing(cartOpacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(cartTranslateY, {
        toValue: 50,
        duration: 250,
        useNativeDriver: true,
      })
    ]).start(() => {
      clearCartMutate();
      setIsSwiped(false);
      swipeAnim.setValue(0);
      setIsClearing(false);
    });
  };

  const { data: cartData, isLoading: cartLoading } = useGetUserCart();
  console.log("cartData",cartData)

  const vendorCarts = useMemo<VendorCart[]>(() => {
    if (!cartData) return [];
    let rawItems: any[] = [];
    if (cartData.vendors && Array.isArray(cartData.vendors)) {
        // @ts-ignore
        rawItems = cartData.vendors.flatMap((v: any) => v.items.map((item: any) => ({
          ...item,
          vendorId: item.vendorId || v.vendor?.id || v.id || v.vendorId, 
          vendor: v.vendor || v 
        })));
    } 
    else if (cartData.items && Array.isArray(cartData.items)) {
        rawItems = cartData.items;
    }

    if (rawItems.length === 0) return [];
    const vendorMap = new Map<string, VendorCart>();

    rawItems.forEach((item: any) => {
      const vId = (item.vendorId || item.vendor?.id || 1).toString(); 

      if (!vendorMap.has(vId)) {
        // Robust vendor image extraction
        const vendorData = item.vendor || {};
        const vImages = vendorData.images || vendorData.logo;
        let vLogo = 'https://via.placeholder.com/100';
        
        if (vImages) {
          if (typeof vImages === 'string') vLogo = vImages;
          else if (Array.isArray(vImages) && vImages.length > 0) vLogo = vImages[0].url || vImages[0].image?.url || vImages[0].image || vLogo;
          else if (typeof vImages === 'object') vLogo = vImages.url || vImages.image?.url || vImages.image || vLogo;
        }

        // Robust product image extraction
        const pImages = item.productVariant?.images || item.product?.images || item.product?.image || item.image;
        let pLogo = vLogo; // Fallback to vendor logo

        if (pImages) {
          if (typeof pImages === 'string') pLogo = pImages;
          else if (Array.isArray(pImages) && pImages.length > 0) pLogo = pImages[0].url || pImages[0].image?.url || pImages[0].image || pLogo;
          else if (typeof pImages === 'object') pLogo = pImages.url || pImages.image?.url || pImages.image || pLogo;
        }
        
        vendorMap.set(vId, {
          vendorId: parseInt(vId),
          vendorName: vendorData.shopName || vendorData.companyName || `Restaurant`,
          vendorLogo: vLogo,
          productImage: pLogo,
          items: [],
          totalQuantity: 0,
          totalAmount: 0,
        });
      }

      const vendor = vendorMap.get(vId)!;
      const displayPrice = item.price?.d?.[0] || item.unitPrice?.d?.[0] || parseFloat(item.unitPrice) || parseFloat(item.price) || 0;
      
      vendor.items.push(item);
      vendor.totalQuantity += item.quantity;
      vendor.totalAmount += displayPrice * item.quantity;
    });

    return Array.from(vendorMap.values());
  }, [cartData]);

  const totalCartCount = vendorCarts.reduce((acc, curr) => acc + curr.totalQuantity, 0);
  const hasMultipleCarts = vendorCarts.length > 1;
  const hasCartItems = vendorCarts.length > 0;
  const firstVendorCart = vendorCarts[0];

  const handleVendorPress = (vendorCart: VendorCart) => {
    setShowAllCarts(false);
    navigation.navigate('ProductScreen', {
      category: 'Cart',
      vendorId: vendorCart.vendorId.toString(),
      vendorName: vendorCart.vendorName,
      vendorImage: vendorCart.vendorLogo,
    });
  };

  useEffect(() => {
    if (!hasCartItems) {
      cartOpacity.setValue(1);
      cartTranslateY.setValue(0);
      swipeAnim.setValue(0);
    }
  }, [hasCartItems]);

  if (cartLoading || !hasCartItems) {
    return null; 
  }

  return (
    <>
      <Animated.View 
        pointerEvents={isClearing ? 'none' : 'auto'}
        style={[styles.floatingWrapper, { opacity: cartOpacity, transform: [{ translateY: cartTranslateY }] }]}
      >
        <View style={styles.innerCartContainer}>
          <TouchableOpacity 
            style={styles.deleteArea} 
            onPress={handleClearCart}
            activeOpacity={0.8}
          >
            <Ionicons name="trash-outline" size={22} color="#fff" />
          </TouchableOpacity>

          <Animated.View style={[
            styles.cartContentAnimated,
            { transform: [{ translateX: swipeAnim }] }
          ]}>
            <TouchableOpacity
              style={styles.cartLeft}
              onPress={() => hasMultipleCarts ? setShowAllCarts(true) : handleVendorPress(firstVendorCart)}
              activeOpacity={0.7}
            >
              <Image source={{ uri: firstVendorCart?.productImage }} style={styles.cartImg} />
              <View>
                <Text style={styles.cartTitle} numberOfLines={1}>{firstVendorCart?.vendorName}</Text>
                {hasMultipleCarts ? (
                  <View style={{ marginTop: 2, flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[styles.cartSubtitle, { color: COLORS.primary, fontWeight: '700' }]}>
                      See all vendors ({vendorCarts.length})
                    </Text>
                    <Ionicons name="chevron-up" size={12} color={COLORS.primary} style={{ marginLeft: 2, marginTop: 1 }} />
                  </View>
                ) : (
                  <Text style={styles.cartSubtitle}>View Menu ➝</Text>
                )}
              </View>
            </TouchableOpacity>

            <View style={styles.cartRightSide}>
              <TouchableOpacity
                style={styles.viewCartBtn}
                onPress={() => navigation.navigate('SingleResturantCart', { vendorId: firstVendorCart.vendorId })}
              >
                <Text style={styles.viewCartText}>View Cart</Text>
                <Text style={styles.itemCount}>
                  {totalCartCount} {totalCartCount === 1 ? 'item' : 'items'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.mainCartCloseBtn}
                onPress={toggleSwipe}
              >
                <Ionicons name={isSwiped ? "arrow-forward" : "close"} size={16} color="#555" />
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Animated.View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showAllCarts}
        onRequestClose={() => setShowAllCarts(false)}
      >
        <View style={styles.allCartsModalOverlay}>
          <View style={styles.modalCloseContainer}>
            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() => setShowAllCarts(false)}
            >
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.allCartsModalContent}>
            <View style={{ marginBottom: 10 }} />
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Your Carts ({vendorCarts.length})</Text>
              <TouchableOpacity
                style={styles.checkoutAllBtn}
                onPress={() => {
                  setShowAllCarts(false);
                  navigation.navigate('cart');
                }}
              >
                <Text style={styles.checkoutAllText}>Checkout all</Text>
                <Ionicons
                  name="caret-forward-sharp"
                  size={14}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.cartList} showsVerticalScrollIndicator={false}>
              {vendorCarts.map((vendorCart) => (
                <View key={vendorCart.vendorId} style={styles.cartItemCard}>
                  <TouchableOpacity
                    style={styles.cartLeft}
                    onPress={() => handleVendorPress(vendorCart)}
                    activeOpacity={0.7}
                  >
                    <Image source={{ uri: vendorCart.productImage }} style={styles.cartImg} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.cartTitle} numberOfLines={1}>{vendorCart.vendorName}</Text>
                      <Text style={styles.cartSubtitle}>View Menu ➝</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={styles.cartItemRight}>
                    <TouchableOpacity
                      style={styles.viewCartBtnSmall}
                      onPress={() => {
                        setShowAllCarts(false);
                        navigation.navigate('SingleResturantCart', { vendorId: vendorCart.vendorId });
                      }}
                    >
                      <Text style={styles.viewCartTextSmall}>View Cart</Text>
                      <Text style={styles.itemCountSmall}>
                        {vendorCart.totalQuantity} {vendorCart.totalQuantity === 1 ? 'item' : 'items'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  floatingWrapper: {
    position: 'absolute',
    bottom: 80,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    zIndex: 100,
    elevation: 20,
  },
  allCartsBadgeContainer: {
    position: 'absolute',
    top: -15,
    zIndex: 102,
    elevation: 25,
  },
  allCartsBadge: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 25,
    borderWidth: 0.5,
    borderColor: '#e0e0e0',
  },
  allCartsText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.primary,
    marginRight: 0,
  },
  innerCartContainer: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 10,
    zIndex: 101,
    borderWidth: 0.5,
    borderColor: '#f0f0f0',
    position: 'relative',
  },
  cartContentAnimated: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: '100%',
    backgroundColor: '#fff',
  },
  deleteArea: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 70,
    backgroundColor: COLORS.RED,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
  },
  cartLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  
  cartImg: { 
    width: 44, 
    height: 44, 
    borderRadius: 12, 
    marginRight: 12, // restored margin directly on image
    resizeMode: 'cover' 
  },
  // -------------------------------

  cartTitle: { fontSize: 15, fontWeight: 'bold', color: '#000', maxWidth: 120 },
  cartSubtitle: { fontSize: 12, color: '#666', marginTop: 2 },
  cartRightSide: { flexDirection: 'row', alignItems: 'center' },
  viewCartBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  viewCartText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
    marginRight: 0,
  },
  itemCount: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  mainCartCloseBtn: {
    marginLeft: 10,
    padding: 4,
    borderRadius: 50,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  allCartsModalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalCloseContainer: { alignItems: 'center', marginBottom: 15 },
  modalCloseBtn: {
    backgroundColor: '#333',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#555',
  },
  allCartsModalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 30,
    maxHeight: '60%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: { fontSize: 18, fontWeight: '800', color: '#000' },
  checkoutAllBtn: { flexDirection: 'row', alignItems: 'center' },
  checkoutAllText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginRight: 4,
  },
  cartList: {},
  cartItemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 0.5,
    borderColor: '#f0f0f0',
  },
  cartItemRight: { flexDirection: 'row', alignItems: 'center' },
  viewCartBtnSmall: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewCartTextSmall: { color: '#fff', fontSize: 13, fontWeight: 'bold' },
  itemCountSmall: { color: '#fff', fontSize: 11 },
  closeCartBtn: {
    marginLeft: 12,
    padding: 6,
    borderRadius: 50,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FloatingCart;