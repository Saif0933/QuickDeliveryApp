

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
//   Platform,
// } from "react-native";
// import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
// import Ionicons from "react-native-vector-icons/Ionicons";

// const GoldScreen = () => {
//   const [coupon, setCoupon] = useState("");
//   const buttonAnim = useRef(new Animated.Value(1)).current; // start hidden (1) or visible (0) as you like
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

//   // ✅ Scroll Down → show (slide up), Scroll Up → hide (slide down)
//   const handleScroll = (event: any) => {
//     const currentY = event.nativeEvent.contentOffset.y;

//     if (currentY > lastScrollY + 8) {
//       // scroll down -> show
//       Animated.timing(buttonAnim, {
//         toValue: 0, // visible
//         duration: 220,
//         useNativeDriver: true,
//       }).start();
//     } else if (currentY < lastScrollY - 8) {
//       // scroll up -> hide
//       Animated.timing(buttonAnim, {
//         toValue: 1, // hidden
//         duration: 220,
//         useNativeDriver: true,
//       }).start();
//     }

//     setLastScrollY(currentY);
//   };

//   const translateY = buttonAnim.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0, 110], // 0 visible, 110 moved down (hidden)
//   });

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         onScroll={handleScroll}
//         scrollEventThrottle={16}
//         contentContainerStyle={{ paddingBottom: 160 }}
//       >
//         <View style={styles.header}>
//           <TouchableOpacity onPress={handleBack}>
//             <Ionicons name="arrow-back" size={24} color="#fff" />
//           </TouchableOpacity>
//         </View>

//         <Text style={styles.logo}>Restro</Text>

//         <View style={styles.goldTitleBox}>
//           <Text style={styles.gold}>
//             Elit <FontAwesome5 name="crown" size={20} color="#000" />
//           </Text>
//         </View>

//         <View style={styles.updateBox}>
//           <Text style={styles.updateTitle}>✨ Special Benefit Update!</Text>
//           <Text style={styles.updateText}>
//             Enjoy FREE delivery on all orders above{" "}
//             <Text style={styles.strike}>₹199</Text> ₹99 🎉
//           </Text>
//         </View>

//         <View style={styles.planBox}>
//           <View style={styles.planHeader}>
//             <View style={styles.goldDot} />
//             <Text style={styles.planSubTitle}>UNLIMITED FREE DELIVERIES</Text>
//           </View>

//           <Text style={styles.planPrice}>₹1</Text>
//           <Text style={styles.planDuration}>for 3 months</Text>

//           <TouchableOpacity style={styles.joinButton} onPress={handleJoinGold}>
//             <Text style={styles.joinText}>Join Elit</Text>
//           </TouchableOpacity>
//         </View>

//         <Text style={styles.sectionTitle}>★ GOLD BENEFITS ★</Text>

//         <View style={styles.benefitBox}>
//           <View style={styles.benefitItem}>
//             <FontAwesome5 name="motorcycle" size={22} color="#fbc02d" />
//             <View style={{ marginLeft: 10 }}>
//               <Text style={styles.benefitTitle}>Free delivery</Text>
//               <Text style={styles.benefitDesc}>
//                 Free delivery & surge fee waiver on orders above ₹99.
//               </Text>
//             </View>
//           </View>

//           <View style={styles.benefitItem}>
//             <FontAwesome5 name="ticket-alt" size={22} color="#fbc02d" />
//             <View style={{ marginLeft: 10 }}>
//               <Text style={styles.benefitTitle}>Up to 30% extra off</Text>
//               <Text style={styles.benefitDesc}>
//                 Across every partner restaurants.
//               </Text>
//             </View>
//           </View>
//         </View>

//         {/* <View style={styles.couponBox}>
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
//         </View> */}

//         <Text style={styles.footerText}>
//           Have questions? <Text style={{ color: "#fbc02d" }}>Check FAQs and Terms</Text>
//         </Text>
//       </ScrollView>

