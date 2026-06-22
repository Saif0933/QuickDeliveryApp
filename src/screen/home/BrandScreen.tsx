import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';

const { width } = Dimensions.get('window');

// Brand-specific mock data structure
const brandData: {
  [key: string]: {
    name: string;
    tagline: string;
    logo: string;
    promoImage: string;
    promoTitle: string;
    promoSubtitle: string;
    heroImage: string;
    heroTitle: string;
    heroSubtitle: string;
    topPicks: Array<{
      id: string;
      name: string;
      category: string;
      price: string;
      rating: string;
      image: string;
      liked: boolean;
    }>;
    bestSellers: Array<{
      id: string;
      name: string;
      category: string;
      price: string;
      rating: string;
      image: string;
      liked: boolean;
    }>;
    categories: Array<{
      id: string;
      name: string;
      icon: string;
    }>;
  };
} = {
  nike: {
    name: 'NIKE',
    tagline: 'Just Do It.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/250px-Logo_NIKE.svg.png',
    promoImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=80',
    promoTitle: 'UP TO 40% OFF',
    promoSubtitle: 'On selected styles',
    heroImage: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&auto=format&fit=crop&q=80',
    heroTitle: 'GEAR UP FOR GREATNESS',
    heroSubtitle: 'Performance meets style.\nDesigned to move with you.',
    topPicks: [
      {
        id: '1',
        name: 'Nike Air Max 270',
        category: "Men's Shoes",
        price: '₹12,995',
        rating: '4.8',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=80',
        liked: false,
      },
      {
        id: '2',
        name: 'Nike Sportswear Club',
        category: "Men's Hoodie",
        price: '₹4,495',
        rating: '4.5',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&auto=format&fit=crop&q=80',
        liked: true,
      },
      {
        id: '3',
        name: 'Nike One High-Rise',
        category: "Women's Leggings",
        price: '₹3,295',
        rating: '4.7',
        image: 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?w=400&auto=format&fit=crop&q=80',
        liked: false,
      },
      {
        id: '4',
        name: 'Nike Heritage Backpack',
        category: 'Accessories',
        price: '₹2,495',
        rating: '4.4',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&auto=format&fit=crop&q=80',
        liked: false,
      },
    ],
    bestSellers: [
      {
        id: 'b1',
        name: 'Nike Dri-FIT T-Shirt',
        category: "Men's T-Shirt",
        price: '₹1,799',
        rating: '4.5',
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&auto=format&fit=crop&q=80',
        liked: true,
      },
      {
        id: 'b2',
        name: 'Nike Court Vision Low',
        category: "Men's Shoes",
        price: '₹5,695',
        rating: '4.4',
        image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&auto=format&fit=crop&q=80',
        liked: false,
      },
      {
        id: 'b3',
        name: 'Nike Swoosh Medium',
        category: "Women's Sports Bra",
        price: '₹2,695',
        rating: '4.6',
        image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=400&auto=format&fit=crop&q=80',
        liked: false,
      },
      {
        id: 'b4',
        name: 'Nike Challenger Shorts',
        category: "Men's Shorts",
        price: '₹2,195',
        rating: '4.3',
        image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
        liked: false,
      },
    ],
    categories: [
      { id: 'c1', name: 'Running', icon: 'directions-run' },
      { id: 'c2', name: 'Training', icon: 'fitness-center' },
      { id: 'c3', name: 'Lifestyle', icon: 'explore' },
      { id: 'c4', name: 'Jackets', icon: 'wb-cloudy' },
      { id: 'c5', name: 'T-Shirts', icon: 'checkroom' },
    ],
  },
  adidas: {
    name: 'ADIDAS',
    tagline: 'Impossible Is Nothing.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/250px-Adidas_Logo.svg.png',
    promoImage: 'https://images.unsplash.com/photo-1518049362265-d5b2a6467637?w=400&auto=format&fit=crop&q=80',
    promoTitle: 'FLAT 35% OFF',
    promoSubtitle: 'On Ultraboost Series',
    heroImage: 'https://images.unsplash.com/photo-1502224562085-639556652f33?w=800&auto=format&fit=crop&q=80',
    heroTitle: 'OWN THE ROAD',
    heroSubtitle: 'Engineered for response.\nDesigned for daily performance.',
    topPicks: [
      {
        id: 'ad1',
        name: 'Adidas Ultraboost 1.0',
        category: 'Running Shoes',
        price: '₹14,999',
        rating: '4.9',
        image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&auto=format&fit=crop&q=80',
        liked: false,
      },
      {
        id: 'ad2',
        name: 'Adidas Adicolor Hoodie',
        category: 'Sportswear',
        price: '₹5,999',
        rating: '4.7',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&auto=format&fit=crop&q=80',
        liked: false,
      },
    ],
    bestSellers: [
      {
        id: 'ad_b1',
        name: 'Adidas Stan Smith',
        category: 'Classics',
        price: '₹8,999',
        rating: '4.8',
        image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&auto=format&fit=crop&q=80',
        liked: true,
      },
    ],
    categories: [
      { id: 'c1', name: 'Running', icon: 'directions-run' },
      { id: 'c2', name: 'Training', icon: 'fitness-center' },
      { id: 'c3', name: 'Originals', icon: 'explore' },
    ],
  },
  zara: {
    name: 'ZARA',
    tagline: 'Love your look.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Zara_Logo.svg/250px-Zara_Logo.svg.png',
    promoImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&auto=format&fit=crop&q=80',
    promoTitle: 'UP TO 50% OFF',
    promoSubtitle: 'On summer collection',
    heroImage: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=80',
    heroTitle: 'ELEGANCE & STYLE',
    heroSubtitle: 'Contemporary fashion statements.\nCrafted for modern lifestyle.',
    topPicks: [
      {
        id: 'zr1',
        name: 'Zara Linen Blend Blazer',
        category: 'Men Blazer',
        price: '₹6,990',
        rating: '4.6',
        image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=400&auto=format&fit=crop&q=80',
        liked: false,
      },
      {
        id: 'zr2',
        name: 'Zara Floral Summer Dress',
        category: 'Women Dress',
        price: '₹3,990',
        rating: '4.8',
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&auto=format&fit=crop&q=80',
        liked: false,
      },
    ],
    bestSellers: [
      {
        id: 'zr_b1',
        name: 'Zara Double Breasted Coat',
        category: 'Women Outerwear',
        price: '₹8,990',
        rating: '4.7',
        image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
        liked: true,
      },
    ],
    categories: [
      { id: 'c1', name: 'Suits', icon: 'business' },
      { id: 'c2', name: 'Dresses', icon: 'accessibility' },
      { id: 'c3', name: 'Accessories', icon: 'explore' },
    ],
  },
  levis: {
    name: "LEVI'S",
    tagline: "Live in Levi's.",
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Levi_Strauss_%26_Co._logo.svg/250px-Levi_Strauss_%26_Co._logo.svg.png',
    promoImage: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&auto=format&fit=crop&q=80',
    promoTitle: 'FLAT 25% OFF',
    promoSubtitle: 'On original denim collection',
    heroImage: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=800&auto=format&fit=crop&q=80',
    heroTitle: 'ORIGINAL DENIM CRAFT',
    heroSubtitle: 'Quality materials since 1873.\nBuilt to last a lifetime.',
    topPicks: [
      {
        id: 'lv1',
        name: "Levi's 511 Slim Fit Jeans",
        category: 'Men Denim',
        price: '₹4,199',
        rating: '4.7',
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&auto=format&fit=crop&q=80',
        liked: false,
      },
      {
        id: 'lv2',
        name: "Levi's Denim Trucker Jacket",
        category: 'Unisex Jacket',
        price: '₹5,599',
        rating: '4.8',
        image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&auto=format&fit=crop&q=80',
        liked: false,
      },
    ],
    bestSellers: [
      {
        id: 'lv_b1',
        name: "Levi's Batwing Logo Tee",
        category: 'Graphic T-Shirt',
        price: '₹1,499',
        rating: '4.5',
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&auto=format&fit=crop&q=80',
        liked: true,
      },
    ],
    categories: [
      { id: 'c1', name: 'Denim', icon: 'checkroom' },
      { id: 'c2', name: 'Jackets', icon: 'wb-cloudy' },
      { id: 'c3', name: 'Tees', icon: 'explore' },
    ],
  },
  hm: {
    name: 'H&M',
    tagline: 'Fashion & Quality at the Best Price.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/250px-H%26M-Logo.svg.png',
    promoImage: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&auto=format&fit=crop&q=80',
    promoTitle: 'UP TO 40% OFF',
    promoSubtitle: 'On winter wear essentials',
    heroImage: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&auto=format&fit=crop&q=80',
    heroTitle: 'EVERYDAY ESSENTIALS',
    heroSubtitle: 'Minimalistic designs.\nUnmatched comfort and fit.',
    topPicks: [
      {
        id: 'hm1',
        name: 'HM Relaxed Fit Hoodie',
        category: 'Unisex Hoodie',
        price: '₹2,299',
        rating: '4.6',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&auto=format&fit=crop&q=80',
        liked: false,
      },
      {
        id: 'hm2',
        name: 'HM Cotton Chino Pants',
        category: 'Men Pants',
        price: '₹1,999',
        rating: '4.4',
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&auto=format&fit=crop&q=80',
        liked: false,
      },
    ],
    bestSellers: [
      {
        id: 'hm_b1',
        name: 'HM Linen Blend Shirt',
        category: 'Men Casual Shirt',
        price: '₹1,799',
        rating: '4.5',
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&auto=format&fit=crop&q=80',
        liked: true,
      },
    ],
    categories: [
      { id: 'c1', name: 'Hoodies', icon: 'wb-cloudy' },
      { id: 'c2', name: 'Shirts', icon: 'checkroom' },
      { id: 'c3', name: 'Pants', icon: 'explore' },
    ],
  },
  puma: {
    name: 'PUMA',
    tagline: 'Forever Faster.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Puma_Logo.svg/250px-Puma_Logo.svg.png',
    promoImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=80',
    promoTitle: 'FLAT 30% OFF',
    promoSubtitle: 'On sport sneakers',
    heroImage: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&auto=format&fit=crop&q=80',
    heroTitle: 'SPEED & COMFORT',
    heroSubtitle: 'Athletic wear built to perform.\nStyle on and off the field.',
    topPicks: [
      {
        id: 'pm1',
        name: 'Puma Suede Classic Shoes',
        category: 'Unisex Sneakers',
        price: '₹6,999',
        rating: '4.8',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=80',
        liked: false,
      },
      {
        id: 'pm2',
        name: 'Puma Training Jacket',
        category: 'Sportswear Jacket',
        price: '₹3,499',
        rating: '4.5',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&auto=format&fit=crop&q=80',
        liked: false,
      },
    ],
    bestSellers: [
      {
        id: 'pm_b1',
        name: 'Puma Core Logo Tee',
        category: 'Men Active Tee',
        price: '₹1,299',
        rating: '4.6',
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&auto=format&fit=crop&q=80',
        liked: true,
      },
    ],
    categories: [
      { id: 'c1', name: 'Shoes', icon: 'directions-run' },
      { id: 'c2', name: 'Apparel', icon: 'checkroom' },
      { id: 'c3', name: 'Accessories', icon: 'explore' },
    ],
  },
  hrx: {
    name: 'HRX',
    tagline: 'Keep Going.',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80',
    promoImage: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400&auto=format&fit=crop&q=80',
    promoTitle: 'FLAT 40% OFF',
    promoSubtitle: 'On activewear range',
    heroImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    heroTitle: 'PUSH THE LIMITS',
    heroSubtitle: 'Engineered for high performance.\nSweat-wicking materials.',
    topPicks: [
      {
        id: 'hrx1',
        name: 'HRX Training T-Shirt',
        category: 'Active Tee',
        price: '₹999',
        rating: '4.5',
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&auto=format&fit=crop&q=80',
        liked: false,
      },
      {
        id: 'hrx2',
        name: 'HRX Running Shoes',
        category: 'Running Shoes',
        price: '₹3,299',
        rating: '4.4',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=80',
        liked: false,
      },
    ],
    bestSellers: [
      {
        id: 'hrx_b1',
        name: 'HRX Slim Joggers',
        category: 'Workout Pants',
        price: '₹1,499',
        rating: '4.6',
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&auto=format&fit=crop&q=80',
        liked: true,
      },
    ],
    categories: [
      { id: 'c1', name: 'Workout', icon: 'fitness-center' },
      { id: 'c2', name: 'Running', icon: 'directions-run' },
      { id: 'c3', name: 'Leisure', icon: 'explore' },
    ],
  },
  uspolo: {
    name: 'U.S. POLO ASSN.',
    tagline: 'Live Authentically.',
    logo: 'https://images.unsplash.com/photo-1599305445671-ac2c0c1da1b8?w=200&auto=format&fit=crop&q=80',
    promoImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&auto=format&fit=crop&q=80',
    promoTitle: 'UP TO 30% OFF',
    promoSubtitle: 'On classic polo shirts',
    heroImage: 'https://images.unsplash.com/photo-1599305445671-ac2c0c1da1b8?w=800&auto=format&fit=crop&q=80',
    heroTitle: 'CLASSIC AMERICAN STYLE',
    heroSubtitle: 'Authentic heritage wear.\nTimeless comfort.',
    topPicks: [
      {
        id: 'us1',
        name: 'USPA Solid Polo Shirt',
        category: 'Classic Polo',
        price: '₹2,799',
        rating: '4.7',
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&auto=format&fit=crop&q=80',
        liked: false,
      },
      {
        id: 'us2',
        name: 'USPA Casual Chinos',
        category: 'Slim Fit Pants',
        price: '₹3,499',
        rating: '4.5',
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&auto=format&fit=crop&q=80',
        liked: false,
      },
    ],
    bestSellers: [
      {
        id: 'us_b1',
        name: 'USPA Plaid Cotton Shirt',
        category: 'Casual Shirt',
        price: '₹2,999',
        rating: '4.6',
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&auto=format&fit=crop&q=80',
        liked: true,
      },
    ],
    categories: [
      { id: 'c1', name: 'Polos', icon: 'checkroom' },
      { id: 'c2', name: 'Shirts', icon: 'checkroom' },
      { id: 'c3', name: 'Chinos', icon: 'explore' },
    ],
  },
  jackjones: {
    name: 'JACK & JONES',
    tagline: 'Keep It Real.',
    logo: 'https://images.unsplash.com/photo-1599305445671-ac2c0c1da1b8?w=200&auto=format&fit=crop&q=80',
    promoImage: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&auto=format&fit=crop&q=80',
    promoTitle: 'FLAT 35% OFF',
    promoSubtitle: 'On premium denim jackets',
    heroImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80',
    heroTitle: 'DENIM EVOLUTION',
    heroSubtitle: 'Rugged quality and look.\nMade for everyday expressions.',
    topPicks: [
      {
        id: 'jj1',
        name: 'J&J Hooded Leather Jacket',
        category: 'Outerwear',
        price: '₹7,999',
        rating: '4.8',
        image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&auto=format&fit=crop&q=80',
        liked: false,
      },
      {
        id: 'jj2',
        name: 'J&J Graphic Sweatshirt',
        category: 'Sweatshirt',
        price: '₹2,499',
        rating: '4.5',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&auto=format&fit=crop&q=80',
        liked: false,
      },
    ],
    bestSellers: [
      {
        id: 'jj_b1',
        name: 'J&J Slim Fit Jeans',
        category: 'Denim Pants',
        price: '₹3,999',
        rating: '4.6',
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&auto=format&fit=crop&q=80',
        liked: true,
      },
    ],
    categories: [
      { id: 'c1', name: 'Denims', icon: 'checkroom' },
      { id: 'c2', name: 'Jackets', icon: 'wb-cloudy' },
      { id: 'c3', name: 'Tees', icon: 'explore' },
    ],
  },
};

