import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./styles/checkout.css";

export function CheckOut({ cart, setCart }) {
  const navigate = useNavigate();
  const HandleGoBack = () => {
    navigate(-1);
  };

  const handleRemoveItem = (itemToDeleteID) => {
    const storedItems = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedItems = storedItems.filter(
      (storedItem) => storedItem._id !== itemToDeleteID
    );
    localStorage.setItem("cart", JSON.stringify(updatedItems));
    setCart(updatedItems);
  };

  return (
    <div id="checkout">
      <h1>step 1 out of 3</h1>
      <div className="cart-items">
        {cart.length === 0 ? (
          <div className="empty-cart">
            <img src="http://localhost:5000/images/misc/sad.png" />
            <h1>Empty cart!</h1>
            <p>Please add products to your cart!</p>
            <button onClick={HandleGoBack}>go back</button>
          </div>
        ) : (
          <>
            {cart.map((item) => (
              <div className="cart-item">
                <div className="cart-image">
                  <img
                    src={
                      "http://localhost:5000/images/products/" +
                      item.productID +
                      ".jpg"
                    }
                  />
                </div>
                <div className="product-info">
                  <h1>{item.title}</h1>
                  <p>#{item.productID}</p>
                  <p>{item.price} kč</p>
                  <button onClick={() => handleRemoveItem(item._id)}>
                    remove
                  </button>
                </div>
              </div>
            ))}
            <div className="checkout-buttons">
              <Link to={"/checkout/details"}>Pokračovat</Link>
              <button onClick={HandleGoBack}>Nazpátek</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export function CheckoutDetails() {
  return (
    <div id="checkout">
      <h1>step 2 out of 3</h1>
      <div className="details">
      <label for="name">Jméno</label>
      <input
        type="text"
        placeholder=""
      />
      <label for="name">Příjmení</label>
      <input
        type="text"
        placeholder=""
      />
      <label for="name">Email</label>
      <input
        type="text"
        placeholder=""
      />
      <label for="name">telefoní číslo</label>
      <input
        type="text"
        placeholder=""
      />
      <label for="name">Město</label>
      <input
        type="text"
        placeholder=""
      />
      <label for="name">PSČ</label>
      <input
        type="text"
        placeholder=""
      />
      <label for="name">Adresa</label>
      <input
        type="text"
        placeholder=""
      />
      </div>
      
    </div>
  )
}
