import React, { useState, useEffect } from "react";
import "./Productos.css";
import { Container, Row, Dropdown, Button } from "react-bootstrap";
import axios from "axios";
import { ProductsList } from "./ProductsList";
import { Global } from "../Global";
import { Buscador } from "./Buscador";
import { useLocation } from "react-router-dom";
import { Audio } from "react-loader-spinner";

export const Productos = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");
  const [cat, setCat] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(8);
  const [showMoreButton, setShowMoreButton] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios({
          method: "get",
          url: Global.url + "products",
          withCredentials: true,
        });
        setProducts(res.data);
        if (categoria) {
          setCat(categoria);
        }
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    };
    getProducts();
  }, []);

  useEffect(() => {
    const filtered = filterAndSortProducts();
    setFilteredProducts(filtered);
  }, [products, cat, filters, sort]);

  const filterAndSortProducts = () => {
    let filtered = [...products];

    if (cat) {
      filtered = filtered.filter((item) => item.categories.includes(cat));
    }

    filtered = Object.entries(filters).reduce((acc, [key, value]) => {
      return acc.filter((item) => item[key].includes(value));
    }, filtered);

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

  const handleFilters = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const loadMoreProducts = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 8);

    if (visibleProducts + 8 >= filteredProducts.length) {
      setShowMoreButton(false);
    }
  };

  const location = useLocation();
  const categoria = new URLSearchParams(location.search).get("categoria");

  return (
    <div>
      <Buscador products={products} />
      <div className="bkgr">
        <Container>
          <div className="productos">
            <div className="titulo-productos d-flex">
              <img
                src="./productos.png"
                className="img-fluid"
                alt="Productos"
              />
            </div>
            <Row>
              <div className="d-flex p-4 justify-content-center mb-5">
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
                    <Dropdown.Item onClick={() => setCat("")}>
                      Todas
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setCat("Victoria's Secret")}>
                      Victoria's Secret
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setCat("Lencería")}>
                      Lencería
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setCat("Preventa Lencería")}>
                      Preventa Lencería
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => setCat("Preventa Accesorios Originales")}
                    >
                      Preventa Accesorios Originales
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setCat("Indumentaria")}>
                      Indumentaria
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => setCat("Indumentaria Original")}
                    >
                      Indumentaria Original
                    </Dropdown.Item>
                    <Dropdown.Item disabled={true}>Por Mayor:</Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => setCat("Prendas SHEIN(Por Mayor)")}
                    >
                      Prendas SHEIN
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => setCat("Accesorios Originales(Por Mayor)")}
                    >
                      Accesorios Originales
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => setCat("Indumentaria Original(Por Mayor)")}
                    >
                      Indumentaria Original
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <Dropdown>
                  <div>
                    <div className="btncont">
                      <Dropdown.Toggle
                        variant="light"
                        className="btn-custom"
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
              {isLoading ? (
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
                <ProductsList
                  products={filteredProducts.slice(0, visibleProducts)}
                />
              )}
              {showMoreButton && (
                <div className="d-flex justify-content-center py-4">
                  <Button
                    variant="light"
                    className="btn-custom"
                    onClick={loadMoreProducts}
                  >
                    MOSTRAR MÁS
                  </Button>
                </div>
              )}
            </Row>
          </div>
        </Container>
      </div>
    </div>
  );
};
