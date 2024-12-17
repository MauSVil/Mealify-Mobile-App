import { CartStore } from "@/types/type";
import { create } from "zustand";

export const cartStore = create<CartStore>((set, get) => ({
  cart: {},
  addProduct: (product) => {
    const cart = get().cart;
    if (!cart[product.id]) {
      cart[product.id] = product;
    } else {
      cart[product.id].quantity += 1;
    }
    set(() => ({ cart }));
  },
  removeProduct: (id) => {
    const cart = get().cart;
    if (cart[id].quantity === 1) {
      delete cart[id];
    } else {
      cart[id].quantity -= 1;
    }
    set(() => ({ cart }));
  },
  clearCart: () => {
    set(() => ({ cart: {} }));
  },
}));
