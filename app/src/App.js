import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useFetcher, json } from "react-router-dom";
import { Header } from "./components/Header";
import { VisibleProducts } from "./components/VisibleProducts";
import { Cart } from "./components/Cart";
import { Notification } from "./components/Notification";
import { Categories } from "./components/Categories";
import { SubCategories } from "./components/SubCategories";
import { CheckOut } from "./components/CheckOut";
import { SearchAndCart } from "./components/SearchAndCart";
import { SingleProduct } from "./components/SingleProduct";
import "./App.css";
import "./components/styles/header.css";

function App() {
  const [APIcategories, setAPIcategories] = useState([]);
  const [APIproducts, setAPIproducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartPrice, setCartPrice] = useState(0);

  useEffect(() => {
    async function fetchData() {
      //catogeries
      setAPIcategories(await (await fetch("/api/categories")).json());
      setAPIproducts(await (await fetch("/api/products")).json())
    }
    fetchData();

    if(localStorage.getItem('cart')) {
      const tempcart = JSON.parse(localStorage.getItem('cart'))
      setCart(tempcart)
    }
  }, []);

  function addToCart(item) {
    const storedItems = JSON.parse(localStorage.getItem('cart')) || [];
    if (!storedItems.find((storedItem) => storedItem._id === item._id)) {
      storedItems.push(item);
      localStorage.setItem('cart', JSON.stringify(storedItems));
    }
    setCart(JSON.parse(localStorage.getItem('cart')) || [])
  }

  useEffect(() => {
    var final = 0
    cart.forEach(el => {
      final += parseInt(el.price)
    })
    setCartPrice(final)
  }, [cart])

  return (
    <BrowserRouter>
      <Header cartPrice={cartPrice} categories={APIcategories} products={APIproducts} />
      <Categories categories={APIcategories} />
      <SubCategories categories={APIcategories} />
      <Routes>
        <Route
          path="products"
          element={<VisibleProducts addToCart={addToCart} />}
        />
        <Route
          path="checkout"
          element={<CheckOut cart={cart} setCart={setCart} />}
        />
        <Route
          path="products/:productID"
          element={<SingleProduct addToCart={addToCart} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
