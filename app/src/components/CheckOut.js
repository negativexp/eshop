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
              <button onClick={HandleGoBack}>Nazpátek</button>
              <Link to={"/checkout/details"}>Pokračovat</Link>
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
            <label for="name">Jméno:</label>
            <input type="text" placeholder="" />
          </div>
          <div className="input">
            <label for="name">Příjmení:</label>
            <input type="text" placeholder="" />
          </div>
        </div>
        <div className="input">
          <label for="name">Email:</label>
          <input type="text" placeholder="" />
        </div>
        <div className="double">
          <div className="input">
            <label for="name">telefoní číslo:</label>
            <input type="text" placeholder="" />
          </div>
          <div className="input">
            <label for="name">Město:</label>
            <input type="text" placeholder="" />
          </div>
        </div>
        <div className="double">
          <div className="input">
            <label for="name">PSČ:</label>
            <input type="text" placeholder="" />
          </div>
          <div className="input">
            <label for="name">Adresa:</label>
            <input type="text" placeholder="" />
          </div>
        </div>

      </div>
      <div className="checkout-buttons">
        <Link to={"/checkout/"}>Nazpátek</Link>
        <Link to={"/checkout/summary"}>Pokračovat</Link>
      </div>

    </div>
  )
}

export function CheckoutSummary() {
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
        <h1>summary</h1>
      </div>
      <div className="checkout-buttons">
        <Link to={"/checkout/details"}>Nazpátek</Link>
        <button>Odeslat</button>
      </div>
    </div>
  )
}
