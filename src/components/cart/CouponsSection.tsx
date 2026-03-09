import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useGetUserCart } from '../../api/hooks/allCart';
import { COLORS } from '../../theme/color';

const CouponsSection: React.FC<{ cartData?: any }> = ({ cartData: customCartData }) => {
  const { data: globalCartData } = useGetUserCart();
  const cartData = customCartData || globalCartData;

  let calculatedTotal = 0;
  if (cartData) {
    if (cartData.vendors && Array.isArray(cartData.vendors)) {
      cartData.vendors.forEach((v: any) => {
        v.items?.forEach((item: any) => {
          const priceObj = item.unitPrice || item.price;
          let priceValue = 0;
          if (priceObj && typeof priceObj === 'object' && 'd' in priceObj && priceObj.d) {
              priceValue = priceObj.d[0];
          } else if (typeof item.unitPrice === 'string' || typeof item.unitPrice === 'number') {
              priceValue = parseFloat(item.unitPrice as string);
          } else if (typeof item.price === 'string' || typeof item.price === 'number') {
              priceValue = parseFloat(item.price as string);
          }
          calculatedTotal += (priceValue * (item.quantity || 1));
        });
      });
    } else if (cartData.items && Array.isArray(cartData.items)) {
      cartData.items.forEach((item: any) => {
          const priceObj = item.unitPrice || item.price;
          let priceValue = 0;
          if (priceObj && typeof priceObj === 'object' && 'd' in priceObj && priceObj.d) {
              priceValue = priceObj.d[0];
          } else if (typeof item.unitPrice === 'string' || typeof item.unitPrice === 'number') {
              priceValue = parseFloat(item.unitPrice as string);
          } else if (typeof item.price === 'string' || typeof item.price === 'number') {
              priceValue = parseFloat(item.price as string);
          }
          calculatedTotal += (priceValue * (item.quantity || 1));
      });
    }
  }

  const finalTotalDisplay = cartData?.totalAmount || calculatedTotal || 0;
  const dynamicallyCalculatedSavings = (Number(finalTotalDisplay) * 0.1).toFixed(2); // Mock 10% savings

  return (
    <View style={styles.couponsSection}>
      {/* GOLD OFFER */}
      {Number(finalTotalDisplay) > 0 && (
        <View style={styles.goldOffer}>
          {/* <Text style={styles.goldOfferIcon}>✓</Text> */}
          {/* <Text style={styles.goldOfferText}>
            You saved ₹{dynamicallyCalculatedSavings} with Gold offer
          </Text> */}
        </View>
      )}

      {/* COUPON OFFER */}
      <View style={styles.couponOffer}>
        <LottieView
          source={require('../../assets/Offers.json')}
          autoPlay
          loop
          style={{ width: 44, height: 44, marginLeft: -10 }} // making icon slightly larger to fit well and shifting left
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
