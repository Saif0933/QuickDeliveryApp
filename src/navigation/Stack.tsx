import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoryScreen from '../screen/Category';
import HomeScreen from '../screen/HomeScreen';
import Login from '../screen/Login';
import Otp from '../screen/Otp';
import ProfileScreen from '../screen/ProfileScreen';
import ZomatoMoneyPage from '../screen/ZomatoMoneyPage';
import LocationScreen from '../screen/LoctionScreen';
import DiningScreen from '../screen/DiningScreen';
import YourProfile from '../screen/YourProfile';
import YourOrder from '../screen/YourOrder';
import VegMode from '../screen/VegMode';
import AddressBookScreen from '../screen/AddressBookScreen';
import AboutScreen from '../screen/AboutScreen';
import ActivityScreen from '../screen/ActivityScreen';
import SettingsScreen from '../screen/SettingScreen';
import FeedbackScreen from '../screen/FeedbackScreen';
import GoldScreen from '../screen/GoldScreen';
import BookingScreen from '../screen/BookingScreen';
import NotificationScreen from '../screen/NotificationScreen';
import AccountSettingsScreen from '../screen/AccountSettingsScreen';
import AccessibilitySettings from '../screen/AccessibilitySettings';
import CheckoutScreen from '../screen/CheckoutScreen';
import PaymentSettings from '../screen/PaymentSettings';
import SupportScreen from '../screen/SupportScreen';
import ReportEmergencyScreen from '../screen/ReportEmergencyScreen';
import CartScreen from '../screen/CheckoutScreen';
import Splash from '../screen/Splash';
import FoodList from '../components/categories/FoodList';
import ProductScreen from '../components/categories/ProductScreen';
import PaymentSuccessScreen from '../components/cart/PaymentSuccessScreen';
import RestaurantInfoScreen from '../components/categories/RestaurantInfoScreen'

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    // ✅ Added return
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName="Login"
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
        <Stack.Screen name="VegMode" component={VegMode} />
        <Stack.Screen name="AddressBookScreen" component={AddressBookScreen} />
        <Stack.Screen name="AboutScreen" component={AboutScreen} />
        <Stack.Screen name="ActivityScreen" component={ActivityScreen} />
        <Stack.Screen name="SettingScreen" component={SettingsScreen} />
        <Stack.Screen name="FeedbackScreen" component={FeedbackScreen} />
        <Stack.Screen name="GoldScreen" component={GoldScreen} />
        <Stack.Screen name="BookingScreen" component={BookingScreen} />
        <Stack.Screen name="FoodList" component={FoodList} />
        <Stack.Screen name="ProductScreen" component={ProductScreen} />
        <Stack.Screen name="PaymentSuccessScreen" component={PaymentSuccessScreen} />
        <Stack.Screen name="RestaurantInfoScreen" component={RestaurantInfoScreen} />
        
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
