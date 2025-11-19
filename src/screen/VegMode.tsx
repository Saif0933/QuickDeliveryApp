import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const VegMode = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
  const [dishOption, setDishOption] = useState("all"); // all | pure
  const [dayOption, setDayOption] = useState("all"); // all | custom
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <Modal animationType="slide" transparent visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="close" size={22} color="#000" />
        </TouchableOpacity>


          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Title */}
            <Text style={styles.header}>Veg Mode</Text>

            {/* See veg dishes from */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>See veg dishes from</Text>
              <TouchableOpacity
                style={styles.row}
                onPress={() => setDishOption("all")}
              >
                <Text style={styles.text}>All restaurants</Text>
                <Icon
                  name={
                    dishOption === "all" ? "radio-button-checked" : "radio-button-unchecked"
                  }
                  size={22}
                  color={dishOption === "all" ? "#00923F" : "#bbb"}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.row}
                onPress={() => setDishOption("pure")}
              >
                <Text style={styles.text}>Pure Veg restaurants only</Text>
                <Icon
                  name={
                    dishOption === "pure" ? "radio-button-checked" : "radio-button-unchecked"
                  }
                  size={22}
                  color={dishOption === "pure" ? "#00923F" : "#bbb"}
                />
              </TouchableOpacity>
            </View>

            {/* Select Veg Mode days */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Select Veg Mode days</Text>
              <TouchableOpacity
                style={styles.row}
                onPress={() => setDayOption("all")}
              >
                <Text style={styles.text}>All days</Text>
                <Icon
                  name={
                    dayOption === "all" ? "radio-button-checked" : "radio-button-unchecked"
                  }
                  size={22}
                  color={dayOption === "all" ? "#00923F" : "#bbb"}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.row}
                onPress={() => setDayOption("custom")}
              >
                <Text style={styles.text}>Select days of the week</Text>
                <Icon
                  name={
                    dayOption === "custom"
                      ? "radio-button-checked"
                      : "radio-button-unchecked"
                  }
                  size={22}
                  color={dayOption === "custom" ? "#00923F" : "#bbb"}
                />
              </TouchableOpacity>

              {/* Day selector */}
              {dayOption === "custom" && (
                <View style={styles.daysRow}>
                  {["M", "T", "W", "T", "F", "S", "S"].map((d, idx) => (
                    <TouchableOpacity
                      key={idx}
                      style={[
                        styles.dayCircle,
                        selectedDays.includes(d) && styles.dayCircleActive,
                      ]}
                      onPress={() => toggleDay(d)}
                    >
                      <Text
                        style={[
                          styles.dayText,
                          selectedDays.includes(d) && styles.dayTextActive,
                        ]}
                      >
                        {d}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </ScrollView>

          {/* Confirm Button */}
          <TouchableOpacity style={styles.confirmButton}>
            <Text style={styles.confirmText}>Switch on Veg Mode</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modal: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
    maxHeight: "80%",
  },
  closeButton: {
    alignSelf: "center",
    backgroundColor: "#F2F2F2",
    borderRadius: 20,
    padding: 6,
    marginTop: -20,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 8,
    borderBottomColor: "#F7F7F7",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  text: {
    fontSize: 16,
    color: "#000",
  },
  daysRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  dayCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 2,
  },
  dayCircleActive: {
    backgroundColor: "#00923F",
    borderColor: "#00923F",
  },
  dayText: {
    fontSize: 14,
    color: "#555",
  },
  dayTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },
  confirmButton: {
    backgroundColor: "#00923F",
    paddingVertical: 16,
    marginHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  confirmText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default VegMode;
