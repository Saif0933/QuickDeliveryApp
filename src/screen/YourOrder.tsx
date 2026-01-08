
// // OrdersScreen.tsx
// import React, { useState } from "react";
// import {
//   Alert,
//   FlatList,
//   Image,
//   Share,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   Modal,
//   TouchableWithoutFeedback,
//   Dimensions // Import Dimensions
// } from "react-native";
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Ionicons from "react-native-vector-icons/Ionicons";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import { useGetAllOrders } from "../api/hooks/order.service";
// import { COLORS } from '../theme/color';

// // --- THEME COLORS ---
// const BG_COLOR = '#F5F7FA';
// const CARD_BG = '#FFFFFF';
// const TEXT_DARK = '#1F2937';
// const TEXT_GREY = '#9CA3AF';

// interface Order {
//   id: string;
//   restaurant: string;
//   location: string;
//   menu: string;
//   items: string;
//   date: string;
//   price: string;
//   status: "Delivered" | "Payment failed" | "Refund completed";
//   image: string;
//   extra?: string;
// }

// const YourOrders = ({ navigation }: any) => {
//   const [orders, setOrders] = useState<Order[]>([
//     {
//       id: "1",
//       restaurant: "Pizza Hut",
//       location: "Bariatu, Ranchi",
//       menu: "View menu",
//       items: "1 x Create Your Flavour Fun Combo - Classic Onion Capsicum",
//       date: "17 Feb, 4:15 PM",
//       price: "₹191.92",
//       status: "Delivered",
//       image: "https://tse2.mm.bing.net/th/id/OIP.3Dh9FWm684Jc41gmv8eZHwHaEE?pid=Api&P=0&h=180",
//     },
//     {
//       id: "2",
//       restaurant: "Pizza Hut",
//       location: "Bariatu, Ranchi",
//       menu: "View menu",
//       items: "1 x Create Your Flavour Fun Combo - Classic Onion Capsicum",
//       date: "17 Feb, 4:15 PM",
//       price: "₹191.92",
//       status: "Payment failed",
//       image: "https://tse1.mm.bing.net/th/id/OIP.y9WHqmBEubDgxpHWqRN9sAHaEO?pid=Api&P=0&h=180",
//     },
//     {
//       id: "3",
//       restaurant: "Kolkata@99",
//       location: "Sector 5, Salt Lake, Kolkata",
//       menu: "View menu",
//       items: "1 x Gulab Jamun [8 Pieces]",
//       date: "31 Jan, 2:30 AM",
//       price: "₹203.80",
//       status: "Refund completed",
//       extra: "Ref ID: 503108693626",
//       image:
//         "https://tse2.mm.bing.net/th/id/OIP.zec59lWeYML7_-wwsSYBHAHaE8?pid=Api&P=0&h=180",
//     },
//   ]);
//   const [searchQuery, setSearchQuery] = useState("");

//   // --- POPUP MENU STATE ---
//   const [menuVisible, setMenuVisible] = useState(false);
//   const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });
//   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

//   // Filter orders based on search
//   const filteredOrders = orders.filter(
//     (order) =>
//       order.restaurant.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       order.items.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       order.location.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Go back on arrow press
//   const handleGoBack = () => {
//     navigation.goBack();
//   };

//   // Delete Order
//   const handleDelete = (id: string) => {
//     Alert.alert("Delete Order", "Are you sure you want to delete this order?", [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Delete",
//         style: "destructive",
//         onPress: () => setOrders(orders.filter((o) => o.id !== id)),
//       },
//     ]);
//   };

//   // View Order Details
//   const handleDetails = (order: Order) => {
//     Alert.alert(
//       "Order Details",
//       `${order.items}\n\n${order.date}\n${order.price}\nStatus: ${order.status}`
//     );
//   };

//   // Share Restaurant
//   const handleShare = async (restaurant: string, location: string) => {
//     try {
//       await Share.share({
//         message: `Check out ${restaurant} located at ${location}!`,
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // --- API INTEGRATION ---
//   const { data: orderData, isLoading } = useGetAllOrders({});
//   // console.log(orderData); // Commented out to reduce noise

