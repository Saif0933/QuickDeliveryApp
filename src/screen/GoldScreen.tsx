// // GoldScreen.tsx
// import React, { useRef, useState } from "react";
// import {
//   Alert,
//   Animated,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
// import Ionicons from "react-native-vector-icons/Ionicons";

// const GoldScreen = () => {
//   const [coupon, setCoupon] = useState("");
//   const buttonAnim = useRef(new Animated.Value(0)).current; // 0 = visible, 1 = hidden
//   const [lastScrollY, setLastScrollY] = useState(0);

//   const handleBack = () => Alert.alert("Back", "Go back to the previous screen");

//   const handleJoinGold = () =>
//     Alert.alert("Success", "You have joined Zomato Gold!");

//   const handleApplyCoupon = () => {
//     if (coupon.trim() === "") {
//       Alert.alert("Error", "Please enter a coupon code.");
//     } else {
//       Alert.alert("Coupon Applied", `Applied coupon: ${coupon}`);
//       setCoupon("");
//     }
//   };

//   // 👇 FIXED: Scroll direction logic reversed
//   const handleScroll = (event: any) => {
//     const currentY = event.nativeEvent.contentOffset.y;

//     if (currentY > lastScrollY + 10) {
//       // 🟢 Scroll DOWN → show button (slide UP)
//       Animated.timing(buttonAnim, {
//         toValue: 0,
//         duration: 250,
//         useNativeDriver: true,
//       }).start();
//     } else if (currentY < lastScrollY - 10) {
//       // 🔴 Scroll UP → hide button (slide DOWN)
//       Animated.timing(buttonAnim, {
//         toValue: 1,
//         duration: 250,
//         useNativeDriver: true,
//       }).start();
//     }

//     setLastScrollY(currentY);
//   };

//   // 0 = visible (up), 1 = hidden (down)
//   const translateY = buttonAnim.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0, 100], // slide down when hidden
//   });

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         onScroll={handleScroll}
//         scrollEventThrottle={16}
//       >
//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity onPress={handleBack}>
//             <Ionicons name="arrow-back" size={24} color="#fff" />
//           </TouchableOpacity>
//         </View>

//         {/* Title */}
//         <Text style={styles.logo}>zomato</Text>
//         <Text style={styles.gold}>
//           GOLD <FontAwesome5 name="crown" size={22} color="#fbc02d" />
//         </Text>

//         {/* Special Benefit Update */}
//         <View style={styles.updateBox}>
//           <Text style={styles.updateTitle}>Special benefit update!</Text>
//           <Text style={styles.updateText}>
//             Now enjoy FREE delivery on orders above{" "}
//             <Text style={styles.strike}>₹199</Text> ₹99
//           </Text>
//         </View>

//         {/* Plan Section */}
//         <View style={styles.planBox}>
//           <Text style={styles.planSubTitle}>UNLIMITED FREE DELIVERIES & MORE</Text>
//           <Text style={styles.planPrice}>₹1</Text>
//           <Text style={styles.planDuration}>for 3 months</Text>
//           <TouchableOpacity style={styles.joinButton} onPress={handleJoinGold}>
//             <Text style={styles.joinText}>Join Gold</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Gold Benefits */}
//         <Text style={styles.sectionTitle}>★ GOLD BENEFITS ★</Text>
//         <View style={styles.benefitBox}>
//           <View style={styles.benefitItem}>
//             <FontAwesome5 name="motorcycle" size={22} color="#fbc02d" />
//             <View style={{ marginLeft: 10 }}>
//               <Text style={styles.benefitTitle}>Free delivery</Text>
//               <Text style={styles.benefitDesc}>
//                 Free delivery and surge fee waiver on orders above ₹99, from
//                 restaurants within 7 km.
//               </Text>
//             </View>
//           </View>

