// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   StatusBar,
//   SafeAreaView,
//   FlatList,
//   Dimensions,
// } from "react-native";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// // --- YOUR THEME COLORS ---
// export const COLORS = {
//   primary: '#0049AD',    // Deep Purple/Blue
//   accent: '#9facf8ff',     // Lavender
//   secondary: '#b6d2f8ff',  // Soft Pink/Blue
//   highlight: '#52b957ff',  // Green (Ratings)
//   background: '#fafafa', 
//   white: '#ffffff',       
//   textPrimary: '#222222', 
//   textSecondary: '#4a4a4a', 
//   muted: '#888888',       
//   yelow: '#fbc02d',       
//   black: '#000000',
//   RED: '#b91c1c',     
//   SOFT_BLUE: "#DBEAFE",
//   LITE_GRAY: "#9ca3af",
//   BORDER: "#e2e8f0"
// };

// const { width } = Dimensions.get("window");

// // --- MOCK DATA BASED ON VIDEO ---
// const CATEGORIES = [
//   { id: 1, name: "All", image: "https://cdn-icons-png.flaticon.com/512/706/706164.png" }, // Placeholder
//   { id: 2, name: "North Indian", image: "https://cdn-icons-png.flaticon.com/512/3448/3448099.png" },
//   { id: 3, name: "Dosa", image: "https://cdn-icons-png.flaticon.com/512/3014/3014527.png" },
//   { id: 4, name: "South Indian", image: "https://cdn-icons-png.flaticon.com/512/11568/11568949.png" },
//   { id: 5, name: "Pizzas", image: "https://cdn-icons-png.flaticon.com/512/1404/1404945.png" },
// ];

// const RESTAURANTS = [
//   {
//     id: "r1",
//     name: "KFC",
//     rating: "4.3",
//     time: "25-30 mins",
//     reviews: "9.6K+",
//     isAd: true,
//     items: [
//       {
//         id: "f1",
//         name: "1 x Chicken Zinger Burger",
//         price: 249.91,
//         originalPrice: 260,
//         image: "https://images.unsplash.com/photo-1619250907572-1329c4456905?w=500&auto=format&fit=crop&q=60",
//         isVeg: false,
//       },
//       {
//         id: "f2",
//         name: "1 x Veg Longer Burger",
//         price: 232.61,
//         originalPrice: 245,
//         image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&auto=format&fit=crop&q=60",
//         isVeg: true,
//       },
//       {
//         id: "f3",
//         name: "1 x Hot Wings (4pc)",
//         price: 180.00,
//         originalPrice: 200,
//         image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&auto=format&fit=crop&q=60",
//         isVeg: false,
//       }
//     ]
//   },
//   {
//     id: "r2",
//     name: "Burger King",
//     rating: "4.0",
//     time: "30-35 mins",
//     reviews: "New",
//     isAd: false,
//     items: [
//       {
//         id: "b1",
//         name: "1 x BK Chicken Burger",
//         price: 185.55,
//         originalPrice: 199,
//         image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60",
//         isVeg: false,
//       },
//       {
//         id: "b2",
//         name: "1 x Veg Krisper Burger",
//         price: 211.61,
//         originalPrice: 230,
//         image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=500&auto=format&fit=crop&q=60",
//         isVeg: true,
//       },
//     ]
//   },
//   {
//     id: "r3",
//     name: "Hotel Bliss",
//     rating: "4.1",
//     time: "20-25 mins",
//     reviews: "5.1K+",
//     isAd: false,
//     items: [
//       {
//         id: "h1",
//         name: "1 x [Non Veg] Mini Thali",
//         price: 232.95,
//         originalPrice: 300,
//         image: "https://images.unsplash.com/photo-1546833999-b9f581602809?w=500&auto=format&fit=crop&q=60",
//         isVeg: false,
//       },
//       {
//         id: "h2",
//         name: "1 x Onion Uttapam",
//         price: 169.20,
//         originalPrice: 190,
//         image: "https://images.unsplash.com/photo-1630409346824-4f0e7b040deb?w=500&auto=format&fit=crop&q=60",
//         isVeg: true,
//       },
//     ]
//   },
//   {
//     id: "r4",
//     name: "WOW! China",
//     rating: "3.9",
//     time: "30-35 mins",
//     reviews: "1.6K+",
//     isAd: true,
//     items: [
//       {
//         id: "w1",
//         name: "1 x Chilli Garlic Noodles",
//         price: 240.08,
//         originalPrice: 280,
//         image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=60",
//         isVeg: true,
//       },
//       {
//         id: "w2",
//         name: "1 x Chicken Hakka",
//         price: 260.00,
//         originalPrice: 290,
//         image: "https://images.unsplash.com/photo-1552611052-33e04de081de?w=500&auto=format&fit=crop&q=60",
//         isVeg: false,
//       },
//     ]
//   }
// ];

