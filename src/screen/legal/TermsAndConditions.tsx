import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TermsAndConditions = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header Section */}
        <Text style={styles.headerSmall}>About Us</Text>
        <Text style={styles.mainTitle}>Terms And Conditions</Text>
        
        <Text style={styles.paragraph}>
          Minta Club Private Limited ("Company", "we", "our", "us") is a company incorporated under the Companies Act, 2013, India.
        </Text>
        <Text style={styles.paragraph}>
          Minta Restro is a brand owned and operated by Minta Club Private Limited.
        </Text>
        <Text style={styles.paragraph}>
          Minta Restro operates an online platform for the sale and delivery of Online food ordering services Restaurant listings and reviews, Payment facilitation services, Delivery tracking services sourced from authorized vendors and delivered to customers.
        </Text>

        <View style={styles.divider} />

        {/* Section 1: Eligibility */}
        <Text style={styles.sectionTitle}>1. Eligibility</Text>
        <Text style={styles.paragraph}>
          You must be at least 18 years old (or the age of majority in your jurisdiction) to use this Platform. By using the Platform, you confirm that:
        </Text>
        <Text style={styles.bulletItem}>• You are legally capable of entering into a binding contract.</Text>
        <Text style={styles.bulletItem}>• All information provided by you is accurate and complete.</Text>

        {/* Section 2: Services Provided */}
        <Text style={styles.sectionTitle}>2. Services Provided</Text>
        <Text style={styles.paragraph}>Minta Restro provides:</Text>
        <Text style={styles.bulletItem}>• Online food ordering services </Text>
        <Text style={styles.bulletItem}>• Restaurant listings and reviews </Text>
        <Text style={styles.bulletItem}>• Payment facilitation services </Text>
        <Text style={styles.bulletItem}>• Delivery tracking services </Text>
        <Text style={styles.paragraph}>
          We act as an intermediary between users and restaurants/delivery partners.
        </Text>

        {/* Section 3: Account Registration */}
        <Text style={styles.sectionTitle}>3. Account Registration</Text>
        <Text style={styles.paragraph}>To access certain features, you must create an account. You agree to:</Text>
        <Text style={styles.bulletItem}>• Provide accurate information </Text>
        <Text style={styles.bulletItem}>• Maintain confidentiality of login credentials </Text>
        <Text style={styles.bulletItem}>• Accept responsibility for activities under your account </Text>
        <Text style={styles.paragraph}>
          We reserve the right to suspend or terminate accounts for violations of these Terms.
        </Text>

        {/* Section 4: Orders and Payments */}
        <Text style={styles.sectionTitle}>4. Orders and Payments</Text>
        <Text style={styles.subSectionTitle}>4.1 Order Acceptance</Text>
        <Text style={styles.paragraph}>All orders are subject to restaurant acceptance and availability.</Text>
        <Text style={styles.subSectionTitle}>4.2 Pricing</Text>
        <Text style={styles.paragraph}>Prices displayed are determined by the restaurants and include applicable taxes and delivery fees.</Text>

        {/* Section 9: Intellectual Property */}
        <Text style={styles.sectionTitle}>9. Intellectual Property</Text>
        <Text style={styles.paragraph}>
          All content on the Platform, including logos, text, and software, is the property of Minta Club Private Limited. You may not modify, distribute, or reproduce any part of the Platform without written consent.
        </Text>

        {/* Section 10: Privacy */}
        <Text style={styles.sectionTitle}>10. Privacy</Text>
        <Text style={styles.paragraph}>
          Your use of the Platform is also governed by our Privacy Policy, which explains how we collect, use, and protect your data.
        </Text>

        {/* Section 11: Limitation of Liability */}
        <Text style={styles.sectionTitle}>11. Limitation of Liability</Text>
        <Text style={styles.paragraph}>To the maximum extent permitted by law:</Text>
        <Text style={styles.bulletItem}>• Minta Restro is not liable for food quality or preparation (this is the responsibility of restaurants).</Text>
        <Text style={styles.bulletItem}>• We are not liable for delays caused by restaurants, delivery partners, or unforeseen events.</Text>
        <Text style={styles.bulletItem}>• Our liability is limited to the amount paid for the order in question.</Text>

        {/* Section 12: Disclaimers */}
        <Text style={styles.sectionTitle}>12. Disclaimers</Text>
        <Text style={styles.paragraph}>
          The Platform is provided "as is" and "as available" without warranties of any kind, either express or implied. We do not guarantee:
        </Text>
        <Text style={styles.bulletItem}>• Continuous, error-free service </Text>
        <Text style={styles.bulletItem}>• Availability of any restaurant </Text>
        <Text style={styles.bulletItem}>• Accuracy of restaurant listings </Text>

        {/* Section 13: Termination */}
        <Text style={styles.sectionTitle}>13. Termination</Text>
        <Text style={styles.paragraph}>We may suspend or terminate your access if:</Text>
        <Text style={styles.bulletItem}>• You violate these Terms </Text>
        <Text style={styles.bulletItem}>• We are required by law </Text>
        <Text style={styles.bulletItem}>• Fraud or misuse is detected </Text>

        {/* Section 14: Governing Law */}
        <Text style={styles.sectionTitle}>14. Governing Law</Text>
        <Text style={styles.paragraph}>
          These Terms shall be governed by and construed in accordance with the laws of India, Jharkhand. Any disputes shall be subject to the exclusive jurisdiction of the courts located in Ranchi.
        </Text>

        {/* Section 15: Changes to Terms */}
        <Text style={styles.sectionTitle}>15. Changes to Terms</Text>
        <Text style={styles.paragraph}>
          We may update these Terms at any time. Continued use of the Platform after updates constitutes acceptance of the revised Terms.
        </Text>

        {/* Section 16: Contact Information */}
        <Text style={styles.sectionTitle}>16. Contact Information</Text>
        <Text style={styles.paragraph}>For questions or concerns regarding these Terms, please contact:</Text>
        <Text style={styles.bulletItem}>Minta Restro Support Team </Text>
        <Text style={styles.bulletItem}>Email: support@mintarestro.com </Text>
        <Text style={styles.bulletItem}>Ranchi, Jharkhand </Text>

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
  headerSmall: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    marginBottom: 20,
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
    marginBottom: 5,
    color: '#444',
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
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 20,
  },
});

export default TermsAndConditions;