import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const BottomSection: React.FC = () => {
  return (
    <View style={styles.bottomSection}>
      <View style={styles.paymentMethod}>
        <Text style={styles.payUsingText}>PAY USING</Text>
        <Text style={styles.googlePayText}>Google Pay UPI</Text>
      </View>
      <TouchableOpacity style={styles.placeOrderButton}>
        <View style={styles.placeOrderContent}>
          <Text style={styles.totalAmount}>₹409.86</Text>
          <Text style={styles.totalText}>TOTAL</Text>
        </View>
        <Text style={styles.placeOrderText}>Place Order ▸</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
  },
  paymentMethod: {
    flex: 1,
  },
  payUsingText: {
    fontSize: 10,
    color: '#666',
    marginBottom: 2,
  },
  googlePayText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  placeOrderButton: {
    backgroundColor: '#3e0dd2ff',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeOrderContent: {
    marginRight: 16,
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  totalText: {
    fontSize: 10,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  placeOrderText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default BottomSection;
