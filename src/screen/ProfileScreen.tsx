
// // ProfileScreen.tsx
// import { useNavigation } from '@react-navigation/native';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import React, { useRef, useState } from 'react';
// import {
//   Animated,
//   Dimensions,
//   Platform,
//   Share,
//   StatusBar,
//   StyleSheet,
//   Switch,
//   Text,
//   TouchableOpacity,
//   View
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { useGetUserProfile } from '../api/hooks/user';
// import { useAuth } from '../Context/AuthContext';
// import { COLORS } from '../theme/color';
// import VegMode from './VegMode';


// type RootStackParamList = {
//   ProfilePage: undefined;
//   ZomatoMoneyPage: undefined;
//   YourProfile: undefined;
//   YourOrder: undefined;
//   VegMode: undefined;
//   AddressBookScreen: undefined;
//   AboutScreen: undefined;
//   ActivityScreen: undefined;
//   SettingScreen: undefined;
//   FeedbackScreen: undefined;
//   GoldScreen: undefined;
//   BookingScreen: undefined;
//   AccessibilitySettings: undefined;
//   Login: undefined;
//   PaymentSettings: undefined;
//   SupportScreen: undefined;
//   ReportEmergencyScreen: undefined;
//   NotificationScreen: undefined;
//   AccountSettingsScreen: undefined;
//   ShareApp: undefined;
//   PrivacyPolicy: undefined;
//   RefundPolicy: undefined;
//   TermsAndConditions: undefined;
// };

// type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// const { width, height } = Dimensions.get('window'); 
// const HEADER_HEIGHT = 320; 

// const ProfileScreen = () => {
//   const navigation = useNavigation<NavigationProp>();
//   const [vegModeVisible, setVegModeVisible] = useState(false);
//   const scrollY = useRef(new Animated.Value(0)).current;
//   const { logout } = useAuth();


//   // --- Share Function ---
//   const onShare = async () => {
//     try {
//       const result = await Share.share({
//         message: 'Check out this amazing food delivery app! Download now.',
//       });
//       if (result.action === Share.sharedAction) {
//         if (result.activityType) {
//           // shared with activity type of result.activityType
//         } else {
//           // shared
//         }
//       } else if (result.action === Share.dismissedAction) {
//         // dismissed
//       }
//     } catch (error: any) {
//       console.log(error.message);
//     }
//   };

//   // --- Animation Interpolations ---

//   // 1. Header Translation 
//   const headerTranslateY = scrollY.interpolate({
//     inputRange: [0, HEADER_HEIGHT],
//     outputRange: [0, -HEADER_HEIGHT / 2],
//     extrapolate: 'clamp',
//   });

//   // 2. Header Zoom 
//   const headerScale = scrollY.interpolate({
//     inputRange: [-HEADER_HEIGHT, 0],
//     outputRange: [2, 1],
//     extrapolate: 'clamp',
//   });

//   // 3. Opacity for content inside header 
//   const headerContentOpacity = scrollY.interpolate({
//     inputRange: [0, HEADER_HEIGHT / 2],
//     outputRange: [1, 0],
//     extrapolate: 'clamp',
//   });

//   // 4. Sticky Title Opacity (Fades Entire Header IN/OUT)
//   const stickyTitleOpacity = scrollY.interpolate({
//     inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 50], 
//     outputRange: [0, 1],
//     extrapolate: 'clamp',
//   });

//   // 5. Sticky Header Shadow (Flat -> Shadow)
//   const stickyHeaderElevation = scrollY.interpolate({
//     inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 50],
//     outputRange: [0, 4],
//     extrapolate: 'clamp',
//   });

//   const { data: userProfile, isLoading, error } = useGetUserProfile();

//   return (
//     <View style={styles.root}>
//       <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

