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
    if(event.target.value != "") {
      const foundProducts = searchForItems(event.target.value, products)
      const foundCategories = categories.filter(item => {
        // Check if the category or any of the subcategories include the search query
        return item.category.toLowerCase().includes(searchQuery.toLowerCase()) || 
          item.subCategories.some(sub => sub.toLowerCase().includes(searchQuery.toLowerCase()));
      });
      setSearchHelper(foundProducts)
    } else {
      setSearchHelper([])
    }
  };

  const showSearchHelper = () => {
    const helper = document.getElementById("searchHelper")
    helper.style.visibility = "visible"
  }

  return (
    <header>
      <div className="logo">
        <img src="http://localhost:5000/images/logo/logo.png"></img>
        <h1>Nezuko</h1>
      </div>
      <div className="buttons">
        <div className="search">
          <input
            id="searchbar"
            type="text"
            autocomplete="off"
            onChange={handleInputChange}
            onClick={showSearchHelper}
          />
          {searchHelper.length == 0 ? <></> :           <div id="searchHelper">
            {searchHelper.map((item) => (
              //note: when clicked it does not show the product
              <Link key={item._id} to={"products/"+item._id}>{item.title}</Link>
            ))}
          </div>}

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
        <Link to="/checkout">Košík ({cartPrice} Kč)</Link>
      </div>
    </header>
  );
}
