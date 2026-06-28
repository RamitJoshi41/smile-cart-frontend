import useCartItemsStore from "stores/useCartItemsStore";
import { shallow } from "zustand/shallow";

const useSelectedQuantity = slug => {
  const { itemCount, setSelectedQuantity } = useCartItemsStore(
    store => ({
      itemCount: store.cartItems[slug] || 0,
      setSelectedQuantity: store.setSelectedQuantity,
    }),
    shallow
  );

  return {
    itemCount,
    setSelectedQuantity: quantity => setSelectedQuantity(slug, quantity),
  };
};

export default useSelectedQuantity;
