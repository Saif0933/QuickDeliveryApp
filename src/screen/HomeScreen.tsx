

// import { useFocusEffect, useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import LottieView from 'lottie-react-native';
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

// // --- CUSTOM IMPORTS ---
// import { useGetAllCategory } from '../api/hooks/getAllCategory';
// import { useGetAllVendors } from '../api/hooks/useVender';
// import FoodList from '../components/FoodCard';
// import FloatingCart from '../components/cart/FloatingCart';
// import { COLORS } from '../theme/color';

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
//   AllRestaurantCart: undefined;
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
//   { id: '1', img: require('../assets/restro.jpeg') },
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
//           source={typeof item.img === 'string' ? { uri: item.img } : item.img}
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
//                   onPressIn={() => navigation.navigate('SearchScreen')}
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

//         {/* Filters Section */}
//         <View style={styles.filtersContainer}>
//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={styles.filtersScrollContent}
//           >
//             {[
//               { id: 'filter', name: 'Filter', icon: 'chevron-down' },
//               { id: 'near_fast', name: 'Near & Fast' },
//               { id: 'new_to_you', name: 'New to You' },
//               { id: 'great_offers', name: 'Great Offers' },
//               { id: 'under_200', name: 'Under 200' },
//               { id: 'rating_4', name: 'Rating 4.0+', icon: 'star' },
//               { id: 'prev_ordered', name: 'Previously Ordered' },
//               { id: 'pure_veg', name: 'Pure Veg', icon: 'leaf' },
//             ].map((f) => (
//               <TouchableOpacity key={f.id} style={styles.filterChip}>
//                 {f.icon === 'star' && (
//                   <Ionicons name="star" size={12} color="#FFB300" style={{ marginRight: 4 }} />
//                 )}
//                 <Text style={[styles.filterText, f.id === 'near_fast' && { color: COLORS.primary }]}>
//                   {f.name}
//                 </Text>
//                 {f.icon === 'leaf' && (
//                   <MaterialCommunityIcons name="leaf" size={14} color="#007E33" style={{ marginLeft: 4 }} />
//                 )}
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
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
//                         navigation.navigate('ProductScreen', { 
//                           vendorId: vendor.id.toString(),
//                           vendorName: uiData.name,
//                           vendorImage: uiData.img
//                         })
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
//                         navigation.navigate('ProductScreen', { 
//                           vendorId: vendor.id.toString(),
//                           vendorName: uiData.name,
//                           vendorImage: uiData.img
//                         })
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

//       {/* --- STICKY CATEGORIES BAR --- */}
//       <Animated.View
//         style={{
//             position: 'absolute',
//             top: 68,
//             left: 0,
//             right: 0,
//             zIndex: 99,
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

//       {/* --- FLOATING CART (Self-contained component with dynamic data) --- */}
//       <FloatingCart />

//       {/* Bottom Navigation */}
//       <View style={styles.bottomNav}>
//         <TouchableOpacity style={styles.navItem}>
//           <MaterialCommunityIcons name="moped" size={26} color={COLORS.primary} />
//           <Text style={styles.navTextActive}>Delivery</Text>
//         </TouchableOpacity>

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
//           <View style={styles.lottieBtn}>
//             <LottieView
//               source={require('../assets/PaymentFailed.json')}
//               style={{ width: 60, height: 60 }}
//               autoPlay
//               loop
//             />
//           </View>
//           <Text style={styles.navTextActive}>Under 50%</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.navItem}>
//           <MaterialCommunityIcons name="wallet-membership" size={26} color={COLORS.primary} />
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
//     <View style={[styles.discountBadge, data.isYellow && styles.discountBadgeYellow]}>
//       <Text style={[styles.discountText, data.isYellow && styles.discountTextDark]}>
//         {data.discount}
//       </Text>
//     </View>
//     <View style={styles.cardContent}>
//       <View style={styles.nameRow}>
//         <Text style={styles.recommendedName} numberOfLines={1}>{data.name}</Text>
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
//   header: {
//     position: 'absolute',
//     top: 0, left: 0, right: 0,
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
//     width: 32, height: 32,
//     borderRadius: 60,
//     backgroundColor: '#E0F2F1',
//     justifyContent: 'center', alignItems: 'center',
//     borderWidth: 1, borderColor: '#000',
//   },
//   profileText: { fontSize: 16, fontWeight: 'bold', color: '#00695C' },

//   searchWrapper: {
//     position: 'absolute',
//     top: HEADER_HEIGHT,
//     left: 0, right: 0,
//     zIndex: 30,
//     backgroundColor: 'transparent',
//     paddingBottom: 10,
//   },
//   searchRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12 },
//   searchBar: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     paddingHorizontal: 15,
//     height: 48,
//     borderWidth: 0.5,
//     borderColor: COLORS.SOFT_BLUE,
//     marginRight: 10,
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   searchInput: { flex: 1, marginLeft: 8, fontSize: 15, color: '#000' },
//   verticalLine: { width: 1, height: 20, backgroundColor: '#ddd' },
//   vegModeContainer: { flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 50 },
//   vegTextColumn: { alignItems: 'center', marginTop: -2 },
//   vegModeLabel: { fontSize: 10, fontWeight: '900', color: COLORS.primary, letterSpacing: 0.5, lineHeight: 12 },
//   vegModeSubLabel: { fontSize: 8, color: COLORS.primary, fontWeight: '900', letterSpacing: 0.5, lineHeight: 10 },
//   vegSwitch: { transform: [{ scale: 0.7 }], marginBottom: 0 },

