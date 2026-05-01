

import React from "react";
import {
  Alert,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS } from "../../theme/color";

export default function RestaurantInfoScreen({
  navigation,
}: {
  navigation: any;
}) {
  // 🔖 BOOKMARK STATE
  const [isBookmarked, setIsBookmarked] = React.useState(false);

  // 📞 CALL
  const handleCall = () => {
    Linking.openURL("tel:1234567890");
  };

  // 📍 DIRECTIONS
  const handleDirections = () => {
    const scheme = Platform.select({
      ios: "maps:0,0?q=",
      android: "geo:0,0?q=",
    });

    if (!scheme) return;

    const latLng = "23.3441,85.3096";
    const label = "The Pizza Project";

    const url =
      Platform.OS === "ios"
        ? `${scheme}${label}@${latLng}`
        : `${scheme}${latLng}(${label})`;

    Linking.openURL(url);
  };

  // 📤 SHARE
  const handleShare = async () => {
    try {
      await Share.share({
        message: "Check out H&M Official Store on the app!",
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
  };

  // 🔖 HANDLE BOOKMARK CLICK
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* --- HEADER --- */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation?.goBack()}
          style={styles.iconBtn}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>

        <View style={styles.headerRight}>
          {/* BOOKMARK BUTTON MODIFIED HERE */}
          <TouchableOpacity 
            style={[styles.iconBtn, { marginRight: 8 }]} 
            onPress={handleBookmark}
          >
            <Feather 
              name="bookmark" 
              size={24} 
              color={isBookmarked ? COLORS.primary : COLORS.textPrimary} 
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleShare} style={styles.iconBtn}>
            <Feather name="share-2" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* --- SCROLL CONTENT --- */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* --- MAIN INFO CARD --- */}
        <View style={styles.card}>
          <View style={styles.cardPadding}>
            <Text style={styles.title}>H&M Official Store</Text>
            <Text style={styles.subtitle}>Apparel • Premium</Text>
            <Text style={styles.address}>
              L/2, 1st Floor, Housing Colony, Harmu,{"\n"}Ranchi
            </Text>

            {/* Call & Directions Buttons */}
            {/* <View style={styles.actionRow}>
              <TouchableOpacity style={styles.circleBtn} onPress={handleCall}>
                <Feather name="phone" size={20} color={COLORS.primary} />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.circleBtn, { marginLeft: 16 }]}
                onPress={handleDirections}
              >
                <Feather
                  name="corner-up-right"
                  size={20}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
            </View> */}
          </View>

          <View style={styles.dashedDivider} />

          {/* INFO ROW 1 */}
          <TouchableOpacity style={styles.infoRow}>
            <View style={styles.infoIconCol}>
              <Feather name="clock" size={18} color={COLORS.highlight} />
            </View>

            <View style={styles.infoContentCol}>
              <Text style={[styles.infoTitle, { color: COLORS.highlight }]}>
                Open now{" "}
                <Text style={{ color: COLORS.textPrimary }}>
                  • Closes 11:59 pm
                </Text>
              </Text>
            </View>

            <Feather
              name="chevron-down"
              size={20}
              color={COLORS.textPrimary}
            />
          </TouchableOpacity>

          <View style={styles.dottedDivider} />

          {/* INFO ROW 2 */}
          <TouchableOpacity style={styles.infoRow}>
            <View style={styles.infoIconCol}>
              <MaterialCommunityIcons
                name="moped-outline"
                size={20}
                color={COLORS.textSecondary}
              />
            </View>

            <View style={styles.infoContentCol}>
              <Text style={styles.infoTitle}>
                This is an online-only store
              </Text>
              <Text style={styles.infoSub}>
                This store provides exclusive online products
              </Text>
            </View>

            <Feather
              name="chevron-right"
              size={20}
              color={COLORS.textSecondary}
            />
          </TouchableOpacity>

          <View style={styles.dottedDivider} />

          {/* INFO ROW 3 */}
          {/* <View style={styles.infoRow}> */}
            {/* <View style={styles.infoIconCol}>
              <MaterialCommunityIcons
                name="bottle-soda-classic-outline"
                size={20}
                color={COLORS.textSecondary}
              />
            </View> */}

            {/* <View style={styles.infoContentCol}>
              <Text style={styles.infoTitle}>
                Building a plastic-free future
              </Text>
              <Text style={styles.infoSub}>
                This restaurant is part of Zomato's Plastic-Free Future Program
              </Text>
              <TouchableOpacity>
                <Text style={styles.linkText}>Know more</Text>
              </TouchableOpacity>
            </View> */}
          {/* </View> */}

          {/* <View style={styles.dottedDivider} /> */}

          {/* INFO ROW 4 */}
          <View style={styles.infoRow}>
            <View style={styles.infoIconCol}>
              <Feather name="smartphone" size={20} color={COLORS.textSecondary} />
            </View>

            <View style={styles.infoContentCol}>
              <Text style={styles.infoTitle}>Live on App since 2025</Text>
            </View>

            <View style={styles.badgeNew}>
              <Text style={styles.badgeText}>New</Text>
              <Ionicons
                name="star"
                size={10}
                color={COLORS.white}
                style={{ marginLeft: 2 }}
              />
            </View>
          </View>
        </View>

        {/* --- REPORT CARD --- */}
        <View style={styles.card}>
          <View style={styles.infoRow}>
            <Text style={styles.sectionHeader}>
              Had a bad experience here?
            </Text>
          </View>

          <TouchableOpacity style={styles.infoRow}>
            <View style={styles.infoIconCol}>
              <MaterialCommunityIcons
                name="eye-off-outline"
                size={20}
                color={COLORS.textSecondary}
              />
            </View>

            <View style={styles.infoContentCol}>
              <Text style={styles.infoTitle}>Hide this store</Text>
            </View>

            <Feather
              name="chevron-right"
              size={20}
              color={COLORS.textSecondary}
            />
          </TouchableOpacity>
        </View>

        {/* --- LEGAL --- */}
        <View style={styles.legalContainer}>
          <Text style={styles.legalLabel}>Legal Name</Text>
          <Text style={styles.legalValue}>Rebel Foods Private Limited</Text>

          <Text style={styles.legalLabel}>GST Number</Text>
          <Text style={styles.legalValue}>20XXXXXXXXXX1ZI</Text>

          <Text style={styles.legalLabel}>Registration No</Text>
          <Text style={styles.legalValue}>REG-2025-001</Text>

          <Text style={styles.legalText}>
            Please review the terms of service for DeliveryApp{" "}
            <Text style={{ color: COLORS.primary }}>here</Text>
          </Text>
        </View>
      </ScrollView>

      {/* --- FOOTER --- */}
      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={styles.footerBtn}
          onPress={() => navigation?.goBack()}
        >
          <Text style={styles.footerBtnText}>Go back to catalog</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/* --------------------- STYLES (ONLY COLORS UPDATED) --------------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    marginTop: 25,
  },

  headerRight: {
    flexDirection: "row",
  },

  iconBtn: {
    padding: 4,
  },

  scrollContent: {
    paddingBottom: 100,
  },

  card: {
    backgroundColor: COLORS.white,
    marginHorizontal: 12,
    marginTop: 12,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    overflow: "hidden",
  },

  cardPadding: {
    padding: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.textPrimary,
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 12,
  },

  address: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },

  actionRow: {
    flexDirection: "row",
    marginTop: 4,
  },

  circleBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.accent,
  },

  dashedDivider: {
    height: 1,
    borderTopWidth: 1,
    borderColor: COLORS.muted,
    borderStyle: "dashed",
    width: "100%",
  },

  dottedDivider: {
    height: 1,
    borderTopWidth: 1,
    borderColor: COLORS.muted,
    borderStyle: "dotted",
    marginLeft: 50,
    marginRight: 16,
  },

  infoRow: {
    flexDirection: "row",
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: "flex-start",
  },

  infoIconCol: {
    width: 34,
    paddingTop: 2,
  },

  infoContentCol: {
    flex: 1,
    paddingRight: 8,
  },

  infoTitle: {
    fontSize: 14,
    color: COLORS.textPrimary,
    fontWeight: "500",
    lineHeight: 20,
  },

  infoSub: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
    lineHeight: 16,
  },

  linkText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: "500",
    marginTop: 4,
  },

  badgeNew: {
    backgroundColor: COLORS.highlight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },

  badgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: "bold",
  },

  sectionHeader: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },

  legalContainer: {
    padding: 24,
    paddingBottom: 40,
  },

  legalLabel: {
    fontSize: 13,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },

  legalValue: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: "500",
    marginBottom: 16,
  },

  legalText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginTop: 8,
  },

  footerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    padding: 14,
    borderTopWidth: 1,
    borderTopColor: COLORS.muted,
    elevation: 10,
  },

  footerBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  footerBtnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
  },
});