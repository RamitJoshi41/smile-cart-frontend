import { create } from "zustand";

const useCartItemsStore = create(set => ({
  // 1. The Initial State
  cartItems: [],
  action: {
    // 2. The Action (A function assigned to a key)
    toggleIsInCart: slug =>
      // 3. Call 'set' to update the store. Zustand passes in the current 'state'.
      set(state => ({
        // 4. Return the specific key you want to update (cartItems)
        cartItems: !state.cartItems.includes(slug)
          ? [slug, ...state.cartItems] // Add it
          : state.cartItems.filter(item => item !== slug), // Remove it
      })),
  },
}));

export default useCartItemsStore;
