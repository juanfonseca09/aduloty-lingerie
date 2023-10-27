import React from "react";
import { Container, Dropdown, Row } from "react-bootstrap";
import "./Preguntas.css";

export const Preguntas = () => {
  return (
    <div className="bkgr">
      <div className="bk2">
        <Container>
          <div className="preguntas">
            <Row>
              <div className="cat-image d-flex mb-3">
                <img
                  src="/preguntas.png"
                  className="img-fluid"
                  alt="categorias"
                />
              </div>
              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-basic"
                  variant="light"
                  className="drop"
                >
                  ¿Contamos con local físico?
                </Dropdown.Toggle>
                <Dropdown.Menu className="drop-menu">
                  Por el momento no contamos con local, cada compra se puede
                  retirar sin costo en la zona de Parque batlle. Recuerda que
                  también contamos con envíos a domicilio.
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-basic"
                  variant="light"
                  className="drop"
                >
                  ¿Cuentan con cambios de talles?
                </Dropdown.Toggle>
                <Dropdown.Menu className="drop-menu">
                  Sí, las prendas se pueden cambiar únicamente por talles. En un
                  lapso de tres días después de realizada la compra, se puede
                  solicitar cambio del mismo.
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-basic"
                  variant="light"
                  className="drop"
                >
                  ¿Realizan envíos?
                </Dropdown.Toggle>
                <Dropdown.Menu className="drop-menu">
                  Sí, dentro de Montevideo se realizara mediante cadeteria,
                  siendo entregado en el día o al próximo. Mientras que al
                  interior enviamos mediante agencia DAC. Con una demora de 2/3
                  días hábiles.
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-basic"
                  variant="light"
                  className="drop"
                >
                  ¿Que quiere decir artículos en preventa?
                </Dropdown.Toggle>
                <Dropdown.Menu className="drop-menu">
                  Los artículos en preventa son aquellos los cuales únicamente
                  son pedidos una vez que se realiza el encargue. Con una demora
                  de 7 a 10 días hábiles. Mientras que los productos en stock
                  están disponibles para retirar y/o envíar.
                </Dropdown.Menu>
              </Dropdown>
            </Row>
          </div>
        </Container>
      </div>
    </div>
  );
};
