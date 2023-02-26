import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Header({ categories, cartPrice, displayCategories, searchBySubCategory, hideSubCategories, FirstCapitalLetter }) {

  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchQuery = () => {
    if (searchQuery) {
      navigate(`/products?search=${searchQuery}`);
    } else {
      navigate('/products');
    }
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubCategorySearch = (category) => {
    document.getElementById("searchbar").value = category
    navigate(`/products?search=${category}`);
  }

  return (
    <header>
      <div className="header-top">
        <div className="header-left">
          <h1>nezukoketamin</h1>
          <div className="header-search">
            <input id="searchbar" type="text" onChange={handleInputChange}/>
            <button id="searchbutton" onClick={handleSearchQuery}> search </button>
          </div>  
        </div>
        <div className="header-right">
          <Link to="/checkout">{cartPrice} Kč</Link>
        </div>
      </div>
      <div className="header-categories">
        {categories.map((item) => (
          <button onClick={() => displayCategories(item.category)}>
            {FirstCapitalLetter(item.category)}
          </button>
        ))}
      </div>
      <div className="header-subCategories">
        {categories.map((item) => (
          <div className="sub-category" id={item.category}>
            {item.subCategories.map((item) => (
              <div className="each-subCategory">
                <button onClick={() => handleSubCategorySearch(item)}>
                  {item}
                </button>
              </div>
            ))}
          </div>
        ))}
        <div
          id="header-subCategories-empty"
          onClick={() => hideSubCategories()}
        ></div>
      </div>
    </header>
  );
}
