import { useNavigation } from '@react-navigation/native';
import React from 'react';
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
import { useWishlist } from '../Context/WishlistContext';
import { useCart } from '../Context/CartContext';
import { COLORS } from '../theme/color';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 48) / 2;

const WishListScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToBag = (item: any) => {
    addToCart({
      id: item.id,
      title: item.title,
      price: item.price,
      originalPrice: item.originalPrice || item.price,
      discount: '0%',
      image: item.image,
      quantity: 1
    });
    removeFromWishlist(item.id);
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <TouchableOpacity 
        style={styles.imageContainer}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('ProductScreen', { 
            productName: item.title, 
            vendorName: item.brand, 
            vendorImage: item.image,
            id: item.id
        })}
      >
        <Image source={{ uri: item.image }} style={styles.productImage} resizeMode="cover" />
        <TouchableOpacity 
          style={styles.removeIcon} 
          onPress={() => removeFromWishlist(item.id)}
        >
          <Ionicons name="close" size={20} color="#666" />
        </TouchableOpacity>
        {item.rating && (
            <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Ionicons name="star" size={10} color="#fff" style={{ marginLeft: 2 }} />
            </View>
        )}
      </TouchableOpacity>

      <View style={styles.detailsContainer}>
        <Text style={styles.brandName}>{item.brand || 'Premium Brand'}</Text>
        <Text style={styles.productName} numberOfLines={1}>{item.title}</Text>
        
        <View style={styles.priceRow}>
          <Text style={styles.priceText}>{item.price}</Text>
          {item.originalPrice && (
              <Text style={styles.mrpText}>{item.originalPrice}</Text>
          )}
        </View>

        <TouchableOpacity 
            style={styles.moveToBagBtn}
            onPress={() => handleMoveToBag(item)}
        >
          <Text style={styles.moveToBagText}>MOVE TO BAG</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View>
            <Text style={styles.headerTitle}>My Wishlist</Text>
            <Text style={styles.itemCount}>{wishlistItems.length} Items</Text>
        </View>
      </View>

      {wishlistItems.length > 0 ? (
          <FlatList
            data={wishlistItems}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={2}
            contentContainerStyle={styles.listContent}
            columnWrapperStyle={styles.columnWrapper}
            showsVerticalScrollIndicator={false}
          />
      ) : (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
                <Ionicons name="heart-outline" size={60} color="#ccc" />
            </View>
            <Text style={styles.emptyTitle}>Your Wishlist is Empty</Text>
            <Text style={styles.emptySubtitle}>Save items that you like in your wishlist. Review them anytime and easily move them to bag.</Text>
            <TouchableOpacity 
                style={styles.shopNowBtn}
                onPress={() => navigation.navigate('HomeScreen')}
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  backBtn: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#333',
  },
  itemCount: {
    fontSize: 12,
    color: '#999',
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  card: {
    width: COLUMN_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  imageContainer: {
    height: 220,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  removeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 10,
    left: 10,
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
    fontSize: 11,
    fontWeight: '800',
    color: '#333',
    textTransform: 'uppercase',
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
    marginBottom: 10,
  },
  priceText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
  },
  mrpText: {
    fontSize: 11,
    color: '#999',
    textDecorationLine: 'line-through',
    marginLeft: 6,
  },
  moveToBagBtn: {
    borderTopWidth: 1,
    borderTopColor: '#f5f5f5',
    paddingTop: 10,
    alignItems: 'center',
  },
  moveToBagText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.primary,
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
    fontWeight: '800',
    color: '#333',
    marginBottom: 12,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  shopNowBtn: {
    backgroundColor: '#333',
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 4,
  },
  shopNowText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1,
  },
});