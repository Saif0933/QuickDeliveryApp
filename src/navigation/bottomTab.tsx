import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from '../screen/home/HomeScreen';
import OrdersScreen from '../screen/orders/OrdersScreen';
import CartScreen from '../screen/cart/CartScreen';
import SettingScreen from '../screen/setting/SettingScreen';

export default function BottomTabNavigator({ navigation }: any) {
  const [activeTab, setActiveTab] = useState('Home');

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'Home':
        return <HomeScreen navigation={navigation} />;
      case 'Orders':
        return <OrdersScreen navigation={navigation} />;
      case 'Cart':
        return <CartScreen navigation={navigation} />;
      case 'Settings':
        return <SettingScreen navigation={navigation} />;
      default:
        return <HomeScreen navigation={navigation} />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Screen Area */}
      <View style={styles.screenContainer}>
        {renderActiveScreen()}
      </View>

      {/* Floating Custom Bottom Navigation Bar */}
      <View style={styles.bottomNavContainer}>
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => setActiveTab('Home')}
            activeOpacity={0.8}
          >
            <MaterialIcons
              name="home"
              size={24}
              color={activeTab === 'Home' ? '#3b82f6' : '#64748b'}
            />
            <Text style={[styles.navText, activeTab === 'Home' && styles.navTextActive]}>
              Home
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => setActiveTab('Orders')}
            activeOpacity={0.8}
          >
            <MaterialIcons
              name="local-shipping"
              size={24}
              color={activeTab === 'Orders' ? '#3b82f6' : '#64748b'}
            />
            <Text style={[styles.navText, activeTab === 'Orders' && styles.navTextActive]}>
              Orders
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => setActiveTab('Cart')}
            activeOpacity={0.8}
          >
            <MaterialIcons
              name="shopping-bag"
              size={24}
              color={activeTab === 'Cart' ? '#3b82f6' : '#64748b'}
            />
            <Text style={[styles.navText, activeTab === 'Cart' && styles.navTextActive]}>
              Cart
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => setActiveTab('Settings')}
            activeOpacity={0.8}
          >
            <MaterialIcons
              name="settings"
              size={24}
              color={activeTab === 'Settings' ? '#3b82f6' : '#64748b'}
            />
            <Text style={[styles.navText, activeTab === 'Settings' && styles.navTextActive]}>
              Settings
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  screenContainer: {
    flex: 1,
  },
  bottomNavContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 34 : 20,
    left: 20,
    right: 20,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.04)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 6,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
  },
  navText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748b',
    marginTop: 4,
  },
  navTextActive: {
    color: '#3b82f6',
  },
});
