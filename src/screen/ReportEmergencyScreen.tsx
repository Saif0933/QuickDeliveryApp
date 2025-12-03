// ReportEmergencyScreen.tsx
import React, { useState } from "react";
import { COLORS } from "../theme/color";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

type Props = {
  navigation?: any; // For back navigation and contact us
};

const ReportEmergencyScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [helpQuery, setHelpQuery] = useState(""); // Added state for first input
  const maxMessageLength = 500;

  // Function for handling send
  const handleSend = () => {
    if (!name.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      Alert.alert("Missing Info", "Please fill in all required fields to report your emergency.");
      return;
    }
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
    Alert.alert("Submitted Successfully", "Your emergency report has been received. Our team is on it—help is coming soon. Stay safe! 🚨");
    // Reset form
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setHelpQuery("");
  };

  const handleContactUs = () => {
    Alert.alert(
      "Support Ready to Help",
      "We're connecting you to our 24/7 support team.",
      [{ text: "Open Chat", onPress: () => navigation?.navigate("SupportScreen") }]
    );
  };

  const handleBack = () => {
    navigation?.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Report Emergency</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Urgent Title */}
          <View style={styles.titleBox}>
            <Ionicons name="warning-outline" size={32} color={COLORS.white} />
            <Text style={styles.title}>Report an Accident or Emergency</Text>
            <Text style={styles.titleSub}>Your safety comes first—get help now.</Text>
          </View>

          {/* Disclaimer */}
          <View style={styles.disclaimerCard}>
            <Ionicons name="information-circle-outline" size={20} color={COLORS.highlight} style={styles.disclaimerIcon} />
            <Text style={styles.disclaimerTitle}>Important Notice</Text>
            <Text style={styles.disclaimerText}>
              Use this form only for serious incidents or accidents. For order issues or general questions,{" "}
              <Text style={styles.link} onPress={handleContactUs}>chat with support here</Text>.
            </Text>
          </View>

          {/* Form Card */}
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>Tell Us What Happened</Text>

            {/* Help Query Input */}
            <View style={styles.inputGroup}>
              <View style={styles.inputHeader}>
                <Ionicons name="help-circle-outline" size={20} color={COLORS.textSecondary} />
                <Text style={styles.inputLabel}>Brief Description</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="e.g., Accident during delivery..."
                placeholderTextColor={COLORS.muted}
                value={helpQuery}
                onChangeText={setHelpQuery}
                multiline
                numberOfLines={2}
              />
            </View>

            {/* Name Input */}
            <View style={styles.inputGroup}>
              <View style={styles.inputHeader}>
                <Ionicons name="person-outline" size={20} color={COLORS.textSecondary} />
                <Text style={styles.inputLabel}>Full Name *</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                placeholderTextColor={COLORS.muted}
                value={name}
                onChangeText={setName}
              />
            </View>

            {/* Email Input */}
            <View style={styles.inputGroup}>
              <View style={styles.inputHeader}>
                <Ionicons name="mail-outline" size={20} color={COLORS.textSecondary} />
                <Text style={styles.inputLabel}>Email Address *</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor={COLORS.muted}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            {/* Phone Input */}
            <View style={styles.inputGroup}>
              <View style={styles.inputHeader}>
                <Ionicons name="call-outline" size={20} color={COLORS.textSecondary} />
                <Text style={styles.inputLabel}>Phone Number *</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Enter your phone number"
                placeholderTextColor={COLORS.muted}
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
            </View>

            {/* Message Input */}
            <View style={styles.inputGroup}>
              <View style={styles.inputHeader}>
                <Ionicons name="chatbox-ellipses-outline" size={20} color={COLORS.textSecondary} />
                <Text style={styles.inputLabel}>Details *</Text>
              </View>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Describe the incident in detail..."
                placeholderTextColor={COLORS.muted}
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={4}
                maxLength={maxMessageLength}
                textAlignVertical="top"
              />
              <Text style={styles.charCount}>
                {message.length}/{maxMessageLength}
              </Text>
            </View>
          </View>

          {/* Second Disclaimer */}
          <View style={styles.disclaimerCard}>
            <Text style={styles.disclaimerText}>
              This form is for emergencies only. For non-urgent matters,{" "}
              <Text style={styles.link} onPress={handleContactUs}>reach out via chat</Text>.
            </Text>
          </View>

          {/* Send Button */}
          <TouchableOpacity style={styles.sendButton} onPress={handleSend} activeOpacity={0.8}>
            <Ionicons name="send" size={20} color={COLORS.white} />
            <Text style={styles.sendButtonText}>Send Emergency Report</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ReportEmergencyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
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
  headerText: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.textPrimary,
    flex: 1,
    marginLeft: 12,
  },
  headerSpacer: {
    width: 24,
  },
  titleBox: {
    backgroundColor: COLORS.primary,
    padding: 24,
    borderRadius: 12,
    margin: 16,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  title: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 4,
  },
  titleSub: {
    color: COLORS.white,
    fontSize: 16,
    textAlign: "center",
  },
  disclaimerCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.highlight,
  },
  disclaimerIcon: {
    marginBottom: 8,
    alignSelf: "center",
  },
  disclaimerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.textPrimary,
    textAlign: "center",
    marginBottom: 8,
  },
  disclaimerText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
    textAlign: "center",
  },
  link: {
    color: COLORS.primary,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  formCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 16,
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginLeft: 8,
    flex: 1,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.secondary,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: COLORS.background,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: "top",
    paddingTop: 12,
  },
  charCount: {
    fontSize: 12,
    color: COLORS.muted,
    textAlign: "right",
    marginTop: 4,
  },
  sendButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 24,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  sendButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
  },
});