// const MealsUnderScreen = () => {
//   const [selectedCategory, setSelectedCategory] = useState("All");

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
//       {/* Main Vertical Scroll */}
//       <ScrollView 
//         style={styles.container} 
//         showsVerticalScrollIndicator={false}
//         stickyHeaderIndices={[2]} // Make Quick Filters Sticky
//       >
        
//         {/* 1. Top Banner (Static Image Simulation) */}
//         <View style={styles.bannerContainer}>
//             <Text style={styles.bannerTitle}>MEALS UNDER ₹250</Text>
//             <Text style={styles.bannerSub}>FINAL PRICE, BEST OFFER APPLIED</Text>
//             <Ionicons name="fast-food-outline" size={60} color={COLORS.SOFT_BLUE} style={styles.bannerIcon} />
//         </View>

//         {/* 2. Horizontal Category Filter */}
//         <View style={styles.categoryContainer}>
//           <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingRight: 16}}>
//             {CATEGORIES.map((cat) => (
//               <TouchableOpacity 
//                 key={cat.id} 
//                 style={[
//                     styles.catItem, 
//                     selectedCategory === cat.name && styles.catItemSelected
//                 ]}
//                 onPress={() => setSelectedCategory(cat.name)}
//               >
//                 <Image source={{ uri: cat.image }} style={styles.catImage} />
//                 <Text style={[
//                     styles.catText,
//                     selectedCategory === cat.name && { color: COLORS.primary, fontWeight: '700' }
//                 ]}>
//                     {cat.name}
//                 </Text>
//                 {selectedCategory === cat.name && <View style={styles.activeLine} />}
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//         </View>

//         {/* 3. Sticky Quick Filters */}
//         <View style={styles.quickFilterContainer}>
//           <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingRight: 16}}>
//             <TouchableOpacity style={styles.filterPill}>
//                 <Text style={styles.filterText}>Sort</Text>
//                 <Ionicons name="caret-down-outline" size={12} color={COLORS.textPrimary} />
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.filterPill}>
//                 <Ionicons name="flash" size={12} color={COLORS.highlight} style={{marginRight: 4}} />
//                 <Text style={styles.filterText}>Near & Fast</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.filterPill}>
//                 <Text style={styles.filterText}>New to you</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.filterPill}>
//                 <Text style={styles.filterText}>Pure Veg</Text>
//             </TouchableOpacity>
//           </ScrollView>
//         </View>

//         {/* 4. Restaurant Cards List */}
//         <View style={styles.restaurantList}>
//             {RESTAURANTS.map((restaurant) => (
//                 <View key={restaurant.id} style={styles.restaurantCard}>
//                     {/* Header: Name & Rating */}
//                     <View style={styles.cardHeader}>
//                         <View>
//                             <Text style={styles.resName}>{restaurant.name}</Text>
//                             <View style={styles.resMetaRow}>
//                                 <Ionicons name="flash-outline" size={12} color={COLORS.highlight} />
//                                 <Text style={styles.resTime}>{restaurant.time}</Text>
//                                 {restaurant.isAd && <Text style={styles.adTag}>Ad</Text>}
//                             </View>
//                         </View>
                        
//                         <View style={styles.ratingBox}>
//                             <View style={styles.ratingBadge}>
//                                 <Ionicons name="star" size={10} color={COLORS.white} />
//                                 <Text style={styles.ratingText}>{restaurant.rating}</Text>
//                             </View>
//                             <Text style={styles.reviewText}>{restaurant.reviews}</Text>
//                         </View>
//                     </View>

