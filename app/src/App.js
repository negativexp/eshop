import React, {useState, useEffect} from "react";
import "./App.css";
import {Header, Product} from "./components.js"

function App() {

  const [backendData, setBackendData] = useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/products")
      const data = await response.json()
      setBackendData(data)
    }
    fetchData()
  }, [])


  return (
    <>
      <Header/>
      <main>
        <section id="notebooks">
          <h1>Notebooky</h1>
          <div id="products-container">
              {backendData.map((product) => (
                <Product img="swag.png">
                  <h1>{product.productTitle}</h1>
                  <p>{product.productShortDescription}</p>
                </Product>
              ))}
          </div>
          <button>nacist vice</button>
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
    </>
  );
}

export default App;
