import React from "react";

export function Header({ categories, cartPrice, search, showCheckOut, displayCategories, searchBySubCategory, hideSubCategories, FirstCapitalLetter }) {
  return (
    <header>
      <div className="header-top">
        <div className="header-left">
          <h1>nezukoketamin</h1>
          <div className="header-search">
            <input id="searchbar" type="text" />
            <button id="searchbutton" onClick={() => search()}>
              search
            </button>
          </div>
        </div>
        <div className="header-right">
          <button onClick={() => showCheckOut()}>{cartPrice} Kč</button>
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
                <button onClick={() => searchBySubCategory(item)}>
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
