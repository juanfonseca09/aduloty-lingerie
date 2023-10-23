// Carrito.jsx

import React, { useState } from "react";
import "./Carrito.css";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { FaRegTrashAlt } from "react-icons/fa";
// import { useSelector, useDispatch } from "react-redux";
// import { removeProduct } from "../redux/cartRedux";
import { useNavigate } from "react-router-dom";
import { Global } from '../Global';

export const Carrito = () => {
  // const cart = useSelector((state) => state.cart);
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const [products, setProducts] = useState([])

  // const handleRemoveProduct = (productId) => {
  //   dispatch(removeProduct(productId));
  // };
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios({
          method: 'get',
          url: Global.url+"products",
          withCredentials: false,
          // params: {
          //   access_token: SECRET_TOKEN,
          // },
        });
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getProducts();
  }, []);

  return (
    <>
    <div className="bkgr">
      <div className="carrito">
        <Container>
          <Row>
            <Col md={8}>
              {products.length === 0 ? (
                <div className="empty-cart">
                  <h1>El carrito está vacío</h1>
                </div>
              ) : (
                <div>
                  {products.map((product) => (
                    <Card key={product._id} className="mb-2">
                      <Card.Body className="prod-card">
                        <img
                          src={Global.url+`products/get-image/${product.images[0].url}`}
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
      </div>
    </>
  );
};

