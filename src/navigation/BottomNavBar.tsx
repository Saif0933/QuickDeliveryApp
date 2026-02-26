// import { useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import LottieView from 'lottie-react-native';
// import React from 'react';
// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { COLORS } from '../theme/color';

// type RootStackParamList = {
//   DiningScreen: undefined;
// };

// const BottomNavBar = () => {
//   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

//   return (
//     <View style={styles.bottomNav}>
//       <TouchableOpacity style={styles.navItem}>
//         <MaterialCommunityIcons name="moped" size={26} color={COLORS.primary} />
//         <Text style={styles.navTextActive}>Delivery</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         onPress={() => navigation.navigate('DiningScreen')}
//         style={{ position: "absolute", top: -20, left: "50%", transform: [{ translateX: -35 }], zIndex: 99, alignItems: 'center' }}
//       >
//         <View style={styles.lottieBtn}>
//           <LottieView source={require('../assets/PaymentFailed.json')} style={{ width: 60, height: 60 }} autoPlay loop />
//         </View>
//         <Text style={styles.navTextActive}>Under 50%</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.navItem}>
//         <MaterialCommunityIcons name="wallet-membership" size={26} color={COLORS.primary} />
//         <Text style={styles.navText}>Money</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default BottomNavBar;

// const styles = StyleSheet.create({
//   bottomNav: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#fff', paddingVertical: 10, borderTopWidth: 1, borderTopColor: '#eee', height: 85, position: "relative", zIndex: 40 },
//   navItem: { alignItems: 'center' },
//   navText: { fontSize: 10, color: COLORS.primary, marginTop: 4, fontWeight: '600' },
//   navTextActive: { fontSize: 10, color: COLORS.primary, marginTop: 0, fontWeight: '800' },
//   lottieBtn: { width: 60, height: 60, borderRadius: 70, overflow: "hidden", backgroundColor: "#fff", elevation: 8, justifyContent: "center", alignItems: "center" },
// });




import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Animated, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type RootStackParamList = {
  DiningScreen: undefined;
};

const BottomNavBar = ({ hideAnim }: { hideAnim?: Animated.Value }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.floatingContainer} pointerEvents="box-none">
      {/* Main White Pill Navigation */}
      <Animated.View style={[styles.mainPill, hideAnim && { transform: [{ translateY: hideAnim }] }]}>
        {/* Delivery (Active) */}
        <TouchableOpacity style={styles.activeTab}>
          <MaterialCommunityIcons name="moped" size={16} color="#007AFF" style={styles.iconSpaced} />
          <Text style={styles.activeTabText}>Delivery</Text>
        </TouchableOpacity>

        {/* Under ₹250 (Inactive) */}
        <TouchableOpacity style={styles.inactiveTab}
        onPress={() => navigation.navigate('DiningScreen')}>
          <MaterialCommunityIcons name="tag-outline" size={16} color="#6D768A" style={styles.iconSpaced}/>
          <Text style={styles.inactiveTabText}>Under ₹250</Text>
        </TouchableOpacity>

        {/* Dining (Inactive) */}
        {/* <TouchableOpacity 
          style={styles.inactiveTab}
        >
          <MaterialCommunityIcons name="room-service-outline" size={16} color="#6D768A" style={styles.iconSpaced} />
          <Text style={styles.inactiveTabText}>Dining</Text>
        </TouchableOpacity> */}
      </Animated.View>

      {/* District Button */}
      <Animated.View style={[hideAnim && { transform: [{ translateX: hideAnim }] }]}>
        <TouchableOpacity 
          style={styles.districtBtn}
          onPress={() => Linking.openURL('https://mintafresh.com/')}
        >
          <Image 
            source={require('../assets/minta-fresh-logo.jpeg')} 
            style={styles.districtImage} 
            resizeMode="contain" 
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default BottomNavBar;

const styles = StyleSheet.create({
  floatingContainer: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 0,
    zIndex: 40,
  },
  mainPill: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    paddingVertical: 4,
    paddingHorizontal: 4,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    width: 220,
    justifyContent: 'space-evenly',
  },
  activeTab: {
    backgroundColor: '#E5F1FF', // Light blue active background
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactiveTab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconSpaced: {
    marginBottom: 2,
  },
  activeTabText: {
    fontSize: 10,
    color: '#007AFF',
    fontWeight: '700',
  },
  inactiveTabText: {
    fontSize: 10,
    color: '#6D768A',
    fontWeight: '600',
  },
  districtBtn: {
    backgroundColor: '#fff', 
    borderTopLeftRadius: 26,
    borderBottomLeftRadius: 26,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    overflow: 'hidden',
    height: 56,
    width: 100,
  },
  districtImage: {
    width: 170,
    height: 56,
    transform: [{ scale: 1.5 }],
  },
});