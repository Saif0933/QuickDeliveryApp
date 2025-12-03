import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../theme/color";

type RootStackParamList = {
  AccountSettings: undefined;
  ChangeEmail: undefined;
  DeleteAccount: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const AccountSettingsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  // Function handlers
  const handleChangeEmail = () => {
    Alert.alert("Change Email", "Navigate to Change Email screen");
    // navigation.navigate("ChangeEmail");
  };

  const handleDeleteAccount = () => {
    Alert.alert("Delete Account", "Are you sure you want to delete?");
    // navigation.navigate("DeleteAccount");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>   {/* ← Wrapped with SafeAreaView */}
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Account settings</Text>
        </View>

        {/* Options */}
        <ScrollView>
          <TouchableOpacity style={styles.option} onPress={handleChangeEmail}>
            <Text style={styles.optionText}>Change email</Text>
            <Icon name="chevron-right" size={24} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} onPress={handleDeleteAccount}>
            <Text style={styles.optionText}>Delete account</Text>
            <Icon name="chevron-right" size={24} color="#000" />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    backgroundColor: COLORS.white,
    // elevation: 4,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 3,
  },
  headerTitle: { fontSize: 18, fontWeight: "bold", marginLeft: 10 },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: { fontSize: 16, color: "#000" },
});

export default AccountSettingsScreen;