import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useCartStore } from '../../store/useCartStore';

const { width } = Dimensions.get('window');

// Sidebar categories list
const sidebarCategories = [
  { id: 'topwear', name: 'Topwear', icon: 'checkroom' },
  { id: 'bottomwear', name: 'Bottomwear', icon: 'layers' },
  { id: 'innerwear', name: 'All Innerwear', icon: 'favorite-border' },
  { id: 'winterwear', name: 'Winterwear', icon: 'ac-unit' },
  { id: 'ethnicwear', name: 'Ethnic Wear', icon: 'spa' },
  { id: 'activewear', name: 'Activewear', icon: 'fitness-center' },
  { id: 'nightwear', name: 'Nightwear', icon: 'bedtime' },
  { id: 'plussize', name: 'Plus Size', icon: 'aspect-ratio' },
  { id: 'maternitywear', name: 'Maternity Wear', icon: 'pregnant-woman' },
  { id: 'kidsclothing', name: 'Kids Clothing', icon: 'child-friendly' },
  { id: 'socks', name: 'Socks', icon: 'opacity' },
  { id: 'accessories', name: 'Accessories', icon: 'watch' },
  { id: 'premium', name: 'Premium', icon: 'workspace-premium' },
  { id: 'newarrivals', name: 'New Arrivals', icon: 'new-releases' },
  { id: 'bestsellers', name: 'Best Sellers', icon: 'auto-awesome' },
  { id: 'sale', name: 'Sale', icon: 'local-offer' },
];

