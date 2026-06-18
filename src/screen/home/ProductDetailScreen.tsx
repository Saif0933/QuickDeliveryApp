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

const { width } = Dimensions.get('window');

const relatedItems = [
  {
    id: 'r1',
    brand: 'Dennis Lingo',
    name: 'Men Navy Blue Shirt',
    price: '₹1,399',
    originalPrice: '₹2,299',
    discount: '38% OFF',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&auto=format&fit=crop&q=80',
    liked: false,
  },
  {
    id: 'r2',
    brand: 'Roadster',
    name: 'Men Beige Shirt',
    price: '₹1,299',
    originalPrice: '₹2,199',
    discount: '41% OFF',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&auto=format&fit=crop&q=80',
    liked: false,
  },
  {
    id: 'r3',
    brand: 'HRX by Hrithik Roshan',
    name: 'Men Black Shirt',
    price: '₹1,599',
    originalPrice: '₹2,699',
    discount: '41% OFF',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400&auto=format&fit=crop&q=80',
    liked: true,
  },
];

const productThumbnails = [
  'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&auto=format&fit=crop&q=80', // Olive Green
  'https://images.unsplash.com/photo-1602810318629-873523992b15?w=400&auto=format&fit=crop&q=80', // Back view
  'https://images.unsplash.com/photo-1602810318342-a8c679b3ba14?w=400&auto=format&fit=crop&q=80', // Back zoom
  'https://images.unsplash.com/photo-1602810318320-1e5ec6060f6c?w=400&auto=format&fit=crop&q=80', // Side/Sleeve
];

