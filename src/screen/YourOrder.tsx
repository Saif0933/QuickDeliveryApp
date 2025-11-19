// OrdersScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  Alert,
  Share,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

interface Order {
  id: string;
  restaurant: string;
  location: string;
  menu: string;
  items: string;
  date: string;
  price: string;
  status: "Delivered" | "Payment failed" | "Refund completed";
  image: string;
  extra?: string;
}

const YourOrder = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "1",
      restaurant: "Pizza Hut",
      location: "Bariatu, Ranchi",
      menu: "View menu",
      items: "1 x Create Your Flavour Fun Combo - Classic Onion Capsicum",
      date: "Order placed on 17 Feb, 4:15PM",
      price: "₹191.92",
      status: "Delivered",
      image: "https://upload.wikimedia.org/wikipedia/en/6/6f/Pizza_Hut_logo.svg",
    },
    {
      id: "2",
      restaurant: "Pizza Hut",
      location: "Bariatu, Ranchi",
      menu: "View menu",
      items: "1 x Create Your Flavour Fun Combo - Classic Onion Capsicum",
      date: "Order placed on 17 Feb, 4:15PM",
      price: "₹191.92",
      status: "Payment failed",
      image: "https://upload.wikimedia.org/wikipedia/en/6/6f/Pizza_Hut_logo.svg",
    },
    {
      id: "3",
      restaurant: "Kolkata@99",
      location: "Sector 5, Salt Lake, Kolkata",
      menu: "View menu",
      items: "1 x Gulab Jamun [8 Pieces]",
      date: "Order placed on 31 Jan, 2:30AM",
      price: "₹203.80",
      status: "Refund completed",
      extra: "Bank Ref ID: 503108693626",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/6/6a/Gulab_jamun_%28homemade%29.jpg",
    },
  ]);

  // Delete Order
  const handleDelete = (id: string) => {
    Alert.alert("Delete Order", "Are you sure you want to delete this order?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => setOrders(orders.filter((o) => o.id !== id)),
      },
    ]);
  };

  // View Order Details
  const handleDetails = (order: Order) => {
    Alert.alert(
      "Order Details",
      `${order.items}\n\n${order.date}\n${order.price}\nStatus: ${order.status}`
    );
  };

  // Share Restaurant
  const handleShare = async (restaurant: string, location: string) => {
    try {
      await Share.share({
        message: `Check out ${restaurant} located at ${location}!`,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const renderOrder = ({ item }: { item: Order }) => (
    <View style={styles.card}>
      {/* Top Row */}
      <View style={styles.rowBetween}>
        <View style={styles.row}>
          <Image source={{ uri: item.image }} style={styles.logo} />
          <View>
            <Text style={styles.restaurant}>{item.restaurant}</Text>
            <Text style={styles.location}>{item.location}</Text>
            <Text style={styles.menu}>{item.menu}</Text>
          </View>
        </View>

        {/* 3 dots menu */}
        <TouchableOpacity
          onPress={() =>
            Alert.alert("Options", "", [
              { text: "Delete Order", onPress: () => handleDelete(item.id) },
              { text: "View Details", onPress: () => handleDetails(item) },
              {
                text: "Share Restaurant",
                onPress: () => handleShare(item.restaurant, item.location),
              },
              { text: "Cancel", style: "cancel" },
            ])
          }
        >
          <MaterialCommunityIcons
            name="dots-vertical"
            size={22}
            color="#444"
          />
        </TouchableOpacity>
      </View>

      {/* Items */}
      <Text style={styles.items}>{item.items}</Text>
      <Text style={styles.date}>{item.date}</Text>

      {/* Status + Price */}
      <View style={styles.rowBetween}>
        <Text style={styles.price}>{item.price}</Text>
      </View>

      {/* Status */}
      {item.status === "Delivered" && (
        <Text style={styles.delivered}>Delivered</Text>
      )}
      {item.status === "Payment failed" && (
        <Text style={styles.failed}>⚠ Payment failed</Text>
      )}
      {item.status === "Refund completed" && (
        <View>
          <Text style={styles.refund}>✔ Refund completed</Text>
          <Text style={styles.extra}>{item.extra}</Text>
        </View>
      )}

      {/* Reorder Button */}
      <TouchableOpacity style={styles.reorderBtn}>
        <Text style={styles.reorderText}>Reorder</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={22} color="#000" />
        <Text style={styles.headerTitle}>Your Orders</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#999" />
        <TextInput
          placeholder="Search by restaurant or dish"
          style={styles.searchInput}
        />
      </View>

      {/* Orders List */}
      <FlatList
        data={orders}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 50 }}
      />
    </View>
  );
};

export default YourOrder;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  headerTitle: { fontSize: 18, fontWeight: "600", marginLeft: 10 },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    elevation: 1,
  },
  searchInput: { marginLeft: 8, flex: 1 },
  card: {
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 12,
    padding: 12,
    elevation: 2,
  },
  row: { flexDirection: "row", alignItems: "center" },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: { width: 40, height: 40, borderRadius: 5, marginRight: 10 },
  restaurant: { fontSize: 16, fontWeight: "600" },
  location: { fontSize: 13, color: "#555" },
  menu: { fontSize: 13, color: "#d33", marginTop: 2 },
  items: { fontSize: 14, color: "#333", marginTop: 10 },
  date: { fontSize: 13, color: "#666", marginTop: 5 },
  price: { fontSize: 15, fontWeight: "600", marginTop: 5 },
  delivered: { color: "green", marginTop: 5, fontWeight: "500" },
  failed: { color: "red", marginTop: 5, fontWeight: "500" },
  refund: { color: "green", marginTop: 5, fontWeight: "500" },
  extra: { fontSize: 12, color: "#555" },
  reorderBtn: {
    marginTop: 10,
    backgroundColor: "#ff2e5d",
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: "center",
  },
  reorderText: { color: "#fff", fontWeight: "600" },
});