//           <View style={styles.benefitItem}>
//             <FontAwesome5 name="ticket-alt" size={22} color="#fbc02d" />
//             <View style={{ marginLeft: 10 }}>
//               <Text style={styles.benefitTitle}>Up to 30% extra off</Text>
//               <Text style={styles.benefitDesc}>
//                 Above all existing offers at 20,000+ partner restaurants across
//                 India.
//               </Text>
//             </View>
//           </View>
//         </View>

//         {/* Coupon Box */}
//         <View style={styles.couponBox}>
//           <TextInput
//             style={styles.couponInput}
//             placeholder="Have a coupon code?"
//             placeholderTextColor="#aaa"
//             value={coupon}
//             onChangeText={setCoupon}
//           />
//           <TouchableOpacity onPress={handleApplyCoupon}>
//             <Text style={styles.applyText}>Apply</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Footer */}
//         <Text style={styles.footerText}>
//           Have questions?{" "}
//           <Text style={{ color: "#fbc02d" }}>Check FAQs and terms</Text>
//         </Text>
//       </ScrollView>

//       {/* Floating Join Gold Button */}
//       <Animated.View
//         style={[
//           styles.floatingContainer,
//           { transform: [{ translateY }] },
//         ]}
//       >
//         <TouchableOpacity style={styles.floatingButton} onPress={handleJoinGold}>
//           <Text style={styles.floatingText}>Join Gold — ₹1 for 3 months</Text>
//         </TouchableOpacity>
//       </Animated.View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#000" },
//   header: { flexDirection: "row", padding: 15 },
//   logo: {
//     fontSize: 22,
//     color: "#fff",
//     fontWeight: "700",
//     textAlign: "center",
//   },
//   gold: {
//     fontSize: 32,
//     fontWeight: "900",
//     color: "#fbc02d",
//     textAlign: "center",
//     marginBottom: 20,
//   },
//   updateBox: {
//     backgroundColor: "#fff",
//     borderRadius: 8,
//     padding: 15,
//     marginHorizontal: 20,
//     marginBottom: 20,
//   },
//   updateTitle: {
//     fontWeight: "700",
//     color: "#d4a017",
//     marginBottom: 5,
//   },
//   updateText: { fontSize: 14, color: "#333" },
//   strike: { textDecorationLine: "line-through", color: "#999" },
//   planBox: {
//     backgroundColor: "#111",
//     marginHorizontal: 20,
//     padding: 20,
//     borderRadius: 12,
//     alignItems: "center",
//     borderColor: "#fbc02d",
//     borderWidth: 1,
//     marginBottom: 20,
//   },
//   planSubTitle: {
//     color: "#fbc02d",
//     fontSize: 13,
//     marginBottom: 8,
//     fontWeight: "700",
//   },
//   planPrice: {
//     fontSize: 32,
//     fontWeight: "900",
//     color: "#fff",
//     textAlign: "center",
//   },
//   planDuration: {
//     fontSize: 14,
//     color: "#ccc",
//     textAlign: "center",
//     marginBottom: 15,
//   },
//   joinButton: {
//     backgroundColor: "#fbc02d",
//     borderRadius: 8,
//     paddingVertical: 12,
//     paddingHorizontal: 50,
//   },
//   joinText: {
//     fontSize: 16,
//     fontWeight: "700",
//     color: "#000",
//     textAlign: "center",
//   },
//   sectionTitle: {
//     textAlign: "center",
//     color: "#fbc02d",
//     fontWeight: "700",
//     marginBottom: 15,
//   },
//   benefitBox: {
//     backgroundColor: "#1a1a1a",
//     marginHorizontal: 20,
//     borderRadius: 12,
//     padding: 15,
//     marginBottom: 20,
//   },
//   benefitItem: { flexDirection: "row", marginBottom: 15 },
//   benefitTitle: { fontSize: 15, fontWeight: "700", color: "#fff" },
//   benefitDesc: { fontSize: 13, color: "#ccc", marginTop: 3 },
//   couponBox: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#555",
//     borderRadius: 8,
//     marginHorizontal: 20,
//     paddingHorizontal: 15,
//     marginBottom: 50,
//     backgroundColor: "#111",
//   },
//   couponInput: { flex: 1, color: "#fff", fontSize: 14 },
//   applyText: { color: "#fbc02d", fontWeight: "700", fontSize: 14 },
//   footerText: {
//     textAlign: "center",
//     color: "#aaa",
//     marginBottom: 120,
//   },
//   floatingContainer: {
//     position: "absolute",
//     bottom: 20,
//     left: 0,
//     right: 0,
//     alignItems: "center",
//   },
//   floatingButton: {
//     backgroundColor: "#fbc02d",
//     borderRadius: 30,
//     paddingVertical: 14,
//     paddingHorizontal: 60,
//     shadowColor: "#000",
//     shadowOpacity: 0.3,
//     shadowRadius: 6,
//     shadowOffset: { width: 0, height: 4 },
//     elevation: 6,
//   },
//   floatingText: {
//     fontSize: 16,
//     fontWeight: "700",
//     color: "#000",
//   },
// });

