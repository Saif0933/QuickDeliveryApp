
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import RestroCard from "../components/RestroCard";
import { COLORS } from "../theme/color"; // Make sure this path is correct

const { width } = Dimensions.get('window');

const mustTries = [
  { title: "The Great Cafes", image: "https://tse2.mm.bing.net/th/id/OIP.WqZILRKVGFfSdPInRbyJCQHaE7?pid=Api&P=0&h=180" },
  { title: "Luxury Dining Places", image: "https://tse4.mm.bing.net/th/id/OIP.Tm7Cwudv6CWy7TNxjbajtwHaFO?pid=Api&P=0&h=180" },
  { title: "The Bars & Lounges", image: "https://tse3.mm.bing.net/th/id/OIP.yPot9mFzGRJ1a7GF1LY8KgHaI9?pid=Api&P=0&h=180" },
];

const restaurants = [
  {
    name: "Anardana",
    location: "Kanka, Ranchi",
    type: "North Indian • Kebab",
    distance: "3.2 km",
    price: "₹2000 for two",
    rating: "4.5",
    image: "https://tse4.mm.bing.net/th/id/OIP.mVOIAEYF70LEzoPmS9o7XgHaE8?pid=Api&P=0&h=180",
  },
  {
    name: "Biryani By Kilo",
    location: "Ahirtoli, Ranchi",
    type: "Biryani • Hyderabadi",
    distance: "5.7 km",
    price: "₹600 for two",
    rating: "4.3",
    image: "https://tse4.mm.bing.net/th/id/OIP.pfk5JNbSATK_pTPNYbAevQHaEK?pid=Api&P=0&h=180",
  },
];

const animatedBanners = [
  { image: "https://platform.eater.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/25174207/DSC_8016.jpg?quality=90&strip=all&crop=0,24.244383771615,100,51.511232456771&w=2400" },
  { image: "https://imgs.search.brave.com/fhrEiRX2Rmn4OxE88gesLUtVTMloYCUB2mQyNVca8eA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTI4/NjQwODQ4Mi9waG90/by93aW5kb3ctb2Yt/YW4tZW1wdHktcmVz/dGF1cmFudC1mb3Jj/ZWQtdG8tY2xvc2Ut/YW1pZC1jb3ZpZC0x/OS1wYW5kZW1pYy5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/M1BJTHJ6OWx3VXpu/a0NfNi1HaW0tU2Zs/S3duNmcyaDZTbVZz/U3REUXdfYz0" },
  { image: "https://platform.eater.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/25174207/DSC_8016.jpg?quality=90&strip=all&crop=0,24.244383771615,100,51.511232456771&w=2400" },
];

