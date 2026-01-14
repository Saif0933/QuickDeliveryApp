// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   TextInput,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// // --- Colors ---
// const COLORS = {
//   primary: '#E23744',
//   blueBanner: '#EAF2FF',
//   blueText: '#2D74D4',
//   greenBanner: '#F0FFF4',
//   greenText: '#24963F',
//   pinkBanner: '#FFF5F6',
//   pinkText: '#E23744',
//   textPrimary: '#1C1C1C',
//   textSecondary: '#686B78',
//   border: '#E0E0E0',
//   background: '#F4F5F8',
//   white: '#FFFFFF',
// };

// const CheckoutScreen = () => {
//   // --- State for Items (To handle Quantity) ---
//   const [cartItems, setCartItems] = useState([
//     {
//       id: 1,
//       restaurant: 'Pizza Hut',
//       name: 'Create Your Flavour Fun Combo - Box Of 2 - Veg Pizza',
//       description: 'Classic Onion Capsicum, Classic Onion Capsicum',
//       price: 218,
//       isVeg: true,
//       quantity: 1,
//     },
//     {
//       id: 2,
//       restaurant: 'Subway',
//       name: 'B.M.T Sandwich',
//       description: '15cm, White Italian 15cm, Toasted with Cheese Slice, Lettuce, Tomato, Cucumber, ... more',
//       price: 299,
//       isVeg: false,
//       quantity: 1,
//     },
//   ]);

//   const [donationAmount, setDonationAmount] = useState('3');

//   // --- Handlers ---
//   const handleIncrement = (id) => {
//     setCartItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id ? { ...item, quantity: item.quantity + 1 } : item
//       )
//     );
//   };

//   const handleDecrement = (id) => {
//     setCartItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id && item.quantity > 1
//           ? { ...item, quantity: item.quantity - 1 }
//           : item
//       )
//     );
//   };

//   // --- Reusable Components ---
//   const SectionHeader = ({ title, onRemove }) => (
//     <View style={styles.sectionHeader}>
//       <View style={styles.restaurantInfo}>
//         <Image
//           source={{ uri: 'https://tse2.mm.bing.net/th/id/OIP.0iYgWz7L7lH85KkR7b4Z5wHaFj?pid=Api&rs=1' }} 
//           style={styles.restaurantLogo}
//         />
//         <View>
//           <Text style={styles.restaurantName}>{title}</Text>
//           <Text style={styles.deliveryTime}>25-30 mins</Text>
//         </View>
//       </View>
//       <TouchableOpacity onPress={onRemove}>
//         <Text style={styles.removeText}>Remove</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   // Updated OrderItem to accept quantity and handlers
//   const OrderItem = ({ item, onInc, onDec }) => (
//     <View style={styles.orderItemContainer}>
//       <View style={styles.itemDetails}>
//         <View style={styles.vegNonVegIcon}>
//           <MaterialCommunityIcons
//             name="square-rounded"
//             size={16}
//             color={item.isVeg ? 'green' : 'red'}
//           />
//           <View style={[styles.innerDot, { backgroundColor: item.isVeg ? 'green' : 'red' }]} />
//         </View>
//         <View style={{ flex: 1 }}>
//           <Text style={styles.itemName}>{item.name}</Text>
//           <Text style={styles.itemDescription} numberOfLines={2}>
//             {item.description}
//           </Text>
//           <TouchableOpacity>
//             <Text style={styles.editText}>Edit ›</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//       <View style={styles.priceQuantityContainer}>
        
//         {/* Quantity Controls */}
//         <View style={styles.quantityContainer}>
//           <TouchableOpacity style={styles.qtyBtn} onPress={onDec}>
//             <Text style={styles.qtyBtnText}>-</Text>
//           </TouchableOpacity>
//           <Text style={styles.qtyText}>{item.quantity}</Text>
//           <TouchableOpacity style={styles.qtyBtn} onPress={onInc}>
//             <Text style={styles.qtyBtnText}>+</Text>
//           </TouchableOpacity>
//         </View>

