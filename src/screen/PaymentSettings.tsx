// // PaymentSettings.tsx
// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
//   StatusBar,
// } from "react-native";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import FontAwesome from "react-native-vector-icons/FontAwesome";
// import { COLORS } from "../theme/color";

// type Props = {
//   navigation?: any; // Add navigation prop for back button
// };

// const PaymentSettings: React.FC<Props> = ({ navigation }) => {
//   const handlePress = (title: string) => {
//     Alert.alert("Selected", title);
//   };

//   const handleBack = () => {
//     navigation?.goBack(); // Navigate back if navigation is provided
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={handleBack} style={styles.backButton}>
//           <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Payment Settings</Text>
//         <View style={styles.headerSpacer} /> {/* Spacer for alignment */}
//       </View>

//       <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
//         {/* Banner */}
//         <View style={styles.banner}>
//           <View style={styles.bannerIcon}>
//             <MaterialCommunityIcons name="wallet-giftcard" size={24} color={COLORS.primary} />
//           </View>
//           <Text style={styles.bannerText}>AMAZON PAY BALANCE</Text>
//           <Text style={styles.bannerSub}>
//             Get 3% cashback on every order.{'\n'}
//             <TouchableOpacity onPress={() => Alert.alert("More Info", "Learn about Amazon Pay Balance cashback!")}>
//               <Text style={styles.bannerLink}>Know more</Text>
//             </TouchableOpacity>
//           </Text>
//         </View>

//         {/* Cards Section */}
//         <Section title="CARDS" icon="credit-card-outline">
//           <Option
//             icon="card-outline"
//             text="Add credit or debit cards"
//             onPress={() => handlePress("Add credit or debit cards")}
//             iconLibrary="Ionicons"
//           />
//           <Option
//             icon="plus-box-outline"
//             text="Add Pluxee"
//             onPress={() => handlePress("Add Pluxee")}
//             iconLibrary="MaterialCommunityIcons"
//           />
//         </Section>

//         {/* UPI Section */}
//         <Section title="UPI" icon="bank-transfer">
//           <Option
//             icon="alpha-p-circle-outline"
//             text="PhonePe UPI"
//             onPress={() => handlePress("PhonePe UPI")}
//             iconLibrary="MaterialCommunityIcons"
//           />
//           <Option
//             icon="rupee"
//             text="Paytm UPI" // Changed to rupee icon for Paytm
//             onPress={() => handlePress("Paytm UPI")}
//             iconLibrary="FontAwesome"
//           />
//           <Option
//             icon="logo-amazon"
//             text="Amazon Pay UPI"
//             onPress={() => handlePress("Amazon Pay UPI")}
//             iconLibrary="Ionicons"
//           />
//           <Option
//             icon="cash-multiple"
//             text="Supermoney UPI"
//             onPress={() => handlePress("Supermoney UPI")}
//             iconLibrary="MaterialCommunityIcons"
//           />
//           <Option
//             icon="plus-circle-outline"
//             text="Add new UPI ID"
//             onPress={() => handlePress("Add new UPI ID")}
//             iconLibrary="MaterialCommunityIcons"
//             isAdd={true}
//           />
//         </Section>

//         {/* Wallets */}
//         <Section title="WALLETS" icon="wallet-outline">
//           <Option
//             icon="logo-amazon"
//             text="Amazon Pay Balance"
//             onPress={() => handlePress("Amazon Pay Balance")}
//             iconLibrary="Ionicons"
//           />
//           <Option
//             icon="wallet-outline"
//             text="Mobikwik"
//             onPress={() => handlePress("Mobikwik")}
//             iconLibrary="MaterialCommunityIcons"
//           />
//         </Section>

//         {/* Pay Later */}
//         <Section title="PAY LATER" icon="credit-card-clock-outline">
//           <Option
//             icon="credit-card-clock-outline"
//             text="Simpl"
//             onPress={() => handlePress("Simpl")}
//             iconLibrary="MaterialCommunityIcons"
//           />
//           <Option
//             icon="logo-amazon"
//             text="Amazon Pay Later"
//             onPress={() => handlePress("Amazon Pay Later")}
//             iconLibrary="Ionicons"
//           />
//           <Option
//             icon="play-circle-outline"
//             text="LazyPay"
//             onPress={() => handlePress("LazyPay")}
//             iconLibrary="MaterialCommunityIcons"
//           />
//         </Section>

