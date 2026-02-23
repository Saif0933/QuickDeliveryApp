

// import { useRoute } from "@react-navigation/native";
// import { AxiosError } from "axios";
// import React, { useEffect, useRef, useState } from "react";
// import {
//   ActivityIndicator,
//   Animated,
//   Dimensions,
//   Pressable,
//   StyleSheet,
//   Text,
//   TextInput,
//   ToastAndroid,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import api from "../api/api";
// import { ErrorMessage } from "../utils/utils";
// import { AppNavigation } from "../types/types";
// import { useAuth } from "../Context/AuthContext";

// const { width } = Dimensions.get("window");

// export default function OtpScreen({ navigation }: AppNavigation) {
//   const route = useRoute();
//   const { mobile } = route.params as { mobile: string };
//   const [otp, setOtp] = useState(["", "", "", ""]);
//   const [timer, setTimer] = useState(30);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [autoFilling, setAutoFilling] = useState<boolean>(false);
//   const inputs = useRef<(TextInput | null)[]>([]);
//   const scaleAnim = useRef(new Animated.Value(1)).current;
//   const opacityAnim = useRef(new Animated.Value(1)).current;

//   // Countdown timer
//   useEffect(() => {
//     if (timer > 0) {
//       const interval = setInterval(() => {
//         setTimer((prev) => prev - 1);
//       }, 1000);
//       return () => clearInterval(interval);
//     }
//   }, [timer]);

//   const { login } = useAuth();

//   // Auto-verify when all 4 digits are filled
//   useEffect(() => {
//     const filledOtp = otp.join("");
//     if (filledOtp.length === 4 && !loading) {
//       // Trigger verification automatically
//       setTimeout(() => {
//         handleVerify(filledOtp);
//       }, 300);
//     }
//   }, [otp]);

//   // Handle OTP input
//   const handleChange = (text: string, index: number) => {
//     const newOtp = [...otp];
//     newOtp[index] = text.replace(/[^0-9]/g, "").slice(0, 1);
//     setOtp(newOtp);

//     // Auto-focus next input if current is filled
//     if (newOtp[index] && index < 3) {
//       inputs.current[index + 1]?.focus();
//     }

//     // Auto-focus previous input if current is cleared (backspace)
//     if (!newOtp[index] && index > 0) {
//       inputs.current[index - 1]?.focus();
//     }
//   };

//   // Simulate auto-fill from clipboard or SMS (optional feature)
//   const autoFillOtp = (otpValue: string) => {
//     if (otpValue.length === 4) {
//       setAutoFilling(true);
//       const otpArray = otpValue.split("");
//       setOtp(otpArray);
//       setTimeout(() => setAutoFilling(false), 500);
//     }
//   };

//   // Handle back
//   const handleBack = () => {
//     navigation.goBack();
//   };

//   // Animation for button press
//   const animateButton = () => {
//     Animated.sequence([
//       Animated.parallel([
//         Animated.timing(scaleAnim, {
//           toValue: 0.95,
//           duration: 100,
//           useNativeDriver: true,
//         }),
//       ]),
//       Animated.parallel([
//         Animated.timing(scaleAnim, {
//           toValue: 1,
//           duration: 100,
//           useNativeDriver: true,
//         }),
//       ]),
//     ]).start();
//   };

//   // Success animation
//   const animateSuccess = () => {
//     Animated.sequence([
//       Animated.timing(scaleAnim, {
//         toValue: 1.05,
//         duration: 200,
//         useNativeDriver: true,
//       }),
//       Animated.timing(scaleAnim, {
//         toValue: 1,
//         duration: 200,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   };

//   // ✅ Verify button function with API integration
//   const handleVerify = async (otpValue?: string) => {
//     const enteredOtp = otpValue || otp.join("").trim();
//     if (enteredOtp.length !== 4) {
//       ToastAndroid.show("Please enter a valid 4-digit OTP", ToastAndroid.SHORT);
//       return;
//     }

//     setLoading(true);
//     animateButton();

//     try {
//       const res = await api.post("/auth/user/verify-otp", {
//         mobile,
//         otp: enteredOtp,
//       });

//       if (res.data.success) {
//         animateSuccess();
//         await login(res.data.token, res.data.userId);
//         ToastAndroid.show(res.data.message || "OTP verified successfully!", ToastAndroid.SHORT);

//         // Navigate to Home with reset
//         setTimeout(() => {
//           navigation.reset({
//             index: 0,
//             routes: [{ name: "Home" }],
//           });
//         }, 500);
//       } else {
//         // Clear OTP on invalid attempt for better UX
//         setOtp(["", "", "", ""]);
//         inputs.current[0]?.focus();
//         ToastAndroid.show(
//           res.data.message || "Invalid OTP. Please try again.",
//           ToastAndroid.SHORT
//         );
//         setLoading(false);
//       }
//     } catch (error) {
//       // Clear OTP on error for better UX
//       setOtp(["", "", "", ""]);
//       inputs.current[0]?.focus();
//       console.log({ error });
//       ErrorMessage(error as AxiosError | Error);
//       setLoading(false);
//     }
//   };

