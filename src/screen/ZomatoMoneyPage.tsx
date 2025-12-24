
// import React from 'react';
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { COLORS } from '../theme/color';

// const { width } = Dimensions.get('window');

// const ZomatoMoneyPage: React.FC = ({ navigation }: any) => {
//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backButton} onPress={() => navigation?.goBack()}>
//           <Icon name="arrow-back" size={24} color="#1C1C1C" />
//         </TouchableOpacity>

//         <Text style={styles.headerTitle}>Restro Money</Text>

//         <TouchableOpacity style={styles.profileIcon}>
//           <Icon name="history" size={26} color="#1C1C1C" />
//         </TouchableOpacity>
//       </View>

//       <ScrollView 
//         style={styles.content} 
//         contentContainerStyle={{ paddingBottom: 40 }}
//         showsVerticalScrollIndicator={false}
//       >
        
//         {/* Premium Balance Card */}
//         <View style={styles.balanceCardWrapper}>
//           <View style={styles.balanceCard}>
//             {/* Background Decoration Circles */}
//             <View style={styles.decoCircle1} />
//             <View style={styles.decoCircle2} />

//             <View style={styles.balanceTopRow}>
//               <View style={styles.walletIconBg}>
//                 <Icon name="account-balance-wallet" size={20} color="#FFF" />
//               </View>
//               <Text style={styles.balanceLabel}>Total Balance</Text>
//             </View>

//             <Text style={styles.balanceAmount}>₹0.00</Text>
//             <Text style={styles.balanceInfo}>Safe & Secure Payments</Text>

//             <View style={styles.cardDivider} />

//             <TouchableOpacity style={styles.addMoneyButton} activeOpacity={0.8}>
//               <Text style={styles.addMoneyText}>+ Add Money to Wallet</Text>
//               <Icon name="chevron-right" size={20} color="#FFF" />
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Quick Actions Grid */}
//         <Text style={styles.sectionLabel}>Quick Actions</Text>
//         <View style={styles.quickActionsContainer}>
//           {/* <TouchableOpacity style={styles.actionCard} activeOpacity={0.7}>
//             <View style={[styles.actionIcon, { backgroundColor: '#E3F2FD' }]}>
//               <Icon name="qr-code-scanner" size={24} color="#1565C0" />
//             </View>
//             <Text style={styles.quickActionText}>Scan & Pay</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.actionCard} activeOpacity={0.7}>
//             <View style={[styles.actionIcon, { backgroundColor: '#FFF3E0' }]}>
//               <Icon name="card-giftcard" size={24} color="#EF6C00" />
//             </View>
//             <Text style={styles.quickActionText}>Gift Card</Text>
//           </TouchableOpacity> */}

//           <TouchableOpacity style={styles.actionCard} activeOpacity={0.7}>
//             <View style={[styles.actionIcon, { backgroundColor: '#E8F5E9' }]}>
//               <Icon name="support-agent" size={24} color="#2E7D32" />
//             </View>
//             <Text style={styles.quickActionText}>Help</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Transactions Section */}
//         <View style={styles.transactionSection}>
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>Recent Transactions</Text>
//             <TouchableOpacity>
//               <Text style={styles.seeAllText}>View All</Text>
//             </TouchableOpacity>
//           </View>

//           {/* Transaction List */}
//           <View style={styles.transactionList}>
            
//             {/* Item 1 */}
//             <View style={styles.transactionItem}>
//               <View style={[styles.transactionIcon, { backgroundColor: '#E0F7FA' }]}>
//                 <Icon name="add" size={20} color="#006064" />
//               </View>
//               <View style={styles.transactionDetails}>
//                 <Text style={styles.transactionDescription}>Wallet Top-up</Text>
//                 <Text style={styles.transactionDate}>Sep 03, 2025 • 10:30 AM</Text>
//               </View>
//               <Text style={styles.amountCredit}>+ ₹100.00</Text>
//             </View>

//             {/* Item 2 */}
//             <View style={styles.transactionItem}>
//               <View style={[styles.transactionIcon, { backgroundColor: '#FFEBEE' }]}>
//                 <Icon name="restaurant" size={20} color="#C62828" />
//               </View>
//               <View style={styles.transactionDetails}>
//                 <Text style={styles.transactionDescription}>Order Payment</Text>
//                 <Text style={styles.transactionDate}>Aug 15, 2025 • 08:15 PM</Text>
//               </View>
//               <Text style={styles.amountDebit}>- ₹50.00</Text>
//             </View>

//              {/* Item 3 */}
//              <View style={[styles.transactionItem, { borderBottomWidth: 0 }]}>
//               <View style={[styles.transactionIcon, { backgroundColor: '#FFEBEE' }]}>
//                 <Icon name="restaurant" size={20} color="#C62828" />
//               </View>
//               <View style={styles.transactionDetails}>
//                 <Text style={styles.transactionDescription}>Burger King</Text>
//                 <Text style={styles.transactionDate}>Aug 12, 2025 • 01:20 PM</Text>
//               </View>
//               <Text style={styles.amountDebit}>- ₹240.00</Text>
//             </View>

