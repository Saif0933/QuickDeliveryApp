import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddToBagScreen from '../components/cart/AddToBagScreen';
// import AllRestaurantCart from '../components/cart/AllRestaurantCart';
import OrderPlacedScreen from '../components/cart/OrderPlacedScreen';
import OrderSummary from '../components/cart/OrderSummary';
import PaymentScreen from '../components/cart/PaymentScreen';
import CategoryProduct from '../components/categories/CategoryProduct';
import MealsUnderScreen from '../components/categories/MealsUnderScreen';
import ProductScreen from '../components/categories/ProductScreen';
import AboutScreen from '../screen/AboutScreen';
// import AccountSettingsScreen from '../screen/AccountSettingsScreen';
// import ActivityScreen from '../screen/ActivityScreen';
import AddressBookScreen from '../screen/AddressBookScreen';
// import BookingScreen from '../screen/BookingScreen';
import BrandStoreScreen from '../screen/brand/BrandStoreScreen';
import ProductBrand from '../screen/brand/ProductBrand';
import CategoryScreen from '../screen/Category';
// import { default as CartScreen } from '../screen/CheckoutScreen';
import FashionMode from '../screen/FashionMode';
// import FeedbackScreen from '../screen/FeedbackScreen';
import HomeScreen from '../screen/HomeScreen';
import PrivacyPolicy from '../screen/legal/PrivacyPolicy';
import RefundPolicy from '../screen/legal/RefundPolicy';
import TermsAndConditions from '../screen/legal/TermsAndConditions';
import LocationScreen from '../screen/LoctionScreen';
import Login from '../screen/Login';
// import NotificationScreen from '../screen/NotificationScreen';
import OrderDetailsScreen from '../components/cart/OrderDetailsScreen';
import Otp from '../screen/Otp';
import PaymentSettings from '../screen/PaymentSettings';
import ProfileScreen from '../screen/ProfileScreen';
import SearchScreen from '../screen/SearchScreen';
import SelectAddressScreen from '../screen/SelectAddressScreen';
import SettingsScreen from '../screen/SettingScreen';
import Splash from '../screen/Splash';
import SuggestedForYou from '../screen/SuggestedForYou';
import SupportScreen from '../screen/SupportScreen';
import TopCollectionsScreen from '../screen/TopCollectionsScreen';
import WalletScreen from '../screen/WalletScreen';
import WishListScreen from '../screen/WishListScreen';
import YourOrder from '../screen/YourOrder';
import YourProfile from '../screen/YourProfile';

const Stack = createNativeStackNavigator();


import { navigationRef } from './navigationRef';

const MyStack = () => {
  return (
    // ✅ Added return
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        // initialRouteName="MapScreen"
        screenOptions={{ headerShown: false }}
      >
        {/* <Stack.Screen name="FoodList" component={FoodList} /> */}
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Category" component={CategoryScreen} />
        <Stack.Screen name="WalletScreen" component={WalletScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="LocationScreen" component={LocationScreen} />
        <Stack.Screen name="TopCollectionsScreen" component={TopCollectionsScreen} />
        <Stack.Screen name="YourProfile" component={YourProfile} />
        <Stack.Screen name="YourOrder" component={YourOrder} />
        <Stack.Screen 
          name="FashionMode" 
          component={FashionMode} 
          options={{ presentation: 'transparentModal' }} 
        />
        <Stack.Screen name="AddressBookScreen" component={AddressBookScreen} />
        <Stack.Screen name="AboutScreen" component={AboutScreen} />
        {/* <Stack.Screen name="ActivityScreen" component={ActivityScreen} /> */}
        <Stack.Screen name="SettingScreen" component={SettingsScreen} />
        {/* <Stack.Screen name="FeedbackScreen" component={FeedbackScreen} /> */}
        {/* <Stack.Screen name="GoldScreen" component={GoldScreen} /> */}
        {/* <Stack.Screen name="BookingScreen" component={BookingScreen} /> */}
        <Stack.Screen name="CategoryProduct" component={CategoryProduct} />
        <Stack.Screen name="ProductScreen" component={ProductScreen} />
        <Stack.Screen name="BrandStoreScreen" component={BrandStoreScreen} />
        <Stack.Screen name="ProductBrand" component={ProductBrand} />
        <Stack.Screen name="OrderPlacedScreen" component={OrderPlacedScreen} />
        {/* <Stack.Screen name="RestaurantInfoScreen" component={RestaurantInfoScreen} /> */}
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="SelectAddressScreen" component={SelectAddressScreen} />
        <Stack.Screen name="MealsUnderScreen" component={MealsUnderScreen} />
        <Stack.Screen name="OrderDetailsScreen" component={OrderDetailsScreen} />
        {/* <Stack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
        /> */}
        {/* <Stack.Screen
          name="AccountSettingsScreen"
          component={AccountSettingsScreen}
        /> */}
        {/* <Stack.Screen
          name="AccessibilitySettings"
          component={AccessibilitySettings}
        /> */}
        {/* <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} /> */}
        <Stack.Screen name="PaymentSettings" component={PaymentSettings} />
        <Stack.Screen name="SupportScreen" component={SupportScreen} />
        {/* <Stack.Screen
          name="ReportEmergencyScreen"
          component={ReportEmergencyScreen}
        /> */}
        {/* <Stack.Screen name="cart" component={CartScreen} /> */}
        {/* <Stack.Screen name="SingleResturantCart" component={SingleResturantCart} /> */}
        {/* <Stack.Screen name="AllRestaurantCart" component={AllRestaurantCart} /> */}
        <Stack.Screen name="OrderSummary" component={OrderSummary} />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        <Stack.Screen name="RefundPolicy" component={RefundPolicy} />
        <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
        <Stack.Screen name="SuggestedForYou" component={SuggestedForYou} />
        <Stack.Screen name="AddToBagScreen" component={AddToBagScreen} />
        <Stack.Screen name="WishListScreen" component={WishListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
