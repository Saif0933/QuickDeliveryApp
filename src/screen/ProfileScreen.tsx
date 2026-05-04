import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Platform,
    ScrollView,
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
import VegMode from './FashionMode';

type RootStackParamList = {
  ProfilePage: undefined;
  WalletScreen: undefined;
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

const ProfileScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [fashionMode, setFashionMode] = useState(false);
  const [vegModeVisible, setVegModeVisible] = useState(false);
  const { logout } = useAuth();
  const { data: userProfile } = useGetUserProfile();

  const handleFashionModeToggle = (value: boolean) => {
    setFashionMode(value);
    if (value) {
      setVegModeVisible(true);
    }
  };

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const onShare = async () => {
    try {
      await Share.share({
        message: 'Check out this amazing fashion app! Elevate your style with 30 min shop.',
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const QuickStat = ({ icon, label, count, onPress }: { icon: string; label: string; count: string; onPress: () => void }) => (
    <TouchableOpacity style={styles.statItem} onPress={onPress}>
      <View style={styles.statIconWrapper}>
        <MaterialCommunityIcons name={icon} size={24} color={COLORS.primary} />
      </View>
      <Text style={styles.statCount}>{count}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </TouchableOpacity>
  );

  const ActionRow = ({ icon, label, sublabel, onPress, isLast = false, color = '#333' }: any) => (
    <TouchableOpacity 
      style={[styles.actionRow, isLast && { borderBottomWidth: 0 }]} 
      onPress={onPress}
    >
      <View style={[styles.actionIconWrapper, { backgroundColor: `${color}10` }]}>
        <MaterialCommunityIcons name={icon} size={22} color={color} />
      </View>
      <View style={styles.actionTextWrapper}>
        <Text style={[styles.actionLabel, { color: color === '#FF3B30' ? '#FF3B30' : '#1A1A1A' }]}>{label}</Text>
        {sublabel && <Text style={styles.actionSublabel}>{sublabel}</Text>}
      </View>
      <Ionicons name="chevron-forward" size={18} color="#CCC" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* --- Header Section --- */}
        <LinearGradient
          colors={[COLORS.primary, '#4A00E0']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <SafeAreaHeader navigation={navigation} />
          
          <Animated.View style={[styles.profileInfo, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatarGlow} />
              <LinearGradient
                colors={['#FFF', '#F0F0F0']}
                style={styles.avatar}
              >
                 <Text style={styles.avatarLetter}>
                   {userProfile?.name?.charAt(0).toUpperCase() || 'U'}
                 </Text>
              </LinearGradient>
              <TouchableOpacity style={styles.editBadge}>
                <Ionicons name="camera" size={14} color="#FFF" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.nameSection}>
              <Text style={styles.userName}>{userProfile?.name || 'Guest User'}</Text>
              <Text style={styles.userEmail}>{userProfile?.mobile || 'Complete your profile'}</Text>
              <View style={styles.platinumBadge}>
                <MaterialCommunityIcons name="shield-check" size={12} color="#FFD700" />
                <Text style={styles.platinumText}>Platinum Member</Text>
              </View>
            </View>
          </Animated.View>
        </LinearGradient>

        {/* --- Quick Stats --- */}
        <View style={styles.statsCard}>
          <QuickStat 
            icon="package-variant-closed" 
            label="Orders" 
            count="12" 
            onPress={() => navigation.navigate('YourOrder')} 
          />
          <View style={styles.statDivider} />
          <QuickStat 
            icon="heart-outline" 
            label="Wishlist" 
            count="24" 
            onPress={() => {}} 
          />
          <View style={styles.statDivider} />
          <QuickStat 
            icon="ticket-percent-outline" 
            label="Coupons" 
            count="5" 
            onPress={() => {}} 
          />
        </View>

        {/* --- Fashion Mode Toggle --- */}
        <View style={styles.sectionCard}>
          <View style={styles.toggleRow}>
            <View style={styles.toggleInfo}>
              <Text style={styles.sectionTitle}>Fashion Mode</Text>
              <Text style={styles.sectionSubtitle}>Personalized style recommendations</Text>
            </View>
            <Switch
              value={fashionMode}
              onValueChange={handleFashionModeToggle}
              trackColor={{ false: '#E0E0E0', true: COLORS.primary }}
              thumbColor="#FFF"
            />
          </View>
        </View>

        {/* --- Account Settings --- */}
        <View style={styles.sectionCard}>
          <Text style={styles.cardHeader}>Account Settings</Text>
          <ActionRow 
            icon="account-edit-outline" 
            label="Edit Profile" 
            sublabel="Name, Email, Mobile"
            onPress={() => navigation.navigate('YourProfile')}
            color="#2196F3"
          />
          <ActionRow 
            icon="map-marker-outline" 
            label="Saved Addresses" 
            sublabel="Manage delivery locations"
            onPress={() => navigation.navigate('AddressBookScreen')}
            color="#4CAF50"
          />
          <ActionRow 
            icon="wallet-outline" 
            label="Payment Methods" 
            sublabel="Cards, UPI, Wallets"
            onPress={() => {}}
            isLast={true}
            color="#FF9800"
          />
        </View>

        {/* --- Support & More --- */}
        <View style={styles.sectionCard}>
          <Text style={styles.cardHeader}>Help & Privacy</Text>
          <ActionRow 
            icon="help-circle-outline" 
            label="Customer Support" 
            onPress={() => navigation.navigate('SupportScreen')}
            color="#673AB7"
          />
          <ActionRow 
            icon="shield-lock-outline" 
            label="Privacy Policy" 
            onPress={() => navigation.navigate('PrivacyPolicy')}
            color="#607D8B"
          />
          <ActionRow 
            icon="share-variant-outline" 
            label="Share with Friends" 
            onPress={onShare}
            color="#E91E63"
          />
          <ActionRow 
            icon="logout" 
            label="Logout" 
            onPress={async () => {
              await logout();
              navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
            }}
            isLast={true}
            color="#FF3B30"
          />
        </View>

        <Text style={styles.versionText}>Version 2.4.1 (Stable)</Text>
        <View style={{ height: 40 }} />
      </ScrollView>

      <VegMode 
        visible={vegModeVisible} 
        onClose={() => {
          setVegModeVisible(false);
        }} 
      />
    </View>
  );
};

const SafeAreaHeader = ({ navigation }: any) => (
  <View style={styles.navHeader}>
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
      <Ionicons name="chevron-back" size={24} color="#FFF" />
    </TouchableOpacity>
    <Text style={styles.navTitle}>My Profile</Text>
    <TouchableOpacity style={styles.settingsBtn}>
      <Ionicons name="settings-outline" size={22} color="#FFF" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FE',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : 40,
    paddingBottom: 60,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  navHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
  },
  settingsBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  avatarLetter: {
    fontSize: 36,
    fontWeight: '900',
    color: COLORS.primary,
  },
  avatarGlow: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    top: -5,
    left: -5,
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#4CAF50',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  nameSection: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFF',
    letterSpacing: 0.5,
  },
  userEmail: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  platinumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,215,0,0.15)',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 10,
  },
  platinumText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFD700',
    marginLeft: 4,
    textTransform: 'uppercase',
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginTop: -30,
    borderRadius: 20,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 10,
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: `${COLORS.primary}10`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statCount: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  statLabel: {
    fontSize: 11,
    color: '#999',
    fontWeight: '600',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#F0F0F0',
  },
  sectionCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 2,
  },
  cardHeader: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 16,
    paddingLeft: 4,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleInfo: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F8F9FE',
  },
  actionIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  actionTextWrapper: {
    flex: 1,
  },
  actionLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  actionSublabel: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
  },
  versionText: {
    textAlign: 'center',
    color: '#CCC',
    fontSize: 12,
    marginTop: 24,
    fontWeight: '600',
  },
});

export default ProfileScreen;