//           </View>

//           {/* Empty State visual (commented out to show list, but kept structure) */}
//           {/* <View style={styles.emptyTransaction}>
//             <Icon name="receipt-long" size={48} color={COLORS.muted} />
//             <Text style={styles.emptyText}>No more transactions</Text>
//           </View> */}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default ZomatoMoneyPage;

// /* ---------------------- THEMED STYLES ---------------------- */

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F9F9F9', // Slightly grey background for contrast
//   },

//   /* Header */
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: '#F9F9F9',
//   },
//   backButton: {
//     padding: 8,
//     borderRadius: 20,
//     backgroundColor: '#fff',
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowRadius: 5,
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: '800',
//     color: '#1C1C1C',
//     letterSpacing: 0.5,
//   },
//   profileIcon: {
//     padding: 8,
//   },

//   content: {
//     flex: 1,
//   },

//   /* Premium Balance Card */
//   balanceCardWrapper: {
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//   },
//   balanceCard: {
//     backgroundColor: '#1E1E2E', // Premium Dark Color
//     borderRadius: 24,
//     padding: 24,
//     position: 'relative',
//     overflow: 'hidden',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 8 },
//     shadowOpacity: 0.3,
//     shadowRadius: 12,
//     elevation: 10,
//   },
//   // Decorative Background Circles
//   decoCircle1: {
//     position: 'absolute',
//     top: -30,
//     right: -30,
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     backgroundColor: 'rgba(255,255,255,0.05)',
//   },
//   decoCircle2: {
//     position: 'absolute',
//     bottom: -50,
//     left: -20,
//     width: 150,
//     height: 150,
//     borderRadius: 75,
//     backgroundColor: 'rgba(255,255,255,0.03)',
//   },

//   balanceTopRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   walletIconBg: {
//     backgroundColor: 'rgba(255,255,255,0.15)',
//     padding: 6,
//     borderRadius: 10,
//     marginRight: 10,
//   },
//   balanceLabel: {
//     fontSize: 14,
//     color: '#B0B0C0',
//     fontWeight: '600',
//     letterSpacing: 0.5,
//   },
//   balanceAmount: {
//     fontSize: 42,
//     fontWeight: '800',
//     color: '#FFF',
//     letterSpacing: 1,
//   },
//   balanceInfo: {
//     fontSize: 12,
//     color: '#8E8E9E',
//     marginTop: 4,
//     marginBottom: 20,
//   },
//   cardDivider: {
//     height: 1,
//     backgroundColor: 'rgba(255,255,255,0.1)',
//     marginBottom: 16,
//   },
//   addMoneyButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: COLORS.primary, // Using your theme color
//     paddingVertical: 14,
//     paddingHorizontal: 16,
//     borderRadius: 16,
//   },
//   addMoneyText: {
//     fontSize: 15,
//     fontWeight: '700',
//     color: '#FFF',
//   },

//   /* Quick Actions */
//   sectionLabel: {
//     fontSize: 14,
//     fontWeight: '700',
//     color: '#666',
//     marginLeft: 20,
//     marginTop: 10,
//     marginBottom: 10,
//     textTransform: 'uppercase',
//     letterSpacing: 0.5,
//   },
//   quickActionsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     marginBottom: 24,
//   },
//   actionCard: {
//     backgroundColor: '#fff',
//     width: (width - 48) / 3, // 3 items with padding
//     paddingVertical: 16,
//     borderRadius: 16,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   actionIcon: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   quickActionText: {
//     fontSize: 12,
//     fontWeight: '600',
//     color: '#333',
//   },

//   /* Transaction Section */
//   transactionSection: {
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     paddingHorizontal: 20,
//     paddingTop: 24,
//     paddingBottom: 40,
//     shadowColor: '#000',
//     // shadowOffset: { width: 0, height: -3 },
//     // shadowOpacity: 0.05,
//     // shadowRadius: 5,
//     // elevation: 5,
//     minHeight: 300,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '800',
//     color: '#1C1C1C',
//   },
//   seeAllText: {
//     fontSize: 13,
//     color: COLORS.primary,
//     fontWeight: '700',
//   },
//   transactionList: {
//     backgroundColor: '#fff',
//   },
//   transactionItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#F0F0F0',
//   },
//   transactionIcon: {
//     width: 40,
//     height: 40,
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 14,
//   },
//   transactionDetails: {
//     flex: 1,
//   },
//   transactionDescription: {
//     fontSize: 15,
//     color: '#1C1C1C',
//     fontWeight: '600',
//     marginBottom: 2,
//   },
//   transactionDate: {
//     fontSize: 11,
//     color: '#999',
//     fontWeight: '500',
//   },
//   amountCredit: {
//     fontSize: 15,
//     fontWeight: '700',
//     color: '#2E7D32', // Green for credit
//   },
//   amountDebit: {
//     fontSize: 15,
//     fontWeight: '700',
//     color: '#1C1C1C', // Black for debit
//   },

