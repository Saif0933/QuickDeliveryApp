import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../theme/color';
import { useGetUserCart } from '../../api/hooks/allCart';

// Define Types for Navigation
type RootStackParamList = {
  CheckoutScreen: undefined;
  AllRestaurantCart: undefined;
  ProductScreen: { vendorId: string; vendorName: string; vendorImage: string };
};

// Vendor Cart Interface
interface VendorCart {
  vendorId: number;
  vendorName: string;
  vendorLogo: string;
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

  // --- FETCH CART DATA FROM API ---
  const { data: cartData, isLoading: cartLoading } = useGetUserCart();

  // --- FIXED: Group cart items by vendor (Handles both Vendors and Items structure) ---
  const vendorCarts = useMemo<VendorCart[]>(() => {
    if (!cartData) return [];

    let rawItems: any[] = [];

    // FIX 1: Check if data is inside 'vendors' array (Nested Structure)
    // @ts-ignore
    if (cartData.vendors && Array.isArray(cartData.vendors)) {
       // @ts-ignore
       rawItems = cartData.vendors.flatMap(v => v.items.map((item: any) => ({
         ...item,
         // Ensure vendorId is attached from parent if missing in item
         vendorId: item.vendorId || v.id || v.vendorId, 
         vendor: v // Attach vendor object for details
       })));
    } 
    // FIX 2: Check if data is directly in 'items' array (Flat Structure)
    else if (cartData.items && Array.isArray(cartData.items)) {
       rawItems = cartData.items;
    }

    if (rawItems.length === 0) return [];

    const vendorMap = new Map<number, VendorCart>();

    rawItems.forEach((item: any) => {
      // Robust Vendor ID check
      const vendorId = item.vendorId || item.vendor?.id || 1; 

      if (!vendorMap.has(vendorId)) {
        vendorMap.set(vendorId, {
          vendorId,
          vendorName: item.vendor?.shopName || item.vendor?.companyName || `Restaurant`,
          vendorLogo: item.vendor?.images?.url || 'https://via.placeholder.com/100',
          items: [],
          totalQuantity: 0,
          totalAmount: 0,
        });
      }

      const vendor = vendorMap.get(vendorId)!;
      // Price handling
      const displayPrice = item.price?.d?.[0] || item.unitPrice?.d?.[0] || 0;
      
      vendor.items.push(item);
      vendor.totalQuantity += item.quantity;
      vendor.totalAmount += displayPrice * item.quantity;
    });

    return Array.from(vendorMap.values());
  }, [cartData]);

  // Cart counts and visibility
  const totalCartCount = vendorCarts.reduce((acc, curr) => acc + curr.totalQuantity, 0);
  const hasMultipleCarts = vendorCarts.length > 1;
  const hasCartItems = vendorCarts.length > 0;

  // First vendor for floating cart display
  const firstVendorCart = vendorCarts[0];

  // Handle menu press
  const handleVendorPress = (vendorCart: VendorCart) => {
    setShowAllCarts(false);
    navigation.navigate('ProductScreen', {
      vendorId: vendorCart.vendorId.toString(),
      vendorName: vendorCart.vendorName,
      vendorImage: vendorCart.vendorLogo,
    });
  };

  // Don't render if cart is empty or loading
  if (cartLoading) {
    return null; 
  }

  if (!hasCartItems) {
    return null; 
  }