//                     {/* --- HORIZONTAL FOOD SCROLL --- */}
//                     <ScrollView 
//                         horizontal 
//                         showsHorizontalScrollIndicator={false}
//                         contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
//                     >
//                         {restaurant.items.map((item) => (
//                             <View key={item.id} style={styles.foodItemCard}>
//                                 {/* Food Image */}
//                                 <View style={styles.foodImgWrapper}>
//                                     <Image source={{ uri: item.image }} style={styles.foodImage} />
//                                     {/* Veg/NonVeg Icon */}
//                                     <View style={styles.vegIconBox}>
//                                         <MaterialCommunityIcons 
//                                             name="checkbox-blank-circle" 
//                                             size={10} 
//                                             color={item.isVeg ? COLORS.highlight : COLORS.RED} 
//                                         />
//                                     </View>
//                                 </View>

//                                 {/* Food Details */}
//                                 <View style={styles.foodInfo}>
//                                     <Text style={styles.foodName} numberOfLines={2}>{item.name}</Text>
                                    
//                                     <View style={styles.priceRow}>
//                                         <Text style={styles.finalPrice}>₹{item.price}</Text>
//                                         <Text style={styles.originalPrice}>₹{item.originalPrice}</Text>
//                                     </View>
//                                     <Text style={styles.offerText}>Best offer applied</Text>
//                                 </View>

//                                 {/* View Cart Button */}
//                                 <TouchableOpacity style={styles.viewCartBtn}>
//                                     <Text style={styles.viewCartText}>View cart</Text>
//                                     <Ionicons name="caret-forward" size={10} color={COLORS.primary} />
//                                 </TouchableOpacity>
//                             </View>
//                         ))}
//                     </ScrollView>

//                     {/* Footer: View Full Menu */}
//                     <TouchableOpacity style={styles.cardFooter}>
//                         <Text style={styles.footerText}>View full menu</Text>
//                         <Ionicons name="chevron-forward" size={14} color={COLORS.textSecondary} />
//                     </TouchableOpacity>
//                 </View>
//             ))}
//         </View>

//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },
//   container: {
//     flex: 1,
//   },
  
//   // Banner
//   bannerContainer: {
//     backgroundColor: COLORS.secondary, // Theme usage
//     padding: 20,
//     alignItems: 'center',
//     marginBottom: 10,
//     overflow: 'hidden',
//     position: 'relative',
//     height: 120,
//     justifyContent: 'center'
//   },
//   bannerTitle: {
//     fontSize: 22,
//     fontWeight: '900',
//     color: COLORS.primary,
//     letterSpacing: 1,
//   },
//   bannerSub: {
//     fontSize: 12,
//     color: COLORS.textSecondary,
//     fontWeight: '700',
//     marginTop: 4,
//     backgroundColor: COLORS.accent,
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//     color: COLORS.white
//   },
//   bannerIcon: {
//       position: 'absolute',
//       right: -10,
//       bottom: -10,
//       opacity: 0.5
//   },

//   // Categories
//   categoryContainer: {
//     backgroundColor: COLORS.white,
//     paddingVertical: 10,
//   },
//   catItem: {
//     alignItems: 'center',
//     marginHorizontal: 12,
//     paddingBottom: 4,
//   },
//   catItemSelected: {
//     // borderBottomWidth: 3,
//     // borderBottomColor: COLORS.primary
//   },
//   catImage: {
//     width: 50,
//     height: 50,
//     marginBottom: 6,
//     borderRadius: 25,
//     backgroundColor: COLORS.SOFT_BLUE
//   },
//   catText: {
//     fontSize: 12,
//     color: COLORS.textSecondary,
//     fontWeight: '500',
//   },
//   activeLine: {
//       height: 3,
//       width: 20,
//       backgroundColor: COLORS.primary,
//       marginTop: 4,
//       borderRadius: 2
//   },

//   // Quick Filters
//   quickFilterContainer: {
//     backgroundColor: COLORS.white,
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.BORDER,
//     paddingLeft: 16,
//     elevation: 2, // Shadow for stickiness
//   },
//   filterPill: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: COLORS.white,
//     borderWidth: 1,
//     borderColor: COLORS.LITE_GRAY,
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     borderRadius: 20,
//     marginRight: 10,
//   },
//   filterText: {
//     fontSize: 12,
//     fontWeight: '600',
//     color: COLORS.textPrimary,
//     marginRight: 4,
//   },

