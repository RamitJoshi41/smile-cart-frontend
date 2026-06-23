import React, { useEffect, useState } from "react";

import productsApi from "apis/products";
// import axios from "axios";
import { Header, PageLoader, PageNotFound } from "components/commons";
import { isNotNil, append } from "ramda";
import { useParams } from "react-router-dom";

import Carousel from "./Carousel";

const Product = () => {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const { slug } = useParams();

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
        </div>
      </div>
    </div>
  );
};

export default Product;
