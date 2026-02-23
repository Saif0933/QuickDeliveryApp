import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PrivacyPolicy = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header Section */}
        <Text style={styles.mainTitle}>About Us</Text>
        <Text style={styles.mainTitle}>Privacy Policy</Text>
        
        <Text style={styles.paragraph}>
          Minta Club Private Limited ("Company", "we", "our", "us") is a company incorporated under the Companies Act, 2013, India. [cite: 27]
        </Text>
        <Text style={styles.paragraph}>
          Minta Restro is a brand owned and operated by Minta Club Private Limited. [cite: 28]
        </Text>
        <Text style={styles.paragraph}>
          Minta Restro operates an online platform for the sale and delivery of Online food ordering services, Restaurant listings and reviews, Payment facilitation services, Delivery tracking services sourced from authorized vendors and delivered to customers. [cite: 29]
        </Text>

        <View style={styles.divider} />

        {/* Section 1: Introduction */}
        <Text style={styles.sectionTitle}>1. INTRODUCTION</Text>
        <Text style={styles.paragraph}>
          This Privacy Policy describes how we collect, use, disclose, and protect your personal information when you use our mobile application, website, and services ("Platform"). [cite: 31]
        </Text>
        <Text style={styles.paragraph}>
          By accessing or using the Platform, you consent to the practices described in this Privacy Policy. [cite: 32]
        </Text>

        {/* Section 2: Information We Collect */}
        <Text style={styles.sectionTitle}>2. INFORMATION WE COLLECT</Text>
        
        <Text style={styles.subSectionTitle}>2.1 Information You Provide Directly</Text>
        <Text style={styles.bulletItem}>• Full name [cite: 35]</Text>
        <Text style={styles.bulletItem}>• Mobile number [cite: 36]</Text>
        <Text style={styles.bulletItem}>• Email address [cite: 37]</Text>
        <Text style={styles.bulletItem}>• Delivery address [cite: 38]</Text>
        <Text style={styles.bulletItem}>• Profile photo (optional) [cite: 39]</Text>
        <Text style={styles.bulletItem}>• Customer support communications [cite: 40]</Text>
        <Text style={styles.bulletItem}>• Feedback and reviews [cite: 41]</Text>

        <Text style={styles.subSectionTitle}>2.2 Payment Information</Text>
        <Text style={styles.paragraph}>
          Payment method details (processed via third-party payment gateways) and Transaction history. [cite: 43]
        </Text>
        <Text style={styles.importantNote}>
          ▲ We do not store full credit/debit card numbers on our servers. [cite: 44]
        </Text>

        <Text style={styles.subSectionTitle}>2.3 Automatically Collected Information</Text>
        <Text style={styles.bulletItem}>• Device type & model [cite: 46]</Text>
        <Text style={styles.bulletItem}>• Operating system version [cite: 47]</Text>
        <Text style={styles.bulletItem}>• IP address [cite: 48]</Text>
        <Text style={styles.bulletItem}>• App usage data [cite: 49]</Text>
        <Text style={styles.bulletItem}>• Crash logs [cite: 50]</Text>
        <Text style={styles.bulletItem}>• Cookies & tracking technologies [cite: 51]</Text>

        <Text style={styles.subSectionTitle}>2.4 Location Information</Text>
        <Text style={styles.paragraph}>
          Precise or approximate location (with user permission) for: [cite: 53]
        </Text>
        <Text style={styles.bulletItem}>o Showing nearby restaurants [cite: 55]</Text>
        <Text style={styles.bulletItem}>o Enabling delivery tracking [cite: 56]</Text>
        <Text style={styles.bulletItem}>o Fraud prevention [cite: 57]</Text>
        <Text style={styles.paragraph}>
          Location access is optional and can be disabled from device settings. [cite: 58]
        </Text>

        {/* Section 3: How We Use Your Information */}
        <Text style={styles.sectionTitle}>3. HOW WE USE YOUR INFORMATION</Text>
        <Text style={styles.paragraph}>We use collected information to: [cite: 60]</Text>
        <Text style={styles.bulletItem}>• Process and deliver orders [cite: 62]</Text>
        <Text style={styles.bulletItem}>• Facilitate payments [cite: 63]</Text>
        <Text style={styles.bulletItem}>• Provide customer support [cite: 64]</Text>
        <Text style={styles.bulletItem}>• Improve app functionality [cite: 65]</Text>
        <Text style={styles.bulletItem}>• Personalize restaurant recommendations [cite: 66]</Text>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 10,
    color: '#000',
  },
  subSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 8,
    color: '#333',
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
    marginBottom: 10,
  },
  bulletItem: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
    marginLeft: 15,
    marginBottom: 5,
  },
  importantNote: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#d32f2f',
    marginVertical: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 20,
  },
});

export default PrivacyPolicy;