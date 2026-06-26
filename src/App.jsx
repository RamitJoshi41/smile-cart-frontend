// import { useState } from "react";

import Name from "components/Name";
import { NavLink, Route, Switch, Redirect } from "react-router-dom";
import routes from "routes";

import PageNotFound from "./components/PageNotFound";
import Product from "./components/Product";
import ProductList from "./components/ProductList";
// import CartItemsContext from "./contexts/CartItemContext";

const App = () => (
  <>
    {/* <CartItemsContext.Provider value={[cartItems, setCartItems]}> */}
    <div className="flex space-x-2">
      <NavLink exact activeClassName="underline font-bold" to="/products">
        Products
      </NavLink>
      <NavLink exact activeClassName="underline font-bold" to="/product">
        Product
      </NavLink>
      <NavLink exact activeClassName="underline font-bold text-blue" to="/name">
        Name
      </NavLink>
    </div>
    <Switch>
      <Route exact component={Name} path="/name" />
      <Route exact component={ProductList} path={routes.products.index} />
      <Route exact component={Product} path={routes.products.show} />
      <Redirect exact from="/" to={routes.products.index} />
      <Route component={PageNotFound} path="*" />
    </Switch>
    {/* </CartItemsContext.Provider> */}
  </>
);

export default App;
