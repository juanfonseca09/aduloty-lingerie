import React, { useEffect, useState } from "react";
import "./Producto.css";
import { Button, Col, Container, Dropdown, Modal, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../axiosInstance";
import { addProduct } from "../redux/store";
import { useDispatch } from "react-redux";
import { ProductsList } from "./ProductsList";
import { FaPlus, FaMinus } from "react-icons/fa";
import Swal from "sweetalert2";
import { Audio } from "react-loader-spinner";

export const Producto = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [filtered, setFiltered] = useState([]);
  const [size, setSize] = useState("Talle");
  const [sizeQuantity, setSizeQuantity] = useState(0);
  const [color, setColor] = useState(null);
  const [productImage, setProductImage] = useState(null);
  const [pmayor, setPmayor] = useState(false);
  const [code, setCode] = useState(0);
  const [cat, setCat] = useState("");
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [unique, setUnique] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(`/products/find/${id}`);
        setProduct(res.data);
        setCat(res.data.categories[0]);
        setColor(res.data.images[code].colors[0].color);
        if (res.data.categories.includes("Unico Color")) setUnique(true);
        if (
          res.data.categories.includes(
            "Prendas SHEIN(Por Mayor)" ||
              "Accesorios Originales(Por Mayor)" ||
              "Indumentaria Original(Por Mayor)"
          )
        ) {
          setPmayor(true);
          setQuantity(10);
        }
        if (res.data.images && res.data.images.length > 0) {
          setProductImage(
            <img
              src={
                axios.defaults.baseURL +
                `/get-image/${res.data.images[code].url}`
              }
              alt="prod"
              className="img-fluid p-5"
              crossOrigin="anonymous"
            />
          );
          setLoading(false);
        }
        const res2 = await axios.get(`/products?categories=${cat}&limit=4`);
        setFiltered(res2.data);
      } catch (error) {}
    };
    getProduct();
  }, [id, code]);

  const handleColorChange = (selectedColor) => {
    setColor(selectedColor);
  };

  const handleClick = () => {
    dispatch(addProduct({ ...product, quantity, color, size, code }));
    Swal.fire({
      position: "medium",
      icon: "success",
      title: "Producto añadido al carrito!",
      showConfirmButton: false,
      timer: 2000,
    });
    setTimeout(() => navigate("/carrito"), 2100);
  };

  return (
    <>
      <div className="producto">
        <Container>
          <Row>
            <Col md={6}>
              {loading ? (
                <Audio
                  height={80}
                  width={80}
                  radius={9}
                  color="#FB75C7"
                  ariaLabel="loading"
                  wrapperStyle={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
              ) : (
                <div className="img-wrapper">{productImage}</div>
              )}
            </Col>
            <Col md={4} className="mt-5">
              <h1>{product.title}</h1>
              <p>{product.desc}</p>
              <h3>${product.price}</h3>
              {product.images && product.images.length > 0 ? (
                product.images[code].colors[0].sizes.some(
                  (s) => s.quantity > 0
                ) ? (
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="light"
                      className="btn-custom mb-2"
                      id="dropdown-basic"
                    >
                      {size}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {product.images[code].colors[0].sizes.map((s, index) => {
                        if (s.quantity > 0) {
                          return (
                            <Dropdown.Item
                              onClick={() => {
                                setSize(s.size);
                                setSizeQuantity(s.quantity);
                              }}
                              key={s._id}
                            >
                              {s.size}
                            </Dropdown.Item>
                          );
                        }
                      })}
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <p>Sin Stock</p>
                )
              ) : null}

              <a onClick={handleShow} type="button" className="mb-3 fw-lighter">
                (Ver Guia de Talles)
              </a>
              <br />
              {unique ? (
                <div className="d-flex mb-4">
                  {product.images && product.images.length > 0
                    ? product.images.map((c, index) => (
                        <img
                          src={axios.defaults.baseURL + `/get-image/${c.url}`}
                          alt="pro"
                          key={index}
                          className="img-icons"
                          crossOrigin="anonymous"
                          onClick={() =>
                            setProductImage(
                              <img
                                src={
                                  axios.defaults.baseURL + `/get-image/${c.url}`
                                }
                                alt="prod"
                                className="img-fluid p-5"
                                crossOrigin="anonymous"
                              />
                            )
                          }
                        />
                      ))
                    : null}
                </div>
              ) : (
                <>
                  <label className="form-label">Seleccione un Color:</label>
                  <div className="d-flex mb-4">
                    {product.images && product.images.length > 0
                      ? product.images.map((c, index) => (
                          <img
                            src={axios.defaults.baseURL + `/get-image/${c.url}`}
                            alt="pro"
                            className="img-icons"
                            crossOrigin="anonymous"
                            key={c.colors[0].color}
                            size={30}
                            onClick={() => {
                              handleColorChange(c.colors[0].color);
                              setCode(index);
                              setSize("Talle");
                              setQuantity(1);
                              setSizeQuantity(0);
                            }}
                          />
                        ))
                      : null}
                  </div>
                </>
              )}
              {sizeQuantity != 0 && (
                <div className="d-flex">
                  <FaMinus
                    className="simb"
                    size={15}
                    onClick={() => {
                      if (!pmayor && quantity != 1) setQuantity(quantity - 1);
                      else if (pmayor && quantity != 10)
                        setQuantity(quantity - 1);
                    }}
                  />
                  <h4>{quantity}</h4>
                  <FaPlus
                    className="simb"
                    size={15}
                    onClick={() => {
                      quantity < sizeQuantity && setQuantity(quantity + 1);
                    }}
                  />
                </div>
              )}
              <div className="row justify-content-center p-4">
                <Button
                  variant="light"
                  className="col-6 btn-custom"
                  disabled={size == "Talle"}
                  onClick={handleClick}
                >
                  Agregar al Carrito
                </Button>
              </div>
            </Col>
            <div className="otros d-flex flex-column align-items-center">
              <h2 className="text-center">Productos Relacionados</h2>
              <div className="d-flex flex-wrap justify-content-center p-3">
                <ProductsList products={filtered} />
              </div>
            </div>
          </Row>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Guia de Talles</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {product.images &&
              product.images[0].colors[0].sizes[0].size == "XS" ? (
                <img src="/talles2.jpg" className="img-fluid" alt="talles" />
              ) : (
                <img src="/talles1.jpg" className="img-fluid" alt="talles" />
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </div>
    </>
  );
};