//       <Animated.View
//         style={[
//           styles.floatingContainer,
//           { transform: [{ translateY }] },
//         ]}
//       >
//         <TouchableOpacity style={styles.floatingButton} onPress={handleJoinGold}>
//           <Text style={styles.floatingText}>Join Elit — ₹1 for 3 months</Text>
//         </TouchableOpacity>
//       </Animated.View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#000" },
//   header: { flexDirection: "row", padding: 14 },
//   logo: { fontSize: 22, color: "#fff", fontWeight: "700", textAlign: "center" },
//   goldTitleBox: {
//     alignSelf: "center",
//     borderRadius: 12,
//     paddingVertical: 6,
//     paddingHorizontal: 22,
//     backgroundColor: "#f6d87b",
//     marginVertical: 8,
//     shadowColor: "#fbc02d",
//     shadowOpacity: Platform.OS === "ios" ? 0.25 : 0.12,
//     shadowRadius: 6,
//     elevation: 3,
//   },
//   gold: {
//     fontSize: 30,
//     fontWeight: "900",
//     color: "#000",
//     letterSpacing: 1.5,
//   },
//   updateBox: {
//     backgroundColor: "#121212",
//     borderRadius: 10,
//     padding: 14,
//     marginHorizontal: 18,
//     marginVertical: 18,
//     borderWidth: 1,
//     borderColor: "#2a2200",
//   },
//   updateTitle: { color: "#fbc02d", fontWeight: "800", marginBottom: 6 },
//   updateText: { color: "#ddd" },
//   strike: { textDecorationLine: "line-through", color: "#999" },
//   planBox: {
//     backgroundColor: "#0e0e0e",
//     borderRadius: 12,
//     marginHorizontal: 18,
//     padding: 22,
//     alignItems: "center",
//     marginBottom: 18,
//     borderWidth: 1,
//     borderColor: "#2e2200",
//   },
//   planHeader: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
//   goldDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#fbc02d", marginRight: 8 },
//   planSubTitle: { color: "#fbc02d", fontWeight: "700" },
//   planPrice: { fontSize: 36, fontWeight: "900", color: "#fff", marginTop: 6 },
//   planDuration: { color: "#ccc", marginBottom: 12 },
//   joinButton: {
//     backgroundColor: "#fbc02d",
//     borderRadius: 30,
//     paddingVertical: 12,
//     paddingHorizontal: 36,
//   },
//   joinText: { color: "#000", fontWeight: "800" },
//   sectionTitle: { color: "#fbc02d", textAlign: "center", marginVertical: 10, fontWeight: "800" },
//   benefitBox: {
//     backgroundColor: "#121212",
//     marginHorizontal: 18,
//     padding: 14,
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   benefitItem: { flexDirection: "row", marginBottom: 14 },
//   benefitTitle: { color: "#fff", fontWeight: "700" },
//   benefitDesc: { color: "#ccc", marginTop: 4 },
//   couponBox: {
//     flexDirection: "row",
//     marginHorizontal: 18,
//     paddingHorizontal: 12,
//     paddingVertical: 10,
//     borderRadius: 10,
//     backgroundColor: "#0f0f0f",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 40,
//   },
//   couponInput: { flex: 1, color: "#fff", paddingRight: 12 },
//   applyText: { color: "#fbc02d", fontWeight: "700" },
//   footerText: { color: "#aaa", textAlign: "center", marginBottom: 40 },
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
//     paddingHorizontal: 36,
//     shadowColor: "#fbc02d",
//     shadowOpacity: 0.6,
//     shadowRadius: 8,
//     elevation: 6,
//   },
//   floatingText: { color: "#000", fontWeight: "800" },
// });

// export default GoldScreen;


// GoldScreen.tsx
import React, { useRef, useState } from "react";
import {
  Alert,
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  StatusBar,
  Dimensions,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS } from "../theme/color";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const GOLD_COLOR = "#FFD700"; // Rich Gold
const GOLD_DARK = "#B8860B"; // Darker Gold for borders/depth
const BG_COLOR = "#080808"; // Deep Matte Black
const CARD_BG = "#161616"; // Slightly lighter for cards

