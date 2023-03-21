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
            <img
              src="http://localhost:5000/images/misc/graycircle.png"
              style={{ width: "30px" }}
            />
          </div>
        </div>
        <div className="checkout-progress-point">
          <h1>Souhrn</h1>
          <div className="checkout-progress-img">
            <img
              src="http://localhost:5000/images/misc/graycircle.png"
              style={{ width: "30px" }}
            />
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
                <div className="cart-item-image">
                  <img src={"http://localhost:5000/images/products/"+item.productID +".jpg"}/>
                </div>
                <div className="cart-item-info">
                  <div></div>
                  <h1>{item.title}</h1>
                  <h2>#{item.productID}</h2>
                  <h3>{item.price * item.cartQuantity} Kč ({item.price} Kč)</h3>
                  <h4>Množství: {item.cartQuantity}</h4>
                  <button onClick={() => handleRemoveItem(item._id)}>
                    Odstranit
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

export function CheckoutDetails({ cart }) {

  const saveDetails = () => {
    const data = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      email: document.getElementById("email").value,
      phoneNumber: document.getElementById("phoneNumber").value,
      city: document.getElementById("city").value,
      postalCode: document.getElementById("postalCode").value,
      address: document.getElementById("address").value,
      cart: cart
    };
    localStorage.setItem("order", JSON.stringify(data))
    window.location = "summary";
  };

  if (cart.length < 1) {
    window.location = "/checkout";
  }

  const onload = () => {
    const details = JSON.parse(localStorage.getItem("order"))
    if(details !== null) {
      document.getElementById("firstName").value = details.firstName
      document.getElementById("lastName").value = details.lastName
      document.getElementById("email").value = details.email
      document.getElementById("phoneNumber").value = details.phoneNumber
      document.getElementById("city").value = details.city
      document.getElementById("postalCode").value = details.postalCode
      document.getElementById("address").value = details.address
    }
  }

  return (
    //note: its retarted but it works
    <div id="checkout" onLoad={onload}>
      <div className="checkout-progress">
        <div className="checkout-progress-point">
          <h1>Produkty</h1>
          <div className="checkout-progress-img">
            <img
              src="http://localhost:5000/images/misc/graycircle.png"
              style={{ width: "30px" }}
            />
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
            <img
              src="http://localhost:5000/images/misc/graycircle.png"
              style={{ width: "30px" }}
            />
          </div>
        </div>
      </div>

      <div className="details">
        <div className="double">
          <div className="input">
            <label>Jméno:</label>
            <input type="text" id="firstName" placeholder="" required />
          </div>
          <div className="input">
            <label>Příjmení:</label>
            <input type="text" id="lastName" placeholder="" required />
          </div>
        </div>
        <div className="input">
          <label>Email:</label>
          <input type="text" id="email" placeholder="" required />
        </div>
        <div className="double">
          <div className="input">
            <label>telefoní číslo:</label>
            <input type="text" id="phoneNumber" placeholder="" required />
          </div>
          <div className="input">
            <label>Město:</label>
            <input type="text" id="city" placeholder="" required />
          </div>
        </div>
        <div className="double">
          <div className="input">
            <label>PSČ:</label>
            <input type="text" id="postalCode" placeholder="" required />
          </div>
          <div className="input">
            <label>Adresa:</label>
            <input type="text" id="address" placeholder="" required />
          </div>
        </div>
      </div>
      <div className="checkout-buttons">
        <Link to={"/checkout/"}>Nazpátek</Link>
        <button onClick={saveDetails}>Pokračovat</button>
      </div>
    </div>
  );
}

export function CheckoutSummary({ cartPrice }) {
  const details = JSON.parse(localStorage.getItem("order"))

  if (details == null) {
    window.location = "/checkout";
  }

  async function sendOrder() {
    const apiUrl = new URL("http://localhost:5000/api/addorder/")
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderdata: details }),
    });
    if(response.status === 200) {
      window.alert("Order has been placed!")
      //reset cart and order data
      localStorage.removeItem("order")
      localStorage.removeItem("cart")
      window.location.reload()
    }
  }

  return (
    <div id="checkout">
      <div className="checkout-progress">
        <div className="checkout-progress-point">
          <h1>Produkty</h1>
          <div className="checkout-progress-img">
            <img
              src="http://localhost:5000/images/misc/graycircle.png"
              style={{ width: "30px" }}
            />
          </div>
        </div>
        <div className="checkout-progress-point">
          <h1>Detaily</h1>
          <div className="checkout-progress-img">
            <img
              src="http://localhost:5000/images/misc/graycircle.png"
              style={{ width: "30px" }}
            />
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
          <h1>Detaily</h1>

          <div className="details">
            <div className="double">
              <div className="input">
                <label>Jméno:</label>
                <input type="text" value={details.firstName} id="firstName" placeholder="" disabled />
              </div>
              <div className="input">
                <label>Příjmení:</label>
                <input type="text" value={details.lastName} id="lastName" placeholder="" disabled />
              </div>
            </div>
            <div className="input">
              <label>Email:</label>
              <input type="text" id="email" value={details.email} placeholder="" disabled />
            </div>
            <div className="double">
              <div className="input">
                <label>telefoní číslo:</label>
                <input type="text" id="phoneNumber" value={details.phoneNumber} placeholder="" disabled />
              </div>
              <div className="input">
                <label>Město:</label>
                <input type="text" id="city" value={details.city} placeholder="" disabled />
              </div>
            </div>
            <div className="double">
              <div className="input">
                <label>PSČ:</label>
                <input type="text" id="postalCode" value={details.postalCode} placeholder="" disabled />
              </div>
              <div className="input">
                <label>Adresa:</label>
                <input type="text" id="address" value={details.address} placeholder="" disabled />
              </div>
            </div>
          </div>

          <h1>Produkty</h1>
          <ul>
            {details.cart.map((item) => (
              <>
                {item.cartQuantity > 1 ? <li>{item.title} (x{item.cartQuantity})</li> : <li>{item.title}</li>}
              </>
            ))}
          </ul>

          <h1>Celková cena</h1>
          <h2>{cartPrice} Kč</h2>
        </div>
      </div>
      <div className="checkout-buttons">
        <Link to={"/checkout/details"}>Nazpátek</Link>
        <button onClick={sendOrder}>Odeslat</button>
      </div>
    </div>
  );
}