//         {/* Netbanking */}
//         <Section title="NETBANKING" icon="bank">
//           <Option
//             icon="business-outline"
//             text="Netbanking"
//             onPress={() => handlePress("Netbanking")}
//             iconLibrary="Ionicons"
//           />
//         </Section>

//         {/* Settings */}
//         <Section title="SETTINGS" icon="cog-outline">
//           <Option
//             icon="cube-outline"
//             text="Pay on delivery"
//             rightText="ENABLE"
//             onPress={() => handlePress("Pay on delivery")}
//             iconLibrary="Ionicons"
//           />
//         </Section>
//         <View style={{height: 20}} />
//       </ScrollView>
//     </View>
//   );
// };

// export default PaymentSettings;

// // Section Component
// const Section: React.FC<{ title: string; icon?: string; children: React.ReactNode }> = ({ title, icon, children }) => (
//   <View style={styles.section}>
//     <View style={styles.sectionHeader}>
//       {icon && (
//         <MaterialCommunityIcons name={icon} size={20} color={COLORS.primary} style={styles.sectionIcon} />
//       )}
//       <Text style={styles.sectionTitle}>{title}</Text>
//     </View>
//     <View style={styles.sectionBox}>{children}</View>
//   </View>
// );

// // Option Component
// const Option: React.FC<{
//   icon: string;
//   text: string;
//   rightText?: string;
//   onPress: () => void;
//   iconLibrary?: "Ionicons" | "MaterialCommunityIcons" | "FontAwesome";
//   isAdd?: boolean;
// }> = ({ icon, text, rightText, onPress, iconLibrary = "Ionicons", isAdd }) => {
//   const renderIcon = () => {
//     const color = isAdd ? COLORS.primary : COLORS.muted;
//     switch (iconLibrary) {
//       case "Ionicons":
//         return <Ionicons name={icon} size={20} color={color} />;
//       case "MaterialCommunityIcons":
//         return <MaterialCommunityIcons name={icon} size={20} color={color} />;
//       case "FontAwesome":
//         return <FontAwesome name={icon} size={20} color={color} />;
//       default:
//         return <Ionicons name={icon} size={20} color={color} />;
//     }
//   };

//   return (
//     <TouchableOpacity style={styles.option} onPress={onPress} activeOpacity={0.7}>
//       <View style={styles.optionLeft}>
//         {renderIcon()}
//         <Text style={[styles.optionText, isAdd && { color: COLORS.primary, fontWeight: '600' }]}>{text}</Text>
//       </View>
//       <View style={styles.optionRight}>
//         {rightText ? (
//           <View style={styles.rightBadge}>
//             <Text style={styles.rightText}>{rightText}</Text>
//           </View>
//         ) : (
//           <Ionicons name="chevron-forward" size={18} color={COLORS.muted} />
//         )}
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 16,
//     backgroundColor: COLORS.white,
//     elevation: 4,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   backButton: {
//     padding: 4,
//     marginRight: 8,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: COLORS.textPrimary,
//     flex: 1,
//   },
//   headerSpacer: {
//     width: 28, // Spacer for right alignment
//   },
//   content: {
//     flex: 1,
//   },
//   banner: {
//     backgroundColor: COLORS.secondary, // Light Blue bg
//     padding: 20,
//     margin: 16,
//     borderRadius: 12,
//     alignItems: "center",
//     elevation: 1,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 2,
//     borderWidth: 1,
//     borderColor: COLORS.accent, // Slight blue border
//   },
//   bannerIcon: {
//     marginBottom: 8,
//     backgroundColor: COLORS.white,
//     padding: 8,
//     borderRadius: 20,
//   },
//   bannerText: {
//     fontSize: 16,
//     fontWeight: "700",
//     color: COLORS.textPrimary,
//     marginBottom: 6,
//     textAlign: "center",
//     letterSpacing: 0.5,
//   },
//   bannerSub: {
//     fontSize: 13,
//     color: COLORS.textSecondary,
//     textAlign: "center",
//     lineHeight: 20,
//   },
//   bannerLink: {
//     color: COLORS.primary,
//     fontWeight: "700",
//     textDecorationLine: "underline",
//   },
//   section: {
//     marginVertical: 8,
//     marginHorizontal: 16,
//   },
//   sectionHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 10,
//     marginLeft: 4,
//   },
//   sectionIcon: {
//     marginRight: 8,
//   },
//   sectionTitle: {
//     fontSize: 13,
//     fontWeight: "700",
//     color: COLORS.textSecondary,
//     flex: 1,
//     letterSpacing: 0.8,
//   },
//   sectionBox: {
//     backgroundColor: COLORS.white,
//     borderRadius: 12,
//     overflow: "hidden",
//     elevation: 1,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 2,
//   },
//   option: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.background,
//   },
//   optionLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//     flex: 1,
//   },
//   optionText: {
//     marginLeft: 14,
//     fontSize: 15,
//     color: COLORS.textPrimary,
//     fontWeight: "500",
//   },
//   optionRight: {
//     alignItems: "center",
//   },
//   rightBadge: {
//     backgroundColor: COLORS.primary,
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 6,
//   },
//   rightText: {
//     fontSize: 11,
//     fontWeight: "700",
//     color: "#fff",
//   },
// });



