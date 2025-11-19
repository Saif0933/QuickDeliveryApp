import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const DeliverySection: React.FC = () => {
  return (
    <View style={styles.deliverySection}>
      <View style={styles.deliveryTime}>
        <MaterialIcons name="access-time" size={20} color="#666" />
        <Text style={styles.deliveryTimeText}>Delivery in 35-40 mins</Text>
      </View>
      <TouchableOpacity>
        <Text style={styles.scheduleText}>Want this later? Schedule it</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deliveryAddress}>
        <MaterialIcons name="location-on" size={20} color="#666" />
        <View style={styles.addressDetails}>
          <Text style={styles.deliveryAtText}>Delivery at Home</Text>
          <Text style={styles.fullAddress}>
            pathak villa near raj mahal imam kothi, I...
          </Text>
          <Text style={styles.deliveryInstructions}>
            Add instructions for delivery partner
          </Text>
        </View>
        <MaterialIcons name="chevron-right" size={20} color="#666" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.contactSection}>
        <MaterialIcons name="phone" size={20} color="#666" />
        <Text style={styles.contactText}>Amit Kumar, +91-6202999356</Text>
        <MaterialIcons name="chevron-right" size={20} color="#666" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.billSection}>
        <MaterialIcons name="receipt" size={20} color="#666" />
        <View style={styles.billDetails}>
          <Text style={styles.totalBillText}>Total Bill ₹492.76 ₹409.86</Text>
          <Text style={styles.savedText}>You saved ₹83</Text>
          <Text style={styles.taxesText}>Incl. taxes and charges</Text>
        </View>
        <MaterialIcons name="chevron-right" size={20} color="#666" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  deliverySection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 8,
    borderTopColor: '#F8F8F8',
  },
  deliveryTime: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  deliveryTimeText: {
    fontSize: 14,
    color: '#000',
    marginLeft: 8,
    fontWeight: '500',
  },
  scheduleText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  deliveryAddress: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  addressDetails: {
    flex: 1,
    marginLeft: 8,
  },
  deliveryAtText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  fullAddress: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  deliveryInstructions: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    textDecorationLine: 'underline',
  },
  contactSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  contactText: {
    fontSize: 14,
    color: '#000',
    marginLeft: 8,
    flex: 1,
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
    color: '#000',
    fontWeight: '500',
  },
  savedText: {
    fontSize: 12,
    color: '#1976D2',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  taxesText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});

export default DeliverySection;
