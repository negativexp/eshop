import React from "react";
import "./styles/product.css"

export function Product({ product, addToCart }) {
    return (
      <div className="product">
        <div className="img">
          <img src={"http://localhost:5000/images/products/"+ product.productID +".jpg"}/>
        </div>
        <div className="title">
          <h1>{product.title}</h1>
        </div>
        <div className="shortdescription">
          <p>{product.shortDescription}</p>
        </div>
        <div className="price">
          <h2>{product.price} Kč</h2>
          <button onClick={() => addToCart(product)}>Add to cart</button>
        </div>
      </div>
    );
  }