// export default GoldScreen;



// GoldScreen.tsx
import React, { useRef, useState } from "react";
import {
  Alert,
  Animated,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";

const GoldScreen = () => {
  const [coupon, setCoupon] = useState("");
  const buttonAnim = useRef(new Animated.Value(1)).current; // start hidden (1) or visible (0) as you like
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleBack = () => Alert.alert("Back", "Go back to the previous screen");

  const handleJoinGold = () =>
    Alert.alert("Success", "You have joined Zomato Gold!");

  const handleApplyCoupon = () => {
    if (coupon.trim() === "") {
      Alert.alert("Error", "Please enter a coupon code.");
    } else {
      Alert.alert("Coupon Applied", `Applied coupon: ${coupon}`);
      setCoupon("");
    }
  };

  // ✅ Scroll Down → show (slide up), Scroll Up → hide (slide down)
  const handleScroll = (event: any) => {
    const currentY = event.nativeEvent.contentOffset.y;

    if (currentY > lastScrollY + 8) {
      // scroll down -> show
      Animated.timing(buttonAnim, {
        toValue: 0, // visible
        duration: 220,
        useNativeDriver: true,
      }).start();
    } else if (currentY < lastScrollY - 8) {
      // scroll up -> hide
      Animated.timing(buttonAnim, {
        toValue: 1, // hidden
        duration: 220,
        useNativeDriver: true,
      }).start();
    }

    setLastScrollY(currentY);
  };

  const translateY = buttonAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 110], // 0 visible, 110 moved down (hidden)
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 160 }}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <Text style={styles.logo}>zomato</Text>

        <View style={styles.goldTitleBox}>
          <Text style={styles.gold}>
            GOLD <FontAwesome5 name="crown" size={20} color="#000" />
          </Text>
        </View>

        <View style={styles.updateBox}>
          <Text style={styles.updateTitle}>✨ Special Benefit Update!</Text>
          <Text style={styles.updateText}>
            Enjoy FREE delivery on all orders above{" "}
            <Text style={styles.strike}>₹199</Text> ₹99 🎉
          </Text>
        </View>

        <View style={styles.planBox}>
          <View style={styles.planHeader}>
            <View style={styles.goldDot} />
            <Text style={styles.planSubTitle}>UNLIMITED FREE DELIVERIES</Text>
          </View>

          <Text style={styles.planPrice}>₹1</Text>
          <Text style={styles.planDuration}>for 3 months</Text>

          <TouchableOpacity style={styles.joinButton} onPress={handleJoinGold}>
            <Text style={styles.joinText}>Join Gold</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>★ GOLD BENEFITS ★</Text>

        <View style={styles.benefitBox}>
          <View style={styles.benefitItem}>
            <FontAwesome5 name="motorcycle" size={22} color="#fbc02d" />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.benefitTitle}>Free delivery</Text>
              <Text style={styles.benefitDesc}>
                Free delivery & surge fee waiver on orders above ₹99.
              </Text>
            </View>
          </View>

          <View style={styles.benefitItem}>
            <FontAwesome5 name="ticket-alt" size={22} color="#fbc02d" />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.benefitTitle}>Up to 30% extra off</Text>
              <Text style={styles.benefitDesc}>
                Across 20,000+ partner restaurants.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.couponBox}>
          <TextInput
            style={styles.couponInput}
            placeholder="Have a coupon code?"
            placeholderTextColor="#aaa"
            value={coupon}
            onChangeText={setCoupon}
          />
          <TouchableOpacity onPress={handleApplyCoupon}>
            <Text style={styles.applyText}>Apply</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footerText}>
          Have questions? <Text style={{ color: "#fbc02d" }}>Check FAQs and Terms</Text>
        </Text>
      </ScrollView>

      <Animated.View
        style={[
          styles.floatingContainer,
          { transform: [{ translateY }] },
        ]}
      >
        <TouchableOpacity style={styles.floatingButton} onPress={handleJoinGold}>
          <Text style={styles.floatingText}>Join Gold — ₹1 for 3 months</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  header: { flexDirection: "row", padding: 14 },
  logo: { fontSize: 22, color: "#fff", fontWeight: "700", textAlign: "center" },
  goldTitleBox: {
    alignSelf: "center",
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 22,
    backgroundColor: "#f6d87b",
    marginVertical: 8,
    shadowColor: "#fbc02d",
    shadowOpacity: Platform.OS === "ios" ? 0.25 : 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  gold: {
    fontSize: 30,
    fontWeight: "900",
    color: "#000",
    letterSpacing: 1.5,
  },
  updateBox: {
    backgroundColor: "#121212",
    borderRadius: 10,
    padding: 14,
    marginHorizontal: 18,
    marginVertical: 18,
    borderWidth: 1,
    borderColor: "#2a2200",
  },
  updateTitle: { color: "#fbc02d", fontWeight: "800", marginBottom: 6 },
  updateText: { color: "#ddd" },
  strike: { textDecorationLine: "line-through", color: "#999" },
  planBox: {
    backgroundColor: "#0e0e0e",
    borderRadius: 12,
    marginHorizontal: 18,
    padding: 22,
    alignItems: "center",
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#2e2200",
  },
  planHeader: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  goldDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#fbc02d", marginRight: 8 },
  planSubTitle: { color: "#fbc02d", fontWeight: "700" },
  planPrice: { fontSize: 36, fontWeight: "900", color: "#fff", marginTop: 6 },
  planDuration: { color: "#ccc", marginBottom: 12 },
  joinButton: {
    backgroundColor: "#fbc02d",
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 36,
  },
  joinText: { color: "#000", fontWeight: "800" },
  sectionTitle: { color: "#fbc02d", textAlign: "center", marginVertical: 10, fontWeight: "800" },
  benefitBox: {
    backgroundColor: "#121212",
    marginHorizontal: 18,
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
  },
  benefitItem: { flexDirection: "row", marginBottom: 14 },
  benefitTitle: { color: "#fff", fontWeight: "700" },
  benefitDesc: { color: "#ccc", marginTop: 4 },
  couponBox: {
    flexDirection: "row",
    marginHorizontal: 18,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#0f0f0f",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  couponInput: { flex: 1, color: "#fff", paddingRight: 12 },
  applyText: { color: "#fbc02d", fontWeight: "700" },
  footerText: { color: "#aaa", textAlign: "center", marginBottom: 40 },
  floatingContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  floatingButton: {
    backgroundColor: "#fbc02d",
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 36,
    shadowColor: "#fbc02d",
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 6,
  },
  floatingText: { color: "#000", fontWeight: "800" },
});

export default GoldScreen;
