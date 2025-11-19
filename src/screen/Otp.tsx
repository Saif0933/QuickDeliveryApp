import { NativeStackNavigationProp, useRoute } from "@react-navigation/native";
import { AxiosError } from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RootStackParamList } from "../../App"; // 👈 import type
import api from "../api/api"; // Adjust path if needed
import { ErrorMessage } from "../utils/utils"; // Assuming this is your error handler from login

const { width } = Dimensions.get("window");

type OtpScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Otp"
>;

export default function OtpScreen({
  navigation,
}: {
  navigation: OtpScreenNavigationProp;
}) {
  const route = useRoute();
  const { mobile } = route.params as { mobile: string };
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState<boolean>(false);
  const inputs = useRef<(TextInput | null)[]>([]);

  // Countdown timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Handle OTP input
  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text.replace(/[^0-9]/g, ""); // Ensure only digits
    setOtp(newOtp);

    if (newOtp[index] && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  // Handle back
  const handleBack = () => {
    navigation.goBack();
  };

  // ✅ Verify button function with API integration
  const handleVerify = async () => {
    const enteredOtp = otp.join("").trim();
    if (enteredOtp.length !== 4) {
      ToastAndroid.show("Please enter a valid 4-digit OTP", ToastAndroid.SHORT);
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/auth/user/verify-otp", {
        mobile,
        otp: enteredOtp,
      });
      if (res.data.success) {
        ToastAndroid.show(res.data.message || "OTP verified successfully!", ToastAndroid.SHORT);
        navigation.navigate("Home");
      } else {
        ToastAndroid.show(
          res.data.message || "Invalid OTP. Please try again.",
          ToastAndroid.SHORT,
        );
      }
    } catch (error) {
      console.log({ error });
      ErrorMessage(error as AxiosError | Error);
    } finally {
      setLoading(false);
    }
  };

  // Optional: Resend OTP function (if timer === 0)
  const handleResend = async () => {
    if (timer > 0) return; // Don't resend if timer is active

    setTimer(30); // Reset timer
    setOtp(["", "", "", ""]); // Clear OTP fields
    inputs.current[0]?.focus(); // Focus first input

    setLoading(true);
    try {
      const res = await api.post("/auth/user/request-otp", { mobile });
      if (res.data.success) {
        ToastAndroid.show(res.data.message || "OTP resent successfully!", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log({ error });
      ErrorMessage(error as AxiosError | Error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.subtitle}>
        We have sent a verification code to {"\n"}
        <Text style={styles.phone}>+91-{mobile}</Text>
      </Text>

      {/* OTP Inputs */}
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            style={[
              styles.otpInput,
              loading && styles.disabledInput,
            ]}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            editable={!loading}
          />
        ))}
      </View>

      {/* Verify Button */}
      <TouchableOpacity
        style={[
          styles.verifyButton,
          loading && styles.disabledButton,
        ]}
        onPress={handleVerify}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.verifyText}>Verify</Text>
        )}
      </TouchableOpacity>

      {/* Resend Option */}
      <Text style={styles.resendText}>
        Didn’t get the OTP?{" "}
        <Pressable onPress={handleResend}>
          <Text style={styles.resendLink}>
            {timer > 0 ? `Resend SMS in ${timer}s` : "Resend Now"}
          </Text>
        </Pressable>
      </Text>

      {/* Go back to login */}
      <TouchableOpacity style={styles.backLogin} onPress={handleBack}>
        <Text style={styles.backLoginText}>Go back to login methods</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  title: {
    marginTop: 80,
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
  },
  subtitle: {
    marginTop: 15,
    fontSize: 14,
    textAlign: "center",
    color: "#444",
  },
  phone: {
    fontWeight: "bold",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    width: "100%",
    paddingHorizontal: 20,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
    width: width * 0.12,
    height: 55,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
  },
  disabledInput: {
    backgroundColor: "#f5f5f5",
    opacity: 0.7,
  },
  verifyButton: {
    marginTop: 30,
    backgroundColor: "#e53935",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  verifyText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  resendText: {
    marginTop: 25,
    fontSize: 14,
    color: "#333",
  },
  resendLink: {
    color: "#e53935",
    fontWeight: "500",
    textDecorationLine: "underline",
  },
  backLogin: {
    marginTop: 40,
  },
  backLoginText: {
    color: "#e53935",
    fontSize: 14,
    fontWeight: "500",
  },
});