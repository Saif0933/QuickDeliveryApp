
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  PermissionsAndroid,
  Platform,
  Alert,
  Linking,
  ActivityIndicator,
  Modal,
  TouchableWithoutFeedback,
  Share,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS } from "../theme/color";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocationStore } from "../store/locationStore";
import { checkLocationPermission, getCurrentLocation, requestLocationPermission, turnOnLocation } from "../utils/location";
import { OLA_API_KEY } from "../constants/apiKeys";
import { useAddresses, useDeleteAddress, Address } from '../api/hooks/address';


const LocationScreen: React.FC = () => {
  // 2. Initialize Navigation
  const navigation = useNavigation<any>();
  const setLocationValues = useLocationStore((state) => state.setLocation);
  
  // --- API HOOKS ---
  const { data: addressesData, isLoading: addressesLoading } = useAddresses();
  const deleteMutation = useDeleteAddress();
  const addresses = addressesData || [];

  // State for feedback
  const [address, setAddress] = useState(
    " "
  );
  const [isLoading, setIsLoading] = useState(false);

  // --- MODAL STATE ---
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [currentCoords, setCurrentCoords] = useState<{lat: number, lng: number} | null>(null);


  const handleCurrentLocation = async () => {
    setIsLoading(true);

    try {
      // Step 1: Check/Request Permission
      const hasPermission = await checkLocationPermission();
      if (!hasPermission) {
        const requested = await requestLocationPermission();
        if (!requested) {
          setIsLoading(false);
          return;
        }
      }

      // Step 2: Ensure location is turned on (Android)
      await turnOnLocation();

      // Step 3: Get location
      const location = await getCurrentLocation();
      if (location) {
        await fetchOlaAddress(location.latitude, location.longitude);
      }
    } catch (error: any) {
      console.error("Location error:", error);
      Alert.alert(
        "Location Error",
        error.message || "Failed to get your location. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOlaAddress = async (lat: number, lng: number) => {
    try {
      // Make sure this URL is correct per latest Ola Docs
      const url = `https://api.olamaps.io/places/v1/reverse-geocode?latlng=${lat},${lng}&api_key=${OLA_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data?.status === "ok" && data?.results?.[0]) {
        const fullAddress = data.results[0].formatted_address;
        const primary = fullAddress.split(',')[0] || 'Unknown';
        const secondary = fullAddress.split(',').slice(1).join(', ').trim() || '';

        setAddress(fullAddress);
        setLocationValues(lat, lng, primary, secondary);

        // Navigate back or show success? The user said "when I click on use current location it's not being set"
        // Usually, after setting location, we might want to go back to home.
        Alert.alert("Success", "Location updated successfully", [
          { text: "OK", onPress: () => navigation.goBack() }
        ]);
      } else {
        setAddress("Location detected (Check API Key)");
      }
    } catch (e) {
      Alert.alert("Error", "Could not fetch address details.");
    }
  };

  // --- NEW SHARE FUNCTION ---
  const handleShare = async (title: string, details: string) => {
    try {
      await Share.share({
        message: `${title}\n${details}`,
      });
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  // --- MODAL HANDLERS ---
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
              Alert.alert("Error", "Failed to delete address");
            }
          }
        }
      ]);
    }
  };

  const handleSelectSavedAddress = (addr: Address) => {
    if (addr.latitude && addr.longitude) {
      const primary = addr.type.charAt(0).toUpperCase() + addr.type.slice(1);
      setLocationValues(addr.latitude, addr.longitude, primary, addr.completeAddress);
      navigation.goBack();
    } else {
      Alert.alert("Error", "This address does not have valid coordinates.");
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Fixed Header Area for Search */}
      <View style={styles.headerContainer}>
        <View style={styles.headerTop}>
          {/* Back Button Added Here */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginRight: 12 }}
            activeOpacity={0.7}
          >
            <Icon name="arrow-back" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Select location</Text>
        </View>

        <View style={styles.searchBar}>
          <Icon name="search" size={22} color={COLORS.primary} />
          <TextInput
            placeholder="Search for area, street name..."
            style={styles.searchInput}
            placeholderTextColor={COLORS.muted}
          />
        </View>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Current Location */}
        <TouchableOpacity
          style={styles.actionRow}
          activeOpacity={0.7}
          onPress={handleCurrentLocation}
        >
          <View style={[styles.iconCircle, { backgroundColor: "#FFEBEE" }]}>
            <MaterialCommunityIcons
              name="crosshairs-gps"
              size={22}
              color={COLORS.primary}
            />
          </View>
          <View style={styles.rowText}>
            <Text style={[styles.rowTitle, { color: "#0049AD" }]}>
              {isLoading ? "Fetching..." : "Use current location"}
            </Text>
            <Text style={styles.rowSub} numberOfLines={1}>
              {address}
            </Text>
          </View>
          {isLoading && <ActivityIndicator size="small" color="#D32F2F" />}
        </TouchableOpacity>

        <View style={styles.divider} />

        {/* Add Address */}
        <TouchableOpacity
          style={styles.actionRow}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('SelectAddressScreen')}
        >
          <View style={[styles.iconCircle, { backgroundColor: "#E3F2FD" }]}>
            <Icon name="add" size={24} color={COLORS.primary} />
          </View>
          <View style={styles.rowText}>
            <Text style={styles.rowTitle}>Add Address</Text>
          </View>
          <Icon name="chevron-right" size={20} color={COLORS.muted} />
        </TouchableOpacity>

        <View style={styles.divider} />

        {/* Import Address */}
        {/* <TouchableOpacity style={styles.actionRow} activeOpacity={0.7}>
          <View style={[styles.iconCircle, { backgroundColor: "#F3E5F5" }]}>
            <MaterialCommunityIcons
              name="file-import"
              size={22}
              color="#7B1FA2"
            />
          </View>
          <View style={styles.rowText}>
            <Text style={styles.rowTitle}>Import from Minta</Text>
          </View>
          <Icon name="chevron-right" size={20} color={COLORS.muted} />
        </TouchableOpacity> */}

        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <Icon name="cloud-queue" size={20} color="#155724" />
          <Text style={styles.infoText}>
            During rains, delivery partners may take longer to reach you.
          </Text>
        </View>

        {/* Saved Addresses */}
        <Text style={styles.sectionHeader}>SAVED ADDRESSES</Text>

        {addressesLoading ? (
          <ActivityIndicator size="small" color={COLORS.primary} style={{ marginBottom: 20 }} />
        ) : (
          addresses.map((addr) => {
            const type = (addr.type || "other").toLowerCase();
            const isHome = type === "home";
            const iconName = isHome ? "home-outline" : "map-marker-outline";

            return (
              <TouchableOpacity 
                key={addr.id} 
                style={styles.card}
                activeOpacity={0.8}
                onPress={() => handleSelectSavedAddress(addr)}
              >
                <View style={styles.cardHeaderRow}>
                  <View style={styles.cardIconBg}>
                    <MaterialCommunityIcons
                      name={iconName}
                      size={22}
                      color={COLORS.textPrimary}
                    />
                  </View>
                  <View style={styles.cardText}>
                    <Text style={styles.cardTitle}>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
                    <Text style={styles.cardSub} numberOfLines={2}>
                      {addr.completeAddress}
                    </Text>
                  </View>
                  <View style={styles.distanceBadge}>
                    <Text style={styles.distanceText}>{addr.city || "Ranchi"}</Text>
                  </View>
                </View>

                <View style={styles.cardActions}>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => handleShare(type, addr.completeAddress)}
                  >
                    <Icon name="share" size={16} color={COLORS.primary} />
                    <Text style={styles.actionButtonText}>Share</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.actionButtonIcon} 
                    onPress={() => openOptions(addr)}
                  >
                    <MaterialCommunityIcons
                      name="dots-horizontal"
                      size={20}
                      color={COLORS.muted}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          })
        )}

    
  

        <Text style={styles.footer}>powered by Minta Club</Text>
        <View style={{ height: 20 }} />
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

            {/* Cross/Close Button Floating Above */}
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
                  <Ionicons name="pencil-outline" size={22} color={COLORS.textPrimary} />
                  <Text style={styles.optionText}>Edit Address</Text>
                  <Ionicons name="chevron-forward" size={20} color={COLORS.muted} style={{ marginLeft: 'auto' }} />
                </TouchableOpacity>

                {/* Option 2: Delete */}
                <TouchableOpacity style={styles.optionItem} onPress={handleDeleteOption}>
                  <Ionicons name="trash-outline" size={22} color={COLORS.textPrimary} />
                  <Text style={styles.optionText}>Delete Address</Text>
                  <Ionicons name="chevron-forward" size={20} color={COLORS.muted} style={{ marginLeft: 'auto' }} />
                </TouchableOpacity>

              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.background, // #fafafa
  },

  /* Header */
  headerContainer: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    zIndex: 10,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "flex-start", // Changed to align back button and title
    alignItems: "center",
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.textPrimary,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F7FA", // Light grey input
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: COLORS.textPrimary,
  },

  /* Scroll Content */
  scrollContainer: { flex: 1 },
  scrollContent: { padding: 16 },

  /* Action Rows */
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 0,
  },
  divider: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginHorizontal: 12,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  rowText: { flex: 1 },
  rowTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  rowSub: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },

  /* Info Banner */
  infoBanner: {
    backgroundColor: "#D1E7DD", // Soft green bg
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 12,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: "#BADBCC",
  },
  infoText: {
    fontSize: 13,
    color: "#0f5132",
    marginLeft: 10,
    flex: 1,
    fontWeight: "500",
    lineHeight: 18,
  },

  /* Headers */
  sectionHeader: {
    fontSize: 12,
    color: COLORS.muted,
    fontWeight: "800",
    marginBottom: 10,
    marginLeft: 4,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },

  /* Saved Address Card */
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    // Modern shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F5F5F5",
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  cardIconBg: {
    backgroundColor: "#F5F5F5",
    padding: 8,
    borderRadius: 10,
    marginRight: 12,
  },
  cardText: {
    flex: 1,
    marginRight: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  cardSub: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  distanceBadge: {
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  distanceText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontWeight: "600",
  },
  cardActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#FAFAFA",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
  },
  actionButtonText: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: "700",
    marginLeft: 6,
  },
  actionButtonIcon: {
    padding: 4,
  },

  /* Simple Cards (Nearby/Recent) */
  simpleCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  simpleCardRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  miniIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  simpleDistance: {
    fontSize: 12,
    color: COLORS.muted,
    fontWeight: "600",
  },

  /* Footer */
  footer: {
    fontSize: 12,
    color: "#CCC",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 40,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },

  /* --- MODAL STYLES --- */
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
    color: COLORS.textPrimary,
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
    color: COLORS.textPrimary,
    marginLeft: 16,
  },
  /* Floating Close Button Style */
  closeButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#1A1D1E',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 15,
  }
});

export default LocationScreen;