//   // Optional: Resend OTP function (if timer === 0)
//   const handleResend = async () => {
//     if (timer > 0) return;

//     setTimer(30);
//     setOtp(["", "", "", ""]);
//     inputs.current[0]?.focus();

//     setLoading(true);
//     try {
//       const res = await api.post("/auth/user/request-otp", { mobile });
//       if (res.data.success) {
//         ToastAndroid.show(res.data.message || "OTP resent successfully!", ToastAndroid.SHORT);
//       }
//     } catch (error) {
//       console.log({ error });
//       ErrorMessage(error as AxiosError | Error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Back Arrow */}
//       <TouchableOpacity onPress={handleBack} style={styles.backButton}>
//         <View style={styles.backButtonContainer}>
//           <Ionicons name="arrow-back" size={24} color="#e53935" />
//         </View>
//       </TouchableOpacity>

//       {/* Title */}
//       <Text style={styles.title}>OTP Verification</Text>
//       <View style={styles.subtitleContainer}>
//         <Text style={styles.subtitle}>
//           We have sent a verification code to{"\n"}
//         </Text>
//         <View style={styles.phoneContainer}>
//           <Ionicons name="call-outline" size={16} color="#e53935" />
//           <Text style={styles.phone}>+91-{mobile}</Text>
//         </View>
//       </View>

//       {/* Auto-filling indicator */}
//       {autoFilling && (
//         <View style={styles.autoFillingIndicator}>
//           <ActivityIndicator color="#e53935" size="small" />
//           <Text style={styles.autoFillingText}>Auto-filling OTP...</Text>
//         </View>
//       )}

//       {/* OTP Inputs */}
//       <View style={styles.otpContainer}>
//         {otp.map((digit, index) => (
//           <Animated.View
//             key={index}
//             style={[
//               {
//                 transform: [
//                   {
//                     scale: autoFilling ? 1.1 : 1,
//                   },
//                 ],
//               },
//             ]}
//           >
//             <TextInput
//               ref={(ref) => (inputs.current[index] = ref)}
//               style={[
//                 styles.otpInput,
//                 otp[index] && styles.filledInput,
//                 loading && styles.disabledInput,
//               ]}
//               keyboardType="number-pad"
//               maxLength={1}
//               value={digit}
//               onChangeText={(text) => handleChange(text, index)}
//               editable={!loading}
//               selectTextOnFocus={true}
//               autoFocus={index === 0}
//             />
//           </Animated.View>
//         ))}
//       </View>

//       {/* Loading Indicator During Auto-Verify */}
//       {loading && (
//         <View style={styles.verifyingContainer}>
//           <ActivityIndicator color="#e53935" size="large" />
//           <Text style={styles.verifyingText}>Verifying OTP...</Text>
//         </View>
//       )}

//       {/* Verify Button - Hidden during auto-verify */}
//       {!loading && (
//         <Animated.View
//           style={[
//             {
//               transform: [{ scale: scaleAnim }],
//             },
//           ]}
//         >
//           <TouchableOpacity
//             style={styles.verifyButton}
//             onPress={() => {
//               animateButton();
//               handleVerify();
//             }}
//             activeOpacity={0.8}
//           >
//             <Text style={styles.verifyText}>Verify OTP</Text>
//           </TouchableOpacity>
//         </Animated.View>
//       )}

//       {/* Resend Option */}
//       {!loading && (
//         <View style={styles.resendContainer}>
//           <Text style={styles.resendText}>
//             Didn't get the OTP?{" "}
//           </Text>
//           <Pressable onPress={handleResend} disabled={timer > 0 || loading}>
//             <Text
//               style={[
//                 styles.resendLink,
//                 (timer > 0 || loading) && styles.disabledResendLink,
//               ]}
//             >
//               {timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
//             </Text>
//           </Pressable>
//         </View>
//       )}

//       {/* Go back to login */}
//       {!loading && (
//         <TouchableOpacity
//           style={styles.backLoginContainer}
//           onPress={handleBack}
//           activeOpacity={0.7}
//         >
//           <Ionicons name="chevron-back-outline" size={16} color="#e53935" />
//           <Text style={styles.backLoginText}>Go back to login methods</Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// }

