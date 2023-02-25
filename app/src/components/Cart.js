import React from "react";

export function Cart({ cart }) {
    return (
      <div className="cart">
        {cart.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
    );
  }
  