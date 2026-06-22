import React from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';

const { width } = Dimensions.get('window');

export default function WishlistScreen({ navigation }: any) {
  const { wishlistItems, removeWishlist } = useWishlistStore();
  const { cartItems, addItem } = useCartStore();

  const handleMoveToCart = (item: any) => {
    addItem(item, 'M', 'Green');
    removeWishlist(item.id);
  };

  const handleClearAll = () => {
    Alert.alert(
      'Clear Wishlist',
      'Are you sure you want to remove all items from your wishlist?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => wishlistItems.forEach((item) => removeWishlist(item.id)),
        },
      ],
      { cancelable: true }
    );
  };

  const formatPrice = (price: any) => {
    if (price === undefined || price === null) return '';
    if (typeof price === 'number') {
      return `₹${price.toLocaleString('en-IN')}`;
    }
    if (typeof price === 'string' && price.includes('₹')) {
      return price;
    }
    return `₹${price}`;
  };

  const categories = [
    { name: 'Men', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80', color: '#E3ECE7' },
    { name: 'Women', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', color: '#FCEAE8' },
    { name: 'Kids', image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=150&auto=format&fit=crop&q=80', color: '#F8F0DD' },
    { name: 'T-Shirts', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=150&auto=format&fit=crop&q=80', color: '#e0f2fe' },
    { name: 'Shirts', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=150&auto=format&fit=crop&q=80', color: '#faf5ff' },
    { name: 'Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&auto=format&fit=crop&q=80', color: '#fef3c7' },
  ];

  const canGoBack = navigation && typeof navigation.canGoBack === 'function' && navigation.canGoBack();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Premium Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {canGoBack && (
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <MaterialIcons name="arrow-back" size={24} color="#0f172a" />
            </TouchableOpacity>
          )}
          <View style={styles.titleContainer}>
            <Text style={styles.headerTitle}>My Wishlist</Text>
            {wishlistItems.length > 0 && (
              <View style={styles.countBadge}>
                <Text style={styles.countText}>{wishlistItems.length}</Text>
              </View>
            )}
          </View>
        </View>

        <TouchableOpacity 
          style={styles.cartButton} 
          onPress={() => navigation.navigate('Cart')}
          activeOpacity={0.7}
        >
          <View style={styles.badgeWrapper}>
            <MaterialIcons name="shopping-bag" size={24} color="#0f172a" />
            {cartItems.length > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartItems.length}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>

      {wishlistItems.length === 0 ? (
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.emptyScrollContent}
        >
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconContainer}>
              <View style={styles.emptyIconPulse}>
                <MaterialIcons name="favorite" size={40} color="#ef4444" />
              </View>
            </View>
            <Text style={styles.emptyTitle}>Your Wishlist is Empty</Text>
            <Text style={styles.emptySubtitle}>
              Tap the heart icon on products you love to build your dream collection here.
            </Text>
            <TouchableOpacity 
              style={styles.exploreButton}
              onPress={() => navigation.navigate('Home')}
              activeOpacity={0.8}
            >
              <Text style={styles.exploreText}>Explore Collections</Text>
              <MaterialIcons name="arrow-forward" size={16} color="#ffffff" style={{ marginLeft: 6 }} />
            </TouchableOpacity>
          </View>

          {/* Explore Categories Section */}
          <View style={styles.categoriesSection}>
            <Text style={styles.categoriesTitle}>Explore Categories</Text>
            <View style={styles.categoriesGrid}>
              {categories.map((cat, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.categoryCard}
                  onPress={() => navigation.navigate('ProductList', { categoryName: cat.name })}
                  activeOpacity={0.8}
                >
                  <View style={[styles.categoryCircle, { backgroundColor: cat.color }]}>
                    <Image source={{ uri: cat.image }} style={styles.categoryImage} />
                  </View>
                  <Text style={styles.categoryLabel}>{cat.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      ) : (
        <View style={{ flex: 1 }}>
          {/* Subheader with Item Count and Clear All */}
          <View style={styles.subHeader}>
            <Text style={styles.itemsCount}>
              {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
            </Text>
            <TouchableOpacity onPress={handleClearAll} activeOpacity={0.7}>
              <Text style={styles.clearAllText}>Clear All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView 
            showsVerticalScrollIndicator={false} 
            contentContainerStyle={styles.scrollContent}
          >
            <View style={styles.gridContainer}>
              {wishlistItems.map((item) => {
                const formattedPrice = formatPrice(item.price);
                const formattedOriginalPrice = formatPrice(item.originalPrice);
                
                return (
                  <View key={item.id} style={styles.productCard}>
                    <View style={styles.imageWrapper}>
                      <Image source={{ uri: item.image }} style={styles.productImage} />
                      <TouchableOpacity 
                        style={styles.deleteButton} 
                        activeOpacity={0.8}
                        onPress={() => removeWishlist(item.id)}
                      >
                        <MaterialIcons name="favorite" size={18} color="#ef4444" />
                      </TouchableOpacity>
                    </View>

                    <View style={styles.productInfo}>
                      <Text style={styles.brandText} numberOfLines={1}>
                        {item.brand || 'CLOTHING'}
                      </Text>
                      <Text style={styles.productName} numberOfLines={1}>
                        {item.name}
                      </Text>
                      
                      <View style={styles.priceRow}>
                        <Text style={styles.productPrice}>{formattedPrice}</Text>
                        {item.originalPrice && (
                          <Text style={styles.originalPrice}>
                            {formattedOriginalPrice}
                          </Text>
                        )}
                        {item.discount && (
                          <Text style={styles.discountBadge}>
                            {item.discount}
                          </Text>
                        )}
                      </View>
                    </View>

                    <TouchableOpacity 
                      style={styles.addToCartButton} 
                      activeOpacity={0.8}
                      onPress={() => handleMoveToCart(item)}
                    >
                      <MaterialIcons name="shopping-bag" size={14} color="#ffffff" style={{ marginRight: 6 }} />
                      <Text style={styles.addToCartText}>Move To Bag</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      )}
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
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderColor: '#f1f5f9',
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 12,
    padding: 2,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0f172a',
  },
  countBadge: {
    backgroundColor: '#0f172a',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },
  countText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '800',
  },
  cartButton: {
    padding: 4,
  },
  badgeWrapper: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 8,
    fontWeight: 'bold',
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderColor: '#f1f5f9',
  },
  itemsCount: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748b',
  },
  clearAllText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#ef4444',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: (width - 44) / 2,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: 180,
    backgroundColor: '#f8fafc',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productInfo: {
    padding: 12,
  },
  brandText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  productName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0f172a',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 6,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '900',
    color: '#0f172a',
  },
  originalPrice: {
    fontSize: 11,
    color: '#94a3b8',
    textDecorationLine: 'line-through',
    marginLeft: 6,
  },
  discountBadge: {
    fontSize: 10,
    fontWeight: '800',
    color: '#22c55e',
    marginLeft: 6,
  },
  addToCartButton: {
    flexDirection: 'row',
    backgroundColor: '#0f172a',
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#f1f5f9',
  },
  addToCartText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '800',
  },
  emptyScrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 36,
    paddingVertical: 60,
  },
  emptyIconContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(239, 68, 68, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.1)',
  },
  emptyIconPulse: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0f172a',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 28,
  },
  exploreButton: {
    flexDirection: 'row',
    backgroundColor: '#0f172a',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  exploreText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
  },
  categoriesSection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  categoriesTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: (width - 64) / 3,
    alignItems: 'center',
    marginBottom: 20,
  },
  categoryCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0f172a',
  },
});

