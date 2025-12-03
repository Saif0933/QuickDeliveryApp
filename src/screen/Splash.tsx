
// import React, { useEffect, useRef } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Animated,
//   Dimensions,
//   Easing,
// } from 'react-native';
// import { NavigationProp } from '@react-navigation/native';
// import { RootStack } from '../types/types';
// import { useAuth } from '../Context/AuthContext';

// const { width, height } = Dimensions.get('window');

// const COLORS = {
//   primary: '#0066CC',
//   secondary: '#E3F2FD',
//   accent: '#00A8E8',
//   textPrimary: '#FFFFFF',
//   textSecondary: '#0066CC',
// };

// const Splash = ({
//   navigation,
// }: {
//   navigation: NavigationProp<RootStack>;
// }) => {
//   const logoScale = useRef(new Animated.Value(0)).current;
//   const textOpacity = useRef(new Animated.Value(0)).current;
//   const textTranslateY = useRef(new Animated.Value(40)).current;
//   const taglineOpacity = useRef(new Animated.Value(0)).current;
//   const pulseAnim = useRef(new Animated.Value(1)).current;
//   const floatAnim = useRef(new Animated.Value(0)).current;

//   const { isAuthenticated, hasSkippedLogin } = useAuth();

//   console.log({isAuthenticated, hasSkippedLogin});

//   useEffect(() => {
//     // Logo entrance animation
//     Animated.timing(logoScale, {
//       toValue: 1,
//       duration: 900,
//       easing: Easing.out(Easing.cubic),
//       useNativeDriver: true,
//     }).start();

//     // Text animation
//     Animated.parallel([
//       Animated.timing(textOpacity, {
//         toValue: 1,
//         duration: 700,
//         delay: 400,
//         easing: Easing.ease,
//         useNativeDriver: true,
//       }),
//       Animated.timing(textTranslateY, {
//         toValue: 0,
//         duration: 700,
//         delay: 400,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//     ]).start();

//     // Tagline animation
//     Animated.timing(taglineOpacity, {
//       toValue: 1,
//       duration: 600,
//       delay: 1000,
//       easing: Easing.ease,
//       useNativeDriver: true,
//     }).start();

//     // Pulse animation
//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(pulseAnim, {
//           toValue: 1.1,
//           duration: 1000,
//           useNativeDriver: true,
//         }),
//         Animated.timing(pulseAnim, {
//           toValue: 1,
//           duration: 1000,
//           useNativeDriver: true,
//         }),
//       ])
//     ).start();

//     // Float animation
//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(floatAnim, {
//           toValue: -20,
//           duration: 2000,
//           useNativeDriver: true,
//         }),
//         Animated.timing(floatAnim, {
//           toValue: 0,
//           duration: 2000,
//           useNativeDriver: true,
//         }),
//       ])
//     ).start();

//     // Navigation
//     const timeout = setTimeout(() => {
//       if (isAuthenticated || hasSkippedLogin) {
//         navigation.reset({ index: 0, routes: [{ name: "Home" }] });
//       } else {
//         navigation.navigate("Login");
//       }
//     }, 3500);

//     return () => clearTimeout(timeout);
//   }, []);

//   return (
//     <View style={styles.container}>
//       {/* Background gradient effect */}
//       <View style={styles.backgroundGradient} />

//       {/* Logo */}
//       <Animated.View
//         style={[
//           styles.logoContainer,
//           {
//             transform: [
//               { scale: logoScale },
//               { translateY: floatAnim },
//             ],
//           },
//         ]}
//       >
//         <View style={styles.logoCircle}>
//           <Text style={styles.logoText}>🍽️</Text>
//         </View>
//       </Animated.View>

//       {/* Title */}
//       <Animated.View
//         style={[
//           styles.titleContainer,
//           {
//             opacity: textOpacity,
//             transform: [{ translateY: textTranslateY }],
//           },
//         ]}
//       >
//         <Text style={styles.mainTitle}>RESTRO</Text>
//       </Animated.View>

//       {/* Tagline */}
//       <Animated.View style={[styles.taglineContainer, { opacity: taglineOpacity }]}>
//         <Text style={styles.tagline}>Delivered Food, Fresh Daily</Text>
//       </Animated.View>

//       {/* Decorative dots */}
//       <View style={[styles.dot, styles.dot1]} />
//       <View style={[styles.dot, styles.dot2]} />
//       <View style={[styles.dot, styles.dot3]} />
//     </View>
//   );
// };

// export default Splash;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: COLORS.secondary,
//     overflow: 'hidden',
//   },

//   backgroundGradient: {
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//     backgroundColor: COLORS.secondary,
//   },

//   logoContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 50,
//     zIndex: 10,
//   },

//   logoCircle: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     backgroundColor: COLORS.primary,
//     alignItems: 'center',
//     justifyContent: 'center',
//     elevation: 10,
//     shadowColor: COLORS.primary,
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//   },

//   logoText: {
//     fontSize: 60,
//   },

//   titleContainer: {
//     marginBottom: 40,
//     zIndex: 10,
//   },

//   mainTitle: {
//     fontSize: 64,
//     fontWeight: '900',
//     color: COLORS.primary,
//     letterSpacing: 4,
//   },

//   taglineContainer: {
//     position: 'absolute',
//     bottom: 100,
//     alignItems: 'center',
//     zIndex: 10,
//   },

//   tagline: {
//     fontSize: 16,
//     color: COLORS.textSecondary,
//     fontWeight: '500',
//     letterSpacing: 1,
//   },

//   dot: {
//     position: 'absolute',
//     borderRadius: 50,
//   },

//   dot1: {
//     width: 12,
//     height: 12,
//     backgroundColor: COLORS.accent,
//     top: height * 0.2,
//     left: width * 0.15,
//     opacity: 0.4,
//   },

//   dot2: {
//     width: 8,
//     height: 8,
//     backgroundColor: COLORS.primary,
//     top: height * 0.7,
//     right: width * 0.1,
//     opacity: 0.3,
//   },

//   dot3: {
//     width: 10,
//     height: 10,
//     backgroundColor: COLORS.accent,
//     bottom: height * 0.25,
//     right: width * 0.15,
//     opacity: 0.35,
//   },
// });

import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { RootStack } from '../types/types';
import Video from 'react-native-video';
import { useAuth } from '../Context/AuthContext';

const { width, height } = Dimensions.get('window');

const Splash = ({ navigation }: { navigation: NavigationProp<RootStack> }) => {
  const { isAuthenticated, hasSkippedLogin } = useAuth();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isAuthenticated || hasSkippedLogin) {
        navigation.reset({ index: 0, routes: [{ name: "Home" }] });
      } else {
        navigation.navigate("Login");
      }
    }, 1000); // same as your previous delay

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <Video
        source={require('../assets/animations/restro.mp4')}
        style={styles.backgroundVideo}
        resizeMode="cover"
        repeat={false}
        muted={false}
        onEnd={() => {
          if (isAuthenticated || hasSkippedLogin) {
            navigation.reset({ index: 0, routes: [{ name: "Home" }] });
          } else {
            navigation.navigate("Login");
          }
        }}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundVideo: {
    width: width,
    height: height,
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
