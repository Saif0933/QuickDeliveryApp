// ProfileScreen.tsx
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Platform,
  Share,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useGetUserProfile } from '../api/hooks/user';
import { useAuth } from '../Context/AuthContext';
import { COLORS } from '../theme/color';
import VegMode from './VegMode';

type RootStackParamList = {
  ProfilePage: undefined;
  ZomatoMoneyPage: undefined;
  YourProfile: undefined;
  YourOrder: undefined;
  VegMode: undefined;
  AddressBookScreen: undefined;
  AboutScreen: undefined;
  ActivityScreen: undefined;
  SettingScreen: undefined;
  FeedbackScreen: undefined;
  GoldScreen: undefined;
  BookingScreen: undefined;
  AccessibilitySettings: undefined;
  Login: undefined;
  PaymentSettings: undefined;
  SupportScreen: undefined;
  ReportEmergencyScreen: undefined;
  NotificationScreen: undefined;
  AccountSettingsScreen: undefined;
  ShareApp: undefined;
  PrivacyPolicy: undefined;
  RefundPolicy: undefined;
  TermsAndConditions: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width, height } = Dimensions.get('window');
const HEADER_HEIGHT = 180; // Adjusted for the new layout

const ProfileScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [vegModeVisible, setVegModeVisible] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const { logout } = useAuth();
  const { data: userProfile } = useGetUserProfile();

  const shineAnim = useRef(new Animated.Value(-width)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Shimmer/Shine Animation
    const shineAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(shineAnim, {
          toValue: width * 1.5,
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.delay(2000),
      ])
    );

    // Breathing Pulse Animation for the border
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.03,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    );

    shineAnimation.start();
    pulseAnimation.start();

    return () => {
      shineAnimation.stop();
      pulseAnimation.stop();
    };
  }, [shineAnim, pulseAnim]);

  // --- Share Function ---
  const onShare = async () => {
    try {
      await Share.share({
        message: 'Check out this amazing food delivery app! Download now.',
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const MENU_SECTIONS = [
    {
      title: 'Your information',
      items: [
        { icon: 'book-open-page-variant-outline', label: 'Address book', onPress: () => navigation.navigate('AddressBookScreen') },
        // { icon: 'bookmark-outline', label: 'Your favourite', onPress: () => navigation.navigate('BookingScreen') },
        { icon: 'account-outline', label: 'Profile Settings', onPress: () => navigation.navigate('YourProfile') },
      ],
    },
    // {
    //   title: 'Payment and coupons',
    //   items: [
    //     { icon: 'credit-card-outline', label: 'Payment settings', onPress: () => navigation.navigate('PaymentSettings') },
    //   ],
    // },
    {
      title: 'Other Information',
      items: [
        { icon: 'share-variant-outline', label: 'Share the app', onPress: onShare },
        // { icon: 'wheelchair-accessibility', label: 'Accessibility', onPress: () => navigation.navigate('AccessibilitySettings') },
        { icon: 'information-outline', label: 'About us', onPress: () => navigation.navigate('AboutScreen') },
        // { icon: 'lock-outline', label: 'Account privacy', onPress: () => navigation.navigate('AccountSettingsScreen') },
        // { icon: 'bell-outline', label: 'Notification preferences', onPress: () => navigation.navigate('NotificationScreen') },
        { icon: 'file-document-outline', label: 'Terms & Conditions', onPress: () => navigation.navigate('TermsAndConditions') },
        { icon: 'shield-check-outline', label: 'Privacy & Policy', onPress: () => navigation.navigate('PrivacyPolicy') },
        { icon: 'cash-refund', label: 'Return & Refund Policy', onPress: () => navigation.navigate('RefundPolicy') },
        { 
          icon: 'logout', 
          label: 'Log out', 
          onPress: async () => {
            await logout();
            navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
          } 
        },
      ],
    },
  ];


  // --- Animation Interpolations ---
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT / 2],
    extrapolate: 'clamp',
  });

  const stickyTitleOpacity = scrollY.interpolate({
    inputRange: [40, 80],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const stickyHeaderElevation = scrollY.interpolate({
    inputRange: [40, 80],
    outputRange: [0, 4],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* --- BACKGROUND HEADER (Hero) --- */}
      <Animated.View
        style={[
          styles.heroContainer,
          { transform: [{ translateY: headerTranslateY }] },
        ]}
      />

      {/* --- Floating Back Button --- */}
      <TouchableOpacity
        style={styles.floatingBackButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#f3efefff" />
      </TouchableOpacity>

      {/* --- STICKY HEADER BAR --- */}
      <Animated.View
        style={[
          styles.stickyTitleContainer,
          {
            opacity: stickyTitleOpacity,
            elevation: stickyHeaderElevation,
          }
        ]}
      >
        <Text style={styles.stickyTitleText}>Profile</Text>
      </Animated.View>

      {/* --- MASK TO HIDE SCROLLING CONTENT ABOVE CARD --- */}
      <View style={styles.headerMask} />

      {/* --- STICKY USER PROFILE CARD --- */}
      <Animated.View
        style={[
          styles.userCardWrapper,
          { transform: [{ scale: pulseAnim }] }
        ]}
      >
        <LinearGradient
          colors={['#0f0f0f', '#262626', '#0f0f0f']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.userCardSticky}
        >
          {/* Main Shine Beam */}
          <Animated.View
            style={[
              styles.shineEffect,
              {
                transform: [{ translateX: shineAnim }, { rotate: '30deg' }],
              },
            ]}
          >
            <LinearGradient
              colors={['transparent', 'rgba(255, 215, 0, 0.05)', 'rgba(255, 215, 0, 0.2)', 'rgba(255, 215, 0, 0.05)', 'transparent']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ flex: 1 }}
            />
          </Animated.View>

          {/* Sharp Secondary Flare */}
          <Animated.View
            style={[
              styles.flareEffect,
              {
                transform: [{ translateX: shineAnim }, { rotate: '30deg' }],
              },
            ]}
          >
            <LinearGradient
              colors={['transparent', 'rgba(255, 255, 255, 0.4)', 'transparent']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ flex: 1 }}
            />
          </Animated.View>

          <View style={styles.userCardMain}>
          <LinearGradient
            colors={[COLORS.primary, '#8e44ad']}
            style={styles.userAvatarContainer}
          >
            {userProfile?.name ? (
              <Text style={styles.avatarLetter}>
                {userProfile.name.charAt(0).toUpperCase()}
              </Text>
            ) : (
              <MaterialCommunityIcons name="account" size={35} color="#fff" />
            )}
          </LinearGradient>
          <View style={styles.userInfoText}>
            <Text style={styles.userName}>{userProfile?.name || 'User Name'}</Text>
            <Text style={styles.userPhone}>+91 {userProfile?.mobile || '0000000000'}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('YourProfile')}>
              <Text style={styles.viewProfileBtn}>View profile ❯</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.eliteRow}>
          <View style={styles.eliteLeft}>
            <LinearGradient
              colors={['#FFD700', '#FDB931', '#FFD700']}
              style={styles.crownIconBg}
            >
              <MaterialCommunityIcons name="crown" size={14} color="#000" />
            </LinearGradient>
            <Text style={styles.eliteLabel}>Exprience Free Delivery</Text>
          </View>
          <TouchableOpacity style={styles.joinEliteBtn} onPress={() => navigation.navigate('GoldScreen')}>
            <Text style={styles.joinEliteText}> ❯ </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      </Animated.View>

      <Animated.ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        contentContainerStyle={{ paddingTop: HEADER_HEIGHT + 85 }}
      >

        {/* --- MAIN CONTENT SHEET --- */}
        <View style={styles.sheet}>
          {/* --- 3-Grid Quick Links --- */}
          <View style={styles.gridContainer}>
            <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('YourOrder')}>
              <View style={styles.gridIconContainer}>
                <MaterialCommunityIcons name="shopping-outline" size={26} color="#333" />
              </View>
              <Text style={styles.gridText}>Your orders</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('ZomatoMoneyPage')}>
              <View style={styles.gridIconContainer}>
                <MaterialCommunityIcons name="wallet-outline" size={26} color="#333" />
                <View style={styles.rupeeBadge}>
                  <Text style={styles.rupeeText}>₹</Text>
                </View>
              </View>
              <Text style={styles.gridText}>Restro Money</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('SupportScreen')}>
              <View style={styles.gridIconContainer}>
                <MaterialCommunityIcons name="message-processing-outline" size={26} color="#333" />
              </View>
              <Text style={styles.gridText}>Need help?</Text>
            </TouchableOpacity>
          </View>

          {/* --- Gold Banner --- */}
          {/* <TouchableOpacity style={styles.bannerRow} onPress={() => navigation.navigate('GoldScreen')}>
            <View style={styles.bannerLeft}>
              <MaterialCommunityIcons name="crown" size={22} color={COLORS.primary} />
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.bannerTitle}>Join Restro Elite</Text>
                <Text style={styles.bannerSubtitle}>Get free delivery & offers</Text>
              </View>
            </View>
            <View style={styles.tagContainer}>
              <Text style={styles.tagText}>NEW</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={20} color="#ccc" />
          </TouchableOpacity> */}

          {/* --- Veg Mode --- */}
          <View style={styles.toggleCard}>
            <View style={styles.toggleContent}>
              <View style={styles.toggleIconArea}>
                <MaterialCommunityIcons name={vegModeVisible ? "leaf" : "leaf-off"} size={22} color={vegModeVisible ? "green" : "#888"} />
              </View>
              <View style={styles.toggleTextArea}>
                <Text style={styles.toggleTitle}>Veg Mode</Text>
                <Text style={styles.toggleDesc}>Only show vegetarian options across the app.</Text>
                <TouchableOpacity onPress={() => navigation.navigate('VegMode')}>
                  <Text style={styles.linkText}>Know more</Text>
                </TouchableOpacity>
              </View>
              <Switch
                value={vegModeVisible}
                onValueChange={setVegModeVisible}
                trackColor={{ false: '#e0e0e0', true: '#4caf50' }}
                thumbColor={'#fff'}
              />
            </View>
          </View>

          {/* --- Render Menu Sections --- */}
          {MENU_SECTIONS.map((section, sIndex) => (
            <View key={sIndex} style={styles.sectionContainer}>
              <Text style={styles.sectionHeader}>{section.title}</Text>
              <View style={styles.listCard}>
                {section.items.map((item, iIndex) => (
                  <ListItem
                    key={iIndex}
                    icon={item.icon}
                    label={item.label}
                    onPress={item.onPress}
                    last={iIndex === section.items.length - 1}
                  />
                ))}
              </View>
            </View>
          ))}

          <View style={{ height: 100 }} />
        </View>
      </Animated.ScrollView>

      <VegMode visible={vegModeVisible} onClose={() => setVegModeVisible(false)} />
    </View>
  );
};

