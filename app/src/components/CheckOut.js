import React, {useState} from "react";
import { useNavigate, Link, UNSAFE_DataRouterStateContext } from "react-router-dom";
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

      <div className="checkout-progress">
        <div className="checkout-progress-point">
          <h1>Produkty</h1>
          <div className="checkout-progress-img">
            <img src="http://localhost:5000/images/misc/greencircle.png" />
          </div>
        </div>
        <div className="checkout-progress-point">
          <h1>Detaily</h1>
          <div className="checkout-progress-img">
            <img src="http://localhost:5000/images/misc/graycircle.png" style={{ width: "30px" }} />
          </div>
        </div>
        <div className="checkout-progress-point">
          <h1>Souhrn</h1>
          <div className="checkout-progress-img">
            <img src="http://localhost:5000/images/misc/graycircle.png" style={{ width: "30px" }} />
          </div>
        </div>
      </div>

      <div className="cart-items">
        {cart.length === 0 ? (
          <div className="empty-cart">
            <img src="http://localhost:5000/images/misc/sad.png" />
            <h1>Prazdnej košík!</h1>
            <p>Prosím přidejte produkty do vašho košíku!</p>
            <button onClick={HandleGoBack}>Zpátky</button>
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
                <div className="cart-item-info">
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
              {/* <button onClick={HandleGoBack}>Nazpátek</button> */}
              <Link to={"/checkout/details"}>Pokračovat</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export function CheckoutDetails({ setDetails }) {

  const saveDetails = () => {
    const data = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      email: document.getElementById("email").value,
      phoneNumber: document.getElementById("phoneNumber").value,
      city: document.getElementById("city").value,
      postalCode: document.getElementById("postalCode").value,
      address: document.getElementById("address").value
    }
    setDetails(data)
    // window.location = "summary"
  }

  

  return (
    <div id="checkout">

      <div className="checkout-progress">
        <div className="checkout-progress-point">
          <h1>Produkty</h1>
          <div className="checkout-progress-img">
            <img src="http://localhost:5000/images/misc/graycircle.png" style={{ width: "30px" }} />

          </div>
        </div>
        <div className="checkout-progress-point">
          <h1>Detaily</h1>
          <div className="checkout-progress-img">
            <img src="http://localhost:5000/images/misc/greencircle.png" />
          </div>
        </div>
        <div className="checkout-progress-point">
          <h1>Souhrn</h1>
          <div className="checkout-progress-img">
            <img src="http://localhost:5000/images/misc/graycircle.png" style={{ width: "30px" }} />
          </div>
        </div>
      </div>

      <div className="details">
        <div className="double">
          <div className="input">
            <label>Jméno:</label>
            <input type="text" id="firstName" placeholder="" required/>
          </div>
          <div className="input">
            <label>Příjmení:</label>
            <input type="text" id="lastName" placeholder="" required/>
          </div>
        </div>
        <div className="input">
          <label>Email:</label>
          <input type="text" id="email" placeholder="" required/>
        </div>
        <div className="double">
          <div className="input">
            <label>telefoní číslo:</label>
            <input type="text" id="phoneNumber" placeholder="" required/>
          </div>
          <div className="input">
            <label>Město:</label>
            <input type="text" id="city" placeholder="" required/>
          </div>
        </div>
        <div className="double">
          <div className="input">
            <label>PSČ:</label>
            <input type="text" id="postalCode" placeholder="" required/>
          </div>
          <div className="input">
            <label>Adresa:</label>
            <input type="text" id="address" placeholder="" required/>
          </div>
        </div>
      </div>
      <div className="checkout-buttons">
        <Link to={"/checkout/"}>Nazpátek</Link>
        <button onClick={saveDetails}>Pokračovat</button>
      </div>

    </div>
  )
}

export function CheckoutSummary({ details }) {
  return (
    <div id="checkout">
      <div className="checkout-progress">
        <div className="checkout-progress-point">
          <h1>Produkty</h1>
          <div className="checkout-progress-img">
            <img src="http://localhost:5000/images/misc/graycircle.png" style={{ width: "30px" }} />

          </div>
        </div>
        <div className="checkout-progress-point">
          <h1>Detaily</h1>
          <div className="checkout-progress-img">
            <img src="http://localhost:5000/images/misc/graycircle.png" style={{ width: "30px" }} />
          </div>
        </div>
        <div className="checkout-progress-point">
          <h1>Souhrn</h1>
          <div className="checkout-progress-img">
            <img src="http://localhost:5000/images/misc/greencircle.png" />
          </div>
        </div>
      </div>
      <div className="summary">
        <div className="summary-details">
          <h1>detials</h1>
          <h1>{details.firstName}</h1>
        </div>
        <div className="summary-products">
          <h1>products</h1>
        </div>
      </div>
      <div className="checkout-buttons">
        <Link to={"/checkout/details"}>Nazpátek</Link>
        <button>Odeslat</button>
      </div>
    </div>
  )
}
