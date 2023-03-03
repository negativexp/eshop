import React, { useState, useEffect } from "react";
import { useFetcher, useParams } from "react-router-dom";
import { searchForItems } from "./searchForItems";

export function SingleProduct() {
  const { productID } = useParams();
  const [product, setProduct] = useState([])

    useEffect(() => {
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
                  if (obj[prop].toLowerCase().includes(productID.toLowerCase())) {
                    //if so, push the object into matching objects
                    matchingObjects.push(obj);
                    break;
                  }
                } else {
                  if (obj[prop].toLowerCase().includes(productID.toLowerCase())) {
                    matchingObjects.push(obj);
                    break;
                  }
                }
              }
            }
            setProduct(matchingObjects)
        });
    }, [0])

  return (
    <>
      <h1>single product</h1>
      {product.length === 0 ? (
        <h1>loading...</h1>
      ) : (
        <h1>{product[0].title}</h1>
      )}
    </>
  );
}
