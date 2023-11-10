import React, { useEffect } from "react";
import { render } from "@react-email/render";
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

export const Send = ({ order }) => {
    useEffect(() => {
        const sendEmail = async () => {
          try {
            await axios.post(Global.url + "send-mail/", {
              to: order.mail,
              subject: "Comprobante de compra Aduloty Lingerie",
              html: render(<Send order={order} />),
            });
            window.location.href = "http://localhost:5173/";
          } catch (error) {
          }
        };
        sendEmail();
      }, []);

  return (
    <Html>
      <Head />
      <Preview>
        Obtén un resumen de tu pedido, fecha estimada de entrega y más
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Hr style={global.hr} />
          <Section style={message}>
            <Img
              src={"https://aduloty-lingerie.netlify.app/logo2.png"}
              width="116"
              height="66"
              alt="logo"
              style={{ margin: "auto" }}
            />
            <Heading style={global.heading}>¡RECIBIMOS TU PEDIDO!</Heading>
            <Text style={{ ...global.text, marginTop: 24 }}>
              Hola {order.name}, gracias por tu compra. Si tu compra fue en
              EFECTIVO (CAJA DE AHORRO ITAU: 9122402, Nombre del titular: Abiggail Ippoliti), te recordamos que tienes 24 horas para abonar, de lo
              contrario, tu pedido será cancelado. Si tu pedido fue abonado con
              tarjeta por MERCADO PAGO, no te preocupes, ya hemos recibido tu
              pago. Si realizaste el pedido por DAC, estará siendo despachado en
              las próximas 48 horas (excepto fines de semana o feriados). Si
              realizaste el pedido por CADETERIA, nos comunicaremos contigo para
              coordinar el envío en las próximas 48 horas. Recuerda que ante
              cualquier duda, puedes comunicarte a través del Whatsapp que
              aparece en nuestra web o a traves de nuestro Instagram.
            </Text>
          </Section>
          <Hr style={global.hr} />
          <Section style={global.defaultPadding}>
            <Text style={adressTitle}>Envío: {order.envio}</Text>
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
                <Text style={global.paragraphWithBold}>Número de Orden</Text>
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
