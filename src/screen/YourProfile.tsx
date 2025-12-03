
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StatusBar,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from "react-native-vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { COLORS } from "../theme/color";


type Props = {
  navigation?: any;
};

const YourProfile: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState("Saif");
  const [mobile, setMobile] = useState("9334804356");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState(new Date());
  const [anniversary, setAnniversary] = useState(new Date());
  const [gender, setGender] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [showDobPicker, setShowDobPicker] = useState(false);
  const [showAnniversaryPicker, setShowAnniversaryPicker] = useState(false);

  const handleUpdateProfile = () => {
    if (!email || !gender) {
      Alert.alert("Incomplete", "Please fill in email and gender.");
      return;
    }
    Alert.alert("Success", "Profile updated successfully!");
    setIsEditing(false);
  };

  const handleBack = () => {
    if (isEditing) {
      Alert.alert("Discard changes?", "", [
        { text: "No", style: "cancel" },
        { text: "Yes", onPress: () => navigation?.goBack() },
      ]);
    } else {
      navigation?.goBack();
    }
  };

  const formatDate = (d: Date) => d.toLocaleDateString("en-GB", { day: 'numeric', month: 'short', year: 'numeric' });

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
          onPress={() => setIsEditing(!isEditing)}
        >
          <Text style={[styles.editText, isEditing && { color: COLORS.primary }]}>
            {isEditing ? "Done" : "Edit"}
          </Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
        >
          
          {/* Avatar - Simple & Clean */}
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
               <Text style={styles.avatarText}>{name.charAt(0)}</Text>
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
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Mobile Number</Text>
                <TextInput
                    style={[styles.input, { color: COLORS.muted, backgroundColor: '#f2f2f2' }]}
                    value={mobile}
                    editable={false}
                />
            </View>

            <View style={styles.row}>
                <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
                    <Text style={styles.label}>Date of Birth</Text>
                    <TouchableOpacity 
                        style={[styles.input, isEditing && styles.inputActive, styles.dateBtn]}
                        onPress={() => isEditing && setShowDobPicker(true)}
                        activeOpacity={isEditing ? 0.7 : 1}
                    >
                        <Text style={styles.inputText}>{formatDate(dob)}</Text>
                        <Ionicons name="calendar-outline" size={18} color={COLORS.muted} />
                    </TouchableOpacity>
                    {showDobPicker && (
                        <DateTimePicker value={dob} mode="date" onChange={(e, d) => { setShowDobPicker(false); d && setDob(d); }} />
                    )}
                </View>

                <View style={[styles.inputContainer, { flex: 1 }]}>
                    <Text style={styles.label}>Anniversary</Text>
                    <TouchableOpacity 
                        style={[styles.input, isEditing && styles.inputActive, styles.dateBtn]}
                        onPress={() => isEditing && setShowAnniversaryPicker(true)}
                        activeOpacity={isEditing ? 0.7 : 1}
                    >
                        <Text style={styles.inputText}>{formatDate(anniversary)}</Text>
                        <Ionicons name="gift-outline" size={18} color={COLORS.muted} />
                    </TouchableOpacity>
                    {showAnniversaryPicker && (
                        <DateTimePicker value={anniversary} mode="date" onChange={(e, d) => { setShowAnniversaryPicker(false); d && setAnniversary(d); }} />
                    )}
                </View>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Gender</Text>
                <View style={styles.genderRow}>
                    {["Male", "Female", "Other"].map((g) => {
                        const isSelected = gender === g;
                        return (
                            <TouchableOpacity
                                key={g}
                                onPress={() => isEditing && setGender(g)}
                                activeOpacity={0.8}
                                style={[
                                    styles.genderChip,
                                    isSelected && styles.genderChipSelected,
                                    !isEditing && !isSelected && { opacity: 0.5 }
                                ]}
                            >
                                <Text style={[
                                    styles.genderText, 
                                    isSelected && styles.genderTextSelected
                                ]}>{g}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>

          </View>
        </ScrollView>

        {isEditing && (
            <View style={styles.footer}>
                <TouchableOpacity style={styles.saveBtn} onPress={handleUpdateProfile}>
                    <Text style={styles.saveBtnText}>Save Profile</Text>
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
  row: {
      flexDirection: 'row',
  },
  dateBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
  },
  inputText: {
      fontSize: 16,
      color: COLORS.textPrimary,
  },

  /* Gender */
  genderRow: {
      flexDirection: 'row',
      gap: 10,
  },
  genderChip: {
      flex: 1,
      paddingVertical: 12,
      backgroundColor: COLORS.background,
      borderRadius: 12,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'transparent',
  },
  genderChipSelected: {
      backgroundColor: COLORS.secondary,
      borderColor: COLORS.primary,
  },
  genderText: {
      fontSize: 14,
      color: COLORS.muted,
      fontWeight: '600',
  },
  genderTextSelected: {
      color: COLORS.primary,
      fontWeight: '700',
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