import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { searchForItems } from "./searchForItems";

export function Header({ cartPrice, products, categories }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHelper, setSearchHelper] = useState([]);
  const navigate = useNavigate();

  const handleSearchQuery = () => {
    if (searchQuery) {
      navigate(`/products?search=${searchQuery}`);
    }
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
    if (event.target.value !== "") {
      const foundProducts = searchForItems(event.target.value, products);
      setSearchHelper(foundProducts);
    } else {
      setSearchHelper([]);
    }
  };

  const showSearchHelper = () => {
    const helper = document.getElementById("searchHelper");
    helper.style.visibility = "visible";
  };
  const hideSearchHelper = () => {
    const helper = document.getElementById("searchHelper");
    helper.style.visibility = "hidden";
  };

  return (
    <header>
      <div className="logo">
        <img src="http://localhost:5000/images/logo/logo.png"></img>
        <Link to={"/"}>Nezuko</Link>
      </div>
      <div className="buttons">
        <div className="search">
          <input
            id="searchbar"
            type="text"
            autoComplete="off"
            onChange={handleInputChange}
          />
          {searchHelper.length == 0 ? (
            <div id="searchHelper"></div>
          ) : (
            <div
              id="searchHelper"
            >
              {searchHelper.map((item) => (
                //note: when clicked it does not show the product
                <div className="item">
                  <img
                    src={
                      "http://localhost:5000/images/products/" +
                      item.productID +
                      ".jpg"
                    }
                  />
                  <Link key={item._id} to={"products/" + item._id}>
                    {item.title}
                  </Link>
                </div>
              ))}
            </div>
          )}

          {/* <div id="searchHelper">
            {searchHelper.map((item) => (
              //note: when clicked it does not show the product
              <Link key={item._id} to={"products/"+item._id}>{item.title}</Link>
            ))}
          </div> */}
          <button id="searchbutton" onClick={handleSearchQuery}>
            Hledat
          </button>
        </div>
        <Link to="/checkout" id="cart">Košík ({cartPrice} Kč)</Link>
      </div>
    </header>
  );
}
