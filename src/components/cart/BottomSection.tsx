// import { useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import React, { useState, useEffect, useRef } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Modal,
//   Animated,
//   Dimensions,
//   Easing,
// } from 'react-native';
// import { COLORS } from '../../theme/color';

// // --- TYPES ---
// type RootStackParamList = {
//   CancleScreen: undefined;
//   OrderSuccess: undefined;
// };

// type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// // --- POPUP MODAL ---
// interface OrderProcessingModalProps {
//   visible: boolean;
//   onClose: () => void;
//   onFinish: () => void;
// }

// const OrderProcessingModal: React.FC<OrderProcessingModalProps> = ({
//   visible,
//   onClose,
//   onFinish,
// }) => {
//   const progressAnim = useRef(new Animated.Value(0)).current;
//   const windowWidth = Dimensions.get('window').width;

//   useEffect(() => {
//     if (visible) {
//       progressAnim.setValue(0);

//       Animated.timing(progressAnim, {
//         toValue: 1,
//         duration: 5000,
//         useNativeDriver: false,
//         easing: Easing.linear,
//       }).start(({ finished }) => {
//         if (finished) onFinish();
//       });
//     }
//   }, [visible]);

//   const widthInterpolated = progressAnim.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0, windowWidth * 0.7],
//   });

//   return (
//     <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
//       <View style={modalStyles.overlay}>
//         <View style={modalStyles.container}>
//           <Text style={modalStyles.headerText}>Placing your order</Text>

//           {/* Row 1 */}
//           <View style={modalStyles.row}>
//             <View style={modalStyles.iconBox}>
//               <Text style={modalStyles.iconText}>💵</Text>
//             </View>
//             <Text style={modalStyles.rowTitle}>Pay ₹385 on delivery (UPI/cash)</Text>
//           </View>

//           {/* Row 2 */}
//           <View style={modalStyles.row}>
//             <View style={modalStyles.iconBox}>
//               <Text style={modalStyles.iconText}>%</Text>
//             </View>
//             <View>
//               <Text style={modalStyles.rowTitle}>GET75</Text>
//               <Text style={modalStyles.rowSubtitle}>₹75 saved</Text>
//             </View>
//           </View>

//           {/* Row 3 */}
//           <View style={modalStyles.row}>
//             <View style={modalStyles.iconBox}>
//               <Text style={modalStyles.iconText}>🏠</Text>
//             </View>
//             <View>
//               <Text style={modalStyles.rowTitle}>Delivering to Home</Text>
//               <Text style={modalStyles.rowSubtitle}>Mahabir Colony, Virat Nagar...</Text>
//             </View>
//           </View>

//           {/* Footer */}
//           <View style={modalStyles.footer}>
//             <View style={modalStyles.progressBarBackground}>
//               <Animated.View style={[modalStyles.progressBarFill, { width: widthInterpolated }]} />
//             </View>

//             <TouchableOpacity onPress={onClose}>
//               <Text style={modalStyles.cancelText}>CANCEL</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// // --- BOTTOM SECTION ---
// const BottomSection: React.FC = () => {
//   const navigation = useNavigation<NavigationProp>();
//   const [isModalVisible, setModalVisible] = useState(false);

//   const handlePlaceOrder = () => setModalVisible(true);

//   const handleOrderFinished = () => {
//     setModalVisible(false);
//     console.log('Order Placed!');
//   };

//   return (
//     <>
//       <View style={styles.bottomSection}>
//         <View style={styles.paymentMethod}>
//           <Text style={styles.payUsingText}>PAY USING</Text>
//           <Text style={styles.googlePayText}>Google Pay UPI</Text>
//         </View>

//         <TouchableOpacity style={styles.placeOrderButton} onPress={() => navigation.navigate('OrderPlacedScreen')}>
//           <View style={styles.placeOrderContent}>
//             <Text style={styles.totalAmount}>₹409.86</Text>
//             <Text style={styles.totalText}>TOTAL</Text>
//           </View>
//           <Text style={styles.placeOrderText}>Place Order ▸</Text>
//         </TouchableOpacity>
//       </View>

//       <OrderProcessingModal
//         visible={isModalVisible}
//         onClose={() => setModalVisible(false)}
//         onFinish={handleOrderFinished}
//       />
//     </>
//   );
// };