//         <Text style={styles.itemPrice}>₹{item.price * item.quantity}</Text>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {/* --- Header --- */}
//       <View style={styles.header}>
//         <TouchableOpacity>
//           <Ionicons name="arrow-back" size={24} color="black" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>2 restaurants</Text>
//       </View>

//       <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
//         {/* --- Savings Banner --- */}
//         <View style={styles.savingsBanner}>
//           <MaterialCommunityIcons name="party-popper" size={20} color={COLORS.blueText} />
//           <Text style={styles.savingsText}>You saved ₹13 on this order</Text>
//         </View>

//         {/* --- Delivery Note --- */}
//         <View style={styles.deliveryNoteBanner}>
//           <Text style={styles.deliveryNoteText}>
//             Order will arrive in 2 separate deliveries
//           </Text>
//         </View>

//         {/* --- Special Offer --- */}
//         <View style={styles.specialOfferBanner}>
//           <View style={styles.offerContent}>
//             <Image
//               source={{ uri: 'https://via.placeholder.com/40' }} 
//               style={styles.offerIcon}
//             />
//             <View style={{ flex: 1 }}>
//               <Text style={styles.offerTitle}>Special offer for you</Text>
//               <Text style={styles.offerDescription}>
//                 ₹100 OFF on booking movie tickets on the District app
//               </Text>
//               <TouchableOpacity>
//                 <Text style={styles.offerLink}>
//                   Claim voucher after order is placed
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//           <View style={styles.offerStatus}>
//             <Text style={styles.offerAdded}>ADDED</Text>
//             <Text style={styles.offerValue}>
//               <Text style={{ textDecorationLine: 'line-through' }}>₹100</Text> FREE
//             </Text>
//           </View>
//         </View>

//         {/* --- Pizza Hut Order (Using State Item 1) --- */}
//         <View style={styles.restaurantSection}>
//           <SectionHeader title="Pizza Hut" onRemove={() => {}} />
//           <OrderItem
//             item={cartItems[0]}
//             onInc={() => handleIncrement(1)}
//             onDec={() => handleDecrement(1)}
//           />
//           <TouchableOpacity style={styles.addMoreBtn}>
//             <Text style={styles.addMoreText}>+ Add more items</Text>
//           </TouchableOpacity>
//           <View style={styles.noteContainer}>
//             <MaterialCommunityIcons name="file-document-outline" size={20} color="#888" />
//             <TextInput
//               placeholder="Add a note for the restaurant"
//               style={styles.noteInput}
//             />
//           </View>
//         </View>

//         {/* --- Subway Order (Using State Item 2) --- */}
//         <View style={styles.restaurantSection}>
//           <SectionHeader title="Subway" onRemove={() => {}} />
//           <OrderItem
//             item={cartItems[1]}
//             onInc={() => handleIncrement(2)}
//             onDec={() => handleDecrement(2)}
//           />
//           <TouchableOpacity style={styles.addMoreBtn}>
//             <Text style={styles.addMoreText}>+ Add more items</Text>
//           </TouchableOpacity>
//           <View style={styles.noteContainer}>
//             <MaterialCommunityIcons name="file-document-outline" size={20} color="#888" />
//             <TextInput
//               placeholder="Add a note for the restaurant"
//               style={styles.noteInput}
//             />
//           </View>
//         </View>

//         {/* --- Bill Details --- */}
//         <View style={styles.billDetailsSection}>
//           <TouchableOpacity style={styles.couponContainer}>
//             <MaterialCommunityIcons name="ticket-percent-outline" size={24} color={COLORS.primary} />
//             <View style={{ flex: 1, marginLeft: 12 }}>
//               <Text style={styles.couponTitle}>Save ₹170 with 2 coupons</Text>
//               <Text style={styles.couponSubtitle}>View all coupons ›</Text>
//             </View>
//             <TouchableOpacity style={styles.applyBtn}>
//               <Text style={styles.applyBtnText}>APPLY</Text>
//             </TouchableOpacity>
//           </TouchableOpacity>

//           <View style={styles.billRow}>
//             <MaterialCommunityIcons name="moped" size={20} color="#888" />
//             <Text style={styles.billLabel}>2 separate deliveries</Text>
//             <Ionicons name="chevron-forward" size={20} color="#888" />
//           </View>

