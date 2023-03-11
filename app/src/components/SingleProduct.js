import React, { useState, useEffect } from "react";
import { useFetcher, useParams } from "react-router-dom";
import { ButtonAddBig } from "../ButtonAdd";

export function SingleProduct({ addToCart }) {
  const { productID } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {

        const singleProduct = data.find((product) => product._id === productID);
        setProduct(singleProduct)
      
      });
  }, [0]);

  return (
    <div className="singleProduct">
      {product == undefined ? (
        <div className="loading">
          <h1>loading...</h1>
        </div>
      ) : (
        <>
          <div className="productDetails">
            <div className="productImage">
              <img
                src={
                  "http://localhost:5000/images/products/" +
                  product.productID +
                  ".jpg"
                }
              />
            </div>
            <div className="productInfo">
              <h1>{product.title}</h1>
              <p>{product.longDescription}</p>
            </div>
          </div>
          <ButtonAddBig addToCart={addToCart} product={product}/>
        </>
      )}
    </div>
  );
}
