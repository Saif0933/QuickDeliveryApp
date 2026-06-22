import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Platform,
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
import { useWishlistStore } from '../../store/useWishlistStore';

const { width } = Dimensions.get('window');

const colorsList = [
  { id: 'green', colorCode: '#2e4a3f' },
  { id: 'navy', colorCode: '#1e293b' },
  { id: 'grey', colorCode: '#cbd5e1' },
  { id: 'white', colorCode: '#ffffff', isWhite: true },
  { id: 'black', colorCode: '#0f172a' },
  { id: 'purple', colorCode: '#a855f7' },
];

const sizesList = ['S', 'M', 'L', 'XL', 'XXL', '3XL'];

export default function ProductDetailScreen({ route, navigation }: any) {
  const [selectedColor, setSelectedColor] = useState('green');
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [activeThumb, setActiveThumb] = useState(0);

  // Retrieve cart store functions and state
  const addItem = useCartStore((state) => state.addItem);
  const cartItems = useCartStore((state) => state.cartItems);

  // Retrieve wishlist store functions and state
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  // Read dynamic product param from route
  const product = route?.params?.product;

  // Default fallback values (matching the green T-shirt exactly)
  const defaultProduct = {
    id: 'default',
    brand: 'HRX',
    name: 'Men Green Solid Cotton T-Shirt',
    price: '₹599',
    originalPrice: '₹999',
    discount: '40% OFF',
    rating: '4.5',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80',
  };

  const currentProduct = product || defaultProduct;
  const isWishlisted = isInWishlist(currentProduct.id);

  // Generate dynamic thumbnails using the item's main image, and fallback previews
  const thumbnails = [
    currentProduct.image,
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80', // Back view
    'https://images.unsplash.com/photo-1618886614638-80e3c103d31a?w=600&auto=format&fit=crop&q=80', // Neck details
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80', // Fabric zoom
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header exactly like mockup */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation?.goBack()}>
          <MaterialIcons name="arrow-back" size={26} color="#0f172a" />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton} onPress={() => toggleWishlist(currentProduct)}>
            <MaterialIcons 
              name={isWishlisted ? "favorite" : "favorite-border"} 
              size={26} 
              color={isWishlisted ? "#ef4444" : "#0f172a"} 
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation?.navigate('Cart')}>
            <View style={styles.badgeWrapper}>
              <MaterialIcons name="shopping-bag" size={26} color="#0f172a" />
              {cartItems.length > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartItems.length}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        {/* Showcase Area: Main image Left, vertical thumbnails Right */}
        <View style={styles.showcaseContainer}>
          
          {/* Left Main Image Card */}
          <View style={styles.mainImageCard}>
            <Image source={{ uri: thumbnails[activeThumb] }} style={styles.mainImage} />
            
            {/* BESTSELLER Tag */}
            <View style={styles.bestSellerTag}>
              <Text style={styles.bestSellerTagText}>BESTSELLER</Text>
            </View>

            {/* View Similar Floating Pill */}
            <TouchableOpacity style={styles.viewSimilarPill} activeOpacity={0.85}>
              <MaterialIcons name="center-focus-weak" size={16} color="#0f172a" style={{ marginRight: 4 }} />
              <Text style={styles.viewSimilarPillText}>View Similar</Text>
            </TouchableOpacity>

            {/* Rating Star Badge */}
            <View style={styles.ratingStarsBadge}>
              <Text style={styles.ratingBadgeText}>★ {currentProduct.rating || '4.5'}  <Text style={{ color: '#64748b', fontWeight: '500' }}>(2.3K)</Text></Text>
            </View>
          </View>

          {/* Right Thumbnails Column */}
          <View style={styles.thumbsColumn}>
            {thumbnails.map((thumb, idx) => {
              const isActive = activeThumb === idx;
              const isLast = idx === thumbnails.length - 1;
              return (
                <TouchableOpacity
                  key={idx}
                  style={[styles.thumbBox, isActive && styles.thumbBoxActive]}
                  activeOpacity={0.8}
                  onPress={() => setActiveThumb(idx)}
                >
                  <Image source={{ uri: thumb }} style={styles.thumbBoxImage} />
                  {isLast && (
                    <View style={styles.thumbOverlay}>
                      <Text style={styles.thumbOverlayText}>+3</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Carousel indicator dots */}
        <View style={styles.dotsRow}>
          {[0, 1, 2, 3, 4, 5].map((idx) => {
            const isActive = idx === activeThumb;
            return (
              <View 
                key={idx} 
                style={[styles.indicatorDot, isActive && styles.indicatorDotActive]} 
              />
            );
          })}
        </View>

        {/* Product Information Details */}
        <View style={styles.productDetailsSection}>
          <Text style={styles.brandLabel}>{currentProduct.brand}</Text>
          <Text style={styles.productName}>{currentProduct.name}</Text>
          <Text style={styles.subLabel}>{currentProduct.category || 'Crew Neck, Half Sleeves'}</Text>

          {/* Pricing Row */}
          <View style={styles.priceRow}>
            <Text style={styles.currentPrice}>{currentProduct.price}</Text>
            {currentProduct.originalPrice ? (
              <Text style={styles.originalPrice}>{currentProduct.originalPrice}</Text>
            ) : null}
            {currentProduct.discount ? (
              <Text style={styles.discountPercent}>{currentProduct.discount}</Text>
            ) : null}
          </View>
          <Text style={styles.taxSubText}>Inclusive of all taxes</Text>
        </View>

        {/* Color Selection Block */}
        <View style={styles.colorsSection}>
          <Text style={styles.colorsTitle}>Color: <Text style={{ fontWeight: '800' }}>Green</Text></Text>
          <View style={styles.colorsRow}>
            {colorsList.map((item) => {
              const isActive = selectedColor === item.id;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.colorRing, isActive && styles.colorRingActive]}
                  onPress={() => setSelectedColor(item.id)}
                >
                  <View 
                    style={[
                      styles.colorDot, 
                      { backgroundColor: item.colorCode },
                      item.isWhite && { borderWidth: 1, borderColor: '#e2e8f0' }
                    ]} 
                  />
                </TouchableOpacity>
              );
            })}
            <Text style={styles.extraColorsText}>+6 Colors</Text>
          </View>
        </View>

        {/* Offers Container Box */}
        <View style={styles.offersContainer}>
          <View style={styles.offersHeader}>
            <View style={styles.offersHeaderLeft}>
              <MaterialIcons name="local-offer" size={18} color="#059669" style={{ marginRight: 6 }} />
              <Text style={styles.offersHeaderText}>Available Offers</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.offersViewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {/* Offer items list */}
          <View style={styles.offerLine}>
            <Text style={styles.bulletSymbol}>•</Text>
            <Text style={styles.offerLineText}>10% Instant Discount on ICICI Bank Cards</Text>
            <MaterialIcons name="chevron-right" size={16} color="#64748b" />
          </View>
          <View style={styles.offerLine}>
            <Text style={styles.bulletSymbol}>•</Text>
            <Text style={styles.offerLineText}>5% Unlimited Cashback on Flipkart Axis Bank Credit Card</Text>
            <MaterialIcons name="chevron-right" size={16} color="#64748b" />
          </View>
        </View>

        {/* Size Selection Section */}
        <View style={styles.sizeSection}>
          <View style={styles.sizeHeaderRow}>
            <Text style={styles.sizeHeaderText}>Select Size</Text>
            <TouchableOpacity style={styles.sizeChartRow}>
              <MaterialIcons name="straighten" size={16} color="#7c3aed" style={{ marginRight: 4 }} />
              <Text style={styles.sizeChartText}>Size Chart</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.sizesRow}>
            {sizesList.map((sz) => {
              const isActive = selectedSize === sz;
              return (
                <TouchableOpacity
                  key={sz}
                  style={[styles.sizeBox, isActive && styles.sizeBoxActive]}
                  onPress={() => setSelectedSize(sz)}
                >
                  <Text style={[styles.sizeBoxText, isActive && styles.sizeBoxTextActive]}>
                    {sz}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Fit guidelines footer */}
          <View style={styles.fitGuidelinesRow}>
            <View style={styles.fitLeft}>
              <MaterialIcons name="verified-user" size={16} color="#64748b" style={{ marginRight: 4 }} />
              <Text style={styles.fitText}>Fit: Regular Fit</Text>
            </View>
            <Text style={styles.modelSizeText}>Model is wearing size M</Text>
          </View>
        </View>

        {/* Delivery Address block */}
        <View style={styles.addressBlockContainer}>
          <MaterialIcons name="location-on" size={22} color="#0f172a" style={styles.locationPinIcon} />
          <View style={styles.addressDetails}>
            <Text style={styles.deliverToText}>Deliver to: <Text style={{ fontWeight: '800' }}>110001</Text></Text>
            <Text style={styles.addressSubtext}>Home - 123, Main Street, Delhi</Text>
          </View>
          <TouchableOpacity style={styles.changeButton}>
            <Text style={styles.changeButtonText}>Change</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Sticky Bottom actions bar */}
      <View style={styles.bottomBarContainer}>
        {/* Share Button */}
        <TouchableOpacity 
          style={styles.btnShare} 
          activeOpacity={0.8}
          onPress={() => {
            // Share trigger placeholder
          }}
        >
          <MaterialIcons name="share" size={20} color="#0f172a" />
        </TouchableOpacity>

        {/* Add to Cart */}
        <TouchableOpacity 
          style={styles.btnAddToCart} 
          activeOpacity={0.8}
          onPress={() => {
            if (!selectedSize) {
              Alert.alert(
                'Select Size',
                'Please select a size before adding the product to your cart.',
                [{ text: 'OK' }]
              );
              return;
            }
            addItem(currentProduct, selectedSize, selectedColor);
            navigation?.navigate('Cart');
          }}
        >
          <MaterialIcons name="shopping-bag" size={18} color="#0f172a" style={{ marginRight: 6 }} />
          <Text style={styles.btnAddToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
  },
  backButton: {
    padding: 4,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 18,
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
    backgroundColor: '#000000',
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
    backgroundColor: '#f8fafc',
  },
  showcaseContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingTop: 12,
    backgroundColor: '#ffffff',
  },
  mainImageCard: {
    flex: 3.8,
    height: 330,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#f1f5f9',
    marginRight: 8,
  },
  mainImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bestSellerTag: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#1b4332',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  bestSellerTagText: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  viewSimilarPill: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  viewSimilarPillText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#0f172a',
  },
  ratingStarsBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 6,
  },
  ratingBadgeText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#16a34a',
  },
  thumbsColumn: {
    flex: 1,
    justifyContent: 'space-between',
    height: 330,
  },
  thumbBox: {
    width: '100%',
    height: 77,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    position: 'relative',
    backgroundColor: '#f1f5f9',
  },
  thumbBoxActive: {
    borderColor: '#0f172a',
    borderWidth: 1.5,
  },
  thumbBoxImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  thumbOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbOverlayText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '900',
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  indicatorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#cbd5e1',
    marginHorizontal: 3,
  },
  indicatorDotActive: {
    backgroundColor: '#0f172a',
    width: 12,
  },
  productDetailsSection: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  brandLabel: {
    fontSize: 12,
    fontWeight: '900',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  productName: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0f172a',
    marginTop: 4,
  },
  subLabel: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  currentPrice: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0f172a',
  },
  originalPrice: {
    fontSize: 13,
    color: '#94a3b8',
    textDecorationLine: 'line-through',
    marginHorizontal: 8,
  },
  discountPercent: {
    fontSize: 13,
    fontWeight: '900',
    color: '#22c55e',
  },
  taxSubText: {
    fontSize: 10,
    color: '#94a3b8',
    marginTop: 4,
  },
  colorsSection: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginTop: 8,
  },
  colorsTitle: {
    fontSize: 12,
    fontWeight: '900',
    color: '#0f172a',
    marginBottom: 10,
  },
  colorsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorRing: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  colorRingActive: {
    borderColor: '#0f172a',
  },
  colorDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  extraColorsText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#7c3aed',
    marginLeft: 6,
  },
  offersContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginHorizontal: 16,
    padding: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.01,
    shadowRadius: 6,
    elevation: 1,
  },
  offersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    paddingBottom: 8,
    marginBottom: 8,
  },
  offersHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  offersHeaderText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#0f172a',
  },
  offersViewAllText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#7c3aed',
  },
  offerLine: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  bulletSymbol: {
    fontSize: 14,
    color: '#64748b',
    marginRight: 6,
  },
  offerLineText: {
    fontSize: 11,
    color: '#334155',
    flex: 1,
    fontWeight: '600',
  },
  sizeSection: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginTop: 12,
  },
  sizeHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sizeHeaderText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#0f172a',
  },
  sizeChartRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sizeChartText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#7c3aed',
  },
  sizesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sizeBox: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
    backgroundColor: '#ffffff',
  },
  sizeBoxActive: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  sizeBoxText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0f172a',
  },
  sizeBoxTextActive: {
    color: '#ffffff',
  },
  fitGuidelinesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 10,
    marginTop: 4,
  },
  fitLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fitText: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '700',
  },
  modelSizeText: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '700',
  },
  addressBlockContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginHorizontal: 16,
    padding: 12,
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  locationPinIcon: {
    marginRight: 10,
  },
  addressDetails: {
    flex: 1,
  },
  deliverToText: {
    fontSize: 12,
    color: '#0f172a',
  },
  addressSubtext: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 2,
  },
  changeButton: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#ffffff',
  },
  changeButtonText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#7c3aed',
  },
  bottomBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 72,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderColor: '#f1f5f9',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 14 : 0,
  },
  btnShare: {
    width: 46,
    height: 46,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: '#ffffff',
  },
  btnAddToCart: {
    flex: 1,
    flexDirection: 'row',
    height: 46,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  btnAddToCartText: {
    fontSize: 13,
    fontWeight: '900',
    color: '#0f172a',
  },
});
