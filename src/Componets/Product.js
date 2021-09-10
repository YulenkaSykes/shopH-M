import React, { useContext, useEffect, useState } from "react";
import { Context } from "../App";
import { Link } from "react-router-dom";
import Icon from "@material-ui/core/Icon";

const Product = () => {
  const { data, dispatch } = useContext(Context);

  const [pages, setPages] = useState([]);
  const [current, setCurrent] = useState(0);

  const getProbuct = (page) => {
    fetch(
      `https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?country=asia2&lang=en&currentpage=${page}&pagesize=30&categories=men_all&concepts=H%26M%20MAN`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
          "x-rapidapi-key":
            "2ecc6a18f1msh149a8c93469a116p1ff3e3jsn92ea038f0326",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results);
        dispatch({ type: "product", payload: data.results });
      });
  };

  useEffect(() => {
    getProbuct(current);
    const p = [];
    for (let c = 0; c < 15; c++) {
      p.push(c);
    }
    setPages([...p]);
  }, []);

  useEffect(() => {
    dispatch({ type: "clearProduct" });
    getProbuct(current);
  }, [current]);
  return (
    <div>
      <div className="card-wrapper row">
        {data.user?.login ? (
          data.products.length > 1 ? (
            data.products.map((product) => (
              <div className="card">
                <img src={product.images[0].url} alt="good" />
                <h3>{product.name}</h3>
                <div className="price">
                  <span>Price: $ {product.price.value}</span>
                  {product.sale && <span className="sale">Sale</span>}
                  {data.user.cart?.find((e) => e.code === product.code) ? (
                    <span
                      className="icon"
                      onClick={() =>
                        dispatch({ type: "delete_cart", payload: product })
                      }
                    >
                      <Icon className="icon_i">remove_shopping_cart</Icon>
                    </span>
                  ) : (
                    <span
                      className="icon"
                      onClick={() =>
                        dispatch({ type: "add_cart", payload: product })
                      }
                    >
                      <Icon className="icon_i">add_shopping_cart</Icon>
                    </span>
                  )}
                  <p>Category {product.categoryName}</p>
                  <Link
                    className="more row"
                    style={{ color: "black" }}
                    to={`/productInfo/${product.articles[0].code}`}
                  >
                    More
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <h1 className="loader row">Loading...</h1>
          )
        ) : (
          <h1 className="loader row">
            Please &nbsp;
            <Link style={{ color: "black" }} to="/login">
              login
            </Link>
            &nbsp; to view the goods
          </h1>
        )}
      </div>
      {data.user?.login && (
        <div className="pagination row">
          <span
            className="row"
            onClick={() =>
              setCurrent(current - 1 < 0 ? pages.length - 1 : current - 1)
            }
          >
            <Icon>arrow_left</Icon>
          </span>
          {pages.map((p) => (
            <span
              className={`row ${current === p && "active"}`}
              style={{ margin: "10px" }}
              onClick={() => setCurrent(p)}
            >
              {p}
            </span>
          ))}
          <span
            className="row"
            onClick={() => setCurrent(current + 1 > 14 ? 0 : current + 1)}
          >
            <Icon>arrow_right</Icon>
          </span>
        </div>
      )}
    </div>
  );
};

export default Product;
