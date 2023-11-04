import React, { useState } from "react";
import "./Footer.css";
import { FaInstagram } from "react-icons/fa";
import { MDBFooter, MDBContainer } from "mdb-react-ui-kit";
import { Button, Modal } from "react-bootstrap";

export const Footer = () => {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);

  return (
    <>
      <MDBFooter className="text-center footer">
        <MDBContainer className="p-3">
          <section className="social-ntwk m-1">
            <button
              className="m-3 social"
              onClick={() =>
                window.open(
                  "https://www.instagram.com/aduloty.lingerie/",
                  "_blank"
                )
              }
            >
              <FaInstagram size={25} />
            </button>
          </section>
          <div className="politica">
            <a onClick={handleShow} type="button" className="fw-lighter">
              Politica de Cambios y Devoluciones
            </a>
          </div>
          <section className="payment-logos">
            <img src="/visa.webp" alt="visa" />
            <img src="/mercadopago.png" alt="mercadopago" />
            <img src="/mastercard.png" alt="mastercard" />
            <img src="/oca.png" alt="oca" />
            <img src="/abitab.png" alt="abitab" />
            <img src="/redpagos.png" alt="redpagos" />
          </section>
        </MDBContainer>
      </MDBFooter>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Politica de Cambios y Devoluciones:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Cambios o devoluciones deberán hacerse en no más de 14 días después de
          la fecha de compra.
          <br />
          PUNTOS A TENER EN CUENTA:
          <br />
          La mercancía debe tener todas sus etiquetas originales Comprobante
          original de compra es requerido sin excepción al momento de
          devolución/cambio La mercancía no debe estar usada, lavada ni
          alterada, no se podrá devolver/cambiar mercancía que haya sido
          alterada.
          <br />
          💌 SE TOMARÁ SOLAMENTE CUANDO EL PRODUCTO PRESENTE FALLAS O DAÑOS
          ESTÉTICOS 💌
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