// // PaymentSettings.tsx
// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
//   StatusBar,
// } from "react-native";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import FontAwesome from "react-native-vector-icons/FontAwesome";
// import { COLORS } from "../theme/color";

// type Props = {
//   navigation?: any;
// };

// const PaymentSettings: React.FC<Props> = ({ navigation }) => {
//   const handlePress = (title: string) => {
//     Alert.alert("Selected", title);
//   };

//   const handleBack = () => {
//     navigation?.goBack();
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={handleBack} style={styles.backButton}>
//           <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
//         </TouchableOpacity>

//         <Text style={styles.headerTitle}>Payment Settings</Text>

//         <View style={styles.headerSpacer} />
//       </View>

//       <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
//         {/* Banner (FIXED HERE ✔✔✔) */}
//         <View style={styles.banner}>
//           <View style={styles.bannerIcon}>
//             <MaterialCommunityIcons
//               name="wallet-giftcard"
//               size={24}
//               color={COLORS.primary}
//             />
//           </View>

//           <Text style={styles.bannerText}>AMAZON PAY BALANCE</Text>

//           <Text style={styles.bannerSub}>
//             Get 3% cashback on every order.
//           </Text>

//           <TouchableOpacity
//             onPress={() =>
//               Alert.alert(
//                 "More Info",
//                 "Learn about Amazon Pay Balance cashback!"
//               )
//             }
//           >
//             <Text style={styles.bannerLink}>Know more</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Cards Section */}
//         <Section title="CARDS" icon="credit-card-outline">
//           <Option
//             icon="card-outline"
//             text="Add credit or debit cards"
//             onPress={() => handlePress("Add credit or debit cards")}
//             iconLibrary="Ionicons"
//           />
//           <Option
//             icon="plus-box-outline"
//             text="Add Pluxee"
//             onPress={() => handlePress("Add Pluxee")}
//             iconLibrary="MaterialCommunityIcons"
//           />
//         </Section>

//         {/* UPI */}
//         <Section title="UPI" icon="bank-transfer">
//           <Option
//             icon="alpha-p-circle-outline"
//             text="PhonePe UPI"
//             onPress={() => handlePress("PhonePe UPI")}
//             iconLibrary="MaterialCommunityIcons"
//           />
//           <Option
//             icon="rupee"
//             text="Paytm UPI"
//             onPress={() => handlePress("Paytm UPI")}
//             iconLibrary="FontAwesome"
//           />
//           <Option
//             icon="logo-amazon"
//             text="Amazon Pay UPI"
//             onPress={() => handlePress("Amazon Pay UPI")}
//             iconLibrary="Ionicons"
//           />
//           <Option
//             icon="cash-multiple"
//             text="Supermoney UPI"
//             onPress={() => handlePress("Supermoney UPI")}
//             iconLibrary="MaterialCommunityIcons"
//           />
//           <Option
//             icon="plus-circle-outline"
//             text="Add new UPI ID"
//             onPress={() => handlePress("Add new UPI ID")}
//             iconLibrary="MaterialCommunityIcons"
//             isAdd
//           />
//         </Section>

