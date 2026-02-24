import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PrivacyPolicy = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header Section */}
        <Text style={styles.mainTitle}>About Us</Text>
        
        <Text style={styles.paragraph}>
          Minta Club Private Limited (“Company”, “we”, “our”, “us”) is a company incorporated under the Companies Act, 2013, India.
        </Text>
        <Text style={styles.paragraph}>
          Minta Restro is a brand owned and operated by Minta Club Private Limited.
        </Text>
        <Text style={styles.paragraph}>
          Minta Restro operates an online platform for the sale and delivery of Online food ordering services Restaurant listings and reviews, Payment facilitation services, Delivery tracking services sourced from authorized vendors and delivered to customers.
        </Text>

        <View style={styles.divider} />

        {/* Section 1: Introduction */}
        <Text style={styles.sectionTitle}>1. INTRODUCTION</Text>
        <Text style={styles.paragraph}>
          This Privacy Policy describes how we collect, use, disclose, and protect your personal information when you use our mobile application, website, and services (“Platform”).
        </Text>
        <Text style={styles.paragraph}>
          By accessing or using the Platform, you consent to the practices described in this Privacy Policy.
        </Text>

        {/* Section 2: Information We Collect */}
        <Text style={styles.sectionTitle}>2. INFORMATION WE COLLECT</Text>
        
        <Text style={styles.subSectionTitle}>2.1 Information You Provide Directly</Text>
        <Text style={styles.bulletItem}>• Full name</Text>
        <Text style={styles.bulletItem}>• Mobile number</Text>
        <Text style={styles.bulletItem}>• Email address</Text>
        <Text style={styles.bulletItem}>• Delivery address</Text>
        <Text style={styles.bulletItem}>• Profile photo (optional)</Text>
        <Text style={styles.bulletItem}>• Customer support communications</Text>
        <Text style={styles.bulletItem}>• Feedback and reviews</Text>

        <Text style={styles.subSectionTitle}>2.2 Payment Information</Text>
        <Text style={styles.bulletItem}>• Payment method details (processed via third-party payment gateways)</Text>
        <Text style={styles.bulletItem}>• Transaction history</Text>
        <Text style={styles.importantNote}>
          ⚠ We do not store full credit/debit card numbers on our servers.
        </Text>

        <Text style={styles.subSectionTitle}>2.3 Automatically Collected Information</Text>
        <Text style={styles.bulletItem}>• Device type & model</Text>
        <Text style={styles.bulletItem}>• Operating system version</Text>
        <Text style={styles.bulletItem}>• IP address</Text>
        <Text style={styles.bulletItem}>• App usage data</Text>
        <Text style={styles.bulletItem}>• Crash logs</Text>
        <Text style={styles.bulletItem}>• Cookies & tracking technologies</Text>

        <Text style={styles.subSectionTitle}>2.4 Location Information</Text>
        <Text style={styles.bulletItem}>• Precise or approximate location (with user permission) for:</Text>
        <Text style={styles.bulletItem}>    o Showing nearby restaurants</Text>
        <Text style={styles.bulletItem}>    o Enabling delivery tracking</Text>
        <Text style={styles.bulletItem}>    o Fraud prevention</Text>
        <Text style={styles.paragraph}>
          Location access is optional and can be disabled from device settings.
        </Text>

        {/* Section 3: How We Use Your Information */}
        <Text style={styles.sectionTitle}>3. HOW WE USE YOUR INFORMATION</Text>
        <Text style={styles.paragraph}>We use collected information to:</Text>
        <Text style={styles.bulletItem}>• Process and deliver orders</Text>
        <Text style={styles.bulletItem}>• Facilitate payments</Text>
        <Text style={styles.bulletItem}>• Provide customer support</Text>
        <Text style={styles.bulletItem}>• Improve app functionality</Text>
        <Text style={styles.bulletItem}>• Personalize restaurant recommendation</Text>
        <Text style={styles.bulletItem}>• Send order updates and transactional notifications</Text>
        <Text style={styles.bulletItem}>• Prevent fraud and misuse</Text>
        <Text style={styles.bulletItem}>• Comply with legal obligations</Text>
        <Text style={styles.paragraph}>We do not sell your personal data.</Text>

        {/* Section 4: Data Sharing & Disclosure */}
        <Text style={styles.sectionTitle}>4. DATA SHARING & DISCLOSURE</Text>
        <Text style={styles.paragraph}>We may share information with:</Text>
        
        <Text style={styles.subSectionTitle}>4.1 Restaurants/Vendors</Text>
        <Text style={styles.paragraph}>To fulfill your order (name, contact number, address).</Text>
        
        <Text style={styles.subSectionTitle}>4.2 Delivery Partners</Text>
        <Text style={styles.paragraph}>For order delivery and coordination.</Text>
        
        <Text style={styles.subSectionTitle}>4.3 Payment Gateways</Text>
        <Text style={styles.paragraph}>For secure transaction processing.</Text>
        
        <Text style={styles.subSectionTitle}>4.4 Service Providers</Text>
        <Text style={styles.paragraph}>Cloud hosting, analytics, SMS/email service providers.</Text>
        
        <Text style={styles.subSectionTitle}>4.5 Legal Authorities</Text>
        <Text style={styles.paragraph}>If required by law or court order.</Text>
        
        <Text style={styles.paragraph}>All third parties are contractually obligated to protect your data.</Text>

        {/* Section 5: Data Retention */}
        <Text style={styles.sectionTitle}>5. DATA RETENTION</Text>
        <Text style={styles.paragraph}>We retain personal data:</Text>
        <Text style={styles.bulletItem}>• As long as your account is active</Text>
        <Text style={styles.bulletItem}>• As required for legal, tax, and regulatory compliance</Text>
        <Text style={styles.bulletItem}>• For fraud prevention and dispute resolution</Text>
        <Text style={styles.paragraph}>
          You may request deletion of your account and personal data (subject to legal retention requirements).
        </Text>

        {/* Section 6: Data Security */}
        <Text style={styles.sectionTitle}>6. DATA SECURITY</Text>
        <Text style={styles.paragraph}>We implement:</Text>
        <Text style={styles.bulletItem}>• SSL encryption</Text>
        <Text style={styles.bulletItem}>• Secure cloud storage</Text>
        <Text style={styles.bulletItem}>• Role-based access controls</Text>
        <Text style={styles.bulletItem}>• Regular security audits</Text>
        <Text style={styles.paragraph}>
          However, no system is 100% secure. Users should protect login credentials.
        </Text>

        {/* Section 7: Your Rights */}
        <Text style={styles.sectionTitle}>7. YOUR RIGHTS</Text>
        <Text style={styles.paragraph}>You have the right to:</Text>
        <Text style={styles.bulletItem}>• Access your data</Text>
        <Text style={styles.bulletItem}>• Correct inaccurate data</Text>
        <Text style={styles.bulletItem}>• Request deletion</Text>
        <Text style={styles.bulletItem}>• Withdraw consent</Text>
        <Text style={styles.bulletItem}>• Opt-out of marketing communications</Text>
        <Text style={styles.paragraph}>Requests can be made via support@mintarestro.com.</Text>

        {/* Section 8: Children's Privacy */}
        <Text style={styles.sectionTitle}>8. CHILDREN’S PRIVACY</Text>
        <Text style={styles.paragraph}>The Platform is not intended for users under 18 years of age.</Text>
        <Text style={styles.paragraph}>We do not knowingly collect personal data from minors.</Text>

        {/* Section 9: Cookies & Tracking Technologies */}
        <Text style={styles.sectionTitle}>9. COOKIES & TRACKING TECHNOLOGIES</Text>
        <Text style={styles.paragraph}>We use cookies and similar tools to:</Text>
        <Text style={styles.bulletItem}>• Improve app performance</Text>
        <Text style={styles.bulletItem}>• Analyse usage patterns</Text>
        <Text style={styles.bulletItem}>• Personalize content</Text>
        <Text style={styles.paragraph}>Users may disable cookies through device settings.</Text>

        {/* Section 10: Third-Party Links */}
        <Text style={styles.sectionTitle}>10. THIRD-PARTY LINKS</Text>
        <Text style={styles.paragraph}>
          The Platform may contain links to third-party websites or services. We are not responsible for their privacy practices.
        </Text>

        {/* Section 11: International Data Transfers */}
        <Text style={styles.sectionTitle}>11. INTERNATIONAL DATA TRANSFERS</Text>
        <Text style={styles.paragraph}>
          If applicable, your data may be stored or processed outside your state/country, subject to adequate safeguards.
        </Text>

        {/* Section 12: Google Play Data Safety Disclosure */}
        <Text style={styles.sectionTitle}>12. GOOGLE PLAY DATA SAFETY DISCLOSURE</Text>
        <Text style={styles.paragraph}>In compliance with Google Play policies:</Text>
        <Text style={styles.bulletItem}>• We collect personal information for order fulfilment and service improvement.</Text>
        <Text style={styles.bulletItem}>• We do not sell personal data.</Text>
        <Text style={styles.bulletItem}>• Data is encrypted in transit.</Text>
        <Text style={styles.bulletItem}>• Users can request deletion of their data.</Text>
        <Text style={styles.bulletItem}>• Sensitive data such as payment details are processed via secure third-party gateways.</Text>

        {/* Section 13: Changes to This Policy */}
        <Text style={styles.sectionTitle}>13. CHANGES TO THIS POLICY</Text>
        <Text style={styles.paragraph}>
          We may update this Privacy Policy periodically. Continued use of the Platform constitutes acceptance of changes.
        </Text>

        {/* Section 14: Contact Us */}
        <Text style={styles.sectionTitle}>14. CONTACT US</Text>
        <Text style={styles.paragraph}>For privacy-related concerns:</Text>
        <Text style={styles.paragraph}>Minta Restro</Text>
        <Text style={styles.paragraph}>Email: support@mintarestro.com</Text>
        <Text style={styles.paragraph}>Ranchi, Jharkhand</Text>

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