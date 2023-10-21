import React, { useState, useEffect } from "react";
import "./Productos.css";
import { Container, Row, Dropdown } from "react-bootstrap";
import axios from "axios";
import { ProductsList } from "./ProductsList";

export const Productos = () => {
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");
  const [cat, setCat] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

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

  useEffect(() => {
    const filterProducts = () => {
      let filtered = [...products];

      if (cat) {
        filtered = filtered.filter((item) => item.categories.includes(cat));
      }

      return Object.entries(filters).reduce((acc, [key, value]) => {
        return acc.filter((item) => item[key].includes(value));
      }, filtered);
    };

    const sortProducts = (filtered) => {
      if (sort === "newest") {
        return [...filtered].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      } else if (sort === "asc") {
        return [...filtered].sort((a, b) => a.price - b.price);
      } else if (sort === "desc") {
        return [...filtered].sort((a, b) => b.price - a.price);
      }
      return filtered;
    };

    const filtered = filterProducts();
    const sortedAndFiltered = sortProducts(filtered);
    setFilteredProducts(sortedAndFiltered);
  }, [products, cat, filters, sort]);

  const handleFilters = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <Container>
      <div className="productos">
        <div className="titulo-productos d-flex">
          <img src="./productos.png" className=" img-fluid" />
        </div>
        <Row>
          <div className="d-flex p-4 justify-content-center mb-5 ">
            <Dropdown>
              <div>
                <div className="btncont">
                  <Dropdown.Toggle
                    name="categories"
                    onChange={handleFilters}
                    variant="light"
                    className="btn-custom"
                    id="dropdown-basic"
                  >
                    CATEGORÍAS
                  </Dropdown.Toggle>
                </div>
              </div>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setCat("")}>Todas</Dropdown.Item>
                <Dropdown.Item onClick={() => setCat("a")}>a</Dropdown.Item>
                <Dropdown.Item onClick={() => setCat("b")}>b</Dropdown.Item>
                <Dropdown.Item onClick={() => setCat("c")}>c</Dropdown.Item>
                <Dropdown.Item onClick={() => setCat("d")}>d</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
              <div>
                <div className="btncont">
                  <Dropdown.Toggle
                    variant="light"
                    className=" btn-custom"
                    id="dropdown-basic"
                  >
                    ORDENAR POR
                  </Dropdown.Toggle>
                </div>
              </div>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setSort("newest")}>
                  Mas Nuevo
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSort("asc")}>
                  Precio: - a +
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSort("desc")}>
                  Precio: + a -
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <ProductsList products={filteredProducts} />
        </Row>
      </div>
    </Container>
  );
};