//         {/* Wallets */}
//         <Section title="WALLETS" icon="wallet-outline">
//           <Option
//             icon="logo-amazon"
//             text="Amazon Pay Balance"
//             onPress={() => handlePress("Amazon Pay Balance")}
//             iconLibrary="Ionicons"
//           />
//           <Option
//             icon="wallet-outline"
//             text="Mobikwik"
//             onPress={() => handlePress("Mobikwik")}
//             iconLibrary="MaterialCommunityIcons"
//           />
//         </Section>

//         {/* Pay Later */}
//         <Section title="PAY LATER" icon="credit-card-clock-outline">
//           <Option
//             icon="credit-card-clock-outline"
//             text="Simpl"
//             onPress={() => handlePress("Simpl")}
//             iconLibrary="MaterialCommunityIcons"
//           />
//           <Option
//             icon="logo-amazon"
//             text="Amazon Pay Later"
//             onPress={() => handlePress("Amazon Pay Later")}
//             iconLibrary="Ionicons"
//           />
//           <Option
//             icon="play-circle-outline"
//             text="LazyPay"
//             onPress={() => handlePress("LazyPay")}
//             iconLibrary="MaterialCommunityIcons"
//           />
//         </Section>

//         {/* Netbanking */}
//         <Section title="NETBANKING" icon="bank">
//           <Option
//             icon="business-outline"
//             text="Netbanking"
//             onPress={() => handlePress("Netbanking")}
//             iconLibrary="Ionicons"
//           />
//         </Section>

//         {/* Settings */}
//         <Section title="SETTINGS" icon="cog-outline">
//           <Option
//             icon="cube-outline"
//             text="Pay on delivery"
//             rightText="ENABLE"
//             onPress={() => handlePress("Pay on delivery")}
//             iconLibrary="Ionicons"
//           />
//         </Section>

//         <View style={{ height: 20 }} />
//       </ScrollView>
//     </View>
//   );
// };

// export default PaymentSettings;

// /* ------------------ Section Component ------------------ */
// const Section: React.FC<{
//   title: string;
//   icon?: string;
//   children: React.ReactNode;
// }> = ({ title, icon, children }) => (
//   <View style={styles.section}>
//     <View style={styles.sectionHeader}>
//       {icon && (
//         <MaterialCommunityIcons
//           name={icon}
//           size={20}
//           color={COLORS.primary}
//           style={styles.sectionIcon}
//         />
//       )}
//       <Text style={styles.sectionTitle}>{title}</Text>
//     </View>
//     <View style={styles.sectionBox}>{children}</View>
//   </View>
// );

// /* ------------------ Option Component ------------------ */
// const Option: React.FC<{
//   icon: string;
//   text: string;
//   rightText?: string;
//   onPress: () => void;
//   iconLibrary?: "Ionicons" | "MaterialCommunityIcons" | "FontAwesome";
//   isAdd?: boolean;
// }> = ({ icon, text, rightText, onPress, iconLibrary = "Ionicons", isAdd }) => {
//   const renderIcon = () => {
//     const color = isAdd ? COLORS.primary : COLORS.muted;

//     switch (iconLibrary) {
//       case "Ionicons":
//         return <Ionicons name={icon} size={20} color={color} />;
//       case "MaterialCommunityIcons":
//         return <MaterialCommunityIcons name={icon} size={20} color={color} />;
//       case "FontAwesome":
//         return <FontAwesome name={icon} size={20} color={color} />;
//       default:
//         return <Ionicons name={icon} size={20} color={color} />;
//     }
//   };

