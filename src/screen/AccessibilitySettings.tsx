// AccessibilitySettings.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  StatusBar,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS } from "../theme/color";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  navigation?: any; // For back navigation
};

const AccessibilitySettings: React.FC<Props> = ({ navigation }) => {
  // State for selections
  const [hearing, setHearing] = useState("not-deaf");
  const [vision, setVision] = useState("not-blind");
  const [mobility, setMobility] = useState("no-impairment");

  const handleSave = () => {
    Alert.alert(
      "Preferences Saved! 🌟",
      `Hearing: ${hearing}\nVision: ${vision}\nMobility: ${mobility}\n\nWe'll adjust the app to better suit your needs. Thank you!`,
      [{ text: "Done", style: "default" }]
    );
  };

  const handleBack = () => {
    navigation?.goBack();
  };

  const renderRadio = (
    label: string,
    selected: boolean,
    onPress: () => void,
    isLast: boolean = false
  ) => (
    <TouchableOpacity
      style={[
        styles.option,
        selected && styles.optionSelected,
        isLast && { borderBottomWidth: 0 },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.optionLeft}>
        <Text style={[styles.optionText, selected && styles.optionTextSelected]}>
          {label}
        </Text>
      </View>
      <View style={styles.radioContainer}>
        <MaterialCommunityIcons
          name={selected ? "radiobox-marked" : "radiobox-blank"}
          size={24}
          color={selected ? COLORS.primary : COLORS.muted}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Accessibility</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <MaterialCommunityIcons
            name="accessibility-outline"
            size={24}
            color={COLORS.primary}
          />
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Make It Yours</Text>
            <Text style={styles.infoText}>
              Share your needs so we can tailor the app for a smoother experience.
              Your info is private and helps us improve.
            </Text>
          </View>
        </View>

        {/* Hearing Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="ear-hearing-outline" size={20} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>Hearing</Text>
          </View>
          <Text style={styles.subText}>
            Select your hearing needs (if any)
          </Text>
          {renderRadio("I'm deaf", hearing === "deaf", () => setHearing("deaf"))}
          {renderRadio(
            "I'm hard of hearing",
            hearing === "hard",
            () => setHearing("hard")
          )}
          {renderRadio(
            "No hearing impairment",
            hearing === "not-deaf",
            () => setHearing("not-deaf"),
            true
          )}
        </View>

        {/* Vision Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="eye-outline" size={20} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>Vision</Text>
          </View>
          <Text style={styles.subText}>
            Select your vision needs (if any)
          </Text>
          {renderRadio("I'm blind", vision === "blind", () => setVision("blind"))}
          {renderRadio(
            "I have a visual impairment",
            vision === "impaired",
            () => setVision("impaired")
          )}
          {renderRadio(
            "No vision impairment",
            vision === "not-blind",
            () => setVision("not-blind"),
            true
          )}
        </View>

        {/* Mobility Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="accessibility-outline" size={20} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>Mobility</Text>
          </View>
          <Text style={styles.subText}>
            Select your mobility needs (if any)
          </Text>
          {renderRadio(
            "I use a wheelchair or mobility aid",
            mobility === "wheelchair",
            () => setMobility("wheelchair")
          )}
          {renderRadio(
            "I have a physical disability affecting mobility",
            mobility === "disability",
            () => setMobility("disability")
          )}
          {renderRadio(
            "No mobility impairment",
            mobility === "no-impairment",
            () => setMobility("no-impairment"),
            true
          )}
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.8}>
          <Text style={styles.saveText}>Save Preferences</Text>
        </TouchableOpacity>
        <View style={{height: 20}} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccessibilitySettings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: COLORS.white,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.textPrimary,
    flex: 1,
    marginLeft: 12,
  },
  headerSpacer: {
    width: 24,
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: COLORS.white,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 24,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  section: {
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    overflow: "hidden",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingBottom: 8,
    backgroundColor: COLORS.white,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginLeft: 8,
  },
  subText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginHorizontal: 16,
    marginBottom: 12,
    lineHeight: 18,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
  },
  optionSelected: {
    backgroundColor: COLORS.secondary,
  },
  optionLeft: {
    flex: 1,
  },
  optionText: {
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  optionTextSelected: {
    color: COLORS.primary,
    fontWeight: "600",
  },
  radioContainer: {
    paddingLeft: 8,
  },
  saveBtn: {
    backgroundColor: COLORS.primary,
    marginHorizontal: 16,
    marginBottom: 32,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  saveText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "600",
  },
});