//   // Status Badge Component
//   const StatusBadge = ({ status, extra }: { status: Order["status"]; extra?: string }) => {
//     let containerStyle = styles.badgeDefault;
//     let textStyle = styles.badgeTextDefault;
//     let iconName = "information-circle";
//     let iconColor = "#666";

//     switch (status) {
//       case "Delivered":
//         containerStyle = styles.badgeDelivered;
//         textStyle = styles.badgeTextDelivered;
//         iconName = "checkmark-circle";
//         iconColor = "#15803d"; // Green
//         break;
//       case "Payment failed":
//         containerStyle = styles.badgeFailed;
//         textStyle = styles.badgeTextFailed;
//         iconName = "alert-circle";
//         iconColor = "#b91c1c"; // Red
//         break;
//       case "Refund completed":
//         containerStyle = styles.badgeRefund;
//         textStyle = styles.badgeTextRefund;
//         iconName = "wallet";
//         iconColor = "#1d4ed8"; // Blue
//         break;
//     }

//     return (
//       <View>
//         <View style={containerStyle}>
//           <Ionicons name={iconName} size={14} color={iconColor} style={{ marginRight: 6 }} />
//           <Text style={textStyle}>{status}</Text>
//         </View>
//         {extra && <Text style={styles.extraText}>{extra}</Text>}
//       </View>
//     );
//   };

//   const renderOrder = ({ item }: { item: Order }) => (
//     <View style={styles.orderItem}>
      
//       {/* Top Row: Restaurant Info */}
//       <View style={styles.headerRow}>
//         <View style={styles.restaurantContainer}>
//           <Image source={{ uri: item.image }} style={styles.logo} />
//           <View style={styles.textContainer}>
//             <Text style={styles.restaurantName}>{item.restaurant}</Text>
//             <Text style={styles.locationText}>{item.location}</Text>
//           </View>
//         </View>

//         {/* --- MODIFIED: THREE DOT BUTTON --- */}
//         <TouchableOpacity
//           style={styles.optionsButton}
//           onPress={(event) => {
//             // Get click coordinates to position the popup
//             const { pageY } = event.nativeEvent;
//             setMenuPosition({ top: pageY, right: 30 }); // 30 is approx margin
//             setSelectedOrder(item);
//             setMenuVisible(true);
//           }}
//         >
//           <MaterialCommunityIcons name="dots-vertical" size={20} color={COLORS.muted} />
//         </TouchableOpacity>
//         {/* ---------------------------------- */}
//       </View>

//       {/* Dashed Divider */}
//       <View style={styles.dashedDivider}>
//         {Array.from({ length: 20 }).map((_, i) => (
//             <View key={i} style={styles.dash} />
//         ))}
//       </View>

//       {/* Items & Date */}
//       <View style={styles.detailsContainer}>
//         <Text style={styles.itemsText} numberOfLines={2}>
//           {item.items}
//         </Text>
//         <Text style={styles.dateText}>{item.date}</Text>
//       </View>

//       {/* Footer: Price, Status & Reorder */}
//       <View style={styles.footerRow}>
//         <View style={styles.statusWrapper}>
//             <Text style={styles.priceText}>{item.price}</Text>
//             <View style={{marginTop: 6}}>
//                 <StatusBadge status={item.status} extra={item.extra} />
//             </View>
//         </View>

//         <TouchableOpacity style={styles.reorderBtn} activeOpacity={0.8}>
//           <Text style={styles.reorderText}>Reorder</Text>
//           <Ionicons name="refresh" size={16} color="#FFF" style={{marginLeft: 4}}/>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   // Empty State
//   const renderEmptyState = () => (
//     <View style={styles.emptyContainer}>
//       <View style={styles.emptyIconBg}>
//         <Ionicons name="fast-food-outline" size={50} color={COLORS.muted} />
//       </View>
//       <Text style={styles.emptyTitle}>No orders found</Text>
//       <Text style={styles.emptySubtitle}>
//         Looks like you haven't ordered anything yet.
//       </Text>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
//           <Ionicons name="arrow-back" size={24} color={TEXT_DARK} />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Orders</Text>
//       </View>

