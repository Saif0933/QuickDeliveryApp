import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  ScrollView,
  Switch,
  ActivityIndicator,
  Alert,
  Platform,
  Dimensions,
  PermissionsAndroid,
} from 'react-native';
import MapView, { Marker, Region, UrlTile } from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { useCreateAddress } from '../../api/hook/user/user.address';

const { width, height } = Dimensions.get('window');

// Define the OLA Maps API Key constant
// The developer should replace this with their actual active key.
const OLA_API_KEY = 'YOUR_OLA_API_KEY';

// Mock locations for fallback when API Key is empty/invalid or rate-limited
const mockLocations = [
  {
    description: "Circular Road, Lalpur, Ranchi, Jharkhand, India",
    place_id: "mock-ranchi-1",
    geometry: { location: { lat: 23.3702, lng: 85.3250 } },
    city: "Ranchi"
  },
  {
    description: "Nucleus Mall, Circular Road, Lalpur, Ranchi, Jharkhand, India",
    place_id: "mock-ranchi-2",
    geometry: { location: { lat: 23.3688, lng: 85.3256 } },
    city: "Ranchi"
  },
  {
    description: "Ranchi Hill, Ranchi, Jharkhand, India",
    place_id: "mock-ranchi-3",
    geometry: { location: { lat: 23.3682, lng: 85.3120 } },
    city: "Ranchi"
  },
  {
    description: "Kempegowda International Airport, Bengaluru, Karnataka, India",
    place_id: "mock-1",
    geometry: { location: { lat: 13.1986, lng: 77.7066 } },
    city: "Bengaluru"
  },
  {
    description: "Zara, Brigade Road, Ashok Nagar, Bengaluru, Karnataka, India",
    place_id: "mock-2",
    geometry: { location: { lat: 12.9738, lng: 77.6074 } },
    city: "Bengaluru"
  },
  {
    description: "Phoenix Marketcity, Whitefield Main Road, Mahadevapura, Bengaluru, Karnataka, India",
    place_id: "mock-3",
    geometry: { location: { lat: 12.9958, lng: 77.6963 } },
    city: "Bengaluru"
  },
  {
    description: "Gateway of India, Apollo Bandar, Colaba, Mumbai, Maharashtra, India",
    place_id: "mock-4",
    geometry: { location: { lat: 18.9220, lng: 72.8347 } },
    city: "Mumbai"
  },
  {
    description: "Connaught Place, New Delhi, Delhi, India",
    place_id: "mock-5",
    geometry: { location: { lat: 28.6304, lng: 77.2177 } },
    city: "Delhi"
  },
  {
    description: "H&M, High Street Phoenix, Lower Parel, Mumbai, Maharashtra, India",
    place_id: "mock-6",
    geometry: { location: { lat: 18.9942, lng: 72.8256 } },
    city: "Mumbai"
  },
];

