

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../theme/color';

// --- MOCK DATA ---
const ORDER_DATA = {
  id: '#7366397495',
  restaurant: 'H&M Official Store',
  location: 'Kokar, Ranchi',
  image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=200&q=80',
  items: [
    {
      name: '1 x Summer Casual T-Shirt',
      desc: 'Size M, Yellow.',
      price: 249,
      isVeg: false,
    },
  ],
  bill: {
    itemTotal: 249.00,
    gst: 26.18,
    delivery: 32.00,
    platform: 12.50,
    grandTotal: 319.68,
    discount: 74.70,
    paid: 244.98,
  },
  customer: {
    name: 'Saif',
    phone: '933480XXXX',
    paymentMethod: 'UPI',
    date: 'October 11, 2025 at 2:54 PM',
    address: 'balpan hospital 4 floor, 4 Floor, Balpan Children Hospital, Booty More Rd, ne...',
  },
};

const OrderDetailsScreen = () => {
  // FIXED: Typed navigation as any to resolve "Argument of type 'string' is not assignable to parameter of type 'never'"
  const navigation = useNavigation<any>();

  // Actions
  const handleCopyId = () => Alert.alert('Copied', `Order ID ${ORDER_DATA.id} copied to clipboard.`);
  const handleCall = () => Alert.alert('Call', `Calling ${ORDER_DATA.restaurant}...`);
  const handleDownload = () => Alert.alert('Download', 'Downloading invoice...');
  const handleSupport = () => Alert.alert('Support', 'Opening support chat...');

  // --- REUSABLE COMPONENTS ---

  const VegIcon = () => (
    <View style={styles.vegIconBorder}>
      <Ionicons name="shirt-outline" size={10} color={COLORS.highlight} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* --- HEADER --- */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Order Details</Text>
        </View>
        <TouchableOpacity style={styles.supportBtn} onPress={() => navigation.navigate('SupportScreen')}>
          <MaterialCommunityIcons name="headphones" size={16} color={COLORS.primary} />
          <Text style={styles.supportText}>Support</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* --- STATUS CARD --- */}
        <View style={styles.card}>
          <View style={styles.statusRow}>
            <View style={styles.iconContainer}>
               {/* Updated bag background to primary to match theme */}
               <MaterialCommunityIcons name="shopping" size={20} color={COLORS.white} style={{backgroundColor: COLORS.primary, padding: 4, borderRadius: 4}} />
            </View>
            <Text style={styles.statusText}>Order was delivered</Text>
          </View>
        </View>

        {/* --- RESTAURANT & ITEM CARD --- */}
        <View style={styles.card}>
          {/* Restaurant Header */}
          <View style={styles.restaurantHeader}>
            <Image source={{ uri: ORDER_DATA.image }} style={styles.resImage} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.resName}>{ORDER_DATA.restaurant}</Text>
              <Text style={styles.resLoc}>{ORDER_DATA.location}</Text>
            </View>
            <TouchableOpacity onPress={handleCall} style={styles.callBtn}>
              <Ionicons name="call-outline" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          {/* Order ID */}
          <View style={styles.orderIdRow}>
            <Text style={styles.orderIdLabel}>Order ID: </Text>
            <Text style={styles.orderIdText}>{ORDER_DATA.id}</Text>
            <TouchableOpacity onPress={handleCopyId} style={{ marginLeft: 6 }}>
              <Ionicons name="copy-outline" size={14} color={COLORS.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* Items */}
          {ORDER_DATA.items.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <View style={{ flexDirection: 'row', flex: 1 }}>
                <View style={{ marginTop: 4 }}>{item.isVeg && <VegIcon />}</View>
                <View style={{ marginLeft: 8, flex: 1 }}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemDesc}>{item.desc}</Text>
                </View>
              </View>
              <Text style={styles.itemPrice}>₹{item.price}</Text>
            </View>
          ))}
        </View>

        {/* --- BILL SUMMARY CARD --- */}
        <View style={[styles.card, { paddingBottom: 0, overflow: 'hidden' }]}>
          <View style={styles.cardHeaderRow}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Ionicons name="receipt-outline" size={18} color={COLORS.textSecondary} style={{marginRight: 6}} />
                <Text style={styles.cardTitle}>Bill Summary</Text>
            </View>
            <TouchableOpacity onPress={handleDownload} style={styles.downloadBtnSmall}>
                <Ionicons name="download-outline" size={18} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          {/* Bill Details */}
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Item total</Text>
            <Text style={styles.billValue}>₹{ORDER_DATA.bill.itemTotal.toFixed(2)}</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>GST & store packaging</Text>
            <Text style={styles.billValue}>₹{ORDER_DATA.bill.gst.toFixed(2)}</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Delivery partner fee</Text>
            <Text style={styles.billValue}>₹{ORDER_DATA.bill.delivery.toFixed(2)}</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Platform fee</Text>
            <Text style={styles.billValue}>₹{ORDER_DATA.bill.platform.toFixed(2)}</Text>
          </View>

          <View style={styles.divider} />

          {/* Totals */}
          <View style={styles.billRow}>
            <Text style={styles.grandTotalLabel}>Grand total</Text>
            <Text style={styles.grandTotalValue}>₹{ORDER_DATA.bill.grandTotal.toFixed(2)}</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.couponLabel}>Coupon applied - TRYNEW</Text>
            <Text style={styles.couponValue}>- ₹{ORDER_DATA.bill.discount.toFixed(2)}</Text>
          </View>
          
          <View style={[styles.billRow, { marginTop: 8, marginBottom: 16 }]}>
            <Text style={styles.paidLabel}>Paid</Text>
            <Text style={styles.paidValue}>₹{ORDER_DATA.bill.paid.toFixed(2)}</Text>
          </View>

          {/* Savings Footer */}
          <View style={styles.savingsFooter}>
            <MaterialCommunityIcons name="party-popper" size={16} color={COLORS.primary} style={{ marginRight: 6 }} />
            <Text style={styles.savingsText}>You saved ₹{ORDER_DATA.bill.discount.toFixed(2)} on this order!</Text>
          </View>
        </View>

        {/* --- CUSTOMER INFO CARD --- */}
        <View style={styles.card}>
            {/* User */}
            <View style={styles.infoRow}>
                <View style={styles.avatar}>
                    <Ionicons name="person" size={20} color={COLORS.muted} />
                </View>
                <View>
                    <Text style={styles.infoTitle}>{ORDER_DATA.customer.name}</Text>
                    <Text style={styles.infoSub}>{ORDER_DATA.customer.phone}</Text>
                </View>
            </View>

             <View style={styles.divider} />

            {/* Payment Method */}
            <View style={styles.infoRow}>
                 <Ionicons name="wallet-outline" size={20} color={COLORS.textSecondary} style={{marginRight: 12}} />
                <View>
                    <Text style={styles.infoTitle}>Payment method</Text>
                    <Text style={styles.infoSub}>Paid via: {ORDER_DATA.customer.paymentMethod}</Text>
                </View>
            </View>

            {/* Payment Date */}
            <View style={styles.infoRow}>
                 <Ionicons name="calendar-outline" size={20} color={COLORS.textSecondary} style={{marginRight: 12}} />
                <View>
                    <Text style={styles.infoTitle}>Payment date</Text>
                    <Text style={styles.infoSub}>{ORDER_DATA.customer.date}</Text>
                </View>
            </View>

            {/* Address */}
            <View style={styles.infoRow}>
                 <Ionicons name="location-outline" size={20} color={COLORS.textSecondary} style={{marginRight: 12}} />
                <View style={{flex: 1}}>
                    <Text style={styles.infoTitle}>Delivery address</Text>
                    <Text style={styles.infoSub} numberOfLines={2}>{ORDER_DATA.customer.address}</Text>
                </View>
            </View>
        </View>

        {/* --- FOOTER LICENSE --- */}
        <View style={styles.licenseContainer}>
             <Ionicons name="shield-checkmark" size={24} color={COLORS.TEXT_DARK} style={{opacity: 0.5}} />
            <Text style={styles.licenseText}>100% Original Products</Text>
        </View>

        <View style={{ height: 100 }} /> 
      </ScrollView>

      {/* --- BOTTOM STICKY BAR --- */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.reorderBtn} onPress={() => Alert.alert('Action', 'Reorder initiated')}>
             <Ionicons name="refresh" size={16} color={COLORS.white} style={{marginRight: 6}} />
             <Text style={styles.reorderBtnText}>Reorder</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.invoiceBtn} onPress={handleDownload}>
             <Ionicons name="download-outline" size={18} color={COLORS.primary} style={{marginRight: 6}} />
             <Text style={styles.invoiceBtnText}>Invoice</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

