import React, {useState, useEffect} from "react";
import "./App.css";
import {Product, SubCategories} from "./components.js"

function App() {

  const [APIprdocuts, setAPIprdocuts] = useState([])
  const [APIcategories, setAPIcategories] = useState([])
  const [visibleProducts, setVisibleProducts] = useState([])
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function fetchData() {
      //products
      setAPIprdocuts(await (await fetch("/api/products")).json())

      //catogeries
      setAPIcategories(await (await fetch("/api/categories")).json())
    }
    fetchData()
  }, [])

  function displayCategories(category) {
    document.getElementById("header-subCategories-empty").style.visibility = "visible"
    APIcategories.forEach((item) => {
      if(item.category == category) {
        document.getElementById(item.category).style.visibility = "visible"
      } else {
        document.getElementById(item.category).style.visibility = "collapse"
      }
    })
  }

  function hideSubCategories() {
    APIcategories.forEach((item) => {
      document.getElementById(item.category).style.visibility = "collapse"
    })
    document.getElementById("header-subCategories-empty").style.visibility = "collapse"
  }

  function search() {
    var searchValue = document.getElementById("searchbar").value
    searchValue = searchValue.toLowerCase()
    const matchingObjects = [];
    for (let i = 0; i < APIprdocuts.length; i++) {
      const obj = APIprdocuts[i];
      for (let prop in obj) {
        if (Array.isArray(obj[prop])) {
          if (obj[prop].toLowerCase().includes(searchValue)) {
            matchingObjects.push(obj);
            break;
          }
        } else {
          if (obj[prop].toLowerCase().includes(searchValue)) {
            matchingObjects.push(obj);
            break;
          }
        }
      }
    }
    const newArray = matchingObjects.map(item => Object.fromEntries(Object.entries(item)));
    // const newArray = [Object.fromEntries(Object.entries(APIprdocuts))];
    // console.log(newArray)
    setVisibleProducts(newArray)
  }

  function searchBySubCategory(item) {
    document.getElementById("searchbar").value = item
    document.getElementById("searchbutton").click()
  } 

  return (
    <div className="App">
      <header>
        <div className="header-top">
          <div className="logo-name">
            <h1>nezukoketamin</h1>
          </div>
          <div className="header-search">
            <input id="searchbar" type="text"/>
            <button id="searchbutton" onClick={() => search()}>search</button>
          </div>
        </div>
        <div className="header-categories">
        {APIcategories.map((item) => (
          <button onClick={() => displayCategories(item.category)}>{item.category.toString().charAt(0).toUpperCase() + item.category.slice(1)}</button>
        ))}
        </div>
          <div className="header-subCategories">
            {APIcategories.map((item) => (
             <div className="sub-category" id={item.category}>
                <button onClick={() => searchBySubCategory(item.category)}>Všechno</button>
                {item.subCategories.map((item) => (
                  <button onClick={() => searchBySubCategory(item)}>{item}</button>
                ))}
              </div>
           ))}
          <div id="header-subCategories-empty" onClick={() => hideSubCategories()}></div>
        </div>
      </header>
        <main>
        {visibleProducts.map(product => (
          <Product>
            <h1>{product.productTitle}</h1>
            <p>{product.productShortDescription}</p>
          </Product>
        ))}
        </main>
    </div>
  );
}

export default App;
