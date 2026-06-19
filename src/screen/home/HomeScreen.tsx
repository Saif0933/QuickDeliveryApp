import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useCartStore } from '../../store/useCartStore';

const { width } = Dimensions.get('window');

// Mock data for recommended items
const recommendedItems = [
  {
    id: '1',
    name: 'Casual Green Shirt',
    category: 'Men',
    price: '₹1,299',
    image: 'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=400&auto=format&fit=crop&q=80',
    liked: true,
  },
  {
    id: '2',
    name: 'Floral Pink Dress',
    category: 'Women',
    price: '₹1,899',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&auto=format&fit=crop&q=80',
    liked: false,
  },
  {
    id: '3',
    name: 'Classic Denim Shirt',
    category: 'Men',
    price: '₹1,699',
    image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=400&auto=format&fit=crop&q=80',
    liked: false,
  },
  {
    id: '4',
    name: 'Kids Striped Tee',
    category: 'Kids',
    price: '₹799',
    image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=400&auto=format&fit=crop&q=80',
    liked: true,
  },
];

// Mock data for brand logos (using reliable Wikimedia Commons PNG URLs with User-Agent header to prevent 403 blocks)
const brandLogos: { [key: string]: { uri: string, headers: { 'User-Agent': string } } } = {
  nike: {
    uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/250px-Logo_NIKE.svg.png',
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36' }
  },
  adidas: {
    uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/250px-Adidas_Logo.svg.png',
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36' }
  },
  zara: {
    uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Zara_Logo.svg/250px-Zara_Logo.svg.png',
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36' }
  },
  levis: {
    uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Levi%27s_logo.svg/250px-Levi%27s_logo.svg.png',
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36' }
  },
  hm: {
    uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/250px-H%26M-Logo.svg.png',
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36' }
  },
  puma: {
    uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Puma_Logo.svg/250px-Puma_Logo.svg.png',
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36' }
  },
};

