import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useReducer, createContext, useEffect } from "react";
import Login from "./Componets/Login";
import Register from "./Componets/Register";
import Main from "./Componets/Main";
import Product from "./Componets/Product";
import { Icon } from "@material-ui/core";
import Cart from "./Componets/Cart";
import ProductInfo from "./Componets/ProductInfo";
import "./App.css";
import "./frame.css";

export const Context = createContext(null);

const reducer = (data, action) => {
  switch (action.type) {
    case "product":
      return { ...data, products: action.payload };
    case "clearProduct":
      return { ...data, products: [] };
    case "add":
      return {
        ...data,
        users: [...data.users, { ...action.payload, cart: [] }],
      };
    case "add_cart":
      return {
        ...data,
        user: { ...data.user, cart: [...data.user.cart, action.payload] },
        users: [
          ...data.users.filter((e) => e.login !== data.user.login),
          { ...data.user, cart: [...data.user.cart, action.payload] },
        ],
      };
    case "delete_cart":
      return {
        ...data,
        user: {
          ...data.user,
          cart: data.user.cart.filter((e) => e.code !== action.payload.code),
        },
        users: [
          ...data.users.filter((e) => e.login !== data.user.login),
          {
            ...data.user,
            cart: data.user.cart.filter((e) => e.code !== action.payload.code),
          },
        ],
      };
    case "login":
      return {
        ...data,
        user: data.users.find((e) => e.login === action.payload.login),
      };
    case "logout":
      return { ...data, user: {} };
    default:
      return data;
  }
};

function App() {
  const [data, dispatch] = useReducer(reducer, {
    products: [],
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : { cart: [] },
    users: localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users"))
      : [],
  });
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(data.users));
  }, [data.users]);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(data.user));
  }, [data.user]);

  return (
    <Context.Provider value={{ data, dispatch }}>
      <Router>
        <div className="App">
          <header>
            <div className="row">
              <Link to="/">
                <span>Main</span>
              </Link>
              <Link to="/login">
                <span>Login</span>
              </Link>
              <Link to="/register">
                <span>Register</span>
              </Link>
              <Link to="/product">
                <span>Product</span>
              </Link>
              {data.user.login && <Link to="/cart">Cart</Link>}
            </div>
            {data.user.login && (
              <div className="info_person">
                <Icon fontSize="large">person</Icon>
                <h5>{data.user.login}</h5>
                <button
                  className="btn_person"
                  onClick={() => dispatch({ type: "logout" })}
                >
                  Logout
                </button>
              </div>
            )}
          </header>
        </div>
        <Switch>
          <Route path="/" exact>
            <Main />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/product">
            <Product />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/productInfo/:code">
            <ProductInfo />
          </Route>
        </Switch>
      </Router>
    </Context.Provider>
  );
}

export default App;
