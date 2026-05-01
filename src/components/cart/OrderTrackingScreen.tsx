import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

// Use basic sizing, feel free to adjust.  
// Screen dimensions can vary, so percentages can be better, 
// but this is to make it look close to the static image.
const { width, height } = Dimensions.get('window');

const OrderTrackingScreen = () => {
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
            source={{ uri: 'https://i.pinimg.com/736x/2c/31/58/2c3158f968600cd956382029788f5f4b.jpg' }} 
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
            source={{ uri: 'https://i.pinimg.com/736x/8f/c9/2e/8fc92e2b9c7b9c766e4e08c8eff6eeda.jpg' }}
            style={styles.offerImage}
            resizeMode="cover"
          />
          <View style={styles.offerOverlay}>
              <View style={styles.offerTextCol}>
                  <View style={styles.limitedBadge}><Text style={styles.limitedText}>LIMITED</Text></View>
                  <Text style={styles.offerLine1}>₹500 ₹0 joining fee</Text>
                  <Text style={styles.offerLine2}>Get ₹1,000 vouchers*</Text>
                  <TouchableOpacity style={styles.applyNow}>
                      <Text style={styles.applyNowText}>Apply now</Text>
                      <Icon name="chevron-right" size={16} color="#000"/>
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
              { image: 'https://i.pinimg.com/736x/88/54/2e/88542e74e6459c7f99999aee96a9990e.jpg', title: 'Min. 50% Off', cat: 'Palazzos' },
              { image: 'https://i.pinimg.com/736x/21/d9/3e/21d93ebc40ef904bb978d386440268ec.jpg', title: 'Min. 50% Off', cat: "Women's Dupattas" },
              { image: 'https://i.pinimg.com/736x/bd/d4/0b/bdd40ba235882650ee451556948a3350.jpg', title: 'Min. 50% Off', cat: "Kurta Sets" },
            ].map((item, index) => (
              <View key={index} style={styles.crossSellItem}>
                <Image source={{ uri: item.image }} style={styles.crossSellItemImage} resizeMode="contain" />
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
                image: 'https://i.pinimg.com/736x/d6/00/be/d600becc18a5df9b64c7f074a38b5f3d.jpg',
                name: 'Anni Designer ...', rating: 4.2, reviews: '131', price: '₹654', oldPrice: '₹2,599', off: '74%' 
              },
              { 
                image: 'https://i.pinimg.com/736x/95/8e/9c/958e9c680373ae03e6f98ef477589d97.jpg',
                name: 'Wazix Clothi ...', rating: 3.9, reviews: '1491', price: '₹1,418', oldPrice: '₹4,799', off: '70%' 
              },
              { 
                image: 'https://i.pinimg.com/736x/2c/31/58/2c3158f968600cd956382029788f5f4b.jpg',
                name: 'Some other ...', rating: 4.5, reviews: '80', price: '₹999', oldPrice: '₹1,999', off: '50%' 
              }
            ].map((item, index) => (
              <View key={index} style={styles.recSellItem}>
                <Image source={{ uri: item.image }} style={styles.recSellItemImage} resizeMode="contain" />
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
          <Text style={styles.shopMoreText}>Shop more from 30 min delivery app</Text>
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
    height: 140, // Adjust based on background image aspect ratio
    marginHorizontal: 16,
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
    backgroundColor: '#f6be1c',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  limitedText: {
    fontSize: 8,
    color: '#000',
    fontWeight: 'bold',
  },
  offerLine1: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
    marginBottom: 2,
  },
  offerLine2: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
    marginBottom: 10,
  },
  applyNow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6be1c',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  applyNowText: {
    fontSize: 10,
    color: '#000',
    fontWeight: '500',
    marginRight: 2,
  },
  termsText: {
    fontSize: 8,
    color: '#fff',
  },
  creditCardImage: {
    width: 100,
    height: 80,
  },
  crossSellSection: {
    marginBottom: 16,
  },
  horizontalScrollContent: {
    paddingHorizontal: 8,
  },
  crossSellItem: {
    width: 130, // Adjust item width
    backgroundColor: '#fff',
    marginHorizontal: 8,
    borderRadius: 4,
    padding: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  crossSellItemImage: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  crossSellItemTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  crossSellItemCat: {
    fontSize: 10,
    color: '#757575',
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

export default OrderTrackingScreen;