//       {/* Floating Search Bar */}
//       <View style={styles.searchContainer}>
//         <View style={styles.searchBar}>
//           <Ionicons name="search" size={20} color={TEXT_GREY} />
//           <TextInput
//             placeholder="Search orders..."
//             style={styles.searchInput}
//             value={searchQuery}
//             onChangeText={setSearchQuery}
//             placeholderTextColor={TEXT_GREY}
//           />
//           {searchQuery ? (
//             <TouchableOpacity onPress={() => setSearchQuery("")}>
//               <Ionicons name="close-circle" size={18} color={TEXT_GREY} />
//             </TouchableOpacity>
//           ) : null}
//         </View>
//       </View>

//       {/* Orders List */}
//       <FlatList
//         data={filteredOrders}
//         renderItem={renderOrder}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={styles.listContainer}
//         ListEmptyComponent={renderEmptyState}
//         showsVerticalScrollIndicator={false}
//       />

//       {/* --- POPUP MENU MODAL --- */}
//       <Modal
//         visible={menuVisible}
//         transparent={true}
//         animationType="fade"
//         onRequestClose={() => setMenuVisible(false)}
//       >
//         <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
//           <View style={styles.modalOverlay}>
//             <View 
//               style={[
//                 styles.popupMenu, 
//                 { top: menuPosition.top + 10, right: menuPosition.right } // Adjust position
//               ]}
//             >
//               {/* Option 1: Share restaurant */}
//               <TouchableOpacity 
//                 style={styles.popupMenuItem}
//                 onPress={() => {
//                   setMenuVisible(false);
//                   if (selectedOrder) handleShare(selectedOrder.restaurant, selectedOrder.location);
//                 }}
//               >
//                 <Ionicons name="arrow-redo-outline" size={20} color={TEXT_DARK} />
//                 <Text style={styles.popupMenuText}>Share restaurant</Text>
//               </TouchableOpacity>

//               {/* Option 2: Order details */}
//               <TouchableOpacity 
//                 style={styles.popupMenuItem}
//                 onPress={() => {
//                   setMenuVisible(false);
//                   if (selectedOrder) handleDetails(selectedOrder);
//                 }}
//               >
//                 <Ionicons name="receipt-outline" size={20} color={TEXT_DARK} />
//                 <Text style={styles.popupMenuText}>Order details</Text>
//               </TouchableOpacity>

//               {/* Option 3: Delete this order */}
//               <TouchableOpacity 
//                 style={styles.popupMenuItem}
//                 onPress={() => {
//                   setMenuVisible(false);
//                   if (selectedOrder) handleDelete(selectedOrder.id);
//                 }}
//               >
//                 <Ionicons name="trash-outline" size={20} color={TEXT_DARK} />
//                 <Text style={styles.popupMenuText}>Delete this order</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </TouchableWithoutFeedback>
//       </Modal>

//     </SafeAreaView>
//   );
// };

// export default YourOrders;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.white,
//   },
  
//   /* Header */
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 20,
//     paddingVertical: 14,
//     backgroundColor: COLORS.white,
//   },
//   backButton: {
//     padding: 8,
//     borderRadius: 12,
//     backgroundColor: COLORS.white,
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 2,
//     marginRight: 16,
//   },
//   headerTitle: {
//     fontSize: 22,
//     fontWeight: "800",
//     color: TEXT_DARK,
//     letterSpacing: 0.5,
//   },

//   /* Search */
//   searchContainer: {
//     paddingHorizontal: 20,
//     marginBottom: 16,
//   },
//   searchBar: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: COLORS.white,
//     borderRadius: 16,
//     paddingHorizontal: 16,
//     height: 52,
//     // Soft Float Shadow
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.06,
//     shadowRadius: 10,
//     elevation: 3,
//   },
//   searchInput: {
//     marginLeft: 12,
//     flex: 1,
//     fontSize: 15,
//     color: TEXT_DARK,
//     fontWeight: '500',
//   },

//   /* List */
//   listContainer: {
//     paddingHorizontal: 20,
//     paddingBottom: 40,
//   },

