import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const categoriesData = [
  {
    id: '1',
    name: 'Men',
    items: '1,240 items',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80',
    subcategories: ['T-Shirts & Polos', 'Shirts', 'Jeans & Trousers', 'Jackets & Coats', 'Activewear'],
  },
  {
    id: '2',
    name: 'Women',
    items: '2,890 items',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    subcategories: ['Dresses & Jumpsuits', 'Tops & Tees', 'Jeans & Skirts', 'Jackets & Blazers', 'Ethnic Wear'],
  },
  {
    id: '3',
    name: 'Kids',
    items: '850 items',
    image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=400&auto=format&fit=crop&q=80',
    subcategories: ['Boys Clothing', 'Girls Clothing', 'Infants & Toddlers', 'Toys & Accessories'],
  },
  {
    id: '4',
    name: 'Shoes',
    items: '980 items',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=80',
    subcategories: ['Sneakers', 'Formal Shoes', 'Sandals & Slippers', 'Sports Shoes'],
  },
  {
    id: '5',
    name: 'Accessories',
    items: '1,120 items',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&auto=format&fit=crop&q=80',
    subcategories: ['Bags & Backpacks', 'Watches', 'Sunglasses', 'Belts & Wallets'],
  },
];

export default function CategoriesScreen() {
  const [selectedCategory, setSelectedCategory] = useState('1');
  const activeCategory = categoriesData.find(cat => cat.id === selectedCategory) || categoriesData[0];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Categories</Text>
        <TouchableOpacity style={styles.searchButton}>
          <MaterialIcons name="search" size={24} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <View style={styles.mainContainer}>
        {/* Left Side Tab Selector */}
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          style={styles.leftSidebar}
          contentContainerStyle={styles.sidebarContent}
        >
          {categoriesData.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.sidebarItem,
                selectedCategory === cat.id && styles.sidebarItemActive,
              ]}
              onPress={() => setSelectedCategory(cat.id)}
              activeOpacity={0.8}
            >
              <Text 
                style={[
                  styles.sidebarText,
                  selectedCategory === cat.id && styles.sidebarTextActive,
                ]}
              >
                {cat.name}
              </Text>
              {selectedCategory === cat.id && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Right Side Content Pane */}
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          style={styles.contentPane}
          contentContainerStyle={styles.paneContent}
        >
          <View style={styles.bannerContainer}>
            <Image source={{ uri: activeCategory.image }} style={styles.bannerImage} resizeMode="cover" />
            <View style={styles.bannerOverlay} />
            <View style={styles.bannerTextSection}>
              <Text style={styles.bannerTitle}>{activeCategory.name} Collection</Text>
              <Text style={styles.bannerSubtitle}>{activeCategory.items}</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Shop by Product</Text>
          {activeCategory.subcategories.map((sub, index) => (
            <TouchableOpacity key={index} style={styles.subcategoryRow} activeOpacity={0.7}>
              <Text style={styles.subcategoryText}>{sub}</Text>
              <MaterialIcons name="chevron-right" size={20} color="#94a3b8" />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderColor: '#f1f5f9',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0f172a',
  },
  searchButton: {
    padding: 4,
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  leftSidebar: {
    width: 100,
    backgroundColor: '#f8fafc',
    borderRightWidth: 1,
    borderColor: '#f1f5f9',
  },
  sidebarContent: {
    paddingVertical: 10,
  },
  sidebarItem: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  sidebarItemActive: {
    backgroundColor: '#ffffff',
  },
  sidebarText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  sidebarTextActive: {
    color: '#0f172a',
    fontWeight: '800',
  },
  activeIndicator: {
    position: 'absolute',
    left: 0,
    top: '25%',
    bottom: '25%',
    width: 4,
    borderRadius: 2,
    backgroundColor: '#0f172a',
  },
  contentPane: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  paneContent: {
    padding: 16,
  },
  bannerContainer: {
    height: 120,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 20,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  bannerTextSection: {
    position: 'absolute',
    left: 16,
    bottom: 16,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
  },
  bannerSubtitle: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 10,
  },
  subcategoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#f1f5f9',
  },
  subcategoryText: {
    fontSize: 14,
    color: '#334155',
    fontWeight: '500',
  },
});
