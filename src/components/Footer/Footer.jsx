import React from "react"
import "./style.css"
import { Col, Container, Row } from "react-bootstrap"

const Footer = () => {
  return (
    <footer>
        <Container>
          <Row className="footer-row">
            <Col md={3} sm={5} className='box'>
              <div className="logo">
                  <ion-icon name="bag"></ion-icon>
                  <h1>E-Connect</h1>
              </div>
              <p>Recycles Waste , Market place for the user to buy and sell the products </p>
            </Col>
            <Col md={3} sm={5} className='box'>
              <h2>About Us</h2>
              <ul>
                <li>Careers</li>
                <li>Our Stores</li>
                <li>Our Cares</li>
                <li>Terms & Conditions</li>
                <li>Privacy Policy</li>
              </ul>
            </Col>
          
            <Col md={3} sm={5} className='box'>
              <h2>Contact Us</h2>
              <ul>
                <li>Fr. Conceicao Rodrigues College Of Engineering</li>
                <li>website: https://frcrce.ac.in/</li>
                <li>Phone: 022 6711 4000</li>
              </ul>
            </Col>
          </Row>
        </Container>
    </footer>
  )
}

export default Footer