// // --- STYLES UPDATED TO THEME ---
// const styles = StyleSheet.create({
//   bottomSection: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderTopWidth: 1,
//     borderTopColor: COLORS.secondary,
//     backgroundColor: COLORS.white,
//   },
//   paymentMethod: {
//     flex: 1,
//   },
//   payUsingText: {
//     fontSize: 10,
//     color: COLORS.muted,
//     marginBottom: 2,
//   },
//   googlePayText: {
//     fontSize: 14,
//     color: COLORS.textPrimary,
//     fontWeight: '500',
//   },
//   placeOrderButton: {
//     backgroundColor: COLORS.primary,
//     borderRadius: 8,
//     paddingHorizontal: 20,
//     paddingVertical: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   placeOrderContent: {
//     marginRight: 16,
//   },
//   totalAmount: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: COLORS.white,
//   },
//   totalText: {
//     fontSize: 10,
//     color: COLORS.white,
//     opacity: 0.8,
//   },
//   placeOrderText: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: COLORS.white,
//   },
// });

// // --- MODAL THEMING ---
// const modalStyles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'flex-end',
//   },
//   container: {
//     backgroundColor: COLORS.textPrimary, // dark theme container
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     padding: 20,
//     paddingBottom: 40,
//   },
//   headerText: {
//     color: COLORS.white,
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   iconBox: {
//     width: 30,
//     height: 30,
//     backgroundColor: COLORS.textSecondary,
//     borderRadius: 4,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 12,
//   },
//   iconText: {
//     color: COLORS.white,
//     fontSize: 14,
//   },
//   rowTitle: {
//     color: COLORS.white,
//     fontSize: 15,
//     fontWeight: '500',
//   },
//   rowSubtitle: {
//     color: COLORS.muted,
//     fontSize: 12,
//     marginTop: 2,
//   },
//   footer: {
//     marginTop: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   progressBarBackground: {
//     height: 12,
//     backgroundColor: COLORS.textSecondary,
//     borderRadius: 6,
//     flex: 1,
//     marginRight: 20,
//     overflow: 'hidden',
//   },
//   progressBarFill: {
//     height: '100%',
//     backgroundColor: COLORS.highlight,
//   },
//   cancelText: {
//     color: COLORS.white,
//     fontWeight: 'bold',
//     fontSize: 14,
//   },
// });

// export default BottomSection;



import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Easing,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useGetUserCart } from '../../api/hooks/allCart';
import { COLORS } from '../../theme/color';

// --- TYPES ---
type RootStackParamList = {
  CancleScreen: undefined;
  OrderSuccess: undefined;
  OrderPlacedScreen: undefined; // Added this so TypeScript doesn't complain
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// --- POPUP MODAL ---
interface OrderProcessingModalProps {
  visible: boolean;
  onClose: () => void;
  onFinish: () => void;
}

const OrderProcessingModal: React.FC<OrderProcessingModalProps> = ({
  visible,
  onClose,
  onFinish,
}) => {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const windowWidth = Dimensions.get('window').width;

  useEffect(() => {
    if (visible) {
      progressAnim.setValue(0);

      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: false,
        easing: Easing.linear,
      }).start(({ finished }) => {
        if (finished) onFinish();
      });
    }
  }, [visible]);

  const widthInterpolated = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, windowWidth * 0.7],
  });

  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <View style={modalStyles.overlay}>
        <View style={modalStyles.container}>
          <Text style={modalStyles.headerText}>Placing your order</Text>

          {/* Row 1 */}
          <View style={modalStyles.row}>
            <View style={modalStyles.iconBox}>
              <Text style={modalStyles.iconText}>💵</Text>
            </View>
            <Text style={modalStyles.rowTitle}>Pay ₹385 on delivery (UPI/cash)</Text>
          </View>

          {/* Row 2 */}
          <View style={modalStyles.row}>
            <View style={modalStyles.iconBox}>
              <Text style={modalStyles.iconText}>%</Text>
            </View>
            <View>
              <Text style={modalStyles.rowTitle}>GET75</Text>
              <Text style={modalStyles.rowSubtitle}>₹75 saved</Text>
            </View>
          </View>

          {/* Row 3 */}
          <View style={modalStyles.row}>
            <View style={modalStyles.iconBox}>
              <Text style={modalStyles.iconText}>🏠</Text>
            </View>
            <View>
              <Text style={modalStyles.rowTitle}>Delivering to Home</Text>
              <Text style={modalStyles.rowSubtitle}>Mahabir Colony, Virat Nagar...</Text>
            </View>
          </View>

          {/* Footer */}
          <View style={modalStyles.footer}>
            <View style={modalStyles.progressBarBackground}>
              <Animated.View style={[modalStyles.progressBarFill, { width: widthInterpolated }]} />
            </View>

            <TouchableOpacity onPress={onClose}>
              <Text style={modalStyles.cancelText}>CANCEL</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// --- BOTTOM SECTION ---
