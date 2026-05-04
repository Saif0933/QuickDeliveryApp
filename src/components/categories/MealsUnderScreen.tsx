import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
    Dimensions,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS } from "../../theme/color";

const { width } = Dimensions.get("window");

const STATIC_RETAIL_STORES = [
  {
    id: "s1",
    name: "ZARA",
    rating: "4.8",
    time: "Free Delivery",
    reviews: "12K+",
    isAd: true,
    logo: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&q=80",
    items: [
      {
        id: "p1",
        name: "Basic White Tee",
        price: 499,
        originalPrice: 799,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
        isEco: true,
      },
      {
        id: "p2",
        name: "Slim Fit Chinos",
        price: 899,
        originalPrice: 1299,
        image: "https://images.unsplash.com/photo-1473966968600-fa804b869628?w=500&q=80",
        isEco: false,
      },
      {
        id: "p3",
        name: "Casual Polo",
        price: 649,
        originalPrice: 999,
        image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&q=80",
        isEco: true,
      }
    ]
  },
  {
    id: "s2",
    name: "NIKE",
    rating: "4.9",
    time: "Free Delivery",
    reviews: "NEW",
    isAd: false,
    logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
    items: [
      {
        id: "n1",
        name: "Training Shorts",
        price: 749,
        originalPrice: 999,
        image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&q=80",
        isEco: true,
      },
      {
        id: "n2",
        name: "Eco-Cotton Socks",
        price: 299,
        originalPrice: 499,
        image: "https://images.unsplash.com/photo-1582966298601-83748c84f552?w=500&q=80",
        isEco: true,
      },
    ]
  },
  {
    id: "s3",
    name: "LEVI'S",
    rating: "4.7",
    time: "Free Delivery",
    reviews: "8.5K+",
    isAd: false,
    logo: "https://images.unsplash.com/photo-1516244400-514114757577?w=500&q=80",
    items: [
      {
        id: "l1",
        name: "Denim Wallet",
        price: 599,
        originalPrice: 899,
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&q=80",
        isEco: false,
      },
      {
        id: "l2",
        name: "Graphic Tee",
        price: 899,
        originalPrice: 1499,
        image: "https://images.unsplash.com/photo-1576566582414-25a81ca7b825?w=500&q=80",
        isEco: true,
      },
    ]
  }
];

const MealsUnderScreen = () => {
  const navigation = useNavigation();

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
          <Text style={styles.headerTitle}>Budget Style Under ₹999</Text>
          <View style={{width: 40}} /> 
      </View>

      {/* Main Vertical Scroll */}
      <ScrollView 
        style={styles.container} 
        showsVerticalScrollIndicator={false}
      >
        


        {/* 4. Retail Store Cards List */}
        <View style={styles.restaurantList}>
            {[...STATIC_RETAIL_STORES].map((store: any) => {
                    return (
                        <View key={store.id} style={styles.restaurantCard}>
                            {/* Header: Name & Rating */}
                            <View style={styles.cardHeader}>
                                <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
                                    <Image source={{ uri: store.logo }} style={styles.storeLogoSmall} />
                                    <View style={{marginLeft: 12}}>
                                        <Text style={styles.resName}>{store.name}</Text>
                                        <View style={styles.resMetaRow}>
                                            <View style={styles.timeBadge}>
                                                <Ionicons name="car-outline" size={12} color={COLORS.primary} />
                                                <Text style={styles.resTime}>{store.time}</Text>
                                            </View>
                                            {store.isAd && <Text style={styles.adTag}>Partner</Text>}
                                        </View>
                                    </View>
                                </View>
                                
                                <View style={styles.ratingBox}>
                                    <View style={styles.ratingBadge}>
                                        <Text style={styles.ratingText}>{store.rating}</Text>
                                        <Ionicons name="star" size={10} color={COLORS.white} />
                                    </View>
                                    <Text style={styles.reviewText}>{store.reviews}</Text>
                                </View>
                            </View>

                            {/* --- HORIZONTAL PRODUCT SCROLL --- */}
                            <ScrollView 
                                horizontal 
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
                            >
                                {store.items.map((item: any) => (
                                    <View key={item.id} style={styles.foodItemCard}>
                                        {/* Product Image Area */}
                                        <View style={styles.foodImgWrapper}>
                                            <Image source={{ uri: item.image }} style={styles.foodImage} />
                                            {item.isEco && (
                                              <View style={styles.ecoIconBox}>
                                                  <MaterialCommunityIcons 
                                                      name="leaf" 
                                                      size={12} 
                                                      color={COLORS.highlight} 
                                                  />
                                              </View>
                                            )}
                                            {/* Price Tag on Image */}
                                            <View style={styles.imageOfferTag}>
                                                <Text style={styles.imageOfferText}>₹{item.price}</Text>
                                            </View>
                                        </View>

                                        {/* Product Details */}
                                        <View style={styles.foodInfo}>
                                            <Text style={styles.foodName} numberOfLines={2}>{item.name}</Text>
                                            {item.originalPrice > item.price && (
                                              <Text style={[styles.offerText, { textDecorationLine: 'line-through', color: COLORS.muted }]}>
                                                  ₹{item.originalPrice}
                                              </Text>
                                            )}
                                            <Text style={styles.offerText}>Sustainable Material</Text>
                                        </View>

                                        {/* View Details Button */}
                                        <TouchableOpacity style={styles.viewCartBtn} activeOpacity={0.7}>
                                            <Text style={styles.viewCartText}>VIEW</Text>
                                            <Ionicons name="chevron-forward" size={14} color={COLORS.primary} />
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </ScrollView>

                            {/* Footer: View Full Collection */}
                            <TouchableOpacity style={styles.cardFooter}>
                                <Text style={styles.footerText}>Explore Full Collection</Text>
                                <Ionicons name="arrow-forward-circle" size={16} color={COLORS.primary} />
                            </TouchableOpacity>
                        </View>
                    );
                })}
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
      paddingTop: 10,
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
  storeLogoSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#f0f0f0'
  },
  ecoIconBox: {
      position: 'absolute',
      top: 8,
      right: 8,
      backgroundColor: 'rgba(255,255,255,0.95)',
      padding: 4,
      borderRadius: 6,
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