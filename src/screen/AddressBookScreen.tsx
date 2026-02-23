
// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Alert,
//   StatusBar,
// type Address = {
//   id: string;
//   label: string;
//   details: string;
//   distance: string;
//   phone: string;
//   type: "home" | "work" | "other";
// };

// const AddressBookScreen: React.FC = () => {
//   const navigation = useNavigation();

//   // --- STATE ---
//   const [addresses, setAddresses] = useState<Address[]>([
//     {
//       id: "1",
//       label: "My Place",
//       details: "4th Floor, Balpan Children Hospital, Bariatu, Ranchi",
//       distance: "8 km",
//       phone: "9334804356",
//       type: "other",
//     },
//     {
//       id: "2",
//       label: "Home",
//       details: "1st floor, Tarulia, Krishnapur, Kestopur, Kolkata",
//       distance: "332 km",
//       phone: "9876543210",
//       type: "home",
//     },
//   ]);

//   // Modal State
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

//   const handleGoBack = () => navigation.goBack();

//   const handleAddAddress = () => Alert.alert("Add", "Open Add Form");

//   // --- SHARE FUNCTION ---
//   const handleShare = async (addr: Address) => {
//     try {
//       await Share.share({
//         message: `Address: ${addr.label}\n${addr.details}\nPhone: ${addr.phone}`,
//       });
//     } catch (error: any) {
//       Alert.alert(error.message);
//     }
//   };

//   // --- MODAL HANDLERS ---
  
//   // Open the modal when "Edit" button is clicked
//   const openOptions = (addr: Address) => {
//     setSelectedAddress(addr);
//     setModalVisible(true);
//   };

//   const closeOptions = () => {
//     setModalVisible(false);
//     setSelectedAddress(null);
//   };

//   // Option 1: Edit
//   const handleEditOption = () => {
//     if (selectedAddress) {
//       Alert.alert("Edit", `Edit address ${selectedAddress.id}`);
//     }
//     closeOptions();
//   };

//   // Option 2: Delete
//   const handleDeleteOption = () => {
//     if (selectedAddress) {
//         Alert.alert("Delete Address", "Are you sure you want to remove this address?", [
//             { text: "Cancel", style: "cancel", onPress: closeOptions },
//             { 
//                 text: "Delete", 
//                 style: "destructive", 
//                 onPress: () => {
//                     setAddresses(prev => prev.filter(a => a.id !== selectedAddress.id));
//                     closeOptions();
//                 }
//             }
//         ]);
//     }
//   };

//   // Option 3: Update Delivery Instructions
//   const handleUpdateInstructions = () => {
//     if (selectedAddress) {
//         Alert.alert("Update", "Update Delivery Instructions for " + selectedAddress.label);
//     }
//     closeOptions();
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="dark-content" backgroundColor={BG_COLOR} />

//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backBtn} onPress={handleGoBack}>
//           <Ionicons name="arrow-back" size={24} color={TEXT_DARK} />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Address Book</Text>
//       </View>

//       <ScrollView
//         style={styles.container}
//         contentContainerStyle={{ paddingBottom: 40 }}
//         showsVerticalScrollIndicator={false}
//       >
//         <Text style={styles.sectionTitle}>SAVED ADDRESSES</Text>

//         {/* "Add New" Dashed Button */}
//         <TouchableOpacity
//           style={styles.addNewCard}
//           activeOpacity={0.7}
//           onPress={() => navigation.navigate('SelectAddressScreen')}
//         >
//           <View style={styles.addIconCircle}>
//             <Ionicons name="add" size={24} color={COLORS.primary} />
//           </View>
//           <Text style={styles.addNewText}>Add New Address</Text>
//         </TouchableOpacity>

//         {/* Address List */}
//         <View style={styles.listContainer}>
//           {addresses.map((addr) => {
//             const isHome = addr.type === "home";
//             const iconName = isHome ? "home-outline" : "location-outline";
//             const iconColor = isHome ? COLORS.primary : "#F97316"; // Orange for other
//             const iconBg = isHome ? "#E3F2FD" : "#FFF7ED";

