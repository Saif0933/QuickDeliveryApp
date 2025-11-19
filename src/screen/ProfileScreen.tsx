// ProfileScreen.tsx
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [vegModeVisible, setVegModeVisible] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      {/* Back Button (fixed) */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      {/* Scrollable content */}
      <ScrollView style={styles.container} contentContainerStyle={{ paddingTop: 60 }}>
        {/* User Card */}
        <View style={styles.userCard}>
          <View style={styles.userInfoRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>S</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Saif</Text>
              <TouchableOpacity>
                <Text
                  style={styles.activityText}
                  onPress={() => navigation.navigate('ActivityScreen')}>
                  View activity ▶
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Gold Button */}
          <TouchableOpacity
            style={styles.goldButton}
            onPress={() => navigation.navigate('GoldScreen')}>
            <View style={styles.goldContent}>
              <MaterialCommunityIcons name="crown" size={22} color="#FFD700" />
              <Text style={styles.goldButtonText}>Join Zomato Gold</Text>
            </View>
            <Icon name="arrow-forward-ios" size={18} color="#FFD700" />
          </TouchableOpacity>
        </View>

        {/* Profile Options */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate('YourProfile')}>
            <View style={styles.rowLeft}>
              <MaterialCommunityIcons name="account-circle-outline" size={22} color="#555555ff" />
              <Text style={styles.text}>Your profile</Text>
            </View>
            <Text style={styles.subText}>83% complete</Text>
          </TouchableOpacity>
        </View>

        {/* Veg Mode */}
        <View style={styles.section}>
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <MaterialCommunityIcons name="leaf" size={22} color="green" />
              <Text style={styles.text}>Veg Mode</Text>
            </View>
            <Switch
              value={vegModeVisible}
              onValueChange={(val) => setVegModeVisible(val)}
              trackColor={{ false: '#ccc', true: '#EF4F5F' }}
              thumbColor="#fff"
            />
          </View>
        </View>

        {/* Your Collections */}
        <Section
          title="Your collections"
          items={[
            {
              label: 'Your collections',
              icon: 'calendar-outline',
              onPress: () => navigation.navigate('BookingScreen'), // ✅ custom press
            },
          ]}
        />

        {/* Food Orders */}
        <Section
          title="Food Orders"
          items={[
            { label: 'Your orders', icon: 'shopping-bag', screen: 'YourOrder' },
            // { label: 'Manage recommendations', icon: 'star-outline' },
            // { label: 'Order on train', icon: 'train' },
            { label: 'Address book', icon: 'location-on', screen: 'AddressBookScreen' },
            // { label: 'Hidden Restaurants', icon: 'visibility-off' },
            {
              label: 'Help & Support',
              icon: 'help-outline',
              onPress: () => navigation.navigate('SupportScreen'), // ✅ custom press
            },
          ]}
        />

        {/* Dining */}
        <Section
          title="Dining and Experiences"
          items={[
            // { label: 'Your dining transactions', icon: 'credit-card-outline' },
            // { label: 'Your dining rewards', icon: 'gift-outline' },
            {
              label: 'Your bookings',
              icon: 'calendar-outline',
              onPress: () => navigation.navigate('BookingScreen'), // ✅ custom press
            },
            // { label: 'Dining help', icon: 'help-circle-outline' },
            // { label: 'Dining settings', icon: 'cog-outline' },
            // { label: 'Frequently asked questions', icon: 'comment-question-outline' },
          ]}
        />

        {/* {/* Money */}
        <Section
          title="Money"
          items={[
            {
              label: 'Zomato Money',
              icon: 'wallet-outline',
              onPress: () => navigation.navigate('ZomatoMoneyPage'), // ✅ custom press
            },
            { label: 'Buy Gift Card', icon: 'card-giftcard' },
            { label: 'Claim Gift Card', icon: 'confirmation-number' },
            { label: 'Zomato Credits', icon: 'currency-inr' },
            {
              label: 'Payment settings',
              icon: 'settings-outline',
              onPress: () => navigation.navigate('PaymentSettings'), // ✅ custom press
            },
          ]}
        /> 

        {/* More */}
        <Section
          title="More"
          items={[
            { label: 'About', icon: 'information-outline', screen: 'AboutScreen' },
            { label: 'Send feedback', icon: 'message-text-outline', screen: 'FeedbackScreen' },
            {
              label: 'Report a safety emergency',
              icon: 'alert-outline',
              onPress: () => navigation.navigate('ReportEmergencyScreen'), // ✅ custom press
            },
            {
              label: 'Accessibility',
              icon: 'accessibility-outline',
              onPress: () => navigation.navigate('AccessibilitySettings'), // ✅ custom press
            },
            { label: 'Settings', icon: 'cog-outline', screen: 'SettingScreen' },
            {
              label: 'Log out',
              icon: 'logout',
              onPress: () => navigation.navigate('Login'), // ✅ custom press
            },
          ]}
        />
      </ScrollView>

      {/* VegMode Modal */}
      <VegMode visible={vegModeVisible} onClose={() => setVegModeVisible(false)} />
    </View>
  );
};

type SectionProps = {
  title: string;
  items: {
    label: string;
    icon: string;
    screen?: keyof RootStackParamList;
    onPress?: () => void;
  }[];
};

const Section: React.FC<SectionProps> = ({ title, items }) => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.section}>
      <Text style={styles.sectionHeader}>{title}</Text>
      {items.map((item, idx) => (
        <TouchableOpacity
          key={idx}
          style={styles.row}
          onPress={() => {
            if (item.onPress) {
              item.onPress();
            } else if (item.screen) {
              navigation.navigate(item.screen);
            }
          }}>
          <View style={styles.rowLeft}>
            <MaterialCommunityIcons name={item.icon} size={22} color="#555555ff" />
            <Text style={styles.text}>{item.label}</Text>
          </View>
          <Icon name="arrow-forward-ios" size={16} color="#888888ff" />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffffff', },

  backButton: {
    position: 'absolute',
    top: 20,
    left: 16,
    zIndex: 10,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
    elevation: 3, // shadow for Android
    shadowColor: '#000', // shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  userCard: {
    backgroundColor: '#ffffffff',
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  userInfoRow: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#67a6e5ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 22, fontWeight: 'bold', color: '#444444ff' },
  userInfo: { marginLeft: 12 },
  userName: { fontSize: 20, fontWeight: 'bold', color: '#000' },
  activityText: { fontSize: 14, color: '#3e0dd2ff', marginTop: 2 },
  goldButton: {
    backgroundColor: '#000',
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  goldContent: { flexDirection: 'row', alignItems: 'center' },
  goldButtonText: { color: '#FFD700', fontWeight: 'bold', fontSize: 15, marginLeft: 10 },
  section: {
    borderTopWidth: 8,
    borderTopColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sectionHeader: { fontSize: 16, color: '#090909ff', marginBottom: 4, fontWeight: '600', fontFamily:'fantasy' },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  rowLeft: { flexDirection: 'row', alignItems: 'center' },
  text: { fontSize: 16, color: '#000', marginLeft: 10 },
  subText: { fontSize: 14, color: '#3e0dd2ff' },
});

export default ProfileScreen;
