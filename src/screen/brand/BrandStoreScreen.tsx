import React, { useMemo, useRef, useState } from "react";
import {
    ActivityIndicator,
    Animated,
    Dimensions,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useGetVendorInventory } from "../../api/hooks/vendorInventory";
import { COLORS } from "../../theme/color";

const { width } = Dimensions.get("window");
const HEADER_HEIGHT = 300;

export default function BrandStoreScreen({ navigation, route }: { navigation: any; route: any }) {
    const { 
        vendorId = "1", 
        vendorName = "Store", 
        vendorImage = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80" 
    } = (route?.params || {}) as any;

    const [searchText, setSearchText] = useState("");
    const scrollY = useRef(new Animated.Value(0)).current;

    const { data: vendorData, isLoading: vendorLoading } = useGetVendorInventory({ vendorId });

    const flatProducts = useMemo(() => {
        if (!vendorData) return [];
        return vendorData.pages.flatMap(page => page.products).filter(item => item && (item.product || item.name));
    }, [vendorData]);

    const filteredProducts = useMemo(() => {
        if (!flatProducts) return [];
        if (!searchText) return flatProducts;
        const lowerSearch = searchText.toLowerCase();
        return flatProducts.filter(item => {
            const name = item.product?.name || item.name || "";
            return name.toLowerCase().includes(lowerSearch);
        });
    }, [flatProducts, searchText]);

    const headerTranslateY = scrollY.interpolate({ 
        inputRange: [0, HEADER_HEIGHT], 
        outputRange: [0, -HEADER_HEIGHT / 2], 
        extrapolate: 'clamp' 
    });
    
    const imageScale = scrollY.interpolate({ 
        inputRange: [-HEADER_HEIGHT, 0], 
        outputRange: [2, 1], 
        extrapolate: 'clamp' 
    });

    const renderProduct = (item: any) => {
        const name = item.product?.name || item.name || "Unknown Item";
        const description = item.product?.description || item.description || "";
        const price = item.price?.d?.[0] || item.product?.sellingPrice?.d?.[0] || 0;
        const imageUrl = item.product?.images?.[0]?.image?.url || item.image?.url || vendorImage;

        return (
            <TouchableOpacity 
                key={item.id} 
                style={styles.productCard}
                onPress={() => navigation.navigate('ProductScreen', {
                    vendorId,
                    vendorName,
                    vendorImage,
                    productName: name
                })}
            >
                <Image source={{ uri: imageUrl }} style={styles.productImage} />
                <View style={styles.productInfo}>
                    <Text style={styles.productName} numberOfLines={2}>{name}</Text>
                    <Text style={styles.productPrice}>₹{price}</Text>
                    <Text style={styles.productDesc} numberOfLines={1}>{description}</Text>
                </View>
                <TouchableOpacity style={styles.addIcon}>
                    <Ionicons name="add-circle" size={32} color={COLORS.primary} />
                </TouchableOpacity>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
                scrollEventThrottle={16}
                contentContainerStyle={{ paddingBottom: 100, paddingTop: HEADER_HEIGHT }}
            >
                <View style={styles.contentSheet}>
                    <View style={styles.storeHeader}>
                        <View style={styles.storeRow}>
                            <View>
                                <Text style={styles.storeName}>{vendorName}</Text>
                                <Text style={styles.storeSub}>Official Brand Store</Text>
                            </View>
                            <View style={styles.storeRating}>
                                <Text style={styles.ratingText}>4.5</Text>
                                <Ionicons name="star" size={14} color="#fff" />
                            </View>
                        </View>
                        
                        <View style={styles.searchBar}>
                            <Ionicons name="search" size={20} color="#666" />
                            <TextInput 
                                placeholder={`Search in ${vendorName}`} 
                                style={styles.searchInput}
                                value={searchText}
                                onChangeText={setSearchText}
                                placeholderTextColor="#999"
                            />
                        </View>
                    </View>

                    <View style={styles.productList}>
                        <Text style={styles.sectionTitle}>Our Collection</Text>
                        {vendorLoading ? (
                            <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 20 }} />
                        ) : (
                            <View style={styles.productGrid}>
                                {filteredProducts.map(renderProduct)}
                                {filteredProducts.length === 0 && (
                                    <View style={styles.emptyState}>
                                        <Text style={styles.emptyText}>No products found</Text>
                                    </View>
                                )}
                            </View>
                        )}
                    </View>
                </View>
            </Animated.ScrollView>

            <Animated.View style={[styles.heroContainer, { transform: [{ translateY: headerTranslateY }, { scale: imageScale }] }]}>
                <Image source={{ uri: vendorImage }} style={styles.heroImage} />
                <View style={styles.heroOverlay} />
            </Animated.View>

            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    heroContainer: { position: 'absolute', top: 0, left: 0, right: 0, height: HEADER_HEIGHT, overflow: 'hidden' },
    heroImage: { width: '100%', height: '100%', resizeMode: 'cover' },
    heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.3)' },
    backBtn: { position: 'absolute', top: 50, left: 16, zIndex: 10, width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
    contentSheet: { backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, marginTop: -30, minHeight: 600 },
    storeHeader: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
    storeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    storeName: { fontSize: 24, fontWeight: '800', color: '#333' },
    storeSub: { fontSize: 14, color: '#666' },
    storeRating: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#388e3c', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
    ratingText: { color: '#fff', fontWeight: 'bold', marginRight: 4 },
    searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f5f5', borderRadius: 12, paddingHorizontal: 15, height: 48 },
    searchInput: { flex: 1, marginLeft: 10, fontSize: 15, color: '#333' },
    productList: { padding: 20 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
    productGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    productCard: { width: '48%', backgroundColor: '#fff', borderRadius: 15, marginBottom: 20, borderWidth: 1, borderColor: '#f0f0f0', overflow: 'hidden', elevation: 2, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4 },
    productImage: { width: '100%', height: 180, resizeMode: 'cover' },
    productInfo: { padding: 12 },
    productName: { fontSize: 14, fontWeight: '700', color: '#333', marginBottom: 4 },
    productPrice: { fontSize: 16, fontWeight: '900', color: COLORS.primary, marginBottom: 4 },
    productDesc: { fontSize: 11, color: '#888' },
    addIcon: { position: 'absolute', bottom: 10, right: 10 },
    emptyState: { width: '100%', padding: 40, alignItems: 'center' },
    emptyText: { color: '#999', fontSize: 16 }
});
