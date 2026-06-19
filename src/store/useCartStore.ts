import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface CartItem {
  id: string;
  brand: string;
  name: string;
  size: string;
  color: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  deliveryDate?: string;
  quantity: number;
  image: string;
}

interface CartStore {
  cartItems: CartItem[];
  addItem: (product: any, size?: string, color?: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, action: 'increase' | 'decrease') => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cartItems: [],
      
      addItem: (product, size = 'M', color = 'Green') => {
        set((state) => {
          // Parse prices to numbers safely
          const parsePrice = (val: any): number => {
            if (typeof val === 'number') return val;
            if (typeof val === 'string') {
              return parseInt(val.replace(/[^0-9]/g, '')) || 0;
            }
            return 0;
          };

          const priceNum = parsePrice(product.price);
          const origPriceNum = parsePrice(product.originalPrice || product.price);

          // Check if item with same ID, size and color already exists in cart
          const existingItemIndex = state.cartItems.findIndex(
            (item) => item.id === product.id && item.size === size && item.color === color
          );

          if (existingItemIndex > -1) {
            const newCartItems = [...state.cartItems];
            newCartItems[existingItemIndex].quantity += 1;
            return { cartItems: newCartItems };
          } else {
            const newItem: CartItem = {
              id: product.id || String(Date.now()),
              brand: product.brand || 'HRX',
              name: product.name || 'Men Green Solid Cotton T-Shirt',
              size,
              color,
              price: priceNum,
              originalPrice: origPriceNum,
              discount: product.discount || '40% OFF',
              deliveryDate: '2-3 Days',
              quantity: 1,
              image: product.image || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80',
            };
            return { cartItems: [...state.cartItems, newItem] };
          }
        });
      },

      removeItem: (id) => {
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: (id, action) => {
        set((state) => {
          const updated = state.cartItems
            .map((item) => {
              if (item.id === id) {
                const qty = action === 'increase' ? item.quantity + 1 : item.quantity - 1;
                return { ...item, quantity: qty };
              }
              return item;
            })
            .filter((item) => item.quantity > 0);
          return { cartItems: updated };
        });
      },

      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: 'quick-delivery-cart-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
