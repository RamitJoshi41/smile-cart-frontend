import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartItemsStore = create(
  persist(
    set => ({
      cartItems: {},

      setSelectedQuantity: (slug, quantity) =>
        set(state => {
          if (quantity <= 0) {
            // eslint-disable-next-line no-unused-vars
            const { [slug]: _itemToRemove, ...remainingItems } =
              state.cartItems;

            return { cartItems: remainingItems };
          }

          return {
            cartItems: {
              ...state.cartItems,
              [slug]: quantity,
            },
          };
        }),

      removeSelectedQuantity: slug =>
        set(state => {
          // eslint-disable-next-line no-unused-vars
          const { [slug]: _itemToRemove, ...remainingItems } = state.cartItems;

          return { cartItems: remainingItems };
        }),
    }),
    {
      name: "cart-items-store",
    }
  )
);

export default useCartItemsStore;
