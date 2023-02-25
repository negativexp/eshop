import React from "react";

export function CheckOut({ cart, hideCheckOut }) {
    return (
      <div id="checkout">
        <h1>items</h1>
        <button id="checkout-exit" onClick={() => hideCheckOut()}>
          x
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