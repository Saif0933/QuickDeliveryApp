
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useGetAllCategory } from "../../api/hooks/getAllCategory";
import { useGetInventoryByCategory } from "../../api/hooks/inventory";
import { useWishlist } from "../../Context/WishlistContext";
import { COLORS } from "../../theme/color";

const { width } = Dimensions.get("window");

// --- Interfaces & Types ---

interface QuickFilter {
  label: string;
  icon: string;
}

interface SidebarItem {
  id: string;
  label: string;
  icon: string;
}

interface SortOption {
  label: string;
  value: string;
}

interface FilterContentItem {
  label: string;
  icon?: string;
  type?: 'box' | 'pill' | 'price_box' | 'grid';
  color?: string;
  value?: string;
}

interface FilterContentMap {
  [key: string]: FilterContentItem[];
}

// --- Helper for Robust Image Resolution ---
const resolveImageUrl = (imageSource: any): string => {
  if (!imageSource) return "https://via.placeholder.com/200";
  if (typeof imageSource === 'string') return imageSource;
  if (imageSource.url) return imageSource.url;
  if (imageSource.image?.url) return imageSource.image.url;
  if (Array.isArray(imageSource) && imageSource.length > 0) {
    const first = imageSource[0];
    if (typeof first === 'string') return first;
    return first.url || first.image?.url || "https://via.placeholder.com/200";
  }
  if (typeof imageSource === 'object') {
    if (imageSource.images?.url) return imageSource.images.url;
    if (imageSource.images?.[0]?.url) return imageSource.images[0].url;
    if (imageSource.images?.[0]?.image?.url) return imageSource.images[0].image.url;
  }
  return "https://via.placeholder.com/200";
};

interface Category {
  id: string;
  name: string;
  image?: any;
}

interface MappedVendor {
  id: string;
  restaurantName: string;
  location: string;
  time: string;
  rating: string;
  logo: string;
  menuImages: string[];
  offerText: string;
  offerSub: string;
  foodName: string;
  price: string;
  isVeg: boolean;
  foodImage: string;
}

// --- Mock Data ---

const BANNERS: string[] = [
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000&q=80",
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000&q=80",
  "https://images.unsplash.com/photo-1445205170230-053b830c6050?w=1000&q=80",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1000&q=80"
];

const QUICK_FILTERS: QuickFilter[] = [
  { label: "Sort", icon: "options-outline" },
  { label: "Nearest", icon: "" },
  { label: "Rating 4.0+", icon: "" },
  { label: "Fast Delivery", icon: "" },
  { label: "Pure Veg", icon: "" },
  { label: "Great Offers", icon: "" },
];

const SIDEBAR_ITEMS: SidebarItem[] = [
  { id: 'sort', label: 'Sort By', icon: 'swap-vertical-outline' },
  { id: 'rating', label: 'Rating', icon: 'star-outline' },
  { id: 'offers', label: 'Offers', icon: 'pricetag-outline' },
  { id: 'price', label: 'Dish Price', icon: 'cash-outline' },
  { id: 'trust', label: 'Trust Markers', icon: 'shield-checkmark-outline' },
  { id: 'collections', label: 'Collections', icon: 'albums-outline' },
];

const SORT_OPTIONS: SortOption[] = [
  { label: 'Relevance (Default)', value: 'relevance' },
  { label: 'Rating: High to Low', value: 'rating_desc' },
  { label: 'Delivery Time: Low to High', value: 'time_asc' },
  { label: 'Cost: Low to High', value: 'price_asc' },
  { label: 'Cost: High to Low', value: 'price_desc' },
];

