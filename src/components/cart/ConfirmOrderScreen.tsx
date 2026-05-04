import React from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
// Standard vector icon sets
import { useNavigation } from '@react-navigation/native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ConfirmOrderScreenProps {
  visible: boolean;
  onClose: () => void;
}

const ConfirmOrderScreen: React.FC<ConfirmOrderScreenProps> = ({ visible, onClose }) => {
  const navigation = useNavigation<any>();

  const handleConfirm = () => {
    onClose();
    navigation.navigate('OrderPlacedScreen');
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Confirm Cash on Delivery Order</Text>
          
          <View style={styles.modalBody}>
            <Text style={styles.purpleInstruction}>
              Pay via UPI or Cash when you receive your order
            </Text>
            {/* Note: You would replace this with an actual Image from your assets */}
            <View style={styles.illustrationPlaceholder}>
              <MaterialIcon name="truck-delivery" size={80} color="#ddd" />
            </View>
          </View>

          <View style={styles.modalDivider} />

          <View style={styles.modalActions}>
            <TouchableOpacity 
              style={styles.cancelBtn} 
              onPress={onClose}
            >
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.confirmBtn}
              onPress={handleConfirm}
            >
              <Text style={styles.confirmBtnText}>Confirm order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 20,
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#222', marginBottom: 20 },
  modalBody: { flexDirection: 'row', justifyContent: 'space-between' },
  purpleInstruction: { color: '#673ab7', fontSize: 14, width: '50%', fontWeight: '500' },
  illustrationPlaceholder: { width: 100, height: 80, justifyContent: 'center', alignItems: 'center' },
  modalDivider: { height: 1, backgroundColor: '#eee', marginVertical: 20 },
  modalActions: { flexDirection: 'row', justifyContent: 'space-between' },
  cancelBtn: {
    width: '48%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    borderRadius: 4,
  },
  cancelBtnText: { color: '#2874f0', fontWeight: 'bold' },
  confirmBtn: {
    width: '48%',
    padding: 12,
    backgroundColor: '#ffc107',
    alignItems: 'center',
    borderRadius: 4,
  },
  confirmBtnText: { color: '#000', fontWeight: 'bold' },
});

export default ConfirmOrderScreen;