

// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import React, { useEffect, useMemo, useRef, useState } from "react";
// import {
//     ActivityIndicator,
//     Alert,
//     Animated,
//     Dimensions,
//     Image,
//     KeyboardAvoidingView,
//     Modal,
//     Platform,
//     ScrollView,
//     StatusBar,
//     StyleSheet,
//     Text,
//     TextInput,
//     ToastAndroid,
//     TouchableOpacity,
//     TouchableWithoutFeedback,
//     View,
// } from "react-native";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import { useAddToCart } from "../../api/hooks/cart.ts";
// import { ProductVariant, useGetVendorInventory, VendorProduct } from "../../api/hooks/vendorInventory.ts";
// import { COLORS } from "../../theme/color";
// import FloatingCart from "../cart/FloatingCart";

// type RootStackParamList = {
//     RestaurantInfoScreen: undefined 
// };

// type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// const { width, height } = Dimensions.get("window");
// const HEADER_HEIGHT = 450; 

// const FILTERS = ["Filters", "Veg", "Non-veg", "Highly Rated"];

// // --- Helper Components ---

// const VegIcon = ({ isVeg }: { isVeg: boolean }) => (
//   <View
//     style={[
//       styles.vegIconBorder,
//       { borderColor: isVeg ? COLORS.highlight : 'red' },
//     ]}
//   >
//     <View
//       style={[
//         styles.vegIconDot,
//         { backgroundColor: isVeg ? COLORS.highlight : 'red' },
//       ]}
//     />
//   </View>
// );

// // --- COMPONENT: Filter Popup (Matches Image) ---
// const FilterPopup = ({ visible, onClose, activeFilter, onApply }: { visible: boolean; onClose: () => void; activeFilter: string; onApply: (val: string) => void }) => {
//     const [tempFilter, setTempFilter] = useState(activeFilter);

//     const sortOptions = ["Price - Low to High", "Price - High to Low"];
//     const prefOptions = ["Veg", "Egg", "Non-veg"];
//     const topOptions = ["Highly Reordered"];

//     const renderOption = (option: string) => {
//         let iconName = "";
//         let IconComponent = Ionicons;
//         let iconColor = COLORS.black;
//         let iconSize = 18;

//         if (option === "Price - Low to High") {
//             iconName = "trending-up";
//             iconColor = COLORS.primary;
//         } else if (option === "Price - High to Low") {
//             iconName = "trending-down";
//             iconColor = COLORS.primary;
//         } else if (option === "Veg") {
//             IconComponent = MaterialCommunityIcons as any;
//             iconName = "leaf-circle-outline";
//             iconColor = "#007E33";
//             iconSize = 20;
//         } else if (option === "Egg") {
//             IconComponent = MaterialCommunityIcons as any;
//             iconName = "egg-outline";
//             iconColor = "#F5A623";
//             iconSize = 20;
//         } else if (option === "Non-veg") {
//             IconComponent = MaterialCommunityIcons as any;
//             iconName = "food-drumstick-outline";
//             iconColor = "#D32F2F";
//             iconSize = 20;
//         } else if (option === "Highly Reordered") {
//             iconName = "sparkles";
//             iconColor = "#FFB300";
//         } else if (option.includes("Low to High")) {
//              iconName = "trending-up";
//              iconColor = COLORS.primary;
//         } else if (option.includes("High to Low")) {
//              iconName = "trending-down";
//              iconColor = COLORS.primary;
//         }

//         return (
//             <TouchableOpacity 
//                 key={option} 
//                 style={styles.filterOptionRow} 
//                 onPress={() => setTempFilter(option)}
//             >
//                 <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                     {iconName !== "" && (
//                         <IconComponent name={iconName} size={iconSize} color={iconColor} style={{ marginRight: 8 }} />
//                     )}
//                     <Text style={styles.filterOptionText}>{option}</Text>
//                 </View>
//                 <View style={[styles.checkbox, tempFilter === option && styles.checkboxActive]}>
//                     {tempFilter === option && <Ionicons name="checkmark" size={16} color={COLORS.white} />}
//                 </View>
//             </TouchableOpacity>
//         );
//     };

//     return (
//         <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
//             <View style={styles.modalOverlay}>
//                 <TouchableWithoutFeedback onPress={onClose}><View style={styles.modalBackdrop} /></TouchableWithoutFeedback>
//                 <View style={[styles.filterModalContent, { maxHeight: height * 0.8 }]}>
//                     <View style={styles.filterHeader}>
//                         <Text style={styles.filterTitle}>Filter</Text>
//                         <TouchableOpacity onPress={() => setTempFilter("Filters")}>
//                             <Text style={styles.clearAllText}>Clear All</Text>
//                         </TouchableOpacity>
//                     </View>

//                     <View style={styles.dividerLight} />

//                     <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 10 }}>
//                         <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.black, marginTop: 10, marginBottom: 5 }}>Sort By</Text>
//                         {sortOptions.map(renderOption)}

//                         <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.black, marginTop: 20, marginBottom: 5 }}>Veg/Non-veg Preference</Text>
//                         {prefOptions.map(renderOption)}

//                         <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.black, marginTop: 20, marginBottom: 5 }}>Top Picks</Text>
//                         {topOptions.map(renderOption)}
//                     </ScrollView>

//                     <TouchableOpacity 
//                         style={styles.applyBtn} 
//                         onPress={() => {
//                             onApply(tempFilter);
//                             onClose();
//                         }}
//                     >
//                         <Text style={styles.applyBtnText}>Apply</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </Modal>
//     );
// };

// // --- COMPONENT: Menu Item Card ---
// const MenuItem = ({ item, onAddPress }: { item: VendorProduct, onAddPress: () => void }) => {
//   const imageUrl = item.product.images?.[0]?.image?.url 
//     ? item.product.images[0].image.url 
//     : "https://via.placeholder.com/150";

//   const displayPrice = item.price?.d?.[0] || 0;

//   return (
//     <View style={styles.cardContainer}>
//       <View style={styles.cardContent}>
//         <View style={styles.cardTopRow}>
//           <VegIcon isVeg={item.product.isVeg} />
//         </View>
//         <Text style={styles.itemName}>{item.product.name}</Text>
//         <Text style={styles.itemPrice}>₹{displayPrice}</Text>
//         <Text style={styles.itemDesc} numberOfLines={2}>{item.product.description}</Text>
//         <View style={styles.iconRow}>
//             <TouchableOpacity hitSlop={10}>
//                 <Ionicons name="heart-outline" size={20} color={COLORS.textSecondary} />
//             </TouchableOpacity>
//         </View>
//       </View>
//       <View style={styles.imageWrapper}>
//         <Image source={{ uri: imageUrl }} style={styles.itemImage} />
//         <View style={styles.addBtnContainer}>
//             <TouchableOpacity style={styles.addBtn} activeOpacity={0.8} onPress={onAddPress}>
//                 <Text style={styles.addBtnText}>ADD</Text>
//             </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// // --- COMPONENT: Add Item Modal ---
// interface AddItemModalProps {
//   visible: boolean;
//   onClose: () => void;
//   productData: VendorProduct | null;
// }

// const AddItemModal = ({ visible, onClose, productData }: AddItemModalProps) => {
//   const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
//   const [itemCount, setItemCount] = useState(1);
//   const [instruction, setInstruction] = useState("");

//   const { mutate: addToCart, isPending } = useAddToCart();
//   const chips = ["Less Spicy", "Non spicy", "Mild spicy"];

//   useEffect(() => {
//     if (productData) {
//         setItemCount(1);
//         setInstruction("");
//         if (productData.productVariants && productData.productVariants.length > 0) {
//             const defaultVar = productData.productVariants.find(v => v.isDefault) || productData.productVariants[0];
//             setSelectedVariant(defaultVar);
//         } else {
//             setSelectedVariant(null);
//         }
//     }
//   }, [productData, visible]);

//   if (!productData) return null;

//   const basePrice = selectedVariant 
//     ? (selectedVariant.price?.d?.[0] || 0)
//     : (productData.price?.d?.[0] || 0);

//   const totalPrice = basePrice * itemCount;
//   const imageUrl = productData.product.images?.[0]?.image?.url || "https://via.placeholder.com/150";

