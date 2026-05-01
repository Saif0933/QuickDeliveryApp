import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

// --- STATIC NIKE DATA ---
const nikeProducts = [
  {
    id: 'n1',
    name: "Nike Sportswear Tech Fleece",
    category: "Men's Full-Zip Hoodie",
    price: "₹8,495",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
    description: "Lightweight warmth with a clean look. The Nike Sportswear Tech Fleece Hoodie is a closet essential."
  },
  {
    id: 'n2',
    name: "Nike Air Max 270",
    category: "Running Shoes",
    price: "₹12,995",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    description: "Nike's first lifestyle Air Max brings you style, comfort and big attitude."
  },
  {
    id: 'n3',
    name: "Nike Dri-FIT Academy",
    category: "Men's Knit Football Drill Top",
    price: "₹2,495",
    image: "https://images.unsplash.com/photo-1511746015097-c770dd9b28c5?w=800&q=80",
    description: "Stay cool and focused during training with moisture-wicking technology."
  },
  {
    id: 'n4',
    name: "Nike Club Fleece",
    category: "Graphic Crew Sweatshirt",
    price: "₹3,495",
    image: "https://images.unsplash.com/photo-1556821840-062402124503?w=800&q=80",
    description: "Classic Nike branding on our softest fleece for ultimate daily comfort."
  },
  {
    id: 'n5',
    name: "Nike Pro Combat",
    category: "Training Shorts",
    price: "₹1,995",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80",
    description: "Built for peak performance and compression support during intense workouts."
  },
  {
    id: 'n6',
    name: "Nike Air Force 1 '07",
    category: "Lifestyle Sneakers",
    price: "₹9,695",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80",
    description: "The radiance lives on in the Nike Air Force 1 '07, the b-ball icon."
  }
];

const nikeCategories = ["All", "Shoes", "Apparel", "Accessories", "New"];

