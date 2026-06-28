import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartItemsStore = create(
  persist(
    set => ({
      cartItems: {}, // Initialize as an empty object

      setSelectedQuantity: (slug, quantity) =>
        set(state => {
          // SCENARIO 1: The quantity drops to 0 or less. We must remove the item.
          if (quantity <= 0) {
            // Native JS Destructuring:
            // We pull the specific 'slug' out of the object and throw it away,
            // keeping all the 'remainingItems' to update the store.
            // eslint-disable-next-line no-unused-vars
            const { [slug]: _itemToRemove, ...remainingItems } =
              state.cartItems;

            return { cartItems: remainingItems };
          }

          // SCENARIO 2: Add or update the quantity.
          return {
            cartItems: {
              ...state.cartItems, // Keep everything else in the cart
              [slug]: quantity, // Add or overwrite this specific item's quantity
            },
          };
        }),
    }),
    {
      name: "cart-items-store",
    }
  )
);

export default useCartItemsStore;