//             return (
//               <View key={addr.id} style={styles.addressCard}>
//                 {/* Header Row: Icon + Label + Actions */}
//                 <View style={styles.cardHeader}>
//                   <View style={styles.titleRow}>
//                     <View
//                       style={[styles.iconWrapper, { backgroundColor: iconBg }]}
//                     >
//                       <Ionicons name={iconName} size={20} color={iconColor} />
//                     </View>
//                     <View>
//                       <Text style={styles.label}>{addr.label}</Text>
//                       <Text style={styles.tag}>{addr.type.toUpperCase()}</Text>
//                     </View>
//                   </View>

//                   {/* Simple Actions */}
//                   <View style={styles.actionsRow}>
//                     {/* Opens the Modal Popup */}
//                     <TouchableOpacity
//                       style={styles.actionIconBtn}
//                       onPress={() => openOptions(addr)}
//                     >
//                       <Ionicons name="pencil-outline" size={18} color={TEXT_GREY} />
//                     </TouchableOpacity>

//                     <TouchableOpacity
//                       style={styles.actionIconBtn}
//                       onPress={() => handleShare(addr)}
//                     >
//                       <Ionicons name="share-social-outline" size={18} color={TEXT_GREY} />
//                     </TouchableOpacity>
//                   </View>
//                 </View>

//                 {/* Details */}
//                 <Text style={styles.detailsText} numberOfLines={2}>
//                   {addr.details}
//                 </Text>

//                 {/* Footer Info */}
//                 <View style={styles.cardFooter}>
//                   <View style={styles.metaItem}>
//                     <Ionicons name="call-outline" size={14} color={TEXT_GREY} />
//                     <Text style={styles.metaText}>{addr.phone}</Text>
//                   </View>
//                   <View style={styles.dot} />
//                   <View style={styles.metaItem}>
//                     <Ionicons name="navigate-outline" size={14} color={TEXT_GREY} />
//                     <Text style={styles.metaText}>{addr.distance}</Text>
//                   </View>
//                 </View>
//               </View>
//             );
//           })}
//         </View>

//         {addresses.length === 0 && (
//           <View style={{ alignItems: "center", marginTop: 50 }}>
//             <Text style={{ color: TEXT_GREY }}>No addresses found.</Text>
//           </View>
//         )}
//       </ScrollView>

//       {/* --- POPUP MODAL --- */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={closeOptions}
//       >
//         <TouchableWithoutFeedback onPress={closeOptions}>
//           <View style={styles.modalOverlay}>
            
//             {/* ADDED: Cross/Close Button Floating Above */}
//             <TouchableOpacity 
//                 style={styles.closeButton} 
//                 onPress={closeOptions}
//                 activeOpacity={0.8}
//             >
//                 <Ionicons name="close" size={24} color="#FFFFFF" />
//             </TouchableOpacity>

//             <TouchableWithoutFeedback>
//               <View style={styles.modalContent}>
//                 <Text style={styles.modalTitle}>Address options</Text>

//                 {/* Option 1: Edit */}
//                 <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate('SelectAddressScreen')}>
//                     <Ionicons name="pencil-outline" size={22} color={TEXT_DARK} />
//                     <Text style={styles.optionText}>Edit Address</Text>
//                     <Ionicons name="chevron-forward" size={20} color={TEXT_GREY} style={{marginLeft: 'auto'}} />
//                 </TouchableOpacity>

//                 {/* Option 2: Delete */}
//                 <TouchableOpacity style={styles.optionItem} onPress={handleDeleteOption}>
//                     <Ionicons name="trash-outline" size={22} color={TEXT_DARK} />
//                     <Text style={styles.optionText}>Delete Address</Text>
//                     <Ionicons name="chevron-forward" size={20} color={TEXT_GREY} style={{marginLeft: 'auto'}} />
//                 </TouchableOpacity>

//                 {/* Option 3: Update Instructions */}
//                 <TouchableOpacity style={styles.optionItem} onPress={handleUpdateInstructions}>
//                     <Ionicons name="bicycle-outline" size={22} color={TEXT_DARK} />
//                     <Text style={styles.optionText}>Update Delivery Instructions</Text>
//                     <Ionicons name="chevron-forward" size={20} color={TEXT_GREY} style={{marginLeft: 'auto'}} />
//                 </TouchableOpacity>

