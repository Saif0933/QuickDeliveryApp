

import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
// 1. Import useNavigation
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get("window");

const OrderPlacedScreen: React.FC = () => {
  // 2. Initialize navigation
  const navigation = useNavigation<any>(); 

  // --- Animation Values ---
  const circleScale = useRef(new Animated.Value(0)).current; 
  
  // Custom Checkmark Lines
  const checkMark1 = useRef(new Animated.Value(0)).current; // Short stroke
  const checkMark2 = useRef(new Animated.Value(0)).current; // Long stroke

  // Text Animations
  const textOpacity = useRef(new Animated.Value(0)).current; 
  const textTranslate = useRef(new Animated.Value(20)).current; 

  // --- NEW: Buttons Animation ---
  const buttonsOpacity = useRef(new Animated.Value(0)).current;
  const buttonsTranslate = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.sequence([
      // 1. Pop the Green Circle
      Animated.spring(circleScale, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),

      // 2. Draw the Checkmark (Line by Line)
      Animated.sequence([
        // Draw Short Line
        Animated.timing(checkMark1, {
          toValue: 1, 
          duration: 100, // Fast stroke
          easing: Easing.linear,
          useNativeDriver: false, // height/width requires false
        }),
        // Draw Long Line
        Animated.timing(checkMark2, {
          toValue: 1,
          duration: 150, // Slightly longer stroke
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ]),

      // 3. Slide Up Address & Buttons
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(textTranslate, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        // Animate Buttons slightly after text starts or parallel
        Animated.timing(buttonsOpacity, {
            toValue: 1,
            duration: 500,
            delay: 200, // Small delay for staggering effect
            useNativeDriver: true,
        }),
        Animated.timing(buttonsTranslate, {
            toValue: 0,
            duration: 500,
            delay: 200,
            useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  // Interpolate widths/heights for the drawing effect
  const shortLineHeight = checkMark1.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 18], // Height of short part
  });

  const longLineWidth = checkMark2.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 35], // Width of long part
  });

  return (
    <View style={styles.container}>
      
      {/* Green Circle Container */}
      <Animated.View
        style={[
          styles.circle,
          {
            transform: [{ scale: circleScale }],
          },
        ]}
      >
        {/* CUSTOM DRAWING CHECKMARK */}
        {/* We rotate a container -45deg so vertical/horizontal lines look like a check */}
        <View style={styles.checkContainer}>
            {/* Short Vertical Line (Draws down) */}
            <Animated.View 
                style={[
                    styles.checkLine, 
                    { 
                        height: shortLineHeight, 
                        width: 5, // Thickness
                        position: 'absolute',
                        left: 0,
                        bottom: 0,
                    }
                ]} 
            />
            
            {/* Long Horizontal Line (Draws right) */}
            <Animated.View 
                style={[
                    styles.checkLine, 
                    { 
                        width: longLineWidth, 
                        height: 5, // Thickness
                        position: 'absolute',
                        left: 0,
                        bottom: 0, 
                    }
                ]} 
            />
        </View>
      </Animated.View>

      {/* Address Section */}
      <Animated.View
        style={{
          opacity: textOpacity,
          transform: [{ translateY: textTranslate }],
          marginTop: 40,
        }}
      >
        <View style={styles.row}>
          <Ionicons name="location" size={24} color="#ff4d4d" />
          <Text style={styles.locationTitle}> Order Placed Successfully </Text>
        </View>

        {/* <Text style={styles.address}>
          Lowadih, virat nagar, malahcrochoa, 2nd transformer, Ranchi,
          Mahabir Colony, Virat Nagar
        </Text> */}
      </Animated.View>

      {/* --- NEW: Action Buttons --- */}
      <Animated.View
        style={{
            opacity: buttonsOpacity,
            transform: [{ translateY: buttonsTranslate }],
            marginTop: 40,
            width: '100%',
            alignItems: 'center',
        }}
      >
        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('OrderTrackingScreen')}>
            <Text style={styles.primaryButtonText}>Track My Order</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('OrderDetailsScreen')}>
            <Text style={styles.secondaryButtonText}>Order Details</Text>
        </TouchableOpacity>
      </Animated.View>

    </View>
  );
};

export default OrderPlacedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#27AE60",
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  // Container for the checkmark lines
  checkContainer: {
      width: 40,  // Approx size of the checkmark area
      height: 25, 
      transform: [{ rotate: '-45deg' }], // Rotate to make L shape look like Check
      marginBottom: 10, // Adjust centering visually
      marginLeft: -5
  },
  checkLine: {
      backgroundColor: '#fff',
      borderRadius: 2
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
  address: {
    color: "#D9D9D9",
    textAlign: "center",
    fontSize: 15,
    lineHeight: 24,
    fontWeight: "500",
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