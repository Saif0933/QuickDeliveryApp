// import React, { useState, useEffect, useRef } from "react";
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Dimensions,
//   StatusBar,
//   TextInput,
//   Animated,
//   FlatList,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Ionicons from "react-native-vector-icons/Ionicons";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import { COLORS } from "../../theme/color";

// const { width } = Dimensions.get("window");

// // --- Mock Data ---

// const BANNERS = [
//   "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg",
//   "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg",
//   "https://img.freepik.com/premium-psd/delicious-burger-food-menu-web-banner-template_106176-414.jpg",
// ];

// const FILTERS = [
//   { id: "1", name: "All", image: "https://c.ndtvimg.com/2022-06/gp4k2jro_burgers_625x300_20_June_22.jpg" }, 
//   { id: "2", name: "Chicken", image: "https://img.freepik.com/premium-photo/pizza-isolate-white-background-generative-ai_74760-2619.jpg" },
//   { id: "3", name: "Paneer", image: "https://t3.ftcdn.net/jpg/00/27/57/96/360_F_27579652_d70y2kZm1c2l4i2k0j2k0j2k0j2k0j2k.jpg" },
//   { id: "4", name: "Margherita", image: "https://img.freepik.com/premium-photo/pizza-isolate-white-background-generative-ai_74760-2619.jpg" },
//   { id: "5", name: "Cheese", image: "https://t3.ftcdn.net/jpg/00/27/57/96/360_F_27579652_d70y2kZm1c2l4i2k0j2k0j2k0j2k0j2k.jpg" },
// ];

// const QUICK_FILTERS = [
//   { label: "Sort", icon: "options-outline" },
//   { label: "Nearest", icon: "" },
//   { label: "Rating 4.0+", icon: "" },
//   { label: "Fast Delivery", icon: "" },
//   { label: "Pure Veg", icon: "" },
//   { label: "Great Offers", icon: "" },
// ];

// const FOOD_DATA = [
//   {
//     id: "1",
//     restaurantName: "Oven Story Pizza",
//     location: "1.3 Km, Ashok Nagar",
//     time: "35-40 mins",
//     rating: "4.6",
//     logo: "https://imgs.search.brave.com/lPVvdmjrhC0FqB2AtLmsiGyPowDRd3SDZYbyglsDy0k/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/c2FuaXR5LmlvL2lt/YWdlcy9rYnFxM2Uw/ci9wcm9kdWN0aW9u/Lzc3YjE0NWNkYjcy/NTgwODlhMmU0ZWRh/NDQyYmE5YWFmMDUx/MDMxNzUtMzQweDMz/OC5wbmc_dz0zODQw/JnE9MTAw", 
//     offerText: "Save\n60%",
//     offerSub: "up to ₹120",
//     foodName: "Corn Pizza",
//     price: "129",
//     isVeg: true,
//     foodImage: "https://t3.ftcdn.net/jpg/00/27/57/96/360_F_27579652_d70y2kZm1c2l4i2k0j2k0j2k0j2k0j2k.jpg",
//   },
//   {
//     id: "2",
//     restaurantName: "La Pino'z Pizza",
//     location: "2.5 Km, Lalpur",
//     time: "40-45 mins",
//     rating: "4.1",
//     logo: "https://imgs.search.brave.com/lPVvdmjrhC0FqB2AtLmsiGyPowDRd3SDZYbyglsDy0k/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/c2FuaXR5LmlvL2lt/YWdlcy9rYnFxM2Uw/ci9wcm9kdWN0aW9u/Lzc3YjE0NWNkYjcy/NTgwODlhMmU0ZWRh/NDQyYmE5YWFmMDUx/MDMxNzUtMzQweDMz/OC5wbmc_dz0zODQw/JnE9MTAw",
//     offerText: "Flat\n₹100",
//     offerSub: "OFF",
//     foodName: "Chicken Tikka Pizza",
//     price: "249",
//     isVeg: false,
//     foodImage: "https://img.freepik.com/premium-photo/pizza-isolate-white-background-generative-ai_74760-2619.jpg",
//   },
//   {
//     id: "3",
//     restaurantName: "Pizza Hut",
//     location: "4.0 Km, Main Road",
//     time: "25-30 mins",
//     rating: "3.9",
//     logo: "https://imgs.search.brave.com/lPVvdmjrhC0FqB2AtLmsiGyPowDRd3SDZYbyglsDy0k/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/c2FuaXR5LmlvL2lt/YWdlcy9rYnFxM2Uw/ci9wcm9kdWN0aW9u/Lzc3YjE0NWNkYjcy/NTgwODlhMmU0ZWRh/NDQyYmE5YWFmMDUx/MDMxNzUtMzQweDMz/OC5wbmc_dz0zODQw/JnE9MTAw",
//     offerText: "Free\nDish",
//     offerSub: "On ₹300",
//     foodName: "Margherita Supreme",
//     price: "199",
//     isVeg: true,
//     foodImage: "https://t3.ftcdn.net/jpg/00/27/57/96/360_F_27579652_d70y2kZm1c2l4i2k0j2k0j2k0j2k0j2k.jpg",
//   },
//   {
//     id: "4",
//     restaurantName: "Domino's Pizza",
//     location: "1.8 Km, City Center",
//     time: "30-35 mins",
//     rating: "4.3",
//     logo: "https://imgs.search.brave.com/lPVvdmjrhC0FqB2AtLmsiGyPowDRd3SDZYbyglsDy0k/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/c2FuaXR5LmlvL2lt/YWdlcy9rYnFxM2Uw/ci9wcm9kdWN0aW9u/Lzc3YjE0NWNkYjcy/NTgwODlhMmU0ZWRh/NDQyYmE5YWFmMDUx/MDMxNzUtMzQweDMz/OC5wbmc_dz0zODQw/JnE9MTAw",
//     offerText: "50%\nOFF",
//     offerSub: "on First Order",
//     foodName: "Veg Extravaganza",
//     price: "179",
//     isVeg: true,
//     foodImage: "https://img.freepik.com/premium-photo/pizza-isolate-white-background-generative-ai_74760-2619.jpg",
//   },
//   {
//     id: "5",
//     restaurantName: "Burger King",
//     location: "2.0 Km, Mall Road",
//     time: "20-25 mins",
//     rating: "4.2",
//     logo: "https://imgs.search.brave.com/lPVvdmjrhC0FqB2AtLmsiGyPowDRd3SDZYbyglsDy0k/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/c2FuaXR5LmlvL2lt/YWdlcy9rYnFxM2Uw/ci9wcm9kdWN0aW9u/Lzc3YjE0NWNkYjcy/NTgwODlhMmU0ZWRh/NDQyYmE5YWFmMDUx/MDMxNzUtMzQweDMz/OC5wbmc_dz0zODQw/JnE9MTAw",
//     offerText: "Buy 1\nGet 1",
//     offerSub: "Free",
//     foodName: "Whopper Burger",
//     price: "299",
//     isVeg: false,
//     foodImage: "https://c.ndtvimg.com/2022-06/gp4k2jro_burgers_625x300_20_June_22.jpg",
//   },
// ];

