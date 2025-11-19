// import { useNavigation } from '@react-navigation/native';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import React, { useState } from 'react';
// import {
//   Image,
//   ScrollView,
//   StyleSheet,
//   Switch,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import FoodList from '../components/FoodCard';

// // Define navigation param list
// type RootStackParamList = {
//   HomeScreen: undefined;
//   ZomatoMoneyPage: undefined;
//   ProfileScreen: undefined;
//   LocationScreen: undefined;
//   AddressBookScreen: undefined;
//   GoldScreen: undefined;
//   DiningScreen: undefined;
//   CheckoutScreen: undefined;
// };

// // Define navigation prop type
// type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// const categories = [
//   { name: 'All', img: 'https://tse2.mm.bing.net/th/id/OIP.3Dh9FWm684Jc41gmv8eZHwHaEE?pid=Api&P=0&h=180' },
//   { name: 'Pizza', img: 'https://tse1.mm.bing.net/th/id/OIP.y9WHqmBEubDgxpHWqRN9sAHaEO?pid=Api&P=0&h=180' },
//   { name: 'Burger', img: 'https://www.pngarts.com/files/10/Food-Items-PNG-Picture.png' },
//   { name: 'Cake', img: 'https://tse1.mm.bing.net/th/id/OIP.JQ6ZOYauedUoGFVWDzAecQHaEn?pid=Api&P=0&h=180' },
//   { name: 'Biryani', img: 'https://tse2.mm.bing.net/th/id/OIP.zec59lWeYML7_-wwsSYBHAHaE8?pid=Api&P=0&h=180' },
//   { name: 'Rolls', img: 'https://tse2.mm.bing.net/th/id/OIP.jUKtuSAXdENQkUtFfuGsBAAAAA?pid=Api&P=0&h=180' },
//   { name: 'Ice Cream', img: 'https://tse2.mm.bing.net/th/id/OIP.HsrA5OUP2XuY8WH-xNBRtgHaGi?pid=Api&P=0&h=180' },
// ];

// const filters = [
//   'Under ₹200',
//   'Under 30 mins',
//   'Great Offers',
//   'Rating 4.0+',
//   'Pure Veg',
//   'Previously Ordered',
// ];

// const restaurants = [
//   { id: 1, name: 'The Wok', img: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg', discount: 'FLAT 50% OFF', rating: '3.9', time: '15-20 mins' },
//   { id: 2, name: 'Oona The One', img: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg', discount: 'FLAT ₹75 OFF', rating: '4.3', time: '20-25 mins' },
//   { id: 3, name: 'Hyderabadi', img: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg', discount: 'FLAT 50% OFF', rating: '3.9', time: '30-35 mins' },
//   { id: 4, name: 'Pizza Mania', img: 'https://images.pexels.com/photos/2619967/pexels-photo-2619967.jpeg', discount: 'FLAT 50% OFF', rating: '4.2', time: '20-25 mins' },
//   { id: 5, name: 'Veggie Delight', img: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg', discount: 'FLAT ₹125 OFF', rating: '4.5', time: '25-30 mins' },
// ];

// const HomeScreen: React.FC = () => {
//   const [vegMode, setVegMode] = useState(false);
//   const [cartCount] = useState(1);
//   const restaurant = {
//     name: "KFC",
//     logo: "https://tse1.mm.bing.net/th/id/OIP.cZGrZDTMkFZF8TV-APIVZQHaE8?pid=Api&P=0&h=180"
//   };

//   const navigation = useNavigation<NavigationProp>();

//   const handleMenuPress = () => {
//     navigation.navigate("HomeScreen");
//   };

//   return (
//     <View style={styles.container}>
//       <ScrollView>
//         {/* 🔹 Header Container */}
//         <View style={styles.headerContainer}>
//           {/* Top Bar */}
//           <View style={styles.topBar}>
//             <View>
//               <TouchableOpacity
//                 style={{ flexDirection: 'row', alignItems: 'center' }}
//                 onPress={() => navigation.navigate('LocationScreen')}
//               >
//                 <Text style={styles.location}>Harmu Housing Co...</Text>
//                 <Ionicons name="chevron-down" size={16} color="#000" style={{ marginLeft: 4 }} />
//               </TouchableOpacity>
//               <Text style={styles.subLocation}>Delatoli, Ranchi</Text>
//             </View>
//             <View style={styles.rightIcons}>
//               <TouchableOpacity
//                 style={styles.moneyBtn}
//                 onPress={() => navigation.navigate('ZomatoMoneyPage')}
//               >
//                 <MaterialCommunityIcons name="wallet-outline" size={20} color="#000" />
//               </TouchableOpacity>
//               <Ionicons
//                 name="person-circle-outline"
//                 size={40}
//                 color="#666"
//                 onPress={() => navigation.navigate('ProfileScreen')}
//               />
//             </View>
//           </View>