//   bannerOuterContainer: {
//     position: 'absolute',
//     top: 0, left: 0, right: 0, bottom: 0,
//     zIndex: 1,
//     backgroundColor: '#f2f2f2',
//     borderBottomLeftRadius: 24,
//     borderBottomRightRadius: 24,
//     overflow: 'hidden',
//   },
//   bannerMovingTrack: { width: width * 3, height: HERO_HEIGHT, flexDirection: 'row' },
//   bannerSlide: { width, height: HERO_HEIGHT, overflow: 'hidden', position: 'relative' },
//   bannerImage: { width: '100%', height: '100%' },

//   categoriesContainer: { paddingLeft: 12, marginBottom: 16, paddingTop: 16 },
//   categoryItem: { alignItems: 'center', marginRight: 16 },
//   specialCategory: { width: 70, height: 80, borderRadius: 12, overflow: 'hidden' },
//   specialCategoryImg: { width: '95%', height: '80%' },
//   specialCategoryOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end', padding: 6 },
//   specialCategoryText: { fontSize: 8, color: '#fff', fontWeight: '800', marginLeft: 10 },
//   specialCategoryPrice: { fontSize: 16, color: COLORS.white, fontWeight: '900', marginLeft: 5 },
//   exploreSmallBtn: { backgroundColor: COLORS.primary, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginTop: 4, alignSelf: 'flex-start', marginLeft: 3 },
//   exploreSmallText: { fontSize: 8, fontWeight: 'bold', color: '#fff' },
//   categoryImg: { width: 65, height: 60, borderRadius: 50, backgroundColor: '#f0f0f0' },
//   categoryText: { fontSize: 11, color: '#444', marginTop: 6, fontWeight: '900' },
//   categoryTextSelected: { color: COLORS.primary, fontWeight: '900', },
//   categoryUnderline: { width: 50, height: 3, backgroundColor: COLORS.primary, borderRadius: 2, marginTop: 4 },

//   filtersContainer: { paddingLeft: 12, marginBottom: 10, marginTop: 5 },
//   filtersScrollContent: { paddingRight: 12, paddingVertical: 5 },
//   filterChip: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: '#EAEAEA',
//     marginRight: 10,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//   },
//   filterText: { fontSize: 13, color: '#1C1C1C', fontWeight: '700' },

//   sectionTitle: { fontSize: 13, fontWeight: '800', color: COLORS.muted, marginLeft: 12, marginBottom: 12, letterSpacing: 1 },
//   recommendedContainer: { paddingLeft: 12, marginBottom: 10, },
//   recommendedRow: { flexDirection: 'row', marginBottom: 12 },
//   recommendedCard: { width: 120, height: 130, marginRight: 12, borderRadius: 12, backgroundColor: '#fff', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
//   recommendedImg: { width: '100%', height: 80, borderTopLeftRadius: 12, borderTopRightRadius: 12 },
//   discountBadge: { position: 'absolute', top: 10, left: -4, backgroundColor: COLORS.primary, paddingHorizontal: 8, paddingVertical: 4, borderTopRightRadius: 4, borderBottomRightRadius: 4, shadowColor: '#000', shadowOffset: { width: 1, height: 1 }, shadowOpacity: 0.2, shadowRadius: 4, marginLeft: 4 },
//   discountBadgeYellow: { backgroundColor: '#FFC107' },
//   discountText: { fontSize: 8, color: '#fff', fontWeight: 'bold' },
//   discountTextDark: { color: '#000' },
//   cardContent: { padding: 10 },
//   nameRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
//   recommendedName: { fontSize: 13, fontWeight: '800', color: '#1C1C1C', flex: 1 },
//   ratingBadgeSmall: { backgroundColor: COLORS.highlight, borderRadius: 4, paddingHorizontal: 4, paddingVertical: 2, marginLeft: 4 },
//   ratingTextSmall: { color: '#fff', fontSize: 9, fontWeight: 'bold' },
//   recommendedTime: { fontSize: 11, color: '#888', marginTop: 0 },

//   // --- FLOATING CART STYLES ---
//   viewCartContainer: {
//     position: 'absolute',
//     bottom: 95,
//     width: '85%', 
//     alignSelf: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 16,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 6,
//     elevation: 10,
//     zIndex: 50,
//   },
  
//   // UPDATED: All Carts Button Wrapper and Style
//   allCartsBadgeWrapper: {
//     position: 'absolute',
//     top: -12,
//     left: 0,
//     right: 0,
//     alignItems: 'center', // This perfectly centers the child horizontally
//     zIndex: 60,
//   },
//   allCartsBadge: {
//     backgroundColor: '#fff',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 12,
//     paddingVertical: 4,
//     borderRadius: 18, // Pill shape
//     // Shadow
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//     elevation: 10,
//     borderWidth: 0.5,
//     borderColor: '#e0e0e0'
//   },
//   allCartsText: { fontSize: 10, fontWeight: '800', color: COLORS.primary, marginRight: 0 },

//   cartLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
//   cartImg: { width: 44, height: 44, borderRadius: 10, marginRight: 12 },
//   cartTitle: { fontSize: 15, fontWeight: 'bold', color: '#000' },
//   cartSubtitle: { fontSize: 12, color: '#666', marginTop: 2 },
  
