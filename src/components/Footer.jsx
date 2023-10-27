import React from "react";
import "./Footer.css";
import { FaInstagram } from "react-icons/fa";
import { MDBFooter, MDBContainer } from "mdb-react-ui-kit";

export const Footer = () => {
  return (
    <MDBFooter className="text-center footer">
      <MDBContainer className="p-3">
        <section className="social-ntwk m-2">
          <button
            className="m-3 social"
            onClick={() => window.open("https://www.instagram.com/aduloty.lingerie/", "_blank")}
          >
            <FaInstagram size={25} />
          </button>
        </section>
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
  );
};
