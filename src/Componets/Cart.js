import React, { useContext } from "react";
import { Context } from "../App";
import { Icon } from "@material-ui/core";

export default function Cart() {
  const { data, dispatch } = useContext(Context);
  return (
    <div className="card-wrapper row">
      {data.user?.cart?.length > 0 ? (
        data.user.cart.map((product) => (
          <div className="cart">
            <img src={product.images[0].url} alt="product" />
            <h3>{product.name}</h3>
            <span>Price: ${product.price.value}</span>
            {product.sale && <span className="sale">Sale</span>}
            {data.user.cart?.find((e) => e.code === product.code) ? (
              <span
                className="icon"
                onClick={() =>
                  dispatch({
                    type: "delete_cart",
                    payload: product,
                  })
                }
              >
                <Icon className="icon_i">remove_shopping_cart</Icon>
              </span>
            ) : (
              <span
                className="icon"
                onClick={() => dispatch({ type: "add_cart", payload: product })}
              >
                <Icon className="icon_i">add_shopping_cart</Icon>
              </span>
            )}

            <span>Category: {product.categoryName}</span>
          </div>
        ))
      ) : (
        <h2 className="loader row">Cart is empty</h2>
      )}
    </div>
  );
}
