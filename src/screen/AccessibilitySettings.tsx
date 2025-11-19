// AccessibilitySettings.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const AccessibilitySettings = () => {
  // State for selections
  const [hearing, setHearing] = useState("not-deaf");
  const [vision, setVision] = useState("not-blind");
  const [mobility, setMobility] = useState("no-impairment");

  const handleSave = () => {
    Alert.alert(
      "Saved Preferences",
      `Hearing: ${hearing}\nVision: ${vision}\nMobility: ${mobility}`
    );
  };

  const renderRadio = (
    label: string,
    selected: boolean,
    onPress: () => void,
    isLast: boolean = false
  ) => (
    <TouchableOpacity
      style={[styles.option, isLast && { borderBottomWidth: 0 }]}
      onPress={onPress}
    >
      <Text style={styles.optionText}>{label}</Text>
      <Ionicons
        name={selected ? "radio-button-on" : "radio-button-off"}
        size={22}
        color={selected ? "#E53935" : "#888"}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <Ionicons name="arrow-back" size={22} />
          <Text style={styles.headerTitle}>Accessibility Settings</Text>
        </View>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <MaterialCommunityIcons name="information" size={18} color="#E53935" />
          <Text style={styles.infoText}>
            We'll make the app more friendly to use based on your disability.
          </Text>
        </View>

        {/* Hearing */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="ear-outline" size={18} />
            <Text style={styles.sectionTitle}> Hearing</Text>
          </View>
          <Text style={styles.subText}>
            Select level of hearing impairment if any
          </Text>
          {renderRadio("I'm deaf", hearing === "deaf", () => setHearing("deaf"))}
          {renderRadio(
            "I'm hard of hearing",
            hearing === "hard",
            () => setHearing("hard")
          )}
          {renderRadio(
            "I'm not deaf or hard of hearing",
            hearing === "not-deaf",
            () => setHearing("not-deaf"),
            true
          )}
        </View>

        {/* Vision */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="eye-outline" size={18} />
            <Text style={styles.sectionTitle}> Vision</Text>
          </View>
          <Text style={styles.subText}>
            Select level of vision impairment if any
          </Text>
          {renderRadio("I'm blind", vision === "blind", () => setVision("blind"))}
          {renderRadio(
            "I have a visual impairment",
            vision === "impaired",
            () => setVision("impaired")
          )}
          {renderRadio(
            "I'm not blind or visually impaired",
            vision === "not-blind",
            () => setVision("not-blind"),
            true
          )}
        </View>

        {/* Mobility */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="accessibility-outline" size={18} />
            <Text style={styles.sectionTitle}> Mobility</Text>
          </View>
          <Text style={styles.subText}>
            Select level of mobility impairment if any
          </Text>
          {renderRadio(
            "I use a wheelchair or mobility aid",
            mobility === "wheelchair",
            () => setMobility("wheelchair")
          )}
          {renderRadio(
            "I have a physical disability that affects my mobility",
            mobility === "disability",
            () => setMobility("disability")
          )}
          {renderRadio(
            "I do not have a physical or mobility impairment",
            mobility === "no-impairment",
            () => setMobility("no-impairment"),
            true
          )}
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccessibilitySettings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ebebefff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 2,
    marginBottom: 15,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 14,
    flex: 1,
    color: "#333",
  },
  section: {
    backgroundColor: "#fff",
    padding: 15,
    marginHorizontal: 15,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  subText: {
    fontSize: 13,
    color: "#777",
    marginBottom: 10,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
  },
  optionText: {
    fontSize: 15,
    color: "#333",
    flex: 1,
  },
  saveBtn: {
    margin: 20,
    padding: 14,
    borderRadius: 10,
    backgroundColor: "#E53935",
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