//               </View>
//             </TouchableWithoutFeedback>
//           </View>
//         </TouchableWithoutFeedback>
//       </Modal>

//     </SafeAreaView>
//   );
// };

// export default AddressBookScreen;

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: BG_COLOR,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 20,
//     paddingVertical: 16,
//     backgroundColor: BG_COLOR,
//   },
//   backBtn: {
//     marginRight: 16,
//     padding: 4,
//   },
//   headerTitle: {
//     fontSize: 22,
//     fontWeight: "700",
//     color: TEXT_DARK,
//     letterSpacing: -0.5,
//   },
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//   },
//   sectionTitle: {
//     fontSize: 12,
//     fontWeight: "700",
//     color: "#9CA3AF",
//     marginBottom: 12,
//     letterSpacing: 1,
//     marginTop: 10,
//   },

//   /* Add New Card (Dashed) */
//   addNewCard: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 16,
//     borderRadius: 16,
//     borderWidth: 1.5,
//     borderColor: "#D1D5DB",
//     borderStyle: "dashed",
//     marginBottom: 20,
//     backgroundColor: "rgba(255,255,255,0.5)",
//   },
//   addIconCircle: {
//     marginRight: 8,
//   },
//   addNewText: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: COLORS.primary,
//   },

//   /* Address List */
//   listContainer: {
//     gap: 16,
//   },
//   addressCard: {
//     backgroundColor: CARD_BG,
//     borderRadius: 16,
//     padding: 16,
//     // Soft Modern Shadow
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.05,
//     shadowRadius: 10,
//     elevation: 3,
//   },
//   cardHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     marginBottom: 12,
//   },
//   titleRow: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   iconWrapper: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 12,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: "700",
//     color: TEXT_DARK,
//     marginBottom: 2,
//   },
//   tag: {
//     fontSize: 10,
//     color: "#999",
//     fontWeight: "600",
//   },
//   actionsRow: {
//     flexDirection: "row",
//     gap: 8,
//   },
//   actionIconBtn: {
//     padding: 6,
//     backgroundColor: "#F3F4F6",
//     borderRadius: 8,
//   },
//   detailsText: {
//     fontSize: 14,
//     color: TEXT_GREY,
//     lineHeight: 20,
//     marginBottom: 16,
//   },
//   cardFooter: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderTopWidth: 1,
//     borderTopColor: "#F3F4F6",
//     paddingTop: 12,
//   },
//   metaItem: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   metaText: {
//     fontSize: 12,
//     color: TEXT_DARK,
//     marginLeft: 6,
//     fontWeight: "500",
//   },
//   dot: {
//     width: 3,
//     height: 3,
//     borderRadius: 1.5,
//     backgroundColor: "#D1D5DB",
//     marginHorizontal: 10,
//   },

//   /* MODAL STYLES */
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     justifyContent: "flex-end",
//   },
//   modalContent: {
//     backgroundColor: "white",
//     borderTopLeftRadius: 24,
//     borderTopRightRadius: 24,
//     padding: 24,
//     paddingBottom: 40,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: TEXT_DARK,
//     marginBottom: 24,
//   },
//   optionItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#F3F4F6',
//   },
//   optionText: {
//       fontSize: 16,
//       fontWeight: '600',
//       color: TEXT_DARK,
//       marginLeft: 16,
//   },
//   /* ADDED: Style for the Floating Close Button */
//   closeButton: {
//       width: 45,
//       height: 45,
//       borderRadius: 22.5,
//       backgroundColor: '#1A1D1E', // Dark background like image
//       justifyContent: 'center',
//       alignItems: 'center',
//       alignSelf: 'center',
//       marginBottom: 15,
//   }
// });

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
import { Address, useAddresses, useDeleteAddress } from '../api/hooks/address';
import { COLORS } from "../theme/color";

// --- THEME ---
const BG_COLOR = "#F8F9FD";
const CARD_BG = "#FFFFFF";
const TEXT_DARK = "#1A1D1E";
const TEXT_GREY = "#6C7278";


const AddressBookScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  // --- API HOOKS ---
  const { data: addressesData, isLoading } = useAddresses();
  const deleteMutation = useDeleteAddress();

  // Reverse so newest is on top ("on first")
  const addresses = addressesData ? [...addressesData].reverse() : [];

  // Modal State
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const handleGoBack = () => navigation.goBack();

  const handleAddAddress = () => Alert.alert("Add", "Open Add Form");

  // --- SHARE FUNCTION ---
  const handleShare = async (addr: any) => {
    try {
      await Share.share({
        message: `Address: ${addr.type}\n${addr.completeAddress}\nPhone: ${addr.receiverContact}`,
      });
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  // --- MODAL HANDLERS ---
  
  // Open the modal when "Edit" button is clicked
  const openOptions = (addr: Address) => {
    setSelectedAddress(addr);
    setModalVisible(true);
  };

  const closeOptions = () => {
    setModalVisible(false);
    setSelectedAddress(null);
  };

  // Option 1: Edit
  const handleEditOption = () => {
    if (selectedAddress) {
      closeOptions();
      navigation.navigate('SelectAddressScreen', { address: selectedAddress });
    }
  };

  // Option 2: Delete
  const handleDeleteOption = () => {
    if (selectedAddress) {
        Alert.alert("Delete Address", "Are you sure you want to remove this address?", [
            { text: "Cancel", style: "cancel", onPress: closeOptions },
            { 
                text: "Delete", 
                style: "destructive", 
                onPress: async () => {
                    try {
                        await deleteMutation.mutateAsync(selectedAddress.id);
                        closeOptions();
                    } catch (error: any) {
                        const msg = error.response?.data?.message || error.message || "Failed to delete address";
                        Alert.alert("Error", `${msg}\n\nDetails: ${JSON.stringify(error.response?.data || error)}`);
                    }
                }
            }
        ]);
    }
  };

  // Option 3: Update Delivery Instructions
  const handleUpdateInstructions = () => {
    if (selectedAddress) {
        Alert.alert("Update", "Update Delivery Instructions for " + selectedAddress.type);
    }
    closeOptions();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={BG_COLOR} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color={TEXT_DARK} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Address Book</Text>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>SAVED ADDRESSES</Text>

        {/* "Add New" Dashed Button */}
        <TouchableOpacity
          style={styles.addNewCard}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('SelectAddressScreen')}
        >
          <View style={styles.addIconCircle}>
            <Ionicons name="add" size={24} color={COLORS.primary} />
          </View>
          <Text style={styles.addNewText}>Add New Address</Text>
        </TouchableOpacity>

        {/* Address List */}
        <View style={styles.listContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 20 }} />
          ) : addresses.map((addr: any) => {
            const type = (addr.type || "other").toLowerCase();
            const isHome = type === "home";
            const iconName = isHome ? "home-outline" : "location-outline";
            const iconColor = isHome ? COLORS.primary : "#F97316"; 
            const iconBg = isHome ? "#E3F2FD" : "#FFF7ED";

            return (
              <View key={addr.id} style={styles.addressCard}>
                {/* Header Row: Icon + Label + Actions */}
                <View style={styles.cardHeader}>
                  <View style={styles.titleRow}>
                    <View
                      style={[styles.iconWrapper, { backgroundColor: iconBg }]}
                    >
                      <Ionicons name={iconName} size={20} color={iconColor} />
                    </View>
                    <View>
                      <Text style={styles.label}>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
                      <Text style={styles.tag}>{addr.city || "Ranchi"}</Text>
                    </View>
                  </View>

                  {/* Simple Actions */}
                  <View style={styles.actionsRow}>
                    <TouchableOpacity
                      style={styles.actionIconBtn}
                      onPress={() => openOptions(addr)}
                    >
                      <Ionicons name="pencil-outline" size={18} color={TEXT_GREY} />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.actionIconBtn}
                      onPress={() => handleShare(addr)}
                    >
                      <Ionicons name="share-social-outline" size={18} color={TEXT_GREY} />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Details */}
                <Text style={styles.detailsText} numberOfLines={2}>
                  {addr.completeAddress}
                </Text>

                {/* Footer Info */}
                <View style={styles.cardFooter}>
                  <View style={styles.metaItem}>
                    <Ionicons name="call-outline" size={14} color={TEXT_GREY} />
                    <Text style={styles.metaText}>{addr.receiverContact}</Text>
                  </View>
                  <View style={styles.dot} />
                  <View style={styles.metaItem}>
                    <Ionicons name="person-outline" size={14} color={TEXT_GREY} />
                    <Text style={styles.metaText}>{addr.receiverName}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        {addresses.length === 0 && (
          <View style={{ alignItems: "center", marginTop: 50 }}>
            <Text style={{ color: TEXT_GREY }}>No addresses found.</Text>
          </View>
        )}
      </ScrollView>

      {/* --- POPUP MODAL --- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeOptions}
      >
        <TouchableWithoutFeedback onPress={closeOptions}>
          <View style={styles.modalOverlay}>
            
            {/* ADDED: Cross/Close Button Floating Above */}
            <TouchableOpacity 
                style={styles.closeButton} 
                onPress={closeOptions}
                activeOpacity={0.8}
            >
                <Ionicons name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>

            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Address options</Text>

                {/* Option 1: Edit */}
                <TouchableOpacity style={styles.optionItem} onPress={handleEditOption}>
                    <Ionicons name="pencil-outline" size={22} color={TEXT_DARK} />
                    <Text style={styles.optionText}>Edit Address</Text>
                    <Ionicons name="chevron-forward" size={20} color={TEXT_GREY} style={{marginLeft: 'auto'}} />
                </TouchableOpacity>

                {/* Option 2: Delete */}
                <TouchableOpacity style={styles.optionItem} onPress={handleDeleteOption}>
                    <Ionicons name="trash-outline" size={22} color={TEXT_DARK} />
                    <Text style={styles.optionText}>Delete Address</Text>
                    <Ionicons name="chevron-forward" size={20} color={TEXT_GREY} style={{marginLeft: 'auto'}} />
                </TouchableOpacity>

                {/* Option 3: Update Instructions */}
                <TouchableOpacity style={styles.optionItem} onPress={handleUpdateInstructions}>
                    <Ionicons name="bicycle-outline" size={22} color={TEXT_DARK} />
                    <Text style={styles.optionText}>Update Delivery Instructions</Text>
                    <Ionicons name="chevron-forward" size={20} color={TEXT_GREY} style={{marginLeft: 'auto'}} />
                </TouchableOpacity>

              </View>
            </TouchableWithoutFeedback>
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
  },
  backBtn: {
    marginRight: 16,
    padding: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: TEXT_DARK,
    letterSpacing: -0.5,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#9CA3AF",
    marginBottom: 12,
    letterSpacing: 1,
    marginTop: 10,
  },

  /* Add New Card (Dashed) */
  addNewCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    borderStyle: "dashed",
    marginBottom: 20,
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  addIconCircle: {
    marginRight: 8,
  },
  addNewText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.primary,
  },

  /* Address List */
  listContainer: {
    gap: 16,
  },
  addressCard: {
    backgroundColor: CARD_BG,
    borderRadius: 16,
    padding: 16,
    // Soft Modern Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    color: TEXT_DARK,
    marginBottom: 2,
  },
  tag: {
    fontSize: 10,
    color: "#999",
    fontWeight: "600",
  },
  actionsRow: {
    flexDirection: "row",
    gap: 8,
  },
  actionIconBtn: {
    padding: 6,
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
  },
  detailsText: {
    fontSize: 14,
    color: TEXT_GREY,
    lineHeight: 20,
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingTop: 12,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaText: {
    fontSize: 12,
    color: TEXT_DARK,
    marginLeft: 6,
    fontWeight: "500",
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: "#D1D5DB",
    marginHorizontal: 10,
  },

  /* MODAL STYLES */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: TEXT_DARK,
    marginBottom: 24,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  optionText: {
      fontSize: 16,
      fontWeight: '600',
      color: TEXT_DARK,
      marginLeft: 16,
  },
  /* ADDED: Style for the Floating Close Button */
  closeButton: {
      width: 45,
      height: 45,
      borderRadius: 22.5,
      backgroundColor: '#1A1D1E', // Dark background like image
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      marginBottom: 15,
  }
});