
// import { useNavigation } from '@react-navigation/native';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import React, { useState, useEffect, useRef } from 'react';
// import {
//   Image,
//   ScrollView,
//   StyleSheet,
//   Switch,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   Dimensions,
//   Animated,
//   Easing,
//   FlatList,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import FoodList from '../components/FoodCard';
// import { COLORS } from '../theme/color';

// const { width } = Dimensions.get('window');

// // --- TYPES ---
// type RootStackParamList = {
//   HomeScreen: undefined;
//   ZomatoMoneyPage: undefined;
//   ProfileScreen: undefined;
//   LocationScreen: undefined;
//   AddressBookScreen: undefined;
//   GoldScreen: undefined;
//   DiningScreen: undefined;
//   CheckoutScreen: undefined;
//   FoodList: { category: string };
//   ProductScreen: { category: string };
// };

// type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// // --- DATA ---
// const categories = [
//   {
//     name: 'Meals Under\n₹250',
//     img: 'https://b.zmtcdn.com/data/o2_assets/52eb9796bb9bcf0eba64c643349e97211634401116.png',
//     isSpecial: true,
//   },
//   {
//     name: 'All',
//     img: 'https://tse1.mm.bing.net/th/id/OIP.y9WHqmBEubDgxpHWqRN9sAHaEO?pid=Api&P=0&h=180',
//   },
//   {
//     name: 'Cake',
//     img: 'https://tse1.mm.bing.net/th/id/OIP.JQ6ZOYauedUoGFVWDzAecQHaEn?pid=Api&P=0&h=180',
//   },
//   {
//     name: 'Idli',
//     img: 'https://tse2.mm.bing.net/th/id/OIP.jUKtuSAXdENQkUtFfuGsBAAAAA?pid=Api&P=0&h=180',
//   },
//   {
//     name: 'Ice Cream',
//     img: 'https://tse2.mm.bing.net/th/id/OIP.HsrA5OUP2XuY8WH-xNBRtgHaGi?pid=Api&P=0&h=180',
//   },
//   {
//     name: 'Biryani',
//     img: 'https://tse2.mm.bing.net/th/id/OIP.zec59lWeYML7_-wwsSYBHAHaE8?pid=Api&P=0&h=180',
//   },
// ];

// const filters = [
//   { name: 'Filters', icon: 'options-outline', hasDropdown: true },
//   { name: 'Under 30 mins', icon: null },
//   { name: 'New to you', icon: null },
//   { name: 'Rating 4.0+', icon: null },
//   { name: 'Pure Veg', icon: null },
// ];

// const recommendedRestaurants = [
//   {
//     id: 1,
//     name: 'KFC',
//     img: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg',
//     discount: 'FLAT 50% OFF',
//     rating: '4.2',
//     time: '30-35 mins',
//   },
//   {
//     id: 2,
//     name: 'Subway',
//     img: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg',
//     discount: 'Get items @ ₹69',
//     rating: '4.1',
//     time: '30-35 mins',
//     isYellow: true,
//   },
//   {
//     id: 3,
//     name: 'FNP Cakes',
//     img: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg',
//     discount: 'FLAT ₹100 OFF',
//     rating: '4.1',
//     time: '15-20 mins',
//   },
//   {
//     id: 4,
//     name: 'Pizza Hut',
//     img: 'https://images.pexels.com/photos/2619967/pexels-photo-2619967.jpeg',
//     discount: 'FLAT 50% OFF',
//     rating: '4.0',
//     time: '25-30 mins',
//   },
//   {
//     id: 5,
//     name: 'Dominos',
//     img: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg',
//     discount: 'FLAT 50% OFF',
//     rating: '4.3',
//     time: '20-25 mins',
//   },
//   {
//     id: 6,
//     name: 'Burger King',
//     img: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg',
//     discount: 'FLAT 50% OFF',
//     rating: '4.2',
//     time: '25-30 mins',
//   },
// ];

