// // BookingScreen.tsx
// import React, { useState, useRef, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Animated,
//   Image,
// } from "react-native";
// import Icon from "react-native-vector-icons/Ionicons";
// import { PanGestureHandler, State } from "react-native-gesture-handler";
// import { COLORS } from "../theme/color"; // ✅ your theme import

// const BookingScreen = ({ navigation }: any) => {
//   const [activeTab, setActiveTab] = useState("All");
//   const tabs = ["All"]; //, "Table booking", "Experiences"

//   const fadeAnim = useRef(new Animated.Value(1)).current;
//   const slideAnim = useRef(new Animated.Value(0)).current;
//   const scaleAnim = useRef(new Animated.Value(1)).current;

//   useEffect(() => {
//     Animated.sequence([
//       Animated.parallel([
//         Animated.timing(fadeAnim, {
//           toValue: 0,
//           duration: 200,
//           useNativeDriver: true,
//         }),
//         Animated.timing(slideAnim, {
//           toValue: -50,
//           duration: 200,
//           useNativeDriver: true,
//         }),
//       ]),
//       Animated.parallel([
//         Animated.timing(fadeAnim, {
//           toValue: 1,
//           duration: 300,
//           useNativeDriver: true,
//         }),
//         Animated.timing(slideAnim, {
//           toValue: 0,
//           duration: 300,
//           useNativeDriver: true,
//         }),
//       ]),
//     ]).start();

//     Animated.sequence([
//       Animated.timing(scaleAnim, {
//         toValue: 0.95,
//         duration: 150,
//         useNativeDriver: true,
//       }),
//       Animated.timing(scaleAnim, {
//         toValue: 1,
//         duration: 150,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   }, [activeTab]);

//   const onGestureEvent = () => {};

//   const onHandlerStateChange = (event: any) => {
//     if (event.nativeEvent.state === State.END) {
//       const { translationX, velocityX } = event.nativeEvent;

//       const threshold = 50;
//       const minVelocity = 500;
//       const index = tabs.indexOf(activeTab);

//       if (Math.abs(translationX) > threshold && Math.abs(velocityX) > minVelocity) {
//         if (translationX > 0) {
//           const prev = Math.max(0, index - 1);
//           setActiveTab(tabs[prev]);
//         } else {
//           const next = Math.min(tabs.length - 1, index + 1);
//           setActiveTab(tabs[next]);
//         }
//       }
//     }
//   };

//   const renderTab = (tab: string) => {
//     const isActive = activeTab === tab;

//     return (
//       <TouchableOpacity
//         key={tab}
//         style={styles.tabButton}
//         onPress={() => setActiveTab(tab)}
//       >
//         <Animated.Text
//           style={[
//             styles.tabText,
//             isActive && styles.activeTabText,
//             {
//               transform: [{ scale: isActive ? 1.05 : 1 }],
//             },
//           ]}
//         >
//           {tab}
//         </Animated.Text>

//         {isActive && <View style={styles.activeLine} />}
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <Animated.View style={styles.header}>
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           style={styles.backButton}
//         >
//           <Icon name="arrow-back" size={24} color={COLORS.textPrimary} />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Your Favorites</Text>
//       </Animated.View>

//       {/* Tabs */}
//       <View style={styles.tabRow}>{tabs.map((t) => renderTab(t))}</View>

//       {/* Swipeable Content */}
//       <PanGestureHandler
//         onGestureEvent={onGestureEvent}
//         onHandlerStateChange={onHandlerStateChange}
//       >
//         <Animated.View
//           style={[
//             styles.emptyContainer,
//             {
//               opacity: fadeAnim,
//               transform: [{ translateX: slideAnim }, { scale: scaleAnim }],
//             },
//           ]}
//         >
//           <Animated.Image
//             source={require("../assets/booking.webp")}
//             style={[
//               styles.image,
//               {
//                 transform: [
//                   {
//                     scale: fadeAnim.interpolate({
//                       inputRange: [0, 1],
//                       outputRange: [0.8, 1],
//                     }),
//                   },
//                 ],
//               },
//             ]}
//           />
//           <Animated.Text style={[styles.emptyText]}>
//             You have no Favorites yet!
//           </Animated.Text>
//         </Animated.View>
//       </PanGestureHandler>

//       {/* Watermark */}
//       <Text style={styles.watermark}>Restro</Text>
//     </View>
//   );
// };

// export default BookingScreen;

// /* ---------------------- THEMED STYLES ---------------------- */

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.white,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 15,
//     backgroundColor: COLORS.white,
//     elevation: 2,
//   },
//   backButton: {
//     padding: 8,
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     marginLeft: 10,
//     color: COLORS.textPrimary,
//   },

//   tabRow: {
//     flexDirection: "row",
//     backgroundColor: COLORS.white,
//     elevation: 2,
//   },
//   tabButton: {
//     flex: 1,
//     alignItems: "center",
//     paddingVertical: 12,
//   },
//   tabText: {
//     fontSize: 14,
//     color: COLORS.muted,
//   },
//   activeTabText: {
//     color: COLORS.primary,
//     fontWeight: "700",
//   },
//   activeLine: {
//     marginTop: 4,
//     height: 2,
//     backgroundColor: COLORS.primary,
//     width: "100%",
//   },

