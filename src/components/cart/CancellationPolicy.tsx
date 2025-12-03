import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS} from '../../theme/color';

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
    borderTopColor: COLORS.background,
    backgroundColor: COLORS.white,
  },
  policyTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  policyText: {
    fontSize: 12,
    color: COLORS.muted,
    lineHeight: 18,
  },
});

export default CancellationPolicy;