//   /* Order Card */
//   orderItem: {
//     backgroundColor: COLORS.white,
//     borderRadius: 20,
//     marginBottom: 20,
//     padding: 16,
//     borderWidth: 1,
//     borderColor: '#F0F0F0',
//     // Modern Shadow
//     shadowColor: COLORS.primary,
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.04,
//     shadowRadius: 12,
//     elevation: 2,
//   },
  
//   /* Header Row */
//   headerRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//   },
//   restaurantContainer: {
//     flexDirection: "row",
//     flex: 1,
//   },
//   logo: {
//     width: 48,
//     height: 48,
//     borderRadius: 12,
//     marginRight: 12,
//     backgroundColor: '#F3F4F6',
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//   },
//   textContainer: {
//     justifyContent: 'center',
//     flex: 1,
//   },
//   restaurantName: {
//     fontSize: 16,
//     fontWeight: "700",
//     color: TEXT_DARK,
//     marginBottom: 2,
//   },
//   locationText: {
//     fontSize: 12,
//     color: TEXT_GREY,
//     fontWeight: '500',
//   },
//   optionsButton: {
//     padding: 4,
//   },

//   /* Divider */
//   dashedDivider: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginVertical: 16,
//     overflow: 'hidden',
//   },
//   dash: {
//       width: 8,
//       height: 1,
//       backgroundColor: '#E5E7EB',
//       marginHorizontal: 2,
//   },

//   /* Details */
//   detailsContainer: {
//     paddingHorizontal: 4,
//     marginBottom: 16,
//   },
//   itemsText: {
//     fontSize: 14,
//     color: "#4B5563",
//     lineHeight: 20,
//     fontWeight: '500',
//   },
//   dateText: {
//     fontSize: 12,
//     color: TEXT_GREY,
//     marginTop: 6,
//     fontWeight: '500',
//   },

//   /* Footer */
//   footerRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-end", 
//     marginTop: 4,
//   },
//   statusWrapper: {
//       flex: 1,
//   },
//   priceText: {
//     fontSize: 18,
//     fontWeight: "800",
//     color: TEXT_DARK,
//   },
//   reorderBtn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: COLORS.primary,
//     paddingHorizontal: 18,
//     paddingVertical: 10,
//     borderRadius: 12,
//     shadowColor: COLORS.primary,
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 6,
//     elevation: 4,
//   },
//   reorderText: {
//     color: COLORS.white,
//     fontWeight: "700",
//     fontSize: 13,
//   },

//   /* Status Badges - Pill Style */
//   badgeDefault: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: COLORS.background,
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     borderRadius: 20,
//     alignSelf: 'flex-start',
//   },
//   badgeDelivered: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: COLORS.SOFT_GREEN, // Soft Green
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     borderRadius: 20,
//     alignSelf: 'flex-start',
//   },
//   badgeFailed: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: COLORS.SOFT_RED, // Soft Red
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     borderRadius: 20,
//     alignSelf: 'flex-start',
//   },
//   badgeRefund: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: COLORS.SOFT_BLUE, // Soft Blue
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     borderRadius: 20,
//     alignSelf: 'flex-start',
//   },
  
//   badgeTextDefault: { fontSize: 11, fontWeight: "700", color: "#6B7280" },
//   badgeTextDelivered: { fontSize: 11, fontWeight: "700", color: "#15803d" },
//   badgeTextFailed: { fontSize: 11, fontWeight: "700", color: "#b91c1c" },
//   badgeTextRefund: { fontSize: 11, fontWeight: "700", color: "#1d4ed8" },
  
//   extraText: {
//     fontSize: 11,
//     color: TEXT_GREY,
//     marginTop: 6,
//     marginLeft: 4,
//     fontStyle: 'italic',
//   },

//   /* Empty State */
//   emptyContainer: {
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 100,
//   },
//   emptyIconBg: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: COLORS.background,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOpacity: 0.05,
//     shadowRadius: 10,
//   },
//   emptyTitle: {
//     fontSize: 20,
//     fontWeight: "800",
//     color: TEXT_DARK,
//     marginBottom: 8,
//   },
//   emptySubtitle: {
//     fontSize: 14,
//     color: TEXT_GREY,
//     textAlign: "center",
//     lineHeight: 20,
//     paddingHorizontal: 40,
//   },

