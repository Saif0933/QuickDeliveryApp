import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PolicyScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header Section */}
        <Text style={styles.mainTitle}>REFUND AND RETURN POLICY</Text>
        <Text style={styles.effectiveDate}>Effective Date: 05/02/2026</Text>
        
        <Text style={styles.paragraph}>
          [cite_start]Minta Restro is an online marketplace that facilitates the sale and delivery of fresh raw poultry, meat, and fish products. [cite: 3]
        </Text>
        <Text style={styles.paragraph}>
          [cite_start]By placing an order through the Minta Restro mobile application, you agree to this Delivery, Cancellation, and Refund Policy. [cite: 4]
        </Text>

        <View style={styles.divider} />

        {/* Section 1: Delivery Policy */}
        <Text style={styles.sectionTitle}>1. [cite_start]DELIVERY POLICY [cite: 5]</Text>
        
        [cite_start]<Text style={styles.subSectionTitle}>1.1 Order Processing & Delivery Time [cite: 6]</Text>
        [cite_start]<Text style={styles.bulletItem}>• Orders are generally processed within 60 minutes of confirmation. [cite: 7]</Text>
        [cite_start]<Text style={styles.bulletItem}>• Delivery is typically completed within 60 minutes after dispatch, subject to location, traffic, weather conditions, and operational factors. [cite: 8, 10]</Text>
        [cite_start]<Text style={styles.bulletItem}>• Delivery timelines are estimates and may vary. [cite: 11]</Text>

        [cite_start]<Text style={styles.subSectionTitle}>1.2 Delivery Charges [cite: 12]</Text>
        [cite_start]<Text style={styles.bulletItem}>• Delivery fees (if applicable) are displayed clearly at checkout before payment confirmation. [cite: 13]</Text>
        [cite_start]<Text style={styles.bulletItem}>• Charges may vary depending on distance, order value, or promotional offers. [cite: 14]</Text>

        [cite_start]<Text style={styles.subSectionTitle}>1.3 Order Tracking [cite: 15]</Text>
        [cite_start]<Text style={styles.paragraph}>Customers can track order status in real-time within the Minta Restro app. [cite: 16]</Text>

        {/* Section 2: Nature of Products */}
        <Text style={styles.sectionTitle}>2. [cite_start]NATURE OF PRODUCTS [cite: 17]</Text>
        <Text style={styles.paragraph}>
          Minta Restro supplies perishable food items (raw poultry, meat, and fish). [cite_start]Due to hygiene and food safety regulations: [cite: 18, 19]
        </Text>
        [cite_start]<Text style={styles.bulletItem}>• Products are non-returnable once delivered. [cite: 20]</Text>
        [cite_start]<Text style={styles.bulletItem}>• We do not offer product replacements. [cite: 21]</Text>
        [cite_start]<Text style={styles.bulletItem}>• Refunds are provided only in eligible cases described below. [cite: 22]</Text>
        [cite_start]<Text style={styles.paragraph}>This policy complies with applicable food safety and consumer protection standards. [cite: 23]</Text>

        {/* Section 3: Refund Eligibility */}
        <Text style={styles.sectionTitle}>3. [cite_start]REFUND ELIGIBILITY [cite: 24]</Text>
        [cite_start]<Text style={styles.paragraph}>Refunds may be issued in the following circumstances, subject to verification: [cite: 25]</Text>
        <Text style={styles.bulletItem}>1. [cite_start]Product delivered in damaged condition. [cite: 26]</Text>
        <Text style={styles.bulletItem}>2. [cite_start]Product appears spoiled at the time of delivery. [cite: 27]</Text>
        <Text style={styles.bulletItem}>3. [cite_start]Wrong product delivered. [cite: 28]</Text>
        <Text style={styles.bulletItem}>4. [cite_start]Item(s) missing from the order. [cite: 29]</Text>
        <Text style={styles.bulletItem}>5. [cite_start]Order marked as delivered but not received. [cite: 30]</Text>
        [cite_start]<Text style={styles.paragraph}>All refund claims are subject to review and approval by Minta Restro. [cite: 31]</Text>

        {/* Section 4: Time Limit */}
        <Text style={styles.sectionTitle}>4. [cite_start]TIME LIMIT FOR REPORTING ISSUES [cite: 32]</Text>
        [cite_start]<Text style={styles.bulletItem}>• Customers must report delivery-related issues within 30 minutes of delivery confirmation. [cite: 33]</Text>
        [cite_start]<Text style={styles.bulletItem}>• Reports can be submitted through in-app support or customer service. [cite: 34]</Text>
        [cite_start]<Text style={styles.bulletItem}>• Claims submitted beyond this timeframe may not be eligible due to the perishable nature of food products. [cite: 35]</Text>

        {/* Section 5: Required Proof */}
        <Text style={styles.sectionTitle}>5. [cite_start]REQUIRED PROOF [cite: 36]</Text>
        [cite_start]<Text style={styles.paragraph}>To process a refund request, customers may be required to provide: [cite: 37]</Text>
        [cite_start]<Text style={styles.bulletItem}>• Clear photos or video evidence [cite: 38]</Text>
        [cite_start]<Text style={styles.bulletItem}>• Original packaging (if applicable) [cite: 39]</Text>
        [cite_start]<Text style={styles.bulletItem}>• Order ID and relevant details [cite: 40]</Text>
        [cite_start]<Text style={styles.paragraph}>Insufficient or unverifiable claims may result in denial of refund. [cite: 41]</Text>

        {/* Section 6: Refund Processing */}
        <Text style={styles.sectionTitle}>6. [cite_start]REFUND PROCESSING [cite: 42]</Text>
        [cite_start]<Text style={styles.bulletItem}>• Approved refunds are processed to the original payment method only. [cite: 43]</Text>
        [cite_start]<Text style={styles.bulletItem}>• Refunds are typically credited within 5-10 business days, depending on the payment provider or bank. [cite: 44]</Text>
        [cite_start]<Text style={styles.bulletItem}>• Minta Restro does not provide cash refunds for online payments. [cite: 45]</Text>

        {/* Section 7: Cancellation Policy */}
        <Text style={styles.sectionTitle}>7. [cite_start]CANCELLATION POLICY [cite: 46]</Text>
        [cite_start]<Text style={styles.subSectionTitle}>7.1 Cancellation Before Dispatch [cite: 47]</Text>
        [cite_start]<Text style={styles.bulletItem}>• Orders may be cancelled within 30 minutes of placement, provided they have not been dispatched. [cite: 48]</Text>
        [cite_start]<Text style={styles.bulletItem}>• Eligible cancellations will receive a full refund. [cite: 49]</Text>
        
        [cite_start]<Text style={styles.subSectionTitle}>7.2 Cancellation After Dispatch [cite: 50]</Text>
        [cite_start]<Text style={styles.bulletItem}>• Once an order is dispatched, cancellation may not be possible due to food safety and logistics constraints. [cite: 51]</Text>
        [cite_start]<Text style={styles.bulletItem}>• In rare cases, cancellation approval remains at the discretion of Minta Restro. [cite: 52]</Text>

        {/* Section 8: Misuse */}
        <Text style={styles.sectionTitle}>8. [cite_start]MISUSE & FRAUD PREVENTION [cite: 53]</Text>
        [cite_start]<Text style={styles.paragraph}>Minta Restro reserves the right to: [cite: 54]</Text>
        [cite_start]<Text style={styles.bulletItem}>• Reject refund requests that are fraudulent or abusive. [cite: 55]</Text>
        [cite_start]<Text style={styles.bulletItem}>• Limit or suspend accounts involved in repeated false claims. [cite: 56]</Text>
        [cite_start]<Text style={styles.paragraph}>Actions will be taken in accordance with applicable consumer protection laws. [cite: 57]</Text>

        {/* Section 9: Customer Support */}
        <Text style={styles.sectionTitle}>9. [cite_start]CUSTOMER SUPPORT [cite: 58]</Text>
        [cite_start]<Text style={styles.paragraph}>For assistance, customers may contact: [cite: 59]</Text>
        [cite_start]<Text style={styles.bulletItem}>• Email: support@mintarestro.com [cite: 60]</Text>
        [cite_start]<Text style={styles.bulletItem}>• In-App Support: Available within the Minta Restro App [cite: 61]</Text>

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
    marginBottom: 5,
    color: '#000',
  },
  effectiveDate: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
    color: '#555',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#000',
    textTransform: 'uppercase',
  },
  subSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 5,
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
    marginLeft: 10,
    marginBottom: 5,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 15,
  },
});

export default PolicyScreen;