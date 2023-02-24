import React, { useState, useEffect } from "react";
import "./App.css";
import "./header.css";
import { Product, SubCategories } from "./components.js";

function App() {
  const [APIprdocuts, setAPIprdocuts] = useState([])
  const [APIcategories, setAPIcategories] = useState([])
  const [visibleProducts, setVisibleProducts] = useState([])
  const [cart, setCart] = useState([])
  const [cartPrice, setCartPrice] = useState(0)
  const [lastAddedItem, setLastAddedItem] = useState()

  useEffect(() => {
    async function fetchData() {
      //products
      setAPIprdocuts(await (await fetch("/api/products")).json());

      //catogeries
      setAPIcategories(await (await fetch("/api/categories")).json());
    }
    fetchData();
  }, [])

  function displayCategories(category) {
    document.getElementById("header-subCategories-empty").style.visibility =
      "visible";
    APIcategories.forEach((item) => {
      if (item.category == category) {
        document.getElementById(item.category).style.visibility = "visible";
      } else {
        document.getElementById(item.category).style.visibility = "collapse";
      }
    });
  }

  function hideSubCategories() {
    APIcategories.forEach((item) => {
      document.getElementById(item.category).style.visibility = "collapse";
    });
    document.getElementById("header-subCategories-empty").style.visibility =
      "collapse";
  }

  function search() {
    var searchValue = document.getElementById("searchbar").value;
    searchValue = searchValue.toLowerCase();
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
    setVisibleProducts(matchingObjects);
  }

  function searchBySubCategory(item) {
    document.getElementById("searchbar").value = item;
    document.getElementById("searchbutton").click();
  }

  function FirstCapitalLetter(item) {
    return item.toString().charAt(0).toUpperCase() + item.slice(1);
  }

  function addToCart(item) {
    if(!cart.includes(item)) {
      setCart([...cart, item])
      setCartPrice(cartPrice + parseInt(item.price))
      setLastAddedItem(item.title)
    }
  }

  function hideCheckOut() {
    document.getElementById("checkout").style.visibility = "collapse"
  }
  function showCheckOut() {
    document.getElementById("checkout").style.visibility = "visible"
  }

  return (
    <div className="App">
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
          {APIcategories.map((item) => (
            <button onClick={() => displayCategories(item.category)}>
              {FirstCapitalLetter(item.category)}
            </button>
          ))}
        </div>
        <div className="header-subCategories">
          {APIcategories.map((item) => (
            <div className="sub-category" id={item.category}>
              {/* <button onClick={() => searchBySubCategory(FirstCapitalLetter(item.category))}>Všechno</button> */}
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
      <main>
        {visibleProducts.map((product) => (
          <div className="product">
            <div className="product-img">
              <img/>
            </div>
            <div className="product-title">
              <h1>{product.title}</h1>
            </div>
            <div className="product-shortdescription">
              <p>{product.shortDescription}</p>
            </div>
            <div className="product-button">
              <button onClick={() => addToCart(product)}>Add to cart</button>
            </div>
          </div>
        ))}
      </main>
      <div className="cart">
        {cart.map((item) => (
          <p>item</p>
        ))}
      </div>
      <div className="notification">
        <p>Item {lastAddedItem} has been added.</p>
      </div>
      <div id="checkout">
        <h1>items</h1>
         <div id="checkout-exit" onClick={() => hideCheckOut()}>x</div>
        <div className="cart-items">
          {cart.map((item => (
            <div className="cart-item">
              {item.price}
            </div>
          )))}
        </div>
      </div>
    </div>
  );
}

export default App;
