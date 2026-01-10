

// import { useFocusEffect, useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import React, { useCallback, useEffect, useRef, useState } from 'react';
// import {
//   ActivityIndicator,
//   Animated,
//   Dimensions,
//   Easing,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Switch,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// // Replaced Video import with LottieView
// import LottieView from 'lottie-react-native';

// // --- CUSTOM IMPORTS ---
// import FoodList from '../components/FoodCard';
// import { COLORS } from '../theme/color';
// // Ensure the path matches your folder structure
// import { useGetAllCategory } from '../api/hooks/getAllCategory';
// import { useGetAllVendors } from '../api/hooks/useVender';

// const { width } = Dimensions.get('window');

// // --- TYPES ---
// type RootStackParamList = {
//   HomeScreen: undefined;
//   LocationScreen: undefined;
//   GoldScreen: undefined;
//   ZomatoMoneyPage: undefined;
//   ProfileScreen: undefined;
//   FoodList: { category: string };
//   ProductScreen: { category: string };
//   CheckoutScreen: undefined;
//   DiningScreen: undefined;
//   VegMode: undefined;
//   SearchScreen: undefined;
//   MealsUnderScreen: undefined;
// };

// // --- DATA ---
// const staticCategories = [
//   {
//     id: 'special_1',
//     name: 'Meals Under\n₹250',
//     image: { url: 'https://b.zmtcdn.com/data/o2_assets/52eb9796bb9bcf0eba64c643349e97211634401116.png' },
//     isSpecial: true,
//   },
//   {
//     id: 'static_all',
//     name: 'All',
//     image: { url: 'https://tse1.mm.bing.net/th/id/OIP.y9WHqmBEubDgxpHWqRN9sAHaEO?pid=Api&P=0&h=180' },
//     isSpecial: false,
//   },
// ];

// // --- BANNER CONFIGURATION ---
// const HEADER_HEIGHT = 60;
// const SEARCH_HEIGHT = 70;
// const BANNER_HEIGHT = 220;
// const HERO_HEIGHT = HEADER_HEIGHT + SEARCH_HEIGHT + BANNER_HEIGHT;

// const banners = [
//   { id: '1', img: 'https://media1.tokyodisneyresort.jp/food_menu/image/1000004251_1.3_1_1k7Tlv26.jpg' },
//   { id: '2', img: 'https://media.edinburgh.org/wp-content/uploads/2023/04/26161552/thumb_40653_point_of_interest_bigger.jpeg' },
// ];

// const HomeScreen: React.FC = () => {
//   const [vegMode, setVegMode] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState('All');

//   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

//   // --- SCROLL Y REFERENCE ---
//   const scrollY = useRef(new Animated.Value(0)).current;

//   useFocusEffect(
//     useCallback(() => {
//       setSelectedCategory('All');
//     }, [])
//   );

//   const cartCount = 2;
//   const restaurant = {
//     name: 'The Pizza Project',
//     logo: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg',
//   };
//   const handleMenuPress = () => {
//     console.log('Menu pressed');
//   };

//   const slideAnim = useRef(new Animated.Value(0)).current;

//   const handleVegToggle = (val: boolean) => {
//     setVegMode(val);
//   };

//   useEffect(() => {
//     const animateBanner = () => {
//       Animated.sequence([
//         Animated.delay(3000),
//         Animated.timing(slideAnim, {
//           toValue: -width,
//           duration: 600,
//           useNativeDriver: true,
//           easing: Easing.inOut(Easing.ease),
//         }),
//         Animated.delay(3000),
//         Animated.timing(slideAnim, {
//           toValue: -width * 2,
//           duration: 600,
//           useNativeDriver: true,
//           easing: Easing.inOut(Easing.ease),
//         }),
//       ]).start(({ finished }) => {
//         if (finished) {
//           slideAnim.setValue(0);
//           animateBanner();
//         }
//       });
//     };

//     animateBanner();
//   }, []);

//   const renderBannerContent = (item: any, index: number) => {
//     return (
//       <View key={index} style={styles.bannerSlide}>
//         <Image
//           source={{ uri: item.img }}
//           style={styles.bannerImage}
//           resizeMode="cover"
//         />
//         <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.1)' }} />
//       </View>
//     );
//   };

//   // --- API INTEGRATION ---
//   const { data: restaurantData, isLoading } = useGetAllVendors({ limit: 20 });
//   const { data: categoryData, isLoading: categoryLoading } = useGetAllCategory({});

//   const displayCategories = [
//     ...staticCategories,
//     ...(categoryData || [])
//   ];

//   const allVendors = restaurantData?.pages.flatMap(page => page.vendors).slice(0, 20) || [];
//   const midPoint = Math.ceil(allVendors.length / 2);
//   const firstRowVendors = allVendors.slice(0, midPoint);
//   const secondRowVendors = allVendors.slice(midPoint);

//   // --- STICKY HEADER ANIMATION LOGIC (Search Bar) ---
//   const stickyHeaderOpacity = scrollY.interpolate({
//     inputRange: [HEADER_HEIGHT, HEADER_HEIGHT + 20],
//     outputRange: [0, 1],
//     extrapolate: 'clamp',
//   });

//   const stickyHeaderTranslateY = scrollY.interpolate({
//     inputRange: [HEADER_HEIGHT, HEADER_HEIGHT + 20],
//     // FIX 1: Changed -20 to -150. Moves it WAY off screen so it doesn't block Header buttons
//     outputRange: [-150, 0], 
//     extrapolate: 'clamp',
//   });

//   // --- STICKY CATEGORY ANIMATION LOGIC ---
//   const CATEGORY_TRIGGER = HERO_HEIGHT - 70;

//   const stickyCategoryOpacity = scrollY.interpolate({
//     inputRange: [CATEGORY_TRIGGER, CATEGORY_TRIGGER + 20],
//     outputRange: [0, 1],
//     extrapolate: 'clamp',
//   });

//   const stickyCategoryTranslateY = scrollY.interpolate({
//     inputRange: [CATEGORY_TRIGGER, CATEGORY_TRIGGER + 20],
//     // FIX 2: Changed -10 to -200. Moves it WAY off screen so it doesn't block Veg Toggle
//     outputRange: [-200, 0], 
//     extrapolate: 'clamp',
//   });

//   return (
//     <SafeAreaView style={styles.container}>

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//           { useNativeDriver: false }
//         )}
//         scrollEventThrottle={16}
//       >

//         {/* Hero Section */}
//         <View style={styles.heroContainer}>

//           {/* Banner */}
//           <View style={styles.bannerOuterContainer}>
//             <Animated.View
//               style={[
//                 styles.bannerMovingTrack,
//                 { transform: [{ translateX: slideAnim }] },
//               ]}
//             >
//               {renderBannerContent(banners[0], 0)}
//               {renderBannerContent(banners[1], 1)}
//               {renderBannerContent(banners[0], 2)}
//             </Animated.View>
//           </View>