//       {/* --- ANIMATED HEADER BACKGROUND (Hero) --- */}
//       <Animated.View
//         style={[
//           styles.heroContainer,
//           {
//             transform: [
//               { translateY: headerTranslateY },
//               { scale: headerScale },
//             ],
//           },
//         ]}
//       >
//         <Animated.View style={[styles.profileInfoContainer, { opacity: headerContentOpacity }]}>
//             <View style={styles.avatarCircle}>
//                 <MaterialCommunityIcons name="account" size={50} color={COLORS.secondary} />
//             </View>
//             <Text style={styles.headerTitle}>{userProfile?.name}</Text>
//             <Text style={styles.headerSubtitle}>+91 {userProfile?.mobile}</Text> 
//         </Animated.View>
//       </Animated.View>

//       {/* --- Floating Back Button --- */}
//       <TouchableOpacity 
//         style={styles.floatingBackButton} 
//         onPress={() => navigation.goBack()}
//       >
//          <Ionicons name="arrow-back" size={24} color="#000" />
//       </TouchableOpacity>

//       {/* --- STICKY HEADER BAR (FIXED CSS: Solid Background) --- */}
//       <Animated.View 
//         style={[
//             styles.stickyTitleContainer, 
//             { 
//                 opacity: stickyTitleOpacity, 
//                 elevation: stickyHeaderElevation,
//                 // Removed backgroundColor interpolation here, handled in CSS
//             }
//         ]}
//       >
//          <Text style={styles.stickyTitleText}>Profile</Text>
//       </Animated.View>

//       {/* --- Scrollable Content --- */}
//       <Animated.ScrollView
//         style={styles.scrollView}
//         showsVerticalScrollIndicator={false}
//         scrollEventThrottle={16}
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//           { useNativeDriver: true } // Changed back to true for better performance since we removed color interpolation
//         )}
//         contentContainerStyle={{ paddingTop: HEADER_HEIGHT }}
//       >
        
//         {/* --- THE SHEET --- */}
//         <View style={styles.sheet}>
//             <View style={styles.sheetHandle} />

//             {/* --- 3-Grid Quick Links --- */}
//             <View style={styles.gridContainer}>
//                 <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('YourOrder')}>
//                     <View style={styles.gridIconContainer}>
//                           <MaterialCommunityIcons name="shopping-outline" size={26} color="#333" />
//                     </View>
//                     <Text style={styles.gridText}>Your orders</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('ZomatoMoneyPage')}>
//                     <View style={styles.gridIconContainer}>
//                         <MaterialCommunityIcons name="wallet-outline" size={26} color="#333" />
//                         <View style={styles.rupeeBadge}>
//                               <Text style={styles.rupeeText}>₹</Text>
//                         </View>
//                     </View>
//                     <Text style={styles.gridText}>Restro Money</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('SupportScreen')}>
//                     <View style={styles.gridIconContainer}>
//                           <MaterialCommunityIcons name="message-processing-outline" size={26} color="#333" />
//                     </View>
//                     <Text style={styles.gridText}>Need help?</Text>
//                 </TouchableOpacity>
//             </View>

//             {/* --- Gold Banner --- */}
//             <TouchableOpacity style={styles.bannerRow} onPress={() => navigation.navigate('GoldScreen')}>
//                 <View style={styles.bannerLeft}>
//                     <MaterialCommunityIcons name="crown" size={22} color={COLORS.secondary} />
//                     <View style={{marginLeft: 12}}>
//                         <Text style={styles.bannerTitle}>Join Restro Elite</Text>
//                         <Text style={styles.bannerSubtitle}>Get free delivery & offers</Text>
//                     </View>
//                 </View>
//                 <View style={styles.tagContainer}>
//                     <Text style={styles.tagText}>NEW</Text>
//                 </View>
//                  <MaterialCommunityIcons name="chevron-right" size={20} color="#ccc" />
//             </TouchableOpacity>

