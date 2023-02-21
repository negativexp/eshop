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

  function displayCategories() {
    console.log("hello")
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
          <a onClick={() => displayCategories()}>{item.category}</a>
        ))}
        </div>
        <div className="header-subCategories">
          <SubCategories values={APIcategories}/>
        </div>
      </header>
        <main>
          <section>
            <h1>produtky</h1>
            <div id="products-container">
                {APIprdocuts.map((product) => (
                  <Product img="swag.png">
                    <h1>{product.productTitle}</h1>
                    <p>{product.productShortDescription}</p>
                  </Product>
                ))}
            </div>
            <h1>kategorie</h1>
            {APIcategories.map((item) => (
              <>
                <h1>{item.category}</h1>
                {item.subCategories.map((item) => (
                  <p>{item}</p>
                ))}
              </>
            ))}
          </section>
          <section id="notebooks">
            <h1>Notebooky</h1>
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
    </div>
  );
}

export default App;
