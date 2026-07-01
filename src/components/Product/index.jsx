import React, { useEffect, useState } from "react";

import productsApi from "apis/products";
// import axios from "axios";
import { Header, PageLoader, PageNotFound } from "components/commons";
import AddToCart from "components/commons/AddToCart";
import useSelectedQuantity from "hooks/useSelectedQuantity";
import { Button } from "neetoui";
import { isNotNil, append } from "ramda";
import { useParams } from "react-router-dom";
import routes from "routes";
import i18n from "src/common/i18n";
import withTitle from "utils/withTitle";

import Carousel from "./Carousel";

const Product = () => {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const { slug } = useParams();
  const { selectedQuantity, setSelectedQuantity } = useSelectedQuantity(slug);

  const fetchProductData = async () => {
    const timerPromise = new Promise(resolve => setTimeout(resolve, 3000));
    try {
      const product = await productsApi.show(slug);
      await timerPromise;
      setProduct(product);
      // Process the response data as needed
    } catch (error) {
      setIsError(true);
      console.error("Error fetching product data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);
  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <PageNotFound />;
  }

  const { name, description, mrp, offerPrice, imageUrls, imageUrl } = product;
  const totalDiscounts = mrp - offerPrice;
  const discountPercentage = ((totalDiscounts / mrp) * 100).toFixed(1);

  return (
    <div className="px-6 pb-6">
      <Header title={name} />
      <div className="mt-16 flex gap-4">
        <div className="w-2/5">
          <div className="flex justify-center gap-16">
            {isNotNil(imageUrls) ? (
              <Carousel imageUrls={append(imageUrl, imageUrls)} title={name} />
            ) : (
              <img alt={name} className="w-48" src={imageUrl} />
            )}
          </div>
        </div>
        <div className="w-3/5 space-y-4">
          <p>{description}</p>
          <p>MRP: ${mrp.toFixed(2)}</p>
          <p className="font-semibold">Offer price: ${offerPrice.toFixed(2)}</p>
          <p className="font-semibold text-green-600">
            {discountPercentage}% off
          </p>
          <div className="flex flex-col items-center gap-2 pt-4">
            <AddToCart
              availableQuantity={product.availableQuantity}
              slug={slug}
            />
            <hr className="border-gray-900" />
            <Button
              className="bg-neutral-800 hover:bg-neutral-950 h-10 w-full justify-center"
              label="Buy now"
              to={routes.checkout}
              onClick={() => setSelectedQuantity(selectedQuantity || 1)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withTitle(Product, i18n.t("product.title"));
