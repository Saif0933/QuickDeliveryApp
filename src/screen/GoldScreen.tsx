
// // GoldScreen.tsx
// import React, { useRef, useState } from "react";
// import {
//   Alert,
//   Animated,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   Platform,
//   StatusBar,
//   Dimensions,
// } from "react-native";
// import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import { COLORS } from "../theme/color";
// import { SafeAreaView } from "react-native-safe-area-context";

// const { width } = Dimensions.get("window");
// const GOLD_COLOR = "#FFD700"; // Rich Gold
// const GOLD_DARK = "#B8860B"; // Darker Gold for borders/depth
// const BG_COLOR = "#080808"; // Deep Matte Black
// const CARD_BG = "#161616"; // Slightly lighter for cards

// const GoldScreen = () => {
//   const [coupon, setCoupon] = useState("");
//   const buttonAnim = useRef(new Animated.Value(1)).current;
//   const [lastScrollY, setLastScrollY] = useState(0);

//   const handleBack = () => Alert.alert("Back", "Go back to the previous screen");

//   const handleJoinGold = () =>
//     Alert.alert("Success", "You have joined RESTRO Gold!");

//   const handleApplyCoupon = () => {
//     if (coupon.trim() === "") {
//       Alert.alert("Error", "Please enter a coupon code.");
//     } else {
//       Alert.alert("Coupon Applied", `Applied coupon: ${coupon}`);
//       setCoupon("");
//     }
//   };

//   const handleScroll = (event: any) => {
//     const currentY = event.nativeEvent.contentOffset.y;

//     if (currentY > lastScrollY + 8) {
//       Animated.timing(buttonAnim, {
//         toValue: 0,
//         duration: 220,
//         useNativeDriver: true,
//       }).start();
//     } else if (currentY < lastScrollY - 8) {
//       Animated.timing(buttonAnim, {
//         toValue: 1,
//         duration: 220,
//         useNativeDriver: true,
//       }).start();
//     }

//     setLastScrollY(currentY);
//   };

//   const translateY = buttonAnim.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0, 150], // Adjusted slightly to ensure it hides fully
//   });

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor={BG_COLOR} />
      
//       {/* Fixed Header */}
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backButton} onPress={handleBack}>
//           <Ionicons name="arrow-back" size={24} color="#fff" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>RESTRO</Text>
//         <View style={{ width: 40 }} /> {/* Spacer for balance */}
//       </View>

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         onScroll={handleScroll}
//         scrollEventThrottle={16}
//         contentContainerStyle={{ paddingBottom: 160 }}
//       >
//         {/* Crown & Title Section */}
//         <View style={styles.heroSection}>
//           <View style={styles.crownContainer}>
//              <FontAwesome5 name="crown" size={32} color="#000" />
//           </View>
//           <Text style={styles.goldTitle}>ELITE</Text>
//           <Text style={styles.goldSubtitle}>MEMBERSHIP</Text>
//         </View>

//         {/* Special Offer Alert */}
//         <View style={styles.updateBox}>
//           <View style={styles.blastIcon}>
//             <Text style={{fontSize: 18}}>✨</Text>
//           </View>
//           <View style={{flex: 1}}>
//             <Text style={styles.updateTitle}>Limited Time Benefit</Text>
//             <Text style={styles.updateText}>
//               Get FREE delivery on orders above{" "}
//               <Text style={styles.strike}>₹199</Text> <Text style={styles.highlightPrice}>₹99</Text>
//             </Text>
//           </View>
//         </View>

//         {/* Main Pricing Card */}
//         <View style={styles.planBox}>
//           <View style={styles.planHeader}>
//             <View style={styles.badge}>
//                 <Text style={styles.badgeText}>RECOMMENDED</Text>
//             </View>
//             <Text style={styles.planSubTitle}>UNLIMITED FREE DELIVERIES</Text>
//           </View>

//           <View style={styles.priceContainer}>
//             <Text style={styles.currencySymbol}>₹</Text>
//             <Text style={styles.planPrice}>1</Text>
//           </View>
          