//             {/* --- Veg Mode --- */}
//             <View style={styles.toggleCard}>
//                 <View style={styles.toggleContent}>
//                     <View style={styles.toggleIconArea}>
//                         <MaterialCommunityIcons name={vegModeVisible ? "leaf" : "leaf-off"} size={22} color={vegModeVisible ? "green" : "#888"} />
//                     </View>
//                     <View style={styles.toggleTextArea}>
//                         <Text style={styles.toggleTitle}>Veg Mode</Text>
//                         <Text style={styles.toggleDesc}>Only show vegetarian options across the app.</Text>
//                         <TouchableOpacity onPress={() => navigation.navigate('VegMode')}>
//                              <Text style={styles.linkText}>Know more</Text>
//                         </TouchableOpacity>
//                     </View>
//                     <Switch
//                         value={vegModeVisible}
//                         onValueChange={setVegModeVisible}
//                         trackColor={{ false: '#e0e0e0', true: '#4caf50' }}
//                         thumbColor={'#fff'}
//                     />
//                 </View>
//             </View>

//             {/* --- Your Information --- */}
//             <View style={styles.sectionContainer}>
//                 <Text style={styles.sectionHeader}>Your information</Text>
//                 <View style={styles.listCard}>
//                     <ListItem icon="book-open-page-variant-outline" label="Address book" onPress={() => navigation.navigate('AddressBookScreen')} />
//                     <ListItem icon="bookmark-outline" label="Your favourite" onPress={() => navigation.navigate('BookingScreen')} />
//                     {/* <ListItem icon="heart-outline" label="Your wishlist" onPress={() => navigation.navigate('BookingScreen')} /> */}
//                      <ListItem icon="account-outline" label="Profile Settings" onPress={() => navigation.navigate('YourProfile')} last />
//                 </View>
//             </View>

//             {/* --- Payment --- */}
//             <View style={styles.sectionContainer}>
//                 <Text style={styles.sectionHeader}>Payment and coupons</Text>
//                 <View style={styles.listCard}>
//                     <ListItem icon="credit-card-outline" label="Payment settings" onPress={() => navigation.navigate('PaymentSettings')} />
//                     {/* <ListItem icon="ticket-percent-outline" label="Claim Gift card" />
//                      <ListItem icon="gift-outline" label="Your collected rewards" last /> */}
//                 </View>
//             </View>

//             {/* --- Other Info --- */}
//             <View style={styles.sectionContainer}>
//                 <Text style={styles.sectionHeader}>Other Information</Text>
//                 <View style={styles.listCard}>
//                      {/* Added onShare function to onPress */}
//                      <ListItem icon="share-variant-outline" label="Share the app" onPress={onShare} />
//                      {/* Changed icon to wheelchair-accessibility */}
//                       <ListItem icon="wheelchair-accessibility" label="Accessibility" onPress={() => navigation.navigate('AccessibilitySettings')} />
//                     <ListItem icon="information-outline" label="About us" onPress={() => navigation.navigate('AboutScreen')} />
//                     <ListItem icon="lock-outline" label="Account privacy" onPress={() => navigation.navigate('AccountSettingsScreen')}/>
//                     <ListItem icon="bell-outline" label="Notification preferences" onPress={() => navigation.navigate('NotificationScreen')}/>
//                     <ListItem icon="file-document-outline" label="Terms & Conditions" onPress={() => navigation.navigate('TermsAndConditions')} />
//                     <ListItem icon="shield-check-outline" label="Privacy & Policy" onPress={() => navigation.navigate('PrivacyPolicy')} />
//                     <ListItem icon="cash-refund" label="Return & Refund Policy" onPress={() => navigation.navigate('RefundPolicy')} />
//                     <ListItem 
//                       icon="logout" 
//                       label="Log out" 
//                       onPress={async () => {
//                         await logout();
//                         navigation.reset({
//                           index: 0,
//                           routes: [{ name: 'Login' }],
//                         });
//                       }} 
//                       last 
//                     />

//                 </View>
//             </View>

//             <View style={{height: 100}} />
//         </View>
//       </Animated.ScrollView>

//       <VegMode visible={vegModeVisible} onClose={() => setVegModeVisible(false)} />
//     </View>
//   );
// };