export default function AddAddressScreen({ navigation }: any) {
  const createAddressMutation = useCreateAddress();
  const mapRef = useRef<MapView>(null);

  // Map & Location States
  const [coordinates, setCoordinates] = useState({
    latitude: 23.357415, // Default Ranchi
    longitude: 85.311483,
  });
  const [region, setRegion] = useState<Region>({
    latitude: 23.357415,
    longitude: 85.311483,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });
  const [loadingLocation, setLoadingLocation] = useState(false);

  // Search & Autocomplete States
  const [query, setQuery] = useState('');
  const [predictions, setPredictions] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Form States
  const [type, setType] = useState('Home');
  const [receiverName, setReceiverName] = useState('');
  const [receiverContact, setReceiverContact] = useState('');
  const [mainAddress, setMainAddress] = useState('');
  const [city, setCity] = useState('');
  const [landMark, setLandMark] = useState('');
  const [floor, setFloor] = useState('');
  const [isDefault, setIsDefault] = useState(false);

  // Debouncing search requests
  useEffect(() => {
    if (!query.trim()) {
      setPredictions([]);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      fetchAutocomplete(query);
    }, 600);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  // Load default Ranchi address details on screen mount
  useEffect(() => {
    handleReverseGeocode(23.357415, 85.311483);
  }, []);



  const geocodeTimeoutRef = useRef<any>(null);

  // Clear geocoding debounce on unmount
  useEffect(() => {
    return () => {
      if (geocodeTimeoutRef.current) {
        clearTimeout(geocodeTimeoutRef.current);
      }
    };
  }, []);



  // Trigger when map is panned/moved
  const handleRegionChangeComplete = (newRegion: Region) => {
    // Update coordinates state for form submissions
    setCoordinates({
      latitude: newRegion.latitude,
      longitude: newRegion.longitude,
    });

    // Debounce the reverse geocoding API request to avoid rate-limiting
    if (geocodeTimeoutRef.current) {
      clearTimeout(geocodeTimeoutRef.current);
    }

    geocodeTimeoutRef.current = setTimeout(() => {
      handleReverseGeocode(newRegion.latitude, newRegion.longitude);
    }, 600);
  };

  // Get current user location and geocode it
  const handleGetCurrentLocation = async () => {
    setLoadingLocation(true);

    try {
      console.log('Fetching IP-based location...');
      const response = await axios.get('https://ipapi.co/json/', { timeout: 4000 });
      if (response.data && response.data.latitude && response.data.longitude) {
        const { latitude, longitude } = response.data;
        const newCoords = { latitude, longitude };
        setCoordinates(newCoords);
        
        const newRegion = {
          latitude,
          longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        };
        setRegion(newRegion);
        mapRef.current?.animateToRegion(newRegion, 1000);
        
        handleReverseGeocode(latitude, longitude);
        setLoadingLocation(false);
        return;
      }
    } catch (ipErr) {
      console.warn('IP location lookup failed, using default Ranchi coordinates:', ipErr);
    }

    // Fallback directly to user's Ranchi coordinates
    const defaultLat = 23.357415;
    const defaultLng = 85.311483;
    const newCoords = { latitude: defaultLat, longitude: defaultLng };
    setCoordinates(newCoords);
    
    const newRegion = {
      latitude: defaultLat,
      longitude: defaultLng,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    };
    setRegion(newRegion);
    mapRef.current?.animateToRegion(newRegion, 1000);
    
    handleReverseGeocode(defaultLat, defaultLng);
    setLoadingLocation(false);
  };

  // Distance helper to find nearest mock location
  const getNearestMockLocation = (lat: number, lng: number) => {
    let minDistance = Infinity;
    let nearest = mockLocations[0];

    mockLocations.forEach((loc) => {
      const dLat = loc.geometry.location.lat - lat;
      const dLng = loc.geometry.location.lng - lng;
      const distance = Math.sqrt(dLat * dLat + dLng * dLng);
      if (distance < minDistance) {
        minDistance = distance;
        nearest = loc;
      }
    });

    return { nearest, distance: minDistance };
  };

  // Ola Maps Autocomplete API call with OpenStreetMap Nominatim fallback
  const fetchAutocomplete = async (searchText: string) => {
    setIsSearching(true);
    try {
      if (OLA_API_KEY && OLA_API_KEY !== 'YOUR_OLA_API_KEY') {
        const url = `https://api.olamaps.io/places/v1/autocomplete?input=${encodeURIComponent(
          searchText
        )}&location=${coordinates.latitude},${coordinates.longitude}&api_key=${OLA_API_KEY}`;

        const response = await axios.get(url, {
          headers: { 'X-Request-Id': `req-${Date.now()}` },
        });

        if (response.data && response.data.predictions) {
          setPredictions(response.data.predictions);
          setIsSearching(false);
          return;
        }
      }
    } catch (error) {
      console.warn('Ola Autocomplete error, trying OpenStreetMap:', error);
    }

    // Fallback: OpenStreetMap Nominatim search
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        searchText
      )}&limit=6&addressdetails=1&countrycodes=in`;
      
      const response = await axios.get(url, {
        headers: { 'User-Agent': 'QuickDeliveryApp/1.0' },
      });

      if (response.data && response.data.length > 0) {
        const osmPredictions = response.data.map((item: any) => {
          const addressData = item.address;
          const cityName =
            addressData.city ||
            addressData.town ||
            addressData.village ||
            addressData.suburb ||
            'Bengaluru';
          return {
            description: item.display_name,
            place_id: `osm-${item.place_id}-${item.lat}-${item.lon}`,
            geometry: { location: { lat: parseFloat(item.lat), lng: parseFloat(item.lon) } },
            city: cityName,
          };
        });
        setPredictions(osmPredictions);
        setIsSearching(false);
        return;
      }
    } catch (osmError) {
      console.warn('OSM Autocomplete error, falling back to local mocks:', osmError);
    }

    // Final Fallback: Local mock search
    const filtered = mockLocations.filter((item) =>
      item.description.toLowerCase().includes(searchText.toLowerCase())
    );
    setPredictions(filtered);
    setIsSearching(false);
  };

  // Ola Maps Place Details API call
  const handleSelectPlace = async (item: any) => {
    setQuery(item.description);
    setPredictions([]);

    if (item.place_id.startsWith('mock-') || item.place_id.startsWith('osm-')) {
      const lat = item.geometry.location.lat;
      const lng = item.geometry.location.lng;
      setCoordinates({ latitude: lat, longitude: lng });
      setMainAddress(item.description);
      setCity(item.city || 'Bengaluru');

      const newRegion = {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      };
      setRegion(newRegion);
      mapRef.current?.animateToRegion(newRegion, 1000);
      return;
    }

    try {
      const url = `https://api.olamaps.io/places/v1/details?place_id=${item.place_id}&api_key=${OLA_API_KEY}`;
      const response = await axios.get(url, {
        headers: { 'X-Request-Id': `req-${Date.now()}` },
      });

      const result = response.data?.result;
      if (result) {
        const lat = result.geometry?.location?.lat;
        const lng = result.geometry?.location?.lng;
        const formattedAddress = result.formatted_address || item.description;

        let cityName = 'Bengaluru';
        if (result.address_components) {
          const locality = result.address_components.find((comp: any) =>
            comp.types?.includes('locality') || comp.types?.includes('administrative_area_level_2')
          );
          if (locality) {
            cityName = locality.long_name;
          }
        }

        if (lat && lng) {
          setCoordinates({ latitude: lat, longitude: lng });
          setMainAddress(formattedAddress);
          setCity(cityName);

          const newRegion = {
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          };
          setRegion(newRegion);
          mapRef.current?.animateToRegion(newRegion, 1000);
        }
      }
    } catch (error) {
      console.warn('Ola Place Details error:', error);
      Alert.alert('Details Error', 'Failed to fetch coordinates for the selected place.');
    }
  };

  // Ola Maps & OSM Reverse Geocoding API call
  const handleReverseGeocode = async (lat: number, lng: number) => {
    // 1. Try Ola Maps API if API Key is configured
    if (OLA_API_KEY && OLA_API_KEY !== 'YOUR_OLA_API_KEY') {
      try {
        const url = `https://api.olamaps.io/places/v1/reverse-geocode?latlng=${lat},${lng}&api_key=${OLA_API_KEY}`;
        const response = await axios.get(url, {
          headers: { 'X-Request-Id': `req-${Date.now()}` },
        });

        const results = response.data?.results;
        if (results && results.length > 0) {
          const firstResult = results[0];
          const address = firstResult.formatted_address;

          let cityName = '';
          if (firstResult.address_components) {
            const locality = firstResult.address_components.find((comp: any) =>
              comp.types?.includes('locality') || comp.types?.includes('administrative_area_level_2')
            );
            if (locality) {
              cityName = locality.long_name;
            }
          }

          if (!cityName) {
            const parts = address.split(',');
            if (parts.length > 2) {
              cityName = parts[parts.length - 3].trim();
            } else {
              cityName = 'Bengaluru';
            }
          }

          setMainAddress(address);
          setCity(cityName);
          return;
        }
      } catch (error) {
        console.warn('Ola Reverse Geocode error, trying OSM fallback:', error);
      }
    }

    // 2. Try OpenStreetMap Nominatim API fallback (Free, no Key required)
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`;
      const response = await axios.get(url, {
        headers: { 'User-Agent': 'QuickDeliveryApp/1.0' },
      });

      if (response.data && response.data.display_name) {
        const address = response.data.display_name;
        const addressData = response.data.address || {};
        const cityName =
          addressData.city ||
          addressData.town ||
          addressData.village ||
          addressData.suburb ||
          'Bengaluru';

        setMainAddress(address);
        setCity(cityName);
        return;
      }
    } catch (osmError) {
      console.warn('OSM Reverse Geocode failed, using nearest mock:', osmError);
    }

    // 3. Last fallback: Find closest mock location in mockLocations list
    const { nearest } = getNearestMockLocation(lat, lng);
    setMainAddress(`${nearest.description} (Near: ${lat.toFixed(4)}, ${lng.toFixed(4)})`);
    setCity(nearest.city || 'Bengaluru');
  };





  const handleSave = () => {
    if (!mainAddress.trim()) {
      Alert.alert('Validation Error', 'Address location is required. Please search or select on map.');
      return;
    }
    if (!city.trim()) {
      Alert.alert('Validation Error', 'City name is required.');
      return;
    }
    if (!receiverName.trim()) {
      Alert.alert('Validation Error', "Recipient's Name is required.");
      return;
    }
    if (!receiverContact.trim()) {
      Alert.alert('Validation Error', "Recipient's Contact Number is required.");
      return;
    }

    const payload = {
      type,
      mainAddress,
      completeAddress: floor ? `${floor}, ${mainAddress}` : mainAddress,
      receiverName,
      receiverContact,
      landMark: landMark || undefined,
      floor: floor || undefined,
      city,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      isDefault,
    };

    createAddressMutation.mutate(payload, {
      onSuccess: () => {
        Alert.alert('Success', 'Address added successfully!');
        navigation.goBack();
      },
      onError: (error: any) => {
        const errorMsg = error?.response?.data?.message || error?.message || 'Failed to save address.';
        Alert.alert('Error', errorMsg);
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="keyboard-arrow-left" size={28} color="#1e2022" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Delivery Location</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Search Autocomplete Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <MaterialIcons name="search" size={22} color="#7a7f9a" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
            placeholder="Search area, landmark or street..."
            placeholderTextColor="#7a7f9a"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')} style={styles.clearBtn}>
              <MaterialIcons name="cancel" size={18} color="#7a7f9a" />
            </TouchableOpacity>
          )}
        </View>

        {/* Autocomplete Predictions List */}
        {predictions.length > 0 && (
          <View style={styles.predictionsList}>
            {isSearching ? (
              <ActivityIndicator size="small" color="#A87C53" style={{ marginVertical: 12 }} />
            ) : (
              <ScrollView keyboardShouldPersistTaps="handled" style={{ maxHeight: 200 }}>
                {predictions.map((item, index) => (
                  <TouchableOpacity
                    key={item.place_id || index}
                    style={styles.predictionItem}
                    onPress={() => handleSelectPlace(item)}
                  >
                    <MaterialIcons name="location-on" size={18} color="#A87C53" style={styles.pinIcon} />
                    <Text style={styles.predictionText} numberOfLines={2}>
                      {item.description}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        {/* Map Section */}
        <View style={styles.mapWrapper}>
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={region}
            onRegionChangeComplete={handleRegionChangeComplete}
          >
            {OLA_API_KEY && OLA_API_KEY !== 'YOUR_OLA_API_KEY' && (
              <UrlTile
                urlTemplate={`https://api.olamaps.io/tiles/v1/styles/default-light-standard/{z}/{x}/{y}.png?api_key=${OLA_API_KEY}`}
                maximumZ={19}
                minimumZ={0}
                tileSize={256}
              />
            )}
          </MapView>

          {/* Absolute Center Pin Overlay */}
          <View style={styles.centerPinContainer} pointerEvents="none">
            <MaterialIcons name="location-on" size={42} color="#A87C53" />
            <View style={styles.centerPinDot} />
          </View>

          {/* Map Overlay Button: Locate Me */}
          <TouchableOpacity
            style={styles.locateBtn}
            onPress={handleGetCurrentLocation}
            activeOpacity={0.8}
          >
            {loadingLocation ? (
              <ActivityIndicator size="small" color="#A87C53" />
            ) : (
              <MaterialIcons name="my-location" size={22} color="#A87C53" />
            )}
          </TouchableOpacity>
        </View>

        {/* Form Details section */}
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Address Details</Text>

          {/* Selected Address Display */}
          <View style={styles.selectedAddressBox}>
            <MaterialIcons name="location-on" size={20} color="#A87C53" />
            <View style={styles.selectedAddressTextContainer}>
              <Text style={styles.selectedAddressLabel}>Selected Location</Text>
              <Text style={styles.selectedAddressText}>
                {mainAddress || 'Tap on map or search to select location'}
              </Text>
            </View>
          </View>

          {/* Form Input fields */}
          <Text style={styles.inputLabel}>Recipient Name</Text>
          <TextInput
            style={styles.input}
            value={receiverName}
            onChangeText={setReceiverName}
            placeholder="e.g. John Doe"
            placeholderTextColor="#7a7f9a"
          />

          <Text style={styles.inputLabel}>Recipient Phone Number</Text>
          <TextInput
            style={styles.input}
            value={receiverContact}
            onChangeText={setReceiverContact}
            keyboardType="phone-pad"
            placeholder="e.g. 9876543210"
            placeholderTextColor="#7a7f9a"
          />

          <Text style={styles.inputLabel}>City</Text>
          <TextInput
            style={styles.input}
            value={city}
            onChangeText={setCity}
            placeholder="City"
            placeholderTextColor="#7a7f9a"
          />

          <Text style={styles.inputLabel}>Floor / Apartment (Optional)</Text>
          <TextInput
            style={styles.input}
            value={floor}
            onChangeText={setFloor}
            placeholder="e.g. 3rd Floor, Apt 12"
            placeholderTextColor="#7a7f9a"
          />

          <Text style={styles.inputLabel}>Landmark (Optional)</Text>
          <TextInput
            style={styles.input}
            value={landMark}
            onChangeText={setLandMark}
            placeholder="e.g. Near Big Temple"
            placeholderTextColor="#7a7f9a"
          />

          {/* Address Type Selector */}
          <Text style={styles.inputLabel}>Address Type</Text>
          <View style={styles.typeSelector}>
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

          {/* Default Switch */}
          <View style={styles.switchContainer}>
            <View style={styles.switchTextContainer}>
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

          {/* Save Button */}
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
            disabled={createAddressMutation.isPending}
            activeOpacity={0.9}
          >
            {createAddressMutation.isPending ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text style={styles.saveButtonText}>Save Address</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    zIndex: 10,
  },
  backButton: {
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
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    zIndex: 100,
    borderBottomWidth: 1,
    borderColor: '#f3ede4',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F5F0',
    borderWidth: 1,
    borderColor: '#e2dcd0',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 46,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1e2022',
    paddingVertical: 0,
  },
  clearBtn: {
    padding: 4,
  },
  predictionsList: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2dcd0',
    borderRadius: 12,
    marginTop: 6,
    maxHeight: 210,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    position: 'absolute',
    top: 56,
    left: 16,
    right: 16,
    zIndex: 1000,
  },
  predictionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f3ede4',
  },
  pinIcon: {
    marginRight: 10,
  },
  predictionText: {
    flex: 1,
    fontSize: 13,
    color: '#1e2022',
    lineHeight: 18,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  mapWrapper: {
    height: 240,
    width: '100%',
    position: 'relative',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  centerPinContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -21, // Half of pin size (42/2)
    marginTop: -42,  // Full height of pin so tip sits exactly at center
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerPinDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(0,0,0,0.35)',
    marginTop: -2,
  },
  locateBtn: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#ffffff',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#e2dcd0',
  },
  formContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e2022',
    marginBottom: 16,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  selectedAddressBox: {
    flexDirection: 'row',
    backgroundColor: '#FAF7F2',
    borderWidth: 1,
    borderColor: '#e2dcd0',
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  selectedAddressTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  selectedAddressLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#A87C53',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  selectedAddressText: {
    fontSize: 14,
    color: '#1e2022',
    lineHeight: 20,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1e2022',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
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
  typeSelector: {
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
  switchTextContainer: {
    flex: 1,
    paddingRight: 8,
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
  saveButton: {
    height: 52,
    borderRadius: 12,
    backgroundColor: '#1e2022',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
  },
});
