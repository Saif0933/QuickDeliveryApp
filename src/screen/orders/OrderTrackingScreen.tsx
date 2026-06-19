import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Platform,
  Dimensions,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const orderItemsList = [
  {
    id: '1',
    brand: 'Roadster',
    name: 'Men Olive Green Casual Shirt',
    size: 'M',
    qty: 1,
    price: '₹1,499',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&auto=format&fit=crop&q=80',
    status: 'Paid',
  },
  {
    id: '2',
    brand: 'HRX by Hrithik Roshan',
    name: 'Men Slim Fit Jeans',
    size: '32',
    qty: 1,
    price: '₹1,999',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&auto=format&fit=crop&q=80',
    status: 'Paid',
  },
  {
    id: '3',
    brand: 'Nike',
    name: 'Men Black Hoodie',
    size: 'M',
    qty: 1,
    price: '₹2,699',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&auto=format&fit=crop&q=80',
    status: 'Paid',
  },
];

export default function OrderTrackingScreen({ route, navigation }: any) {
  const { fromCheckout, order } = route?.params || {};
  const displayItems = order?.items && order.items.length > 0 ? order.items : orderItemsList;
  const trackingOrderId = order?.id || 'ORD12548765';

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (fromCheckout) {
          navigation.navigate('Orders');
          return true;
        }
        return false;
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => subscription.remove();
    }, [fromCheckout, navigation])
  );

  const handleBack = () => {
    if (fromCheckout) {
      navigation.navigate('Orders');
    } else {
      navigation.goBack();
    }
  };
  
  const handleCopyTrackingId = () => {
    Alert.alert('Copied', 'Tracking ID copied to clipboard!');
  };

  const handleCallPartner = () => {
    Alert.alert('Calling...', 'Dialing Ramesh Yadav: +91 98765 43210');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header matching mockup */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBack} onPress={handleBack}>
          <MaterialIcons name="chevron-left" size={28} color="#0f172a" />
        </TouchableOpacity>
        <View style={styles.headerTitleWrapper}>
          <Text style={styles.headerTitle}>Order Tracking</Text>
          <Text style={styles.headerSubtitle}>Order ID: #{trackingOrderId}</Text>
        </View>
        <TouchableOpacity style={styles.helpButton}>
          <MaterialIcons name="headset-mic" size={20} color="#0f172a" />
          <Text style={styles.helpButtonText}>Help</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Estimated Delivery Box Banner */}
        <View style={styles.deliveryStatusCard}>
          <View style={styles.deliveryIconBox}>
            <MaterialIcons name="drafts" size={24} color="#16a34a" />
          </View>
          <View style={styles.deliveryStatusInfo}>
            <Text style={styles.deliveryLabel}>Estimated Delivery</Text>
            <Text style={styles.deliveryDateText}>20 May, 2025 <Text style={{ fontSize: 11, fontWeight: 'normal', color: '#64748b' }}>By 8 PM</Text></Text>
            <Text style={styles.onTimeText}>On Time</Text>
          </View>
          {/* Map track route illustration on right */}
          <View style={styles.mapIllustrationContainer}>
            <View style={styles.dottedPathLine} />
            <MaterialIcons name="location-on" size={24} color="#16a34a" style={styles.mapPinIcon} />
            <MaterialIcons name="local-shipping" size={20} color="#16a34a" style={styles.truckIcon} />
          </View>
        </View>

        {/* Timeline Horizontal Progress Steps */}
        <View style={styles.timelineCard}>
          <View style={styles.timelineStepsWrapper}>
            {/* Step 1: Confirmed */}
            <View style={styles.timelineStep}>
              <View style={[styles.timelineDot, styles.timelineDotDone]}>
                <MaterialIcons name="check" size={12} color="#ffffff" />
              </View>
              <Text style={[styles.timelineLabel, styles.timelineLabelDone]}>Order Confirmed</Text>
              <Text style={styles.timelineDate}>15 May</Text>
            </View>

            <View style={[styles.timelineLine, styles.timelineLineDone]} />

            {/* Step 2: Packed */}
            <View style={styles.timelineStep}>
              <View style={[styles.timelineDot, styles.timelineDotDone]}>
                <MaterialIcons name="check" size={12} color="#ffffff" />
              </View>
              <Text style={[styles.timelineLabel, styles.timelineLabelDone]}>Packed</Text>
              <Text style={styles.timelineDate}>16 May</Text>
            </View>

            <View style={[styles.timelineLine, styles.timelineLineDone]} />

            {/* Step 3: Shipped */}
            <View style={styles.timelineStep}>
              <View style={[styles.timelineDot, styles.timelineDotCurrent]}>
                <MaterialIcons name="local-shipping" size={12} color="#ffffff" />
              </View>
              <Text style={[styles.timelineLabel, styles.timelineLabelCurrent]}>Shipped</Text>
              <Text style={styles.timelineDate}>17 May</Text>
            </View>

            <View style={styles.timelineLine} />

            {/* Step 4: Out for Delivery */}
            <View style={styles.timelineStep}>
              <View style={styles.timelineDot}>
                <MaterialIcons name="local-post-office" size={12} color="#94a3b8" />
              </View>
              <Text style={styles.timelineLabel}>Out for Delivery</Text>
              <Text style={styles.timelineDate}>17 May</Text>
            </View>

            <View style={styles.timelineLine} />

            {/* Step 5: Delivered */}
            <View style={styles.timelineStep}>
              <View style={styles.timelineDot}>
                <MaterialIcons name="assignment-turned-in" size={12} color="#94a3b8" />
              </View>
              <Text style={styles.timelineLabel}>Delivered</Text>
              <Text style={styles.timelineDate}>Pending</Text>
            </View>
          </View>
        </View>

        {/* Info Banner Message Card */}
        <View style={styles.messageBanner}>
          <View style={styles.messageIconCircle}>
            <MaterialIcons name="local-shipping" size={20} color="#7c3aed" />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.messageTitle}>Your order is on the way!</Text>
            <Text style={styles.messageSubtitle}>
              It has been shipped and is expected to be delivered soon.
            </Text>
          </View>
          <TouchableOpacity style={styles.viewOnMapButton}>
            <Text style={styles.viewOnMapText}>View on Map</Text>
            <MaterialIcons name="near-me" size={14} color="#7c3aed" style={{ marginLeft: 4 }} />
          </TouchableOpacity>
        </View>

        {/* Delivery Partner Details Section */}
        <View style={styles.partnerSection}>
          <View style={styles.partnerHeader}>
            <Text style={styles.partnerTitle}>Delivery Partner</Text>
            <Text style={styles.partnerLogoText}>ekart</Text>
            <View style={{ flex: 1 }} />
            <TouchableOpacity style={styles.trackingIdRow} onPress={handleCopyTrackingId}>
              <Text style={styles.trackingIdText}>Tracking ID: EK134556789IN</Text>
              <MaterialIcons name="content-copy" size={12} color="#64748b" style={{ marginLeft: 4 }} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.partnerDetailsRow}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' }} 
              style={styles.partnerAvatar} 
            />
            <View style={styles.partnerNameBox}>
              <View style={styles.partnerNameRow}>
                <Text style={styles.partnerName}>Ramesh Yadav</Text>
                <View style={styles.ratingBadge}>
                  <MaterialIcons name="star" size={12} color="#f59e0b" style={{ marginRight: 2 }} />
                  <Text style={styles.ratingText}>4.8</Text>
                </View>
              </View>
              <Text style={styles.partnerPhone}>+91 98765 43210</Text>
            </View>
            <TouchableOpacity style={styles.callButton} onPress={handleCallPartner}>
              <MaterialIcons name="call" size={16} color="#16a34a" style={{ marginRight: 4 }} />
              <Text style={styles.callButtonText}>Call</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Order Items */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Order Items ({displayItems.length})</Text>
          <TouchableOpacity style={styles.viewDetailsLink}>
            <Text style={styles.viewDetailsLinkText}>View Details</Text>
            <MaterialIcons name="chevron-right" size={14} color="#0f172a" />
          </TouchableOpacity>
        </View>

        <View style={styles.itemsCardBox}>
          {displayItems.map((item: any, index: number) => {
            const itemPrice = typeof item.price === 'number' 
              ? `₹${item.price.toLocaleString('en-IN')}` 
              : item.price;
            const itemQuantity = item.quantity || item.qty || 1;
            const itemBrand = item.brand || 'Clothing';
            const itemSize = item.size || 'M';
            const itemStatus = item.status || 'Paid';

            return (
              <View key={item.id}>
                <View style={styles.itemRow}>
                  <Image source={{ uri: item.image }} style={styles.itemImage} />
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemBrand}>{itemBrand}</Text>
                    <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                    <Text style={styles.itemVariant}>Size: {itemSize}  •  Qty: {itemQuantity}</Text>
                  </View>
                  <View style={styles.itemRightPrice}>
                    <Text style={styles.itemPrice}>{itemPrice}</Text>
                    <Text style={styles.itemPaidStatus}>{itemStatus}</Text>
                  </View>
                </View>
                {index < displayItems.length - 1 && <View style={styles.divider} />}
              </View>
            );
          })}
        </View>

        {/* Delivery Address Card */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <TouchableOpacity>
            <Text style={styles.changeLinkText}>Change</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.addressCard}>
          <View style={styles.locationPinBox}>
            <MaterialIcons name="location-on" size={20} color="#16a34a" />
          </View>
          <View style={styles.addressInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.addressName}>Rohit Sharma</Text>
              <View style={styles.homeBadge}>
                <Text style={styles.homeBadgeText}>HOME</Text>
              </View>
            </View>
            <Text style={styles.addressText}>
              123, Green Park Society, Sector 45, Gurugram, Haryana - 122003
            </Text>
            <Text style={styles.phoneText}>+91 98765 43210</Text>
          </View>
        </View>

        {/* Footer Badges */}
        <View style={styles.trustRow}>
          <View style={styles.trustItem}>
            <MaterialIcons name="verified" size={18} color="#0f172a" />
            <Text style={styles.trustText}>100% Original</Text>
          </View>
          <View style={styles.trustItem}>
            <MaterialIcons name="cached" size={18} color="#0f172a" />
            <Text style={styles.trustText}>Easy Returns</Text>
          </View>
          <View style={styles.trustItem}>
            <MaterialIcons name="security" size={18} color="#0f172a" />
            <Text style={styles.trustText}>Secure Payment</Text>
          </View>
          <View style={styles.trustItem}>
            <MaterialIcons name="headset-mic" size={18} color="#0f172a" />
            <Text style={styles.trustText}>Help Center</Text>
          </View>
        </View>

      </ScrollView>
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
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#f1f5f9',
    backgroundColor: '#ffffff',
  },
  headerBack: {
    padding: 4,
  },
  headerTitleWrapper: {
    flex: 1,
    marginLeft: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 1,
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  helpButtonText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0f172a',
    marginLeft: 4,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 40,
  },
  deliveryStatusCard: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    backgroundColor: '#f8fafc',
    padding: 14,
    marginBottom: 20,
    alignItems: 'center',
  },
  deliveryIconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#dcfce7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deliveryStatusInfo: {
    flex: 1,
    marginLeft: 12,
  },
  deliveryLabel: {
    fontSize: 10,
    color: '#94a3b8',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  deliveryDateText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#0f172a',
    marginTop: 2,
  },
  onTimeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#16a34a',
    marginTop: 2,
  },
  mapIllustrationContainer: {
    width: 90,
    height: 60,
    position: 'relative',
    justifyContent: 'center',
  },
  dottedPathLine: {
    position: 'absolute',
    left: 10,
    right: 15,
    height: 1,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#16a34a',
    borderRadius: 1,
  },
  mapPinIcon: {
    position: 'absolute',
    right: 6,
    top: 6,
  },
  truckIcon: {
    position: 'absolute',
    left: 6,
    bottom: 6,
  },
  timelineCard: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  timelineStepsWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  timelineStep: {
    alignItems: 'center',
    width: 62,
  },
  timelineDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#cbd5e1',
  },
  timelineDotDone: {
    backgroundColor: '#16a34a',
    borderColor: '#16a34a',
  },
  timelineDotCurrent: {
    backgroundColor: '#16a34a',
    borderColor: '#16a34a',
  },
  timelineLabel: {
    fontSize: 8,
    color: '#94a3b8',
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
  timelineLabelDone: {
    color: '#16a34a',
    fontWeight: '800',
  },
  timelineLabelCurrent: {
    color: '#16a34a',
    fontWeight: '800',
  },
  timelineDate: {
    fontSize: 7,
    color: '#94a3b8',
    marginTop: 2,
  },
  timelineLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#cbd5e1',
    marginTop: 11,
  },
  timelineLineDone: {
    backgroundColor: '#16a34a',
  },
  messageBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f3e8ff',
    borderRadius: 16,
    backgroundColor: '#faf5ff',
    padding: 12,
    marginBottom: 20,
  },
  messageIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f3e8ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0f172a',
  },
  messageSubtitle: {
    fontSize: 10,
    color: '#64748b',
    marginTop: 2,
    lineHeight: 14,
  },
  viewOnMapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#c084fc',
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: '#ffffff',
  },
  viewOnMapText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#7c3aed',
  },
  partnerSection: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    padding: 14,
    marginBottom: 20,
  },
  partnerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    paddingBottom: 10,
    marginBottom: 10,
  },
  partnerTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0f172a',
  },
  partnerLogoText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#1e3a8a',
    marginLeft: 6,
    fontStyle: 'italic',
  },
  trackingIdRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trackingIdText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#64748b',
  },
  partnerDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  partnerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f8fafc',
  },
  partnerNameBox: {
    flex: 1,
    marginLeft: 12,
  },
  partnerNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  partnerName: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0f172a',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 6,
  },
  ratingText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#0f172a',
  },
  partnerPhone: {
    fontSize: 10,
    color: '#64748b',
    marginTop: 2,
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
    borderWidth: 1,
    borderColor: '#bbf7d0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  callButtonText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#16a34a',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0f172a',
  },
  viewDetailsLink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewDetailsLinkText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748b',
  },
  itemsCardBox: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginBottom: 20,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  itemImage: {
    width: 44,
    height: 52,
    borderRadius: 8,
    backgroundColor: '#f8fafc',
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  itemBrand: {
    fontSize: 8,
    fontWeight: '800',
    color: '#94a3b8',
    textTransform: 'uppercase',
  },
  itemName: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0f172a',
    marginTop: 1,
  },
  itemVariant: {
    fontSize: 10,
    color: '#64748b',
    marginTop: 2,
  },
  itemRightPrice: {
    alignItems: 'flex-end',
  },
  itemPrice: {
    fontSize: 12,
    fontWeight: '900',
    color: '#0f172a',
  },
  itemPaidStatus: {
    fontSize: 10,
    fontWeight: '700',
    color: '#16a34a',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#f1f5f9',
  },
  changeLinkText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#3b82f6',
  },
  addressCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    padding: 14,
    marginBottom: 20,
  },
  locationPinBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0fdf4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressInfo: {
    flex: 1,
    marginLeft: 12,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0f172a',
  },
  homeBadge: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 6,
  },
  homeBadgeText: {
    color: '#16a34a',
    fontSize: 8,
    fontWeight: '800',
  },
  addressText: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 4,
    lineHeight: 15,
  },
  phoneText: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 2,
  },
  trustRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingBottom: 20,
  },
  trustItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  trustText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#0f172a',
    marginLeft: 6,
  },
});
