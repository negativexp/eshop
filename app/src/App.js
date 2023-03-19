import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useFetcher, json, UNSAFE_DataRouterStateContext } from "react-router-dom";
import { Header } from "./components/Header";
import { VisibleProducts } from "./components/VisibleProducts";
import { Cart } from "./components/Cart";
import { Notification } from "./components/Notification";
import { Categories } from "./components/Categories";
import { SubCategories } from "./components/SubCategories";
import { CheckOut, CheckoutDetails, CheckoutSummary } from "./components/CheckOut.js";
import { SingleProduct } from "./components/SingleProduct.js";
import { DeafultPage } from "./components/DeafultPage";
import "./App.css";
import "./components/styles/header.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [APIcategories, setAPIcategories] = useState([]);
  const [APIproducts, setAPIproducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartPrice, setCartPrice] = useState(0);

  const [details, setDetails] = useState({});

  useEffect(() => {
    async function fetchData() {
      //catogeries
      setAPIcategories(await (await fetch("/api/categories")).json());
      setAPIproducts(await (await fetch("/api/products")).json())
    }
    fetchData();

    if (localStorage.getItem('cart')) {
      const tempcart = JSON.parse(localStorage.getItem('cart'))
      setCart(tempcart)
    }
  }, []);

  function addToCart(item) {
    const storedItems = JSON.parse(localStorage.getItem('cart')) || [];
    if (!storedItems.find((storedItem) => storedItem._id === item._id)) {
      storedItems.push(item);
      localStorage.setItem('cart', JSON.stringify(storedItems));

      toast(item.title + " byl přidán do košíku", {
        position: "bottom-right",
        autoClose:  1800,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "dark",
        });
    } else {

      if(storedItems[storedItems.length - 1].quantity == undefined) {
        storedItems[storedItems.length - 1].quantity = 2
      } else storedItems[storedItems.length - 1].quantity = storedItems[storedItems.length - 1].quantity + 1

      localStorage.setItem('cart', JSON.stringify(storedItems));
      console.log(storedItems[storedItems.length - 1])

      toast(item.title + " byl přidán do košíku (x" + storedItems[storedItems.length - 1].quantity+")", {
        position: "bottom-right",
        autoClose:  1800,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "dark",
        });
    }
    setCart(JSON.parse(localStorage.getItem('cart')) || [])
  }

  useEffect(() => {
    var final = 0
    cart.forEach(el => {
      if(el.quantity > 1) {
        final += parseInt(el.quantity) * parseInt(el.price)
      } else final += parseInt(el.price)
    })
    setCartPrice(final)
  }, [cart])

  return (
    <BrowserRouter>
      <Header cartPrice={cartPrice} categories={APIcategories} products={APIproducts} />
      <Categories categories={APIcategories} />
      <SubCategories categories={APIcategories} />
      <ToastContainer />
      {/* <Notification lastAddedItem={lastAddedItem}/> */}
      <Routes>
        <Route path="/" element={<DeafultPage/>} />
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
        <Route path="checkout/details" element={<CheckoutDetails setDetails={setDetails}/>}/>
        <Route path="checkout/summary" element={<CheckoutSummary details={details}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
