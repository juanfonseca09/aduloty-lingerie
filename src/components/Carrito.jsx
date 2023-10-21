// Carrito.jsx

import React from "react";
import "./Carrito.css";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { FaRegTrashAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { removeProduct } from "../redux/cartRedux";
import { useNavigate } from "react-router-dom";

export const Carrito = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveProduct = (productId) => {
    dispatch(removeProduct(productId));
  };

  return (
    <>
      <div className="carrito">
        <Container>
          <Row>
            <Col md={8}>
              {cart.products.length === 0 ? (
                <div className="empty-cart">
                  <h1>El carrito está vacío</h1>
                </div>
              ) : (
                <div>
                  {cart.products.map((product) => (
                    <Card key={product._id} className="mb-2">
                      <Card.Body className="prod-card">
                        <img
                          src={`http://localhost:5000/api/products/get-image/${product.images[0].url}`}
                          className="img-fluid img-thumbnail"
                          alt=""
                        />
                        <div className="texto">
                          <div>
                            <p className="fw-bold">Producto:</p>
                            <p>{product.title}</p>
                          </div>
                          <div>
                            <p className="fw-bold">Id:</p>
                            <p>{product._id}</p>
                          </div>
                          <div>
                            <p className="fw-bold">Talle:</p>
                            <p>{product.size}</p>
                          </div>
                          <div>
                            <p className="fw-bold">Color:</p>
                            <p>{product.color}</p>
                          </div>
                        </div>
                        <div className="trash">
                          <FaRegTrashAlt
                            size={25}
                            onClick={() => handleRemoveProduct(product._id)}
                          />
                        </div>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              )}
            </Col>
            <Col md={4}>
              <Card>
              <Card.Body>
              <h2 className="fw-bold">Tu Compra</h2><hr/>
              <div className="mb-0">
              <p>Subtotal: ${cart.total}</p>
              <p>IVA: $99</p>
              <p>Envio: $999</p>
              <p>Total: ${cart.total}</p>
              </div>
              <div className="row justify-content-center p-4">
                <Button disabled={cart.products.length === 0} onClick={()=> navigate('/checkout')} variant='light' className="col-6 btn-custom">Comprar</Button>
              </div>
            </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

