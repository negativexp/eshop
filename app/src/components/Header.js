import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export function Header({cartPrice}) {

  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchQuery = () => {
    if (searchQuery) {
      navigate(`/products?search=${searchQuery}`);
    }
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <header>
      <div className="logo">
        <img src="http://localhost:5000/images/logo/logo.png"></img>
        <h1>nezuko</h1>
      </div>
      <div className="buttons">
        <div className="search">
          <input id="searchbar" type="text" onChange={handleInputChange} />
          <button id="searchbutton" onClick={handleSearchQuery}>
            Hledat
          </button>
        </div>
        <Link to="/checkout">Košík ({cartPrice} Kč)</Link>
      </div>
    </header>
  );
}