// // List Item
// const ListItem = ({ icon, label, onPress, last }: { icon: string, label: string, onPress?: () => void, last?: boolean }) => (
//     <TouchableOpacity onPress={onPress} style={[styles.listItem, last && styles.listItemLast]}>
//         <View style={styles.listIconLeft}>
//              <MaterialCommunityIcons name={icon} size={22} color="#555" />
//         </View>
//         <View style={styles.listContent}>
//             <Text style={styles.listLabel}>{label}</Text>
//         </View>
//         <MaterialCommunityIcons name="chevron-right" size={20} color="#ccc" />
//     </TouchableOpacity>
// );

// const styles = StyleSheet.create({
//   root: {
//     flex: 1,
//     backgroundColor: COLORS.secondary, 
//   },
//   scrollView: { flex: 1, zIndex: 1 },

//   // --- HERO HEADER ---
//   heroContainer: {
//     position: 'absolute',
//     top: 0, left: 0, right: 0,
//     height: HEADER_HEIGHT,
//     backgroundColor: COLORS.secondary, 
//     justifyContent: 'center', 
//     alignItems: 'center',
//     zIndex: 0,
//     overflow: 'hidden',
//     paddingTop: 30,
//   },
//   profileInfoContainer: { alignItems: 'center' },
//   avatarCircle: {
//     width: 80, height: 80,
//     borderRadius: 40,
//     backgroundColor: '#fff',
//     justifyContent: 'center', alignItems: 'center',
//     marginBottom: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 5,
//   },
//   headerTitle: { fontSize: 24, fontWeight: '800', color: '#000', marginBottom: 2 },
//   headerSubtitle: { fontSize: 14, color: '#444', fontWeight: '500' },

//   // --- STICKY HEADER STYLE (FIXED) ---
//   stickyTitleContainer: {
//     position: 'absolute',
//     top: 0, left: 0, right: 0,
//     paddingTop: Platform.OS === 'android' ? 35 : 45, // Adjust for status bar
//     height: Platform.OS === 'android' ? 90 : 100,
//     zIndex: 90, 
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#fff', // Solid White
//     // Shadows
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//   },
//   stickyTitleText: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#000',
//   },

//   // --- SHEET ---
//   sheet: {
//       backgroundColor: '#f5f7fa',
//       borderTopLeftRadius: 24,
//       borderTopRightRadius: 24,
//       marginTop: -24,
//       paddingBottom: 40,
//       minHeight: height,
//       shadowColor: "#000",
//       shadowOffset: { width: 0, height: -2 },
//       shadowOpacity: 0.1,
//       shadowRadius: 5,
//       elevation: 5,
//   },
//   sheetHandle: {
//       width: 40, height: 4,
//       backgroundColor: '#DDD',
//       borderRadius: 10,
//       alignSelf: 'center',
//       marginTop: 12, marginBottom: 8,
//   },
  
//   // --- Floating Back Button ---
//   floatingBackButton: {
//     position: 'absolute',
//     top: Platform.OS === 'android' ? 40 : 50,
//     left: 16,
//     zIndex: 100, 
//     width: 40, height: 40,
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     justifyContent: 'center', alignItems: 'center',
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 5,
//   },

//   // --- Grid Links ---
//   gridContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     marginTop: 16,
//   },
//   gridItem: {
//     backgroundColor: '#fff',
//     width: '31%', 
//     paddingVertical: 14,
//     borderRadius: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   gridIconContainer: { marginBottom: 8, position: 'relative' },
//   gridText: { fontSize: 12, fontWeight: '600', color: '#333' },
//   rupeeBadge: {
//       position: 'absolute', right: -4, bottom: -2,
//       backgroundColor: '#333', borderRadius: 8,
//       width: 14, height: 14, justifyContent: 'center', alignItems: 'center'
//   },
//   rupeeText: { color: '#fff', fontSize: 9, fontWeight: 'bold' },

