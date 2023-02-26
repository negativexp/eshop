import React from "react";
import { useNavigate } from "react-router-dom";

export function SubCategories({categories}) {

    const navigate = useNavigate();

    const handleSubCategorySearch = (category) => {
        document.getElementById("searchbar").value = category
        navigate(`/products?search=${category}`);
      }
    
      function hideSubCategories() {
        categories.forEach((item) => {
          document.getElementById(item.category).style.visibility = "collapse";
        });
        document.getElementById("header-subCategories-empty").style.visibility =
          "collapse";
      }


    return(
        <div className="header-subCategories">
        {categories.map((item) => (
          <div className="sub-category" id={item.category}>
            {item.subCategories.map((item) => (
              <div className="each-subCategory">
                <button onClick={() => handleSubCategorySearch(item)}>
                  {item}
                </button>
              </div>
            ))}
          </div>
        ))}
        <div
          id="header-subCategories-empty"
          onClick={() => hideSubCategories()}
        ></div>
      </div>
    )
}