import { useNavigation } from '@react-navigation/native';
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../../theme/color';

const { width } = Dimensions.get('window');

const OrderSummary = ({ route }: any) => {
  const navigation = useNavigation<any>();
  const { product } = route?.params || {};

  // If no product is passed, use the hardcoded default (fallback)
  const displayProduct = product || {
    title: 'Raymond Men Self Design ...',
    price: '₹1,338',
    originalPrice: '₹2,399',
    discount: '44% OFF',
    image: 'https://imgs.search.brave.com/Rc3Gc0awy6vo0KcdhFF2Vm-cin9V0itf7kg_VaHB3ZA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2E4Lzkx/LzllL2E4OTE5ZThj/YWU1NTZhMjQ2NGY2/ODY1NjQ3NTM5OGQz/LmpwZw',
    quantity: 1,
    brand: 'Raymond',
    rating: '4.3',
    reviews: '225'
  };

  // State for quantity (initialized from passed product or default)
  const [quantity, setQuantity] = useState(displayProduct.quantity);

  // Parse prices for calculation
  const getPriceValue = (priceStr: string) => parseInt(priceStr.replace(/[^0-9]/g, '')) || 0;
  const unitPrice = getPriceValue(displayProduct.price);
  const unitMrp = getPriceValue(displayProduct.originalPrice);
  
  const totalPrice = unitPrice * quantity;
  const totalMrp = unitMrp * quantity;
  const totalDiscount = totalMrp - totalPrice;

  // --- Header Section ---
  const Header = () => (
    <View style={styles.header}>
      <TouchableOpacity style={styles.headerBack} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Order Summary</Text>
    </View>
  );

  // --- Deliver To Section ---
  const DeliverTo = () => (
    <View style={styles.deliverToCard}>
      <View style={styles.deliverToHeader}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MaterialIcons name="location-on" size={20} color={COLORS.primary} style={{marginRight: 4}} />
          <Text style={styles.sectionTitle}>Deliver to:</Text>
        </View>
        <TouchableOpacity style={styles.changeButton}>
          <Text style={styles.changeButtonText}>Change</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.addressInfoWrapper}>
        <View style={styles.addressNameWrapper}>
          <Text style={styles.deliverToName}>Md Saif</Text>
          <View style={styles.homeTag}>
            <Text style={styles.homeTagText}>HOME</Text>
          </View>
        </View>
        <Text style={styles.deliverToAddress}>
          Harmu housing colony basant vihar , Delatoli, Basant Vihar Road Number 1/B, Harmu Housing Colony , Ranchi 834002
        </Text>
        <Text style={styles.deliverToPhone}>9334804356</Text>
      </View>
    </View>
  );

  // --- Product Item Section ---
  const ProductItem = () => (
    <View style={styles.productCard}>
      <View style={styles.productTop}>
        <Image 
          source={{ uri: displayProduct.image }} 
          style={styles.productImage} 
        />
        <View style={styles.productDetails}>
          <Text style={styles.productBrand}>{displayProduct.brand}</Text>
          <Text style={styles.productName} numberOfLines={2}>{displayProduct.title}</Text>
          
          <View style={styles.ratingRow}>
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingValue}>{displayProduct.rating}</Text>
              <Ionicons name="star" size={10} color="#fff" style={{marginLeft: 2}} />
            </View>
            <Text style={styles.ratingCount}>({displayProduct.reviews})</Text>
            <View style={styles.assuredBadge}>
                <Ionicons name="checkmark-circle" size={12} color="#fff" />
                <Text style={styles.assuredText}>Assured</Text>
            </View>
          </View>
          
          <View style={styles.priceRow}>
            <Text style={styles.finalPriceText}>{displayProduct.price}</Text>
            <Text style={styles.mrpText}>{displayProduct.originalPrice}</Text>
            <Text style={styles.discountText}>{displayProduct.discount}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.qtyAndDeliveryRow}>
        <TouchableOpacity style={styles.qtySelector}>
          <Text style={styles.qtyLabel}>Qty: {quantity}</Text>
          <Ionicons name="chevron-down" size={14} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.deliveryDate}>Delivery by Apr 3, Fri</Text>
      </View>
    </View>
  );

  // --- Main Render ---
  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Header />
      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <DeliverTo />
        <View style={styles.separator} />
        <ProductItem />
        <View style={styles.separator} />
        
        {/* Price Details */}
        <View style={styles.priceDetailsContainer}>
          <View style={[styles.priceRowItem, { borderTopWidth: 0 }]}>
            <Text style={styles.priceLabel}>Price ({quantity} item{quantity > 1 ? 's' : ''})</Text>
            <Text style={styles.priceLabel}>₹{totalMrp.toLocaleString()}</Text>
          </View>
          <View style={styles.priceRowItem}>
            <Text style={styles.discountLabel}>Discount</Text>
            <Text style={styles.discountLabel}>- ₹{totalDiscount.toLocaleString()}</Text>
          </View>
          <View style={styles.priceRowItem}>
            <Text style={styles.priceLabel}>Delivery Charges</Text>
            <Text style={[styles.discountLabel, { textTransform: 'uppercase' }]}>FREE</Text>
          </View>
          <View style={[styles.priceRowItem, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalLabel}>₹{totalPrice.toLocaleString()}</Text>
          </View>
        </View>
        
      </ScrollView>
      
      {/* Footer */}
      <View style={styles.footerContainer}>
        <View style={styles.footerPriceDetails}>
            <Text style={styles.footerFinalPrice}>₹{totalPrice.toLocaleString()}</Text>
            <TouchableOpacity onPress={() => {/* Show price detail modal or scroll */}}>
              <Text style={styles.viewDetailsText}>View Details</Text>
            </TouchableOpacity>
        </View>
        <TouchableOpacity 
          style={styles.continueButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('PaymentScreen', {
            orderData: {
              product: displayProduct,
              totalAmount: totalPrice,
              quantity: quantity
            }
          })}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: COLORS.white },
  contentContainer: { flex: 1 },
  separator: { 
    height: 8, 
    backgroundColor: '#f8f9fa', 
    borderTopWidth: 1, 
    borderBottomWidth: 1, 
    borderColor: '#f0f0f0' 
  },
  header: {
    height: 60,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerBack: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, marginLeft: 12 },
  deliverToCard: {
    backgroundColor: COLORS.white,
    padding: 16,
  },
  deliverToHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary },
  changeButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 4,
  },
  changeButtonText: { fontSize: 13, color: COLORS.primary, fontWeight: '600' },
  addressInfoWrapper: { },
  addressNameWrapper: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  deliverToName: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary, marginRight: 8 },
  homeTag: { backgroundColor: COLORS.SOFT_BLUE, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  homeTagText: { fontSize: 10, color: COLORS.primary, fontWeight: '800' },
  deliverToAddress: { fontSize: 14, color: COLORS.textSecondary, lineHeight: 20, marginBottom: 8 },
  deliverToPhone: { fontSize: 14, color: COLORS.textPrimary, fontWeight: '600' },
  productCard: { 
    backgroundColor: COLORS.white, 
    padding: 16,
  },
  productTop: { flexDirection: 'row' },
  productImage: { width: 90, height: 110, borderRadius: 4, marginRight: 16, backgroundColor: '#f9f9f9' },
  productDetails: { flex: 1 },
  productBrand: { fontSize: 12, color: COLORS.muted, fontWeight: '700', textTransform: 'uppercase', marginBottom: 2 },
  productName: { fontSize: 15, color: COLORS.textPrimary, fontWeight: '500', marginBottom: 8, lineHeight: 20 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  ratingBadge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#388e3c', 
    paddingHorizontal: 6, 
    paddingVertical: 2, 
    borderRadius: 4,
    marginRight: 6
  },
  ratingValue: { fontSize: 12, color: COLORS.white, fontWeight: '700' },
  ratingCount: { fontSize: 12, color: COLORS.muted, marginRight: 12 },
  assuredBadge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: COLORS.primary, 
    paddingHorizontal: 6, 
    paddingVertical: 2, 
    borderRadius: 4 
  },
  assuredText: { fontSize: 10, color: COLORS.white, fontWeight: '700', marginLeft: 2 },
  priceRow: { flexDirection: 'row', alignItems: 'center' },
  finalPriceText: { fontSize: 18, color: COLORS.textPrimary, fontWeight: '800', marginRight: 8 },
  mrpText: { fontSize: 13, color: COLORS.muted, textDecorationLine: 'line-through', marginRight: 8 },
  discountText: { fontSize: 13, color: '#388e3c', fontWeight: '700' },
  qtyAndDeliveryRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f5f5f5',
  },
  qtySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 6,
  },
  qtyLabel: { fontSize: 14, color: COLORS.textPrimary, fontWeight: '600', marginRight: 4 },
  deliveryDate: { fontSize: 13, color: COLORS.textPrimary, fontWeight: '500' },
  priceDetailsContainer: { 
    backgroundColor: COLORS.white, 
    padding: 16,
    paddingBottom: 30,
  },
  priceRowItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 },
  priceLabel: { fontSize: 14, color: COLORS.textSecondary },
  discountLabel: { fontSize: 14, color: '#388e3c', fontWeight: '600' },
  totalRow: { borderTopWidth: 1, borderTopColor: '#f5f5f5', marginTop: 8, paddingTop: 14 },
  totalLabel: { fontSize: 18, fontWeight: '800', color: COLORS.textPrimary },
  footerContainer: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  footerPriceDetails: {
    flex: 1,
  },
  footerFinalPrice: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  viewDetailsText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '600',
    marginTop: 2,
  },
  continueButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 8,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.white,
  },
});

export default OrderSummary;