//   // Restaurant List
//   restaurantList: {
//       paddingBottom: 40,
//       backgroundColor: COLORS.background
//   },
//   restaurantCard: {
//       backgroundColor: COLORS.white,
//       marginBottom: 16,
//       paddingTop: 16,
//       borderBottomWidth: 1,
//       borderBottomColor: COLORS.BORDER
//   },
//   cardHeader: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       paddingHorizontal: 16,
//       marginBottom: 4
//   },
//   resName: {
//       fontSize: 18,
//       fontWeight: '800',
//       color: COLORS.textPrimary,
//       marginBottom: 4
//   },
//   resMetaRow: {
//       flexDirection: 'row',
//       alignItems: 'center',
//   },
//   resTime: {
//       fontSize: 12,
//       color: COLORS.textSecondary,
//       marginLeft: 4,
//       fontWeight: '500'
//   },
//   adTag: {
//       fontSize: 10,
//       color: COLORS.muted,
//       marginLeft: 8,
//       backgroundColor: COLORS.SOFT_BLUE,
//       paddingHorizontal: 4,
//       borderRadius: 2
//   },
//   ratingBox: {
//       alignItems: 'center'
//   },
//   ratingBadge: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       backgroundColor: COLORS.highlight, // Green
//       paddingHorizontal: 6,
//       paddingVertical: 2,
//       borderRadius: 6,
//       marginBottom: 2
//   },
//   ratingText: {
//       color: COLORS.white,
//       fontWeight: '700',
//       fontSize: 12,
//       marginLeft: 2
//   },
//   reviewText: {
//       fontSize: 10,
//       color: COLORS.muted
//   },

//   // Food Items Horizontal Scroll
//   foodItemCard: {
//       width: 160,
//       marginRight: 16,
//   },
//   foodImgWrapper: {
//       position: 'relative',
//       marginBottom: 8
//   },
//   foodImage: {
//       width: 160,
//       height: 110,
//       borderRadius: 12,
//       backgroundColor: COLORS.SOFT_BLUE,
//       resizeMode: 'cover'
//   },
//   vegIconBox: {
//       position: 'absolute',
//       top: 8,
//       right: 8,
//       backgroundColor: 'rgba(255,255,255,0.9)',
//       padding: 2,
//       borderRadius: 4,
//       borderWidth: 1,
//       borderColor: COLORS.highlight // Or Red depending on item
//   },
//   foodInfo: {
//       marginBottom: 10
//   },
//   foodName: {
//       fontSize: 13,
//       fontWeight: '600',
//       color: COLORS.textPrimary,
//       height: 36, // Fixed height for 2 lines
//   },
//   priceRow: {
//       flexDirection: 'row',
//       alignItems: 'baseline',
//       marginTop: 4
//   },
//   finalPrice: {
//       fontSize: 14,
//       fontWeight: '700',
//       color: COLORS.textPrimary
//   },
//   originalPrice: {
//       fontSize: 12,
//       textDecorationLine: 'line-through',
//       color: COLORS.muted,
//       marginLeft: 6
//   },
//   offerText: {
//       fontSize: 10,
//       color: COLORS.primary, // Using Theme Primary (Blue)
//       fontWeight: '500',
//       marginTop: 2
//   },
//   viewCartBtn: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       justifyContent: 'center',
//       borderWidth: 1,
//       borderColor: COLORS.primary, // Theme Border
//       borderRadius: 8,
//       paddingVertical: 6,
//       backgroundColor: COLORS.white
//   },
//   viewCartText: {
//       fontSize: 12,
//       fontWeight: '700',
//       color: COLORS.primary, // Theme Text
//       marginRight: 4
//   },

//   // Card Footer
//   cardFooter: {
//       flexDirection: 'row',
//       justifyContent: 'center',
//       alignItems: 'center',
//       paddingVertical: 12,
//       borderTopWidth: 1,
//       borderTopColor: COLORS.SOFT_BLUE
//   },
//   footerText: {
//       fontSize: 12,
//       fontWeight: '600',
//       color: COLORS.textSecondary,
//       marginRight: 4
//   }
// });

