import React, {useState, useEffect} from "react";

export function Product(props) {
  return(
    <div className="product">
      <div className="product-img">
        <img src={props.img}/>
      </div>
      <div className="product-title">
        {props.children}
      </div>
      <div className="product-button">
        <button>Add to cart</button>
      </div>
    </div>
  )
}

export function SubCategories(props) {
  return(
    <>
      {props.values.map((item) => (
        <div className="sub-category" id={item.category}>
          <p>Všechno</p>
          {item.subCategories.map((item) => (
            <button>{item}</button>
          ))}
        </div>
      ))}
    </>

  )
}
