import { Typography } from "neetoui";
import { Link } from "react-router-dom";

const ProductListItem = ({ imageUrl, name, offerPrice, slug }) => (
  <Link
    className="neeto-ui-border-black neeto-ui-rounded-xl flex w-48 flex-col items-center justify-between border p-4"
    to={`/products/${slug}`}
  >
    <img alt={name} src={imageUrl} />
    <Typography className="text-center" style="h3">
      {name}
    </Typography>
    <Typography className="items-center justify-center" style="body2">
      Price : {offerPrice}
    </Typography>
  </Link>
);
export default ProductListItem;
