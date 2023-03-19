import React from "react";
import { Link } from "react-router-dom";
import "./styles/product.css"
import { ButtonAddSmall } from "../ButtonAdd";

export function Product({ product, addToCart }) {
    return (
      <div className="product">
        <div className="img">
          <img src={"http://localhost:5000/images/products/"+ product.productID +".jpg"}/>
        </div>
        <div className="title">
          <Link to={product._id}>{product.title}</Link>
          {/* <h1>{product.title}</h1> */}
        </div>
        <div className="shortdescription">
          <p>ID: #{product.productID}</p>
          <p>quantity: {product.quantity}</p>
          <p>{product.shortDescription}</p>
        </div>
        <div className="price">
          <h2>{product.price} Kč</h2>
          <ButtonAddSmall addToCart={addToCart} product={product}/>
        </div>
      </div>
    );
  }