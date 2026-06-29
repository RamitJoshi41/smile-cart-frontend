import { Button } from "neetoui";
import routes from "routes";
import useCartItemsStore from "stores/useCartItemsStore";

const PriceCard = ({ totalMrp, totalOfferPrice }) => {
  // The Internal Math
  const totalDiscounts = totalMrp - totalOfferPrice;
  const isDiscountPresent = totalDiscounts > 0;
  const discountPercentage = isDiscountPresent
    ? ((totalDiscounts / totalMrp) * 100).toFixed(1)
    : 0;

  // The Zustand Subscription
  const itemsCount = useCartItemsStore(
    store => Object.keys(store.cartItems).length
  );

  return (
    <div className="flex flex-col space-y-4 rounded-lg border border-gray-300 p-6 shadow-sm">
      {/* 1. Total MRP Row */}
      <div className="flex justify-between text-gray-600">
        <span>Total MRP:</span>
        <span className={isDiscountPresent ? "line-through" : ""}>
          ${totalMrp}
        </span>
      </div>
      {/* 2. Discounts Row (Only renders if there are savings) */}
      {isDiscountPresent && (
        <div className="flex justify-between text-green-600">
          <span>Total discounts:</span>
          <span>
            ${totalDiscounts} ({discountPercentage}%)
          </span>
        </div>
      )}
      <hr className="border-gray-200" />
      {/* 3. Final Price Row */}
      <div className="flex justify-between text-lg font-bold">
        <span>Total offer price:</span>
        <span>${totalOfferPrice}</span>
      </div>
      {/* 4. Item Count Footer */}
      <div className="text-center text-sm text-gray-500">
        {itemsCount} item{itemsCount !== 1 ? "s" : ""}
      </div>
      <div className="flex flex-col items-center pt-4">
        <Button
          className="bg-neutral-800 hover:bg-neutral-950 w-full justify-center"
          label="Buy now"
          to={routes.checkout}
        />
      </div>
    </div>
  );
};

export default PriceCard;