//           {/* Search Bar + Veg Mode */}
//           <View style={styles.searchAndToggleRow}>
//             <View style={styles.searchRow}>
//               <Ionicons name="search" size={20} color="#3e0dd2ff" />
//               <TextInput
//                 placeholder="Restaurant name or dish"
//                 style={styles.searchInput}
//                 placeholderTextColor="#666"
//               />
//               <Ionicons name="mic-outline" size={20} color="#3e0dd2ff" />
//             </View>
//             <View style={styles.vegToggleContainer}>
//               <Text style={styles.vegLabel}>Veg Mode</Text>
//               <Switch
//                 value={vegMode}
//                 onValueChange={setVegMode}
//                 trackColor={{ false: '#ddd', true: '#4CAF50' }}
//                 thumbColor="#fff"
//               />
//             </View>
//           </View>

//           {/* Golden Banner */}
//           <View style={styles.banner}>
//             <Text style={styles.bannerTitle}>GOLD RUSH OFFER</Text>
//             <Text style={styles.bannerSub}>ENJOY FREE DELIVERY</Text>
//             <Text style={styles.bannerPrice}>
//               above <Text style={styles.strike}>₹199</Text> ₹99
//             </Text>
//             <TouchableOpacity
//               style={styles.goldBtn}
//               onPress={() => navigation.navigate('GoldScreen')}
//             >
//               <Text style={styles.goldBtnText}>Join GOLD at ₹1</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* 🔹 Categories */}
//         <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
//           {categories.map((c) => (
//             <View key={c.name} style={styles.category}>
//               <Image source={{ uri: c.img }} style={styles.catImg} />
//               <Text>{c.name}</Text>
//             </View>
//           ))}
//         </ScrollView>

//         {/* 🔹 Filters */}
//         <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters}>
//           {filters.map((f, i) => (
//           <TouchableOpacity key={i} style={styles.filterBtn}>
//             <Text style={styles.filterText}>{f}</Text>
//           </TouchableOpacity>
//           ))}
//         </ScrollView>

//         {/* 🔹 Recommended Section */}
//         <Text style={styles.sectionTitle}> RECOMMENDED FOR YOU</Text>
//         <ScrollView horizontal showsHorizontalScrollIndicator={true}>
//           <View style={{ flexDirection: "row" }}>
//             {restaurants.map((r) => (
//               <View key={r.id} style={{ marginRight: 6 }}>
//                 {/* Row 1 */}
//                 <View style={styles.card}>
//                   <Image source={{ uri: r.img }} style={styles.cardImg} />
//                   <View style={styles.discountTag}>
//                     <Text style={styles.discountText}>{r.discount}</Text>
//                   </View>
//                   <Text style={styles.cardName}>{r.name}</Text>
//                   <View style={styles.metaRow}>
//                     <Text style={styles.cardMeta}>⭐ {r.rating}</Text>
//                     <Text style={styles.cardMeta}>⏱ {r.time}</Text>
//                   </View>
//                 </View>
//                 {/* Row 2 (duplicate or different data) */}
//                 {restaurants[r.id % restaurants.length] && (
//                   <View style={[styles.card, { marginTop: 10 }]}>
//                     <Image source={{ uri: restaurants[r.id % restaurants.length].img }} style={styles.cardImg} />
//                     <View style={styles.discountTag}>
//                       <Text style={styles.discountText}>
//                         {restaurants[r.id % restaurants.length].discount}
//                       </Text>
//                     </View>
//                     <Text style={styles.cardName}>
//                       {restaurants[r.id % restaurants.length].name}
//                     </Text>
//                     <View style={styles.metaRow}>
//                       <Text style={styles.cardMeta}>
//                         ⭐ {restaurants[r.id % restaurants.length].rating}
//                       </Text>
//                       <Text style={styles.cardMeta}>
//                         ⏱ {restaurants[r.id % restaurants.length].time}
//                       </Text>
//                     </View>
//                   </View>
//                 )}
//               </View>
//             ))}
//           </View>
//         </ScrollView>