const FILTER_CONTENT: FilterContentMap = {
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

const STATIC_PRODUCTS: MappedVendor[] = [
  {
    id: "static_1",
    restaurantName: "PUMA",
    location: "Official Store",
    time: "Free Delivery",
    rating: "4.5",
    logo: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&q=80",
    menuImages: [],
    offerText: "SALE",
    offerSub: "Cotton Crew Neck T-shirt",
    foodName: "Men's Casual Tee",
    price: "799",
    isVeg: true,
    foodImage: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
  },
  {
    id: "static_2",
    restaurantName: "ADIDAS",
    location: "Global Lifestyle",
    time: "Free Delivery",
    rating: "4.8",
    logo: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=500&q=80",
    menuImages: [],
    offerText: "SALE",
    offerSub: "Breathable Performance Shorts",
    foodName: "Sporty Performance Shorts",
    price: "1299",
    isVeg: true,
    foodImage: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&q=80",
  },
  {
    id: "static_3",
    restaurantName: "H&M",
    location: "Trendy Wear",
    time: "Free Delivery",
    rating: "4.2",
    logo: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&q=80",
    menuImages: [],
    offerText: "SALE",
    offerSub: "Relaxed Fit Denim Jeans",
    foodName: "Classic Blue Jeans",
    price: "2499",
    isVeg: true,
    foodImage: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80",
  },
  {
    id: "static_4",
    restaurantName: "LEVIS",
    location: "Denim Co.",
    time: "Free Delivery",
    rating: "4.6",
    logo: "https://images.unsplash.com/photo-1516244400-514114757577?w=500&q=80",
    menuImages: [],
    offerText: "SALE",
    offerSub: "Checkered Slim Fit Shirt",
    foodName: "Check Casual Shirt",
    price: "1899",
    isVeg: true,
    foodImage: "https://images.unsplash.com/photo-1576566582414-25a81ca7b825?w=500&q=80",
  }
];

// --- Sub Components ---

const BannerCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const zoomAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const startAnimation = () => {
      Animated.timing(zoomAnim, {
        toValue: 1.15,
        duration: 5000,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }).start(() => {
          setActiveIndex((prev) => (prev + 1) % BANNERS.length);
          zoomAnim.setValue(1);
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
          }).start();
        });
      }, 3500);
      return timer;
    };
    const timerId = startAnimation();
    return () => clearTimeout(timerId);
  }, [activeIndex]);

  return (
    <View style={styles.heroContainer}>
      <View style={styles.bannerWrapper}>
        <Animated.Image
          source={{ uri: BANNERS[activeIndex] }}
          style={[styles.heroImage, { opacity: fadeAnim, transform: [{ scale: zoomAnim }] }]}
          resizeMode="cover"
        />
        <View style={styles.bannerOverlay} />
        <View style={styles.bannerContent}>
           <Text style={styles.bannerTag}>NEW ARRIVAL</Text>
           <Text style={styles.bannerTitle}>Season Collection</Text>
           <View style={styles.bannerBadge}>
              <Text style={styles.bannerBadgeText}>Up to 60% OFF</Text>
           </View>
        </View>
        <View style={styles.paginationContainer}>
          {BANNERS.map((_, index) => (
            <View key={index} style={[styles.paginationDot, activeIndex === index ? styles.activeDot : styles.inactiveDot]} />
          ))}
        </View>
      </View>
    </View>
  );
};

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
}

