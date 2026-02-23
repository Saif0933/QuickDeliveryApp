
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from "react-native-vector-icons/Ionicons";
import { useGetUserProfile, useUpdateUser } from "../api/hooks/user";
import { COLORS } from "../theme/color";
import { ErrorMessage, SuccessMessage } from "../utils/utils";


type Props = {
  navigation?: any;
};

const YourProfile: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState(""); // Read-only mobile
  const [isEditing, setIsEditing] = useState(false);

  // Fetch user profile data
  const { data: userProfile, isLoading: isLoadingProfile } = useGetUserProfile();
  
  // Use the update user mutation
  const { mutate: updateUser, isPending } = useUpdateUser();

  // Pre-populate form with user data when it loads
  useEffect(() => {
    if (userProfile) {
      setName(userProfile.name || "");
      setEmail(userProfile.email || "");
      setMobile(userProfile.mobile || ""); // Set mobile from API
    }
  }, [userProfile]);

  const handleUpdateProfile = () => {
    if (!name.trim()) {
      Alert.alert("Error", "Please enter your name.");
      return;
    }

    updateUser({
      name: name.trim(),
      email: email.trim(),
    }, {
      onSuccess: () => {
        SuccessMessage("Profile updated successfully!");
        setIsEditing(false);
      },
      onError: (error) => {
        ErrorMessage(error);
      }
    });
  };

  const toggleEdit = () => {
    if (isEditing) {
      // Revert changes on cancel
      setName(userProfile?.name || "");
      setEmail(userProfile?.email || "");
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleBack = () => {
    if (isEditing) {
      Alert.alert("Discard changes?", "You have unsaved changes.", [
        { text: "No", style: "cancel" },
        { text: "Yes", onPress: () => navigation?.goBack() },
      ]);
    } else {
      navigation?.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.iconBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity 
          style={styles.textBtn} 
          onPress={toggleEdit}
        >
          <Text style={[styles.editText, isEditing && { color: COLORS.primary }]}>
            {isEditing ? "Cancel" : "Edit"}
          </Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {isLoadingProfile ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={{ marginTop: 12, color: COLORS.muted }}>Loading profile...</Text>
          </View>
        ) : (
        <ScrollView 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
        >
          
          {/* Avatar - Simple & Clean */}
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
               <Text style={styles.avatarText}>{name.charAt(0).toUpperCase()}</Text>
               {isEditing && (
                 <View style={styles.editBadge}>
                   <Ionicons name="pencil" size={12} color={COLORS.white} />
                 </View>
               )}
            </View>
            <Text style={styles.userName}>{name}</Text>
            <Text style={styles.userPhone}>+91 {mobile}</Text>
          </View>

          {/* Form Fields - Minimalist */}
          <View style={styles.formSection}>
            
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                    style={[styles.input, isEditing && styles.inputActive]}
                    value={name}
                    onChangeText={setName}
                    editable={isEditing}
                    placeholder="Enter your name"
                    placeholderTextColor={COLORS.muted}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email Address</Text>
                <TextInput
                    style={[styles.input, isEditing && styles.inputActive]}
                    value={email}
                    onChangeText={setEmail}
                    editable={isEditing}
                    placeholder="Enter email"
                    placeholderTextColor={COLORS.muted}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>

            {/* Mobile Number - Read Only */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Mobile Number (Registered)</Text>
                <TextInput
                    style={[styles.input, styles.inputDisabled]}
                    value={mobile}
                    editable={false}
                    placeholder="Mobile number"
                    placeholderTextColor={COLORS.muted}
                />
            </View>

          </View>
        </ScrollView>
        )}
        {isEditing && (
            <View style={styles.footer}>
                <TouchableOpacity 
                  style={[styles.saveBtn, isPending && { opacity: 0.7 }]} 
                  onPress={handleUpdateProfile}
                  disabled={isPending}
                >
                    {isPending ? (
                      <ActivityIndicator color={COLORS.white} />
                    ) : (
                      <Text style={styles.saveBtnText}>Save Profile</Text>
                    )}
                </TouchableOpacity>
            </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default YourProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  
  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  iconBtn: { padding: 4 },
  textBtn: { padding: 4 },
  editText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.muted,
  },

  scrollContent: {
      paddingBottom: 100,
  },

  /* Avatar */
  avatarContainer: {
      alignItems: 'center',
      marginTop: 24,
      marginBottom: 32,
  },
  avatar: {
      width: 90,
      height: 90,
      borderRadius: 45,
      backgroundColor: COLORS.secondary, // Light Blue
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
  },
  avatarText: {
      fontSize: 36,
      fontWeight: '700',
      color: COLORS.primary,
  },
  editBadge: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      backgroundColor: COLORS.primary,
      padding: 6,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: COLORS.white,
  },
  userName: {
      fontSize: 22,
      fontWeight: '700',
      color: COLORS.textPrimary,
  },
  userPhone: {
      fontSize: 14,
      color: COLORS.muted,
      marginTop: 2,
  },

  /* Form */
  formSection: {
      paddingHorizontal: 24,
  },
  inputContainer: {
      marginBottom: 20,
  },
  label: {
      fontSize: 13,
      fontWeight: '600',
      color: COLORS.textSecondary,
      marginBottom: 8,
      marginLeft: 4,
  },
  input: {
      backgroundColor: COLORS.background, // Very light grey #fafafa
      borderRadius: 12,
      paddingHorizontal: 16,
      height: 50,
      fontSize: 16,
      color: COLORS.textPrimary,
      borderWidth: 1,
      borderColor: 'transparent',
  },
  inputActive: {
      backgroundColor: COLORS.white,
      borderColor: COLORS.secondary,
  },
  inputDisabled: {
      backgroundColor: '#f2f2f2',
      color: COLORS.muted,
  },


  /* Footer */
  footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: 24,
      backgroundColor: COLORS.white,
      borderTopWidth: 1,
      borderTopColor: '#F0F0F0',
  },
  saveBtn: {
      backgroundColor: COLORS.primary,
      height: 54,
      borderRadius: 14,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: COLORS.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 4,
  },
  saveBtnText: {
      fontSize: 16,
      fontWeight: '700',
      color: COLORS.white,
  },
});