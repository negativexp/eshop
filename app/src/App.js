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

  var activeCategories = []

  const menu = document.getElementById("dropdown-menu")
  function dropDownMenu(category) {
    if(category === "electronics") {
      console.log("electronics")
      activeCategories = APIcategories[0].subCategories
      console.log(activeCategories)
    }
    if(category === "sport") {
      console.log("sport")
      activeCategories = APIcategories[1].subCategories
      console.log(activeCategories)
    }
    if(category === "house") {
      console.log("house")
      activeCategories = APIcategories[2].subCategories
      console.log(activeCategories)
    }
    if(category === "garden") {
      console.log("garden")
      activeCategories = APIcategories[3].subCategories
      console.log(activeCategories)
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
          <h1>testing element</h1>
          {activeCategories.map((item) => (
                        <p>{item._id}</p>
          ))}
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
