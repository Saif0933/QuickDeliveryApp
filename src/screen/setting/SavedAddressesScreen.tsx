import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
  Modal,
  TextInput,
  ScrollView,
  Switch,
  ActivityIndicator,
  Alert,
  Platform,
  Dimensions,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  useAddresses,
  useCreateAddress,
  useUpdateAddress,
  useDeleteAddress,
  Address
} from '../../api/hook/user/user.address';

const { width } = Dimensions.get('window');

export default function SavedAddressesScreen({ navigation }: any) {
  const { data: response, isLoading, refetch } = useAddresses();
  const createAddressMutation = useCreateAddress();
  const updateAddressMutation = useUpdateAddress();
  const deleteAddressMutation = useDeleteAddress();

  const addresses = response?.data || [];

  // Modal and Form States
  const [modalVisible, setModalVisible] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  
  const [type, setType] = useState('Home');
  const [receiverName, setReceiverName] = useState('');
  const [receiverContact, setReceiverContact] = useState('');
  const [mainAddress, setMainAddress] = useState('');
  const [completeAddress, setCompleteAddress] = useState('');
  const [city, setCity] = useState('');
  const [landMark, setLandMark] = useState('');
  const [floor, setFloor] = useState('');
  const [isDefault, setIsDefault] = useState(false);

  const openAddModal = () => {
    setEditingAddress(null);
    setType('Home');
    setReceiverName('');
    setReceiverContact('');
    setMainAddress('');
    setCompleteAddress('');
    setCity('');
    setLandMark('');
    setFloor('');
    setIsDefault(false);
    setModalVisible(true);
  };

  const openEditModal = (address: Address) => {
    setEditingAddress(address);
    setType(address.title || address.type || 'Home');
    setReceiverName(address.receiverName || '');
    setReceiverContact(address.receiverContact || '');
    setMainAddress(address.addressLine1 || address.mainAddress || '');
    setCompleteAddress(address.completeAddress || '');
    setCity(address.city);
    setLandMark(address.landMark || '');
    setFloor(address.floor || '');
    setIsDefault(address.isDefault);
    setModalVisible(true);
  };

  const handleSaveAddress = () => {
    if (!mainAddress.trim()) {
      Alert.alert('Error', 'Address field is required.');
      return;
    }
    if (!city.trim()) {
      Alert.alert('Error', 'City is required.');
      return;
    }

    const payload = {
      type,
      mainAddress,
      completeAddress: completeAddress || undefined,
      receiverName: receiverName || undefined,
      receiverContact: receiverContact || undefined,
      landMark: landMark || undefined,
      floor: floor || undefined,
      city,
      isDefault,
      latitude: 19.076, // default Mumbai coordinates
      longitude: 72.877,
    };

    if (editingAddress) {
      updateAddressMutation.mutate(
        { id: editingAddress.id, ...payload },
        {
          onSuccess: () => {
            Alert.alert('Success', 'Address updated successfully!');
            setModalVisible(false);
          },
          onError: (error: any) => {
            const msg = error?.response?.data?.message || error?.message || 'Failed to update address';
            Alert.alert('Error', msg);
          }
        }
      );
    } else {
      createAddressMutation.mutate(
        payload,
        {
          onSuccess: () => {
            Alert.alert('Success', 'Address created successfully!');
            setModalVisible(false);
          },
          onError: (error: any) => {
            const msg = error?.response?.data?.message || error?.message || 'Failed to create address';
            Alert.alert('Error', msg);
          }
        }
      );
    }
  };

  const handleDeleteAddress = (id: string) => {
    Alert.alert(
      'Delete Address',
      'Are you sure you want to delete this address?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteAddressMutation.mutate(id, {
              onSuccess: () => {
                Alert.alert('Success', 'Address deleted successfully!');
              },
              onError: (error: any) => {
                Alert.alert('Error', error?.message || 'Failed to delete address.');
              }
            });
          }
        }
      ]
    );
  };

  const getAddressIcon = (addressType?: string) => {
    if (!addressType) return 'location-on';
    switch (addressType.toLowerCase()) {
      case 'home':
        return 'home';
      case 'office':
      case 'work':
        return 'work';
      default:
        return 'location-on';
    }
  };

  const renderAddressCard = ({ item }: { item: Address }) => {
    const cardTitle = item.title || item.type || 'Home';
    return (
      <View style={styles.addressCard}>
        <View style={styles.cardHeader}>
          <View style={styles.badgeContainer}>
            <MaterialIcons name={getAddressIcon(cardTitle)} size={18} color="#A87C53" />
            <Text style={styles.badgeText}>{cardTitle}</Text>
          </View>
          {item.isDefault && (
            <View style={styles.defaultBadge}>
              <Text style={styles.defaultBadgeText}>Default</Text>
            </View>
          )}
        </View>

        <Text style={styles.addressName}>
          {item.addressLine1 || item.mainAddress}
        </Text>
        {!!(item.addressLine2 || item.completeAddress) && (
          <Text style={styles.addressContact}>
            {item.addressLine2 || item.completeAddress}
          </Text>
        )}
        <Text style={styles.cityText}>
          {item.city}
        </Text>

        <View style={styles.cardActions}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => openEditModal(item)}
            activeOpacity={0.7}
          >
            <MaterialIcons name="edit" size={16} color="#7a7f9a" />
            <Text style={styles.actionBtnText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionBtn, { marginLeft: 16 }]}
            onPress={() => handleDeleteAddress(item.id)}
            activeOpacity={0.7}
          >
            <MaterialIcons name="delete-outline" size={16} color="#ef4444" />
            <Text style={[styles.actionBtnText, { color: '#ef4444' }]}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="keyboard-arrow-left" size={28} color="#1e2022" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Saved Addresses</Text>
        <TouchableOpacity style={styles.addButton} onPress={openAddModal}>
          <MaterialIcons name="add" size={24} color="#A87C53" />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1e2022" />
          <Text style={styles.loadingText}>Loading addresses...</Text>
        </View>
      ) : addresses.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconCircle}>
            <MaterialIcons name="location-off" size={48} color="#A87C53" />
          </View>
          <Text style={styles.emptyTitle}>No Saved Addresses</Text>
          <Text style={styles.emptySubtitle}>
            Add a shipping address to place order and get rapid delivery.
          </Text>
          <TouchableOpacity style={styles.addBtnLarge} onPress={openAddModal} activeOpacity={0.9}>
            <Text style={styles.addBtnLargeText}>Add New Address</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={addresses}
          keyExtractor={(item) => item.id}
          renderItem={renderAddressCard}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          onRefresh={refetch}
          refreshing={isLoading}
        />
      )}

      {/* Add / Edit Address Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editingAddress ? 'Edit Address' : 'Add New Address'}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <MaterialIcons name="close" size={24} color="#1e2022" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.modalScroll}>
              {/* Type selector */}
              <Text style={styles.inputLabel}>Address Type</Text>
              <View style={styles.typeSelectorContainer}>
                {['Home', 'Office', 'Other'].map((t) => (
                  <TouchableOpacity
                    key={t}
                    style={[styles.typeBtn, type === t && styles.typeBtnSelected]}
                    onPress={() => setType(t)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.typeBtnText, type === t && styles.typeBtnTextSelected]}>
                      {t}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.inputLabel}>Recipient Name</Text>
              <TextInput
                style={styles.modalInput}
                value={receiverName}
                onChangeText={setReceiverName}
                placeholder="Receiver's name"
                placeholderTextColor="#7a7f9a"
              />

              <Text style={styles.inputLabel}>Recipient Phone</Text>
              <TextInput
                style={styles.modalInput}
                value={receiverContact}
                onChangeText={setReceiverContact}
                keyboardType="phone-pad"
                placeholder="Receiver's contact number"
                placeholderTextColor="#7a7f9a"
              />

              <Text style={styles.inputLabel}>Address Line</Text>
              <TextInput
                style={styles.modalInput}
                value={mainAddress}
                onChangeText={setMainAddress}
                placeholder="Street address, building, house no."
                placeholderTextColor="#7a7f9a"
              />

              <Text style={styles.inputLabel}>Floor / Unit (Optional)</Text>
              <TextInput
                style={styles.modalInput}
                value={floor}
                onChangeText={setFloor}
                placeholder="e.g. 3rd Floor, Apt 302"
                placeholderTextColor="#7a7f9a"
              />

              <Text style={styles.inputLabel}>City</Text>
              <TextInput
                style={styles.modalInput}
                value={city}
                onChangeText={setCity}
                placeholder="City name"
                placeholderTextColor="#7a7f9a"
              />

              <Text style={styles.inputLabel}>Landmark (Optional)</Text>
              <TextInput
                style={styles.modalInput}
                value={landMark}
                onChangeText={setLandMark}
                placeholder="e.g. Near mall, central park"
                placeholderTextColor="#7a7f9a"
              />

              {/* Set Default Toggle */}
              <View style={styles.switchContainer}>
                <View>
                  <Text style={styles.switchTitle}>Set as Default Address</Text>
                  <Text style={styles.switchSubtitle}>Use this address as primary for shipping</Text>
                </View>
                <Switch
                  value={isDefault}
                  onValueChange={setIsDefault}
                  trackColor={{ false: '#e2dcd0', true: '#A87C53' }}
                  thumbColor={isDefault ? '#ffffff' : '#FAF7F2'}
                />
              </View>

              {/* Action Button */}
              <TouchableOpacity
                style={styles.submitBtn}
                onPress={handleSaveAddress}
                disabled={createAddressMutation.isPending || updateAddressMutation.isPending}
                activeOpacity={0.9}
              >
                {createAddressMutation.isPending || updateAddressMutation.isPending ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.submitBtnText}>Save Address</Text>
                )}
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#e2dcd0',
    backgroundColor: '#ffffff',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e2022',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 14,
    color: '#7a7f9a',
    marginTop: 12,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyIconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#F3EDE4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e2022',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#7a7f9a',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 28,
  },
  addBtnLarge: {
    width: '100%',
    height: 52,
    borderRadius: 12,
    backgroundColor: '#1e2022',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtnLargeText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
  },
  listContent: {
    padding: 16,
    paddingBottom: 40,
  },
  addressCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2dcd0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3EDE4',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#A87C53',
    marginLeft: 4,
    textTransform: 'uppercase',
  },
  defaultBadge: {
    backgroundColor: '#1e2022',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  defaultBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#ffffff',
  },
  addressName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e2022',
    marginBottom: 4,
  },
  addressContact: {
    fontSize: 13,
    color: '#7a7f9a',
    marginBottom: 8,
  },
  addressText: {
    fontSize: 14,
    color: '#1e2022',
    lineHeight: 20,
  },
  cityText: {
    fontSize: 14,
    color: '#7a7f9a',
    marginTop: 2,
    lineHeight: 20,
  },
  cardActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#f3ede4',
    marginTop: 16,
    paddingTop: 14,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#7a7f9a',
    marginLeft: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#e2dcd0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e2022',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  modalScroll: {
    padding: 20,
    paddingBottom: 40,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1e2022',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  typeSelectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  typeBtn: {
    flex: 1,
    height: 46,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2dcd0',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  typeBtnSelected: {
    backgroundColor: '#A87C53',
    borderColor: '#A87C53',
  },
  typeBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7a7f9a',
  },
  typeBtnTextSelected: {
    color: '#ffffff',
  },
  modalInput: {
    height: 48,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2dcd0',
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#1e2022',
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2dcd0',
    borderRadius: 12,
    padding: 14,
    marginBottom: 28,
  },
  switchTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e2022',
  },
  switchSubtitle: {
    fontSize: 11,
    color: '#7a7f9a',
    marginTop: 2,
  },
  submitBtn: {
    height: 52,
    borderRadius: 12,
    backgroundColor: '#1e2022',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
  },
});
