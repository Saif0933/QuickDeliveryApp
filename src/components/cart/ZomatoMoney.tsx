import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ZomatoMoney: React.FC = () => {
  return (
    <TouchableOpacity style={styles.zomatoMoney}>
      <View style={styles.zomatoMoneyIcon}>
        <Text style={styles.zomatoMoneyEmoji}>💳</Text>
      </View>
      <View style={styles.zomatoMoneyDetails}>
        <Text style={styles.zomatoMoneyTitle}>Zomato Money</Text>
        <Text style={styles.zomatoMoneySubtitle}>
          Single tap payments. Zero failures
        </Text>
      </View>
      <MaterialIcons name="chevron-right" size={20} color="#666" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  zomatoMoney: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  zomatoMoneyIcon: {
    marginRight: 12,
  },
  zomatoMoneyEmoji: {
    fontSize: 20,
  },
  zomatoMoneyDetails: {
    flex: 1,
  },
  zomatoMoneyTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  zomatoMoneySubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
});

export default ZomatoMoney;
