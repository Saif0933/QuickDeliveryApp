import { useNavigation } from "@react-navigation/native";
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
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useGetUserProfile, useUpdateUser } from "../api/hooks/user";
import { COLORS } from "../theme/color";
import { ErrorMessage, SuccessMessage } from "../utils/utils";

const YourProfile: React.FC = () => {
  const navigation = useNavigation<any>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const { data: userProfile, isLoading: isLoadingProfile } = useGetUserProfile();
  const { mutate: updateUser, isPending } = useUpdateUser();

  useEffect(() => {
    if (userProfile) {
      setName(userProfile.name || "");
      setEmail(userProfile.email || "");
      setMobile(userProfile.mobile || "");
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
        { text: "Yes", onPress: () => navigation.goBack() },
      ]);
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      
      <SafeAreaView edges={['top']} style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#111" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <TouchableOpacity onPress={toggleEdit} style={styles.editBtn}>
            <Text style={[styles.editBtnText, isEditing && { color: COLORS.primary }]}>
              {isEditing ? "Cancel" : "Edit"}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Avatar Section */}
          <View style={styles.avatarSection}>
             <View style={styles.avatarOuter}>
                <View style={styles.avatarInner}>
                   <Text style={styles.avatarText}>{name ? name.charAt(0).toUpperCase() : 'U'}</Text>
                </View>
                {isEditing && (
                   <TouchableOpacity style={styles.cameraBadge}>
                      <Ionicons name="camera" size={18} color="#FFF" />
                   </TouchableOpacity>
                )}
             </View>
             <Text style={styles.profileName}>{name || 'User'}</Text>
             <Text style={styles.profileId}>Customer ID: #29102</Text>
          </View>

          {/* Form Section */}
          <View style={styles.formContainer}>
            
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Full Name</Text>
                <View style={[styles.inputWrapper, isEditing && styles.inputWrapperActive]}>
                    <Ionicons name="person-outline" size={20} color={isEditing ? COLORS.primary : "#999"} />
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        editable={isEditing}
                        placeholder="Enter your name"
                        placeholderTextColor="#CCC"
                    />
                </View>
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Email Address</Text>
                <View style={[styles.inputWrapper, isEditing && styles.inputWrapperActive]}>
                    <Ionicons name="mail-outline" size={20} color={isEditing ? COLORS.primary : "#999"} />
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        editable={isEditing}
                        placeholder="Enter your email"
                        placeholderTextColor="#CCC"
                        keyboardType="email-address"
                    />
                </View>
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Mobile Number</Text>
                <View style={[styles.inputWrapper, styles.inputWrapperDisabled]}>
                    <Ionicons name="call-outline" size={20} color="#999" />
                    <TextInput
                        style={[styles.input, { color: '#999' }]}
                        value={mobile}
                        editable={false}
                    />
                    <MaterialCommunityIcons name="lock" size={16} color="#CCC" />
                </View>
            </View>

          </View>

          {/* Info Section */}
          <View style={styles.infoBox}>
             <Ionicons name="information-circle" size={20} color={COLORS.primary} />
             <Text style={styles.infoText}>
                Mobile number is linked to your account for security and cannot be changed here.
             </Text>
          </View>

        </ScrollView>

        {isEditing && (
            <View style={styles.footer}>
                <TouchableOpacity 
                    style={[styles.saveButton, isPending && { opacity: 0.8 }]}
                    onPress={handleUpdateProfile}
                    disabled={isPending}
                >
                    <LinearGradient
                        colors={[COLORS.primary, '#6366F1']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.saveGradient}
                    >
                        {isPending ? (
                            <ActivityIndicator color="#FFF" />
                        ) : (
                            <Text style={styles.saveText}>Save Changes</Text>
                        )}
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

export default YourProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },
  editBtn: {
    padding: 4,
  },
  editBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#666',
  },
  scrollContent: {
    paddingBottom: 120,
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  avatarOuter: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F3F4F6',
    padding: 4,
    position: 'relative',
    marginBottom: 16,
  },
  avatarInner: {
    flex: 1,
    borderRadius: 50,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 36,
    fontWeight: '800',
    color: '#374151',
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    padding: 8,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#FFF',
  },
  profileName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111',
  },
  profileId: {
    fontSize: 13,
    color: '#999',
    marginTop: 4,
    fontWeight: '500',
  },
  formContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1.5,
    borderColor: '#F3F4F6',
  },
  inputWrapperActive: {
    borderColor: COLORS.primary,
    backgroundColor: '#FFF',
  },
  inputWrapperDisabled: {
    backgroundColor: '#F3F4F6',
    borderColor: '#F3F4F6',
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
    marginLeft: 12,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#EEF2FF',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 16,
    marginTop: 10,
    alignItems: 'flex-start',
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#4338CA',
    marginLeft: 12,
    lineHeight: 18,
    fontWeight: '500',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  saveButton: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  saveGradient: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
    letterSpacing: 0.5,
  },
});