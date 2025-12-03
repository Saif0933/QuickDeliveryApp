// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Alert,
//   SafeAreaView,
// } from "react-native";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import { useNavigation } from "@react-navigation/native";
// import { COLORS } from "../theme/color"; // ✅ Apply your theme

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

//   const [addresses, setAddresses] = useState<Address[]>([
//     {
//       id: "1",
//       label: "My Place",
//       details:
//         "balpan hospital 4 floor, 4 Floor, Balpan Children Hospital, Book...",
//       distance: "8 km",
//       phone: "+91-9334804356",
//       type: "other",
//     },
//     {
//       id: "2",
//       label: "Home",
//       details: "1 floor, Tarulia, Krishnapur, Kestopur, Kolkata",
//       distance: "332 km",
//       phone: "+91-9334804356",
//       type: "home",
//     },
//   ]);

//   const handleGoBack = () => navigation.goBack();

//   const handleEdit = (id: string) =>
//     Alert.alert("Edit", `Editing address with ID: ${id}`);

//   const handleDelete = (id: string) =>
//     Alert.alert("Delete", "Delete this address?", [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Delete",
//         style: "destructive",
//         onPress: () =>
//           setAddresses((prev) => prev.filter((a) => a.id !== id)),
//       },
//     ]);

//   const handleUpdateInstruction = (id: string) =>
//     Alert.alert("Update", `Update delivery instructions for ID: ${id}`);

//   const handleAddAddress = () =>
//     Alert.alert("Add Address", "Navigate to add address form");

//   const handleImport = () =>
//     Alert.alert("Import", "Import addresses from Blinkit");

//   const EmptyState = () => (
//     <View style={styles.emptyContainer}>
//       <View style={styles.emptyIconContainer}>
//         <Icon name="location-on" size={64} color={COLORS.muted} />
//       </View>

//       <Text style={styles.emptyTitle}>No Addresses Yet</Text>

//       <Text style={styles.emptySubtitle}>
//         Save your home, work, or favorite spots to make ordering easier next time.
//       </Text>

//       <TouchableOpacity style={styles.primaryBtn} onPress={handleAddAddress}>
//         <Icon name="add" size={20} color={COLORS.white} />
//         <Text style={styles.primaryBtnText}>Add Address</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backBtn} onPress={handleGoBack}>
//           <Icon name="arrow-back" size={24} color={COLORS.textPrimary} />
//         </TouchableOpacity>

//         <Text style={styles.headerTitle}>My Addresses</Text>

//         <View style={styles.headerSpacer} />
//       </View>

//       <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
//         {/* QUICK ACTIONS */}
//         <View style={styles.actionsRow}>
//           <TouchableOpacity style={styles.actionBtn} onPress={handleAddAddress}>
//             <Icon name="add-location-alt" size={24} color={COLORS.primary} />
//             <Text style={styles.actionText}>Add New</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.actionBtn} onPress={handleImport}>
//             <Icon name="file-download" size={24} color={COLORS.highlight} />
//             <Text style={styles.actionText}>Import</Text>
//           </TouchableOpacity>
//         </View>

//         {/* ADDRESS CARDS */}
//         {addresses.length > 0 ? (
//           <View style={styles.listContainer}>
//             {addresses.map((addr) => (
//               <View key={addr.id} style={styles.addressCard}>
//                 <View style={styles.iconWrapper}>
//                   <Icon
//                     name={addr.type === "home" ? "home" : "location-on"}
//                     size={28}
//                     color={
//                       addr.type === "home" ? COLORS.highlight : COLORS.primary
//                     }
//                   />
//                 </View>

//                 <View style={styles.content}>
//                   <View style={styles.labelContainer}>
//                     <Text style={styles.label}>{addr.label}</Text>

//                     <View
//                       style={[
//                         styles.typeChip,
//                         addr.type === "home"
//                           ? styles.homeChip
//                           : styles.otherChip,
//                       ]}
//                     >
//                       <Text
//                         style={[
//                           styles.chipText,
//                           addr.type !== "home" && { color: COLORS.primary },
//                         ]}
//                       >
//                         {addr.type.toUpperCase()}
//                       </Text>
//                     </View>
//                   </View>

