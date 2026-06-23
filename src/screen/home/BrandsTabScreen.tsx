import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Dimensions,
  TextInput,
  Platform,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useCartStore } from '../../store/useCartStore';

const { width } = Dimensions.get('window');

const sliderBrands = [
  {
    id: 'nike',
    name: 'Nike',
    tagline: 'Just Do It.',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=80',
    logo: 'https://logos.hunter.io/nike.com',
    bgColor: '#1e3a2f',
  },
  {
    id: 'adidas',
    name: 'Adidas',
    tagline: 'Impossible Is Nothing.',
    image: 'https://images.unsplash.com/photo-1518002171953-a080ee81be25?w=600&auto=format&fit=crop&q=80',
    logo: 'https://logos.hunter.io/adidas.com',
    bgColor: '#475569',
  },
];

const popularBrandsList = [
  {
    id: 'nike',
    name: 'Nike',
    products: '1250+ Products',
    logo: 'https://logos.hunter.io/nike.com',
  },
  {
    id: 'adidas',
    name: 'adidas',
    products: '980+ Products',
    logo: 'https://logos.hunter.io/adidas.com',
  },
  {
    id: 'puma',
    name: 'PUMA',
    products: '860+ Products',
    logo: 'https://logos.hunter.io/puma.com',
  },
  {
    id: 'hrx',
    name: 'HRX',
    products: '620+ Products',
    logo: 'https://logos.hunter.io/hrxbrand.com',
  },
  {
    id: 'uspolo',
    name: 'U.S. Polo',
    products: '540+ Products',
    logo: 'https://logos.hunter.io/uspoloassn.com',
  },
];

