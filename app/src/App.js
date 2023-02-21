import React, {useState, useEffect} from "react";
import "./App.css";
import {Product, SubCategories} from "./components.js"

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

  var lastOpenedCategories

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

  return (
    <div className="App">
      <header>
        <div className="logo-name">
          <h1>logo</h1>
          <h1>name</h1>
        </div>
        <div className="header-categories">
        {APIcategories.map((item) => (
          <button onClick={() => displayCategories(item.category)}>{item.category}</button>
        ))}
        </div>
        <div className="header-subCategories">
          <SubCategories values={APIcategories}/>
          <div id="header-subCategories-empty" onClick={() => hideSubCategories()}></div>
        </div>
      </header>
        <main>
        </main>
    </div>
  );
}

export default App;
