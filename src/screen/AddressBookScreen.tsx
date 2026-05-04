import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Address, useAddresses, useDeleteAddress } from '../api/hooks/address';
import { COLORS } from "../theme/color";

// --- DESIGN TOKENS ---
const BG_COLOR = "#FFFFFF";
const CARD_BG = "#F9FAFB";
const TEXT_DARK = "#111827";
const TEXT_GREY = "#6B7280";
const PRIMARY = COLORS.primary || "#000000";

const AddressBookScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  // --- API HOOKS ---
  const { data: addressesData, isLoading } = useAddresses();
  const deleteMutation = useDeleteAddress();

  const addresses = addressesData ? [...addressesData].reverse() : [];

  // Modal State
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const handleGoBack = () => navigation.goBack();

  // --- SHARE FUNCTION ---
  const handleShare = async (addr: any) => {
    try {
      await Share.share({
        message: `My Address (${addr.type}):\n${addr.completeAddress}\nContact: ${addr.receiverContact}`,
      });
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  const openOptions = (addr: Address) => {
    setSelectedAddress(addr);
    setModalVisible(true);
  };

  const closeOptions = () => {
    setModalVisible(false);
    setSelectedAddress(null);
  };

  const handleEditOption = () => {
    if (selectedAddress) {
      closeOptions();
      navigation.navigate('SelectAddressScreen', { address: selectedAddress });
    }
  };

  const handleDeleteOption = () => {
    if (selectedAddress) {
        Alert.alert("Delete Address", "This will permanently remove this address from your account.", [
            { text: "Cancel", style: "cancel", onPress: closeOptions },
            { 
                text: "Delete", 
                style: "destructive", 
                onPress: async () => {
                    try {
                        await deleteMutation.mutateAsync(selectedAddress.id);
                        closeOptions();
                    } catch (error: any) {
                        Alert.alert("Error", "Failed to delete address. Please try again.");
                    }
                }
            }
        ]);
    }
  };

  const renderAddressIcon = (type: string) => {
    const t = type.toLowerCase();
    if (t === 'home') return <Ionicons name="home" size={20} color={PRIMARY} />;
    if (t === 'work' || t === 'office') return <MaterialCommunityIcons name="briefcase" size={20} color="#8B5CF6" />;
    return <Ionicons name="location" size={20} color="#10B981" />;
  };

  const getIconBg = (type: string) => {
    const t = type.toLowerCase();
    if (t === 'home') return "#EFF6FF";
    if (t === 'work' || t === 'office') return "#F5F3FF";
    return "#ECFDF5";
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={BG_COLOR} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color={TEXT_DARK} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Address Book</Text>
            <Text style={styles.headerSubtitle}>{addresses.length} saved locations</Text>
        </View>
        <TouchableOpacity 
            style={styles.headerAddBtn}
            onPress={() => navigation.navigate('SelectAddressScreen')}
        >
            <Ionicons name="add" size={24} color={PRIMARY} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={PRIMARY} />
            <Text style={styles.loaderText}>Loading your addresses...</Text>
          </View>
        ) : addresses.length > 0 ? (
          <View style={styles.listContainer}>
            {addresses.map((addr: any) => (
              <View key={addr.id} style={styles.addressCard}>
                <View style={styles.cardMain}>
                  <View style={[styles.iconContainer, { backgroundColor: getIconBg(addr.type || 'other') }]}>
                    {renderAddressIcon(addr.type || 'other')}
                  </View>
                  
                  <View style={styles.addressInfo}>
                    <View style={styles.typeRow}>
                      <Text style={styles.addressType}>{(addr.type || 'Other').toUpperCase()}</Text>
                      {addr.isDefault && (
                        <View style={styles.defaultBadge}>
                           <Text style={styles.defaultText}>DEFAULT</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.receiverName}>{addr.receiverName}</Text>
                    <Text style={styles.fullAddress} numberOfLines={3}>
                      {addr.completeAddress}
                    </Text>
                    <View style={styles.contactRow}>
                      <Ionicons name="call" size={14} color={TEXT_GREY} />
                      <Text style={styles.contactText}>{addr.receiverContact}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.cardActions}>
                   <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate('SelectAddressScreen', { address: addr })}>
                      <Ionicons name="pencil-outline" size={18} color={TEXT_DARK} />
                      <Text style={styles.actionBtnText}>Edit</Text>
                   </TouchableOpacity>
                   <View style={styles.vDivider} />
                   <TouchableOpacity style={styles.actionBtn} onPress={() => handleShare(addr)}>
                      <Ionicons name="share-outline" size={18} color={TEXT_DARK} />
                      <Text style={styles.actionBtnText}>Share</Text>
                   </TouchableOpacity>
                   <View style={styles.vDivider} />
                   <TouchableOpacity style={styles.actionBtn} onPress={() => openOptions(addr)}>
                      <Ionicons name="ellipsis-horizontal" size={18} color={TEXT_DARK} />
                      <Text style={styles.actionBtnText}>More</Text>
                   </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
                <Ionicons name="map-outline" size={48} color="#D1D5DB" />
            </View>
            <Text style={styles.emptyTitle}>No Addresses Found</Text>
            <Text style={styles.emptySubtitle}>You haven't saved any addresses yet. Add one now for faster checkout.</Text>
            <TouchableOpacity 
                style={styles.emptyAddBtn}
                onPress={() => navigation.navigate('SelectAddressScreen')}
            >
                <Text style={styles.emptyAddBtnText}>Add New Address</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Floating Add Button */}
      {!isLoading && addresses.length > 0 && (
        <TouchableOpacity 
            style={styles.fab}
            onPress={() => navigation.navigate('SelectAddressScreen')}
            activeOpacity={0.9}
        >
            <Ionicons name="add" size={30} color="#FFF" />
            <Text style={styles.fabText}>Add New</Text>
        </TouchableOpacity>
      )}

      {/* --- OPTIONS MODAL --- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeOptions}
      >
        <TouchableWithoutFeedback onPress={closeOptions}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHandle} />
              <Text style={styles.modalHeader}>Manage Address</Text>
              
              <TouchableOpacity style={styles.modalOption} onPress={handleEditOption}>
                <View style={[styles.modalOptionIcon, { backgroundColor: '#F3F4F6' }]}>
                   <Ionicons name="pencil" size={20} color={TEXT_DARK} />
                </View>
                <Text style={styles.modalOptionText}>Edit Address Details</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalOption} onPress={handleDeleteOption}>
                <View style={[styles.modalOptionIcon, { backgroundColor: '#FEE2E2' }]}>
                   <Ionicons name="trash" size={20} color="#EF4444" />
                </View>
                <Text style={[styles.modalOptionText, { color: '#EF4444' }]}>Remove from Address Book</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.modalOption, { borderBottomWidth: 0 }]} onPress={closeOptions}>
                <View style={[styles.modalOptionIcon, { backgroundColor: '#F3F4F6' }]}>
                   <Ionicons name="close" size={20} color={TEXT_DARK} />
                </View>
                <Text style={styles.modalOptionText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

    </SafeAreaView>
  );
};

export default AddressBookScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: BG_COLOR,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backBtn: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitleContainer: {
    flex: 1,
    marginLeft: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: TEXT_DARK,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 12,
    color: TEXT_GREY,
    fontWeight: "500",
  },
  headerAddBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  loaderContainer: {
    marginTop: 100,
    alignItems: 'center',
  },
  loaderText: {
    marginTop: 12,
    color: TEXT_GREY,
    fontSize: 14,
  },
  listContainer: {
    padding: 20,
    gap: 20,
  },
  addressCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
  },
  cardMain: {
    padding: 20,
    flexDirection: 'row',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressInfo: {
    flex: 1,
    marginLeft: 16,
  },
  typeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  addressType: {
    fontSize: 11,
    fontWeight: '800',
    color: TEXT_GREY,
    letterSpacing: 1,
  },
  defaultBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  defaultText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#166534',
  },
  receiverName: {
    fontSize: 16,
    fontWeight: '700',
    color: TEXT_DARK,
    marginBottom: 4,
  },
  fullAddress: {
    fontSize: 14,
    color: TEXT_GREY,
    lineHeight: 20,
    marginBottom: 12,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactText: {
    fontSize: 13,
    color: TEXT_GREY,
    marginLeft: 6,
    fontWeight: '500',
  },
  cardActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    backgroundColor: '#FAFBFC',
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  actionBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: TEXT_DARK,
    marginLeft: 8,
  },
  vDivider: {
    width: 1,
    height: '60%',
    backgroundColor: '#E5E7EB',
    alignSelf: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: PRIMARY,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    elevation: 8,
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  fabText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 8,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    marginTop: 60,
  },
  emptyIconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: TEXT_DARK,
    marginBottom: 12,
  },
  emptySubtitle: {
    fontSize: 14,
    color: TEXT_GREY,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  emptyAddBtn: {
    backgroundColor: PRIMARY,
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 14,
  },
  emptyAddBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    paddingBottom: 40,
  },
  modalHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 20,
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: '800',
    color: TEXT_DARK,
    marginBottom: 24,
    textAlign: 'center',
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalOptionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  modalOptionText: {
    fontSize: 15,
    fontWeight: '600',
    color: TEXT_DARK,
  },
});