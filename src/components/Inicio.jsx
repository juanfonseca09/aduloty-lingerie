import React from "react";
import "./Inicio.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { categories } from "../data";
import { FaTruck, FaSearch, FaShoppingCart, FaRegCreditCard } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { ProductsList } from "./ProductsList";
import { useEffect } from "react";
import axios from "axios";


export const Inicio = () => {

  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [products, setProducts] = useState([]);
  const videoRef = useRef(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getProducts();
  }, []);
  
  const filteredProducts = products.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  ).slice(0,8)

  const handleVideoClick = () => {
    setIsSoundEnabled(!isSoundEnabled);
    if (videoRef.current) {
      videoRef.current.muted = !isSoundEnabled;
    }
  };

  return (
    <>
      <Carousel interval={8000} className="custom-carousel">
      <Carousel.Item>
        <img src="./fondo-inicio.png" alt="First slide" className="img-fluid" />
      </Carousel.Item>
      <Carousel.Item>
        <div className="overlay1"></div>
        <img src="./car-2.jpg" alt="Second slide" className="img-fluid" />
        <div className="carousel-text">
          <h2>Descubre nuestros nuevos productos</h2>
          <Link to='/productos'><button className="btn btn-custom">VER PRODUCTOS</button></Link>
        </div>
      </Carousel.Item>
      <Carousel.Item onClick={handleVideoClick}>
        <div className="overlay2"></div>
        <video ref={videoRef} autoPlay loop muted className="video">
          <source src="./car-3.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Carousel.Item>
    </Carousel>
    <Container>
      <div className=" row envio d-flex">
        <Col md={6} className="hov">
          <FaTruck size={40} className="mb-1 my-3" /> 
        <p>
           Envíos a todo el pais a
          domicilio 
        </p>
        </Col>
        <Col md={6} className="hov">
        <FaRegCreditCard size={40} className="mb-1 my-3"/>
        <p>
          Pagos hasta en 12 cuotas sin interes
        </p>
        </Col>
      </div>
      </Container>
      <div className="destacado">
        <div className="titulo-destacado d-flex mb-3">
          <img src="./destacado.png" className=" img-fluid" />
        </div>
        <Container>
          <Row>
            <ProductsList products={filteredProducts}/>
          </Row>
          <Link to="/productos">
            <div className="row justify-content-center mt-5">
              <Button className="col-md-3 col-6 text-center btn-custom">
                VER TODOS LOS PRODUCTOS
              </Button>
            </div>
          </Link>
        </Container>
      </div>
    </>
  );
};
