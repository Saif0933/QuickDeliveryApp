// PaymentSettings.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const PaymentSettings = () => {
  const handlePress = (title: string) => {
    Alert.alert("Selected", title);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={22} />
        <Text style={styles.headerTitle}>Payment settings</Text>
      </View>

      {/* Banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>AMAZON PAY BALANCE</Text>
        <Text style={styles.bannerSub}>
          Get 3% cashback on every order.{"\n"}Know more
        </Text>
      </View>

      {/* Cards Section */}
      <Section title="CARDS">
        <Option
          icon={<Ionicons name="card-outline" size={20} />}
          text="Add credit or debit cards"
          onPress={() => handlePress("Add credit or debit cards")}
        />
        <Option
          icon={<MaterialCommunityIcons name="plus-box-outline" size={20} />}
          text="Add Pluxee"
          onPress={() => handlePress("Add Pluxee")}
        />
      </Section>

      {/* UPI Section */}
      <Section title="UPI">
        <Option
          icon={<MaterialCommunityIcons name="alpha-p-circle-outline" size={20} />}
          text="PhonePe UPI"
          onPress={() => handlePress("PhonePe UPI")}
        />
        <Option
          icon={<FontAwesome name="paypal" size={20} />}
          text="Paytm UPI"
          onPress={() => handlePress("Paytm UPI")}
        />
        <Option
          icon={<Ionicons name="logo-amazon" size={20} />}
          text="Amazon Pay UPI"
          onPress={() => handlePress("Amazon Pay UPI")}
        />
        <Option
          icon={<MaterialCommunityIcons name="cash-multiple" size={20} />}
          text="Supermoney UPI"
          onPress={() => handlePress("Supermoney UPI")}
        />
        <Option
          icon={<MaterialCommunityIcons name="plus-circle-outline" size={20} />}
          text="Add new UPI ID"
          onPress={() => handlePress("Add new UPI ID")}
        />
      </Section>

      {/* Wallets */}
      <Section title="WALLETS">
        <Option
          icon={<Ionicons name="logo-amazon" size={20} />}
          text="Amazon Pay Balance"
          onPress={() => handlePress("Amazon Pay Balance")}
        />
        <Option
          icon={<MaterialCommunityIcons name="wallet-outline" size={20} />}
          text="Mobikwik"
          onPress={() => handlePress("Mobikwik")}
        />
      </Section>

      {/* Pay Later */}
      <Section title="PAY LATER">
        <Option
          icon={<MaterialCommunityIcons name="credit-card-clock-outline" size={20} />}
          text="Simpl"
          onPress={() => handlePress("Simpl")}
        />
        <Option
          icon={<Ionicons name="logo-amazon" size={20} />}
          text="Amazon Pay Later"
          onPress={() => handlePress("Amazon Pay Later")}
        />
        <Option
          icon={<MaterialCommunityIcons name="play-circle-outline" size={20} />}
          text="LazyPay"
          onPress={() => handlePress("LazyPay")}
        />
      </Section>

      {/* Netbanking */}
      <Section title="NETBANKING">
        <Option
          icon={<Ionicons name="business-outline" size={20} />}
          text="Netbanking"
          onPress={() => handlePress("Netbanking")}
        />
      </Section>

      {/* Settings */}
      <Section title="SETTINGS">
        <Option
          icon={<Ionicons name="cube-outline" size={20} />}
          text="Pay on delivery"
          rightText="ENABLE"
          onPress={() => handlePress("Pay on delivery")}
        />
      </Section>
    </ScrollView>
  );
};

export default PaymentSettings;

// Section Component
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionBox}>{children}</View>
  </View>
);

// Option Component
const Option = ({
  icon,
  text,
  rightText,
  onPress,
}: {
  icon: React.ReactNode;
  text: string;
  rightText?: string;
  onPress: () => void;
}) => (
  <TouchableOpacity style={styles.option} onPress={onPress}>
    <View style={styles.optionLeft}>
      {icon}
      <Text style={styles.optionText}>{text}</Text>
    </View>
    {rightText ? (
      <Text style={styles.rightText}>{rightText}</Text>
    ) : (
      <Ionicons name="add" size={18} color="red" />
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
  },
  banner: {
    backgroundColor: "#fff7e6",
    padding: 15,
    marginBottom: 10,
  },
  bannerText: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 4,
  },
  bannerSub: {
    fontSize: 12,
    color: "#444",
  },
  section: {
    marginVertical: 6,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#888",
    marginBottom: 6,
  },
  sectionBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#000",
  },
  rightText: {
    fontSize: 13,
    fontWeight: "600",
    color: "red",
  },
});
