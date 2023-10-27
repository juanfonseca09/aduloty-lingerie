import React, { useEffect, useState } from "react";
import "./Producto.css";
import { Button, Col, Container, Dropdown, Modal, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { addProduct } from "../redux/store";
import { useDispatch } from "react-redux";
import { ProductsList } from "./ProductsList";
import { Global } from "../Global";
import { FaPlus, FaMinus, FaCircle } from "react-icons/fa";
import Swal from "sweetalert2";

export const Producto = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [filtered, setFiltered] = useState([]);
  const [size, setSize] = useState("Talle");
  const [color, setColor] = useState(null);
  const [productImage, setProductImage] = useState(null);
  const [code, setCode] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios({
          method: "get",
          url: Global.url + `products/find/${id}`,
          withCredentials: false,
          // params: {
          //   access_token: SECRET_TOKEN,
          // },
        });
        setProduct(res.data);

        // Verificamos si hay imágenes antes de intentar mostrar una
        if (res.data.images && res.data.images.length > 0) {
          // Cargar la imagen después de que se defina el producto
          setProductImage(
            <img
              src={
                Global.url + `products/get-image/${res.data.images[code].url}`
              }
              alt=""
              className="img-fluid img-pr p-5"
            />
          );
        }

        const res2 = await axios.get(Global.url + "products/");
        const filteredRelatedProducts = res2.data
          .filter(
            (item) =>
              item._id !== id &&
              item.categories.some((category) =>
                res.data.categories.includes(category)
              )
          )
          .slice(0, 4);
        setFiltered(filteredRelatedProducts);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
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
              <div className="img-wrapper">{productImage}</div>
            </Col>
            <Col md={4} className="mt-5">
              <h1>{product.title}</h1>
              <p>{product.desc}</p>
              <h3>${product.price}</h3>
              <Dropdown>
                <Dropdown.Toggle
                  variant="light"
                  className="btn-custom mb-2"
                  id="dropdown-basic"
                >
                  {size}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {product.images && product.images.length > 0
                    ? product.images[code].colors[0].sizes.map((s, index) => {
                        if (s.quantity > 0) {
                          return (
                            <Dropdown.Item
                              onClick={() => setSize(s.size)}
                              key={s._id}
                            >
                              {s.size}
                            </Dropdown.Item>
                          );
                        }
                      })
                    : null}
                </Dropdown.Menu>
              </Dropdown>
              <a onClick={handleShow} type="button" className="mb-3 fw-lighter">
                (Ver Guia de Talles)
              </a><br/>

              <label className="form-label">Seleccione un Color:</label>
              <div className="d-flex mb-4">
                {product.images && product.images.length > 0
                  ? product.images.map((c, index) => (
                      <FaCircle
                        key={c.colors[0].color}
                        size={30}
                        onClick={() => {
                          handleColorChange(c.colors[0].color);
                          setCode(index);
                        }}
                        style={{ color: c.colors[0].color, marginRight: "1vh" }}
                      />
                    ))
                  : null}
              </div>
              <div className="d-flex">
                <FaMinus
                  className="simb"
                  size={15}
                  onClick={() => setQuantity(quantity - 1)}
                />
                <h4>{quantity}</h4>
                <FaPlus
                  className="simb"
                  size={15}
                  onClick={() => setQuantity(quantity + 1)}
                />
              </div>

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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
              velit eaque aspernatur nam eveniet fugit culpa provident molestias
              architecto sit vitae soluta libero nihil dolores dolorem, vero
              commodi est perspiciatis.
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