//   return (
//     <TouchableOpacity style={styles.option} onPress={onPress} activeOpacity={0.7}>
//       <View style={styles.optionLeft}>
//         {renderIcon()}
//         <Text
//           style={[
//             styles.optionText,
//             isAdd && { color: COLORS.primary, fontWeight: "600" },
//           ]}
//         >
//           {text}
//         </Text>
//       </View>

//       <View style={styles.optionRight}>
//         {rightText ? (
//           <View style={styles.rightBadge}>
//             <Text style={styles.rightText}>{rightText}</Text>
//           </View>
//         ) : (
//           <Ionicons name="chevron-forward" size={18} color={COLORS.muted} />
//         )}
//       </View>
//     </TouchableOpacity>
//   );
// };

// /* ------------------ Styles ------------------ */
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 16,
//     backgroundColor: COLORS.white,
//     elevation: 4,
//   },
//   backButton: {
//     padding: 4,
//     marginRight: 8,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: COLORS.textPrimary,
//     flex: 1,
//   },
//   headerSpacer: {
//     width: 28,
//   },

//   content: { flex: 1 },

//   banner: {
//     backgroundColor: COLORS.secondary,
//     padding: 20,
//     margin: 16,
//     borderRadius: 12,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: COLORS.accent,
//   },

//   bannerIcon: {
//     marginBottom: 8,
//     backgroundColor: COLORS.white,
//     padding: 8,
//     borderRadius: 20,
//   },

//   bannerText: {
//     fontSize: 16,
//     fontWeight: "700",
//     color: COLORS.textPrimary,
//     marginBottom: 6,
//   },

//   bannerSub: {
//     fontSize: 13,
//     color: COLORS.textSecondary,
//     marginBottom: 6,
//     textAlign: "center",
//   },

//   bannerLink: {
//     color: COLORS.primary,
//     fontWeight: "700",
//     textDecorationLine: "underline",
//   },

//   section: { marginVertical: 8, marginHorizontal: 16 },

//   sectionHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 10,
//     marginLeft: 4,
//   },

//   sectionIcon: { marginRight: 8 },

//   sectionTitle: {
//     fontSize: 13,
//     fontWeight: "700",
//     color: COLORS.textSecondary,
//   },

//   sectionBox: {
//     backgroundColor: COLORS.white,
//     borderRadius: 12,
//     overflow: "hidden",
//   },

//   option: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.background,
//   },

//   optionLeft: { flexDirection: "row", alignItems: "center", flex: 1 },

//   optionText: {
//     marginLeft: 14,
//     fontSize: 15,
//     color: COLORS.textPrimary,
//     fontWeight: "500",
//   },

//   optionRight: { alignItems: "center" },

//   rightBadge: {
//     backgroundColor: COLORS.primary,
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 6,
//   },

//   rightText: { fontSize: 11, fontWeight: "700", color: "#fff" },
// });



// PaymentSettings.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  StatusBar,            
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { COLORS } from "../theme/color";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  navigation?: any;
};

