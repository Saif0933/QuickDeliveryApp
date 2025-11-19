import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import Header from '../../components/cart/Header';
import FoodItems from '../../components/cart/FoodItems';
import CouponsSection from '../../components/cart/CouponsSection';
import DeliverySection from '../../components/cart/DeliverySection';
import FeedingIndiaSection from '../../components/cart/FeedingIndiaSection';
import CancellationPolicy from '../../components/cart/CancellationPolicy';
import ZomatoMoney from '../../components/cart/ZomatoMoney';
import BottomSection from '../../components/cart/BottomSection';

const CartScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <Header />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <FoodItems />
        <CouponsSection />
        <DeliverySection />
        <FeedingIndiaSection />
        <CancellationPolicy />
        <ZomatoMoney />
        <View style={{height: 100}} />
      </ScrollView>
      <BottomSection />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
});

export default CartScreen;
