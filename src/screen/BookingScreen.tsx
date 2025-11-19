// // BookingScreen.tsx
// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
// } from "react-native";
// import Icon from "react-native-vector-icons/Ionicons";

// const BookingScreen = ({ navigation }: any) => {
//   const [activeTab, setActiveTab] = useState("All");

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Icon name="arrow-back" size={24} color="#000" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Your bookings</Text>
//       </View>

//       {/* Tabs */}
//       <View style={styles.tabRow}>
//         {["All", "Table booking", "Experiences"].map((tab) => (
//           <TouchableOpacity
//             key={tab}
//             style={styles.tabButton}
//             onPress={() => setActiveTab(tab)}
//           >
//             <Text
//               style={[
//                 styles.tabText,
//                 activeTab === tab && styles.activeTabText,
//               ]}
//             >
   
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Empty State */}
//       <View style={styles.emptyContainer}>
//         <Image
//           source={require("../assets/food.jpg")} // <- add your illustration here
//           style={styles.image}
//         />
//         <Text style={styles.emptyText}>You have no bookings yet!</Text>
//       </View>

//       {/* Watermark with shadow */}
//       <Text style={styles.watermark}>zomato</Text>
//     </View>
//   );
// };

// export default BookingScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f9f9f9",
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 15,
//     backgroundColor: "#fff",
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     marginLeft: 10,
//   },
//   tabRow: {
//     flexDirection: "row",
//     backgroundColor: "#fff",
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//   },
//   tabButton: {
//     flex: 1,
//     alignItems: "center",
//     paddingVertical: 12,
//   },
//   tabText: {
//     fontSize: 14,
//     color: "#666",
//   },
//   activeTabText: {
//     color: "#000",
//     fontWeight: "600",
//   },
//   activeLine: {
//     marginTop: 4,
//     height: 2,
//     backgroundColor: "red",
//     width: "100%",
//   },
//   emptyContainer: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   image: {
//     width: 120,
//     height: 120,
//     resizeMode: "contain",
//     marginBottom: 15,
//   },
//   emptyText: {
//     fontSize: 16,
//     color: "#333",
//     marginTop: 10,
//   },
//   watermark: {
//     position: "absolute",
//     bottom: 20,
//     left: 20,
//     fontSize: 20,
//     color: "rgba(0,0,0,0.1)",
//     fontWeight: "700",
//     textShadowColor: "rgba(0,0,0,0.2)",
//     textShadowOffset: { width: 1, height: 1 },
//     textShadowRadius: 2,
//   },
// });


// BookingScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const BookingScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your bookings</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabRow}>
        {["All", "Table booking", "Experiences"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={styles.tabButton}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
            {activeTab === tab && <View style={styles.activeLine} />}
          </TouchableOpacity>
        ))}
      </View>

      {/* Empty State */}
      <View style={styles.emptyContainer}>
        <Image
          source={require("../assets/food.jpg")} // update with your own image
          style={styles.image}
        />
        <Text style={styles.emptyText}>You have no bookings yet!</Text>
      </View>

      {/* Watermark with shadow */}
      <Text style={styles.watermark}>zomato</Text>
    </View>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
  },
  tabRow: {
    flexDirection: "row",
    backgroundColor: "#fff",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
  },
  tabText: {
    fontSize: 14,
    color: "#666",
  },
  activeTabText: {
    color: "#000",
    fontWeight: "600",
  },
  activeLine: {
    marginTop: 4,
    height: 2,
    backgroundColor: "red",
    width: "100%",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 15,
  },
  emptyText: {
    fontSize: 16,
    color: "#333",
    marginTop: 10,
  },
  watermark: {
    position: "absolute",
    bottom: 20,
    left: 20,
    fontSize: 20,
    color: "rgba(0,0,0,0.1)",
    fontWeight: "700",
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
