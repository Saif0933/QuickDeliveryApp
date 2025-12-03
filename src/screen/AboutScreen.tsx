// AboutScreen.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

const AboutScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>About</Text>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.title}>Terms of Service</Text>
          <Ionicons name="chevron-forward" size={22} color="#000" />
        </TouchableOpacity>

        <View style={styles.row}>
          <View>
            <Text style={styles.title}>App version</Text>
            <Text style={styles.subtitle}>v19.1.2 Live</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.row}>
          <Text style={styles.title}>Open Source Libraries</Text>
          <Ionicons name="chevron-forward" size={22} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row}>
          <Text style={styles.title}>Licenses and Registrations</Text>
          <Ionicons name="chevron-forward" size={22} color="#000" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 15,
    color: "#000",
  },
  content: {
    paddingVertical: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
  },
  title: {
    fontSize: 16,
    color: "#000",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
});

export default AboutScreen;