//   const handleIncrement = () => setItemCount(prev => prev + 1);
//   const handleDecrement = () => setItemCount(prev => (prev > 1 ? prev - 1 : 1));

//   const handleAddToCart = () => {
//     if (!productData) return;
//     const payload = {
//         vendorProductId: Number(productData.id), 
//         vendorId: Number(productData.vendorId),
//         productVariantId: selectedVariant ? Number(selectedVariant.id) : undefined,
//         quantity: itemCount,
//         notes: instruction
//     };

//     addToCart(payload, {
//         onSuccess: () => {
//             if (Platform.OS === 'android') {
//                 ToastAndroid.show("Item added to cart", ToastAndroid.SHORT);
//             } else {
//                 Alert.alert("Success", "Item added to cart");
//             }
//             onClose();
//         },
//         onError: (error) => {
//             console.error(error);
//             Alert.alert("Error", "Failed to add item to cart.");
//         }
//     });
//   };

//   return (
//     <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
//       <View style={styles.popupOverlay}>
//         <TouchableWithoutFeedback onPress={onClose}><View style={styles.popupBackdrop} /></TouchableWithoutFeedback>
//         <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.popupContent}>
//             <View style={styles.popupCloseContainer}>
//                  <TouchableOpacity style={styles.popupCloseBtn} onPress={onClose} activeOpacity={0.8}>
//                     <Ionicons name="close" size={22} color={COLORS.white} />
//                  </TouchableOpacity>
//             </View>
//             <ScrollView contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false}>
//                 <View style={styles.popupHeader}>
//                     <View style={styles.popupHeaderImgWrapper}>
//                         <Image source={{ uri: imageUrl }} style={styles.popupHeaderImg} />
//                         <View style={styles.popupVegBadge}>
//                             <View style={[styles.vegIconDot, {backgroundColor: productData.product.isVeg ? COLORS.highlight : 'red'}]} />
//                         </View>
//                     </View>
//                     <View style={styles.popupHeaderInfo}>
//                         <Text style={styles.popupTitle}>{productData.product.name}</Text>
//                         <Text style={{fontSize: 12, color: COLORS.textSecondary}} numberOfLines={1}>{productData.product.description}</Text>
//                     </View>
//                 </View>
//                 <View style={styles.dividerLight} />
//                 {productData.productVariants.length > 0 && (
//                     <View style={styles.popupSection}>
//                         <View style={styles.sectionHeaderRow}>
//                             <Text style={styles.sectionTitle}>Quantity / Size</Text>
//                         </View>
//                         <Text style={styles.sectionSubtitle}>Required • Select any 1 option</Text>
//                         {productData.productVariants.map((variant) => {
//                             const isSelected = selectedVariant?.id === variant.id;
//                             return (
//                                 <TouchableOpacity key={variant.id} style={styles.radioRow} onPress={() => setSelectedVariant(variant)} activeOpacity={0.8}>
//                                     <Text style={styles.radioLabel}>{variant.title}</Text>
//                                     <View style={{flex: 1}} />
//                                     <Text style={styles.radioPrice}>₹{variant.price?.d?.[0]}</Text>
//                                     <View style={[styles.radioOuter, isSelected ? {borderColor: COLORS.primary} : null]}>
//                                         {isSelected && <View style={styles.radioInner} />}
//                                     </View>
//                                 </TouchableOpacity>
//                             );
//                         })}
//                     </View>
//                 )}
//                 <View style={styles.dividerThick} />
//                 <View style={styles.popupSection}>
//                     <View style={styles.sectionHeaderRow}><Text style={styles.sectionTitle}>Add a cooking request (optional)</Text></View>
//                     <View style={styles.inputContainer}>
//                         <TextInput placeholder="e.g. Don't make it too spicy" placeholderTextColor="#9CA3AF" style={styles.textInput} multiline maxLength={100} value={instruction} onChangeText={setInstruction} />
//                         <Text style={styles.charCount}>{instruction.length}/100</Text>
//                     </View>
//                     <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginTop: 12}}>
//                         {chips.map((chip, idx) => (
//                             <TouchableOpacity key={idx} style={styles.chip} onPress={() => setInstruction(chip)}>
//                                 <Text style={styles.chipText}>{chip}</Text>
//                             </TouchableOpacity>
//                         ))}
//                     </ScrollView>
//                 </View>
//             </ScrollView>
//             <View style={styles.popupFooter}>
//                  <View style={styles.counterBox}>
//                      <TouchableOpacity onPress={handleDecrement} style={styles.counterBtn}><Text style={styles.counterBtnText}>−</Text></TouchableOpacity>
//                      <Text style={styles.counterVal}>{itemCount}</Text>
//                      <TouchableOpacity onPress={handleIncrement} style={styles.counterBtn}><Text style={styles.counterBtnText}>+</Text></TouchableOpacity>
//                  </View>
//                  <TouchableOpacity style={[styles.addBtnLarge, isPending && { opacity: 0.7 }]} onPress={handleAddToCart} disabled={isPending}>
//                      {isPending ? <ActivityIndicator color={COLORS.white} /> : <Text style={styles.addBtnLargeText}>Add item ₹{totalPrice}</Text>}
//                  </TouchableOpacity>
//             </View>
//         </KeyboardAvoidingView>
//       </View>
//     </Modal>
//   );
// };

// // --- MAIN SCREEN ---
// export default function PizzaProjectScreen({ navigation, route }: { navigation: any; route: any }) {
//   const { vendorId = "1", vendorName = "Restaurant", vendorImage = "" } = (route?.params || {}) as any;
  
//   const [menuVisible, setMenuVisible] = useState(false);
//   const [addItemVisible, setAddItemVisible] = useState(false);
//   const [filterPopupVisible, setFilterPopupVisible] = useState(false); // New Filter Modal State
//   const [selectedProduct, setSelectedProduct] = useState<VendorProduct | null>(null);
  
//   const [activeFilter, setActiveFilter] = useState("Filters");
//   const [searchText, setSearchText] = useState(""); 
//   const scrollY = useRef(new Animated.Value(0)).current;

//   const { data: vendorData, isLoading: vendorLoading } = useGetVendorInventory({ vendorId });

//   const flatProducts = useMemo(() => {
//     if (!vendorData) return [];
//     return vendorData.pages.flatMap(page => page.products);
//   }, [vendorData]);

//   const filteredProducts = useMemo(() => {
//     if (!flatProducts) return [];
//     let result = flatProducts;
//     if (searchText) {
//         const lowerSearch = searchText.toLowerCase();
//         result = result.filter(item => item.product.name.toLowerCase().includes(lowerSearch));
//     }
//     switch (activeFilter) {
//         case "Veg": return result.filter((item) => item.product.isVeg === true);
//         case "Egg": return result.filter((item) => item.product.isVeg === false); // fallback logic, depends on API struct
//         case "Non-veg": return result.filter((item) => item.product.isVeg === false);
//         case "Price - Low to High": return [...result].sort((a, b) => (a.price?.d?.[0] || 0) - (b.price?.d?.[0] || 0));
//         case "Price - High to Low": return [...result].sort((a, b) => (b.price?.d?.[0] || 0) - (a.price?.d?.[0] || 0));
//         case "Highly Reordered": return result; // API has no highly rated param yet
//         default: return result;
//     }
//   }, [activeFilter, flatProducts, searchText]);

//   const headerOpacity = scrollY.interpolate({ inputRange: [0, HEADER_HEIGHT - 100], outputRange: [1, 1], extrapolate: "clamp" });
//   const headerTranslateY = scrollY.interpolate({ inputRange: [0, HEADER_HEIGHT], outputRange: [0, -HEADER_HEIGHT / 2], extrapolate: 'clamp' });
//   const imageScale = scrollY.interpolate({ inputRange: [-HEADER_HEIGHT, 0], outputRange: [2, 1], extrapolate: 'clamp' });

//   const handleAddPress = (item: VendorProduct) => {
//     setSelectedProduct(item);
//     setAddItemVisible(true);
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

//       <Animated.View style={[styles.heroContainer, { transform: [{ translateY: headerTranslateY }, { scale: imageScale }] }]}>
//           <Image source={{ uri: vendorImage || "https://via.placeholder.com/800x400?text=Restaurant" }} style={styles.heroImage} />
//           <View style={styles.heroOverlay} />
//       </Animated.View>

