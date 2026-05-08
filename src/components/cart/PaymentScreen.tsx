
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../theme/color';

import { useNavigation } from '@react-navigation/native';
import ConfirmOrderScreen from './ConfirmOrderScreen';

const PaymentScreen = () => {
  const navigation = useNavigation<any>();
  const [selectedPayment, setSelectedPayment] = useState<string | null>('COD');
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const renderPaymentOption = (id: string, iconName: string, label: string, subtitle: string | null = null, discount: string | null = null, cashback: string | null = null, isSelected: boolean = selectedPayment === id, IconComponent: any = MaterialCommunityIcons) => (
    <View style={[styles.paymentOption, isSelected && styles.paymentOptionSelected]}>
      <TouchableOpacity
        style={styles.paymentOptionHeader}
        onPress={() => setSelectedPayment(isSelected ? null : id)}
        activeOpacity={0.7}
      >
        <View style={styles.paymentOptionLabel}>
          <View style={[styles.iconWrapper, isSelected && styles.iconWrapperActive]}>
            <IconComponent name={iconName} size={22} color={isSelected ? COLORS.primary : COLORS.textSecondary} />
          </View>
          <View style={styles.labelTextWrapper}>
            <Text style={[styles.paymentLabelText, isSelected && styles.paymentLabelTextActive]}>{label}</Text>
            {subtitle && !isSelected && <Text style={styles.paymentSubtitleSmall}>{subtitle}</Text>}
          </View>
        </View>
        <Ionicons name="chevron-forward" size={18} color={COLORS.muted} style={{marginRight: 5}} />
      </TouchableOpacity>

      {isSelected && (
        <View style={styles.paymentOptionDetails}>
          <View style={{paddingLeft: 52}}>
            {subtitle && <Text style={styles.paymentSubtitle}>{subtitle}</Text>}
            {discount && <View style={styles.offerBadge}><Text style={styles.discountText}>{discount}</Text></View>}
            {cashback && <View style={styles.cashbackBadge}><Text style={styles.cashbackText}>{cashback}</Text></View>}

            <View style={styles.optionMessageContainer}>
               <Text style={styles.optionMessageText}>
                 {id === 'UPI' && "Pay directly from your bank account using any UPI app like PhonePe, GPay, or Paytm."}
                 {id === 'CARD' && "All major credit and debit cards are supported. Securely encrypted payments."}
                 {id === 'EMI' && "Easy monthly installments available on select bank cards with flexible tenures."}
                 {id === 'COD' && "Pay by Cash or QR code at the time of delivery. Safe and contactless."}
               </Text>
            </View>
          </View>

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
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Payment Options</Text>
          <View style={styles.secureBadge}>
            <MaterialIcons name="security" size={14} color={COLORS.muted} />
            <Text style={styles.secureText}>SECURE</Text>
          </View>
        </View>

        {/* Total Amount */}
        <View style={styles.totalAmountSection}>
          <Text style={styles.totalAmountLabel}>Amount to Pay</Text>
          <Text style={styles.totalAmountValue}>₹1,355</Text>
        </View>

        {/* Discount Section */}
        <View style={styles.discountBanner}>
          <View style={styles.discountInfo}>
            <MaterialCommunityIcons name="label-percent" size={24} color="#388e3c" />
            <View style={{marginLeft: 12}}>
              <Text style={styles.discountTitle}>10% Instant Discount</Text>
              <Text style={styles.discountSubtitle}>Applicable on major bank offers</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#388e3c" style={{marginRight: 5}} />
        </View>

        <View style={styles.sectionDivider} />

        {/* Payment Options */}
        {renderPaymentOption('UPI', 'bank-transfer', 'UPI / Google Pay / PhonePe', 'Pay using any UPI app', 'Save upto ₹35')}
        {renderPaymentOption('CARD', 'credit-card-outline', 'Credit / Debit / ATM Card', 'Add and secure cards', '5% Cashback')}
        {renderPaymentOption('EMI', 'calendar-clock', 'Easy EMI', 'Credit Card EMI')}
        {renderPaymentOption('COD', 'cash-register', 'Cash on Delivery', 'Pay at your doorstep', null, null, selectedPayment === 'COD', MaterialCommunityIcons)}

        <View style={styles.sectionDivider} />

        {/* Gift Card */}
        <TouchableOpacity style={styles.giftCardSection}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="gift-outline" size={22} color={COLORS.textSecondary} />
            <Text style={styles.giftCardText}>Have a Gift Card?</Text>
          </View>
          <Text style={styles.addLink}>Add</Text>
        </TouchableOpacity>

        <View style={styles.sectionDivider} />

        {/* Footer */}
        <View style={styles.footerSection}>
          <Ionicons name="happy-outline" size={32} color={COLORS.muted} />
          <Text style={styles.footerText}>Over 35 Crore happy customers trust us for secure payments.</Text>
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
  container: { flex: 1, backgroundColor: COLORS.white },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, flex: 1, marginLeft: 12 },
  secureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: '#f8f9fa',
  },
  secureText: { fontSize: 10, fontWeight: '800', color: COLORS.muted, marginLeft: 4 },
  totalAmountSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.white,
  },
  totalAmountLabel: { fontSize: 15, color: COLORS.textSecondary, fontWeight: '500' },
  totalAmountValue: { fontSize: 20, fontWeight: '800', color: COLORS.textPrimary },
  discountBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.SOFT_GREEN,
    margin: 16,
    padding: 14,
    borderRadius: 8,
  },
  discountInfo: { flexDirection: 'row', alignItems: 'center' },
  discountTitle: { fontSize: 15, fontWeight: '700', color: '#1b5e20' },
  discountSubtitle: { fontSize: 12, color: '#1b5e20', marginTop: 2 },
  sectionDivider: { height: 8, backgroundColor: '#f8f9fa', borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#f0f0f0' },
  paymentOption: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  paymentOptionSelected: { backgroundColor: '#fff' },
  paymentOptionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  paymentOptionLabel: { flexDirection: 'row', alignItems: 'center', flex: 1, paddingRight: 12 },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconWrapperActive: { backgroundColor: COLORS.SOFT_BLUE },
  labelTextWrapper: { flex: 1 },
  paymentLabelText: { fontSize: 15, fontWeight: '600', color: COLORS.textPrimary },
  paymentLabelTextActive: { color: COLORS.primary, fontWeight: '700' },
  paymentSubtitleSmall: { fontSize: 12, color: COLORS.muted, marginTop: 2 },
  paymentOptionDetails: { marginTop: 16 },
  paymentSubtitle: { fontSize: 14, color: COLORS.textSecondary, marginBottom: 8 },
  offerBadge: { backgroundColor: COLORS.SOFT_GREEN, alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, marginBottom: 8 },
  discountText: { fontSize: 12, color: '#2e7d32', fontWeight: '600' },
  cashbackBadge: { backgroundColor: '#fff3e0', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, marginBottom: 8 },
  cashbackText: { fontSize: 12, color: '#e65100', fontWeight: '600' },
  optionMessageContainer: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
  },
  optionMessageText: { fontSize: 12, color: COLORS.textSecondary, lineHeight: 18 },
  placeOrderButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  placeOrderText: { fontSize: 16, fontWeight: '700', color: COLORS.white },
  giftCardSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.white,
  },
  giftCardText: { fontSize: 15, fontWeight: '600', color: COLORS.textPrimary, marginLeft: 12 },
  addLink: { fontSize: 14, fontWeight: '700', color: COLORS.primary },
  footerSection: { paddingVertical: 40, paddingHorizontal: 40, alignItems: 'center' },
  footerText: { fontSize: 14, color: COLORS.muted, textAlign: 'center', marginTop: 12, lineHeight: 20 },
});

export default PaymentScreen;