// // --- BANNER CONFIGURATION ---
// const HEADER_HEIGHT = 60;
// const SEARCH_HEIGHT = 60;
// const BANNER_HEIGHT = 170;
// const HERO_HEIGHT = HEADER_HEIGHT + SEARCH_HEIGHT + BANNER_HEIGHT;
// const banners = [
//   { id: '1', type: 'OFFER', bg: '#FFE4E6' },
//   { id: '2', type: 'EVENT', bg: '#FFFDE7' },
// ];

// const HomeScreen: React.FC = () => {
//   const [vegMode, setVegMode] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
//   const navigation = useNavigation<NavigationProp>();

//   const cartCount = 2;
//   const restaurant = {
//     name: 'The Pizza Project',
//     logo: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg',
//   };
//   const handleMenuPress = () => {
//     console.log('Menu pressed');
//   };

//   const slideAnim = useRef(new Animated.Value(0)).current;

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
//         <View style={[styles.bannerBg, { backgroundColor: item.bg }]}>
//           {item.type === 'OFFER' ? (
//             <>
//               <View style={[styles.cloud, styles.cloudLeft]} />
//               <View style={[styles.cloud, styles.cloudRight]} />
//               <View style={[styles.cloud, styles.cloudTopLeft]} />
//               <View style={[styles.palmLeft]}>
//                 <Text style={styles.palmEmoji}>🌴</Text>
//               </View>
//               <View style={[styles.palmRight]}>
//                 <Text style={styles.palmEmoji}>🌴</Text>
//               </View>
//             </>
//           ) : (
//             <>
//               <Text style={[styles.confetti, { left: 20, top: 20 }]}>🎉</Text>
//               <Text style={[styles.confetti, { right: 40, top: 10 }]}>🎊</Text>
//               <Text style={[styles.confetti, { left: '40%', top: -10 }]}>✨</Text>
//               <View
//                 style={[
//                   styles.circleDeco,
//                   { left: -20, top: 80, backgroundColor: '#FFC107' },
//                 ]}
//               />
//             </>
//           )}
//         </View>

//         <View style={styles.bannerForeground}>
//           <View style={styles.bannerContent}>
//             {item.type === 'OFFER' ? (
//               <View style={{ alignItems: 'center' }}>
//                 <Text style={styles.bannerMainText}>
//                   MIN <Text style={styles.bannerHighlight}>₹150 OFF</Text>
//                 </Text>
//                 <View style={styles.bannerSubRow}>
//                   <Text style={styles.bannerFireEmoji}>🔥</Text>
//                   <Text style={styles.bannerSubText}> & MORE </Text>
//                   <Text style={styles.bannerFireEmoji}>🔥</Text>
//                 </View>
//                 <View style={styles.poweredByRow}>
//                   <Text style={styles.poweredByText}>Powered by </Text>
//                   <View style={styles.iciciBadge}>
//                     <Text style={styles.iciciText}>ICICI Bank</Text>
//                   </View>
//                 </View>
//               </View>
//             ) : (
//               <View style={{ alignItems: 'center' }}>
//                 <Text style={styles.eventMainText}>NO COOKING</Text>
//                 <View style={styles.eventBadge}>
//                   <Text style={styles.eventBadgeText}>👻 NOVEMBER 🦃</Text>
//                 </View>
//                 <View style={styles.poweredByRow}>
//                   <Text style={styles.poweredByText}>
//                     Explore all offers {'>'}{' '}
//                   </Text>
//                 </View>
//               </View>
//             )}
//           </View>
//         </View>
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>

//       {/* 🔥 FULL SCREEN IS NOW SCROLLABLE INCLUDING HERO SECTION */}
//       <ScrollView showsVerticalScrollIndicator={false}>

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

