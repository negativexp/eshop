import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useFetcher, json, UNSAFE_DataRouterStateContext } from "react-router-dom";
import { Header } from "./components/Header";
import { VisibleProducts } from "./components/VisibleProducts";
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

  //we fetch data from our server
  //NOTE: we can ask server for the data we need so we don't need to fetch everything
  //NOTE: I'm gonna do it like that so we don't need to fetch more information we don't need
  useEffect(() => {
    async function fetchData() {
      setAPIcategories(await (await fetch("/api/categories")).json());
      setAPIproducts(await (await fetch("/api/products")).json())
    }
    fetchData();

    if (localStorage.getItem('cart')) {
      setCart(JSON.parse(localStorage.getItem('cart')))
    }
  }, []);

  function addToCart(item) {
    const storedItems = JSON.parse(localStorage.getItem('cart')) || [];
    if(item.quantity != 0) {
      if (!storedItems.find((storedItem) => storedItem._id === item._id)) {
        storedItems.push({_id: item._id, productID: item.productID, price: item.price, cartQuantity: 1, quantity: item.quantity, title: item.title});
        localStorage.setItem('cart', JSON.stringify(storedItems));
  
        toast.info(item.title + " byl přidán do košíku", {
        position: "bottom-right",
        autoClose:  1800,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "dark",
        });
      } else {
        if(storedItems.find((storedItem) => storedItem._id === item._id).quantity > storedItems.find((storedItem) => storedItem._id === item._id).cartQuantity) {
          storedItems.find((storedItem) => storedItem._id === item._id).cartQuantity++
          localStorage.setItem('cart', JSON.stringify(storedItems));
          toast.info(item.title + " byl přidán do košíku (x" + storedItems.find((storedItem) => storedItem._id === item._id).cartQuantity + ")", {
          position: "bottom-right",
          autoClose:  1800,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
          });
        } else {
          toast.warn("U produktu " + item.title + " jste překročil limit!", {
          position: "bottom-right",
          autoClose:  1800,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
          });
        }
      }
    } else {
      toast.error("Produktu " + item.title + " je vyprodanej!", {
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

  //when cart changes we update the price of our cart
  useEffect(() => {
    var final = 0
    cart.forEach(el => {
      if(el.cartQuantity > 1) {
        final += parseInt(el.cartQuantity) * parseInt(el.price)
      } else final += parseInt(el.price)
    })
    setCartPrice(final)
  }, [cart])

  return (
    <BrowserRouter>
      <Header cartPrice={cartPrice} categories={APIcategories} products={APIproducts} />
      <Categories categories={APIcategories} />
      <SubCategories categories={APIcategories} />
      <ToastContainer/>
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
          element={<SingleProduct addToCart={addToCart} products={APIproducts}/>}
        />
        <Route path="checkout/details" element={<CheckoutDetails cart={cart}/>}/>
        <Route path="checkout/summary" element={<CheckoutSummary cartPrice={cartPrice}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
