import React, { useEffect, useState } from "react";
import { Product } from "./Product";

export function VisibleProducts({ addToCart, searchKeyword }) {
    const [products, setProducts] = useState([])

    useEffect(() => {
      async function fetchData() {
        //products
        const filter = (await (await fetch("/api/products")).json()).filter((product) => product.title.toLowerCase().includes(searchKeyword.toLowerCase()))
        setProducts(filter)
      }
      fetchData();
    }, [searchKeyword])

    return (
        <div className="visible-products">
        {products.map((product) => (
          <Product key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    )
}