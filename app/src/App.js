import React, {useState, useEffect} from "react";
import "./App.css";
import {Product} from "./components.js"

function App() {

  const [APIprdocuts, setAPIprdocuts] = useState([])
  const [APIcategories, setAPIcategories] = useState([])

  useEffect(() => {
    async function fetchData() {
      //products
      setAPIprdocuts(await (await fetch("/api/products")).json())

      //catogeries
      setAPIcategories(await (await fetch("/api/categories")).json())
    }
    fetchData()
  }, [])

  // APIcategories.forEach((item) => {
  //   console.log(item)
  // })

  const menu = document.getElementById("dropdown-menu")
  function dropDownMenu(category) {
    if(category === "electronics") {
      document.getElementById("subElectronics").style.visibility = "visible"
      document.getElementById("subSport").style.visibility = "collapse"
      document.getElementById("subHouse").style.visibility = "collapse"
      document.getElementById("subGarden").style.visibility = "collapse"
    }
    if(category === "sport") {
      document.getElementById("subElectronics").style.visibility = "collapse"
      document.getElementById("subSport").style.visibility = "visible"
      document.getElementById("subHouse").style.visibility = "collapse"
      document.getElementById("subGarden").style.visibility = "collapse"
    }
    if(category === "house") {
      document.getElementById("subElectronics").style.visibility = "collapse"
      document.getElementById("subSport").style.visibility = "collapse"
      document.getElementById("subHouse").style.visibility = "visible"
      document.getElementById("subGarden").style.visibility = "collapse"
    }
    if(category === "garden") {
      document.getElementById("subElectronics").style.visibility = "collapse"
      document.getElementById("subSport").style.visibility = "collapse"
      document.getElementById("subHouse").style.visibility = "collapse"
      document.getElementById("subGarden").style.visibility = "visible"
    }
    showDropDownMenu()
  }
  function hideDropDownMenu() {
    menu.style.visibility = "collapse"
  }
  function showDropDownMenu() {
    menu.style.visibility = "visible"
  }

  return (
    <>
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
          <div id="subElectronics">
            <h1>electronis</h1>
          </div>
          <div id="subSport">
            <h1>sport</h1>
          </div>
          <div id="subHouse">
            <h1>house</h1>
          </div>
          <div id="subGarden">
            <h1>garden</h1>
          </div>
        </div>  
      </div>
    </header>
      <main>
        <section id="notebooks">
          <h1>Notebooky</h1>
          <div id="products-container">
              {APIprdocuts.map((product) => (
                <Product img="swag.png">
                  <h1>{product.productTitle}</h1>
                  <p>{product.productShortDescription}</p>
                </Product>
              ))}
          </div>
          <button>nacist vice</button>
        </section>
        <section id="gamingconsoles">
          <h1>herni konzole</h1>
        </section>
        <section id="monitors">
          <h1>monitory</h1>
        </section>
        <section id="gpus">
          <h1>graficke karty</h1>
        </section>
      </main>
    </>
  );
}

export default App;
