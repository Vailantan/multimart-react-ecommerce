import { useState } from "react";
import "./searchbar.css";
import { products } from "../../utils/products";
// import useDebounce from "../../hooks/useDebounce";
const SearchBar = ({ setFilterList }) => {
  const [searchWord, setSearchWord] = useState(null);
  // const debounceSearchWord = useDebounce(searchWord, 300);
  const handelChange = async (input) => {

    setSearchWord(input.target.value);
    try { 
      const response = await fetch('http://127.0.0.1:8000/all-products');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
       const data = await response.json();
       const filteredData = data.products.filter((item) =>
       item.productName?.toLowerCase().includes(searchWord?.toLowerCase()));
      setFilterList(filteredData);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }


  };
  return (
    <div className="search-container">
      <input type="text" placeholder="Search..." onChange={handelChange} />
      <ion-icon name="search-outline" className="search-icon"></ion-icon>
    </div>
  );
};

export default SearchBar;