//   /* Empty State */
//   emptyTransaction: {
//     alignItems: 'center',
//     paddingVertical: 40,
//     opacity: 0.5,
//   },
//   emptyText: {
//     fontSize: 14,
//     color: '#999',
//     marginTop: 10,
//     fontWeight: '500',
//   },
// });


import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../theme/color';

const { width } = Dimensions.get('window');

const ZomatoMoneyPage: React.FC = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation?.goBack()}>
          <Icon name="arrow-back" size={24} color="#1C1C1C" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Restro Money</Text>

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
            {/* Background Decoration Circles */}
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

            <View style={styles.cardDivider} />

            <TouchableOpacity style={styles.addMoneyButton} activeOpacity={0.8}>
              <Text style={styles.addMoneyText}>+ Add Money to Wallet</Text>
              <Icon name="chevron-right" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Actions Grid */}
        <Text style={styles.sectionLabel}>Quick Actions</Text>
        <View style={styles.quickActionsContainer}>
          {/* <TouchableOpacity style={styles.actionCard} activeOpacity={0.7}>
            <View style={[styles.actionIcon, { backgroundColor: '#E3F2FD' }]}>
              <Icon name="qr-code-scanner" size={24} color="#1565C0" />
            </View>
            <Text style={styles.quickActionText}>Scan & Pay</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} activeOpacity={0.7}>
            <View style={[styles.actionIcon, { backgroundColor: '#FFF3E0' }]}>
              <Icon name="card-giftcard" size={24} color="#EF6C00" />
            </View>
            <Text style={styles.quickActionText}>Gift Card</Text>
          </TouchableOpacity> */}

          <TouchableOpacity style={styles.actionCard} activeOpacity={0.7}
          onPress={() => navigation.navigate('SupportScreen')}>
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

          {/* Transaction List */}
          <View style={styles.transactionList}>
            
            {/* Item 1 */}
            <View style={styles.transactionItem}>
              <View style={[styles.transactionIcon, { backgroundColor: '#E0F7FA' }]}>
                <Icon name="add" size={20} color="#006064" />
              </View>
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionDescription}>Wallet Top-up</Text>
                <Text style={styles.transactionDate}>Sep 03, 2025 • 10:30 AM</Text>
              </View>
              <Text style={styles.amountCredit}>+ ₹100.00</Text>
            </View>

            {/* Item 2 */}
            <View style={styles.transactionItem}>
              <View style={[styles.transactionIcon, { backgroundColor: '#FFEBEE' }]}>
                <Icon name="restaurant" size={20} color="#C62828" />
              </View>
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionDescription}>Order Payment</Text>
                <Text style={styles.transactionDate}>Aug 15, 2025 • 08:15 PM</Text>
              </View>
              <Text style={styles.amountDebit}>- ₹50.00</Text>
            </View>

             {/* Item 3 */}
             <View style={[styles.transactionItem, { borderBottomWidth: 0 }]}>
              <View style={[styles.transactionIcon, { backgroundColor: '#FFEBEE' }]}>
                <Icon name="restaurant" size={20} color="#C62828" />
              </View>
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionDescription}>Burger King</Text>
                <Text style={styles.transactionDate}>Aug 12, 2025 • 01:20 PM</Text>
              </View>
              <Text style={styles.amountDebit}>- ₹240.00</Text>
            </View>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ZomatoMoneyPage;

/* ---------------------- THEMED STYLES ---------------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9', 
  },

  /* Header */
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

  /* Premium Balance Card */
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
  cardDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginBottom: 16,
  },
  addMoneyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary, 
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  addMoneyText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFF',
  },

  /* Quick Actions (MODIFIED) */
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
    // Changed: Removed row layout to allow full width stacking
    flexDirection: 'column', 
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  actionCard: {
    backgroundColor: '#fff',
    width: '100%', // Changed: Full width
    paddingVertical: 16,
    paddingHorizontal: 20, // Added: Horizontal padding for row layout
    borderRadius: 16,
    flexDirection: 'row', // Changed: Items side-by-side
    alignItems: 'center',
    justifyContent: 'flex-start', // Changed: Align to left
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
    marginBottom: 0, // Changed: Removed bottom margin
    marginRight: 16, // Added: Right margin for spacing
  },
  quickActionText: {
    fontSize: 14, // Slightly increased size for list view readability
    fontWeight: '600',
    color: '#333',
  },

  /* Transaction Section */
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
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 15,
    color: '#1C1C1C',
    fontWeight: '600',
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 11,
    color: '#999',
    fontWeight: '500',
  },
  amountCredit: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2E7D32', 
  },
  amountDebit: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1C1C1C', 
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