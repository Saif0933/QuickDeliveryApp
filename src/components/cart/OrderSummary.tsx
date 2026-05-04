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

const { width } = Dimensions.get('window');

const OrderSummary = () => {
  const navigation = useNavigation<any>();
  // State for quantity dropdown
  const [quantity, setQuantity] = useState(1);
  // State for selected donation amount
  const [donationAmount, setDonationAmount] = useState<number | null>(null);

  // --- Header Section ---
  const Header = () => (
    <View style={styles.header}>
      <TouchableOpacity style={styles.headerBack} onPress={() => navigation.goBack()}>
        <Text style={{ fontSize: 24, color: '#333' }}>←</Text>
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Order Summary</Text>
    </View>
  );

  // --- Stepper Section ---
  const Stepper = () => (
    <View style={styles.stepperContainer}>
      <View style={styles.stepperWrapper}>
        <View style={styles.step}>
          <View style={[styles.stepCircle, styles.stepCircleCompleted]}>
            <Text style={{ fontSize: 14, color: '#fff' }}>✓</Text>
          </View>
          <Text style={[styles.stepLabel, styles.stepLabelCompleted]}>Address</Text>
        </View>
        <View style={[styles.stepLine, styles.stepLineCompleted]} />

        <View style={styles.step}>
          <View style={[styles.stepCircle, styles.stepCircleActive]}>
            <Text style={{ fontSize: 14, color: '#fff' }}>2</Text>
          </View>
          <Text style={[styles.stepLabel, styles.stepLabelActive]}>Order Summary</Text>
        </View>
        <View style={styles.stepLine} />

        <View style={styles.step}>
          <View style={styles.stepCircle}>
            <Text style={{ fontSize: 14, color: '#999' }}>3</Text>
          </View>
          <Text style={styles.stepLabel}>Payment</Text>
        </View>
      </View>
    </View>
  );

  // --- Deliver To Section ---
  const DeliverTo = () => (
    <View style={styles.deliverToContainer}>
      <View style={styles.deliverToHeader}>
        <Text style={styles.sectionTitle}>Deliver to:</Text>
        <TouchableOpacity style={styles.changeButton}>
          <Text style={styles.changeButtonText}>Change</Text>
        </TouchableOpacity>
      </View>
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
  );

  // --- Product Item Section ---
  const ProductItem = () => (
    <View style={styles.productContainer}>
      <View style={styles.productTop}>
        <Image 
          source={{ uri: 'https://imgs.search.brave.com/Rc3Gc0awy6vo0KcdhFF2Vm-cin9V0itf7kg_VaHB3ZA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2E4Lzkx/LzllL2E4OTE5ZThj/YWU1NTZhMjQ2NGY2/ODY1NjQ3NTM5OGQz/LmpwZw' }} 
          style={styles.productImage} 
        />
        <View style={styles.productDetails}>
          <Text style={styles.productName} numberOfLines={1}>Raymond Men Self Design ...</Text>
          <Text style={styles.productSize}>Size: 39, Size: 39</Text>
          
          <View style={styles.ratingRow}>
            <View style={styles.starGroup}>
              {[1, 2, 3, 4].map(star => <Text key={star} style={{color: '#388e3c', fontSize: 14}}>★</Text>)}
              <Text style={{color: '#c8e6c9', fontSize: 14}}>★</Text>
            </View>
            <Text style={styles.ratingValue}>4.3</Text>
            <Text style={styles.ratingCount}>· (225)</Text>
            <View style={{flexDirection:'row', alignItems:'center', marginLeft: 8}}>
                <Text style={{color: '#2874f0', fontSize: 16}}>🔰</Text>
                <Text style={styles.assuredText}>Assured</Text>
            </View>
          </View>
          
          <View style={styles.priceRow}>
            <Text style={styles.discountText}>↓44%</Text>
            <Text style={styles.mrpText}>₹2,399</Text>
            <Text style={styles.finalPriceText}>₹1,338</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.qtyRow}>
        <TouchableOpacity style={styles.qtySelector}>
          <Text style={styles.qtyLabel}>Qty: {quantity}</Text>
          <Text style={{fontSize: 10, color: '#333'}}>▼</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.deliveryDate}>Delivery by Apr 3, Fri</Text>
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
            <Text style={styles.priceLabel}>Price (1 item)</Text>
            <Text style={styles.priceLabel}>₹2,399</Text>
          </View>
          <View style={styles.priceRowItem}>
            <Text style={styles.discountLabel}>Discount</Text>
            <Text style={styles.discountLabel}>- ₹1,061</Text>
          </View>
          <View style={styles.priceRowItem}>
            <Text style={styles.priceLabel}>Delivery Charges</Text>
            <Text style={[styles.discountLabel, { textTransform: 'uppercase' }]}>FREE</Text>
          </View>
          <View style={[styles.priceRowItem, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalLabel}>₹1,338</Text>
          </View>
        </View>
        

      </ScrollView>
      
      {/* Footer */}
      <View style={styles.footerContainer}>
        <View style={styles.footerPriceDetails}>
            <Text style={styles.footerMrp}>₹2,399</Text>
            <Text style={styles.footerFinalPrice}>₹1,338</Text>
        </View>
        <TouchableOpacity 
          style={styles.continueButton}
          onPress={() => navigation.navigate('PaymentScreen')}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#f1f3f6' },
  contentContainer: { flex: 1 },
  separator: { height: 10, backgroundColor: '#f1f3f6' },
  header: {
    height: 56,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    elevation: 3,
  },
  headerBack: { paddingRight: 16 },
  headerTitle: { fontSize: 18, fontWeight: '500', color: '#212121' },
  stepperContainer: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  stepperWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: width * 0.1,
  },
  step: { alignItems: 'center', width: width * 0.22 },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircleActive: {
    backgroundColor: '#2874f0',
    borderColor: '#2874f0',
  },
  stepCircleCompleted: {
    backgroundColor: '#f1f3f6',
    borderColor: '#e0e0e0',
  },
  stepLabel: { fontSize: 10, color: '#999', marginTop: 4, textAlign: 'center' },
  stepLabelActive: { color: '#212121', fontWeight: '500' },
  stepLabelCompleted: { color: '#878787' },
  stepLine: {
    height: 1,
    flex: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 8,
    marginBottom: 16,
  },
  stepLineCompleted: { backgroundColor: '#878787' },
  deliverToContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  deliverToHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '500', color: '#212121' },
  changeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#d6d6d6',
    borderRadius: 2,
  },
  changeButtonText: { fontSize: 14, color: '#2874f0', fontWeight: '500' },
  addressNameWrapper: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  deliverToName: { fontSize: 16, fontWeight: 'bold', color: '#212121', marginRight: 8 },
  homeTag: { backgroundColor: '#f0f0f0', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 2 },
  homeTagText: { fontSize: 10, color: '#878787', fontWeight: 'bold' },
  deliverToAddress: { fontSize: 14, color: '#333', lineHeight: 20, marginBottom: 4 },
  deliverToPhone: { fontSize: 14, color: '#333', fontWeight: '500' },
  productContainer: { backgroundColor: '#fff', padding: 16 },
  productTop: { flexDirection: 'row' },
  productImage: { width: 64, height: 64, marginRight: 16, resizeMode: 'cover' },
  productDetails: { flex: 1 },
  productName: { fontSize: 16, color: '#212121', marginBottom: 2 },
  productSize: { fontSize: 12, color: '#878787', marginBottom: 4 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  starGroup: { flexDirection: 'row', marginRight: 4 },
  ratingValue: { fontSize: 12, color: '#388e3c', fontWeight: 'bold' },
  ratingCount: { fontSize: 12, color: '#878787', marginLeft: 2 },
  assuredText: { fontSize: 10, color: '#878787', marginLeft: 2, fontStyle: 'italic' },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 4 },
  discountText: { fontSize: 16, color: '#388e3c', fontWeight: 'bold', marginRight: 8 },
  mrpText: { fontSize: 14, color: '#878787', textDecorationLine: 'line-through', marginRight: 8 },
  finalPriceText: { fontSize: 18, color: '#212121', fontWeight: 'bold' },
  qtyRow: { marginTop: 12 },
  qtySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 2,
    width: 60,
  },
  qtyLabel: { fontSize: 14, color: '#212121', fontWeight: '500' },
  deliveryDate: { marginTop: 16, fontSize: 14, color: '#212121', fontWeight: '500' },
  priceDetailsContainer: { backgroundColor: '#fff', padding: 16 },
  priceRowItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12 },
  priceLabel: { fontSize: 15, color: '#212121' },
  discountLabel: { fontSize: 15, color: '#388e3c' },
  totalRow: { borderTopWidth: 1, borderTopColor: '#f0f0f0', marginTop: 10, paddingTop: 16 },
  totalLabel: { fontSize: 18, fontWeight: 'bold', color: '#212121' },
  footerContainer: {
    height: 72,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    elevation: 8,
  },
  footerPriceDetails: {
    flex: 1,
    justifyContent: 'center',
    marginRight: 16,
  },
  footerMrp: {
    fontSize: 12,
    color: '#878787',
    textDecorationLine: 'line-through',
  },
  footerFinalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
  },
  continueButton: {
    width: 160,
    height: 44,
    backgroundColor: '#000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default OrderSummary;