//   // --- Banners ---
//   bannerRow: {
//       backgroundColor: '#fff',
//       marginHorizontal: 16, marginTop: 16,
//       borderRadius: 12, padding: 12,
//       flexDirection: 'row', alignItems: 'center',
//       shadowColor: "#000", shadowOffset: { width: 0, height: 1 },
//       shadowOpacity: 0.05, shadowRadius: 3, elevation: 2,
//   },
//   bannerLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
//   bannerTitle: { fontSize: 14, fontWeight: '700', color: '#000' },
//   bannerSubtitle: { fontSize: 12, color: '#666', marginTop: 2 },
//   tagContainer: {
//       backgroundColor: '#e3f2fd', paddingHorizontal: 6,
//       paddingVertical: 2, borderRadius: 4, marginRight: 10,
//   },
//   tagText: { color: '#2196f3', fontSize: 10, fontWeight: 'bold' },

//   // --- Toggle Card ---
//   toggleCard: {
//     backgroundColor: '#fff', marginHorizontal: 16, marginTop: 16,
//     borderRadius: 12, padding: 16,
//     shadowColor: "#000", shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05, shadowRadius: 3, elevation: 2,
//   },
//   toggleContent: { flexDirection: 'row', alignItems: 'flex-start' },
//   toggleIconArea: { marginRight: 12, marginTop: 2 },
//   toggleTextArea: { flex: 1, marginRight: 10 },
//   toggleTitle: { fontSize: 15, fontWeight: '600', color: '#333', marginBottom: 4 },
//   toggleDesc: { fontSize: 12, color: '#888', lineHeight: 18, marginBottom: 4 },
//   linkText: { fontSize: 12, color: 'green', textDecorationLine: 'underline', fontWeight: '600' },

//   // --- Lists ---
//   sectionContainer: { marginTop: 24, paddingHorizontal: 16 },
//   sectionHeader: { fontSize: 16, fontWeight: '700', color: '#222', marginBottom: 12 },
//   listCard: {
//       backgroundColor: '#fff', borderRadius: 16,
//       shadowColor: "#000", shadowOffset: { width: 0, height: 1 },
//       shadowOpacity: 0.05, shadowRadius: 3, elevation: 2, overflow: 'hidden',
//   },
//   listItem: {
//       flexDirection: 'row', alignItems: 'center',
//       paddingVertical: 16, paddingHorizontal: 16,
//       borderBottomWidth: 1, borderBottomColor: '#f0f0f0',
//   },
//   listItemLast: { borderBottomWidth: 0 },
//   listIconLeft: { width: 24, alignItems: 'center', marginRight: 16 },
//   listContent: { flex: 1 },
//   listLabel: { fontSize: 15, color: '#333', fontWeight: '400' },
// });

// export default ProfileScreen;


// ProfileScreen.tsx
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Platform,
  Share,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useGetUserProfile } from '../api/hooks/user';
import { useAuth } from '../Context/AuthContext';
import { COLORS } from '../theme/color';
import VegMode from './VegMode';

type RootStackParamList = {
  ProfilePage: undefined;
  ZomatoMoneyPage: undefined;
  YourProfile: undefined;
  YourOrder: undefined;
  VegMode: undefined;
  AddressBookScreen: undefined;
  AboutScreen: undefined;
  ActivityScreen: undefined;
  SettingScreen: undefined;
  FeedbackScreen: undefined;
  GoldScreen: undefined;
  BookingScreen: undefined;
  AccessibilitySettings: undefined;
  Login: undefined;
  PaymentSettings: undefined;
  SupportScreen: undefined;
  ReportEmergencyScreen: undefined;
  NotificationScreen: undefined;
  AccountSettingsScreen: undefined;
  ShareApp: undefined;
  PrivacyPolicy: undefined;
  RefundPolicy: undefined;
  TermsAndConditions: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width, height } = Dimensions.get('window');
const HEADER_HEIGHT = 180; // Adjusted for the new layout

const ProfileScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [vegModeVisible, setVegModeVisible] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const { logout } = useAuth();
  const { data: userProfile } = useGetUserProfile();

  // --- Share Function ---
  const onShare = async () => {
    try {
      await Share.share({
        message: 'Check out this amazing food delivery app! Download now.',
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  // --- Animation Interpolations ---
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT / 2],
    extrapolate: 'clamp',
  });

  const stickyTitleOpacity = scrollY.interpolate({
    inputRange: [40, 80],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const stickyHeaderElevation = scrollY.interpolate({
    inputRange: [40, 80],
    outputRange: [0, 4],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* --- BACKGROUND HEADER (Hero) --- */}
      <Animated.View
        style={[
          styles.heroContainer,
          { transform: [{ translateY: headerTranslateY }] },
        ]}
      />

      {/* --- Floating Back Button --- */}
      <TouchableOpacity
        style={styles.floatingBackButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      {/* --- STICKY HEADER BAR --- */}
      <Animated.View
        style={[
          styles.stickyTitleContainer,
          {
            opacity: stickyTitleOpacity,
            elevation: stickyHeaderElevation,
          }
        ]}
      >
        <Text style={styles.stickyTitleText}>Profile</Text>
      </Animated.View>

      {/* --- MASK TO HIDE SCROLLING CONTENT ABOVE CARD --- */}
      <View style={styles.headerMask} />

      {/* --- STICKY USER PROFILE CARD --- */}
      <View style={styles.userCardSticky}>
        <View style={styles.userCardMain}>
        <View style={styles.userAvatarContainer}>
          {userProfile?.name ? (
            <Text style={styles.avatarLetter}>
              {userProfile.name.charAt(0).toUpperCase()}
            </Text>
          ) : (
            <MaterialCommunityIcons name="account" size={40} color={COLORS.secondary} />
          )}
        </View>
          <View style={styles.userInfoText}>
            <Text style={styles.userName}>{userProfile?.name || 'User Name'}</Text>
            <Text style={styles.userPhone}>+91 {userProfile?.mobile || '0000000000'}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('YourProfile')}>
              <Text style={styles.viewProfileBtn}>View profile ❯</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.eliteRow}>
          <View style={styles.eliteLeft}>
             <MaterialCommunityIcons name="crown" size={18} color={COLORS.secondary} />
             <Text style={styles.eliteLabel}>Elite</Text>
          </View>
          <TouchableOpacity style={styles.joinEliteBtn} onPress={() => navigation.navigate('GoldScreen')}>
            <Text style={styles.joinEliteText}>Join Elite ❯</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Animated.ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        contentContainerStyle={{ paddingTop: HEADER_HEIGHT + 85 }}
      >

        {/* --- MAIN CONTENT SHEET --- */}
        <View style={styles.sheet}>
          {/* --- 3-Grid Quick Links --- */}
          <View style={styles.gridContainer}>
            <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('YourOrder')}>
              <View style={styles.gridIconContainer}>
                <MaterialCommunityIcons name="shopping-outline" size={26} color="#333" />
              </View>
              <Text style={styles.gridText}>Your orders</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('ZomatoMoneyPage')}>
              <View style={styles.gridIconContainer}>
                <MaterialCommunityIcons name="wallet-outline" size={26} color="#333" />
                <View style={styles.rupeeBadge}>
                  <Text style={styles.rupeeText}>₹</Text>
                </View>
              </View>
              <Text style={styles.gridText}>Restro Money</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('SupportScreen')}>
              <View style={styles.gridIconContainer}>
                <MaterialCommunityIcons name="message-processing-outline" size={26} color="#333" />
              </View>
              <Text style={styles.gridText}>Need help?</Text>
            </TouchableOpacity>
          </View>

          {/* --- Gold Banner --- */}
          <TouchableOpacity style={styles.bannerRow} onPress={() => navigation.navigate('GoldScreen')}>
            <View style={styles.bannerLeft}>
              <MaterialCommunityIcons name="crown" size={22} color={COLORS.secondary} />
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.bannerTitle}>Join Restro Elite</Text>
                <Text style={styles.bannerSubtitle}>Get free delivery & offers</Text>
              </View>
            </View>
            <View style={styles.tagContainer}>
              <Text style={styles.tagText}>NEW</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={20} color="#ccc" />
          </TouchableOpacity>

          {/* --- Veg Mode --- */}
          <View style={styles.toggleCard}>
            <View style={styles.toggleContent}>
              <View style={styles.toggleIconArea}>
                <MaterialCommunityIcons name={vegModeVisible ? "leaf" : "leaf-off"} size={22} color={vegModeVisible ? "green" : "#888"} />
              </View>
              <View style={styles.toggleTextArea}>
                <Text style={styles.toggleTitle}>Veg Mode</Text>
                <Text style={styles.toggleDesc}>Only show vegetarian options across the app.</Text>
                <TouchableOpacity onPress={() => navigation.navigate('VegMode')}>
                  <Text style={styles.linkText}>Know more</Text>
                </TouchableOpacity>
              </View>
              <Switch
                value={vegModeVisible}
                onValueChange={setVegModeVisible}
                trackColor={{ false: '#e0e0e0', true: '#4caf50' }}
                thumbColor={'#fff'}
              />
            </View>
          </View>

          {/* --- Sections --- */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>Your information</Text>
            <View style={styles.listCard}>
              <ListItem icon="book-open-page-variant-outline" label="Address book" onPress={() => navigation.navigate('AddressBookScreen')} />
              <ListItem icon="bookmark-outline" label="Your favourite" onPress={() => navigation.navigate('BookingScreen')} />
              <ListItem icon="account-outline" label="Profile Settings" onPress={() => navigation.navigate('YourProfile')} last />
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>Payment and coupons</Text>
            <View style={styles.listCard}>
              <ListItem icon="credit-card-outline" label="Payment settings" onPress={() => navigation.navigate('PaymentSettings')} last />
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>Other Information</Text>
            <View style={styles.listCard}>
              <ListItem icon="share-variant-outline" label="Share the app" onPress={onShare} />
              <ListItem icon="wheelchair-accessibility" label="Accessibility" onPress={() => navigation.navigate('AccessibilitySettings')} />
              <ListItem icon="information-outline" label="About us" onPress={() => navigation.navigate('AboutScreen')} />
              <ListItem icon="lock-outline" label="Account privacy" onPress={() => navigation.navigate('AccountSettingsScreen')} />
              <ListItem icon="bell-outline" label="Notification preferences" onPress={() => navigation.navigate('NotificationScreen')} />
              <ListItem icon="file-document-outline" label="Terms & Conditions" onPress={() => navigation.navigate('TermsAndConditions')} />
              <ListItem icon="shield-check-outline" label="Privacy & Policy" onPress={() => navigation.navigate('PrivacyPolicy')} />
              <ListItem icon="cash-refund" label="Return & Refund Policy" onPress={() => navigation.navigate('RefundPolicy')} />
              <ListItem
                icon="logout"
                label="Log out"
                onPress={async () => {
                  await logout();
                  navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
                }}
                last
              />
            </View>
          </View>

          <View style={{ height: 100 }} />
        </View>
      </Animated.ScrollView>

      <VegMode visible={vegModeVisible} onClose={() => setVegModeVisible(false)} />
    </View>
  );
};

