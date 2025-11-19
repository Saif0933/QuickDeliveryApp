import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const LocationScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Select a location</Text>

      {/* Search bar */}
      <View style={styles.searchBar}>
        <Icon name="search" size={22} color="#888" />
        <TextInput
          placeholder="Search for area, street name..."
          style={styles.searchInput}
        />
      </View>

      {/* Current Location */}
      <TouchableOpacity style={styles.row}>
        <MaterialCommunityIcons
          name="crosshairs-gps"
          size={22}
          color="#EF4F5F"
        />
        <View style={styles.rowText}>
          <Text style={styles.rowTitle}>Use current location</Text>
          <Text style={styles.rowSub}>
            Harmu Housing Colony, Delatoli, Ranchi
          </Text>
        </View>
        <Icon name="chevron-right" size={20} color="#999" />
      </TouchableOpacity>

      {/* Add Address */}
      <TouchableOpacity style={styles.row}>
        <Icon name="add" size={22} color="#EF4F5F" />
        <View style={styles.rowText}>
          <Text style={styles.rowTitle}>Add Address</Text>
        </View>
      </TouchableOpacity>

      {/* Import Address */}
      <TouchableOpacity style={styles.row}>
        <MaterialCommunityIcons
          name="file-import"
          size={22}
          color="#EF4F5F"
        />
        <View style={styles.rowText}>
          <Text style={styles.rowTitle}>Import addresses from Blinkit</Text>
        </View>
      </TouchableOpacity>

      {/* Info Banner */}
      <View style={styles.infoBanner}>
        <Icon name="info" size={20} color="#3A82F7" />
        <Text style={styles.infoText}>
          During rains, delivery partners may take longer to reach you
        </Text>
      </View>

      {/* Saved Addresses */}
      <Text style={styles.sectionHeader}>SAVED ADDRESSES</Text>
      <View style={styles.card}>
        <View style={styles.cardRow}>
          <MaterialCommunityIcons name="map-marker" size={22} color="#555" />
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>My Place</Text>
            <Text style={styles.cardSub} numberOfLines={1}>
              balpan hospital 4 floor, 4 Floor, Balpan Children Hospital...
            </Text>
            <Text style={styles.cardSub}>Phone number: +91-9334804356</Text>
          </View>
          <Text style={styles.cardDistance}>8 km</Text>
        </View>
        <View style={styles.cardActions}>
          <TouchableOpacity>
            <Icon name="more-horiz" size={22} color="#EF4F5F" />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="directions"
              size={22}
              color="#EF4F5F"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardRow}>
          <MaterialCommunityIcons name="home" size={22} color="#555" />
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>Home</Text>
            <Text style={styles.cardSub}>
              1 floor, Tarulia, Krishnapur, Kestopur, Kolkata
            </Text>
            <Text style={styles.cardSub}>Phone number: +91-9334804356</Text>
          </View>
          <Text style={styles.cardDistance}>332 km</Text>
        </View>
        <View style={styles.cardActions}>
          <TouchableOpacity>
            <Icon name="more-horiz" size={22} color="#EF4F5F" />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="directions"
              size={22}
              color="#EF4F5F"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Nearby Locations */}
      <Text style={styles.sectionHeader}>NEARBY LOCATIONS</Text>
      <View style={styles.card}>
        <View style={styles.cardRow}>
          <MaterialCommunityIcons name="map-marker" size={22} color="#555" />
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>Itsy Hotels Cradle Regency</Text>
            <Text style={styles.cardSub} numberOfLines={1}>
              Beside New AG Colony Road, Basant Vihar, Kadru, Ashok N...
            </Text>
          </View>
          <Text style={styles.cardDistance}>40 m</Text>
        </View>
      </View>

      {/* Recent Locations */}
      <Text style={styles.sectionHeader}>RECENT LOCATIONS</Text>
      <View style={styles.card}>
        <View style={styles.cardRow}>
          <MaterialCommunityIcons name="clock-outline" size={22} color="#555" />
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>Kadru</Text>
            <Text style={styles.cardSub}>AG Colony, Ranchi</Text>
          </View>
          <Text style={styles.cardDistance}>0 m</Text>
        </View>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>powered by Google</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  rowText: {
    flex: 1,
    marginLeft: 10,
  },
  rowTitle: {
    fontSize: 15,
    fontWeight: "500",
  },
  rowSub: {
    fontSize: 13,
    color: "#777",
    marginTop: 2,
  },
  infoBanner: {
    backgroundColor: "#E6F0FF",
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    marginVertical: 16,
  },
  infoText: {
    fontSize: 13,
    color: "#333",
    marginLeft: 8,
    flex: 1,
  },
  sectionHeader: {
    fontSize: 13,
    color: "#888",
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 6,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  cardText: {
    flex: 1,
    marginLeft: 10,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
  },
  cardSub: {
    fontSize: 13,
    color: "#777",
    marginTop: 2,
  },
  cardDistance: {
    fontSize: 12,
    color: "#888",
    marginLeft: 6,
  },
  cardActions: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "flex-end",
    gap: 20,
  },
  footer: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 40,
  },
});

export default LocationScreen;