// // --- Sub Components ---

// const BannerCarousel = () => {
//   const [activeBanner, setActiveBanner] = useState(0);
//   const flatListRef = useRef(null);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveBanner((prev) => {
//         let next = prev + 1;
//         if (next >= BANNERS.length) next = 0;
//         flatListRef.current?.scrollToIndex({ index: next, animated: true });
//         return next;
//       });
//     }, 3000); // Scroll every 3 seconds

//     return () => clearInterval(interval);
//   }, []);

//   const renderBanner = ({ item }) => (
//     <View style={styles.bannerWrapper}>
//       <Image source={{ uri: item }} style={styles.heroImage} resizeMode="cover" />
//       <View style={styles.bannerOverlay} />
//     </View>
//   );

//   return (
//     <View style={styles.heroContainer}>
//       <FlatList
//         ref={flatListRef}
//         data={BANNERS}
//         renderItem={renderBanner}
//         keyExtractor={(_, index) => index.toString()}
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         onMomentumScrollEnd={(event) => {
//           const index = Math.round(event.nativeEvent.contentOffset.x / width);
//           setActiveBanner(index);
//         }}
//       />
//       {/* Pagination Dots */}
//       <View style={styles.paginationContainer}>
//         {BANNERS.map((_, index) => (
//           <View
//             key={index}
//             style={[
//               styles.paginationDot,
//               activeBanner === index ? styles.activeDot : styles.inactiveDot,
//             ]}
//           />
//         ))}
//       </View>
//     </View>
//   );
// };

// // --- UPDATED: QuickFilters with State ---
// const QuickFilters = () => {
//   const [activeFilter, setActiveFilter] = useState("Sort");

//   return (
//     <View style={styles.quickFiltersWrapper}>
//       <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickFiltersContainer}>
//         {QUICK_FILTERS.map((filter, index) => {
//           const isActive = activeFilter === filter.label;
//           return (
//             <TouchableOpacity 
//               key={index} 
//               style={[
//                 styles.quickFilterChip, 
//                 isActive && { borderColor: COLORS.primary, backgroundColor: COLORS.white }
//               ]}
//               onPress={() => setActiveFilter(filter.label)}
//             >
//               {filter.icon ? (
//                 <Ionicons 
//                   name={filter.icon} 
//                   size={14} 
//                   color={isActive ? COLORS.primary : COLORS.textPrimary} 
//                   style={{ marginRight: 4 }} 
//                 />
//               ) : null}
//               <Text style={[
//                 styles.quickFilterText, 
//                 isActive && { color: COLORS.primary }
//               ]}>
//                 {filter.label}
//               </Text>
//               {filter.label === "Sort" && (
//                 <Ionicons 
//                   name="caret-down" 
//                   size={10} 
//                   color={isActive ? COLORS.primary : COLORS.textPrimary} 
//                   style={{marginLeft: 4}} 
//                 />
//               )}
//             </TouchableOpacity>
//           );
//         })}
//       </ScrollView>
//     </View>
//   );
// };

// const VegIcon = ({ isVeg }) => (
//   <View style={[styles.vegIconBorder, { borderColor: isVeg ? COLORS.highlight : COLORS.primary }]}>
//     <View style={[styles.vegIconDot, { backgroundColor: isVeg ? COLORS.highlight : COLORS.primary }]} />
//   </View>
// );

// // --- UPDATED: FilterSection with State ---
// const FilterSection = () => {
//   const [selectedCategory, setSelectedCategory] = useState("1"); // Default to first ID

//   return (
//     <View style={styles.filterContainer}>
//       <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
//         {FILTERS.map((item) => {
//           const isSelected = selectedCategory === item.id;
//           return (
//             <TouchableOpacity 
//               key={item.id} 
//               style={styles.filterItem}
//               onPress={() => setSelectedCategory(item.id)}
//             >
//               <View style={[styles.filterImgContainer, isSelected && styles.activeFilterBorder]}>
//                 <Image source={{ uri: item.image }} style={styles.filterImage} />
//               </View>
//               <Text style={[styles.filterText, isSelected && styles.activeFilterText]}>
//                 {item.name}
//               </Text>
//             </TouchableOpacity>
//           );
//         })}
//       </ScrollView>
//     </View>
//   );
// };

// const RestaurantCard = ({ item, index }) => {
//   const scaleValue = useRef(new Animated.Value(1)).current;

//   const onPressIn = () => {
//     Animated.spring(scaleValue, {
//       toValue: 0.95,
//       useNativeDriver: true,
//     }).start();
//   };

//   const onPressOut = () => {
//     Animated.spring(scaleValue, {
//       toValue: 1,
//       useNativeDriver: true,
//     }).start();
//   };

//   return (
//     <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
//       <TouchableOpacity 
//         style={styles.card} 
//         activeOpacity={0.9}
//         onPressIn={onPressIn}
//         onPressOut={onPressOut}
//       >
//         {/* --- Upper Part: Restaurant Info --- */}
//         <View style={styles.restaurantHeader}>
          
//           {/* Logo & Rating */}
//           <View style={styles.logoContainer}>
//             <Image source={{ uri: item.logo }} style={styles.logo} resizeMode="contain" />
//             <View style={styles.ratingBadge}>
//               <Text style={styles.ratingText}>{item.rating}</Text>
//               <Ionicons name="star" size={10} color={COLORS.white} style={{ marginLeft: 2 }} />
//             </View>
//           </View>

//           {/* Info Middle */}
//           <View style={styles.infoContainer}>
//             <Text style={styles.resName}>{item.restaurantName}</Text>
//             <Text style={styles.resMeta}>{item.location}</Text>
//             <View style={styles.timeRow}>
//                 <MaterialCommunityIcons name="clock-time-four-outline" size={14} color={COLORS.textSecondary} />
//                 <Text style={styles.resMeta}> {item.time}</Text>
//             </View>
//             <Text style={styles.homeDelivery}>Home delivery</Text>
//           </View>

//           {/* Blue Offer Ribbon (Right Side) */}
//           <View style={styles.offerRibbon}>
//              <View style={styles.offerContent}>
//                 <Text style={styles.offerTitle}>{item.offerText}</Text>
//                 <Text style={styles.offerSub}>{item.offerSub}</Text>
//              </View>
//           </View>
//         </View>

//         {/* --- Divider --- */}
//         <View style={styles.dashedDivider} />

//         {/* --- Lower Part: Food Item --- */}
//         <View style={styles.foodItemRow}>
//           <View style={styles.foodDetails}>
//             <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 4}}>
//                  <VegIcon isVeg={item.isVeg} />
//                  <View style={{width: 6}} />
//                  {index === 0 && (
//                     <View style={{backgroundColor: COLORS.accent, paddingHorizontal: 4, borderRadius: 4}}>
//                         <Text style={{fontSize: 10, color: COLORS.primary, fontWeight: '600'}}>Best Seller</Text>
//                     </View>
//                  )}
//             </View>
//             <Text style={styles.foodName}>{item.foodName}</Text>
//             <Text style={styles.price}>₹{item.price}</Text>
//           </View>

//           <View style={styles.foodImageContainer}>
//             <Image source={{ uri: item.foodImage }} style={styles.foodImage} />
//             <View style={styles.addButton}>
//               <TouchableOpacity>
//                 <Text style={styles.addText}>ADD</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </TouchableOpacity>
//     </Animated.View>
//   );
// };

// // --- Main Screen ---

// export default function FoodList() {
//   const navigation = useNavigation();

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
//       {/* Header */}
//       <View style={{ backgroundColor: COLORS.white }}>
//         <View style={styles.header}>
//             <View>
//                 <Text style={styles.subLocation}>📍 Delatoli, Ranchi</Text>
//                 <Text style={styles.location}>Harmu Housing Colony</Text>
//             </View>
//             <View style={styles.headerIcons}>
//                 <TouchableOpacity style={styles.iconButton}>
//                     <Ionicons name="heart-outline" size={24} color={COLORS.primary} />
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.iconButton}>
//                     <Ionicons name="person-circle-outline" size={28} color={COLORS.textPrimary} />
//                 </TouchableOpacity>
//             </View>
//         </View>

//         <View style={{ paddingHorizontal: 16, paddingBottom: 10 }}>
//             <View style={styles.searchBar}>
//                 <Ionicons name="search-outline" size={20} color={COLORS.primary} />
//                 <TextInput
//                     placeholder="Restaurant, cuisine or dish"
//                     placeholderTextColor={COLORS.muted}
//                     style={styles.searchInput}
//                 />
//                 <TouchableOpacity>
//                     <Ionicons name="mic-outline" size={18} color={COLORS.primary} />
//                 </TouchableOpacity>
//             </View>
//         </View>
//       </View>

//       {/* <HeaderTabs /> */}

//       <ScrollView showsVerticalScrollIndicator={false}>
//         {/* Animated Banner Carousel */}
//         <BannerCarousel />

//         {/* Circular Filters */}
//         <FilterSection />

//         {/* NEW: Quick Text Filters */}
//         <QuickFilters />

//         {/* First Horizontal Scroll: Recommended */}
//         <View style={styles.sectionContainer}>
//           <Text style={styles.sectionTitle}>Recommended</Text>
//           <FlatList
//             horizontal
//             data={FOOD_DATA.slice(0, 3)}
//             renderItem={({ item, index }) => <RestaurantCard item={item} index={index} />}
//             keyExtractor={(item) => item.id}
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={{ paddingRight: 16 }}
//           />
//         </View>

//         {/* Second Horizontal Scroll: Veg Options */}
//         <View style={styles.sectionContainer}>
//           <Text style={styles.sectionTitle}>Veg Options</Text>
//           <FlatList
//             horizontal
//             data={FOOD_DATA.filter(item => item.isVeg).slice(0, 3)}
//             renderItem={({ item, index }) => <RestaurantCard item={item} index={index} />}
//             keyExtractor={(item) => item.id}
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={{ paddingRight: 16 }}
//           />
//         </View>

//         {/* Third Horizontal Scroll: Non-Veg Options */}
//         <View style={styles.sectionContainer}>
//           <Text style={styles.sectionTitle}>Non-Veg Options</Text>
//           <FlatList
//             horizontal
//             data={FOOD_DATA.filter(item => !item.isVeg).slice(0, 3)}
//             renderItem={({ item, index }) => <RestaurantCard item={item} index={index} />}
//             keyExtractor={(item) => item.id}
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={{ paddingRight: 16 }}
//           />
//         </View>
        
//         <View style={{ height: 100 }} />
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },
  
