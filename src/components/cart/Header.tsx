
// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Share, // Added Share import
// } from 'react-native';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { useNavigation } from '@react-navigation/native'; // Added Navigation import
// import {COLORS} from '../../theme/color';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const Header: React.FC = () => {
//   const navigation = useNavigation();

//   // Function to handle sharing
//   const onShare = async () => {
//     try {
//       await Share.share({
//         message: 'Check out Aroma Quest! 35-40 mins to Home.',
//       });
//     } catch (error) {
//       console.log('Error sharing:', error);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.header}>
//       <TouchableOpacity 
//         style={styles.backButton} 
//         onPress={() => navigation.goBack()} // Added Back functionality
//       >
//         <MaterialIcons name="arrow-back" size={24} color={COLORS.textPrimary} />
//       </TouchableOpacity>

//       <View style={styles.headerContent}>
//         <Text style={styles.restaurantName}>Aroma Quest</Text>
//         <Text style={styles.deliveryTime}>35-40 mins to Home</Text>
//         <Text style={styles.address}>pathak villa near gandhi Nagar....</Text>
//       </View>

//       <TouchableOpacity 
//         style={styles.shareButton} 
//         onPress={onShare} // Added Share functionality
//       >
//         <MaterialIcons name="share" size={24} color={COLORS.textPrimary} />
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.background,
//     backgroundColor: COLORS.white,
//   },

//   backButton: {
//     padding: 4,
//   },

//   headerContent: {
//     flex: 1,
//     marginLeft: 12,
//   },

//   restaurantName: {
//     fontSize: 16,
//     fontWeight: '800',
//     color: COLORS.textPrimary,
//   },

//   deliveryTime: {
//     fontSize: 10,
//     color: COLORS.textSecondary,
//     marginTop: 2,
//   },

//   address: {
//     fontSize: 10,
//     color: COLORS.muted,
//     marginTop: 1,
//   },

//   shareButton: {
//     padding: 4,
//   },
// });

// export default Header;


import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Share,
  ActivityIndicator,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../theme/color';
import { SafeAreaView } from 'react-native-safe-area-context';
// Import your existing Cart Hook
import { useGetUserCart } from '../../api/hooks/allCart';

const Header: React.FC = () => {
  const navigation = useNavigation();
  
  // 1. Fetch Dynamic Data
  const { data: cartData, isLoading } = useGetUserCart();

  // 2. Extract Shop Name Safely
  // We check if 'vendors' exists and has at least one vendor with a shopName.
  // Otherwise, we default to "Aroma Quest" or a placeholder.
  const shopName = cartData?.vendors?.[0]?.vendor?.shopName || "Aroma Quest";

  // Function to handle sharing
  const onShare = async () => {
    try {
      await Share.share({
        // Dynamic message using the fetched shop name
        message: `Check out ${shopName}! 35-40 mins to Home.`,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  return (
    <SafeAreaView style={styles.header}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()} 
      >
        <MaterialIcons name="arrow-back" size={24} color={COLORS.textPrimary} />
      </TouchableOpacity>

      <View style={styles.headerContent}>
        {isLoading ? (
           <ActivityIndicator size="small" color={COLORS.primary} style={{alignSelf: 'flex-start'}}/>
        ) : (
           <>
             {/* Dynamic Restaurant Name */}
             <Text style={styles.restaurantName} numberOfLines={1}>
                {shopName}
             </Text>
             
             {/* NOTE: The 'cart/all' API response typically does not contain 
                Delivery Time or User Address. These remain static until you 
                create a User Profile API or Address API.
             */}
             <Text style={styles.deliveryTime}>35-40 mins to Home</Text>
             <Text style={styles.address} numberOfLines={1}>
                pathak villa near gandhi Nagar....
             </Text>
           </>
        )}
      </View>

      <TouchableOpacity 
        style={styles.shareButton} 
        onPress={onShare} 
      >
        <MaterialIcons name="share" size={24} color={COLORS.textPrimary} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
    backgroundColor: COLORS.white,
  },

  backButton: {
    padding: 4,
  },

  headerContent: {
    flex: 1,
    marginLeft: 12,
  },

  restaurantName: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },

  deliveryTime: {
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 2,
  },

  address: {
    fontSize: 10,
    color: '#9CA3AF', // Muted color manually if COLORS.muted isn't defined
    marginTop: 1,
  },

  shareButton: {
    padding: 4,
  },
});

export default Header;