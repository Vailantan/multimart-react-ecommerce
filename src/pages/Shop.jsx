import { Col, Container, Row } from "react-bootstrap";
import FilterSelect from "../components/FilterSelect";
import SearchBar from "../components/SeachBar/SearchBar";
import { Fragment, useState } from "react";
import { products } from "../utils/products";
import React, {  useEffect } from 'react';
import ShopList from "../components/ShopList";
import Banner from "../components/Banner/Banner";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";



const Shop = () => {
  

  const [filterList, setFilterList] = useState(
    products.filter((item) => item.category === "Mobile")
  );





  useEffect(() => {
    const fetchData = async () => {
      try { 
        const response = await fetch('http://127.0.0.1:8000/all-products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
         const data = await response.json();
         const filteredData = data.products.filter(product => product.category === 'Mobile');
        setFilterList(filteredData);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchData();
  }, []);
 

  return (
    <Fragment>
      <Banner title="product" />
      <section className="filter-bar">
        <Container className="filter-bar-contianer">
          <Row className="justify-content-center">
            <Col md={4}>
              <FilterSelect setFilterList={setFilterList} />
             
            </Col>
            <Col md={8}>
              <SearchBar setFilterList={setFilterList} />
            </Col>
          </Row>
        </Container>
        <Container>
          <ShopList productItems={filterList} />
        </Container>
      </section>
    </Fragment>
  );
};

export default Shop;
