import React from "react"

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

const subCatogeries = {
  elecontrins: ["CPU", "GPU", "Herní konzole"],
  sport: ["Zimní", "Fitness", "Výživa"],
  house: ["Mopy", "Pánve", "Prášky na praní"],
  garden: ["Sekačky", "Skleníky", "Brusky"]
}
var selection = 0

export function Header() {
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
      selection = 0
    }
    if(category === "sport") {
      console.log("sport")
      selection = 1
    }
    if(category === "house") {
      console.log("house")
      selection = 2
    }
    if(category === "garden") {
      console.log("garden")
      selection = 3
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
          {selection == 1 ? <p>bruh</p> : <p>nebruh</p> 
          }
        </div>  
      </div>
    </header>
  );
}