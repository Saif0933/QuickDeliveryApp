// import React, {useState} from 'react';
// import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
// import {COLORS} from '../../theme/color';

// const FoodItems: React.FC = () => {
//   const [paneerQuantity, setPaneerQuantity] = useState(1);
//   const [chickenQuantity, setChickenQuantity] = useState(1);

//   return (
//     <View style={styles.itemsContainer}>
//       {/* Paneer Biryani */}
//       <View style={styles.foodItem}>
//         <View style={styles.vegIndicator}>
//           <View style={styles.vegDot} />
//         </View>

//         <View style={styles.itemDetails}>
//           <Text style={styles.itemName}>Paneer Biryani with Raita</Text>
//           <Text style={styles.itemDescription}>Half [Serves 1]</Text>
//           <TouchableOpacity>
//             <Text style={styles.editText}>Edit ▸</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.quantityContainer}>
//           <View style={styles.quantityControls}>
//             <TouchableOpacity
//               style={styles.quantityButton}
//               onPress={() => setPaneerQuantity(Math.max(1, paneerQuantity - 1))}>
//               <Text style={styles.quantityButtonText}>−</Text>
//             </TouchableOpacity>

//             <Text style={styles.quantityText}>{paneerQuantity}</Text>

//             <TouchableOpacity
//               style={styles.quantityButton}
//               onPress={() => setPaneerQuantity(paneerQuantity + 1)}>
//               <Text style={styles.quantityButtonText}>+</Text>
//             </TouchableOpacity>
//           </View>

//           <Text style={styles.itemPrice}>₹198</Text>
//         </View>
//       </View>

//       {/* Chicken Biryani */}
//       <View style={styles.foodItem}>
//         <View style={styles.nonVegIndicator}>
//           <View style={styles.nonVegTriangle} />
//         </View>

//         <View style={styles.itemDetails}>
//           <Text style={styles.itemName}>Hyderabadi Chicken Dum Biryani</Text>
//           <Text style={styles.itemDescription}>
//             Half [Serves 1, 2 Pieces Chicken]
//           </Text>
//           <TouchableOpacity>
//             <Text style={styles.editText}>Edit ▸</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.quantityContainer}>
//           <View style={styles.quantityControls}>
//             <TouchableOpacity
//               style={styles.quantityButton}
//               onPress={() => setChickenQuantity(Math.max(1, chickenQuantity - 1))}>
//               <Text style={styles.quantityButtonText}>−</Text>
//             </TouchableOpacity>

//             <Text style={styles.quantityText}>{chickenQuantity}</Text>

//             <TouchableOpacity
//               style={styles.quantityButton}
//               onPress={() => setChickenQuantity(chickenQuantity + 1)}>
//               <Text style={styles.quantityButtonText}>+</Text>
//             </TouchableOpacity>
//           </View>

//           <Text style={styles.itemPrice}>₹248</Text>
//         </View>
//       </View>

//       <TouchableOpacity style={styles.addMoreItems}>
//         <Text style={styles.addMoreText}>+ Add more items</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   itemsContainer: {
//     paddingHorizontal: 16,
//     marginTop: 16,
//   },

//   foodItem: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     paddingVertical: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.background,
//   },

//   // VEG ICON
//   vegIndicator: {
//     width: 16,
//     height: 16,
//     borderWidth: 1,
//     borderColor: COLORS.highlight,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 5,
//     borderRadius: 2,
//   },
//   vegDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 10,
//     backgroundColor: COLORS.highlight,
//   },

//   // NON VEG ICON
//   nonVegIndicator: {
//     width: 16,
//     height: 16,
//     borderWidth: 1,
//     borderColor: COLORS.primary,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 5,
//     borderRadius: 2,
//   },
//   nonVegTriangle: {
//     width: 0,
//     height: 0,
//     borderLeftWidth: 4,
//     borderRightWidth: 4,
//     borderBottomWidth: 7,
//     borderLeftColor: 'transparent',
//     borderRightColor: 'transparent',
//     borderBottomColor: COLORS.yelow,
//   },

//   itemDetails: {
//     flex: 1,
//     marginLeft: 12,
//   },

//   itemName: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: COLORS.textPrimary,
//     lineHeight: 22,
//   },
//   itemDescription: {
//     fontSize: 12,
//     color: COLORS.textSecondary,
//     marginTop: 4,
//   },
//   editText: {
//     fontSize: 12,
//     color: COLORS.primary,
//     marginTop: 8,
//     fontWeight: '500',
//   },

//   // QUANTITY
//   quantityContainer: {
//     alignItems: 'flex-end',
//     marginLeft: 12,
//   },
//   quantityControls: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: COLORS.primary,
//     borderRadius: 4,
//     marginBottom: 8,
//   },
//   quantityButton: {
//     width: 25,
//     height: 25,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   quantityButtonText: {
//     fontSize: 18,
//     color: COLORS.primary,
//     fontWeight: '600',
//   },
//   quantityText: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: COLORS.primary,
//     paddingHorizontal: 12,
//   },