//   emptyContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   image: {
//     width: 130,
//     height: 130,
//     resizeMode: "contain",
//     marginBottom: 20,
//   },
//   emptyText: {
//     fontSize: 16,
//     color: COLORS.textSecondary,
//     marginTop: 10,
//     fontWeight: "500",
//   },

//   watermark: {
//     position: "absolute",
//     bottom: 20,
//     left: 20,
//     fontSize: 20,
//     color: COLORS.primary + "11", // subtle watermark
//     fontWeight: "700",
//   },
// });


// BookingScreen.tsx
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { COLORS } from "../theme/color"; // ✅ your theme import
import { SafeAreaView } from "react-native-safe-area-context";

const BookingScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState("All");
  const tabs = ["All"]; //, "Table booking", "Experiences"

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: -20, // Reduced slide distance for subtler effect
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.98,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, [activeTab]);

  const onGestureEvent = () => {};

  const onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      const { translationX, velocityX } = event.nativeEvent;

      const threshold = 50;
      const minVelocity = 500;
      const index = tabs.indexOf(activeTab);

      if (Math.abs(translationX) > threshold && Math.abs(velocityX) > minVelocity) {
        if (translationX > 0) {
          const prev = Math.max(0, index - 1);
          setActiveTab(tabs[prev]);
        } else {
          const next = Math.min(tabs.length - 1, index + 1);
          setActiveTab(tabs[next]);
        }
      }
    }
  };

  const renderTab = (tab: string) => {
    const isActive = activeTab === tab;

    return (
      <TouchableOpacity
        key={tab}
        style={[styles.tabButton, isActive && styles.activeTabButton]}
        onPress={() => setActiveTab(tab)}
        activeOpacity={0.8}
      >
        <Animated.Text
          style={[
            styles.tabText,
            isActive && styles.activeTabText,
            {
              transform: [{ scale: isActive ? 1 : 1 }],
            },
          ]}
        >
          {tab}
        </Animated.Text>
      </TouchableOpacity>
    );
  };

  return (
    // Replaced View with SafeAreaView
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <Animated.View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color="#1C1C1C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Favorites</Text>
        <TouchableOpacity style={styles.filterIcon}>
             <Icon name="filter-circle-outline" size={26} color="#1C1C1C" />
        </TouchableOpacity>
      </Animated.View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <View style={styles.tabRow}>{tabs.map((t) => renderTab(t))}</View>
      </View>

      {/* Swipeable Content */}
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <Animated.View
          style={[
            styles.contentContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateX: slideAnim }, { scale: scaleAnim }],
            },
          ]}
        >
          <View style={styles.emptyStateWrapper}>
            <View style={styles.imageBgCircle}>
                <Animated.Image
                    source={require("../assets/booking.webp")}
                    style={[
                    styles.image,
                    {
                        transform: [
                        {
                            scale: fadeAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0.9, 1],
                            }),
                        },
                        ],
                    },
                    ]}
                />
            </View>
            
            <Animated.Text style={styles.emptyTitle}>
              No Favorites Yet
            </Animated.Text>
            
            <Animated.Text style={styles.emptySubtitle}>
              You haven't marked any restaurants as favorites. Explore now to find your next meal!
            </Animated.Text>

            <TouchableOpacity style={styles.exploreBtn} activeOpacity={0.8}>
                <Text style={styles.exploreBtnText}>Explore Restaurants</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </PanGestureHandler>

      {/* Watermark (Stylized) */}
      <View style={styles.watermarkContainer}>
         <Text style={styles.watermark}>Restro</Text>
      </View>
    </SafeAreaView>
  );
};

export default BookingScreen;

/* ---------------------- MODERN THEMED STYLES ---------------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB', // Very light grey/blue background
  },
  
  /* Header */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    zIndex: 10,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1C1C1C",
    letterSpacing: 0.5,
  },
  filterIcon: {
      padding: 4,
  },

  /* Tabs (Pill Style) */
  tabContainer: {
      backgroundColor: '#fff',
      paddingVertical: 12,
      paddingHorizontal: 20,
  },
  tabRow: {
    flexDirection: "row",
    gap: 12,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  activeTabButton: {
    backgroundColor: COLORS.primary, // Primary Color Background
    borderColor: COLORS.primary,
    elevation: 3,
    shadowColor: COLORS.primary,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  tabText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "600",
  },
  activeTabText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  /* Empty State */
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateWrapper: {
      alignItems: 'center',
      paddingHorizontal: 40,
      marginTop: -60, // Visual adjustment to center properly
  },
  imageBgCircle: {
      width: 180,
      height: 180,
      borderRadius: 90,
      backgroundColor: '#FFF',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 24,
      elevation: 4,
      shadowColor: "#000",
      shadowOffset: {width: 0, height: 10},
      shadowOpacity: 0.05,
      shadowRadius: 10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1C1C1C",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 30,
  },
  exploreBtn: {
      backgroundColor: COLORS.primary,
      paddingVertical: 14,
      paddingHorizontal: 32,
      borderRadius: 14,
      elevation: 5,
      shadowColor: COLORS.primary,
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.3,
      shadowRadius: 8,
  },
  exploreBtnText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '700',
  },

  /* Watermark */
  watermarkContainer: {
      position: "absolute",
      bottom: 30,
      alignSelf: 'center',
      opacity: 0.1,
  },
  watermark: {
    fontSize: 32,
    color: "#000",
    fontWeight: "900",
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
});