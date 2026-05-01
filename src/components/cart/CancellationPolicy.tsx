import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal, SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface CancellationPolicyProps {
  onClose?: () => void;
}

const CancellationPolicy = ({ onClose }: CancellationPolicyProps) => {
  return (
    <SafeAreaView style={styles.overlay}>
      <View style={styles.container}>
        <View style={styles.header}>
             <TouchableOpacity style={styles.backButton} onPress={onClose}>
                <Ionicons name="arrow-back" size={24} color="#333" />
             </TouchableOpacity>
            <Text style={styles.headerTitle}>Order Details</Text>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.policyBox}>
            <Text style={styles.policyTitle}>CANCELLATION POLICY</Text>
            <Text style={styles.policyText}>
              Help us reduce food waste by avoiding cancellations after placing your order.
              A 100% cancellation fee will be applied to this order.
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    paddingRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  policyBox: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
    padding: 16,
    borderRadius: 8,
  },
  policyTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  policyText: {
    fontSize: 13,
    color: '#878787',
    lineHeight: 20,
  },
});

export default CancellationPolicy;
