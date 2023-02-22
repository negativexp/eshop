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

    //everything has to be lowercase to check if the search value matches
    //the value we are trying to look for

    //iritate through every object in apiproducts
    for (let i = 0; i < APIprdocuts.length; i++) {
      //get object
      const obj = APIprdocuts[i];
      for (let prop in obj) {
        //chceck if field is an array in object
        if (Array.isArray(obj[prop])) {
          //check if it includes the value
          if (obj[prop].toLowerCase().includes(searchValue)) {
            //if so, push the object into matching objects
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
    setVisibleProducts(matchingObjects)
  }

  function searchBySubCategory(item) {
    document.getElementById("searchbar").value = item
    document.getElementById("searchbutton").click()
  } 

  function FirstCapitalLetter(item) {
    return item.toString().charAt(0).toUpperCase() + item.slice(1)
  }

  return (
    <div className="App">
      <header>
        <div className="header-top">
          <div className="logo-name">
            <p>obratek</p>
            <h1>nezukoketamin</h1>
          </div>
          <div className="header-search">
            <input id="searchbar" type="text"/>
            <button id="searchbutton" onClick={() => search()}>search</button>
          </div>
        </div>
        <div className="header-categories">
        {APIcategories.map((item) => (
          <button onClick={() => displayCategories(item.category)}>{FirstCapitalLetter(item.category)}</button>
        ))}
        </div>
          <div className="header-subCategories">
            {APIcategories.map((item) => (
             <div className="sub-category" id={item.category}>
                {/* <button onClick={() => searchBySubCategory(FirstCapitalLetter(item.category))}>Všechno</button> */}
                {item.subCategories.map((item) => (
                  <div className="each-subCategory">
                    <button onClick={() => searchBySubCategory(item)}>{item}</button>
                  </div>
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