//           {/* Search Bar */}
//           <View style={styles.searchWrapper}>
//             <View style={styles.searchRow}>
//               <View style={styles.searchBar}>
//                 <Ionicons name="search" size={20} color={COLORS.primary} />
//                 <TextInput
//                   placeholder='Search "momos"'
//                   style={styles.searchInput}
//                   placeholderTextColor="#888"
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
//                 <View style={styles.vegTextColumn}>
//                   <Text style={styles.vegModeLabel}>VEG</Text>
//                   <Text style={styles.vegModeSubLabel}>MODE</Text>
//                 </View>
//                 <Switch
//                   value={vegMode}
//                   onValueChange={setVegMode}
//                   trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
//                   thumbColor="#fff"
//                   style={styles.vegSwitch}
//                 />
//               </View>

//             </View>
//           </View>

//         </View>

//         {/* Categories */}
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           style={styles.categoriesContainer}
//         >
//           {categories.map((c, index) => (
//             <TouchableOpacity
//               key={index}
//               style={styles.categoryItem}
//               onPress={() => {
//                 if (!c.isSpecial) {
//                   setSelectedCategory(c.name);
//                   navigation.navigate('FoodList', { category: c.name });
//                 }
//               }}
//             >
//               {c.isSpecial ? (
//                 <View style={styles.specialCategory}>
//                   <Image
//                     source={{ uri: c.img }}
//                     style={styles.specialCategoryImg}
//                   />
//                   <View style={styles.specialCategoryOverlay}>
//                     <Text style={styles.specialCategoryText}>MEALS UNDER</Text>
//                     <Text style={styles.specialCategoryPrice}>₹250</Text>
//                     <View style={styles.exploreSmallBtn}>
//                       <Text style={styles.exploreSmallText}>Explore ›</Text>
//                     </View>
//                   </View>
//                 </View>
//               ) : (
//                 <>
//                   <Image source={{ uri: c.img }} style={styles.categoryImg} />
//                   <Text
//                     style={[
//                       styles.categoryText,
//                       selectedCategory === c.name &&
//                         styles.categoryTextSelected,
//                     ]}
//                   >
//                     {c.name}
//                   </Text>
//                   {selectedCategory === c.name && (
//                     <View style={styles.categoryUnderline} />
//                   )}
//                 </>
//               )}
//             </TouchableOpacity>
//           ))}
//         </ScrollView>

//         {/* Filters */}
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           style={styles.filtersContainer}
//         >
//           {filters.map((f, index) => (
//             <TouchableOpacity
//               key={index}
//               style={[
//                 styles.filterBtn,
//                 selectedFilter === f.name && styles.filterBtnSelected,
//               ]}
//               onPress={() => setSelectedFilter(f.name)}
//             >
//               {f.icon && (
//                 <Ionicons
//                   name={f.icon}
//                   size={16}
//                   color="#333"
//                   style={{ marginRight: 4 }}
//                 />
//               )}
//               <Text
//                 style={[
//                   styles.filterText,
//                   selectedFilter === f.name && styles.filterTextSelected,
//                 ]}
//               >
//                 {f.name}
//               </Text>
//               {f.hasDropdown && (
//                 <Ionicons
//                   name="caret-down-outline"
//                   size={10}
//                   color="#333"
//                   style={{ marginLeft: 4 }}
//                 />
//               )}
//             </TouchableOpacity>
//           ))}
//         </ScrollView>

//         {/* Recommended */}
//         <Text style={styles.sectionTitle}>RECOMMENDED FOR YOU</Text>

//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           style={styles.recommendedContainer}
//         >
//           <View style={{ flexDirection: 'column' }}>
//             <View style={styles.recommendedRow}>
//               {recommendedRestaurants.slice(0, 3).map(r => (
//                 <TouchableOpacity
//                   key={r.id}
//                   activeOpacity={0.8}
//                   onPress={() =>
//                     navigation.navigate('ProductScreen', { category: r.name })
//                   }
//                 >
//                   <RestaurantCard data={r} />
//                 </TouchableOpacity>
//               ))}
//             </View>

//             <View style={styles.recommendedRow}>
//               {recommendedRestaurants.slice(3, 6).map(r => (
//                 <TouchableOpacity
//                   key={r.id}
//                   activeOpacity={0.8}
//                   onPress={() =>
//                     navigation.navigate('ProductScreen', { category: r.name })
//                   }
//                 >
//                   <RestaurantCard data={r} />
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </View>
//         </ScrollView>

