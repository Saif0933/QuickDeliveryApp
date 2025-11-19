// SupportScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  SafeAreaView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

type Props = {
  navigation: any;
};

const SupportScreen: React.FC<Props> = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [chatEnded, setChatEnded] = useState(false);

  const handleBack = () => {
    navigation.navigate("ProfileScreen"); // Go to Profile
  };

  const 
  handleEndChat = () => {
    setModalVisible(true); // Show popup
  };

  const confirmEndChat = () => {
    setModalVisible(false);
    setChatEnded(true); // Mark chat as ended
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Zomato Support</Text>
        <TouchableOpacity onPress={handleEndChat}>
          <Text style={styles.endChat}>End chat</Text>
        </TouchableOpacity>
      </View>

      {/* Chat Area */}
      <ScrollView style={styles.chatContainer}>
        {/* Old Message */}
        <Text style={styles.dateText}>5 September 2025</Text>
        <View style={styles.messageBox}>
          <Text style={styles.message}>
            Hi Saif, please select the order for which you seek support.
          </Text>
          <Text style={styles.time}>11:27 AM</Text>
        </View>

        {/* Closed message */}
        <View style={styles.closedBox}>
          <Text style={styles.closedText}>
            The conversation has been closed due to inactivity
          </Text>
        </View>

        {/* Today Messages */}
        <Text style={styles.dateText}>Today</Text>
        <View style={styles.messageBox}>
          <Text style={styles.message}>
            Hi Saif, please select the order for which you seek support.
          </Text>
          <Text style={styles.time}>11:44 AM</Text>
        </View>

        {/* Orders */}
        <View style={styles.orderBox}>
          <Text style={styles.orderTitle}>
            Order from <Text style={styles.blueText}>Pizza Hut</Text>
          </Text>
          <Text style={styles.orderDetails}>
            17th Feb at 4:16 PM | Create Your Flavour Fun Combo - Box Of 2 - Veg
            Pizza
          </Text>
          <Text style={styles.success}>Your order was delivered</Text>
        </View>

        <View style={styles.orderBox}>
          <Text style={styles.orderTitle}>
            Order from <Text style={styles.blueText}>Pizza Hut</Text>
          </Text>
          <Text style={styles.orderDetails}>
            17th Feb at 4:15 PM | Create Your Flavour Fun Combo - Box Of 2 - Veg
            Pizza
          </Text>
          <Text style={styles.failed}>Payment failed</Text>
        </View>

        <View style={styles.orderBox}>
          <Text style={styles.orderTitle}>
            Order from <Text style={styles.blueText}>Kolkata@99</Text>
          </Text>
          <Text style={styles.orderDetails}>
            31st Jan at 2:35 AM | Gulab Jamun [8 Pieces]
          </Text>
          <Text style={styles.success}>Your order was delivered</Text>
        </View>

        <View style={styles.orderBox}>
          <Text style={styles.orderTitle}>
            Order from <Text style={styles.blueText}>Kolkata@99</Text>
          </Text>
          <Text style={styles.orderDetails}>
            31st Jan at 2:30 AM | Gulab Jamun [8 Pieces]
          </Text>
          <Text style={styles.failed}>Payment failed</Text>
        </View>
      </ScrollView>

      {/* End Chat Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>
              Do you want to end this chat session?
            </Text>

            <TouchableOpacity
              style={styles.endBtn}
              onPress={confirmEndChat}
            >
              <Text style={styles.endBtnText}>End chat</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Chat Ended Status */}
      {chatEnded && (
        <View style={styles.chatEndedBox}>
          <Text style={styles.chatEndedText}>Chat has been ended.</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SupportScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    justifyContent: "space-between",
  },
  backBtn: { marginRight: 10 },
  headerTitle: { fontSize: 18, fontWeight: "bold" },
  endChat: { color: "red", fontWeight: "bold", fontSize: 14 },

  chatContainer: { padding: 15 },
  dateText: { textAlign: "center", marginVertical: 10, color: "#666" },
  messageBox: {
    backgroundColor: "#eef4ff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  message: { fontSize: 14, color: "#333" },
  time: { textAlign: "right", fontSize: 12, color: "#777" },
  closedBox: {
    backgroundColor: "#fcefdc",
    padding: 10,
    borderRadius: 6,
    marginVertical: 10,
  },
  closedText: { color: "#8c6b1f", textAlign: "center" },
  orderBox: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  orderTitle: { fontSize: 15, fontWeight: "600" },
  blueText: { color: "#0056D2" },
  orderDetails: { fontSize: 13, color: "#333", marginVertical: 5 },
  success: { color: "green", fontSize: 13, fontWeight: "600" },
  failed: { color: "red", fontSize: 13, fontWeight: "600" },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: { fontSize: 16, fontWeight: "600", textAlign: "center" },
  endBtn: {
    backgroundColor: "red",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  endBtnText: { color: "#fff", fontWeight: "bold" },
  cancelBtn: {
    marginTop: 10,
    padding: 12,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  cancelBtnText: { color: "black", fontWeight: "600" },
  chatEndedBox: {
    backgroundColor: "#fee",
    padding: 10,
    alignItems: "center",
  },
  chatEndedText: { color: "red", fontWeight: "600" },
});