//                   <Text style={styles.details} numberOfLines={2}>
//                     {addr.details}
//                   </Text>

//                   <View style={styles.metaRow}>
//                     <Text style={styles.distance}>{addr.distance} away</Text>
//                     <Text style={styles.phone}>{addr.phone}</Text>
//                   </View>
//                 </View>

//                 <View style={styles.actionsColumn}>
//                   <TouchableOpacity
//                     style={styles.miniBtn}
//                     onPress={() => handleUpdateInstruction(addr.id)}
//                   >
//                     <Icon name="edit-note" size={20} color={COLORS.accent} />
//                   </TouchableOpacity>

//                   <TouchableOpacity
//                     style={styles.miniBtn}
//                     onPress={() => handleEdit(addr.id)}
//                   >
//                     <Icon name="edit" size={20} color={COLORS.highlight} />
//                   </TouchableOpacity>

//                   <TouchableOpacity
//                     style={styles.miniBtn}
//                     onPress={() => handleDelete(addr.id)}
//                   >
//                     <Icon name="delete-outline" size={20} color={COLORS.primary} />
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             ))}
//           </View>
//         ) : (
//           <EmptyState />
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default AddressBookScreen;

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },

//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 16,
//     backgroundColor: COLORS.white,
//   },

//   backBtn: {
//     padding: 4,
//   },

//   headerTitle: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: COLORS.textPrimary,
//     flex: 1,
//     marginLeft: 12,
//   },

//   headerSpacer: {
//     width: 24,
//   },

//   container: {
//     flex: 1,
//     paddingHorizontal: 16,
//     paddingTop: 8,
//   },

//   actionsRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 24,
//     gap: 12,
//   },

//   actionBtn: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 12,
//     justifyContent: "center",
//     borderRadius: 12,
//     borderWidth: 1,
//     backgroundColor: COLORS.white,
//     borderColor: COLORS.secondary,
//   },

//   actionText: {
//     marginLeft: 8,
//     fontSize: 14,
//     fontWeight: "600",
//     color: COLORS.textSecondary,
//   },

//   listContainer: {
//     gap: 12,
//   },

//   addressCard: {
//     flexDirection: "row",
//     backgroundColor: COLORS.white,
//     borderRadius: 12,
//     padding: 16,
//     elevation: 1,
//   },

//   iconWrapper: {
//     marginRight: 12,
//     paddingTop: 2,
//   },

//   content: {
//     flex: 1,
//   },

//   labelContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 4,
//   },

//   label: {
//     flex: 1,
//     fontSize: 18,
//     fontWeight: "700",
//     color: COLORS.textPrimary,
//   },

//   typeChip: {
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 8,
//   },

//   homeChip: {
//     backgroundColor: COLORS.highlight + "22",
//   },

//   otherChip: {
//     backgroundColor: COLORS.accent + "33",
//   },

//   chipText: {
//     fontSize: 12,
//     fontWeight: "600",
//     color: COLORS.highlight,
//   },

//   details: {
//     fontSize: 14,
//     color: COLORS.textSecondary,
//     lineHeight: 20,
//     marginBottom: 8,
//   },

//   metaRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },

//   distance: {
//     fontSize: 13,
//     color: COLORS.muted,
//   },

//   phone: {
//     fontSize: 13,
//     color: COLORS.textPrimary,
//   },

//   actionsColumn: {
//     alignItems: "center",
//     gap: 12,
//   },

//   miniBtn: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     backgroundColor: COLORS.background,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   emptyContainer: {
//     flex: 1,
//     alignItems: "center",
//     paddingHorizontal: 32,
//     paddingTop: 40,
//   },

//   emptyIconContainer: {
//     marginBottom: 16,
//   },

