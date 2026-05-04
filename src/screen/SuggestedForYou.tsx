import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const staticSuggestedProducts = [
  {
    id: 's-1',
    name: 'Men Slim Fit Casual Shirt',
    brand: 'Roadster',
    price: '₹599',
    originalPrice: '₹1499',
    discount: '60% off',
    rating: '4.2',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e32f6b717?w=500&q=80',
    description: 'This slim fit casual shirt is crafted from breathable cotton fabric, featuring a clean solid pattern and comfortable regular fit, perfect for any casual occasion.',
    tag: 'F-Assured'
  },
  {
    id: 's-2',
    name: 'Women High-Rise Wide Jeans',
    brand: 'H&M',
    price: '₹1299',
    originalPrice: '₹2499',
    discount: '48% off',
    rating: '4.5',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&q=80',
    tag: 'Trending'
  },
  {
    id: 's-3',
    name: 'Unisex Graphic Printed T-Shirt',
    brand: 'Puma',
    price: '₹799',
    originalPrice: '₹1999',
    discount: '60% off',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&q=80',
    tag: 'Bestseller'
  },
  {
    id: 's-4',
    name: 'Men Regular Fit Solid Chinos',
    brand: 'Highlander',
    price: '₹649',
    originalPrice: '₹1299',
    discount: '50% off',
    rating: '3.9',
    image: 'https://images.unsplash.com/photo-1624378441864-6da7c473188d?w=500&q=80',
    description: 'This slim fit casual shirt is crafted from breathable cotton fabric, featuring a clean solid pattern and comfortable regular fit, perfect for any casual occasion.',
    tag: 'F-Assured'
  },
  {
    id: 's-5',
    name: 'Women Floral Print Maxi Dress',
    brand: 'Zara',
    price: '₹1499',
    originalPrice: '₹2999',
    discount: '50% off',
    rating: '4.1',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&q=80',
    tag: 'New Arrival'
  },
  {
    id: 's-6',
    name: 'Men Full Sleeve Denim Jacket',
    brand: "Levi's",
    price: '₹2599',
    originalPrice: '₹4999',
    discount: '48% off',
    rating: '4.6',
    image: 'https://images.unsplash.com/photo-1551537482-f20927b34722?w=500&q=80',
    tag: 'Trending'
  },
  {
    id: 's-7',
    name: 'Men Regular Fit Track Pants',
    brand: 'Adidas',
    price: '₹899',
    originalPrice: '₹1599',
    discount: '44% off',
    rating: '4.3',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80',
    tag: 'Offer'
  },
  {
    id: 's-8',
    name: 'Women Casual Sneakers',
    brand: 'Nike',
    price: '₹2999',
    originalPrice: '₹4999',
    discount: '40% off',
    rating: '4.7',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&q=80',
    tag: 'Bestseller'
  }
];

import { useWishlist } from '../Context/WishlistContext';

const SuggestedForYou = () => {
  const navigation = useNavigation<any>();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const renderProduct = ({ item }: { item: typeof staticSuggestedProducts[0] }) => {
    const isAdded = isInWishlist(item.id);

    return (
      <TouchableOpacity 
        style={styles.card}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('ProductScreen', {
          productName: item.name,
          vendorName: item.brand,
          vendorImage: item.image,
          description: item.description
        })}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
          <View style={styles.tagBadge}>
            <Text style={styles.tagText}>{item.tag}</Text>
          </View>
          <TouchableOpacity 
            style={styles.bookmarkWrapper}
            onPress={() => toggleWishlist({
              id: item.id,
              title: item.name,
              price: item.price,
              image: item.image,
              brand: item.brand,
              rating: parseFloat(item.rating)
            })}
          >
            <Ionicons 
              name={isAdded ? "heart" : "heart-outline"} 
              size={18} 
              color={isAdded ? "#E91E63" : "#999"} 
            />
          </TouchableOpacity>
        </View>
        
        <View style={styles.contentContainer}>
          <Text style={styles.brandName}>{item.brand}</Text>
          <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
          
          <View style={styles.priceRow}>
            <Text style={styles.price}>{item.price}</Text>
            <Text style={styles.originalPrice}>{item.originalPrice}</Text>
            <Text style={styles.discount}>{item.discount}</Text>
          </View>
  
          <View style={styles.ratingRow}>
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>{item.rating}</Text>
              <Ionicons name="star" size={10} color="#fff" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Suggested for You</Text>
      </View>

      {/* Grid List */}
      <View style={styles.gridContainer}>
        {staticSuggestedProducts.map((item) => (
          <React.Fragment key={item.id}>
            {renderProduct({ item })}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    paddingTop: 16,
    paddingBottom: 24,
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    overflow: 'hidden',
    marginBottom: 16,
  },
  imageContainer: {
    height: 180,
    width: '100%',
    position: 'relative',
    backgroundColor: '#F9F9F9',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  tagBadge: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderBottomRightRadius: 8,
    zIndex: 1,
  },
  tagText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  bookmarkWrapper: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#fff',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    zIndex: 1,
  },
  contentContainer: {
    padding: 10,
  },
  brandName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#878787',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  productName: {
    fontSize: 13,
    color: '#212121',
    marginBottom: 6,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    flexWrap: 'wrap',
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#212121',
    marginRight: 6,
  },
  originalPrice: {
    fontSize: 12,
    color: '#878787',
    textDecorationLine: 'line-through',
    marginRight: 6,
  },
  discount: {
    fontSize: 12,
    color: '#388E3C', // Flipkart Green
    fontWeight: 'bold',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#388e3c',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  ratingText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
    marginRight: 2,
  },
});

export default SuggestedForYou;
