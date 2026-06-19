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
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';

const { width } = Dimensions.get('window');

const subcategories = [
  { id: 'all', name: 'All', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=150&auto=format&fit=crop&q=80' },
  { id: 'plain', name: 'Plain', image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=150&auto=format&fit=crop&q=80' },
  { id: 'printed', name: 'Printed', image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=150&auto=format&fit=crop&q=80' },
  { id: 'striped', name: 'Striped', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=150&auto=format&fit=crop&q=80' },
  { id: 'oversized', name: 'Oversized', image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=150&auto=format&fit=crop&q=80' },
  { id: 'polos', name: 'Polo T-Shirts', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=150&auto=format&fit=crop&q=80' },
];

const productsData = [
  {
    id: 'p1',
    brand: 'HRX',
    name: 'Men Green Solid Cotton T-Shirt',
    price: '₹599',
    originalPrice: '₹999',
    discount: '40% OFF',
    rating: '4.3',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=80',
    colors: ['#2f5233', '#94a3b8', '#1e3a8a', '#64748b'],
    extraColors: 3,
    liked: false,
  },
  {
    id: 'p2',
    brand: 'Roadster',
    name: 'Men Beige Striped T-Shirt',
    price: '₹699',
    originalPrice: '₹1,299',
    discount: '46% OFF',
    rating: '4.5',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&auto=format&fit=crop&q=80',
    colors: ['#f5ebe0', '#1e293b', '#1d4ed8', '#64748b'],
    extraColors: 0,
    liked: true,
  },
  {
    id: 'p3',
    brand: 'Jack & Jones',
    name: 'Men Printed Pure Cotton T-Shirt',
    price: '₹649',
    originalPrice: '₹1,199',
    discount: '45% OFF',
    rating: '4.2',
    image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=500&auto=format&fit=crop&q=80',
    colors: ['#ffffff', '#c084fc', '#15803d', '#94a3b8'],
    extraColors: 2,
    liked: false,
  },
  {
    id: 'p4',
    brand: 'Bewakoof®',
    name: 'Men Navy Blue Oversized T-Shirt',
    price: '₹799',
    originalPrice: '₹1,499',
    discount: '47% OFF',
    rating: '4.6',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=80',
    colors: ['#1e293b', '#ffffff', '#854d0e', '#64748b'],
    extraColors: 3,
    liked: true,
  },
  {
    id: 'p5',
    brand: 'HRX',
    name: 'Men White Printed T-Shirt',
    price: '₹499',
    originalPrice: '₹899',
    discount: '44% OFF',
    rating: '4.4',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&auto=format&fit=crop&q=80',
    colors: ['#ffffff', '#cbd5e1', '#000000'],
    extraColors: 1,
    liked: false,
  },
  {
    id: 'p6',
    brand: 'PUMA',
    name: 'Men Active Sports Tee',
    price: '₹899',
    originalPrice: '₹1,699',
    discount: '47% OFF',
    rating: '4.5',
    image: 'https://images.unsplash.com/photo-1618886614638-80e3c103d31a?w=500&auto=format&fit=crop&q=80',
    colors: ['#0f172a', '#bbf7d0', '#fecdd3'],
    extraColors: 2,
    liked: false,
  },
];

export default function ProductListScreen({ route, navigation }: any) {
  const [activeSubcat, setActiveSubcat] = useState('all');
  const { cartItems } = useCartStore();
  const { wishlistItems, toggleWishlist, isInWishlist } = useWishlistStore();

  const categoryName = route?.params?.categoryName || 'T-Shirts';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header exactly like mockup */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation?.goBack()}>
          <MaterialIcons name="arrow-back" size={26} color="#0f172a" />
        </TouchableOpacity>
        <View style={styles.headerTitleWrapper}>
          <Text style={styles.headerTitle}>{categoryName}</Text>
          <Text style={styles.headerSubtitle}>1248 Products</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Wishlist')}>
            <View style={styles.badgeWrapper}>
              <MaterialIcons name="favorite-border" size={26} color="#0f172a" />
              {wishlistItems.length > 0 && (
                <View style={styles.badge}><Text style={styles.badgeText}>{wishlistItems.length}</Text></View>
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Cart')}>
            <View style={styles.badgeWrapper}>
              <MaterialIcons name="shopping-bag" size={26} color="#0f172a" />
              {cartItems.length > 0 && (
                <View style={styles.badge}><Text style={styles.badgeText}>{cartItems.length}</Text></View>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Filters bar horizontal scrolling */}
      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersScroll}>
          <TouchableOpacity style={styles.filterPill}>
            <MaterialIcons name="swap-vert" size={16} color="#0f172a" style={{ marginRight: 4 }} />
            <Text style={styles.filterText}>Sort</Text>
            <MaterialIcons name="keyboard-arrow-down" size={16} color="#0f172a" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterPill}>
            <MaterialIcons name="tune" size={16} color="#0f172a" style={{ marginRight: 4 }} />
            <Text style={styles.filterText}>Filter</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterPill}>
            <Text style={styles.filterText}>Size</Text>
            <MaterialIcons name="keyboard-arrow-down" size={16} color="#0f172a" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterPill}>
            <Text style={styles.filterText}>Color</Text>
            <MaterialIcons name="keyboard-arrow-down" size={16} color="#0f172a" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterPill}>
            <Text style={styles.filterText}>Brand</Text>
            <MaterialIcons name="keyboard-arrow-down" size={16} color="#0f172a" />
          </TouchableOpacity>
        </ScrollView>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Horizontal Subcategories Slider */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.subcatsScroll}
        >
          {subcategories.map((sub) => {
            const isActive = activeSubcat === sub.id;
            return (
              <TouchableOpacity 
                key={sub.id} 
                style={styles.subcatCard}
                activeOpacity={0.8}
                onPress={() => setActiveSubcat(sub.id)}
              >
                <View style={[styles.subcatImageContainer, isActive && styles.subcatImageActive]}>
                  <Image source={{ uri: sub.image }} style={styles.subcatImage} />
                </View>
                <View style={[styles.subcatLabelBox, isActive && styles.subcatLabelBoxActive]}>
                  <Text style={[styles.subcatLabelText, isActive && styles.subcatLabelTextActive]}>
                    {sub.name}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Products 2-Column Grid */}
        <View style={styles.productsGrid}>
          {productsData.map((item) => {
            const isLiked = isInWishlist(item.id);
            return (
              <TouchableOpacity 
                key={item.id} 
                style={styles.productCard}
                activeOpacity={0.95}
                onPress={() => navigation.navigate('ProductDetail', { product: item })}
              >
                {/* Product Image Area */}
                <View style={styles.productImageWrapper}>
                  <Image source={{ uri: item.image }} style={styles.productImage as any} />
                  
                  {/* Heart Circle Button */}
                  <TouchableOpacity 
                    style={styles.heartCircle} 
                    activeOpacity={0.8}
                    onPress={() => toggleWishlist(item)}
                  >
                    <MaterialIcons 
                      name={isLiked ? "favorite" : "favorite-border"} 
                      size={18} 
                      color={isLiked ? "#ef4444" : "#64748b"} 
                    />
                  </TouchableOpacity>
                </View>

                {/* Details Footer */}
                <View style={styles.productDetails}>
                  {/* Color dots row */}
                  <View style={styles.colorsRow}>
                    {item.colors.map((color, idx) => (
                      <View 
                        key={idx} 
                        style={[styles.colorDot, { backgroundColor: color }]} 
                      />
                    ))}
                    {item.extraColors > 0 && (
                      <Text style={styles.extraColorsText}>+{item.extraColors}</Text>
                    )}
                  </View>

                  {/* Brand & Rating */}
                  <View style={styles.brandRow}>
                    <Text style={styles.brandText}>{item.brand}</Text>
                    <View style={styles.ratingBadge}>
                      <Text style={styles.ratingText}>★ {item.rating}</Text>
                    </View>
                  </View>

                  {/* Title */}
                  <Text style={styles.titleText} numberOfLines={1}>{item.name}</Text>

                  {/* Pricing */}
                  <View style={styles.priceRow}>
                    <Text style={styles.priceText}>{item.price}</Text>
                    <Text style={styles.originalPriceText}>{item.originalPrice}</Text>
                    <Text style={styles.discountText}>{item.discount}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
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
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#f1f5f9',
    backgroundColor: '#ffffff',
  },
  backButton: {
    padding: 4,
  },
  headerTitleWrapper: {
    flex: 1,
    marginLeft: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0f172a',
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 2,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 14,
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
  filtersContainer: {
    borderBottomWidth: 1,
    borderColor: '#f1f5f9',
    paddingVertical: 10,
    backgroundColor: '#ffffff',
  },
  filtersScroll: {
    paddingHorizontal: 16,
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    backgroundColor: '#ffffff',
  },
  filterText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0f172a',
    marginHorizontal: 2,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  subcatsScroll: {
    paddingLeft: 16,
    paddingRight: 8,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#f8fafc',
  },
  subcatCard: {
    alignItems: 'center',
    marginRight: 14,
  },
  subcatImageContainer: {
    width: 58,
    height: 58,
    borderRadius: 29,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#f8fafc',
  },
  subcatImageActive: {
    borderColor: '#7c3aed',
    borderWidth: 1.5,
  },
  subcatImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  subcatLabelBox: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 6,
  },
  subcatLabelBoxActive: {
    backgroundColor: '#0f172a',
  },
  subcatLabelText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748b',
  },
  subcatLabelTextActive: {
    color: '#ffffff',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  productCard: {
    width: (width - 44) / 2,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f1f5f9',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.01,
    shadowRadius: 6,
    elevation: 2,
  },
  productImageWrapper: {
    height: 190,
    width: '100%',
    position: 'relative',
    backgroundColor: '#f8fafc',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heartCircle: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  productDetails: {
    padding: 10,
  },
  colorsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 4,
    borderWidth: 0.5,
    borderColor: '#cbd5e1',
  },
  extraColorsText: {
    fontSize: 9,
    color: '#94a3b8',
    fontWeight: '700',
    marginLeft: 2,
  },
  brandRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  brandText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#0f172a',
  },
  ratingBadge: {
    backgroundColor: '#ecfdf5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  ratingText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#059669',
  },
  titleText: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '600',
    marginBottom: 6,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 13,
    fontWeight: '900',
    color: '#0f172a',
  },
  originalPriceText: {
    fontSize: 10,
    color: '#94a3b8',
    textDecorationLine: 'line-through',
    marginHorizontal: 4,
  },
  discountText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#22c55e',
  },
});