export default function ProductBrand({ route }: { route: any }) {
    const { 
        vendorName = "NIKE", 
        vendorImage = "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1000&q=80",
        vendorLogo = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/1200px-Logo_NIKE.svg.png"
    } = (route?.params || {}) as any;

    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const insets = useSafeAreaInsets();
    const scrollY = useRef(new Animated.Value(0)).current;
    const [selectedCat, setSelectedCat] = useState("All");

    const [activeBanner, setActiveBanner] = useState(0);
    const bannerScrollX = useRef(new Animated.Value(0)).current;
    const bannerRef = useRef<ScrollView>(null);

    const banners = [
        { id: 1, image: vendorImage, title: "NIKE AIR", sub: "Elevate your style" },
        { id: 2, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80", title: "RUN FAST", sub: "New arrival collection" },
        { id: 3, image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1000&q=80", title: "COURT READY", sub: "Elite performance" },
    ];

    // Auto-play for banner
    React.useEffect(() => {
        const interval = setInterval(() => {
            let nextIndex = (activeBanner + 1) % banners.length;
            bannerRef.current?.scrollTo({ x: nextIndex * width, animated: true });
            setActiveBanner(nextIndex);
        }, 4000);
        return () => clearInterval(interval);
    }, [activeBanner]);

    // Header Animations
    const headerTitleOpacity = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [1, 0],
        extrapolate: 'clamp'
    });

    const miniHeaderOpacity = scrollY.interpolate({
        inputRange: [150, 200],
        outputRange: [0, 1],
        extrapolate: 'clamp'
    });

    const heroScale = scrollY.interpolate({
        inputRange: [-100, 0],
        outputRange: [1.2, 1],
        extrapolate: 'clamp'
    });

    const renderProduct = (product: any, index: number) => {
        const isNew = index === 0 || index === 3;
        return (
            <TouchableOpacity 
                key={product.id}
                style={[styles.productCard]}
                onPress={() => navigation.navigate('ProductScreen', {
                    vendorId: 'nike_store',
                    vendorName: vendorName,
                    productName: product.name,
                    vendorImage: product.image,
                    description: product.description
                })}
            >
                <View style={styles.imageContainer}>
                    <Image source={{ uri: product.image }} style={styles.productImage} />
                    {isNew && (
                        <View style={styles.newBadge}>
                            <Text style={styles.newBadgeText}>NEW</Text>
                        </View>
                    )}
                    <TouchableOpacity style={styles.favBtn}>
                        <Ionicons name="heart-outline" size={16} color="#000" />
                    </TouchableOpacity>
                </View>
                <View style={styles.productInfo}>
                    <Text style={styles.productCategory}>{product.category}</Text>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productPrice}>{product.price}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
            
            {/* --- PREMIUM FIXED TOP HEADER --- */}
            <View style={[styles.topFixedHeader, { paddingTop: insets.top }]}>
                <View style={styles.headerContent}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIconBtn}>
                        <Ionicons name="chevron-back" size={24} color="#000" />
                    </TouchableOpacity>
                    
                    <View style={styles.headerTitleContainer}>
                         <Text style={styles.headerBrandTitle}>{vendorName.toUpperCase()}</Text>
                    </View>

                    <View style={styles.headerActionsGroup}>
                        <TouchableOpacity style={styles.headerIconBtn}>
                            <Ionicons name="search-outline" size={22} color="#000" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.headerIconBtn}>
                            <Ionicons name="bag-outline" size={22} color="#000" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <Animated.ScrollView 
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
                scrollEventThrottle={16}
                contentContainerStyle={{ paddingTop: insets.top + 60 }}
            >
                {/* --- BRAND IDENTITY SECTION --- */}
                <View style={styles.brandIdSection}>
                    <View style={styles.logoCircle}>
                        <Image source={{ uri: vendorLogo }} style={styles.brandLogoImg} resizeMode="contain" />
                    </View>
                    <View style={styles.brandInfoWrap}>
                        <Text style={styles.brandNameTitle}>{vendorName}</Text>
                        <Text style={styles.brandMeta}>Official Store • 4.9 ★ (2.4k reviews)</Text>
                    </View>
                    <TouchableOpacity style={styles.followBtn}>
                        <Text style={styles.followBtnText}>Follow</Text>
                    </TouchableOpacity>
                </View>

                {/* --- ANIMATED SLIDING BANNER --- */}
                <View style={styles.bannerWrapper}>
                    <ScrollView
                        ref={bannerRef}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { x: bannerScrollX } } }],
                            { useNativeDriver: false }
                        )}
                        onMomentumScrollEnd={(e) => setActiveBanner(Math.round(e.nativeEvent.contentOffset.x / width))}
                        scrollEventThrottle={16}
                    >
                        {banners.map((item, idx) => (
                            <View key={item.id} style={{ width: width, height: 260 }}>
                                <Image source={{ uri: item.image }} style={styles.bannerImg} />
                                <View style={styles.bannerOverlay}>
                                    <View style={styles.bannerTextContent}>
                                        <Text style={styles.bannerMainTitle}>{item.title}</Text>
                                        <Text style={styles.bannerSubTitle}>{item.sub}</Text>
                                        <TouchableOpacity style={styles.bannerShopBtn}>
                                            <Text style={styles.bannerShopText}>Explore Details</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                    
                    {/* DOT INDICATORS */}
                    <View style={styles.paginationDots}>
                        {banners.map((_, i) => (
                            <View 
                                key={i} 
                                style={[styles.pDot, activeBanner === i && styles.pDotActive]} 
                            />
                        ))}
                    </View>
                </View>

                {/* --- PRODUCT GRID --- */}
                <View style={styles.gridContainer}>
                    <Text style={styles.gridTitle}>Essentials Collection</Text>
                    <View style={styles.modernGrid}>
                        {nikeProducts.map((p, i) => renderProduct(p, i))}
                    </View>
                </View>
                
                <View style={{ height: 50 }} />
            </Animated.ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    topFixedHeader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        zIndex: 1000,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
        height: 60,
    },
    headerIconBtn: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitleContainer: {
        flex: 1,
        alignItems: 'center',
    },
    headerBrandTitle: {
        fontSize: 16,
        fontWeight: '900',
        color: '#000',
        letterSpacing: 2,
    },
    headerActionsGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    brandIdSection: { flexDirection: 'row', alignItems: 'center', padding: 20, backgroundColor: '#fcfcfc' },
    
    bannerWrapper: {
        width: width,
        height: 260,
        backgroundColor: '#fff',
    },
    bannerImg: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    bannerOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'center',
        paddingLeft: 30,
    },
    bannerTextContent: {
        maxWidth: '70%',
    },
    bannerMainTitle: {
        fontSize: 32,
        fontWeight: '900',
        color: '#fff',
        letterSpacing: -1,
    },
    bannerSubTitle: {
        fontSize: 14,
        color: '#fff',
        marginTop: 5,
        opacity: 0.9,
        fontWeight: '600',
    },
    bannerShopBtn: {
        marginTop: 15,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        alignSelf: 'flex-start',
    },
    bannerShopText: {
        fontSize: 13,
        fontWeight: '800',
        color: '#000',
    },
    paginationDots: {
        position: 'absolute',
        bottom: 20,
        right: 30,
        flexDirection: 'row',
    },
    pDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: 'rgba(255,255,255,0.4)',
        marginHorizontal: 3,
    },
    pDotActive: {
        backgroundColor: '#fff',
        width: 15,
    },

    logoCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#f0f0f0', elevation: 2 },
    brandLogoImg: { width: '80%', height: '80%', resizeMode: 'contain' },
    brandInfoWrap: { flex: 1, marginLeft: 15 },
    brandNameTitle: { fontSize: 20, fontWeight: '800', color: '#000' },
    brandMeta: { fontSize: 12, color: '#888', marginTop: 2 },
    followBtn: { backgroundColor: '#000', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20 },
    followBtnText: { color: '#fff', fontSize: 13, fontWeight: '700' },

    catContainer: { 
        paddingVertical: 20, 
        borderBottomWidth: 1, 
        borderBottomColor: '#f0f0f0',
        backgroundColor: '#fff'
    },
    catTab: { paddingHorizontal: 20, alignItems: 'center' },
    catText: { fontSize: 15, fontWeight: '600', color: '#888' },
    catTextActive: { color: '#000' },
    catUnderline: { width: 14, height: 3, backgroundColor: '#000', marginTop: 8, borderRadius: 2 },

    gridContainer: { padding: 20 },
    gridTitle: { fontSize: 18, fontWeight: '800', color: '#111', marginBottom: 20 },
    modernGrid: { 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'space-between' 
    },
    productCard: { 
        width: '48%', 
        marginBottom: 25 
    },
    imageContainer: { 
        width: '100%', 
        height: 220, 
        backgroundColor: '#F5F5F5', 
        borderRadius: 4, 
        overflow: 'hidden' 
    },
    productImage: { width: '100%', height: '100%', resizeMode: 'cover' },
    newBadge: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: '#000',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 2
    },
    newBadgeText: { color: '#fff', fontSize: 10, fontWeight: '900' },
    favBtn: { position: 'absolute', top: 10, right: 10 },
    productInfo: { marginTop: 12 },
    productCategory: { fontSize: 12, color: '#888', fontWeight: '500' },
    productName: { fontSize: 14, fontWeight: '600', color: '#000', marginTop: 4 },
    productPrice: { fontSize: 14, fontWeight: '800', color: '#000', marginTop: 8 },
});