//           <View style={styles.billRow}>
//             <MaterialCommunityIcons name="receipt" size={20} color="#888" />
//             <Text style={styles.billLabel}>Total Bill</Text>
//             <Text style={styles.billValue}>
//               <Text style={{ textDecorationLine: 'line-through', color: '#888' }}>₹680.30</Text> ₹667.80
//             </Text>
//           </View>
//           <Text style={styles.totalSaved}>You saved ₹13</Text>
//           <Text style={styles.inclTaxes}>Incl. taxes and charges</Text>
//         </View>

//         {/* --- Donate to Feeding India (MATCHED TO IMAGE) --- */}
//         <View style={styles.donationSection}>
//           <View style={styles.donationHeader}>
//              <View style={{flex: 1}}>
//                 <Text style={styles.donationTitle}>Donate to Feeding India</Text>
//                 <Text style={styles.donationDescription}>
//                   Help us reduce food waste by avoiding cancellations after placing...
//                 </Text>
//              </View>
             
//              {/* Feeding India Control */}
//              <View style={styles.feedingIndiaControl}>
//                 <View style={styles.feedingAmountBox}>
//                    <Text style={styles.feedingCurrency}>₹</Text>
//                    <TextInput 
//                       value={donationAmount}
//                       onChangeText={setDonationAmount}
//                       style={styles.feedingInput}
//                       keyboardType="numeric"
//                    />
//                    <TouchableOpacity>
//                       <MaterialCommunityIcons name="pencil-outline" size={12} color="#333" />
//                    </TouchableOpacity>
//                 </View>
//                 <TouchableOpacity style={styles.feedingAddBtn}>
//                    <Text style={styles.feedingAddText}>ADD</Text>
//                 </TouchableOpacity>
//              </View>
//           </View>
//         </View>

//         {/* --- Cancellation Policy --- */}
//         <View style={styles.policySection}>
//           <Text style={styles.policyTitle}>CANCELLATION POLICY</Text>
//           <Text style={styles.policyText}>
//             Help us reduce food waste by avoiding cancellations after placing your
//             order. A 100% cancellation fee will be applied.
//           </Text>
//         </View>
        
//         <View style={{height: 100}} /> 
//       </ScrollView>

