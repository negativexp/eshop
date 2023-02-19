import React from "react"

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

export function Header() {
  return (
    <header>
      <ul>
        <li>
          <a href="#notebooks">Notebooky</a>
        </li>
        <li>
          <a href="#gamingconsoles">Herní konzole</a>
        </li>
        <li>
          <a href="#monitors">Monitory</a>
        </li>
        <li>
          <a href="#gpus">Grafické karty</a>
        </li>
      </ul>
    </header>
  );
}