const PaymentSettings: React.FC<Props> = ({ navigation }) => {
  const handlePress = (title: string) => {
    Alert.alert("Selected", title);
  };

  const handleBack = () => {
    navigation?.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>   {/* ← Wrapped with SafeAreaView */}
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Payment Methods</Text>
        </View>

        <ScrollView 
          style={styles.content} 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          
          {/* Premium Banner Card */}
          <View style={styles.bannerContainer}>
              <View style={styles.bannerContent}>
                  <View style={styles.bannerTopRow}>
                      <View style={styles.iconCircle}>
                          <MaterialCommunityIcons
                          name="wallet-giftcard"
                          size={24}
                          color="#FFF"
                          />
                      </View>
                      <View style={styles.bannerTag}>
                          <Text style={styles.bannerTagText}>RECOMMENDED</Text>
                      </View>
                  </View>
                  
                  <Text style={styles.bannerTitle}>Amazon Pay Balance</Text>
                  <Text style={styles.bannerDesc}>
                      Get <Text style={{fontWeight: '700', color: '#FFD700'}}>3% Cashback</Text> on every order.
                  </Text>

                  <TouchableOpacity 
                      style={styles.bannerBtn}
                      onPress={() => Alert.alert("Info", "Cashback details")}
                      activeOpacity={0.8}
                  >
                      <Text style={styles.bannerBtnText}>Know More</Text>
                      <Ionicons name="arrow-forward" size={16} color={COLORS.primary} />
                  </TouchableOpacity>
              </View>
              {/* Decorative Circle */}
              <View style={styles.bannerDecoCircle} />
          </View>

          {/* Cards Section */}
          <Section title="SAVED CARDS">
            <Option
              icon="card-outline"
              text="Add credit or debit cards"
              onPress={() => handlePress("Add credit or debit cards")}
              iconLibrary="Ionicons"
            />
            <Option
              icon="plus-box-outline"
              text="Add Pluxee Card"
              onPress={() => handlePress("Add Pluxee")}
              iconLibrary="MaterialCommunityIcons"
              isLast
            />
          </Section>

          {/* UPI */}
          <Section title="UPI ACCOUNTS">
            <Option
              icon="alpha-p-circle-outline"
              text="PhonePe UPI"
              onPress={() => handlePress("PhonePe UPI")}
              iconLibrary="MaterialCommunityIcons"
            />
            <Option
              icon="rupee"
              text="Paytm UPI"
              onPress={() => handlePress("Paytm UPI")}
              iconLibrary="FontAwesome"
            />
            <Option
              icon="logo-amazon"
              text="Amazon Pay UPI"
              onPress={() => handlePress("Amazon Pay UPI")}
              iconLibrary="Ionicons"
            />
            <Option
              icon="cash-multiple"
              text="Supermoney UPI"
              onPress={() => handlePress("Supermoney UPI")}
              iconLibrary="MaterialCommunityIcons"
            />
            <Option
              icon="plus-circle"
              text="Add new UPI ID"
              onPress={() => handlePress("Add new UPI ID")}
              iconLibrary="MaterialCommunityIcons"
              isAdd
              isLast
            />
          </Section>

          {/* Wallets */}
          <Section title="WALLETS">
            <Option
              icon="logo-amazon"
              text="Amazon Pay Balance"
              onPress={() => handlePress("Amazon Pay Balance")}
              iconLibrary="Ionicons"
            />
            <Option
              icon="wallet-outline"
              text="Mobikwik"
              onPress={() => handlePress("Mobikwik")}
              iconLibrary="MaterialCommunityIcons"
              isLast
            />
          </Section>

          {/* Pay Later */}
          <Section title="PAY LATER">
            <Option
              icon="credit-card-clock-outline"
              text="Simpl"
              onPress={() => handlePress("Simpl")}
              iconLibrary="MaterialCommunityIcons"
            />
            <Option
              icon="logo-amazon"
              text="Amazon Pay Later"
              onPress={() => handlePress("Amazon Pay Later")}
              iconLibrary="Ionicons"
            />
            <Option
              icon="play-circle-outline"
              text="LazyPay"
              onPress={() => handlePress("LazyPay")}
              iconLibrary="MaterialCommunityIcons"
              isLast
            />
          </Section>

          {/* Netbanking */}
          <Section title="NETBANKING">
            <Option
              icon="business-outline"
              text="Netbanking"
              onPress={() => handlePress("Netbanking")}
              iconLibrary="Ionicons"
              isLast
            />
          </Section>

          {/* Settings */}
          <Section title="PREFERENCES">
            <Option
              icon="cube-outline"
              text="Pay on delivery"
              rightText="ENABLE"
              onPress={() => handlePress("Pay on delivery")}
              iconLibrary="Ionicons"
              isLast
            />
          </Section>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default PaymentSettings;

/* ------------------ Section Component ------------------ */
const Section: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionCard}>{children}</View>
  </View>
);

