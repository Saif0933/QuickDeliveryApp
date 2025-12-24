
import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Animated,
  ScrollView,
  Platform,
  TextInput,
  Linking,
  FlatList, // --- CHANGE: Added FlatList import
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { COLORS } from '../../theme/color';

const { width } = Dimensions.get('window');

const HEADER_HEIGHT = 450;

// Dummy Coordinates
const COORDINATES = {
  HOME: { latitude: 23.4355, longitude: 85.3250 },
  STORE: { latitude: 23.4385, longitude: 85.3280 },
};

// --- CHANGE: Added Dummy Images for the Slider ---
const CAROUSEL_IMAGES = [
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80', // Food 1
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80', // Food 2
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80', // Food 3
  'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80', // Food 4
];

const OrderTrackingScreen = ({ navigation }: any) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<any>(null); 
  
  // --- CHANGE: Refs and State for Image Slider ---
  const flatListRef = useRef<FlatList>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [selectedTip, setSelectedTip] = useState<number | string>(20);

  // --- CHANGE: Automatic Sliding Logic (Every 3 Seconds) ---
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        let nextIndex = prevIndex + 1;
        if (nextIndex >= CAROUSEL_IMAGES.length) {
          nextIndex = 0;
        }
        
        // Scroll to the next image
        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
        
        return nextIndex;
      });
    }, 3000); // 3000ms = 3 seconds

    return () => clearInterval(interval);
  }, []);

  const expandMapToBanner = () => {
    setIsMapExpanded(true);
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const collapseMapToContainer = () => {
    setIsMapExpanded(false);
  };

  const handleCallDeliveryPartner = () => {
    const phoneNumber = '7050600000'; 
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const mapScale = scrollY.interpolate({
    inputRange: [-HEADER_HEIGHT, 0],
    outputRange: [1.5, 1],
    extrapolate: 'clamp',
  });

  const mapTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT * 0.5],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      {/* --- ANIMATED HEADER --- */}
      <Animated.View
        style={[
          styles.headerContainer,
          {
            height: HEADER_HEIGHT,
            transform: [
              { translateY: mapTranslateY },
              { scale: mapScale },
            ],
          },
        ]}
      >
        {isMapExpanded ? (
          <View style={{flex: 1}}>
             <MapView
                provider={PROVIDER_GOOGLE}
                style={{width: '100%', height: '100%'}}
                initialRegion={{
                  latitude: 23.4370,
                  longitude: 85.3265,
                  latitudeDelta: 0.02,
                  longitudeDelta: 0.02,
                }}
                customMapStyle={mapStyle}
             >
                <Polyline coordinates={[COORDINATES.HOME, COORDINATES.STORE]} strokeColor={COLORS.textPrimary} strokeWidth={2} lineDashPattern={[5, 5]} />
                <Marker coordinate={COORDINATES.HOME}><Icon name="home-map-marker" size={24} color={COLORS.primary} /></Marker>
                <Marker coordinate={COORDINATES.STORE}><View style={{backgroundColor: COLORS.black, borderRadius: 10, padding: 3}}><Icon name="moped" size={14} color={COLORS.white} /></View></Marker>
             </MapView>
             
             <TouchableOpacity style={styles.closeMapBtn} onPress={collapseMapToContainer}>
                <Text style={styles.closeMapText}>Close Map &nbsp; <Icon name="arrow-collapse-all" size={14}/></Text>
             </TouchableOpacity>
          </View>
        ) : (
          /* --- CHANGE: Image Slider Implementation --- */
          <FlatList
            ref={flatListRef}
            data={CAROUSEL_IMAGES}
            horizontal
            pagingEnabled
            scrollEnabled={false} // Disable manual scroll if you only want auto-scroll
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            getItemLayout={(data, index) => (
              { length: width, offset: width * index, index }
            )}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item }}
                style={{ width: width, height: HEADER_HEIGHT }}
                resizeMode="cover"
              />
            )}
          />
        )}
      </Animated.View>

      {/* --- SCROLLABLE CONTENT --- */}
      <Animated.ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{ paddingTop: HEADER_HEIGHT - 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        
        {/* --- 1. TRACKING SECTION --- */}
        <View style={styles.trackingSection}>
           <View style={styles.trackingHeader}>
              <View>
                 <Text style={styles.statusLabel}>Packing your order</Text>
                 <Text style={styles.arrivingTitle}>Arriving in {'\n'}<Text style={styles.timeText}>14 minutes</Text></Text>
              </View>
              
              <View style={styles.miniMapBox}>
                 {!isMapExpanded ? (
                     <>
                       <MapView
                          provider={PROVIDER_GOOGLE}
                          style={styles.miniMapImg}
                          initialRegion={{ ...COORDINATES.HOME, latitudeDelta: 0.004, longitudeDelta: 0.004 }}
                          scrollEnabled={false} zoomEnabled={false} pitchEnabled={false} rotateEnabled={false}
                          customMapStyle={mapStyle}
                        >
                          <Polyline coordinates={[COORDINATES.HOME, COORDINATES.STORE]} strokeColor={COLORS.textPrimary} strokeWidth={2} lineDashPattern={[5, 5]} />
                          <Marker coordinate={COORDINATES.HOME}><Icon name="home-map-marker" size={20} color={COLORS.primary} /></Marker>
                        </MapView>

                        <TouchableOpacity 
                          style={StyleSheet.absoluteFill} 
                          onPress={expandMapToBanner}
                          activeOpacity={0.9} 
                        >
                          <View style={{flex:1, backgroundColor:'rgba(0,0,0,0.05)'}}/> 
                        </TouchableOpacity>

                        <View style={styles.expandBtn}>
                          <Icon name="arrow-expand-all" size={12} color={COLORS.textPrimary} />
                        </View>
                     </>
                 ) : (
                   <View style={styles.miniMapPlaceholder}>
                      <Text style={{fontSize:10, color: COLORS.muted}}>Map viewing in Header</Text>
                      <TouchableOpacity onPress={collapseMapToContainer} style={{marginTop:4}}>
                        <Text style={{fontSize:10, color: COLORS.primary, fontWeight:'bold'}}>Reset</Text>
                      </TouchableOpacity>
                   </View>
                 )}
              </View>
           </View>
        </View>

        {/* --- 2. FORGOT ITEMS --- */}
        <View style={styles.flatSection}>
          <View style={styles.row}>
             <View style={[styles.iconContainer, { backgroundColor: COLORS.background }]}>
                <Icon name="lock-outline" size={22} color={COLORS.muted} />
             </View>
             <View style={styles.textContainer}>
                <Text style={styles.rowTitle}>Forgot to add something?</Text>
                <Text style={styles.rowSubtitle}>Add more items at no extra delivery charge</Text>
             </View>
          </View>
          <View style={styles.warningBanner}>
             <Text style={styles.warningText}>Time's up - adding more items is no longer possible</Text>
          </View>
        </View>

        {/* --- 3. DELIVERY PARTNER --- */}
        <View style={styles.flatSection}>
           <View style={styles.row}>
             <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2922/2922561.png' }} style={{ width: 40, height: 40, marginRight: 12 }} />
             <View style={styles.textContainer}>
                <Text style={styles.rowTitle}>We'll assign a delivery partner as soon as your order is packed</Text>
             </View>
           </View>
           <View style={styles.divider} />
           <View style={[styles.row, { paddingVertical: 8 }]}>
              <Icon name="shield-check" size={20} color={COLORS.primary} style={{ marginRight: 10 }} />
              <View style={{flex:1}}>
                 <Text style={styles.smallText}>Your Restro store is 1.6 km away.{'\n'}<Text style={{color: COLORS.muted}}>Learn about delivery partner safety</Text></Text>
              </View>
              <Icon name="chevron-right" size={20} color={COLORS.muted} />
           </View>
        </View>

        {/* --- 4. INSTRUCTIONS --- */}
        <View style={styles.flatSection}>
           <View style={styles.row}>
              <View style={styles.iconContainer}><Icon name="microphone-outline" size={22} color={COLORS.textSecondary} /></View>
              <View style={styles.textContainer}>
                 <Text style={styles.rowTitle}>Add delivery instructions</Text>
                 <Text style={styles.rowSubtitle}>Help your delivery partner reach you faster</Text>
              </View>
              <Icon name="chevron-down" size={24} color={COLORS.muted} />
           </View>
        </View>

        {/* --- 5. DELIVERY DETAILS --- */}
        <View style={styles.flatSection}>
           <View style={styles.row}>
              <View style={styles.iconContainer}><Icon name="truck-delivery-outline" size={22} color={COLORS.textSecondary} /></View>
              <View style={styles.textContainer}>
                 <Text style={styles.rowTitle}>Your delivery details</Text>
                 <Text style={styles.rowSubtitle}>Details of your current order</Text>
              </View>
           </View>
           <View style={styles.divider} />
           <View style={styles.row}>
              <View style={styles.miniIcon}><Ionicons name="location-outline" size={20} color={COLORS.textSecondary} /></View>
              <View style={styles.textContainer}>
                 <Text style={styles.rowTitle}>Delivery at Home</Text>
                 <Text style={styles.addressText}>Ravindra Srivastava, Virat Nagar, Near Darpan Beauty parlour...</Text>
                 
                 <TouchableOpacity onPress={() => navigation.navigate('SelectAddressScreen')}>
                    <Text style={{color: COLORS.primary, fontWeight:'600', marginTop: 4}}>Change address ▸</Text>
                 </TouchableOpacity>
              </View>
           </View>
           
           <View style={styles.yellowBox}>
              <Text style={styles.yellowBoxText}>Now update your address effortlessly if you've ordered at an incorrect location</Text>
              <TouchableOpacity style={styles.okButton}><Text style={styles.okButtonText}>OK</Text></TouchableOpacity>
           </View>
           
           <TouchableOpacity onPress={handleCallDeliveryPartner} activeOpacity={0.7}>
             <View style={[styles.row, {marginTop: 10}]}>
                <View style={styles.miniIcon}><Ionicons name="call-outline" size={18} color={COLORS.textSecondary} /></View>
                <Text style={styles.rowTitle}>Ravindra, 70506XXXXX</Text>
             </View>
           </TouchableOpacity>
        </View>

        {/* --- 6. NEED HELP --- */}
        <TouchableOpacity style={styles.flatSection} onPress={() => navigation.navigate('SupportScreen')}>
           <View style={styles.row}>
              <View style={styles.miniIcon}><Icon name="message-text-outline" size={20} color={COLORS.textSecondary} /></View>
              <View style={styles.textContainer}>
                 <Text style={styles.rowTitle}>Need help?</Text>
                 <Text style={styles.rowSubtitle}>Chat with us about any issue related to your order</Text>
              </View>
              <Icon name="chevron-right" size={24} color={COLORS.muted} />
           </View>
        </TouchableOpacity>

        {/* --- 7. ORDER SUMMARY --- */}
        <View style={styles.flatSection}>
           <View style={styles.row}>
              <View style={styles.miniIcon}><Icon name="shopping-outline" size={20} color={COLORS.textSecondary} /></View>
              <View style={styles.textContainer}>
                 <Text style={styles.rowTitle}>Order summary</Text>
                 <Text style={styles.rowSubtitle}>Order id - #ORD97573829895</Text>
              </View>
           </View>
           <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginLeft: 50, marginTop: 10 }}>
              {[1, 2, 3, 4].map((item, idx) => (
                  <View key={idx} style={styles.productThumb}>
                      <Image source={{uri: 'https://freepngimg.com/thumb/vegetable/24667-6-vegetable-transparent.png'}} style={{width: 30, height: 30}} resizeMode="contain" />
                  </View>
              ))}
              <View style={[styles.productThumb, {backgroundColor: COLORS.background}]}><Text style={{color: COLORS.muted, fontSize:12, fontWeight:'bold'}}>+4</Text></View>
           </ScrollView>
        </View>

        {/* --- 8. TIP SECTION --- */}
        <View style={styles.flatSection}>
            <View style={styles.row}>
              <View style={styles.iconContainer}><Icon name="heart-outline" size={22} color={COLORS.textSecondary} /></View>
              <View style={styles.textContainer}>
                  <Text style={styles.rowTitle}>Tip your delivery partner</Text>
                  <Text style={styles.rowSubtitle}>100% of the tip goes to your partner</Text>
              </View>
            </View>
            
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              contentContainerStyle={{paddingLeft: 58, paddingBottom: 5, paddingTop: 15}}
            >
              {/* Tip 20 */}
              <TouchableOpacity 
                style={[styles.tipButton, selectedTip === 20 && styles.tipButtonSelected]}
                onPress={() => setSelectedTip(20)}
              >
                  <Text style={styles.tipEmoji}>🤩</Text>
                  <Text style={[styles.tipText, selectedTip === 20 && styles.tipTextSelected]}>₹20</Text>
                  <View style={styles.mostTippedBadge}>
                    <Text style={styles.badgeText}>Most Tipped</Text>
                  </View>
              </TouchableOpacity>

              {/* Tip 30 */}
              <TouchableOpacity 
                style={[styles.tipButton, selectedTip === 30 && styles.tipButtonSelected]}
                onPress={() => setSelectedTip(30)}
              >
                  <Text style={styles.tipEmoji}>😊</Text>
                  <Text style={[styles.tipText, selectedTip === 30 && styles.tipTextSelected]}>₹30</Text>
              </TouchableOpacity>

              {/* Tip 50 */}
              <TouchableOpacity 
                style={[styles.tipButton, selectedTip === 50 && styles.tipButtonSelected]}
                onPress={() => setSelectedTip(50)}
              >
                  <Text style={styles.tipEmoji}>😃</Text>
                  <Text style={[styles.tipText, selectedTip === 50 && styles.tipTextSelected]}>₹50</Text>
              </TouchableOpacity>

              {/* Tip 80 */}
              <TouchableOpacity 
                style={[styles.tipButton, selectedTip === 80 && styles.tipButtonSelected]}
                onPress={() => setSelectedTip(80)}
              >
                  <Text style={styles.tipEmoji}>😃</Text>
                  <Text style={[styles.tipText, selectedTip === 80 && styles.tipTextSelected]}>₹80</Text>
              </TouchableOpacity>

              {/* Custom Tip */}
               <TouchableOpacity 
                style={[styles.tipButton, selectedTip === 'Custom' && styles.tipButtonSelected]}
                onPress={() => setSelectedTip('Custom')}
               >
                  <Text style={styles.tipEmoji}>✍️</Text>
                  <Text style={[styles.tipText, selectedTip === 'Custom' && styles.tipTextSelected]}>Custom</Text>
              </TouchableOpacity>
            </ScrollView>
        </View>

        <View style={{height: 50}} />
      </Animated.ScrollView>
    </View>
  );
};

