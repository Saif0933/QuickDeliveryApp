
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
  Modal,
  Platform,
  Animated,
  TouchableWithoutFeedback,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS } from "../../theme/color";

type RootStackParamList = {
  RestaurantInfoScreen: undefined 
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width, height } = Dimensions.get("window");
const HEADER_HEIGHT = 450; 

// --- Mock Data ---
const MENU_ITEMS = [
  {
    id: "1",
    name: "1+1 Veg Cheesy Pizza Mania",
    price: "249",
    rating: "4.2",
    ratingType: "green",
    description: "Two delicious personal pizzas with cheesy toppings.",
    isVeg: true,
    isBestSeller: false,
    image:
      "https://images.pexels.com/photos/803290/pexels-photo-803290.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "2",
    name: "Corn & Capsicum Medium Pizza",
    price: "349",
    rating: "Highly reordered",
    ratingType: "green",
    description: "Sweet corn & crunchy capsicum with cheese.",
    isVeg: true,
    isBestSeller: true,
    image:
      "https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "3",
    name: "Paneer Tikka & Onion Pizza",
    price: "459",
    rating: "Highly reordered",
    ratingType: "green",
    description: "Spicy paneer chunks with crunchy onion.",
    isVeg: true,
    isBestSeller: false,
    image:
      "https://images.pexels.com/photos/2619967/pexels-photo-2619967.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

const FILTERS = ["Filters", "Veg", "Non-veg", "Highly Rated"];

// --- Helper Components ---

const VegIcon = ({ isVeg }: { isVeg: boolean }) => (
  <View
    style={[
      styles.vegIconBorder,
      { borderColor: isVeg ? COLORS.highlight : COLORS.primary },
    ]}
  >
    <View
      style={[
        styles.vegIconDot,
        { backgroundColor: isVeg ? COLORS.highlight : COLORS.primary },
      ]}
    />
  </View>
);

const MenuItem = ({ item, onAddPress }: { item: (typeof MENU_ITEMS)[0], onAddPress: () => void }) => {
  return (
    <View style={styles.cardContainer}>
      
      {/* Left Side: Content */}
      <View style={styles.cardContent}>
        
        {/* Top Row: Veg Icon + Bestseller Badge */}
        <View style={styles.cardTopRow}>
          <VegIcon isVeg={item.isVeg} />
          {item.isBestSeller && (
            <View style={styles.badgeBestSeller}>
              <Ionicons name="trophy-outline" size={10} color={COLORS.primary} />
              <Text style={styles.badgeText}>Bestseller</Text>
            </View>
          )}
        </View>

        {/* Name & Price */}
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>₹{item.price}</Text>

        {/* Rating Row */}
        {item.rating && (
            <View style={styles.ratingRow}>
                <View style={[styles.starIconBox, {backgroundColor: item.ratingType === 'green' ? COLORS.accent : COLORS.secondary}]}>
                    <Ionicons name="star" size={8} color={item.ratingType === 'green' ? COLORS.highlight : COLORS.primary} />
                </View>
                <Text style={[styles.ratingText, {color: item.ratingType === 'green' ? COLORS.highlight : COLORS.primary}]}>
                    {item.rating}
                </Text>
            </View>
        )}

        {/* Description */}
        <Text style={styles.itemDesc} numberOfLines={2}>{item.description}</Text>

        {/* Action Buttons */}
        <View style={styles.iconRow}>
            <TouchableOpacity hitSlop={10}>
                <Ionicons name="heart-outline" size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
        </View>
      </View>

      {/* Right Side: Image + ADD Button */}
      <View style={styles.imageWrapper}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        
        {/* ADD BUTTON */}
        <View style={styles.addBtnContainer}>
            <TouchableOpacity style={styles.addBtn} activeOpacity={0.8} onPress={onAddPress}>
                <Text style={styles.addBtnText}>ADD</Text>
            </TouchableOpacity>
        </View>
      </View>

    </View>
  );
};

// --- ADD ITEM POPUP (MODIFIED WITH CLOSE BUTTON) ---
const AddItemModal = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
  const [selectedSize, setSelectedSize] = useState("Half");
  const [itemCount, setItemCount] = useState(1);
  const [instruction, setInstruction] = useState("");

  const handleIncrement = () => setItemCount(prev => prev + 1);
  const handleDecrement = () => setItemCount(prev => (prev > 1 ? prev - 1 : 1));

  const chips = ["Less Spicy", "Non spicy", "Mild spicy"];

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.popupOverlay}>
        {/* Dark Backdrop */}
        <TouchableWithoutFeedback onPress={onClose}>
            <View style={styles.popupBackdrop} />
        </TouchableWithoutFeedback>

        {/* Modal Container */}
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.popupContent}
        >
            
            {/* --- NEW ADDITION: Floating Close Button --- */}
            <View style={styles.popupCloseContainer}>
                 <TouchableOpacity style={styles.popupCloseBtn} onPress={onClose} activeOpacity={0.8}>
                    <Ionicons name="close" size={22} color={COLORS.white} />
                 </TouchableOpacity>
            </View>
            {/* ------------------------------------------- */}

            <ScrollView contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false}>
                
                {/* 1. Header Section */}
                <View style={styles.popupHeader}>
                    <View style={styles.popupHeaderImgWrapper}>
                        <Image 
                            source={{ uri: "https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg?auto=compress&cs=tinysrgb&w=800" }} 
                            style={styles.popupHeaderImg} 
                        />
                        <View style={styles.popupVegBadge}>
                            <View style={[styles.vegIconDot, {backgroundColor: 'red'}]} />
                        </View>
                    </View>
                    <View style={styles.popupHeaderInfo}>
                        <Text style={styles.popupTitle}>Special Chicken Biryani</Text>
                        <View style={styles.popupIconsRow}>
                            <TouchableOpacity style={styles.popupIconCircle}>
                                <Ionicons name="bookmark-outline" size={18} color={COLORS.textPrimary} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.popupIconCircle}>
                                <Ionicons name="share-social-outline" size={18} color={COLORS.textPrimary} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.dividerLight} />

                {/* 2. Quantity Section */}
                <View style={styles.popupSection}>
                    <View style={styles.sectionHeaderRow}>
                        <Text style={styles.sectionTitle}>Quantity</Text>
                        <View style={{flex: 1}} />
                    </View>
                    <Text style={styles.sectionSubtitle}>Required • Select any 1 option</Text>

                    {/* Radio Options */}
                    <TouchableOpacity style={styles.radioRow} onPress={() => setSelectedSize("Half")} activeOpacity={0.8}>
                        <Text style={styles.radioLabel}>Half</Text>
                        <View style={{flex: 1}} />
                        <Text style={styles.radioPrice}>₹99</Text>
                        <View style={[styles.radioOuter, selectedSize === "Half" ? {borderColor: COLORS.primary,} : null]}>
                            {selectedSize === "Half" && <View style={styles.radioInner} />}
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.radioRow} onPress={() => setSelectedSize("Full")} activeOpacity={0.8}>
                        <Text style={styles.radioLabel}>Full</Text>
                        <View style={{flex: 1}} />
                        <Text style={styles.radioPrice}>₹190</Text>
                        <View style={[styles.radioOuter, selectedSize === "Full" ? {borderColor: COLORS.primary} : null]}>
                            {selectedSize === "Full" && <View style={styles.radioInner} />}
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.dividerThick} />

                {/* 3. Cooking Request Section */}
                <View style={styles.popupSection}>
                    <View style={styles.sectionHeaderRow}>
                        <Text style={styles.sectionTitle}>Add a cooking request (optional)</Text>
                        <Ionicons name="information-circle-outline" size={18} color={COLORS.textSecondary} style={{marginLeft: 6}} />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput 
                            placeholder="e.g. Don't make it too spicy"
                            placeholderTextColor="#9CA3AF"
                            style={styles.textInput}
                            multiline
                            maxLength={100}
                            value={instruction}
                            onChangeText={setInstruction}
                        />
                        <Text style={styles.charCount}>100</Text>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginTop: 12}}>
                        {chips.map((chip, idx) => (
                            <TouchableOpacity key={idx} style={styles.chip} onPress={() => setInstruction(chip)}>
                                <Text style={styles.chipText}>{chip}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

            </ScrollView>

            {/* 4. Footer Fixed */}
            <View style={styles.popupFooter}>
                 <View style={styles.counterBox}>
                     <TouchableOpacity onPress={handleDecrement} style={styles.counterBtn}>
                        <Text style={styles.counterBtnText}>−</Text>
                     </TouchableOpacity>
                     <Text style={styles.counterVal}>{itemCount}</Text>
                     <TouchableOpacity onPress={handleIncrement} style={styles.counterBtn}>
                        <Text style={styles.counterBtnText}>+</Text>
                     </TouchableOpacity>
                 </View>

                 <TouchableOpacity style={styles.addBtnLarge}>
                     <Text style={styles.addBtnLargeText}>Add item ₹{selectedSize === "Half" ? 99 * itemCount : 190 * itemCount}</Text>
                 </TouchableOpacity>
            </View>

        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};


// --- MAIN SCREEN ---
export default function PizzaProjectScreen({ navigation }: { navigation: any }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [addItemVisible, setAddItemVisible] = useState(false);
  
  const [activeFilter, setActiveFilter] = useState("Filters");
  const [searchText, setSearchText] = useState(""); 
  const scrollY = useRef(new Animated.Value(0)).current;

  // --- ANIMATION INTERPOLATIONS ---
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT - 100], 
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT / 2],
    extrapolate: 'clamp',
  });

  const imageScale = scrollY.interpolate({
    inputRange: [-HEADER_HEIGHT, 0],
    outputRange: [2, 1],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* --- BACKGROUND ANIMATED HERO IMAGE --- */}
      <Animated.View
        style={[
            styles.heroContainer,
            {
                transform: [
                    { translateY: headerTranslateY },
                    { scale: imageScale }
                ]
            }
        ]}
      >
          <Image
            source={{ uri: "https://imgs.search.brave.com/yDZbLQCBr64QsZN02kHvj4CxqYXS0tLUYlVpJVoGVSQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA3LzIyLzMwLzgx/LzM2MF9GXzcyMjMw/ODE4Nl9vUmtwclVC/djJJM0dMTUFaa1d1/c3hpUXJaRXVEVlhw/UC5qcGc" }}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay} />
      </Animated.View>


      {/* --- Sticky Header --- */}
      <Animated.View style={[styles.stickyHeader, { opacity: headerOpacity }]}>
        <View style={styles.stickyInner}>
             <TouchableOpacity style={styles.headerRoundBtn} onPress={() => navigation?.goBack()}>
                <Ionicons name="arrow-back" size={22} color={COLORS.textPrimary} />
             </TouchableOpacity>

             <View style={styles.headerSearchPill}>
                 <Ionicons name="search" size={20} color={COLORS.primary} />
                 <TextInput 
                    style={styles.headerSearchText} 
                    placeholder="Search...."
                    placeholderTextColor={COLORS.textSecondary}
                    value={searchText}
                    onChangeText={setSearchText}
                 />
             </View>

             <TouchableOpacity style={styles.headerRoundBtn} onPress={() => setMenuVisible(true)}>
                <MaterialCommunityIcons name="dots-vertical" size={22} color={COLORS.textPrimary} />
             </TouchableOpacity>
        </View>
      </Animated.View>

      {/* --- Floating Back Button --- */}
      <TouchableOpacity style={styles.floatingBackBtn} onPress={() => navigation?.goBack()}>
          <Ionicons name="arrow-back" size={22} color={COLORS.textPrimary} />
      </TouchableOpacity>

      {/* --- Scroll Content --- */}
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 100, paddingTop: HEADER_HEIGHT }} 
      >
        
        {/* CONTENT SHEET */}
        <View style={styles.sheet}>
            
            {/* --- Restaurant Details --- */}
            <View style={styles.resInfoContainer}>
                
                <View style={styles.sheetHandle} />

                {/* Header Row */}
                <View style={styles.resHeaderRow}>
                    <View style={{flex: 1}}>
                        <Text style={styles.resTitleMain}>The Pizza Project</Text>
                        <View style={styles.resTitleSubRow}>
                            <Text style={styles.resTitleSub}>By Oven Story</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('RestaurantInfoScreen')}>
                                <Ionicons name="information-circle-outline" size={18} color={COLORS.textPrimary} style={{marginLeft: 6}} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.ratingContainer}>
                        <View style={styles.ratingBadge}>
                            <Ionicons name="star" size={12} color={COLORS.white} style={{marginRight: 2}} />
                            <Text style={styles.ratingScore}>4.0</Text>
                        </View>
                        <Text style={styles.ratingCount}>By 200+</Text>
                    </View>
                </View>

                {/* Meta Rows */}
                <View style={styles.metaRow}>
                    <Ionicons name="location-sharp" size={18} color={COLORS.textSecondary} />
                    <Text style={styles.metaTextBold}>1 km</Text>
                    <View style={styles.metaDot} />
                    <Text style={styles.metaTextRegular}>Harmu</Text>
                    <Ionicons name="chevron-down" size={16} color={COLORS.textSecondary} style={{marginLeft: 4}} />
                </View>

                <View style={styles.metaRow}>
                    <Ionicons name="time-outline" size={18} color={COLORS.textSecondary} />
                    <Text style={styles.metaTextBold}>25-30 mins</Text>
                    <View style={styles.metaDot} />
                    <Text style={styles.metaTextRegular}>Schedule for later</Text>
                    <Ionicons name="chevron-down" size={16} color={COLORS.textSecondary} style={{marginLeft: 4}} />
                </View>

                {/* Packaging Badge */}
                <View style={styles.packagingBadge}>
                      <Ionicons name="checkmark-sharp" size={14} color={COLORS.highlight} />
                      <Text style={styles.packagingText}>Low plastic packaging</Text>
                </View>

                <View style={styles.thinDivider} />

                {/* Offer Section */}
                <TouchableOpacity style={styles.offerRow}>
                    <MaterialCommunityIcons name="brightness-percent" size={20} color={COLORS.primary} />
                    <Text style={styles.offerTextMain}>Flat ₹125 OFF above ₹499</Text>
                    
                    <View style={{flex: 1}} />
                    
                    <Text style={styles.offerCountText}>5 offers</Text>
                    <Ionicons name="chevron-down" size={16} color={COLORS.textSecondary} style={{marginLeft: 4}} />
                </TouchableOpacity>

            </View>

            <View style={styles.divider} />

            {/* Filter Scroll */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterContainer}>
                {FILTERS.map((f, i) => {
                    const isActive = activeFilter === f;
                    return (
                        <TouchableOpacity 
                            key={i} 
                            onPress={() => setActiveFilter(f)}
                            style={[
                                styles.filterPill, 
                                isActive ? styles.filterActive : null
                            ]}
                        >
                            {f === 'Filters' && (
                                <Ionicons 
                                    name="options-outline" 
                                    size={16} 
                                    color={isActive ? COLORS.white : COLORS.textPrimary} 
                                    style={{marginRight: 4}} 
                                />
                            )}
                            <Text style={[styles.filterText, isActive ? {color: COLORS.white} : null]}>{f}</Text>
                            {f === 'Filters' && !isActive && (
                                <View style={styles.filterBadge}>
                                    <Text style={styles.filterBadgeText}>2</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>

            {/* Menu Header */}
            <View style={styles.menuHeader}>
                <Text style={styles.menuTitle}>Recommended</Text>
            </View>

            {/* Render Items */}
            {MENU_ITEMS.map((item) => (
                <MenuItem 
                    key={item.id} 
                    item={item} 
                    onAddPress={() => setAddItemVisible(true)} // Trigger new modal
                />
            ))}

        </View>
      </Animated.ScrollView>
      
      {/* Floating Menu FAB */}
      <TouchableOpacity style={styles.fabBtn} activeOpacity={0.9} onPress={() => setMenuVisible(true)}>
            <MaterialCommunityIcons name="silverware-fork-knife" size={20} color={COLORS.white} />
            <Text style={styles.fabText}>MENU</Text>
      </TouchableOpacity>

      {/* --- EXISTING MENU MODAL --- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={menuVisible}
        onRequestClose={() => setMenuVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
             <View style={styles.modalBackdrop} />
          </TouchableWithoutFeedback>
          <View style={styles.closeBtnContainer}>
              <TouchableOpacity onPress={() => setMenuVisible(false)} style={styles.closeBtn}>
                 <Ionicons name="close" size={24} color={COLORS.white} />
              </TouchableOpacity>
          </View>
          <View style={styles.modalContent}>
              <Text style={styles.modalTitle} numberOfLines={1}>The Pizza Project By Oven Sto...</Text>
              <TouchableOpacity style={styles.modalOption}>
                  <Ionicons name="bookmark-outline" size={24} color={COLORS.textPrimary} />
                  <Text style={styles.modalOptionText}>Add to favourite</Text>
              </TouchableOpacity>
              <View style={styles.modalDivider} />
              {/* <TouchableOpacity style={styles.modalOption}>
                  <Ionicons name="people-outline" size={24} color={COLORS.textPrimary} />
                  <Text style={styles.modalOptionText}>Group Order</Text>
              </TouchableOpacity> */}
              <View style={styles.modalDivider} />
              <TouchableOpacity style={styles.modalOption}>
                  <Ionicons name="information-circle-outline" size={24} color={COLORS.textPrimary} />
                  <Text style={styles.modalOptionText}>See more about this restaurant</Text>
              </TouchableOpacity>
              <View style={styles.modalDivider} />
              <TouchableOpacity style={styles.modalOption}>
                  <Ionicons name="share-social-outline" size={24} color={COLORS.textPrimary} />
                  <Text style={styles.modalOptionText}>Share this restaurant</Text>
              </TouchableOpacity>
              <View style={styles.modalDivider} />
               <TouchableOpacity style={styles.modalOption}>
                  <Ionicons name="eye-off-outline" size={24} color={COLORS.textPrimary} />
                  <Text style={styles.modalOptionText}>Hide this restaurant</Text>
              </TouchableOpacity>
              <View style={styles.modalDivider} />
              <TouchableOpacity style={[styles.modalOption, {alignItems: 'flex-start', paddingVertical: 16}]}>
                  <Ionicons name="chatbox-ellipses-outline" size={24} color={COLORS.textPrimary} style={{marginTop: 2}} />
                  <View style={{marginLeft: 16, flex: 1}}>
                      <Text style={styles.modalOptionTextMain}>Report fraud or bad practices</Text>
                      <Text style={styles.modalOptionSub}>
                        Menu items, prices, photos and descriptions are set directly by the restaurant.
                      </Text>
                  </View>
              </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* --- NEW ADD ITEM MODAL COMPONENT --- */}
      <AddItemModal visible={addItemVisible} onClose={() => setAddItemVisible(false)} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // --- Sticky Header ---
  stickyHeader: {
      position: 'absolute',
      top: 0, left: 0, right: 0,
      backgroundColor: COLORS.white,
      zIndex: 100,
      paddingTop: Platform.OS === 'android' ? 40 : 50,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.secondary,
      elevation: 4,
  },
  stickyInner: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      justifyContent: 'space-between',
  },
  headerRoundBtn: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: COLORS.white,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: COLORS.secondary,
      shadowColor: "#000",
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
  },
  headerSearchPill: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: COLORS.white,
      height: 42,
      borderRadius: 21,
      paddingHorizontal: 16,
      marginHorizontal: 12,
      borderWidth: 1,
      borderColor: COLORS.secondary,
      shadowColor: COLORS.black,
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
  },
  headerSearchText: {
      marginLeft: 8,
      fontSize: 14,
      color: COLORS.textPrimary,
      flex: 1,
  },

  // Floating back button
  floatingBackBtn: {
      position: 'absolute',
      top: Platform.OS === 'android' ? 40 : 50,
      left: 16,
      zIndex: 90, 
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: COLORS.white,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: COLORS.black,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.15,
      shadowRadius: 3,
      elevation: 4,
  },

  // --- Hero & Sheet ---
  heroContainer: {
      position: 'absolute', 
      top: 0, left: 0, right: 0,
      height: HEADER_HEIGHT,
      width: width,
      zIndex: 0, 
      overflow: 'hidden', 
  },
  heroImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
  },
  heroOverlay: {
      ...StyleSheet.absoluteFillObject,
  },
  sheet: {
      backgroundColor: COLORS.background,
      marginTop: -20, 
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      minHeight: 900,
  },
  
  // --- Restaurant Info Styles ---
  resInfoContainer: {
      paddingHorizontal: 16,
      paddingTop: 24,
      paddingBottom: 0,
      backgroundColor: COLORS.white,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
  },
  sheetHandle: {
      width: 48,
      height: 5,
      backgroundColor: '#E0E0E0',
      borderRadius: 10,
      alignSelf: 'center',
      position: 'absolute',
      top: 10, 
  },
  resHeaderRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 12,
  },
  resTitleMain: {
      fontSize: 26,
      fontWeight: '800',
      color: COLORS.textPrimary,
      letterSpacing: -0.5,
      lineHeight: 32,
  },
  resTitleSubRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 2,
  },
  resTitleSub: {
      fontSize: 24,
      fontWeight: '800',
      color: COLORS.textPrimary,
      letterSpacing: -0.5,
  },
  ratingContainer: {
      alignItems: 'center',
      marginTop: 4,
  },
  ratingBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: COLORS.highlight, 
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
      marginBottom: 4,
  },
  ratingScore: {
      color: COLORS.white,
      fontWeight: 'bold',
      fontSize: 14,
  },
  ratingCount: {
      fontSize: 11,
      color: COLORS.textSecondary,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.secondary,
      borderStyle: 'dashed', 
  },
  metaRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
  },
  metaTextBold: {
      fontSize: 14,
      fontWeight: '600',
      color: COLORS.textPrimary,
      marginLeft: 6,
  },
  metaTextRegular: {
      fontSize: 14,
      color: COLORS.textPrimary,
  },
  metaDot: {
      width: 3, 
      height: 3,
      borderRadius: 1.5,
      backgroundColor: COLORS.textSecondary,
      marginHorizontal: 8,
  },
  packagingBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-start',
      backgroundColor: COLORS.secondary,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 16,
      marginTop: 4,
      marginBottom: 16,
  },
  packagingText: {
      fontSize: 12,
      fontWeight: '500',
      color: COLORS.textPrimary,
      marginLeft: 6,
  },
  thinDivider: {
      height: 1,
      backgroundColor: COLORS.secondary,
      marginBottom: 14,
  },
  offerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
  },
  offerTextMain: {
      fontSize: 14,
      fontWeight: '700',
      color: COLORS.textPrimary,
      marginLeft: 10,
  },
  offerCountText: {
      fontSize: 13,
      color: COLORS.textSecondary,
      fontWeight: '500',
  },

  divider: {
      height: 8,
      backgroundColor: COLORS.background,
      marginVertical: 10,
  },

  // --- Filters ---
  filterContainer: {
      paddingHorizontal: 16,
      paddingVertical: 10,
      gap: 10,
  },
  filterPill: {
      paddingVertical: 8,
      paddingHorizontal: 14,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: COLORS.secondary,
      backgroundColor: COLORS.white,
      flexDirection: 'row',
      alignItems: 'center',
  },
  filterActive: {
      backgroundColor: COLORS.primary, 
      borderColor: COLORS.primary,
  },
  filterText: {
      fontSize: 13,
      fontWeight: '800',
      color: COLORS.textPrimary,
  },
  filterBadge: {
      backgroundColor: COLORS.primary,
      width: 16, height: 16, borderRadius: 8,
      justifyContent: 'center', alignItems: 'center',
      marginLeft: 6,
  },
  filterBadgeText: {
      fontSize: 9, color: COLORS.white, fontWeight: 'bold'
  },

  // --- Menu List ---
  menuHeader: {
      paddingHorizontal: 16,
      marginTop: 10,
      marginBottom: 10,
  },
  menuTitle: {
      fontSize: 18,
      fontWeight: '800',
      color: COLORS.textPrimary,
  },

  // --- Card Style ---
  cardContainer: {
      flexDirection: 'row',
      backgroundColor: COLORS.background,
      marginHorizontal: 16,
      marginBottom: 16,
      borderRadius: 16,
      padding: 12,
      borderWidth: 1,
      borderColor: COLORS.secondary,
  },
  cardContent: {
      flex: 1,
      paddingRight: 12,
  },
  cardTopRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 6,
  },
  vegIconBorder: {
      width: 16, height: 16,
      borderWidth: 1.5,
      justifyContent: 'center', alignItems: 'center',
      marginRight: 8,
      borderRadius: 4,
  },
  vegIconDot: {
      width: 8, height: 8, borderRadius: 4,
  },
  badgeBestSeller: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: COLORS.accent,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 4,
  },
  badgeText: {
      fontSize: 10,
      fontWeight: '700',
      color: COLORS.primary,
      marginLeft: 4,
  },
  itemName: {
      fontSize: 16,
      fontWeight: '700',
      color: COLORS.textPrimary,
      lineHeight: 22,
  },
  itemPrice: {
      fontSize: 15,
      fontWeight: '600',
      color: COLORS.textPrimary,
      marginTop: 2,
  },
  ratingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 6,
  },
  starIconBox: {
      padding: 2, borderRadius: 3, marginRight: 4,
  },
  ratingText: {
      fontSize: 11, fontWeight: '600',
  },
  itemDesc: {
      fontSize: 12,
      color: COLORS.textSecondary,
      marginTop: 8,
      lineHeight: 16,
  },
  iconRow: {
      marginTop: 12,
  },

  // --- Right Side Image & Button ---
  imageWrapper: {
      width: 140,
      alignItems: 'center',
      position: 'relative',
  },
  itemImage: {
      width: 140,
      height: 120,
      borderRadius: 12,
      backgroundColor: COLORS.secondary,
      resizeMode: 'cover',
  },
  addBtnContainer: {
      position: 'absolute',
      bottom: -12,
      alignItems: 'center',
      width: '100%',
  },
  addBtn: {
      backgroundColor: COLORS.primary,
      paddingVertical: 10,
      paddingHorizontal: 32,
      borderRadius: 24,
      shadowColor: COLORS.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 5,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
  },
  addBtnText: {
      color: COLORS.white,
      fontSize: 14,
      fontWeight: '900',
  },

  // --- FAB ---
  fabBtn: {
      position: 'absolute',
      bottom: 30, alignSelf: 'center',
      backgroundColor: COLORS.textPrimary,
      flexDirection: 'row', alignItems: 'center',
      paddingHorizontal: 20, paddingVertical: 12,
      borderRadius: 30,
      elevation: 5,
  },
  fabText: {
      color: COLORS.white, fontWeight: 'bold', marginLeft: 8
  },
  
  // --- ORIGINAL MODAL STYLES ---
  modalOverlay: {
      flex: 1, 
      backgroundColor: 'rgba(0,0,0,0.6)', 
      justifyContent: 'flex-end',
  },
  modalBackdrop: {
      flex: 1,
  },
  closeBtnContainer: {
      alignItems: 'center',
      marginBottom: 12,
  },
  closeBtn: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: COLORS.textPrimary,
      justifyContent: 'center',
      alignItems: 'center',
  },
  modalContent: {
      backgroundColor: COLORS.white, 
      paddingHorizontal: 20, 
      paddingTop: 24,
      paddingBottom: 40,
      borderTopLeftRadius: 24, 
      borderTopRightRadius: 24,
  },
  modalTitle: {
      fontSize: 20, 
      fontWeight: '800', 
      marginBottom: 20,
      color: COLORS.textPrimary,
  },
  modalOption: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 14,
  },
  modalOptionText: {
      fontSize: 16,
      marginLeft: 16,
      color: COLORS.textPrimary,
      fontWeight: '400',
  },
  modalOptionTextMain: {
      fontSize: 16,
      color: COLORS.textPrimary,
      fontWeight: '400',
      marginBottom: 4,
  },
  modalOptionSub: {
      fontSize: 12,
      color: COLORS.textSecondary,
      lineHeight: 18,
  },
  modalDivider: {
      height: 1,
      backgroundColor: COLORS.background,
      marginLeft: 40, 
  },

  // --- NEW POPUP MODAL STYLES (MATCHING IMAGE) ---
  popupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  popupBackdrop: {
      flex: 1,
  },
  popupContent: {
      backgroundColor: '#FFFFFF', // White
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      height: '75%', // <--- CHANGED FROM 90%
      // overflow: 'hidden', // removed so close button can hang out
  },
  // --- NEW STYLES FOR CLOSE BUTTON ---
  popupCloseContainer: {
    position: 'absolute',
    top: -50, // Position above the white sheet
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  popupCloseBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)', // Dark semi-transparent
    alignItems: 'center',
    justifyContent: 'center',
  },
  // ----------------------------------

  // Header
  popupHeader: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'flex-start',
  },
  popupHeaderImgWrapper: {
    width: 60, height: 60,
    borderRadius: 12,
    borderWidth: 1, borderColor: COLORS.white,
    position: 'relative',
    marginRight: 12,
  },
  popupHeaderImg: {
    width: '100%', height: '100%', borderRadius: 12,
  },
  popupVegBadge: {
    position: 'absolute', top: 4, right: 4,
    width: 14, height: 14,
    borderWidth: 1, borderColor: COLORS.primary,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: COLORS.white, borderRadius: 4,
  },
  popupHeaderInfo: {
    flex: 1,
  },
  popupTitle: {
    fontSize: 18, fontWeight: '700', color: COLORS.black,
    marginBottom: 8,
  },
  popupIconsRow: {
    flexDirection: 'row', gap: 12,
  },
  popupIconCircle: {
    width: 32, height: 32, borderRadius: 16,
    borderWidth: 1, borderColor: COLORS.background,
    alignItems: 'center', justifyContent: 'center',
  },
  dividerLight: {
      height: 1, backgroundColor: COLORS.background,
  },
  dividerThick: {
      height: 8, backgroundColor: COLORS.background,
  },
  // Section
  popupSection: {
      padding: 16,
  },
  sectionHeaderRow: {
      flexDirection: 'row', alignItems: 'center', marginBottom: 4,
  },
  sectionTitle: {
      fontSize: 16, fontWeight: '700', color: COLORS.black,
  },
  sectionSubtitle: {
      fontSize: 12, color: COLORS.background, marginBottom: 16,
  },
  // Radio
  radioRow: {
      flexDirection: 'row', alignItems: 'center',
      marginBottom: 20,
  },
  radioLabel: {
      fontSize: 16, color: COLORS.black, fontWeight: '500',
  },
  radioPrice: {
      fontSize: 16, color: COLORS.black, fontWeight: '500', marginRight: 16,
  },
  radioOuter: {
      width: 22, height: 22, borderRadius: 11,
      borderWidth: 2, borderColor: COLORS.primary,
      alignItems: 'center', justifyContent: 'center',
  },
  radioInner: {
      width: 12, height: 12, borderRadius: 6,
      backgroundColor: COLORS.primary,
  },
  // Inputs
  inputContainer: {
      backgroundColor: COLORS.SOFT_BLUE,
      borderRadius: 12,
      padding: 12,
      height: 100,
      borderWidth: 1, borderColor: COLORS.background,
      position: 'relative',
  },
  textInput: {
      fontSize: 14, color: COLORS.black,
      textAlignVertical: 'top', flex: 1,
  },
  charCount: {
      position: 'absolute', bottom: 8, right: 12,
      fontSize: 11, color: COLORS.LITE_GRAY,
  },
  chip: {
      paddingVertical: 6, paddingHorizontal: 12,
      borderRadius: 20, borderWidth: 1, borderColor: COLORS.SOFT_BLUE,
      marginRight: 8,
  },
  chipText: {
      fontSize: 13, color: COLORS.black,
  },
  // Footer
  popupFooter: {
      position: 'absolute', bottom: 0, left: 0, right: 0,
      backgroundColor: COLORS.background,
      padding: 16,
      flexDirection: 'row', alignItems: 'center',
      borderTopWidth: 1, borderTopColor: COLORS.background,
      shadowColor: "#000", shadowOffset: {width: 0, height: -2},
      shadowOpacity: 0.1, shadowRadius: 4, elevation: 10,
  },
  counterBox: {
      flexDirection: 'row', alignItems: 'center',
      borderWidth: 1, borderColor: COLORS.primary, borderRadius: 8,
      backgroundColor: COLORS.SOFT_BLUE,
      paddingVertical: 6, paddingHorizontal: 10,
      marginRight: 16,
  },
  counterBtn: {
      paddingHorizontal: 8,
  },
  counterBtnText: {
      fontSize: 18, color: COLORS.primary, fontWeight: 'bold',
  },
  counterVal: {
      fontSize: 16, fontWeight: '700', color: COLORS.primary, marginHorizontal: 8,
  },
  addBtnLarge: {
      flex: 1,
      backgroundColor: COLORS.primary,
      borderRadius: 8,
      paddingVertical: 14,
      alignItems: 'center',
  },
  addBtnLargeText: {
      color: COLORS.white, fontSize: 16, fontWeight: '700',
  }

});