//           {/* Header */}
//           <View style={styles.header}>
//             <View style={styles.headerLeft}>
//               <Ionicons name="location-sharp" size={26} color={COLORS.primary} />
//               <View style={styles.locationContainer}>
//                 <TouchableOpacity
//                   style={styles.locationRow}
//                   onPress={() => navigation.navigate('LocationScreen')}
//                 >
//                   <Text style={styles.locationTitle}>Home</Text>
//                   <Ionicons
//                     name="chevron-down"
//                     size={16}
//                     color="#333"
//                     style={{ marginLeft: 4 }}
//                   />
//                 </TouchableOpacity>
//                 <Text style={styles.locationSub} numberOfLines={1}>
//                   Harmu Housing Colony, Delatoli...
//                 </Text>
//               </View>
//             </View>

//             <View style={styles.headerRight}>
//               <TouchableOpacity
//                 style={styles.goldBadge}
//                 onPress={() => navigation.navigate('GoldScreen')}
//               >
//                 <Text style={styles.goldText}>Elite</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.iconBtn}
//                 onPress={() => navigation.navigate('ZomatoMoneyPage')}
//               >
//                 <MaterialCommunityIcons
//                   name="wallet-outline"
//                   size={24}
//                   color="#333"
//                   style={{ marginRight: 4 }}
//                 />
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.profileBtn}
//                 onPress={() => navigation.navigate('ProfileScreen')}
//               >
//                 <Text style={styles.profileText}>S</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
          
//           {/* ORIGINAL SEARCH BAR */}
//           <View style={styles.searchWrapper}>
//             <View style={styles.searchRow}>
//               <View style={styles.searchBar}>
//                 <Ionicons name="search" size={20} color={COLORS.primary} />
//                 <TextInput
//                   placeholder='Search "momos"'
//                   style={styles.searchInput}
//                   placeholderTextColor="#888"
//                   onPressIn={() => navigation.navigate('SearchScreen')} // changed onPress to onPressIn for better response
//                 />
//                 <View style={styles.verticalLine} />
//                 <Ionicons
//                   name="mic-outline"
//                   size={22}
//                   color={COLORS.primary}
//                   style={{ marginLeft: 8 }}
//                 />
//               </View>

//               <View style={styles.vegModeContainer}>
//                 <Switch
//                   value={vegMode}
//                   onValueChange={handleVegToggle}
//                   trackColor={{ false: '#E0E0E0', true: '#007E33' }}
//                   thumbColor="#fff"
//                   style={styles.vegSwitch}
//                 />
//                 <View style={styles.vegTextColumn}>
//                   <Text style={[styles.vegModeLabel, vegMode && { color: '#007E33' }]}>VEG</Text>
//                   <Text style={[styles.vegModeSubLabel, vegMode && { color: '#007E33' }]}>MODE</Text>
//                 </View>
//               </View>
//             </View>
//           </View>
//         </View>

//         {/* Categories Section (Original) */}
//         <View style={styles.categoriesContainer}>
//           {categoryLoading ? (
//             <ActivityIndicator size="small" color={COLORS.primary} style={{ marginLeft: 20 }} />
//           ) : (
//             <ScrollView
//               horizontal
//               showsHorizontalScrollIndicator={false}
//             >
//               {displayCategories.map((c: any, index: number) => (
//                 <TouchableOpacity
//                   key={c.id || index}
//                   style={styles.categoryItem}
//                   onPress={() => {
//                     if (!c.isSpecial) {
//                       setSelectedCategory(c.name);
//                       navigation.navigate('FoodList', { category: c.name });
//                     }
//                   }}
//                 >
//                   {c.isSpecial ? (
//                     <TouchableOpacity onPress={() => navigation.navigate('MealsUnderScreen')}>
//                     <View style={styles.specialCategory}>
//                       <Image
//                         source={{ uri: c.image?.url }}
//                         style={styles.specialCategoryImg}
//                       />
//                       <View style={styles.specialCategoryOverlay}>
//                         <Text style={styles.specialCategoryText}>MEALS UNDER</Text>
//                         <Text style={styles.specialCategoryPrice}>₹250</Text>
//                         <View style={styles.exploreSmallBtn}>
//                           <Text style={styles.exploreSmallText}>Explore ›</Text>
//                         </View>
//                       </View>
//                     </View>
//                     </TouchableOpacity>
//                   ) : (
//                     <>
//                       <Image
//                         source={{ uri: c.image?.url }}
//                         style={styles.categoryImg}
//                       />
//                       <Text
//                         style={[
//                           styles.categoryText,
//                           selectedCategory === c.name &&
//                           styles.categoryTextSelected,
//                         ]}
//                       >
//                         {c.name.charAt(0).toUpperCase() + c.name.slice(1)}
//                       </Text>
//                       {selectedCategory === c.name && (
//                         <View style={styles.categoryUnderline} />
//                       )}
//                     </>
//                   )}
//                 </TouchableOpacity>
//               ))}
//             </ScrollView>
//           )}
//         </View>

//         {/* --- DYNAMIC RECOMMENDED SECTION --- */}
//         <Text style={styles.sectionTitle}>RECOMMENDED FOR YOU</Text>

//         {isLoading ? (
//           <View style={{ height: 200, justifyContent: 'center', alignItems: 'center' }}>
//             <ActivityIndicator size="large" color={COLORS.primary} />
//           </View>
//         ) : (
//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             style={styles.recommendedContainer}
//           >
//             <View style={{ flexDirection: 'column' }}>

//               {/* Row 1 */}
//               <View style={styles.recommendedRow}>
//                 {firstRowVendors.map((vendor) => {
//                   const uiData = {
//                     id: vendor.id,
//                     name: vendor.shopName || vendor.companyName || 'Unknown Store',
//                     img: vendor.images?.url || 'https://via.placeholder.com/150',
//                     discount: 'FLAT 20% OFF',
//                     rating: '4.2',
//                     time: '30-40 mins',
//                     isYellow: false
//                   };

//                   return (
//                     <TouchableOpacity
//                       key={vendor.id.toString()}
//                       activeOpacity={0.8}
//                       onPress={() =>
//                         navigation.navigate('ProductScreen', { category: uiData.name })
//                       }
//                     >
//                       <RestaurantCard data={uiData} />
//                     </TouchableOpacity>
//                   );
//                 })}
//               </View>

//               {/* Row 2 */}
//               <View style={styles.recommendedRow}>
//                 {secondRowVendors.map((vendor) => {
//                   const uiData = {
//                     id: vendor.id,
//                     name: vendor.shopName || vendor.companyName || 'Unknown Store',
//                     img: vendor.images?.url || 'https://via.placeholder.com/150',
//                     discount: 'FLAT 15% OFF',
//                     rating: '4.0',
//                     time: '25-30 mins',
//                     isYellow: true
//                   };

