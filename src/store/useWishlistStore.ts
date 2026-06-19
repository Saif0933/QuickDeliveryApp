import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface WishlistItem {
  id: string;
  name: string;
  category?: string;
  price: string | number;
  image: string;
  brand?: string;
  originalPrice?: string | number;
  discount?: string;
}

interface WishlistStore {
  wishlistItems: WishlistItem[];
  toggleWishlist: (product: any) => void;
  removeWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      wishlistItems: [],

      toggleWishlist: (product) => {
        const items = get().wishlistItems;
        const exists = items.some((item) => item.id === product.id);
        if (exists) {
          set({
            wishlistItems: items.filter((item) => item.id !== product.id),
          });
        } else {
          const newItem: WishlistItem = {
            id: product.id || String(Date.now()),
            name: product.name,
            category: product.category || 'Clothing',
            price: product.price,
            image: product.image,
            brand: product.brand,
            originalPrice: product.originalPrice,
            discount: product.discount,
          };
          set({ wishlistItems: [...items, newItem] });
        }
      },

      removeWishlist: (id) => {
        set((state) => ({
          wishlistItems: state.wishlistItems.filter((item) => item.id !== id),
        }));
      },

      isInWishlist: (id) => {
        return get().wishlistItems.some((item) => item.id === id);
      },
    }),
    {
      name: 'quick-delivery-wishlist-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