  return (
    <>
      {/* --- FLOATING CART WRAPPER --- */}
      <View style={styles.floatingWrapper}>
        
        {/* LOGIC: All Carts Badge - Shows vendor count when > 1 */}
        {hasMultipleCarts && (
          <View style={styles.allCartsBadgeContainer}>
            <TouchableOpacity
              style={styles.allCartsBadge}
              activeOpacity={0.9}
              onPress={() => setShowAllCarts(true)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={styles.allCartsText}>All carts ({vendorCarts.length})</Text>
              <Ionicons
                name="caret-up-sharp"
                size={12}
                color={COLORS.primary}
                style={{ marginTop: 2, marginLeft: 2 }}
              />
            </TouchableOpacity>
          </View>
        )}

        {/* Inner Cart Content */}
        <View style={styles.innerCartContainer}>
          <TouchableOpacity
            style={styles.cartLeft}
            onPress={() => handleVendorPress(firstVendorCart)}
            activeOpacity={0.7}
          >
            <Image source={{ uri: firstVendorCart?.vendorLogo }} style={styles.cartImg} />
            <View>
              <Text style={styles.cartTitle} numberOfLines={1}>{firstVendorCart?.vendorName}</Text>
              <Text style={styles.cartSubtitle}>View Menu ➝</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.cartRightSide}>
            <TouchableOpacity
              style={styles.viewCartBtn}
              onPress={() => navigation.navigate('CheckoutScreen')}
            >
              <Text style={styles.viewCartText}>View Cart</Text>
              <Text style={styles.itemCount}>
                {totalCartCount} {totalCartCount === 1 ? 'item' : 'items'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.mainCartCloseBtn}>
              <Ionicons name="close" size={16} color="#555" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* --- YOUR CARTS MODAL --- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showAllCarts}
        onRequestClose={() => setShowAllCarts(false)}
      >
        <View style={styles.allCartsModalOverlay}>
          {/* Floating Close Button for Modal */}
          <View style={styles.modalCloseContainer}>
            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() => setShowAllCarts(false)}
            >
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.allCartsModalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Your Carts ({vendorCarts.length})</Text>
              <TouchableOpacity
                style={styles.checkoutAllBtn}
                onPress={() => {
                  setShowAllCarts(false);
                  navigation.navigate('AllRestaurantCart');
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
              {/* Dynamic Vendor Carts */}
              {vendorCarts.map((vendorCart) => (
                <View key={vendorCart.vendorId} style={styles.cartItemCard}>
                  <TouchableOpacity
                    style={styles.cartLeft}
                    onPress={() => handleVendorPress(vendorCart)}
                    activeOpacity={0.7}
                  >
                    <Image source={{ uri: vendorCart.vendorLogo }} style={styles.cartImg} />
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
                        navigation.navigate('CheckoutScreen');
                      }}
                    >
                      <Text style={styles.viewCartTextSmall}>View Cart</Text>
                      <Text style={styles.itemCountSmall}>
                        {vendorCart.totalQuantity} {vendorCart.totalQuantity === 1 ? 'item' : 'items'}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.closeCartBtn}>
                      <Ionicons name="close" size={16} color="#666" />
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
  // --- MAIN WRAPPER ---
  floatingWrapper: {
    position: 'absolute',
    bottom: 80,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    zIndex: 100,
    elevation: 20,
  },
  
  // --- BADGE CONTAINER ---
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

  // --- INNER CART ---
  innerCartContainer: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 10,
    zIndex: 101,
    borderWidth: 0.5,
    borderColor: '#f0f0f0',
  },

  cartLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  cartImg: { width: 44, height: 44, borderRadius: 10, marginRight: 12 },
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

  // --- MODAL STYLES ---
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

// import { useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import React, { useMemo, useState } from 'react';
// import {
//   Image,
//   Modal,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   ActivityIndicator
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useGetUserCart } from '../../api/hooks/allCart'; 
// import { COLORS } from '../../theme/color';

// // --- TYPES ---
// type RootStackParamList = {
//   CheckoutScreen: undefined;
//   AllRestaurantCart: undefined;
//   ProductScreen: { vendorId: string; vendorName: string; vendorImage: string };
// };

// interface VendorCart {
//   vendorId: number;
//   vendorName: string;
//   vendorLogo: string;
//   items: any[];
//   totalQuantity: number;
//   totalAmount: number;
// }

// const FloatingCart: React.FC = () => {
//   const [showAllCarts, setShowAllCarts] = useState(false);
//   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

//   // --- 1. CONNECT TO BACKEND ---
//   const { data: cartData, isLoading } = useGetUserCart();

//   // --- 2. GROUP ITEMS BY VENDOR ---
//   const vendorCarts = useMemo<VendorCart[]>(() => {
//     if (!cartData) return [];

//     const vendorMap = new Map<number, VendorCart>();
//     let rawItems: any[] = [];

//     // Handle nested 'vendors' array or flat 'items' array
//     // @ts-ignore
//     if (cartData.vendors && Array.isArray(cartData.vendors)) {
//        // @ts-ignore
//        rawItems = cartData.vendors.flatMap(v => v.items.map((item: any) => ({ ...item, vendor: v })));
//     } else if (cartData.items && Array.isArray(cartData.items)) {
//        rawItems = cartData.items;
//     }

//     if (rawItems.length === 0) return [];

//     rawItems.forEach((item: any) => {
//       const vendorId = item.vendorId || item.vendor?.id || 1; 

//       if (!vendorMap.has(vendorId)) {
//         vendorMap.set(vendorId, {
//           vendorId,
//           vendorName: item.vendor?.shopName || item.vendor?.companyName || `Restaurant`,
//           vendorLogo: item.vendor?.images?.url || 'https://via.placeholder.com/100',
//           items: [],
//           totalQuantity: 0,
//           totalAmount: 0,
//         });
//       }

//       const vendor = vendorMap.get(vendorId)!;
//       const priceVal = item.price?.d?.[0] || item.unitPrice?.d?.[0] || 0;
      
