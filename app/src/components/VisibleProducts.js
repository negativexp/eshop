import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Product } from "./Product";
import { searchForItems } from "./searchForItems";

export function VisibleProducts({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const searchQuery = searchParams.get("search");
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(searchForItems(searchQuery, data))
      });
  }, [searchParams]);

  return (
    <div className="visible-products">
      {products.map((product) => (
        <Product key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
}
