import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../theme/color';

const { width } = Dimensions.get('window');

const WalletScreen: React.FC = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation?.goBack()}>
          <Icon name="arrow-back" size={24} color="#1C1C1C" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Wallet Balance</Text>

        <TouchableOpacity style={styles.profileIcon}>
          <Icon name="history" size={26} color="#1C1C1C" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Premium Balance Card */}
        <View style={styles.balanceCardWrapper}>
          <View style={styles.balanceCard}>
            <View style={styles.decoCircle1} />
            <View style={styles.decoCircle2} />

            <View style={styles.balanceTopRow}>
              <View style={styles.walletIconBg}>
                <Icon name="account-balance-wallet" size={20} color="#FFF" />
              </View>
              <Text style={styles.balanceLabel}>Total Balance</Text>
            </View>

            <Text style={styles.balanceAmount}>₹0.00</Text>
            <Text style={styles.balanceInfo}>Safe & Secure Payments</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionLabel}>Quick Actions</Text>
        <View style={styles.quickActionsContainer}>
          <TouchableOpacity
            style={styles.actionCard}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('SupportScreen')}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#E8F5E9' }]}>
              <Icon name="support-agent" size={24} color="#2E7D32" />
            </View>
            <Text style={styles.quickActionText}>Help</Text>
          </TouchableOpacity>
        </View>

        {/* Transactions Section */}
        <View style={styles.transactionSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.transactionList}>
            <View style={styles.emptyTransaction}>
              <Icon name="receipt-long" size={48} color={COLORS.muted} />
              <Text style={styles.emptyText}>No transaction record</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F9F9F9',
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1C1C1C',
    letterSpacing: 0.5,
  },
  profileIcon: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  balanceCardWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  balanceCard: {
    backgroundColor: '#1E1E2E',
    borderRadius: 24,
    padding: 24,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  decoCircle1: {
    position: 'absolute',
    top: -30,
    right: -30,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  decoCircle2: {
    position: 'absolute',
    bottom: -50,
    left: -20,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  balanceTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  walletIconBg: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    padding: 6,
    borderRadius: 10,
    marginRight: 10,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#B0B0C0',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  balanceAmount: {
    fontSize: 42,
    fontWeight: '800',
    color: '#FFF',
    letterSpacing: 1,
  },
  balanceInfo: {
    fontSize: 12,
    color: '#8E8E9E',
    marginTop: 4,
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#666',
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  quickActionsContainer: {
    flexDirection: 'column',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  actionCard: {
    backgroundColor: '#fff',
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  actionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  transactionSection: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
    shadowColor: '#000',
    minHeight: 300,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1C1C1C',
  },
  seeAllText: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '700',
  },
  transactionList: {
    backgroundColor: '#fff',
  },
  emptyTransaction: {
    alignItems: 'center',
    paddingVertical: 40,
    opacity: 0.5,
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    marginTop: 10,
    fontWeight: '500',
  },
});