// export default MealsUnderScreen;


import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../theme/color";
import { useGetDiscountedVendors } from "../../api/hooks/useDiscountedVendors";
import { useGetAllCategory } from "../../api/hooks/getAllCategory";

const { width } = Dimensions.get("window");


const MealsUnderScreen = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState("all");
  const navigation = useNavigation();
  
  const { data: categoriesData, isLoading: categoriesLoading } = useGetAllCategory({});
  const categories = [
    { 
      id: "all", 
      name: "All", 
      image: { url: "https://b.zmtcdn.com/data/o2_assets/52eb9796bb9bcf0eba64c643349e97211634401116.png" } 
    },
    ...(categoriesData || []),
  ];

  const { data, isLoading: loading } = useGetDiscountedVendors({ 
    limit: 10, 
    page: 1, 
    categoryId: selectedCategoryId === "all" ? undefined : selectedCategoryId 
  });
  
  const restaurants = data?.vendors || [];
  const filteredRestaurants = restaurants; // Filtering now handled server-side




  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      {/* 3. FIXED HEADER with Back Button */}
      <View style={styles.headerBar}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
              <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Meals Under ₹250</Text>
          <View style={{width: 40}} /> 
      </View>

      {/* Main Vertical Scroll */}
      <ScrollView 
        style={styles.container} 
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[2]} // Sticky Filters
      >
        
        {/* 1. Attractive Top Banner */}
        <View style={styles.bannerContainer}>
            <View style={styles.bannerContent}>
                <View>
                    <Text style={styles.bannerTitle}>BUDGET EATS</Text>
                    <Text style={styles.bannerSub}>Best offers applied automatically!</Text>
                </View>
                <View style={styles.bannerIconCircle}>
                    <Ionicons name="wallet-outline" size={32} color={COLORS.primary} />
                </View>
            </View>
        </View>

        {/* 2. Horizontal Category Filter */}
        <View style={styles.categoryContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingRight: 16}}>
            {categoriesLoading ? (
              <View style={{ padding: 10 }}>
                <ActivityIndicator size="small" color={COLORS.primary} />
              </View>
            ) : categories.map((cat: any) => (
              <TouchableOpacity 
                key={cat.id} 
                style={styles.catItem}
                onPress={() => setSelectedCategoryId(cat.id.toString())}
                activeOpacity={0.8}
              >
                <View style={[
                    styles.catImgContainer,
                    selectedCategoryId === cat.id.toString() && styles.catImgSelected
                ]}>
                    <Image source={{ uri: cat.image?.url }} style={styles.catImage} />
                </View>
                <Text style={[
                    styles.catText,
                    selectedCategoryId === cat.id.toString() && { color: COLORS.primary, fontWeight: '700' }
                ]}>
                    {cat.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* 3. Sticky Quick Filters */}
        <View style={styles.quickFilterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingRight: 16}}>
            <TouchableOpacity style={styles.filterPill}>
                <Text style={styles.filterText}>Sort</Text>
                <Ionicons name="caret-down-outline" size={12} color={COLORS.textPrimary} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.filterPill, {borderColor: COLORS.highlight, backgroundColor: COLORS.SOFT_GREEN}]}>
                <Ionicons name="flash" size={12} color={COLORS.highlight} style={{marginRight: 4}} />
                <Text style={[styles.filterText, {color: COLORS.highlight}]}>Near & Fast</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.filterPill}>
                <Text style={styles.filterText}>New to you</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.filterPill}>
                <Text style={styles.filterText}>Pure Veg</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* 4. Restaurant Cards List */}
        <View style={styles.restaurantList}>
            {loading ? (
                <View style={{ padding: 40, alignItems: "center" }}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
            ) : filteredRestaurants.length === 0 ? (
                <View style={{ padding: 40, alignItems: "center" }}>
                    <Text style={{ color: COLORS.textSecondary }}>No discounted meals found right now.</Text>
                </View>
            ) : (
                filteredRestaurants.map((restaurant: any) => {
                    // Skip if vendor has no discounted items
                    if (!restaurant.items || restaurant.items.length === 0) return null;

                    return (
                        <View key={restaurant.id} style={styles.restaurantCard}>
                            {/* Header: Name & Rating */}
                            <View style={styles.cardHeader}>
                                <View style={{flex: 1}}>
                                    <Text style={styles.resName}>{restaurant.name}</Text>
                                    <View style={styles.resMetaRow}>
                                        <View style={styles.timeBadge}>
                                            <Ionicons name="time-outline" size={12} color={COLORS.primary} />
                                            <Text style={styles.resTime}>{restaurant.time}</Text>
                                        </View>
                                        {restaurant.isAd && <Text style={styles.adTag}>Ad</Text>}
                                    </View>
                                </View>
                                
                                <View style={styles.ratingBox}>
                                    <View style={styles.ratingBadge}>
                                        <Text style={styles.ratingText}>{restaurant.rating}</Text>
                                        <Ionicons name="star" size={10} color={COLORS.white} />
                                    </View>
                                    <Text style={styles.reviewText}>{restaurant.reviews}</Text>
                                </View>
                            </View>

                            {/* --- HORIZONTAL FOOD SCROLL --- */}
                            <ScrollView 
                                horizontal 
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
                            >
                                {restaurant.items.map((item: any) => (
                                    <View key={item.id} style={styles.foodItemCard}>
                                        {/* Food Image Area */}
                                        <View style={styles.foodImgWrapper}>
                                            <Image source={{ uri: item.image }} style={styles.foodImage} />
                                            <View style={styles.vegIconBox}>
                                                <MaterialCommunityIcons 
                                                    name="checkbox-blank-circle" 
                                                    size={10} 
                                                    color={item.isVeg ? COLORS.highlight : COLORS.RED} 
                                                />
                                            </View>
                                            {/* Discount Tag on Image */}
                                            <View style={styles.imageOfferTag}>
                                                <Text style={styles.imageOfferText}>₹{Math.round(item.price)}</Text>
                                            </View>
                                        </View>

                                        {/* Food Details */}
                                        <View style={styles.foodInfo}>
                                            <Text style={styles.foodName} numberOfLines={2}>{item.name}</Text>
                                            {item.originalPrice > item.price && (
                                              <Text style={[styles.offerText, { textDecorationLine: 'line-through', color: COLORS.muted }]}>
                                                  ₹{Math.round(item.originalPrice)}
                                              </Text>
                                            )}
                                            {item.appliedCoupon && (
                                                <Text style={styles.offerText}>{item.appliedCoupon.code} Applied</Text>
                                            )}
                                        </View>

                                        {/* Attractive Add Button */}
                                        <TouchableOpacity style={styles.viewCartBtn} activeOpacity={0.7}>
                                            <Text style={styles.viewCartText}>ADD</Text>
                                            <Ionicons name="add" size={14} color={COLORS.primary} />
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </ScrollView>

                            {/* Footer: View Full Menu */}
                            <TouchableOpacity style={styles.cardFooter}>
                                <Text style={styles.footerText}>Explore Full Menu</Text>
                                <Ionicons name="chevron-forward-circle" size={16} color={COLORS.primary} />
                            </TouchableOpacity>
                        </View>
                    );
                })
            )}
        </View>


      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
  },

  // --- HEADER STYLES ---
  headerBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: COLORS.white,
      borderBottomWidth: 1,
      borderBottomColor: '#f0f0f0',
      elevation: 3,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      zIndex: 10,
  },
  backButton: {
      padding: 8,
      marginLeft: -8,
  },
  headerTitle: {
      fontSize: 18,
      fontWeight: '800',
      color: COLORS.textPrimary,
      textTransform: 'uppercase',
      letterSpacing: 0.5
  },
  
  // Banner
  bannerContainer: {
    backgroundColor: COLORS.white, 
    margin: 16,
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {width:0, height: 4}
  },
  bannerContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
  bannerSub: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '600',
    marginTop: 4,
  },
  bannerIconCircle: {
      backgroundColor: COLORS.white,
      padding: 10,
      borderRadius: 30,
  },

  // Categories
  categoryContainer: {
    backgroundColor: COLORS.white,
    paddingVertical: 10,
  },
  catItem: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  catImgContainer: {
    padding: 3,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'transparent',
    marginBottom: 6,
    backgroundColor: COLORS.white,
    elevation: 2
  },
  catImgSelected: {
      borderColor: COLORS.primary
  },
  catImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  catText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },

  // Quick Filters
  quickFilterContainer: {
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee', // Updated to handle missing BORDER key safely
    paddingLeft: 16,
    // elevation: 4, 
    // shadowColor: "#000",
    // shadowOpacity: 0.05,
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginRight: 4,
  },

  // Restaurant List
  restaurantList: {
      paddingBottom: 40,
      backgroundColor: COLORS.background
  },
  restaurantCard: {
      backgroundColor: COLORS.white,
      marginBottom: 16,
      paddingTop: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#eee', // Updated to handle missing BORDER key safely
      marginHorizontal: 0,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 5,
      elevation: 2
  },
  cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      marginBottom: 8
  },
  resName: {
      fontSize: 18,
      fontWeight: '800',
      color: COLORS.textPrimary,
      marginBottom: 6
  },
  resMetaRow: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  timeBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#f3f4f6',
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 4
  },
  resTime: {
      fontSize: 11,
      color: COLORS.textSecondary,
      marginLeft: 4,
      fontWeight: '700'
  },
  adTag: {
      fontSize: 10,
      color: COLORS.muted,
      marginLeft: 8,
      borderWidth: 1,
      borderColor: COLORS.LITE_GRAY,
      paddingHorizontal: 4,
      borderRadius: 4,
      textTransform: 'uppercase'
  },
  ratingBox: {
      alignItems: 'center'
  },
  ratingBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: COLORS.highlight, 
      paddingHorizontal: 6,
      paddingVertical: 4,
      borderRadius: 6,
      marginBottom: 2
  },
  ratingText: {
      color: COLORS.white,
      fontWeight: '800',
      fontSize: 12,
      marginRight: 2
  },
  reviewText: {
      fontSize: 10,
      color: COLORS.muted,
      fontWeight: '500'
  },

  // Food Items
  foodItemCard: {
      width: 150,
      marginRight: 16,
      backgroundColor: COLORS.white,
      borderRadius: 12,
      paddingBottom: 4
  },
  foodImgWrapper: {
      position: 'relative',
      marginBottom: 10,
      borderRadius: 12,
      overflow: 'hidden',
      elevation: 2
  },
  foodImage: {
      width: 150,
      height: 140, 
      resizeMode: 'cover'
  },
  vegIconBox: {
      position: 'absolute',
      top: 8,
      right: 8,
      backgroundColor: 'rgba(255,255,255,0.95)',
      padding: 2,
      borderRadius: 4,
      elevation: 2
  },
  imageOfferTag: {
      position: 'absolute',
      bottom: 8,
      left: 8,
      backgroundColor: COLORS.white,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 4,
      elevation: 2
  },
  imageOfferText: {
      fontSize: 12,
      fontWeight: '800',
      color: COLORS.textPrimary
  },
  foodInfo: {
      marginBottom: 10,
      paddingHorizontal: 2
  },
  foodName: {
      fontSize: 12,
      fontWeight: '700',
      color: COLORS.textPrimary,
      height: 39,
      lineHeight: 18
  },
  offerText: {
      fontSize: 10,
      color: COLORS.highlight,
      fontWeight: '700',
      marginTop: 4,
      textTransform: 'uppercase'
  },
  
  // Add Button
  viewCartBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: COLORS.primary,
      borderRadius: 8,
      paddingVertical: 8,
      backgroundColor: COLORS.secondary // Using Secondary (Soft Pink/Blue) for tint
  },
  viewCartText: {
      fontSize: 13,
      fontWeight: '900',
      color: COLORS.primary, 
      marginRight: 4
  },

  // Card Footer
  cardFooter: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 14,
      borderTopWidth: 1,
      borderTopColor: '#f3f4f6',
      marginTop: 4
  },
  footerText: {
      fontSize: 12,
      fontWeight: '700',
      color: COLORS.primary,
      marginRight: 6,
      textTransform: 'uppercase',
      letterSpacing: 0.5
  }
});

export default MealsUnderScreen;