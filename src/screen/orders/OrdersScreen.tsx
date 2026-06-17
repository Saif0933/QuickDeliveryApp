import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function OrdersScreen({ navigation }: any) {
  const activeOrders = [
    {
      id: 'QD-8742',
      date: 'Today, 10:14 AM',
      items: 'Casual Slim Fit Shirt, Floral Summer Dress',
      total: '₹3,097',
      status: 'Delivering',
      statusColor: '#3b82f6',
      icon: 'local-shipping',
    },
  ];

  const pastOrders = [
    {
      id: 'QD-7612',
      date: '14 June 2026, 04:30 PM',
      items: 'Dry Clean: 2 Suits, 1 Denim Jacket',
      total: '₹1,450',
      status: 'Delivered',
      statusColor: '#10b981',
      icon: 'check-circle',
    },
    {
      id: 'QD-5401',
      date: '10 June 2026, 11:15 AM',
      items: 'Ironing Service: 10 Cotton Shirts',
      total: '₹250',
      status: 'Delivered',
      statusColor: '#10b981',
      icon: 'check-circle',
    },
  ];

  const renderOrderCard = (order: typeof activeOrders[0]) => (
    <View key={order.id} style={styles.orderCard}>
      <View style={styles.cardHeader}>
        <View style={styles.orderIdContainer}>
          <Text style={styles.orderLabel}>Order ID</Text>
          <Text style={styles.orderId}>{order.id}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: order.statusColor + '20' }]}>
          <MaterialIcons name={order.icon} size={14} color={order.statusColor} />
          <Text style={[styles.statusText, { color: order.statusColor }]}>{order.status}</Text>
        </View>
      </View>

      <Text style={styles.orderDate}>{order.date}</Text>
      <Text style={styles.orderItems} numberOfLines={2}>
        {order.items}
      </Text>

      <View style={styles.cardFooter}>
        <View>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalValue}>{order.total}</Text>
        </View>
        <TouchableOpacity style={styles.trackButton} activeOpacity={0.8}>
          <Text style={styles.trackButtonText}>Track Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Active Orders Section */}
        {activeOrders.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Active Orders</Text>
            {activeOrders.map(renderOrderCard)}
          </View>
        )}

        {/* Past Orders Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Order History</Text>
          {pastOrders.map((order) => (
            <View key={order.id} style={styles.orderCard}>
              <View style={styles.cardHeader}>
                <View style={styles.orderIdContainer}>
                  <Text style={styles.orderLabel}>Order ID</Text>
                  <Text style={styles.orderId}>{order.id}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: order.statusColor + '20' }]}>
                  <MaterialIcons name={order.icon} size={14} color={order.statusColor} />
                  <Text style={[styles.statusText, { color: order.statusColor }]}>{order.status}</Text>
                </View>
              </View>

              <Text style={styles.orderDate}>{order.date}</Text>
              <Text style={styles.orderItems} numberOfLines={2}>
                {order.items}
              </Text>

              <View style={styles.cardFooter}>
                <View>
                  <Text style={styles.totalLabel}>Total Amount</Text>
                  <Text style={styles.totalValue}>{order.total}</Text>
                </View>
                <TouchableOpacity style={styles.reorderButton} activeOpacity={0.8}>
                  <Text style={styles.reorderButtonText}>Reorder</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
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
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 100, // Safe space for bottom tab bar
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748b',
    textTransform: 'uppercase',
    marginBottom: 16,
    letterSpacing: 1,
  },
  orderCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.04)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderLabel: {
    fontSize: 12,
    color: '#64748b',
    marginRight: 6,
  },
  orderId: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  orderDate: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 8,
  },
  orderItems: {
    fontSize: 14,
    color: '#475569',
    marginTop: 8,
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.06)',
  },
  totalLabel: {
    fontSize: 11,
    color: '#64748b',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
    marginTop: 2,
  },
  trackButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  reorderButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    paddingHorizontal: 16,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reorderButtonText: {
    color: '#0f172a',
    fontSize: 12,
    fontWeight: '700',
  },
});
