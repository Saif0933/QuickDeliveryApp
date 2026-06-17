import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSendOtp } from '../../api/hook/user/auth';

const { width, height } = Dimensions.get('window');

const HangerLogo = () => (
  <View style={styles.logoWrapper}>
    <View style={styles.hangerIconContainer}>
      {/* Hook curve */}
      <View style={{
        width: 14,
        height: 14,
        borderRadius: 7,
        borderWidth: 1.8,
        borderColor: '#1e2022',
        borderBottomWidth: 0,
        borderLeftColor: 'transparent',
        transform: [{ rotate: '-45deg' }, { translateY: 2 }],
      }} />
      {/* Hanger base triangle */}
      <View style={{
        width: 44,
        height: 22,
        borderWidth: 1.8,
        borderColor: '#1e2022',
        borderBottomWidth: 1.8,
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
          width: 26,
          height: 1.8,
          backgroundColor: '#1e2022',
          transform: [{ rotate: '26deg' }, { translateX: 2 }, { translateY: 10 }],
        }} />
        {/* Right shoulder line */}
        <View style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 26,
          height: 1.8,
          backgroundColor: '#1e2022',
          transform: [{ rotate: '-26deg' }, { translateX: -2 }, { translateY: 10 }],
        }} />
      </View>
    </View>
    <Text style={styles.logoTitle}>THREADORA</Text>
    <Text style={styles.logoSubtitle}>— STYLE FOR YOU —</Text>
  </View>
);

export default function LoginScreen({ navigation }: any) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const sendOtpMutation = useSendOtp();

  const handleSendOtp = () => {
    if (phoneNumber.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit mobile number.');
      return;
    }
    
    sendOtpMutation.mutate(
      { phoneNumber },
      {
        onSuccess: (data) => {
          Alert.alert('Success', `OTP sent successfully! (Code: ${data.data.code})`);
          navigation.navigate('Otp', { phoneNumber });
        },
        onError: (error: any) => {
          const errMsg = error?.response?.data?.message || error?.message || 'Failed to send OTP. Please try again.';
          Alert.alert('Error', errMsg);
        },
      }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF7F2" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Visual Header Image Section */}
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=80' }}
            style={styles.headerBackground}
            resizeMode="cover"
          >
            <View style={styles.imageOverlay} />
            <View style={styles.logoContainer}>
              <HangerLogo />
            </View>
          </ImageBackground>

          {/* White Input Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Welcome Back</Text>
            <Text style={styles.cardSubtitle}>Login to your account to continue</Text>

            <Text style={styles.inputLabel}>Mobile Number</Text>
            <View style={styles.phoneInputContainer}>
              <View style={styles.countryCodeContainer}>
                <Text style={styles.countryCodeText}>+91</Text>
                <MaterialIcons name="keyboard-arrow-down" size={16} color="#7a7f9a" style={{ marginLeft: 4 }} />
              </View>
              <View style={styles.verticalSeparator} />
              <TextInput
                style={styles.phoneInput}
                placeholder="Enter mobile number"
                placeholderTextColor="#7a7f9a"
                keyboardType="phone-pad"
                maxLength={10}
                value={phoneNumber}
                onChangeText={(text) => setPhoneNumber(text.replace(/[^0-9]/g, ''))}
              />
            </View>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleSendOtp}
              activeOpacity={0.9}
              disabled={sendOtpMutation.isPending}
            >
              {sendOtpMutation.isPending ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.primaryButtonText}>Send OTP</Text>
              )}
            </TouchableOpacity>

            {/* OR Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Google Login Button */}
            <TouchableOpacity style={styles.googleButton} activeOpacity={0.8}>
              <Image
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.png' }}
                style={styles.googleIcon}
              />
              <Text style={styles.googleButtonText}>Continue with Google</Text>
            </TouchableOpacity>

            <Text style={styles.signupText}>
              Don't have an account? <Text style={styles.signupHighlight}>Sign up</Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF7F2',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  headerBackground: {
    width: width,
    height: height * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(250, 247, 242, 0.15)', // Tint to blend with background
  },
  logoContainer: {
    backgroundColor: 'rgba(250, 247, 242, 0.88)',
    paddingHorizontal: 28,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  logoWrapper: {
    alignItems: 'center',
  },
  hangerIconContainer: {
    width: 60,
    height: 40,
    alignItems: 'center',
  },
  logoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e2022',
    letterSpacing: 4,
    marginTop: 8,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  logoSubtitle: {
    fontSize: 8,
    color: '#7a7f9a',
    letterSpacing: 2,
    marginTop: 4,
    fontWeight: '600',
  },
  card: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 28,
    paddingTop: 32,
    paddingBottom: 40,
    marginTop: -30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.04,
    shadowRadius: 20,
    elevation: 10,
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1e2022',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#7a7f9a',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 28,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7a7f9a',
    marginBottom: 8,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2dcd0',
    marginBottom: 20,
    height: 54,
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: '100%',
  },
  countryCodeText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1e2022',
  },
  verticalSeparator: {
    width: 1,
    height: '50%',
    backgroundColor: '#e2dcd0',
  },
  phoneInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#1e2022',
    paddingHorizontal: 16,
  },
  primaryButton: {
    height: 54,
    borderRadius: 12,
    backgroundColor: '#1e2022',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  primaryButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e2dcd0',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#7a7f9a',
    fontSize: 13,
  },
  googleButton: {
    height: 54,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2dcd0',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  googleButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e2022',
  },
  signupText: {
    fontSize: 13,
    color: '#7a7f9a',
    textAlign: 'center',
    marginTop: 28,
  },
  signupHighlight: {
    color: '#A87C53',
    fontWeight: '700',
  },
});