//   // --- Header ---
//   header: { 
//     flexDirection: "row", 
//     justifyContent: "space-between", 
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//   },
//   subLocation: { fontSize: 13, color: COLORS.textSecondary, fontWeight: "500" },
//   location: { fontSize: 16, fontWeight: "700", color: COLORS.textPrimary, marginTop: 4 },
//   headerIcons: { flexDirection: "row", gap: 8 },
//   iconButton: { padding: 8, borderRadius: 50 },
//   searchBar: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: COLORS.background, 
//     borderRadius: 12,
//     paddingHorizontal: 14,
//     height: 44,
//   },
//   searchInput: { marginLeft: 10, fontSize: 14, flex: 1, color: COLORS.textPrimary },

//   // --- Top Tabs ---
//   topTabsContainer: {
//     flexDirection: "row",
//     backgroundColor: COLORS.white,
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     alignItems: 'center',
//     gap: 12,
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOpacity: 0.05,
//     borderTopWidth: 1,
//     borderColor: COLORS.background
//   },
//   topTab: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 8,
//     paddingHorizontal: 14,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: COLORS.secondary,
//     backgroundColor: COLORS.white,
//     gap: 6,
//   },
//   activeTopTab: {
//     borderColor: COLORS.accent, 
//     backgroundColor: COLORS.white,
//   },
//   topTabText: {
//     fontSize: 13,
//     fontWeight: "600",
//     color: COLORS.textSecondary,
//   },
//   activeTopTabText: {
//     color: COLORS.primary, 
//     fontWeight: "700",
//   },

//   // --- Banner Carousel ---
//   heroContainer: {
//     width: width,
//     height: 220,
//     backgroundColor: COLORS.secondary,
//     position: 'relative',
//   },
//   bannerWrapper: {
//     width: width,
//     height: 220,
//   },
//   heroImage: {
//     width: "100%",
//     height: "100%",
//   },
//   bannerOverlay: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: 60,
//     // Simple gradient effect using transparency
//     backgroundColor: 'rgba(0,0,0,0.05)',
//   },
//   paginationContainer: {
//     position: 'absolute',
//     bottom: 12,
//     flexDirection: 'row',
//     width: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     gap: 6,
//   },
//   paginationDot: {
//     width: 6,
//     height: 6,
//     borderRadius: 3,
//   },
//   activeDot: {
//     backgroundColor: COLORS.white,
//     width: 20, // Elongated active dot
//   },
//   inactiveDot: {
//     backgroundColor: 'rgba(255,255,255,0.5)',
//   },

