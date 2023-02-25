import React from "react";
import { Product } from "./Product";

export function VisibleProducts({ visibleProducts, addToCart }) {
    return (
        <div className="visible-products">
        {visibleProducts.map((product) => (
          <Product key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    )
}