//         <FoodList />

//         <View style={{ height: 80 }} />

//       </ScrollView>
//       {/* END OF SCROLLVIEW */}

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
//         <TouchableOpacity style={styles.navItem}>
//           <MaterialCommunityIcons
//             name="moped"
//             size={26}
//             color={COLORS.primary}
//           />
//           <Text style={styles.navTextActive}>Delivery</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.navItem}
//           onPress={() => navigation.navigate('DiningScreen')}
//         >
//           <MaterialCommunityIcons
//             name="silverware-fork-knife"
//             size={26}
//             color="#999"
//           />
//           <Text style={styles.navText}>Dining</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.navItem}>
//           <MaterialCommunityIcons
//             name="wallet-membership"
//             size={26}
//             color="#999"
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
//   locationTitle: { fontSize: 16, fontWeight: '800', color: '#1C1C1C' },
//   locationSub: { fontSize: 12, color: '#888', marginTop: 2, width: '90%' },
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
//     zIndex: 20,
//     backgroundColor: 'transparent',
//     paddingBottom: 10,
//   },
//   searchRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 12,
//   },
//   searchBar: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     paddingHorizontal: 12,
//     height: 40,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     marginRight: 5,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//   },
//   searchInput: { flex: 1, marginLeft: 8, fontSize: 15, color: '#000' },
//   verticalLine: { width: 1, height: 20, backgroundColor: '#ddd' },
//   vegModeContainer: { flexDirection: 'row', alignItems: 'center', },
//   vegTextColumn: { alignItems: 'flex-end', marginRight: 4 },
//   vegModeLabel: {
//     fontSize: 11,
//     fontWeight: '900',
//     color: '#1C1C1C',
//     letterSpacing: 0.5,
//   },
//   vegModeSubLabel: {
//     fontSize: 9,
//     color: COLORS.textSecondary,
//     fontWeight: '700',
//     letterSpacing: 0.5,
//   },
//   vegSwitch: { transform: [{ scale: 0.7 }] },

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
//   bannerBg: { position: 'absolute', width: '100%', height: '100%' },
//   bannerForeground: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: BANNER_HEIGHT,
//     zIndex: 10,
//   },
//   cloud: {
//     position: 'absolute',
//     width: 60,
//     height: 30,
//     backgroundColor: '#FFCDD2',
//     borderRadius: 40,
//     opacity: 0.6,
//   },
//   cloudLeft: { left: -10, top: 20 },
//   cloudRight: { right: -10, top: 40 },
//   cloudTopLeft: { left: 40, top: -10 },
//   palmLeft: {
//     position: 'absolute',
//     left: -15,
//     bottom: 20,
//     transform: [{ rotate: '20deg' }],
//   },
//   palmRight: {
//     position: 'absolute',
//     right: -15,
//     bottom: 20,
//     transform: [{ rotate: '-20deg' }],
//   },
//   palmEmoji: { fontSize: 50, opacity: 0.3 },
//   confetti: { position: 'absolute', fontSize: 24, opacity: 0.6 },
//   circleDeco: {
//     position: 'absolute',
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     opacity: 0.2,
//   },

//   bannerContent: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '100%',
//     paddingBottom: 20,
//   },
//   bannerMainText: {
//     fontSize: 28,
//     fontWeight: '900',
//     color: '#1C1C1C',
//     fontStyle: 'italic',
//   },
//   bannerHighlight: { color: COLORS.primary, fontSize: 30 },
//   bannerSubRow: { flexDirection: 'row', alignItems: 'center', marginTop: -5 },
//   bannerFireEmoji: { fontSize: 20 },
//   bannerSubText: {
//     fontSize: 24,
//     fontWeight: '900',
//     color: '#1C1C1C',
//     fontStyle: 'italic',
//   },
//   poweredByRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 8,
//     opacity: 0.8,
//   },
//   poweredByText: { fontSize: 10, color: '#555', fontWeight: '600' },
//   iciciBadge: {
//     backgroundColor: COLORS.primary,
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 4,
//     marginLeft: 4,
//   },
//   iciciText: { fontSize: 9, color: '#fff', fontWeight: 'bold' },