//       vendor.items.push(item);
//       vendor.totalQuantity += item.quantity;
//       vendor.totalAmount += priceVal * item.quantity;
//     });

//     return Array.from(vendorMap.values());
//   }, [cartData]);

//   // --- 3. CALCULATE TOTALS ---
//   const totalCartCount = vendorCarts.reduce((acc, curr) => acc + curr.totalQuantity, 0);
//   const hasMultipleCarts = vendorCarts.length > 1;
//   const firstVendorCart = vendorCarts[0];

//   // --- NAVIGATION HANDLERS ---
//   const handleVendorPress = (vendorCart: VendorCart) => {
//     setShowAllCarts(false);
//     navigation.navigate('ProductScreen', {
//       vendorId: vendorCart.vendorId.toString(),
//       vendorName: vendorCart.vendorName,
//       vendorImage: vendorCart.vendorLogo,
//     });
//   };

//   const handleCheckoutAll = () => {
//     setShowAllCarts(false);
//     navigation.navigate('AllRestaurantCart');
//   };

//   const handleSingleCheckout = () => {
//     navigation.navigate('CheckoutScreen');
//   };

//   if (isLoading || vendorCarts.length === 0) return null;

//   return (
//     <>
//       {/* ================= FLOATING CART BAR (Home Screen) ================= */}
//       <View style={styles.floatingWrapper}>
        
//         {/* "All Carts" Pill Badge (Matches Image ii.jpeg) */}
//         {hasMultipleCarts && (
//           <View style={styles.allCartsBadgeContainer}>
//             <TouchableOpacity
//               style={styles.allCartsBadge}
//               activeOpacity={0.9}
//               onPress={() => setShowAllCarts(true)}
//             >
//               <Text style={styles.allCartsText}>All carts <Text style={{color: COLORS.primary}}>▴</Text></Text>
//             </TouchableOpacity>
//           </View>
//         )}

//         {/* Main Cart Content */}
//         <View style={styles.innerCartContainer}>
//           {/* Left: Image & Text */}
//           <TouchableOpacity
//             style={styles.cartLeft}
//             onPress={() => handleVendorPress(firstVendorCart)}
//             activeOpacity={0.7}
//           >
//             <Image source={{ uri: firstVendorCart?.vendorLogo }} style={styles.cartImg} />
//             <View>
//               <Text style={styles.cartTitle} numberOfLines={1}>{firstVendorCart?.vendorName}</Text>
//               <Text style={styles.cartSubtitle}>
//                 View Menu <Text style={{color: COLORS.primary, fontWeight:'bold'}}>›</Text>
//               </Text>
//             </View>
//           </TouchableOpacity>

//           {/* Right: Buttons */}
//           <View style={styles.cartRightSide}>
//             {/* Red "View Cart" Button */}
//             <TouchableOpacity
//               style={styles.viewCartBtn}
//               onPress={handleSingleCheckout}
//               activeOpacity={0.8}
//             >
//               <Text style={styles.viewCartText}>View Cart</Text>
//               <Text style={styles.itemCount}>
//                 {totalCartCount} {totalCartCount === 1 ? 'item' : 'items'}
//               </Text>
//             </TouchableOpacity>

//             {/* Circular Close Button */}
//             <TouchableOpacity style={styles.closeBtnCircle}>
//               <Ionicons name="close" size={16} color="#555" />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>

//       {/* ================= "YOUR CARTS" MODAL (Matches Image ee.jpeg) ================= */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={showAllCarts}
//         onRequestClose={() => setShowAllCarts(false)}
//       >
//         <View style={styles.modalOverlay}>
          
//           {/* Close Modal Button (Floating above) */}
//           <View style={styles.modalCloseContainer}>
//             <TouchableOpacity style={styles.modalCloseX} onPress={() => setShowAllCarts(false)}>
//               <Ionicons name="close" size={20} color="#fff" />
//             </TouchableOpacity>
//           </View>

//           <View style={styles.modalContent}>
//             {/* Modal Header */}
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Your Carts ({vendorCarts.length})</Text>
              
//               <TouchableOpacity style={styles.checkoutAllBtn} onPress={handleCheckoutAll}>
//                 <Text style={styles.checkoutAllText}>Checkout all <Text style={{fontSize:16}}>›</Text></Text>
//               </TouchableOpacity>
//             </View>

//             {/* List of Carts */}
//             <ScrollView showsVerticalScrollIndicator={false}>
//               {vendorCarts.map((vendorCart) => (
//                 <View key={vendorCart.vendorId} style={styles.modalCartItem}>
                  
