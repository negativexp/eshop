import React from "react";

export function Product({ product, addToCart }) {
    return (
      <div className="product">
        <div className="product-img">
          <img />
        </div>
        <div className="product-title">
          <h1>{product.title}</h1>
        </div>
        <div className="product-shortdescription">
          <p>{product.shortDescription}</p>
        </div>
        <div className="product-button">
          <button onClick={() => addToCart(product)}>Add to cart</button>
        </div>
      </div>
    );
  }