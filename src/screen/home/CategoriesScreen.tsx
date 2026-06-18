import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

// E-commerce mockup details
const subcategoryIcons = [
  { id: 'all', name: 'All', icon: 'widgets', active: true },
  { id: 'top', name: 'Top Wear', icon: 'checkroom', active: false },
  { id: 'bottom', name: 'Bottom Wear', icon: 'layers', active: false },
  { id: 'footwear', name: 'Footwear', icon: 'directions-walk', active: false },
  { id: 'accessories', name: 'Accessories', icon: 'watch', active: false },
  { id: 'innerwear', name: 'Innerwear', icon: 'favorite-border', active: false },
  { id: 'nightwear', name: 'Nightwear', icon: 'bedtime', active: false },
];

const filterTags = ['Size', 'Brand', 'Color', 'Price', 'Discount'];

const topCategoriesGrid = [
  {
    id: 'tg1',
    name: 'T-Shirts',
    items: '1200+ Items',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 'tg2',
    name: 'Shirts',
    items: '950+ Items',
    image: 'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 'tg3',
    name: 'Polo T-Shirts',
    items: '650+ Items',
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 'tg4',
    name: 'Hoodies & Sweatshirts',
    items: '850+ Items',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 'tg5',
    name: 'Jackets',
    items: '750+ Items',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 'tg6',
    name: 'Jeans',
    items: '1000+ Items',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 'tg7',
    name: 'Chinos',
    items: '800+ Items',
    image: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 'tg8',
    name: 'Shorts',
    items: '600+ Items',
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&auto=format&fit=crop&q=80',
  },
];

const bestSellers = [
  {
    id: 'bs1',
    name: 'Men Casual Shirt Regular Fit',
    price: '₹1,499',
    originalPrice: '₹2,499',
    discount: '40% OFF',
    image: 'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=400&auto=format&fit=crop&q=80',
    liked: false,
  },
  {
    id: 'bs2',
    name: 'Men Hoodie Relaxed Fit',
    price: '₹1,799',
    originalPrice: '₹2,999',
    discount: '40% OFF',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&auto=format&fit=crop&q=80',
    liked: true,
  },
  {
    id: 'bs3',
    name: 'Men Slim Fit Jeans',
    price: '₹1,999',
    originalPrice: '₹3,299',
    discount: '39% OFF',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&auto=format&fit=crop&q=80',
    liked: false,
  },
  {
    id: 'bs4',
    name: 'Men Polo T-Shirt Cotton Blend',
    price: '₹1,299',
    originalPrice: '₹2,199',
    discount: '41% OFF',
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&auto=format&fit=crop&q=80',
    liked: false,
  },
];

