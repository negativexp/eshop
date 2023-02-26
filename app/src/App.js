import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { VisibleProducts } from "./components/VisibleProducts";
import { Cart } from "./components/Cart";
import { Notification } from "./components/Notification";
import { Categories } from "./components/Categories";
import { SubCategories } from "./components/SubCategories";
import { CheckOut } from "./components/CheckOut";
import "./App.css";
import "./components/styles/header.css";

function App() {
  const [APIcategories, setAPIcategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartPrice, setCartPrice] = useState(0);

  useEffect(() => {
    async function fetchData() {
      //catogeries
      setAPIcategories(await (await fetch("/api/categories")).json());
    }
    fetchData();
  }, []);

  function addToCart(item) {
    if (!cart.includes(item)) {
      setCart([...cart, item]);
      setCartPrice(cartPrice + parseInt(item.price));
    }
  }

  function hideCheckOut() {
    document.getElementById("checkout").style.visibility = "collapse";
  }

  return (
    <BrowserRouter>
      <Header cartPrice={cartPrice} />
      <Categories categories={APIcategories} />
      <SubCategories categories={APIcategories} />
      <Routes>
        <Route
          path="/products"
          element={
            <main>
              <VisibleProducts addToCart={addToCart} />
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
