import React from "react";
import "./Preguntas.css";
import { Container, Row } from "react-bootstrap";

export const Preguntas = () => {
  return (
    <div className="preguntas">
      <Container>
        <Row>
          <h1>Preguntas Frecuentes</h1>
     
          <h4>¿Es seguro comprar en regiashop.com?</h4>
          <p>
            En Regia Shop nos preocupamos por la seguridad, por garantizar y
            proteger la privacidad de nuestros clientes. Por ese motivo le
            aseguramos que el tratamiento de sus datos se efectua con altos
            niveles de seguridad. Toda la informacion que ingreses queda
            automaticamente protegida por SSL (Secure Sockets Layer) que
            garantiza una transaccion 100% segura. Este sistema encripta los
            datos suministrados y evita su uso desautorizado. Medios de pago
          </p>
          <h4>MERCADO PAGO</h4>
          <p>
            3 CUOTAS SIN INTERES con tarjetas bancarias: Visa, Mastercard,
            NativaMastercard También podes abonar con las siguientes tarjetas:
            Shopping, Cencosud, Cabal, Argencard, Diners, Naranja
          </p>
          <h4>EFECTIVO</h4>
          <p>
            Obtenes un 40% de descuento extra efectivo contado únicamente en el
            local de manera presencial También podes abonar en efectivo a traves
            de Rapipago, Pago facil, carga virtual, Provincia.NET, Red Link.
            Tambien podes abonar con saldo precargado en Mercado Pago.
          </p>
          <h4>TRANSFERENCIA (solo online)</h4>
          <p>
            Obtenes un 40% de descuento extra abonando por transferencia o
            deposito bancario. Recordar una vez realizado el pago enviar
            comprobante por Whatsapp al 3413684111 para poder confirmar tu
            compra!{" "}
          </p>
          <h4>¿Como se si mi pedido ya fue despachado?</h4>
          <p>
            Luego de recibir la confirmacion de la compra y una vez que el
            pedido se encuentre despachado de nuestro deposito, recibiras el
            numero de seguimiento de Oca de tu pedido al mail con el que
            realizaste la compra. Si aun no lo recibiste, recorda revisar la
            bandeja de correo no deseados o spam. Si elegiste retirar por
            nuestra tienda, recibirás un Whatsapp al número registrado cuando el
            pedido este listo parar retirar.
          </p>
          <h4>¿Que necesito para retirar mi pedido por la tienda?</h4>
          <p>
            El pedido lo puede retirar el titular de la compra (persona que se
            registra en la web) presentando su DNI. También lo puede retirar un
            tercero que autorice dicha persona en la págna web en el momento de
            la compra, debe traer su DNI. En el caso de que venga otra persona
            que no se encuentre registrada en la página web, debe traer
            FOTOCOPIA del dni del titular de la compra sin falta.{" "}
          </p>
          <h4>¿Cuánto tarda en llegar el pedido?</h4>
          <p>
            El tiempo de entrega dependerá del tipo de envío seleccionado. En
            general la demora es de 3 a 7 días hábiles luego del despacho del
            producto.
          </p>
        </Row>
      </Container>
    </div>
  );
};
