import React from "react";
import { useNavigate } from 'react-router-dom';
import "./styles/checkout.css"

export function CheckOut({ cart, setCart }) {

    const navigate = useNavigate()
    const HandleGoBack = () => {
      navigate(-1)
    }

    const handleRemoveItem = (itemToDelete) => {
      setCart(cart.filter((item) => item !== itemToDelete))
    }

    return (
      <div id="checkout">
        <h1>items</h1>
        <div className="cart-items">
          {cart.map((item) => (
            <div className="cart-item">
              <h1>{item.title}</h1>
              <p>#{item.productID}</p>
              <p>{item.price} kč</p>
              <button onClick={() => handleRemoveItem(item)}>remove</button>
            </div>
          ))}
        </div>
        <button onClick={HandleGoBack}>go back</button>
        <button>Continue</button>
      </div>
    );
}