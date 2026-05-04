
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


import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    ActivityIndicator,
    Share,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../../theme/color';
// Import your existing Cart Hook
import { useGetUserCart } from '../../api/hooks/allCart';

const Header: React.FC = () => {
  const navigation = useNavigation();
  
  // 1. Fetch Dynamic Data
  const { data: cartData, isLoading } = useGetUserCart();

  // 2. Extract Shop Name Safely
  // We check if 'vendors' exists and calculate distinct vendor counts.
  let shopName = "Restaurant";
  let uniqueVendorCount = 0;

  if (cartData) {
    const parentVendorIds = new Set<number>();
    
    if (cartData.vendors && Array.isArray(cartData.vendors)) {
      cartData.vendors.forEach((v: any) => {
        const parentVendorId = v.id || v.vendorId || v.vendor?.id || 1;
        v.items?.forEach((item: any) => {
           if (item.quantity > 0) parentVendorIds.add(parentVendorId);
        });
      });
      uniqueVendorCount = parentVendorIds.size;
      shopName = uniqueVendorCount > 1 
        ? `${uniqueVendorCount} Restaurants` 
        : (cartData.vendors[0]?.shopName || cartData.vendors[0]?.vendor?.shopName || cartData.vendors[0]?.companyName || "Restaurant");
    } else if (cartData.items && Array.isArray(cartData.items)) {
      cartData.items.forEach((item: any) => {
         const parentVendorId = item.vendorId || item.vendor?.id || 1;
         if (item.quantity > 0) parentVendorIds.add(parentVendorId);
      });
      uniqueVendorCount = parentVendorIds.size;
      shopName = uniqueVendorCount > 1 
        ? `${uniqueVendorCount} Restaurants` 
        : (cartData.items[0]?.vendor?.shopName || cartData.items[0]?.vendor?.companyName || "Restaurant");
    }
  }

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
    color: COLORS.highlight,
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