//   eventMainText: {
//     fontSize: 32,
//     fontWeight: '900',
//     color: '#000',
//     letterSpacing: 1,
//   },
//   eventBadge: {
//     backgroundColor: '#000',
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     marginTop: 5,
//     transform: [{ rotate: '-2deg' }],
//   },
//   eventBadgeText: { color: '#FFEB3B', fontWeight: 'bold', fontSize: 16 },

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
// specialCategoryText: { fontSize: 8, color: '#fff', fontWeight: '800', marginLeft: 10 },
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
//     width: 80,
//     height: 55,
//     borderRadius: 5,
//     backgroundColor: '#f0f0f0',
//   },
//   categoryText: {
//     fontSize: 11,
//     color: '#444',
//     marginTop: 6,
//     fontWeight: '900',
//   },
//   categoryTextSelected: { color: COLORS.primary, fontWeight: '900' },
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
//   recommendedContainer: { paddingLeft: 12, marginBottom: 10,},
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
//     marginLeft: 4,
//   },
//   discountBadgeYellow: { backgroundColor: '#FFC107' },
//   discountText: { fontSize: 9, color: '#fff', fontWeight: 'bold' },
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
//     marginBottom: 15,
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
//     borderColor: '#eee',
//     elevation: 20,
//   },
//   navItem: { alignItems: 'center' },
//   navText: { fontSize: 10, color: '#999', marginTop: 4, fontWeight: '600' },
//   navTextActive: {
//     fontSize: 10,
//     color: COLORS.primary,
//     marginTop: 4,
//     fontWeight: '800',
//   },
// });

// export default HomeScreen;


import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; 
import React, { useState, useEffect, useRef } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  Animated,
  Easing,
  FlatList,
  Modal,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// Make sure these imports exist in your project
import FoodList from '../components/FoodCard'; 
import { COLORS } from '../theme/color';

const { width, height } = Dimensions.get('window');

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
};

// --- DATA ---
const categories = [
  {
    name: 'Meals Under\n₹250',
    img: 'https://b.zmtcdn.com/data/o2_assets/52eb9796bb9bcf0eba64c643349e97211634401116.png',
    isSpecial: true,
  },
  {
    name: 'All',
    img: 'https://tse1.mm.bing.net/th/id/OIP.y9WHqmBEubDgxpHWqRN9sAHaEO?pid=Api&P=0&h=180',
  },
  {
    name: 'Cake',
    img: 'https://tse1.mm.bing.net/th/id/OIP.JQ6ZOYauedUoGFVWDzAecQHaEn?pid=Api&P=0&h=180',
  },
  {
    name: 'Idli',
    img: 'https://tse2.mm.bing.net/th/id/OIP.jUKtuSAXdENQkUtFfuGsBAAAAA?pid=Api&P=0&h=180',
  },
  {
    name: 'Ice Cream',
    img: 'https://tse2.mm.bing.net/th/id/OIP.HsrA5OUP2XuY8WH-xNBRtgHaGi?pid=Api&P=0&h=180',
  },
  {
    name: 'Biryani',
    img: 'https://tse2.mm.bing.net/th/id/OIP.zec59lWeYML7_-wwsSYBHAHaE8?pid=Api&P=0&h=180',
  },
];

const filters = [
  { name: 'Filters', icon: 'options-outline', hasDropdown: true },
  { name: 'Under 30 mins', icon: null },
  { name: 'New to you', icon: null },
  { name: 'Rating 4.0+', icon: null },
  { name: 'Pure Veg', icon: null },
];

