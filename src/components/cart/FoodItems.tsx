import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const FoodItems: React.FC = () => {
  const [paneerQuantity, setPaneerQuantity] = useState(1);
  const [chickenQuantity, setChickenQuantity] = useState(1);

  return (
    <View style={styles.itemsContainer}>
      {/* Paneer Biryani */}
      <View style={styles.foodItem}>
        <View style={styles.vegIndicator}>
          <View style={styles.vegDot} />
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
              onPress={() =>
                setPaneerQuantity(Math.max(1, paneerQuantity - 1))
              }>
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
        <View style={styles.nonVegIndicator}>
          <View style={styles.nonVegTriangle} />
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
              onPress={() =>
                setChickenQuantity(Math.max(1, chickenQuantity - 1))
              }>
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
    borderBottomColor: '#F0F0F0',
  },
  vegIndicator: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  vegDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
  },
  nonVegIndicator: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: '#3e0dd2ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  nonVegTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderBottomWidth: 7,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FF5722',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    lineHeight: 22,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  editText: {
    fontSize: 14,
    color: '#3e0dd2ff',
    marginTop: 8,
  },
  quantityContainer: {
    alignItems: 'flex-end',
    marginLeft: 12,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3e0dd2ff',
    borderRadius: 4,
    marginBottom: 8,
  },
  quantityButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    color: '#3e0dd2ff',
    fontWeight: '500',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#3e0dd2ff',
    paddingHorizontal: 12,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  addMoreItems: {
    paddingVertical: 16,
  },
  addMoreText: {
    fontSize: 16,
    color: '#3e0dd2ff',
    fontWeight: '500',
  },
});

export default FoodItems;
