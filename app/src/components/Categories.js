import React from "react";

export function Categories({categories}) {

    function displayCategories(category) {
        document.getElementById("header-subCategories-empty").style.visibility =
          "visible";
          categories.forEach((item) => {
          if (item.category == category) {
            document.getElementById(item.category).style.visibility = "visible";
          } else {
            document.getElementById(item.category).style.visibility = "collapse";
          }
        });
      }

      function FirstCapitalLetter(item) {
        return item.toString().charAt(0).toUpperCase() + item.slice(1);
      }

    return(
        <div className="header-categories">
        {categories.map((item) => (
          <button onClick={() => displayCategories(item.category)}>
            {FirstCapitalLetter(item.category)}
          </button>
        ))}
        <button>...</button>
        <button>...</button>
        <button>...</button>
        <button>...</button>
        <button>...</button>
        <button>...</button>
        <button>...</button>
        <button>...</button>
        <button>...</button>
        <button>...</button>
        <button>...</button>
        <button>...</button>
        <button>...</button>
        <button>...</button>
        <button>...</button>
        <button>...</button>
        <button>...</button>
        <button>...</button>
        <button>...</button>
        <button>...</button>
        <button>...</button>
        <button>...</button>
      </div>
    )
}