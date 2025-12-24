
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { COLORS } from "../theme/color";
import { SafeAreaView } from "react-native-safe-area-context";

type RootStackParamList = {
  NotificationPreferences: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const NotificationScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  // States for switches
  const [enableAll, setEnableAll] = useState(false);

  const [promoPush, setPromoPush] = useState(false);
  // const [promoWhatsApp, setPromoWhatsApp] = useState(false);

  const [socialPush, setSocialPush] = useState(false);

  const [orderPush, setOrderPush] = useState(false);
  // const [orderWhatsApp, setOrderWhatsApp] = useState(false);

  // Handle Enable All toggle
  const toggleEnableAll = (value: boolean) => {
    setEnableAll(value);
    setPromoPush(value);
    // setPromoWhatsApp(value);
    setSocialPush(value);
    setOrderPush(value);
    // setOrderWhatsApp(value);
  };

  // Handle Save Changes
  const handleSave = () => {
    console.log("Saved preferences:", {
      promoPush,
      // promoWhatsApp,
      socialPush,
      orderPush,
      // orderWhatsApp,
    });
    Alert.alert("Notification preferences saved!");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>   {/* ← Wrapped with SafeAreaView */}
      <View style={{ flex: 1, backgroundColor: COLORS.white }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notification Preferences</Text>
        </View>

        <ScrollView style={{ flex: 1 }}>
          {/* Enable All */}
          <View style={styles.section}>
            <View style={styles.rowBetween}>
              <View>
                <Text style={styles.title}>Enable all</Text>
                <Text style={styles.subText}>Activate all notifications</Text>
              </View>
              <Switch
                value={enableAll}
                onValueChange={toggleEnableAll}
                trackColor={{ false: COLORS.muted, true: COLORS.primary }}
                thumbColor={COLORS.white}
              />
            </View>
          </View>

          {/* Promos and Offers */}
          <View style={styles.section}>
            <Text style={styles.title}>Promos and offers</Text>
            <Text style={styles.subText}>
              Receive updates about coupons, promotions and money-saving offers
            </Text>

            <View style={styles.rowBetween}>
              <View style={styles.rowLeft}>
                <FontAwesome name="bell-o" size={18} color={COLORS.textSecondary} />
                <Text style={styles.optionText}>Push</Text>
              </View>
              <Switch
                value={promoPush}
                onValueChange={setPromoPush}
                trackColor={{ false: COLORS.muted, true: COLORS.primary }}
                thumbColor={COLORS.white}
              />
            </View>

            {/* <View style={styles.rowBetween}>
              <View style={styles.rowLeft}>
                <FontAwesome5 name="whatsapp" size={18} color={COLORS.primary} />
                <Text style={styles.optionText}>WhatsApp</Text>
              </View>
              <Switch
                value={promoWhatsApp}
                onValueChange={setPromoWhatsApp}
                trackColor={{ false: COLORS.muted, true: COLORS.primary }}
                thumbColor={COLORS.white}
              />
            </View> */}
          </View>

          {/* Social Notifications */}
          <View style={styles.section}>
            <Text style={styles.title}>Social notifications</Text>
            <Text style={styles.subText}>
              Get notified when someone follows your profile, or when you get likes
              and comments on reviews and photos posted by you
            </Text>

            <View style={styles.rowBetween}>
              <View style={styles.rowLeft}>
                <FontAwesome name="bell-o" size={18} color={COLORS.textSecondary} />
                <Text style={styles.optionText}>Push</Text>
              </View>
              <Switch
                value={socialPush}
                onValueChange={setSocialPush}
                trackColor={{ false: COLORS.muted, true: COLORS.primary }}
                thumbColor={COLORS.white}
              />
            </View>
          </View>

          {/* Orders and Purchases */}
          <View style={styles.section}>
            <Text style={styles.title}>Orders and purchases</Text>
            <Text style={styles.subText}>
              Receive updates related to your order status, memberships, table
              bookings and more
            </Text>

            <View style={styles.rowBetween}>
              <View style={styles.rowLeft}>
                <FontAwesome name="bell-o" size={18} color={COLORS.textSecondary} />
                <Text style={styles.optionText}>Push</Text>
              </View>
              <Switch
                value={orderPush}
                onValueChange={setOrderPush}
                trackColor={{ false: COLORS.muted, true: COLORS.primary }}
                thumbColor={COLORS.white}
              />
            </View>

            {/* <View style={styles.rowBetween}>
              <View style={styles.rowLeft}>
                <FontAwesome5 name="whatsapp" size={18} color={COLORS.primary} />
                <Text style={styles.optionText}>WhatsApp</Text>
              </View>
              <Switch
                value={orderWhatsApp}
                onValueChange={setOrderWhatsApp}
                trackColor={{ false: COLORS.muted, true: COLORS.primary }}
                thumbColor={COLORS.white}
              />
            </View> */}
          </View>
        </ScrollView>

        {/* Save Changes Button */}
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveText}>Save Changes</Text>
        </TouchableOpacity>
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
  headerTitle: { fontSize: 18, fontWeight: "bold", marginLeft: 10, color: COLORS.textPrimary },
  section: {
    padding: 16,
    borderBottomWidth: 8,
    borderBottomColor: COLORS.background,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  rowLeft: { flexDirection: "row", alignItems: "center" },
  title: { fontSize: 16, fontWeight: "600", color: COLORS.textPrimary },
  subText: { fontSize: 13, color: COLORS.textSecondary, marginTop: 2, marginBottom: 6 },
  optionText: { fontSize: 15, marginLeft: 10, color: COLORS.textPrimary },

  saveBtn: {
    backgroundColor: COLORS.primary,
    margin: 16,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  saveText: { color: COLORS.white, fontWeight: "600", fontSize: 16 },
});

export default NotificationScreen;