//       <Animated.View style={[styles.stickyHeader, { opacity: headerOpacity }]}>
//         <View style={styles.stickyInner}>
//              <TouchableOpacity style={styles.headerRoundBtn} onPress={() => navigation?.goBack()}>
//                 <Ionicons name="arrow-back" size={22} color={COLORS.textPrimary} />
//              </TouchableOpacity>
//              <View style={styles.headerSearchPill}>
//                  <Ionicons name="search" size={20} color={COLORS.primary} />
//                  <TextInput style={styles.headerSearchText} placeholder="Search...." placeholderTextColor={COLORS.textSecondary} value={searchText} onChangeText={setSearchText} />
//              </View>
//              <TouchableOpacity style={styles.headerRoundBtn} onPress={() => setMenuVisible(true)}>
//                 <MaterialCommunityIcons name="dots-vertical" size={22} color={COLORS.textPrimary} />
//              </TouchableOpacity>
//         </View>
//       </Animated.View>

//       <TouchableOpacity style={styles.floatingBackBtn} onPress={() => navigation?.goBack()}>
//           <Ionicons name="arrow-back" size={22} color={COLORS.textPrimary} />
//       </TouchableOpacity>

//       <Animated.ScrollView
//         showsVerticalScrollIndicator={false}
//         onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
//         scrollEventThrottle={16}
//         contentContainerStyle={{ paddingBottom: 100, paddingTop: HEADER_HEIGHT }} 
//       >
//         <View style={styles.sheet}>
//             <View style={styles.resInfoContainer}>
//                 <View style={styles.sheetHandle} />
//                 <View style={styles.resHeaderRow}>
//                     <View style={{flex: 1}}>
//                         <Text style={styles.resTitleMain}>{vendorName}</Text>
//                         <View style={styles.resTitleSubRow}>
//                             <Text style={styles.resTitleSub}>By Oven Story</Text>
//                             <TouchableOpacity onPress={() => navigation.navigate('RestaurantInfoScreen')}>
//                                 <Ionicons name="information-circle-outline" size={18} color={COLORS.textPrimary} style={{ marginLeft: 6 }} />
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                     <View style={styles.ratingContainer}>
//                         <View style={styles.ratingBadge}>
//                             <Ionicons name="star" size={12} color={COLORS.white} style={{marginRight: 2}} />
//                             <Text style={styles.ratingScore}>4.0</Text>
//                         </View>
//                         <Text style={styles.ratingCount}>By 200+</Text>
//                     </View>
//                 </View>
//                 <View style={styles.metaRow}>
//                     <Ionicons name="location-sharp" size={18} color={COLORS.textSecondary} />
//                     <Text style={styles.metaTextBold}>1 km</Text>
//                     <View style={styles.metaDot} />
//                     <Text style={styles.metaTextRegular}>Harmu</Text>
//                 </View>
//                 <View style={styles.metaRow}>
//                     <Ionicons name="time-outline" size={18} color={COLORS.textSecondary} />
//                     <Text style={styles.metaTextBold}>25-30 mins</Text>
//                 </View>
//                 <View style={styles.thinDivider} />
//             </View>

//             <View style={styles.divider} />

//             <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterContainer}>
//                 {FILTERS.map((f, i) => {
//                     const isActive = activeFilter === f;
//                     let iconName = "";
//                     let IconComponent = Ionicons;
//                     let iconColor = isActive ? COLORS.white : COLORS.textPrimary;
                    
//                     if (f === "Filters") {
//                         iconName = "options-outline";
//                     } else if (f === "Veg") {
//                         IconComponent = MaterialCommunityIcons as any;
//                         iconName = "leaf-circle-outline";
//                         iconColor = isActive ? COLORS.white : "#007E33";
//                     } else if (f === "Non-veg") {
//                         IconComponent = MaterialCommunityIcons as any;
//                         iconName = "food-drumstick-outline";
//                         iconColor = isActive ? COLORS.white : "#D32F2F";
//                     } else if (f === "Highly Rated") {
//                         iconName = "sparkles";
//                         iconColor = isActive ? COLORS.white : "#FFB300";
//                     }

//                     return (
//                         <TouchableOpacity 
//                             key={i} 
//                             onPress={() => f === "Filters" ? setFilterPopupVisible(true) : setActiveFilter(f)}
//                             style={[styles.filterPill, isActive ? styles.filterActive : null]}
//                         >
//                             {iconName !== "" && <IconComponent name={iconName} size={16} color={iconColor} style={{marginRight: 4}} />}
//                             <Text style={[styles.filterText, isActive ? {color: COLORS.white} : null]}>{f}</Text>
//                             {f === 'Filters' && activeFilter !== 'Filters' && (
//                                 <View style={styles.filterBadge}><Text style={styles.filterBadgeText}>1</Text></View>
//                             )}
//                         </TouchableOpacity>
//                     );
//                 })}
//             </ScrollView>

//             <View style={styles.menuHeader}><Text style={styles.menuTitle}>Recommended</Text></View>

//             {vendorLoading ? (
//                 <View style={{padding: 20}}><ActivityIndicator size="large" color={COLORS.primary} /></View>
//             ) : (
//                 <>
//                     {filteredProducts.map((item) => (
//                         <MenuItem key={item.id} item={item} onAddPress={() => handleAddPress(item)} />
//                     ))}
//                     {filteredProducts.length === 0 && (
//                         <View style={{padding: 32, alignItems: 'center'}}>
//                             <MaterialCommunityIcons name="store-off-outline" size={50} color={COLORS.muted} />
//                             <Text style={{textAlign:'center', marginTop: 12, fontSize: 16, fontWeight: '600', color: COLORS.textSecondary}}>
//                                 {flatProducts.length === 0 ? "Product is not found" : `No items found matching "${activeFilter}"`}
//                             </Text>
//                         </View>
//                     )}
//                 </>
//             )}
//         </View>
//       </Animated.ScrollView>
      
//       <TouchableOpacity style={styles.fabBtn} activeOpacity={0.9} onPress={() => setMenuVisible(true)}>
//             <MaterialCommunityIcons name="silverware-fork-knife" size={20} color={COLORS.white} />
//             <Text style={styles.fabText}>MENU</Text>
//       </TouchableOpacity>

//       <Modal animationType="slide" transparent={true} visible={menuVisible} onRequestClose={() => setMenuVisible(false)}>
//         <View style={styles.modalOverlay}>
//           <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}><View style={styles.modalBackdrop} /></TouchableWithoutFeedback>
//           <View style={styles.closeBtnContainer}>
//               <TouchableOpacity onPress={() => setMenuVisible(false)} style={styles.closeBtn}><Ionicons name="close" size={24} color={COLORS.white} /></TouchableOpacity>
//           </View>
//           <View style={styles.modalContent}>
//               <Text style={styles.modalTitle}>Menu Options</Text>
//               <TouchableOpacity style={styles.modalOption}>
//                   <Ionicons name="bookmark-outline" size={24} color={COLORS.textPrimary} />
//                   <Text style={styles.modalOptionText}>Add to favourite</Text>
//               </TouchableOpacity>
//               <View style={styles.modalDivider} />
//               <TouchableOpacity style={styles.modalOption}>
//                   <Ionicons name="share-social-outline" size={24} color={COLORS.textPrimary} />
//                   <Text style={styles.modalOptionText}>Share this restaurant</Text>
//               </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//       <AddItemModal visible={addItemVisible} onClose={() => setAddItemVisible(false)} productData={selectedProduct} />

//       {/* NEW FILTER POPUP INTEGRATION */}
//       <FilterPopup 
//         visible={filterPopupVisible} 
//         onClose={() => setFilterPopupVisible(false)} 
//         activeFilter={activeFilter} 
//         onApply={(val) => setActiveFilter(val)} 
//       />

//       <FloatingCart />

