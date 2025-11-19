import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CouponsSection: React.FC = () => {
  return (
    <View style={styles.couponsSection}>
      <View style={styles.goldOffer}>
        <Text style={styles.goldOfferIcon}>✓</Text>
        <Text style={styles.goldOfferText}>
          You saved ₹66.90 with Gold offer
        </Text>
      </View>

      <View style={styles.couponOffer}>
        <MaterialCommunityIcons
          name="brightness-percent"
          size={20}
          color="#666"
        />
        <Text style={styles.couponText}>Save ₹80 with 'HUNGRY80'</Text>
        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyButtonText}>APPLY</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.viewAllCoupons}>
        <Text style={styles.viewAllText}>View all coupons ▸</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  couponsSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 8,
    borderTopColor: '#F8F8F8',
  },
  goldOffer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  goldOfferIcon: {
    fontSize: 16,
    color: '#4CAF50',
    marginRight: 8,
    fontWeight: 'bold',
  },
  goldOfferText: {
    fontSize: 14,
    color: '#B8860B',
    fontWeight: '500',
  },
  couponOffer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  couponText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
    flex: 1,
    marginLeft: 8,
  },
  applyButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#3e0dd2ff',
    borderRadius: 4,
  },
  applyButtonText: {
    fontSize: 12,
    color: '#3e0dd2ff',
    fontWeight: '600',
  },
  viewAllCoupons: {
    paddingVertical: 8,
  },
  viewAllText: {
    fontSize: 14,
    color: '#666',
  },
});

export default CouponsSection;
