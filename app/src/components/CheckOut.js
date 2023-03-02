import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/checkout.css";

export function CheckOut({ cart, setCart }) {
  const navigate = useNavigate();
  const HandleGoBack = () => {
    navigate(-1);
  };

  const handleRemoveItem = (itemToDelete) => {
    setCart(cart.filter((item) => item !== itemToDelete));
  };

  return (
    <div className="checkout">
      <div className="cart-items">
        {cart.length === 0 ? (
          <div className="empty-cart">
            <img src="http://localhost:5000/images/misc/sad.png"/>
            <h1>Empty cart!</h1>
            <p>Please add products to your cart!</p>
          <button onClick={HandleGoBack}>go back</button>
          </div>
        ) : (
          <>
            {cart.map((item) => (
              <div className="cart-item">
                <div className="cart-image">
                  <img src={"http://localhost:5000/images/products/"+ item.productID +".jpg"}/>
                </div>
                <div className="product-info">
                  <h1>{item.title}</h1>
                  <p>#{item.productID}</p>
                  <p>{item.price} kč</p>
                  <button onClick={() => handleRemoveItem(item)}>remove</button>
                </div>
              </div>
            ))}
            <div className="checkout-buttons">
            <button>Continue</button>
          <button onClick={HandleGoBack}>go back</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