// --- STYLES ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background, 
  },
  scrollContent: {
    padding: 12,
  },
  
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    elevation: 2,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.TEXT_DARK, 
  },
  supportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  supportText: {
    fontSize: 14,
    color: COLORS.primary, 
    fontWeight: '600',
    marginLeft: 4,
  },

  // Cards Generic
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 12,
  },

  // Status Card
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // FIXED: Added missing iconContainer style
  iconContainer: {
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.TEXT_DARK, 
    marginLeft: 10,
  },

  // Restaurant Card
  restaurantHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  resImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  resName: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.TEXT_DARK, 
    marginBottom: 2,
  },
  resLoc: {
    fontSize: 12,
    color: COLORS.textSecondary, 
  },
  callBtn: {
    padding: 8,
    backgroundColor: COLORS.SOFT_BLUE, 
    borderRadius: 20,
  },
  orderIdRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderIdLabel: {
    fontSize: 12,
    color: COLORS.textSecondary, 
    textTransform: 'uppercase',
  },
  orderIdText: {
    fontSize: 12,
    color: COLORS.TEXT_DARK, 
    fontWeight: '500',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  vegIconBorder: {
    width: 14,
    height: 14,
    borderWidth: 1,
    borderColor: COLORS.highlight, 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
  vegIconDot: {
    width: 8,
    height: 8,
    backgroundColor: COLORS.highlight, 
    borderRadius: 4,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.TEXT_DARK, 
  },
  itemDesc: {
    fontSize: 12,
    color: COLORS.textSecondary, 
    marginTop: 2,
    lineHeight: 16,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.TEXT_DARK, 
  },

  // Bill Summary
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.TEXT_DARK, 
  },
  downloadBtnSmall: {
    padding: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.secondary, 
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  billLabel: {
    fontSize: 13,
    color: COLORS.textSecondary, 
  },
  billValue: {
    fontSize: 13,
    color: COLORS.TEXT_DARK, 
  },
  grandTotalLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.TEXT_DARK, 
  },
  grandTotalValue: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.TEXT_DARK, 
  },
  couponLabel: {
    fontSize: 13,
    color: COLORS.primary, 
    fontWeight: '500',
  },
  couponValue: {
    fontSize: 13,
    color: COLORS.primary, 
  },
  paidLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.TEXT_DARK, 
  },
  paidValue: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.TEXT_DARK, 
  },
  savingsFooter: {
    backgroundColor: COLORS.SOFT_BLUE, 
    marginHorizontal: -16, 
    marginBottom: -16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 0, 
    borderTopRightRadius: 0,
    borderTopWidth: 1,
    borderTopColor: COLORS.secondary, 
    borderStyle: 'dashed', 
  },
  savingsText: {
    color: COLORS.primary, 
    fontWeight: '700',
    fontSize: 14,
    marginBottom: 16, 
  },

  // Customer Info
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.background, 
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.TEXT_DARK, 
    marginBottom: 2,
  },
  infoSub: {
    fontSize: 12,
    color: COLORS.textSecondary, 
  },

  // License
  licenseContainer: {
    paddingLeft: 16,
    paddingBottom: 20,
  },
  fssaiLogo: {
    width: 60,
    height: 30,
    opacity: 0.5,
  },
  licenseText: {
    fontSize: 12,
    color: COLORS.LITE_GRAY, 
    marginTop: 4,
  },

  // Bottom Bar
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    elevation: 10,
  },
  reorderBtn: {
    flex: 1,
    backgroundColor: COLORS.primary, 
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 12,
  },
  reorderBtnText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 16,
  },
  invoiceBtn: {
    flex: 1,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.primary, 
  },
  invoiceBtnText: {
    color: COLORS.primary, 
    fontWeight: '700',
    fontSize: 16,
  },
});

export default OrderDetailsScreen;