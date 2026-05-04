
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  FlatList,
  Image,
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useGetAllCategory } from "../../api/hooks/getAllCategory";
import { useGetAllVendors } from "../../api/hooks/useVender";
import { useGetInventoryByCategory } from "../../api/hooks/inventory";
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

  // 1. If it's a direct string
  if (typeof imageSource === 'string') return imageSource;

  // 2. If it's an object with .url
  if (imageSource.url) return imageSource.url;

  // 3. If it's an object with .image.url
  if (imageSource.image?.url) return imageSource.image.url;

  // 4. If it's an array, try the first element
  if (Array.isArray(imageSource) && imageSource.length > 0) {
    const first = imageSource[0];
    if (typeof first === 'string') return first;
    return first.url || first.image?.url || "https://via.placeholder.com/200";
  }

  // 5. Check deeply for any .url property if it's an object
  if (typeof imageSource === 'object') {
    // Common pattern in some APIs: { images: { url: '...' } }
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

interface VendorAPI {
  id: string;
  shopName?: string;
  companyName?: string;
  city?: string;
  images?: {
    url: string;
  };
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
  // { id: 'time', label: 'Time', icon: 'time-outline' },
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
      // 1. Zoom in during the display time
      Animated.timing(zoomAnim, {
        toValue: 1.15,
        duration: 5000,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        // 2. Fade out
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }).start(() => {
          // 3. Switch index and reset zoom
          setActiveIndex((prev) => (prev + 1) % BANNERS.length);
          zoomAnim.setValue(1);
          
          // 4. Fade back in
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
          style={[
            styles.heroImage,
            {
              opacity: fadeAnim,
              transform: [{ scale: zoomAnim }]
            }
          ]}
          resizeMode="cover"
        />
        <View style={styles.bannerOverlay} />
        
        {/* Banner Content (Static Text for Premium Look) */}
        <View style={styles.bannerContent}>
           <Text style={styles.bannerTag}>NEW ARRIVAL</Text>
           <Text style={styles.bannerTitle}>Season Collection</Text>
           <View style={styles.bannerBadge}>
              <Text style={styles.bannerBadgeText}>Up to 60% OFF</Text>
           </View>
        </View>

        {/* Custom Indicators */}
        <View style={styles.paginationContainer}>
          {BANNERS.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                activeIndex === index ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

// --- NEW FILTER MODAL COMPONENT ---

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
}

const FilterModal = ({ visible, onClose }: FilterModalProps) => {
  const [activeTab, setActiveTab] = useState<string>('sort');
  const [selectedSort, setSelectedSort] = useState<string>('relevance');

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

    const data = FILTER_CONTENT[activeTab];
    if (!data) return null;

    return (
      <View style={styles.filterContentContainer}>
        {activeTab === 'time' || activeTab === 'rating' ? (
          <View style={styles.boxContainer}>
            {data.map((item, index) => (
              <TouchableOpacity key={index} style={styles.filterBox}>
                <Ionicons
                  name={item.icon || 'help-outline'}
                  size={24}
                  color={item.color === 'green' ? '#2e7d32' : COLORS.textPrimary}
                />
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
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {isActive && <View style={styles.activeIndicator} />}
                        <View style={{ width: 30, alignItems: 'center' }}>
                          {item.id === 'price' ? (
                            <Text style={{ fontSize: 16, color: isActive ? COLORS.primary : COLORS.textSecondary, fontWeight: '700' }}>₹</Text>
                          ) : (
                            <Ionicons
                              name={item.icon}
                              size={20}
                              color={isActive ? COLORS.primary : COLORS.textSecondary}
                            />
                          )}
                        </View>
                        <View style={{ width: 8 }} />
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
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
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
  const [activeFilter, setActiveFilter] = useState<string>("Sort");
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);

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
                  if (filter.label === 'Sort') {
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
                    style={{ marginLeft: 4 }}
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

// --- UPDATED DYNAMIC FILTER SECTION (MATCHING HOME SCREEN CSS) ---

interface FilterSectionProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (id: string) => void;
}

const FilterSection = ({ categories, selectedCategory, onSelectCategory }: FilterSectionProps) => {
  return (
    <View style={styles.filterContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
        {categories && categories.map((item) => {
          const isSelected = selectedCategory === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              style={styles.filterItem}
              onPress={() => onSelectCategory(item.id)}
            >
              {/* Robust Image Resolution for Categories */}
              <Image source={{ uri: resolveImageUrl(item.image) }} style={styles.filterImage} />

              <Text style={[styles.filterText, isSelected && styles.activeFilterText]}>
                {item.name}
              </Text>

              {/* Underline for selected state, matching Home Screen */}
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
  const scaleValue = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scaleValue, { toValue: 0.98, useNativeDriver: true }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleValue, { toValue: 1, useNativeDriver: true }).start();
  };

  const oldPrice = parseInt(item.price) + 200;

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
          description: item.offerSub
        })}
      >
        <View style={styles.newImageContainer}>
          <Image source={{ uri: item.foodImage }} style={styles.newProductImage} />
          
          <View style={[styles.overlayIconBtn, { left: 8 }]}>
             <MaterialCommunityIcons name="layers-outline" size={18} color="#444" />
          </View>
          
          <TouchableOpacity style={[styles.overlayIconBtn, { right: 8 }]}>
             <Ionicons name="heart-outline" size={18} color="#444" />
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
  const navigation = useNavigation();
  const route = useRoute<any>();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(route.params?.categoryId || null);

  // 2. Fetch Category Data
  const { data: categoryData, isLoading: categoryLoading } = useGetAllCategory({});

  // --- API INTEGRATION ---
  const {
    data: productData,
    isLoading: productsLoading,
    fetchNextPage,
    hasNextPage
  } = useGetInventoryByCategory({
    limit: 20,
    search: search || undefined,
    categoryId: (selectedCategory && selectedCategory !== 'static_all') ? selectedCategory : (categoryData?.[0]?.id || '')
  });

  const isLoading = productsLoading || categoryLoading;

  // Flatten the pages into a single array
  const allProducts = productData?.pages.flatMap((page: any) => page.products) || [];
  
  // Combine Static Products with API Products
  const combinedData = useMemo(() => {
    return [...STATIC_PRODUCTS, ...allProducts];
  }, [allProducts]);


  // --- RENDER ITEM FOR FLATLIST ---
  const renderItem = ({ item }: { item: any }) => {
    // Check if it's static data or API data
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


  // --- HEADER COMPONENT ---
  const ListHeader = () => {
    return (
      <View style={{ height: 10 }} />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <View style={{ backgroundColor: COLORS.white }}>

        {/* --- MODIFIED HEADER: Back Button and Search Bar combined in one row --- */}
        <View style={styles.newHeader}>
          <View style={styles.headerLeftSection}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.newBackButton}>
              <Ionicons name="chevron-back" size={24} color="#000" />
            </TouchableOpacity>
            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerTitle}>{route.params?.category || "Women"}</Text>
              <Text style={styles.headerSubtitle}>{combinedData.length}/12359 Products</Text>
            </View>
          </View>

          <View style={styles.headerRightSection}>
            <TouchableOpacity style={styles.headerIconBtn}>
              <Ionicons name="search-outline" size={22} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIconBtn}>
              <Ionicons name="heart-outline" size={22} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIconBtn}>
              <View>
                <Ionicons name="cart-outline" size={22} color="#000" />
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>1</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
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
        onEndReached={() => {
          if (hasNextPage) fetchNextPage();
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={hasNextPage ? (
          <ActivityIndicator size="small" color={COLORS.primary} style={{ marginVertical: 20 }} />
        ) : null}
      />
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  newHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerLeftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newBackButton: {
    marginRight: 8,
  },
  headerTitleContainer: {
    marginLeft: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#888',
    marginTop: 1,
  },
  headerRightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIconBtn: {
    padding: 8,
    marginLeft: 4,
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#e53935',
    width: 14,
    height: 14,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 8,
    fontWeight: 'bold',
  },

  gridRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  newProductCard: {
    width: (width - 36) / 2,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  newImageContainer: {
    width: '100%',
    height: 240,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
    position: 'relative',
  },
  newProductImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlayIconBtn: {
    position: 'absolute',
    bottom: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  newProductInfo: {
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  newProductTitle: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    marginBottom: 4,
  },
  newProductPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },

  heroContainer: {
    width: width,
    height: 220,
    backgroundColor: '#000',
    position: 'relative',
    overflow: 'hidden',
  },
  bannerWrapper: {
    width: width,
    height: 220,
    position: 'relative',
  },
  heroImage: {
    width: width,
    height: '100%',
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  bannerContent: {
    position: 'absolute',
    bottom: 40,
    left: 20,
  },
  bannerTag: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 4,
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bannerBadge: {
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    borderRadius: 2,
  },
  bannerBadgeText: {
    color: '#000',
    fontSize: 10,
    fontWeight: 'bold',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 12,
    width: '100%',
    flexDirection: "row",
    justifyContent: "center",
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: COLORS.white,
    width: 14,
  },
  inactiveDot: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },

  filterContainer: {
    backgroundColor: COLORS.white,
    paddingVertical: 16,
    marginBottom: 1,
  },
  // --- UPDATED FILTER STYLES TO MATCH HOMESCREEN CATEGORIES ---
  filterItem: {
    alignItems: "center",
    marginRight: 16, // Matches categoryItem marginRight
  },
  filterImage: {
    width: 65,
    height: 60,
    borderRadius: 50,
    backgroundColor: '#f0f0f0', // Matches categoryImg
  },
  filterText: {
    fontSize: 11,
    color: '#444',
    marginTop: 6,
    fontWeight: "900", // Matches categoryText
  },
  activeFilterText: {
    color: COLORS.primary,
    fontWeight: "900", // Matches categoryTextSelected
  },
  filterUnderline: {
    width: 50,
    height: 3,
    backgroundColor: COLORS.primary,
    borderRadius: 2,
    marginTop: 4, // Matches categoryUnderline
  },
  // -------------------------------------------------------------

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
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    overflow: "hidden",
    marginBottom: 20,
  },

  restaurantHeader: {
    flexDirection: "row",
    padding: 12,
  },
  logoContainer: {
    alignItems: 'center',
    marginRight: 12,
  },
  logoImageWrapper: {
    width: 50,
    height: 50,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    position: 'relative'
  },
  cardDotContainer: {
    position: 'absolute',
    bottom: 3,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    marginHorizontal: 1,
  },
  logo: {
    width: '100%',
    height: '100%',
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
    fontSize: 13,
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
    fontSize: 10,
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