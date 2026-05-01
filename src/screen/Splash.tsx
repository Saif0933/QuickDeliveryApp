import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Easing,
  StatusBar,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { RootStack } from '../types/types';
import { useAuth } from '../Context/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const COLORS = {
  primary: '#0F172A', // Deep Navy
  accent: '#7C3AED',  // Vibrant Purple
  secondary: '#F8FAFC', // Off White
  glow: 'rgba(124, 58, 237, 0.3)',
};

const Splash = ({
  navigation,
}: {
  navigation: NavigationProp<RootStack>;
}) => {
  const { isAuthenticated, hasSkippedLogin } = useAuth();

  // Animation values
  const logoScale = useRef(new Animated.Value(0.5)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoRotate = useRef(new Animated.Value(0)).current;
  
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(20)).current;
  
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const bgScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // 1. Background Pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(bgScale, {
          toValue: 1.1,
          duration: 4000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(bgScale, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ])
    ).start();

    // 2. Main Entrance Timeline
    Animated.sequence([
      // Logo Entrance
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(logoRotate, {
          toValue: 1,
          duration: 1000,
          easing: Easing.out(Easing.back(1.5)),
          useNativeDriver: true,
        }),
      ]),
      // Text Entrance
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(textTranslateY, {
          toValue: 0,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      // Tagline Entrance
      Animated.timing(taglineOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // 3. Navigation Timing
    const timer = setTimeout(() => {
      if (isAuthenticated || hasSkippedLogin) {
        navigation.reset({ index: 0, routes: [{ name: "Home" }] });
      } else {
        navigation.navigate("Login");
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isAuthenticated, hasSkippedLogin, navigation]);

  const spin = logoRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['-45deg', '0deg'],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* Decorative Background Elements */}
      <Animated.View 
        style={[
          styles.bgBlob, 
          { transform: [{ scale: bgScale }] }
        ]} 
      />
      <View style={styles.overlay} />

      {/* Main Content */}
      <View style={styles.content}>
        <Animated.View
          style={[
            styles.logoWrapper,
            {
              opacity: logoOpacity,
              transform: [
                { scale: logoScale },
                { rotate: spin }
              ],
            },
          ]}
        >
          <View style={styles.logoCircle}>
            <Ionicons name="shirt-outline" size={60} color="#FFF" />
          </View>
          <View style={styles.logoGlow} />
        </Animated.View>

        <Animated.View
          style={[
            styles.textContainer,
            {
              opacity: textOpacity,
              transform: [{ translateY: textTranslateY }],
            },
          ]}
        >
          <Text style={styles.brandName}>30 min shop</Text>
          <View style={styles.underline} />
        </Animated.View>

        <Animated.View style={[styles.taglineWrapper, { opacity: taglineOpacity }]}>
          <Text style={styles.tagline}>Elevate Your Style. Every Day.</Text>
        </Animated.View>
      </View>

      {/* Subtle Footer */}
      <Animated.View style={[styles.footer, { opacity: taglineOpacity }]}>
        <View style={styles.loadingDots}>
          <View style={styles.dot} />
          <View style={[styles.dot, { opacity: 0.5 }]} />
          <View style={[styles.dot, { opacity: 0.2 }]} />
        </View>
      </Animated.View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgBlob: {
    position: 'absolute',
    width: width * 1.5,
    height: width * 1.5,
    borderRadius: width * 0.75,
    backgroundColor: COLORS.accent,
    opacity: 0.1,
    top: -width * 0.2,
    left: -width * 0.2,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.4)', // Dark overlay for depth
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  logoWrapper: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  logoGlow: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: COLORS.accent,
    opacity: 0.2,
    zIndex: 1,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  brandName: {
    fontSize: 40, // Slightly smaller for the longer phrase
    fontWeight: '900',
    color: '#FFF',
    letterSpacing: 6,
    marginRight: -6, // Offset to fix off-centering caused by letterSpacing
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 10,
    textTransform: 'uppercase',
  },
  underline: {
    width: 40,
    height: 4,
    backgroundColor: COLORS.accent,
    marginTop: 5,
    borderRadius: 2,
  },
  taglineWrapper: {
    marginTop: 15,
  },
  tagline: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '500',
    letterSpacing: 2,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 50,
  },
  loadingDots: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFF',
    marginHorizontal: 4,
  },
});