//   itemPrice: {
//     fontSize: 12,
//     fontWeight: '800',
//     color: COLORS.textPrimary,
//   },

//   // Add More Items
//   addMoreItems: {
//     paddingVertical: 16,
//   },
//   addMoreText: {
//     fontSize: 14,
//     color: COLORS.primary,
//     fontWeight: '500',
//   },
// });

// export default FoodItems;



import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image, // Imported Image
} from 'react-native';
import {COLORS} from '../../theme/color';

const FoodItems: React.FC = () => {
  const [paneerQuantity, setPaneerQuantity] = useState(1);
  const [chickenQuantity, setChickenQuantity] = useState(1);

  return (
    <View style={styles.itemsContainer}>
      {/* Paneer Biryani */}
      <View style={styles.foodItem}>
        {/* Replaced Icon with Image container */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: 'https://tse1.mm.bing.net/th/id/OIP.y9WHqmBEubDgxpHWqRN9sAHaEO?pid=Api&P=0&h=180',
            }}
            style={styles.foodImage}
          />
          <View style={[styles.vegIndicator, styles.iconOverlay]}>
            <View style={styles.vegDot} />
          </View>
        </View>

        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>Paneer Biryani with Raita</Text>
          <Text style={styles.itemDescription}>Half [Serves 1]</Text>
          <TouchableOpacity>
            <Text style={styles.editText}>Edit ▸</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.quantityContainer}>
          <View style={styles.quantityControls}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => setPaneerQuantity(Math.max(1, paneerQuantity - 1))}>
              <Text style={styles.quantityButtonText}>−</Text>
            </TouchableOpacity>

            <Text style={styles.quantityText}>{paneerQuantity}</Text>

            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => setPaneerQuantity(paneerQuantity + 1)}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.itemPrice}>₹198</Text>
        </View>
      </View>

      {/* Chicken Biryani */}
      <View style={styles.foodItem}>
        {/* Replaced Icon with Image container */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=200&auto=format&fit=crop',
            }}
            style={styles.foodImage}
          />
          <View style={[styles.nonVegIndicator, styles.iconOverlay]}>
            <View style={styles.nonVegTriangle} />
          </View>
        </View>

        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>Hyderabadi Chicken Dum Biryani</Text>
          <Text style={styles.itemDescription}>
            Half [Serves 1, 2 Pieces Chicken]
          </Text>
          <TouchableOpacity>
            <Text style={styles.editText}>Edit ▸</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.quantityContainer}>
          <View style={styles.quantityControls}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => setChickenQuantity(Math.max(1, chickenQuantity - 1))}>
              <Text style={styles.quantityButtonText}>−</Text>
            </TouchableOpacity>

            <Text style={styles.quantityText}>{chickenQuantity}</Text>

            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => setChickenQuantity(chickenQuantity + 1)}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.itemPrice}>₹248</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.addMoreItems}>
        <Text style={styles.addMoreText}>+ Add more items</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemsContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
  },

  foodItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
  },

  // NEW IMAGE STYLES
  imageContainer: {
    position: 'relative',
    marginRight: 4, // Adjust spacing between image and text
  },
  foodImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  // Used to position the Veg/Non-Veg icon on top of the image
  iconOverlay: {
    position: 'absolute',
    top: 4,
    left: 4,
    backgroundColor: 'white', // Optional: adds background to icon for visibility
    borderRadius: 2,
  },

  // VEG ICON
  vegIndicator: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: COLORS.highlight,
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop removed as it is now positioned absolutely
  },
  vegDot: {
    width: 8,
    height: 8,
    borderRadius: 10,
    backgroundColor: COLORS.highlight,
  },

  // NON VEG ICON
  nonVegIndicator: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop removed as it is now positioned absolutely
  },
  nonVegTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderBottomWidth: 7,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: COLORS.primary, // Changed to primary to match border, or use COLORS.yellow if preferred
  },

  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },

  itemName: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textPrimary,
    lineHeight: 22,
  },
  itemDescription: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  editText: {
    fontSize: 12,
    color: COLORS.primary,
    marginTop: 8,
    fontWeight: '500',
  },

  // QUANTITY
  quantityContainer: {
    alignItems: 'flex-end',
    marginLeft: 12,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 4,
    marginBottom: 8,
  },
  quantityButton: {
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    color: COLORS.primary,
    fontWeight: '600',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.primary,
    paddingHorizontal: 12,
  },

  itemPrice: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },

  // Add More Items
  addMoreItems: {
    paddingVertical: 16,
  },
  addMoreText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '500',
  },
});

export default FoodItems;