//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   // Existing Styles...
//   container: { flex: 1, backgroundColor: COLORS.background },
//   stickyHeader: { position: 'absolute', top: 0, left: 0, right: 0, backgroundColor: 'transparent', zIndex: 100, paddingTop: Platform.OS === 'android' ? 40 : 50, paddingBottom: 12, borderBottomWidth: 0, elevation: 0 },
//   stickyInner: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, justifyContent: 'space-between' },
//   headerRoundBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.7)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'transparent', elevation: 0 },
//   headerSearchPill: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, height: 42, borderRadius: 21, paddingHorizontal: 16, marginHorizontal: 12, borderWidth: 1, borderColor: COLORS.secondary, elevation: 2 },
//   headerSearchText: { marginLeft: 8, fontSize: 14, color: COLORS.textPrimary, flex: 1 },
//   floatingBackBtn: { position: 'absolute', top: Platform.OS === 'android' ? 40 : 50, left: 16, zIndex: 90, width: 40, height: 40, borderRadius: 20, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', elevation: 0 },
//   heroContainer: { position: 'absolute', top: 0, left: 0, right: 0, height: HEADER_HEIGHT, width: width, zIndex: 0, overflow: 'hidden' },
//   heroImage: { width: '100%', height: '100%', resizeMode: 'cover' },
//   heroOverlay: { ...StyleSheet.absoluteFillObject },
//   sheet: { backgroundColor: COLORS.background, marginTop: -20, borderTopLeftRadius: 24, borderTopRightRadius: 24 },
//   resInfoContainer: { paddingHorizontal: 16, paddingTop: 24, paddingBottom: 0, backgroundColor: COLORS.white, borderTopLeftRadius: 24, borderTopRightRadius: 24 },
//   sheetHandle: { width: 48, height: 5, backgroundColor: '#E0E0E0', borderRadius: 10, alignSelf: 'center', position: 'absolute', top: 10 },
//   resHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
//   resTitleMain: { fontSize: 26, fontWeight: '800', color: COLORS.textPrimary, letterSpacing: -0.5, lineHeight: 32 },
//   resTitleSubRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
//   resTitleSub: { fontSize: 24, fontWeight: '800', color: COLORS.textPrimary, letterSpacing: -0.5 },
//   ratingContainer: { alignItems: 'center', marginTop: 4 },
//   ratingBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.highlight, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginBottom: 4 },
//   ratingScore: { color: COLORS.white, fontWeight: 'bold', fontSize: 14 },
//   ratingCount: { fontSize: 11, color: COLORS.textSecondary, borderBottomWidth: 1, borderBottomColor: COLORS.secondary, borderStyle: 'dashed' },
//   metaRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
//   metaTextBold: { fontSize: 14, fontWeight: '600', color: COLORS.highlight, marginLeft: 6 },
//   metaTextRegular: { fontSize: 14, color: COLORS.textPrimary },
//   metaDot: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: COLORS.textSecondary, marginHorizontal: 8 },
//   thinDivider: { height: 1, backgroundColor: COLORS.secondary, marginBottom: 14 },
//   divider: { height: 8, backgroundColor: COLORS.background, marginVertical: 10 },
//   filterContainer: { paddingHorizontal: 16, paddingVertical: 10, gap: 10, alignItems: 'center' },
//   filterPill: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 8, borderWidth: 1, borderColor: COLORS.secondary, backgroundColor: COLORS.white, flexDirection: 'row', alignItems: 'center' },
//   filterActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
//   filterText: { fontSize: 13, fontWeight: '800', color: COLORS.textPrimary },
//   filterBadge: { backgroundColor: COLORS.primary, width: 16, height: 16, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginLeft: 6 },
//   filterBadgeText: { fontSize: 9, color: COLORS.white, fontWeight: 'bold' },
//   menuHeader: { paddingHorizontal: 16, marginTop: 10, marginBottom: 10 },
//   menuTitle: { fontSize: 18, fontWeight: '800', color: COLORS.textPrimary },
//   cardContainer: { flexDirection: 'row', backgroundColor: COLORS.background, marginHorizontal: 16, marginBottom: 16, borderRadius: 16, padding: 12, borderWidth: 1, borderColor: COLORS.secondary },
//   cardContent: { flex: 1, paddingRight: 12 },
//   cardTopRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
//   vegIconBorder: { width: 16, height: 16, borderWidth: 1.5, justifyContent: 'center', alignItems: 'center', marginRight: 8, borderRadius: 4 },
//   vegIconDot: { width: 8, height: 8, borderRadius: 4 },
//   itemName: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary, lineHeight: 22 },
//   itemPrice: { fontSize: 15, fontWeight: '600', color: COLORS.textPrimary, marginTop: 2 },
//   itemDesc: { fontSize: 12, color: COLORS.textSecondary, marginTop: 8, lineHeight: 16 },
//   iconRow: { marginTop: 12 },
//   imageWrapper: { width: 140, alignItems: 'center', position: 'relative' },
//   itemImage: { width: 140, height: 120, borderRadius: 12, backgroundColor: COLORS.secondary, resizeMode: 'cover' },
//   addBtnContainer: { position: 'absolute', bottom: -12, alignItems: 'center', width: '100%' },
//   addBtn: { backgroundColor: COLORS.primary, paddingVertical: 10, paddingHorizontal: 32, borderRadius: 24, elevation: 5, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
//   addBtnText: { color: COLORS.white, fontSize: 14, fontWeight: '900' },
//   fabBtn: { position: 'absolute', bottom: 30, right: 20, backgroundColor: COLORS.textPrimary, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 30, elevation: 5 },
//   fabText: { color: COLORS.white, fontWeight: 'bold', marginLeft: 8 },
//   modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
//   modalBackdrop: { flex: 1 },
//   closeBtnContainer: { alignItems: 'center', marginBottom: 12 },
//   closeBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.textPrimary, justifyContent: 'center', alignItems: 'center' },
//   modalContent: { backgroundColor: COLORS.white, paddingHorizontal: 20, paddingTop: 24, paddingBottom: 40, borderTopLeftRadius: 24, borderTopRightRadius: 24 },
//   modalTitle: { fontSize: 20, fontWeight: '800', marginBottom: 20, color: COLORS.textPrimary },
//   modalOption: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14 },
//   modalOptionText: { fontSize: 16, marginLeft: 16, color: COLORS.textPrimary, fontWeight: '400' },
//   modalDivider: { height: 1, backgroundColor: COLORS.background, marginLeft: 40 },
//   popupOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
//   popupBackdrop: { flex: 1 },
//   popupContent: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 20, borderTopRightRadius: 20, height: '75%' },
//   popupCloseContainer: { position: 'absolute', top: -50, left: 0, right: 0, alignItems: 'center', zIndex: 10 },
//   popupCloseBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' },
//   popupHeader: { flexDirection: 'row', padding: 16, alignItems: 'flex-start' },
//   popupHeaderImgWrapper: { width: 60, height: 60, borderRadius: 12, borderWidth: 1, borderColor: COLORS.white, position: 'relative', marginRight: 12 },
//   popupHeaderImg: { width: '100%', height: '100%', borderRadius: 12 },
//   popupVegBadge: { position: 'absolute', top: 4, right: 4, width: 14, height: 14, borderWidth: 1, borderColor: COLORS.primary, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.white, borderRadius: 4 },
//   popupHeaderInfo: { flex: 1 },
//   popupTitle: { fontSize: 18, fontWeight: '700', color: COLORS.black, marginBottom: 8 },
//   dividerLight: { height: 1, backgroundColor: '#F3F4F6' },
//   dividerThick: { height: 8, backgroundColor: COLORS.background },
//   popupSection: { padding: 16 },
//   sectionHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
//   sectionTitle: { fontSize: 16, fontWeight: '700', color: COLORS.black },
//   sectionSubtitle: { fontSize: 12, color: COLORS.background, marginBottom: 16 },
//   radioRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
//   radioLabel: { fontSize: 16, color: COLORS.black, fontWeight: '500' },
//   radioPrice: { fontSize: 16, color: COLORS.black, fontWeight: '500', marginRight: 16 },
//   radioOuter: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: COLORS.primary, alignItems: 'center', justifyContent: 'center' },
//   radioInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: COLORS.primary },
//   inputContainer: { backgroundColor: COLORS.SOFT_BLUE, borderRadius: 12, padding: 12, height: 100, borderWidth: 1, borderColor: COLORS.background, position: 'relative' },
//   textInput: { fontSize: 14, color: COLORS.black, textAlignVertical: 'top', flex: 1 },
//   charCount: { position: 'absolute', bottom: 8, right: 12, fontSize: 11, color: COLORS.LITE_GRAY },
//   chip: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, borderWidth: 1, borderColor: COLORS.SOFT_BLUE, marginRight: 8 },
//   chipText: { fontSize: 13, color: COLORS.black },
//   popupFooter: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: COLORS.background, padding: 16, flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: COLORS.background, elevation: 10 },
//   counterBox: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: COLORS.primary, borderRadius: 8, backgroundColor: COLORS.SOFT_BLUE, paddingVertical: 6, paddingHorizontal: 10, marginRight: 16 },
//   counterBtn: { paddingHorizontal: 8 },
//   counterBtnText: { fontSize: 18, color: COLORS.primary, fontWeight: 'bold' },
//   counterVal: { fontSize: 16, fontWeight: '700', color: COLORS.primary, marginHorizontal: 8 },
//   addBtnLarge: { flex: 1, backgroundColor: COLORS.primary, borderRadius: 8, paddingVertical: 14, alignItems: 'center' },
//   addBtnLargeText: { color: COLORS.white, fontSize: 16, fontWeight: '700' },