export default function CategoriesScreen({ navigation }: any) {
  const [activeIconTab, setActiveIconTab] = useState('all');
  const [likes, setLikes] = useState<{ [key: string]: boolean }>({});

  const toggleLike = (id: string) => {
    setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header matching mockup */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBack} onPress={() => navigation?.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#0f172a" />
        </TouchableOpacity>
        <View style={styles.headerTitleWrapper}>
          <Text style={styles.headerTitle}>Men</Text>
          <Text style={styles.headerSubtitle}>Explore all men's fashion</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="search" size={24} color="#0f172a" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="favorite-border" size={24} color="#0f172a" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation?.navigate('Cart')}>
            <View style={styles.badgeWrapper}>
              <MaterialIcons name="shopping-bag" size={24} color="#0f172a" />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Banner Section */}
        <View style={styles.heroBanner}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1618886614638-80e3c103d31a?w=800&auto=format&fit=crop&q=80' }} 
            style={styles.heroImage} 
            resizeMode="cover"
          />
          <View style={styles.heroOverlay} />
          <View style={styles.heroTextContainer}>
            <Text style={styles.heroTitle}>Elevate Your</Text>
            <Text style={styles.heroTitle}>Everyday Style</Text>
            <Text style={styles.heroSubtitle}>From casual to classy, find it all here.</Text>
            <TouchableOpacity style={styles.heroButton} activeOpacity={0.8}>
              <Text style={styles.heroButtonText}>SHOP NOW</Text>
            </TouchableOpacity>
          </View>
          {/* Carousel dots */}
          <View style={styles.dotContainer}>
            <View style={[styles.dot, styles.dotActive]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>

        {/* Categories Icon horizontal scroller */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.iconTabsContainer}
        >
          {subcategoryIcons.map((tab) => {
            const isTabActive = activeIconTab === tab.id;
            return (
              <TouchableOpacity 
                key={tab.id} 
                style={styles.iconTabCard} 
                activeOpacity={0.8}
                onPress={() => setActiveIconTab(tab.id)}
              >
                <View style={[styles.iconCircle, isTabActive && styles.iconCircleActive]}>
                  <MaterialIcons name={tab.icon} size={24} color={isTabActive ? '#ffffff' : '#0f172a'} />
                </View>
                <Text style={[styles.iconLabel, isTabActive && styles.iconLabelActive]}>{tab.name}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Filter and Sort Row */}
        <View style={styles.filterRow}>
          <TouchableOpacity style={styles.filterButton} activeOpacity={0.8}>
            <MaterialIcons name="filter-list" size={16} color="#0f172a" style={{ marginRight: 6 }} />
            <Text style={styles.filterButtonText}>Filter</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterButton} activeOpacity={0.8}>
            <MaterialIcons name="swap-vert" size={16} color="#0f172a" style={{ marginRight: 6 }} />
            <Text style={styles.filterButtonText}>Sort</Text>
          </TouchableOpacity>

          <View style={styles.sortDropdown}>
            <Text style={styles.dropdownText}>Popularity</Text>
            <MaterialIcons name="keyboard-arrow-down" size={16} color="#0f172a" style={{ marginLeft: 4 }} />
          </View>
        </View>

        {/* Scrolling filter options tags */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.tagsScrollContainer}
        >
          {filterTags.map((tag, index) => (
            <TouchableOpacity key={index} style={styles.tagButton} activeOpacity={0.8}>
              <Text style={styles.tagText}>{tag}</Text>
              <MaterialIcons name="keyboard-arrow-down" size={14} color="#0f172a" style={{ marginLeft: 2 }} />
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Top Categories Grid */}
        <Text style={styles.sectionHeader}>Top Categories</Text>
        <View style={styles.categoriesGrid}>
          {topCategoriesGrid.map((item) => (
            <TouchableOpacity key={item.id} style={styles.gridCard} activeOpacity={0.9} onPress={() => navigation?.navigate('ProductDetail')}>
              <Image source={{ uri: item.image }} style={styles.gridCardImage} />
              <View style={styles.gridCardFooter}>
                <Text style={styles.gridCardTitle}>{item.name}</Text>
                <Text style={styles.gridCardSubtitle}>{item.items}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Best Sellers Section */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Best Sellers</Text>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.seeAllText}>View All</Text>
            <MaterialIcons name="arrow-forward" size={14} color="#0f172a" style={{ marginLeft: 2 }} />
          </TouchableOpacity>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.bestSellersScroll}
        >
          {bestSellers.map((item) => {
            const isLiked = likes[item.id] !== undefined ? likes[item.id] : item.liked;
            return (
              <TouchableOpacity key={item.id} style={styles.productCard} activeOpacity={0.9} onPress={() => navigation?.navigate('ProductDetail')}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <TouchableOpacity 
                  style={styles.heartButton} 
                  activeOpacity={0.8}
                  onPress={() => toggleLike(item.id)}
                >
                  <MaterialIcons 
                    name={isLiked ? "favorite" : "favorite-border"} 
                    size={16} 
                    color={isLiked ? "#ef4444" : "#0f172a"} 
                  />
                </TouchableOpacity>

                <View style={styles.productInfo}>
                  <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
                  <View style={styles.priceContainer}>
                    <Text style={styles.productPrice}>{item.price}</Text>
                    <Text style={styles.productOriginalPrice}>{item.originalPrice}</Text>
                    <Text style={styles.discountText}>{item.discount}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
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
    borderBottomWidth: 1,
    borderColor: '#f1f5f9',
    backgroundColor: '#ffffff',
  },
  headerBack: {
    marginRight: 12,
  },
  headerTitleWrapper: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 1,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 16,
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
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 8,
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingBottom: 110,
  },
  heroBanner: {
    marginHorizontal: 16,
    marginTop: 14,
    borderRadius: 20,
    height: 200,
    overflow: 'hidden',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  heroTextContainer: {
    position: 'absolute',
    left: 20,
    bottom: 20,
    right: 20,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#ffffff',
    lineHeight: 28,
  },
  heroSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 6,
  },
  heroButton: {
    backgroundColor: '#0f172a',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 12,
  },
  heroButtonText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '800',
  },
  dotContainer: {
    position: 'absolute',
    bottom: 12,
    right: 20,
    flexDirection: 'row',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginLeft: 4,
  },
  dotActive: {
    backgroundColor: '#ffffff',
    width: 12,
  },
  iconTabsContainer: {
    paddingLeft: 16,
    paddingRight: 8,
    paddingVertical: 20,
  },
  iconTabCard: {
    alignItems: 'center',
    marginRight: 16,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircleActive: {
    backgroundColor: '#0f172a',
    borderColor: '#0f172a',
  },
  iconLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748b',
    marginTop: 6,
  },
  iconLabelActive: {
    color: '#0f172a',
    fontWeight: '700',
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginRight: 8,
    backgroundColor: '#ffffff',
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0f172a',
  },
  sortDropdown: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0f172a',
  },
  tagsScrollContainer: {
    paddingLeft: 16,
    paddingRight: 8,
    paddingVertical: 6,
    marginBottom: 20,
  },
  tagButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
    backgroundColor: '#ffffff',
  },
  tagText: {
    fontSize: 11,
    color: '#0f172a',
    fontWeight: '500',
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 26,
  },
  gridCard: {
    width: (width - 44) / 2,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 2,
  },
  gridCardImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#f8fafc',
  },
  gridCardFooter: {
    padding: 10,
    alignItems: 'center',
  },
  gridCardTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0f172a',
  },
  gridCardSubtitle: {
    fontSize: 9,
    color: '#64748b',
    marginTop: 2,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
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
  bestSellersScroll: {
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
  priceContainer: {
    marginTop: 6,
  },
  productPrice: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0f172a',
  },
  productOriginalPrice: {
    fontSize: 10,
    color: '#94a3b8',
    textDecorationLine: 'line-through',
    marginTop: 2,
  },
  discountText: {
    fontSize: 10,
    color: '#16a34a',
    fontWeight: '700',
    marginTop: 1,
  },
});
