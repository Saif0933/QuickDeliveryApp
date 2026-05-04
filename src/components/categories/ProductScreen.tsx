import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useCart } from '../../Context/CartContext';
import { useWishlist } from '../../Context/WishlistContext';
import CancellationPolicy from '../cart/CancellationPolicy';

const { width } = Dimensions.get('window');

const ProductScreen = ({ route, navigation }: any) => {
  const { 
    vendorName = "Premium Brand", 
    vendorImage = "https://images.unsplash.com/photo-1596755094514-f87e32f6b717?w=800&q=80",
    productName = "Product Name"
  } = (route?.params || {}) as any;

  const { addToCart, cartItems } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Header cart count (number of unique products)
  const cartCount = cartItems.length;

  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  // Qty selection state (Ported from Cart)
  const [qtyModalVisible, setQtyModalVisible] = useState(false);
  const [customQtyVisible, setCustomQtyVisible] = useState(false);
  const [tempQty, setTempQty] = useState('');

  const handleQtySelect = (qty: number) => {
    setQuantity(qty);
    setQtyModalVisible(false);
  };

  const handleCustomQtyApply = () => {
    const qty = parseInt(tempQty);
    if (!isNaN(qty) && qty > 0) {
      setQuantity(qty);
      setCustomQtyVisible(false);
      setQtyModalVisible(false);
      setTempQty('');
    }
  };

  // Removed local isFavorite state to use global WishlistContext
  const [showPolicy, setShowPolicy] = useState(false);
  const [expandedLink, setExpandedLink] = useState<string | null>(null);

  // Generate a unique ID for the product based on title/brand if ID is not passed
  const currentProductId = route?.params?.id || `prod_${vendorName}_${productName}`;

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
        <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerRightGroup}>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="search-outline" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="heart-outline" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.headerIcon} 
            onPress={() => addToCart({
              id: currentProductId,
              title: productData.title,
              price: productData.price,
              originalPrice: productData.mrp,
              discount: productData.discount,
              image: vendorImage,
              quantity: quantity,
              brand: vendorName,
            })}
          >
            <View>
              <Ionicons name="cart-outline" size={24} color="#000" />
              {cartCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartCount}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* --- IMAGE SECTION --- */}
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
              <View key={index} style={{ width: width, height: 500 }}>
                <Image source={{ uri: img }} style={styles.mainImage} resizeMode="cover" />
              </View>
            ))}
          </ScrollView>

          {/* Floating Size Guide Button */}
          <TouchableOpacity style={styles.floatingSizeBtn}>
             <MaterialCommunityIcons name="ruler" size={18} color="#000" />
             <Text style={styles.sizeBtnText}>SIZE</Text>
          </TouchableOpacity>

          <View style={styles.paginationContainer}>
            {currentGallery.map((_, i) => {
              const dotOpacity = scrollX.interpolate({
                inputRange: [width * (i - 1), width * i, width * (i + 1)],
                outputRange: [0.3, 1, 0.3],
                extrapolate: 'clamp'
              });
              return <Animated.View key={i} style={[styles.paginationDot, { opacity: dotOpacity }]} />;
            })}
          </View>
        </View>

        <View style={styles.productMainInfo}>
           <View style={styles.titleRow}>
             <Text style={styles.productTitle}>{productData.title}</Text>
             <Text style={styles.colorCount}>4 colors</Text>
           </View>

           <View style={styles.priceSection}>
              <Text style={styles.mrpLabel}>MRP <Text style={styles.mrpValue}>{productData.price}</Text></Text>
              <Text style={styles.taxInfo}>Price inclusive of all taxes.</Text>
           </View>
        </View>

        <View style={styles.selectionBlock}>
          <Text style={styles.blockTitle}>Color</Text>
          <Text style={styles.blockSubValue}>{productData.colors[selectedColor].name}</Text>
          <View style={styles.colorGrid}>
            {productData.colors.map((color, index) => (
              <TouchableOpacity 
                key={index} 
                onPress={() => setSelectedColor(index)}
                style={[styles.colorCircleWrapper, selectedColor === index && styles.colorCircleActive]}
              >
                <View style={[styles.colorCircle, { backgroundColor: color.hex }]} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.selectionBlock}>
          <View style={styles.blockHeaderRow}>
             <Text style={styles.blockTitle}>Select Size</Text>
             <TouchableOpacity><Text style={styles.chartLink}>Size chart</Text></TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sizeGrid}>
            {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
              <TouchableOpacity 
                key={size} 
                onPress={() => setSelectedSize(size)}
                style={[styles.sizeBox, selectedSize === size && styles.sizeBoxActive]}
              >
                <Text style={[styles.sizeText, selectedSize === size && styles.sizeTextActive]}>{size}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.selectionBlock}>
          <Text style={styles.blockTitle}>Select Quantity</Text>
          <TouchableOpacity 
            style={styles.qtySelectorBtn}
            onPress={() => setQtyModalVisible(true)}
          >
            <Text style={styles.qtySelectorText}>Qty: {quantity}</Text>
            <Ionicons name="chevron-down" size={16} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.deliveryBlock}>
          <Text style={styles.blockTitle}>Delivery & Return Details</Text>
          <View style={styles.pincodeBox}>
             <Text style={styles.pincodeText}>Pin Code</Text>
             <TouchableOpacity><Text style={styles.changePincode}>Change Pincode</Text></TouchableOpacity>
          </View>
          
          <View style={styles.deliveryFeature}>
             <Ionicons name="reload-outline" size={20} color="#666" />
             <View style={styles.featureInfo}>
                <Text style={styles.featureTitle}>10 day Return and Exchange</Text>
                <TouchableOpacity><Text style={styles.featureLink}>Return Policies</Text></TouchableOpacity>
             </View>
          </View>

          <View style={styles.deliveryFeature}>
             <Ionicons name="cash-outline" size={20} color="#666" />
             <View style={styles.featureInfo}>
                <Text style={styles.featureTitle}>Cash on Delivery Available</Text>
             </View>
          </View>
        </View>

          <View style={styles.divider} />

        <View style={styles.productDetailsBlock}>
           <Text style={styles.blockTitle}>Product Details</Text>
           <View style={styles.detailsGrid}>
              <View style={styles.detailRow}>
                 <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Fabric Composition</Text>
                    <Text style={styles.detailValue}>100% Cotton</Text>
                 </View>
                 <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Length</Text>
                    <Text style={styles.detailValue}>Medium</Text>
                 </View>
              </View>
              <View style={styles.detailRow}>
                 <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Package Contains</Text>
                    <Text style={styles.detailValue}>1 Women's Tshirt</Text>
                 </View>
                 <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Transparency</Text>
                    <Text style={styles.detailValue}>Opaque</Text>
                 </View>
              </View>
              <View style={styles.detailRow}>
                 <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>USP</Text>
                    <Text style={styles.detailValue}>Crew Neck, David Bowie</Text>
                 </View>
                 <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Wash Care</Text>
                    <Text style={styles.detailValue}>Machine wash cold</Text>
                 </View>
              </View>
           </View>
           <TouchableOpacity style={styles.moreDetailsBtn}>
              <Text style={styles.moreDetailsText}>More details ⌵</Text>
           </TouchableOpacity>
        </View>

        <View style={styles.trustSection}>
           <View style={styles.trustItem}>
              <Ionicons name="shield-checkmark" size={32} color="#000" />
              <Text style={styles.trustText}>Assured Quality</Text>
           </View>
           <View style={styles.trustItem}>
              <Ionicons name="reload-circle" size={32} color="#000" />
              <Text style={styles.trustText}>Easy Returns</Text>
           </View>
           <View style={styles.trustItem}>
              <MaterialCommunityIcons name="truck-delivery" size={32} color="#000" />
              <Text style={styles.trustText}>Free Shipping</Text>
           </View>
        </View>

        <View style={styles.recentlyViewedSection}>
           <Text style={styles.blockTitle}>Shop From Recently Viewed</Text>
           <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 15 }}>
              {SIMILAR_PRODUCTS.map((item) => (
                <View key={item.id} style={styles.recentProductCard}>
                   <Image source={{ uri: item.image }} style={styles.recentImage} />
                   <Text style={styles.recentTitle} numberOfLines={1}>{item.title}</Text>
                   <Text style={styles.recentPrice}>₹{item.price.replace('₹', '')}</Text>
                </View>
              ))}
           </ScrollView>
        </View>

        <View style={styles.linksSection}>
           {/* Link 1 */}
           <View style={styles.linkContainer}>
              <TouchableOpacity 
                style={styles.linkRow} 
                onPress={() => setExpandedLink(expandedLink === 'brand' ? null : 'brand')}
              >
                 <Text style={styles.linkText}>More Tshirts by Quick delivery App</Text>
                 <Ionicons name={expandedLink === 'brand' ? "chevron-down" : "chevron-forward"} size={16} color="#666" />
              </TouchableOpacity>
              {expandedLink === 'brand' && (
                <View style={styles.linkDropdown}>
                   <Text style={styles.linkDropdownText}>Explore a wide variety of premium designs and limited edition drops exclusively from Quick delivery App.</Text>
                </View>
              )}
           </View>

           {/* Link 2 */}
           <View style={styles.linkContainer}>
              <TouchableOpacity 
                style={styles.linkRow}
                onPress={() => setExpandedLink(expandedLink === 'chest' ? null : 'chest')}
              >
                 <Text style={styles.linkText}>More Chest Print Tshirts</Text>
                 <Ionicons name={expandedLink === 'chest' ? "chevron-down" : "chevron-forward"} size={16} color="#666" />
              </TouchableOpacity>
              {expandedLink === 'chest' && (
                <View style={styles.linkDropdown}>
                   <Text style={styles.linkDropdownText}>Discover trendy graphic prints and bold chest statements curated for your style.</Text>
                </View>
              )}
           </View>

           {/* Link 3 */}
           <View style={styles.linkContainer}>
              <TouchableOpacity 
                style={styles.linkRow}
                onPress={() => setExpandedLink(expandedLink === 'all' ? null : 'all')}
              >
                 <Text style={styles.linkText}>All Tshirts</Text>
                 <Ionicons name={expandedLink === 'all' ? "chevron-down" : "chevron-forward"} size={16} color="#666" />
              </TouchableOpacity>
              {expandedLink === 'all' && (
                <View style={styles.linkDropdown}>
                   <Text style={styles.linkDropdownText}>View our entire collection of cotton, linen, and slim-fit t-shirts for every occasion.</Text>
                </View>
              )}
           </View>
        </View>
      </ScrollView>

      {/* --- QUICK QTY MODAL --- */}
      <Modal
        visible={qtyModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setQtyModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setQtyModalVisible(false)}
        >
          <View style={styles.qtyMenuContainer}>
            <Text style={styles.qtyMenuTitle}>Select Quantity</Text>
            {[1, 2, 3].map((num) => (
              <TouchableOpacity 
                key={num} 
                style={styles.qtyOption} 
                onPress={() => handleQtySelect(num)}
              >
                <Text style={styles.qtyOptionText}>{num}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity 
              style={styles.qtyOption} 
              onPress={() => setCustomQtyVisible(true)}
            >
              <Text style={styles.qtyOptionText}>More</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* --- CUSTOM QTY MODAL --- */}
      <Modal
        visible={customQtyVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setCustomQtyVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.customQtyContainer}>
            <Text style={styles.customQtyTitle}>Enter Quantity</Text>
            <TextInput
              style={styles.customQtyInput}
              keyboardType="number-pad"
              value={tempQty}
              onChangeText={setTempQty}
              autoFocus={true}
              placeholder="e.g. 5"
            />
            <View style={styles.customQtyActions}>
              <TouchableOpacity 
                style={[styles.customQtyBtn, styles.cancelBtn]} 
                onPress={() => setCustomQtyVisible(false)}
              >
                <Text style={styles.cancelBtnText}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.customQtyBtn, styles.applyBtn]} 
                onPress={handleCustomQtyApply}
              >
                <Text style={styles.applyBtnText}>APPLY</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* --- FOOTER BUTTONS --- */}
      <View style={styles.newFooter}>
        <TouchableOpacity style={styles.footerIconBtn}>
          <Ionicons name="share-social-outline" size={22} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.footerIconBtn} 
          onPress={() => toggleWishlist({
            id: currentProductId,
            title: productName || productData.title,
            price: productData.price,
            image: currentGallery[0],
            brand: vendorName,
            originalPrice: productData.mrp,
            rating: parseFloat(productData.rating),
            reviews: productData.reviews
          })}
        >
          <Ionicons 
            name={isInWishlist(currentProductId) ? "heart" : "heart-outline"} 
            size={22} 
            color={isInWishlist(currentProductId) ? "#e53935" : "#333"} 
          />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.addToBagBtn}
          onPress={() => {
            addToCart({
              id: currentProductId,
              title: productData.title,
              price: productData.price,
              originalPrice: productData.mrp,
              discount: productData.discount,
              image: vendorImage,
              quantity: quantity,
              brand: vendorName,
            });
            navigation.navigate('OrderSummary', {
              product: {
                id: currentProductId,
                title: productData.title,
                price: productData.price,
                originalPrice: productData.mrp,
                discount: productData.discount,
                image: vendorImage,
                quantity: quantity,
                brand: vendorName,
                rating: productData.rating,
                reviews: productData.reviews
              }
            });
          }}
        >
          <Ionicons name="cart-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.addToBagText}>Buy Now</Text>
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
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  headerIcon: {
    padding: 8,
  },
  headerRightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
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
  badgeText: {
    color: '#fff',
    fontSize: 8,
    fontWeight: 'bold',
  },
  imageSection: {
    width: width,
    height: 500,
    backgroundColor: '#fff',
  },
  mainImage: {
    width: width,
    height: 500,
  },
  floatingSizeBtn: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: 'column',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  sizeBtnText: {
    fontSize: 9,
    fontWeight: 'bold',
    marginTop: 2,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  paginationDot: {
    width: 25,
    height: 2,
    backgroundColor: '#000',
    marginHorizontal: 3,
  },
  productMainInfo: {
    padding: 16,
    backgroundColor: '#fff',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  productTitle: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    lineHeight: 20,
    marginRight: 15,
  },
  colorCount: {
    fontSize: 12,
    color: '#1a73e8',
    fontWeight: '600',
  },
  priceSection: {
    marginTop: 4,
  },
  mrpLabel: {
    fontSize: 15,
    color: '#000',
    fontWeight: 'bold',
  },
  mrpValue: {
    fontSize: 16,
  },
  taxInfo: {
    fontSize: 11,
    color: '#999',
    marginTop: 4,
  },
  selectionBlock: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 8,
    borderTopColor: '#f8f9fa',
  },
  blockTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  blockSubValue: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
    marginBottom: 12,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  colorCircleWrapper: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  colorCircleActive: {
    borderColor: '#000',
    borderWidth: 2,
  },
  colorCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  blockHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  chartLink: {
    fontSize: 12,
    color: '#1a73e8',
    fontWeight: '600',
  },
  sizeGrid: {
    flexDirection: 'row',
  },
  sizeBox: {
    width: 50,
    height: 40,
    borderWidth: 1,
    borderColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  sizeBoxActive: {
    borderColor: '#000',
    borderWidth: 2,
  },
  sizeText: {
    fontSize: 13,
    color: '#333',
  },
  sizeTextActive: {
    fontWeight: 'bold',
    color: '#000',
  },
  deliveryBlock: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 8,
    borderTopColor: '#f8f9fa',
  },
  pincodeBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f1f3f4',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 15,
    marginBottom: 20,
  },
  pincodeText: {
    fontSize: 14,
    color: '#666',
  },
  changePincode: {
    fontSize: 13,
    color: '#1a73e8',
    fontWeight: '600',
  },
  deliveryFeature: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  featureInfo: {
    marginLeft: 12,
    flex: 1,
  },
  featureTitle: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
  },
  featureLink: {
    fontSize: 12,
    color: '#1a73e8',
    marginTop: 4,
    fontWeight: '500',
  },
  productDetailsBlock: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 8,
    borderTopColor: '#f8f9fa',
  },
  detailsGrid: {
    marginTop: 15,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
    fontWeight: '600',
  },
  detailValue: {
    fontSize: 13,
    color: '#333',
  },
  moreDetailsBtn: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  moreDetailsText: {
    fontSize: 12,
    color: '#1a73e8',
    fontWeight: '600',
  },
  trustSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderTopWidth: 8,
    borderTopColor: '#f8f9fa',
  },
  trustItem: {
    alignItems: 'center',
  },
  trustText: {
    fontSize: 10,
    color: '#666',
    marginTop: 8,
    fontWeight: '600',
  },
  recentlyViewedSection: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 8,
    borderTopColor: '#f8f9fa',
  },
  recentProductCard: {
    width: 120,
    marginRight: 15,
  },
  recentImage: {
    width: 120,
    height: 160,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  recentTitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
  },
  recentPrice: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 4,
  },
  linksSection: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 8,
    borderTopColor: '#f8f9fa',
  },
  linkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  linkText: {
    fontSize: 14,
    color: '#1a73e8',
    fontWeight: '500',
  },
  linkContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  linkDropdown: {
    paddingBottom: 15,
    paddingHorizontal: 4,
  },
  linkDropdownText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  newFooter: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 70,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    justifyContent: 'space-between',
  },
  footerIconBtn: {
    width: 44,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  addToBagBtn: {
    flex: 1,
    height: 48,
    backgroundColor: '#202124',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  addToBagText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  divider: {
    height: 8,
    backgroundColor: '#f8f9fa',
  },
  similarProductDiscount: {
    fontSize: 9,
    color: '#cc0c39',
    fontWeight: 'bold',
  },
  qtySelectorBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#eee',
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 15,
    borderRadius: 4,
    width: 100,
  },
  qtySelectorText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyMenuContainer: {
    backgroundColor: '#FFF',
    width: '80%',
    borderRadius: 8,
    padding: 10,
  },
  qtyMenuTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  qtyOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  qtyOptionText: {
    fontSize: 14,
    color: '#333',
  },
  customQtyContainer: {
    backgroundColor: '#FFF',
    width: '85%',
    borderRadius: 8,
    padding: 20,
  },
  customQtyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  customQtyInput: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  customQtyActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  customQtyBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 10,
  },
  cancelBtn: {},
  applyBtn: {},
  cancelBtnText: {
    color: '#666',
    fontWeight: 'bold',
  },
  applyBtnText: {
    color: '#2874F0',
    fontWeight: 'bold',
  },
});

export default ProductScreen; 