import React from "react";
import { useState } from "react";
import { Col, Modal } from "react-bootstrap";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

export const ProductsList = ({ products }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSearchClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {products.map((item, index) => (
        <Col
          xs={6}
          md={3}
          key={item._id}
          className={index % 2 === 0 ? "item espacio" : "item"}
        >
          <div className="img-container">
            <img src={`http://localhost:5000/api/products/get-image/${item.images[0].url}`} alt="" className="img-fluid" />
            <div className="boton-container">
              <div className="boton">
                <FaSearch size={20} onClick={() => handleSearchClick(item)} />
              </div>
              <Link to={`/producto/${item._id}`}>
                <div className="boton">
                  <FaShoppingCart size={20} />
                </div>
              </Link>
            </div>
            <Link to={`/producto/${item._id}`}>
              <div className="nombre">
                <p className="fw-bold">{item.title}</p>
                <p className="fs-5">${item.price}</p>
              </div>
            </Link>
          </div>
        </Col>
      ))}
      <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                  <Modal.Title>
                    {selectedProduct && selectedProduct.title}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {selectedProduct && (
                    <img
                      src={`http://localhost:5000/api/products/get-image/${selectedProduct.images[0].url}`}
                      alt="Imagen relacionada"
                      className="modal-image"
                    />
                  )}
                </Modal.Body>
              </Modal>
    </>
  );
};
