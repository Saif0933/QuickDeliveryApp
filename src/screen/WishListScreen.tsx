import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../theme/color';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 48) / 2;

const INITIAL_WISHLIST = [
  {
    id: '1',
    name: 'Floral Print Maxi Dress',
    brand: 'Zara',
    price: '₹1,299',
    mrp: '₹2,499',
    discount: '48% OFF',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80',
    rating: '4.2',
  },
  {
    id: '2',
    name: 'Slim Fit Cotton Shirt',
    brand: 'H&M',
    price: '₹899',
    mrp: '₹1,599',
    discount: '43% OFF',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e32f6b717?w=500&q=80',
    rating: '4.5',
  },
  {
    id: '3',
    name: 'High-Rise Skinny Jeans',
    brand: 'Levi\'s',
    price: '₹2,499',
    mrp: '₹3,999',
    discount: '37% OFF',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&q=80',
    rating: '4.0',
  },
  {
    id: '4',
    name: 'Oversized Graphic T-shirt',
    brand: 'Nike',
    price: '₹799',
    mrp: '₹1,299',
    discount: '38% OFF',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80',
    rating: '4.8',
  }
];

const WishListScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [wishlist, setWishlist] = useState(INITIAL_WISHLIST);

  const removeItem = (id: string) => {
    setWishlist(prev => prev.filter(item => item.id !== id));
  };

  const renderItem = ({ item }: { item: typeof INITIAL_WISHLIST[0] }) => (
    <View style={styles.card}>
      <TouchableOpacity 
        style={styles.imageContainer}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('ProductScreen', { productName: item.name, vendorName: item.brand, vendorImage: item.image })}
      >
        <Image source={{ uri: item.image }} style={styles.productImage} resizeMode="cover" />
        <TouchableOpacity 
          style={styles.removeIcon} 
          onPress={() => removeItem(item.id)}
        >
          <Ionicons name="close" size={20} color="#666" />
        </TouchableOpacity>
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>{item.rating}</Text>
          <Ionicons name="star" size={10} color="#fff" style={{ marginLeft: 2 }} />
        </View>
      </TouchableOpacity>

      <View style={styles.detailsContainer}>
        <Text style={styles.brandName}>{item.brand}</Text>
        <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
        
        <View style={styles.priceRow}>
          <Text style={styles.priceText}>{item.price}</Text>
          <Text style={styles.mrpText}>{item.mrp}</Text>
          <Text style={styles.discountText}>{item.discount}</Text>
        </View>

        <TouchableOpacity style={styles.addToBagBtn} activeOpacity={0.8}>
          <Text style={styles.addToBagText}>MOVE TO BAG</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Wishlist</Text>
            <Text style={styles.itemCount}>{wishlist.length} Items</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.shareBtn}>
          <Ionicons name="share-social-outline" size={22} color="#000" />
        </TouchableOpacity>
      </View>

      {wishlist.length > 0 ? (
        <FlatList
          data={wishlist}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconCircle}>
            <Ionicons name="heart-outline" size={60} color="#ccc" />
          </View>
          <Text style={styles.emptyTitle}>Your Wishlist is empty</Text>
          <Text style={styles.emptySubtitle}>Save items that you like in your wishlist. Review them anytime and easily move them to bag.</Text>
          <TouchableOpacity 
            style={styles.shopNowBtn}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.shopNowText}>SHOP NOW</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default WishListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    paddingRight: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  itemCount: {
    fontSize: 12,
    color: '#666',
    marginTop: -2,
  },
  shareBtn: {
    padding: 8,
  },
  listContent: {
    padding: 16,
  },
  card: {
    width: COLUMN_WIDTH,
    marginBottom: 20,
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  imageContainer: {
    width: '100%',
    height: 200,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  removeIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  ratingText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  detailsContainer: {
    padding: 10,
  },
  brandName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000',
  },
  productName: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    flexWrap: 'wrap',
  },
  priceText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000',
  },
  mrpText: {
    fontSize: 11,
    color: '#999',
    textDecorationLine: 'line-through',
    marginLeft: 6,
  },
  discountText: {
    fontSize: 11,
    color: '#ff4d4d',
    fontWeight: 'bold',
    marginLeft: 6,
  },
  addToBagBtn: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 10,
    alignItems: 'center',
  },
  addToBagText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary || '#ff4d4d',
    letterSpacing: 0.5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  shopNowBtn: {
    backgroundColor: '#000',
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 4,
  },
  shopNowText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
  },
});