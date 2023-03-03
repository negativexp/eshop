import React, { useState, useEffect } from "react";
import { useFetcher, useParams } from "react-router-dom";
import { searchForItems } from "./searchForItems";

export function SingleProduct({ addToCart }) {
  const { productID } = useParams();
  const [product, setProduct] = useState([]);

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
        setProduct(matchingObjects);
      });
  }, [0]);

  return (
    <div className="singleProduct">
      {product.length === 0 ? (
        <div className="loading">
          <h1>loading...</h1>
        </div>
      ) : (
        <>
          {" "}
          <div className="productDetails">
            <div className="productImage">
              <img
                src={
                  "http://localhost:5000/images/products/" +
                  product[0].productID +
                  ".jpg"
                }
              />
            </div>
            <div className="productInfo">
              <h1>{product[0].title}</h1>
              <p>{product[0].longDescription}</p>
            </div>
          </div>
          <div className="addtocart">
            <button onClick={() => addToCart(product)}>
              Přidat do košíku
              <div className="addtocartImage"></div>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
