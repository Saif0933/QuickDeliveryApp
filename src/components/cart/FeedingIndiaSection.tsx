
// import React from 'react';
// import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { COLORS } from "../../theme/color";

// // Mock Data based on the image
// const DATA = [
//   {
//     id: '1',
//     name: 'Korean Spicy Veg Burger',
//     price: '₹119',
//     originalPrice: '₹242',
//     image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg',
//     isVeg: true,
//   },
//   {
//     id: '2',
//     name: 'Lord Cheesynator',
//     price: '₹219',
//     originalPrice: '₹252',
//     image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg',
//     isVeg: true,
//   },
//   {
//     id: '3',
//     name: 'Nachoburg Cheese Veg',
//     price: '₹179',
//     originalPrice: '₹212',
//     image: 'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg',
//     isVeg: true,
//   },
//   {
//     id: '4',
//     name: 'American BBQ Burger',
//     price: '₹132',
//     originalPrice: '₹242',
//     image: 'https://images.pexels.com/photos/1251198/pexels-photo-1251198.jpeg',
//     isVeg: true,
//   },
// ];

// const FoodItem = () => {
//   return (
//     <View style={styles.container}>
//       {/* Header Section */}
//       <View style={styles.header}>
//         <View style={styles.iconContainer}>
//            <MaterialCommunityIcons name="view-grid-outline" size={20} color="#333" />
//         </View>
//         <Text style={styles.headerTitle}>Complete your meal with</Text>
//       </View>

//       {/* Horizontal List */}
//       <ScrollView 
//         horizontal 
//         showsHorizontalScrollIndicator={false} 
//         contentContainerStyle={styles.scrollContent}
//       >
//         {DATA.map((item) => (
//           <View key={item.id} style={styles.card}>
//             {/* Image Section */}
//             <View style={styles.imageContainer}>
//               <Image source={{ uri: item.image }} style={styles.foodImage} />
              
//               {/* Veg Icon */}
//               <View style={styles.vegIconContainer}>
//                 <View style={styles.vegIconCircle} />
//               </View>

//               {/* Add Button Overlay */}
//               <TouchableOpacity style={styles.addButton}>
//                 {/* <Ionicons name="add" size={24} color="#E23744" /> */}
//                 <Text style={{ color: COLORS.primary, fontSize: 10, fontWeight: 800 }}>Add</Text>
//               </TouchableOpacity>
//             </View>

//             {/* Info Section */}
//             <View style={styles.infoContainer}>
//               <Text style={styles.itemName} numberOfLines={2}>
//                 {item.name}
//               </Text>
//               <View style={styles.priceRow}>
//                 <Text style={styles.price}>{item.price}</Text>
//                 <Text style={styles.originalPrice}>{item.originalPrice}</Text>
//               </View>
//             </View>
//           </View>
//         ))}
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginVertical: 16,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     marginBottom: 16,
//   },
//   iconContainer: {
//     backgroundColor: '#F4F4F5',
//     padding: 8,
//     borderRadius: 12,
//     marginRight: 12,
//   },
//   headerTitle: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#1C1C1C',
//     letterSpacing: -0.5,
//   },
//   scrollContent: {
//     paddingHorizontal: 16,
//     paddingBottom: 10,
//   },
//   card: {
//     width: 80,
//     marginRight: 16,
//   },
//   imageContainer: {
//     width: 90,
//     height: 90,
//     borderRadius: 16,
//     marginBottom: 10,
//     position: 'relative',
//   },
//   foodImage: {
//     width: '90%',
//     height: '90%',
//     borderRadius: 16,
//     backgroundColor: '#f0f0f0',
//   },
//   // Veg Icon Styling (Green Square with Dot)
//   vegIconContainer: {
//     position: 'absolute',
//     bottom: 13,
//     left: 10,
//     width: 13,
//     height: 13,
//     borderWidth: 1,
//     borderColor: '#1A7F37',
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 2,
//   },
//   vegIconCircle: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: '#1A7F37',
//   },
//   // Add Button Styling (White Box with Pink +)
//   addButton: {
//     position: 'absolute',
//     bottom: 16,
//     right: 16,
//     backgroundColor: '#fff',
//     width: 25,
//     height: 25,
//     borderRadius: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//     elevation: 3, // Android Shadow
//     shadowColor: '#000', // iOS Shadow
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.15,
//     shadowRadius: 3,
//   },
//   infoContainer: {
//     paddingRight: 4,
//   },
//   itemName: {
//     fontSize: 13,
//     fontWeight: '700',
//     color: '#1C1C1C',
//     marginBottom: 4,
//     lineHeight: 20,
//   },
//   priceRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   price: {
//     fontSize: 13,
//     fontWeight: '700',
//     color: '#1C1C1C',
//     marginRight: 8,
//   },
//   originalPrice: {
//     fontSize: 13,
//     color: '#8E8E93',
//     textDecorationLine: 'line-through',
//     fontWeight: '500',
//   },
// });

