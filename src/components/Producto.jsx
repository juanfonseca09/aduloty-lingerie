import React, { useEffect, useState } from "react";
import "./Producto.css";
import { Button, Col, Container, Dropdown, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { ProductsList } from "./ProductsList";

export const Producto = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [filtered, setFiltered] = useState([]);
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);
  const [productImage, setProductImage] = useState(null);
  const [code, setCode] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/products/find/${id}`
        );
        setProduct(res.data);

        // Verificamos si hay imágenes antes de intentar mostrar una
        if (res.data.images && res.data.images.length > 0) {
          // Cargar la imagen después de que se defina el producto
          setProductImage(
            <img
              src={`http://localhost:5000/api/products/get-image/${res.data.images[code].url}`}
              alt=""
              className="img-fluid img-pr p-5"
            />
          );
        }

        const res2 = await axios.get("http://localhost:5000/api/products/");
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
  }, [id]);

  const handleColorChange = (selectedColor) => {
    setColor(selectedColor);
  };

  const handleClick = () => {
    dispatch(addProduct({ ...product, color, size }));
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
                  Talle
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {product.images && product.images.length > 0 ? (
                    // Mapeamos los tamaños disponibles
                    product.images[code].colors[0].sizes.map((s, index) => (
                      <Dropdown.Item
                        onClick={() => setSize(s.size)}
                        key={s._id}
                      >
                        {s.size}
                      </Dropdown.Item>
                    ))
                  ) : null}
                </Dropdown.Menu>
              </Dropdown>

              <label className="form-label">Seleccione un Color:</label>
              <div className="d-flex">
              {product.images && product.images.length > 0
                ? product.images.map((c, index) => (
                    <input
                      key={c.colors.color}
                      type="color"
                      className="form-control form-control-color"
                      value={c.colors.color}
                      onClick={() => {handleColorChange(c.colors.color); setCode(index);}}
                    />
                  ))
                : null}
                </div>

              <div className="row justify-content-center p-4">
                <Button
                  variant="light"
                  className="col-6 btn-custom"
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
        </Container>
      </div>
    </>
  );
};
