import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SuggestedForYou from '../../screen/SuggestedForYou';

// --- Types ---
interface ProductProps {
  title: string;
  price: string;
  originalPrice: string;
  discount: string;
  image: string;
  isHotDeal?: boolean;
  outOfStock?: boolean;
  deliveryDate?: string;
}

const CartScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      {/* Header */}
      <View style={styles.header}>
        <Icon name="arrow-left" size={24} color="#000" />
        <Text style={styles.headerTitle}>My Cart</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Address Section */}
        <View style={styles.addressSection}>
          <View style={styles.addressInfo}>
            <Text style={styles.deliverToText}>
              Deliver to: <Text style={styles.boldText}>User, 834002</Text>
              <View style={styles.homeBadge}><Text style={styles.homeBadgeText}>HOME</Text></View>
            </Text>
            <Text style={styles.addressSubText} numberOfLines={1}>
              Pharma housing colony, bariatu...
            </Text>
          </View>
          <TouchableOpacity style={styles.changeBtn}>
            <Text style={styles.changeBtnText}>Change</Text>
          </TouchableOpacity>
        </View>

        {/* Product Items */}
        <ProductItem
          isHotDeal
          title="Men Slim Fit Casual Shirt"
          price="₹599"
          originalPrice="₹1,199"
          discount="50% off"
          deliveryDate="Delivery by May 7, Thu"
          image="https://images.unsplash.com/photo-1596755094514-f87e32f6b717?w=300&q=80"
        />

        <ProductItem
          title="Women High-Rise Wide Jeans"
          price="₹1,299"
          originalPrice="₹2,499"
          discount="48% off"
          deliveryDate="Delivery by May 8, Wed"
          image="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&q=80"
        />

        {/* Out of Stock Section */}
        <ProductItem
          outOfStock
          title="Men Solid Casual Jacket"
          price=""
          originalPrice=""
          discount=""
          image="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&q=80"
        />

        {/* Price Details Card */}
        <View style={styles.priceDetailsCard}>
          <Text style={styles.priceTitle}>Price Details</Text>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>MRP</Text>
            <Text style={styles.priceValue}>₹15,543</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Fees</Text>
            <Text style={styles.priceValue}>₹7</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Discounts</Text>
            <Text style={[styles.priceValue, {color: '#388E3C'}]}>−₹10,501</Text>
          </View>
          <View style={[styles.priceRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalLabel}>₹4,599</Text>
          </View>
          <View style={styles.savingsBanner}>
            <Text style={styles.savingsText}>You'll save ₹10,884 on this order!</Text>
          </View>
        </View>

        {/* Suggested For You Section */}
        <SuggestedForYou />

        <View style={styles.footerInfo}>
          <Icon name="shield-check" size={18} color="#878787" />
          <Text style={styles.footerText}>Safe and secure payments. Easy returns. 100% Authentic products.</Text>
        </View>
      </ScrollView>

    </SafeAreaView>
  );
};

// --- Sub Components ---

const ProductItem: React.FC<ProductProps> = ({ isHotDeal, outOfStock, title, price, originalPrice, discount, deliveryDate, image }) => (
  <View style={styles.productCard}>
    {isHotDeal && <Text style={styles.hotDealLabel}>Hot Deal</Text>}
    <View style={styles.productMain}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: image }}
          
          style={styles.productImg}
          resizeMode="cover"
        />
        {!outOfStock && (
          <View style={styles.qtyPicker}>
            <Text style={styles.qtyText}>Qty: 1</Text>
            <Icon name="menu-down" size={20} color="#000" />
          </View>
        )}
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productTitle} numberOfLines={2}>{title}</Text>
        <Text style={styles.ratingText}><Icon name="star" color="green" size={12}/> 4.2 (12,450)</Text>

        {outOfStock ? (
          <View style={styles.oosContainer}>
            <Text style={styles.oosText}>Out Of Stock</Text>
            <TouchableOpacity><Text style={styles.findSimilar}>Find Similar</Text></TouchableOpacity>
          </View>
        ) : (
          <View style={styles.priceContainer}>
            <Text style={styles.discountText}>{discount}</Text>
            <Text style={styles.strikePrice}>{originalPrice}</Text>
            <Text style={styles.mainPrice}>{price}</Text>
          </View>
        )}
      </View>
    </View>
    {deliveryDate && <Text style={styles.deliveryText}>{deliveryDate}</Text>}

    <View style={styles.actionRow}>
      <ActionButton icon="delete-outline" label="Remove" />
      <ActionButton icon="heart-outline" label="Save for later" />
      <ActionButton icon="lightning-bolt" label="Buy this now" />
    </View>
  </View>
);

