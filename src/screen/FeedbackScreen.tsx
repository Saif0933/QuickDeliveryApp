// FeedbackScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const FeedbackScreen = () => {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    if (feedback.trim() === "") {
      Alert.alert("Error", "Please enter your feedback before submitting.");
    } else {
      Alert.alert("Thank You!", "Your feedback has been submitted.");
      setFeedback(""); // clear input
    }
  };

  const handleHelp = () => {
    Alert.alert(
      "Customer Support",
      "Redirecting you to our support team..."
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Send Feedback</Text>
      </View>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Tell us what you love about the app, or what we could be doing better.
      </Text>

      {/* Feedback Input */}
      <Text style={styles.label}>Enter feedback</Text>
      <TextInput
        style={styles.input}
        placeholder="Write your feedback here..."
        value={feedback}
        onChangeText={setFeedback}
        multiline
      />

      {/* Help Box */}
      <TouchableOpacity style={styles.helpBox} onPress={handleHelp}>
        <FontAwesome name="star" size={28} color="#fbc02d" />
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.helpTitle}>Need help with your order?</Text>
          <Text style={styles.helpSubtitle}>
            Get instant help from our customer support team
          </Text>
        </View>
      </TouchableOpacity>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit feedback</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 15,
    color: "#000",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: "500",
    color: "#000",
    marginBottom: 6,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    fontSize: 15,
    paddingVertical: 6,
    marginBottom: 20,
    color: "#000",
  },
  helpBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  helpTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
  },
  helpSubtitle: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
  submitButton: {
    backgroundColor: "#6c7480",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 20,
  },
  submitText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
  },
});

export default FeedbackScreen;
