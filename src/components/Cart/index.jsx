import { useEffect, useState } from "react";

import productsApi from "apis/products";
import { Header, PageLoader } from "components/commons";
import { MRP, OFFER_PRICE } from "components/constants";
import { cartTotalOf } from "components/utils";
import i18n from "i18next";
import { NoData } from "neetoui";
// import { Helmet } from "react-helmet";
import useCartItemsStore from "stores/useCartItemsStore";
// import useSelectedQuantity from "hooks/useSelectedQuantity";
import toastr from "toastr";
import withTitle from "utils/withTitle";
// import { shallow } from "zustand/shallow";

import PriceCard from "./PriceCard";
import ProductCard from "./ProductCard";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const { itemCount } = useSelectedQuantity(slug)

  const { cartItems, setSelectedQuantity } = useCartItemsStore.pick();
  const slugs = Object.keys(cartItems);

  const fetchCartProducts = async () => {
    try {
      const productList = await Promise.all(
        slugs.map(item => productsApi.show(item))
      );

      productList.forEach(({ availableQuantity, name, slug }) => {
        if (availableQuantity < cartItems[slug]) {
          setSelectedQuantity(slug, availableQuantity);
          toastr.error("Error", `Not enough Stock of ${name}`);
        }
      });
      setProducts(productList);
    } catch (e) {
      console.log("Error fetching cart:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCartProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);
  const totalMrp = cartTotalOf(products, MRP);
  const totalOfferPrice = cartTotalOf(products, OFFER_PRICE);
  if (isLoading) return <PageLoader />;

  if (products.length === 0) {
    return (
      <>
        <Header title="My Cart" />
        <div className="flex h-screen items-center justify-center">
          <NoData title="Your cart is empty!" />
        </div>
      </>
    );
  }

  return (
    <>
      <Header title="My Cart" />
      {/* Responsive Wrapper:
        - Mobile: flex-col (stacks vertically), items-center, gap-8
        - Desktop (md:): flex-row (side-by-side), items-start
        - Added max-w-6xl and px-4 so it doesn't touch the screen edges
      */}
      <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center gap-8 px-4 md:flex-row md:items-start md:justify-center">
        {/* Left Column: Product List */}
        {/* Mobile: takes full width (w-full). Desktop: takes up to 2/3 */}
        <div className="w-full space-y-5 md:w-2/3 lg:w-1/2">
          {products.map(product => (
            <ProductCard key={product.slug} {...product} />
          ))}
        </div>
        {/* Right Column: The Receipt */}
        {/* Mobile: takes full width. Desktop: takes 1/3 or 1/4 */}
        {totalMrp > 0 && (
          <div className="w-full md:w-1/3 lg:w-1/4">
            <PriceCard totalMrp={totalMrp} totalOfferPrice={totalOfferPrice} />
          </div>
        )}
      </div>
    </>
  );
};

export default withTitle(Cart, i18n.t("cart.title"));
