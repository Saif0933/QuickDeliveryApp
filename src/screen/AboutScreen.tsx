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
        <Text style={styles.headerText}>About Minta Restro</Text>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.title}>About Us</Text>
          <Text style={styles.highlight}>
            Simplifying access to quality raw meat and seafood with transparency, hygiene, and care.
          </Text>
          <Text style={styles.updated}>Last Updated: 09/02/2020</Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.paragraph}>
            Minta Restro is a brand operated by Minta Minta Club Private Limited, created to provide a revolutionary and reliable doorstep delivery of mutton, fish, and chicken and goat meat to customers.
          </Text>

          <Text style={styles.paragraph}>
            We partner with verified local meat suppliers and sort of processing units products are hygienically handled manually, statically packed, carefully packed. Our platform guarantees, place receive fresh meat at your preferred location.
          </Text>

          <Text style={styles.paragraph}>
            We operate an online food ordering strategy platform.
          </Text>

          <Text style={styles.paragraph}>
            Minta Restro is a technology-enabled service that facilitates the sale of food products only. The platform does not provide financial services, gaming, reward-based earnings products of any kind.
          </Text>

          <Text style={styles.paragraph}>
            Payments for orders are processed securely through payment gateways. Any in-app wallet, wallet updates are solely for internal order adjustments or refunds and is not withdrawable in kind.
          </Text>

          <Text style={styles.paragraph}>
            Payments for orders processed through for food only. Any wallet shown is used solely for internal order adjustments/refunds and is not withdrawable.
          </Text>

          <Text style={styles.paragraph}>
            Payouts to partners are blocked operational settlements and are not user-facing features.
          </Text>

          <Text style={styles.paragraph}>
            Our mission is to simplify access to quality raw meat and seafood while maintaining transparency, hygiene, and compliance with applicable laws and platform policies.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>App version v19.1.2 Live</Text>
        </View>
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
    fontWeight: "700",
    marginLeft: 15,
    color: "#000",
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 25,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#000",
    marginBottom: 8,
  },
  highlight: {
    fontSize: 16,
    color: "#444",
    fontStyle: "italic",
    lineHeight: 22,
    marginBottom: 10,
  },
  updated: {
    fontSize: 12,
    color: "#888",
    fontWeight: "500",
  },
  textContainer: {
    marginBottom: 30,
  },
  paragraph: {
    fontSize: 15,
    color: "#333",
    lineHeight: 24,
    marginBottom: 18,
    textAlign: "justify",
  },
  footer: {
    marginTop: 10,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    alignItems: "center",
  },
  footerText: {
    fontSize: 13,
    color: "#999",
  },
});

export default AboutScreen;