const DiningScreen = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const bannerFadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      Animated.timing(bannerFadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        setCurrentIndex((prev) => (prev + 1) % animatedBanners.length);
        Animated.timing(bannerFadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }).start();
      });
    }, 4000);

    return () => clearInterval(timer);
  }, [bannerFadeAnim]);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <Animated.View
          style={[
            styles.header,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
          ]}
        >
          <View>
            <Text style={styles.subLocation}>Delatoli, Ranchi</Text>
            <Text style={styles.location}>Harmu Housing Colony</Text>
          </View>

          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="heart-outline" size={22} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="person-circle-outline" size={26} color="#333" />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* SEARCH BAR */}
        <Animated.View
          style={[
            styles.searchBarContainer,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
          ]}
        >
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={20} color={COLORS.primary} />
            <TextInput
              placeholder="Restaurant, cuisine or dish"
              placeholderTextColor="#999"
              style={styles.searchInput}
            />
            <TouchableOpacity>
              <Ionicons name="mic-outline" size={18} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* FILTERS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterRow}
          contentContainerStyle={styles.filterContent}
        >
          {[
            { icon: "filter-outline", label: "Filters" },
            { icon: "tag-outline", label: "Offers" },
            { icon: "star-outline", label: "Top Rated" },
            { icon: "clock-outline", label: "Fast" },
          ].map((item, idx) => (
            <TouchableOpacity key={idx} style={styles.filterBtn}>
              <Ionicons name={item.icon} size={16} color="#444" />
              <Text style={styles.filterText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* BANNER */}
        <View style={styles.bannerSection}>
          <Text style={styles.sectionTitle}>Special Offers</Text>

          <View style={styles.animatedBannerContainer}>
            <View style={styles.bannerImageWrapper}>
              <Animated.Image
                source={{ uri: animatedBanners[currentIndex].image }}
                style={[styles.animatedBannerImage, { opacity: bannerFadeAnim }]}
                resizeMode="cover"
              />
              <View style={styles.bannerOverlay} />
            </View>
          </View>

          <View style={styles.bannerDots}>
            {animatedBanners.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  index === currentIndex
                    ? { backgroundColor: COLORS.primary, transform: [{ scale: 1.3 }] }
                    : { backgroundColor: "#CFCFCF" }
                ]}
              />
            ))}
          </View>
        </View>

        {/* MUST TRIES */}
        <Text style={styles.sectionTitle}>Must-Tries in Ranchi</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.mustTryContainer}
        >
          {mustTries.map((item, index) => (
            <TouchableOpacity key={index} style={styles.mustTryCard}>
              <Image source={{ uri: item.image }} style={styles.mustTryImage} />
              <View style={styles.mustTryBadge}>
                <Text style={styles.mustTryText}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* RESTAURANTS */}
        <Text style={styles.sectionTitle}>Popular Restaurants Around You</Text>

        {restaurants.map((item, index) => (
          <TouchableOpacity key={index} style={styles.restaurantCard}>
            <Image source={{ uri: item.image }} style={styles.restaurantImage} />

            <View style={styles.restaurantInfo}>
              <View style={styles.restaurantHeader}>
                <Text style={styles.restaurantName}>{item.name}</Text>
                <View style={styles.ratingBox}>
                  <Ionicons name="star" size={14} color="#fff" />
                  <Text style={styles.rating}>{item.rating}</Text>
                </View>
              </View>

              <Text style={styles.restaurantDetails}>{item.location}</Text>
              <Text style={styles.restaurantType}>{item.type}</Text>

              <View style={styles.restaurantFooter}>
                <Text style={styles.restaurantPrice}>{item.price}</Text>
                <Text style={styles.restaurantDistance}>{item.distance}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <RestroCard />

        <View style={{ height: 80 }} />
      </ScrollView>

      {/* BOTTOM NAV */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons name="moped" size={26} color="#A0A0A0" />
          <Text style={styles.navText}>Delivery</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons name="silverware-fork-knife" size={26} color={COLORS.primary} />
          <Text style={styles.navTextActive}>Dining</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons name="wallet-membership" size={26} color="#A0A0A0" />
          <Text style={styles.navText}>Money</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DiningScreen;


/* --------------------------
     MODERN MINIMAL STYLES
---------------------------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F8FA" },

  scrollContainer: { flex: 1 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  subLocation: { fontSize: 12, color: "#8B8B8B", fontWeight: "500" },
  location: { fontSize: 16, fontWeight: "700", color: "#222" },
  headerIcons: { flexDirection: "row", gap: 12 },
  iconButton: {
    padding: 6,
    borderRadius: 50,
    backgroundColor: "#F1F1F1",
  },

  searchBarContainer: { paddingHorizontal: 18, marginTop: 12 },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 46,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  searchInput: { marginLeft: 10, fontSize: 14, flex: 1, color: "#333" },

  filterRow: { marginTop: 14, paddingLeft: 18 },
  filterContent: { gap: 12 },
  filterBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#E6E6E6",
  },
  filterText: { marginLeft: 6, fontSize: 13, color: "#444", fontWeight: "600" },

  bannerSection: { marginTop: 22 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    color: "#222",
    paddingHorizontal: 18,
  },
  animatedBannerContainer: { height: 190 },
  bannerImageWrapper: {
    width: width - 36,
    height: 190,
    marginHorizontal: 18,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#ddd",
  },
  animatedBannerImage: { width: "100%", height: "100%" },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  bannerDots: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    gap: 6,
  },
  dot: { width: 8, height: 8, borderRadius: 4 },

  mustTryContainer: { paddingLeft: 18, marginTop: 10 },
  mustTryCard: {
    borderRadius: 12,
    overflow: "hidden",
    marginRight: 14,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  mustTryImage: { width: 160, height: 110 },
  mustTryBadge: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingVertical: 6,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  mustTryText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
    textAlign: "center",
  },

  restaurantCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 16,
    marginHorizontal: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  restaurantImage: { width: 110, height: "100%" },
  restaurantInfo: { flex: 1, padding: 14 },
  restaurantHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  restaurantName: { fontSize: 16, fontWeight: "700", color: "#222", flex: 1 },
  ratingBox: {
    backgroundColor: "#4CAF50",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  rating: { color: "#fff", marginLeft: 3, fontSize: 12, fontWeight: "600" },
  restaurantDetails: { fontSize: 12, color: "#999", marginBottom: 2 },
  restaurantType: { fontSize: 12, color: "#777", marginBottom: 6 },
  restaurantFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  restaurantPrice: { fontSize: 13, fontWeight: "700", color: "#222" },
  restaurantDistance: { fontSize: 12, color: "#777" },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: "#E6E6E6",
    elevation: 12,
  },
  navItem: { alignItems: "center" },
  navText: {
    fontSize: 10,
    color: "#A0A0A0",
    marginTop: 4,
    fontWeight: "600",
  },
  navTextActive: {
    fontSize: 10,
    color: COLORS.primary,
    marginTop: 4,
    fontWeight: "800",
  },
});
