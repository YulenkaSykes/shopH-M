import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { Context } from "../App";

const ProductInfo = () => {
  const { code } = useParams();
  const { data } = useContext(Context);

  const [good, setGood] = useState();
  const [info, setInfo] = useState();
  useEffect(() => {
    fetch(
      `https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/detail?lang=en&productcode=${code}&country=asia2`,
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
        console.log(data);
        setInfo(data.product);
      });
    setGood(data.products.find((product) => product.articles[0].code === code));
  }, []);
  return (
    <div>
      <div>
        <h1 className="loader">Product Info, code: {code}</h1>
        {info ? (
          <div className="product_info row">
            <img src={good.images[0].url} alt="good" />
            <div className="product_text_info">
              <h1>{info.name}</h1>
              <p>{info.description}</p>
              <div className="row" style={{ width: "10vw" }}>
                <span>Color:</span>
                <span
                  className="color"
                  style={{ background: `${info.color.rgbColor}` }}
                ></span>
              </div>
              <span>Made in {info.countryOfProduction}</span>
              <span>Price: {`${info.whitePrice.price}`}</span>
              <div>
                <button className="back" onClick={() => window.history.back()}>
                  Back
                </button>
              </div>
            </div>
          </div>
        ) : (
          <h1 className="loader row">Loading...</h1>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;