const GoldScreen = () => {
  const [coupon, setCoupon] = useState("");
  const buttonAnim = useRef(new Animated.Value(1)).current;
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

  const handleScroll = (event: any) => {
    const currentY = event.nativeEvent.contentOffset.y;

    if (currentY > lastScrollY + 8) {
      Animated.timing(buttonAnim, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }).start();
    } else if (currentY < lastScrollY - 8) {
      Animated.timing(buttonAnim, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }).start();
    }

    setLastScrollY(currentY);
  };

  const translateY = buttonAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 150], // Adjusted slightly to ensure it hides fully
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={BG_COLOR} />
      
      {/* Fixed Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>RESTRO</Text>
        <View style={{ width: 40 }} /> {/* Spacer for balance */}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 160 }}
      >
        {/* Crown & Title Section */}
        <View style={styles.heroSection}>
          <View style={styles.crownContainer}>
             <FontAwesome5 name="crown" size={32} color="#000" />
          </View>
          <Text style={styles.goldTitle}>ELITE</Text>
          <Text style={styles.goldSubtitle}>MEMBERSHIP</Text>
        </View>

        {/* Special Offer Alert */}
        <View style={styles.updateBox}>
          <View style={styles.blastIcon}>
            <Text style={{fontSize: 18}}>✨</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.updateTitle}>Limited Time Benefit</Text>
            <Text style={styles.updateText}>
              Get FREE delivery on orders above{" "}
              <Text style={styles.strike}>₹199</Text> <Text style={styles.highlightPrice}>₹99</Text>
            </Text>
          </View>
        </View>

        {/* Main Pricing Card */}
        <View style={styles.planBox}>
          <View style={styles.planHeader}>
            <View style={styles.badge}>
                <Text style={styles.badgeText}>RECOMMENDED</Text>
            </View>
            <Text style={styles.planSubTitle}>UNLIMITED FREE DELIVERIES</Text>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.currencySymbol}>₹</Text>
            <Text style={styles.planPrice}>1</Text>
          </View>
          
          <Text style={styles.planDuration}>for 3 months</Text>

          <TouchableOpacity activeOpacity={0.8} style={styles.joinButton} onPress={handleJoinGold}>
            <Text style={styles.joinText}>JOIN ELITE NOW</Text>
            <Ionicons name="arrow-forward" size={18} color="#000" />
          </TouchableOpacity>
          
          <Text style={styles.cancelAnytime}>Auto-renews at ₹299. Cancel anytime.</Text>
        </View>

        {/* Benefits Section */}
        <View style={styles.benefitsContainer}>
            <Text style={styles.sectionTitle}>MEMBER PRIVILEGES</Text>

            <View style={styles.benefitCard}>
                <View style={styles.iconCircle}>
                    <FontAwesome5 name="motorcycle" size={20} color={GOLD_COLOR} />
                </View>
                <View style={styles.benefitContent}>
                    <Text style={styles.benefitTitle}>Zero Delivery Fee</Text>
                    <Text style={styles.benefitDesc}>
                        Save ₹40-₹60 on every order. No surge fees during rush hour.
                    </Text>
                </View>
            </View>

            <View style={styles.benefitCard}>
                <View style={styles.iconCircle}>
                    <FontAwesome5 name="utensils" size={20} color={GOLD_COLOR} />
                </View>
                <View style={styles.benefitContent}>
                    <Text style={styles.benefitTitle}>VIP Dining Access</Text>
                    <Text style={styles.benefitDesc}>
                        Up to 40% flat off at 10,000+ top partner restaurants.
                    </Text>
                </View>
            </View>

             <View style={styles.benefitCard}>
                <View style={styles.iconCircle}>
                    <FontAwesome5 name="gift" size={20} color={GOLD_COLOR} />
                </View>
                <View style={styles.benefitContent}>
                    <Text style={styles.benefitTitle}>Priority Support</Text>
                    <Text style={styles.benefitDesc}>
                        Dedicated support line for Elite members only.
                    </Text>
                </View>
            </View>
        </View>

        {/* Optional Coupon Section (Commented out in original, kept here structurally) */}
        {/* <View style={styles.couponBox}> ... </View> */}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Have questions? <Text style={styles.linkText}>View FAQs</Text>
          </Text>
          <View style={styles.secureBadge}>
             <FontAwesome5 name="shield-alt" size={12} color="#666" />
             <Text style={styles.secureText}>100% Secure Payment</Text>
          </View>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <Animated.View
        style={[
          styles.floatingContainer,
          { transform: [{ translateY }] },
        ]}
      >
        <TouchableOpacity activeOpacity={0.9} style={styles.floatingButton} onPress={handleJoinGold}>
          <View>
             <Text style={styles.floatingTitle}>JOIN ELITE</Text>
             <Text style={styles.floatingSub}>₹1 for 3 months</Text>
          </View>
          <View style={styles.floatingArrow}>
             <Ionicons name="arrow-forward" size={24} color={GOLD_COLOR} />
          </View>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: BG_COLOR 
  },
  
  // Header
  header: { 
    flexDirection: "row", 
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
    backgroundColor: '#1a1a1a',
    borderRadius: 50,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 4,
  },

  // Hero Section
  heroSection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  crownContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: GOLD_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: GOLD_COLOR,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 10,
    marginBottom: 10,
  },
  goldTitle: {
    fontSize: 42,
    fontWeight: "900",
    color: "#fff",
    letterSpacing: 2,
    lineHeight: 44,
  },
  goldSubtitle: {
    fontSize: 14,
    color: GOLD_COLOR,
    fontWeight: '600',
    letterSpacing: 6,
    marginTop: 5,
  },

  // Update Box
  updateBox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 215, 0, 0.1)', // low opacity gold
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
    alignItems: 'center',
  },
  blastIcon: {
    marginRight: 12,
  },
  updateTitle: { 
    color: GOLD_COLOR, 
    fontSize: 14,
    fontWeight: "700", 
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  updateText: { 
    color: "#ccc", 
    fontSize: 13,
    lineHeight: 18,
  },
  strike: { 
    textDecorationLine: "line-through", 
    color: "#888",
    fontSize: 12 
  },
  highlightPrice: {
    color: '#fff',
    fontWeight: '700',
  },

  // Plan Card
  planBox: {
    backgroundColor: CARD_BG,
    borderRadius: 24,
    marginHorizontal: 16,
    padding: 24,
    alignItems: "center",
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#333',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
    position: 'relative',
    overflow: 'hidden',
  },
  planHeader: { 
    alignItems: "center", 
    marginBottom: 10 
  },
  badge: {
    backgroundColor: '#333',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 8,
  },
  badgeText: {
    color: GOLD_COLOR,
    fontSize: 10,
    fontWeight: '800',
  },
  planSubTitle: { 
    color: "#fff", 
    fontWeight: "600",
    fontSize: 14,
    letterSpacing: 1,
    textAlign: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  currencySymbol: {
    fontSize: 24,
    color: GOLD_COLOR,
    marginTop: 12,
    fontWeight: '700',
  },
  planPrice: { 
    fontSize: 72, 
    fontWeight: "800", 
    color: "#fff", 
    includeFontPadding: false,
  },
  planDuration: { 
    color: "#888", 
    fontSize: 16,
    marginBottom: 24,
    marginTop: -10,
  },
  joinButton: {
    backgroundColor: GOLD_COLOR,
    borderRadius: 50,
    paddingVertical: 16,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: GOLD_COLOR,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  joinText: { 
    color: "#000", 
    fontWeight: "800",
    fontSize: 16,
    letterSpacing: 0.5,
    marginRight: 8,
  },
  cancelAnytime: {
    marginTop: 16,
    color: '#555',
    fontSize: 12,
  },

  // Benefits
  benefitsContainer: {
    paddingHorizontal: 20,
  },
  sectionTitle: { 
    color: "#fff", 
    fontSize: 12,
    letterSpacing: 2,
    marginBottom: 20, 
    fontWeight: "700",
    opacity: 0.5,
  },
  benefitCard: {
    flexDirection: 'row',
    backgroundColor: CARD_BG,
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  benefitContent: {
    flex: 1,
  },
  benefitTitle: { 
    color: "#fff", 
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 4,
  },
  benefitDesc: { 
    color: "#888", 
    fontSize: 13,
    lineHeight: 18,
  },

  // Footer
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: { 
    color: "#666", 
    fontSize: 14,
    marginBottom: 10,
  },
  linkText: { 
    color: GOLD_COLOR,
    textDecorationLine: 'underline',
  },
  secureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    opacity: 0.6,
  },
  secureText: {
    color: '#666',
    fontSize: 12,
    marginLeft: 6,
  },

  // Floating Button
  floatingContainer: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
  },
  floatingButton: {
    backgroundColor: COLORS.yelow,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#333',
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  floatingTitle: { 
    color: "#fff", 
    fontWeight: "800",
    fontSize: 16,
  },
  floatingSub: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
  },
  floatingArrow: {
      backgroundColor: COLORS.white,
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
  }
});

export default GoldScreen;