//   cartRightSide: { flexDirection: 'row', alignItems: 'center' },
  
//   // --- UPDATED VIEW CART BUTTON STYLES ---
//   viewCartBtn: {
//     backgroundColor: COLORS.primary,
//     paddingHorizontal: 12,  // Reduced width by reducing padding
//     paddingVertical: 6,     // Adjusted height
//     borderRadius: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'column', // Text and item count are now vertical
//   },
//   viewCartText: { 
//     color: '#fff', 
//     fontSize: 12, 
//     fontWeight: 'bold', 
//     marginBottom: 2, 
//     marginRight: 0 
//   },
//   itemCount: { 
//     color: '#fff', 
//     fontSize: 10,
//     fontWeight: '600'
//   },
  
//   mainCartCloseBtn: {
//     marginLeft: 10,
//     padding: 4,
//     borderRadius: 50,
//     backgroundColor: '#f2f2f2',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   // --- MODAL STYLES ---
//   allCartsModalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.7)' },
//   modalCloseContainer: { alignItems: 'center', marginBottom: 15 },
//   modalCloseBtn: {
//     backgroundColor: '#333',
//     width: 40, height: 40,
//     borderRadius: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 1, borderColor: '#555'
//   },
//   allCartsModalContent: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, paddingBottom: 30, maxHeight: '60%' },
//   modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
//   modalTitle: { fontSize: 18, fontWeight: '800', color: '#000' },
//   checkoutAllBtn: { flexDirection: 'row', alignItems: 'center' },
//   checkoutAllText: { fontSize: 14, fontWeight: 'bold', color: COLORS.primary, marginRight: 4 },
//   cartList: {},
//   cartItemCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 4, borderWidth: 0.5, borderColor: '#f0f0f0' },
//   cartItemRight: { flexDirection: 'row', alignItems: 'center' },
//   viewCartBtnSmall: { backgroundColor: COLORS.primary, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8, alignItems: 'center' },
//   viewCartTextSmall: { color: '#fff', fontSize: 13, fontWeight: 'bold' },
//   itemCountSmall: { color: '#fff', fontSize: 11 },
//   closeCartBtn: { marginLeft: 12, padding: 6, borderRadius: 50, backgroundColor: '#f8f8f8', alignItems: 'center', justifyContent: 'center' },

//   bottomNav: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#fff', paddingVertical: 10, borderTopWidth: 1, borderTopColor: '#eee', elevation: 20, height: 85, position: "relative", zIndex: 40 },
//   navItem: { alignItems: 'center', },
//   navText: { fontSize: 10, color: COLORS.primary, marginTop: 4, fontWeight: '600' },
//   navTextActive: { fontSize: 10, color: COLORS.primary, marginTop: 0, fontWeight: '800' },
//   lottieBtn: { width: 60, height: 60, borderRadius: 70, overflow: "hidden", backgroundColor: "#fff", elevation: 8, shadowColor: "#000", shadowOpacity: 0.25, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, justifyContent: "center", alignItems: "center" },
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
  Modal,
  Pressable,
  RefreshControl,
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

// --- CUSTOM IMPORTS ---
import { useGetAllCategory } from '../api/hooks/getAllCategory';
import { useGetAllVendors } from '../api/hooks/useVender';
import FoodList from '../components/FoodCard';
import FloatingCart from '../components/cart/FloatingCart';
import BottomNavBar from '../navigation/BottomNavBar';
import { COLORS } from '../theme/color';
import { useLocationStore } from '../store/locationStore';


const { width, height } = Dimensions.get('window');

