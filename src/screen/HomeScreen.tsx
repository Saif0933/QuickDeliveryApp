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
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

// --- CUSTOM IMPORTS ---
import { useGetAllCategory } from '../api/hooks/getAllCategory';
import { useGetAllVendors } from '../api/hooks/useVender';
import FoodList from '../components/FoodCard';
import FloatingCart from '../components/cart/FloatingCart';
import BottomNavBar from '../navigation/BottomNavBar';
import { useLocationStore } from '../store/locationStore';
import { COLORS } from '../theme/color';

import SuggestedForYou from './SuggestedForYou';


const { width, height } = Dimensions.get('window');

// --- TYPES ---
type RootStackParamList = {
  HomeScreen: undefined;
  LocationScreen: undefined;
  GoldScreen: undefined;
  ZomatoMoneyPage: undefined;
  ProfileScreen: undefined;
  FoodList: { categoryId?: string; category?: string };
  ProductScreen: { category?: string; vendorId: string; vendorName: string; vendorImage: string; productName?: string; description?: string; menuImages?: string[] };
  BrandStoreScreen: { vendorId: string; vendorName: string; vendorImage: string };
  ProductBrand: { vendorId: string; vendorName: string; vendorImage: string; vendorLogo?: string };
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
    id: 'branded',
    name: 'Top Brands',
    image: { url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&q=80' },
    isSpecial: true,
  },
  {
    id: 'men',
    name: 'Men',
    image: { url: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=200&q=80' },
    isSpecial: false,
  },
  {
    id: 'women',
    name: 'Women',
    image: { url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&q=80' },
    isSpecial: false,
  },
  {
    id: 'non-branded',
    name: 'Casual',
    image: { url: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=200&q=80' },
    isSpecial: false,
  },
];

const staticClothingBrands = [
  {
    id: 'cb-1',
    name: "Nike",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
    discount: "Up to 50% off"
  },
  {
    id: 'cb-2',
    name: "H&M",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=400&q=80",
    discount: "Flat 40% off"
  },
  {
    id: 'cb-3',
    name: "Zara",
    image: "https://images.unsplash.com/photo-1489987707023-af0825ae1eeb?w=400&q=80",
    discount: "Buy 1 Get 1"
  },
  {
    id: 'cb-4',
    name: "Puma",
    image: "https://images.unsplash.com/photo-1608231387042-6e2eeaa518d6?w=400&q=80",
    discount: "Min 30% off"
  },
  {
    id: 'cb-5',
    name: "Levi's",
    image: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=400&q=80",
    discount: "Deal of the day"
  },
  {
    id: 'cb-6',
    name: "Adidas",
    image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=400&q=80",
    discount: "Up to 60% off"
  }
];

const HEADER_HEIGHT = 115;
const SEARCH_HEIGHT = 20;
const BANNER_HEIGHT = 220;
const HERO_HEIGHT = HEADER_HEIGHT + BANNER_HEIGHT + 10;

const banners = [
  { 
    id: '1', 
    img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
    title: 'THE NEW EDIT',
    subtitle: 'SUMMER\nSYMPHONY',
    badge: 'NEW COLLECTION'
  },
  { 
    id: '2', 
    img: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80',
    title: 'LUXURY ESSENTIALS',
    subtitle: 'TIMELESS\nELEGANCE',
    badge: 'LIMITED EDITION'
  },
  { 
    id: '3', 
    img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    title: 'URBAN VIBE',
    subtitle: 'CITY\nCOLLECTIVE',
    badge: 'TOP TRENDING'
  },
];

const HomeScreen: React.FC = () => {
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

  // veg toggle removed

  useEffect(() => {
    const animateBanner = () => {
      Animated.sequence([
        Animated.delay(3000),
        Animated.timing(slideAnim, {
          toValue: -width,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.bezier(0.25, 0.1, 0.25, 1)),
        }),
        Animated.delay(3000),
        Animated.timing(slideAnim, {
          toValue: -width * 2,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.bezier(0.25, 0.1, 0.25, 1)),
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
        {/* Editorial Gradient Overlay */}
        <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(0,0,0,0.3)', padding: 24, justifyContent: 'flex-end', paddingBottom: 60, borderRadius: 20, marginHorizontal: 12, overflow: 'hidden' }]}>
          
          {/* Top Info Bar */}
          <View style={{ position: 'absolute', top: 20, left: 24, right: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
             <View style={{ backgroundColor: '#FFF', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 2 }}>
                <Text style={{ color: '#000', fontSize: 9, fontWeight: '900', letterSpacing: 1.5, textTransform: 'uppercase' }}>{item.badge}</Text>
             </View>
             <Text style={{ color: '#FFF', fontSize: 11, fontWeight: '800', letterSpacing: 1 }}>0{index + 1} / 0{banners.length}</Text>
          </View>

          <View style={{ marginBottom: 0 }}>
            <Text style={{ color: '#FFF', fontSize: 11, fontWeight: '600', letterSpacing: 4, textTransform: 'uppercase', marginBottom: 8, opacity: 0.8 }}>
              {item.title}
            </Text>
            <Text style={{ color: '#FFF', fontSize: 34, fontWeight: '900', letterSpacing: -1, lineHeight: 38 }}>
              {item.subtitle}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const { data: restaurantData, isLoading } = useGetAllVendors({ limit: 20 });
  const { data: categoryData, isLoading: categoryLoading } = useGetAllCategory({});

  const displayCategories = [...staticCategories, ...(categoryData || [])];
  const allVendors = restaurantData?.pages.flatMap(page => page.vendors) || [];
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
      <Animated.ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
      >
        <View>
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

                {/* Pagination Dots indicator */}
                <View style={[styles.bannerPagination, { left: 36, bottom: 40 }]}>
                   {banners.map((_, i) => {
                     const dotWidth = slideAnim.interpolate({
                       inputRange: [-width * (i + 1), -width * i, -width * (i - 1)],
                       outputRange: [10, 24, 10],
                       extrapolate: 'clamp'
                     });
                     const dotOpacity = slideAnim.interpolate({
                       inputRange: [-width * (i + 1), -width * i, -width * (i - 1)],
                       outputRange: [0.4, 1, 0.4],
                       extrapolate: 'clamp'
                     });
                     return (
                       <Animated.View 
                         key={i} 
                         style={[styles.bannerDot, { width: dotWidth, opacity: dotOpacity, backgroundColor: '#FFF' }]} 
                       />
                     );
                   })}
                </View>
              </View>

              <View style={[styles.header, { backgroundColor: COLORS.primary, height: 115, flexDirection: 'column', paddingBottom: 10 }]}>
                {/* Upper Row: Location & Profile */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 8 }}>
                  <View style={styles.headerLeft}>
                    <TouchableOpacity 
                      style={{ backgroundColor: 'rgba(255,255,255,0.15)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, flexDirection: 'row', alignItems: 'center' }}
                      onPress={() => navigation.navigate('LocationScreen')}
                    >
                      <Ionicons name="location-sharp" size={14} color="#FFF" />
                      <Text numberOfLines={1} style={{ color: '#FFF', fontSize: 13, fontWeight: '700', marginHorizontal: 6 }}>{primaryLocation || 'Bangaluru'}</Text>
                      <Ionicons name="chevron-down" size={12} color="#FFF" style={{ opacity: 0.8 }} />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.headerRight}>
                    <TouchableOpacity style={{ marginRight: 15 }} onPress={() => navigation.navigate('ZomatoMoneyPage')}>
                      <Ionicons name="wallet-outline" size={24} color="#FFF" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: 34, height: 34, borderRadius: 17, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center' }} onPress={() => navigation.navigate('ProfileScreen')}>
                      <Text style={{ color: COLORS.primary, fontWeight: '900', fontSize: 13 }}>S</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Lower Row: Search Bar (Moved UP) */}
                <View style={{ width: '100%', paddingHorizontal: 4 }}>
                  <View style={{ 
                    flexDirection: 'row', 
                    alignItems: 'center', 
                    backgroundColor: '#FFF', 
                    borderRadius: 25, 
                    height: 48, 
                    paddingHorizontal: 15,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.1,
                    shadowRadius: 5,
                    elevation: 5
                  }}>
                    <Ionicons name="search" size={18} color="#666" style={{ marginRight: 10 }} />
                    <TextInput 
                      placeholder='Search "Shirts", "Nike", "Brands"' 
                      style={{ flex: 1, fontSize: 13, color: '#333', fontWeight: '500' }} 
                      placeholderTextColor="#999" 
                      onPressIn={() => navigation.navigate('SearchScreen')} 
                    />
                    <View style={{ width: 1, height: 20, backgroundColor: '#EEE', marginHorizontal: 10 }} />
                    <Ionicons name="mic-outline" size={20} color="#666" />
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
                            <View style={[styles.specialCategoryOverlay, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
                              <Text style={[styles.specialCategoryText, { fontSize: 9, marginBottom: 2, color: 'white' }]}>TOP</Text>
                              <Text style={[styles.specialCategoryPrice, { fontSize: 13, color: '#FFD700', marginLeft: 4 }]}>BRANDS</Text>
                              <View style={[styles.exploreSmallBtn, { backgroundColor: '#FFD700' }]}>
                                <Text style={[styles.exploreSmallText, { color: '#000' }]}>Explore ›</Text>
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

            {/* Dynamic Recommended - Amazon Style */}
            <TouchableOpacity 
              style={styles.amazonSectionHeader}
              onPress={() => navigation.navigate('ProductBrand', {
                vendorId: 'cb-1',
                vendorName: 'Nike',
                vendorImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
                vendorLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/1200px-Logo_NIKE.svg.png'
              })}
            >
              <Text style={styles.amazonSectionTitle}>Featured Clothing & Brands</Text>
              <View>
                <Text style={styles.amazonSeeAll}>See all deals</Text>
              </View>
            </TouchableOpacity>
            
            {isLoading ? (
              <View style={{ height: 200, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={COLORS.primary} />
              </View>
            ) : (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.amazonScrollContainer}>
                {staticClothingBrands.map((brand, index) => {
                  return (
                    <TouchableOpacity
                      key={brand.id}
                      onPress={() => {
                        navigation.navigate('ProductBrand', {
                          vendorId: brand.id,
                          vendorName: brand.name,
                          vendorImage: brand.image,
                          vendorLogo: brand.id === 'cb-1' 
                            ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/1200px-Logo_NIKE.svg.png'
                            : brand.image // Fallback logo
                        });
                      }}
                      style={[styles.amazonCard, { width: 150, marginRight: 12, marginBottom: 0 }]}
                      activeOpacity={0.9}
                    >
                      <View style={styles.amazonImgWrapper}>
                        <Image source={{ uri: brand.image }} style={styles.amazonImg} resizeMode="cover" />
                      </View>
                      <View style={styles.amazonInfo}>
                        <View style={styles.amazonDiscountRow}>
                          <View style={styles.amazonDiscountBadge}>
                            <Text style={styles.amazonDiscountText}>{brand.discount}</Text>
                          </View>
                          <Text style={styles.amazonDealTag}>Limited time deal</Text>
                        </View>
                        <Text style={styles.amazonBrandName} numberOfLines={1}>{brand.name}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            )}
        </View>
        
        {/* Horizontal Trending Products List */}
        <FoodList />
        
        {/* Suggested For You Added Below Trending Deals */}
        <SuggestedForYou />
        
      </Animated.ScrollView>

      <Animated.View
        style={[
          {
            position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100,
            backgroundColor: COLORS.primary,
            paddingTop: 10, opacity: stickyHeaderOpacity,
            transform: [{ translateY: stickyHeaderTranslateY }], elevation: 5,
            paddingBottom: 15
          }
        ]}
      >
        <View style={{ paddingHorizontal: 16 }}>
           <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center', 
              backgroundColor: '#FFF', 
              borderRadius: 12, 
              height: 48, 
              paddingHorizontal: 15
            }}>
              <Ionicons name="search" size={18} color={COLORS.primary} style={{ marginRight: 10 }} />
              <TextInput 
                placeholder='Search Brands...' 
                style={{ flex: 1, fontSize: 13, color: '#333', fontWeight: '500' }} 
                placeholderTextColor="#AAA" 
                onPressIn={() => navigation.navigate('SearchScreen')} 
              />
              <Ionicons name="mic-outline" size={18} color={COLORS.primary} />
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
              <TouchableOpacity
                key={c.id || index}
                style={styles.categoryItem}
                onPress={() => {
                  if (!c.isSpecial) {
                    setSelectedCategory(c.name);
                    if (c.id !== 'static_all') {
                      navigation.navigate('FoodList', { categoryId: c.id, category: c.name });
                    }
                  } else {
                    navigation.navigate('MealsUnderScreen');
                  }
                }}
              >
                {c.isSpecial ? (
                  <View style={styles.specialCategory}>
                    <Image source={{ uri: c.image?.url }} style={styles.specialCategoryImg} />
                    <View style={[styles.specialCategoryOverlay, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
                      <Text style={[styles.specialCategoryText, { fontSize: 9, marginBottom: 2, color: 'white' }]}>TOP</Text>
                      <Text style={[styles.specialCategoryPrice, { fontSize: 13, color: '#FFD700', marginLeft: 4 }]}>BRANDS</Text>
                    </View>
                  </View>
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



const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  heroContainer: { height: HERO_HEIGHT, position: 'relative', overflow: 'visible' },
  header: { 
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    zIndex: 20, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 16, 
    paddingTop: 12, 
    paddingBottom: 10,
    backgroundColor: 'rgba(255,255,255,0.95)' // Added soft background for contrast
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  iconCircle: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#FDECEF', justifyContent: 'center', alignItems: 'center' },
  locationContainer: { marginLeft: 10, flex: 1 },
  locationRow: { flexDirection: 'row', alignItems: 'center' },
  locationTitle: { fontSize: 14, fontWeight: '800', color: '#111' },
  locationSub: { fontSize: 11, color: '#666', marginTop: 1, fontWeight: '500' },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  walletBadge: { backgroundColor: '#F9F9F9', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20, marginRight: 12, borderWidth: 1, borderColor: '#EEE', flexDirection: 'row', alignItems: 'center' },
  walletText: { fontSize: 13, fontWeight: '700', color: '#333', marginLeft: 6 },
  profileBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#E0F2F1', justifyContent: 'center', alignItems: 'center', position: 'relative' },
  profileText: { fontSize: 15, fontWeight: 'bold', color: '#00695C' },
  onlineStatus: { position: 'absolute', bottom: 0, right: 0, width: 10, height: 10, borderRadius: 5, backgroundColor: '#4CAF50', borderWidth: 2, borderColor: '#FFF' },

  searchWrapper: { position: 'absolute', top: 60, left: 0, right: 0, zIndex: 30, paddingBottom: 10 },
  searchRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 },
  pillSearchBar: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#F3F4F6', 
    borderRadius: 25, 
    height: 50,
  },
  pillSearchInput: { flex: 1, marginLeft: 10, fontSize: 14, color: '#333' },
  micCircle: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', marginRight: 8, elevation: 1 },

  bannerOuterContainer: { 
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    zIndex: 1, 
    backgroundColor: '#fff', 
    overflow: 'hidden', 
    paddingTop: 120 // Header Height (115) + extra 5px
  },
  bannerMovingTrack: { width: width * 3, height: 220, flexDirection: 'row' },
  bannerSlide: { width, height: 220, overflow: 'visible', position: 'relative' },
  bannerImage: { width: width - 32, height: '100%', marginHorizontal: 16, borderRadius: 24 },
  bannerPagination: {
    position: 'absolute',
    bottom: 25,
    right: 36, // Moved dots to the right for a different look
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10
  },
  bannerDot: {
    height: 2, // Thinner, more professional line indicator
    borderRadius: 1,
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginRight: 8
  },

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

  // Amazon Style additions
  amazonSectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 12, marginBottom: 12, marginTop: 10 },
  amazonSectionTitle: { fontSize: 18, fontWeight: '700', color: '#0F1111' },
  amazonSeeAll: { fontSize: 13, color: '#007185', fontWeight: '500' },
  amazonScrollContainer: { paddingLeft: 12, paddingRight: 4, paddingBottom: 16 },
  amazonCard: { 
    width: 150, 
    marginRight: 10, 
    backgroundColor: '#fff', 
    borderWidth: 1, 
    borderColor: '#E5E7EB', 
    borderRadius: 6, 
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  amazonImgWrapper: { 
    width: '100%', 
    height: 160, 
    backgroundColor: '#F9FAFB', 
    justifyContent: 'center', 
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  amazonImg: { width: '100%', height: '100%' },
  amazonInfo: { padding: 10 },
  amazonDiscountRow: { flexDirection: 'column', alignItems: 'flex-start', marginBottom: 4 },
  amazonDiscountBadge: { 
    backgroundColor: '#CC0C39', 
    paddingHorizontal: 6, 
    paddingVertical: 3,
    borderRadius: 2,
    marginBottom: 4
  },
  amazonDiscountText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  amazonDealTag: { fontSize: 10, color: '#CC0C39', fontWeight: 'bold' },
  amazonBrandName: { fontSize: 13, color: '#0F1111', lineHeight: 18 },

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