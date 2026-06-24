import { useState, useEffect } from "react";

import productsApi from "apis/products";
import { Header, PageLoader } from "components/commons";
import { Input, NoData } from "neetoui";
import { isEmpty } from "ramda";

import ProductListItem from "./ProductListItem";

const ProductList = () => {
  const [searchKey, setSearchKey] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const { products } = await productsApi.fetch({ searchTerm: searchKey });
      setProducts(products);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProduct();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchKey]);

  if (isLoading) {
    return <PageLoader />;
  }

  const actionBlock = (
    <Input
      placeholder="Gucci"
      type="search"
      value={searchKey}
      onChange={e => setSearchKey(e.target.value)}
    />
  );

  return (
    <div className="flex flex-col">
      <Header
        actionBlock={actionBlock}
        shouldShowBackButton={false}
        title="Smile Cart"
      />
      {isEmpty(products) ? (
        <NoData className="h-full w-full" title="No products to show" />
      ) : (
        <div className="grid grid-cols-2 justify-items-center gap-y-8 p-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map(product => (
            <ProductListItem key={product.slug} {...product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
