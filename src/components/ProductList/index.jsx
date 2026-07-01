import { useState, useEffect } from "react";

import productsApi from "apis/products";
import { Header, PageLoader } from "components/commons";
import useDebounce from "hooks/useDebounce";
import { Input, NoData } from "neetoui";
import { isEmpty } from "ramda";
import i18n from "src/common/i18n";
import withTitle from "utils/withTitle";

import ProductListItem from "./ProductListItem";

const ProductList = () => {
  const [searchKey, setSearchKey] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [cartItems, setCartItems] = useState([]);
  const debouncedSearchKey = useDebounce(searchKey);

  const fetchProduct = async () => {
    try {
      const { products } = await productsApi.fetch({
        searchTerm: debouncedSearchKey,
      });
      setProducts(products);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // const toggleIsInCart = slug => {
  //   setCartItems(prevCartItems =>
  //     !prevCartItems.includes(slug)
  //       ? [slug, ...prevCartItems]
  //       : prevCartItems.filter(item => item !== slug)
  //   );
  // };

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchKey]);

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
        // cartItemsCount={cartItems.length}
        shouldShowBackButton={false}
        title="Smile Cart"
      />
      {isEmpty(products) ? (
        <NoData className="h-full w-full" title="No products to show" />
      ) : (
        <div className="grid grid-cols-2 justify-items-center gap-y-8 p-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map(product => (
            <ProductListItem
              // isInCart={cartItems.includes(product.slug)}
              key={product.slug}
              {...product}
              // toggleIsInCart={() => toggleIsInCart(product.slug)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default withTitle(ProductList, i18n.t("productlist.title"));