const FilterModal = ({ visible, onClose }: FilterModalProps) => {
  const [activeTab, setActiveTab] = useState<string>('sort');
  const [selectedSort, setSelectedSort] = useState<string>('relevance');

  const renderRightContent = () => {
    if (activeTab === 'sort') {
      return (
        <View style={styles.filterContentContainer}>
          {SORT_OPTIONS.map((option, index) => (
            <TouchableOpacity key={index} style={styles.sortOptionRow} onPress={() => setSelectedSort(option.value)}>
              <Text style={[styles.sortOptionText, selectedSort === option.value && { color: COLORS.textPrimary, fontWeight: '700' }]}>{option.label}</Text>
              <View style={[styles.radioOuter, selectedSort === option.value && { borderColor: COLORS.primary }]}>
                {selectedSort === option.value && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      );
    }
    const data = FILTER_CONTENT[activeTab];
    if (!data) return null;
    return (
      <View style={styles.filterContentContainer}>
        {activeTab === 'time' || activeTab === 'rating' ? (
          <View style={styles.boxContainer}>
            {data.map((item, index) => (
              <TouchableOpacity key={index} style={styles.filterBox}>
                <Ionicons name={item.icon || 'help-outline'} size={24} color={item.color === 'green' ? '#2e7d32' : COLORS.textPrimary} />
                <Text style={styles.boxText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : activeTab === 'price' ? (
          <View style={styles.priceContainer}>
            {data.map((item, index) => (
              <TouchableOpacity key={index} style={styles.priceBox}>
                <Text style={styles.priceText}>₹</Text>
                <Text style={styles.priceLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : activeTab === 'trust' ? (
          <View style={styles.gridContainer}>
            {data.map((item, index) => (
              <TouchableOpacity key={index} style={styles.gridItem}>
                <Ionicons name={item.icon || 'checkmark'} size={22} color={item.label === 'Pure Veg' ? 'green' : COLORS.primary} />
                <Text style={styles.gridText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.pillContainer}>
            {data.map((item, index) => (
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
        <TouchableOpacity style={styles.closeButtonContainer} onPress={onClose}>
          <View style={styles.circleClose}>
            <Ionicons name="close" size={24} color={COLORS.white} />
          </View>
        </TouchableOpacity>
        <View style={styles.modalContent}>
          <View style={styles.filterHeader}>
            <Text style={styles.filterTitle}>Filters and sorting</Text>
            <TouchableOpacity><Text style={styles.clearText}>Clear all</Text></TouchableOpacity>
          </View>
          <View style={styles.divider} />
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={styles.sidebar}>
              <ScrollView showsVerticalScrollIndicator={true} persistentScrollbar={true} indicatorStyle="black">
                {SIDEBAR_ITEMS.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <TouchableOpacity key={item.id} style={[styles.sidebarItem, isActive && styles.activeSidebarItem]} onPress={() => setActiveTab(item.id)}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {isActive && <View style={styles.activeIndicator} />}
                        <View style={{ width: 30, alignItems: 'center' }}>
                          {item.id === 'price' ? <Text style={{ fontSize: 16, color: isActive ? COLORS.primary : COLORS.textSecondary, fontWeight: '700' }}>₹</Text> : <Ionicons name={item.icon} size={20} color={isActive ? COLORS.primary : COLORS.textSecondary} />}
                        </View>
                        <View style={{ width: 8 }} />
                        <Text style={[styles.sidebarText, isActive && styles.activeSidebarText]}>{item.label}</Text>
                      </View>
                      {activeTab === 'sort' && item.id === 'sort' && <View style={styles.dot} />}
                    </TouchableOpacity>
                  )
                })}
              </ScrollView>
            </View>
            <View style={styles.rightContent}>
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>{renderRightContent()}</ScrollView>
            </View>
          </View>
          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.applyButton} onPress={onClose}><Text style={styles.applyButtonText}>Apply</Text></TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const QuickFilters = ({ onOpenSort }: { onOpenSort: () => void }) => {
  const [activeFilter, setActiveFilter] = useState<string>("Sort");
  return (
    <View style={styles.quickFiltersWrapper}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickFiltersContainer}>
        {QUICK_FILTERS.map((filter, index) => {
          const isActive = activeFilter === filter.label;
          return (
            <TouchableOpacity
              key={index}
              style={[styles.quickFilterChip, isActive && { borderColor: COLORS.primary, backgroundColor: COLORS.white }]}
              onPress={() => { if (filter.label === 'Sort') onOpenSort(); else setActiveFilter(filter.label); }}
            >
              {filter.icon && <Ionicons name={filter.icon} size={14} color={isActive ? COLORS.primary : COLORS.textPrimary} style={{ marginRight: 4 }} />}
              <Text style={[styles.quickFilterText, isActive && { color: COLORS.primary }]}>{filter.label}</Text>
              {filter.label === "Sort" && <Ionicons name="caret-down" size={10} color={isActive ? COLORS.primary : COLORS.textPrimary} style={{ marginLeft: 4 }} />}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const VegIcon = ({ isVeg }: { isVeg: boolean }) => (
  <View style={[styles.vegIconBorder, { borderColor: isVeg ? COLORS.highlight : COLORS.primary }]}>
    <View style={[styles.vegIconDot, { backgroundColor: isVeg ? COLORS.highlight : COLORS.primary }]} />
  </View>
);

const FilterSection = ({ categories, selectedCategory, onSelectCategory }: { categories: Category[]; selectedCategory: string | null; onSelectCategory: (id: string) => void }) => {
  return (
    <View style={styles.filterContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
        {categories && categories.map((item) => {
          const isSelected = selectedCategory === item.id;
          return (
            <TouchableOpacity key={item.id} style={styles.filterItem} onPress={() => onSelectCategory(item.id)}>
              <Image source={{ uri: resolveImageUrl(item.image) }} style={styles.filterImage} />
              <Text style={[styles.filterText, isSelected && styles.activeFilterText]}>{item.name}</Text>
              {isSelected && <View style={styles.filterUnderline} />}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const ProductGridCard = ({ item, category }: { item: MappedVendor; category: string | null }) => {
  const navigation = useNavigation<any>();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const scaleValue = useRef(new Animated.Value(1)).current;
  const onPressIn = () => Animated.spring(scaleValue, { toValue: 0.98, useNativeDriver: true }).start();
  const onPressOut = () => Animated.spring(scaleValue, { toValue: 1, useNativeDriver: true }).start();

  return (
    <Animated.View style={[styles.newProductCard, { transform: [{ scale: scaleValue }] }]}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={() => navigation.navigate('ProductScreen', {
          category: category || "All",
          vendorId: item.id,
          vendorName: item.restaurantName,
          productName: item.foodName,
          vendorImage: item.foodImage,
          description: item.offerSub,
          id: item.id
        })}
      >
        <View style={styles.newImageContainer}>
          <Image source={{ uri: item.foodImage }} style={styles.newProductImage} />
          <View style={[styles.overlayIconBtn, { left: 8 }]}><MaterialCommunityIcons name="layers-outline" size={18} color="#444" /></View>
          <TouchableOpacity 
            style={[styles.overlayIconBtn, { right: 8 }]}
            onPress={() => toggleWishlist({
                id: item.id,
                title: item.foodName,
                price: `₹${item.price}`,
                image: item.foodImage,
                brand: item.restaurantName,
                rating: parseFloat(item.rating)
            })}
          >
             <Ionicons name={isInWishlist(item.id) ? "heart" : "heart-outline"} size={18} color={isInWishlist(item.id) ? "#e53935" : "#444"} />
          </TouchableOpacity>
        </View>
        <View style={styles.newProductInfo}>
          <Text style={styles.newProductTitle} numberOfLines={2}>{item.foodName}</Text>
          <Text style={styles.newProductPrice}>₹{item.price}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function FoodList() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(route.params?.categoryId || null);
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);

  const { data: categoryData, isLoading: categoryLoading } = useGetAllCategory({});
  
  const effectiveCategoryId = selectedCategory || (categoryData && categoryData.length > 0 ? categoryData[0].id : null);

  const { data: productData, isLoading: productsLoading, fetchNextPage, hasNextPage } = useGetInventoryByCategory({
    limit: 20,
    search: search || undefined,
    categoryId: effectiveCategoryId || ''
  });

  const { wishlistItems } = useWishlist();
  const allProducts = productData?.pages.flatMap((page: any) => page.products) || [];
  
  // Combine Static Products with API Products to restore "the way it was"
  const combinedData = useMemo(() => {
    return [...STATIC_PRODUCTS, ...allProducts];
  }, [allProducts]);

  const renderItem = ({ item }: { item: any }) => {
    // Check if it's static data
    if (item.id && item.id.toString().startsWith('static_')) {
      return <ProductGridCard item={item} category={selectedCategory} />;
    }

    const productItem = item as any;
    const product = productItem.product;
    const mappedProduct: MappedVendor = {
      id: productItem.id,
      restaurantName: productItem.Vendor?.shopName || productItem.Vendor?.companyName || 'Official Store',
      location: productItem.Vendor?.city || 'Ranchi',
      time: "Free Delivery",
      rating: "4.5",
      logo: resolveImageUrl(product.images?.[0]?.image || product.images),
      menuImages: [],
      offerText: "SALE",
      offerSub: product.description || "Premium Quality Product",
      foodName: product.name || "Apparel Item",
      price: product.sellingPrice?.d?.[0]?.toString() || "499",
      isVeg: product.isVeg ?? true,
      foodImage: resolveImageUrl(product.images?.[0]?.image || product.images),
    };
    return <ProductGridCard item={mappedProduct} category={selectedCategory} />;
  };

  const ListHeader = () => (
    <View>
      <BannerCarousel />
      <FilterSection 
        categories={categoryData || []} 
        selectedCategory={effectiveCategoryId} 
        onSelectCategory={(id) => setSelectedCategory(id)} 
      />
      <QuickFilters onOpenSort={() => setShowFilterModal(true)} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      {/* Header Styled EXACTLY as before */}
      <View style={styles.newHeader}>
        <View style={styles.headerLeftSection}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.newBackButton}>
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>{route.params?.category || (categoryData?.find(c => c.id === effectiveCategoryId)?.name) || "Products"}</Text>
            <Text style={styles.headerSubtitle}>{combinedData.length}/12359 Products</Text>
          </View>
        </View>
        <View style={styles.headerRightSection}>
          <TouchableOpacity style={styles.headerIconBtn}><Ionicons name="search-outline" size={22} color="#000" /></TouchableOpacity>
          <TouchableOpacity style={styles.headerIconBtn} onPress={() => navigation.navigate('WishListScreen')}>
            <View>
                <Ionicons name="heart-outline" size={22} color="#000" />
                {wishlistItems.length > 0 && <View style={styles.cartBadge}><Text style={styles.cartBadgeText}>{wishlistItems.length}</Text></View>}
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIconBtn} onPress={() => navigation.navigate('AddToBagScreen')}>
             <Ionicons name="cart-outline" size={22} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={combinedData}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id || index.toString()}
        ListHeaderComponent={ListHeader}
        numColumns={2}
        columnWrapperStyle={styles.gridRow}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        onEndReached={() => { if (hasNextPage) fetchNextPage(); }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={(productsLoading || categoryLoading) ? <ActivityIndicator size="small" color={COLORS.primary} style={{ marginVertical: 20 }} /> : null}
      />
      <FilterModal visible={showFilterModal} onClose={() => setShowFilterModal(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  newHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12, paddingVertical: 10, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  headerLeftSection: { flexDirection: 'row', alignItems: 'center' },
  newBackButton: { marginRight: 8 },
  headerTitleContainer: { marginLeft: 4 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  headerSubtitle: { fontSize: 11, color: '#888', marginTop: 1 },
  headerRightSection: { flexDirection: 'row', alignItems: 'center' },
  headerIconBtn: { padding: 8, marginLeft: 4 },
  cartBadge: { position: 'absolute', top: -4, right: -4, backgroundColor: '#e53935', width: 14, height: 14, borderRadius: 7, justifyContent: 'center', alignItems: 'center' },
  cartBadgeText: { color: '#fff', fontSize: 8, fontWeight: 'bold' },
  gridRow: { justifyContent: 'space-between', paddingHorizontal: 12 },
  newProductCard: { width: (width - 36) / 2, marginBottom: 20, backgroundColor: '#fff' },
  newImageContainer: { width: '100%', height: 240, borderRadius: 15, overflow: 'hidden', backgroundColor: '#f5f5f5', position: 'relative' },
  newProductImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  overlayIconBtn: { position: 'absolute', bottom: 10, width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.9)', justifyContent: 'center', alignItems: 'center', elevation: 3 },
  newProductInfo: { paddingVertical: 10, paddingHorizontal: 4 },
  newProductTitle: { fontSize: 13, color: '#666', lineHeight: 18, marginBottom: 4 },
  newProductPrice: { fontSize: 15, fontWeight: 'bold', color: '#000' },
  heroContainer: { width: width, height: 220, backgroundColor: '#000', position: 'relative', overflow: 'hidden' },
  bannerWrapper: { width: width, height: 220, position: 'relative' },
  heroImage: { width: width, height: '100%' },
  bannerOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.25)' },
  bannerContent: { position: 'absolute', bottom: 40, left: 20 },
  bannerTag: { color: COLORS.primary, fontSize: 10, fontWeight: 'bold', letterSpacing: 2, marginBottom: 4 },
  bannerTitle: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  bannerBadge: { backgroundColor: '#fff', paddingHorizontal: 8, paddingVertical: 2, alignSelf: 'flex-start', borderRadius: 2 },
  bannerBadgeText: { color: '#000', fontSize: 10, fontWeight: 'bold' },
  paginationContainer: { position: 'absolute', bottom: 12, width: '100%', flexDirection: "row", justifyContent: "center" },
  paginationDot: { width: 6, height: 6, borderRadius: 3, marginHorizontal: 4 },
  activeDot: { backgroundColor: COLORS.white, width: 14 },
  inactiveDot: { backgroundColor: "rgba(255, 255, 255, 0.4)" },
  filterContainer: { backgroundColor: COLORS.white, paddingVertical: 16, marginBottom: 1 },
  filterItem: { alignItems: "center", marginRight: 16 },
  filterImage: { width: 65, height: 60, borderRadius: 50, backgroundColor: '#f0f0f0' },
  filterText: { fontSize: 11, color: '#444', marginTop: 6, fontWeight: "900" },
  activeFilterText: { color: COLORS.primary, fontWeight: "900" },
  filterUnderline: { width: 50, height: 3, backgroundColor: COLORS.primary, borderRadius: 2, marginTop: 4 },
  quickFiltersWrapper: { backgroundColor: COLORS.white, paddingVertical: 10, marginBottom: 10 },
  quickFiltersContainer: { paddingHorizontal: 16, gap: 10 },
  quickFilterChip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: COLORS.secondary, backgroundColor: COLORS.white },
  quickFilterText: { fontSize: 12, fontWeight: '600', color: COLORS.textPrimary },
  modalContainer: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  closeButtonContainer: { alignSelf: 'center', marginBottom: 10 },
  circleClose: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, height: '80%' },
  filterHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 20 },
  filterTitle: { fontSize: 18, fontWeight: 'bold' },
  clearText: { color: COLORS.primary, fontWeight: 'bold' },
  divider: { height: 1, backgroundColor: '#f0f0f0' },
  sidebar: { width: '35%', backgroundColor: '#f9f9f9' },
  sidebarItem: { padding: 20, flexDirection: 'row', alignItems: 'center' },
  activeSidebarItem: { backgroundColor: '#fff' },
  sidebarText: { fontSize: 14, color: '#666' },
  activeSidebarText: { color: COLORS.primary, fontWeight: 'bold' },
  activeIndicator: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, backgroundColor: COLORS.primary },
  rightContent: { width: '65%', padding: 20 },
  modalFooter: { padding: 20, borderTopWidth: 1, borderTopColor: '#f0f0f0' },
  applyButton: { backgroundColor: COLORS.primary, padding: 15, borderRadius: 10, alignItems: 'center' },
  applyButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  radioOuter: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#ddd', justifyContent: 'center', alignItems: 'center', marginLeft: 10 },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.primary },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.primary, marginLeft: 4 },
  sortOptionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15 },
  sortOptionText: { fontSize: 14, color: '#444' },
  filterContentContainer: { paddingBottom: 20 },
  boxContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  filterBox: { width: '47%', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#f0f0f0', alignItems: 'center' },
  boxText: { fontSize: 12, marginTop: 5, textAlign: 'center' },
  priceContainer: { gap: 15 },
  priceBox: { flexDirection: 'row', alignItems: 'center', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#f0f0f0' },
  priceText: { fontSize: 18, fontWeight: 'bold', marginRight: 10 },
  priceLabel: { fontSize: 14, color: '#444' },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  gridItem: { width: '47%', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#f0f0f0', alignItems: 'center' },
  gridText: { fontSize: 12, marginTop: 5, textAlign: 'center' },
  pillContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  pillItem: { paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#f0f0f0' },
  pillText: { fontSize: 12 },
  vegIconBorder: { width: 14, height: 14, borderWidth: 1, borderRadius: 2, justifyContent: 'center', alignItems: 'center' },
  vegIconDot: { width: 6, height: 6, borderRadius: 3 }
});