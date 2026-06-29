// import { useContext } from "react";

import useSelectedQuantity from "hooks/useSelectedQuantity";
import { Button } from "neetoui";

import ProductQuantity from "./ProductQuantity";
// import { without } from "ramda";
// import CartItemsContext from "src/contexts/CartItemContext";
// import useCartItemsStore from "stores/useCartItemsStore";
// import { shallow } from "zustand/shallow";

const AddToCart = ({ slug, availableQuantity }) => {
  // const [cartItems, setCartItems] = useContext(CartItemsContext);
  const { itemCount, setSelectedQuantity } = useSelectedQuantity(slug);

  const handleClick = e => {
    e.stopPropagation();
    e.preventDefault();

    setSelectedQuantity(1);
  };

  if (itemCount <= 0) {
    return (
      <Button
        className="bg-neutral-800 hover:bg-neutral-950 w-full justify-center"
        label="Add to cart" // No ternary needed here anymore!
        size="large"
        onClick={handleClick}
      />
    );
  }

  // 2. If the code makes it this far, the item IS in the cart.
  // Return the quantity component.
  return <ProductQuantity availableQuantity={availableQuantity} slug={slug} />;
};
export default AddToCart;
