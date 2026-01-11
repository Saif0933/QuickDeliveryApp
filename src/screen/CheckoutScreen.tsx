// // CheckoutScreen.tsx
// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   Alert,
// } from "react-native";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import MaterialIcons from "react-native-vector-icons/MaterialIcons";

// const CheckoutScreen = () => {
//   const [quantity, setQuantity] = useState(1);

//   // Functions for buttons
//   const handleAddItem = () => {
//     setQuantity(quantity + 1);
//   };

//   const handleRemoveItem = () => {
//     if (quantity > 1) setQuantity(quantity - 1);
//   };

//   const handleGoldOffer = () => {
//     Alert.alert("Offer Added", "You added Gold for 3 months at ₹30!");
//   };

//   const handleAddExtraItem = (item: string) => {
//     Alert.alert("Added Item", `You added ${item} to your cart.`);
//   };

//   const handleViewCoupons = () => {
//     Alert.alert("Coupons", "Viewing available coupons...");
//   };

//   const handleScheduleDelivery = () => {
//     Alert.alert("Schedule Delivery", "You can schedule delivery here.");
//   };

//   const handleSelectAddress = () => {
//     Alert.alert("Select Address", "Proceeding to address selection...");
//   };

//   const handleDonate = () => {
//     Alert.alert("Donation", "₹3 added for Feeding India.");
//   };

//   return (
//     <ScrollView style={styles.container}>
//       {/* Header Savings */}
//       <View style={styles.savingsBar}>
//         <Text style={styles.savingsText}>🎉 You saved ₹622 on this order</Text>
//       </View>

//       {/* Gold Offer */}
//       <View style={styles.card}>
//         <View>
//           <Text style={styles.title}>Get Gold for 3 months at ₹30</Text>
//           <Text style={styles.subtitle}>
//             Enjoy FREE delivery above ₹99 and extra offers with Gold
//           </Text>
//         </View>
//         <TouchableOpacity style={styles.addBtn} onPress={handleGoldOffer}>
//           <Text style={styles.addBtnText}>ADD</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Cart Item */}
//       <View style={styles.card}>
//         <Text style={styles.title}>Full House Popcorn Chicken Bucket</Text>
//         <Text style={styles.subtitle}>NOT ELIGIBLE FOR COUPONS</Text>
//         <View style={styles.itemRow}>
//           <TouchableOpacity onPress={handleRemoveItem}>
//             <Ionicons name="remove-circle-outline" size={28} color="red" />
//           </TouchableOpacity>
//           <Text style={styles.qtyText}>{quantity}</Text>
//           <TouchableOpacity onPress={handleAddItem}>
//             <Ionicons name="add-circle-outline" size={28} color="green" />
//           </TouchableOpacity>
//         </View>
//         <Text style={styles.price}>₹600</Text>
//       </View>

//       {/* Extra Items */}
//       <Text style={styles.sectionTitle}>Complete your meal with</Text>
//       <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//         <View style={styles.extraCard}>
//           <Image
//             source={{ uri: "https://dummyimage.com/100x100/ccc/000.png&text=Veg+Krisper" }}
//             style={styles.extraImage}
//           />
//           <Text style={styles.extraText}>Veg Krisper Burgers - 2pc</Text>
//           <Text style={styles.extraPrice}>₹239</Text>
//           <TouchableOpacity
//             style={styles.addBtnSmall}
//             onPress={() => handleAddExtraItem("Veg Krisper Burgers")}
//           >
//             <Text style={styles.addBtnText}>ADD</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.extraCard}>
//           <Image
//             source={{ uri: "https://dummyimage.com/100x100/ccc/000.png&text=Veg+Longer" }}
//             style={styles.extraImage}
//           />
//           <Text style={styles.extraText}>Veg Longer Burger - 2pc</Text>
//           <Text style={styles.extraPrice}>₹279</Text>
//           <TouchableOpacity
//             style={styles.addBtnSmall}
//             onPress={() => handleAddExtraItem("Veg Longer Burger")}
//           >
//             <Text style={styles.addBtnText}>ADD</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>