//   // FILTER MODAL SPECIFIC STYLES
//   filterModalContent: { backgroundColor: COLORS.white, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20 },
//   filterHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
//   filterTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.black },
//   clearAllText: { color: '#FF7F00', fontWeight: 'bold', fontSize: 14 },
//   filterOptionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15 },
//   filterOptionText: { fontSize: 16, color: COLORS.black },
//   checkbox: { width: 22, height: 22, borderRadius: 6, borderWidth: 1, borderColor: '#D1D5DB', justifyContent: 'center', alignItems: 'center' },
//   checkboxActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
//   applyBtn: { backgroundColor: COLORS.primary, paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 10 },
//   applyBtnText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' }
// });



import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Animated,
    Dimensions,
    Image,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useAddToCart } from "../../api/hooks/cart.ts";
import { ProductVariant, useGetVendorInventory, VendorProduct } from "../../api/hooks/vendorInventory.ts";
import { COLORS } from "../../theme/color";
import FloatingCart from "../cart/FloatingCart";

type RootStackParamList = {
    RestaurantInfoScreen: undefined 
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width, height } = Dimensions.get("window");
const HEADER_HEIGHT = 450; 

const FILTERS = ["Filters", "Veg", "Non-veg", "Highly Rated"];

// --- NEW STATIC DATA FOR MENU BASED ON VIDEO ---
const MENU_CATEGORIES = [
    { name: "Desserts", count: 3, hasPlus: false },
    { name: "Recommended for you", count: 25, hasPlus: false },
    { name: "Breakfast Special", count: 9, hasPlus: true },
    { name: "Try New - Sub Cravers", count: 5, hasPlus: false },
    { name: "HOT & Cheesy Signature Subs", count: 8, hasPlus: false },
    { name: "Create Your Own Sandwiches", count: 18, hasPlus: true },
    { name: "Coke Combos(save 31%)", count: 11, hasPlus: true },
    { name: "GuiltFree", count: 13, hasPlus: true },
    { name: "Salads", count: 17, hasPlus: true },
    { name: "Signature Wraps", count: 17, hasPlus: true },
    { name: "Sides - Try New Crispers", count: 7, hasPlus: true },
    { name: "Drinks (Beverages)", count: 13, hasPlus: true },
    { name: "Drinks", count: 1, hasPlus: false },
];

// --- Helper Components ---

const VegIcon = ({ isVeg }: { isVeg: boolean }) => (
  <View
    style={[
      styles.vegIconBorder,
      { borderColor: isVeg ? COLORS.highlight : 'red' },
    ]}
  >
    <View
      style={[
        styles.vegIconDot,
        { backgroundColor: isVeg ? COLORS.highlight : 'red' },
      ]}
    />
  </View>
);

// --- COMPONENT: Filter Popup (Matches Image) ---
const FilterPopup = ({ visible, onClose, activeFilter, onApply }: { visible: boolean; onClose: () => void; activeFilter: string; onApply: (val: string) => void }) => {
    const [tempFilter, setTempFilter] = useState(activeFilter);

    useEffect(() => {
        setTempFilter(activeFilter);
    }, [activeFilter, visible]);

    const sortOptions = ["Price - Low to High", "Price - High to Low"];
    const prefOptions = ["Veg", "Egg", "Non-veg"];
    const topOptions = ["Highly Reordered"];

    const renderOption = (option: string) => {
        let iconName = "";
        let IconComponent = Ionicons;
        let iconColor = COLORS.black;
        let iconSize = 18;

        if (option === "Price - Low to High") {
            iconName = "trending-up";
            iconColor = COLORS.primary;
        } else if (option === "Price - High to Low") {
            iconName = "trending-down";
            iconColor = COLORS.primary;
        } else if (option === "Veg") {
            IconComponent = MaterialCommunityIcons as any;
            iconName = "leaf-circle-outline";
            iconColor = "#007E33";
            iconSize = 20;
        } else if (option === "Egg") {
            IconComponent = MaterialCommunityIcons as any;
            iconName = "egg-outline";
            iconColor = "#F5A623";
            iconSize = 20;
        } else if (option === "Non-veg") {
            IconComponent = MaterialCommunityIcons as any;
            iconName = "food-drumstick-outline";
            iconColor = "#D32F2F";
            iconSize = 20;
        } else if (option === "Highly Reordered") {
            iconName = "sparkles";
            iconColor = "#FFB300";
        } else if (option.includes("Low to High")) {
             iconName = "trending-up";
             iconColor = COLORS.primary;
        } else if (option.includes("High to Low")) {
             iconName = "trending-down";
             iconColor = COLORS.primary;
        }

        return (
            <TouchableOpacity 
                key={option} 
                style={styles.filterOptionRow} 
                onPress={() => setTempFilter(option)}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {iconName !== "" && (
                        <IconComponent name={iconName} size={iconSize} color={iconColor} style={{ marginRight: 8 }} />
                    )}
                    <Text style={styles.filterOptionText}>{option}</Text>
                </View>
                <View style={[styles.checkbox, tempFilter === option && styles.checkboxActive]}>
                    {tempFilter === option && <Ionicons name="checkmark" size={16} color={COLORS.white} />}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
            <View style={styles.popupOverlay}>
                <TouchableWithoutFeedback onPress={onClose}><View style={styles.modalBackdrop} /></TouchableWithoutFeedback>
                <View style={[styles.filterModalContent, { maxHeight: height * 0.8 }]}>
                    <View style={styles.filterHeader}>
                        <Text style={styles.filterTitle}>Filter</Text>
                        <TouchableOpacity onPress={() => setTempFilter("Filters")}>
                            <Text style={styles.clearAllText}>Clear All</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.dividerLight} />

                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.black, marginTop: 10, marginBottom: 5 }}>Sort By</Text>
                        {sortOptions.map(renderOption)}

                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.black, marginTop: 20, marginBottom: 5 }}>Veg/Non-veg Preference</Text>
                        {prefOptions.map(renderOption)}

                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.black, marginTop: 20, marginBottom: 5 }}>Top Picks</Text>
                        {topOptions.map(renderOption)}
                    </ScrollView>

                    <TouchableOpacity 
                        style={styles.applyBtn} 
                        onPress={() => {
                            onApply(tempFilter);
                            onClose();
                        }}
                    >
                        <Text style={styles.applyBtnText}>Apply</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

// --- COMPONENT: Menu Item Card ---
const MenuItem = ({ item, onAddPress }: { item: VendorProduct, onAddPress: () => void }) => {
  const imageUrl = item.product.images?.[0]?.image?.url 
    ? item.product.images[0].image.url 
    : "https://via.placeholder.com/150";

  const displayPrice = item.price?.d?.[0] || 0;

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardContent}>
        <View style={styles.cardTopRow}>
          <VegIcon isVeg={item.product.isVeg} />
        </View>
        <Text style={styles.itemName}>{item.product.name}</Text>
        <Text style={styles.itemPrice}>₹{displayPrice}</Text>
        <Text style={styles.itemDesc} numberOfLines={2}>{item.product.description}</Text>
        <View style={styles.iconRow}>
            <TouchableOpacity hitSlop={10}>
                <Ionicons name="heart-outline" size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
        </View>
      </View>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: imageUrl }} style={styles.itemImage} />
        <View style={styles.addBtnContainer}>
            <TouchableOpacity style={styles.addBtn} activeOpacity={0.8} onPress={onAddPress}>
                <Text style={styles.addBtnText}>ADD</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// --- COMPONENT: Add Item Modal ---