//                   return (
//                     <TouchableOpacity
//                       key={vendor.id.toString()}
//                       activeOpacity={0.8}
//                       onPress={() =>
//                         navigation.navigate('ProductScreen', { category: uiData.name })
//                       }
//                     >
//                       <RestaurantCard data={uiData} />
//                     </TouchableOpacity>
//                   );
//                 })}
//               </View>

//             </View>
//           </ScrollView>
//         )}
//         {/* --- END DYNAMIC RECOMMENDED --- */}

//         <FoodList />

//         <View style={{ height: 80 }} />

//       </ScrollView>

//       {/* --- STICKY SEARCH BAR (Overlay) --- */}
//       <Animated.View 
//         style={[
//           styles.searchWrapper, 
//           { 
//             position: 'absolute', 
//             top: 0, 
//             left: 0, 
//             right: 0,
//             zIndex: 100, 
//             backgroundColor: '#fff', 
//             borderBottomWidth: 1,
//             borderBottomColor: '#f0f0f0',
//             paddingTop: 10, 
//             opacity: stickyHeaderOpacity,
//             transform: [{ translateY: stickyHeaderTranslateY }],
//             elevation: 5
//           }
//         ]}
//       >
//         <View style={styles.searchRow}>
//           <View style={styles.searchBar}>
//             <Ionicons name="search" size={20} color={COLORS.primary} />
//             <TextInput
//               placeholder='Search "momos"'
//               style={styles.searchInput}
//               placeholderTextColor="#888"
//               onPressIn={() => navigation.navigate('SearchScreen')}
//             />
//             <View style={styles.verticalLine} />
//             <Ionicons
//               name="mic-outline"
//               size={22}
//               color={COLORS.primary}
//               style={{ marginLeft: 8 }}
//             />
//           </View>

//           <View style={styles.vegModeContainer}>
//             <Switch
//               value={vegMode}
//               onValueChange={handleVegToggle}
//               trackColor={{ false: '#E0E0E0', true: '#007E33' }}
//               thumbColor="#fff"
//               style={styles.vegSwitch}
//             />
//             <View style={styles.vegTextColumn}>
//               <Text style={[styles.vegModeLabel, vegMode && { color: '#007E33' }]}>VEG</Text>
//               <Text style={[styles.vegModeSubLabel, vegMode && { color: '#007E33' }]}>MODE</Text>
//             </View>
//           </View>
//         </View>
//       </Animated.View>

//       {/* --- NEW: STICKY CATEGORIES BAR (Appears under Search Bar) --- */}
//       <Animated.View
//         style={{
//             position: 'absolute',
//             top: 68, // Roughly the height of the sticky search bar
//             left: 0,
//             right: 0,
//             zIndex: 99, // Below search bar (100) but above content
//             backgroundColor: '#fff',
//             opacity: stickyCategoryOpacity,
//             transform: [{ translateY: stickyCategoryTranslateY }],
//             elevation: 4,
//             paddingBottom: 10,
//             borderBottomWidth: 1,
//             borderBottomColor: '#f0f0f0'
//         }}
//       >
//         <View style={{ paddingLeft: 12, paddingTop: 10 }}>
//           <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//               {displayCategories.map((c: any, index: number) => (
//                 <TouchableOpacity
//                   key={c.id || index}
//                   style={styles.categoryItem}
//                   onPress={() => {
//                     if (!c.isSpecial) {
//                       setSelectedCategory(c.name);
//                       navigation.navigate('FoodList', { category: c.name });
//                     }
//                   }}
//                 >
//                   {c.isSpecial ? (
//                       <TouchableOpacity onPress={() => navigation.navigate('MealsUnderScreen')}>
//                     <View style={styles.specialCategory}>
//                       <Image
//                         source={{ uri: c.image?.url }}
//                         style={styles.specialCategoryImg}
//                       />
//                       <View style={styles.specialCategoryOverlay}>
//                         <Text style={styles.specialCategoryText}>MEALS UNDER</Text>
//                         <Text style={styles.specialCategoryPrice}>₹250</Text>
//                       </View>
//                     </View>
//                     </TouchableOpacity>
//                   ) : (
//                     <>
//                       <Image
//                         source={{ uri: c.image?.url }}
//                         style={styles.categoryImg}
//                       />
//                       <Text
//                         style={[
//                           styles.categoryText,
//                           selectedCategory === c.name &&
//                           styles.categoryTextSelected,
//                         ]}
//                       >
//                         {c.name.charAt(0).toUpperCase() + c.name.slice(1)}
//                       </Text>
//                       {selectedCategory === c.name && (
//                         <View style={styles.categoryUnderline} />
//                       )}
//                     </>
//                   )}
//                 </TouchableOpacity>
//               ))}
//             </ScrollView>
//         </View>
//       </Animated.View>


//       {/* Floating Cart */}
//       <View style={styles.viewCartContainer}>
//         <TouchableOpacity
//           style={styles.cartLeft}
//           onPress={handleMenuPress}
//           activeOpacity={0.7}
//         >
//           <Image source={{ uri: restaurant.logo }} style={styles.cartImg} />
//           <View>
//             <Text style={styles.cartTitle}>{restaurant.name}</Text>
//             <Text style={styles.cartSubtitle}>View Menu ➝</Text>
//           </View>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.viewCartBtn}
//           onPress={() => navigation.navigate('CheckoutScreen')}
//         >
//           <Text style={styles.viewCartText}>View Cart</Text>
//           <Text style={styles.itemCount}>{cartCount} item</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Bottom Navigation */}
//       <View style={styles.bottomNav}>

//         {/* Delivery */}
//         <TouchableOpacity style={styles.navItem}>
//           <MaterialCommunityIcons
//             name="moped"
//             size={26}
//             color={COLORS.primary}
//           />
//           <Text style={styles.navTextActive}>Delivery</Text>
//         </TouchableOpacity>

//         {/* Floating Lottie Button (Replaces Video) */}
//         <TouchableOpacity
//           onPress={() => navigation.navigate('DiningScreen')}
//           style={{
//             position: "absolute",
//             top: -20,
//             left: "50%",
//             transform: [{ translateX: -35 }],
//             zIndex: 99,
//             alignItems: 'center'
//           }}
//         >
//           <View
//             style={{
//               width: 60,
//               height: 60,
//               borderRadius: 70,
//               overflow: "hidden",
//               backgroundColor: "#fff",
//               elevation: 8,
//               shadowColor: "#000",
//               shadowOpacity: 0.25,
//               shadowRadius: 6,
//               shadowOffset: { width: 0, height: 2 },
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             <LottieView
//               source={require('../assets/PaymentFailed.json')}
//               style={{ width: 60, height: 60 }}
//               autoPlay
//               loop
//             />
//           </View>
//           <Text style={styles.navTextActive}>Under 50%</Text>
//         </TouchableOpacity>