//           <Text style={styles.planDuration}>for 3 months</Text>

//           <TouchableOpacity activeOpacity={0.8} style={styles.joinButton} onPress={handleJoinGold}>
//             <Text style={styles.joinText}>JOIN ELITE NOW</Text>
//             <Ionicons name="arrow-forward" size={18} color="#000" />
//           </TouchableOpacity>
          
//           <Text style={styles.cancelAnytime}>Auto-renews at ₹299. Cancel anytime.</Text>
//         </View>

//         {/* Benefits Section */}
//         <View style={styles.benefitsContainer}>
//             <Text style={styles.sectionTitle}>MEMBER PRIVILEGES</Text>

//             <View style={styles.benefitCard}>
//                 <View style={styles.iconCircle}>
//                     <FontAwesome5 name="motorcycle" size={20} color={GOLD_COLOR} />
//                 </View>
//                 <View style={styles.benefitContent}>
//                     <Text style={styles.benefitTitle}>Zero Delivery Fee</Text>
//                     <Text style={styles.benefitDesc}>
//                         Save ₹40-₹60 on every order. No surge fees during rush hour.
//                     </Text>
//                 </View>
//             </View>

//             <View style={styles.benefitCard}>
//                 <View style={styles.iconCircle}>
//                     <FontAwesome5 name="utensils" size={20} color={GOLD_COLOR} />
//                 </View>
//                 <View style={styles.benefitContent}>
//                     <Text style={styles.benefitTitle}>VIP Dining Access</Text>
//                     <Text style={styles.benefitDesc}>
//                         Up to 40% flat off at 10,000+ top partner restaurants.
//                     </Text>
//                 </View>
//             </View>

//              <View style={styles.benefitCard}>
//                 <View style={styles.iconCircle}>
//                     <FontAwesome5 name="gift" size={20} color={GOLD_COLOR} />
//                 </View>
//                 <View style={styles.benefitContent}>
//                     <Text style={styles.benefitTitle}>Priority Support</Text>
//                     <Text style={styles.benefitDesc}>
//                         Dedicated support line for Elite members only.
//                     </Text>
//                 </View>
//             </View>
//         </View>

//         {/* Optional Coupon Section (Commented out in original, kept here structurally) */}
//         {/* <View style={styles.couponBox}> ... </View> */}

//         <View style={styles.footer}>
//           <Text style={styles.footerText}>
//             Have questions? <Text style={styles.linkText}>View FAQs</Text>
//           </Text>
//           <View style={styles.secureBadge}>
//              <FontAwesome5 name="shield-alt" size={12} color="#666" />
//              <Text style={styles.secureText}>100% Secure Payment</Text>
//           </View>
//         </View>
//       </ScrollView>

//       {/* Floating Action Button */}
//       <Animated.View
//         style={[
//           styles.floatingContainer,
//           { transform: [{ translateY }] },
//         ]}
//       >
//         <TouchableOpacity activeOpacity={0.9} style={styles.floatingButton} onPress={handleJoinGold}>
//           <View>
//              <Text style={styles.floatingTitle}>JOIN ELITE</Text>
//              <Text style={styles.floatingSub}>₹1 for 3 months</Text>
//           </View>
//           <View style={styles.floatingArrow}>
//              <Ionicons name="arrow-forward" size={24} color={GOLD_COLOR} />
//           </View>
//         </TouchableOpacity>
//       </Animated.View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { 
//     flex: 1, 
//     backgroundColor: BG_COLOR 
//   },
  
//   // Header
//   header: { 
//     flexDirection: "row", 
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//   },
//   backButton: {
//     padding: 8,
//     backgroundColor: '#1a1a1a',
//     borderRadius: 50,
//   },
//   headerTitle: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#fff',
//     letterSpacing: 4,
//   },