//       {/* --- Bottom Button --- */}
//       <View style={styles.bottomContainer}>
//         <View style={styles.walletBalance}>
//             <Text style={styles.walletText}>Zomato Money Balance: ₹0 • </Text>
//             <TouchableOpacity><Text style={styles.addMoneyText}>Add money</Text></TouchableOpacity>
//         </View>
//         <TouchableOpacity style={styles.placeOrderBtn}>
//           <Text style={styles.placeOrderBtnText}>Select address at next step ›</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// // --- Styles ---
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//     backgroundColor: COLORS.white,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.border,
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginLeft: 16,
//     color: COLORS.textPrimary,
//   },
//   scrollView: {
//     flex: 1,
//   },
//   savingsBanner: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: COLORS.blueBanner,
//     padding: 12,
//   },
//   savingsText: {
//     color: COLORS.blueText,
//     fontWeight: 'bold',
//     marginLeft: 8,
//   },
//   deliveryNoteBanner: {
//     backgroundColor: COLORS.greenBanner,
//     padding: 12,
//     alignItems: 'center',
//   },
//   deliveryNoteText: {
//     color: COLORS.greenText,
//     fontWeight: 'bold',
//   },
//   specialOfferBanner: {
//     backgroundColor: COLORS.pinkBanner,
//     padding: 16,
//     margin: 16,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#F8E1E4',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   offerContent: {
//     flexDirection: 'row',
//     flex: 1,
//   },
//   offerIcon: {
//     width: 40,
//     height: 40,
//     marginRight: 12,
//   },
//   offerTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: COLORS.textPrimary,
//   },
//   offerDescription: {
//     fontSize: 12,
//     color: COLORS.textSecondary,
//     marginTop: 4,
//   },
//   offerLink: {
//     fontSize: 12,
//     color: COLORS.blueText,
//     marginTop: 4,
//   },
//   offerStatus: {
//     alignItems: 'flex-end',
//   },
//   offerAdded: {
//     fontSize: 12,
//     fontWeight: 'bold',
//     color: COLORS.pinkText,
//     backgroundColor: '#FAD4D8',
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 4,
//     marginBottom: 4,
//   },
//   offerValue: {
//     fontSize: 12,
//     color: COLORS.textPrimary,
//   },
//   restaurantSection: {
//     backgroundColor: COLORS.white,
//     padding: 16,
//     marginBottom: 16,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   restaurantInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   restaurantLogo: {
//     width: 40,
//     height: 40,
//     borderRadius: 8,
//     marginRight: 12,
//   },
//   restaurantName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: COLORS.textPrimary,
//   },
//   deliveryTime: {
//     fontSize: 12,
//     color: COLORS.textSecondary,
//   },
//   removeText: {
//     fontSize: 12,
//     color: COLORS.textSecondary,
//   },
//   orderItemContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 16,
//   },
//   itemDetails: {
//     flexDirection: 'row',
//     flex: 1,
//   },
//   vegNonVegIcon: {
//     position: 'relative',
//     marginRight: 8,
//     marginTop: 2,
//   },
//   innerDot: {
//     position: 'absolute',
//     top: 4,
//     left: 4,
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//   },
//   itemName: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: COLORS.textPrimary,
//   },
//   itemDescription: {
//     fontSize: 12,
//     color: COLORS.textSecondary,
//     marginTop: 4,
//   },
//   editText: {
//     fontSize: 12,
//     color: COLORS.blueText,
//     marginTop: 4,
//     fontWeight: 'bold',
//   },
//   priceQuantityContainer: {
//     alignItems: 'flex-end',
//   },
//   quantityContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#e23744', // Pink/Red border
//     backgroundColor: '#fff5f6', // Light pink background
//     borderRadius: 6,
//     paddingVertical: 4,
//     paddingHorizontal: 8,
//     marginBottom: 8,
//   },
//   qtyBtn: {
//     paddingHorizontal: 8,
//   },
//   qtyBtnText: {
//     fontSize: 16,
//     color: COLORS.pinkText,
//     fontWeight: 'bold',
//   },
//   qtyText: {
//     fontSize: 14,
//     color: COLORS.pinkText,
//     fontWeight: 'bold',
//     marginHorizontal: 8,
//   },
//   itemPrice: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: COLORS.textPrimary,
//   },
//   addMoreBtn: {
//     marginBottom: 16,
//   },
//   addMoreText: {
//     fontSize: 14,
//     color: COLORS.pinkText,
//     fontWeight: 'bold',
//   },
//   noteContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     borderRadius: 8,
//     paddingHorizontal: 12,
//   },
//   noteInput: {
//     flex: 1,
//     marginLeft: 8,
//     fontSize: 14,
//     paddingVertical: 10,
//   },
//   billDetailsSection: {
//     backgroundColor: COLORS.white,
//     padding: 16,
//     marginBottom: 16,
//   },
//   couponContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 16,
//     borderStyle: 'dashed',
//   },
//   couponTitle: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: COLORS.textPrimary,
//   },
//   couponSubtitle: {
//     fontSize: 12,
//     color: COLORS.textSecondary,
//   },
//   applyBtn: {
//     paddingVertical: 4,
//     paddingHorizontal: 8,
//   },
//   applyBtnText: {
//     fontSize: 14,
//     color: COLORS.pinkText,
//     fontWeight: 'bold',
//   },
//   billRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   billLabel: {
//     flex: 1,
//     fontSize: 14,
//     color: COLORS.textPrimary,
//     marginLeft: 12,
//   },
//   billValue: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: COLORS.textPrimary,
//   },
//   totalSaved: {
//     fontSize: 12,
//     color: COLORS.blueText,
//     backgroundColor: COLORS.blueBanner,
//     alignSelf: 'flex-start',
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 4,
//     marginLeft: 32,
//     marginBottom: 4,
//   },
//   inclTaxes: {
//     fontSize: 12,
//     color: COLORS.textSecondary,
//     marginLeft: 32,
//   },
  
