import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Product } from "./Product";

export function VisibleProducts({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const searchQuery = searchParams.get("search");
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        const matchingObjects = [];
        //everything has to be lowercase to check if the search value matches
        //the value we are trying to look for
        //iritate through every object in apiproducts
        for (let i = 0; i < data.length; i++) {
          //get object
          const obj = data[i];
          for (let prop in obj) {
            //chceck if field is an array in object
            if (Array.isArray(obj[prop])) {
              //check if it includes the value
              if (obj[prop].toLowerCase().includes(searchQuery.toLowerCase())) {
                //if so, push the object into matching objects
                matchingObjects.push(obj);
                break;
              }
            } else {
              if (obj[prop].toLowerCase().includes(searchQuery.toLowerCase())) {
                matchingObjects.push(obj);
                break;
              }
            }
          }
        }
        setProducts(matchingObjects);
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
