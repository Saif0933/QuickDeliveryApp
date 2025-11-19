import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Assuming MaterialIcons is used, install via CLI: react-native-vector-icons

const ZomatoMoneyPage: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Zomato Money</Text>
        <View style={{ width: 24 }} /> {/* Placeholder for symmetry */}
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.balanceSection}>
          <Text style={styles.balanceLabel}>Your Balance</Text>
          <Text style={styles.balanceAmount}>₹0.00</Text>
          <Text style={styles.balanceInfo}>Use Zomato Money for faster checkouts</Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Icon name="add-circle" size={20} color="#FFF" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Add Money</Text>
        </TouchableOpacity>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Transactions</Text>
          {/* Mock transactions */}
          <View style={styles.transactionItem}>
            <Icon name="history" size={24} color="#888" />
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionDescription}>Added from cash change</Text>
              <Text style={styles.transactionDate}>Sep 03, 2025</Text>
            </View>
            <Text style={styles.transactionAmount}>+₹100.00</Text>
          </View>
          <View style={styles.transactionItem}>
            <Icon name="history" size={24} color="#888" />
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionDescription}>Used for order</Text>
              <Text style={styles.transactionDate}>Aug 15, 2025</Text>
            </View>
            <Text style={styles.transactionAmountRed}>-₹50.00</Text>
          </View>
          {/* Add more transactions as needed */}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  balanceSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#888',
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 8,
  },
  balanceInfo: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EF4F5F', // Zomato red
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  transactionDetails: {
    flex: 1,
    marginLeft: 16,
  },
  transactionDescription: {
    fontSize: 16,
    color: '#000',
  },
  transactionDate: {
    fontSize: 14,
    color: '#888',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50', // Green for credit
  },
  transactionAmountRed: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EF4F5F', // Red for debit
  },
});

export default ZomatoMoneyPage;