const mapStyle = [{ "featureType": "poi", "elementType": "labels", "stylers": [{ "visibility": "off" }] }];

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  
  /* --- Animated Header --- */
  headerContainer: { position: 'absolute', top: 0, left: 0, right: 0, overflow: 'hidden', zIndex: 10, backgroundColor: COLORS.LITE_GRAY, borderRadius: 17 },
  mapImage: { width: '100%', height: '100%' },
  
  closeMapBtn: {
    position: 'absolute', bottom: 30, alignSelf:'center',
    backgroundColor: COLORS.white, paddingHorizontal: 20, paddingVertical: 10,
    borderRadius: 25, elevation: 5, shadowColor: COLORS.black, shadowOpacity: 0.3, shadowRadius: 5,
    flexDirection: 'row', alignItems: 'center'
  },
  closeMapText: { color: COLORS.textPrimary, fontWeight: 'bold', fontSize: 14 },

  /* --- Sections --- */
  trackingSection: { backgroundColor: COLORS.white, width: '100%', padding: 20, marginBottom: 8, marginTop: 10 },
  flatSection: { backgroundColor: COLORS.white, width: '100%', padding: 16, marginBottom: 8 },

  trackingHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  statusLabel: { fontSize: 13, fontWeight: '600', color: COLORS.textPrimary, marginBottom: 4 },
  arrivingTitle: { fontSize: 18, color: COLORS.primary, fontWeight: '500' },
  timeText: { fontSize: 25, fontWeight: '800', color: COLORS.primary },
  
  miniMapBox: { width: 120, height: 80, borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: '#eee', position: 'relative', justifyContent:'center', alignItems:'center', backgroundColor: COLORS.background },
  miniMapImg: { width: '100%', height: '100%' },
  miniMapPlaceholder: { alignItems:'center', justifyContent:'center'},
  expandBtn: { position: 'absolute', top: 5, right: 5, backgroundColor: COLORS.white, padding: 4, borderRadius: 20, zIndex: 10 },

  row: { flexDirection: 'row', alignItems: 'flex-start' },
  iconContainer: { width: 44, height: 44, borderRadius: 12, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  miniIcon: { width: 24, justifyContent: 'center', alignItems: 'center', marginRight: 14, marginLeft: 10 },
  textContainer: { flex: 1, justifyContent: 'center' },
  rowTitle: { fontSize: 15, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 3, lineHeight: 20 },
  rowSubtitle: { fontSize: 12, color: COLORS.textSecondary, lineHeight: 16 },
  divider: { height: 1, backgroundColor: '#EEE', marginVertical: 12 },
  smallText: { fontSize: 12, color: COLORS.textPrimary, lineHeight: 18 },
  
  warningBanner: { backgroundColor: COLORS.SOFT_BLUE, marginTop: 12, padding: 8, borderRadius: 6, alignItems: 'center' },
  warningText: { color: COLORS.RED, fontSize: 11, fontWeight: '600' },
  
  addressText: { fontSize: 13, color: COLORS.textSecondary, marginTop: 2, lineHeight: 18 },
  
  yellowBox: { backgroundColor: COLORS.SOFT_BLUE, padding: 10, borderRadius: 8, marginTop: 10, marginLeft: 48, flexDirection: 'row', alignItems: 'center' },
  yellowBoxText: { flex: 1, fontSize: 11, color: COLORS.primary, marginRight: 8 },
  okButton: { backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.primary, paddingVertical: 4, paddingHorizontal: 12, borderRadius: 4 },
  okButtonText: { fontSize: 10, fontWeight: 'bold', color: COLORS.primary },
  
  productThumb: { width: 45, height: 45, borderWidth: 1, borderColor: '#EEE', borderRadius: 8, marginRight: 10, justifyContent: 'center', alignItems: 'center' },
  viewOrderLink: { color: COLORS.primary, textAlign: 'center', marginTop: 15, fontWeight: '600', fontSize: 13 },

  /* --- Tip Section Styles --- */
  tipButton: { 
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 8, 
    backgroundColor: COLORS.white, borderWidth: 1, borderColor: '#E0E0E0', 
    borderRadius: 8, marginRight: 12, minWidth: 70, justifyContent: 'center'
  },
  tipButtonSelected: { backgroundColor: COLORS.SOFT_BLUE, borderColor: COLORS.primary },
  tipEmoji: { fontSize: 14, marginRight: 6 },
  tipText: { fontSize: 14, fontWeight: '600', color: COLORS.textPrimary },
  tipTextSelected: { color: COLORS.textPrimary },
  mostTippedBadge: { 
    position: 'absolute', top: -10, right: -0, backgroundColor: COLORS.primary, 
    paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, zIndex: 5 
  },
  badgeText: { fontSize: 8, color: COLORS.white, fontWeight: 'bold', textTransform: 'uppercase' },
});

export default OrderTrackingScreen;