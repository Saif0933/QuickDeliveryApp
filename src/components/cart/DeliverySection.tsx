import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useAddresses } from '../../api/hooks/address';
import { useGetUserCart } from '../../api/hooks/allCart';
import { useGetUserProfile } from '../../api/hooks/user';
import { COLORS } from '../../theme/color';

const DeliverySection: React.FC = () => {
  const navigation = useNavigation<any>();
  
  // 1. Fetch User Profile (for Name & Phone)
  const { data: profile } = useGetUserProfile();
  
  // 2. Fetch Addresses (to find Default)
  const { data: addresses, isLoading: addressLoading } = useAddresses();
  
  // 3. Fetch Cart Details (for Bill Summary)
  const { data: cartData, isLoading: cartLoading } = useGetUserCart();

  // --- Logic: Find Default Address ---
  const defaultAddress = useMemo(() => {
    if (!addresses || addresses.length === 0) return null;
    return addresses.find(addr => addr.isDefault) || addresses[0];
  }, [addresses]);

  const totalAmount = cartData?.totalAmount || 0;

  return (
    <View style={styles.deliverySection}>
      {/* Delivery Time Estimate */}
      <View style={styles.deliveryTime}>
        <MaterialIcons name="access-time" size={20} color={COLORS.muted} />
        <Text style={styles.deliveryTimeText}>Delivery in 35-40 mins</Text>
      </View>

      <TouchableOpacity onPress={() => console.log('Schedule Delivery')}>
        <Text style={styles.scheduleText}>Want this later? Schedule it</Text>
      </TouchableOpacity>

      {/* 📍 Delivery Address Section */}
      <TouchableOpacity 
        style={styles.deliveryAddress}
        onPress={() => navigation.navigate('AddressBookScreen')}
      >
        <MaterialIcons name="location-on" size={20} color={COLORS.muted} />
        <View style={styles.addressDetails}>
          {addressLoading ? (
            <ActivityIndicator size="small" color={COLORS.primary} style={{ alignSelf: 'flex-start' }} />
          ) : (
            <>
              <Text style={styles.deliveryAtText}>
                {defaultAddress ? `Delivery at ${defaultAddress.type}` : 'Select Address'}
              </Text>
              <Text style={styles.fullAddress} numberOfLines={1}>
                {defaultAddress ? defaultAddress.completeAddress : 'Set your delivery location to proceed'}
              </Text>
              <Text style={styles.deliveryInstructions}>
                {defaultAddress?.instructions || 'Add instructions for delivery partner'}
              </Text>
            </>
          )}
        </View>
        <MaterialIcons name="chevron-right" size={20} color={COLORS.muted} />
      </TouchableOpacity>

      {/* 📞 Contact Section */}
      <TouchableOpacity 
        style={styles.contactSection}
        onPress={() => navigation.navigate('ProfileScreen')}
      >
        <MaterialIcons name="phone" size={20} color={COLORS.muted} />
        <Text style={styles.contactText}>
          {profile ? `${profile.name}, +91-${profile.phone || profile.mobile || '---'}` : 'Update contact info'}
        </Text>
        <MaterialIcons name="chevron-right" size={20} color={COLORS.muted} />
      </TouchableOpacity>

      {/* 🧾 Bill Summary Section */}
      <TouchableOpacity style={styles.billSection}>
        <MaterialIcons name="receipt" size={20} color={COLORS.muted} />
        <View style={styles.billDetails}>
          {cartLoading ? (
            <ActivityIndicator size="small" color={COLORS.primary} style={{ alignSelf: 'flex-start' }} />
          ) : (
            <>
              <Text style={styles.totalBillText}>Total Bill ₹{totalAmount}</Text>
              {totalAmount > 0 ? (
                <Text style={styles.savedText}>Ready to checkout</Text>
              ) : (
                <Text style={styles.savedText}>Your cart is empty</Text>
              )}
              <Text style={styles.taxesText}>Incl. taxes and charges</Text>
            </>
          )}
        </View>
        <MaterialIcons name="chevron-right" size={20} color={COLORS.muted} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  deliverySection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 8,
    borderTopColor: COLORS.background,
    backgroundColor: COLORS.white,
  },
  deliveryTime: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  deliveryTimeText: {
    fontSize: 14,
    color: COLORS.textPrimary,
    marginLeft: 8,
    fontWeight: '500',
  },
  scheduleText: {
    fontSize: 14,
    color: COLORS.primary,
    marginBottom: 16,
    fontWeight: '500',
  },
  deliveryAddress: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondary,
  },
  addressDetails: {
    flex: 1,
    marginLeft: 8,
  },
  deliveryAtText: {
    fontSize: 14,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  fullAddress: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  deliveryInstructions: {
    fontSize: 12,
    color: COLORS.primary,
    marginTop: 8,
    textDecorationLine: 'underline',
  },
  contactSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondary,
  },
  contactText: {
    fontSize: 14,
    color: COLORS.textPrimary,
    marginLeft: 8,
    flex: 1,
    fontWeight: '500',
  },
  billSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
  },
  billDetails: {
    flex: 1,
    marginLeft: 8,
  },
  totalBillText: {
    fontSize: 14,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  savedText: {
    fontSize: 12,
    color: COLORS.highlight,
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 4,
    fontWeight: '600',
  },
  taxesText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
});

export default DeliverySection;