//   // Hero Section
//   heroSection: {
//     alignItems: 'center',
//     marginTop: 20,
//     marginBottom: 30,
//   },
//   crownContainer: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: GOLD_COLOR,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: GOLD_COLOR,
//     shadowOffset: { width: 0, height: 0 },
//     shadowOpacity: 0.6,
//     shadowRadius: 20,
//     elevation: 10,
//     marginBottom: 10,
//   },
//   goldTitle: {
//     fontSize: 42,
//     fontWeight: "900",
//     color: "#fff",
//     letterSpacing: 2,
//     lineHeight: 44,
//   },
//   goldSubtitle: {
//     fontSize: 14,
//     color: GOLD_COLOR,
//     fontWeight: '600',
//     letterSpacing: 6,
//     marginTop: 5,
//   },

//   // Update Box
//   updateBox: {
//     flexDirection: 'row',
//     backgroundColor: 'rgba(255, 215, 0, 0.1)', // low opacity gold
//     borderRadius: 16,
//     padding: 16,
//     marginHorizontal: 16,
//     marginBottom: 24,
//     borderWidth: 1,
//     borderColor: 'rgba(255, 215, 0, 0.3)',
//     alignItems: 'center',
//   },
//   blastIcon: {
//     marginRight: 12,
//   },
//   updateTitle: { 
//     color: GOLD_COLOR, 
//     fontSize: 14,
//     fontWeight: "700", 
//     marginBottom: 4,
//     textTransform: 'uppercase',
//   },
//   updateText: { 
//     color: "#ccc", 
//     fontSize: 13,
//     lineHeight: 18,
//   },
//   strike: { 
//     textDecorationLine: "line-through", 
//     color: "#888",
//     fontSize: 12 
//   },
//   highlightPrice: {
//     color: '#fff',
//     fontWeight: '700',
//   },

//   // Plan Card
//   planBox: {
//     backgroundColor: CARD_BG,
//     borderRadius: 24,
//     marginHorizontal: 16,
//     padding: 24,
//     alignItems: "center",
//     marginBottom: 30,
//     borderWidth: 1,
//     borderColor: '#333',
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.5,
//     shadowRadius: 15,
//     elevation: 10,
//     position: 'relative',
//     overflow: 'hidden',
//   },
//   planHeader: { 
//     alignItems: "center", 
//     marginBottom: 10 
//   },
//   badge: {
//     backgroundColor: '#333',
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 8,
//     marginBottom: 8,
//   },
//   badgeText: {
//     color: GOLD_COLOR,
//     fontSize: 10,
//     fontWeight: '800',
//   },
//   planSubTitle: { 
//     color: "#fff", 
//     fontWeight: "600",
//     fontSize: 14,
//     letterSpacing: 1,
//     textAlign: 'center',
//   },
//   priceContainer: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     marginTop: 10,
//   },
//   currencySymbol: {
//     fontSize: 24,
//     color: GOLD_COLOR,
//     marginTop: 12,
//     fontWeight: '700',
//   },
//   planPrice: { 
//     fontSize: 72, 
//     fontWeight: "800", 
//     color: "#fff", 
//     includeFontPadding: false,
//   },
//   planDuration: { 
//     color: "#888", 
//     fontSize: 16,
//     marginBottom: 24,
//     marginTop: -10,
//   },
//   joinButton: {
//     backgroundColor: GOLD_COLOR,
//     borderRadius: 50,
//     paddingVertical: 16,
//     width: '100%',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: GOLD_COLOR,
//     shadowOpacity: 0.4,
//     shadowRadius: 10,
//     shadowOffset: { width: 0, height: 4 },
//     elevation: 8,
//   },
//   joinText: { 
//     color: "#000", 
//     fontWeight: "800",
//     fontSize: 16,
//     letterSpacing: 0.5,
//     marginRight: 8,
//   },
//   cancelAnytime: {
//     marginTop: 16,
//     color: '#555',
//     fontSize: 12,
//   },

