import React, { useState, useEffect } from "react";
import "./Productos.css";
import { Container, Row, Dropdown, Button } from "react-bootstrap";
import axios from "../axiosInstance";
import { ProductsList } from "./ProductsList";
import { Buscador } from "./Buscador";
import { useLocation } from "react-router-dom";
import { Audio } from "react-loader-spinner";

export const Productos = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [sort, setSort] = useState("newest");
  const [cat, setCat] = useState("");
  const [products, setProducts] = useState([]);
  const [showMoreButton, setShowMoreButton] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const { categorie } = location.state || {};

  useEffect(() => {
    if(currentPage === 1) setIsLoading(true);
    const getProducts = async () => {
      try {
        let res;
        cat === ""
          ? (res = await axios.get(
              `/products?page=${currentPage}&limit=8&sort=${sort}`
            ))
          : (res = await axios.get(
              `/products?page=${currentPage}&limit=8&sort=${sort}&category=${cat}`
            ));
        setProducts((prevProducts) =>
          currentPage === 1 ? res.data : [...prevProducts, ...res.data]
        );
        setIsLoading(false);
        setShowMoreButton(res.data.length % 8 === 0);
      } catch (err) {
        setIsLoading(false);
      }
    };
    if (categorie) {
      setCat(categorie);
      getProducts();
    } else {
      getProducts();
    }
  }, [currentPage, cat, sort]);

  const loadMoreProducts = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

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
                        variant="light"
                        className="btn-custom"
                        id="dropdown-basic"
                      >
                        CATEGORÍAS
                      </Dropdown.Toggle>
                    </div>
                  </div>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => {
                        if(cat != ""){
                          setProducts([]);
                          setCurrentPage(1);
                          setCat("");
                        }
                      }}
                    >
                      Todas
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        if(cat != "Victoria's Secret"){
                          setProducts([]);
                          setCurrentPage(1);
                          setCat("Victoria's Secret");
                        }
                      }}
                    >
                      Victoria's Secret
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        if(cat != "Lencería"){
                          setProducts([]);
                          setCurrentPage(1);
                          setCat("Lencería");
                        }
                      }}
                    >
                      Lencería
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        if(cat != "Preventa Accesorios Originales"){
                          setProducts([]);
                          setCurrentPage(1);
                          setCat("Preventa Accesorios Originales");
                        }
                      }}
                    >
                      Preventa Accesorios Originales
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        if(cat != "Indumentaria"){
                          setProducts([]);
                          setCurrentPage(1);
                          setCat("Indumentaria");
                        }
                      }}
                    >
                      Indumentaria
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        if(cat != "Indumentaria Original"){
                          setProducts([]);
                          setCurrentPage(1);
                          setCat("Indumentaria Original");
                        }
                      }}
                    >
                      Indumentaria Original
                    </Dropdown.Item>
                    <Dropdown.Item disabled={true}>Por Mayor:</Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        if(cat != "Prendas SHEIN(Por Mayor)"){
                          setProducts([]);
                          setCurrentPage(1);
                          setCat("Prendas SHEIN(Por Mayor)");
                        }
                      }}
                    >
                      Prendas SHEIN
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        if(cat != "Accesorios Originales(Por Mayor)"){
                          setProducts([]);
                          setCurrentPage(1);
                          setCat("Accesorios Originales(Por Mayor)");
                        }
                      }}
                    >
                      Accesorios Originales
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        if(cat != "Indumentaria Original(Por Mayor)"){
                          setProducts([]);
                          setCurrentPage(1);
                          setCat("Indumentaria Original(Por Mayor)");
                          }
                      }}
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
                    <Dropdown.Item
                      onClick={() => {
                        if(sort != "newest"){
                          setProducts([]);
                          setCurrentPage(1);
                          setSort("newest");
                        }
                      }}
                    >
                      Nuevo
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        if(sort != "az"){
                          setProducts([]);
                          setCurrentPage(1);
                          setSort("az");
                          }
                      }}
                    >
                      A - Z
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        if(sort != "za"){
                          setProducts([]);
                          setCurrentPage(1);
                          setSort("za");
                        }
                      }}
                    >
                      Z - A
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        if(sort != "asc"){
                          setProducts([]);
                          setCurrentPage(1);
                          setSort("asc");
                        }
                      }}
                    >
                      Precio: - a +
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        if(sort != "desc"){
                          setProducts([]);
                          setCurrentPage(1);
                          setSort("desc");
                        }
                      }}
                    >
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
                <ProductsList products={products} />
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
