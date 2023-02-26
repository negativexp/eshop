import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Header({ cartPrice }) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchQuery = () => {
    if (searchQuery) {
      navigate(`/products?search=${searchQuery}`);
    } else {
      navigate("/products");
    }
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <header>
      <div className="logo">
        <h1>nezuko shop</h1>
        <div className="search">
          <input id="searchbar" type="text" onChange={handleInputChange} />
          <button id="searchbutton" onClick={handleSearchQuery}>
            search
          </button>
        </div>
      </div>
      <div className="cartprice">
        <Link to="/checkout">{cartPrice} Kč</Link>
      </div>
    </header>
    // <header>
    //   <div className="header-top">
    //     <div className="header-left">
    //       <h1>nezukoketamin</h1>
    //       <div className="header-search">
    //         <input id="searchbar" type="text" onChange={handleInputChange}/>
    //         <button id="searchbutton" onClick={handleSearchQuery}> search </button>
    //       </div>
    //     </div>
    //     <div className="header-right">
    //       <Link to="/checkout">{cartPrice} Kč</Link>
    //     </div>
    //   </div>
    // </header>
  );
}
