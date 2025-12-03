import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const PaymentSuccessScreen: React.FC = () => {
  const scaleAnim = useRef(new Animated.Value(0)).current; // Circle grow
  const checkAnim = useRef(new Animated.Value(0)).current; // Checkmark fade
  const textAnim = useRef(new Animated.Value(0)).current; // Address fade

  useEffect(() => {
    // Step 1: Circle animation
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      tension: 80,
      useNativeDriver: true,
    }).start();

    // Step 2: Checkmark fade in
    setTimeout(() => {
      Animated.timing(checkAnim, {
        toValue: 1,
        duration: 400,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    }, 400);

    // Step 3: Address fade in
    setTimeout(() => {
      Animated.timing(textAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();
    }, 800);
  }, []);

  return (
    <View style={styles.container}>
      {/* Green animated check circle */}
      <Animated.View
        style={[
          styles.circle,
          {
            transform: [
              {
                scale: scaleAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
              },
            ],
          },
        ]}
      >
        <Animated.View style={{ opacity: checkAnim }}>
          <Ionicons name="checkmark" size={60} color="#fff" />
        </Animated.View>
      </Animated.View>

      {/* Address section */}
      <Animated.View style={{ opacity: textAnim, marginTop: 35 }}>
        <View style={styles.row}>
          <Ionicons name="location" size={22} color="#ff4d4d" />
          <Text style={styles.locationTitle}> Mahabir Colony</Text>
        </View>

        <Text style={styles.address}>
          Lowadih, virat nagar, malahcrochoa, 2nd transformer, Ranchi,
          Mahabir Colony, Virat Nagar
        </Text>
      </Animated.View>
    </View>
  );
};

export default PaymentSuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 120,
    backgroundColor: "#27AE60",
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  locationTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  address: {
    color: "#D9D9D9",
    textAlign: "center",
    marginTop: 10,
    fontSize: 15,
    lineHeight: 22,
  },
});
