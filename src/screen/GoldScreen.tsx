
// // GoldScreen.tsx
// import { useNavigation } from "@react-navigation/native";
// import React, { useRef, useState } from "react";
// import {
//   ActivityIndicator,
//   Alert,
//   Animated,
//   Dimensions,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import { useGetEliteMembershipDetails } from "../api/hooks/eliteMembership";
// import { COLORS } from "../theme/color";

// const { width } = Dimensions.get("window");
// const GOLD_COLOR = "#FFD700"; // Rich Gold
// const GOLD_DARK = "#B8860B"; // Darker Gold for borders/depth
// const BG_COLOR = "#080808"; // Deep Matte Black
// const CARD_BG = "#161616"; // Slightly lighter for cards

// const GoldScreen = () => {
//   const navigation = useNavigation();
//   const [coupon, setCoupon] = useState("");
//   const buttonAnim = useRef(new Animated.Value(1)).current;
//   const [lastScrollY, setLastScrollY] = useState(0);

//   // --- FETCH ELITE MEMBERSHIP DATA FROM API ---
//   const { data: membershipData, isLoading, isError } = useGetEliteMembershipDetails();
//   console.log("membershipData", membershipData);

//   // Calculate validity in months from days (API returns validityInDays)
//   const validityMonths = membershipData?.validityInDays 
//     ? Math.round(membershipData.validityInDays / 30) 
//     : 3;
  
//   // Get price and name from API with fallback defaults
//   const membershipPrice = membershipData?.price ?? 1;
//   const membershipName = membershipData?.name || "ELITE";
//   const membershipDescription = membershipData?.description || "UNLIMITED FREE DELIVERIES";

//   const handleBack = () => navigation.goBack();

//   const handleJoinGold = () =>
//     Alert.alert("Success", `You have joined ${membershipName} Membership!`);

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

//   // --- LOADING STATE ---
//   if (isLoading) {
//     return (
//       <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
//         <StatusBar barStyle="light-content" backgroundColor={BG_COLOR} />
//         <ActivityIndicator size="large" color={GOLD_COLOR} />
//         <Text style={{ color: GOLD_COLOR, marginTop: 16, fontSize: 16 }}>Loading Membership...</Text>
//       </SafeAreaView>
//     );
//   }

//   // --- ERROR STATE ---
//   if (isError) {
//     return (
//       <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
//         <StatusBar barStyle="light-content" backgroundColor={BG_COLOR} />
//         <FontAwesome5 name="exclamation-circle" size={50} color="#ff4444" />
//         <Text style={{ color: '#fff', marginTop: 16, fontSize: 16 }}>Failed to load membership details</Text>
//         <TouchableOpacity 
//           style={{ marginTop: 20, backgroundColor: GOLD_COLOR, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8 }}
//           onPress={() => navigation.goBack()}
//         >
//           <Text style={{ color: '#000', fontWeight: 'bold' }}>Go Back</Text>
//         </TouchableOpacity>
//       </SafeAreaView>
//     );
//   }

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
//           <Text style={styles.goldTitle}>{membershipName.toUpperCase()}</Text>
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
//             <Text style={styles.planSubTitle}>{membershipDescription.toUpperCase()}</Text>
//           </View>

//           <View style={styles.priceContainer}>
//             <Text style={styles.currencySymbol}>₹</Text>
//             <Text style={styles.planPrice}>{membershipPrice}</Text>
//           </View>
          
//           <Text style={styles.planDuration}>for {validityMonths} month{validityMonths > 1 ? 's' : ''}</Text>

//           <TouchableOpacity activeOpacity={0.8} style={styles.joinButton} onPress={handleJoinGold}>
//             <Text style={styles.joinText}>JOIN {membershipName.toUpperCase()} NOW</Text>
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
//              <Text style={styles.floatingTitle}>JOIN {membershipName.toUpperCase()}</Text>
//              <Text style={styles.floatingSub}>₹{membershipPrice} for {validityMonths} month{validityMonths > 1 ? 's' : ''}</Text>
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



import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PremiumScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#050505" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Top Badge */}
        <View style={styles.badgeContainer}>
          <FontAwesome5 name="crown" size={14} color="#E5C76B" />
          <Text style={styles.badgeText}>INDIA'S TOP SAVINGS PROGRAM</Text>
          <FontAwesome5 name="crown" size={14} color="#E5C76B" />
        </View>

        {/* Main Title */}
        <Text style={styles.mainTitle}>
          Experience the <Text style={styles.highlightText}>Free Delivery</Text> and More
        </Text>

        {/* Sub-header */}
        <Text style={styles.subHeaderText}>
          Join the elite community of food lovers and enjoy unlimited perks.
        </Text>

        {/* Features Card Container */}
        <View style={styles.cardsContainer}>
          
          {/* Feature 1 */}
          <View style={styles.featureCard}>
            <View style={styles.iconGlow}>
              <View style={styles.iconContainer}>
                <Icon name="bike-fast" size={28} color="#E5C76B" />
              </View>
            </View>
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureLabel}>MEMBER PERK</Text>
              <Text style={styles.featureTitle}>Free Delivery</Text>
              <Text style={styles.featureDesc}>Unlimited free deliveries on all your orders from top restaurants within 7 km.</Text>
            </View>
          </View>

          {/* Feature 2 */}
          <View style={styles.featureCard}>
            <View style={styles.iconGlow}>
              <View style={styles.iconContainer}>
                <Icon name="ticket-percent-outline" size={28} color="#E5C76B" />
              </View>
            </View>
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureLabel}>EXCLUSIVE</Text>
              <Text style={styles.featureTitle}>Up to 30% Extra Off</Text>
              <Text style={styles.featureDesc}>Combine your premium perks with regular offers at 5,000+ partner restaurants for huge savings.</Text>
            </View>
          </View>
          
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050505', // Deeper premium black
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 60,
    alignItems: 'center',
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(229, 199, 107, 0.08)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(229, 199, 107, 0.25)',
    marginBottom: 32,
  },
  badgeText: {
    color: '#E5C76B',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2.5,
    marginHorizontal: 10,
  },
  mainTitle: {
    fontSize: 40,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 48,
    fontFamily: 'serif',
  },
  highlightText: {
    color: '#E5C76B', // Golden text highlight
  },
  subHeaderText: {
    color: '#888888',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 44,
    lineHeight: 24,
    paddingHorizontal: 15,
    fontWeight: '500',
  },
  cardsContainer: {
    width: '100%',
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111111',
    borderRadius: 24,
    padding: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#222222',
  },
  iconGlow: {
    marginRight: 20,
  },
  iconContainer: {
    backgroundColor: 'rgba(229, 199, 107, 0.1)',
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(229, 199, 107, 0.2)',
  },
  featureTextContainer: {
    flex: 1,
  },
  featureLabel: {
    color: '#E5C76B',
    fontSize: 10,
    fontWeight: '800',
    marginBottom: 6,
    letterSpacing: 1.5,
  },
  featureTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  featureDesc: {
    color: '#777',
    fontSize: 14,
    lineHeight: 20,
  },
});

export default PremiumScreen;