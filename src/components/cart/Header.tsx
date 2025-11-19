import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Header: React.FC = () => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton}>
        <MaterialIcons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <View style={styles.headerContent}>
        <Text style={styles.restaurantName}>Aroma Quest</Text>
        <Text style={styles.deliveryTime}>35-40 mins to Home</Text>
        <Text style={styles.address}>pathak villa near raj m...</Text>
      </View>
      <TouchableOpacity style={styles.shareButton}>
        <MaterialIcons name="share" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 4,
  },
  headerContent: {
    flex: 1,
    marginLeft: 12,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  deliveryTime: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  address: {
    fontSize: 12,
    color: '#999',
    marginTop: 1,
  },
  shareButton: {
    padding: 4,
  },
});

export default Header;
