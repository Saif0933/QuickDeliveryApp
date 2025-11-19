import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  NotificationPreferences: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const NotificationScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  // States for switches
  const [enableAll, setEnableAll] = useState(false);

  const [promoPush, setPromoPush] = useState(false);
  const [promoWhatsApp, setPromoWhatsApp] = useState(false);

  const [socialPush, setSocialPush] = useState(false);

  const [orderPush, setOrderPush] = useState(false);
  const [orderWhatsApp, setOrderWhatsApp] = useState(false);

  // Handle Enable All toggle
  const toggleEnableAll = (value: boolean) => {
    setEnableAll(value);
    setPromoPush(value);
    setPromoWhatsApp(value);
    setSocialPush(value);
    setOrderPush(value);
    setOrderWhatsApp(value);
  };

  // Handle Save Changes
  const handleSave = () => {
    console.log("Saved preferences:", {
      promoPush,
      promoWhatsApp,
      socialPush,
      orderPush,
      orderWhatsApp,
    });
    alert("Notification preferences saved!");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
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
              trackColor={{ false: "#ccc", true: "#EF4F5F" }}
              thumbColor="#fff"
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
              <FontAwesome name="bell-o" size={18} color="#333" />
              <Text style={styles.optionText}>Push</Text>
            </View>
            <Switch
              value={promoPush}
              onValueChange={setPromoPush}
              trackColor={{ false: "#ccc", true: "#EF4F5F" }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.rowBetween}>
            <View style={styles.rowLeft}>
              <FontAwesome5 name="whatsapp" size={18} color="green" />
              <Text style={styles.optionText}>WhatsApp</Text>
            </View>
            <Switch
              value={promoWhatsApp}
              onValueChange={setPromoWhatsApp}
              trackColor={{ false: "#ccc", true: "#EF4F5F" }}
              thumbColor="#fff"
            />
          </View>
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
              <FontAwesome name="bell-o" size={18} color="#333" />
              <Text style={styles.optionText}>Push</Text>
            </View>
            <Switch
              value={socialPush}
              onValueChange={setSocialPush}
              trackColor={{ false: "#ccc", true: "#EF4F5F" }}
              thumbColor="#fff"
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
              <FontAwesome name="bell-o" size={18} color="#333" />
              <Text style={styles.optionText}>Push</Text>
            </View>
            <Switch
              value={orderPush}
              onValueChange={setOrderPush}
              trackColor={{ false: "#ccc", true: "#EF4F5F" }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.rowBetween}>
            <View style={styles.rowLeft}>
              <FontAwesome5 name="whatsapp" size={18} color="green" />
              <Text style={styles.optionText}>WhatsApp</Text>
            </View>
            <Switch
              value={orderWhatsApp}
              onValueChange={setOrderWhatsApp}
              trackColor={{ false: "#ccc", true: "#EF4F5F" }}
              thumbColor="#fff"
            />
          </View>
        </View>
      </ScrollView>

      {/* Save Changes Button */}
      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    backgroundColor: "#fff",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  headerTitle: { fontSize: 18, fontWeight: "bold", marginLeft: 10 },
  section: {
    padding: 16,
    borderBottomWidth: 8,
    borderBottomColor: "#F5F5F5",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  rowLeft: { flexDirection: "row", alignItems: "center" },
  title: { fontSize: 16, fontWeight: "600", color: "#000" },
  subText: { fontSize: 13, color: "#555", marginTop: 2, marginBottom: 6 },
  optionText: { fontSize: 15, marginLeft: 10, color: "#000" },

  saveBtn: {
    backgroundColor: "#EF4F5F",
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
  saveText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});

export default NotificationScreen;