//   // --- DONATION STYLES (MATCHING IMAGE) ---
//   donationSection: {
//     backgroundColor: COLORS.white,
//     padding: 16,
//     marginBottom: 16,
//   },
//   donationHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//   },
//   donationTitle: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: COLORS.textPrimary,
//     marginBottom: 4,
//   },
//   donationDescription: {
//     fontSize: 12,
//     color: COLORS.textSecondary,
//     lineHeight: 16,
//     width: '90%',
//   },
//   feedingIndiaControl: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//     borderRadius: 8,
//     height: 36,
//     overflow: 'hidden',
//   },
//   feedingAmountBox: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 8,
//     borderRightWidth: 1,
//     borderRightColor: '#e0e0e0',
//     backgroundColor: '#fff',
//     height: '100%',
//   },
//   feedingCurrency: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   feedingInput: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#333',
//     width: 20,
//     textAlign: 'center',
//     padding: 0, 
//   },
//   feedingAddBtn: {
//     paddingHorizontal: 12,
//     height: '100%',
//     justifyContent: 'center',
//     backgroundColor: '#fff', 
//   },
//   feedingAddText: {
//     fontSize: 12,
//     fontWeight: 'bold',
//     color: COLORS.primary,
//   },

//   policySection: {
//     backgroundColor: COLORS.white,
//     padding: 16,
//     marginBottom: 16,
//   },
//   policyTitle: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: COLORS.textSecondary,
//     marginBottom: 8,
//   },
//   policyText: {
//     fontSize: 12,
//     color: COLORS.textSecondary,
//     lineHeight: 18,
//   },
//   bottomContainer: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: COLORS.white,
//     padding: 16,
//     borderTopWidth: 1,
//     borderTopColor: COLORS.border,
//   },
//     walletBalance: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginBottom: 12
//   },
//   walletText: {
//       fontSize: 12,
//       color: COLORS.textSecondary
//   },
//   addMoneyText: {
//       fontSize: 12,
//       fontWeight: 'bold',
//       color: COLORS.textPrimary
//   },
//   placeOrderBtn: {
//     backgroundColor: COLORS.primary,
//     paddingVertical: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   placeOrderBtnText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: COLORS.white,
//   },
// });

// export default CheckoutScreen;


import React, { useState } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// --- New Theme Colors ---
export const COLORS = {
  primary: '#0049AD',      // Deep Purple (for buttons, highlights)
  accent: '#9facf8ff',     // Lavender (hover, subtle accents)
  secondary: '#b6d2f8ff',  // Soft Pink (for backgrounds, cards)
  highlight: '#52b957ff',  // Coral/Peach (alerts, badges) - Used for Veg/Success
  background: '#fafafa',   // Default background
  white: '#ffffff',        // White color
  textPrimary: '#222222',  // Main text
  textSecondary: '#4a4a4a',// Secondary text
  muted: '#888888',        // Muted text or icons
  yelow: '#fbc02d',        // Gold/Yellow color
  black: '#000000',
  RED: '#b91c1c',          // Red color (Non-Veg)
  TEXT_DARK: '#1F2937',
  SOFT_BLUE: "#DBEAFE",
  SOFT_RED: "#FEE2E2",
  SOFT_GREEN: "#DCFCE7",
  LITE_GRAY: "#9ca3af",
};

// --- TypeScript Interfaces ---
interface CartItem {
  id: number;
  restaurant: string;
  name: string;
  description: string;
  price: number;
  isVeg: boolean;
  quantity: number;
}

interface OrderItemProps {
  item: CartItem;
  onInc: () => void;
  onDec: () => void;
}

interface SectionHeaderProps {
  title: string;
  onRemove: () => void;
}

