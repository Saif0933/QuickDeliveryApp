import React from 'react';
import {
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../theme/color';

// Vendor Cart Interface (Same as in FloatingCart.tsx)
export interface VendorCart {
  vendorId: number;
  vendorName: string;
  vendorLogo: string;
  items: any[];
  totalQuantity: number;
  totalAmount: number;
}

interface FloatingCartModalProps {
  visible: boolean;
  onClose: () => void;
  onCheckoutAll: () => void;
  onVendorPress: (vendorCart: VendorCart) => void;
  onViewCart: (vendorCart: VendorCart) => void;
  vendorCarts: VendorCart[];
}

const FloatingCartModal: React.FC<FloatingCartModalProps> = ({
  visible,
  onClose,
  onCheckoutAll,
  onVendorPress,
  onViewCart,
  vendorCarts,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.allCartsModalOverlay}>
        
        {/* Floating Close Button for Modal */}
        <View style={styles.modalCloseContainer}>
           <TouchableOpacity style={styles.modalCloseBtn} onPress={onClose}>
              <Ionicons name="close" size={24} color="#fff" />
           </TouchableOpacity>
        </View>

        <View style={styles.allCartsModalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Your Carts ({vendorCarts.length})</Text>
            <TouchableOpacity style={styles.checkoutAllBtn} onPress={onCheckoutAll}>
              <Text style={styles.checkoutAllText}>Checkout all</Text>
              <Ionicons name="caret-forward-sharp" size={14} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.cartList} showsVerticalScrollIndicator={false}>
            {/* Dynamic Vendor Carts */}
            {vendorCarts.map((vendorCart) => (
              <View key={vendorCart.vendorId} style={styles.cartItemCard}>
                <TouchableOpacity 
                  style={styles.cartLeft} 
                  onPress={() => onVendorPress(vendorCart)} 
                  activeOpacity={0.7}
                >
                  <Image source={{ uri: vendorCart.vendorLogo }} style={styles.cartImg} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.cartTitle} numberOfLines={1}>{vendorCart.vendorName}</Text>
                    <Text style={styles.cartSubtitle}>View Menu ➝</Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.cartItemRight}>
                  <TouchableOpacity 
                    style={styles.viewCartBtnSmall} 
                    onPress={() => onViewCart(vendorCart)}
                  >
                    <Text style={styles.viewCartTextSmall}>View Cart</Text>
                    <Text style={styles.itemCountSmall}>
                      {vendorCart.totalQuantity} {vendorCart.totalQuantity === 1 ? 'item' : 'items'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.closeCartBtn}>
                    <Ionicons name="close" size={16} color="#666" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  // --- MODAL STYLES ---
  allCartsModalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.7)' },
  modalCloseContainer: { alignItems: 'center', marginBottom: 15 },
  modalCloseBtn: {
    backgroundColor: '#333',
    width: 40, height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1, borderColor: '#555'
  },
  allCartsModalContent: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, paddingBottom: 30, maxHeight: '60%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 18, fontWeight: '800', color: '#000' },
  checkoutAllBtn: { flexDirection: 'row', alignItems: 'center' },
  checkoutAllText: { fontSize: 14, fontWeight: 'bold', color: COLORS.primary, marginRight: 4 },
  cartList: {},
  cartItemCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 4, borderWidth: 0.5, borderColor: '#f0f0f0' },
  cartLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  cartImg: { width: 44, height: 44, borderRadius: 10, marginRight: 12 },
  cartTitle: { fontSize: 15, fontWeight: 'bold', color: '#000' },
  cartSubtitle: { fontSize: 12, color: '#666', marginTop: 2 },
  cartItemRight: { flexDirection: 'row', alignItems: 'center' },
  viewCartBtnSmall: { backgroundColor: COLORS.primary, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8, alignItems: 'center' },
  viewCartTextSmall: { color: '#fff', fontSize: 13, fontWeight: 'bold' },
  itemCountSmall: { color: '#fff', fontSize: 11 },
  closeCartBtn: { marginLeft: 12, padding: 6, borderRadius: 50, backgroundColor: '#f8f8f8', alignItems: 'center', justifyContent: 'center' },
});

export default FloatingCartModal;
