// FeedbackScreen.tsx
import React, { useState } from "react";
import { COLORS } from "../theme/color";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

type Props = {
  navigation?: any; // For back navigation
};

const FeedbackScreen: React.FC<Props> = ({ navigation }) => {
  const [feedback, setFeedback] = useState("");
  const maxLength = 500;

  const handleSubmit = () => {
    if (feedback.trim() === "") {
      Alert.alert("Oops!", "Please share your thoughts before submitting.");
    } else {
      Alert.alert("Thank You! ❤️", "Your feedback means the world to us. We've got it!");
      setFeedback(""); // Clear input
    }
  };

  const handleHelp = () => {
    Alert.alert(
      "We're Here to Help! 😊",
      "Connecting you to our support team now...",
      [{ text: "Got it!", onPress: () => navigation?.navigate("SupportScreen") }] // Navigate to support if available
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
          <Text style={styles.headerText}>Send Feedback</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Subtitle */}
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>
            Tell us what you love about the app, or what we could be doing better. Your voice helps us grow! 🌟
          </Text>
        </View>

        {/* Feedback Input */}
        <View style={styles.inputContainer}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>Your Feedback</Text>
            <Text style={styles.charCount}>{feedback.length}/{maxLength}</Text>
          </View>
          <TextInput
            style={[styles.input, { textAlignVertical: "top" }]}
            placeholder="Share your thoughts here... We value every word!"
            placeholderTextColor={COLORS.muted}
            value={feedback}
            onChangeText={setFeedback}
            multiline
            maxLength={maxLength}
            numberOfLines={6}
            blurOnSubmit={true}
          />
        </View>

        {/* Help Box */}
        <TouchableOpacity style={styles.helpBox} onPress={handleHelp} activeOpacity={0.8}>
          <View style={styles.helpIcon}>
            <FontAwesome name="star" size={28} color={COLORS.highlight} />
          </View>
          <View style={styles.helpContent}>
            <Text style={styles.helpTitle}>Need help with your order?</Text>
            <Text style={styles.helpSubtitle}>
              Get instant help from our customer support team
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.muted} />
        </TouchableOpacity>

        {/* Submit Button */}
        <TouchableOpacity 
          style={[styles.submitButton, feedback.trim() ? styles.submitButtonActive : styles.submitButtonInactive]} 
          onPress={handleSubmit}
          disabled={!feedback.trim()}
          activeOpacity={0.8}
        >
          <Text style={[styles.submitText, feedback.trim() ? styles.submitTextActive : styles.submitTextInactive]}>
            {feedback.trim() ? "Submit Feedback" : "Submit Feedback"}
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: COLORS.white, // Zomato-inspired red
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
  subtitleContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    lineHeight: 22,
    textAlign: "center",
  },
  inputContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  charCount: {
    fontSize: 14,
    color: COLORS.muted,
    fontWeight: "500",
  },
  input: {
    fontSize: 16,
    color: COLORS.textPrimary,
    padding: 12,
    borderRadius: 8,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    minHeight: 100,
    textAlignVertical: "top",
  },
  helpBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 24,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  helpIcon: {
    marginRight: 12,
  },
  helpContent: {
    flex: 1,
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  helpSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 32,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  submitButtonActive: {
    backgroundColor: COLORS.primary,
  },
  submitButtonInactive: {
    backgroundColor: COLORS.secondary,
  },
  submitText: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.white,
  },
  submitTextActive: {
    color: COLORS.white,
  },
  submitTextInactive: {
    color: COLORS.muted,
  },
});

export default FeedbackScreen; 