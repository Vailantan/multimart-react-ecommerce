import Select from 'react-select';
import { products } from '../utils/products';

const options = [
    { value: "Furniture", label: "Furniture" },
    { value: "Watch", label: "Watch" },
    { value: "Mobile", label: "Mobile" },
    { value: "Television", label: "Television" },
    { value: "Laptop", label: "Laptop" },
];

const customStyles = {
    control: (provided) => ({
        ...provided,
        backgroundColor: "#0f3460",
        color: "white",
        borderRadius: "5px",
        border: "none",
        boxShadow: "none",
        width: "200px",
        height: "40px",
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? "#0f3460" : "white",
        color: state.isSelected ? "white" : "#0f3460",
        "&:hover": {
        backgroundColor: "#0f3460",
        color: "white",
        },
    }),
    singleValue: (provided) => ({
        ...provided,
        color: "white",
    }),
};

const FilterSelect = ({setFilterList}) => {
    const handleChange = async (selectedOption)=> {

        try { 
            const response = await fetch('http://127.0.0.1:8000/all-products');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
             const data = await response.json();
             const filteredData = data.products.filter(product => product.category === selectedOption.value);
            setFilterList(filteredData);
          } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
          }

        
    }
    return (
    <Select
    options={options}
    defaultValue={{ value: "", label: "Filter By Category" }}
    styles={customStyles}
    onChange={handleChange}
    />
    );
};

export default FilterSelect;