//   // --- Visual Filters ---
//   filterContainer: {
//     backgroundColor: COLORS.white,
//     paddingVertical: 16,
//     marginBottom: 1,
//   },
//   filterItem: {
//     alignItems: "center",
//     marginRight: 20,
//   },
//   filterImgContainer: {
//     width: 55,
//     height: 55,
//     borderRadius: 30,
//     overflow: "hidden",
//     marginBottom: 6,
//     // Default border transparent
//     borderWidth: 2,
//     borderColor: 'transparent', 
//   },
//   activeFilterBorder: {
//     borderWidth: 2,
//     borderColor: COLORS.primary,
//     padding: 2, 
//   },
//   filterImage: {
//     width: "100%",
//     height: "100%",
//     borderRadius: 30,
//   },
//   filterText: {
//     fontSize: 12,
//     color: COLORS.textSecondary,
//     fontWeight: "500",
//   },
//   activeFilterText: {
//     color: COLORS.textPrimary,
//     fontWeight: "700",
//   },

//   // --- Quick Filters ---
//   quickFiltersWrapper: {
//     backgroundColor: COLORS.white,
//     paddingVertical: 10,
//     marginBottom: 10,
//   },
//   quickFiltersContainer: {
//     paddingHorizontal: 16,
//     gap: 10,
//   },
//   quickFilterChip: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: COLORS.secondary,
//     backgroundColor: COLORS.white,
//   },
//   quickFilterText: {
//     fontSize: 12,
//     fontWeight: '600',
//     color: COLORS.textPrimary,
//   },

//   // --- Section Styles ---
//   sectionContainer: {
//     backgroundColor: COLORS.white,
//     marginBottom: 10,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: COLORS.textPrimary,
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//   },

//   // --- Card Styles ---
//   listContainer: {
//     padding: 16,
//     paddingTop: 0,
//     paddingBottom: 16,
//   },
//   card: {
//     backgroundColor: COLORS.white,
//     borderRadius: 16,
//     marginRight: 5,
//     width: width * 0.85, // Fixed width for horizontal scroll
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.08,
//     shadowRadius: 6,
//     elevation: 3,
//     overflow: "hidden", 
//     marginLeft: 20,
//     marginBottom: 5,
//   },
  
