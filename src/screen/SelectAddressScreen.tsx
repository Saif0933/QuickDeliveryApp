
import { AxiosError } from 'axios';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { Region } from 'react-native-maps';
import api from '../api/api';
import {
  checkLocationPermission,
  getAddressFromCoords,
  getCurrentLocation,
  requestLocationPermission,
  turnOnLocation,
} from '../utils/location';
import { COLORS } from '../theme/color';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'; // 1. Imported useNavigation

const { height, width } = Dimensions.get('window');

function AddAddress() {
  const navigation = useNavigation(); // 2. Initialized navigation

  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [selectedTag, setSelectedTag] = useState('Home');
  const [completeAddress, setCompleteAddress] = useState('');
  const [floor, setFloor] = useState('');
  const [landmark, setLandmark] = useState('');
  const [instructions, setInstructions] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [receiverContact, setReceiverContact] = useState('');
  const [hasLocationPermission, setHasLocationPermission] =
    useState<boolean>(false);
  const [selectedCoords, setSelectedCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [currentAddress, setCurrentAddress] = useState('');
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [mapHeight, setMapHeight] = useState(0);

  const [formSubmitting, setFormSubmitting] = useState(false);

  const mapRef = useRef<MapView>(null);

  const handleSearchPress = () => {
    setShowSearchModal(true);
  };
  const handleAddDetailsPress = () => {
    setShowBottomSheet(true);
  };
  const handleChangePress = () => {
    setShowBottomSheet(true);
  };
  const closeBottomSheet = () => {
    setShowBottomSheet(false);
  };
  const closeSearchModal = () => {
    setShowSearchModal(false);
  };

  const handleLocationPermission = async () => {
    const granted = await requestLocationPermission();
    setHasLocationPermission(granted);
    if (granted) {
      const location = await getCurrentLocation();
      if (location) {
        setSelectedCoords(location);
        const address = await getAddressFromCoords(
          location.latitude,
          location.longitude,
        );
        setCurrentAddress(address);
        mapRef.current?.animateToRegion(
          {
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: initialRegion.latitudeDelta,
            longitudeDelta: initialRegion.longitudeDelta,
          },
          1000,
        );
      } else {
        ToastAndroid.show('Could not fetch location', ToastAndroid.LONG);
      }
    }
  };

  const handleTurnOnLocation = async () => {
    try {
      setLoadingLocation(true);
      if (hasLocationPermission) {
        await turnOnLocation();
        const location = await getCurrentLocation();
        if (location) {
          setSelectedCoords(location);
          const address = await getAddressFromCoords(
            location.latitude,
            location.longitude,
          );
          setCurrentAddress(address);
          mapRef.current?.animateToRegion(
            {
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: initialRegion.latitudeDelta,
              longitudeDelta: initialRegion.longitudeDelta,
            },
            1000,
          );
        } else {
          ToastAndroid.show('Could not fetch location', ToastAndroid.LONG);
        }
      } else {
        await handleLocationPermission();
      }
    } catch (error) {
    } finally {
      setLoadingLocation(false);
    }
  };

  useEffect(() => {
    const initLocationSetup = async () => {
      setLoadingLocation(true);
      try {
        const granted = await checkLocationPermission();
        setHasLocationPermission(granted ?? false);
        if (granted) {
          await turnOnLocation();
          const location = await getCurrentLocation();
          if (location) {
            setSelectedCoords(location);
            const address = await getAddressFromCoords(
              location.latitude,
              location.longitude,
            );
            setCurrentAddress(address);
            mapRef.current?.animateToRegion(
              {
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: initialRegion.latitudeDelta,
                longitudeDelta: initialRegion.longitudeDelta,
              },
              1000,
            );
          } else {
            ToastAndroid.show('Could not fetch location', ToastAndroid.LONG);
          }
        } else {
          const newGranted = await requestLocationPermission();
          setHasLocationPermission(newGranted);
          if (newGranted) {
            const location = await getCurrentLocation();
            if (location) {
              setSelectedCoords(location);
              const address = await getAddressFromCoords(
                location.latitude,
                location.longitude,
              );
              setCurrentAddress(address);
              mapRef.current?.animateToRegion(
                {
                  latitude: location.latitude,
                  longitude: location.longitude,
                  latitudeDelta: initialRegion.latitudeDelta,
                  longitudeDelta: initialRegion.longitudeDelta,
                },
                1000,
              );
            } else {
              ToastAndroid.show('Could not fetch location', ToastAndroid.LONG);
            }
          }
        }
      } catch (error) {
      } finally {
        setLoadingLocation(false);
      }
    };
    initLocationSetup();
  }, []);

  useEffect(() => {
    const updateAddress = async () => {
      if (selectedCoords) {
        const address = await getAddressFromCoords(
          selectedCoords.latitude,
          selectedCoords.longitude,
        );
        setCurrentAddress(address);
      }
    };
    updateAddress();
  }, [selectedCoords]);

  const tags = ['Home', 'Work', 'Other'];
  const onRegionChangeComplete = (region: Region) => {
    setSelectedCoords({
      latitude: region.latitude,
      longitude: region.longitude,
    });
  };

  const isFormValid =
    receiverName.trim().length > 0 &&
    receiverContact.trim().length >= 10 &&
    completeAddress.trim().length > 0 &&
    currentAddress.trim().length > 0;

  const Loader = () => (
    <ActivityIndicator size="large" color={COLORS.primary} />
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      {hasLocationPermission ? null : (
        <View style={styles.permissionBanner}>
          <Text style={styles.permissionText}>
            Location permission is required to use this feature.
          </Text>
        </View>
      )}
      <SafeAreaView style={styles.header}>
        <View style={styles.headerContent}>
          {/* 3. Added onPress to go back */}
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Confirm delivery location</Text>
        </View>
      </SafeAreaView>
      <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.searchBar} onPress={handleSearchPress}>
          <Text style={styles.searchIcon}>🔍</Text>
          <Text style={styles.searchPlaceholder}>
            Search for area, street name...
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{ flex: 1, position: 'relative' }}
        onLayout={event => setMapHeight(event.nativeEvent.layout.height)}
      >
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={initialRegion}
          onRegionChangeComplete={onRegionChangeComplete}
          showsUserLocation={true}
          showsMyLocationButton={true}
        />
        <View style={[styles.markerFixed, { top: mapHeight / 2 - 70 }]}>
          <Image
            source={require('../assets/location-icon.webp')}
            style={{ height: 80, width: 40 }}
          />
        </View>
      </View>
      <View style={styles.currentLocationContainer}>
        <TouchableOpacity
          style={styles.currentLocationButton}
          onPress={handleTurnOnLocation}
        >
          <Text style={styles.locationIcon}>📍</Text>
          <Text style={styles.currentLocationText}>Use current location</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.deliveryInfo}>
        <Text style={styles.deliveryLabel}>DELIVERING YOUR ORDER TO</Text>
        <View style={styles.addressContainer}>
          <Text style={styles.locationPin}>📍</Text>
          <View style={styles.addressTextContainer}>
            <Text style={styles.addressTitle}>
              {currentAddress.split(',')[0] || 'Unknown'}
            </Text>
            <Text style={styles.addressSubtitle}>
              {currentAddress.split(',').slice(1).join(', ') || ''}
            </Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.changeText} onPress={handleChangePress}>
              CHANGE
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.addDetailsButton}
        onPress={handleAddDetailsPress}
      >
        <Text style={styles.addDetailsText}>Add more address details</Text>
      </TouchableOpacity>

      <Modal
        visible={showBottomSheet}
        transparent={true}
        animationType="slide"
        onRequestClose={closeBottomSheet}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalBackground}
            onPress={closeBottomSheet}
          />
          <View style={styles.bottomSheet}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeBottomSheet}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
            <ScrollView
              style={styles.bottomSheetContent}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.bottomSheetTitle}>
                Enter complete address
              </Text>
              <View style={styles.receiverSection}>
                <Text style={styles.sectionLabel}>
                  Receiver details for this address
                </Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Receiver Name *"
                  value={receiverName}
                  onChangeText={setReceiverName}
                  placeholderTextColor={COLORS.muted}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Receiver Contact *"
                  value={receiverContact}
                  onChangeText={setReceiverContact}
                  maxLength={10}
                  placeholderTextColor={COLORS.muted}
                  keyboardType="phone-pad"
                />
              </View>
              <View style={styles.tagSection}>
                <Text style={styles.sectionLabel}>
                  Tag this location for later
                </Text>
                <ScrollView
                  style={styles.tagContainer}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                >
                  {tags.map((tag, index) => (
                    <TouchableOpacity
                      key={tag}
                      style={[
                        styles.tagButton,
                        selectedTag === tag && styles.tagButtonSelected,
                        index === tags.length - 1 && { marginRight: 0 },
                      ]}
                      onPress={() => setSelectedTag(tag)}
                    >
                      <Text
                        style={[
                          styles.tagText,
                          selectedTag === tag && styles.tagTextSelected,
                        ]}
                      >
                        {tag === 'Home' ? '🏠' : tag === 'Work' ? '🏢' : '📍'}{' '}
                        {tag}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              <View style={styles.currentAddressSection}>
                <View style={styles.currentAddressContainer}>
                  <Text style={styles.currentAddress}>{currentAddress}</Text>
                  <TouchableOpacity
                    style={styles.changeButton}
                    onPress={handleChangePress}
                  >
                    <Text style={styles.changeButtonText}>Change</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.mapPinNote}>
                  Updated based on your exact map pin
                </Text>
              </View>
              <View style={styles.formSection}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Complete Address *"
                  value={completeAddress}
                  onChangeText={setCompleteAddress}
                  placeholderTextColor={COLORS.muted}
                  multiline
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Floor (Optional)"
                  value={floor}
                  onChangeText={setFloor}
                  placeholderTextColor={COLORS.muted}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Landmark (Optional)"
                  value={landmark}
                  onChangeText={setLandmark}
                  placeholderTextColor={COLORS.muted}
                />
                <TextInput
                  style={styles.textInputDisabled}
                  placeholder="City *"
                  value="Ranchi"
                  editable={false}
                  placeholderTextColor={COLORS.muted}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Instructions (Optional)"
                  value={instructions}
                  onChangeText={setInstructions}
                  placeholderTextColor={COLORS.muted}
                  multiline
                />
              </View>
              <TouchableOpacity
                style={[
                  styles.confirmButton,
                  !isFormValid && styles.confirmButtonDisabled,
                  formSubmitting && styles.confirmButtonSubmitting,
                ]}
                disabled={!isFormValid}
                onPress={async () => {
                  if (!isFormValid) return;
                  try {
                    setFormSubmitting(true);
                    const res = await api.post('/user/address/create', {
                      type: selectedTag.toUpperCase(),
                      mainAddress: currentAddress || 'Unknown',
                      completeAddress,
                      receiverName,
                      receiverContact,
                      landMark: landmark,
                      floor,
                      city: 'Ranchi',
                      instructions,
                      latitude: selectedCoords?.latitude,
                      longitude: selectedCoords?.longitude,
                    });
                    if (res.data.success) {
                      ToastAndroid.show(
                        `${res.data.message || 'Address added successfully'}`,
                        ToastAndroid.LONG,
                      );
                    }
                  } catch (error) {
                    if (error instanceof AxiosError) {
                      ToastAndroid.show(
                        error.response?.data?.message ||
                          'Failed to add address',
                        ToastAndroid.LONG,
                      );
                    } else {
                      ToastAndroid.show(
                        'Failed to add address',
                        ToastAndroid.LONG,
                      );
                    }
                  } finally {
                    setFormSubmitting(false);
                  }
                  closeBottomSheet();
                }}
              >
                <Text
                  style={[
                    styles.confirmButtonText,
                    !isFormValid && styles.confirmButtonTextDisabled,
                    formSubmitting && styles.confirmButtonTextSubmitting,
                  ]}
                >
                  {formSubmitting ? 'Submitting...' : 'Confirm Address'}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showSearchModal}
        transparent={true}
        animationType="slide"
        onRequestClose={closeSearchModal}
      >
        <View style={styles.searchModalOverlay}>
          <SafeAreaView style={styles.searchModalContainer}>
            <View style={styles.searchModalHeader}>
              <TouchableOpacity
                style={styles.searchModalBackButton}
                onPress={closeSearchModal}
              >
                <Text style={styles.backArrow}>←</Text>
              </TouchableOpacity>
              <Text style={styles.searchModalTitle}>My Addresses</Text>
            </View>
            <View style={styles.searchModalInputContainer}>
              <Text style={styles.searchIcon}>🔍</Text>
              <TextInput
                style={styles.searchModalInput}
                placeholder="Search for area, street name..."
                placeholderTextColor={COLORS.muted}
                autoFocus
              />
            </View>
            <View style={styles.locationNoticeContainer}>
              <View style={styles.locationNotice}>
                <Text style={styles.locationIcon}>📍</Text>
                <View style={styles.locationNoticeTextContainer}>
                  <Text style={styles.locationNoticeTitle}>
                    Device location not enabled
                  </Text>
                  <Text style={styles.locationNoticeSubtitle}>
                    Tap here to enable your device location for a better
                    experience
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.enableButton}
                  onPress={handleTurnOnLocation}
                >
                  <Text style={styles.enableButtonText}>Enable</Text>
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView
              style={styles.searchModalContent}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.locationSection}>
                <Text style={styles.sectionTitle}>NEARBY LOCATIONS</Text>
                <TouchableOpacity style={styles.locationItem}>
                  <Text style={styles.locationPin}>📍</Text>
                  <View style={styles.locationDetails}>
                    <Text style={styles.locationName}>
                      Itsy Hotels Cradle Regency
                    </Text>
                    <Text style={styles.locationAddress}>
                      Beside New AG Colony Road, Basant Vihar, Kadru, Ashok
                      Nagar, Ranchi, J...
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.locationSection}>
                <Text style={styles.sectionTitle}>RECENT LOCATIONS</Text>
                <TouchableOpacity style={styles.locationItem}>
                  <View style={styles.recentLocationIcon}>
                    <Text style={styles.clockIcon}>🕐</Text>
                    <Text style={styles.distanceText}>0 m</Text>
                  </View>
                  <View style={styles.locationDetails}>
                    <Text style={styles.locationName}>Work</Text>
                    <Text style={styles.locationAddress}>
                      Harmu Housing Colony, Delatoli, Ranchi
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.googleAttribution}>
                <Text style={styles.poweredByText}>powered by </Text>
                <Text style={styles.googleText}>Google</Text>
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
      </Modal>
      {loadingLocation && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingBox}>
            <Loader />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  permissionBanner: {
    backgroundColor: COLORS.SOFT_RED,
    padding: 10,
    alignItems: 'center',
  },
  permissionText: {
    color: COLORS.RED,
    fontWeight: '500',
  },
  header: {
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondary,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    marginRight: 16,
  },
  backArrow: {
    fontSize: 24,
    color: COLORS.textPrimary,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  searchIcon: {
    marginRight: 12,
    fontSize: 16,
  },
  searchPlaceholder: {
    color: COLORS.muted,
    fontSize: 16,
  },
  map: {
    flex: 1,
  },
  markerFixed: {
    position: 'absolute',
    left: width / 2 - 20,
  },
  currentLocationContainer: {
    position: 'absolute',
    bottom: 230,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  currentLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  locationIcon: {
    marginRight: 8,
  },
  currentLocationText: {
    color: COLORS.primary,
    fontWeight: '800',
  },
  deliveryInfo: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.secondary,
  },
  deliveryLabel: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '600',
    marginBottom: 12,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationPin: {
    fontSize: 16,
    marginRight: 12,
  },
  addressTextContainer: {
    flex: 1,
    width: '70%',
    marginRight: 8,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  addressSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  changeText: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  addDetailsButton: {
    backgroundColor: COLORS.primary,
    marginHorizontal: 16,
    marginVertical: 16,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addDetailsText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalBackground: {
    flex: 1,
  },
  bottomSheet: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: height * 0.9,
    paddingTop: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.SOFT_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: COLORS.textSecondary,
  },
  bottomSheetContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  bottomSheetTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 24,
    marginTop: 8,
  },
  receiverSection: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  receiverDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondary,
  },
  phoneIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  receiverText: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  chevron: {
    fontSize: 18,
    color: COLORS.LITE_GRAY,
  },
  tagSection: {
    marginBottom: 24,
  },
  tagContainer: {
    flexDirection: 'row',
    paddingVertical: 4,
  },
  tagButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    backgroundColor: COLORS.white,
    marginRight: 12,
  },
  tagButtonSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.SOFT_BLUE,
  },
  tagText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  tagTextSelected: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  currentAddressSection: {
    marginBottom: 24,
  },
  currentAddressContainer: {
    backgroundColor: COLORS.SOFT_BLUE,
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  currentAddress: {
    fontSize: 16,
    color: COLORS.TEXT_DARK,
    flex: 1,
  },
  changeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  changeButtonText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  mapPinNote: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  formSection: {
    marginBottom: 32,
  },
  textInput: {
    borderWidth: 1,
    borderColor: COLORS.secondary,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 16,
    minHeight: 50,
    color: COLORS.textPrimary,
  },
  textInputDisabled: {
    borderWidth: 1,
    borderColor: COLORS.secondary,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 16,
    minHeight: 50,
    backgroundColor: COLORS.SOFT_BLUE,
    color: COLORS.LITE_GRAY,
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 32,
  },
  confirmButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButtonSubmitting: {
    backgroundColor: COLORS.accent,
    paddingVertical: 16,
  },
  confirmButtonDisabled: {
    backgroundColor: COLORS.LITE_GRAY,
  },
  confirmButtonTextDisabled: {
    color: COLORS.white,
    opacity: 0.6,
  },
  confirmButtonTextSubmitting: {
    opacity: 0.8,
  },
  searchModalOverlay: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  searchModalContainer: {
    flex: 1,
  },
  searchModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondary,
    backgroundColor: COLORS.white,
  },
  searchModalBackButton: {
    marginRight: 16,
  },
  searchModalTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  searchModalInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondary,
  },
  searchModalInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textPrimary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: COLORS.background,
    borderRadius: 8,
    marginLeft: 8,
  },
  locationNoticeContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: COLORS.white,
  },
  locationNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.SOFT_RED,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.RED,
  },
  locationNoticeTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  locationNoticeTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.RED,
    marginBottom: 4,
  },
  locationNoticeSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  enableButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  enableButtonText: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  searchModalContent: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  locationSection: {
    backgroundColor: COLORS.white,
    marginBottom: 16,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.muted,
    paddingHorizontal: 16,
    marginBottom: 16,
    letterSpacing: 1,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  locationDetails: {
    flex: 1,
    marginLeft: 12,
  },
  locationName: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  locationAddress: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  recentLocationIcon: {
    alignItems: 'center',
    minWidth: 40,
  },
  clockIcon: {
    fontSize: 16,
    marginBottom: 2,
  },
  distanceText: {
    fontSize: 10,
    color: COLORS.textSecondary,
  },
  googleAttribution: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: COLORS.white,
  },
  poweredByText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  googleText: {
    fontSize: 12,
    color: '#4285f4',
    fontWeight: '500',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  loadingBox: {
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  loadingText: {
    fontSize: 16,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
});

export default AddAddress;

const initialRegion: Region = {
  latitude: 23.357396,
  longitude: 85.311453,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};