//         {/* Food List Component */}
//         <FoodList />
//       </ScrollView>

//       {/* 🔹 Floating View Cart */}
//       <View style={styles.viewCartContainer}>
//         <TouchableOpacity
//           style={styles.cartLeft}
//           onPress={handleMenuPress}
//           activeOpacity={0.7}
//         >
//           <Image source={{ uri: restaurant.logo }} style={styles.cartImg} />
//           <View>
//             <Text style={styles.cartTitle}>{restaurant.name}</Text>
//             <Text style={styles.cartSubtitle}>View Menu ➝</Text>
//           </View>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.viewCartBtn}
//           onPress={() => navigation.navigate('CheckoutScreen')}
//         >
//           <Text style={styles.viewCartText}>View Cart</Text>
//           <Text style={styles.itemCount}>{cartCount} item</Text>
//         </TouchableOpacity>
//       </View>

//       {/* 🔹 Bottom Navigation */}
//       <View style={styles.bottomNav}>
//         <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('HomeScreen')}>
//           <MaterialCommunityIcons name="bike-fast" size={22} color="#3e0dd2ff" />
//           <Text style={styles.navTextActive}>Delivery</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('DiningScreen')}>
//           <Image
//             source={{
//               uri: 'https://static.vecteezy.com/system/resources/thumbnails/012/300/364/small_2x/50-percent-off-discount-number-with-circle-element-png.png',
//             }}
//             style={styles.navIcon}
//           />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navItem}>
//           <Ionicons name="map-outline" size={22} color="#3b1cb5ff" />
//           <Text style={styles.navText}>District</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff', },
//   headerContainer: {
//     backgroundColor: '#fde9b0',
//     padding: 10,
//     borderRadius: 13,
//     marginBottom: 15,
//   },
//   topBar: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   location: { fontSize: 16, fontWeight: 'bold' },
//   subLocation: { fontSize: 12, color: '#555' },
//   rightIcons: { flexDirection: 'row', alignItems: 'center' },
//   moneyBtn: {
//     backgroundColor: '#f3f3f3',
//     borderRadius: 20,
//     padding: 8,
//     marginRight: 10,
//   },
//   searchAndToggleRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 15,
//   },
//   searchRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 25,
//     paddingHorizontal: 12,
//     flex: 1,
//     marginRight: 10,
//     backgroundColor: '#fff',
//     height: 44,
//   },
//   searchInput: {
//     flex: 1,
//     marginLeft: 8,
//     fontSize: 14,
//     color: '#000',
//   },
//   vegToggleContainer: { flexDirection: 'column', alignItems: 'center' },
//   vegLabel: {
//     fontSize: 9,
//     fontWeight: 'bold',
//     fontFamily: 'fantasy',
//     marginBottom: 3,
//     color: '#000',
//   },
//   banner: {
//     backgroundColor: '#fde9b0',
//     padding: 20,
//     borderRadius: 12,
//     alignItems: 'center',
//   },
//   bannerTitle: { fontSize: 14, fontWeight: 'bold', color: '#b8860b' },
//   bannerSub: { fontSize: 18, fontWeight: 'bold', color: '#333', marginTop: 4 },
//   bannerPrice: { fontSize: 16, marginVertical: 6, color: '#000' },
//   strike: { textDecorationLine: 'line-through', color: '#888' },
//   goldBtn: {
//     backgroundColor: '#000',
//     paddingHorizontal: 18,
//     paddingVertical: 8,
//     borderRadius: 20,
//     marginTop: 8,
//   },
//   goldBtnText: { color: '#fff', fontWeight: 'bold' },
//   categories: { marginBottom: 15, paddingLeft: 5 },
//   category: { alignItems: 'center', marginRight: 20 },
//   catImg: { width: 60, height: 40, borderRadius: 30, marginBottom: 5 },
//   // ... other styles remain unchanged ...
//   filters: { flexDirection: 'row', marginBottom: 15 },
//   filterBtn: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 10,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     marginRight: 10,
//     marginLeft: 5,
//   },
//   filterText: {
//     fontWeight: 'bold',
//     fontFamily: 'fantasy',
//   },