/* ------------------ Option Component ------------------ */
const Option: React.FC<{
  icon: string;
  text: string;
  rightText?: string;
  onPress: () => void;
  iconLibrary?: "Ionicons" | "MaterialCommunityIcons" | "FontAwesome";
  isAdd?: boolean;
  isLast?: boolean;
}> = ({ icon, text, rightText, onPress, iconLibrary = "Ionicons", isAdd, isLast }) => {
  
  const renderIcon = () => {
    const color = isAdd ? COLORS.primary : "#555";
    const size = 22;

    switch (iconLibrary) {
      case "Ionicons": return <Ionicons name={icon} size={size} color={color} />;
      case "MaterialCommunityIcons": return <MaterialCommunityIcons name={icon} size={size} color={color} />;
      case "FontAwesome": return <FontAwesome name={icon} size={size} color={color} />;
      default: return <Ionicons name={icon} size={size} color={color} />;
    }
  };

  return (
    <TouchableOpacity 
        style={[styles.option, isLast && styles.optionLast]} 
        onPress={onPress} 
        activeOpacity={0.6}
    >
      <View style={styles.iconContainer}>
        {renderIcon()}
      </View>
      
      <View style={styles.textContainer}>
        <Text style={[styles.optionText, isAdd && { color: COLORS.primary, fontWeight: "600" }]}>
            {text}
        </Text>
      </View>

      <View style={styles.rightContainer}>
        {rightText ? (
          <View style={styles.rightBadge}>
            <Text style={styles.rightBadgeText}>{rightText}</Text>
          </View>
        ) : (
          <Ionicons name="chevron-forward" size={16} color="#CCC" />
        )}
      </View>
    </TouchableOpacity>
  );
};

/* ------------------ Styles ------------------ */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  
  /* Header */
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },

  content: { flex: 1 },
  scrollContent: { paddingBottom: 40 },

  /* Banner */
  bannerContainer: {
    margin: 20,
    marginTop: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: COLORS.primary,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    position: 'relative',
  },
  bannerContent: {
      padding: 20,
      zIndex: 2,
  },
  bannerTopRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
  },
  iconCircle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(255,255,255,0.2)',
      justifyContent: 'center',
      alignItems: 'center',
  },
  bannerTag: {
      backgroundColor: COLORS.yelow,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
  },
  bannerTagText: {
      fontSize: 10,
      fontWeight: '800',
      color: COLORS.black,
  },
  bannerTitle: {
      fontSize: 18,
      fontWeight: '800',
      color: '#fff',
      marginBottom: 4,
  },
  bannerDesc: {
      fontSize: 13,
      color: 'rgba(255,255,255,0.9)',
      marginBottom: 16,
  },
  bannerBtn: {
      backgroundColor: '#fff',
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 10,
      alignSelf: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
  },
  bannerBtnText: {
      color: COLORS.primary,
      fontWeight: '700',
      fontSize: 12,
  },
  bannerDecoCircle: {
      position: 'absolute',
      right: -30,
      bottom: -30,
      width: 140,
      height: 140,
      borderRadius: 70,
      backgroundColor: 'rgba(255,255,255,0.1)',
      zIndex: 1,
  },

  /* Sections */
  sectionContainer: {
      marginBottom: 24,
      paddingHorizontal: 20,
  },
  sectionTitle: {
      fontSize: 12,
      fontWeight: '700',
      color: '#999',
      marginBottom: 10,
      marginLeft: 4,
      letterSpacing: 1,
      textTransform: 'uppercase',
  },
  sectionCard: {
      backgroundColor: COLORS.white,
      borderRadius: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.03,
      shadowRadius: 4,
      elevation: 2,
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.02)',
  },

  /* Options */
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  optionLast: {
      borderBottomWidth: 0,
  },
  iconContainer: {
      width: 36,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
  },
  textContainer: {
      flex: 1,
  },
  optionText: {
    fontSize: 15,
    color: COLORS.textPrimary,
    fontWeight: "500",
  },
  rightContainer: {
      paddingLeft: 10,
  },
  rightBadge: {
    backgroundColor: COLORS.highlight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  rightBadgeText: { 
      fontSize: 10, 
      fontWeight: "700", 
      color: "#fff" 
  },
});