interface AddItemModalProps {
  visible: boolean;
  onClose: () => void;
  productData: VendorProduct | null;
}

const AddItemModal = ({ visible, onClose, productData }: AddItemModalProps) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [itemCount, setItemCount] = useState(1);
  const [instruction, setInstruction] = useState("");

  const { mutate: addToCart, isPending } = useAddToCart();
  const chips = ["Less Spicy", "Non spicy", "Mild spicy"];

  useEffect(() => {
    if (productData) {
        setItemCount(1);
        setInstruction("");
        if (productData.productVariants && productData.productVariants.length > 0) {
            const defaultVar = productData.productVariants.find(v => v.isDefault) || productData.productVariants[0];
            setSelectedVariant(defaultVar);
        } else {
            setSelectedVariant(null);
        }
    }
  }, [productData, visible]);

  if (!productData) return null;

  const basePrice = selectedVariant 
    ? (selectedVariant.price?.d?.[0] || 0)
    : (productData.price?.d?.[0] || 0);

  const totalPrice = basePrice * itemCount;
  const imageUrl = productData.product.images?.[0]?.image?.url || "https://via.placeholder.com/150";

  const handleIncrement = () => setItemCount(prev => prev + 1);
  const handleDecrement = () => setItemCount(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    if (!productData) return;
    const payload = {
        vendorProductId: Number(productData.id), 
        vendorId: Number(productData.vendorId),
        productVariantId: selectedVariant ? Number(selectedVariant.id) : undefined,
        quantity: itemCount,
        notes: instruction
    };

    addToCart(payload, {
        onSuccess: () => {
            if (Platform.OS === 'android') {
                ToastAndroid.show("Item added to cart", ToastAndroid.SHORT);
            } else {
                Alert.alert("Success", "Item added to cart");
            }
            onClose();
        },
        onError: (error) => {
            console.error(error);
            Alert.alert("Error", "Failed to add item to cart.");
        }
    });
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.popupOverlay}>
        <TouchableWithoutFeedback onPress={onClose}><View style={styles.popupBackdrop} /></TouchableWithoutFeedback>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.popupContent}>
            <View style={styles.popupCloseContainer}>
                 <TouchableOpacity style={styles.popupCloseBtn} onPress={onClose} activeOpacity={0.8}>
                    <Ionicons name="close" size={22} color={COLORS.white} />
                 </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false}>
                <View style={styles.popupHeader}>
                    <View style={styles.popupHeaderImgWrapper}>
                        <Image source={{ uri: imageUrl }} style={styles.popupHeaderImg} />
                        <View style={styles.popupVegBadge}>
                            <View style={[styles.vegIconDot, {backgroundColor: productData.product.isVeg ? COLORS.highlight : 'red'}]} />
                        </View>
                    </View>
                    <View style={styles.popupHeaderInfo}>
                        <Text style={styles.popupTitle}>{productData.product.name}</Text>
                        <Text style={{fontSize: 12, color: COLORS.textSecondary}} numberOfLines={1}>{productData.product.description}</Text>
                    </View>
                </View>
                <View style={styles.dividerLight} />
                {productData.productVariants.length > 0 && (
                    <View style={styles.popupSection}>
                        <View style={styles.sectionHeaderRow}>
                            <Text style={styles.sectionTitle}>Quantity / Size</Text>
                        </View>
                        <Text style={styles.sectionSubtitle}>Required • Select any 1 option</Text>
                        {productData.productVariants.map((variant) => {
                            const isSelected = selectedVariant?.id === variant.id;
                            return (
                                <TouchableOpacity key={variant.id} style={styles.radioRow} onPress={() => setSelectedVariant(variant)} activeOpacity={0.8}>
                                    <Text style={styles.radioLabel}>{variant.title}</Text>
                                    <View style={{flex: 1}} />
                                    <Text style={styles.radioPrice}>₹{variant.price?.d?.[0]}</Text>
                                    <View style={[styles.radioOuter, isSelected ? {borderColor: COLORS.primary} : null]}>
                                        {isSelected && <View style={styles.radioInner} />}
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                )}
                <View style={styles.dividerThick} />
                <View style={styles.popupSection}>
                    <View style={styles.sectionHeaderRow}><Text style={styles.sectionTitle}>Add a cooking request (optional)</Text></View>
                    <View style={styles.inputContainer}>
                        <TextInput placeholder="e.g. Don't make it too spicy" placeholderTextColor="#9CA3AF" style={styles.textInput} multiline maxLength={100} value={instruction} onChangeText={setInstruction} />
                        <Text style={styles.charCount}>{instruction.length}/100</Text>
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
            <View style={styles.popupFooter}>
                 <View style={styles.counterBox}>
                     <TouchableOpacity onPress={handleDecrement} style={styles.counterBtn}><Text style={styles.counterBtnText}>−</Text></TouchableOpacity>
                     <Text style={styles.counterVal}>{itemCount}</Text>
                     <TouchableOpacity onPress={handleIncrement} style={styles.counterBtn}><Text style={styles.counterBtnText}>+</Text></TouchableOpacity>
                 </View>
                 <TouchableOpacity style={[styles.addBtnLarge, isPending && { opacity: 0.7 }]} onPress={handleAddToCart} disabled={isPending}>
                     {isPending ? <ActivityIndicator color={COLORS.white} /> : <Text style={styles.addBtnLargeText}>Add item ₹{totalPrice}</Text>}
                 </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

// --- MAIN SCREEN ---
export default function PizzaProjectScreen({ navigation, route }: { navigation: any; route: any }) {
  const { vendorId = "1", vendorName = "Restaurant", vendorImage = "" } = (route?.params || {}) as any;
  
  const [menuVisible, setMenuVisible] = useState(false);
  const [addItemVisible, setAddItemVisible] = useState(false);
  const [filterPopupVisible, setFilterPopupVisible] = useState(false); // New Filter Modal State
  const [selectedProduct, setSelectedProduct] = useState<VendorProduct | null>(null);
  
  const [activeFilter, setActiveFilter] = useState("Filters");
  const [searchText, setSearchText] = useState(""); 
  const scrollY = useRef(new Animated.Value(0)).current;

  const { data: vendorData, isLoading: vendorLoading } = useGetVendorInventory({ vendorId });

  const flatProducts = useMemo(() => {
    if (!vendorData) return [];
    return vendorData.pages.flatMap(page => page.products);
  }, [vendorData]);

  const filteredProducts = useMemo(() => {
    if (!flatProducts) return [];
    let result = flatProducts;
    if (searchText) {
        const lowerSearch = searchText.toLowerCase();
        result = result.filter(item => item.product.name.toLowerCase().includes(lowerSearch));
    }
    switch (activeFilter) {
        case "Veg": return result.filter((item) => item.product.isVeg === true);
        case "Egg": return result.filter((item) => item.product.isVeg === false); // fallback logic, depends on API struct
        case "Non-veg": return result.filter((item) => item.product.isVeg === false);
        case "Price - Low to High": return [...result].sort((a, b) => (a.price?.d?.[0] || 0) - (b.price?.d?.[0] || 0));
        case "Price - High to Low": return [...result].sort((a, b) => (b.price?.d?.[0] || 0) - (a.price?.d?.[0] || 0));
        case "Highly Reordered": return result; // API has no highly rated param yet
        default: return result;
    }
  }, [activeFilter, flatProducts, searchText]);

  const headerOpacity = scrollY.interpolate({ inputRange: [0, HEADER_HEIGHT - 100], outputRange: [1, 1], extrapolate: "clamp" });
  const headerTranslateY = scrollY.interpolate({ inputRange: [0, HEADER_HEIGHT], outputRange: [0, -HEADER_HEIGHT / 2], extrapolate: 'clamp' });
  const imageScale = scrollY.interpolate({ inputRange: [-HEADER_HEIGHT, 0], outputRange: [2, 1], extrapolate: 'clamp' });

  const handleAddPress = (item: VendorProduct) => {
    setSelectedProduct(item);
    setAddItemVisible(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      <Animated.View style={[styles.heroContainer, { transform: [{ translateY: headerTranslateY }, { scale: imageScale }] }]}>
          <Image source={{ uri: vendorImage || "https://via.placeholder.com/800x400?text=Restaurant" }} style={styles.heroImage} />
          <View style={styles.heroOverlay} />
      </Animated.View>

      <Animated.View style={[styles.stickyHeader, { opacity: headerOpacity }]}>
        <View style={styles.stickyInner}>
             <TouchableOpacity style={styles.headerRoundBtn} onPress={() => navigation?.goBack()}>
                <Ionicons name="arrow-back" size={22} color={COLORS.textPrimary} />
             </TouchableOpacity>
             <View style={styles.headerSearchPill}>
                 <Ionicons name="search" size={20} color={COLORS.primary} />
                 <TextInput style={styles.headerSearchText} placeholder="Search...." placeholderTextColor={COLORS.textSecondary} value={searchText} onChangeText={setSearchText} />
             </View>
             <TouchableOpacity style={styles.headerRoundBtn} onPress={() => setMenuVisible(true)}>
                <MaterialCommunityIcons name="dots-vertical" size={22} color={COLORS.textPrimary} />
             </TouchableOpacity>
        </View>
      </Animated.View>

      <TouchableOpacity style={styles.floatingBackBtn} onPress={() => navigation?.goBack()}>
          <Ionicons name="arrow-back" size={22} color={COLORS.textPrimary} />
      </TouchableOpacity>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 100, paddingTop: HEADER_HEIGHT }} 
      >
        <View style={styles.sheet}>
            <View style={styles.resInfoContainer}>
                <View style={styles.sheetHandle} />
                <View style={styles.resHeaderRow}>
                    <View style={{flex: 1}}>
                        <Text style={styles.resTitleMain}>{vendorName}</Text>
                        <View style={styles.resTitleSubRow}>
                            <Text style={styles.resTitleSub}>By Oven Story</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('RestaurantInfoScreen')}>
                                <Ionicons name="information-circle-outline" size={18} color={COLORS.textPrimary} style={{ marginLeft: 6 }} />
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
                <View style={styles.metaRow}>
                    <Ionicons name="location-sharp" size={18} color={COLORS.textSecondary} />
                    <Text style={styles.metaTextBold}>1 km</Text>
                    <View style={styles.metaDot} />
                    <Text style={styles.metaTextRegular}>Harmu</Text>
                </View>
                <View style={styles.metaRow}>
                    <Ionicons name="time-outline" size={18} color={COLORS.textSecondary} />
                    <Text style={styles.metaTextBold}>25-30 mins</Text>
                </View>
                <View style={styles.thinDivider} />
            </View>

            <View style={styles.divider} />

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterContainer}>
                {FILTERS.map((f, i) => {
                    const isActive = activeFilter === f;
                    let iconName = "";
                    let IconComponent = Ionicons;
                    let iconColor = isActive ? COLORS.white : COLORS.textPrimary;
                    
                    if (f === "Filters") {
                        iconName = "options-outline";
                    } else if (f === "Veg") {
                        IconComponent = MaterialCommunityIcons as any;
                        iconName = "leaf-circle-outline";
                        iconColor = isActive ? COLORS.white : "#007E33";
                    } else if (f === "Non-veg") {
                        IconComponent = MaterialCommunityIcons as any;
                        iconName = "food-drumstick-outline";
                        iconColor = isActive ? COLORS.white : "#D32F2F";
                    } else if (f === "Highly Rated") {
                        iconName = "sparkles";
                        iconColor = isActive ? COLORS.white : "#FFB300";
                    }

                    return (
                        <TouchableOpacity 
                            key={i} 
                            onPress={() => f === "Filters" ? setFilterPopupVisible(true) : setActiveFilter(f)}
                            style={[styles.filterPill, isActive ? styles.filterActive : null]}
                        >
                            {iconName !== "" && <IconComponent name={iconName} size={16} color={iconColor} style={{marginRight: 4}} />}
                            <Text style={[styles.filterText, isActive ? {color: COLORS.white} : null]}>{f}</Text>
                            {f === 'Filters' && activeFilter !== 'Filters' && (
                                <View style={styles.filterBadge}><Text style={styles.filterBadgeText}>1</Text></View>
                            )}
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>

            <View style={styles.menuHeader}><Text style={styles.menuTitle}>Recommended</Text></View>

            {vendorLoading ? (
                <View style={{padding: 20}}><ActivityIndicator size="large" color={COLORS.primary} /></View>
            ) : (
                <>
                    {filteredProducts.map((item) => (
                        <MenuItem key={item.id} item={item} onAddPress={() => handleAddPress(item)} />
                    ))}
                    {filteredProducts.length === 0 && (
                        <View style={{padding: 32, alignItems: 'center'}}>
                            <MaterialCommunityIcons name="store-off-outline" size={50} color={COLORS.muted} />
                            <Text style={{textAlign:'center', marginTop: 12, fontSize: 16, fontWeight: '600', color: COLORS.textSecondary}}>
                                {flatProducts.length === 0 ? "Product is not found" : `No items found matching "${activeFilter}"`}
                            </Text>
                        </View>
                    )}
                </>
            )}
        </View>
      </Animated.ScrollView>
      
      <TouchableOpacity style={styles.fabBtn} activeOpacity={0.9} onPress={() => setMenuVisible(true)}>
            <MaterialCommunityIcons name="silverware-fork-knife" size={20} color={COLORS.white} />
            <Text style={styles.fabText}>MENU</Text>
      </TouchableOpacity>

      {/* --- REPLACED MENU POPUP --- */}
      <Modal animationType="slide" transparent={true} visible={menuVisible} onRequestClose={() => setMenuVisible(false)}>
        <View style={styles.menuModalOverlay}>
          <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
              <View style={styles.modalBackdrop} />
          </TouchableWithoutFeedback>
          <View style={styles.menuPopupContent}>
              <ScrollView showsVerticalScrollIndicator={false}>
                  {MENU_CATEGORIES.map((item, index) => (
                      <TouchableOpacity key={index} style={styles.menuItemRow} activeOpacity={0.7}>
                          <View style={styles.menuItemLeft}>
                              <Text style={styles.menuItemText}>{item.name}</Text>
                              {item.hasPlus && <Text style={styles.menuItemPlus}>+</Text>}
                          </View>
                          <Text style={styles.menuItemCount}>{item.count}</Text>
                      </TouchableOpacity>
                  ))}
              </ScrollView>
          </View>
        </View>
      </Modal>

      <AddItemModal visible={addItemVisible} onClose={() => setAddItemVisible(false)} productData={selectedProduct} />

      <FilterPopup 
        visible={filterPopupVisible} 
        onClose={() => setFilterPopupVisible(false)} 
        activeFilter={activeFilter} 
        onApply={(val) => setActiveFilter(val)} 
      />

      <FloatingCart />

    </View>
  );
}

const styles = StyleSheet.create({
  // Existing Styles...
  container: { flex: 1, backgroundColor: COLORS.background },
  stickyHeader: { position: 'absolute', top: 0, left: 0, right: 0, backgroundColor: 'transparent', zIndex: 100, paddingTop: Platform.OS === 'android' ? 40 : 50, paddingBottom: 12, borderBottomWidth: 0, elevation: 0 },
  stickyInner: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, justifyContent: 'space-between' },
  headerRoundBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.7)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'transparent', elevation: 0 },
  headerSearchPill: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, height: 42, borderRadius: 21, paddingHorizontal: 16, marginHorizontal: 12, borderWidth: 1, borderColor: COLORS.secondary, elevation: 2 },
  headerSearchText: { marginLeft: 8, fontSize: 14, color: COLORS.textPrimary, flex: 1 },
  floatingBackBtn: { position: 'absolute', top: Platform.OS === 'android' ? 40 : 50, left: 16, zIndex: 90, width: 40, height: 40, borderRadius: 20, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', elevation: 0 },
  heroContainer: { position: 'absolute', top: 0, left: 0, right: 0, height: HEADER_HEIGHT, width: width, zIndex: 0, overflow: 'hidden' },
  heroImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  heroOverlay: { ...StyleSheet.absoluteFillObject },
  sheet: { backgroundColor: COLORS.background, marginTop: -20, borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  resInfoContainer: { paddingHorizontal: 16, paddingTop: 24, paddingBottom: 0, backgroundColor: COLORS.white, borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  sheetHandle: { width: 48, height: 5, backgroundColor: '#E0E0E0', borderRadius: 10, alignSelf: 'center', position: 'absolute', top: 10 },
  resHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  resTitleMain: { fontSize: 26, fontWeight: '800', color: COLORS.textPrimary, letterSpacing: -0.5, lineHeight: 32 },
  resTitleSubRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  resTitleSub: { fontSize: 24, fontWeight: '800', color: COLORS.textPrimary, letterSpacing: -0.5 },
  ratingContainer: { alignItems: 'center', marginTop: 4 },
  ratingBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.highlight, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginBottom: 4 },
  ratingScore: { color: COLORS.white, fontWeight: 'bold', fontSize: 14 },
  ratingCount: { fontSize: 11, color: COLORS.textSecondary, borderBottomWidth: 1, borderBottomColor: COLORS.secondary, borderStyle: 'dashed' },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  metaTextBold: { fontSize: 14, fontWeight: '600', color: COLORS.highlight, marginLeft: 6 },
  metaTextRegular: { fontSize: 14, color: COLORS.textPrimary },
  metaDot: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: COLORS.textSecondary, marginHorizontal: 8 },
  thinDivider: { height: 1, backgroundColor: COLORS.secondary, marginBottom: 14 },
  divider: { height: 8, backgroundColor: COLORS.background, marginVertical: 10 },
  filterContainer: { paddingHorizontal: 16, paddingVertical: 10, gap: 10, alignItems: 'center' },
  filterPill: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 8, borderWidth: 1, borderColor: COLORS.secondary, backgroundColor: COLORS.white, flexDirection: 'row', alignItems: 'center' },
  filterActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  filterText: { fontSize: 13, fontWeight: '800', color: COLORS.textPrimary },
  filterBadge: { backgroundColor: COLORS.primary, width: 16, height: 16, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginLeft: 6 },
  filterBadgeText: { fontSize: 9, color: COLORS.white, fontWeight: 'bold' },
  menuHeader: { paddingHorizontal: 16, marginTop: 10, marginBottom: 10 },
  menuTitle: { fontSize: 18, fontWeight: '800', color: COLORS.textPrimary },
  cardContainer: { flexDirection: 'row', backgroundColor: COLORS.background, marginHorizontal: 16, marginBottom: 16, borderRadius: 16, padding: 12, borderWidth: 1, borderColor: COLORS.secondary },
  cardContent: { flex: 1, paddingRight: 12 },
  cardTopRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  vegIconBorder: { width: 16, height: 16, borderWidth: 1.5, justifyContent: 'center', alignItems: 'center', marginRight: 8, borderRadius: 4 },
  vegIconDot: { width: 8, height: 8, borderRadius: 4 },
  itemName: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary, lineHeight: 22 },
  itemPrice: { fontSize: 15, fontWeight: '600', color: COLORS.textPrimary, marginTop: 2 },
  itemDesc: { fontSize: 12, color: COLORS.textSecondary, marginTop: 8, lineHeight: 16 },
  iconRow: { marginTop: 12 },
  imageWrapper: { width: 140, alignItems: 'center', position: 'relative' },
  itemImage: { width: 140, height: 120, borderRadius: 12, backgroundColor: COLORS.secondary, resizeMode: 'cover' },
  addBtnContainer: { position: 'absolute', bottom: -12, alignItems: 'center', width: '100%' },
  addBtn: { backgroundColor: COLORS.primary, paddingVertical: 10, paddingHorizontal: 32, borderRadius: 24, elevation: 5, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  addBtnText: { color: COLORS.white, fontSize: 14, fontWeight: '900' },
  fabBtn: { position: 'absolute', bottom: 30, right: 20, backgroundColor: COLORS.textPrimary, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 30, elevation: 5 },
  fabText: { color: COLORS.white, fontWeight: 'bold', marginLeft: 8 },

  // --- REPLACED MENU STYLES ---
  menuModalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end', alignItems: 'center' },
  modalBackdrop: { flex: 1, width: '100%' },
  menuPopupContent: { width: width * 0.9, backgroundColor: COLORS.white, maxHeight: height * 0.5, borderRadius: 16, marginBottom: 90, paddingVertical: 12, elevation: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5 },
  menuItemRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 20 },
  menuItemLeft: { flexDirection: 'row', alignItems: 'center' },
  menuItemText: { fontSize: 16, color: '#333', fontWeight: '500' },
  menuItemPlus: { color: '#E53935', fontSize: 16, fontWeight: '700', marginLeft: 6 },
  menuItemCount: { fontSize: 16, color: '#555', fontWeight: '500' },

  popupOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  popupBackdrop: { flex: 1 },
  popupContent: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 20, borderTopRightRadius: 20, height: '75%' },
  popupCloseContainer: { position: 'absolute', top: -50, left: 0, right: 0, alignItems: 'center', zIndex: 10 },
  popupCloseBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' },
  popupHeader: { flexDirection: 'row', padding: 16, alignItems: 'flex-start' },
  popupHeaderImgWrapper: { width: 60, height: 60, borderRadius: 12, borderWidth: 1, borderColor: COLORS.white, position: 'relative', marginRight: 12 },
  popupHeaderImg: { width: '100%', height: '100%', borderRadius: 12 },
  popupVegBadge: { position: 'absolute', top: 4, right: 4, width: 14, height: 14, borderWidth: 1, borderColor: COLORS.primary, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.white, borderRadius: 4 },
  popupHeaderInfo: { flex: 1 },
  popupTitle: { fontSize: 18, fontWeight: '700', color: COLORS.black, marginBottom: 8 },
  dividerLight: { height: 1, backgroundColor: '#F3F4F6' },
  dividerThick: { height: 8, backgroundColor: COLORS.background },
  popupSection: { padding: 16 },
  sectionHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: COLORS.black },
  sectionSubtitle: { fontSize: 12, color: COLORS.background, marginBottom: 16 },
  radioRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  radioLabel: { fontSize: 16, color: COLORS.black, fontWeight: '500' },
  radioPrice: { fontSize: 16, color: COLORS.black, fontWeight: '500', marginRight: 16 },
  radioOuter: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: COLORS.primary, alignItems: 'center', justifyContent: 'center' },
  radioInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: COLORS.primary },
  inputContainer: { backgroundColor: COLORS.SOFT_BLUE, borderRadius: 12, padding: 12, height: 100, borderWidth: 1, borderColor: COLORS.background, position: 'relative' },
  textInput: { fontSize: 14, color: COLORS.black, textAlignVertical: 'top', flex: 1 },
  charCount: { position: 'absolute', bottom: 8, right: 12, fontSize: 11, color: COLORS.LITE_GRAY },
  chip: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, borderWidth: 1, borderColor: COLORS.SOFT_BLUE, marginRight: 8 },
  chipText: { fontSize: 13, color: COLORS.black },
  popupFooter: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: COLORS.background, padding: 16, flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: COLORS.background, elevation: 10 },
  counterBox: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: COLORS.primary, borderRadius: 8, backgroundColor: COLORS.SOFT_BLUE, paddingVertical: 6, paddingHorizontal: 10, marginRight: 16 },
  counterBtn: { paddingHorizontal: 8 },
  counterBtnText: { fontSize: 18, color: COLORS.primary, fontWeight: 'bold' },
  counterVal: { fontSize: 16, fontWeight: '700', color: COLORS.primary, marginHorizontal: 8 },
  addBtnLarge: { flex: 1, backgroundColor: COLORS.primary, borderRadius: 8, paddingVertical: 14, alignItems: 'center' },
  addBtnLargeText: { color: COLORS.white, fontSize: 16, fontWeight: '700' },

  filterModalContent: { backgroundColor: COLORS.white, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20 },
  filterHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  filterTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.black },
  clearAllText: { color: '#FF7F00', fontWeight: 'bold', fontSize: 14 },
  filterOptionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15 },
  filterOptionText: { fontSize: 16, color: COLORS.black },
  checkbox: { width: 22, height: 22, borderRadius: 6, borderWidth: 1, borderColor: '#D1D5DB', justifyContent: 'center', alignItems: 'center' },
  checkboxActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  applyBtn: { backgroundColor: COLORS.primary, paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  applyBtnText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' }
});