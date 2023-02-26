import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { VisibleProducts } from "./components/VisibleProducts";
import { Cart } from "./components/Cart";
import { Notification } from "./components/Notification";
import { CheckOut } from "./components/CheckOut";
import "./App.css";
import "./header.css";

function App() {
  const [APIprdocuts, setAPIprdocuts] = useState([]);
  const [APIcategories, setAPIcategories] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartPrice, setCartPrice] = useState(0);
  const [lastAddedItem, setLastAddedItem] = useState();

  useEffect(() => {
    async function fetchData() {
      //products
      setAPIprdocuts(await (await fetch("/api/products")).json());

      //catogeries
      setAPIcategories(await (await fetch("/api/categories")).json());
    }
    fetchData();
  }, []);

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

  function searchBySubCategory(item) {
    document.getElementById("searchbar").value = item;
    document.getElementById("searchbutton").click();
  }

  function FirstCapitalLetter(item) {
    return item.toString().charAt(0).toUpperCase() + item.slice(1);
  }

  function addToCart(item) {
    if (!cart.includes(item)) {
      setCart([...cart, item]);
      setCartPrice(cartPrice + parseInt(item.price));
      setLastAddedItem(item.title);
    }
  }

  function hideCheckOut() {
    document.getElementById("checkout").style.visibility = "collapse";
  }

  return (
    // <div className="App">
    //   <Header
    //     categories={APIcategories}
    //     cartPrice={cartPrice}
    //     search={search}
    //     showCheckOut={showCheckOut}
    //     displayCategories={displayCategories}
    //     searchBySubCategory={searchBySubCategory}
    //     hideSubCategories={hideSubCategories}
    //     FirstCapitalLetter={FirstCapitalLetter}
    //   />
    //   <main>
    //     <VisibleProducts
    //       visibleProducts={visibleProducts}
    //       addToCart={addToCart}
    //     />
    //   </main>
    //   <Cart cart={cart} />
    //   <Notification lastAddedItem={lastAddedItem}/>
    //   <CheckOut cart={cart} hideCheckOut={hideCheckOut}/>
    // </div>

    <BrowserRouter>
      <Header
        categories={APIcategories}
        cartPrice={cartPrice}
        displayCategories={displayCategories}
        searchBySubCategory={searchBySubCategory}
        hideSubCategories={hideSubCategories}
        FirstCapitalLetter={FirstCapitalLetter}
      />
      <Routes>
        <Route path="/products"
          element={
            <main>
              <VisibleProducts
                addToCart={addToCart}
              />
            </main>
          }
        />
        <Route
          path="/checkout"
          element={<CheckOut cart={cart} hideCheckOut={hideCheckOut} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