//   sectionTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 10, marginLeft: 5 },
//   card: {
//     width: 145,
//     height: 140,
//     marginRight: 15,
//     borderRadius: 10,
//     overflow: 'hidden',
//     backgroundColor: '#fff',
//     elevation: 2,
//     marginBottom: 2,
//     marginLeft: 6,
//   },
//   cardImg: { width: '100%', height: 90 },
//   discountTag: {
//     position: 'absolute',
//     top: 5,
//     left: 5,
//     backgroundColor: 'black',
//     padding: 3,
//     borderRadius: 5,
//   },
//   discountText: { color: '#fff', fontSize: 9 },
//   cardName: { fontSize: 12, fontWeight: 'bold', margin: 5 },
//   metaRow: { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5 },
//   cardMeta: { fontSize: 9, color: '#666' },

//   // Floating Cart
//   viewCartContainer: {
//     position: "absolute",
//     bottom: 60,
//     left: 10,
//     right: 10,
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   cartLeft: { flexDirection: "row", alignItems: "center" },
//   cartImg: { width: 40, height: 40, borderRadius: 8, marginRight: 10 },
//   cartTitle: { fontSize: 14, fontWeight: "bold", color: "#000" },
//   cartSubtitle: { fontSize: 12, color: "#666" },
//   viewCartBtn: {
//     backgroundColor: "#3e0dd2ff",
//     paddingHorizontal: 15,
//     paddingVertical: 6,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   viewCartText: { color: "#fff", fontSize: 14, fontWeight: "bold" },
//   itemCount: { color: "#fff", fontSize: 12 },

//   bottomNav: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     paddingVertical: 8,
//     borderTopWidth: 1,
//     borderColor: '#ddddddff',
//   },
//   navItem: { alignItems: 'center' },
//   navText: { fontSize: 12, color: '#3e0dd2ff' },
//   navTextActive: { fontSize: 12, color: '#3e0dd2ff', fontWeight: 'bold' },
//   navIcon: {
//     width: 40,
//     height: 40,
//     resizeMode: 'contain',
//   },
// });

// export default HomeScreen;



import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Video from 'react-native-video';
import FoodList from '../components/FoodCard';

type RootStackParamList = {
  HomeScreen: undefined;
  ZomatoMoneyPage: undefined;
  ProfileScreen: undefined;
  LocationScreen: undefined;
  AddressBookScreen: undefined;
  GoldScreen: undefined;
  DiningScreen: undefined;
  CheckoutScreen: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width: screenWidth } = Dimensions.get('window');

const categories = [
  { name: 'All', img: 'https://tse2.mm.bing.net/th/id/OIP.3Dh9FWm684Jc41gmv8eZHwHaEE?pid=Api&P=0&h=180' },
  { name: 'Pizza', img: 'https://tse1.mm.bing.net/th/id/OIP.y9WHqmBEubDgxpHWqRN9sAHaEO?pid=Api&P=0&h=180' },
  { name: 'Cake', img: 'https://tse1.mm.bing.net/th/id/OIP.JQ6ZOYauedUoGFVWDzAecQHaEn?pid=Api&P=0&h=180' },
  { name: 'Biryani', img: 'https://tse2.mm.bing.net/th/id/OIP.zec59lWeYML7_-wwsSYBHAHaE8?pid=Api&P=0&h=180' },
  { name: 'Rolls', img: 'https://tse2.mm.bing.net/th/id/OIP.jUKtuSAXdENQkUtFfuGsBAAAAA?pid=Api&P=0&h=180' },
  { name: 'Burger', img: 'https://tse2.mm.bing.net/th/id/OIP.NN1F5amzhIDeJ6oRBVAKZAHaG3?pid=Api&P=0&h=180' },
  { name: 'Ice Cream', img: 'https://tse2.mm.bing.net/th/id/OIP.HsrA5OUP2XuY8WH-xNBRtgHaGi?pid=Api&P=0&h=180' },
];

const filters = [
  'Under ₹200',
  'Under 30 mins',
  'Great Offers',
  'Rating 4.0+',
  'Pure Veg',
  'Previously Ordered',
];

