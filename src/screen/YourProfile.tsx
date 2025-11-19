// ProfileScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const YourProfile = () => {
  const [name, setName] = useState("Saif");
  const [mobile, setMobile] = useState("9334804356");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [anniversary, setAnniversary] = useState("");
  const [gender, setGender] = useState("");

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={22} color="black" />
        <Text style={styles.headerText}>Your Profile</Text>
      </View>

      {/* Profile Circle */}
      <View style={styles.profileContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>S</Text>
          <TouchableOpacity style={styles.editIcon}>
            <MaterialCommunityIcons name="pencil" size={18} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        {/* Name */}
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        {/* Mobile */}
        <Text style={styles.label}>Mobile</Text>
        <View style={styles.rowInput}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            value={mobile}
            editable={false}
          />
          <TouchableOpacity>
            <Text style={styles.changeText}>CHANGE</Text>
          </TouchableOpacity>
        </View>

        {/* Email */}
        <Text style={styles.label}>Email</Text>
        <View style={styles.rowInput}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            value={email}
            onChangeText={setEmail}
          />
          <TouchableOpacity>
            <Text style={styles.changeText}>CHANGE</Text>
          </TouchableOpacity>
        </View>

        {/* DOB */}
        <Text style={styles.label}>Date of birth</Text>
        <TextInput
          style={styles.input}
          placeholder="Date of birth"
          value={dob}
          onChangeText={setDob}
        />

        {/* Anniversary */}
        <Text style={styles.label}>Anniversary</Text>
        <TextInput
          style={styles.input}
          placeholder="Anniversary"
          value={anniversary}
          onChangeText={setAnniversary}
        />

        {/* Gender */}
        <Text style={styles.label}>Gender</Text>
        <View style={styles.dropdown}>
          <Text style={{ color: gender ? "black" : "#999" }}>
            {gender || "Gender"}
          </Text>
          <Ionicons name="chevron-down" size={18} color="#666" />
        </View>
      </View>

      {/* Update Profile Button */}
      <TouchableOpacity style={styles.disabledButton}>
        <Text style={styles.disabledButtonText}>Update profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default YourProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9ff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#dbe5ff",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "600",
    color: "#2e5aff",
  },
  editIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 4,
    elevation: 3,
  },
  inputContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 13,
    color: "#999",
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
    marginTop: 4,
  },
  rowInput: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  changeText: {
    color: "red",
    fontWeight: "600",
    marginLeft: 8,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
    marginTop: 4,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  disabledButton: {
    backgroundColor: "#e6e6e6",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    margin: 20,
  },
  disabledButtonText: {
    color: "#999",
    fontSize: 16,
    fontWeight: "600",
  },
});
