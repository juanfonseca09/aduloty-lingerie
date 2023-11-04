import React, { useEffect, useState } from "react";
import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import axios from "axios";
import { Global } from "../Global";
import { useSelector } from "react-redux";
import { renderToStaticMarkup } from "react-dom/server";


export const Mail = () => {
  const cart = useSelector((state) => state.cart);
  const [order, setOrder] = useState({});

  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await axios({
          method: "get",
          url: Global.url + "orders/" + cart.orderId,
          withCredentials: false,
        });
        setOrder(res.data);
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getOrder();
    sendEmail()
  }, []);

  const sendEmail = async () => {
    try {
      const response = await axios.post("/send-email", {
        to: 'juan.fonseca0709@gmail.com',
        subject: 'Comprobante de compra Aduloty Lingerie',
        html: renderToStaticMarkup(<Mail />),
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Html>
      <Head />
      <Preview>
        Get your order summary, estimated delivery date and more
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Hr style={global.hr} />
          <Section style={message}>
            <Img
              src={"./logo2.png"}
              width="116"
              height="66"
              alt="logo"
              style={{ margin: "auto" }}
            />
            <Heading style={global.heading}>RECIBIMOS TU PEDIDO!</Heading>
            <Text style={{ ...global.text, marginTop: 24 }}>
              Hola {order.name}, gracias por tu compra! Si tu compra fue en
              EFECTIVO te recordamos que tienes 24hs para abonar o tu pedido
              será cancelado. Si tu pedido fue abonado con tarjeta por MERCADO
              PAGO no te preocupes, ya nos llego tu pago. Si realizaste
              realizaste el pedido por DAC estará siendo despachado dentro de
              las proximas 48hs (menos findes o feriados). Si realizaste el
              pedido por CADETERIA nos estaremos comunicando para coordinar el
              envío dentro de las proximas 48hs. Te recoramos que ante cualquier
              duda puedes comunicarte por el Whatsapp que aparece en nuestra
              Web!
            </Text>
          </Section>
          <Hr style={global.hr} />
          <Section style={global.defaultPadding}>
            <Text style={adressTitle}>
              Envío: {order.envio} 
              </Text>
              <Text style={global.text}>
                {order.address}, {order.city}, {order.region}
              
            </Text>
          </Section>
          <Hr style={global.hr} />
          <Section
            style={{ ...paddingX, paddingTop: "40px", paddingBottom: "40px" }}
          >
            {order &&
              order.products &&
              order.products.map((product) => (
                <Row key={product.productId}>
                  <Column>
                    <Img
                      src={`${Global.url}products/get-image/${product.image}`}
                      alt="Producto"
                      style={{ padding: "8px" }}
                      width="120px"
                    />
                  </Column>
                  <Column style={{ verticalAlign: "top", paddingLeft: "10px" }}>
                    <Text style={{ ...paragraph, fontWeight: "500" }}>
                      {product.title}
                    </Text>
                    <Text style={global.text}>Talle: {product.size}</Text>
                    <Text style={global.text}>
                      Cantidad: {product.quantity}
                    </Text>
                    <Text style={global.text}>Precio: ${product.price}</Text>
                  </Column>
                </Row>
              ))}
          </Section>
          <Hr style={global.hr} />
          <Section style={global.defaultPadding}>
            <Row style={{ display: "inline-flex", marginBottom: 40 }}>
              <Column style={{ width: "170px" }}>
                <Text style={global.paragraphWithBold}>Numero de Orden</Text>
                <Text style={track.number}>
                  {order && order._id ? order._id.slice(-5) : "N/A"}
                </Text>
              </Column>
              <Column>
                <Text style={global.paragraphWithBold}>Monto Total</Text>
                <Text style={track.number}>${order && order.total}</Text>
              </Column>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const paddingX = {
  paddingLeft: "40px",
  paddingRight: "40px",
};

const paddingY = {
  paddingTop: "22px",
  paddingBottom: "22px",
};

const paragraph = {
  margin: "0",
  lineHeight: "2",
};

const global = {
  paddingX,
  paddingY,
  defaultPadding: {
    ...paddingX,
    ...paddingY,
  },
  paragraphWithBold: { ...paragraph, fontWeight: "bold" },
  heading: {
    fontSize: "32px",
    lineHeight: "1.3",
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: "-1px",
  },
  text: {
    ...paragraph,
    color: "#747474",
    fontWeight: "500",
  },
  button: {
    border: "1px solid #929292",
    fontSize: "16px",
    textDecoration: "none",
    padding: "10px 0px",
    width: "220px",
    display: "block",
    textAlign: "center",
    fontWeight: 500,
    color: "#000",
  },
  hr: {
    borderColor: "#E5E5E5",
    margin: "0",
  },
};

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "10px auto",
  width: "600px",
  border: "1px solid #E5E5E5",
};

const track = {
  container: {
    padding: "22px 40px",
    backgroundColor: "#F7F7F7",
  },
  number: {
    margin: "12px 0 0 0",
    fontWeight: 500,
    lineHeight: "1.4",
    color: "#6F6F6F",
  },
};

const message = {
  padding: "40px 74px",
  textAlign: "center",
};

const adressTitle = {
  ...paragraph,
  fontSize: "15px",
  fontWeight: "bold",
};