//   // Restaurant Header Part
//   restaurantHeader: {
//     flexDirection: "row",
//     padding: 12,
//   },
//   logoContainer: {
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   logo: {
//     width: 50,
//     height: 50,
//     borderRadius: 8,
//     backgroundColor: COLORS.white,
//     borderWidth: 1,
//     borderColor: COLORS.secondary,
//   },
//   ratingBadge: {
//     position: 'absolute',
//     bottom: -6,
//     backgroundColor: COLORS.highlight, 
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 6,
//     zIndex: 2,
//   },
//   ratingText: {
//     color: COLORS.white,
//     fontSize: 10,
//     fontWeight: '700',
//   },

//   infoContainer: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   resName: {
//     fontSize: 16,
//     fontWeight: "700",
//     color: COLORS.textPrimary,
//     marginBottom: 2,
//   },
//   resMeta: {
//     fontSize: 11,
//     color: COLORS.textSecondary,
//     marginBottom: 2,
//   },
//   timeRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 2,
//   },
//   homeDelivery: {
//     fontSize: 10,
//     color: COLORS.primary, 
//     fontWeight: "600",
//   },

//   // Offer Ribbon
//   offerRibbon: {
//     backgroundColor: COLORS.primary, 
//     width: 70,
//     marginRight: -12, 
//     marginTop: -12, 
//     marginBottom: -12, 
//     borderTopLeftRadius: 0,
//     borderBottomLeftRadius: 16, 
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   offerContent: {
//     alignItems: 'center',
//   },
//   offerTitle: {
//     color: COLORS.white,
//     fontWeight: "800",
//     fontSize: 14,
//     textAlign: 'center',
//     lineHeight: 16,
//   },
//   offerSub: {
//     color: COLORS.white,
//     fontSize: 10,
//     marginTop: 2,
//   },

//   // Divider
//   dashedDivider: {
//     height: 1,
//     borderWidth: 1,
//     borderColor: COLORS.secondary,
//     borderStyle: 'dashed', 
//     marginHorizontal: 12,
//     marginVertical: 4,
//   },

//   // Food Part
//   foodItemRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 12,
//   },
//   foodDetails: {
//     flex: 1,
//   },
//   foodName: {
//     fontSize: 15,
//     fontWeight: "600",
//     color: COLORS.textPrimary,
//     marginBottom: 4,
//   },
//   price: {
//     fontSize: 15,
//     fontWeight: "700",
//     color: COLORS.textPrimary,
//   },
//   foodImageContainer: {
//     position: 'relative',
//   },
//   foodImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 12,
//     backgroundColor: COLORS.secondary,
//   },
//   addButton: {
//     position: 'absolute',
//     bottom: -8,
//     left: 15,
//     right: 15,
//     backgroundColor: COLORS.white,
//     borderWidth: 1,
//     borderColor: COLORS.secondary,
//     borderRadius: 6,
//     paddingVertical: 4,
//     alignItems: 'center',
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   addText: {
//     color: COLORS.highlight,
//     fontWeight: '700',
//     fontSize: 12,
//   },

//   // Veg Icon
//   vegIconBorder: {
//     width: 14,
//     height: 14,
//     borderWidth: 1,
//     borderRadius: 3,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   vegIconDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//   },
// });


import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  TextInput,
  Animated,
  FlatList,
  Modal,
  Switch,
  TouchableWithoutFeedback
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS } from "../../theme/color";

const { width, height } = Dimensions.get("window");

// --- Mock Data ---

const BANNERS = [
  "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg",
  "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg",
  "https://img.freepik.com/premium-psd/delicious-burger-food-menu-web-banner-template_106176-414.jpg",
];

const FILTERS = [
  { id: "1", name: "All", image: "https://c.ndtvimg.com/2022-06/gp4k2jro_burgers_625x300_20_June_22.jpg" }, 
  { id: "2", name: "Chicken", image: "https://img.freepik.com/premium-photo/pizza-isolate-white-background-generative-ai_74760-2619.jpg" },
  { id: "3", name: "Paneer", image: "https://t3.ftcdn.net/jpg/00/27/57/96/360_F_27579652_d70y2kZm1c2l4i2k0j2k0j2k0j2k0j2k.jpg" },
  { id: "4", name: "Margherita", image: "https://img.freepik.com/premium-photo/pizza-isolate-white-background-generative-ai_74760-2619.jpg" },
  { id: "5", name: "Cheese", image: "https://t3.ftcdn.net/jpg/00/27/57/96/360_F_27579652_d70y2kZm1c2l4i2k0j2k0j2k0j2k0j2k.jpg" },
];

const QUICK_FILTERS = [
  { label: "Sort", icon: "options-outline" },
  { label: "Nearest", icon: "" },
  { label: "Rating 4.0+", icon: "" },
  { label: "Fast Delivery", icon: "" },
  { label: "Pure Veg", icon: "" },
  { label: "Great Offers", icon: "" },
];

const FOOD_DATA = [
  {
    id: "1",
    restaurantName: "Oven Story Pizza",
    location: "1.3 Km, Ashok Nagar",
    time: "35-40 mins",
    rating: "4.6",
    logo: "https://c.ndtvimg.com/2022-06/gp4k2jro_burgers_625x300_20_June_22.jpg", 
    offerText: "Save\n60%",
    offerSub: "up to ₹120",
    foodName: "Corn Pizza",
    price: "129",
    isVeg: true,
    foodImage: "https://t3.ftcdn.net/jpg/00/27/57/96/360_F_27579652_d70y2kZm1c2l4i2k0j2k0j2k0j2k0j2k.jpg",
  },
  {
    id: "2",
    restaurantName: "La Pino'z Pizza",
    location: "2.5 Km, Lalpur",
    time: "40-45 mins",
    rating: "4.1",
    logo: "https://imgs.search.brave.com/lPVvdmjrhC0FqB2AtLmsiGyPowDRd3SDZYbyglsDy0k/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/c2FuaXR5LmlvL2lt/YWdlcy9rYnFxM2Uwci9wcm9kdWN0aW9u/Lzc3YjE0NWNkYjcy/NTgwODlhMmU0ZWRh/NDQyYmE5YWFmMDUx/MDMxNzUtMzQweDMz/OC5wbmc_dz0zODQw/JnE9MTAw",
    offerText: "Flat\n₹100",
    offerSub: "OFF",
    foodName: "Chicken Tikka Pizza",
    price: "249",
    isVeg: false,
    foodImage: "https://img.freepik.com/premium-photo/pizza-isolate-white-background-generative-ai_74760-2619.jpg",
  },
  {
    id: "3",
    restaurantName: "Pizza Hut",
    location: "4.0 Km, Main Road",
    time: "25-30 mins",
    rating: "3.9",
    logo: "https://imgs.search.brave.com/lPVvdmjrhC0FqB2AtLmsiGyPowDRd3SDZYbyglsDy0k/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/c2FuaXR5LmlvL2lt/YWdlcy9rYnFxM2Uwci9wcm9kdWN0aW9u/Lzc3YjE0NWNkYjcy/NTgwODlhMmU0ZWRh/NDQyYmE5YWFmMDUx/MDMxNzUtMzQweDMz/OC5wbmc_dz0zODQw/JnE9MTAw",
    offerText: "Free\nDish",
    offerSub: "On ₹300",
    foodName: "Margherita Supreme",
    price: "199",
    isVeg: true,
    foodImage: "https://t3.ftcdn.net/jpg/00/27/57/96/360_F_27579652_d70y2kZm1c2l4i2k0j2k0j2k0j2k0j2k.jpg",
  },
  {
    id: "4",
    restaurantName: "Domino's Pizza",
    location: "1.8 Km, City Center",
    time: "30-35 mins",
    rating: "4.3",
    logo: "https://imgs.search.brave.com/lPVvdmjrhC0FqB2AtLmsiGyPowDRd3SDZYbyglsDy0k/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/c2FuaXR5LmlvL2lt/YWdlcy9rYnFxM2Uwci9wcm9kdWN0aW9u/Lzc3YjE0NWNkYjcy/NTgwODlhMmU0ZWRh/NDQyYmE5YWFmMDUx/MDMxNzUtMzQweDMz/OC5wbmc_dz0zODQw/JnE9MTAw",
    offerText: "50%\nOFF",
    offerSub: "on First Order",
    foodName: "Veg Extravaganza",
    price: "179",
    isVeg: true,
    foodImage: "https://img.freepik.com/premium-photo/pizza-isolate-white-background-generative-ai_74760-2619.jpg",
  },
  {
    id: "5",
    restaurantName: "Burger King",
    location: "2.0 Km, Mall Road",
    time: "20-25 mins",
    rating: "4.2",
    logo: "https://imgs.search.brave.com/lPVvdmjrhC0FqB2AtLmsiGyPowDRd3SDZYbyglsDy0k/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/c2FuaXR5LmlvL2lt/YWdlcy9rYnFxM2Uwci9wcm9kdWN0aW9u/Lzc3YjE0NWNkYjcy/NTgwODlhMmU0ZWRh/NDQyYmE5YWFmMDUx/MDMxNzUtMzQweDMz/OC5wbmc_dz0zODQw/JnE9MTAw",
    offerText: "Buy 1\nGet 1",
    offerSub: "Free",
    foodName: "Whopper Burger",
    price: "299",
    isVeg: false,
    foodImage: "https://c.ndtvimg.com/2022-06/gp4k2jro_burgers_625x300_20_June_22.jpg",
  },
];

// --- Filter Mock Data (New) ---

const SIDEBAR_ITEMS = [
  { id: 'sort', label: 'Sort By', icon: 'swap-vertical-outline' },
  { id: 'time', label: 'Time', icon: 'time-outline' },
  { id: 'rating', label: 'Rating', icon: 'star-outline' },
  { id: 'offers', label: 'Offers', icon: 'pricetag-outline' },
  { id: 'price', label: 'Dish Price', icon: 'cash-outline' },
  { id: 'trust', label: 'Trust Markers', icon: 'shield-checkmark-outline' },
  { id: 'collections', label: 'Collections', icon: 'albums-outline' },
];

const SORT_OPTIONS = [
  { label: 'Relevance (Default)', value: 'relevance' },
  { label: 'Rating: High to Low', value: 'rating_desc' },
  { label: 'Delivery Time: Low to High', value: 'time_asc' },
  { label: 'Cost: Low to High', value: 'price_asc' },
  { label: 'Cost: High to Low', value: 'price_desc' },
];

const FILTER_CONTENT = {
  time: [
    { label: 'Schedule', icon: 'calendar-outline', type: 'box' },
    { label: 'Near & Fast', icon: 'flash', type: 'box' },
  ],
  rating: [
    { label: 'Rated 3.5+', icon: 'star', type: 'box', color: 'green' },
    { label: 'Rated 4.0+', icon: 'star', type: 'box', color: 'green' },
  ],
  offers: [
    { label: 'Buy 1 Get 1 and more', type: 'pill' },
    { label: 'Deals of the Day', type: 'pill' },
  ],
  price: [
    { label: 'Under ₹200', value: '<200', type: 'price_box' },
    { label: '₹200 - ₹350', value: '200-350', type: 'price_box' },
    { label: 'Above ₹350', value: '>350', type: 'price_box' },
  ],
  trust: [
    { label: 'Pure Veg', icon: 'leaf-outline', type: 'grid' },
    { label: 'No Packaging charges', icon: 'cube-outline', type: 'grid' },
    { label: 'Low plastic packaging', icon: 'trash-outline', type: 'grid' },
    { label: 'Last 100 orders without complaints', icon: 'ribbon-outline', type: 'grid' },
    { label: 'On-time preparation', icon: 'stopwatch-outline', type: 'grid' },
    { label: 'Frequently reordered', icon: 'repeat-outline', type: 'grid' },
  ],
  collections: [
    { label: 'Previously ordered', type: 'pill' },
    { label: 'New to you', type: 'pill' },
  ]
};

// --- Sub Components ---

const BannerCarousel = () => {
  const [activeBanner, setActiveBanner] = useState(0);
  const flatListRef = useRef<FlatList<string>>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBanner((prev) => {
        let next = prev + 1;
        if (next >= BANNERS.length) next = 0;
        flatListRef.current?.scrollToIndex({ index: next, animated: true });
        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const renderBanner = ({ item }: { item: string }) => (
    <View style={styles.bannerWrapper}>
      <Image source={{ uri: item }} style={styles.heroImage} resizeMode="cover" />
      <View style={styles.bannerOverlay} />
    </View>
  );

  return (
    <View style={styles.heroContainer}>
      <FlatList
        ref={flatListRef}
        data={BANNERS}
        renderItem={renderBanner}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setActiveBanner(index);
        }}
      />
      <View style={styles.paginationContainer}>
        {BANNERS.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              activeBanner === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

// --- NEW FILTER MODAL COMPONENT ---
const FilterModal = ({ visible, onClose }: { visible: boolean, onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState('sort');
  const [selectedSort, setSelectedSort] = useState('relevance');
  
  // Render the Right Side Content based on Active Tab
  const renderRightContent = () => {
    if (activeTab === 'sort') {
      return (
        <View style={styles.filterContentContainer}>
          {SORT_OPTIONS.map((option, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.sortOptionRow} 
              onPress={() => setSelectedSort(option.value)}
            >
              <Text style={[
                styles.sortOptionText, 
                selectedSort === option.value && { color: COLORS.textPrimary, fontWeight: '700' }
              ]}>
                {option.label}
              </Text>
              <View style={[styles.radioOuter, selectedSort === option.value && { borderColor: COLORS.primary }]}>
                 {selectedSort === option.value && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      );
    }

    const data = FILTER_CONTENT[activeTab as keyof typeof FILTER_CONTENT];
    if (!data) return null;

    return (
      <View style={styles.filterContentContainer}>
        {activeTab === 'time' || activeTab === 'rating' ? (
          <View style={styles.boxContainer}>
            {data.map((item: any, index: number) => (
               <TouchableOpacity key={index} style={styles.filterBox}>
                  <Ionicons 
                    name={item.icon} 
                    size={24} 
                    color={item.color === 'green' ? '#2e7d32' : COLORS.textPrimary} 
                  />
                  <Text style={styles.boxText}>{item.label}</Text>
               </TouchableOpacity>
            ))}
          </View>
        ) : activeTab === 'price' ? (
          <View style={styles.priceContainer}>
             {data.map((item: any, index: number) => (
               <TouchableOpacity key={index} style={styles.priceBox}>
                  <Text style={styles.priceText}>₹</Text>
                  <Text style={styles.priceLabel}>{item.label}</Text>
               </TouchableOpacity>
             ))}
          </View>
        ) : activeTab === 'trust' ? (
          <View style={styles.gridContainer}>
            {data.map((item: any, index: number) => (
              <TouchableOpacity key={index} style={styles.gridItem}>
                <Ionicons name={item.icon} size={22} color={item.label === 'Pure Veg' ? 'green' : COLORS.primary} />
                <Text style={styles.gridText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.pillContainer}>
            {data.map((item: any, index: number) => (
              <TouchableOpacity key={index} style={styles.pillItem}>
                <Text style={styles.pillText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <Modal visible={visible} animationType="fade" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        
        {/* Close Button Centered above Modal */}
        <TouchableOpacity style={styles.closeButtonContainer} onPress={onClose}>
           <View style={styles.circleClose}>
              <Ionicons name="close" size={24} color={COLORS.white} />
           </View>
        </TouchableOpacity>

        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.filterHeader}>
            <Text style={styles.filterTitle}>Filters and sorting</Text>
            <TouchableOpacity>
              <Text style={styles.clearText}>Clear all</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          {/* Body */}
          <View style={{ flex: 1, flexDirection: 'row' }}>
            {/* Sidebar */}
            <View style={styles.sidebar}>
              <ScrollView 
                showsVerticalScrollIndicator={true} // ENABLED SCROLLBAR
                persistentScrollbar={true} // For Android
                indicatorStyle="black" // For iOS
              >
                {SIDEBAR_ITEMS.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <TouchableOpacity 
                      key={item.id} 
                      style={[styles.sidebarItem, isActive && styles.activeSidebarItem]}
                      onPress={() => setActiveTab(item.id)}
                    >
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                         {isActive && <View style={styles.activeIndicator} />}
                         <View style={{width: 30, alignItems: 'center'}}>
                            {item.id === 'price' ? (
                               <Text style={{fontSize: 16, color: isActive ? COLORS.primary : COLORS.textSecondary, fontWeight: '700'}}>₹</Text>
                            ) : (
                               <Ionicons 
                                  name={item.icon} 
                                  size={20} 
                                  color={isActive ? COLORS.primary : COLORS.textSecondary} 
                               />
                            )}
                         </View>
                         <View style={{width: 8}} />
                         <Text style={[styles.sidebarText, isActive && styles.activeSidebarText]}>
                           {item.label}
                         </Text>
                      </View>
                      {activeTab === 'sort' && item.id === 'sort' && (
                         <View style={styles.dot} />
                      )}
                    </TouchableOpacity>
                  )
                })}
              </ScrollView>
            </View>

            {/* Right Content */}
            <View style={styles.rightContent}>
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 20}}>
                {renderRightContent()}
              </ScrollView>
            </View>
          </View>
          
          {/* Footer Button */}
          <View style={styles.modalFooter}>
             <TouchableOpacity style={styles.applyButton} onPress={onClose}>
                <Text style={styles.applyButtonText}>Apply</Text>
             </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  );
};

const QuickFilters = () => {
  const [activeFilter, setActiveFilter] = useState("Sort");
  const [showFilterModal, setShowFilterModal] = useState(false);

  return (
    <>
      <View style={styles.quickFiltersWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickFiltersContainer}>
          {QUICK_FILTERS.map((filter, index) => {
            const isActive = activeFilter === filter.label;
            return (
              <TouchableOpacity 
                key={index} 
                style={[
                  styles.quickFilterChip, 
                  isActive && { borderColor: COLORS.primary, backgroundColor: COLORS.white }
                ]}
                onPress={() => {
                   if(filter.label === 'Sort') {
                     setShowFilterModal(true);
                   } else {
                     setActiveFilter(filter.label);
                   }
                }}
              >
                {filter.icon ? (
                  <Ionicons 
                    name={filter.icon} 
                    size={14} 
                    color={isActive ? COLORS.primary : COLORS.textPrimary} 
                    style={{ marginRight: 4 }} 
                  />
                ) : null}
                <Text style={[
                  styles.quickFilterText, 
                  isActive && { color: COLORS.primary }
                ]}>
                  {filter.label}
                </Text>
                {filter.label === "Sort" && (
                  <Ionicons 
                    name="caret-down" 
                    size={10} 
                    color={isActive ? COLORS.primary : COLORS.textPrimary} 
                    style={{marginLeft: 4}} 
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <FilterModal visible={showFilterModal} onClose={() => setShowFilterModal(false)} />
    </>
  );
};

const VegIcon = ({ isVeg }: { isVeg: boolean }) => (
  <View style={[styles.vegIconBorder, { borderColor: isVeg ? COLORS.highlight : COLORS.primary }]}>
    <View style={[styles.vegIconDot, { backgroundColor: isVeg ? COLORS.highlight : COLORS.primary }]} />
  </View>
);

const FilterSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("1");

  return (
    <View style={styles.filterContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
        {FILTERS.map((item) => {
          const isSelected = selectedCategory === item.id;
          return (
            <TouchableOpacity 
              key={item.id} 
              style={styles.filterItem}
              onPress={() => setSelectedCategory(item.id)}
            >
              <View style={[styles.filterImgContainer, isSelected && styles.activeFilterBorder]}>
                <Image source={{ uri: item.image }} style={styles.filterImage} />
              </View>
              <Text style={[styles.filterText, isSelected && styles.activeFilterText]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const RestaurantCard = ({ item, index }: { item: typeof FOOD_DATA[0]; index: number }) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <TouchableOpacity 
        style={styles.card} 
        activeOpacity={0.9}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        <View style={styles.restaurantHeader}>
          <View style={styles.logoContainer}>
            <Image source={{ uri: item.logo }} style={styles.logo} resizeMode="contain" />
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>{item.rating}</Text>
              <Ionicons name="star" size={10} color={COLORS.white} style={{ marginLeft: 2 }} />
            </View>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.resName}>{item.restaurantName}</Text>
            <Text style={styles.resMeta}>{item.location}</Text>
            <View style={styles.timeRow}>
                <MaterialCommunityIcons name="clock-time-four-outline" size={14} color={COLORS.textSecondary} />
                <Text style={styles.resMeta}> {item.time}</Text>
            </View>
            <Text style={styles.homeDelivery}>Home delivery</Text>
          </View>

          <View style={styles.offerRibbon}>
             <View style={styles.offerContent}>
                <Text style={styles.offerTitle}>{item.offerText}</Text>
                <Text style={styles.offerSub}>{item.offerSub}</Text>
             </View>
          </View>
        </View>

        <View style={styles.dashedDivider} />

        <View style={styles.foodItemRow}>
          <View style={styles.foodDetails}>
            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 4}}>
                 <VegIcon isVeg={item.isVeg} />
                 <View style={{width: 6}} />
                 {index === 0 && (
                    <View style={{backgroundColor: COLORS.accent, paddingHorizontal: 4, borderRadius: 4}}>
                        <Text style={{fontSize: 10, color: COLORS.primary, fontWeight: '600'}}>Best Seller</Text>
                    </View>
                 )}
            </View>
            <Text style={styles.foodName}>{item.foodName}</Text>
            <Text style={styles.price}>₹{item.price}</Text>
          </View>

          <View style={styles.foodImageContainer}>
            <Image source={{ uri: item.foodImage }} style={styles.foodImage} />
            <View style={styles.addButton}>
              <TouchableOpacity>
                <Text style={styles.addText}>ADD</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function FoodList() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      <View style={{ backgroundColor: COLORS.white }}>
        <View style={styles.header}>
            <View>
                <Text style={styles.subLocation}>Delatoli, Ranchi</Text>
                <Text style={styles.location}>Harmu Housing Colony</Text>
            </View>
            <View style={styles.headerIcons}>
                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="heart-outline" size={24} color={COLORS.primary} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="person-circle-outline" size={28} color={COLORS.textPrimary} />
                </TouchableOpacity>
            </View>
        </View>

        <View style={{ paddingHorizontal: 16, paddingBottom: 10 }}>
            <View style={styles.searchBar}>
                <Ionicons name="search-outline" size={20} color={COLORS.primary} />
                <TextInput
                    placeholder="Restaurant, cuisine or dish"
                    placeholderTextColor={COLORS.muted}
                    style={styles.searchInput}
                />
                <TouchableOpacity>
                    <Ionicons name="mic-outline" size={18} color={COLORS.primary} />
                </TouchableOpacity>
            </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <BannerCarousel />

        <FilterSection />

        <QuickFilters />

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Recommended</Text>
          <FlatList
            horizontal
            data={FOOD_DATA.slice(0, 3)}
            renderItem={({ item, index }: { item: typeof FOOD_DATA[0]; index: number }) => (
              <RestaurantCard item={item} index={index} />
            )}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 16 }}
          />
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Veg Options</Text>
          <FlatList
            horizontal
            data={FOOD_DATA.filter(item => item.isVeg).slice(0, 3)}
            renderItem={({ item, index }: { item: typeof FOOD_DATA[0]; index: number }) => (
              <RestaurantCard item={item} index={index} />
            )}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 16 }}
          />
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Non-Veg Options</Text>
          <FlatList
            horizontal
            data={FOOD_DATA.filter(item => !item.isVeg).slice(0, 3)}
            renderItem={({ item, index }: { item: typeof FOOD_DATA[0]; index: number }) => (
              <RestaurantCard item={item} index={index} />
            )}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 16 }}
          />
        </View>
        
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  
  header: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  subLocation: { fontSize: 13, color: COLORS.textSecondary, fontWeight: "500" },
  location: { fontSize: 16, fontWeight: "700", color: COLORS.textPrimary, marginTop: 4 },
  headerIcons: { flexDirection: "row", gap: 8 },
  iconButton: { padding: 8, borderRadius: 50 },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.background, 
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 44,
  },
  searchInput: { marginLeft: 10, fontSize: 14, flex: 1, color: COLORS.textPrimary },

  heroContainer: {
    width: width,
    height: 220,
    backgroundColor: COLORS.secondary,
    position: 'relative',
  },
  bannerWrapper: {
    width: width,
    height: 220,
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  bannerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 12,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  activeDot: {
    backgroundColor: COLORS.white,
    width: 20,
  },
  inactiveDot: {
    backgroundColor: 'rgba(255,255,255,0.5)',
  },

  filterContainer: {
    backgroundColor: COLORS.white,
    paddingVertical: 16,
    marginBottom: 1,
  },
  filterItem: {
    alignItems: "center",
    marginRight: 20,
  },
  filterImgContainer: {
    width: 55,
    height: 55,
    borderRadius: 30,
    overflow: "hidden",
    marginBottom: 6,
    borderWidth: 2,
    borderColor: 'transparent', 
  },
  activeFilterBorder: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    padding: 2, 
  },
  filterImage: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },
  filterText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: "500",
  },
  activeFilterText: {
    color: COLORS.textPrimary,
    fontWeight: "700",
  },

  quickFiltersWrapper: {
    backgroundColor: COLORS.white,
    paddingVertical: 10,
    marginBottom: 10,
  },
  quickFiltersContainer: {
    paddingHorizontal: 16,
    gap: 10,
  },
  quickFilterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    backgroundColor: COLORS.white,
  },
  quickFilterText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },

  sectionContainer: {
    backgroundColor: COLORS.white,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textPrimary,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginRight: 5,
    width: width * 0.85,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    overflow: "hidden", 
    marginLeft: 20,
    marginBottom: 5,
  },
  
  restaurantHeader: {
    flexDirection: "row",
    padding: 12,
  },
  logoContainer: {
    alignItems: 'center',
    marginRight: 12,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.secondary,
  },
  ratingBadge: {
    position: 'absolute',
    bottom: -6,
    backgroundColor: COLORS.highlight, 
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    zIndex: 2,
  },
  ratingText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '700',
  },

  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  resName: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  resMeta: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  homeDelivery: {
    fontSize: 10,
    color: COLORS.primary, 
    fontWeight: "600",
  },

  offerRibbon: {
    backgroundColor: COLORS.primary, 
    width: 70,
    marginRight: -12, 
    marginTop: -12, 
    marginBottom: -12, 
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 16, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  offerContent: {
    alignItems: 'center',
  },
  offerTitle: {
    color: COLORS.white,
    fontWeight: "800",
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 16,
  },
  offerSub: {
    color: COLORS.white,
    fontSize: 10,
    marginTop: 2,
  },

  dashedDivider: {
    height: 1,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    borderStyle: 'dashed', 
    marginHorizontal: 12,
    marginVertical: 4,
  },

  foodItemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
  },
  foodDetails: {
    flex: 1,
  },
  foodName: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  price: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  foodImageContainer: {
    position: 'relative',
  },
  foodImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: COLORS.secondary,
  },
  addButton: {
    position: 'absolute',
    bottom: -8,
    left: 15,
    right: 15,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    borderRadius: 6,
    paddingVertical: 4,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  addText: {
    color: COLORS.highlight,
    fontWeight: '700',
    fontSize: 12,
  },

  vegIconBorder: {
    width: 14,
    height: 14,
    borderWidth: 1,
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  vegIconDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  // --- NEW MODAL STYLES ---
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  
  // Adjusted Close Button Position
  closeButtonContainer: {
     alignSelf: 'center',
     marginBottom: 10,
  },
  circleClose: {
     backgroundColor: '#333',
     padding: 8,
     borderRadius: 30,
     elevation: 5,
     shadowColor: '#000',
     shadowOpacity: 0.3,
     shadowRadius: 3,
  },

  modalContent: {
    backgroundColor: COLORS.white,
    height: '85%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 24,
  },
  filterTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  clearText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
  },
  sidebar: {
    width: '30%',
    backgroundColor: '#f4f6f8',
  },
  sidebarItem: {
    paddingVertical: 18,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb',
    position: 'relative',
  },
  activeSidebarItem: {
    backgroundColor: COLORS.white,
  },
  activeIndicator: {
    position: 'absolute',
    left: -12,
    top: -20, 
    bottom: -20,
    width: 4,
    backgroundColor: COLORS.primary,
    height: 80, 
  },
  sidebarText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '500',
    flex: 1,
  },
  activeSidebarText: {
    color: COLORS.textPrimary,
    fontWeight: '700',
  },
  dot: {
    position: 'absolute',
    right: 8,
    top: 20,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.highlight,
  },
  rightContent: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.white,
  },
  
  // Specific Filter UI
  filterContentContainer: {
    paddingBottom: 20,
  },
  sortOptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  sortOptionText: {
    fontSize: 15,
    color: COLORS.textSecondary,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  
  // Box Styles (Time/Rating)
  boxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  filterBox: {
    width: '47%',
    aspectRatio: 1.2,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    elevation: 2,
  },
  boxText: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  
  // Price Styles
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceBox: {
    width: '31%',
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 4,
  },
  priceLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  
  // Trust/Grid Styles
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    height: 100,
    justifyContent: 'center',
  },
  gridText: {
    marginTop: 8,
    fontSize: 12,
    textAlign: 'center',
    color: COLORS.textSecondary,
    lineHeight: 16,
  },
  
  // Pill Styles (Offers/Collections)
  pillContainer: {
     flexDirection: 'row',
     flexWrap: 'wrap',
     gap: 10,
  },
  pillItem: {
     paddingHorizontal: 16,
     paddingVertical: 10,
     borderRadius: 20,
     borderWidth: 1,
     borderColor: '#eee',
  },
  pillText: {
     fontSize: 14,
     color: COLORS.textPrimary,
  },
  
  modalFooter: {
     padding: 16,
     borderTopWidth: 1,
     borderTopColor: '#eee',
  },
  applyButton: {
     backgroundColor: COLORS.primary,
     paddingVertical: 14,
     borderRadius: 12,
     alignItems: 'center',
  },
  applyButtonText: {
     color: COLORS.white,
     fontSize: 16,
     fontWeight: '700',
  }
});