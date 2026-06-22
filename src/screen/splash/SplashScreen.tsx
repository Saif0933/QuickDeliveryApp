import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
  Dimensions,
  Platform,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

export default function SplashScreen({ navigation }: any) {
  const logoScale = useRef(new Animated.Value(0.3)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;

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
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Folded clothes in the four corners matching mockup */}
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&auto=format&fit=crop&q=80' }}
        style={styles.topLeftImage}
      />
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&auto=format&fit=crop&q=80' }}
        style={styles.topRightImage}
      />
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1602810316498-ab67cf68c8e1?w=500&auto=format&fit=crop&q=80' }}
        style={styles.bottomLeftImage}
      />
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&auto=format&fit=crop&q=80' }}
        style={styles.bottomRightImage}
      />

      {/* Center Hanger Logo, brand name and subtitle */}
      <Animated.View style={[styles.centerContainer, { opacity: logoOpacity }]}>
        <Animated.View style={[styles.hangerLogoContainer, { transform: [{ scale: logoScale }] }]}>
          {/* Hook */}
          <View style={{
            width: 22,
            height: 22,
            borderRadius: 11,
            borderWidth: 2.5,
            borderColor: '#7c3aed',
            borderBottomWidth: 0,
            borderLeftColor: 'transparent',
            transform: [{ rotate: '-35deg' }, { translateY: 3 }],
          }} />
          {/* Base triangle */}
          <View style={{
            width: 80,
            height: 40,
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginTop: -4,
          }}>
            {/* Triangle left side */}
            <View style={{
              position: 'absolute',
              width: 58,
              height: 2.5,
              backgroundColor: '#7c3aed',
              transform: [{ rotate: '27deg' }, { translateX: -14 }, { translateY: 10 }],
              borderRadius: 2,
            }} />
            {/* Triangle right side */}
            <View style={{
              position: 'absolute',
              width: 58,
              height: 2.5,
              backgroundColor: '#7c3aed',
              transform: [{ rotate: '-27deg' }, { translateX: 14 }, { translateY: 10 }],
              borderRadius: 2,
            }} />
            {/* Triangle bottom side */}
            <View style={{
              position: 'absolute',
              bottom: 0,
              width: 80,
              height: 2.5,
              backgroundColor: '#7c3aed',
              borderRadius: 2,
            }} />
          </View>
        </Animated.View>

        {/* Brand Name "Trendly" with violet accent */}
        <Animated.View style={[styles.brandNameWrapper, { opacity: titleOpacity }]}>
          <Text style={styles.brandNameText}>Trendly</Text>
          <View style={styles.yTick} />
        </Animated.View>

        {/* Subtitle */}
        <Animated.Text style={[styles.subtitleText, { opacity: titleOpacity }]}>
          FASHION FOR EVERY YOU
        </Animated.Text>
      </Animated.View>

      {/* Three columns: style, way, everyday */}
      <Animated.View style={[styles.columnsContainer, { opacity: subtitleOpacity }]}>
        <View style={styles.columnItem}>
          <MaterialIcons name="favorite-border" size={22} color="#7c3aed" />
          <Text style={styles.columnLabel}>YOUR STYLE</Text>
        </View>

        <View style={styles.verticalDivider} />

        <View style={styles.columnItem}>
          <MaterialIcons name="dry-cleaning" size={22} color="#7c3aed" />
          <Text style={styles.columnLabel}>YOUR WAY</Text>
        </View>

        <View style={styles.verticalDivider} />

        <View style={styles.columnItem}>
          <MaterialIcons name="local-mall" size={22} color="#7c3aed" />
          <Text style={styles.columnLabel}>EVERYDAY</Text>
        </View>
      </Animated.View>

      {/* Bottom description and pagination dots */}
      <Animated.View style={[styles.bottomSection, { opacity: subtitleOpacity }]}>
        <Text style={styles.bottomDescriptionText}>
          Style that speaks you.{'\n'}
          <Text style={{ color: '#7c3aed', fontWeight: '900' }}>Quality</Text> you can trust.
        </Text>

        <View style={styles.paginationContainer}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topLeftImage: {
    position: 'absolute',
    top: -50,
    left: -60,
    width: 210,
    height: 270,
    transform: [{ rotate: '15deg' }],
    resizeMode: 'contain',
    opacity: 0.95,
  },
  topRightImage: {
    position: 'absolute',
    top: -30,
    right: -60,
    width: 210,
    height: 270,
    transform: [{ rotate: '-15deg' }],
    resizeMode: 'contain',
    opacity: 0.95,
  },
  bottomLeftImage: {
    position: 'absolute',
    bottom: -60,
    left: -65,
    width: 230,
    height: 290,
    transform: [{ rotate: '-15deg' }],
    resizeMode: 'contain',
    opacity: 0.95,
  },
  bottomRightImage: {
    position: 'absolute',
    bottom: -30,
    right: -55,
    width: 230,
    height: 290,
    transform: [{ rotate: '15deg' }],
    resizeMode: 'contain',
    opacity: 0.95,
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -20,
  },
  hangerLogoContainer: {
    width: 80,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  brandNameWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    position: 'relative',
    marginTop: 10,
  },
  brandNameText: {
    fontSize: 48,
    fontWeight: '900',
    color: '#0f172a',
    letterSpacing: -1,
  },
  yTick: {
    position: 'absolute',
    right: -1,
    top: 15,
    width: 7,
    height: 10,
    backgroundColor: '#7c3aed',
    transform: [{ rotate: '25deg' }],
    borderRadius: 1.5,
  },
  subtitleText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#475569',
    letterSpacing: 3,
    marginTop: 12,
    textAlign: 'center',
  },
  columnsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    width: '100%',
  },
  columnItem: {
    alignItems: 'center',
    width: 90,
  },
  columnLabel: {
    fontSize: 8.5,
    fontWeight: '900',
    color: '#475569',
    marginTop: 8,
    letterSpacing: 0.5,
  },
  verticalDivider: {
    width: 1,
    height: 32,
    backgroundColor: '#cbd5e1',
    opacity: 0.5,
  },
  bottomSection: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  bottomDescriptionText: {
    fontSize: 13.5,
    color: '#475569',
    textAlign: 'center',
    fontWeight: '700',
    lineHeight: 18,
    letterSpacing: 0.2,
  },
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#e2e8f0',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#7c3aed',
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
});
