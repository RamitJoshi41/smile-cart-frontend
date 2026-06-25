import AddToCart from "components/AddToCart";
import { Typography } from "neetoui";
import { Link } from "react-router-dom";
import routes from "routes";
import { buildUrl } from "utils/url";

const ProductListItem = ({
  imageUrl,
  name,
  offerPrice,
  slug,
  isInCart,
  toggleIsInCart,
}) => (
  <Link
    className="neeto-ui-border-black neeto-ui-rounded-xl flex w-48 flex-col items-center justify-between border p-4"
    to={buildUrl(routes.products.show, { slug })}
  >
    <img alt={name} src={imageUrl} />
    <Typography className="text-center" style="h3">
      {name}
    </Typography>
    <Typography className="items-center justify-center" style="body2">
      Price : {offerPrice}
    </Typography>
    <AddToCart {...{ isInCart, toggleIsInCart }} />
  </Link>
);
export default ProductListItem;
