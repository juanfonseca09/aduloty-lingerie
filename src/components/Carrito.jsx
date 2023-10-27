import React, { useState } from "react";
import "./Carrito.css";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { FaRegTrashAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { removeProduct } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { Global } from '../Global';

export const Carrito = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveProduct = (index) => {
    console.log(index)
    dispatch(removeProduct(index));
  }

  return (
    <>
      <div className="bkgr">
        <div className="carrito">
          <Container>
            <Row>
              <Col md={8}>
                {cart.products.length === 0 ? (
                  <div className="empty-cart mb-5">
                    <h1>El carrito está vacío</h1>
                  </div>
                ) : (
                  <div>
                    {cart.products.map((product, index) => (
                      <Card key={product._id} className="mb-2">
                        <Card.Body className="prod-card">
                          <img
                            src={Global.url + `products/get-image/${product.images[product.code].url}`}
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
                              <p>{product.images[product.code]._id}</p>
                            </div>
                            <div>
                              <p className="fw-bold">Talle:</p>
                              <p>{product.size}</p>
                            </div>
                            <div>
                              <p className="fw-bold">Cantidad:</p>
                              <p>{product.quantity}</p>
                            </div>
                          </div>
                          <div className="trash">
                            <FaRegTrashAlt
                              size={25}
                              onClick={() => handleRemoveProduct(index)}
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
                    <h2 className="fw-bold">Tu Compra</h2>
                    <hr />
                    <div className="mb-0">
                      <p>Subtotal: ${cart.total}</p>
                      <p>IVA: $99</p>
                      <p>Envío: $999</p>
                      <p>Total: ${cart.total}</p>
                    </div>
                    <div className="row justify-content-center p-4">
                      <Button
                        disabled={cart.products.length === 0}
                        onClick={() => navigate('/checkout')}
                        variant='light'
                        className="col-6 btn-custom"
                      >
                        Comprar
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};
