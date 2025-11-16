// src/stores/useCart.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: number;
  name: string;
  price: number; // already a number (db)
  quantity: number;
  image?: string;
}

interface CartState {
  items: CartItem[];

  addItem: (item: Omit<CartItem, "quantity">) => void;
  increase: (id: number) => void;
  decrease: (id: number) => void;
  remove: (id: number) => void;
  clear: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const existing = get().items.find((i) => i.id === item.id);

        if (existing) {
          return set({
            items: get().items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        }

        set({
          items: [...get().items, { ...item, quantity: 1 }],
        });
      },

      increase: (id) =>
        set({
          items: get().items.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        }),

      decrease: (id) =>
        set({
          items: get()
            .items.map((i) =>
              i.id === id ? { ...i, quantity: i.quantity - 1 } : i
            )
            .filter((i) => i.quantity > 0),
        }),

      remove: (id) =>
        set({
          items: get().items.filter((i) => i.id !== id),
        }),

      clear: () => set({ items: [] }),
    }),
    {
      name: "kitchen-cart-store", // localStorage key
      version: 1,
    }
  )
);

// ---------- SELECTORS (pure functions) ----------

export const getTotalQty = (items: CartItem[]) =>
  items.reduce((acc, i) => acc + i.quantity, 0);

export const getTotalPrice = (items: CartItem[]) =>
  items.reduce((acc, i) => acc + i.price * i.quantity, 0);

export const getItemQty = (items: CartItem[], id: number) =>
  items.find((i) => i.id === id)?.quantity ?? 0;

export const getItemTotal = (items: CartItem[], id: number) => {
  const item = items.find((i) => i.id === id);
  return item ? item.quantity * item.price : 0;
};