// Subcategory grids for each category mapping
const topwearCategories = [
  { id: 'tshirts', name: 'T-Shirts', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=150&auto=format&fit=crop&q=80' },
  { id: 'cshirts', name: 'Casual Shirts', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=150&auto=format&fit=crop&q=80' },
  { id: 'fshirts', name: 'Formal Shirts', image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=150&auto=format&fit=crop&q=80' },
  { id: 'polos', name: 'Polos', image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=150&auto=format&fit=crop&q=80' },
  { id: 'sweatshirts', name: 'Sweatshirts', image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=150&auto=format&fit=crop&q=80' },
  { id: 'hoodies', name: 'Hoodies', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=150&auto=format&fit=crop&q=80' },
  { id: 'jackets', name: 'Jackets', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=150&auto=format&fit=crop&q=80' },
  { id: 'blazers', name: 'Blazers', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=150&auto=format&fit=crop&q=80' },
  { id: 'kurtas', name: 'Kurtas', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=150&auto=format&fit=crop&q=80' },
  { id: 'coords', name: 'Co-ords Sets', image: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a55?w=150&auto=format&fit=crop&q=80' },
  { id: 'vests', name: 'Vests', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=150&auto=format&fit=crop&q=80' },
  { id: 'shrugs', name: 'Shrugs', image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=150&auto=format&fit=crop&q=80' },
];

const bottomwearCategories = [
  { id: 'jeans', name: 'Jeans', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=150&auto=format&fit=crop&q=80' },
  { id: 'ctrousers', name: 'Casual Trousers', image: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=150&auto=format&fit=crop&q=80' },
  { id: 'ftrousers', name: 'Formal Trousers', image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=150&auto=format&fit=crop&q=80' },
  { id: 'shorts', name: 'Shorts', image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=150&auto=format&fit=crop&q=80' },
  { id: 'tpants', name: 'Track Pants', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=150&auto=format&fit=crop&q=80' },
  { id: 'cpants', name: 'Cargo Pants', image: 'https://images.unsplash.com/photo-1517462964-21fdcec3f25b?w=150&auto=format&fit=crop&q=80' },
  { id: 'chinos', name: 'Chinos', image: 'https://images.unsplash.com/photo-1565084888279-aca607ecad0c?w=150&auto=format&fit=crop&q=80' },
  { id: 'joggers', name: 'Joggers', image: 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?w=150&auto=format&fit=crop&q=80' },
];

const categoryContents: {
  [key: string]: {
    bannerTitle: string;
    bannerSub: string;
    bannerImage: string;
    sectionHeader: string;
    subcategories: Array<{ id: string; name: string; image: string }>;
  };
} = {
  topwear: {
    bannerTitle: 'Top Styles for',
    bannerSub: 'Every You',
    bannerImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
    sectionHeader: 'Shop by Topwear',
    subcategories: topwearCategories,
  },
  bottomwear: {
    bannerTitle: 'Durable Denims &',
    bannerSub: 'Classy Chinos',
    bannerImage: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&auto=format&fit=crop&q=80',
    sectionHeader: 'Shop by Bottomwear',
    subcategories: bottomwearCategories,
  },
  innerwear: {
    bannerTitle: 'Comfort First',
    bannerSub: 'Soft & Breathable Fabrics',
    bannerImage: 'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?w=400&auto=format&fit=crop&q=80',
    sectionHeader: 'Shop by Innerwear',
    subcategories: [
      { id: 'briefs', name: 'Briefs & Trunks', image: 'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?w=150&auto=format&fit=crop&q=80' },
      { id: 'vests_inner', name: 'Inner Vests', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=150&auto=format&fit=crop&q=80' },
      { id: 'boxers', name: 'Boxers', image: 'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?w=150&auto=format&fit=crop&q=80' },
      { id: 'thermals', name: 'Thermals', image: 'https://images.unsplash.com/photo-1610384104075-e05c8cf20f5a?w=150&auto=format&fit=crop&q=80' },
    ],
  },
  winterwear: {
    bannerTitle: 'Cosy Layers for',
    bannerSub: 'Chilly Winter Days',
    bannerImage: 'https://images.unsplash.com/photo-1610384104075-e05c8cf20f5a?w=400&auto=format&fit=crop&q=80',
    sectionHeader: 'Shop by Winterwear',
    subcategories: [
      { id: 'jackets_w', name: 'Jackets', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=150&auto=format&fit=crop&q=80' },
      { id: 'sweaters', name: 'Sweaters', image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=150&auto=format&fit=crop&q=80' },
      { id: 'hoodies_w', name: 'Hoodies', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=150&auto=format&fit=crop&q=80' },
      { id: 'coats', name: 'Coats', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80' },
    ],
  },
  ethnicwear: {
    bannerTitle: 'Festive Vibes &',
    bannerSub: 'Traditional Indian Outfits',
    bannerImage: 'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?w=400&auto=format&fit=crop&q=80',
    sectionHeader: 'Shop by Ethnic Wear',
    subcategories: [
      { id: 'kurtas_e', name: 'Kurtas', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=150&auto=format&fit=crop&q=80' },
      { id: 'sherwani', name: 'Sherwanis', image: 'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=150&auto=format&fit=crop&q=80' },
      { id: 'nehru', name: 'Nehru Jackets', image: 'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?w=150&auto=format&fit=crop&q=80' },
      { id: 'dhoti', name: 'Dhotis', image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=150&auto=format&fit=crop&q=80' },
    ],
  },
  activewear: {
    bannerTitle: 'Push Your Limits',
    bannerSub: 'Athletic Wear Essentials',
    bannerImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
    sectionHeader: 'Shop by Activewear',
    subcategories: [
      { id: 'tshirts_a', name: 'Tees & Tops', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=150&auto=format&fit=crop&q=80' },
      { id: 'shorts_a', name: 'Sports Shorts', image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=150&auto=format&fit=crop&q=80' },
      { id: 'tracksuits', name: 'Tracksuits', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=150&auto=format&fit=crop&q=80' },
      { id: 'tights', name: 'Gym Tights', image: 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?w=150&auto=format&fit=crop&q=80' },
    ],
  },
  nightwear: {
    bannerTitle: 'Relaxed Nights',
    bannerSub: 'Comfortable Sleepwear Sets',
    bannerImage: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&auto=format&fit=crop&q=80',
    sectionHeader: 'Shop by Nightwear',
    subcategories: [
      { id: 'pajamas', name: 'Pajamas', image: 'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?w=150&auto=format&fit=crop&q=80' },
      { id: 'nightsuits', name: 'Night Suits', image: 'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?w=150&auto=format&fit=crop&q=80' },
      { id: 'loungewear', name: 'Loungewear', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=150&auto=format&fit=crop&q=80' },
    ],
  },
  plussize: {
    bannerTitle: 'Sizes for All',
    bannerSub: 'Comfortable Premium Plus Fits',
    bannerImage: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&auto=format&fit=crop&q=80',
    sectionHeader: 'Shop by Plus Size',
    subcategories: [
      { id: 'tshirts_plus', name: 'Plus Shirts', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=150&auto=format&fit=crop&q=80' },
      { id: 'jeans_plus', name: 'Plus Jeans', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=150&auto=format&fit=crop&q=80' },
    ],
  },
  maternitywear: {
    bannerTitle: 'Motherly Comfort',
    bannerSub: 'Soft & Highly Stretchable Outfits',
    bannerImage: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&auto=format&fit=crop&q=80',
    sectionHeader: 'Shop by Maternity Wear',
    subcategories: [
      { id: 'dresses_mat', name: 'Maternity Dresses', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=150&auto=format&fit=crop&q=80' },
      { id: 'pants_mat', name: 'Comfort Pants', image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=150&auto=format&fit=crop&q=80' },
    ],
  },
  kidsclothing: {
    bannerTitle: 'Cute Clothes for Little',
    bannerSub: 'Active Superstars',
    bannerImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&auto=format&fit=crop&q=80',
    sectionHeader: 'Shop by Kids Clothing',
    subcategories: [
      { id: 'kids_tops', name: 'Tees & Tops', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=150&auto=format&fit=crop&q=80' },
      { id: 'kids_bottoms', name: 'Shorts & Jeans', image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=150&auto=format&fit=crop&q=80' },
      { id: 'kids_sets', name: 'Co-ords Sets', image: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a55?w=150&auto=format&fit=crop&q=80' },
    ],
  },
  socks: {
    bannerTitle: 'Step in Comfort',
    bannerSub: 'Soft Cotton Cozy Socks',
    bannerImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=80',
    sectionHeader: 'Shop by Socks',
    subcategories: [
      { id: 'socks_ankle', name: 'Ankle Socks', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&auto=format&fit=crop&q=80' },
      { id: 'socks_crew', name: 'Crew Socks', image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=150&auto=format&fit=crop&q=80' },
    ],
  },
  accessories: {
    bannerTitle: 'Complete Your Look',
    bannerSub: 'Smart & Premium Accessories',
    bannerImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&auto=format&fit=crop&q=80',
    sectionHeader: 'Shop by Accessories',
    subcategories: [
      { id: 'caps', name: 'Caps & Hats', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=150&auto=format&fit=crop&q=80' },
      { id: 'belts', name: 'Leather Belts', image: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=150&auto=format&fit=crop&q=80' },
      { id: 'wallets', name: 'Wallets', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=150&auto=format&fit=crop&q=80' },
    ],
  },
  premium: {
    bannerTitle: 'Luxury & Designer Styles',
    bannerSub: 'Handpicked Premium Pieces',
    bannerImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&auto=format&fit=crop&q=80',
    sectionHeader: 'Shop Premium',
    subcategories: [
      { id: 'suits', name: 'Designer Suits', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=150&auto=format&fit=crop&q=80' },
      { id: 'watches', name: 'Luxury Watches', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=150&auto=format&fit=crop&q=80' },
    ],
  },
  newarrivals: {
    bannerTitle: 'Fresh Off the Press',
    bannerSub: 'Latest Season Trends & Designs',
    bannerImage: 'https://images.unsplash.com/photo-1618886614638-80e3c103d31a?w=400&auto=format&fit=crop&q=80',
    sectionHeader: 'Shop New Arrivals',
    subcategories: [
      { id: 'new_tees', name: 'New Shirts', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=150&auto=format&fit=crop&q=80' },
      { id: 'new_jeans', name: 'New Denims', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=150&auto=format&fit=crop&q=80' },
    ],
  },
  bestsellers: {
    bannerTitle: 'Loved by Everyone',
    bannerSub: 'Most Popular Fits & Cuts',
    bannerImage: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&auto=format&fit=crop&q=80',
    sectionHeader: 'Shop Best Sellers',
    subcategories: [
      { id: 'best_tees', name: 'Best Sellers Tees', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=150&auto=format&fit=crop&q=80' },
      { id: 'best_jeans', name: 'Best Sellers Jeans', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=150&auto=format&fit=crop&q=80' },
    ],
  },
  sale: {
    bannerTitle: 'Big Clearance Sale',
    bannerSub: 'Up to 70% Off On Selected Styles',
    bannerImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=80',
    sectionHeader: 'Shop the Sale',
    subcategories: [
      { id: 'sale_tees', name: 'Discounted Tees', image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=150&auto=format&fit=crop&q=80' },
      { id: 'sale_jeans', name: 'Discounted Jeans', image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=150&auto=format&fit=crop&q=80' },
    ],
  },
};

const exploreBanners = [
  {
    id: 'exp1',
    title: 'Winter\nCollection',
    sub: 'Stay Warm,\nStay Stylish',
    image: 'https://images.unsplash.com/photo-1610384104075-e05c8cf20f5a?w=400&auto=format&fit=crop&q=80',
    bgColor: '#f1f5f9',
  },
  {
    id: 'exp2',
    title: 'Ethnic\nWear',
    sub: 'Tradition in Style\nStyles',
    image: 'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?w=400&auto=format&fit=crop&q=80',
    bgColor: '#fef3c7',
  },
  {
    id: 'exp3',
    title: 'Co-ords\nSets',
    sub: 'Match in Style',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&auto=format&fit=crop&q=80',
    bgColor: '#dcfce7',
  },
];

export default function CategoriesScreen({ navigation }: any) {
  const [activeCategory, setActiveCategory] = useState('topwear');
  const { cartItems } = useCartStore();

  const handleSubcategoryClick = (subId: string) => {
    // Find matching subcategory name in activeContent or any category
    let matchedName = 'T-Shirts';
    const activeContent = categoryContents[activeCategory] || categoryContents['topwear'];
    const matched = activeContent.subcategories.find(item => item.id === subId);
    if (matched) {
      matchedName = matched.name;
    }
    navigation.navigate('ProductList', { categoryName: matchedName });
  };

  const activeContent = categoryContents[activeCategory] || categoryContents['topwear'];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header exactly like mockup */}
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}> All Categories</Text>
          <Text style={styles.headerSubtitle}> All Clothing Categories</Text>
        </View>
        <View style={styles.headerRightIcons}>
          <TouchableOpacity style={styles.headerIcon}>
            <MaterialIcons name="search" size={26} color="#0f172a" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon} onPress={() => navigation?.navigate('Cart')}>
            <View style={styles.cartBadgeWrapper}>
              <MaterialIcons name="shopping-bag" size={26} color="#0f172a" />
              {cartItems.length > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Split Layout Body */}
      <View style={styles.splitBody}>
        {/* Left Vertical Sidebar */}
        <View style={styles.sidebar}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.sidebarScroll}>
            {sidebarCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <TouchableOpacity
                  key={cat.id}
                  style={[styles.sidebarItem, isActive && styles.sidebarItemActive]}
                  onPress={() => setActiveCategory(cat.id)}
                  activeOpacity={0.8}
                >
                  <MaterialIcons 
                    name={cat.icon} 
                    size={20} 
                    color={isActive ? '#7c3aed' : '#64748b'} 
                    style={{ marginBottom: 4 }}
                  />
                  <Text style={[styles.sidebarText, isActive && styles.sidebarTextActive]}>
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Right Scrollable Content Area */}
        <View style={styles.contentArea}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentScroll}>
            
            {/* Top Styles Banner */}
            <View style={styles.heroBanner}>
              <View style={styles.heroLeft}>
                <Text style={styles.heroTopText}>{activeContent.bannerTitle}</Text>
                <Text style={styles.heroMainText}>{activeContent.bannerSub}</Text>
                <TouchableOpacity 
                  style={styles.exploreBtn} 
                  onPress={() => navigation.navigate('ProductList', { categoryName: activeContent.sectionHeader.replace('Shop by ', '') })}
                >
                  <Text style={styles.exploreBtnText}>Explore {activeContent.sectionHeader.replace('Shop by ', '')}</Text>
                  <View style={styles.exploreBtnArrow}>
                    <MaterialIcons name="chevron-right" size={14} color="#0f172a" />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.heroRight}>
                <Image 
                  source={{ uri: activeContent.bannerImage }} 
                  style={styles.heroImage as any} 
                />
              </View>
            </View>

            {/* Shop by Active Category Section */}
            <Text style={styles.sectionHeader}>{activeContent.sectionHeader}</Text>
            <View style={styles.categoryGrid}>
              {activeContent.subcategories.map((subcat) => (
                <TouchableOpacity 
                  key={subcat.id} 
                  style={styles.gridCard} 
                  activeOpacity={0.8}
                  onPress={() => handleSubcategoryClick(subcat.id)}
                >
                  <View style={styles.circleImageContainer}>
                    <Image source={{ uri: subcat.image }} style={styles.circleImage as any} />
                  </View>
                  <Text style={styles.gridLabel} numberOfLines={2}>{subcat.name}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Explore More Section */}
            <Text style={styles.sectionHeader}>Explore More</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              contentContainerStyle={styles.exploreBannersScroll}
            >
              {exploreBanners.map((banner) => (
                <TouchableOpacity 
                  key={banner.id} 
                  style={[styles.exploreBannerCard, { backgroundColor: banner.bgColor }]}
                  activeOpacity={0.9}
                  onPress={() => navigation.navigate('ProductDetail')}
                >
                  <View style={styles.expBannerLeft}>
                    <Text style={styles.expBannerTitle}>{banner.title}</Text>
                    <Text style={styles.expBannerSub}>{banner.sub}</Text>
                    <TouchableOpacity style={styles.expBannerShopBtn} activeOpacity={0.8}>
                      <Text style={styles.expBannerShopText}>Shop Now</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.expBannerRight}>
                    <Image source={{ uri: banner.image }} style={styles.expBannerImage as any} />
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>

          </ScrollView>
        </View>
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
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#f1f5f9',
    backgroundColor: '#ffffff',
  },
  headerTitleContainer: {
    flex: 1,
    marginLeft: 4,
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
  headerRightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginLeft: 16,
    padding: 6,
  },
  cartBadgeWrapper: {
    position: 'relative',
  },
  cartBadge: {
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
  cartBadgeText: {
    color: '#ffffff',
    fontSize: 8,
    fontWeight: 'bold',
  },
  splitBody: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 92,
    borderRightWidth: 1,
    borderColor: '#f1f5f9',
    backgroundColor: '#f8fafc',
  },
  sidebarScroll: {
    paddingVertical: 8,
  },
  sidebarItem: {
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  sidebarItemActive: {
    backgroundColor: '#f5f3ff',
    borderLeftWidth: 3,
    borderLeftColor: '#7c3aed',
  },
  sidebarText: {
    fontSize: 9,
    fontWeight: '600',
    color: '#64748b',
    textAlign: 'center',
    marginTop: 4,
  },
  sidebarTextActive: {
    color: '#7c3aed',
    fontWeight: '800',
  },
  contentArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentScroll: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 30,
  },
  heroBanner: {
    height: 110,
    backgroundColor: '#dbeafe',
    borderRadius: 16,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: 20,
  },
  heroLeft: {
    flex: 1.2,
    paddingLeft: 16,
    justifyContent: 'center',
  },
  heroTopText: {
    fontSize: 11,
    color: '#1e40af',
    fontWeight: '600',
  },
  heroMainText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#1e3a8a',
    marginTop: 2,
  },
  exploreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    alignSelf: 'flex-start',
    paddingLeft: 10,
    paddingRight: 6,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 10,
  },
  exploreBtnText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#0f172a',
    marginRight: 4,
  },
  exploreBtnArrow: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroRight: {
    flex: 1,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '900',
    color: '#0f172a',
    marginBottom: 12,
    marginTop: 10,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginBottom: 16,
  },
  gridCard: {
    width: (width - 120) / 4 - 8,
    alignItems: 'center',
    marginBottom: 14,
    marginHorizontal: 4,
  },
  circleImageContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#f8fafc',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gridLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#0f172a',
    marginTop: 6,
    textAlign: 'center',
  },
  exploreBannersScroll: {
    paddingRight: 8,
  },
  exploreBannerCard: {
    width: 150,
    height: 140,
    borderRadius: 16,
    marginRight: 10,
    flexDirection: 'row',
    overflow: 'hidden',
    padding: 10,
  },
  expBannerLeft: {
    flex: 1.2,
    justifyContent: 'space-between',
  },
  expBannerTitle: {
    fontSize: 12,
    fontWeight: '900',
    color: '#0f172a',
  },
  expBannerSub: {
    fontSize: 8,
    color: '#475569',
    marginTop: 2,
  },
  expBannerShopBtn: {
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 8,
  },
  expBannerShopText: {
    fontSize: 8,
    fontWeight: '800',
    color: '#0f172a',
  },
  expBannerRight: {
    flex: 0.9,
    height: '100%',
    justifyContent: 'flex-end',
  },
  expBannerImage: {
    width: '100%',
    height: '90%',
    resizeMode: 'cover',
    borderRadius: 8,
  },
});