//   /* --- POPUP MENU STYLES --- */
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'transparent', // Transparent to see behind
//   },
//   popupMenu: {
//     position: 'absolute',
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     width: 200,
//     paddingVertical: 8,
//     // Shadow
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     elevation: 5,
//   },
//   popupMenuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//   },
//   popupMenuText: {
//     fontSize: 14,
//     color: TEXT_DARK,
//     marginLeft: 12,
//     fontWeight: '500',
//   },
// });

// OrdersScreen.tsx
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  TouchableWithoutFeedback,
  Dimensions // Import Dimensions
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useGetAllOrders } from "../api/hooks/order.service";
import { COLORS } from '../theme/color';

// --- THEME COLORS ---
const BG_COLOR = '#F5F7FA';
const CARD_BG = '#FFFFFF';
const TEXT_DARK = '#1F2937';
const TEXT_GREY = '#9CA3AF';

interface Order {
  id: string;
  restaurant: string;
  location: string;
  menu: string;
  items: string;
  date: string;
  price: string;
  status: "Delivered" | "Payment failed" | "Refund completed";
  image: string;
  extra?: string;
}

const YourOrders = ({ navigation }: any) => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "1",
      restaurant: "Pizza Hut",
      location: "Bariatu, Ranchi",
      menu: "View menu",
      items: "1 x Create Your Flavour Fun Combo - Classic Onion Capsicum",
      date: "17 Feb, 4:15 PM",
      price: "₹191.92",
      status: "Delivered",
      image: "https://tse2.mm.bing.net/th/id/OIP.3Dh9FWm684Jc41gmv8eZHwHaEE?pid=Api&P=0&h=180",
    },
    {
      id: "2",
      restaurant: "Pizza Hut",
      location: "Bariatu, Ranchi",
      menu: "View menu",
      items: "1 x Create Your Flavour Fun Combo - Classic Onion Capsicum",
      date: "17 Feb, 4:15 PM",
      price: "₹191.92",
      status: "Payment failed",
      image: "https://tse1.mm.bing.net/th/id/OIP.y9WHqmBEubDgxpHWqRN9sAHaEO?pid=Api&P=0&h=180",
    },
    {
      id: "3",
      restaurant: "Kolkata@99",
      location: "Sector 5, Salt Lake, Kolkata",
      menu: "View menu",
      items: "1 x Gulab Jamun [8 Pieces]",
      date: "31 Jan, 2:30 AM",
      price: "₹203.80",
      status: "Refund completed",
      extra: "Ref ID: 503108693626",
      image:
        "https://tse2.mm.bing.net/th/id/OIP.zec59lWeYML7_-wwsSYBHAHaE8?pid=Api&P=0&h=180",
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");

  // --- POPUP MENU STATE ---
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Filter orders based on search
  const filteredOrders = orders.filter(
    (order) =>
      order.restaurant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Go back on arrow press
  const handleGoBack = () => {
    navigation.goBack();
  };

  // Delete Order
  const handleDelete = (id: string) => {
    Alert.alert("Delete Order", "Are you sure you want to delete this order?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => setOrders(orders.filter((o) => o.id !== id)),
      },
    ]);
  };

  // View Order Details
  const handleDetails = (order: Order) => {
    Alert.alert(
      "Order Details",
      `${order.items}\n\n${order.date}\n${order.price}\nStatus: ${order.status}`
    );
  };

  // Share Restaurant
  const handleShare = async (restaurant: string, location: string) => {
    try {
      await Share.share({
        message: `Check out ${restaurant} located at ${location}!`,
      });
    } catch (err) {
      console.error(err);
    }
  };

  // --- API INTEGRATION ---
  // FIXED: Added { limit: 10 } to satisfy the required parameter
  const { data: orderData, isLoading } = useGetAllOrders({ limit: 10 });
  // console.log(orderData); // Commented out to reduce noise

  // Status Badge Component
  const StatusBadge = ({ status, extra }: { status: Order["status"]; extra?: string }) => {
    let containerStyle = styles.badgeDefault;
    let textStyle = styles.badgeTextDefault;
    let iconName = "information-circle";
    let iconColor = "#666";

    switch (status) {
      case "Delivered":
        containerStyle = styles.badgeDelivered;
        textStyle = styles.badgeTextDelivered;
        iconName = "checkmark-circle";
        iconColor = "#15803d"; // Green
        break;
      case "Payment failed":
        containerStyle = styles.badgeFailed;
        textStyle = styles.badgeTextFailed;
        iconName = "alert-circle";
        iconColor = "#b91c1c"; // Red
        break;
      case "Refund completed":
        containerStyle = styles.badgeRefund;
        textStyle = styles.badgeTextRefund;
        iconName = "wallet";
        iconColor = "#1d4ed8"; // Blue
        break;
    }

    return (
      <View>
        <View style={containerStyle}>
          <Ionicons name={iconName} size={14} color={iconColor} style={{ marginRight: 6 }} />
          <Text style={textStyle}>{status}</Text>
        </View>
        {extra && <Text style={styles.extraText}>{extra}</Text>}
      </View>
    );
  };

  const renderOrder = ({ item }: { item: Order }) => (
    <View style={styles.orderItem}>
      
      {/* Top Row: Restaurant Info */}
      <View style={styles.headerRow}>
        <View style={styles.restaurantContainer}>
          <Image source={{ uri: item.image }} style={styles.logo} />
          <View style={styles.textContainer}>
            <Text style={styles.restaurantName}>{item.restaurant}</Text>
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
        </View>

        {/* --- MODIFIED: THREE DOT BUTTON --- */}
        <TouchableOpacity
          style={styles.optionsButton}
          onPress={(event) => {
            // Get click coordinates to position the popup
            const { pageY } = event.nativeEvent;
            setMenuPosition({ top: pageY, right: 30 }); // 30 is approx margin
            setSelectedOrder(item);
            setMenuVisible(true);
          }}
        >
          <MaterialCommunityIcons name="dots-vertical" size={20} color={COLORS.muted} />
        </TouchableOpacity>
        {/* ---------------------------------- */}
      </View>

      {/* Dashed Divider */}
      <View style={styles.dashedDivider}>
        {Array.from({ length: 20 }).map((_, i) => (
            <View key={i} style={styles.dash} />
        ))}
      </View>

      {/* Items & Date */}
      <View style={styles.detailsContainer}>
        <Text style={styles.itemsText} numberOfLines={2}>
          {item.items}
        </Text>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>

      {/* Footer: Price, Status & Reorder */}
      <View style={styles.footerRow}>
        <View style={styles.statusWrapper}>
            <Text style={styles.priceText}>{item.price}</Text>
            <View style={{marginTop: 6}}>
                <StatusBadge status={item.status} extra={item.extra} />
            </View>
        </View>

        <TouchableOpacity style={styles.reorderBtn} activeOpacity={0.8}>
          <Text style={styles.reorderText}>Reorder</Text>
          <Ionicons name="refresh" size={16} color="#FFF" style={{marginLeft: 4}}/>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Empty State
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconBg}>
        <Ionicons name="fast-food-outline" size={50} color={COLORS.muted} />
      </View>
      <Text style={styles.emptyTitle}>No orders found</Text>
      <Text style={styles.emptySubtitle}>
        Looks like you haven't ordered anything yet.
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color={TEXT_DARK} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Orders</Text>
      </View>

      {/* Floating Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={TEXT_GREY} />
          <TextInput
            placeholder="Search orders..."
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={TEXT_GREY}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={18} color={TEXT_GREY} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {/* Orders List */}
      <FlatList
        data={filteredOrders}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />

      {/* --- POPUP MENU MODAL --- */}
      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
          <View style={styles.modalOverlay}>
            <View 
              style={[
                styles.popupMenu, 
                { top: menuPosition.top + 10, right: menuPosition.right } // Adjust position
              ]}
            >
              {/* Option 1: Share restaurant */}
              <TouchableOpacity 
                style={styles.popupMenuItem}
                onPress={() => {
                  setMenuVisible(false);
                  if (selectedOrder) handleShare(selectedOrder.restaurant, selectedOrder.location);
                }}
              >
                <Ionicons name="arrow-redo-outline" size={20} color={TEXT_DARK} />
                <Text style={styles.popupMenuText}>Share restaurant</Text>
              </TouchableOpacity>

              {/* Option 2: Order details */}
              <TouchableOpacity 
                style={styles.popupMenuItem}
                onPress={() => {
                  setMenuVisible(false);
                  if (selectedOrder) handleDetails(selectedOrder);
                }}
              >
                <Ionicons name="receipt-outline" size={20} color={TEXT_DARK} />
                <Text style={styles.popupMenuText}>Order details</Text>
              </TouchableOpacity>

              {/* Option 3: Delete this order */}
              <TouchableOpacity 
                style={styles.popupMenuItem}
                onPress={() => {
                  setMenuVisible(false);
                  if (selectedOrder) handleDelete(selectedOrder.id);
                }}
              >
                <Ionicons name="trash-outline" size={20} color={TEXT_DARK} />
                <Text style={styles.popupMenuText}>Delete this order</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

    </SafeAreaView>
  );
};

