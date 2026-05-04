import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Use basic sizing, feel free to adjust.  
// Screen dimensions can vary, so percentages can be better, 
// but this is to make it look close to the static image.
const { width, height } = Dimensions.get('window');

const OrderDetailsScreen = () => {
  const navigation: any = useNavigation();

  return (
    <View style={styles.container}>
      {/* --- Top Navbar --- */}
      <View style={styles.navBar}>
        <View style={styles.navLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#000" style={styles.backIcon}/>
          </TouchableOpacity>
          <Text style={styles.navTitle}>Order Details</Text>
        </View>
        <TouchableOpacity style={styles.helpButton}>
          <Text style={styles.helpText}>Help</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* --- Product Title & Image --- */}
        <View style={styles.mainProductSection}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&q=80' }} 
            style={styles.mainProductImage} 
            resizeMode="cover"
          />
          <View style={styles.productDetails}>
            <Text style={styles.productName} numberOfLines={2}>
              AVANSHEE Women Kurta Pant Set ...
            </Text>
            <Text style={styles.productSizeColor}>Size: XL • Color: Beige</Text>
          </View>
        </View>

        {/* --- Order Info --- */}
        <View style={styles.orderStatusContainer}>
          <View style={styles.orderIdRow}>
            <Text style={styles.orderIdLabel}>Order #OD426682916278008100</Text>
            <TouchableOpacity>
                <Icon name="content-copy" size={16} color="#4c6fff" style={styles.copyIcon} />
            </TouchableOpacity>
          </View>

          <View style={styles.statusBox}>
            <View style={styles.statusRow}>
              <View>
                <Text style={styles.deliveredText}>Delivered, Feb 07</Text>
                <Text style={styles.returnPolicyText}>Return policy ended on Feb 17</Text>
              </View>
              <View style={styles.checkCircle}>
                  <Icon name="check-circle" size={20} color="#34A853" />
              </View>
            </View>
          </View>
          
          <TouchableOpacity style={styles.seeAllUpdatesButton}>
             <Text style={styles.seeAllUpdatesText}>See all updates</Text>
          </TouchableOpacity>
        </View>

        {/* --- Rating Section --- */}
        <View style={styles.ratingSection}>
          <Text style={styles.sectionHeader}>Rate your experience</Text>
          <View style={styles.ratingBox}>
            <View style={styles.rateProductRow}>
                <Icon name="assignment" size={18} color="#9E9E9E" style={styles.rateIcon}/>
                <Text style={styles.rateProductText}>Rate the product</Text>
            </View>
            <View style={styles.starRow}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity key={star}>
                        <Icon name="star-border" size={30} color="#757575" style={styles.starIcon}/>
                    </TouchableOpacity>
                ))}
            </View>
          </View>
        </View>

        {/* --- Card Offer --- */}
        <View style={styles.offerCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1445205170230-053b830c6050?w=500&q=80' }}
            style={styles.offerImage}
            resizeMode="cover"
          />
          <View style={styles.offerOverlay}>
              <View style={styles.offerTextCol}>
                  <View style={styles.limitedBadge}>
                    <Icon name="access-time" size={10} color="#000" style={{ marginRight: 2 }} />
                    <Text style={styles.limitedText}>LIMITED PERIOD OFFER</Text>
                  </View>
                  <Text style={styles.offerLine1}>₹500 <Text style={{ textDecorationLine: 'line-through', opacity: 0.7 }}>₹0</Text> joining fee</Text>
                  <Text style={styles.offerLine2}>Get ₹1,000 vouchers*</Text>
                  <TouchableOpacity style={styles.applyNow}>
                      <Text style={styles.applyNowText}>APPLY NOW</Text>
                      <Icon name="arrow-forward" size={14} color="#000"/>
                  </TouchableOpacity>
                  <Text style={styles.termsText}>*T&C Apply | IDFC Bank Credit Card</Text>
              </View>
              <Image 
                source={{uri: 'https://cdn-icons-png.flaticon.com/512/657/657076.png'}}
                style={styles.creditCardImage}
                resizeMode='contain'
              />
          </View>
        </View>

        {/* --- You might also be interested in --- */}
        <View style={styles.crossSellSection}>
          <Text style={styles.sectionHeader}>You might be also interested in</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScrollContent}>
            {[
              { image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80', title: 'Min. 50% Off', cat: 'Palazzos' },
              { image: 'https://images.unsplash.com/photo-1539008835279-43467f5b1335?w=500&q=80', title: 'Min. 50% Off', cat: "Women's Dupattas" },
              { image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&q=80', title: 'Min. 50% Off', cat: "Kurta Sets" },
            ].map((item, index) => (
              <View key={index} style={styles.crossSellItem}>
                <Image source={{ uri: item.image }} style={styles.crossSellItemImage} resizeMode="cover" />
                <Text style={styles.crossSellItemTitle}>{item.title}</Text>
                <Text style={styles.crossSellItemCat}>{item.cat}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* --- You May Also Like --- */}
        <View style={styles.crossSellSection}>
          <Text style={styles.sectionHeader}>You May Also Like...</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScrollContent}>
            {[
              { 
                image: 'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?w=500&q=80',
                name: 'Anni Designer ...', rating: 4.2, reviews: '131', price: '₹654', oldPrice: '₹2,599', off: '74%' 
              },
              { 
                image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&q=80',
                name: 'Wazix Clothi ...', rating: 3.9, reviews: '1491', price: '₹1,418', oldPrice: '₹4,799', off: '70%' 
              },
              { 
                image: 'https://images.unsplash.com/photo-1596755094514-f87e32f6b717?w=500&q=80',
                name: 'Classic Shirt ...', rating: 4.5, reviews: '80', price: '₹999', oldPrice: '₹1,999', off: '50%' 
              }
            ].map((item, index) => (
              <View key={index} style={styles.recSellItem}>
                <Image source={{ uri: item.image }} style={styles.recSellItemImage} resizeMode="cover" />
                <View style={styles.recItemInfo}>
                    <Text style={styles.recItemName} numberOfLines={1}>{item.name}</Text>
                    <View style={styles.recItemRatingRow}>
                        <View style={styles.ratingBadge}>
                            <Text style={styles.ratingText}>{item.rating}</Text>
                            <Icon name="star" size={10} color="#fff" style={styles.tinyStar}/>
                        </View>
                        <Text style={styles.ratingCount}>({item.reviews})</Text>
                    </View>
                    <View style={styles.priceRow}>
                        <Text style={styles.recPrice}>{item.price}</Text>
                        <Text style={styles.recOldPrice}>{item.oldPrice}</Text>
                        <Text style={styles.recOff}>{item.off} off</Text>
                    </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* --- Delivery Details --- */}
        <View style={styles.deliveryDetailsSection}>
          <Text style={styles.sectionHeader}>Delivery details</Text>
          <View style={styles.deliveryAddressCard}>
              <View style={styles.detailRow}>
                  <Icon name="home" size={20} color="#757575" style={styles.detailIcon}/>
                  <Text style={styles.detailText} numberOfLines={1}>Home Harina housing colony besant vihar ...</Text>
              </View>
              <View style={styles.detailRow}>
                  <Icon name="person-outline" size={20} color="#757575" style={styles.detailIcon}/>
                  <Text style={styles.detailText}>Md Salf 8884804358</Text>
              </View>
          </View>
        </View>

        {/* --- Price Details --- */}
        <View style={styles.priceDetailsSection}>
          <Text style={styles.sectionHeader}>Price details</Text>
          <View style={styles.priceTableCard}>
              {[
                  { label: 'Listing price', value: '₹4,689' },
                  { label: 'Special price', value: '₹976', info: true },
                  { label: 'Total fees', value: '₹16', collapsible: true },
                  { label: 'Other discount', value: '-₹30', collapsible: true, isDiscount: true },
              ].map((item, index) => (
                  <View key={index} style={styles.priceTableRow}>
                    <View style={styles.priceTableLabelCol}>
                      <Text style={styles.priceLabel}>{item.label}</Text>
                      {item.info && <Icon name="info-outline" size={14} color="#757575" style={styles.infoIcon} />}
                      {item.collapsible && <Icon name="keyboard-arrow-down" size={20} color="#757575" style={styles.infoIcon} />}
                    </View>
                    <Text style={[styles.priceValue, item.isDiscount && styles.discountValue]}>{item.value}</Text>
                  </View>
              ))}
              
              <View style={styles.separator} />
              
              <View style={styles.totalRow}>
                  <Text style={styles.totalAmountLabel}>Total amount</Text>
                  <Text style={styles.totalAmountValue}>₹962</Text>
              </View>

              <View style={styles.paymentMethodCard}>
                <View style={styles.paymentDetailCol}>
                  <Text style={styles.paymentMethodLabel}>Payment method</Text>
                </View>
                <View style={styles.paymentMethodRow}>
                    <Icon name="account-balance-wallet" size={20} color="#757575" style={styles.paymentIcon}/>
                    <Text style={styles.paymentMethodText}>Cash On Delivery</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.downloadInvoiceButton}>
                 <Icon name="download" size={20} color="#000" style={styles.downloadIcon}/>
                 <Text style={styles.downloadInvoiceText}>Download Invoice</Text>
              </TouchableOpacity>
          </View>
        </View>

        {/* --- Offers Earned --- */}
        <TouchableOpacity style={styles.offersEarnedRow}>
          <View style={styles.offersEarnedLeft}>
            <Icon name="card-membership" size={20} color="#673ab7" style={styles.offersEarnedIcon} />
            <Text style={styles.offersEarnedText}>Offers earned</Text>
          </View>
          <Icon name="keyboard-arrow-down" size={24} color="#757575" />
        </TouchableOpacity>

        {/* --- Order ID Footer --- */}
        <View style={styles.footerOrderIdSection}>
          <Text style={styles.footerOrderIdText}>Order ID: OD426682916278008100</Text>
          <Icon name="content-copy" size={16} color="#4c6fff" style={styles.footerCopyIcon} />
        </View>

        {/* --- Shop more from Flipkart --- */}
        <TouchableOpacity 
          style={styles.shopMoreButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.shopMoreText}>Shop more from Quick delivery app</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navBar: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
    elevation: 2, // for android shadow
  },
  navLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    marginRight: 12,
  },
  navTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
  helpButton: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  helpText: {
    fontSize: 12,
    color: '#000',
    fontWeight: '500',
  },
  scrollContent: {
    paddingBottom: 24, // Added padding at bottom for content clearance
  },
  mainProductSection: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'flex-start',
  },
  mainProductImage: {
    width: 60,
    height: 60,
    borderRadius: 4,
    marginRight: 12,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    color: '#333',
    lineHeight: 18,
    marginBottom: 4,
  },
  productSizeColor: {
    fontSize: 12,
    color: '#757575',
  },
  orderStatusContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  orderIdRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderIdLabel: {
    fontSize: 10,
    color: '#9E9E9E',
  },
  copyIcon: {
    marginLeft: 6,
  },
  statusBox: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  deliveredText: {
    fontSize: 14,
    color: '#34A853',
    fontWeight: '500',
    marginBottom: 2,
  },
  returnPolicyText: {
    fontSize: 10,
    color: '#757575',
  },
  checkCircle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  seeAllUpdatesButton: {
    alignItems: 'center',
    paddingVertical: 6,
  },
  seeAllUpdatesText: {
    fontSize: 12,
    color: '#4c6fff',
    fontWeight: '500',
  },
  ratingSection: {
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212121',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  ratingBox: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    padding: 16,
  },
  rateProductRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  rateIcon: {
    marginRight: 6,
  },
  rateProductText: {
    fontSize: 12,
    color: '#757575',
  },
  starRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  starIcon: {
    marginHorizontal: 4,
  },
  offerCard: {
    position: 'relative',
    height: 160, 
    marginHorizontal: 16,
    marginTop: 3,
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  offerImage: {
    ...StyleSheet.absoluteFillObject,
  },
  offerOverlay: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  offerTextCol: {
    flex: 1,
    justifyContent: 'center',
  },
  limitedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFD700',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    flexWrap: 'nowrap',
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  limitedText: {
    fontSize: 8,
    color: '#000',
    fontWeight: 'bold',
    letterSpacing: 0.2,
    flexShrink: 0,
  },
  offerLine1: {
    fontSize: 16,
    color: '#d61717ff',
    fontWeight: 'bold',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  offerLine2: {
    fontSize: 14,
    color: '#d61717ff',
    fontWeight: '600',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  applyNow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
    marginBottom: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  applyNowText: {
    fontSize: 11,
    color: '#000',
    fontWeight: 'bold',
    marginRight: 4,
  },
  termsText: {
    fontSize: 8,
    color: '#fff',
  },
  creditCardImage: {
    width: 80,
    height: 64,
  },
  crossSellSection: {
    marginBottom: 16,
  },
  horizontalScrollContent: {
    paddingHorizontal: 8,
  },
  crossSellItem: {
    width: 140, 
    backgroundColor: '#fff',
    marginHorizontal: 8,
    borderRadius: 8,
    padding: 0,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginBottom: 10,
  },
  crossSellItemImage: {
    width: '100%',
    height: 120,
    marginBottom: 8,
  },
  crossSellItemTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#212121',
    marginTop: 4,
    paddingHorizontal: 8,
    textAlign: 'center',
  },
  crossSellItemCat: {
    fontSize: 11,
    color: '#757575',
    marginBottom: 10,
    paddingHorizontal: 8,
    textAlign: 'center',
  },
  recSellItem: {
    width: 150, // Adjust item width
    backgroundColor: '#fff',
    marginHorizontal: 8,
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  recSellItemImage: {
    width: '100%',
    height: 100,
  },
  recItemInfo: {
    padding: 8,
  },
  recItemName: {
    fontSize: 11,
    color: '#333',
    marginBottom: 4,
  },
  recItemRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#34A853',
    borderRadius: 3,
    paddingHorizontal: 3,
    paddingVertical: 1,
    marginRight: 4,
  },
  ratingText: {
    fontSize: 9,
    color: '#fff',
    fontWeight: 'bold',
  },
  tinyStar: {
    marginLeft: 2,
  },
  ratingCount: {
    fontSize: 9,
    color: '#757575',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  recPrice: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 4,
  },
  recOldPrice: {
    fontSize: 9,
    color: '#757575',
    textDecorationLine: 'line-through',
    marginRight: 4,
  },
  recOff: {
    fontSize: 9,
    color: '#34A853',
    fontWeight: '500',
  },
  deliveryDetailsSection: {
    marginBottom: 16,
  },
  deliveryAddressCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    padding: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailIcon: {
    marginRight: 12,
  },
  detailText: {
    fontSize: 12,
    color: '#333',
    flex: 1,
  },
  priceDetailsSection: {
    marginBottom: 16,
  },
  priceTableCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    padding: 16,
  },
  priceTableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  priceTableLabelCol: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 12,
    color: '#757575',
    marginRight: 4,
  },
  infoIcon: {
    marginLeft: 2,
  },
  priceValue: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
  discountValue: {
    color: '#34A853',
  },
  separator: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalAmountLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#212121',
  },
  totalAmountValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  paymentMethodCard: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: 1,
      borderColor: '#e0e0e0',
      borderRadius: 8,
      padding: 12,
      marginBottom: 16,
  },
  paymentDetailCol:{
    flex:1,
  },
  paymentMethodRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentMethodLabel:{
    fontSize: 12,
    color: '#757575',
  },
  paymentMethodText:{
    fontSize: 12,
    color: '#333',
  },
  paymentIcon: {
    marginRight: 8,
  },
  downloadInvoiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  downloadIcon: {
    marginRight: 8,
  },
  downloadInvoiceText: {
    fontSize: 12,
    color: '#000',
    fontWeight: '500',
  },
  offersEarnedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  offersEarnedLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  offersEarnedIcon: {
    marginRight: 8,
  },
  offersEarnedText: {
    fontSize: 12,
    color: '#212121',
  },
  footerOrderIdSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  footerOrderIdText: {
    fontSize: 10,
    color: '#9E9E9E',
  },
  footerCopyIcon: {
    marginLeft: 6,
  },
  shopMoreButton: {
    height: 44,
    marginHorizontal: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#4c6fff',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shopMoreText: {
    fontSize: 14,
    color: '#4c6fff',
    fontWeight: '500',
  },
});

export default OrderDetailsScreen;