export default function ProductDetailScreen({ route, navigation }: any) {
  const [selectedColor, setSelectedColor] = useState('olive');
  const [selectedSize, setSelectedSize] = useState('M');
  const [activeThumb, setActiveThumb] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBack} onPress={() => navigation.goBack()}>
          <MaterialIcons name="chevron-left" size={28} color="#0f172a" />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="search" size={24} color="#0f172a" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => setIsWishlisted(!isWishlisted)}>
            <MaterialIcons 
              name={isWishlisted ? "favorite" : "favorite-border"} 
              size={24} 
              color={isWishlisted ? "#ef4444" : "#0f172a"} 
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Cart')}>
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
        {/* Product Image Showcase */}
        <View style={styles.imageShowcaseWrapper}>
          <View style={styles.imageCardContainer}>
            <Image source={{ uri: productThumbnails[activeThumb] }} style={styles.mainProductImage} />
            
            {/* Product Badges */}
            <View style={styles.badgeContainer}>
              <View style={styles.percentBadge}>
                <Text style={styles.percentText}>-40%</Text>
              </View>
              <View style={styles.bestSellerBadge}>
                <Text style={styles.bestSellerText}>Best Seller</Text>
              </View>
            </View>

            {/* View Similar Button */}
            <TouchableOpacity style={styles.viewSimilarButton} activeOpacity={0.8}>
              <MaterialIcons name="search" size={16} color="#0f172a" style={{ marginRight: 4 }} />
              <Text style={styles.viewSimilarText}>View Similar</Text>
            </TouchableOpacity>
          </View>

          {/* Slider Dots */}
          <View style={styles.dotsContainer}>
            {productThumbnails.map((_, i) => (
              <View key={i} style={[styles.dot, activeThumb === i && styles.dotActive]} />
            ))}
          </View>

          {/* Thumbnail Row */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.thumbsContainer}>
            {productThumbnails.map((thumb, idx) => (
              <TouchableOpacity 
                key={idx} 
                style={[styles.thumbCard, activeThumb === idx && styles.thumbCardActive]}
                onPress={() => setActiveThumb(idx)}
              >
                <Image source={{ uri: thumb }} style={styles.thumbImage} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Product Information Details */}
        <View style={styles.productDetailsWrapper}>
          <TouchableOpacity style={styles.brandRow} activeOpacity={0.7}>
            <Text style={styles.brandName}>Roadster</Text>
            <MaterialIcons name="chevron-right" size={16} color="#0f172a" />
          </TouchableOpacity>

          <Text style={styles.productTitle}>Men Olive Green Casual Shirt</Text>
          <Text style={styles.productSubtitle}>Regular Fit</Text>

          {/* Rating */}
          <View style={styles.ratingRow}>
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>4.5</Text>
              <MaterialIcons name="star" size={14} color="#ffffff" style={{ marginLeft: 2 }} />
            </View>
            <Text style={styles.reviewText}>(2,345 reviews)</Text>
          </View>

          {/* Price section */}
          <View style={styles.priceRow}>
            <Text style={styles.currentPrice}>₹1,499</Text>
            <Text style={styles.originalPrice}>₹2,499</Text>
            <Text style={styles.discountPrice}>40% OFF</Text>
          </View>
          <Text style={styles.taxText}>Inclusive of all taxes</Text>

          {/* Coupon Promo Card */}
          <View style={styles.couponCard}>
            <View style={styles.couponMain}>
              <View style={styles.couponIconContainer}>
                <MaterialIcons name="shopping-bag" size={20} color="#16a34a" />
              </View>
              <View style={styles.couponTextContainer}>
                <Text style={styles.couponTitle}>Get it for <Text style={{ fontWeight: '800' }}>₹1,349</Text></Text>
                <Text style={styles.couponSubtitle}>Use code: <Text style={{ color: '#16a34a', fontWeight: '700' }}>EXTRA10</Text></Text>
              </View>
              <Text style={styles.tcText}>T&C</Text>
            </View>
            <View style={styles.couponFooter}>
              <Text style={styles.couponFooterText}>+ 5% Instant Discount on prepaid orders</Text>
            </View>
          </View>

          {/* Color section */}
          <Text style={styles.sectionTitle}>Color: <Text style={{ fontWeight: '800' }}>Olive Green</Text></Text>
          <View style={styles.colorContainer}>
            <TouchableOpacity 
              style={[styles.colorCircleWrapper, selectedColor === 'olive' && styles.colorCircleActive]}
              onPress={() => setSelectedColor('olive')}
            >
              <View style={[styles.colorCircle, { backgroundColor: '#5f6f52' }]} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.colorCircleWrapper, selectedColor === 'navy' && styles.colorCircleActive]}
              onPress={() => setSelectedColor('navy')}
            >
              <View style={[styles.colorCircle, { backgroundColor: '#1e293b' }]} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.colorCircleWrapper, selectedColor === 'beige' && styles.colorCircleActive]}
              onPress={() => setSelectedColor('beige')}
            >
              <View style={[styles.colorCircle, { backgroundColor: '#dcc6a8' }]} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.colorCircleWrapper, selectedColor === 'white' && styles.colorCircleActive]}
              onPress={() => setSelectedColor('white')}
            >
              <View style={[styles.colorCircle, { backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#cbd5e1' }]} />
            </TouchableOpacity>
            <View style={styles.moreColorsCircle}>
              <Text style={styles.moreColorsText}>+2</Text>
            </View>
          </View>

          {/* Size section */}
          <View style={styles.sizeHeaderRow}>
            <Text style={styles.sizeLabel}>Size: <Text style={{ fontWeight: '800' }}>{selectedSize}</Text></Text>
            <TouchableOpacity style={styles.sizeGuideButton}>
              <MaterialIcons name="straighten" size={16} color="#0f172a" style={{ marginRight: 4 }} />
              <Text style={styles.sizeGuideText}>Size Guide</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.sizeContainer}>
            {['S', 'M', 'L', 'XL', 'XXL'].map((sz) => {
              const isSelected = selectedSize === sz;
              return (
                <TouchableOpacity 
                  key={sz} 
                  style={[styles.sizeBox, isSelected && styles.sizeBoxSelected]}
                  onPress={() => setSelectedSize(sz)}
                >
                  <Text style={[styles.sizeBoxText, isSelected && styles.sizeBoxTextSelected]}>{sz}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Delivery Section */}
          <View style={styles.cardSection}>
            <Text style={styles.deliveryTitle}>Delivery</Text>
            <View style={styles.deliveryRow}>
              <MaterialIcons name="location-on" size={18} color="#64748b" style={{ marginRight: 6 }} />
              <Text style={styles.deliveryPin}>Deliver to: <Text style={{ fontWeight: '700', color: '#0f172a' }}>400001</Text></Text>
              <TouchableOpacity style={styles.changePinButton}>
                <Text style={styles.changePinText}>CHANGE</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.deliveryStatus}>Standard Delivery</Text>
            <Text style={styles.deliveryTime}>3-5 days | <Text style={{ color: '#16a34a', fontWeight: '700' }}>Free</Text></Text>
          </View>

          {/* Offers Section */}
          <View style={styles.cardSection}>
            <Text style={styles.deliveryTitle}>Offers</Text>
            <TouchableOpacity style={styles.offerItem} activeOpacity={0.7}>
              <View style={styles.offerIconBox}>
                <MaterialIcons name="credit-card" size={18} color="#7c3aed" />
              </View>
              <View style={styles.offerTextContent}>
                <Text style={styles.offerTitleText}>Bank Offer</Text>
                <Text style={styles.offerSubtext}>10% Instant Discount on ICICI Bank Cards</Text>
              </View>
              <MaterialIcons name="chevron-right" size={20} color="#64748b" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.offerItem} activeOpacity={0.7}>
              <View style={styles.offerIconBox}>
                <MaterialIcons name="local-offer" size={18} color="#ea580c" />
              </View>
              <View style={styles.offerTextContent}>
                <Text style={styles.offerTitleText}>Partner Offer</Text>
                <Text style={styles.offerSubtext}>Buy 2 Get 10% Off on selected items</Text>
              </View>
              <MaterialIcons name="chevron-right" size={20} color="#64748b" />
            </TouchableOpacity>
          </View>

          {/* Product Details Specs Section */}
          <View style={styles.cardSection}>
            <Text style={styles.deliveryTitle}>Product Details</Text>
            <View style={styles.specGrid}>
              <View style={styles.specItem}>
                <MaterialIcons name="layers" size={16} color="#64748b" style={{ marginRight: 8 }} />
                <View>
                  <Text style={styles.specLabel}>Fabric</Text>
                  <Text style={styles.specValue}>100% Cotton</Text>
                </View>
              </View>
              <View style={styles.specItem}>
                <MaterialIcons name="wc" size={16} color="#64748b" style={{ marginRight: 8 }} />
                <View>
                  <Text style={styles.specLabel}>Fit</Text>
                  <Text style={styles.specValue}>Regular Fit</Text>
                </View>
              </View>
              <View style={styles.specItem}>
                <MaterialIcons name="checkroom" size={16} color="#64748b" style={{ marginRight: 8 }} />
                <View>
                  <Text style={styles.specLabel}>Neck</Text>
                  <Text style={styles.specValue}>Spread Collar</Text>
                </View>
              </View>
              <View style={styles.specItem}>
                <MaterialIcons name="gesture" size={16} color="#64748b" style={{ marginRight: 8 }} />
                <View>
                  <Text style={styles.specLabel}>Sleeve</Text>
                  <Text style={styles.specValue}>Full Sleeve</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.viewMoreAccordion}>
              <Text style={styles.viewMoreAccText}>View More</Text>
              <MaterialIcons name="keyboard-arrow-down" size={16} color="#0f172a" style={{ marginLeft: 4 }} />
            </TouchableOpacity>
          </View>

          {/* You May Also Like Section */}
          <Text style={[styles.sectionTitle, { marginTop: 30, marginBottom: 14 }]}>You May Also Like</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.relatedScroll}
          >
            {relatedItems.map((item) => (
              <View key={item.id} style={styles.relatedCard}>
                <Image source={{ uri: item.image }} style={styles.relatedImage} />
                <TouchableOpacity style={styles.relatedHeart}>
                  <MaterialIcons name={item.liked ? "favorite" : "favorite-border"} size={16} color={item.liked ? "#ef4444" : "#64748b"} />
                </TouchableOpacity>
                <View style={styles.relatedInfo}>
                  <Text style={styles.relatedBrand}>{item.brand}</Text>
                  <Text style={styles.relatedName} numberOfLines={1}>{item.name}</Text>
                  <View style={styles.relatedPriceRow}>
                    <Text style={styles.relatedPrice}>{item.price}</Text>
                    <Text style={styles.relatedOrigPrice}>{item.originalPrice}</Text>
                  </View>
                  <Text style={styles.relatedDiscount}>{item.discount}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Sticky Bottom Actions Bar */}
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.squareActionButton}>
          <MaterialIcons name="share" size={22} color="#0f172a" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.squareActionButton} onPress={() => setIsWishlisted(!isWishlisted)}>
          <MaterialIcons name={isWishlisted ? "favorite" : "favorite-border"} size={22} color={isWishlisted ? "#ef4444" : "#0f172a"} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.addToCartBtn} activeOpacity={0.8} onPress={() => navigation.navigate('Cart')}>
          <MaterialIcons name="shopping-bag" size={18} color="#0f172a" style={{ marginRight: 6 }} />
          <Text style={styles.addToCartBtnText}>Add to Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.buyNowBtn} 
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Checkout')}
        >
          <MaterialIcons name="shopping-bag" size={18} color="#ffffff" style={{ marginRight: 6 }} />
          <Text style={styles.buyNowBtnText}>Buy Now</Text>
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
    borderBottomWidth: 1,
    borderColor: '#f1f5f9',
    backgroundColor: '#ffffff',
  },
  headerBack: {
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
    paddingBottom: 100,
  },
  imageShowcaseWrapper: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  imageCardContainer: {
    width: width - 32,
    height: 420,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#f8fafc',
  },
  mainProductImage: {
    width: '100%',
    height: '100%',
  },
  badgeContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  percentBadge: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  percentText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '900',
  },
  bestSellerBadge: {
    backgroundColor: '#0f172a',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  bestSellerText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
  },
  viewSimilarButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  viewSimilarText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0f172a',
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#e2e8f0',
    marginHorizontal: 3,
  },
  dotActive: {
    backgroundColor: '#0f172a',
    width: 16,
  },
  thumbsContainer: {
    paddingLeft: 16,
    paddingRight: 8,
    marginTop: 16,
  },
  thumbCard: {
    width: 64,
    height: 74,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    marginRight: 10,
    overflow: 'hidden',
  },
  thumbCardActive: {
    borderColor: '#0f172a',
  },
  thumbImage: {
    width: '100%',
    height: '100%',
  },
  productDetailsWrapper: {
    paddingHorizontal: 16,
    marginTop: 14,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  brandName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0f172a',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
    marginTop: 6,
  },
  productSubtitle: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16a34a',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#ffffff',
  },
  reviewText: {
    fontSize: 12,
    color: '#64748b',
    marginLeft: 8,
    fontWeight: '500',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
  },
  currentPrice: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0f172a',
  },
  originalPrice: {
    fontSize: 14,
    color: '#94a3b8',
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  discountPrice: {
    fontSize: 14,
    color: '#16a34a',
    fontWeight: '800',
    marginLeft: 8,
  },
  taxText: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 2,
  },
  couponCard: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 16,
    backgroundColor: '#ffffff',
    padding: 14,
    marginTop: 16,
  },
  couponMain: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  couponIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#dcfce7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  couponTextContainer: {
    flex: 1,
  },
  couponTitle: {
    fontSize: 13,
    color: '#0f172a',
    fontWeight: '600',
  },
  couponSubtitle: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 1,
  },
  tcText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748b',
  },
  couponFooter: {
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    marginTop: 10,
    paddingTop: 8,
  },
  couponFooterText: {
    fontSize: 10,
    color: '#64748b',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748b',
    marginTop: 24,
  },
  colorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  colorCircleWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  colorCircleActive: {
    borderColor: '#0f172a',
  },
  colorCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
  },
  moreColorsCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreColorsText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748b',
  },
  sizeHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
  },
  sizeLabel: {
    fontSize: 13,
    color: '#64748b',
  },
  sizeGuideButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sizeGuideText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0f172a',
  },
  sizeContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  sizeBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: '#ffffff',
  },
  sizeBoxSelected: {
    backgroundColor: '#0f172a',
    borderColor: '#0f172a',
  },
  sizeBoxText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0f172a',
  },
  sizeBoxTextSelected: {
    color: '#ffffff',
  },
  cardSection: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  deliveryTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  deliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  deliveryPin: {
    fontSize: 13,
    color: '#64748b',
    flex: 1,
  },
  changePinButton: {
    paddingVertical: 2,
  },
  changePinText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#3b82f6',
  },
  deliveryStatus: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0f172a',
  },
  deliveryTime: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  offerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  offerIconBox: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  offerTextContent: {
    flex: 1,
  },
  offerTitleText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0f172a',
  },
  offerSubtext: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 1,
  },
  specGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  specItem: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  specLabel: {
    fontSize: 10,
    color: '#94a3b8',
  },
  specValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0f172a',
    marginTop: 1,
  },
  viewMoreAccordion: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    marginTop: 10,
    paddingTop: 12,
  },
  viewMoreAccText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0f172a',
  },
  relatedScroll: {
    paddingRight: 8,
  },
  relatedCard: {
    width: 140,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    marginRight: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  relatedImage: {
    width: '100%',
    height: 150,
  },
  relatedHeart: {
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
  relatedInfo: {
    padding: 10,
  },
  relatedBrand: {
    fontSize: 9,
    fontWeight: '800',
    color: '#64748b',
    textTransform: 'uppercase',
  },
  relatedName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0f172a',
    marginTop: 1,
  },
  relatedPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  relatedPrice: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0f172a',
  },
  relatedOrigPrice: {
    fontSize: 9,
    color: '#94a3b8',
    textDecorationLine: 'line-through',
    marginLeft: 4,
  },
  relatedDiscount: {
    fontSize: 10,
    color: '#16a34a',
    fontWeight: '700',
    marginTop: 2,
  },
  bottomActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderColor: '#f1f5f9',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingBottom: Platform.OS === 'ios' ? 14 : 0,
  },
  squareActionButton: {
    width: 44,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  addToCartBtn: {
    flex: 1,
    flexDirection: 'row',
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    backgroundColor: '#ffffff',
  },
  addToCartBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0f172a',
  },
  buyNowBtn: {
    flex: 1,
    flexDirection: 'row',
    height: 44,
    borderRadius: 10,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyNowBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#ffffff',
  },
});