// // Enhanced Styles for better UX and attractiveness
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 24,
//     backgroundColor: "#f8f9fa",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   backButton: {
//     position: "absolute",
//     top: 60,
//     left: 20,
//     zIndex: 1,
//   },
//   backButtonContainer: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "700",
//     color: "#1a1a1a",
//     textAlign: "center",
//     marginBottom: 8,
//     letterSpacing: 0.5,
//   },
//   subtitleContainer: {
//     alignItems: "center",
//     marginBottom: 40,
//   },
//   subtitle: {
//     fontSize: 16,
//     textAlign: "center",
//     color: "#6b7280",
//     lineHeight: 22,
//     marginBottom: 8,
//   },
//   phoneContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     borderRadius: 20,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   phone: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#e53935",
//     marginLeft: 4,
//   },
//   autoFillingIndicator: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 20,
//     backgroundColor: "#fef2f2",
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 8,
//   },
//   autoFillingText: {
//     marginLeft: 8,
//     color: "#e53935",
//     fontSize: 14,
//     fontWeight: "600",
//   },
//   otpContainer: {
//     flexDirection: "row",
//     justifyContent: "space-evenly",
//     marginBottom: 32,
//     width: "100%",
//     paddingHorizontal: 20,
//   },
//   otpInput: {
//     borderWidth: 2,
//     borderColor: "#e2e8f0",
//     borderRadius: 12,
//     width: width * 0.15,
//     height: 60,
//     textAlign: "center",
//     fontSize: 24,
//     fontWeight: "700",
//     color: "#1a1a1a",
//     backgroundColor: "#fff",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.08,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   filledInput: {
//     borderColor: "#e53935",
//     backgroundColor: "#fef2f2",
//   },
//   disabledInput: {
//     backgroundColor: "#f3f4f6",
//     opacity: 0.6,
//     borderColor: "#d1d5db",
//   },
//   verifyingContainer: {
//     alignItems: "center",
//     marginBottom: 24,
//   },
//   verifyingText: {
//     marginTop: 12,
//     color: "#e53935",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   verifyButton: {
//     width: width * 0.8,
//     marginBottom: 24,
//     backgroundColor: "#e53935",
//     paddingVertical: 16,
//     borderRadius: 12,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.15,
//     shadowRadius: 6,
//     elevation: 5,
//   },
//   verifyText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "600",
//     letterSpacing: 0.5,
//   },
//   resendContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 48,
//   },
//   resendText: {
//     fontSize: 16,
//     color: "#6b7280",
//     marginRight: 4,
//   },
//   resendLink: {
//     color: "#e53935",
//     fontSize: 16,
//     fontWeight: "600",
//     textDecorationLine: "underline",
//   },
//   disabledResendLink: {
//     color: "#9ca3af",
//     textDecorationLine: "none",
//   },
//   backLoginContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     backgroundColor: "#fff",
//     borderRadius: 8,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   backLoginText: {
//     color: "#e53935",
//     fontSize: 16,
//     fontWeight: "500",
//     marginLeft: 4,
//   },
// });


import { useRoute } from "@react-navigation/native";
import { AxiosError } from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
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
import api from "../api/api";
import { useAuth } from "../Context/AuthContext";
import { COLORS } from "../theme/color";
import { AppNavigation } from "../types/types";
import { ErrorMessage } from "../utils/utils";


const { width } = Dimensions.get("window");

