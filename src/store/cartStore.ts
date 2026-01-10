import { create } from "zustand";

/* ===================== TYPES ===================== */

export interface Price {
  s: number;
  e: number;
  d: number[];
}

export interface CartItem {
  id: number;
  vendorId: number;
  vendorProductId: number;
  productVariantId?: number;
  quantity: number;
  notes?: string;
  price: Price;

  product?: {
    id: number;
    name: string;
    images?: {
      image: {
        url: string;
      };
    }[];
  };

  productVariant?: {
    id: number;
    title: string;
    price: Price;
  };
}

/* ===================== STORE TYPE ===================== */

interface CartStore {
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;

  /* actions */
  setCart: (payload: {
    items: CartItem[];
    totalQuantity: number;
    totalAmount: number;
  }) => void;

  addItem: (item: CartItem) => void;
  updateItemQuantity: (itemId: number, quantity: number) => void;
  removeItem: (itemId: number) => void;
  clearCart: () => void;
}

/* ===================== STORE ===================== */

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  totalQuantity: 0,
  totalAmount: 0,

  /* ---------- SET CART (FROM API) ---------- */
  setCart: ({ items, totalQuantity, totalAmount }) =>
    set({ items, totalQuantity, totalAmount }),

  /* ---------- ADD ITEM ---------- */
  addItem: (item) => {
    const items = get().items;
    const existing = items.find(
      (i) =>
        i.vendorProductId === item.vendorProductId &&
        i.productVariantId === item.productVariantId
    );

    let updatedItems: CartItem[];

    if (existing) {
      updatedItems = items.map((i) =>
        i.id === existing.id
          ? { ...i, quantity: i.quantity + item.quantity }
          : i
      );
    } else {
      updatedItems = [...items, item];
    }

    const totalQuantity = updatedItems.reduce(
      (sum, i) => sum + i.quantity,
      0
    );

    const totalAmount = updatedItems.reduce(
      (sum, i) => sum + i.price.d[0] * i.quantity,
      0
    );

    set({ items: updatedItems, totalQuantity, totalAmount });
  },

  /* ---------- UPDATE QUANTITY ---------- */
  updateItemQuantity: (itemId, quantity) => {
    const updatedItems = get().items.map((i) =>
      i.id === itemId ? { ...i, quantity } : i
    );

    const totalQuantity = updatedItems.reduce(
      (sum, i) => sum + i.quantity,
      0
    );

    const totalAmount = updatedItems.reduce(
      (sum, i) => sum + i.price.d[0] * i.quantity,
      0
    );

    set({ items: updatedItems, totalQuantity, totalAmount });
  },

  /* ---------- REMOVE ITEM ---------- */
  removeItem: (itemId) => {
    const updatedItems = get().items.filter((i) => i.id !== itemId);

    const totalQuantity = updatedItems.reduce(
      (sum, i) => sum + i.quantity,
      0
    );

    const totalAmount = updatedItems.reduce(
      (sum, i) => sum + i.price.d[0] * i.quantity,
      0
    );

    set({ items: updatedItems, totalQuantity, totalAmount });
  },

  /* ---------- CLEAR CART ---------- */
  clearCart: () =>
    set({
      items: [],
      totalQuantity: 0,
      totalAmount: 0,
    }),
}));
