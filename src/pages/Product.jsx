import { Fragment, useEffect, useState,useRef } from "react";
import Banner from "../components/Banner/Banner";
import { Container } from "react-bootstrap";
import ShopList from "../components/ShopList";
import { products } from "../utils/products";
import { useParams } from "react-router-dom";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import ProductReviews from "../components/ProductReviews/ProductReviews";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";

const Product = () => {

  const { id } = useParams();
 
  const product_new = useRef([])
  const [selectedProduct, setSelectedProduct] = useState(
    []
  );
  useEffect(() => {
    const fetchData = async () => {
      try { 
        const response = await fetch('http://127.0.0.1:8000/all-products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
         const data = await response.json();
          product_new.current = data.products.filter((item) => item.id === id)[0];
       setSelectedProduct(product_new.current);
       console.log(`Old selected item is ${product_new.current}`);
   
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    fetchData();
 
  }, [selectedProduct,id]); 


  const [relatedProducts, setRelatedProducts] = useState([]);
  useEffect(() => {
    

    
/* setSelectedProduct(
      product_new.filter((item) => item.id === id)[0]
    );  */
    
    
  }, [selectedProduct, id]);

  

  return (
    <Fragment>
      <Banner title={product_new.current.productName} />
      <ProductDetails selectedProduct={product_new.current} />
      <ProductReviews selectedProduct={product_new.current} />
    </Fragment>
  );
};

export default Product;
