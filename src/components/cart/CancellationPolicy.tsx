import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const CancellationPolicy: React.FC = () => {
  return (
    <View style={styles.cancellationPolicy}>
      <Text style={styles.policyTitle}>CANCELLATION POLICY</Text>
      <Text style={styles.policyText}>
        Help us reduce food waste by avoiding cancellations after placing your
        order. A 100% cancellation fee will be applied.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cancellationPolicy: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  policyTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  policyText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
});

export default CancellationPolicy;