const ActionButton = ({ icon, label }: any) => (
  <TouchableOpacity style={styles.actionBtn}>
    <Icon name={icon} size={18} color="#666" />
    <Text style={styles.actionLabel}>{label}</Text>
  </TouchableOpacity>
);


// --- Styles ---

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1F3F6' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderColor: '#EEE'
  },
  headerTitle: { fontSize: 18, fontWeight: '500', marginLeft: 20 },
  addressSection: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 15,
    marginVertical: 8,
    alignItems: 'center'
  },
  addressInfo: { flex: 1 },
  deliverToText: { fontSize: 13 },
  boldText: { fontWeight: 'bold' },
  homeBadge: { backgroundColor: '#EEE', paddingHorizontal: 4, borderRadius: 2, marginLeft: 5 },
  homeBadgeText: { fontSize: 10, color: '#666' },
  addressSubText: { color: '#878787', fontSize: 12, marginTop: 4 },
  changeBtn: { borderWidth: 1, borderColor: '#EEE', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 4 },
  changeBtnText: { color: '#2874F0', fontWeight: 'bold', fontSize: 12 },
  productCard: { backgroundColor: '#FFF', padding: 15, marginBottom: 8 },
  hotDealLabel: { color: '#388E3C', fontSize: 10, fontWeight: 'bold', marginBottom: 10 },
  productMain: { flexDirection: 'row' },
  imageContainer: { alignItems: 'center' },
  productImg: { width: 90, height: 90, borderRadius: 6, backgroundColor: '#F5F5F5' },
  qtyPicker: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#EEE', paddingHorizontal: 5, marginTop: 10, borderRadius: 2 },
  qtyText: { fontSize: 12 },
  productInfo: { flex: 1, marginLeft: 15 },
  productTitle: { fontSize: 14, color: '#212121' },
  ratingText: { fontSize: 12, color: '#878787', marginVertical: 4 },
  priceContainer: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' },
  discountText: { color: '#388E3C', fontWeight: 'bold', fontSize: 13 },
  strikePrice: { textDecorationLine: 'line-through', color: '#878787', marginHorizontal: 6, fontSize: 13 },
  mainPrice: { fontSize: 15, fontWeight: 'bold' },
  oosContainer: { marginTop: 5 },
  oosText: { color: '#D32F2F', fontWeight: 'bold' },
  findSimilar: { color: '#2874F0', fontSize: 12, marginTop: 4 },
  deliveryText: { fontSize: 12, color: '#212121', marginTop: 15 },
  actionRow: { flexDirection: 'row', borderTopWidth: 1, borderColor: '#F0F0F0', marginTop: 15, paddingTop: 10 },
  actionBtn: { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  actionLabel: { fontSize: 12, color: '#666', marginLeft: 5 },
  priceDetailsCard: { backgroundColor: '#FFF', padding: 15, marginTop: 8 },
  priceTitle: { fontSize: 16, fontWeight: 'bold', color: '#878787', marginBottom: 15 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  priceLabel: { color: '#212121' },
  priceValue: { color: '#212121' },
  totalRow: { borderTopWidth: 1, borderStyle: 'dashed', borderColor: '#EEE', paddingTop: 15, marginTop: 5 },
  totalLabel: { fontSize: 16, fontWeight: 'bold' },
  savingsBanner: { backgroundColor: '#F0F5FF', padding: 10, borderRadius: 4, marginTop: 10 },
  savingsText: { color: '#388E3C', fontWeight: 'bold', textAlign: 'center' },
  footerInfo: { padding: 20, flexDirection: 'row', alignItems: 'center' },
  footerText: { color: '#878787', fontSize: 11, marginLeft: 10, flex: 1 },
});

export default CartScreen;