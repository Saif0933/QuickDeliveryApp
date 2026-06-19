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
  Dimensions,
  TextInput,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useCartStore } from '../../store/useCartStore';

const { width } = Dimensions.get('window');

export default function CheckoutScreen({ navigation }: any) {
  const { cartItems } = useCartStore();
  const cartPreviewItems = cartItems;

  // Stepper state: 1 = Address, 2 = Payment, 3 = Review, 4 = Order Placed
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDelivery, setSelectedDelivery] = useState('standard');
  const [selectedPayment, setSelectedPayment] = useState('upi');
  
  // Custom UPI / Card state values for Step 2
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGoHome = () => {
    navigation.navigate('Home');
  };

  const handleGoOrders = () => {
    navigation.navigate('OrderTracking');
  };

  // Step calculations
  const getSubtotal = () => cartItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  const getOriginalSubtotal = () => cartItems.reduce((acc, curr) => acc + (curr.originalPrice || curr.price) * curr.quantity, 0);

  const subtotal = getOriginalSubtotal();
  const discount = Math.max(0, getOriginalSubtotal() - getSubtotal());
  const deliveryCharges = selectedDelivery === 'express' ? 99 : 0;
  const totalAmount = getSubtotal() + deliveryCharges;


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header */}
      <View style={styles.header}>
        {currentStep < 4 ? (
          <TouchableOpacity style={styles.headerBack} onPress={currentStep === 1 ? () => navigation.goBack() : prevStep}>
            <MaterialIcons name="chevron-left" size={28} color="#0f172a" />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 28 }} />
        )}
        <View style={styles.headerTitleWrapper}>
          <Text style={styles.headerTitle}>
            {currentStep === 4 ? 'Order Placed' : 'Checkout'}
          </Text>
          <Text style={styles.headerSubtitle}>
            {currentStep === 1 && 'Review address and delivery options'}
            {currentStep === 2 && 'Choose your payment method'}
            {currentStep === 3 && 'Double check and place order'}
            {currentStep === 4 && 'Congratulations on your purchase!'}
          </Text>
        </View>
      </View>

      {/* Dynamic Stepper Component */}
      {currentStep < 4 && (
        <View style={styles.stepperBar}>
          {/* Step 1 */}
          <View style={styles.stepItem}>
            <TouchableOpacity 
              style={[
                styles.stepCircle, 
                currentStep === 1 && styles.stepCircleActive, 
                currentStep > 1 && styles.stepCircleCompleted
              ]}
              disabled={currentStep < 1}
              onPress={() => setCurrentStep(1)}
            >
              {currentStep > 1 ? (
                <MaterialIcons name="check" size={14} color="#ffffff" />
              ) : (
                <Text style={[styles.stepNumber, currentStep === 1 && styles.stepNumberActive]}>1</Text>
              )}
            </TouchableOpacity>
            <Text style={[styles.stepLabel, currentStep >= 1 && styles.stepLabelActive]}>Address</Text>
          </View>

          <View style={[styles.stepLine, currentStep > 1 && styles.stepLineActive]} />

          {/* Step 2 */}
          <View style={styles.stepItem}>
            <TouchableOpacity 
              style={[
                styles.stepCircle, 
                currentStep === 2 && styles.stepCircleActive, 
                currentStep > 2 && styles.stepCircleCompleted
              ]}
              disabled={currentStep < 2}
              onPress={() => setCurrentStep(2)}
            >
              {currentStep > 2 ? (
                <MaterialIcons name="check" size={14} color="#ffffff" />
              ) : (
                <Text style={[styles.stepNumber, currentStep === 2 && styles.stepNumberActive]}>2</Text>
              )}
            </TouchableOpacity>
            <Text style={[styles.stepLabel, currentStep >= 2 && styles.stepLabelActive]}>Payment</Text>
          </View>

          <View style={[styles.stepLine, currentStep > 2 && styles.stepLineActive]} />

          {/* Step 3 */}
          <View style={styles.stepItem}>
            <TouchableOpacity 
              style={[
                styles.stepCircle, 
                currentStep === 3 && styles.stepCircleActive, 
                currentStep > 3 && styles.stepCircleCompleted
              ]}
              disabled={currentStep < 3}
              onPress={() => setCurrentStep(3)}
            >
              {currentStep > 3 ? (
                <MaterialIcons name="check" size={14} color="#ffffff" />
              ) : (
                <Text style={[styles.stepNumber, currentStep === 3 && styles.stepNumberActive]}>3</Text>
              )}
            </TouchableOpacity>
            <Text style={[styles.stepLabel, currentStep >= 3 && styles.stepLabelActive]}>Review</Text>
          </View>

          <View style={[styles.stepLine, currentStep > 3 && styles.stepLineActive]} />

          {/* Step 4 */}
          <View style={styles.stepItem}>
            <View 
              style={[
                styles.stepCircle, 
                currentStep === 4 && styles.stepCircleActive,
              ]}
            >
              <Text style={[styles.stepNumber, currentStep === 4 && styles.stepNumberActive]}>4</Text>
            </View>
            <Text style={[styles.stepLabel, currentStep >= 4 && styles.stepLabelActive]}>Order Placed</Text>
          </View>
        </View>
      )}

      {/* Main Form Fields */}
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, currentStep === 4 && styles.successScrollContent]}
      >
        
        {/* STEP 1: ADDRESS */}
        {currentStep === 1 && (
          <View>
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
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: '65%' }]} />
              </View>
            </View>

            <Text style={styles.sectionTitle}>Delivery Address</Text>
            <View style={styles.cardBox}>
              <TouchableOpacity style={styles.addressMainRow} activeOpacity={0.8}>
                <View style={styles.locationPinBox}>
                  <MaterialIcons name="location-on" size={20} color="#16a34a" />
                </View>
                <View style={styles.addressInfo}>
                  <View style={styles.nameRow}>
                    <Text style={styles.addressName}>Rohit Sharma</Text>
                    <View style={styles.homeBadge}>
                      <Text style={styles.homeBadgeText}>HOME</Text>
                    </View>
                  </View>
                  <Text style={styles.addressText}>
                    123, Green Park Society, Sector 45, Gurugram, Haryana - 122003
                  </Text>
                  <Text style={styles.phoneText}>+91 98765 43210</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#64748b" />
              </TouchableOpacity>
              <View style={styles.cardDivider} />
              <TouchableOpacity style={styles.addNewAddressBtn} activeOpacity={0.7}>
                <MaterialIcons name="add" size={18} color="#0f172a" style={{ marginRight: 6 }} />
                <Text style={styles.addNewAddressText}>Add New Address</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Delivery Options</Text>
            <View style={styles.cardBox}>
              <TouchableOpacity 
                style={styles.deliveryOptionRow}
                activeOpacity={0.8}
                onPress={() => setSelectedDelivery('standard')}
              >
                <MaterialIcons 
                  name={selectedDelivery === 'standard' ? "radio-button-checked" : "radio-button-unchecked"} 
                  size={20} 
                  color={selectedDelivery === 'standard' ? "#0f172a" : "#64748b"} 
                />
                <MaterialIcons name="local-shipping" size={20} color="#16a34a" style={{ marginLeft: 10, marginRight: 8 }} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.deliveryOptionTitle}>Standard Delivery</Text>
                  <Text style={styles.deliveryOptionSub}>3-5 business days</Text>
                </View>
                <Text style={styles.freeText}>FREE</Text>
              </TouchableOpacity>

              <View style={styles.cardDivider} />

              <TouchableOpacity 
                style={styles.deliveryOptionRow}
                activeOpacity={0.8}
                onPress={() => setSelectedDelivery('express')}
              >
                <MaterialIcons 
                  name={selectedDelivery === 'express' ? "radio-button-checked" : "radio-button-unchecked"} 
                  size={20} 
                  color={selectedDelivery === 'express' ? "#0f172a" : "#64748b"} 
                />
                <MaterialIcons name="flash-on" size={20} color="#ea580c" style={{ marginLeft: 10, marginRight: 8 }} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.deliveryOptionTitle}>Express Delivery</Text>
                  <Text style={styles.deliveryOptionSub}>1-2 business days</Text>
                </View>
                <Text style={styles.premiumDeliveryPrice}>₹99</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* STEP 2: PAYMENT METHODS */}
        {currentStep === 2 && (
          <View>
            <Text style={styles.sectionTitle}>Select Payment Method</Text>
            <View style={styles.cardBox}>
              {/* UPI */}
              <TouchableOpacity 
                style={styles.paymentMethodRow}
                activeOpacity={0.8}
                onPress={() => setSelectedPayment('upi')}
              >
                <MaterialIcons 
                  name={selectedPayment === 'upi' ? "radio-button-checked" : "radio-button-unchecked"} 
                  size={20} 
                  color={selectedPayment === 'upi' ? "#0f172a" : "#64748b"} 
                />
                <MaterialIcons name="payment" size={20} color="#0f172a" style={{ marginLeft: 10, marginRight: 8 }} />
                <Text style={styles.paymentMethodName}>UPI</Text>
                <Text style={styles.paymentMethodAction}>Pay by any UPI app</Text>
              </TouchableOpacity>
              {selectedPayment === 'upi' && (
                <View style={styles.paymentMethodDetails}>
                  <Text style={styles.inputLabel}>Enter UPI ID</Text>
                  <TextInput 
                    style={styles.textInput} 
                    placeholder="e.g. rohit@okhdfc" 
                    placeholderTextColor="#94a3b8"
                    value={upiId}
                    onChangeText={setUpiId}
                  />
                </View>
              )}

              <View style={styles.cardDivider} />

              {/* Credit/Debit Card */}
              <TouchableOpacity 
                style={styles.paymentMethodRow}
                activeOpacity={0.8}
                onPress={() => setSelectedPayment('card')}
              >
                <MaterialIcons 
                  name={selectedPayment === 'card' ? "radio-button-checked" : "radio-button-unchecked"} 
                  size={20} 
                  color={selectedPayment === 'card' ? "#0f172a" : "#64748b"} 
                />
                <MaterialIcons name="credit-card" size={20} color="#0f172a" style={{ marginLeft: 10, marginRight: 8 }} />
                <Text style={styles.paymentMethodName}>Credit / Debit Card</Text>
                <View style={styles.cardBrandsRow}>
                  <View style={styles.cardBrandBadge}><Text style={styles.cardBrandText}>VISA</Text></View>
                  <View style={[styles.cardBrandBadge, { marginLeft: 4 }]}><Text style={styles.cardBrandText}>MC</Text></View>
                </View>
              </TouchableOpacity>
              {selectedPayment === 'card' && (
                <View style={styles.paymentMethodDetails}>
                  <Text style={styles.inputLabel}>Card Number</Text>
                  <TextInput 
                    style={styles.textInput} 
                    placeholder="XXXX XXXX XXXX XXXX" 
                    placeholderTextColor="#94a3b8"
                    keyboardType="numeric"
                    value={cardNumber}
                    onChangeText={setCardNumber}
                  />
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                    <View style={{ width: '48%' }}>
                      <Text style={styles.inputLabel}>Expiry</Text>
                      <TextInput 
                        style={styles.textInput} 
                        placeholder="MM/YY" 
                        placeholderTextColor="#94a3b8"
                        value={cardExpiry}
                        onChangeText={setCardExpiry}
                      />
                    </View>
                    <View style={{ width: '48%' }}>
                      <Text style={styles.inputLabel}>CVV</Text>
                      <TextInput 
                        style={styles.textInput} 
                        placeholder="XXX" 
                        placeholderTextColor="#94a3b8"
                        keyboardType="numeric"
                        secureTextEntry
                        value={cardCvv}
                        onChangeText={setCardCvv}
                      />
                    </View>
                  </View>
                </View>
              )}

              <View style={styles.cardDivider} />

              {/* Net Banking */}
              <TouchableOpacity 
                style={styles.paymentMethodRow}
                activeOpacity={0.8}
                onPress={() => setSelectedPayment('netbanking')}
              >
                <MaterialIcons 
                  name={selectedPayment === 'netbanking' ? "radio-button-checked" : "radio-button-unchecked"} 
                  size={20} 
                  color={selectedPayment === 'netbanking' ? "#0f172a" : "#64748b"} 
                />
                <MaterialIcons name="account-balance" size={20} color="#0f172a" style={{ marginLeft: 10, marginRight: 8 }} />
                <Text style={styles.paymentMethodName}>Net Banking</Text>
                <Text style={styles.paymentMethodAction}>Select your bank</Text>
              </TouchableOpacity>

              <View style={styles.cardDivider} />

              {/* Wallets */}
              <TouchableOpacity 
                style={styles.paymentMethodRow}
                activeOpacity={0.8}
                onPress={() => setSelectedPayment('wallets')}
              >
                <MaterialIcons 
                  name={selectedPayment === 'wallets' ? "radio-button-checked" : "radio-button-unchecked"} 
                  size={20} 
                  color={selectedPayment === 'wallets' ? "#0f172a" : "#64748b"} 
                />
                <MaterialIcons name="account-balance-wallet" size={20} color="#0f172a" style={{ marginLeft: 10, marginRight: 8 }} />
                <Text style={styles.paymentMethodName}>Wallets</Text>
                <Text style={styles.paymentMethodAction}>Paytm, PhonePe & more</Text>
              </TouchableOpacity>

              <View style={styles.cardDivider} />

              {/* Cash on Delivery */}
              <TouchableOpacity 
                style={styles.paymentMethodRow}
                activeOpacity={0.8}
                onPress={() => setSelectedPayment('cod')}
              >
                <MaterialIcons 
                  name={selectedPayment === 'cod' ? "radio-button-checked" : "radio-button-unchecked"} 
                  size={20} 
                  color={selectedPayment === 'cod' ? "#0f172a" : "#64748b"} 
                />
                <MaterialIcons name="monetization-on" size={20} color="#0f172a" style={{ marginLeft: 10, marginRight: 8 }} />
                <Text style={styles.paymentMethodName}>Cash on Delivery</Text>
                <Text style={styles.paymentMethodAction}>Pay when you receive</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* STEP 3: REVIEW ORDER */}
        {currentStep === 3 && (
          <View>
            <Text style={styles.sectionTitle}>Order Items</Text>
            <View style={styles.cardBox}>
              {cartPreviewItems.map((item, idx) => (
                <View key={item.id}>
                  <View style={styles.reviewItemRow}>
                    <Image source={{ uri: item.image }} style={styles.reviewItemImage} />
                    <View style={styles.reviewItemInfo}>
                      <Text style={styles.reviewItemBrand}>{item.brand}</Text>
                      <Text style={styles.reviewItemName} numberOfLines={1}>{item.name}</Text>
                      <Text style={styles.reviewItemVariant}>Size: {item.size} • Color: {item.color}</Text>
                      <Text style={styles.reviewItemPrice}>₹{item.price.toLocaleString('en-IN')}</Text>
                    </View>
                  </View>
                  {idx < cartPreviewItems.length - 1 && <View style={styles.cardDivider} />}
                </View>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Selected Shipping Address</Text>
            <View style={styles.cardBox}>
              <Text style={styles.addressName}>Rohit Sharma</Text>
              <Text style={[styles.addressText, { marginTop: 4 }]}>
                123, Green Park Society, Sector 45, Gurugram, Haryana - 122003
              </Text>
              <Text style={[styles.phoneText, { marginTop: 2 }]}>Phone: +91 98765 43210</Text>
            </View>

            <Text style={styles.sectionTitle}>Selected Payment Method</Text>
            <View style={styles.cardBox}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons name="check-circle" size={16} color="#16a34a" style={{ marginRight: 6 }} />
                <Text style={{ fontSize: 13, fontWeight: '700', color: '#0f172a', textTransform: 'uppercase' }}>
                  {selectedPayment} Payment Option Mode
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* STEP 4: ORDER SUCCESS */}
        {currentStep === 4 && (
          <View style={styles.successWrapper}>
            <View style={styles.successIconOuter}>
              <View style={styles.successIconInner}>
                <MaterialIcons name="check" size={54} color="#ffffff" />
              </View>
            </View>
            
            <Text style={styles.successTitle}>Order Placed Successfully!</Text>
            <Text style={styles.successSub}>Thank you for shopping with us. Your order has been placed and is being processed.</Text>
            
            <View style={styles.orderIdCard}>
              <Text style={styles.orderIdLabel}>Order ID</Text>
              <Text style={styles.orderIdVal}>ORD-908354089</Text>
            </View>

            <Text style={styles.deliveryEstimateText}>
              Estimated Delivery: <Text style={{ fontWeight: '700', color: '#0f172a' }}>3-5 Business Days</Text>
            </Text>

            <View style={styles.successActions}>
              <TouchableOpacity style={styles.successBtnPrimary} onPress={handleGoOrders}>
                <MaterialIcons name="local-mall" size={18} color="#ffffff" style={{ marginRight: 6 }} />
                <Text style={styles.successBtnPrimaryText}>Track Order</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.successBtnSecondary} onPress={handleGoHome}>
                <Text style={styles.successBtnSecondaryText}>Continue Shopping</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Pricing Summary (only visible during setup phases: steps 1, 2, and 3) */}
        {currentStep < 4 && (
          <View>
            <Text style={styles.sectionTitle}>Price Details</Text>
            <View style={styles.priceDetailsCard}>
              <View style={styles.priceRowItem}>
                <Text style={styles.priceLabel}>Price (3 items)</Text>
                <Text style={styles.priceValue}>₹{subtotal.toLocaleString('en-IN')}</Text>
              </View>

              <View style={styles.priceRowItem}>
                <Text style={styles.priceLabel}>Discount</Text>
                <Text style={[styles.priceValue, { color: '#16a34a' }]}>- ₹{discount.toLocaleString('en-IN')}</Text>
              </View>

              <View style={styles.priceRowItem}>
                <Text style={styles.priceLabel}>Delivery Charges</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.crossedDelivery}>₹99</Text>
                  <Text style={[styles.priceValue, { color: '#16a34a', marginLeft: 6 }]}>
                    {deliveryCharges === 0 ? 'FREE' : `+ ₹${deliveryCharges}`}
                  </Text>
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

            {/* Trust Badges */}
            <View style={styles.trustRow}>
              <View style={styles.trustItem}>
                <MaterialIcons name="verified-user" size={18} color="#0f172a" />
                <View style={{ marginLeft: 8 }}>
                  <Text style={styles.trustTitle}>100% Original</Text>
                  <Text style={styles.trustSub}>Genuine Products</Text>
                </View>
              </View>
              <View style={styles.trustItem}>
                <MaterialIcons name="cached" size={18} color="#0f172a" />
                <View style={{ marginLeft: 8 }}>
                  <Text style={styles.trustTitle}>Easy Returns</Text>
                  <Text style={styles.trustSub}>Within 7 days</Text>
                </View>
              </View>
              <View style={styles.trustItem}>
                <MaterialIcons name="security" size={18} color="#0f172a" />
                <View style={{ marginLeft: 8 }}>
                  <Text style={styles.trustTitle}>Secure Payment</Text>
                  <Text style={styles.trustSub}>100% Protected</Text>
                </View>
              </View>
              <View style={styles.trustItem}>
                <MaterialIcons name="local-shipping" size={18} color="#0f172a" />
                <View style={{ marginLeft: 8 }}>
                  <Text style={styles.trustTitle}>Free Delivery</Text>
                  <Text style={styles.trustSub}>On all orders</Text>
                </View>
              </View>
            </View>
          </View>
        )}

      </ScrollView>

      {/* Bottom Sticky Payment Bar (only visible during setup phases: steps 1, 2, and 3) */}
      {currentStep < 4 && (
        <View style={styles.bottomStickyBar}>
          <View style={styles.bottomPriceInfo}>
            <Text style={styles.bottomPriceVal}>₹{totalAmount.toLocaleString('en-IN')}</Text>
            <TouchableOpacity style={styles.viewDetailsRow}>
              <Text style={styles.viewDetailsText}>View Details</Text>
              <MaterialIcons name="keyboard-arrow-down" size={14} color="#0f172a" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.proceedButton} activeOpacity={0.8} onPress={nextStep}>
            <Text style={styles.proceedButtonText}>
              {currentStep === 1 && 'Continue to Payment'}
              {currentStep === 2 && 'Continue to Review'}
              {currentStep === 3 && 'Place Order'}
            </Text>
            <MaterialIcons name="arrow-forward" size={16} color="#ffffff" style={{ marginLeft: 6 }} />
          </TouchableOpacity>
        </View>
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
  stepperBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    backgroundColor: '#ffffff',
  },
  stepItem: {
    alignItems: 'center',
    width: 60,
  },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#cbd5e1',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCircleActive: {
    backgroundColor: '#0f172a',
    borderColor: '#0f172a',
  },
  stepCircleCompleted: {
    backgroundColor: '#16a34a',
    borderColor: '#16a34a',
  },
  stepNumber: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94a3b8',
  },
  stepNumberActive: {
    color: '#ffffff',
  },
  stepLabel: {
    fontSize: 9,
    color: '#94a3b8',
    marginTop: 4,
    textAlign: 'center',
    fontWeight: '500',
  },
  stepLabelActive: {
    color: '#0f172a',
    fontWeight: '700',
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#e2e8f0',
    marginBottom: 14,
  },
  stepLineActive: {
    backgroundColor: '#16a34a',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 110,
  },
  freeDeliveryBanner: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    backgroundColor: '#f8fafc',
    padding: 14,
    marginBottom: 20,
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
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 12,
    marginTop: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cardBox: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  addressMainRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationPinBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f0fdf4',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  addressInfo: {
    flex: 1,
    marginLeft: 12,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0f172a',
  },
  homeBadge: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 6,
  },
  homeBadgeText: {
    color: '#16a34a',
    fontSize: 8,
    fontWeight: '800',
  },
  addressText: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 6,
    lineHeight: 16,
  },
  phoneText: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 4,
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginVertical: 14,
  },
  addNewAddressBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addNewAddressText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0f172a',
  },
  deliveryOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  deliveryOptionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0f172a',
  },
  deliveryOptionSub: {
    fontSize: 10,
    color: '#64748b',
    marginTop: 2,
  },
  freeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#16a34a',
  },
  premiumDeliveryPrice: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0f172a',
  },
  paymentMethodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  paymentMethodName: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0f172a',
    flex: 1,
  },
  paymentMethodAction: {
    fontSize: 10,
    color: '#94a3b8',
    marginRight: 6,
  },
  cardBrandsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 6,
  },
  cardBrandBadge: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
    backgroundColor: '#f8fafc',
  },
  cardBrandText: {
    fontSize: 7,
    fontWeight: '800',
    color: '#64748b',
  },
  paymentMethodDetails: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  inputLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748b',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    color: '#0f172a',
    fontSize: 13,
  },
  reviewItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewItemImage: {
    width: 50,
    height: 58,
    borderRadius: 8,
    backgroundColor: '#f8fafc',
  },
  reviewItemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  reviewItemBrand: {
    fontSize: 9,
    fontWeight: '700',
    color: '#94a3b8',
    textTransform: 'uppercase',
  },
  reviewItemName: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0f172a',
    marginTop: 1,
  },
  reviewItemVariant: {
    fontSize: 10,
    color: '#64748b',
    marginTop: 2,
  },
  reviewItemPrice: {
    fontSize: 12,
    fontWeight: '900',
    color: '#0f172a',
    marginTop: 4,
  },
  priceDetailsCard: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 24,
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
  trustRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 20,
    justifyContent: 'space-between',
  },
  trustItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  trustTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0f172a',
  },
  trustSub: {
    fontSize: 9,
    color: '#94a3b8',
    marginTop: 1,
  },
  successScrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  successWrapper: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  successIconOuter: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#dcfce7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  successIconInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#16a34a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0f172a',
    textAlign: 'center',
  },
  successSub: {
    fontSize: 13,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 20,
  },
  orderIdCard: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 24,
    alignItems: 'center',
  },
  orderIdLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94a3b8',
    textTransform: 'uppercase',
  },
  orderIdVal: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0f172a',
    marginTop: 2,
  },
  deliveryEstimateText: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 16,
  },
  successActions: {
    width: '100%',
    marginTop: 34,
  },
  successBtnPrimary: {
    height: 48,
    borderRadius: 12,
    backgroundColor: '#0f172a',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  successBtnPrimaryText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
  },
  successBtnSecondary: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#cbd5e1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successBtnSecondaryText: {
    color: '#0f172a',
    fontSize: 14,
    fontWeight: '800',
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
});