// List Item Component
const ListItem = ({ icon, label, onPress, last }: { icon: string, label: string, onPress?: () => void, last?: boolean }) => (
  <TouchableOpacity onPress={onPress} style={[styles.listItem, last && styles.listItemLast]}>
    <View style={styles.listIconLeft}>
      <MaterialCommunityIcons name={icon} size={22} color="#555" />
    </View>
    <View style={styles.listContent}>
      <Text style={styles.listLabel}>{label}</Text>
    </View>
    <MaterialCommunityIcons name="chevron-right" size={20} color="#ccc" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  scrollView: { flex: 1, zIndex: 1 },

  // --- BG HEADER ---
  heroContainer: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: HEADER_HEIGHT,
    backgroundColor: COLORS.primary,
    zIndex: 0,
  },

  // --- STICKY USER PROFILE CARD ---
  userCardWrapper: {
    position: 'absolute',
    top: 90,
    left: 12, right: 12,
    zIndex: 95,
  },
  userCardSticky: {
    borderRadius: 20,
    padding: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.2)', // Subtle Gold Border
    // Shadow for iOS
    shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    // Shadow for Android
    elevation: 15,
  },
  shineEffect: {
    position: 'absolute',
    top: -100,
    bottom: -100,
    width: 150, // Wide soft beam
    zIndex: 1,
  },
  flareEffect: {
    position: 'absolute',
    top: -100,
    bottom: -100,
    width: 20, // Sharp center flare
    zIndex: 2,
    marginLeft: 65, // Offset to stay inside the wide beam
  },
  avatarLetter: {
    fontSize: 26,
    fontWeight: '900',
    color: '#fff',
  },
  headerMask: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: 100,
    backgroundColor: COLORS.primary,
    zIndex: 94,
  },
  userCardMain: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfoText: { flex: 1 },
  userName: { fontSize: 24, fontWeight: '800', color: '#fff' },
  userPhone: { fontSize: 14, color: '#ccc', marginTop: 2 },
  viewProfileBtn: { fontSize: 13, color: '#eaeaea', fontWeight: '700', marginTop: 8 },
  userAvatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  crownIconBg: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 15,
  },
  eliteRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eliteLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eliteLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFD700',
    marginLeft: 6,
  },
  joinEliteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  joinEliteText: {
    fontSize: 13,
    color: '#FFD700',
    fontWeight: '700',
  },

  // --- STICKY HEADER ---
  stickyTitleContainer: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    paddingTop: Platform.OS === 'android' ? 35 : 45,
    height: Platform.OS === 'android' ? 90 : 100,
    zIndex: 90,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  stickyTitleText: { fontSize: 18, fontWeight: '700', color: '#000' },

  floatingBackButton: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 40 : 50,
    left: 16,
    zIndex: 100,
    width: 40, height: 40,
    backgroundColor: '#090808ff',
    borderRadius: 20,
    justifyContent: 'center', alignItems: 'center',
    elevation: 5,
  },

  // --- CONTENT SHEET ---
  sheet: {
    backgroundColor: '#f5f7fa',
    paddingTop: 10,
  },

  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  gridItem: {
    backgroundColor: '#fff',
    width: '31%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
  },
  gridIconContainer: { marginBottom: 8, position: 'relative' },
  gridText: { fontSize: 12, fontWeight: '600', color: '#333' },
  rupeeBadge: {
    position: 'absolute', right: -4, bottom: -2,
    backgroundColor: '#333', borderRadius: 8,
    width: 14, height: 14, justifyContent: 'center', alignItems: 'center'
  },
  rupeeText: { color: '#fff', fontSize: 9, fontWeight: 'bold' },

  bannerRow: {
    backgroundColor: '#fff',
    marginHorizontal: 16, marginTop: 16,
    borderRadius: 12, padding: 12,
    flexDirection: 'row', alignItems: 'center',
    elevation: 2,
  },
  bannerLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  bannerTitle: { fontSize: 14, fontWeight: '700', color: '#000' },
  bannerSubtitle: { fontSize: 12, color: '#666', marginTop: 2 },
  tagContainer: {
    backgroundColor: '#e3f2fd', paddingHorizontal: 6,
    paddingVertical: 2, borderRadius: 4, marginRight: 10,
  },
  tagText: { color: '#2196f3', fontSize: 10, fontWeight: 'bold' },

  toggleCard: {
    backgroundColor: '#fff', marginHorizontal: 16, marginTop: 16,
    borderRadius: 12, padding: 16, elevation: 2,
  },
  toggleContent: { flexDirection: 'row', alignItems: 'flex-start' },
  toggleIconArea: { marginRight: 12, marginTop: 2 },
  toggleTextArea: { flex: 1, marginRight: 10 },
  toggleTitle: { fontSize: 15, fontWeight: '600', color: '#333', marginBottom: 4 },
  toggleDesc: { fontSize: 12, color: '#888', lineHeight: 18, marginBottom: 4 },
  linkText: { fontSize: 12, color: 'green', textDecorationLine: 'underline', fontWeight: '600' },

  sectionContainer: { marginTop: 24, paddingHorizontal: 16 },
  sectionHeader: { fontSize: 16, fontWeight: '700', color: '#222', marginBottom: 12 },
  listCard: {
    backgroundColor: '#fff', borderRadius: 16,
    elevation: 2, overflow: 'hidden',
  },
  listItem: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 16, paddingHorizontal: 16,
    borderBottomWidth: 1, borderBottomColor: '#f0f0f0',
  },
  listItemLast: { borderBottomWidth: 0 },
  listIconLeft: { width: 24, alignItems: 'center', marginRight: 16 },
  listContent: { flex: 1 },
  listLabel: { fontSize: 15, color: '#333', fontWeight: '400' },
});

export default ProfileScreen;