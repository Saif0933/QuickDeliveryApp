
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get("window");

const OrderPlacedScreen: React.FC = () => {
  // Initialize navigation
  const navigation = useNavigation<any>(); 

  // --- Animation Values ---
  const textOpacity = useRef(new Animated.Value(0)).current; 
  const textTranslate = useRef(new Animated.Value(20)).current; 

  // --- Buttons Animation ---
  const buttonsOpacity = useRef(new Animated.Value(0)).current;
  const buttonsTranslate = useRef(new Animated.Value(20)).current;

  useEffect(() => {
      // Slide Up Address & Buttons
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(textTranslate, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(buttonsOpacity, {
            toValue: 1,
            duration: 200,
            delay: 200, 
            useNativeDriver: true,
        }),
        Animated.timing(buttonsTranslate, {
            toValue: 0,
            duration: 200,
            delay: 200,
            useNativeDriver: true,
        }),
      ]).start(); 

      // --- NEW: Auto-navigation after 25 seconds ---
      const timer = setTimeout(() => {
        navigation.replace('OrderDetailsScreen');
      }, 2500);

      // Cleanup timer on unmount
      return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground 
      source={require('../../assets/background.jpeg')} // Update this path to your image
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.darkOverlay} />

      {/* Lottie Animation */}
      <LottieView 
          source={require('../../assets/Success.json')} 
          autoPlay
          loop={false}
          style={styles.successImage}
          resizeMode="contain"
      />

      {/* Address Section */}
      <Animated.View
        style={{
          opacity: textOpacity,
          transform: [{ translateY: textTranslate }],
          marginTop: 10,
        }}
      >
        <View style={styles.row}>
          <Ionicons name="location" size={24} color="#ff4d4d" />
          <Text style={styles.locationTitle}> Order Placed Successfully </Text>
        </View>
      </Animated.View>

      {/* --- Action Buttons Removed --- */}

    </ImageBackground>
  );
};

export default OrderPlacedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(26, 26, 26, 0.9)',
  },
  successImage: {
      width: 300,
      height: 300,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  locationTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 0.5,
  },
  // --- BUTTON STYLES ---
  primaryButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 5,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});