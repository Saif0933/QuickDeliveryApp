import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface OrderItem {
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

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: string;
  status: string;
  statusColor: string;
  icon: string;
  orderIdVal?: string;
}

interface OrderStore {
  orders: Order[];
  addOrder: (order: Order) => void;
  clearOrders: () => void;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      orders: [],
      addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
      clearOrders: () => set({ orders: [] }),
    }),
    {
      name: 'quick-delivery-order-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
