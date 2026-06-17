import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
  StatusBar,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

// Mock data for categories
const categories = [
  { id: '1', name: 'Men', icon: '👔', color: '#e0f2fe' },
  { id: '2', name: 'Women', icon: '👗', color: '#fce7f3' },
  { id: '3', name: 'Kids', icon: '👶', color: '#fef3c7' },
  { id: '4', name: 'Laundry', icon: '🧺', color: '#dcfce7' },
  { id: '5', name: 'Dry Clean', icon: '✨', color: '#fae8ff' },
  { id: '6', name: 'Alteration', icon: '🪡', color: '#ffedd5' },
];

// Mock data for featured clothing items
const featuredItems = [
  {
    id: '1',
    name: 'Casual Slim Fit Shirt',
    price: '₹1,299',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    time: '25 min delivery',
    category: 'Men',
  },
  {
    id: '2',
    name: 'Floral Summer Dress',
    price: '₹1,899',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    time: '30 min delivery',
    category: 'Women',
  },
  {
    id: '3',
    name: 'Classic Denim Jacket',
    price: '₹2,499',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    time: '20 min delivery',
    category: 'Men',
  },
  {
    id: '4',
    name: 'Knitted Kids Sweater',
    price: '₹899',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    time: '30 min delivery',
    category: 'Kids',
  },
];

export default function HomeScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState('Home');
  const [searchQuery, setSearchQuery] = useState('');

  const renderCategoryItem = ({ item }: { item: typeof categories[0] }) => (
    <TouchableOpacity style={styles.categoryCard} activeOpacity={0.8}>
      <View style={[styles.categoryIconContainer, { backgroundColor: item.color }]}>
        <Text style={styles.categoryEmoji}>{item.icon}</Text>
      </View>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderProductItem = ({ item }: { item: typeof featuredItems[0] }) => (
    <TouchableOpacity style={styles.productCard} activeOpacity={0.95}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.timeTag}>
        <MaterialIcons name="bolt" size={12} color="#3b82f6" />
        <Text style={styles.timeTagText}>{item.time}</Text>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productCategory}>{item.category}</Text>
        <Text style={styles.productName} numberOfLines={1}>
          {item.name}
        </Text>
        <View style={styles.productFooter}>
          <Text style={styles.productPrice}>{item.price}</Text>
          <View style={styles.ratingContainer}>
            <MaterialIcons name="star" size={14} color="#f59e0b" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.addButton} activeOpacity={0.8}>
        <MaterialIcons name="add" size={20} color="#ffffff" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarEmoji}>🧔</Text>
          </View>
          <View style={styles.locationContainer}>
            <View style={styles.locationTitleRow}>
              <Text style={styles.locationTitle}>Deliver to</Text>
              <MaterialIcons name="keyboard-arrow-down" size={18} color="#64748b" />
            </View>
            <Text style={styles.locationText} numberOfLines={1}>
              Sector 62, Noida, UP - 201301
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.notificationButton} activeOpacity={0.8}>
          <MaterialIcons name="notifications-none" size={24} color="#0f172a" />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputWrapper}>
            <MaterialIcons name="search" size={22} color="#64748b" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search clothes, services, brands..."
              placeholderTextColor="#64748b"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity style={styles.filterButton} activeOpacity={0.8}>
            <MaterialIcons name="tune" size={22} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {/* Active Order / Delivery Tracker */}
        <LinearGradient
          colors={['#3b82f6', '#1d4ed8']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.trackerCard}
        >
          <View style={styles.trackerHeader}>
            <View style={styles.trackerStatusContainer}>
              <Text style={styles.trackerStatusEmoji}>🧺</Text>
              <View>
                <Text style={styles.trackerTitle}>Order Out for Delivery</Text>
                <Text style={styles.trackerSubtitle}>Premium Laundry & Dry Cleaning</Text>
              </View>
            </View>
            <View style={styles.etaContainer}>
              <Text style={styles.etaLabel}>Arriving in</Text>
              <Text style={styles.etaTime}>18 mins</Text>
            </View>
          </View>
          <View style={styles.progressContainer}>
            <View style={styles.progressBarBackground}>
              <View style={styles.progressBarFill} />
            </View>
            <View style={styles.progressSteps}>
              <Text style={styles.progressStepTextActive}>Picked</Text>
              <Text style={styles.progressStepTextActive}>Processed</Text>
              <Text style={styles.progressStepTextActive}>Delivering</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Categories Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Services</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        />

        {/* Featured Products Grid */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Express Store</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={featuredItems}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={styles.productGrid}
          columnWrapperStyle={styles.productRow}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.04)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  avatarEmoji: {
    fontSize: 24,
  },
  locationContainer: {
    marginLeft: 12,
    flex: 1,
  },
  locationTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationTitle: {
    fontSize: 12,
    color: '#64748b',
    marginRight: 2,
    fontWeight: '600',
  },
  locationText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
    marginTop: 2,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  notificationBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ef4444',
  },
  scrollContent: {
    paddingBottom: 110,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 52,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  searchInput: {
    flex: 1,
    color: '#0f172a',
    fontSize: 15,
    marginLeft: 10,
    fontWeight: '500',
  },
  filterButton: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  trackerCard: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 8,
  },
  trackerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trackerStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trackerStatusEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  trackerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  trackerSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  etaContainer: {
    alignItems: 'flex-end',
  },
  etaLabel: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  etaTime: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
    marginTop: 2,
  },
  progressContainer: {
    marginTop: 20,
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
  },
  progressBarFill: {
    width: '75%',
    height: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 3,
  },
  progressSteps: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  progressStepTextActive: {
    fontSize: 11,
    color: '#ffffff',
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 25,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: 0.5,
  },
  seeAllText: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '600',
  },
  categoryList: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  categoryCard: {
    alignItems: 'center',
    marginRight: 18,
  },
  categoryIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  categoryEmoji: {
    fontSize: 28,
  },
  categoryName: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
    marginTop: 8,
  },
  productGrid: {
    paddingHorizontal: 15,
  },
  productRow: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  productCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    width: (width - 50) / 2,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.04)',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 140,
    backgroundColor: '#f8fafc',
  },
  timeTag: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  timeTagText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#3b82f6',
    marginLeft: 3,
  },
  productInfo: {
    padding: 12,
  },
  productCategory: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748b',
    textTransform: 'uppercase',
  },
  productName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
    marginTop: 4,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  productPrice: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0f172a',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
    marginLeft: 3,
  },
  addButton: {
    position: 'absolute',
    bottom: 52,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
});
