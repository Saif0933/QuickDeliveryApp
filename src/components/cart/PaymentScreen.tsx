
import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // You can use other icon sets too

import { useNavigation } from '@react-navigation/native';
import ConfirmOrderScreen from './ConfirmOrderScreen';

const PaymentScreen = () => {
  const navigation = useNavigation<any>();
  const [selectedPayment, setSelectedPayment] = useState<string | null>('COD');
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const renderPaymentOption = (id: string, iconName: string, label: string, subtitle: string | null = null, discount: string | null = null, cashback: string | null = null, isSelected: boolean = selectedPayment === id, IconComponent: any = Icon) => (
    <View style={styles.paymentOption}>
      {/* Only the header row is tappable — fixes event bubbling with Place Order button */}
      <TouchableOpacity
        style={styles.paymentOptionHeader}
        onPress={() => setSelectedPayment(isSelected ? null : id)}
        activeOpacity={0.7}
      >
        <View style={styles.paymentOptionLabel}>
          <IconComponent name={iconName} size={24} color="#555" style={styles.paymentIcon} />
          <Text style={styles.paymentLabelText}>{label}</Text>
        </View>
        <Icon name={isSelected ? 'chevron-up' : 'chevron-down'} size={24} color="#555" />
      </TouchableOpacity>

      {isSelected && (
        <View style={styles.paymentOptionDetails}>
          {subtitle && <Text style={styles.paymentSubtitle}>{subtitle}</Text>}
          {discount && <Text style={styles.discountText}>{discount}</Text>}
          {cashback && <Text style={styles.cashbackText}>{cashback}</Text>}

          {id === 'COD' && (
            <View style={styles.codDetails}>
              <Text style={styles.codText}>
                Due to handling costs, a nominal fee of ₹10 will be charged for orders placed using this option. Avoid this fee by paying online now.
              </Text>
              <TouchableOpacity
                style={styles.placeOrderButton}
                onPress={() => navigation.navigate('OrderPlacedScreen')}
                activeOpacity={0.8}
              >
                <Text style={styles.placeOrderText}>Place Order</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Status Bar Section (Simulated) */}
        <View style={styles.statusBar}>
          <Text style={styles.statusBarText}>11:59</Text>
          <View style={styles.statusBarIcons}>
            <EntypoIcon name="signal" size={16} color="black" />
            <Text style={styles.statusBarText}> VoLTE </Text>
            <EntypoIcon name="battery" size={16} color="black" />
          </View>
        </View>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTitleContainer}>
            <TouchableOpacity>
              <AntIcon name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
            <View>
              <Text style={styles.stepText}>Step 3 of 3</Text>
              <Text style={styles.headerTitle}>Payments</Text>
            </View>
          </View>
          <View style={styles.secureContainer}>
            <Icon name="lock-outline" size={16} color="#555" />
            <Text style={styles.secureText}>100% Secure</Text>
          </View>
        </View>

        {/* Total Amount */}
        <View style={styles.totalAmountContainer}>
          <Text style={styles.totalAmountLabel}>Total Amount <EntypoIcon name="chevron-small-down" size={16} color="#1A0DAB" /></Text>
          <Text style={styles.totalAmountValue}>₹1,355</Text>
        </View>

        {/* Discount Section */}
        <View style={styles.discountSection}>
          <Text style={styles.discountTitle}>10% instant discount</Text>
          <Text style={styles.discountSubtitle}>Claim now with payment offers</Text>
          <View style={styles.offerIcons}>
            <View style={styles.offerIconContainer}>
               <Text style={styles.offerIconText}>%</Text>
            </View>
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png' }} style={styles.visaIcon} />
            <Text style={styles.moreOffers}>+3</Text>
          </View>
        </View>

        {/* Payment Options */}
        {renderPaymentOption('UPI', 'bank-transfer', 'UPI', 'Pay by any UPI app', 'Save upto ₹35 • 14 offers available')}
        {renderPaymentOption('CARD', 'credit-card-outline', 'Credit / Debit / ATM Card', 'Add and secure cards as per RBI guidelines', 'Get upto 5% cashback • 2 offers available')}
        {renderPaymentOption('EMI', 'calendar-clock', 'EMI', 'Credit Card EMI')}
        {renderPaymentOption('COD', 'cash-register', 'Cash on Delivery', null, null, null, selectedPayment === 'COD', Icon)}

        {/* Flipkart Gift Card */}
        <TouchableOpacity style={styles.giftCardContainer}>
          <Icon name="gift-outline" size={24} color="#555" />
          <Text style={styles.giftCardText}>Have a Gift Card?</Text>
          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>35 Crore happy customers and counting!</Text>
          <AntIcon name="smileo" size={32} color="#888" style={styles.smileyIcon} />
        </View>
      </ScrollView>

      {/* --- CONFIRM ORDER POPUP --- */}
      <ConfirmOrderScreen 
        visible={isConfirmVisible} 
        onClose={() => setIsConfirmVisible(false)} 
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 5,
    paddingBottom: 5,
  },
  statusBarText: {
    fontSize: 12,
    color: 'black',
  },
  statusBarIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepText: {
    fontSize: 12,
    color: '#555',
    marginLeft: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  secureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  secureText: {
    fontSize: 12,
    marginLeft: 5,
    color: '#555',
  },
  totalAmountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#F8F9FD',
  },
  totalAmountLabel: {
    fontSize: 16,
    color: '#1A0DAB',
  },
  totalAmountValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A0DAB',
  },
  discountSection: {
    backgroundColor: '#E7F9EE',
    margin: 15,
    padding: 15,
    borderRadius: 8,
  },
  discountTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  discountSubtitle: {
    fontSize: 14,
    color: '#2E7D32',
    marginTop: 5,
  },
  offerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  offerIconContainer: {
    backgroundColor: '#2E7D32',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  offerIconText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  visaIcon: {
    width: 40,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },
  moreOffers: {
    fontSize: 14,
    color: '#555',
  },
  paymentOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  paymentOptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentOptionLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentIcon: {
    marginRight: 15,
  },
  paymentLabelText: {
    fontSize: 16,
    fontWeight: '500',
  },
  paymentOptionDetails: {
    marginTop: 10,
    marginLeft: 39, // Aligns with the label text
  },
  paymentSubtitle: {
    fontSize: 14,
    color: '#555',
  },
  discountText: {
    fontSize: 14,
    color: '#2E7D32',
    marginTop: 5,
  },
  cashbackText: {
    fontSize: 14,
    color: '#E65100',
    marginTop: 5,
  },
  codDetails: {
    marginTop: 15,
    backgroundColor: '#F9F9F9',
    padding: 15,
    borderRadius: 8,
  },
  codText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  placeOrderButton: {
    backgroundColor: '#FBBC05',
    paddingVertical: 12,
    borderRadius: 4,
    marginTop: 15,
    alignItems: 'center',
  },
  placeOrderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  giftCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginTop: 10,
  },
  giftCardText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 15,
  },
  addText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A0DAB',
  },
  footer: {
    marginTop: 40,
    marginBottom: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  smileyIcon: {
    marginTop: 15,
  },
});

export default PaymentScreen;