// export default FoodItem;


import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from "../../theme/color";

// Mock Data
const DATA = [
  {
    id: '1',
    name: 'Korean Spicy Veg Burger',
    price: '₹119',
    originalPrice: '₹242',
    image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg',
    isVeg: true,
  },
  {
    id: '2',
    name: 'Lord Cheesynator',
    price: '₹219',
    originalPrice: '₹252',
    image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg',
    isVeg: true,
  },
  {
    id: '3',
    name: 'Nachoburg Cheese Veg',
    price: '₹179',
    originalPrice: '₹212',
    image: 'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg',
    isVeg: true,
  },
  {
    id: '4',
    name: 'American BBQ Burger',
    price: '₹132',
    originalPrice: '₹242',
    image: 'https://images.pexels.com/photos/1251198/pexels-photo-1251198.jpeg',
    isVeg: true,
  },
];

const FoodItem = () => {
  // State to track quantity of each item by ID
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const handleUpdateQuantity = (id: string, delta: number) => {
    setQuantities((prev) => {
      const currentQty = prev[id] || 0;
      const newQty = Math.max(0, currentQty + delta);
      return { ...prev, [id]: newQty };
    });
  };

  return (
    <View style={styles.container}>
      
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.iconContainer}>
           <MaterialCommunityIcons name="view-grid-outline" size={20} color={COLORS.primary} />
        </View>
        <Text style={styles.headerTitle}>Complete your meal with</Text>
      </View>

      {/* Horizontal List */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        {DATA.map((item) => {
          const qty = quantities[item.id] || 0;

          return (
            <View key={item.id} style={styles.card}>
              
              {/* Image Section */}
              <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.foodImage} />
                
                {/* Veg Icon */}
                <View style={styles.vegIconContainer}>
                  <View style={styles.vegIconCircle} />
                </View>

                {/* Add Button OR Quantity Control */}
                {qty === 0 ? (
                  <TouchableOpacity 
                    style={styles.addButton}
                    onPress={() => handleUpdateQuantity(item.id, 1)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.addButtonText}>ADD</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.qtyControl}>
                    <TouchableOpacity 
                      style={styles.qtyBtn} 
                      onPress={() => handleUpdateQuantity(item.id, -1)}
                    >
                      <Text style={styles.qtyBtnText}>−</Text>
                    </TouchableOpacity>
                    
                    <Text style={styles.qtyText}>{qty}</Text>
                    
                    <TouchableOpacity 
                      style={styles.qtyBtn}
                      onPress={() => handleUpdateQuantity(item.id, 1)}
                    >
                      <Text style={styles.qtyBtnText}>+</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              {/* Info Section */}
              <View style={styles.infoContainer}>
                <Text style={styles.itemName} numberOfLines={2}>
                  {item.name}
                </Text>
                <View style={styles.priceRow}>
                  <Text style={styles.price}>{item.price}</Text>
                  <Text style={styles.originalPrice}>{item.originalPrice}</Text>
                </View>
              </View>

            </View>
          );
        })}
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  iconContainer: {
    padding: 8,
    borderRadius: 12,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20, // Added padding to avoid shadow clipping
  },
  
  // CARD STYLES FIXED
  card: {
    width: 120, // Increased width to fit content properly
    marginRight: 16,
  },
  imageContainer: {
    width: '100%',
    height: 110, // Made square relative to card width
    borderRadius: 16,
    marginBottom: 8,
    position: 'relative',
    overflow: 'hidden', // Ensures image doesn't bleed out
  },
  foodImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    backgroundColor: COLORS.background, // Placeholder color
    borderRadius: 10,
  },

  // Veg Icon (Green Square)
  vegIconContainer: {
    position: 'absolute',
    top: 8, // Moved to top-left for standard food app look (or keep bottom if preferred)
    left: 8,
    width: 14,
    height: 14,
    borderWidth: 1,
    borderColor: COLORS.highlight, // Assuming Green
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
  },
  vegIconCircle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.highlight,
  },

  // Add Button
  addButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4, // Android Shadow
    shadowColor: '#000', // iOS Shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  addButtonText: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: '800',
  },

  // Quantity Control Styles
  qtyControl: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: COLORS.white,
    height: 30, // Fixed height for consistency
    minWidth: 70, // Ensure enough width
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  qtyBtn: {
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  qtyBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  qtyText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginHorizontal: 4,
  },

  infoContainer: {
    paddingHorizontal: 2,
  },
  itemName: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
    lineHeight: 18,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
    marginRight: 6,
  },
  originalPrice: {
    fontSize: 11,
    color: COLORS.muted, // Assuming light grey
    textDecorationLine: 'line-through',
    fontWeight: '500',
  },
});

export default FoodItem;