//                   {/* Left Side */}
//                   <TouchableOpacity
//                     style={styles.cartLeft}
//                     onPress={() => handleVendorPress(vendorCart)}
//                   >
//                     <Image source={{ uri: vendorCart.vendorLogo }} style={styles.cartImg} />
//                     <View style={{ flex: 1 }}>
//                       <Text style={styles.cartTitle} numberOfLines={1}>{vendorCart.vendorName}</Text>
//                       <Text style={styles.cartSubtitle}>
//                         View Menu <Text style={{color: COLORS.primary, fontWeight:'bold'}}>›</Text>
//                       </Text>
//                     </View>
//                   </TouchableOpacity>
                  
//                   {/* Right Side */}
//                   <View style={styles.cartRightSide}>
//                     <TouchableOpacity
//                       style={styles.viewCartBtn}
//                       onPress={handleSingleCheckout}
//                     >
//                       <Text style={styles.viewCartText}>View Cart</Text>
//                       <Text style={styles.itemCount}>
//                         {vendorCart.totalQuantity} {vendorCart.totalQuantity === 1 ? 'item' : 'items'}
//                       </Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity style={styles.closeBtnCircle}>
//                       <Ionicons name="close" size={16} color="#555" />
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               ))}
//               <View style={{height: 20}} />
//             </ScrollView>
//           </View>
//         </View>
//       </Modal>
//     </>
//   );
// };

// // --- STYLES (MATCHING IMAGES) ---
// const styles = StyleSheet.create({
//   // Main Wrapper
//   floatingWrapper: {
//     position: 'absolute',
//     bottom: 80, // Adjust based on your bottom tab height
//     width: '94%',
//     alignSelf: 'center',
//     zIndex: 100,
//   },

//   // "All Carts" Pill Badge
//   allCartsBadgeContainer: {
//     alignItems: 'center',
//     marginBottom: -12, // Pulls it down to overlap slightly
//     zIndex: 90,
//   },
//   allCartsBadge: {
//     backgroundColor: '#fff',
//     paddingHorizontal: 16,
//     paddingVertical: 6,
//     borderRadius: 20,
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     shadowOffset: { width: 0, height: 2 },
//   },
//   allCartsText: {
//     fontSize: 12,
//     fontWeight: '700',
//     color: '#E23744', // Red text like image
//   },

//   // Inner Card Style
//   innerCartContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 16,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: 12,
//     elevation: 10,
//     shadowColor: '#000',
//     shadowOpacity: 0.15,
//     shadowRadius: 8,
//     shadowOffset: { width: 0, height: 4 },
//   },

//   // Left Content
//   cartLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//     marginRight: 8,
//   },
//   cartImg: {
//     width: 40,
//     height: 40,
//     borderRadius: 8,
//     marginRight: 10,
//     backgroundColor: '#eee',
//   },
//   cartTitle: {
//     fontSize: 15,
//     fontWeight: '700',
//     color: '#000',
//     marginBottom: 2,
//   },
//   cartSubtitle: {
//     fontSize: 12,
//     color: '#333',
//     fontWeight: '500',
//   },

//   // Right Content (Buttons)
//   cartRightSide: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   viewCartBtn: {
//     backgroundColor: COLORS.primary || '#E23744', // Use standard Red if primary is different
//     borderRadius: 8,
//     paddingHorizontal: 14,
//     paddingVertical: 6,
//     alignItems: 'center',
//     justifyContent: 'center',
//     minWidth: 90,
//   },
//   viewCartText: {
//     color: '#fff',
//     fontSize: 13,
//     fontWeight: '700',
//     marginBottom: 0,
//   },
//   itemCount: {
//     color: '#fff',
//     fontSize: 10,
//     opacity: 0.9,
//     fontWeight: '600',
//   },
//   closeBtnCircle: {
//     marginLeft: 10,
//     width: 28,
//     height: 28,
//     borderRadius: 14,
//     backgroundColor: '#f2f2f2',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   // --- MODAL STYLES ---
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.6)',
//     justifyContent: 'flex-end',
//   },
//   modalCloseContainer: {
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   modalCloseX: {
//     backgroundColor: '#333',
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 1,
//     borderColor: '#555',
//   },
//   modalContent: {
//     backgroundColor: '#F4F6F8', // Slightly grey bg for modal list
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     padding: 16,
//     maxHeight: '70%',
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: '800',
//     color: '#000',
//   },
//   checkoutAllBtn: {
//     backgroundColor: '#fff',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 6,
//     borderWidth: 1,
//     borderColor: COLORS.primary || '#E23744',
//   },
//   checkoutAllText: {
//     color: COLORS.primary || '#E23744',
//     fontWeight: '700',
//     fontSize: 12,
//   },
  
//   // Modal Items
//   modalCartItem: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 12,
//     marginBottom: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowRadius: 2,
//     shadowOffset: { width: 0, height: 1 },
//   }
// });

// export default FloatingCart;