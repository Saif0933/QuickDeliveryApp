import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../theme/color';

const CouponsSection: React.FC = () => {
  return (
    <View style={styles.couponsSection}>
      {/* GOLD OFFER */}
      <View style={styles.goldOffer}>
        <Text style={styles.goldOfferIcon}>✓</Text>
        <Text style={styles.goldOfferText}>
          You saved ₹66.90 with Gold offer
        </Text>
      </View>

      {/* COUPON OFFER */}
      <View style={styles.couponOffer}>
        <MaterialCommunityIcons
          name="brightness-percent"
          size={20}
          color={COLORS.muted}
        />
        <Text style={styles.couponText}>Save ₹80 with 'HUNGRY80'</Text>

        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyButtonText}>APPLY</Text>
        </TouchableOpacity>
      </View>

      {/* VIEW ALL */}
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
    borderTopColor: COLORS.background,
    backgroundColor: COLORS.white,
  },

  goldOffer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondary,
  },
  goldOfferIcon: {
    fontSize: 16,
    color: COLORS.highlight, // highlight green
    marginRight: 8,
    fontWeight: 'bold',
  },
  goldOfferText: {
    fontSize: 14,
    color: COLORS.yelow, // gold-like color
    fontWeight: '500',
  },

  couponOffer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondary,
  },
  couponText: {
    fontSize: 14,
    color: COLORS.textPrimary,
    fontWeight: '500',
    flex: 1,
    marginLeft: 8,
  },

  applyButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 4,
  },
  applyButtonText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '600',
  },

  viewAllCoupons: {
    paddingVertical: 8,
  },
  viewAllText: {
    fontSize: 14,
    color: COLORS.muted,
  },
});

export default CouponsSection;
