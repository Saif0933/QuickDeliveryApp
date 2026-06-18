import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

export default function SplashScreen({ navigation }: any) {
  const logoScale = useRef(new Animated.Value(0.3)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const progressWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Run animations in sequence and parallel
    Animated.sequence([
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1.1,
          friction: 6,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1.0,
          friction: 4,
          tension: 50,
          useNativeDriver: true,
        }),
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(subtitleOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(progressWidth, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }),
    ]).start();

    // Check token and navigate after 3.2 seconds
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setTimeout(() => {
          if (token) {
            navigation.replace('Home');
          } else {
            navigation.replace('Login');
          }
        }, 3200);
      } catch (error) {
        console.error('Splash screen authentication check error:', error);
        setTimeout(() => {
          navigation.replace('Login');
        }, 3200);
      }
    };

    checkAuth();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF7F2" />
      
      <View style={styles.content}>
        {/* Hanger Logo with scale/opacity animation */}
        <Animated.View style={[
          styles.logoWrapper,
          {
            opacity: logoOpacity,
            transform: [{ scale: logoScale }],
          }
        ]}>
          <View style={styles.hangerIconContainer}>
            {/* Hook curve */}
            <View style={{
              width: 16,
              height: 16,
              borderRadius: 8,
              borderWidth: 2,
              borderColor: '#1e2022',
              borderBottomWidth: 0,
              borderLeftColor: 'transparent',
              transform: [{ rotate: '-45deg' }, { translateY: 2 }],
            }} />
            {/* Hanger base triangle */}
            <View style={{
              width: 52,
              height: 26,
              borderWidth: 2,
              borderColor: '#1e2022',
              borderBottomWidth: 2,
              borderLeftColor: 'transparent',
              borderRightColor: 'transparent',
              borderTopColor: 'transparent',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
              {/* Left shoulder line */}
              <View style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 31,
                height: 2,
                backgroundColor: '#1e2022',
                transform: [{ rotate: '26deg' }, { translateX: 2 }, { translateY: 12 }],
              }} />
              {/* Right shoulder line */}
              <View style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: 31,
                height: 2,
                backgroundColor: '#1e2022',
                transform: [{ rotate: '-26deg' }, { translateX: -2 }, { translateY: 12 }],
              }} />
            </View>
          </View>
        </Animated.View>

        {/* Text Group */}
        <View style={styles.textContainer}>
          <Animated.Text style={[styles.logoTitle, { opacity: titleOpacity }]}>
            THREADORA
          </Animated.Text>
          <Animated.Text style={[styles.logoSubtitle, { opacity: subtitleOpacity }]}>
            — STYLE FOR YOU —
          </Animated.Text>
        </View>
      </View>

      {/* Modern, elegant line progress loader at the bottom */}
      <View style={styles.loaderContainer}>
        <Animated.View style={[
          styles.loaderBar,
          {
            width: progressWidth.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }),
          }
        ]} />
      </View>

      <Text style={styles.footerText}>Version 1.0.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF7F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  hangerIconContainer: {
    width: 80,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  logoTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e2022',
    letterSpacing: 8,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  logoSubtitle: {
    fontSize: 10,
    color: '#A87C53',
    letterSpacing: 4,
    marginTop: 8,
    fontWeight: '600',
  },
  loaderContainer: {
    position: 'absolute',
    bottom: 100,
    width: width * 0.4,
    height: 2,
    backgroundColor: '#E6DFD5',
    borderRadius: 1,
    overflow: 'hidden',
  },
  loaderBar: {
    height: '100%',
    backgroundColor: '#A87C53',
  },
  footerText: {
    position: 'absolute',
    bottom: 40,
    fontSize: 11,
    color: '#7a7f9a',
    letterSpacing: 1,
  },
});