// List Item Component
const ListItem = ({ icon, label, onPress, last }: { icon: string, label: string, onPress?: () => void, last?: boolean }) => (
  <TouchableOpacity onPress={onPress} style={[styles.listItem, last && styles.listItemLast]}>
    <View style={styles.listIconLeft}>
      <MaterialCommunityIcons name={icon} size={22} color="#555" />
    </View>
    <View style={styles.listContent}>
      <Text style={styles.listLabel}>{label}</Text>
    </View>
    <MaterialCommunityIcons name="chevron-right" size={20} color="#ccc" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  scrollView: { flex: 1, zIndex: 1 },

  // --- BG HEADER ---
  heroContainer: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: HEADER_HEIGHT,
    backgroundColor: COLORS.secondary,
    zIndex: 0,
  },

  // --- STICKY USER PROFILE CARD ---
  userCardSticky: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    // Shadow for Android
    elevation: 8,
    position: 'absolute',
    top: 90, // Adjusted for better alignment
    left: 12, right: 12,
    zIndex: 95, 
  },
  avatarLetter: {
    fontSize: 26,
    fontWeight: '900',
    color: '#fff',
  },
  headerMask: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: 100,
    backgroundColor: COLORS.secondary,
    zIndex: 94,
  },
  userCardMain: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfoText: { flex: 1 },
  userName: { fontSize: 24, fontWeight: '800', color: '#000' },
  userPhone: { fontSize: 14, color: '#666', marginTop: 2 },
  viewProfileBtn: { fontSize: 13, color: COLORS.secondary, fontWeight: '700', marginTop: 8 },
  userAvatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    shadowColor: COLORS.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 15,
  },
  eliteRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eliteLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eliteLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    marginLeft: 6,
  },
  joinEliteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  joinEliteText: {
    fontSize: 13,
    color: COLORS.secondary,
    fontWeight: '700',
  },

  // --- STICKY HEADER ---
  stickyTitleContainer: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    paddingTop: Platform.OS === 'android' ? 35 : 45,
    height: Platform.OS === 'android' ? 90 : 100,
    zIndex: 90,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  stickyTitleText: { fontSize: 18, fontWeight: '700', color: '#000' },

  floatingBackButton: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 40 : 50,
    left: 16,
    zIndex: 100,
    width: 40, height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'center', alignItems: 'center',
    elevation: 5,
  },

  // --- CONTENT SHEET ---
  sheet: {
    backgroundColor: '#f5f7fa',
    paddingTop: 10,
  },

  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  gridItem: {
    backgroundColor: '#fff',
    width: '31%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
  },
  gridIconContainer: { marginBottom: 8, position: 'relative' },
  gridText: { fontSize: 12, fontWeight: '600', color: '#333' },
  rupeeBadge: {
    position: 'absolute', right: -4, bottom: -2,
    backgroundColor: '#333', borderRadius: 8,
    width: 14, height: 14, justifyContent: 'center', alignItems: 'center'
  },
  rupeeText: { color: '#fff', fontSize: 9, fontWeight: 'bold' },

  bannerRow: {
    backgroundColor: '#fff',
    marginHorizontal: 16, marginTop: 16,
    borderRadius: 12, padding: 12,
    flexDirection: 'row', alignItems: 'center',
    elevation: 2,
  },
  bannerLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  bannerTitle: { fontSize: 14, fontWeight: '700', color: '#000' },
  bannerSubtitle: { fontSize: 12, color: '#666', marginTop: 2 },
  tagContainer: {
    backgroundColor: '#e3f2fd', paddingHorizontal: 6,
    paddingVertical: 2, borderRadius: 4, marginRight: 10,
  },
  tagText: { color: '#2196f3', fontSize: 10, fontWeight: 'bold' },

  toggleCard: {
    backgroundColor: '#fff', marginHorizontal: 16, marginTop: 16,
    borderRadius: 12, padding: 16, elevation: 2,
  },
  toggleContent: { flexDirection: 'row', alignItems: 'flex-start' },
  toggleIconArea: { marginRight: 12, marginTop: 2 },
  toggleTextArea: { flex: 1, marginRight: 10 },
  toggleTitle: { fontSize: 15, fontWeight: '600', color: '#333', marginBottom: 4 },
  toggleDesc: { fontSize: 12, color: '#888', lineHeight: 18, marginBottom: 4 },
  linkText: { fontSize: 12, color: 'green', textDecorationLine: 'underline', fontWeight: '600' },

  sectionContainer: { marginTop: 24, paddingHorizontal: 16 },
  sectionHeader: { fontSize: 16, fontWeight: '700', color: '#222', marginBottom: 12 },
  listCard: {
    backgroundColor: '#fff', borderRadius: 16,
    elevation: 2, overflow: 'hidden',
  },
  listItem: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 16, paddingHorizontal: 16,
    borderBottomWidth: 1, borderBottomColor: '#f0f0f0',
  },
  listItemLast: { borderBottomWidth: 0 },
  listIconLeft: { width: 24, alignItems: 'center', marginRight: 16 },
  listContent: { flex: 1 },
  listLabel: { fontSize: 15, color: '#333', fontWeight: '400' },
});

export default ProfileScreen;