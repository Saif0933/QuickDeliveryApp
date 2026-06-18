import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from '../screen/home/HomeScreen';
import CategoriesScreen from '../screen/home/CategoriesScreen';
import BrandsTabScreen from '../screen/home/BrandsTabScreen';
import WishlistScreen from '../screen/home/WishlistScreen';
import SettingScreen from '../screen/setting/SettingScreen';

export default function BottomTabNavigator({ navigation }: any) {
  const [activeTab, setActiveTab] = useState('Home');

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'Home':
        return <HomeScreen navigation={navigation} />;
      case 'Categories':
        return <CategoriesScreen navigation={navigation} />;
      case 'Brands':
        return <BrandsTabScreen navigation={navigation} />;
      case 'Wishlist':
        return <WishlistScreen navigation={navigation} />;
      case 'Account':
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

      {/* Pinned Custom Bottom Navigation Bar matching mockup */}
      <View style={styles.bottomNavContainer}>
        <View style={styles.bottomNav}>
          {/* Home Tab */}
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => setActiveTab('Home')}
            activeOpacity={0.8}
          >
            <MaterialIcons
              name="home"
              size={24}
              color={activeTab === 'Home' ? '#0f172a' : '#94a3b8'}
            />
            <Text style={[styles.navText, activeTab === 'Home' && styles.navTextActive]}>
              Home
            </Text>
          </TouchableOpacity>

          {/* Categories Tab */}
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => setActiveTab('Categories')}
            activeOpacity={0.8}
          >
            <MaterialIcons
              name="grid-view"
              size={24}
              color={activeTab === 'Categories' ? '#0f172a' : '#94a3b8'}
            />
            <Text style={[styles.navText, activeTab === 'Categories' && styles.navTextActive]}>
              Categories
            </Text>
          </TouchableOpacity>

          {/* Brands Tab */}
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => setActiveTab('Brands')}
            activeOpacity={0.8}
          >
            <MaterialIcons
              name="sell"
              size={24}
              color={activeTab === 'Brands' ? '#0f172a' : '#94a3b8'}
            />
            <Text style={[styles.navText, activeTab === 'Brands' && styles.navTextActive]}>
              Brands
            </Text>
          </TouchableOpacity>

          {/* Wishlist Tab */}
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => setActiveTab('Wishlist')}
            activeOpacity={0.8}
          >
            <MaterialIcons
              name={activeTab === 'Wishlist' ? "favorite" : "favorite-border"}
              size={24}
              color={activeTab === 'Wishlist' ? '#0f172a' : '#94a3b8'}
            />
            <Text style={[styles.navText, activeTab === 'Wishlist' && styles.navTextActive]}>
              Wishlist
            </Text>
          </TouchableOpacity>

          {/* Account Tab */}
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => setActiveTab('Account')}
            activeOpacity={0.8}
          >
            <MaterialIcons
              name={activeTab === 'Account' ? "person" : "person-outline"}
              size={24}
              color={activeTab === 'Account' ? '#0f172a' : '#94a3b8'}
            />
            <Text style={[styles.navText, activeTab === 'Account' && styles.navTextActive]}>
              Account
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
    backgroundColor: '#ffffff',
  },
  screenContainer: {
    flex: 1,
  },
  bottomNavContainer: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderColor: '#f1f5f9',
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    paddingTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 4,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 50,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  navText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#94a3b8',
    marginTop: 4,
  },
  navTextActive: {
    color: '#0f172a',
    fontWeight: '800',
  },
});
