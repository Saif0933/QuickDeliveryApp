import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllRestaurantCart from '../components/cart/AllRestaurantCart';
import OrderPlacedScreen from '../components/cart/OrderPlacedScreen';
import OrderTrackingScreen from '../components/cart/OrderTrackingScreen';
import FoodList from '../components/categories/FoodList';
import MealsUnderScreen from '../components/categories/MealsUnderScreen';
import ProductScreen from '../components/categories/ProductScreen';
import RestaurantInfoScreen from '../components/categories/RestaurantInfoScreen';
import AboutScreen from '../screen/AboutScreen';
import AccessibilitySettings from '../screen/AccessibilitySettings';
import AccountSettingsScreen from '../screen/AccountSettingsScreen';
import ActivityScreen from '../screen/ActivityScreen';
import AddressBookScreen from '../screen/AddressBookScreen';
import BookingScreen from '../screen/BookingScreen';
import CategoryScreen from '../screen/Category';
import { default as CartScreen, default as CheckoutScreen } from '../screen/CheckoutScreen';
import DiningScreen from '../screen/DiningScreen';
import FeedbackScreen from '../screen/FeedbackScreen';
import GoldScreen from '../screen/GoldScreen';
import HomeScreen from '../screen/HomeScreen';
import LocationScreen from '../screen/LoctionScreen';
import Login from '../screen/Login';
import NotificationScreen from '../screen/NotificationScreen';
import OrderDetailsScreen from '../screen/OrderDetailsScreen';
import Otp from '../screen/Otp';
import PaymentSettings from '../screen/PaymentSettings';
import ProfileScreen from '../screen/ProfileScreen';
import ReportEmergencyScreen from '../screen/ReportEmergencyScreen';
import SearchScreen from '../screen/SearchScreen';
import SelectAddressScreen from '../screen/SelectAddressScreen';
import SettingsScreen from '../screen/SettingScreen';
import Splash from '../screen/Splash';
import SupportScreen from '../screen/SupportScreen';
import VegMode from '../screen/VegMode';
import YourOrder from '../screen/YourOrder';
import YourProfile from '../screen/YourProfile';
import ZomatoMoneyPage from '../screen/ZomatoMoneyPage';
import PrivacyPolicy from '../screen/legal/PrivacyPolicy';
import RefundPolicy from '../screen/legal/RefundPolicy';
import TermsAndConditions from '../screen/legal/TermsAndConditions';

const Stack = createNativeStackNavigator();


const MyStack = () => {
  return (
    // ✅ Added return
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName="AllRestaurantCart"
        screenOptions={{ headerShown: false }}
      >
        {/* <Stack.Screen name="FoodList" component={FoodList} /> */}
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Category" component={CategoryScreen} />
        <Stack.Screen name="ZomatoMoneyPage" component={ZomatoMoneyPage} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="LocationScreen" component={LocationScreen} />
        <Stack.Screen name="DiningScreen" component={DiningScreen} />
        <Stack.Screen name="YourProfile" component={YourProfile} />
        <Stack.Screen name="YourOrder" component={YourOrder} />
        <Stack.Screen 
          name="VegMode" 
          component={VegMode} 
          options={{ presentation: 'transparentModal' }} 
        />
        <Stack.Screen name="AddressBookScreen" component={AddressBookScreen} />
        <Stack.Screen name="AboutScreen" component={AboutScreen} />
        <Stack.Screen name="ActivityScreen" component={ActivityScreen} />
        <Stack.Screen name="SettingScreen" component={SettingsScreen} />
        <Stack.Screen name="FeedbackScreen" component={FeedbackScreen} />
        <Stack.Screen name="GoldScreen" component={GoldScreen} />
        <Stack.Screen name="BookingScreen" component={BookingScreen} />
        <Stack.Screen name="FoodList" component={FoodList} />
        <Stack.Screen name="ProductScreen" component={ProductScreen} />
        <Stack.Screen name="OrderPlacedScreen" component={OrderPlacedScreen} />
        <Stack.Screen name="RestaurantInfoScreen" component={RestaurantInfoScreen} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="SelectAddressScreen" component={SelectAddressScreen} />
        <Stack.Screen name="MealsUnderScreen" component={MealsUnderScreen} />
        <Stack.Screen name="OrderDetailsScreen" component={OrderDetailsScreen} />
        <Stack.Screen name="OrderTrackingScreen" component={OrderTrackingScreen} />
        <Stack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
        />
        <Stack.Screen
          name="AccountSettingsScreen"
          component={AccountSettingsScreen}
        />
        <Stack.Screen
          name="AccessibilitySettings"
          component={AccessibilitySettings}
        />
        <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
        <Stack.Screen name="PaymentSettings" component={PaymentSettings} />
        <Stack.Screen name="SupportScreen" component={SupportScreen} />
        <Stack.Screen
          name="ReportEmergencyScreen"
          component={ReportEmergencyScreen}
        />
        <Stack.Screen name="cart" component={CartScreen} />
        <Stack.Screen name="AllRestaurantCart" component={AllRestaurantCart} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        <Stack.Screen name="RefundPolicy" component={RefundPolicy} />
        <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
