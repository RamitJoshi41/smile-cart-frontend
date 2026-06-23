import Name from "components/Name";
import { NavLink, Route, Switch, Redirect } from "react-router-dom";

import PageNotFound from "./components/PageNotFound";
import Product from "./components/Product";
import ProductList from "./components/ProductList";

const App = () => (
  <>
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
      <Route exact component={ProductList} path="/products" />
      <Route exact component={Product} path="/products/:slug" />
      <Redirect exact from="/" to="/products" />
      <Route component={PageNotFound} path="*" />
    </Switch>
  </>
);

export default App;
