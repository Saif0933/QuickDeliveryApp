import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

type Address = {
  id: string;
  label: string;
  details: string;
  distance: string;
  phone: string;
  type: "home" | "work" | "other";
};

const AddressBookScreen: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      label: "My Place",
      details:
        "balpan hospital 4 floor, 4 Floor, Balpan Children Hospital, Book...",
      distance: "8 km",
      phone: "+91-9334804356",
      type: "other",
    },
    {
      id: "2",
      label: "Home",
      details: "1 floor, Tarulia, Krishnapur, Kestopur, Kolkata",
      distance: "332 km",
      phone: "+91-9334804356",
      type: "home",
    },
  ]);

  // ✅ Edit Address
  const handleEdit = (id: string) => {
    Alert.alert("Edit", `Editing address with ID: ${id}`);
    // TODO: Navigate to edit form or open modal
  };

  // ✅ Delete Address
  const handleDelete = (id: string) => {
    Alert.alert("Delete", "Are you sure you want to delete this address?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setAddresses((prev) => prev.filter((addr) => addr.id !== id));
        },
      },
    ]);
  };

  // ✅ Update Delivery Instructions
  const handleUpdateInstruction = (id: string) => {
    Alert.alert("Update", `Update delivery instructions for ID: ${id}`);
    // TODO: Open modal or text input for delivery instruction
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>My Addresses</Text>

      {/* Add Address */}
      <TouchableOpacity style={styles.addRow}>
        <Icon name="add" size={20} color="red" />
        <Text style={styles.addText}>Add Address</Text>
      </TouchableOpacity>

      {/* Import from Blinkit */}
      <TouchableOpacity style={styles.importRow}>
        <Icon name="local-shipping" size={20} color="red" />
        <Text style={styles.importText}>Import addresses from Blinkit</Text>
      </TouchableOpacity>

      {/* Saved Addresses */}
      <Text style={styles.savedText}>SAVED ADDRESSES</Text>

      {addresses.map((addr) => (
        <View key={addr.id} style={styles.card}>
          {/* Address Icon */}
          <View style={styles.iconContainer}>
            <Icon
              name={addr.type === "home" ? "home" : "location-on"}
              size={22}
              color="#666"
            />
            <Text style={styles.distance}>{addr.distance}</Text>
          </View>

          {/* Address Content */}
          <View style={styles.content}>
            <Text style={styles.label}>{addr.label}</Text>
            <Text style={styles.details}>{addr.details}</Text>
            <Text style={styles.phone}>Phone number: {addr.phone}</Text>

            {/* Action Buttons */}
            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => handleDelete(addr.id)}
              >
                <Icon name="delete" size={20} color="red" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => handleEdit(addr.id)}
              >
                <Icon name="edit" size={20} color="#333" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => handleUpdateInstruction(addr.id)}
              >
                <Icon name="sticky-note-2" size={20} color="#555" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    padding: 12,
  },
  header: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    marginLeft: 4,
  },
  addRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 8,
  },
  addText: {
    color: "red",
    marginLeft: 6,
    fontSize: 16,
    fontWeight: "500",
  },
  importRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
  },
  importText: {
    color: "red",
    marginLeft: 6,
    fontSize: 16,
    fontWeight: "500",
  },
  savedText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    marginLeft: 4,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  iconContainer: {
    alignItems: "center",
    marginRight: 10,
    width: 40,
  },
  distance: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  phone: {
    fontSize: 13,
    color: "#777",
    marginBottom: 8,
  },
  actions: {
    flexDirection: "row",
  },
  actionBtn: {
    marginRight: 12,
  },
});

export default AddressBookScreen;
