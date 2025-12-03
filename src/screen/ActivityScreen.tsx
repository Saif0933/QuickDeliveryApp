// ActivityScreen.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { COLORS } from "../theme/color";

const ActivityScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        
        {/* Cover Image */}
        <ImageBackground
          source={{
            uri: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
          }}
          style={styles.coverImage}
        >
          {/* Top Icons */}
          <View style={styles.topBar}>
            <TouchableOpacity>
              <Ionicons name="arrow-back" size={24} color={COLORS.white} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="share-outline" size={24} color={COLORS.white} />
            </TouchableOpacity>
          </View>

          {/* App name */}
          <Text style={styles.appName}>zomato</Text>

          {/* Edit Icon */}
          <TouchableOpacity style={styles.editIcon}>
            <MaterialIcons name="photo-camera" size={18} color={COLORS.textPrimary} />
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </ImageBackground>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>S</Text>
          </View>

          <Text style={styles.name}>Saif</Text>
          <Text style={styles.followText}>0 followers • 0 following</Text>

          {/* Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Add photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Edit profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <Text style={[styles.tabText, styles.activeTab]}>Reviews</Text>
          <Text style={styles.tabText}>Photos</Text>
        </View>

        {/* Empty Reviews */}
        <View style={styles.emptySection}>
          <Ionicons name="document-text-outline" size={64} color={COLORS.secondary} />
          <Text style={styles.emptyText}>
            You haven’t written any reviews yet.
          </Text>
          <TouchableOpacity>
            <Text style={styles.addReview}>Add Review</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  coverImage: {
    height: 180,
    justifyContent: "flex-end",
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 10,
  },

  appName: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },

  editIcon: {
    position: "absolute",
    right: 10,
    bottom: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },

  editText: {
    fontSize: 12,
    marginLeft: 4,
    color: COLORS.textPrimary,
  },

  profileSection: {
    alignItems: "center",
    marginTop: -40,
    paddingHorizontal: 15,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    fontSize: 28,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },

  name: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 8,
    color: COLORS.textPrimary,
  },

  followText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },

  buttonRow: {
    flexDirection: "row",
    marginTop: 12,
  },

  button: {
    borderWidth: 1,
    borderColor: COLORS.secondary,
    borderRadius: 6,
    paddingHorizontal: 15,
    paddingVertical: 6,
    marginHorizontal: 5,
  },

  buttonText: {
    fontSize: 14,
    color: COLORS.textPrimary,
  },

  tabs: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondary,
    marginTop: 20,
    paddingHorizontal: 15,
  },

  tabText: {
    fontSize: 16,
    marginRight: 20,
    paddingBottom: 8,
    color: COLORS.textSecondary,
  },

  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.textPrimary,
    color: COLORS.textPrimary,
    fontWeight: "600",
  },

  emptySection: {
    alignItems: "center",
    padding: 30,
  },

  emptyText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 12,
    textAlign: "center",
  },

  addReview: {
    color: COLORS.primary,
    fontSize: 14,
    marginTop: 8,
    fontWeight: "500",
  },
});

export default ActivityScreen;