const CheckoutScreen = () => {
  // --- State for Items ---
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      restaurant: 'Pizza Hut',
      name: 'Create Your Flavour Fun Combo - Box Of 2 - Veg Pizza',
      description: 'Classic Onion Capsicum, Classic Onion Capsicum',
      price: 218,
      isVeg: true,
      quantity: 1,
    },
    {
      id: 2,
      restaurant: 'Subway',
      name: 'B.M.T Sandwich',
      description: '15cm, White Italian 15cm, Toasted with Cheese Slice, Lettuce, Tomato, Cucumber, ... more',
      price: 299,
      isVeg: false,
      quantity: 1,
    },
  ]);

  const [donationAmount, setDonationAmount] = useState('3');

  // --- Handlers ---
  const handleIncrement = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // --- Reusable Components ---
  const SectionHeader = ({ title, onRemove }: SectionHeaderProps) => (
    <View style={styles.sectionHeader}>
      <View style={styles.restaurantInfo}>
        <Image
          source={{ uri: 'https://tse2.mm.bing.net/th/id/OIP.0iYgWz7L7lH85KkR7b4Z5wHaFj?pid=Api&rs=1' }} 
          style={styles.restaurantLogo}
        />
        <View>
          <Text style={styles.restaurantName}>{title}</Text>
          <Text style={styles.deliveryTime}>25-30 mins</Text>
        </View>
      </View>
      <TouchableOpacity onPress={onRemove}>
        <Text style={styles.removeText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  // --- Fixed OrderItem with Types ---
  const OrderItem = ({ item, onInc, onDec }: OrderItemProps) => (
    <View style={styles.orderItemContainer}>
      <View style={styles.itemDetails}>
        <View style={styles.vegNonVegIcon}>
          <MaterialCommunityIcons
            name="square-rounded"
            size={16}
            color={item.isVeg ? COLORS.highlight : COLORS.RED}
          />
          <View style={[styles.innerDot, { backgroundColor: item.isVeg ? COLORS.highlight : COLORS.RED }]} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemDescription} numberOfLines={2}>
            {item.description}
          </Text>
          <TouchableOpacity>
            <Text style={styles.editText}>Edit ›</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.priceQuantityContainer}>
        
        {/* Quantity Controls */}
        <View style={styles.quantityContainer}>
          <TouchableOpacity style={styles.qtyBtn} onPress={onDec}>
            <Text style={styles.qtyBtnText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qtyText}>{item.quantity}</Text>
          <TouchableOpacity style={styles.qtyBtn} onPress={onInc}>
            <Text style={styles.qtyBtnText}>+</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.itemPrice}>₹{item.price * item.quantity}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* --- Header --- */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>2 restaurants</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* --- Savings Banner --- */}
        <View style={styles.savingsBanner}>
          <MaterialCommunityIcons name="party-popper" size={20} color={COLORS.primary} />
          <Text style={styles.savingsText}>You saved ₹13 on this order</Text>
        </View>

        {/* --- Delivery Note --- */}
        <View style={styles.deliveryNoteBanner}>
          <Text style={styles.deliveryNoteText}>
            Order will arrive in 2 separate deliveries
          </Text>
        </View>

        {/* --- Special Offer --- */}
        <View style={styles.specialOfferBanner}>
          <View style={styles.offerContent}>
            <Image
              source={{ uri: 'https://via.placeholder.com/40' }} 
              style={styles.offerIcon}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.offerTitle}>Special offer for you</Text>
              <Text style={styles.offerDescription}>
                ₹100 OFF on booking movie tickets on the District app
              </Text>
              <TouchableOpacity>
                <Text style={styles.offerLink}>
                  Claim voucher after order is placed
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.offerStatus}>
            <Text style={styles.offerAdded}>ADDED</Text>
            <Text style={styles.offerValue}>
              <Text style={{ textDecorationLine: 'line-through' }}>₹100</Text> FREE
            </Text>
          </View>
        </View>

        {/* --- Pizza Hut Order (Using State Item 1) --- */}
        <View style={styles.restaurantSection}>
          <SectionHeader title="Pizza Hut" onRemove={() => {}} />
          <OrderItem
            item={cartItems[0]}
            onInc={() => handleIncrement(1)}
            onDec={() => handleDecrement(1)}
          />
          <TouchableOpacity style={styles.addMoreBtn}>
            <Text style={styles.addMoreText}>+ Add more items</Text>
          </TouchableOpacity>
          <View style={styles.noteContainer}>
            <MaterialCommunityIcons name="file-document-outline" size={20} color={COLORS.muted} />
            <TextInput
              placeholder="Add a note for the restaurant"
              placeholderTextColor={COLORS.muted}
              style={styles.noteInput}
            />
          </View>
        </View>

        {/* --- Subway Order (Using State Item 2) --- */}
        <View style={styles.restaurantSection}>
          <SectionHeader title="Subway" onRemove={() => {}} />
          <OrderItem
            item={cartItems[1]}
            onInc={() => handleIncrement(2)}
            onDec={() => handleDecrement(2)}
          />
          <TouchableOpacity style={styles.addMoreBtn}>
            <Text style={styles.addMoreText}>+ Add more items</Text>
          </TouchableOpacity>
          <View style={styles.noteContainer}>
            <MaterialCommunityIcons name="file-document-outline" size={20} color={COLORS.muted} />
            <TextInput
              placeholder="Add a note for the restaurant"
              placeholderTextColor={COLORS.muted}
              style={styles.noteInput}
            />
          </View>
        </View>

        {/* --- Bill Details --- */}
        <View style={styles.billDetailsSection}>
          <TouchableOpacity style={styles.couponContainer}>
            <MaterialCommunityIcons name="ticket-percent-outline" size={24} color={COLORS.primary} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.couponTitle}>Save ₹170 with 2 coupons</Text>
              <Text style={styles.couponSubtitle}>View all coupons ›</Text>
            </View>
            <TouchableOpacity style={styles.applyBtn}>
              <Text style={styles.applyBtnText}>APPLY</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          <View style={styles.billRow}>
            <MaterialCommunityIcons name="moped" size={20} color={COLORS.muted} />
            <Text style={styles.billLabel}>2 separate deliveries</Text>
            <Ionicons name="chevron-forward" size={20} color={COLORS.muted} />
          </View>

          <View style={styles.billRow}>
            <MaterialCommunityIcons name="receipt" size={20} color={COLORS.muted} />
            <Text style={styles.billLabel}>Total Bill</Text>
            <Text style={styles.billValue}>
              <Text style={{ textDecorationLine: 'line-through', color: COLORS.muted }}>₹680.30</Text> ₹667.80
            </Text>
          </View>
          <Text style={styles.totalSaved}>You saved ₹13</Text>
          <Text style={styles.inclTaxes}>Incl. taxes and charges</Text>
        </View>

        {/* --- Donate to Feeding India --- */}
        <View style={styles.donationSection}>
          <View style={styles.donationHeader}>
             <View style={{flex: 1}}>
                <Text style={styles.donationTitle}>Donate to Feeding India</Text>
                <Text style={styles.donationDescription}>
                  Help us reduce food waste by avoiding cancellations after placing...
                </Text>
             </View>
             
             {/* Feeding India Control */}
             <View style={styles.feedingIndiaControl}>
                <View style={styles.feedingAmountBox}>
                   <Text style={styles.feedingCurrency}>₹</Text>
                   <TextInput 
                      value={donationAmount}
                      onChangeText={setDonationAmount}
                      style={styles.feedingInput}
                      keyboardType="numeric"
                   />
                   <TouchableOpacity>
                      <MaterialCommunityIcons name="pencil-outline" size={12} color={COLORS.textPrimary} />
                   </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.feedingAddBtn}>
                   <Text style={styles.feedingAddText}>ADD</Text>
                </TouchableOpacity>
             </View>
          </View>
        </View>

        {/* --- Cancellation Policy --- */}
        <View style={styles.policySection}>
          <Text style={styles.policyTitle}>CANCELLATION POLICY</Text>
          <Text style={styles.policyText}>
            Help us reduce food waste by avoiding cancellations after placing your
            order. A 100% cancellation fee will be applied.
          </Text>
        </View>
        
        <View style={{height: 100}} /> 
      </ScrollView>

      {/* --- Bottom Button --- */}
      <View style={styles.bottomContainer}>
        <View style={styles.walletBalance}>
            <Text style={styles.walletText}>Zomato Money Balance: ₹0 • </Text>
            <TouchableOpacity><Text style={styles.addMoneyText}>Add money</Text></TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.placeOrderBtn}>
          <Text style={styles.placeOrderBtnText}>Select address at next step ›</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// --- Styles with New Theme ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
    color: COLORS.textPrimary,
  },
  scrollView: {
    flex: 1,
  },
  savingsBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.SOFT_BLUE,
    padding: 12,
  },
  savingsText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  deliveryNoteBanner: {
    backgroundColor: COLORS.SOFT_GREEN,
    padding: 12,
    alignItems: 'center',
  },
  deliveryNoteText: {
    color: COLORS.highlight,
    fontWeight: 'bold',
  },
  specialOfferBanner: {
    backgroundColor: COLORS.SOFT_RED,
    padding: 16,
    margin: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F8E1E4',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  offerContent: {
    flexDirection: 'row',
    flex: 1,
  },
  offerIcon: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  offerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  offerDescription: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  offerLink: {
    fontSize: 12,
    color: COLORS.primary,
    marginTop: 4,
  },
  offerStatus: {
    alignItems: 'flex-end',
  },
  offerAdded: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.primary,
    backgroundColor: COLORS.white,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 4,
  },
  offerValue: {
    fontSize: 12,
    color: COLORS.textPrimary,
  },
  restaurantSection: {
    backgroundColor: COLORS.white,
    padding: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  restaurantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  restaurantLogo: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  deliveryTime: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  removeText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  orderItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  itemDetails: {
    flexDirection: 'row',
    flex: 1,
  },
  vegNonVegIcon: {
    position: 'relative',
    marginRight: 8,
    marginTop: 2,
  },
  innerDot: {
    position: 'absolute',
    top: 4,
    left: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  itemDescription: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  editText: {
    fontSize: 12,
    color: COLORS.primary,
    marginTop: 4,
    fontWeight: 'bold',
  },
  priceQuantityContainer: {
    alignItems: 'flex-end',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.background,
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  qtyBtn: {
    paddingHorizontal: 8,
  },
  qtyBtnText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  qtyText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginHorizontal: 8,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  addMoreBtn: {
    marginBottom: 16,
  },
  addMoreText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  noteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.LITE_GRAY,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  noteInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    paddingVertical: 10,
    color: COLORS.textPrimary
  },
  billDetailsSection: {
    backgroundColor: COLORS.white,
    padding: 16,
    marginBottom: 16,
  },
  couponContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.LITE_GRAY,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderStyle: 'dashed',
  },
  couponTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  couponSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  applyBtn: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  applyBtnText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  billRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  billLabel: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textPrimary,
    marginLeft: 12,
  },
  billValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  totalSaved: {
    fontSize: 12,
    color: COLORS.primary,
    backgroundColor: COLORS.SOFT_BLUE,
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 32,
    marginBottom: 4,
  },
  inclTaxes: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginLeft: 32,
  },
  
  // --- DONATION STYLES ---
  donationSection: {
    backgroundColor: COLORS.white,
    padding: 16,
    marginBottom: 16,
  },
  donationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  donationTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  donationDescription: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 16,
    width: '90%',
  },
  feedingIndiaControl: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.LITE_GRAY,
    borderRadius: 8,
    height: 36,
    overflow: 'hidden',
  },
  feedingAmountBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    borderRightWidth: 1,
    borderRightColor: COLORS.LITE_GRAY,
    backgroundColor: '#fff',
    height: '100%',
  },
  feedingCurrency: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  feedingInput: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    width: 20,
    textAlign: 'center',
    padding: 0, 
  },
  feedingAddBtn: {
    paddingHorizontal: 12,
    height: '100%',
    justifyContent: 'center',
    backgroundColor: '#fff', 
  },
  feedingAddText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.primary,
  },

  policySection: {
    backgroundColor: COLORS.white,
    padding: 16,
    marginBottom: 16,
  },
  policyTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  policyText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
    walletBalance: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12
  },
  walletText: {
      fontSize: 12,
      color: COLORS.textSecondary
  },
  addMoneyText: {
      fontSize: 12,
      fontWeight: 'bold',
      color: COLORS.textPrimary
  },
  placeOrderBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  placeOrderBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});

export default CheckoutScreen;