const restaurants = [
  { id: 1, name: 'The Wok', img: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg', discount: 'FLAT 50% OFF', rating: '3.9', time: '15-20 mins' },
  { id: 2, name: 'Oona The One', img: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg', discount: 'FLAT ₹75 OFF', rating: '4.3', time: '20-25 mins' },
  { id: 3, name: 'Hyderabadi', img: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg', discount: 'FLAT 50% OFF', rating: '3.9', time: '30-35 mins' },
  { id: 4, name: 'Pizza Mania', img: 'https://images.pexels.com/photos/2619967/pexels-photo-2619967.jpeg', discount: 'FLAT 50% OFF', rating: '4.2', time: '20-25 mins' },
  { id: 5, name: 'Veggie Delight', img: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg', discount: 'FLAT ₹125 OFF', rating: '4.5', time: '25-30 mins' },
];

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [vegMode, setVegMode] = useState(false);
  const [cartCount] = useState(1);

  const restaurant = {
    name: 'KFC',
    logo: 'https://tse1.mm.bing.net/th/id/OIP.cZGrZDTMkFZF8TV-APIVZQHaE8?pid=Api&P=0&h=180',
  };

  const RNVideo: any = Video;

  return (
    <View style={styles.container}>
      {/* Header at the top */}
      <View style={styles.headerContainer}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <View>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center' }}
              onPress={() => navigation.navigate('LocationScreen')}
            >
              <Text style={styles.location}>Harmu Housing Co...</Text>
              <Ionicons name="chevron-down" size={16} color="#000" style={{ marginLeft: 4 }} />
            </TouchableOpacity>

            <Text style={styles.subLocation}>Delatoli, Ranchi</Text>
          </View>

          <View style={styles.rightIcons}>
            <TouchableOpacity style={styles.moneyBtn} onPress={() => navigation.navigate('ZomatoMoneyPage')}>
              <MaterialCommunityIcons name="wallet-outline" size={20} color="#000" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
              <Ionicons name="person-circle-outline" size={40} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search + Veg */}
        <View style={styles.searchAndToggleRow}>
          <View style={styles.searchRow}>
            <Ionicons name="search" size={20} color="#3e0dd2ff" />
            <TextInput placeholder="Restaurant or dish" style={styles.searchInput} placeholderTextColor="#666" />
            <Ionicons name="mic-outline" size={20} color="#3e0dd2ff" />
          </View>

          <View style={styles.vegToggleContainer}>
            <Text style={styles.vegLabel}>Veg Mode</Text>
            <Switch value={vegMode} onValueChange={setVegMode} trackColor={{ false: '#ddd', true: '#4CAF50' }} thumbColor="#fff" />
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* BANNER VIDEO */}
        <View style={styles.videoWrapper}>
          <RNVideo
            source={require('../assets/animations/gif.mp4')}
            style={styles.video}
            repeat
            resizeMode="cover"
            muted
            paused={false}
          />
        </View>

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories} nestedScrollEnabled>
          {categories.map((c) => (
            <TouchableOpacity key={c.name} style={styles.category} onPress={() => console.log('cat', c.name)}>
              <Image source={{ uri: c.img }} style={styles.catImg} />
              <Text>{c.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters} nestedScrollEnabled>
          {filters.map((f, i) => (
            <TouchableOpacity key={i} style={styles.filterBtn}>
              <Text style={styles.filterText}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Recommended */}
        <Text style={styles.sectionTitle}>RECOMMENDED FOR YOU</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={true} nestedScrollEnabled>
          <View style={{ flexDirection: 'row' }}>
            {restaurants.map((r) => (
              <View key={r.id} style={{ marginRight: 6 }}>
                <View style={styles.card}>
                  <Image source={{ uri: r.img }} style={styles.cardImg} />
                  <View style={styles.discountTag}>
                    <Text style={styles.discountText}>{r.discount}</Text>
                  </View>
                  <Text style={styles.cardName}>{r.name}</Text>
                  <View style={styles.metaRow}>
                    <Text style={styles.cardMeta}>⭐ {r.rating}</Text>
                    <Text style={styles.cardMeta}>⏱ {r.time}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Food List */}
        <FoodList />
      </ScrollView>

      {/* Floating Cart */}
      <View style={styles.viewCartContainer}>
        <TouchableOpacity
          style={styles.cartLeft}
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('HomeScreen');
          }}
        >
          <Image source={{ uri: restaurant.logo }} style={styles.cartImg} />
          <View>
            <Text style={styles.cartTitle}>{restaurant.name}</Text>
            <Text style={styles.cartSubtitle}>View Menu ➝</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.viewCartBtn} onPress={() => navigation.navigate('CheckoutScreen')}>
          <Text style={styles.viewCartText}>View Cart</Text>
          <Text style={styles.itemCount}>{cartCount} item</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('HomeScreen')}>
          <MaterialCommunityIcons name="bike-fast" size={22} color="#3e0dd2ff" />
          <Text style={styles.navTextActive}>Delivery</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('DiningScreen')}>
          <Image
            source={{
              uri: 'https://static.vecteezy.com/system/resources/thumbnails/012/300/364/small_2x/50-percent-off-discount-number-with-circle-element-png.png',
            }}
            style={styles.navIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="map-outline" size={22} color="#3e0dd2ff" />
          <Text style={styles.navText}>District</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  headerContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  location: { fontSize: 16, fontWeight: 'bold' },
  subLocation: { fontSize: 12, color: '#555' },

  rightIcons: { flexDirection: 'row', alignItems: 'center' },

  moneyBtn: {
    backgroundColor: '#f3f3f3',
    borderRadius: 20,
    padding: 8,
    marginRight: 10,
  },

  searchAndToggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    paddingHorizontal: 12,
    flex: 1,
    marginRight: 10,
    backgroundColor: '#fff',
    height: 44,
  },

  searchInput: { flex: 1, marginLeft: 8, fontSize: 14, color: '#000' },

  vegToggleContainer: { flexDirection: 'column', alignItems: 'center' },

  vegLabel: { fontSize: 9, fontWeight: 'bold', marginBottom: 3, color: '#000' },

  videoWrapper: {
    alignItems: 'center',
    backgroundColor: '#000',
  },

  video: {
    width: screenWidth,
    height: 250,
    backgroundColor: '#000',
    overflow: Platform.OS === 'android' ? 'hidden' : undefined,
  },

  categories: { marginTop: 15, marginBottom: 10, paddingLeft: 5 },

  category: { alignItems: 'center', marginRight: 20 },

  catImg: { width: 75, height: 40, borderRadius: 50, marginBottom: 5 },

  filters: { flexDirection: 'row', marginBottom: 15 },

  filterBtn: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
  },

  filterText: { fontWeight: 'bold' },

  sectionTitle: { fontSize: 14, fontWeight: 'bold', marginLeft: 5, marginBottom: 10 },

  card: {
    width: 145,
    height: 140,
    marginRight: 15,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2,
  },

  cardImg: { width: '100%', height: 90 },

  discountTag: {
    position: 'absolute',
    top: 5,
    left: 5,
    backgroundColor: 'black',
    padding: 3,
    borderRadius: 5,
  },

  discountText: { color: '#fff', fontSize: 9 },

  cardName: { fontSize: 12, fontWeight: 'bold', margin: 5 },

  metaRow: { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5 },

  cardMeta: { fontSize: 9, color: '#666' },

  viewCartContainer: {
    position: 'absolute',
    bottom: 60,
    left: 10,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation: 5,
  },

  cartLeft: { flexDirection: 'row', alignItems: 'center' },

  cartImg: { width: 40, height: 40, borderRadius: 8, marginRight: 10 },

  cartTitle: { fontSize: 14, fontWeight: 'bold', color: '#000' },

  cartSubtitle: { fontSize: 12, color: '#666' },

  viewCartBtn: {
    backgroundColor: '#3e0dd2ff',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 8,
  },

  viewCartText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },

  itemCount: { color: '#fff', fontSize: 12 },

  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },

  navItem: { alignItems: 'center' },

  navTextActive: { fontSize: 12, color: '#3e0dd2ff', fontWeight: 'bold' },

  navText: { fontSize: 12, color: '#3e0dd2ff' },

  navIcon: { width: 60, height: 40, borderRadius: 50, resizeMode: 'contain' },
});

export default HomeScreen;