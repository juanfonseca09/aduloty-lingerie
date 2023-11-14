import React from "react";
import "./Inicio.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { FaTruck, FaRegCreditCard } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { ProductsList } from "./ProductsList";
import { useEffect } from "react";
import axios from '../axiosInstance';
import { Buscador } from "./Buscador";

export const Inicio = () => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [products, setProducts] = useState([]);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get('/products?categories="destacado"');
        setProducts(res.data);
      } catch (err) {
      }
    };
    getProducts();
  }, []);

  const handleVideoClick = () => {
    setIsSoundEnabled(!isSoundEnabled);
    if (videoRef.current) {
      videoRef.current.muted = !isSoundEnabled;
    }
  };

  const redir = (cat) => {
    navigate('/productos', {state: {categorie: cat}});
  };

  return (
    <>
      <Buscador products={products} />
      <div className="bkgr">
        <Carousel interval={8000} className="custom-carousel">
          <Carousel.Item>
            <img
              src="./fondo-inicio.png"
              alt="First slide"
              className="img-fluid"
            />
          </Carousel.Item>
          <Carousel.Item>
            <div className="overlay1"></div>
            <img src="./car-2.jpg" alt="Second slide" className="img-fluid" />
            <div className="carousel-text">
              <h2>Descubre nuestros nuevos productos</h2>
              <Link to="/productos">
                <button className="btn btn-custom">VER PRODUCTOS</button>
              </Link>
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
          <div className=" row envio d-flex mb-3">
            <Col md={6} className="hov">
              <FaTruck size={40} className="mb-1 my-3" />
              <p>Envíos a todo el pais a domicilio</p>
            </Col>
            <Col md={6} className="hov">
              <FaRegCreditCard size={40} className="mb-1 my-3" />
              <p>Pagos hasta en 12 cuotas sin interes</p>
            </Col>
          </div>
        </Container>
        <div className="categorias">
          <Container>
            <div className="cat-img d-flex">
              <img src="/cat.png" className="img-fluid" alt="categorias" />
            </div>
            <div>
              <div className="d-flex justify-content-center align-items-center cat">
                <div
                  className="categoria"
                  onClick={() => redir("Victoria's Secret")}
                >
                  <p>Victoria's Secret</p>
                </div>
                <div className="categoria" onClick={() => redir("Lencería")}>
                  <p>Lencería</p>
                </div>
                <div
                  className="categoria"
                  onClick={() => redir("Preventa Lencería")}
                >
                  <p>Preventa Lencería</p>
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center cat">
                <div
                  className="categoria"
                  onClick={() => redir("Accesorios Originales")}
                >
                  <p>Accesorios Originales</p>
                </div>
                <div
                  className="categoria"
                  onClick={() => redir("Indumentaria")}
                >
                  <p>Indumentaria</p>
                </div>
                <div
                  className="categoria"
                  onClick={() => redir("Indumentaria Original")}
                >
                  <p>Indumentaria Original</p>
                </div>
              </div>
            </div>
          </Container>
        </div>
        <div className="destacado">
          <div className="titulo-destacado d-flex mb-3">
            <img src="./destacado.png" className=" img-fluid" />
          </div>
          <Container>
            <Row>
              <ProductsList products={products} />
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
      </div>
    </>
  );
};