export default function HomeScreen({ navigation }: any) {
  const [searchQuery, setSearchQuery] = useState('');
  const { cartItems } = useCartStore();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} activeOpacity={0.8}>
          <MaterialIcons name="menu" size={24} color="#0f172a" />
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={20} color="#64748b" style={{ marginRight: 6 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for products, brands & more"
            placeholderTextColor="#64748b"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <TouchableOpacity style={styles.headerIconButton} activeOpacity={0.8}>
          <MaterialIcons name="favorite-border" size={22} color="#0f172a" />
          <View style={styles.badgeCount}>
            <Text style={styles.badgeText}>2</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.headerIconButton} 
          activeOpacity={0.8} 
          onPress={() => navigation.navigate('Cart')}
        >
          <MaterialIcons name="shopping-bag" size={22} color="#0f172a" />
          {cartItems.length > 0 && (
            <View style={styles.badgeCount}>
              <Text style={styles.badgeText}>{cartItems.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Main Hero Banner */}
        <View style={styles.heroBannerContainer}>
          <View style={styles.heroBanner}>
            <View style={styles.heroTextSection}>
              <Text style={styles.heroLabel}>NEW COLLECTION</Text>
              <Text style={styles.heroTitle}>Spring{"\n"}Summer '24</Text>
              <Text style={styles.heroSubtitle}>Fresh styles for every{"\n"}moment of your day.</Text>
              <TouchableOpacity style={styles.heroButton} activeOpacity={0.8}>
                <Text style={styles.heroButtonText}>SHOP NOW</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.heroImageWrapper}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&auto=format&fit=crop&q=80' }} 
                style={styles.heroImage} 
                resizeMode="cover"
              />
            </View>
          </View>
          {/* Carousel Dots */}
          <View style={styles.carouselDots}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>

        {/* Horizontal Category Cards */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.categoryBannersContainer}
        >
          {/* Men Banner */}
          <TouchableOpacity style={[styles.categoryBannerCard, { backgroundColor: '#E3ECE7' }]} activeOpacity={0.9}>
            <View style={styles.categoryBannerText}>
              <Text style={styles.categoryBannerTitle}>MEN</Text>
              <Text style={styles.categoryBannerSubtitle}>Explore Now</Text>
              <View style={styles.categoryBannerButton}>
                <MaterialIcons name="arrow-forward" size={14} color="#0f172a" />
              </View>
            </View>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80' }} 
              style={styles.categoryBannerImage} 
            />
          </TouchableOpacity>

          {/* Women Banner */}
          <TouchableOpacity style={[styles.categoryBannerCard, { backgroundColor: '#FCEAE8' }]} activeOpacity={0.9}>
            <View style={styles.categoryBannerText}>
              <Text style={styles.categoryBannerTitle}>WOMEN</Text>
              <Text style={styles.categoryBannerSubtitle}>Explore Now</Text>
              <View style={styles.categoryBannerButton}>
                <MaterialIcons name="arrow-forward" size={14} color="#0f172a" />
              </View>
            </View>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80' }} 
              style={styles.categoryBannerImage} 
            />
          </TouchableOpacity>

          {/* Kids Banner */}
          <TouchableOpacity style={[styles.categoryBannerCard, { backgroundColor: '#F8F0DD' }]} activeOpacity={0.9}>
            <View style={styles.categoryBannerText}>
              <Text style={styles.categoryBannerTitle}>KIDS</Text>
              <Text style={styles.categoryBannerSubtitle}>Explore Now</Text>
              <View style={styles.categoryBannerButton}>
                <MaterialIcons name="arrow-forward" size={14} color="#0f172a" />
              </View>
            </View>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=400&auto=format&fit=crop&q=80' }} 
              style={styles.categoryBannerImage} 
            />
          </TouchableOpacity>
        </ScrollView>

        {/* Circular Category Grid */}
        <View style={styles.iconCategoryGrid}>
          <TouchableOpacity style={styles.iconCategoryCard} onPress={() => navigation.navigate('ProductList', { categoryName: 'T-Shirts' })}>
            <View style={[styles.iconCircle, { backgroundColor: '#e0f2fe', borderColor: '#bae6fd' }]}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=150&auto=format&fit=crop&q=80' }} 
                style={styles.iconCategoryImage} 
              />
            </View>
            <Text style={styles.iconCategoryLabel}>T-Shirts</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconCategoryCard} onPress={() => navigation.navigate('ProductList', { categoryName: 'Shirts' })}>
            <View style={[styles.iconCircle, { backgroundColor: '#faf5ff', borderColor: '#e9d5ff' }]}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=150&auto=format&fit=crop&q=80' }} 
                style={styles.iconCategoryImage} 
              />
            </View>
            <Text style={styles.iconCategoryLabel}>Shirts</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconCategoryCard} onPress={() => navigation.navigate('ProductList', { categoryName: 'Jeans' })}>
            <View style={[styles.iconCircle, { backgroundColor: '#eef2ff', borderColor: '#c7d2fe' }]}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=150&auto=format&fit=crop&q=80' }} 
                style={styles.iconCategoryImage} 
              />
            </View>
            <Text style={styles.iconCategoryLabel}>Jeans</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconCategoryCard} onPress={() => navigation.navigate('ProductList', { categoryName: 'Dresses' })}>
            <View style={[styles.iconCircle, { backgroundColor: '#fff1f2', borderColor: '#fecdd3' }]}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=150&auto=format&fit=crop&q=80' }} 
                style={styles.iconCategoryImage} 
              />
            </View>
            <Text style={styles.iconCategoryLabel}>Dresses</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconCategoryCard} onPress={() => navigation.navigate('ProductList', { categoryName: 'Shoes' })}>
            <View style={[styles.iconCircle, { backgroundColor: '#fef3c7', borderColor: '#fde68a' }]}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&auto=format&fit=crop&q=80' }} 
                style={styles.iconCategoryImage} 
              />
            </View>
            <Text style={styles.iconCategoryLabel}>Shoes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconCategoryCard} onPress={() => navigation.navigate('Categories')}>
            <View style={[styles.iconCircle, { backgroundColor: '#f0fdf4', borderColor: '#bbf7d0' }]}>
              <MaterialIcons name="grid-view" size={20} color="#16a34a" />
            </View>
            <Text style={styles.iconCategoryLabel}>View All</Text>
          </TouchableOpacity>
        </View>

        {/* Brand Fest Banner */}
        <View style={styles.brandFestCard}>
          <View style={styles.brandFestLeft}>
            <Text style={styles.brandFestTitle}>BRAND{"\n"}FEST</Text>
            <Text style={styles.brandFestSubtitle}>
              Up to <Text style={{ color: '#FFC72C', fontWeight: '900' }}>60%</Text> Off
            </Text>
            <TouchableOpacity style={styles.brandFestButton} activeOpacity={0.8}>
              <Text style={styles.brandFestButtonText}>SHOP NOW</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.brandFestRight}>
            {/* Tilted overlapping cards containing brand logos */}
            <TouchableOpacity style={[styles.tiltedCard, styles.cardNike]} onPress={() => navigation.navigate('Brand', { brandName: 'nike' })}>
              <Image source={brandLogos.nike} style={styles.tiltedLogo} resizeMode="contain" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.tiltedCard, styles.cardAdidas]} onPress={() => navigation.navigate('Brand', { brandName: 'adidas' })}>
              <Image source={brandLogos.adidas} style={styles.tiltedLogo} resizeMode="contain" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.tiltedCard, styles.cardZara]} onPress={() => navigation.navigate('Brand', { brandName: 'zara' })}>
              <Image source={brandLogos.zara} style={styles.tiltedLogo} resizeMode="contain" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.tiltedCard, styles.cardHM]} onPress={() => navigation.navigate('Brand', { brandName: 'hm' })}>
              <Image source={brandLogos.hm} style={styles.tiltedLogo} resizeMode="contain" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Top Brands Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top Brands</Text>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.seeAllText}>View All</Text>
            <MaterialIcons name="arrow-forward" size={14} color="#64748b" style={{ marginLeft: 2 }} />
          </TouchableOpacity>
        </View>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.brandsScrollContainer}
        >
          {['nike', 'adidas', 'zara', 'levis', 'hm', 'puma'].map((brand, index) => (
            <TouchableOpacity key={index} style={styles.brandLogoCard} onPress={() => navigation.navigate('Brand', { brandName: brand })}>
              <Image source={brandLogos[brand]} style={styles.brandLogoImage} resizeMode="contain" />
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Recommended For You Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended For You</Text>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.seeAllText}>View All</Text>
            <MaterialIcons name="arrow-forward" size={14} color="#64748b" style={{ marginLeft: 2 }} />
          </TouchableOpacity>
        </View>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.recommendedScrollContainer}
        >
          {recommendedItems.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.recProductCard} 
              activeOpacity={0.9}
              onPress={() => navigation.navigate('ProductDetail', { product: item })}
            >
              <Image source={{ uri: item.image }} style={styles.recProductImage} />
              <TouchableOpacity style={styles.heartButton} activeOpacity={0.8}>
                <MaterialIcons name="favorite" size={16} color={item.liked ? "#ef4444" : "#cbd5e1"} />
              </TouchableOpacity>
              <View style={styles.recProductInfo}>
                <Text style={styles.recProductCategory}>{item.category}</Text>
                <Text style={styles.recProductName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.recProductPrice}>{item.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderColor: '#f1f5f9',
  },
  menuButton: {
    marginRight: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 25,
    paddingHorizontal: 16,
    height: 44,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#0f172a',
    padding: 0,
    fontWeight: '500',
  },
  headerIconButton: {
    position: 'relative',
    padding: 4,
    marginLeft: 8,
  },
  badgeCount: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#0f172a',
    borderRadius: 8,
    width: 15,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: '800',
  },
  scrollContent: {
    paddingBottom: 60,
    backgroundColor: '#fcfcfc',
  },
  heroBannerContainer: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  heroBanner: {
    backgroundColor: '#FAF6F0',
    borderRadius: 24,
    height: 200,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  heroTextSection: {
    flex: 1.1,
    paddingLeft: 20,
    justifyContent: 'center',
  },
  heroLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#8C6E5A',
    letterSpacing: 2,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E1E1E',
    marginTop: 6,
    lineHeight: 28,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  heroSubtitle: {
    fontSize: 11,
    color: '#6E6E6E',
    marginTop: 6,
    lineHeight: 15,
  },
  heroButton: {
    backgroundColor: '#1E1E1E',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginTop: 14,
  },
  heroButtonText: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1,
  },
  heroImageWrapper: {
    flex: 0.9,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  carouselDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#e2e8f0',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#1E1E1E',
    width: 8,
    height: 8,
  },
  categoryBannersContainer: {
    paddingLeft: 16,
    paddingRight: 8,
    marginTop: 20,
  },
  categoryBannerCard: {
    width: 145,
    height: 100,
    borderRadius: 20,
    flexDirection: 'row',
    marginRight: 12,
    overflow: 'hidden',
  },
  categoryBannerText: {
    flex: 1.1,
    paddingLeft: 14,
    justifyContent: 'center',
    zIndex: 2,
  },
  categoryBannerTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1e2022',
  },
  categoryBannerSubtitle: {
    fontSize: 9,
    color: '#64748b',
    marginTop: 2,
    fontWeight: '500',
  },
  categoryBannerButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  categoryBannerImage: {
    width: 70,
    height: '100%',
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  iconCategoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
    marginTop: 24,
    justifyContent: 'space-between',
  },
  iconCategoryCard: {
    width: (width - 16) / 6 - 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
    overflow: 'hidden',
  },
  iconCategoryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  iconCategoryEmoji: {
    fontSize: 24,
  },
  iconCategoryLabel: {
    fontSize: 10,
    color: '#0f172a',
    fontWeight: '700',
    marginTop: 8,
    textAlign: 'center',
  },
  brandFestCard: {
    backgroundColor: '#161819',
    marginHorizontal: 16,
    borderRadius: 24,
    height: 130,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 12,
    overflow: 'hidden',
  },
  brandFestLeft: {
    flex: 1.1,
    justifyContent: 'center',
  },
  brandFestTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#ffffff',
    lineHeight: 22,
    letterSpacing: 0.5,
  },
  brandFestSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  brandFestButton: {
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 14,
    marginTop: 12,
  },
  brandFestButtonText: {
    color: '#161819',
    fontSize: 9,
    fontWeight: '800',
  },
  brandFestRight: {
    flex: 0.9,
    height: '100%',
    position: 'relative',
  },
  tiltedCard: {
    position: 'absolute',
    width: 48,
    height: 64,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  tiltedLogo: {
    width: 32,
    height: 32,
  },
  cardNike: {
    left: -12,
    bottom: 30,
    transform: [{ rotate: '-18deg' }],
    zIndex: 4,
  },
  cardAdidas: {
    left: 18,
    bottom: 40,
    transform: [{ rotate: '-6deg' }],
    zIndex: 3,
  },
  cardZara: {
    left: 48,
    bottom: 35,
    transform: [{ rotate: '12deg' }],
    zIndex: 2,
  },
  cardHM: {
    left: 78,
    bottom: 20,
    transform: [{ rotate: '24deg' }],
    zIndex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 28,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
  },
  brandsScrollContainer: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  brandLogoCard: {
    width: 70,
    height: 50,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  brandLogoImage: {
    width: 44,
    height: 30,
  },
  recommendedScrollContainer: {
    paddingLeft: 16,
    paddingRight: 8,
    paddingBottom: 20,
  },
  recProductCard: {
    width: 140,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginRight: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
  },
  recProductImage: {
    width: '100%',
    height: 155,
    backgroundColor: '#f8fafc',
  },
  heartButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  recProductInfo: {
    padding: 10,
  },
  recProductCategory: {
    fontSize: 8,
    fontWeight: '700',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  recProductName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0f172a',
    marginTop: 2,
  },
  recProductPrice: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0f172a',
    marginTop: 4,
  },
});
