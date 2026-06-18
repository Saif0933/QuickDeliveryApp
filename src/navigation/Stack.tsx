import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screen/splash/SplashScreen';
import LoginScreen from '../screen/login/LoginScreen';
import OtpScreen from '../screen/login/OtpScreen';
import HomeScreen from '../screen/home/HomeScreen';
import BrandScreen from '../screen/home/BrandScreen';
import SettingScreen from '../screen/setting/SettingScreen';
import CartScreen from '../screen/cart/CartScreen';
import OrdersScreen from '../screen/orders/OrdersScreen';
import EditProfileScreen from '../screen/setting/EditProfileScreen';
import SavedAddressesScreen from '../screen/setting/SavedAddressesScreen';
import BottomTabNavigator from './bottomTab';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Otp: { phoneNumber: string };
  Home: undefined;
  Setting: undefined;
  Cart: undefined;
  Orders: undefined;
  EditProfile: undefined;
  SavedAddresses: undefined;
  Brand: { brandName: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Otp" component={OtpScreen} />
        <Stack.Screen name="Home" component={BottomTabNavigator} />
        <Stack.Screen name="Brand" component={BrandScreen} />
        <Stack.Screen name="Setting" component={SettingScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Orders" component={OrdersScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="SavedAddresses" component={SavedAddressesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
