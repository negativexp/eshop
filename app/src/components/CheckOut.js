import React from "react";
import { useNavigate } from 'react-router-dom';

export function CheckOut({ cart }) {

    const navigate = useNavigate()
    const HandleGoBack = () => {
      navigate(-1)
    }

    return (
      <div id="checkout">
        <h1>items</h1>
        <button id="checkout-exit" onClick={HandleGoBack}>
          go back
        </button>
        <div className="cart-items">
          {cart.map((item) => (
            <div className="cart-item">
              <h1>{item.title}</h1>
              <h3>{item.shortDescription}</h3>
              <p>{item.price} kč</p>
            </div>
          ))}
        </div>
      </div>
    );
}