// SettingsScreen.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { COLORS } from "../theme/color";

type RootStackParamList = {
  YourProfile: undefined;
  SettingsScreen: undefined;
  NotificationScreen: undefined;
  AccountSettingsScreen: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SettingsScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  // Functions for each option
  const handleNotifications = () => {
    Alert.alert("Notification Settings", "Navigate to notification settings.");
  };

  const handleAccountSettings = () => {
    Alert.alert("Account Settings", "Navigate to account settings.");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Settings</Text>
      </View>

      {/* Settings Options */}
      <ScrollView>
        <TouchableOpacity
          style={styles.row}
          onPress={() => navigation.navigate("YourProfile")}
        >
          <View>
            <Text style={styles.title}>Edit profile</Text>
            <Text style={styles.subtitle}>
              Change your name, description and profile photo
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={() => navigation.navigate("NotificationScreen")}>
          <View>
            <Text style={styles.title}>Notification settings</Text>
            <Text style={styles.subtitle}>
              Define what alerts and notifications you want to see
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={() => navigation.navigate("AccountSettingsScreen")}>
          <View>
            <Text style={styles.title}>Account settings</Text>
            <Text style={styles.subtitle}>Delete your account.</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 15,
    color: COLORS.black,
  },
  row: {
    paddingVertical: 18,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
  },
  title: {
    fontSize: 16,
    color: COLORS.black,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.muted,
    marginTop: 4,
  },
});

export default SettingsScreen;