//   // Benefits
//   benefitsContainer: {
//     paddingHorizontal: 20,
//   },
//   sectionTitle: { 
//     color: "#fff", 
//     fontSize: 12,
//     letterSpacing: 2,
//     marginBottom: 20, 
//     fontWeight: "700",
//     opacity: 0.5,
//   },
//   benefitCard: {
//     flexDirection: 'row',
//     backgroundColor: CARD_BG,
//     marginBottom: 16,
//     padding: 16,
//     borderRadius: 16,
//     alignItems: 'center',
//   },
//   iconCircle: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     backgroundColor: 'rgba(255, 215, 0, 0.1)',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 16,
//   },
//   benefitContent: {
//     flex: 1,
//   },
//   benefitTitle: { 
//     color: "#fff", 
//     fontWeight: "700",
//     fontSize: 16,
//     marginBottom: 4,
//   },
//   benefitDesc: { 
//     color: "#888", 
//     fontSize: 13,
//     lineHeight: 18,
//   },

//   // Footer
//   footer: {
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   footerText: { 
//     color: "#666", 
//     fontSize: 14,
//     marginBottom: 10,
//   },
//   linkText: { 
//     color: GOLD_COLOR,
//     textDecorationLine: 'underline',
//   },
//   secureBadge: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     opacity: 0.6,
//   },
//   secureText: {
//     color: '#666',
//     fontSize: 12,
//     marginLeft: 6,
//   },

//   // Floating Button
//   floatingContainer: {
//     position: "absolute",
//     bottom: 30,
//     left: 20,
//     right: 20,
//   },
//   floatingButton: {
//     backgroundColor: COLORS.yelow,
//     borderRadius: 16,
//     paddingVertical: 14,
//     paddingHorizontal: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     borderWidth: 1,
//     borderColor: '#333',
//     shadowColor: "#000",
//     shadowOpacity: 0.5,
//     shadowRadius: 10,
//     elevation: 10,
//   },
//   floatingTitle: { 
//     color: "#fff", 
//     fontWeight: "800",
//     fontSize: 16,
//   },
//   floatingSub: {
//     color: COLORS.white,
//     fontSize: 12,
//     fontWeight: '600',
//   },
//   floatingArrow: {
//       backgroundColor: COLORS.white,
//       width: 40,
//       height: 40,
//       borderRadius: 20,
//       alignItems: 'center',
//       justifyContent: 'center',
//   }
// });

// export default GoldScreen;


import React, { useRef, useState } from "react";
import {
  Alert,
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Dimensions,
  Image,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

// Colors from the image
const BG_COLOR = "#0D0D0D"; // Dark background
const GOLD_TEXT = "#E3C070"; // The specific gold shade for text
const CARD_BG = "#1A1A1A"; // Card background
const BEIGE_BG = "#FDF4E5"; // The "Special benefit update" box bg
const BUTTON_GRADIENT_START = "#E8C678"; // Approx gradient start for button
const BUTTON_GRADIENT_END = "#CFA252"; // Approx gradient end

const GoldScreen = () => {
  const [coupon, setCoupon] = useState("");
  const buttonAnim = useRef(new Animated.Value(1)).current;
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleBack = () => Alert.alert("Back", "Go back to the previous screen");

  const handleJoinGold = () =>
    Alert.alert("Success", "You have joined RESTRO Gold!");

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
    outputRange: [100, 0], // Hides by moving down
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={BG_COLOR} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Zomato GOLD Title */}
        <View style={styles.logoSection}>
          <Text style={styles.logoTopText}>zomato</Text>
          <View style={styles.goldLogoRow}>
            <Text style={styles.goldLogoText}>G</Text>
            <View style={styles.crownIconContainer}>
               <FontAwesome5 name="crown" size={22} color="#000" solid />
            </View>
            <Text style={styles.goldLogoText}>LD</Text>
          </View>
        </View>

        {/* Special Benefit Update Box */}
        <View style={styles.specialBenefitBox}>
          <View style={styles.blackCrownCircle}>
             <FontAwesome5 name="crown" size={16} color={GOLD_TEXT} solid />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.benefitTitle}>Special benefit update!</Text>
            <Text style={styles.benefitSub}>
              Now enjoy <Text style={{ fontWeight: "700" }}>FREE delivery</Text> on orders above <Text style={styles.strikeText}>₹199</Text> <Text style={{ fontWeight: "700" }}>₹99</Text>
            </Text>
          </View>
        </View>

        {/* Pricing Card */}
        <View style={styles.pricingCard}>
          <View style={styles.pricingHeader}>
            <Text style={styles.pricingHeaderText}>UNLIMITED FREE DELIVERIES & MORE</Text>
          </View>
          
          <View style={styles.priceRow}>
            <Text style={styles.rupeeSymbol}>₹</Text>
            <Text style={styles.priceNumber}>1</Text>
            <Text style={styles.priceDuration}>  for 3 months</Text>
          </View>

          <TouchableOpacity activeOpacity={0.8} style={styles.mainJoinButton} onPress={handleJoinGold}>
            <Text style={styles.mainJoinButtonText}>Join Gold</Text>
          </TouchableOpacity>
        </View>

        {/* Gold Benefits Title */}
        <View style={styles.sectionHeader}>
          <Text style={styles.star}>★</Text>
          <Text style={styles.sectionHeaderText}>  GOLD BENEFITS  </Text>
          <Text style={styles.star}>★</Text>
        </View>

        {/* Benefits List */}
        <View style={styles.benefitsCard}>
          
          {/* Free Delivery Item */}
          <View style={styles.benefitRow}>
            <View style={styles.benefitIconContainer}>
               {/* Using an image or icon to represent the scooter */}
               <MaterialCommunityIcons name="moped" size={36} color={BUTTON_GRADIENT_START} />
            </View>
            <View style={styles.benefitTextContainer}>
              <Text style={styles.benefitItemTitle}>Free delivery</Text>
              <Text style={styles.benefitItemDesc}>
                Free delivery and high demand surge fee waiver on orders above ₹99, from restaurants within 7 km. May not be applicable at a few restaurants that manage their own delivery.
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Extra Off Item */}
          <View style={styles.benefitRow}>
            <View style={styles.benefitIconContainer}>
               <MaterialCommunityIcons name="ticket-percent" size={36} color={BUTTON_GRADIENT_START} />
            </View>
            <View style={styles.benefitTextContainer}>
              <Text style={styles.benefitItemTitle}>Up to 30% extra off</Text>
              <Text style={styles.benefitItemDesc}>
                Above all existing offers at 20,000+ partner restaurants across India
              </Text>
            </View>
          </View>

        </View>

        {/* Coupon Code Section */}
        <TouchableOpacity style={styles.couponContainer} onPress={handleApplyCoupon}>
           <Text style={styles.couponText}>Have a coupon code?</Text>
           <Text style={styles.applyText}>Apply</Text>
        </TouchableOpacity>

        {/* Bottom Curved Section (Visual representation of bottom bar) */}
        {/* We use the floating button for the bottom interaction */}
        
        <View style={{ height: 60 }} />
        
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
            <Text style={styles.footerQuestion}>Have questions?</Text>
            <Text style={styles.footerLink}>Check FAQs and terms</Text>
        </View>

      </ScrollView>

      {/* Floating Bottom Bar (Simulating the sticky footer in image) */}
      <Animated.View
        style={[
          styles.floatingFooter,
          { transform: [{ translateY }] },
        ]}
      >
        {/* Curved Top Border Effect */}
        <View style={styles.curveContainer}>
           <View style={styles.curve} />
        </View>

        <View style={styles.footerContent}>
            <View style={{ alignItems: 'center', marginBottom: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                    <Text style={styles.footerPriceSymbol}>₹</Text>
                    <Text style={styles.footerPrice}>1</Text>
                </View>
                <Text style={styles.footerDuration}>for 3 months</Text>
            </View>

            <TouchableOpacity activeOpacity={0.8} style={styles.mainJoinButton} onPress={handleJoinGold}>
                <Text style={styles.mainJoinButtonText}>Join Gold</Text>
            </TouchableOpacity>
        </View>
      </Animated.View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  header: {
    padding: 16,
  },
  
  // Logo Section
  logoSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoTopText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '800',
    fontStyle: 'italic', // Zomato font style approx
  },
  goldLogoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -5,
  },
  goldLogoText: {
    color: GOLD_TEXT,
    fontSize: 52,
    fontWeight: '900',
    letterSpacing: 2,
  },
  crownIconContainer: {
    width: 44,
    height: 34, // Flattened look
    backgroundColor: GOLD_TEXT,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginHorizontal: 2,
    marginTop: 6,
    borderBottomLeftRadius: 16, // Creating the bowl shape of the "O"
    borderBottomRightRadius: 16,
  },

  // Special Benefit Box
  specialBenefitBox: {
    backgroundColor: BEIGE_BG,
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  blackCrownCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  benefitTitle: {
    color: '#8B5E16', // Dark brownish gold
    fontWeight: '800',
    fontSize: 13,
    marginBottom: 2,
  },
  benefitSub: {
    color: '#333',
    fontSize: 12,
    lineHeight: 16,
  },
  strikeText: {
    textDecorationLine: 'line-through',
    color: '#777',
  },

  // Pricing Card
  pricingCard: {
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 16,
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.03)',
    marginBottom: 30,
    alignItems: 'center',
  },
  pricingHeader: {
    position: 'absolute',
    top: -12,
    backgroundColor: '#9A7D46', // Muted Gold background for pill
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pricingHeaderText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 10,
    marginBottom: 20,
  },
  rupeeSymbol: {
    color: GOLD_TEXT,
    fontSize: 24,
    fontWeight: '700',
    marginRight: 4,
  },
  priceNumber: {
    color: GOLD_TEXT,
    fontSize: 48,
    fontWeight: '700',
  },
  priceDuration: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
  },
  mainJoinButton: {
    backgroundColor: 'linear-gradient(90deg, #E8C678 0%, #CFA252 100%)', // React Native needs LinearGradient lib for real gradient, using flat color fallback
    backgroundColor: BUTTON_GRADIENT_START, // Fallback
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  mainJoinButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '800',
  },

  // Gold Benefits Section
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  star: {
    color: GOLD_TEXT,
    fontSize: 14,
  },
  sectionHeaderText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 2,
  },
  benefitsCard: {
    backgroundColor: '#1C1C1C',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 8,
  },
  benefitIconContainer: {
    width: 40,
    alignItems: 'center',
    marginRight: 16,
    paddingTop: 4,
  },
  benefitTextContainer: {
    flex: 1,
  },
  benefitItemTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 6,
  },
  benefitItemDesc: {
    color: '#888',
    fontSize: 12,
    lineHeight: 18,
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 16,
  },

  // Coupon
  couponContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1C1C1C',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    borderStyle: 'dashed', // React native dashed border support is limited without extra views, flat for now
    borderWidth: 1,
    borderColor: '#333',
  },
  couponText: {
    color: '#ccc',
    fontSize: 13,
  },
  applyText: {
    color: GOLD_TEXT,
    fontWeight: '700',
    fontSize: 13,
  },

  // Footer Links
  footerQuestion: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  footerLink: {
    color: GOLD_TEXT,
    fontSize: 12,
    textDecorationLine: 'underline',
    textDecorationStyle: 'dotted', // Dotted underline support varies
  },

  // Floating Footer
  floatingFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: BG_COLOR,
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 10,
    // Simulate the curved light effect
    borderTopWidth: 0,
  },
  curveContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  curve: {
    width: width,
    height: 1,
    backgroundColor: GOLD_TEXT,
    opacity: 0.3,
    shadowColor: GOLD_TEXT,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
  },
  footerContent: {
    alignItems: 'center',
  },
  footerPriceSymbol: {
    color: GOLD_TEXT,
    fontSize: 18,
    fontWeight: '700',
    marginRight: 4,
  },
  footerPrice: {
    color: GOLD_TEXT,
    fontSize: 28,
    fontWeight: '800',
  },
  footerDuration: {
    color: '#fff',
    fontSize: 12,
    marginTop: -4,
  },
});

export default GoldScreen;