// --- TYPES ---
type RootStackParamList = {
  HomeScreen: undefined;
  LocationScreen: undefined;
  GoldScreen: undefined;
  ZomatoMoneyPage: undefined;
  ProfileScreen: undefined;
  FoodList: { categoryId?: string; category?: string };
  ProductScreen: { category: string; vendorId: string; vendorName: string; vendorImage: string };
  CheckoutScreen: undefined;
  DiningScreen: undefined;
  VegMode: undefined;
  SearchScreen: undefined;
  MealsUnderScreen: undefined;
  AllRestaurantCart: undefined;
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

const HEADER_HEIGHT = 60;
const SEARCH_HEIGHT = 70;
const BANNER_HEIGHT = 220;
const HERO_HEIGHT = HEADER_HEIGHT + SEARCH_HEIGHT + BANNER_HEIGHT;

const banners = [
  { id: '1', img: require('../assets/logo.jpeg') },
  { id: '2', img: 'https://media.edinburgh.org/wp-content/uploads/2023/04/26161552/thumb_40653_point_of_interest_bigger.jpeg' },
];

const HomeScreen: React.FC = () => {
  const [vegMode, setVegMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const { primaryLocation, secondaryLocation, initializeLocation } = useLocationStore();

  useEffect(() => {
    initializeLocation();
  }, [initializeLocation]);
  // --- FILTER MODAL STATES ---
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [activeFilterTab, setActiveFilterTab] = useState('Sort by');
  const [selectedSort, setSelectedSort] = useState('Popularity');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate a network request
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const scrollY = useRef(new Animated.Value(0)).current;
  const lastOffsetY = useRef(0);
  const scrollDirection = useRef('');
  const navBarTranslateY = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    useCallback(() => {
      setSelectedCategory('All');
    }, [])
  );

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
          source={typeof item.img === 'string' ? { uri: item.img } : item.img}
          style={styles.bannerImage}
          resizeMode="cover"
        />
        <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.1)' }} />
      </View>
    );
  };

  const { data: restaurantData, isLoading } = useGetAllVendors({ limit: 20 });
  const { data: categoryData, isLoading: categoryLoading } = useGetAllCategory({});

  const displayCategories = [...staticCategories, ...(categoryData || [])];
  const allVendors = restaurantData?.pages.flatMap(page => page.vendors).slice(0, 20) || [];
  const midPoint = Math.ceil(allVendors.length / 2);
  const firstRowVendors = allVendors.slice(0, midPoint);
  const secondRowVendors = allVendors.slice(midPoint);

  // Animations
  const stickyHeaderOpacity = scrollY.interpolate({
    inputRange: [HEADER_HEIGHT, HEADER_HEIGHT + 20],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const stickyHeaderTranslateY = scrollY.interpolate({
    inputRange: [HEADER_HEIGHT, HEADER_HEIGHT + 20],
    outputRange: [-150, 0], 
    extrapolate: 'clamp',
  });

  const CATEGORY_TRIGGER = HERO_HEIGHT - 70;
  const stickyCategoryOpacity = scrollY.interpolate({
    inputRange: [CATEGORY_TRIGGER, CATEGORY_TRIGGER + 20],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const stickyCategoryTranslateY = scrollY.interpolate({
    inputRange: [CATEGORY_TRIGGER, CATEGORY_TRIGGER + 20],
    outputRange: [-200, 0], 
    extrapolate: 'clamp',
  });

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { 
      useNativeDriver: false,
      listener: (event: any) => {
        const currentOffsetY = event.nativeEvent.contentOffset.y;
        const diff = currentOffsetY - lastOffsetY.current;

        if (currentOffsetY < 0) return; // Ignore bounce at top
        
        if (diff > 5 && scrollDirection.current !== 'down') {
          scrollDirection.current = 'down';
          Animated.timing(navBarTranslateY, {
            toValue: 200, // Move nav bar down (hide)
            duration: 300,
            useNativeDriver: true,
          }).start();
        } else if (diff < -5 && scrollDirection.current !== 'up') {
          scrollDirection.current = 'up';
          Animated.timing(navBarTranslateY, {
            toValue: 0, // Move nav bar up (show)
            duration: 300,
            useNativeDriver: true,
          }).start();
        }

        lastOffsetY.current = currentOffsetY;
      }
    }
  );

  return (
    <SafeAreaView style={styles.container}>
      <FoodList 
        onScroll={handleScroll}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
        ListHeaderComponent={
          <>
            {/* Hero Section */}
            <View style={styles.heroContainer}>
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

              <View style={styles.header}>
                <View style={styles.headerLeft}>
                  <Ionicons name="location-sharp" size={26} color={COLORS.primary} />
                  <View style={styles.locationContainer}>
                    <TouchableOpacity
                      style={styles.locationRow}
                      onPress={() => navigation.navigate('LocationScreen')}
                    >
                      <Text style={styles.locationTitle}>{primaryLocation || "Locating..."}</Text>
                      <Ionicons name="chevron-down" size={16} color="#333" style={{ marginLeft: 4 }} />
                    </TouchableOpacity>
                    <Text style={styles.locationSub} numberOfLines={1}>{secondaryLocation || "Fetching address..."}</Text>
                  </View>
                </View>

                <View style={styles.headerRight}>
                  {/* <TouchableOpacity style={styles.goldBadge} onPress={() => navigation.navigate('GoldScreen')}>
                    <Text style={styles.goldText}>Elite</Text>
                  </TouchableOpacity> */}
                  <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('ZomatoMoneyPage')}>
                    <MaterialCommunityIcons name="wallet-outline" size={24} color="#333" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.profileBtn} onPress={() => navigation.navigate('ProfileScreen')}>
                    <Text style={styles.profileText}>S</Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={styles.searchWrapper}>
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
                    <Ionicons name="mic-outline" size={22} color={COLORS.primary} style={{ marginLeft: 8 }} />
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

            {/* Categories Section */}
            <View style={styles.categoriesContainer}>
              {categoryLoading ? (
                <ActivityIndicator size="small" color={COLORS.primary} style={{ marginLeft: 20 }} />
              ) : (
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {displayCategories.map((c: any, index: number) => (
                    <TouchableOpacity
                      key={c.id || index}
                      style={styles.categoryItem}
                      onPress={() => {
                        if (!c.isSpecial) {
                          setSelectedCategory(c.name);
                          if (c.id !== 'static_all') {
                            navigation.navigate('FoodList', { categoryId: c.id, category: c.name });
                          }
                        }
                      }}
                    >
                      {c.isSpecial ? (
                        <TouchableOpacity onPress={() => navigation.navigate('MealsUnderScreen')}>
                          <View style={styles.specialCategory}>
                            <Image source={{ uri: c.image?.url }} style={styles.specialCategoryImg} />
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
                          <Image source={{ uri: c.image?.url }} style={styles.categoryImg} />
                          <Text style={[styles.categoryText, selectedCategory === c.name && styles.categoryTextSelected]}>
                            {c.name.charAt(0).toUpperCase() + c.name.slice(1)}
                          </Text>
                          {selectedCategory === c.name && <View style={styles.categoryUnderline} />}
                        </>
                      )}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
            </View>

            {/* Filters Section */}
            {/* <View style={styles.filtersContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersScrollContent}>
                {[
                  { id: 'filter', name: 'Filter', icon: 'chevron-down' },
                  { id: 'near_fast', name: 'Near & Fast' },
                  { id: 'new_to_you', name: 'New to You' },
                  { id: 'great_offers', name: 'Great Offers' },
                  { id: 'under_200', name: 'Under 200' },
                  { id: 'rating_4', name: 'Rating 4.0+', icon: 'star' },
                  { id: 'pure_veg', name: 'Pure Veg', icon: 'leaf' },
                ].map((f) => (
                  <TouchableOpacity 
                    key={f.id} 
                    style={styles.filterChip}
                    onPress={() => f.id === 'filter' && setFilterModalVisible(true)}
                  >
                    {f.icon === 'star' && <Ionicons name="star" size={12} color="#FFB300" style={{ marginRight: 4 }} />}
                    {f.id === 'filter' && <Ionicons name="options-outline" size={14} color="#333" style={{ marginRight: 4 }} />}
                    {f.id === 'near_fast' && <Ionicons name="timer-outline" size={14} color={COLORS.primary} style={{ marginRight: 4 }} />}
                    {f.id === 'new_to_you' && <Ionicons name="sparkles-outline" size={14} color="#333" style={{ marginRight: 4 }} />}
                    {f.id === 'great_offers' && <Ionicons name="pricetag-outline" size={14} color="#333" style={{ marginRight: 4 }} />}
                    {f.id === 'under_200' && <Ionicons name="cash-outline" size={14} color="#333" style={{ marginRight: 4 }} />}
                    <Text style={[styles.filterText, f.id === 'near_fast' && { color: COLORS.primary }]}>{f.name}</Text>
                    {f.id === 'filter' && <Ionicons name="chevron-down" size={14} color="#333" style={{ marginLeft: 4 }} />}
                    {f.icon === 'leaf' && <MaterialCommunityIcons name="leaf" size={14} color="#007E33" style={{ marginLeft: 4 }} />}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View> */}

            {/* Dynamic Recommended */}
            <Text style={styles.sectionTitle}>RECOMMENDED FOR YOU</Text>
            {isLoading ? (
              <View style={{ height: 200, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={COLORS.primary} />
              </View>
            ) : (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recommendedContainer}>
                <View style={{ flexDirection: 'column' }}>
                  <View style={styles.recommendedRow}>
                    {firstRowVendors.map((vendor) => (
                      <TouchableOpacity
                        key={vendor.id.toString()}
                        onPress={() => navigation.navigate('ProductScreen', { 
                          category: selectedCategory,
                          vendorId: vendor.id.toString(),
                          vendorName: vendor.shopName || 'Store',
                          vendorImage: (vendor.images?.url || '') as string
                        })}
                      >
                        <RestaurantCard data={{
                          name: vendor.shopName || vendor.companyName || 'Unknown Store',
                          img: vendor.images?.url || 'https://via.placeholder.com/150',
                          discount: 'FLAT 20% OFF',
                          rating: '4.2',
                          time: '30-40 mins',
                          isYellow: false
                        }} />
                      </TouchableOpacity>
                    ))}
                  </View>
                  <View style={styles.recommendedRow}>
                    {secondRowVendors.map((vendor) => (
                      <TouchableOpacity
                        key={vendor.id.toString()}
                        onPress={() => navigation.navigate('ProductScreen', { 
                          category: selectedCategory,
                          vendorId: vendor.id.toString(),
                          vendorName: vendor.shopName || 'Store',
                          vendorImage: (vendor.images?.url || '') as string
                        })}
                      >
                        <RestaurantCard data={{
                          name: vendor.shopName || vendor.companyName || 'Unknown Store',
                          img: vendor.images?.url || 'https://via.placeholder.com/150',
                          discount: 'FLAT 15% OFF',
                          rating: '4.0',
                          time: '25-30 mins',
                          isYellow: true
                        }} />
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </ScrollView>
            )}
          </>
        }
      />

      {/* Sticky Search Bar Overlay */}
      <Animated.View 
        style={[
          styles.searchWrapper, 
          { 
            position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100, 
            backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f0f0f0',
            paddingTop: 10, opacity: stickyHeaderOpacity,
            transform: [{ translateY: stickyHeaderTranslateY }], elevation: 5
          }
        ]}
      >
        <View style={styles.searchRow}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color={COLORS.primary} />
            <TextInput placeholder='Search "momos"' style={styles.searchInput} placeholderTextColor="#888" onPressIn={() => navigation.navigate('SearchScreen')} />
            <View style={styles.verticalLine} />
            <Ionicons name="mic-outline" size={22} color={COLORS.primary} style={{ marginLeft: 8 }} />
          </View>
          <View style={styles.vegModeContainer}>
            <Switch value={vegMode} onValueChange={handleVegToggle} trackColor={{ false: '#E0E0E0', true: '#007E33' }} thumbColor="#fff" style={styles.vegSwitch} />
            <View style={styles.vegTextColumn}>
              <Text style={[styles.vegModeLabel, vegMode && { color: '#007E33' }]}>VEG</Text>
              <Text style={[styles.vegModeSubLabel, vegMode && { color: '#007E33' }]}>MODE</Text>
            </View>
          </View>
        </View>
      </Animated.View>

      {/* Sticky Category Bar Overlay */}
      <Animated.View
        style={{
            position: 'absolute', top: 68, left: 0, right: 0, zIndex: 99, 
            backgroundColor: '#fff', opacity: stickyCategoryOpacity,
            transform: [{ translateY: stickyCategoryTranslateY }],
            elevation: 4, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#f0f0f0'
        }}
      >
        <View style={{ paddingLeft: 12, paddingTop: 10 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {displayCategories.map((c: any, index: number) => (
                <TouchableOpacity key={c.id || index} style={styles.categoryItem}>
                  {c.isSpecial ? (
                    <View style={styles.specialCategory}>
                      <Image source={{ uri: c.image?.url }} style={styles.specialCategoryImg} />
                      <View style={styles.specialCategoryOverlay}>
                        <Text style={styles.specialCategoryText}>MEALS UNDER</Text>
                        <Text style={styles.specialCategoryPrice}>₹250</Text>
                      </View>
                    </View>
                  ) : (
                    <>
                      <Image source={{ uri: c.image?.url }} style={styles.categoryImg} />
                      <Text style={[styles.categoryText, selectedCategory === c.name && styles.categoryTextSelected]}>
                        {c.name}
                      </Text>
                    </>
                  )}
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
      </Animated.View>

      {/* --- FILTER MODAL POPUP --- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={filterModalVisible}
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setFilterModalVisible(false)} />
        <View style={styles.filterModalContainer}>
          <View style={styles.filterModalHeader}>
            <Text style={styles.filterModalTitle}>Filters</Text>
            <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <View style={styles.filterMainBody}>
            {/* Left Sidebar */}
            <View style={styles.filterSidebar}>
              {[
                { name: 'Sort by', icon: 'swap-vertical-outline' },
                { name: 'Rating', icon: 'star-outline' },
                { name: 'Offers', icon: 'pricetag-outline' },
                { name: 'Dish Price', icon: 'cash-outline' },
                { name: 'Trust Markers', icon: 'shield-checkmark-outline' },
                { name: 'Collections', icon: 'library-outline' }
              ].map((tab) => (
                <TouchableOpacity 
                  key={tab.name} 
                  style={[styles.sidebarTab, activeFilterTab === tab.name && styles.sidebarTabActive]}
                  onPress={() => setActiveFilterTab(tab.name)}
                >
                  {activeFilterTab === tab.name && <View style={styles.activeTabIndicator} />}
                  <Ionicons 
                    name={tab.icon as any} 
                    size={18} 
                    color={activeFilterTab === tab.name ? COLORS.primary : "#666"} 
                    style={{ marginRight: 10 }}
                  />
                  <Text style={[styles.sidebarTabText, activeFilterTab === tab.name && styles.sidebarTabTextActive]}>
                    {tab.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Right Content */}
            <ScrollView style={styles.filterContent}>
              <Text style={styles.contentHeading}>{activeFilterTab}</Text>
              {activeFilterTab === 'Sort by' && (
                <View>
                  {['Popularity', 'Rating: High to Low', 'Delivery Time: Low to High', 'Cost: Low to High'].map((item, idx) => (
                    <TouchableOpacity 
                      key={idx} 
                      style={styles.radioOption}
                      onPress={() => setSelectedSort(item)}
                    >
                      <Ionicons 
                        name={selectedSort === item ? "radio-button-on" : "radio-button-off"} 
                        size={20} 
                        color={selectedSort === item ? COLORS.primary : "#ccc"} 
                      />
                      <Text style={styles.radioText}>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
              {activeFilterTab === 'Rating' && (
                <View>
                  {['rated 4.0+', 'rated 3.5+'].map((item, idx) => (
                    <TouchableOpacity 
                      key={idx} 
                      style={styles.radioOption}
                      onPress={() => toggleFilter(item)}
                    >
                      <View style={[styles.checkboxPlaceholder, selectedFilters.includes(item) && styles.checkboxActive]}>
                        {selectedFilters.includes(item) && <Ionicons name="checkmark" size={14} color="#fff" />}
                      </View>
                      <Text style={styles.radioText}>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
              {activeFilterTab === 'Offers' && (
                <View>
                  {['buy 1 get 1 and more', 'deals of the day'].map((item, idx) => (
                    <TouchableOpacity 
                      key={idx} 
                      style={styles.radioOption}
                      onPress={() => toggleFilter(item)}
                    >
                      <View style={[styles.checkboxPlaceholder, selectedFilters.includes(item) && styles.checkboxActive]}>
                        {selectedFilters.includes(item) && <Ionicons name="checkmark" size={14} color="#fff" />}
                      </View>
                      <Text style={styles.radioText}>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
              {activeFilterTab === 'Dish Price' && (
                <View>
                  {['under 200', '200-350', 'above 350'].map((item, idx) => (
                    <TouchableOpacity 
                      key={idx} 
                      style={styles.radioOption}
                      onPress={() => toggleFilter(item)}
                    >
                      <View style={[styles.checkboxPlaceholder, selectedFilters.includes(item) && styles.checkboxActive]}>
                        {selectedFilters.includes(item) && <Ionicons name="checkmark" size={14} color="#fff" />}
                      </View>
                      <Text style={styles.radioText}>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
              {activeFilterTab === 'Trust Markers' && (
                <View>
                  {['pure veg', 'no packaging charges'].map((item, idx) => (
                    <TouchableOpacity 
                      key={idx} 
                      style={styles.radioOption}
                      onPress={() => toggleFilter(item)}
                    >
                      <View style={[styles.checkboxPlaceholder, selectedFilters.includes(item) && styles.checkboxActive]}>
                        {selectedFilters.includes(item) && <Ionicons name="checkmark" size={14} color="#fff" />}
                      </View>
                      <Text style={styles.radioText}>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
              {activeFilterTab === 'Collections' && (
                <View>
                  {['previously ordered', 'new to you'].map((item, idx) => (
                    <TouchableOpacity 
                      key={idx} 
                      style={styles.radioOption}
                      onPress={() => toggleFilter(item)}
                    >
                      <View style={[styles.checkboxPlaceholder, selectedFilters.includes(item) && styles.checkboxActive]}>
                        {selectedFilters.includes(item) && <Ionicons name="checkmark" size={14} color="#fff" />}
                      </View>
                      <Text style={styles.radioText}>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </ScrollView>
          </View>

          {/* Footer */}
          <View style={styles.filterFooter}>
            <TouchableOpacity onPress={() => { setSelectedFilters([]); setSelectedSort('Popularity'); }}>
              <Text style={styles.clearAllText}>Clear All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyBtn} onPress={() => setFilterModalVisible(false)}>
              <Text style={styles.applyBtnText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <FloatingCart />

      {/* Bottom Navigation */}
      <BottomNavBar hideAnim={navBarTranslateY} />
    </SafeAreaView>
  );
};

// Restaurant Card Component
const RestaurantCard = ({ data }: { data: any }) => (
  <View style={styles.recommendedCard}>
    <Image source={{ uri: data.img }} style={styles.recommendedImg} />
    <View style={[styles.discountBadge, data.isYellow && styles.discountBadgeYellow]}>
      <Text style={[styles.discountText, data.isYellow && styles.discountTextDark]}>{data.discount}</Text>
    </View>
    <View style={styles.cardContent}>
      <View style={styles.nameRow}>
        <Text style={styles.recommendedName} numberOfLines={1}>{data.name}</Text>
        <View style={styles.ratingBadgeSmall}>
          <Text style={styles.ratingTextSmall}>{data.rating}★</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons name="time-outline" size={12} color="#52b957ff" style={{ marginRight: 4 }} />
        <Text style={styles.recommendedTime}>{data.time}</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  heroContainer: { height: HERO_HEIGHT, position: 'relative', overflow: 'visible' },
  header: { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingHorizontal: 12, paddingTop: 10, paddingBottom: 8 },
  headerLeft: { flexDirection: 'row', alignItems: 'flex-start', flex: 1 },
  locationContainer: { marginLeft: 8, flex: 1 },
  locationRow: { flexDirection: 'row', alignItems: 'center' },
  locationTitle: { fontSize: 16, fontWeight: '900', color: '#1C1C1C' },
  locationSub: { fontSize: 12, color: COLORS.textSecondary, marginTop: 1, width: '90%', fontWeight: 800 },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  goldBadge: { backgroundColor: '#2D2D2D', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginRight: 10 },
  goldText: { fontSize: 10, fontWeight: '900', color: '#D4AF37' },
  iconBtn: { marginRight: 12 },
  profileBtn: { width: 32, height: 32, borderRadius: 60, backgroundColor: '#E0F2F1', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#000' },
  profileText: { fontSize: 16, fontWeight: 'bold', color: '#00695C' },

  searchWrapper: { position: 'absolute', top: HEADER_HEIGHT, left: 0, right: 0, zIndex: 30, paddingBottom: 10 },
  searchRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12 },
  searchBar: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 15, height: 48, borderWidth: 0.5, borderColor: COLORS.SOFT_BLUE, marginRight: 10, elevation: 4 },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 15, color: '#000' },
  verticalLine: { width: 1, height: 20, backgroundColor: '#ddd' },
  vegModeContainer: { flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 50 },
  vegTextColumn: { alignItems: 'center', marginTop: -2 },
  vegModeLabel: { fontSize: 10, fontWeight: '900', color: COLORS.primary, letterSpacing: 0.5, lineHeight: 12 },
  vegModeSubLabel: { fontSize: 8, color: COLORS.primary, fontWeight: '900', letterSpacing: 0.5, lineHeight: 10 },
  vegSwitch: { transform: [{ scale: 0.7 }], marginBottom: 0 },

  bannerOuterContainer: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1, backgroundColor: '#f2f2f2', borderBottomLeftRadius: 24, borderBottomRightRadius: 24, overflow: 'hidden' },
  bannerMovingTrack: { width: width * 3, height: HERO_HEIGHT, flexDirection: 'row' },
  bannerSlide: { width, height: HERO_HEIGHT, overflow: 'hidden', position: 'relative' },
  bannerImage: { width: '100%', height: '100%' },

  categoriesContainer: { paddingLeft: 12, marginBottom: 16, paddingTop: 16 },
  categoryItem: { alignItems: 'center', marginRight: 16 },
  specialCategory: { width: 70, height: 80, borderRadius: 12, overflow: 'hidden' },
  specialCategoryImg: { width: '95%', height: '80%' },
  specialCategoryOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end', padding: 6 },
  specialCategoryText: { fontSize: 8, color: '#fff', fontWeight: '800', marginLeft: 10 },
  specialCategoryPrice: { fontSize: 16, color: COLORS.white, fontWeight: '900', marginLeft: 5 },
  exploreSmallBtn: { backgroundColor: COLORS.primary, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginTop: 4, alignSelf: 'flex-start', marginLeft: 3 },
  exploreSmallText: { fontSize: 8, fontWeight: 'bold', color: '#fff' },
  categoryImg: { width: 65, height: 60, borderRadius: 50, backgroundColor: '#f0f0f0' },
  categoryText: { fontSize: 11, color: '#444', marginTop: 6, fontWeight: '900' },
  categoryTextSelected: { color: COLORS.primary, fontWeight: '900' },
  categoryUnderline: { width: 50, height: 3, backgroundColor: COLORS.primary, borderRadius: 2, marginTop: 4 },

  filtersContainer: { paddingLeft: 12, marginBottom: 10, marginTop: 5 },
  filtersScrollContent: { paddingRight: 12, paddingVertical: 5 },
  filterChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, borderWidth: 1, borderColor: '#EAEAEA', marginRight: 10, elevation: 3 },
  filterText: { fontSize: 13, color: '#1C1C1C', fontWeight: '700' },

  sectionTitle: { fontSize: 13, fontWeight: '800', color: COLORS.muted, marginLeft: 12, marginBottom: 12, letterSpacing: 1 },
  recommendedContainer: { paddingLeft: 12, marginBottom: 10 },
  recommendedRow: { flexDirection: 'row', marginBottom: 12 },
  recommendedCard: { width: 120, height: 130, marginRight: 12, borderRadius: 12 },
  recommendedImg: { width: '100%', height: 80, borderTopLeftRadius: 12, borderTopRightRadius: 12 },
  discountBadge: { position: 'absolute', top: 10, left: -4, backgroundColor: '#000', paddingHorizontal: 4, paddingVertical: 4, borderTopRightRadius: 4, borderBottomRightRadius: 4, marginLeft: 4 },
  discountBadgeYellow: { backgroundColor: '#000' },
  discountText: { fontSize: 8, color: '#fff', fontWeight: 'bold' },
  discountTextDark: { color: '#fff' },
  cardContent: { padding: 10 },
  nameRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  recommendedName: { fontSize: 13, fontWeight: '800', color: '#1C1C1C', flex: 1 },
  ratingBadgeSmall: { backgroundColor: COLORS.highlight, borderRadius: 4, paddingHorizontal: 4, paddingVertical: 2, marginLeft: 4 },
  ratingTextSmall: { color: '#fff', fontSize: 9, fontWeight: 'bold' },
  recommendedTime: { fontSize: 11, color: '#52b957ff', marginTop: 0 },

  // --- FILTER MODAL STYLES ---
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },
  filterModalContainer: { 
    backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, 
    height: '70%', width: '100%', position: 'absolute', bottom: 0,
    shadowColor: '#000', shadowOffset: { width: 0, height: -10 }, shadowOpacity: 0.1, shadowRadius: 15, elevation: 25
  },
  filterModalHeader: { 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', 
    paddingHorizontal: 20, paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: '#f5f5f5' 
  },
  filterModalTitle: { fontSize: 20, fontWeight: '900', color: '#1c1c1c', letterSpacing: -0.5 },
  filterMainBody: { flex: 1, flexDirection: 'row' },
  filterSidebar: { width: '38%', backgroundColor: '#F9FAFB', borderRightWidth: 1, borderRightColor: '#f0f0f0' },
  sidebarTab: { paddingVertical: 20, paddingHorizontal: 16, position: 'relative', flexDirection: 'row', alignItems: 'center' },
  sidebarTabActive: { backgroundColor: '#fff' },
  activeTabIndicator: { 
    position: 'absolute', left: 0, top: 0, bottom: 0, 
    width: 4, backgroundColor: COLORS.primary, borderTopRightRadius: 4, borderBottomRightRadius: 4
  },
  sidebarTabText: { fontSize: 13, color: '#666', fontWeight: '600' },
  sidebarTabTextActive: { color: COLORS.primary, fontWeight: '800' },
  filterContent: { flex: 1, padding: 20 },
  contentHeading: { fontSize: 11, color: '#9CA3AF', fontWeight: '800', textTransform: 'uppercase', marginBottom: 20, letterSpacing: 1 },
  radioOption: { flexDirection: 'row', alignItems: 'center', marginBottom: 22, backgroundColor: '#fff' },
  radioText: { marginLeft: 12, fontSize: 15, color: '#374151', fontWeight: '600' },
  checkboxPlaceholder: { width: 24, height: 24, borderRadius: 6, borderWidth: 2, borderColor: '#D1D5DB', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  checkboxActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  filterFooter: { 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', 
    paddingHorizontal: 20, paddingVertical: 16, borderTopWidth: 1, borderTopColor: '#f0f0f0', backgroundColor: '#fff',
    paddingBottom: 30
  },
  clearAllText: { fontSize: 16, color: COLORS.primary, fontWeight: '700' },
  applyBtn: { 
    backgroundColor: COLORS.primary, paddingHorizontal: 45, paddingVertical: 14, borderRadius: 12,
    shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8
  },
  applyBtnText: { color: '#fff', fontSize: 16, fontWeight: '900' },
});

export default HomeScreen;