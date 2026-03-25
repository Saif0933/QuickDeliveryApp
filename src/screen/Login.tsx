
// LoginScreen.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Dimensions,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View,
} from "react-native";
import api from "../api/api";
import { useAuth } from "../Context/AuthContext";
import { COLORS } from "../theme/color";
import { ErrorMessage } from "../utils/utils";

const { height } = Dimensions.get("window");

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const [phone, setPhone] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const {isAuthenticated, hasSkippedLogin} = useAuth();

  useEffect(() => {
    if (isAuthenticated || hasSkippedLogin) {
        navigation.reset({ index: 0, routes: [{ name: "Home" }] });
      } else {
        navigation.navigate("Login");
      }
  }, []);
  // Load saved phone number
  useEffect(() => {
    const loadPhone = async () => {
      try {
        const savedPhone = await AsyncStorage.getItem("userPhone");
        if (savedPhone) setPhone(savedPhone);
      } catch (e) {
        console.log("Error loading saved phone:", e);
      }
    };
    loadPhone();
  }, []);

  const handleLogin = async () => {
    const trimmedPhone = phone.trim();
    if (!trimmedPhone) {
      ToastAndroid.show("Please enter your phone number.", ToastAndroid.SHORT);
      return;
    }

    if (trimmedPhone.length !== 10) {
      ToastAndroid.show(
        "Please enter a valid 10-digit number",
        ToastAndroid.SHORT
      );
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/auth/user/request-otp", {
        mobile: trimmedPhone,
      });

      if (res.data.success) {
        await AsyncStorage.setItem("userPhone", trimmedPhone);
        ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
        navigation.navigate("Otp", { mobile: trimmedPhone });
      } else {
        ToastAndroid.show(
          res.data.message || "Failed to send OTP. Please try again.",
          ToastAndroid.SHORT
        );
      }
    } catch (error) {
      console.log({ error });
      ErrorMessage(error as AxiosError | Error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Header */}
          <View style={styles.headerWrapper}>
            <ImageBackground
              source={require("../assets/restro.jpeg")}
              style={styles.topContainer}
              resizeMode="cover"
            />
          </View>

          {/* Main content */}
          <View style={styles.content}>
            <Text style={styles.title}>Order Now From Multiple Resturant</Text>

            <View style={styles.dividerContainer}>
              <View style={styles.line} />
              <Text style={styles.subtitle}>Log in or Sign up</Text>
              <View style={styles.line} />
            </View>

            {/* Phone Input */}
            <View style={styles.inputContainer}>
              <View style={styles.countryCode}>
                <Text style={styles.flag}>🇮🇳</Text>
                <Text style={styles.code}>+91</Text>
              </View>

              <View style={styles.verticalDivider} />

              <TextInput
                style={styles.input}
                keyboardType="phone-pad"
                placeholder="Enter Phone Number"
                placeholderTextColor={COLORS.muted}
                value={phone}
                onChangeText={setPhone}
                editable={!loading}
                selectTextOnFocus={true}
                maxLength={10}
                selectionColor={COLORS.primary}
              />
            </View>

            {/* Continue Button */}
            <TouchableOpacity
              style={[styles.continueBtn, loading && styles.disabledBtn]}
              onPress={handleLogin}
              disabled={loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color={COLORS.white} />
              ) : (
                <Text style={styles.continueText}>Continue</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footerContainer}>
            <Text style={styles.footer}>
              By continuing, you agree to our{"\n"}
              <Text style={styles.link}>Terms of Service</Text>{" "}
              <Text style={styles.footerDot}>·</Text>{" "}
              <Text style={styles.link}>Privacy Policy</Text>{" "}
              <Text style={styles.footerDot}>·</Text>{" "}
              <Text style={styles.link}>Content Policy</Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

/* ---------------------- THEME-APPLIED STYLES (NO UI CHANGE) ---------------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  scrollContent: {
    flexGrow: 1,
    backgroundColor: COLORS.white,
  },

  headerWrapper: {
    height: height * 0.45,
    width: "100%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
  },

  topContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "800",
    color: COLORS.textPrimary,
    lineHeight: 34,
  },

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 24,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.secondary,
  },

  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: "600",
    textTransform: "uppercase",
    marginHorizontal: 12,
    letterSpacing: 0.5,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 12,
    height: 54,
    width: "100%",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    overflow: "hidden",
  },

  countryCode: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.background,
    paddingHorizontal: 14,
    height: "100%",
    borderRightWidth: 1,
    borderRightColor: COLORS.secondary,
  },

  flag: {
    fontSize: 22,
    marginRight: 6,
  },

  code: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },

  verticalDivider: {
    width: 1,
    height: "100%",
    backgroundColor: COLORS.secondary,
  },

  input: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.textPrimary,
    paddingHorizontal: 14,
    height: "100%",
  },

  continueBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },

  disabledBtn: {
    backgroundColor: COLORS.primary,
    elevation: 0,
  },

  continueText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "700",
  },

  footerContainer: {
    paddingHorizontal: 24,
    paddingVertical: 30,
    alignItems: "center",
    marginTop: "auto",
  },

  footer: {
    textAlign: "center",
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },

  link: {
    color: COLORS.textPrimary,
    fontWeight: "600",
    textDecorationLine: "underline",
  },

  footerDot: {
    color: COLORS.muted,
    marginHorizontal: 4,
  },
});