//       {/* Discounts */}
//       <View style={styles.card}>
//         <Text style={styles.discount}>✅ Upto 50% OFF applied! - ₹600</Text>
//         <Text style={styles.discount}>✅ You saved ₹22 on delivery</Text>
//         <TouchableOpacity onPress={handleViewCoupons}>
//           <Text style={styles.linkText}>View all coupons ➝</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Delivery */}
//       <View style={styles.card}>
//         <Text style={styles.title}>Delivery in 20–25 mins</Text>
//         <TouchableOpacity onPress={handleScheduleDelivery}>
//           <Text style={styles.linkText}>Want this later? Schedule it</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Total */}
//       <View style={styles.card}>
//         <Text style={styles.total}>Total Bill ₹683.75</Text>
//         <Text style={styles.savingsText}>You saved ₹622</Text>
//       </View>

//       {/* Donate */}
//       <View style={styles.cardRow}>
//         <Text style={styles.title}>Donate to Feeding India ₹3</Text>
//         <TouchableOpacity style={styles.addBtn} onPress={handleDonate}>
//           <Text style={styles.addBtnText}>ADD</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Footer Button */}
//       <TouchableOpacity style={styles.footerBtn} onPress={handleSelectAddress}>
//         <Text style={styles.footerBtnText}>Select address at next step ➝</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff" },
//   savingsBar: { padding: 10, backgroundColor: "#eef7ff" },
//   savingsText: { color: "#007aff", fontWeight: "600", textAlign: "center" },
//   card: {
//     backgroundColor: "#fff",
//     padding: 15,
//     margin: 8,
//     borderRadius: 10,
//     elevation: 2,
//   },
//   cardRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     backgroundColor: "#fff",
//     padding: 15,
//     margin: 8,
//     borderRadius: 10,
//     elevation: 2,
//   },
//   title: { fontSize: 16, fontWeight: "600", marginBottom: 5 },
//   subtitle: { fontSize: 12, color: "gray", marginBottom: 5 },
//   price: { fontSize: 16, fontWeight: "bold", marginTop: 5 },
//   addBtn: {
//     backgroundColor: "#f4f4f4",
//     borderRadius: 5,
//     paddingHorizontal: 15,
//     paddingVertical: 5,
//   },
//   addBtnSmall: {
//     backgroundColor: "#f4f4f4",
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     paddingVertical: 3,
//     marginTop: 5,
//   },
//   addBtnText: { fontWeight: "bold", color: "#e63946" },
//   itemRow: { flexDirection: "row", alignItems: "center", marginTop: 10 },
//   qtyText: { fontSize: 16, marginHorizontal: 10 },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginHorizontal: 10,
//     marginVertical: 5,
//   },
//   extraCard: {
//     backgroundColor: "#fff",
//     padding: 10,
//     margin: 8,
//     borderRadius: 10,
//     alignItems: "center",
//     width: 160,
//     elevation: 2,
//   },
//   extraImage: { width: 100, height: 100, borderRadius: 8 },
//   extraText: { fontSize: 12, fontWeight: "500", textAlign: "center" },
//   extraPrice: { fontWeight: "bold", marginVertical: 5 },
//   discount: { fontSize: 14, color: "green", marginVertical: 2 },
//   linkText: { color: "#007aff", marginTop: 5 },
//   total: { fontSize: 18, fontWeight: "bold" },
//   footerBtn: {
//     backgroundColor: "red",
//     padding: 15,
//     margin: 10,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   footerBtnText: { color: "#fff", fontSize: 16, fontWeight: "600" },
// });

// export default CheckoutScreen;

import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import Header from '../components/cart/Header'
import FoodItems from '../components/cart/FoodItems'
import CouponsSection from '../components/cart/CouponsSection';
import DeliverySection from '../components/cart/DeliverySection';
import FeedingIndiaSection from '../components/cart/FeedingIndiaSection';
import CancellationPolicy from '../components/cart/CancellationPolicy';
// import ZomatoMoney from '../components/cart/ZomatoMoney';
import BottomSection from '../components/cart/BottomSection';
import { SafeAreaView } from 'react-native-safe-area-context';

const CartScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <Header />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <FoodItems />
        <FeedingIndiaSection />
        <CouponsSection />
        <DeliverySection />
        <CancellationPolicy />
        {/* <ZomatoMoney /> */}
        <View style={{height: 100}} />
      </ScrollView>
      <BottomSection />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
});

export default CartScreen;