export default YourOrders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  
  /* Header */
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: COLORS.white,
  },
  backButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: TEXT_DARK,
    letterSpacing: 0.5,
  },

  /* Search */
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 52,
    // Soft Float Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  searchInput: {
    marginLeft: 12,
    flex: 1,
    fontSize: 15,
    color: TEXT_DARK,
    fontWeight: '500',
  },

  /* List */
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  /* Order Card */
  orderItem: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    marginBottom: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    // Modern Shadow
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  
  /* Header Row */
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  restaurantContainer: {
    flexDirection: "row",
    flex: 1,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  textContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: "700",
    color: TEXT_DARK,
    marginBottom: 2,
  },
  locationText: {
    fontSize: 12,
    color: TEXT_GREY,
    fontWeight: '500',
  },
  optionsButton: {
    padding: 4,
  },

  /* Divider */
  dashedDivider: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
    overflow: 'hidden',
  },
  dash: {
      width: 8,
      height: 1,
      backgroundColor: '#E5E7EB',
      marginHorizontal: 2,
  },

  /* Details */
  detailsContainer: {
    paddingHorizontal: 4,
    marginBottom: 16,
  },
  itemsText: {
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 20,
    fontWeight: '500',
  },
  dateText: {
    fontSize: 12,
    color: TEXT_GREY,
    marginTop: 6,
    fontWeight: '500',
  },

  /* Footer */
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end", 
    marginTop: 4,
  },
  statusWrapper: {
      flex: 1,
  },
  priceText: {
    fontSize: 18,
    fontWeight: "800",
    color: TEXT_DARK,
  },
  reorderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  reorderText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 13,
  },

  /* Status Badges - Pill Style */
  badgeDefault: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  badgeDelivered: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.SOFT_GREEN, // Soft Green
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  badgeFailed: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.SOFT_RED, // Soft Red
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  badgeRefund: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.SOFT_BLUE, // Soft Blue
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  
  badgeTextDefault: { fontSize: 11, fontWeight: "700", color: "#6B7280" },
  badgeTextDelivered: { fontSize: 11, fontWeight: "700", color: "#15803d" },
  badgeTextFailed: { fontSize: 11, fontWeight: "700", color: "#b91c1c" },
  badgeTextRefund: { fontSize: 11, fontWeight: "700", color: "#1d4ed8" },
  
  extraText: {
    fontSize: 11,
    color: TEXT_GREY,
    marginTop: 6,
    marginLeft: 4,
    fontStyle: 'italic',
  },

  /* Empty State */
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  emptyIconBg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: TEXT_DARK,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: TEXT_GREY,
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 40,
  },

  /* --- POPUP MENU STYLES --- */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'transparent', // Transparent to see behind
  },
  popupMenu: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 8,
    width: 200,
    paddingVertical: 8,
    // Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  popupMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  popupMenuText: {
    fontSize: 14,
    color: TEXT_DARK,
    marginLeft: 12,
    fontWeight: '500',
  },
});