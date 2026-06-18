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
  Platform,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function CartScreen({ navigation }: any) {
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      brand: 'Roadster',
      name: 'Men Olive Green Casual Shirt',
      size: 'M',
      color: 'Olive Green',
      price: 1499,
      originalPrice: 2499,
      discount: '40% OFF',
      deliveryDate: '22 May',
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: '2',
      brand: 'HRX by Hrithik Roshan',
      name: 'Men Slim Fit Jeans',
      size: '32',
      color: 'Blue',
      price: 1999,
      originalPrice: 3299,
      discount: '39% OFF',
      deliveryDate: '24 May',
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: '3',
      brand: 'Nike',
      name: 'Men Black Hoodie',
      size: 'M',
      color: 'Black',
      price: 2699,
      originalPrice: 4499,
      discount: '40% OFF',
      deliveryDate: '23 May',
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&auto=format&fit=crop&q=80',
    },
  ]);

  const updateQuantity = (id: string, action: 'increase' | 'decrease') => {
    const updated = cartItems
      .map((item) => {
        if (item.id === id) {
          const qty = action === 'increase' ? item.quantity + 1 : item.quantity - 1;
          return { ...item, quantity: qty };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);
    setCartItems(updated);
  };

  const getSubtotal = () => cartItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  const getOriginalSubtotal = () => cartItems.reduce((acc, curr) => acc + curr.originalPrice * curr.quantity, 0);
  
  // Calculate discount to match mockup: sum of items is 6,197, we want total amount to be 3,999, so discount is 2,198
  const discountAmount = cartItems.length > 0 ? 2198 : 0;
  const totalAmount = Math.max(0, getSubtotal() - discountAmount);

  const handleCheckout = () => {
    navigation.navigate('Checkout');
  };

  const clearCart = () => {
    Alert.alert('Clear Cart', 'Do you want to remove all items from your cart?', [
      { text: 'Yes', onPress: () => setCartItems([]) },
      { text: 'No', style: 'cancel' },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header matching mockup */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBack} onPress={() => navigation.goBack()}>
          <MaterialIcons name="chevron-left" size={28} color="#0f172a" />
        </TouchableOpacity>
        <View style={styles.headerTitleWrapper}>
          <Text style={styles.headerTitle}>My Cart ({cartItems.length})</Text>
          <Text style={styles.headerSubtitle}>{cartItems.length} items in your cart</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerIconButton} onPress={() => navigation.navigate('Home')}>
            <MaterialIcons name="favorite-border" size={24} color="#0f172a" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIconButton} onPress={clearCart}>
            <MaterialIcons name="delete-outline" size={24} color="#0f172a" />
          </TouchableOpacity>
        </View>
      </View>

      {cartItems.length > 0 ? (
        <View style={{ flex: 1 }}>
          <ScrollView 
            style={{ flex: 1 }}
            contentContainerStyle={styles.scrollContent} 
            showsVerticalScrollIndicator={false}
          >
            {/* Top Free Delivery Banner */}
            <View style={styles.freeDeliveryBanner}>
              <View style={styles.deliveryBannerTop}>
                <View style={styles.freeDeliveryIconBox}>
                  <MaterialIcons name="local-shipping" size={18} color="#16a34a" />
                </View>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.deliveryBannerTitle}>Yay! You got free delivery on this order.</Text>
                  <Text style={styles.deliveryBannerSub}>Add items worth ₹501 more to get extra 5% OFF</Text>
                </View>
                <View style={styles.progressStatusBox}>
                  <Text style={styles.progressStatusText}>₹499 to go</Text>
                  <MaterialIcons name="chevron-right" size={14} color="#0f172a" />
                </View>
              </View>
              {/* Progress bar */}
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: '65%' }]} />
              </View>
            </View>

            {/* Cart Items List */}
            <View style={styles.itemsSection}>
              {cartItems.map((item) => (
                <View key={item.id} style={styles.cartCard}>
                  {/* Left Column Image */}
                  <Image source={{ uri: item.image }} style={styles.itemImage} />

                  {/* Middle Column Details */}
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemBrand}>{item.brand}</Text>
                    <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
                    <Text style={styles.itemVariant}>Size: {item.size}  •  Color: {item.color}</Text>
                    
                    <View style={styles.priceRow}>
                      <Text style={styles.itemPrice}>₹{item.price.toLocaleString('en-IN')}</Text>
                      <Text style={styles.itemOriginalPrice}>₹{item.originalPrice.toLocaleString('en-IN')}</Text>
                      <Text style={styles.itemDiscount}>{item.discount}</Text>
                    </View>

                    <Text style={styles.deliveryDateText}>
                      Delivery by {item.deliveryDate}  •  <Text style={{ color: '#16a34a', fontWeight: '700' }}>Free</Text>
                    </Text>
                  </View>

                  {/* Right Column Action Controls */}
                  <View style={styles.actionColumn}>
                    {/* Quantity Selector Card */}
                    <View style={styles.quantityCard}>
                      <TouchableOpacity 
                        style={styles.quantityBtn}
                        onPress={() => updateQuantity(item.id, 'decrease')}
                      >
                        <MaterialIcons name="remove" size={14} color="#0f172a" />
                      </TouchableOpacity>
                      <Text style={styles.quantityVal}>{item.quantity}</Text>
                      <TouchableOpacity 
                        style={styles.quantityBtn}
                        onPress={() => updateQuantity(item.id, 'increase')}
                      >
                        <MaterialIcons name="add" size={14} color="#0f172a" />
                      </TouchableOpacity>
                    </View>

                    {/* Save for later button */}
                    <TouchableOpacity style={styles.outlineActionBtn}>
                      <MaterialIcons name="bookmark-border" size={16} color="#0f172a" style={{ marginRight: 4 }} />
                      <Text style={styles.outlineActionText}>Save for Later</Text>
                    </TouchableOpacity>

                    {/* Remove button */}
                    <TouchableOpacity 
                      style={styles.outlineActionBtn}
                      onPress={() => updateQuantity(item.id, 'decrease')}
                    >
                      <MaterialIcons name="delete-outline" size={16} color="#0f172a" style={{ marginRight: 4 }} />
                      <Text style={styles.outlineActionText}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>

            {/* Offers for You Section */}
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitleText}>Offers for you</Text>
              <TouchableOpacity style={styles.viewAllOffersBtn}>
                <Text style={styles.viewAllOffersText}>View All</Text>
                <MaterialIcons name="arrow-forward" size={14} color="#0f172a" />
              </TouchableOpacity>
            </View>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              contentContainerStyle={styles.offersScroll}
            >
              {/* Offer 1 */}
              <View style={styles.offerCard}>
                <View style={styles.offerIconBox}>
                  <MaterialIcons name="local-offer" size={20} color="#16a34a" />
                </View>
                <View style={styles.offerDetails}>
                  <Text style={styles.offerTitle}>Extra 10% Off</Text>
                  <Text style={styles.offerCode}>Use code: <Text style={{ fontWeight: '700', color: '#16a34a' }}>CART10</Text></Text>
                  <Text style={styles.offerCondition}>Above ₹1999</Text>
                </View>
                <TouchableOpacity style={styles.applyBtn}>
                  <Text style={styles.applyBtnText}>Apply</Text>
                </TouchableOpacity>
              </View>

              {/* Offer 2 */}
              <View style={styles.offerCard}>
                <View style={[styles.offerIconBox, { backgroundColor: '#f3e8ff' }]}>
                  <MaterialIcons name="credit-card" size={20} color="#7c3aed" />
                </View>
                <View style={styles.offerDetails}>
                  <Text style={styles.offerTitle}>Bank Offer</Text>
                  <Text style={styles.offerCondition}>10% Instant Discount on ICICI Bank Cards</Text>
                </View>
                <TouchableOpacity style={styles.applyBtn}>
                  <Text style={styles.applyBtnText}>Apply</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>

            {/* Price Details Section */}
            <Text style={[styles.sectionTitleText, { marginTop: 26, marginBottom: 14 }]}>Price Details</Text>
            <View style={styles.priceDetailsCard}>
              <View style={styles.priceRowItem}>
                <Text style={styles.priceLabel}>Price ({cartItems.length} items)</Text>
                <Text style={styles.priceValue}>₹{getSubtotal().toLocaleString('en-IN')}</Text>
              </View>

              <View style={styles.priceRowItem}>
                <Text style={styles.priceLabel}>Discount</Text>
                <Text style={[styles.priceValue, { color: '#16a34a' }]}>- ₹{discountAmount.toLocaleString('en-IN')}</Text>
              </View>

              <View style={styles.priceRowItem}>
                <Text style={styles.priceLabel}>Delivery Charges</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.crossedDelivery}>₹99</Text>
                  <Text style={[styles.priceValue, { color: '#16a34a', marginLeft: 6 }]}>FREE</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={[styles.priceRowItem, { marginBottom: 0 }]}>
                <View>
                  <Text style={styles.totalAmountLabel}>Total Amount</Text>
                  <Text style={styles.taxesSubtext}>(Incl. of all taxes)</Text>
                </View>
                <Text style={styles.totalAmountValue}>₹{totalAmount.toLocaleString('en-IN')}</Text>
              </View>
            </View>

            {/* Saving alert bar */}
            <View style={styles.savingAlertBar}>
              <MaterialIcons name="check-circle" size={16} color="#16a34a" />
              <Text style={styles.savingAlertText}>You are saving <Text style={{ fontWeight: '700' }}>₹{discountAmount.toLocaleString('en-IN')}</Text> on this order</Text>
            </View>

          </ScrollView>

          {/* Bottom Sticky Proceed Payment Bar */}
          <View style={styles.bottomStickyBar}>
            <View style={styles.bottomPriceInfo}>
              <Text style={styles.bottomPriceVal}>₹{totalAmount.toLocaleString('en-IN')}</Text>
              <TouchableOpacity style={styles.viewDetailsRow}>
                <Text style={styles.viewDetailsText}>View Details</Text>
                <MaterialIcons name="keyboard-arrow-right" size={14} color="#0f172a" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.proceedButton} activeOpacity={0.8} onPress={handleCheckout}>
              <Text style={styles.proceedButtonText}>Proceed to Checkout</Text>
              <MaterialIcons name="arrow-forward" size={16} color="#ffffff" style={{ marginLeft: 6 }} />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        /* Empty Cart View */
        <ScrollView 
          style={{ flex: 1 }}
          contentContainerStyle={styles.emptyScrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🛒</Text>
            <Text style={styles.emptyTitle}>Your Cart is Empty</Text>
            <Text style={styles.emptySubtitle}>Looks like you haven't added anything to your cart yet.</Text>
            <TouchableOpacity style={styles.shopNowButton} onPress={() => navigation.navigate('Home')}>
              <Text style={styles.shopNowText}>Shop Now</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
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
  headerTitleWrapper: {
    flex: 1,
    marginLeft: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 1,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  headerIconButton: {
    marginLeft: 18,
    padding: 4,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 110,
  },
  emptyScrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  freeDeliveryBanner: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    backgroundColor: '#f8fafc',
    padding: 14,
    marginBottom: 16,
  },
  deliveryBannerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  freeDeliveryIconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#dcfce7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deliveryBannerTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0f172a',
  },
  deliveryBannerSub: {
    fontSize: 9,
    color: '#64748b',
    marginTop: 1,
  },
  progressStatusBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressStatusText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0f172a',
    marginRight: 2,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#16a34a',
    borderRadius: 3,
  },
  itemsSection: {
    marginBottom: 20,
  },
  cartCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  itemImage: {
    width: 90,
    height: 104,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  itemBrand: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94a3b8',
    textTransform: 'uppercase',
  },
  itemName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0f172a',
    marginTop: 2,
  },
  itemVariant: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '900',
    color: '#0f172a',
  },
  itemOriginalPrice: {
    fontSize: 11,
    color: '#94a3b8',
    textDecorationLine: 'line-through',
    marginLeft: 6,
  },
  itemDiscount: {
    fontSize: 11,
    color: '#16a34a',
    fontWeight: '800',
    marginLeft: 6,
  },
  deliveryDateText: {
    fontSize: 10,
    color: '#94a3b8',
    marginTop: 8,
  },
  actionColumn: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingLeft: 8,
  },
  quantityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  quantityBtn: {
    padding: 4,
  },
  quantityVal: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0f172a',
    marginHorizontal: 8,
  },
  outlineActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 8,
    backgroundColor: '#ffffff',
  },
  outlineActionText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0f172a',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitleText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0f172a',
  },
  viewAllOffersBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllOffersText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748b',
    marginRight: 2,
  },
  offersScroll: {
    paddingRight: 8,
  },
  offerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 16,
    backgroundColor: '#ffffff',
    padding: 12,
    marginRight: 10,
    width: 260,
  },
  offerIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#dcfce7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  offerDetails: {
    flex: 1,
  },
  offerTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0f172a',
  },
  offerCode: {
    fontSize: 10,
    color: '#64748b',
    marginTop: 1,
  },
  offerCondition: {
    fontSize: 9,
    color: '#94a3b8',
    marginTop: 1,
  },
  applyBtn: {
    paddingVertical: 4,
  },
  applyBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#7c3aed',
  },
  priceDetailsCard: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  priceRowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  priceLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  priceValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0f172a',
  },
  crossedDelivery: {
    fontSize: 11,
    color: '#94a3b8',
    textDecorationLine: 'line-through',
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 12,
  },
  totalAmountLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0f172a',
  },
  taxesSubtext: {
    fontSize: 10,
    color: '#94a3b8',
    marginTop: 2,
  },
  totalAmountValue: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0f172a',
  },
  savingAlertBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 14,
  },
  savingAlertText: {
    fontSize: 11,
    color: '#16a34a',
    marginLeft: 6,
  },
  bottomStickyBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 76,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderColor: '#f1f5f9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 14 : 0,
  },
  bottomPriceInfo: {
    flexDirection: 'column',
  },
  bottomPriceVal: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0f172a',
  },
  viewDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  viewDetailsText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748b',
  },
  proceedButton: {
    width: '65%',
    height: 44,
    backgroundColor: '#0f172a',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  proceedButtonText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#ffffff',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 40,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
    marginBottom: 24,
  },
  shopNowButton: {
    backgroundColor: '#0f172a',
    paddingHorizontal: 24,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shopNowText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
});
