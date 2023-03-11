import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { searchForItems } from "./searchForItems";

export function Header({ cartPrice, products, categories }) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchQuery = () => {
    if (searchQuery) {
      navigate(`/products?search=${searchQuery}`);
    }
  };

  const [searchHelper, setSearchHelper] = useState([]);
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
    if (event.target.value != "") {
      const productsFilter = searchForItems(event.target.value, products);
      const categoriesFilter = categories.filter((item) => {
        return (
          item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.subCategories.some((sub) =>
            sub.toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
      });
      setSearchHelper([productsFilter, categoriesFilter]);
    } else {
      setSearchHelper([]);
    }
  };

  return (
    <header>
      <div className="logo">
        <img src="http://localhost:5000/images/logo/logo.png"></img>
        <h1>Nezuko</h1>
      </div>
      <div className="buttons">
        <div className="search">
          <div>
            <input id="searchbar" type="text" onChange={handleInputChange} />
            {searchHelper.length === 0 ? (
              <div className="searchHelper"></div>
            ) : (
              <div className="searchHelper">
                {searchHelper[0].map((item) => (
                  <p>{item.title}</p>
                ))}
                {searchHelper[1].map((item) => (
                  <p>{item.category}</p>
                ))}
              </div>
            )}
          </div>
          <button id="searchbutton" onClick={handleSearchQuery}>
            Hledat
          </button>
        </div>
        <Link to="/checkout">Košík ({cartPrice} Kč)</Link>
      </div>
    </header>
  );
}