//   emptyTitle: {
//     fontSize: 24,
//     fontWeight: "600",
//     color: COLORS.textPrimary,
//     marginBottom: 8,
//     textAlign: "center",
//   },

//   emptySubtitle: {
//     fontSize: 16,
//     color: COLORS.textSecondary,
//     textAlign: "center",
//     marginBottom: 24,
//   },

//   primaryBtn: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: COLORS.primary,
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 12,
//   },

//   primaryBtnText: {
//     marginLeft: 8,
//     color: COLORS.white,
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });


import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  StatusBar,
} from "react-native";
// import Icon from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../theme/color";
import { SafeAreaView } from "react-native-safe-area-context";

// --- THEME ---
const BG_COLOR = "#F8F9FD";
const CARD_BG = "#FFFFFF";
const TEXT_DARK = "#1A1D1E";
const TEXT_GREY = "#6C7278";

type Address = {
  id: string;
  label: string;
  details: string;
  distance: string;
  phone: string;
  type: "home" | "work" | "other";
};

const AddressBookScreen: React.FC = () => {
  const navigation = useNavigation();

  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      label: "My Place",
      details: "4th Floor, Balpan Children Hospital, Bariatu, Ranchi",
      distance: "8 km",
      phone: "9334804356",
      type: "other",
    },
    {
      id: "2",
      label: "Home",
      details: "1st floor, Tarulia, Krishnapur, Kestopur, Kolkata",
      distance: "332 km",
      phone: "9876543210",
      type: "home",
    },
  ]);

  const handleGoBack = () => navigation.goBack();

  const handleEdit = (id: string) =>
    Alert.alert("Edit", `Edit address ${id}`);

  const handleDelete = (id: string) =>
    Alert.alert("Delete", "Remove this address?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () => setAddresses((prev) => prev.filter((a) => a.id !== id)),
      },
    ]);

  const handleAddAddress = () => Alert.alert("Add", "Open Add Form");

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
          onPress={handleAddAddress}
          activeOpacity={0.7}
        >
          <View style={styles.addIconCircle}>
            <Ionicons name="add" size={24} color={COLORS.primary} />
          </View>
          <Text style={styles.addNewText}>Add New Address</Text>
        </TouchableOpacity>

        {/* Address List */}
        <View style={styles.listContainer}>
          {addresses.map((addr) => {
            const isHome = addr.type === "home";
            const iconName = isHome ? "home-outline" : "location-outline";
            const iconColor = isHome ? COLORS.primary : "#F97316"; // Orange for other
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
                        <Text style={styles.label}>{addr.label}</Text>
                        <Text style={styles.tag}>{addr.type.toUpperCase()}</Text>
                    </View>
                  </View>

                  {/* Simple Actions */}
                  <View style={styles.actionsRow}>
                    <TouchableOpacity
                      style={styles.actionIconBtn}
                      onPress={() => handleEdit(addr.id)}
                    >
                      <Ionicons name="pencil-outline" size={18} color={TEXT_GREY} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.actionIconBtn}
                      onPress={() => handleDelete(addr.id)}
                    >
                      <Ionicons name="trash-outline" size={18} color="#EF4444" />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Details */}
                <Text style={styles.detailsText} numberOfLines={2}>
                  {addr.details}
                </Text>

                {/* Footer Info */}
                <View style={styles.cardFooter}>
                  <View style={styles.metaItem}>
                    <Ionicons name="call-outline" size={14} color={TEXT_GREY} />
                    <Text style={styles.metaText}>{addr.phone}</Text>
                  </View>
                  <View style={styles.dot} />
                  <View style={styles.metaItem}>
                    <Ionicons name="navigate-outline" size={14} color={TEXT_GREY} />
                    <Text style={styles.metaText}>{addr.distance}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        {addresses.length === 0 && (
            <View style={{alignItems: 'center', marginTop: 50}}>
                <Text style={{color: TEXT_GREY}}>No addresses found.</Text>
            </View>
        )}
      </ScrollView>
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
      color: '#999',
      fontWeight: '600',
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
});