export default function BrandScreen({ route, navigation }: any) {
  const selectedBrand = (route.params?.brandName || 'nike').toLowerCase();
  // Fallback to Nike data if specific brand data does not exist
  const data = brandData[selectedBrand] || brandData.nike;

  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Men', 'Women', 'Kids', 'Shoes', 'Clothing', 'Accessories'];

  const { toggleWishlist, isInWishlist } = useWishlistStore();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#0f172a" />
        </TouchableOpacity>

        <View style={styles.brandInfoWrapper}>
          <View style={styles.brandTitleRow}>
            <Image 
              source={{ 
                uri: data.logo,
                headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36' }
              }} 
              style={styles.headerLogo} 
              resizeMode="contain" 
            />
            <Text style={styles.headerTitle}>{data.name}</Text>
            <MaterialIcons name="verified" size={15} color="#3b82f6" style={{ marginLeft: 4 }} />
          </View>
          <Text style={styles.headerSubtitle}>{data.tagline}</Text>
        </View>

        <View style={styles.headerRightIcons}>
          <TouchableOpacity style={styles.headerIconButton} onPress={() => navigation.navigate('Wishlist')}>
            <MaterialIcons name="favorite-border" size={24} color="#0f172a" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIconButton}>
            <MaterialIcons name="share" size={24} color="#0f172a" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Horizontal Subcategory Tabs */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.tabsContainer}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabButton,
                activeTab === tab && styles.tabButtonActive,
              ]}
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.8}
            >
              <Text 
                style={[
                  styles.tabText,
                  activeTab === tab && styles.tabTextActive,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Promo Exclusive Banner */}
        <View style={styles.promoBanner}>
          <Image source={{ uri: data.promoImage }} style={styles.promoImage} resizeMode="cover" />
          <View style={styles.promoTextContainer}>
            <Text style={styles.promoLabel}>{data.name} Exclusive</Text>
            <Text style={styles.promoTitle}>{data.promoTitle}</Text>
            <Text style={styles.promoSubtitle}>On selected styles</Text>
            <TouchableOpacity style={styles.promoButton} activeOpacity={0.8}>
              <Text style={styles.promoButtonText}>EXPLORE</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Top Picks Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top Picks</Text>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.seeAllText}>View All</Text>
            <MaterialIcons name="arrow-forward" size={14} color="#000" style={{ marginLeft: 2 }} />
          </TouchableOpacity>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.productsScrollContainer}
        >
          {data.topPicks.map((item) => {
            const isLiked = isInWishlist(item.id);
            return (
              <TouchableOpacity 
                key={item.id} 
                style={styles.productCard} 
                activeOpacity={0.9}
                onPress={() => navigation.navigate('ProductDetail', { product: item })}
              >
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <TouchableOpacity 
                  style={styles.heartButton} 
                  activeOpacity={0.8}
                  onPress={() => toggleWishlist(item)}
                >
                  <MaterialIcons 
                    name={isLiked ? "favorite" : "favorite-border"} 
                    size={16} 
                    color={isLiked ? "#ef4444" : "#0f172a"} 
                  />
                </TouchableOpacity>
                <View style={styles.productInfo}>
                  <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.productCategory}>{item.category}</Text>
                  <View style={styles.priceRow}>
                    <Text style={styles.productPrice}>{item.price}</Text>
                    <View style={styles.ratingBadge}>
                      <Text style={styles.ratingText}>{item.rating}</Text>
                      <MaterialIcons name="star" size={12} color="#f59e0b" style={{ marginLeft: 2 }} />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Middle Hero Banner */}
        <View style={styles.heroBanner}>
          <Image source={{ uri: data.heroImage }} style={styles.heroBannerImage} resizeMode="cover" />
          <View style={styles.heroOverlay} />
          <View style={styles.heroTextSection}>
            <Text style={styles.heroLabelText}>NEW COLLECTION</Text>
            <Text style={styles.heroHeadline}>{data.heroTitle}</Text>
            <Text style={styles.heroSubheadline}>{data.heroSubtitle}</Text>
            <TouchableOpacity style={styles.heroButton} activeOpacity={0.8}>
              <Text style={styles.heroButtonText}>SHOP COLLECTION</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Shop by Category */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Shop by Category</Text>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.categoryScrollContainer}
        >
          {data.categories.map((cat) => (
            <TouchableOpacity key={cat.id} style={styles.catCard} activeOpacity={0.9}>
              <View style={styles.catIconContainer}>
                <MaterialIcons name={cat.icon} size={26} color="#0f172a" />
              </View>
              <Text style={styles.catLabel}>{cat.name}</Text>
              <TouchableOpacity style={styles.catExploreButton}>
                <Text style={styles.catExploreText}>Explore</Text>
                <MaterialIcons name="arrow-forward" size={10} color="#64748b" style={{ marginLeft: 2 }} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Best Sellers Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Best Sellers</Text>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.seeAllText}>View All</Text>
            <MaterialIcons name="arrow-forward" size={14} color="#000" style={{ marginLeft: 2 }} />
          </TouchableOpacity>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.productsScrollContainer}
        >
          {data.bestSellers.map((item) => {
            const isLiked = isInWishlist(item.id);
            return (
              <TouchableOpacity 
                key={item.id} 
                style={styles.productCard} 
                activeOpacity={0.9}
                onPress={() => navigation.navigate('ProductDetail', { product: item })}
              >
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <TouchableOpacity 
                  style={styles.heartButton} 
                  activeOpacity={0.8}
                  onPress={() => toggleWishlist(item)}
                >
                  <MaterialIcons 
                    name={isLiked ? "favorite" : "favorite-border"} 
                    size={16} 
                    color={isLiked ? "#ef4444" : "#0f172a"} 
                  />
                </TouchableOpacity>
                <View style={styles.productInfo}>
                  <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.productCategory}>{item.category}</Text>
                  <View style={styles.priceRow}>
                    <Text style={styles.productPrice}>{item.price}</Text>
                    <View style={styles.ratingBadge}>
                      <Text style={styles.ratingText}>{item.rating}</Text>
                      <MaterialIcons name="star" size={12} color="#f59e0b" style={{ marginLeft: 2 }} />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Trust Footer Banner */}
        <View style={styles.trustFooter}>
          <View style={styles.trustItem}>
            <MaterialIcons name="check-circle-outline" size={20} color="#64748b" />
            <Text style={styles.trustTitle}>100% Original</Text>
            <Text style={styles.trustSubtitle}>Authentic Products</Text>
          </View>
          <View style={styles.trustItem}>
            <MaterialIcons name="history" size={20} color="#64748b" />
            <Text style={styles.trustTitle}>Easy Returns</Text>
            <Text style={styles.trustSubtitle}>Within 7 Days</Text>
          </View>
          <View style={styles.trustItem}>
            <MaterialIcons name="security" size={20} color="#64748b" />
            <Text style={styles.trustTitle}>Secure Payment</Text>
            <Text style={styles.trustSubtitle}>100% Protected</Text>
          </View>
          <View style={styles.trustItem}>
            <MaterialIcons name="local-shipping" size={20} color="#64748b" />
            <Text style={styles.trustTitle}>Free Delivery</Text>
            <Text style={styles.trustSubtitle}>On All Orders</Text>
          </View>
        </View>
      </ScrollView>

      {/* Floating Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomBarButton} activeOpacity={0.8}>
          <MaterialIcons name="filter-list" size={18} color="#ffffff" style={{ marginRight: 6 }} />
          <Text style={styles.bottomBarText}>Filter</Text>
        </TouchableOpacity>
        <View style={styles.bottomBarDivider} />
        <TouchableOpacity style={styles.bottomBarButton} activeOpacity={0.8}>
          <MaterialIcons name="swap-vert" size={18} color="#ffffff" style={{ marginRight: 6 }} />
          <Text style={styles.bottomBarText}>Sort</Text>
        </TouchableOpacity>
      </View>
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
  backButton: {
    marginRight: 12,
  },
  brandInfoWrapper: {
    flex: 1,
  },
  brandTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLogo: {
    width: 22,
    height: 18,
    marginRight: 6,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 1,
  },
  headerRightIcons: {
    flexDirection: 'row',
  },
  headerIconButton: {
    marginLeft: 14,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  tabsContainer: {
    paddingLeft: 16,
    paddingRight: 8,
    paddingVertical: 14,
    backgroundColor: '#ffffff',
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  tabButtonActive: {
    backgroundColor: '#0f172a',
    borderColor: '#0f172a',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  tabTextActive: {
    color: '#ffffff',
  },
  promoBanner: {
    backgroundColor: '#f1f5f9',
    marginHorizontal: 16,
    borderRadius: 20,
    height: 140,
    flexDirection: 'row',
    overflow: 'hidden',
    marginTop: 6,
  },
  promoImage: {
    flex: 0.9,
    height: '100%',
  },
  promoTextContainer: {
    flex: 1.1,
    paddingLeft: 20,
    justifyContent: 'center',
  },
  promoLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748b',
    textTransform: 'uppercase',
  },
  promoTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0f172a',
    marginTop: 4,
  },
  promoSubtitle: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 2,
  },
  promoButton: {
    backgroundColor: '#0f172a',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 12,
  },
  promoButtonText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '800',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 26,
    marginBottom: 14,
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
  productsScrollContainer: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  productCard: {
    width: 140,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    marginRight: 12,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 150,
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
  productInfo: {
    padding: 10,
  },
  productName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0f172a',
  },
  productCategory: {
    fontSize: 9,
    color: '#64748b',
    marginTop: 2,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  productPrice: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0f172a',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  ratingText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#475569',
  },
  heroBanner: {
    marginHorizontal: 16,
    marginTop: 26,
    borderRadius: 20,
    height: 180,
    overflow: 'hidden',
    position: 'relative',
  },
  heroBannerImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  heroTextSection: {
    position: 'absolute',
    left: 20,
    bottom: 20,
    right: 20,
  },
  heroLabelText: {
    fontSize: 9,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.8)',
    letterSpacing: 2,
  },
  heroHeadline: {
    fontSize: 22,
    fontWeight: '900',
    color: '#ffffff',
    marginTop: 6,
  },
  heroSubheadline: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 4,
    lineHeight: 15,
  },
  heroButton: {
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 14,
    marginTop: 12,
  },
  heroButtonText: {
    color: '#0f172a',
    fontSize: 9,
    fontWeight: '800',
  },
  categoryScrollContainer: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  catCard: {
    width: 100,
    height: 120,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    marginRight: 10,
  },
  catIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  catLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0f172a',
    marginTop: 8,
  },
  catExploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  catExploreText: {
    fontSize: 9,
    fontWeight: '600',
    color: '#64748b',
  },
  trustFooter: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#f8fafc',
    marginHorizontal: 16,
    marginTop: 30,
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  trustItem: {
    width: '50%',
    alignItems: 'center',
    paddingVertical: 12,
  },
  trustTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0f172a',
    marginTop: 6,
  },
  trustSubtitle: {
    fontSize: 9,
    color: '#64748b',
    marginTop: 2,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    height: 50,
    backgroundColor: '#0f172a',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  bottomBarButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  bottomBarDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  bottomBarText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
});
