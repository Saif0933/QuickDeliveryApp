import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const FeedingIndiaSection: React.FC = () => {
  return (
    <View style={styles.feedingIndiaSection}>
      <View style={styles.feedingIndiaHeader}>
        <Text style={styles.feedingIndiaTitle}>
          Let's serve a brighter future
        </Text>
        <MaterialIcons name="info-outline" size={16} color="#666" />
      </View>
      <Text style={styles.feedingIndiaSubtitle}>
        Through nutritious meals, you can
      </Text>
      <Text style={styles.feedingIndiaSubtitle}>
        empower young minds for greatness
      </Text>

      <View style={styles.donationSection}>
        <Text style={styles.donateText}>Donate to Feeding India</Text>
        <Text style={styles.donateAmount}>₹2</Text>
        <TouchableOpacity style={styles.addDonationButton}>
          <Text style={styles.addDonationText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  feedingIndiaSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 8,
    borderTopColor: '#F8F8F8',
    backgroundColor: '#FFF3E0',
  },
  feedingIndiaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  feedingIndiaTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    flex: 1,
  },
  feedingIndiaSubtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  donationSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  donateText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
    flex: 1,
  },
  donateAmount: {
    fontSize: 14,
    color: '#666',
    marginRight: 12,
  },
  addDonationButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#3e0dd2ff',
    borderRadius: 4,
  },
  addDonationText: {
    fontSize: 12,
    color: '#3e0dd2ff',
    fontWeight: '600',
  },
});

export default FeedingIndiaSection;