//         {/* Money */}
//         <TouchableOpacity style={styles.navItem}>
//           <MaterialCommunityIcons
//             name="wallet-membership"
//             size={26}
//             color={COLORS.primary}
//           />
//           <Text style={styles.navText}>Money</Text>
//         </TouchableOpacity>

//       </View>

//     </SafeAreaView>
//   );
// };

// // Restaurant Card Component
// const RestaurantCard = ({ data }: { data: any }) => (
//   <View style={styles.recommendedCard}>
//     <Image source={{ uri: data.img }} style={styles.recommendedImg} />
//     <View
//       style={[
//         styles.discountBadge,
//         data.isYellow && styles.discountBadgeYellow,
//       ]}
//     >
//       <Text
//         style={[
//           styles.discountText,
//           data.isYellow && styles.discountTextDark,
//         ]}
//       >
//         {data.discount}
//       </Text>
//     </View>
//     <View style={styles.cardContent}>
//       <View style={styles.nameRow}>
//         <Text style={styles.recommendedName} numberOfLines={1}>
//           {data.name}
//         </Text>
//         <View style={styles.ratingBadgeSmall}>
//           <Text style={styles.ratingTextSmall}>{data.rating}★</Text>
//         </View>
//       </View>
//       <Text style={styles.recommendedTime}>{data.time}</Text>
//     </View>
//   </View>
// );

// // --- styles ---
// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },

//   heroContainer: {
//     height: HERO_HEIGHT,
//     position: 'relative',
//     overflow: 'visible',
//   },

//   // Header
//   header: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     zIndex: 20,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     paddingHorizontal: 12,
//     paddingTop: 10,
//     paddingBottom: 8,
//     backgroundColor: 'transparent',
//   },
//   headerLeft: { flexDirection: 'row', alignItems: 'flex-start', flex: 1 },
//   locationContainer: { marginLeft: 8, flex: 1 },
//   locationRow: { flexDirection: 'row', alignItems: 'center' },
//   locationTitle: { fontSize: 16, fontWeight: '900', color: '#1C1C1C' },
//   locationSub: { fontSize: 12, color: COLORS.textSecondary, marginTop: 1, width: '90%', fontWeight: 800 },
//   headerRight: { flexDirection: 'row', alignItems: 'center' },
//   goldBadge: {
//     backgroundColor: '#2D2D2D',
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 6,
//     marginRight: 10,
//   },
//   goldText: { fontSize: 10, fontWeight: '900', color: '#D4AF37' },
//   iconBtn: { marginRight: 12 },
//   profileBtn: {
//     width: 32,
//     height: 32,
//     borderRadius: 60,
//     backgroundColor: '#E0F2F1',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#000',
//   },
//   profileText: { fontSize: 16, fontWeight: 'bold', color: '#00695C' },

//   // Search Bar Overlay
//   searchWrapper: {
//     position: 'absolute',
//     top: HEADER_HEIGHT,
//     left: 0,
//     right: 0,
//     zIndex: 30, // Increased to appear above others if needed
//     backgroundColor: 'transparent',
//     paddingBottom: 10,
//   },
//   searchRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 12,
//   },
//   // --- UPDATED SEARCH BAR CSS ---
//   searchBar: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 12, // More rounded
//     paddingHorizontal: 15,
//     height: 48, // Taller for better touch target
//     borderWidth: 0.5,
//     borderColor: COLORS.SOFT_BLUE,
//     marginRight: 10,
//     // Enhanced Shadow
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   searchInput: { flex: 1, marginLeft: 8, fontSize: 15, color: '#000' },
//   verticalLine: { width: 1, height: 20, backgroundColor: '#ddd' },

//   // --- VEG MODE CSS ---
//   vegModeContainer: {
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: 50,
//   },
//   vegTextColumn: {
//     alignItems: 'center',
//     marginTop: -2,
//   },
//   vegModeLabel: {
//     fontSize: 10,
//     fontWeight: '900',
//     color: COLORS.primary,
//     letterSpacing: 0.5,
//     lineHeight: 12,
//   },
//   vegModeSubLabel: {
//     fontSize: 8,
//     color: COLORS.primary,
//     fontWeight: '900',
//     letterSpacing: 0.5,
//     lineHeight: 10,
//   },
//   vegSwitch: {
//     transform: [{ scale: 0.7 }],
//     marginBottom: 0,
//   },

//   // Banner
//   bannerOuterContainer: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     zIndex: 1,
//     backgroundColor: '#f2f2f2',
//     borderBottomLeftRadius: 24,
//     borderBottomRightRadius: 24,
//     overflow: 'hidden',
//   },
//   bannerMovingTrack: {
//     width: width * 3,
//     height: HERO_HEIGHT,
//     flexDirection: 'row',
//   },
//   bannerSlide: {
//     width,
//     height: HERO_HEIGHT,
//     overflow: 'hidden',
//     position: 'relative',
//   },
//   bannerImage: {
//     width: '100%',
//     height: '100%',
//   },

//   // Categories
//   categoriesContainer: { paddingLeft: 12, marginBottom: 16, paddingTop: 16 },
//   categoryItem: { alignItems: 'center', marginRight: 16 },
//   specialCategory: {
//     width: 70,
//     height: 80,
//     borderRadius: 12,
//     overflow: 'hidden',
//   },
//   specialCategoryImg: { width: '95%', height: '80%' },
//   specialCategoryOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(0,0,0,0.4)',
//     justifyContent: 'flex-end',
//     padding: 6,
//   },
//   specialCategoryText: { fontSize: 8, color: '#fff', fontWeight: '800', marginLeft: 10 },
//   specialCategoryPrice: { fontSize: 16, color: COLORS.white, fontWeight: '900', marginLeft: 5 },
//   exploreSmallBtn: {
//     backgroundColor: COLORS.primary,
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 4,
//     marginTop: 4,
//     alignSelf: 'flex-start',
//     marginLeft: 3,
//   },
//   exploreSmallText: { fontSize: 8, fontWeight: 'bold', color: '#fff' },
//   categoryImg: {
//     width: 65,
//     height: 60,
//     borderRadius: 50,
//     backgroundColor: '#f0f0f0',
//   },
//   categoryText: {
//     fontSize: 11,
//     color: '#444',
//     marginTop: 6,
//     fontWeight: '900',
//   },
//   categoryTextSelected: { color: COLORS.primary, fontWeight: '900', },
//   categoryUnderline: {
//     width: 50,
//     height: 3,
//     backgroundColor: COLORS.primary,
//     borderRadius: 2,
//     marginTop: 4,
//   },

//   // Filters
//   filtersContainer: { paddingLeft: 10, marginBottom: 16 },
//   filterBtn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//     marginRight: 8,
//     backgroundColor: '#fff',
//     elevation: 1,
//   },
//   filterBtnSelected: {
//     borderColor: COLORS.primary,
//     backgroundColor: COLORS.accent,
//   },
//   filterText: { fontSize: 10, color: '#333', fontWeight: '900' },
//   filterTextSelected: { color: COLORS.primary },

