import React, {useState, useEffect} from "react";

export function Product(props) {
  return(
    <div className="product">
      <div className="product-img">
        <img src={props.img}/>
      </div>
      <div className="product-title">
        {props.children}
      </div>
      <div className="product-button">
        <button>Add to cart</button>
      </div>
    </div>
  )
}

export function SubCategories(props) {
  return(
    <>
      {props.values.map((item) => (
        <div className="sub-category" id={item.category}>
          {item.subCategories.map((item) => (
            <p>{item}</p>
          ))}
        </div>
      ))}
    </>

  )
}


export function Header(props) {
  const menu = document.getElementById("dropdown-menu")
  function hideDropDownMenu() {
    menu.style.visibility = "collapse"
  }
  function showDropDownMenu() {
    menu.style.visibility = "visible"
  }
  function dropDownMenu(category) {
    if(category === "electronics") {
      console.log("electronics")
    }
    if(category === "sport") {
      console.log("sport")
    }
    if(category === "house") {
      console.log("house")
    }
    if(category === "garden") {
      console.log("garden")
    }
    showDropDownMenu()
  }
  return (
    <header>
      <div className="logo-name">
        <h1>logo</h1>
        <h1>name</h1>
      </div>
      <div className="categories">
        <ul>
          <li>
            <a onClick={() => dropDownMenu("electronics")}>Elektronika</a>
          </li>
          <li>
            <a onClick={() => dropDownMenu("sport")}>Sport</a>
          </li>
          <li>
            <a onClick={() => dropDownMenu("house")}>Dům</a>
          </li>
          <li>
            <a onClick={() => dropDownMenu("garden")}>Zahrada</a>
          </li>
        </ul>
      </div>
      <div id="dropdown-menu">
        <div className="dropdown-menu-background" onClick={() => hideDropDownMenu()}></div>
        <div className="dropdown-menu-active">
          <h1>testing element</h1>
          {props.children}
        </div>  
      </div>
    </header>
  );
}
