import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function EditProfileScreen({ navigation }: any) {
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('Male');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const parsed = JSON.parse(userData);
          setUser(parsed);
          setName(parsed.name || '');
          setPhone(parsed.phoneNumber || '');
          setEmail(parsed.email || '');
          setGender(parsed.gender || 'Male');
        }
      } catch (e) {
        console.error('Failed to load user info:', e);
      }
    };
    loadUserData();
  }, []);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Name cannot be empty.');
      return;
    }

    setIsSaving(true);
    try {
      const updatedUser = {
        ...user,
        name,
        email,
        gender,
      };
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      setIsSaving(false);
      Alert.alert('Success', 'Profile updated successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (e) {
      setIsSaving(false);
      Alert.alert('Error', 'Failed to save changes.');
    }
  };

  const renderGenderOption = (option: string) => {
    const isSelected = gender === option;
    return (
      <TouchableOpacity
        key={option}
        style={[styles.genderOption, isSelected && styles.genderOptionSelected]}
        onPress={() => setGender(option)}
        activeOpacity={0.8}
      >
        <Text style={[styles.genderText, isSelected && styles.genderTextSelected]}>
          {option}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="keyboard-arrow-left" size={28} color="#1e2022" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Avatar Area */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarBadge}>
              <Text style={styles.avatarEmoji}>🧔</Text>
              <TouchableOpacity style={styles.cameraBtn} activeOpacity={0.8}>
                <MaterialIcons name="photo-camera" size={16} color="#ffffff" />
              </TouchableOpacity>
            </View>
            <Text style={styles.avatarTip}>Tap camera to change photo</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <View style={styles.inputWrapper}>
              <MaterialIcons name="person-outline" size={20} color="#7a7f9a" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter your full name"
                placeholderTextColor="#7a7f9a"
              />
            </View>

            <Text style={styles.inputLabel}>Email Address</Text>
            <View style={styles.inputWrapper}>
              <MaterialIcons name="mail-outline" size={20} color="#7a7f9a" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="Enter your email"
                placeholderTextColor="#7a7f9a"
              />
            </View>

            <Text style={styles.inputLabel}>Phone Number</Text>
            <View style={[styles.inputWrapper, styles.inputDisabled]}>
              <MaterialIcons name="phone-iphone" size={20} color="#b1b5c6" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: '#7a7f9a' }]}
                value={phone}
                editable={false}
              />
              <MaterialIcons name="lock" size={16} color="#b1b5c6" style={{ marginRight: 12 }} />
            </View>

            <Text style={styles.inputLabel}>Gender</Text>
            <View style={styles.genderContainer}>
              {['Male', 'Female', 'Other'].map(renderGenderOption)}
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.saveBtn}
            onPress={handleSave}
            disabled={isSaving}
            activeOpacity={0.9}
          >
            <Text style={styles.saveBtnText}>
              {isSaving ? 'Saving Changes...' : 'Save Changes'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#e2dcd0',
    backgroundColor: '#ffffff',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e2022',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarBadge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F3EDE4',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#A87C53',
    position: 'relative',
  },
  avatarEmoji: {
    fontSize: 50,
  },
  cameraBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1e2022',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FAF7F2',
  },
  avatarTip: {
    fontSize: 12,
    color: '#7a7f9a',
    marginTop: 10,
    fontWeight: '500',
  },
  form: {
    marginBottom: 36,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1e2022',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2dcd0',
    borderRadius: 12,
    marginBottom: 20,
    height: 52,
  },
  inputDisabled: {
    backgroundColor: '#f1eee9',
    borderColor: '#e2dcd0',
  },
  inputIcon: {
    marginLeft: 14,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#1e2022',
    paddingVertical: 10,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  genderOption: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2dcd0',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  genderOptionSelected: {
    borderColor: '#1e2022',
    backgroundColor: '#1e2022',
  },
  genderText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7a7f9a',
  },
  genderTextSelected: {
    color: '#ffffff',
  },
  saveBtn: {
    height: 54,
    borderRadius: 12,
    backgroundColor: '#1e2022',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
  },
});
