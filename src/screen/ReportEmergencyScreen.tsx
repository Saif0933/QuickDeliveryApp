// ReportEmergencyScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const ReportEmergencyScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  // Function for handling send
  const handleSend = () => {
    if (!name || !email || !phone || !message) {
      Alert.alert("Error", "Please fill all fields!");
      return;
    }
    Alert.alert("Success", "Your emergency report has been submitted!");
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  };

  const handleContactUs = () => {
    Alert.alert("Info", "Redirecting to contact support page...");
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Report a Safety Emergency</Text>
      </View>

      {/* Title Box */}
      <View style={styles.titleBox}>
        <Text style={styles.title}>Report an Accident{"\n"}or Emergency</Text>
      </View>

      {/* Disclaimer */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Disclaimer</Text>
        <Text style={styles.cardText}>
          Please use this page to report a serious incident or accident only. For
          order related queries, please use our chat support.
        </Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Ionicons name="help-circle-outline" size={20} color="#888" />
          <TextInput
            style={styles.input}
            placeholder="How can we help you?"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#888" />
          <TextInput
            style={styles.input}
            placeholder="Name*"
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#888" />
          <TextInput
            style={styles.input}
            placeholder="Email*"
            placeholderTextColor="#999"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="call-outline" size={20} color="#888" />
          <TextInput
            style={styles.input}
            placeholder="Phone number*"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <View style={styles.inputContainerMulti}>
          <Ionicons name="chatbox-ellipses-outline" size={20} color="#888" />
          <TextInput
            style={styles.textArea}
            placeholder="Message*"
            placeholderTextColor="#999"
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={4}
          />
        </View>
      </View>

      {/* Disclaimer 2 */}
      <View style={styles.card}>
        <Text style={styles.cardText}>
          Please use this form only for accident or abuse related emergency
          situations. For order or other general queries{" "}
          <Text style={styles.link} onPress={handleContactUs}>
            contact us here.
          </Text>
        </Text>
      </View>

      {/* Send Button */}
      <TouchableOpacity style={styles.button} onPress={handleSend}>
        <Text style={styles.buttonText}>Send Message</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ReportEmergencyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
  },
  header: {
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
  },
  titleBox: {
    backgroundColor: "#c62828",
    padding: 15,
    borderRadius: 6,
    marginVertical: 10,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 6,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  cardText: {
    fontSize: 14,
    color: "#444",
  },
  link: {
    color: "#1976d2",
    textDecorationLine: "underline",
  },
  form: {
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    marginVertical: 6,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 14,
  },
  inputContainerMulti: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    marginVertical: 6,
    paddingHorizontal: 10,
  },
  textArea: {
    flex: 1,
    padding: 10,
    fontSize: 14,
    minHeight: 80,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#c62828",
    padding: 14,
    borderRadius: 6,
    alignItems: "center",
    marginVertical: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