export default function OtpScreen({ navigation }: AppNavigation) {
  const route = useRoute();
  const { mobile } = route.params as { mobile: string };

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState<boolean>(false);
  const [autoFilling, setAutoFilling] = useState<boolean>(false);

  const inputs = useRef<(TextInput | null)[]>([]);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const { login } = useAuth();

  // timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // auto verify
  useEffect(() => {
    const filled = otp.join("");
    if (filled.length === 4 && !loading) {
      const timeout = setTimeout(() => handleVerify(filled), 300);
      return () => clearTimeout(timeout);
    }
  }, [otp, loading]);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text.replace(/[^0-9]/g, "").slice(0, 1);
    setOtp(newOtp);

    if (newOtp[index] && index < 3) inputs.current[index + 1]?.focus();
    if (!newOtp[index] && index > 0) inputs.current[index - 1]?.focus();
  };

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  const animateSuccess = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 1.05, duration: 200, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();
  };

  const handleVerify = async (otpValue?: string) => {
    if (loading) return;
    const value = otpValue || otp.join("").trim();
    if (value.length !== 4) {
      ToastAndroid.show("Please enter a valid 4-digit OTP", ToastAndroid.SHORT);
      return;
    }

    setLoading(true);
    animateButton();

    try {
      const res = await api.post("/auth/user/verify-otp", { mobile, otp: value });

      if (res.data.success) {
        animateSuccess();
        await login(res.data.token, res.data.userId);

        ToastAndroid.show(res.data.message || "OTP verified!", ToastAndroid.SHORT);

        setTimeout(() => {
          navigation.reset({ index: 0, routes: [{ name: "Home" }] });
        }, 500);
      } else {
        setOtp(["", "", "", ""]);
        inputs.current[0]?.focus();
        ToastAndroid.show(res.data.message || "Invalid OTP", ToastAndroid.SHORT);
        setLoading(false);
      }
    } catch (error) {
      setOtp(["", "", "", ""]);
      inputs.current[0]?.focus();
      ErrorMessage(error as AxiosError | Error);
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;
    setTimer(30);

    setOtp(["", "", "", ""]);
    inputs.current[0]?.focus();

    setLoading(true);
    try {
      const res = await api.post("/auth/user/request-otp", { mobile });
      if (res.data.success) {
        ToastAndroid.show(res.data.message || "OTP resent!", ToastAndroid.SHORT);
      }
    } catch (error) {
      ErrorMessage(error as AxiosError | Error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>

      {/* BACK BUTTON */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <View style={styles.backButtonContainer}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </View>
      </TouchableOpacity>

      <Text style={styles.title}>OTP Verification</Text>

      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>We have sent a verification code to{"\n"}</Text>

        <View style={styles.phoneContainer}>
          <Ionicons name="call-outline" size={16} color={COLORS.primary} />
          <Text style={styles.phone}>+91-{mobile}</Text>
        </View>
      </View>

      {autoFilling && (
        <View style={styles.autoFillingIndicator}>
          <ActivityIndicator color={COLORS.primary} size="small" />
          <Text style={styles.autoFillingText}>Auto-filling OTP...</Text>
        </View>
      )}

      {/* OTP */}
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <Animated.View key={index} style={{ transform: [{ scale: autoFilling ? 1.1 : 1 }] }}>
            <TextInput
              ref={(ref) => { inputs.current[index] = ref; }}
              style={[
                styles.otpInput,
                otp[index] && styles.filledInput,
                loading && styles.disabledInput,
              ]}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              editable={!loading}
              autoFocus={index === 0}
              selectTextOnFocus={true}
            />
          </Animated.View>
        ))}
      </View>

      {loading && (
        <View style={styles.verifyingContainer}>
          <ActivityIndicator color= {COLORS.primary} size="large" />
          <Text style={styles.verifyingText}>Verifying OTP...</Text>
        </View>
      )}

      {!loading && (
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity
            style={styles.verifyButton}
            onPress={() => {
              animateButton();
              handleVerify();
            }}
          >
            <Text style={styles.verifyText}>Verify OTP</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      {!loading && (
        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Didn't get the OTP? </Text>

          <Pressable onPress={handleResend} disabled={timer > 0}>
            <Text
              style={[styles.resendLink, timer > 0 && styles.disabledResendLink]}
            >
              {timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
            </Text>
          </Pressable>
        </View>
      )}

      {!loading && (
        <TouchableOpacity
          style={styles.backLoginContainer}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back-outline" size={16} color={COLORS.primary} />
          <Text style={styles.backLoginText}>Go back to login methods</Text>
        </TouchableOpacity>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    justifyContent: "center",
  },

  /** FIXED BACK BUTTON */
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 20,
  },
  backButtonContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  title: {
    fontSize: 25,
    fontWeight: "700",
    color: "#1a1a1a",
    textAlign: "center",
    marginBottom: 8,
    marginLeft: 10,
    marginTop: 40,
  },

  subtitleContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
  },

  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 2,
  },
  phone: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 4,
  },

  autoFillingIndicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fef2f2",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 20,
  },
  autoFillingText: {
    marginLeft: 8,
    color: COLORS.primary,
    fontWeight: "600",
  },

  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width * 0.8,
    marginBottom: 32,
  },

  otpInput: {
    width: width * 0.15,
    height: 60,
    borderWidth: 2,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    textAlign: "center",
    fontSize: 24,
    backgroundColor: "#fff",
    fontWeight: "700",
    elevation: 2,
  },
  filledInput: {
    borderColor: COLORS.primary,
    backgroundColor: "#fef2f2",
  },
  disabledInput: {
    opacity: 0.5,
  },

  verifyingContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  verifyingText: {
    marginTop: 8,
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "600",
  },

  verifyButton: {
    width: width * 0.8,
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    elevation: 5,
  },
  verifyText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 40,
  },
  resendText: {
    color: "#6b7280",
    fontSize: 16,
  },
  resendLink: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "700",
    textDecorationLine: "underline",
  },
  disabledResendLink: {
    color: "#9ca3af",
  },

  backLoginContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 2,
  },
  backLoginText: {
    color: COLORS.primary,
    marginLeft: 4,
    fontSize: 16,
    fontWeight: "600",
  },
});
