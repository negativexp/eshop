import React from "react";
import "./components/styles/ButtonAdd.css"

export function ButtonAddBig({ addToCart, product }) {
  return (
    <div className="buttonAdd">
      <button onClick={() => addToCart(product)}>
        Přidat do košíku
        <div className="buttonAddImage"></div>
      </button>
    </div>
  );
}

export function ButtonAddSmall({ addToCart, product }) {
  return (
    <div className="buttonAdd">
      <button onClick={() => addToCart(product)}>
        Přidat
        <div className="buttonAddImage"></div>
      </button>
    </div>
  );
}