//   // Recommended
//   sectionTitle: {
//     fontSize: 13,
//     fontWeight: '800',
//     color: COLORS.muted,
//     marginLeft: 12,
//     marginBottom: 12,
//     letterSpacing: 1,
//   },
//   recommendedContainer: { paddingLeft: 12, marginBottom: 10, },
//   recommendedRow: { flexDirection: 'row', marginBottom: 12 },
//   recommendedCard: {
//     width: 120,
//     height: 130,
//     marginRight: 12,
//     borderRadius: 12,
//     backgroundColor: '#fff',
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   recommendedImg: {
//     width: '100%',
//     height: 80,
//     borderTopLeftRadius: 12,
//     borderTopRightRadius: 12,
//   },
//   discountBadge: {
//     position: 'absolute',
//     top: 10,
//     left: -4,
//     backgroundColor: COLORS.primary,
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderTopRightRadius: 4,
//     borderBottomRightRadius: 4,
//     shadowColor: '#000',
//     shadowOffset: { width: 1, height: 1 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     marginLeft: 4,
//   },
//   discountBadgeYellow: { backgroundColor: '#FFC107' },
//   discountText: { fontSize: 8, color: '#fff', fontWeight: 'bold' },
//   discountTextDark: { color: '#000' },
//   cardContent: { padding: 10 },
//   nameRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   recommendedName: {
//     fontSize: 13,
//     fontWeight: '800',
//     color: '#1C1C1C',
//     flex: 1,
//   },
//   ratingBadgeSmall: {
//     backgroundColor: COLORS.highlight,
//     borderRadius: 4,
//     paddingHorizontal: 4,
//     paddingVertical: 2,
//     marginLeft: 4,
//   },
//   ratingTextSmall: { color: '#fff', fontSize: 9, fontWeight: 'bold' },
//   recommendedTime: { fontSize: 11, color: '#888', marginTop: 0 },

//   // Floating Cart
//   viewCartContainer: {
//     position: 'absolute',
//     bottom: 60,
//     left: 10,
//     right: 10,
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 5,
//     marginBottom: 20,
//   },
//   cartLeft: { flexDirection: 'row', alignItems: 'center' },
//   cartImg: { width: 40, height: 40, borderRadius: 8, marginRight: 10 },
//   cartTitle: { fontSize: 14, fontWeight: 'bold', color: '#000' },
//   cartSubtitle: { fontSize: 12, color: '#666' },
//   viewCartBtn: {
//     backgroundColor: COLORS.primary,
//     paddingHorizontal: 15,
//     paddingVertical: 6,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   viewCartText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
//   itemCount: { color: '#fff', fontSize: 12 },

//   bottomNav: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     paddingVertical: 10,
//     borderTopWidth: 1,
//     borderTopColor: '#eee',
//     elevation: 20,
//     height: 70,
//     position: "relative",
//   },

//   navItem: { alignItems: 'center', },
//   navText: { fontSize: 10, color: COLORS.primary, marginTop: 4, fontWeight: '600' },
//   navTextActive: {
//     fontSize: 10,
//     color: COLORS.primary,
//     marginTop: 0,
//     fontWeight: '800',
//   },
// });

// export default HomeScreen;


import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Easing,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// Replaced Video import with LottieView
import LottieView from 'lottie-react-native';

// --- CUSTOM IMPORTS ---
import FoodList from '../components/FoodCard';
import { COLORS } from '../theme/color';
// Ensure the path matches your folder structure
import { useGetAllCategory } from '../api/hooks/getAllCategory';
import { useGetAllVendors } from '../api/hooks/useVender';

const { width } = Dimensions.get('window');

// --- TYPES ---
type RootStackParamList = {
  HomeScreen: undefined;
  LocationScreen: undefined;
  GoldScreen: undefined;
  ZomatoMoneyPage: undefined;
  ProfileScreen: undefined;
  FoodList: { category: string };
  ProductScreen: { category: string };
  CheckoutScreen: undefined;
  DiningScreen: undefined;
  VegMode: undefined;
  SearchScreen: undefined;
  MealsUnderScreen: undefined;
};

// --- DATA ---
const staticCategories = [
  {
    id: 'special_1',
    name: 'Meals Under\n₹250',
    image: { url: 'https://b.zmtcdn.com/data/o2_assets/52eb9796bb9bcf0eba64c643349e97211634401116.png' },
    isSpecial: true,
  },
  {
    id: 'static_all',
    name: 'All',
    image: { url: 'https://tse1.mm.bing.net/th/id/OIP.y9WHqmBEubDgxpHWqRN9sAHaEO?pid=Api&P=0&h=180' },
    isSpecial: false,
  },
];

// --- BANNER CONFIGURATION ---
const HEADER_HEIGHT = 60;
const SEARCH_HEIGHT = 70;
const BANNER_HEIGHT = 220;
const HERO_HEIGHT = HEADER_HEIGHT + SEARCH_HEIGHT + BANNER_HEIGHT;

const banners = [
  { id: '1', img: 'https://media1.tokyodisneyresort.jp/food_menu/image/1000004251_1.3_1_1k7Tlv26.jpg' },
  { id: '2', img: 'https://media.edinburgh.org/wp-content/uploads/2023/04/26161552/thumb_40653_point_of_interest_bigger.jpeg' },
];

const HomeScreen: React.FC = () => {
  const [vegMode, setVegMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // --- SCROLL Y REFERENCE ---
  const scrollY = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    useCallback(() => {
      setSelectedCategory('All');
    }, [])
  );

  const cartCount = 2;
  const restaurant = {
    name: 'The Pizza Project',
    logo: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg',
  };
  const handleMenuPress = () => {
    console.log('Menu pressed');
  };

  const slideAnim = useRef(new Animated.Value(0)).current;

  const handleVegToggle = (val: boolean) => {
    setVegMode(val);
  };

  useEffect(() => {
    const animateBanner = () => {
      Animated.sequence([
        Animated.delay(3000),
        Animated.timing(slideAnim, {
          toValue: -width,
          duration: 600,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.delay(3000),
        Animated.timing(slideAnim, {
          toValue: -width * 2,
          duration: 600,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ]).start(({ finished }) => {
        if (finished) {
          slideAnim.setValue(0);
          animateBanner();
        }
      });
    };

    animateBanner();
  }, []);

  const renderBannerContent = (item: any, index: number) => {
    return (
      <View key={index} style={styles.bannerSlide}>
        <Image
          source={{ uri: item.img }}
          style={styles.bannerImage}
          resizeMode="cover"
        />
        <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.1)' }} />
      </View>
    );
  };

  // --- API INTEGRATION ---
  const { data: restaurantData, isLoading } = useGetAllVendors({ limit: 20 });
  const { data: categoryData, isLoading: categoryLoading } = useGetAllCategory({});

  const displayCategories = [
    ...staticCategories,
    ...(categoryData || [])
  ];

  const allVendors = restaurantData?.pages.flatMap(page => page.vendors).slice(0, 20) || [];
  const midPoint = Math.ceil(allVendors.length / 2);
  const firstRowVendors = allVendors.slice(0, midPoint);
  const secondRowVendors = allVendors.slice(midPoint);

  // --- STICKY HEADER ANIMATION LOGIC (Search Bar) ---
  const stickyHeaderOpacity = scrollY.interpolate({
    inputRange: [HEADER_HEIGHT, HEADER_HEIGHT + 20],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const stickyHeaderTranslateY = scrollY.interpolate({
    inputRange: [HEADER_HEIGHT, HEADER_HEIGHT + 20],
    // FIX 1: Changed -20 to -150. Moves it WAY off screen so it doesn't block Header buttons
    outputRange: [-150, 0], 
    extrapolate: 'clamp',
  });

  // --- STICKY CATEGORY ANIMATION LOGIC ---
  const CATEGORY_TRIGGER = HERO_HEIGHT - 70;

  const stickyCategoryOpacity = scrollY.interpolate({
    inputRange: [CATEGORY_TRIGGER, CATEGORY_TRIGGER + 20],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const stickyCategoryTranslateY = scrollY.interpolate({
    inputRange: [CATEGORY_TRIGGER, CATEGORY_TRIGGER + 20],
    // FIX 2: Changed -10 to -200. Moves it WAY off screen so it doesn't block Veg Toggle
    outputRange: [-200, 0], 
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >

        {/* Hero Section */}
        <View style={styles.heroContainer}>

          {/* Banner */}
          <View style={styles.bannerOuterContainer}>
            <Animated.View
              style={[
                styles.bannerMovingTrack,
                { transform: [{ translateX: slideAnim }] },
              ]}
            >
              {renderBannerContent(banners[0], 0)}
              {renderBannerContent(banners[1], 1)}
              {renderBannerContent(banners[0], 2)}
            </Animated.View>
          </View>

          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Ionicons name="location-sharp" size={26} color={COLORS.primary} />
              <View style={styles.locationContainer}>
                <TouchableOpacity
                  style={styles.locationRow}
                  onPress={() => navigation.navigate('LocationScreen')}
                >
                  <Text style={styles.locationTitle}>Home</Text>
                  <Ionicons
                    name="chevron-down"
                    size={16}
                    color="#333"
                    style={{ marginLeft: 4 }}
                  />
                </TouchableOpacity>
                <Text style={styles.locationSub} numberOfLines={1}>
                  Harmu Housing Colony, Delatoli...
                </Text>
              </View>
            </View>

            <View style={styles.headerRight}>
              <TouchableOpacity
                style={styles.goldBadge}
                onPress={() => navigation.navigate('GoldScreen')}
              >
                <Text style={styles.goldText}>Elite</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconBtn}
                onPress={() => navigation.navigate('ZomatoMoneyPage')}
              >
                <MaterialCommunityIcons
                  name="wallet-outline"
                  size={24}
                  color="#333"
                  style={{ marginRight: 4 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.profileBtn}
                onPress={() => navigation.navigate('ProfileScreen')}
              >
                <Text style={styles.profileText}>S</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* ORIGINAL SEARCH BAR */}
          <View style={styles.searchWrapper}>
            <View style={styles.searchRow}>
              <View style={styles.searchBar}>
                <Ionicons name="search" size={20} color={COLORS.primary} />
                <TextInput
                  placeholder='Search "momos"'
                  style={styles.searchInput}
                  placeholderTextColor="#888"
                  onPressIn={() => navigation.navigate('SearchScreen')} // changed onPress to onPressIn for better response
                />
                <View style={styles.verticalLine} />
                <Ionicons
                  name="mic-outline"
                  size={22}
                  color={COLORS.primary}
                  style={{ marginLeft: 8 }}
                />
              </View>

              <View style={styles.vegModeContainer}>
                <Switch
                  value={vegMode}
                  onValueChange={handleVegToggle}
                  trackColor={{ false: '#E0E0E0', true: '#007E33' }}
                  thumbColor="#fff"
                  style={styles.vegSwitch}
                />
                <View style={styles.vegTextColumn}>
                  <Text style={[styles.vegModeLabel, vegMode && { color: '#007E33' }]}>VEG</Text>
                  <Text style={[styles.vegModeSubLabel, vegMode && { color: '#007E33' }]}>MODE</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Categories Section (Original) */}
        <View style={styles.categoriesContainer}>
          {categoryLoading ? (
            <ActivityIndicator size="small" color={COLORS.primary} style={{ marginLeft: 20 }} />
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {displayCategories.map((c: any, index: number) => (
                <TouchableOpacity
                  key={c.id || index}
                  style={styles.categoryItem}
                  onPress={() => {
                    if (!c.isSpecial) {
                      setSelectedCategory(c.name);
                      navigation.navigate('FoodList', { category: c.name });
                    }
                  }}
                >
                  {c.isSpecial ? (
                    <TouchableOpacity onPress={() => navigation.navigate('MealsUnderScreen')}>
                    <View style={styles.specialCategory}>
                      <Image
                        source={{ uri: c.image?.url }}
                        style={styles.specialCategoryImg}
                      />
                      <View style={styles.specialCategoryOverlay}>
                        <Text style={styles.specialCategoryText}>MEALS UNDER</Text>
                        <Text style={styles.specialCategoryPrice}>₹250</Text>
                        <View style={styles.exploreSmallBtn}>
                          <Text style={styles.exploreSmallText}>Explore ›</Text>
                        </View>
                      </View>
                    </View>
                    </TouchableOpacity>
                  ) : (
                    <>
                      <Image
                        source={{ uri: c.image?.url }}
                        style={styles.categoryImg}
                      />
                      <Text
                        style={[
                          styles.categoryText,
                          selectedCategory === c.name &&
                          styles.categoryTextSelected,
                        ]}
                      >
                        {c.name.charAt(0).toUpperCase() + c.name.slice(1)}
                      </Text>
                      {selectedCategory === c.name && (
                        <View style={styles.categoryUnderline} />
                      )}
                    </>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>

        {/* --- DYNAMIC RECOMMENDED SECTION --- */}
        <Text style={styles.sectionTitle}>RECOMMENDED FOR YOU</Text>

        {isLoading ? (
          <View style={{ height: 200, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.recommendedContainer}
          >
            <View style={{ flexDirection: 'column' }}>

              {/* Row 1 */}
              <View style={styles.recommendedRow}>
                {firstRowVendors.map((vendor) => {
                  const uiData = {
                    id: vendor.id,
                    name: vendor.shopName || vendor.companyName || 'Unknown Store',
                    img: vendor.images?.url || 'https://via.placeholder.com/150',
                    discount: 'FLAT 20% OFF',
                    rating: '4.2',
                    time: '30-40 mins',
                    isYellow: false
                  };

                  return (
                    <TouchableOpacity
                      key={vendor.id.toString()}
                      activeOpacity={0.8}
                      onPress={() =>
                        navigation.navigate('ProductScreen', { category: uiData.name })
                      }
                    >
                      <RestaurantCard data={uiData} />
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Row 2 */}
              <View style={styles.recommendedRow}>
                {secondRowVendors.map((vendor) => {
                  const uiData = {
                    id: vendor.id,
                    name: vendor.shopName || vendor.companyName || 'Unknown Store',
                    img: vendor.images?.url || 'https://via.placeholder.com/150',
                    discount: 'FLAT 15% OFF',
                    rating: '4.0',
                    time: '25-30 mins',
                    isYellow: true
                  };

                  return (
                    <TouchableOpacity
                      key={vendor.id.toString()}
                      activeOpacity={0.8}
                      onPress={() =>
                        navigation.navigate('ProductScreen', { category: uiData.name })
                      }
                    >
                      <RestaurantCard data={uiData} />
                    </TouchableOpacity>
                  );
                })}
              </View>

            </View>
          </ScrollView>
        )}
        {/* --- END DYNAMIC RECOMMENDED --- */}

        <FoodList />

        <View style={{ height: 80 }} />

      </ScrollView>

      {/* --- STICKY SEARCH BAR (Overlay) --- */}
      <Animated.View 
        style={[
          styles.searchWrapper, 
          { 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0, 
            zIndex: 100, 
            backgroundColor: '#fff', 
            borderBottomWidth: 1,
            borderBottomColor: '#f0f0f0',
            paddingTop: 10, 
            opacity: stickyHeaderOpacity,
            transform: [{ translateY: stickyHeaderTranslateY }],
            elevation: 5
          }
        ]}
      >
        <View style={styles.searchRow}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color={COLORS.primary} />
            <TextInput
              placeholder='Search "momos"'
              style={styles.searchInput}
              placeholderTextColor="#888"
              onPressIn={() => navigation.navigate('SearchScreen')}
            />
            <View style={styles.verticalLine} />
            <Ionicons
              name="mic-outline"
              size={22}
              color={COLORS.primary}
              style={{ marginLeft: 8 }}
            />
          </View>

          <View style={styles.vegModeContainer}>
            <Switch
              value={vegMode}
              onValueChange={handleVegToggle}
              trackColor={{ false: '#E0E0E0', true: '#007E33' }}
              thumbColor="#fff"
              style={styles.vegSwitch}
            />
            <View style={styles.vegTextColumn}>
              <Text style={[styles.vegModeLabel, vegMode && { color: '#007E33' }]}>VEG</Text>
              <Text style={[styles.vegModeSubLabel, vegMode && { color: '#007E33' }]}>MODE</Text>
            </View>
          </View>
        </View>
      </Animated.View>

      {/* --- NEW: STICKY CATEGORIES BAR (Appears under Search Bar) --- */}
      <Animated.View
        style={{
            position: 'absolute',
            top: 68, // Roughly the height of the sticky search bar
            left: 0,
            right: 0,
            zIndex: 99, // Below search bar (100) but above content
            backgroundColor: '#fff',
            opacity: stickyCategoryOpacity,
            transform: [{ translateY: stickyCategoryTranslateY }],
            elevation: 4,
            paddingBottom: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#f0f0f0'
        }}
      >
        <View style={{ paddingLeft: 12, paddingTop: 10 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {displayCategories.map((c: any, index: number) => (
                <TouchableOpacity
                  key={c.id || index}
                  style={styles.categoryItem}
                  onPress={() => {
                    if (!c.isSpecial) {
                      setSelectedCategory(c.name);
                      navigation.navigate('FoodList', { category: c.name });
                    }
                  }}
                >
                  {c.isSpecial ? (
                      <TouchableOpacity onPress={() => navigation.navigate('MealsUnderScreen')}>
                    <View style={styles.specialCategory}>
                      <Image
                        source={{ uri: c.image?.url }}
                        style={styles.specialCategoryImg}
                      />
                      <View style={styles.specialCategoryOverlay}>
                        <Text style={styles.specialCategoryText}>MEALS UNDER</Text>
                        <Text style={styles.specialCategoryPrice}>₹250</Text>
                      </View>
                    </View>
                    </TouchableOpacity>
                  ) : (
                    <>
                      <Image
                        source={{ uri: c.image?.url }}
                        style={styles.categoryImg}
                      />
                      <Text
                        style={[
                          styles.categoryText,
                          selectedCategory === c.name &&
                          styles.categoryTextSelected,
                        ]}
                      >
                        {c.name.charAt(0).toUpperCase() + c.name.slice(1)}
                      </Text>
                      {selectedCategory === c.name && (
                        <View style={styles.categoryUnderline} />
                      )}
                    </>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
        </View>
      </Animated.View>


      {/* Floating Cart */}
      <View style={styles.viewCartContainer}>
        <TouchableOpacity
          style={styles.cartLeft}
          onPress={handleMenuPress}
          activeOpacity={0.7}
        >
          <Image source={{ uri: restaurant.logo }} style={styles.cartImg} />
          <View>
            <Text style={styles.cartTitle}>{restaurant.name}</Text>
            <Text style={styles.cartSubtitle}>View Menu ➝</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.viewCartBtn}
          onPress={() => navigation.navigate('CheckoutScreen')}
        >
          <Text style={styles.viewCartText}>View Cart</Text>
          <Text style={styles.itemCount}>{cartCount} item</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>

        {/* Delivery */}
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons
            name="moped"
            size={26}
            color={COLORS.primary}
          />
          <Text style={styles.navTextActive}>Delivery</Text>
        </TouchableOpacity>

        {/* Floating Lottie Button (Replaces Video) */}
        <TouchableOpacity
          onPress={() => navigation.navigate('DiningScreen')}
          style={{
            position: "absolute",
            top: -20,
            left: "50%",
            transform: [{ translateX: -35 }],
            zIndex: 99,
            alignItems: 'center'
          }}
        >
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 70,
              overflow: "hidden",
              backgroundColor: "#fff",
              elevation: 8,
              shadowColor: "#000",
              shadowOpacity: 0.25,
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 2 },
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LottieView
              source={require('../assets/PaymentFailed.json')}
              style={{ width: 60, height: 60 }}
              autoPlay
              loop
            />
          </View>
          <Text style={styles.navTextActive}>Under 50%</Text>
        </TouchableOpacity>

        {/* Money */}
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons
            name="wallet-membership"
            size={26}
            color={COLORS.primary}
          />
          <Text style={styles.navText}>Money</Text>
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
};

// Restaurant Card Component
const RestaurantCard = ({ data }: { data: any }) => (
  <View style={styles.recommendedCard}>
    <Image source={{ uri: data.img }} style={styles.recommendedImg} />
    <View
      style={[
        styles.discountBadge,
        data.isYellow && styles.discountBadgeYellow,
      ]}
    >
      <Text
        style={[
          styles.discountText,
          data.isYellow && styles.discountTextDark,
        ]}
      >
        {data.discount}
      </Text>
    </View>
    <View style={styles.cardContent}>
      <View style={styles.nameRow}>
        <Text style={styles.recommendedName} numberOfLines={1}>
          {data.name}
        </Text>
        <View style={styles.ratingBadgeSmall}>
          <Text style={styles.ratingTextSmall}>{data.rating}★</Text>
        </View>
      </View>
      <Text style={styles.recommendedTime}>{data.time}</Text>
    </View>
  </View>
);

// --- styles ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  heroContainer: {
    height: HERO_HEIGHT,
    position: 'relative',
    overflow: 'visible',
  },

  // Header
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 8,
    backgroundColor: 'transparent',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'flex-start', flex: 1 },
  locationContainer: { marginLeft: 8, flex: 1 },
  locationRow: { flexDirection: 'row', alignItems: 'center' },
  locationTitle: { fontSize: 16, fontWeight: '900', color: '#1C1C1C' },
  locationSub: { fontSize: 12, color: COLORS.textSecondary, marginTop: 1, width: '90%', fontWeight: 800 },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  goldBadge: {
    backgroundColor: '#2D2D2D',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 10,
  },
  goldText: { fontSize: 10, fontWeight: '900', color: '#D4AF37' },
  iconBtn: { marginRight: 12 },
  profileBtn: {
    width: 32,
    height: 32,
    borderRadius: 60,
    backgroundColor: '#E0F2F1',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  profileText: { fontSize: 16, fontWeight: 'bold', color: '#00695C' },

  // Search Bar Overlay
  searchWrapper: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 30, // Increased to appear above others if needed
    backgroundColor: 'transparent',
    paddingBottom: 10,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  // --- UPDATED SEARCH BAR CSS ---
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12, // More rounded
    paddingHorizontal: 15,
    height: 48, // Taller for better touch target
    borderWidth: 0.5,
    borderColor: COLORS.SOFT_BLUE,
    marginRight: 10,
    // Enhanced Shadow
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 15, color: '#000' },
  verticalLine: { width: 1, height: 20, backgroundColor: '#ddd' },

  // --- VEG MODE CSS ---
  vegModeContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
  },
  vegTextColumn: {
    alignItems: 'center',
    marginTop: -2,
  },
  vegModeLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: 0.5,
    lineHeight: 12,
  },
  vegModeSubLabel: {
    fontSize: 8,
    color: COLORS.primary,
    fontWeight: '900',
    letterSpacing: 0.5,
    lineHeight: 10,
  },
  vegSwitch: {
    transform: [{ scale: 0.7 }],
    marginBottom: 0,
  },

  // Banner
  bannerOuterContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    backgroundColor: '#f2f2f2',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: 'hidden',
  },
  bannerMovingTrack: {
    width: width * 3,
    height: HERO_HEIGHT,
    flexDirection: 'row',
  },
  bannerSlide: {
    width,
    height: HERO_HEIGHT,
    overflow: 'hidden',
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },

  // Categories
  categoriesContainer: { paddingLeft: 12, marginBottom: 16, paddingTop: 16 },
  categoryItem: { alignItems: 'center', marginRight: 16 },
  specialCategory: {
    width: 70,
    height: 80,
    borderRadius: 12,
    overflow: 'hidden',
  },
  specialCategoryImg: { width: '95%', height: '80%' },
  specialCategoryOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
    padding: 6,
  },
  specialCategoryText: { fontSize: 8, color: '#fff', fontWeight: '800', marginLeft: 10 },
  specialCategoryPrice: { fontSize: 16, color: COLORS.white, fontWeight: '900', marginLeft: 5 },
  exploreSmallBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
    alignSelf: 'flex-start',
    marginLeft: 3,
  },
  exploreSmallText: { fontSize: 8, fontWeight: 'bold', color: '#fff' },
  categoryImg: {
    width: 65,
    height: 60,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
  },
  categoryText: {
    fontSize: 11,
    color: '#444',
    marginTop: 6,
    fontWeight: '900',
  },
  categoryTextSelected: { color: COLORS.primary, fontWeight: '900', },
  categoryUnderline: {
    width: 50,
    height: 3,
    backgroundColor: COLORS.primary,
    borderRadius: 2,
    marginTop: 4,
  },

  // Filters
  filtersContainer: { paddingLeft: 10, marginBottom: 16 },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: '#fff',
    elevation: 1,
  },
  filterBtnSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.accent,
  },
  filterText: { fontSize: 10, color: '#333', fontWeight: '900' },
  filterTextSelected: { color: COLORS.primary },

  // Recommended
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.muted,
    marginLeft: 12,
    marginBottom: 12,
    letterSpacing: 1,
  },
  recommendedContainer: { paddingLeft: 12, marginBottom: 10, },
  recommendedRow: { flexDirection: 'row', marginBottom: 12 },
  recommendedCard: {
    width: 120,
    height: 130,
    marginRight: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  recommendedImg: {
    width: '100%',
    height: 80,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    left: -4,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginLeft: 4,
  },
  discountBadgeYellow: { backgroundColor: '#FFC107' },
  discountText: { fontSize: 8, color: '#fff', fontWeight: 'bold' },
  discountTextDark: { color: '#000' },
  cardContent: { padding: 10 },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recommendedName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1C1C1C',
    flex: 1,
  },
  ratingBadgeSmall: {
    backgroundColor: COLORS.highlight,
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginLeft: 4,
  },
  ratingTextSmall: { color: '#fff', fontSize: 9, fontWeight: 'bold' },
  recommendedTime: { fontSize: 11, color: '#888', marginTop: 0 },

  // Floating Cart
  viewCartContainer: {
    position: 'absolute',
    bottom: 60,
    // CHANGED: Removed left/right, added width and alignSelf
    width: '85%', 
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  cartLeft: { flexDirection: 'row', alignItems: 'center' },
  cartImg: { width: 40, height: 40, borderRadius: 8, marginRight: 10 },
  cartTitle: { fontSize: 14, fontWeight: 'bold', color: '#000' },
  cartSubtitle: { fontSize: 12, color: '#666' },
  viewCartBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewCartText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  itemCount: { color: '#fff', fontSize: 12 },

  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    elevation: 20,
    height: 70,
    position: "relative",
  },

  navItem: { alignItems: 'center', },
  navText: { fontSize: 10, color: COLORS.primary, marginTop: 4, fontWeight: '600' },
  navTextActive: {
    fontSize: 10,
    color: COLORS.primary,
    marginTop: 0,
    fontWeight: '800',
  },
});

export default HomeScreen;