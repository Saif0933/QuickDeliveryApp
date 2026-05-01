import React, { useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Modal,
    Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import OrderSummary from '../cart/OrderSummary';
import CancellationPolicy from '../cart/CancellationPolicy';
import { COLORS } from '../../theme/color';
import { useCart } from '../../Context/CartContext';

const { width } = Dimensions.get('window');

const ProductScreen = ({ route, navigation }: any) => {
  const { 
    vendorName = "Premium Brand", 
    vendorImage = "https://images.unsplash.com/photo-1596755094514-f87e32f6b717?w=800&q=80",
    productName = "Product Name"
  } = (route?.params || {}) as any;

  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);

  const scrollX = useRef(new Animated.Value(0)).current;

  // Dummy data for Amazon-like detail page
  const productData = {
    brand: vendorName,
    title: productName || "Men's Luxury Cotton Slim Fit Casual Shirt",
    price: "₹799",
    mrp: "₹1,999",
    discount: "60% OFF",
    rating: "4.4",
    reviews: "2,458",
    colors: [
      { name: 'Sky Blue', hex: '#87CEEB', img: vendorImage },
      { name: 'Pure White', hex: '#FFFFFF', img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80' },
      { name: 'Classic Black', hex: '#000000', img: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    features: [
      "100% Premium Cotton",
      "Breathable and lightweight fabric",
      "Regular fit for all-day comfort",
      "Machine washable",
      "Imported premium finish"
    ],
    description: "Elevate your everyday style with our Premium Cotton Slim Fit Shirt. Crafted from 100% long-staple cotton, this shirt offers a soft, luxurious feel and exceptional durability. Perfect for office wear or a weekend outing.",
    delivery: "Tomorrow, Oct 12",
    seller: "Retail Net (Verified)"
  };

  const currentGallery = [
    productData.colors[selectedColor].img,
    vendorImage,
    'https://images.unsplash.com/photo-1489987707023-af0825ae1eeb?w=800&q=80',
    'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80'
  ];

  const SIMILAR_PRODUCTS = [
    {
      id: 1,
      brand: "ZARA",
      title: "Slim Fit Cotton Shirt",
      price: "₹899",
      mrp: "₹1,499",
      discount: "40% OFF",
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80"
    },
    {
      id: 2,
      brand: "NIKE",
      title: "Sporty Dry-Fit Tee",
      price: "₹1,299",
      mrp: "₹1,999",
      discount: "35% OFF",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80"
    },
    {
      id: 3,
      brand: "H&M",
      title: "Relaxed Fit Denim",
      price: "₹1,899",
      mrp: "₹2,999",
      discount: "36% OFF",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80"
    },
    {
      id: 4,
      brand: "LEVI'S",
      title: "Classic Blue Jeans",
      price: "₹2,499",
      mrp: "₹3,999",
      discount: "37% OFF",
      image: "https://images.unsplash.com/photo-1511499767390-945c2329bcac?w=500&q=80"
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* --- CANCELLATION POLICY MODAL --- */}
      <Modal
        visible={showPolicy}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowPolicy(false)}
      >
        <CancellationPolicy onClose={() => setShowPolicy(false)} />
      </Modal>

      {/* --- HEADER BAR --- */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerBtn}>
            <Ionicons name="share-outline" size={22} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerBtn}>
            <Ionicons name="cart-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* --- IMAGE CAROUSEL WITH OVERLAY --- */}
        <View style={styles.imageSection}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
          >
            {currentGallery.map((img, index) => (
              <View key={index} style={{ width: width, height: 450 }}>
                <Image source={{ uri: img }} style={styles.mainImage} resizeMode="cover" />
              </View>
            ))}
          </ScrollView>
          
          {/* PRODUCT NAME OVERLAY ON IMAGE */}
          <View style={styles.imageOverlay}>
            <View style={styles.nameBadge}>
               <Text style={styles.imageOverlayName}>{productName || "Men's Luxury Cotton Shirt"}</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.heartBtn} 
            onPress={() => setIsFavorite(!isFavorite)}
          >
            <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={24} color={isFavorite ? COLORS.primary : "#333"} />
          </TouchableOpacity>

          {/* DOT INDICATOR */}
          <View style={styles.dotContainer}>
            {currentGallery.map((_, i) => {
              const widthIndicator = scrollX.interpolate({
                inputRange: [width * (i - 1), width * i, width * (i + 1)],
                outputRange: [8, 16, 8],
                extrapolate: 'clamp'
              });
              const opacity = scrollX.interpolate({
                inputRange: [width * (i - 1), width * i, width * (i + 1)],
                outputRange: [0.4, 1, 0.4],
                extrapolate: 'clamp'
              });
              return <Animated.View key={i} style={[styles.dot, { width: widthIndicator, opacity }]} />;
            })}
          </View>
        </View>

        {/* --- PRODUCT INFO --- */}
        <View style={styles.infoSection}>
          <View style={styles.brandContainer}>
            <View style={styles.brandHeaderLeft}>
                <Image source={{ uri: vendorImage }} style={styles.brandLogo} />
                <View>
                    <Text style={styles.brandName}>{productData.brand}</Text>
                    <TouchableOpacity 
                        style={styles.visitStoreBtn}
                        onPress={() => navigation.navigate('BrandStoreScreen', { vendorId: route.params?.vendorId, vendorName: route.params?.vendorName, vendorImage: route.params?.vendorImage })}
                    >
                        <Text style={styles.visitStoreText}>Visit the Store ›</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>{productData.rating}</Text>
              <Ionicons name="star" size={12} color="#fff" />
            </View>
          </View>
          
          <View style={styles.priceRow}>
            <Text style={styles.price}>{productData.price}</Text>
            <Text style={styles.originalPrice}>{productData.mrp}</Text>
            <Text style={styles.discountBadge}>{productData.discount}</Text>
          </View>
          <Text style={styles.taxText}>Inclusive of all taxes</Text>

          <View style={styles.shortDescContainer}>
            <Text style={styles.shortDescText}>
                {route.params?.description || productData.description}
            </Text>
          </View>

          <View style={styles.divider} />

          {/* --- COLOR SELECTION --- */}
          <View style={styles.selectionSection}>
            <Text style={styles.sectionTitle}>Color: <Text style={styles.selectionValue}>{productData.colors[selectedColor].name}</Text></Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.selectionScroll}>
              {productData.colors.map((color, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={[styles.colorItem, selectedColor === index && styles.activeSelection]}
                  onPress={() => setSelectedColor(index)}
                >
                  <View style={[styles.colorPreview, { backgroundColor: color.hex }]} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* --- SIZE SELECTION --- */}
          <View style={styles.selectionSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Size: <Text style={styles.selectionValue}>{selectedSize}</Text></Text>
              <TouchableOpacity><Text style={styles.sizeChartLink}>Size Chart</Text></TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.selectionScroll}>
              {productData.sizes.map((size) => (
                <TouchableOpacity 
                  key={size} 
                  style={[styles.sizeItem, selectedSize === size && styles.activeSelection]}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text style={[styles.sizeText, selectedSize === size && styles.activeSelectionText]}>{size}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.divider} />

          {/* --- DELIVERY INFO --- */}
          <TouchableOpacity 
            style={styles.deliverySection} 
            activeOpacity={0.7}
            onPress={() => navigation.navigate('AddressBookScreen')}
          >
             <View style={styles.deliveryRow}>
                <Ionicons name="location-outline" size={20} color="#333" />
                <Text style={styles.deliveryLabel}>Delivery to <Text style={styles.deliveryValue}>Ranchi 834005</Text></Text>
             </View>
             <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <View>
                  <Text style={styles.deliveryTime}>FREE delivery <Text style={styles.deliveryDay}>{productData.delivery}</Text></Text>
                  <Text style={styles.sellerText}>Sold by <Text style={styles.deliveryValue}>{productData.seller}</Text></Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#999" />
             </View>
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* --- TRUST POLICIES --- */}
          <View style={styles.policyRow}>
             <View style={styles.policyItem}>
                <View style={styles.policyIconContainer}>
                   <Ionicons name="return-up-back-outline" size={20} color={COLORS.primary} />
                </View>
                <Text style={styles.policyLabel}>10-day return</Text>
             </View>
             
             <View style={styles.policyItem}>
                <View style={styles.policyIconContainer}>
                   <Ionicons name="cash-outline" size={20} color={COLORS.primary} />
                </View>
                <Text style={styles.policyLabel}>Cash on delivery</Text>
             </View>

             <View style={styles.policyItem}>
                <View style={styles.policyIconContainer}>
                   <Ionicons name="shield-checkmark-outline" size={20} color={COLORS.primary} />
                </View>
                <Text style={styles.policyLabel}>Secure payment</Text>
             </View>
          </View>

          <View style={styles.divider} />

          {/* --- DESCRIPTION --- */}
          <View style={styles.descSection}>
            <Text style={styles.sectionTitle}>Product Details</Text>
            {productData.features.map((feature, i) => (
              <View key={i} style={styles.featureItem}>
                <View style={styles.featureDot} />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
            <Text style={styles.fullDescription}>{productData.description}</Text>
          </View>

          <View style={styles.divider} />

          {/* --- SIMILAR PRODUCTS --- */}
          <View style={styles.similarSection}>
            <Text style={styles.sectionTitle}>Similar Products</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.similarScroll}>
              {SIMILAR_PRODUCTS.map((item) => (
                <TouchableOpacity 
                  key={item.id} 
                  style={styles.similarProductCard}
                  onPress={() => navigation.push('ProductScreen', {
                    vendorName: item.brand,
                    productName: item.title,
                    vendorImage: item.image,
                    description: "Premium " + item.brand + " essentials."
                  })}
                >
                  <Image source={{ uri: item.image }} style={styles.similarProductImage} />
                  <View style={styles.similarProductInfo}>
                    <Text style={styles.similarProductBrand}>{item.brand}</Text>
                    <Text style={styles.similarProductTitle} numberOfLines={1}>{item.title}</Text>
                    <View style={styles.similarProductPriceRow}>
                      <Text style={styles.similarProductPrice}>{item.price}</Text>
                      <Text style={styles.similarProductDiscount}>{item.discount}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>

      {/* --- FOOTER BUTTONS --- */}
      <View style={styles.footer}>
        <TouchableOpacity
            style={styles.wishlistBtn}
            onPress={() => {
              addToCart({
                id: Math.random().toString(36).substr(2, 9), // Generate a unique ID if not provided
                title: productData.title,
                price: productData.price,
                originalPrice: productData.mrp,
                discount: productData.discount,
                image: vendorImage,
                quantity: 1,
              });
              Alert.alert('Success', 'Added to Bag!');
            }}
          >
            <Ionicons name="cart-outline" size={22} color="#333" />
            <Text style={styles.wishlistBtnText}>Add to Bag</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.buyNowBtn}
          onPress={() => navigation.navigate('OrderSummary')}
        >
            <Text style={styles.buyNowBtnText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerRight: {
    flexDirection: 'row',
  },
  headerBtn: {
    padding: 8,
    marginLeft: 10,
  },
  imageSection: {
    width: width,
    height: 450,
    backgroundColor: '#fff',
  },
  mainImage: {
    width: width,
    height: 450,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    zIndex: 2,
  },
  nameBadge: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    alignSelf: 'flex-start',
    maxWidth: '85%',
  },
  imageOverlayName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  heartBtn: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(255,255,255,0.95)',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    zIndex: 10,
  },
  dotContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    marginHorizontal: 4,
  },
  infoSection: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: -20,
  },
  brandContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  brandHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  brandLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  brandName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  visitStoreBtn: {
    paddingVertical: 2,
  },
  visitStoreText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#388e3c',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  ratingText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 2,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 5,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 10,
  },
  originalPrice: {
    fontSize: 16,
    color: '#999',
    textDecorationLine: 'line-through',
    marginRight: 10,
  },
  discountBadge: {
    fontSize: 16,
    color: '#cc0c39',
    fontWeight: 'bold',
  },
  taxText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  shortDescContainer: {
    marginTop: 15,
    paddingHorizontal: 0,
  },
  shortDescText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 22,
    opacity: 0.8,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 20,
  },
  selectionSection: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  selectionValue: {
    fontWeight: 'normal',
    color: '#666',
  },
  sizeChartLink: {
     fontSize: 14,
     color: COLORS.primary,
     fontWeight: 'bold'
  },
  selectionScroll: {
    paddingLeft: 0,
  },
  colorItem: {
    width: 60,
    height: 80,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginRight: 12,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorPreview: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
  sizeItem: {
    width: 60,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sizeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  activeSelection: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  activeSelectionText: {
    color: COLORS.primary,
  },
  deliverySection: {
    paddingVertical: 5,
  },
  deliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  deliveryLabel: {
    fontSize: 15,
    color: '#333',
    marginLeft: 8,
  },
  deliveryValue: {
    fontWeight: 'bold',
  },
  deliveryTime: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  deliveryDay: {
    fontWeight: 'bold',
  },
  sellerText: {
    fontSize: 13,
    color: '#666',
  },
  descSection: {
    paddingBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  featureDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#333',
    marginTop: 7,
    marginRight: 10,
  },
  featureText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
    flex: 1,
  },
  fullDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    marginTop: 15,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 80,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    justifyContent: 'space-between'
  },
  wishlistBtn: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  wishlistBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginLeft: 8,
  },
  buyNowBtn: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyNowBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },

  // Policy Styles
  policyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
    marginVertical: 10,
  },
  policyItem: {
    alignItems: 'center',
    flex: 1,
  },
  policyIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F7FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  policyLabel: {
    fontSize: 10,
    color: '#333',
    fontWeight: '600',
    textAlign: 'center',
  },

  // Similar Products Styles
  similarSection: {
    marginTop: 10,
    marginBottom: 20,
  },
  similarScroll: {
    marginTop: 15,
  },
  similarProductCard: {
    width: 140,
    marginRight: 15,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    overflow: 'hidden',
  },
  similarProductImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  similarProductInfo: {
    padding: 10,
  },
  similarProductBrand: {
    fontSize: 9,
    color: '#888',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  similarProductTitle: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
    marginBottom: 6,
  },
  similarProductPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  similarProductPrice: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000',
  },
  similarProductDiscount: {
    fontSize: 9,
    color: '#cc0c39',
    fontWeight: 'bold',
  },
});

export default ProductScreen;