const recommendedRestaurants = [
  {
    id: 1,
    name: 'KFC',
    img: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg',
    discount: 'FLAT 50% OFF',
    rating: '4.2',
    time: '30-35 mins',
  },
  {
    id: 2,
    name: 'Subway',
    img: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg',
    discount: 'Get items @ ₹69',
    rating: '4.1',
    time: '30-35 mins',
    isYellow: true,
  },
  {
    id: 3,
    name: 'FNP Cakes',
    img: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg',
    discount: 'FLAT ₹100 OFF',
    rating: '4.1',
    time: '15-20 mins',
  },
  {
    id: 4,
    name: 'Pizza Hut',
    img: 'https://images.pexels.com/photos/2619967/pexels-photo-2619967.jpeg',
    discount: 'FLAT 50% OFF',
    rating: '4.0',
    time: '25-30 mins',
  },
  {
    id: 5,
    name: 'Dominos',
    img: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg',
    discount: 'FLAT 50% OFF',
    rating: '4.3',
    time: '20-25 mins',
  },
  {
    id: 6,
    name: 'Burger King',
    img: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg',
    discount: 'FLAT 50% OFF',
    rating: '4.2',
    time: '25-30 mins',
  },
];

// --- BANNER CONFIGURATION ---
const HEADER_HEIGHT = 60;
const SEARCH_HEIGHT = 70;
const BANNER_HEIGHT = 170;
const HERO_HEIGHT = HEADER_HEIGHT + SEARCH_HEIGHT + BANNER_HEIGHT;
const banners = [
  { id: '1', type: 'OFFER', bg: '#FFE4E6' },
  { id: '2', type: 'EVENT', bg: '#FFFDE7' },
];

