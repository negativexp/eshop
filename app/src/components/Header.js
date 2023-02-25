import { useSearchParams } from "react-router-dom";

export function Header({ categories, cartPrice, search, showCheckOut, displayCategories, searchBySubCategory, hideSubCategories, FirstCapitalLetter }) {

  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("query") || "";

  const handleSearch = (e) => {
    const query = e.target.value;

    if (query) {
        setSearchParams({ query });
    } else {
        setSearchParams({});
    }

    search(query);
};

  return (
    <header>
      <div className="header-top">
        <div className="header-left">
          <h1>nezukoketamin</h1>
          <div className="header-search">
            <input id="searchbar" type="text" value={searchTerm} onChange={handleSearch}/>
            <button id="searchbutton" onClick={() => {search()}} >
              search
            </button>
          </div>
        </div>
        <div className="header-right">
          <button onClick={() => showCheckOut()}>{cartPrice} Kč</button>
        </div>
      </div>
      <div className="header-categories">
        {categories.map((item) => (
          <button onClick={() => displayCategories(item.category)}>
            {FirstCapitalLetter(item.category)}
          </button>
        ))}
      </div>
      <div className="header-subCategories">
        {categories.map((item) => (
          <div className="sub-category" id={item.category}>
            {item.subCategories.map((item) => (
              <div className="each-subCategory">
                <button onClick={() => searchBySubCategory(item)}>
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
    </header>
  );
}
