import React, { useState } from "react";
import "./Buscador.css";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Buscador = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  };

  const filteredProducts = searchTerm
    ? products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="bus-bk">
      <Container>
        <div className="buscador row justify-content-center">
          <input
            type="text"
            placeholder="Buscar..."
            className="buscador-input"
            value={searchTerm}
            onChange={handleChange}
          />

          <div className="resultados">
            {searchTerm && filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Link to={`/producto/${product._id}`} key={product.id}>
                  <div className="resultado">{product.title}</div>
                </Link>
              ))
            ) : null}

            {searchTerm && filteredProducts.length === 0 ? (
              <div className="text-white">No se ha encontrado el producto!</div>
            ) : null}
          </div>
        </div>
      </Container>
    </div>
  );
};