const HomeScreen: React.FC = () => {
  const [vegMode, setVegMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const cartCount = 2;
  const restaurant = {
    name: 'The Pizza Project',
    logo: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg',
  };
  const handleMenuPress = () => {
    console.log('Menu pressed');
  };

  const slideAnim = useRef(new Animated.Value(0)).current;

  // Function to handle veg switch toggle - SIMPLIFIED (No Popup)
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
        <View style={[styles.bannerBg, { backgroundColor: item.bg }]}>
          {item.type === 'OFFER' ? (
            <>
              <View style={[styles.cloud, styles.cloudLeft]} />
              <View style={[styles.cloud, styles.cloudRight]} />
              <View style={[styles.cloud, styles.cloudTopLeft]} />
              <View style={[styles.palmLeft]}>
                <Text style={styles.palmEmoji}>🌴</Text>
              </View>
              <View style={[styles.palmRight]}>
                <Text style={styles.palmEmoji}>🌴</Text>
              </View>
            </>
          ) : (
            <>
              <Text style={[styles.confetti, { left: 20, top: 20 }]}>🎉</Text>
              <Text style={[styles.confetti, { right: 40, top: 10 }]}>🎊</Text>
              <Text style={[styles.confetti, { left: '40%', top: -10 }]}>✨</Text>
              <View
                style={[
                  styles.circleDeco,
                  { left: -20, top: 80, backgroundColor: '#FFC107' },
                ]}
              />
            </>
          )}
        </View>

        <View style={styles.bannerForeground}>
          <View style={styles.bannerContent}>
            {item.type === 'OFFER' ? (
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.bannerMainText}>
                  MIN <Text style={styles.bannerHighlight}>₹150 OFF</Text>
                </Text>
                <View style={styles.bannerSubRow}>
                  <Text style={styles.bannerFireEmoji}>🔥</Text>
                  <Text style={styles.bannerSubText}> & MORE </Text>
                  <Text style={styles.bannerFireEmoji}>🔥</Text>
                </View>
                <View style={styles.poweredByRow}>
                  <Text style={styles.poweredByText}>Powered by </Text>
                  <View style={styles.iciciBadge}>
                    <Text style={styles.iciciText}>ICICI Bank</Text>
                  </View>
                </View>
              </View>
            ) : (
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.eventMainText}>NO COOKING</Text>
                <View style={styles.eventBadge}>
                  <Text style={styles.eventBadgeText}>👻 NOVEMBER 🦃</Text>
                </View>
                <View style={styles.poweredByRow}>
                  <Text style={styles.poweredByText}>
                    Explore all offers {'>'}{' '}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* 🔥 FULL SCREEN IS NOW SCROLLABLE INCLUDING HERO SECTION */}
      <ScrollView showsVerticalScrollIndicator={false}>

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

          {/* Search Bar */}
          <View style={styles.searchWrapper}>
            <View style={styles.searchRow}>
              <View style={styles.searchBar}>
                <Ionicons name="search" size={20} color={COLORS.primary} />
                <TextInput
                  placeholder='Search "momos"'
                  style={styles.searchInput}
                  placeholderTextColor="#888"
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
                  <Text style={[styles.vegModeLabel, vegMode && {color:'#007E33'}]}>VEG</Text>
                  <Text style={[styles.vegModeSubLabel, vegMode && {color:'#007E33'}]}>MODE</Text>
                </View>
              </View>
            </View>
            
            {/* POPUP REMOVED FROM HERE */}

          </View>

        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {categories.map((c, index) => (
            <TouchableOpacity
              key={index}
              style={styles.categoryItem}
              onPress={() => {
                if (!c.isSpecial) {
                  setSelectedCategory(c.name);
                  navigation.navigate('FoodList', { category: c.name });
                }
              }}
            >
              {c.isSpecial ? (
                <View style={styles.specialCategory}>
                  <Image
                    source={{ uri: c.img }}
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
              ) : (
                <>
                  <Image source={{ uri: c.img }} style={styles.categoryImg} />
                  <Text
                    style={[
                      styles.categoryText,
                      selectedCategory === c.name &&
                        styles.categoryTextSelected,
                    ]}
                  >
                    {c.name}
                  </Text>
                  {selectedCategory === c.name && (
                    <View style={styles.categoryUnderline} />
                  )}
                </>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
        >
          {filters.map((f, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.filterBtn,
                selectedFilter === f.name && styles.filterBtnSelected,
              ]}
              onPress={() => {
                if (f.name === 'Filters') {
                    console.log('Filter modal removed');
                } else {
                    setSelectedFilter(f.name);
                }
              }}
            >
              {f.icon && (
                <Ionicons
                  name={f.icon}
                  size={16}
                  color="#333"
                  style={{ marginRight: 4 }}
                />
              )}
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === f.name && styles.filterTextSelected,
                ]}
              >
                {f.name}
              </Text>
              {f.hasDropdown && (
                <Ionicons
                  name="caret-down-outline"
                  size={10}
                  color="#333"
                  style={{ marginLeft: 4 }}
                />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Recommended */}
        <Text style={styles.sectionTitle}>RECOMMENDED FOR YOU</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.recommendedContainer}
        >
          <View style={{ flexDirection: 'column' }}>
            <View style={styles.recommendedRow}>
              {recommendedRestaurants.slice(0, 3).map(r => (
                <TouchableOpacity
                  key={r.id}
                  activeOpacity={0.8}
                  onPress={() =>
                    navigation.navigate('ProductScreen', { category: r.name })
                  }
                >
                  <RestaurantCard data={r} />
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.recommendedRow}>
              {recommendedRestaurants.slice(3, 6).map(r => (
                <TouchableOpacity
                  key={r.id}
                  activeOpacity={0.8}
                  onPress={() =>
                    navigation.navigate('ProductScreen', { category: r.name })
                  }
                >
                  <RestaurantCard data={r} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        <FoodList />

        <View style={{ height: 80 }} />

      </ScrollView>
      {/* END OF SCROLLVIEW */}

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
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons
            name="moped"
            size={26}
            color={COLORS.primary}
          />
          <Text style={styles.navTextActive}>Delivery</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('DiningScreen')}
        >
          <MaterialCommunityIcons
            name="silverware-fork-knife"
            size={26}
            color="#999"
          />
          <Text style={styles.navText}>Dining</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons
            name="wallet-membership"
            size={26}
            color="#999"
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
  locationTitle: { fontSize: 16, fontWeight: '800', color: '#1C1C1C' },
  locationSub: { fontSize: 12, color: '#888', marginTop: 2, width: '90%' },
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
    borderColor: '#e0e0e0',
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
    color: '#1C1C1C',
    letterSpacing: 0.5,
    lineHeight: 12,
  },
  vegModeSubLabel: {
    fontSize: 8,
    color: COLORS.textSecondary,
    fontWeight: '700',
    letterSpacing: 0.5,
    lineHeight: 10,
  },
  vegSwitch: { 
    transform: [{ scale: 0.7 }],
    marginBottom: 0,
  },

  // --- VEG POPUP STYLES ---
  vegPopupContainer: {
    position: 'absolute',
    top: 55, // Position below the search row
    right: 12, // Align with the switch
    width: 250,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    zIndex: 100,
    // Heavy Shadow
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  vegArrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#fff',
    position: 'absolute',
    top: -9,
    right: 20, // aligns with the switch center
  },
  vegPopupTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C1C1C',
    marginBottom: 16,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#888',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#007E33', // Zomato Veg Green
  },
  radioText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  popupApplyBtn: {
    backgroundColor: '#007E33', // Zomato Veg Green
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 5,
  },
  popupApplyText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  moreSettingsText: {
    color: '#007E33',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
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
  bannerBg: { position: 'absolute', width: '100%', height: '100%' },
  bannerForeground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: BANNER_HEIGHT,
    zIndex: 10,
  },
  cloud: {
    position: 'absolute',
    width: 60,
    height: 30,
    backgroundColor: '#FFCDD2',
    borderRadius: 40,
    opacity: 0.6,
  },
  cloudLeft: { left: -10, top: 20 },
  cloudRight: { right: -10, top: 40 },
  cloudTopLeft: { left: 40, top: -10 },
  palmLeft: {
    position: 'absolute',
    left: -15,
    bottom: 20,
    transform: [{ rotate: '20deg' }],
  },
  palmRight: {
    position: 'absolute',
    right: -15,
    bottom: 20,
    transform: [{ rotate: '-20deg' }],
  },
  palmEmoji: { fontSize: 50, opacity: 0.3 },
  confetti: { position: 'absolute', fontSize: 24, opacity: 0.6 },
  circleDeco: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    opacity: 0.2,
  },

  bannerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    paddingBottom: 20,
  },
  bannerMainText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1C1C1C',
    fontStyle: 'italic',
  },
  bannerHighlight: { color: COLORS.primary, fontSize: 30 },
  bannerSubRow: { flexDirection: 'row', alignItems: 'center', marginTop: -5 },
  bannerFireEmoji: { fontSize: 20 },
  bannerSubText: {
    fontSize: 24,
    fontWeight: '900',
    color: '#1C1C1C',
    fontStyle: 'italic',
  },
  poweredByRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    opacity: 0.8,
  },
  poweredByText: { fontSize: 10, color: '#555', fontWeight: '600' },
  iciciBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 4,
  },
  iciciText: { fontSize: 9, color: '#fff', fontWeight: 'bold' },

  eventMainText: {
    fontSize: 32,
    fontWeight: '900',
    color: '#000',
    letterSpacing: 1,
  },
  eventBadge: {
    backgroundColor: '#000',
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 5,
    transform: [{ rotate: '-2deg' }],
  },
  eventBadgeText: { color: '#FFEB3B', fontWeight: 'bold', fontSize: 16 },

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
    width: 80,
    height: 55,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  categoryText: {
    fontSize: 11,
    color: '#444',
    marginTop: 6,
    fontWeight: '900',
  },
  categoryTextSelected: { color: COLORS.primary, fontWeight: '900' },
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
  recommendedContainer: { paddingLeft: 12, marginBottom: 10,},
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
  discountText: { fontSize: 9, color: '#fff', fontWeight: 'bold' },
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
    left: 10,
    right: 10,
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
    marginBottom: 15,
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
  },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 10, color: '#999', marginTop: 4, fontWeight: '600' },
  navTextActive: {
    fontSize: 10,
    color: COLORS.primary,
    marginTop: 4,
    fontWeight: '800',
  },
});

export default HomeScreen;