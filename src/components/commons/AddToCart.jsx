import { useContext } from "react";

import { Button } from "neetoui";
// import { without } from "ramda";
import CartItemsContext from "src/contexts/CartItemContext";

const AddToCart = ({ slug }) => {
  const [cartItems, setCartItems] = useContext(CartItemsContext);
  const handleClick = e => {
    e.stopPropagation();
    e.preventDefault();

    setCartItems(prevCartItems =>
      !prevCartItems.includes(slug)
        ? [slug, ...prevCartItems]
        : prevCartItems.filter(item => item !== slug)
    );
  };

  return (
    <Button
      label={cartItems.includes(slug) ? "Remove from cart" : "Add to cart"}
      size="large"
      onClick={handleClick}
    />
  );
};
export default AddToCart;
