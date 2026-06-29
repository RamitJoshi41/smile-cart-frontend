import useCartItemsStore from "stores/useCartItemsStore";

export const cartTotalOf = (products, priceKey) => {
  // 1. Grab the current cart state from Zustand
  const { cartItems } = useCartItemsStore.getState();

  // 2. Calculate and return the final sum
  return products.reduce((total, product) => {
    // Extract the exact quantity the user has in their cart (default to 0 if missing)
    const quantity = cartItems[product.slug] || 0;

    // Extract the specific price we are calculating (mrp or offerPrice)
    const price = product[priceKey] || 0;

    // Multiply the price by the quantity, and add it to our running total
    return total + price * quantity;
  }, 0); // <-- This 0 is critical! It tells the reducer to start counting at zero.
};