const categoriesList = [
  { id: 'men', name: 'Men', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=150&auto=format&fit=crop&q=80' },
  { id: 'women', name: 'Women', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
  { id: 'kids', name: 'Kids', image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=150&auto=format&fit=crop&q=80' },
  { id: 'footwear', name: 'Footwear', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&auto=format&fit=crop&q=80' },
  { id: 'accessories', name: 'Accessories', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&auto=format&fit=crop&q=80' },
  { id: 'bags', name: 'Bags', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=150&auto=format&fit=crop&q=80' },
];

const alphabets = ['All', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J'];

const allBrandsGrid = [
  {
    id: 'nike',
    name: 'Nike',
    products: '1250+ Products',
    rating: '4.6',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&auto=format&fit=crop&q=80',
    logo: 'https://logos.hunter.io/nike.com',
  },
  {
    id: 'adidas',
    name: 'adidas',
    products: '980+ Products',
    rating: '4.5',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&auto=format&fit=crop&q=80',
    logo: 'https://logos.hunter.io/adidas.com',
  },
  {
    id: 'puma',
    name: 'PUMA',
    products: '860+ Products',
    rating: '4.4',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&auto=format&fit=crop&q=80',
    logo: 'https://logos.hunter.io/puma.com',
  },
  {
    id: 'hrx',
    name: 'HRX',
    products: '620+ Products',
    rating: '4.3',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400&auto=format&fit=crop&q=80',
    logo: 'https://logos.hunter.io/hrxbrand.com',
  },
  {
    id: 'levis',
    name: "Levi's",
    products: '740+ Products',
    rating: '4.5',
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&auto=format&fit=crop&q=80',
    logo: 'https://logos.hunter.io/levis.com',
  },
  {
    id: 'jackjones',
    name: 'Jack & Jones',
    products: '510+ Products',
    rating: '4.2',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    logo: 'https://logos.hunter.io/jackjones.com',
  },
];

export default function BrandsTabScreen({ navigation }: any) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('All');
  const [sliderIndex, setSliderIndex] = useState(0);
  const { cartItems } = useCartStore();

  const handleBrandClick = (brandId: string) => {
    navigation.navigate('Brand', { brandName: brandId });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header matching mockup */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Brands</Text>
          <Text style={styles.headerSubtitle}>Top fashion brands for you</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIcon}>
            <MaterialIcons name="search" size={24} color="#0f172a" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.navigate('Cart')}>
            <View style={styles.badgeWrapper}>
              <MaterialIcons name="shopping-bag" size={24} color="#0f172a" />
              {cartItems.length > 0 && (
                <View style={styles.badge}><Text style={styles.badgeText}>{cartItems.length}</Text></View>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Search & Filter Bar */}
        <View style={styles.searchRow}>
          <View style={styles.searchInputBox}>
            <MaterialIcons name="search" size={20} color="#94a3b8" style={{ marginRight: 8 }} />
            <TextInput 
              placeholder="Search for brands..." 
              placeholderTextColor="#94a3b8"
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.textInput}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <MaterialIcons name="tune" size={18} color="#0f172a" style={{ marginRight: 6 }} />
            <Text style={styles.filterText}>Filter</Text>
          </TouchableOpacity>
        </View>

        {/* Hero Slider Carousel */}
        <View style={styles.sliderContainer}>
          <View style={[styles.slideCard, { backgroundColor: '#14532d' }]}>
            <View style={styles.slideLeft}>
              <Text style={styles.slideBrandLogo}>NIKE</Text>
              <Text style={styles.slideTagline}>Just Do It.</Text>
              <TouchableOpacity style={styles.shopNowBtn} onPress={() => handleBrandClick('nike')}>
                <Text style={styles.shopNowText}>Shop Now</Text>
                <MaterialIcons name="chevron-right" size={14} color="#0f172a" />
              </TouchableOpacity>
            </View>
            <View style={styles.slideRight}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&auto=format&fit=crop&q=80' }} 
                style={styles.slideImage} 
              />
            </View>
          </View>

          {/* Right Scroll Arrow Overlay */}
          <TouchableOpacity style={styles.sliderArrowBtn} activeOpacity={0.8}>
            <MaterialIcons name="chevron-right" size={20} color="#0f172a" />
          </TouchableOpacity>

          {/* Slider Dots */}
          <View style={styles.sliderDotsRow}>
            <View style={[styles.sliderDot, styles.sliderDotActive]} />
            <View style={styles.sliderDot} />
            <View style={styles.sliderDot} />
            <View style={styles.sliderDot} />
          </View>
        </View>

        {/* Popular Brands Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Brands</Text>
          <TouchableOpacity style={styles.viewAllRow}>
            <Text style={styles.viewAllText}>View All</Text>
            <MaterialIcons name="chevron-right" size={16} color="#7c3aed" />
          </TouchableOpacity>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.popularBrandsScroll}
        >
          {popularBrandsList.map((brand) => (
            <TouchableOpacity 
              key={brand.id} 
              style={styles.popularBrandCard} 
              activeOpacity={0.8}
              onPress={() => handleBrandClick(brand.id)}
            >
              <View style={styles.brandLogoBox}>
                <Image source={{ uri: brand.logo }} style={styles.brandLogoImage} resizeMode="contain" />
              </View>
              <Text style={styles.popularBrandName}>{brand.name}</Text>
              <Text style={styles.popularBrandProducts}>{brand.products}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Purple Promo Banner */}
        <View style={styles.promoBanner}>
          <View style={styles.promoLeft}>
            <View style={styles.promoPercentCircle}>
              <Text style={styles.promoPercentText}>%</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.promoTitle}>Up to 50% Off on Top Brands</Text>
              <Text style={styles.promoSub}>Grab the best deals on your favourite brands</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.promoShopBtn}>
            <Text style={styles.promoShopText}>Shop Offers</Text>
            <MaterialIcons name="chevron-right" size={14} color="#7c3aed" />
          </TouchableOpacity>
        </View>

        {/* Brands by Category */}
        <Text style={[styles.sectionTitle, { marginBottom: 12 }]}>Brands by Category</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.categoriesScroll}
        >
          {categoriesList.map((cat) => (
            <TouchableOpacity key={cat.id} style={styles.categoryCircleCard} activeOpacity={0.8}>
              <View style={styles.categoryCircle}>
                <Image source={{ uri: cat.image }} style={styles.categoryImage} />
              </View>
              <Text style={styles.categoryLabel}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* All Brands (A - Z) */}
        <Text style={[styles.sectionTitle, { marginTop: 24, marginBottom: 12 }]}>All Brands (A - Z)</Text>
        
        {/* Alphabets Scroller */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.alphabetsScroll}
        >
          {alphabets.map((letter) => {
            const isSelected = selectedLetter === letter;
            return (
              <TouchableOpacity 
                key={letter} 
                style={[styles.letterBadge, isSelected && styles.letterBadgeActive]}
                onPress={() => setSelectedLetter(letter)}
              >
                <Text style={[styles.letterText, isSelected && styles.letterTextActive]}>{letter}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Brands Grid Layout */}
        <View style={styles.brandsGrid}>
          {allBrandsGrid.map((brand) => (
            <TouchableOpacity 
              key={brand.id} 
              style={styles.gridCard} 
              activeOpacity={0.9}
              onPress={() => handleBrandClick(brand.id)}
            >
              <View style={styles.gridImageContainer}>
                <Image source={{ uri: brand.image }} style={styles.gridImage} />
                <View style={styles.gridOverlay} />
                {/* Brand Logo Watermark/Overlay inside image */}
                {brand.logo && (
                  <View style={styles.gridLogoOverlay}>
                    <Image source={{ uri: brand.logo }} style={styles.gridLogoImage} resizeMode="contain" />
                  </View>
                )}
              </View>
              
              <View style={styles.gridFooter}>
                <View style={styles.gridTextInfo}>
                  <Text style={styles.gridBrandName}>{brand.name}</Text>
                  <Text style={styles.gridBrandProducts}>{brand.products}</Text>
                </View>
                {/* Rating badge */}
                <View style={styles.gridRatingBadge}>
                  <Text style={styles.gridRatingVal}>{brand.rating}</Text>
                  <MaterialIcons name="star" size={10} color="#16a34a" style={{ marginLeft: 2 }} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#f1f5f9',
    backgroundColor: '#ffffff',
  },
  headerLeft: {
    flexDirection: 'column',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0f172a',
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginLeft: 16,
    padding: 4,
  },
  badgeWrapper: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#ef4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 8,
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 40,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchInputBox: {
    flex: 1,
    height: 40,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 13,
    color: '#0f172a',
    padding: 0,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0f172a',
  },
  sliderContainer: {
    height: 160,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 24,
  },
  slideCard: {
    flex: 1,
    flexDirection: 'row',
  },
  slideLeft: {
    flex: 1.2,
    padding: 20,
    justifyContent: 'center',
  },
  slideBrandLogo: {
    fontSize: 32,
    fontWeight: '900',
    color: '#ffffff',
    fontStyle: 'italic',
    letterSpacing: -1,
  },
  slideTagline: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.85)',
    fontWeight: '700',
    marginTop: 4,
  },
  shopNowBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 14,
  },
  shopNowText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0f172a',
  },
  slideRight: {
    flex: 1,
    position: 'relative',
  },
  slideImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  sliderArrowBtn: {
    position: 'absolute',
    right: 12,
    top: '50%',
    marginTop: -18,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  sliderDotsRow: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  sliderDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 3,
  },
  sliderDotActive: {
    backgroundColor: '#ffffff',
    width: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: '#0f172a',
  },
  viewAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#7c3aed',
  },
  popularBrandsScroll: {
    paddingRight: 8,
    marginBottom: 24,
  },
  popularBrandCard: {
    width: 104,
    marginRight: 12,
    alignItems: 'center',
  },
  brandLogoBox: {
    width: 104,
    height: 54,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandLogoImage: {
    width: '65%',
    height: '65%',
  },
  popularBrandName: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0f172a',
    marginTop: 6,
    textAlign: 'center',
  },
  popularBrandProducts: {
    fontSize: 9,
    color: '#94a3b8',
    marginTop: 1,
    textAlign: 'center',
  },
  promoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#faf5ff',
    borderWidth: 1,
    borderColor: '#f3e8ff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 24,
  },
  promoLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  promoPercentCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f3e8ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  promoPercentText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#7c3aed',
  },
  promoTitle: {
    fontSize: 12,
    fontWeight: '900',
    color: '#0f172a',
  },
  promoSub: {
    fontSize: 9,
    color: '#64748b',
    marginTop: 1,
  },
  promoShopBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  promoShopText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#7c3aed',
  },
  categoriesScroll: {
    paddingRight: 8,
    marginBottom: 16,
  },
  categoryCircleCard: {
    alignItems: 'center',
    marginRight: 14,
  },
  categoryCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    overflow: 'hidden',
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  categoryLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#0f172a',
    marginTop: 6,
  },
  alphabetsScroll: {
    paddingRight: 8,
    marginBottom: 16,
  },
  letterBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: '#f1f5f9',
    marginRight: 8,
  },
  letterBadgeActive: {
    backgroundColor: '#7c3aed',
  },
  letterText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748b',
  },
  letterTextActive: {
    color: '#ffffff',
  },
  brandsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  gridCard: {
    width: (width - 44) / 2,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 2,
  },
  gridImageContainer: {
    height: 110,
    width: '100%',
    position: 'relative',
    backgroundColor: '#f8fafc',
  },
  gridImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  },
  gridLogoOverlay: {
    position: 'absolute',
    left: 8,
    bottom: 8,
    width: 38,
    height: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
  },
  gridLogoImage: {
    width: '100%',
    height: '100%',
  },
  gridFooter: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  gridTextInfo: {
    flex: 1,
  },
  gridBrandName: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0f172a',
  },
  gridBrandProducts: {
    fontSize: 9,
    color: '#94a3b8',
    marginTop: 2,
  },
  gridRatingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dcfce7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  gridRatingVal: {
    fontSize: 9,
    fontWeight: '800',
    color: '#16a34a',
  },
});
