import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
  StatusBar,
  Pressable,
  TextInput,
  Keyboard,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../theme/color";

const { width, height } = Dimensions.get('window');

// --- Types ---
interface Product {
  id: number;
  title: string;
  subtitle: string;
  weight: string;
  price: number;
  mrp: number;
  discount: string;
  deliveryTime: string;
  image: string;
  isNew: boolean;
  tag: string | null;
}

// --- Fixed Mock Data ---
const PRODUCTS: Product[] = [];

const MeatDeliveryScreen = () => {
  const navigation = useNavigation();
  const [cartCount, setCartCount] = useState(0);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  
  // Search State
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const searchInputRef = useRef<TextInput>(null);
  
  // --- Animations ---
  const slideAnim = useRef(new Animated.Value(height)).current; 
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const bannerFade = useRef(new Animated.Value(0)).current;
  const bannerTranslate = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(bannerFade, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(bannerTranslate, {
        toValue: 0,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // --- Handlers ---
  const handleBack = () => {
    if (isSearchVisible) {
      setIsSearchVisible(false);
      setSearchText("");
      Keyboard.dismiss();
    } else {
      navigation.goBack();
    }
  };

  const handleSearchToggle = () => {
    setIsSearchVisible(!isSearchVisible);
    if (!isSearchVisible) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else {
      setSearchText("");
      Keyboard.dismiss();
    }
  };

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
    openSheet();
  };

  // --- Sheet Logic ---
  const openSheet = () => {
    setIsSheetOpen(true);
    slideAnim.setValue(height); 
    
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start();
  };

  const closeSheet = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start(() => {
      setIsSheetOpen(false);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      {/* --- HEADER --- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.iconButton}>
           <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>

        {isSearchVisible ? (
          <TextInput
            ref={searchInputRef}
            style={styles.searchInput}
            placeholder="Search for meat, cuts..."
            placeholderTextColor={COLORS.muted}
            value={searchText}
            onChangeText={setSearchText}
          />
        ) : (
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Chicken & Sausages</Text>
            <Text style={styles.headerSubtitle}>{PRODUCTS.length} Items</Text>
          </View>
        )}

        <TouchableOpacity onPress={handleSearchToggle} style={styles.iconButton}>
           <Ionicons name={isSearchVisible ? "close" : "search"} size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* --- 1. HERO BANNER --- */}
        <View style={styles.heroBanner}>
           <Animated.View 
             style={[
               styles.heroContent, 
               { 
                 opacity: bannerFade, 
                 transform: [{ translateY: bannerTranslate }] 
               }
             ]}
           >
              <View style={styles.heroTextContainer}>
                 <Text style={styles.heroHeading}>Fresh &{'\n'}Fast Delivery</Text>
                 
                 <View style={styles.heroFeatures}>
                   <View style={styles.checkRow}>
                      <MaterialCommunityIcons name="checkbox-marked-circle" size={18} color={COLORS.primary} />
                      <Text style={styles.checkText}>Veg and Non-veg </Text>
                   </View>
                   <View style={styles.checkRow}>
                      <MaterialCommunityIcons name="checkbox-marked-circle" size={18} color={COLORS.primary} />
                      <Text style={styles.checkText}>Best Quality</Text> 
                   </View>
                   <View style={styles.checkRow}>
                      <MaterialCommunityIcons name="checkbox-marked-circle" size={18} color={COLORS.primary} />
                      <Text style={styles.checkText}>Affordable Price</Text>
                   </View>
                 </View>
              </View>
              
              <Image 
                source={{ uri: "https://images.immediate.co.uk/production/volatile/sites/30/2022/06/Party-food-recipes-fcfb3af.jpg?resize=1366,1503" }} 
                style={styles.heroImage} 
              />
           </Animated.View>
        </View>

        {/* --- 3. PRODUCT LIST --- */}
        {PRODUCTS.length > 0 ? (
          PRODUCTS.map((item) => (
            <View key={item.id} style={styles.card}>
              {/* Image Area */}
              <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                
                <View style={styles.paginationDots}>
                  <View style={[styles.dot, styles.activeDot]} />
                  <View style={styles.dot} />
                  <View style={styles.dot} />
                </View>

                {item.isNew && (
                  <View style={styles.newTag}>
                    <Text style={styles.newTagText}>NEW</Text>
                  </View>
                )}
                {!item.isNew && item.tag && (
                  <View style={[styles.newTag, { backgroundColor: COLORS.accent }]}>
                      <Ionicons name="water-outline" size={10} color={COLORS.white} style={{marginRight:2}}/>
                      <Text style={styles.newTagText}>{item.tag}</Text>
                  </View>
                )}
                
                <View style={styles.vegIconContainer}>
                  <View style={styles.nonVegBox}>
                    <View style={styles.nonVegDot} />
                  </View>
                </View>
              </View>

              {/* Content Area */}
              <View style={styles.cardContent}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.productSubtitle} numberOfLines={1}>{item.subtitle}</Text>
                
                <View style={styles.weightBadge}>
                  <Text style={styles.weightText}>{item.weight}</Text>
                </View>

                <View style={styles.deliveryRow}>
                  <Ionicons name="flash" size={14} color={COLORS.yelow} />
                  <Text style={styles.deliveryText}>{item.deliveryTime}</Text>
                </View>

                <View style={styles.priceRow}>
                  <View>
                      <View style={styles.priceContainer}>
                        <Text style={styles.currentPrice}>₹{item.price}</Text>
                        <Text style={styles.mrpPrice}>₹{item.mrp}</Text>
                        <Text style={styles.discountText}>{item.discount}</Text>
                      </View>
                  </View>

                  <View style={styles.addBtnWrapper}>
                      <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
                        <Text style={styles.addBtnText}>Add +</Text>
                      </TouchableOpacity>
                      <Text style={styles.chooseMoreText}>Choose more</Text>
                  </View>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconContainer}>
              <MaterialCommunityIcons name="tag-off-outline" size={80} color={COLORS.primary} />
            </View>
            <Text style={styles.emptyText}>no discount product available</Text>
            <Text style={styles.emptySubText}>Check back later for exciting offers and fresh discounts.</Text>
          </View>
        )}
      </ScrollView>

      {/* --- 4. SHEET ANIMATION --- */}
      {isSheetOpen && (
        <View style={StyleSheet.absoluteFillObject} pointerEvents="box-none">
          {/* Dark Overlay */}
          <Pressable onPress={closeSheet} style={StyleSheet.absoluteFill}>
            <Animated.View style={[styles.overlay, { opacity: fadeAnim }]} />
          </Pressable>

          {/* Sliding Sheet */}
          <Animated.View 
            style={[
              styles.bottomSheet, 
              { transform: [{ translateY: slideAnim }] }
            ]}
          >
            <View style={styles.sheetHandle} />
            
            <View style={styles.sheetHeader}>
              <View>
                 <Text style={styles.sheetTitle}>{cartCount} Items added</Text>
                 <Text style={styles.sheetSubtitle}>Total Savings: ₹50</Text>
              </View>
              <TouchableOpacity onPress={closeSheet}>
                <Ionicons name="close" size={24} color={COLORS.textPrimary} />
              </TouchableOpacity>
            </View>

            <View style={styles.cartSummary}>
              <View style={styles.cartRow}>
                 <Text style={styles.cartLabel}>Subtotal</Text>
                 <Text style={styles.cartValue}>₹{(PRODUCTS[0]?.price || 0) * cartCount}</Text>
              </View>
              <View style={styles.cartRow}>
                 <Text style={styles.cartLabel}>Delivery Fee</Text>
                 <Text style={[styles.cartValue, { color: COLORS.highlight }]}>FREE</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.cartRow}>
                 <Text style={styles.cartTotalLabel}>To Pay</Text>
                 <Text style={styles.cartTotalValue}>₹{(PRODUCTS[0]?.price || 0) * cartCount}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.checkoutBtn}>
               <Text style={styles.checkoutText}>Proceed to Checkout</Text>
               <Ionicons name="chevron-forward" size={18} color={COLORS.white} />
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  
  // --- Header ---
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.SOFT_BLUE,
    height: 60,
    elevation: 2,
    zIndex: 10
  },
  headerTextContainer: { alignItems: 'flex-start', flex: 1, marginLeft: 16 },
  headerTitle: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary },
  headerSubtitle: { fontSize: 12, color: COLORS.muted },
  iconButton: { padding: 4 },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: COLORS.SOFT_BLUE,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginHorizontal: 12,
    color: COLORS.textPrimary
  },

  // --- Hero Banner ---
  heroBanner: {
    backgroundColor: COLORS.SOFT_BLUE, // Lavender/Soft Pink background
    height: 220, 
    justifyContent: 'center',
    paddingHorizontal: 20,
    overflow: 'hidden',
  },
  heroContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroTextContainer: { flex: 1, paddingRight: 10 },
  heroHeading: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.primary, // Deep Blue
    marginBottom: 12,
    lineHeight: 28,
  },
  heroFeatures: { gap: 6 },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkText: {
    fontSize: 13,
    color: COLORS.textPrimary,
    fontWeight: '600',
    marginLeft: 6,
  },
  heroImage: {
    width: 140, 
    height: 140,
    borderRadius: 70, 
    borderWidth: 4,
    borderColor: COLORS.white,
    resizeMode: 'cover',
  },

  // --- Filter Strip ---
  filterStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.SOFT_BLUE,
    marginBottom: 10,
    gap: 10
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.LITE_GRAY,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 5,
    backgroundColor: COLORS.white,
  },
  filterBtnText: { marginLeft: 6, fontSize: 12, fontWeight: '600', color: COLORS.textPrimary },
  itemCount: { fontSize: 13, color: COLORS.muted, fontWeight: '500' },

  // --- Product Card ---
  card: {
    backgroundColor: COLORS.white,
    marginBottom: 12,
    paddingBottom: 16,
  },
  imageContainer: {
    width: width,
    height: 220,
    position: 'relative',
    backgroundColor: COLORS.SOFT_BLUE // Placeholder color
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  paginationDots: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6
  },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.6)' },
  activeDot: { backgroundColor: COLORS.white, width: 8, height: 8, borderRadius: 4 },
  
  newTag: {
    position: 'absolute',
    top: 12,
    left: 0,
    backgroundColor: COLORS.RED,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    flexDirection:'row',
    alignItems:'center'
  },
  newTagText: { color: COLORS.white, fontSize: 10, fontWeight: '700' },
  
  vegIconContainer: {
    position: 'absolute',
    top: 12,
    right: 16,
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 3,
    borderRadius: 2,
  },
  nonVegBox: {
    width: 14,
    height: 14,
    borderWidth: 1,
    borderColor: COLORS.RED,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nonVegDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.RED },

  cardContent: { paddingHorizontal: 16, paddingTop: 14 },
  productTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 4, letterSpacing: 0.3 },
  productSubtitle: { fontSize: 13, color: COLORS.muted, marginBottom: 10 },
  
  weightBadge: { 
      alignSelf: 'flex-start',
      backgroundColor: COLORS.SOFT_BLUE, 
      paddingHorizontal: 6, 
      paddingVertical: 3, 
      borderRadius: 3,
      marginBottom: 10
  },
  weightText: { fontSize: 11, color: COLORS.textSecondary, fontWeight:'500' },
  
  deliveryRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  deliveryText: { fontSize: 11, fontWeight: '700', color: COLORS.textPrimary, marginLeft: 4 },

  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  priceContainer: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  currentPrice: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary },
  mrpPrice: { fontSize: 14, textDecorationLine: 'line-through', color: COLORS.LITE_GRAY },
  discountText: { fontSize: 14, color: COLORS.highlight, fontWeight: '700' },

  addBtnWrapper: { alignItems: 'center' },
  addButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 26,
    paddingVertical: 9,
    borderRadius: 4,
  },
  addBtnText: { color: COLORS.white, fontWeight: '700', fontSize: 14 },
  chooseMoreText: { fontSize: 10, color: COLORS.muted, marginTop: 4 },

  // --- Bottom Sheet ---
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 100,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    zIndex: 101,
    elevation: 20,
    height: 320,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5
  },
  sheetHandle: {
    width: 36,
    height: 4,
    backgroundColor: COLORS.LITE_GRAY,
    alignSelf: 'center',
    borderRadius: 2,
    marginBottom: 20,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  sheetTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary },
  sheetSubtitle: { fontSize: 12, color: COLORS.highlight, fontWeight: '600', marginTop: 2 },
  
  cartSummary: { marginBottom: 20 },
  cartRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  cartLabel: { fontSize: 14, color: COLORS.textSecondary },
  cartValue: { fontSize: 14, color: COLORS.textPrimary, fontWeight: '600' },
  divider: { height: 1, backgroundColor: COLORS.SOFT_BLUE, marginVertical: 10 },
  cartTotalLabel: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary },
  cartTotalValue: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary },
  
  checkoutBtn: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  checkoutText: { color: COLORS.white, fontSize: 15, fontWeight: '700' },
  
  // --- Empty State ---
  emptyContainer: {
    flex: 1,
    height: height * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    backgroundColor: COLORS.SOFT_BLUE,
    padding: 24,
    borderRadius: 60,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  emptySubText: {
    fontSize: 14,
    color: COLORS.muted,
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 20,
  },
});

export default MeatDeliveryScreen;