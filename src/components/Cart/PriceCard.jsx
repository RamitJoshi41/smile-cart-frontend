import { Button } from "neetoui";
import { useTranslation, Trans } from "react-i18next";
import routes from "routes";
import useCartItemsStore from "stores/useCartItemsStore";

const PriceCard = ({ totalMrp, totalOfferPrice }) => {
  const { t } = useTranslation();
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
        <Trans
          i18nKey="totalMrp"
          values={{ mrp: totalMrp }}
          components={{
            typography: (
              <span className={isDiscountPresent ? "line-through" : ""} />
            ),
          }}
        />
      </div>
      {/* 2. Discounts Row (Only renders if there are savings) */}
      {isDiscountPresent && (
        <div className="flex justify-between text-green-600">
          <Trans
            components={{ span: <span /> }}
            i18nKey="totalDiscounts"
            values={{ discounts: totalDiscounts, discountPercentage }}
          />
        </div>
      )}
      <hr className="border-gray-200" />
      {/* 3. Final Price Row */}
      <div className="flex justify-between text-lg font-bold">
        <Trans
          components={{ span: <span /> }}
          i18nKey="offerPrice"
          values={{ offerPrice: totalOfferPrice }}
        />
      </div>
      {/* 4. Item Count Footer */}
      <div className="text-center text-sm text-gray-500">
        {t("itemCount", { count: itemsCount })}
      </div>
      <div className="flex flex-col items-center pt-4">
        <Button
          className="bg-neutral-800 hover:bg-neutral-950 w-full justify-center"
          label={t("buyNow")}
          to={routes.checkout}
        />
      </div>
    </div>
  );
};

export default PriceCard;