const BottomSection: React.FC<{cartData?: any}> = ({ cartData: customCartData }) => {
  const navigation = useNavigation<NavigationProp>();
  const [isModalVisible, setModalVisible] = useState(false);
  const { data: globalCartData } = useGetUserCart();
  
  const cartData = customCartData || globalCartData;

  let calculatedTotal = 0;
  if (cartData) {
    if (cartData.vendors && Array.isArray(cartData.vendors)) {
      cartData.vendors.forEach((v: any) => {
        v.items?.forEach((item: any) => {
          const priceObj = item.unitPrice || item.price;
          let priceValue = 0;
          if (priceObj && typeof priceObj === 'object' && 'd' in priceObj && priceObj.d) {
              priceValue = priceObj.d[0];
          } else if (typeof item.unitPrice === 'string' || typeof item.unitPrice === 'number') {
              priceValue = parseFloat(item.unitPrice as string);
          } else if (typeof item.price === 'string' || typeof item.price === 'number') {
              priceValue = parseFloat(item.price as string);
          }
          calculatedTotal += (priceValue * (item.quantity || 1));
        });
      });
    } else if (cartData.items && Array.isArray(cartData.items)) {
      cartData.items.forEach((item: any) => {
          const priceObj = item.unitPrice || item.price;
          let priceValue = 0;
          if (priceObj && typeof priceObj === 'object' && 'd' in priceObj && priceObj.d) {
              priceValue = priceObj.d[0];
          } else if (typeof item.unitPrice === 'string' || typeof item.unitPrice === 'number') {
              priceValue = parseFloat(item.unitPrice as string);
          } else if (typeof item.price === 'string' || typeof item.price === 'number') {
              priceValue = parseFloat(item.price as string);
          }
          calculatedTotal += (priceValue * (item.quantity || 1));
      });
    }
  }

  const finalTotalDisplay = cartData?.totalAmount || calculatedTotal || 0;

  // 1. Opens the modal
  const handlePlaceOrder = () => setModalVisible(true);

  // 2. Called when Modal animation finishes
  const handleOrderFinished = () => {
    setModalVisible(false);
    // Navigate ONLY after the popup closes
    navigation.navigate('OrderPlacedScreen'); 
  };

  return (
    <>
      <View style={styles.bottomSection}>
        <View style={styles.paymentMethod}>
          <Text style={styles.payUsingText}>PAY USING</Text>
          <Text style={styles.googlePayText}>Google Pay UPI</Text>
        </View>

        {/* Updated onPress to call handlePlaceOrder instead of navigating directly */}
        <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
          <View style={styles.placeOrderContent}>
            <Text style={styles.totalAmount}>₹{Number(finalTotalDisplay).toFixed(2)}</Text>
            <Text style={styles.totalText}>TOTAL</Text>
          </View>
          <Text style={styles.placeOrderText}>Place Order ▸</Text>
        </TouchableOpacity>
      </View>

      <OrderProcessingModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onFinish={handleOrderFinished}
      />
    </>
  );
};

// --- STYLES UPDATED TO THEME ---
const styles = StyleSheet.create({
  bottomSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.secondary,
    backgroundColor: COLORS.white,
  },
  paymentMethod: {
    flex: 1,
  },
  payUsingText: {
    fontSize: 10,
    color: COLORS.muted,
    marginBottom: 2,
  },
  googlePayText: {
    fontSize: 14,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  placeOrderButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeOrderContent: {
    marginRight: 16,
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
  },
  totalText: {
    fontSize: 10,
    color: COLORS.white,
    opacity: 0.8,
  },
  placeOrderText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.white,
  },
});

// --- MODAL THEMING ---
const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: COLORS.textPrimary, // dark theme container
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  headerText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconBox: {
    width: 30,
    height: 30,
    backgroundColor: COLORS.textSecondary,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconText: {
    color: COLORS.white,
    fontSize: 14,
  },
  rowTitle: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '500',
  },
  rowSubtitle: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 2,
  },
  footer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressBarBackground: {
    height: 12,
    backgroundColor: COLORS.textSecondary,
    borderRadius: 6,
    flex: 1,
    marginRight: 20,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.highlight,
  },
  cancelText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default BottomSection;