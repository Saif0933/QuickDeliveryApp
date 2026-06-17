import React, { useState, useRef, useEffect } from 'react';
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
  Dimensions,
  ActivityIndicator,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useVerifyOtp, useSendOtp } from '../../api/hook/user/auth';

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

export default function OtpScreen({ route, navigation }: any) {
  const { phoneNumber } = route?.params || { phoneNumber: '' };
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(45); // Set default timer to 45 seconds to match the screenshot "00:45"
  const [canResend, setCanResend] = useState(false);

  const otpRefs = useRef<Array<TextInput | null>>([]);
  const verifyOtpMutation = useVerifyOtp();
  const sendOtpMutation = useSendOtp();

  // Format phone number to match format: +91 98765 43210
  const displayPhone = phoneNumber && phoneNumber.length === 10
    ? `+91 ${phoneNumber.substring(0, 5)} ${phoneNumber.substring(5)}`
    : phoneNumber ? `+91 ${phoneNumber}` : '+91 98765 43210';

  // Countdown timer for OTP
  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Focus first input on load
  useEffect(() => {
    const focusTimeout = setTimeout(() => {
      otpRefs.current[0]?.focus();
    }, 300);
    return () => clearTimeout(focusTimeout);
  }, []);

  const handleVerifyOtp = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 4) {
      Alert.alert('Error', 'Please enter all 4 digits of the OTP.');
      return;
    }
    
    verifyOtpMutation.mutate(
      { phoneNumber, code: enteredOtp },
      {
        onSuccess: async (data) => {
          try {
            await AsyncStorage.setItem('token', data.data.token);
            if (data.data.user) {
              await AsyncStorage.setItem('user', JSON.stringify(data.data.user));
            }
            Alert.alert('Success', 'Login Successful!');
            if (navigation) {
              navigation.replace('Home');
            }
          } catch (e) {
            Alert.alert('Error', 'Failed to save login session.');
          }
        },
        onError: (error: any) => {
          const errMsg = error?.response?.data?.message || error?.message || 'Verification failed. Please try again.';
          Alert.alert('Error', errMsg);
        },
      }
    );
  };

  const handleResendOtp = () => {
    if (!canResend) return;
    
    sendOtpMutation.mutate(
      { phoneNumber },
      {
        onSuccess: (data) => {
          setTimer(45);
          setCanResend(false);
          setOtp(['', '', '', '']);
          otpRefs.current[0]?.focus();
          Alert.alert('Success', `OTP resent successfully! (Code: ${data.data.code})`);
        },
        onError: (error: any) => {
          const errMsg = error?.response?.data?.message || error?.message || 'Failed to resend OTP.';
          Alert.alert('Error', errMsg);
        },
      }
    );
  };

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value !== '' && index < 3) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyPress = (e: any, index: number) => {
    // Move to previous input on backspace
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF7F2" />
      
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backChevron}
        onPress={() => navigation.goBack()}
        disabled={verifyOtpMutation.isPending || sendOtpMutation.isPending}
      >
        <MaterialIcons name="keyboard-arrow-left" size={28} color="#1e2022" />
      </TouchableOpacity>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Top Logo Section */}
          <View style={styles.headerContainer}>
            <HangerLogo />
          </View>

          {/* White Input Card */}
          <View style={styles.card}>
            {/* Lock Badge */}
            <View style={styles.lockBadge}>
              <MaterialIcons name="lock-outline" size={26} color="#1e2022" />
            </View>

            <Text style={styles.cardTitle}>Verify OTP</Text>
            <Text style={styles.cardSubtitle}>
              Enter the 6-digit OTP sent to{'\n'}
              <Text style={styles.phoneHighlight}>{displayPhone}</Text>
            </Text>

            {/* OTP 6-Digit input boxes */}
            <View style={styles.otpWrapper}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => { otpRefs.current[index] = ref; }}
                  style={[
                    styles.otpInput,
                    digit !== '' && styles.otpInputActive,
                  ]}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={digit}
                  onChangeText={(value) => handleOtpChange(value, index)}
                  onKeyPress={(e) => handleOtpKeyPress(e, index)}
                />
              ))}
            </View>

            {/* Timer or Resend Text */}
            <View style={styles.timerContainer}>
              {canResend ? (
                <TouchableOpacity 
                  onPress={handleResendOtp} 
                  disabled={sendOtpMutation.isPending || verifyOtpMutation.isPending}
                >
                  {sendOtpMutation.isPending ? (
                    <ActivityIndicator size="small" color="#A87C53" />
                  ) : (
                    <Text style={styles.resendText}>Resend OTP</Text>
                  )}
                </TouchableOpacity>
              ) : (
                <Text style={styles.timerText}>
                  Resend OTP in <Text style={styles.timerCount}>00:{timer < 10 ? '0' + timer : timer}</Text>
                </Text>
              )}
            </View>

            {/* Action button */}
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleVerifyOtp}
              activeOpacity={0.9}
              disabled={verifyOtpMutation.isPending || sendOtpMutation.isPending}
            >
              {verifyOtpMutation.isPending ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.primaryButtonText}>Verify OTP</Text>
              )}
            </TouchableOpacity>
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
  backChevron: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    left: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(250, 247, 242, 0.5)',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  headerContainer: {
    width: width,
    height: height * 0.35,
    justifyContent: 'center',
    alignItems: 'center',
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
    paddingTop: 36,
    paddingBottom: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.04,
    shadowRadius: 20,
    elevation: 10,
  },
  lockBadge: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#F3EDE4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
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
    marginTop: 8,
    marginBottom: 32,
    lineHeight: 22,
  },
  phoneHighlight: {
    color: '#1e2022',
    fontWeight: '700',
  },
  otpWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 28,
  },
  otpInput: {
    width: (width - 56 - 30) / 4,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2dcd0',
    fontSize: 20,
    fontWeight: '700',
    color: '#1e2022',
    textAlign: 'center',
  },
  otpInputActive: {
    borderColor: '#1e2022',
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  timerText: {
    fontSize: 14,
    color: '#7a7f9a',
  },
  timerCount: {
    color: '#A87C53',
    fontWeight: '700',
  },
  resendText: {
    fontSize: 14,
    color: '#A87C53',
    fontWeight: '700',
  },
  primaryButton: {
    width: '100%',
    height: 54,
    borderRadius: 12,
    backgroundColor: '#1e2022',
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
  },
});
