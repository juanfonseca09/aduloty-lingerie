import React, { useEffect, useState } from "react";
import "./Carrito.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "../useForm";
import { Alert, Card, Col, Container, InputGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setOrderId } from "../redux/store";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { codigos } from "../codigos";
import "../App.css";
import { useNavigate } from "react-router-dom";
import axios from "../axiosInstance";
import Swal from "sweetalert2";

export const CheckOut = () => {
  const { form, changed } = useForm({});
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);
  const [preferenceId, setPreferenceId] = useState(null);
  const [reg, setReg] = useState("Montevideo");
  const [msj, setMsj] = useState("");
  const [desc, setDesc] = useState(0);
  const [total, setTotal] = useState(0);
  const [codeValue, setCodeValue] = useState("");
  const [btn, setBtn] = useState("");
  const [envio, setEnvio] = useState("");
  const [btn2, setBtn2] = useState(true);
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    initMercadoPago(import.meta.env.VITE_INIT_MP);
    setTotal(cart.total);
    const searchParams = new URLSearchParams(location.search);
    const status = searchParams.get("status");
    if (status != null) {
      const orderid = searchParams.get("orderid");
      const paymentId = searchParams.get("payment_id");
      const merchantOrderId = searchParams.get("merchant_order_id");
      dispatch(setOrderId(orderid));
      updateOrder(status, paymentId, merchantOrderId);
      if (status == "approved") {
        updateProduct();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Compra Realizada Correctamente",
          text: "Hemos enviado un mail a tu casilla de correo con las instrucciones a seguir, gracias por tu compra!",
          showConfirmButton: false,
          timer: 5000,
        });
        // setTimeout(() => {
        //   navigate("/mail");
        // }, 4500);
      } else if (status == "declined") {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "Hubo un error en el proceso de compra, intentelo nuevamente!",
          showConfirmButton: false,
          timer: 3000,
        });
        const deleteOrder = async () => {
          try {
            await axios.delete("/orders/" + cart.orderId);
          } catch (error) {}
        };
        deleteOrder();
      }
    }
  }, []);

  const createPreference = async () => {
    const items = cart.products.map((product) => ({
      title: product.title,
      unit_price: product.price,
      quantity: product.quantity,
    }));
    const orderid = cart.orderId;
    try {
      const response = await axios.post("/checkout/create_preference", { items, orderid });
      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error);
    }
  };
  

  const updateProduct = async () => {
    try {
      for (const product of cart.products) {
        let sizeIndex = 0;
        switch (product.size) {
          case "XS":
            sizeIndex = 0;
            break;
          case "S":
            sizeIndex = 1;
            break;
          case "M":
            sizeIndex = 2;
            break;
          case "L":
            sizeIndex = 3;
            break;
          case "XL":
            sizeIndex = 4;
            break;
          case "75B":
            sizeIndex = 0;
            break;
          case "75C":
            sizeIndex = 1;
            break;
          case "80B":
            sizeIndex = 2;
            break;
          case "80C":
            sizeIndex = 3;
            break;
          case "80D":
            sizeIndex = 4;
            break;
          case "85B":
            sizeIndex = 5;
            break;
          case "85C":
            sizeIndex = 6;
            break;
          case "85D":
            sizeIndex = 7;
            break;
          default:
            sizeIndex = -1;
            break;
        }

        if (sizeIndex !== -1) {
          const sizeQuantity =
            product.images[product.code].colors[0].sizes[sizeIndex].quantity;
            const sizeUpd = {
              sizeIndex: sizeIndex,
              quantity: sizeQuantity - product.quantity,
            }
          await axios.put("/products/" + product._id, sizeUpd);
        }
      }
    } catch (error) {}
  };

  const updateOrder = async (d1, d2, d3) => {
    const upOrder = {
      estatus: d1,
      payid: d2,
       merchant_order_id: d3,
    }
    try {
      await axios.put("/orders/" + cart.orderId, upOrder);
    } catch (error) {}
  };
  const handleSubmit = async (e) => {
    const formData = e.currentTarget;
    e.preventDefault();
    setValidated(true);
    if (formData.checkValidity()) {
      sendOrderDataToServer();
      if (btn === "mercadoPago") {
        const id = await createPreference();
        if (id) {
          setPreferenceId(id);
        }
      }
      setBtn2(false);
      if (btn === "debitoBancario") {
        updateProduct();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Compra Realizada Correctamente",
          text: "Hemos enviado un mail a tu casilla de correo con las instrucciones a seguir, gracias por tu compra!",
          showConfirmButton: false,
          timer: 5000,
        });
        // setTimeout(() => {
        //   navigate("/mail");
        // }, 4500);
      }
    }
  };

  const sendOrderDataToServer = async () => {
    const items = cart.products.map((product) => ({
      title: product.title,
      image: product.images[product.code].url,
      price: product.price,
      color: product.color,
      size: product.size,
      quantity: product.quantity,
    }));
    const orderData = {
      products: items,
      name: form.name,
      surname: form.surname,
      mail: form.email,
      address: form.address,
      city: form.city,
      region: reg,
      phone: form.number,
      envio: envio,
      medio: btn,
      estatus: "pendinte",
      total: total,
    };
    try {
      const res = await axios.post("/orders", orderData);
      dispatch(setOrderId(res.data._id));
    } catch (error) {}
  };

  const handleSubmit2 = async (e) => {
    if (codeValue) {
      const codigoEncontrado = codigos.find((item) => item.code === codeValue);
      if (codigoEncontrado) {
        setDesc(codigoEncontrado.des);
        setTotal(cart.total * (1 - codigoEncontrado.des / 100));
        setMsj(`Descuento aplicado: ${codigoEncontrado.des}%`);
      } else {
        setMsj("El código es Incorrecto");
      }
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="bkgr">
      <Container>
        <Row>
          <Col md={8}>
            <section>
              <div className="py-5">
                <div className="d-flex justify-content-center">
                  <Card>
                    <Card.Body className="p-5">
                      {!btn2 && btn === "mercadoPago" ? (
                        <Wallet initialization={{ preferenceId }} />
                      ) : (
                        <div className="mb-md-5 mt-md-4 pb-3">
                          <h2 className="fw-bold mb-2 text-uppercase mb-5">
                            Datos del Comprador
                          </h2>
                          <Form
                            noValidate
                            validated={validated}
                            onSubmit={handleSubmit}
                          >
                            <Form.Group className="form-outline form-white mb-4">
                              <Form.Label className="form-label">
                                Nombre
                              </Form.Label>
                              <Form.Control
                                required
                                type="text"
                                placeholder="Ingrese su Nombre"
                                name="name"
                                onChange={changed}
                              />
                              <Form.Control.Feedback type="invalid">
                                Ingrese un nombre valido!
                              </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="form-outline form-white mb-4">
                              <Form.Label className="form-label">
                                Apellido
                              </Form.Label>
                              <Form.Control
                                required
                                type="text"
                                placeholder="Ingrese su nombre de usuario"
                                name="surname"
                                onChange={changed}
                              />
                              <Form.Control.Feedback type="invalid">
                                Ingrese un Apellido valido!
                              </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="form-outline form-white mb-4">
                              <Form.Label className="form-label">
                                E-mail
                              </Form.Label>
                              <Form.Control
                                required
                                type="email"
                                placeholder="Ingrese su correo electronico"
                                name="email"
                                onChange={changed}
                              />
                              <Form.Control.Feedback type="invalid">
                                Ingrese un correo electronico valido!
                              </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="form-outline form-white mb-4">
                              <Form.Label className="form-label">
                                Dirección de Entrega
                              </Form.Label>
                              <Form.Control
                                required
                                type="address"
                                placeholder="Ingrese su Dirección"
                                name="address"
                                onChange={changed}
                              />
                              <Form.Control.Feedback type="invalid">
                                Ingrese una dirección valida!
                              </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="form-outline form-white mb-4">
                              <Form.Label className="form-label">
                                Ciudad
                              </Form.Label>
                              <Form.Control
                                required
                                type="address"
                                placeholder="Ingrese su Ciudad"
                                name="city"
                                onChange={changed}
                              />
                              <Form.Control.Feedback type="invalid">
                                Ingrese una ciudad valida!
                              </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="form-outline form-white mb-4">
                              <Form.Label className="form-label">
                                Región
                              </Form.Label>
                              <Form.Select
                                aria-label="Region"
                                defaultValue="Montevideo"
                                onChange={(e) => setReg(e.target.value)}
                              >
                                <option value="Artigas">Artigas</option>
                                <option value="Canelones">Canelones</option>
                                <option value="Cerro Largo">Cerro Largo</option>
                                <option value="Colonia">Colonia</option>
                                <option value="Durazno">Durazno</option>
                                <option value="Flores">Flores</option>
                                <option value="Florida">Florida</option>
                                <option value="Lavalleja">Lavalleja</option>
                                <option value="Maldonado">Maldonado</option>
                                <option value="Montevideo">Montevideo</option>
                                <option value="Paysandú">Paysandú</option>
                                <option value="Rio Negro">Rio Negro</option>
                                <option value="Rivera">Rivera</option>
                                <option value="Rocha">Rocha</option>
                                <option value="Salto">Salto</option>
                                <option value="San José">San José</option>
                                <option value="Soriano">Soriano</option>
                                <option value="Tacuarembó">Tacuarembó</option>
                                <option value="Treinta y Tres">
                                  Treinta y Tres
                                </option>
                              </Form.Select>
                            </Form.Group>
                            <Form.Group className="form-outline form-white mb-4">
                              <Form.Label className="form-label">
                                Número de Telefono
                              </Form.Label>
                              <Form.Control
                                required
                                type="text"
                                placeholder="Ingrese su número"
                                name="number"
                                onChange={changed}
                              />
                              <Form.Control.Feedback type="invalid">
                                Ingrese un número de telefono valido!
                              </Form.Control.Feedback>
                            </Form.Group>
                            <Card className="mb-3">
                              <Card.Body>
                                <Form.Group className="form-outline align-items-center form-white mb-4">
                                  <Form.Label className="form-label">
                                    Metodo de Envío
                                  </Form.Label>
                                  <hr />
                                  <Form.Check
                                    required
                                    label="AGENCIA CENTRAL DAC"
                                    name="group1"
                                    type="radio"
                                    id="inline--1"
                                    feedbackType="invalid"
                                    onClick={() => setEnvio("DAC")}
                                  />
                                  <p className="text-muted">
                                    ABONAR AL RECIBIR (entre $210 a $260)
                                  </p>
                                  <Form.Check
                                    required
                                    label="CADETERÍA MONTEVIDEO"
                                    name="group1"
                                    type="radio"
                                    id="inline--2"
                                    feedbackType="invalid"
                                    onClick={() => setEnvio("Cadeteria")}
                                  />
                                  <p className="text-muted">
                                    {" "}
                                    ABONAR AL RECIBIR (entre $160 a $220)
                                  </p>
                                </Form.Group>
                              </Card.Body>
                            </Card>
                            <Card>
                              <Card.Body>
                                <Form.Group className="form-outline align-items-center form-white mb-4">
                                  <Form.Label className="form-label">
                                    Metodo de Pago
                                  </Form.Label>
                                  <hr className="mb-3" />
                                  <Form.Check
                                    required
                                    label="MERCADO PAGO"
                                    name="group3"
                                    type="radio"
                                    id="inline--3"
                                    className="mb-3"
                                    feedbackType="invalid"
                                    onClick={() => setBtn("mercadoPago")}
                                  />
                                  <Form.Check
                                    required
                                    label="PAGO MANUAL"
                                    name="group3"
                                    type="radio"
                                    id="inline--4"
                                    feedbackType="invalid"
                                    onClick={() => setBtn("debitoBancario")}
                                  />
                                </Form.Group>
                              </Card.Body>
                            </Card>
                            <div className="d-flex">
                              {btn === "debitoBancario" && (
                                <Alert variant="light">
                                  -Deposito y/o transferencia en cuenta itau
                                  <br />
                                  -CAJA DE AHORRO ITAU / 9122402 /<br />
                                  Nombre del titular: Abiggail Ippoliti
                                  <br />
                                  ENVIAR COMPROBANTE DE PAGO
                                  <br />
                                  MEDIANTE WHATSAPP O INSTAGRAM
                                </Alert>
                              )}
                            </div>
                            <Form.Group className="form-outline form-white mb-4 p-4">
                              <Form.Check
                                required
                                label="Acepto los terminos y condiciones."
                                feedback="Debes aceptarlos antes de continuar."
                                feedbackType="invalid"
                              />
                              <a
                                onClick={handleShow}
                                type="button"
                                className=" fw-bold"
                              >
                                (ver terminos y condiciones)
                              </a>
                            </Form.Group>
                            <div
                              className="carrito"
                              style={{ textAlign: "center" }}
                            >
                              {btn2 && (
                                <button
                                  className="btn btn-outline-light btn-custom btn-lg px-5"
                                  type="submit"
                                >
                                  Comprar
                                </button>
                              )}
                            </div>
                          </Form>
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                </div>
              </div>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Terminos y Condiciones</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  INFORMACIÓN RELEVANTE
                  <br />
                  Es requisito necesario para la adquisición de los productos
                  que se ofrecen en este sitio, que lea y acepte los siguientes
                  Términos y Condiciones que a continuación se redactan. El uso
                  de nuestros servicios así como la compra de nuestros productos
                  implicará que usted ha leído y aceptado los Términos y
                  Condiciones de Uso en el presente documento. Todas los
                  productos que son ofrecidos por nuestro sitio web pudieran ser
                  creadas, cobradas, enviadas o presentadas por una página web
                  tercera y en tal caso estarían sujetas a sus propios Términos
                  y Condiciones. En algunos casos, para adquirir un producto,
                  será necesario el registro por parte del usuario, con ingreso
                  de datos personales fidedignos y definición de una contraseña.
                  El usuario puede elegir y cambiar la clave para su acceso de
                  administración de la cuenta en cualquier momento, en caso de
                  que se haya registrado y que sea necesario para la compra de
                  alguno de nuestros productos. https://adulotylingerie.com.uy
                  no asume la responsabilidad en caso de que entregue dicha
                  clave a terceros. Todas las compras y transacciones que se
                  lleven a cabo por medio de este sitio web, están sujetas a un
                  proceso de confirmación y verificación, el cual podría incluir
                  la verificación del stock y disponibilidad de producto,
                  validación de la forma de pago, validación de la factura (en
                  caso de existir) y el cumplimiento de las condiciones
                  requeridas por el medio de pago seleccionado. En algunos casos
                  puede que se requiera una verificación por medio de correo
                  electrónico. Los precios de los productos ofrecidos en esta
                  Tienda Online es válido solamente en las compras realizadas en
                  este sitio web. LICENCIA Aduloty a través de su sitio web
                  concede una licencia para que los usuarios utilicen los
                  productos que son vendidos en este sitio web de acuerdo a los
                  Términos y Condiciones que se describen en este documento.
                  <br />
                  USO NO AUTORIZADO
                  <br />
                  En caso de que aplique (para venta de software, templetes, u
                  otro producto de diseño y programación) usted no puede colocar
                  uno de nuestros productos, modificado o sin modificar, en un
                  CD, sitio web o ningún otro medio y ofrecerlos para la
                  redistribución o la reventa de ningún tipo. PROPIEDAD Usted no
                  puede declarar propiedad intelectual o exclusiva a ninguno de
                  nuestros productos, modificado o sin modificar. Todos los
                  productos son propiedad de los proveedores del contenido. En
                  caso de que no se especifique lo contrario, nuestros productos
                  se proporcionan sin ningún tipo de garantía, expresa o
                  implícita. En ningún esta compañía será responsables de ningún
                  daño incluyendo, pero no limitado a, daños directos,
                  indirectos, especiales, fortuitos o consecuentes u otras
                  pérdidas resultantes del uso o de la imposibilidad de utilizar
                  nuestros productos.
                  <br />
                  POLÍTICA DE REEMBOLSO Y GARANTÍA
                  <br />
                  En el caso de productos que sean mercancías irrevocables
                  no-tangibles, no realizamos reembolsos después de que se envíe
                  el producto, usted tiene la responsabilidad de entender antes
                  de comprarlo. Le pedimos que lea cuidadosamente antes de
                  comprarlo. Hacemos solamente excepciones con esta regla cuando
                  la descripción no se ajusta al producto. Hay algunos productos
                  que pudieran tener garantía y posibilidad de reembolso pero
                  este será especificado al comprar el producto. En tales casos
                  la garantía solo cubrirá fallas de fábrica y sólo se hará
                  efectiva cuando el producto se haya usado correctamente. La
                  garantía no cubre averías o daños ocasionados por uso
                  indebido. Los términos de la garantía están asociados a fallas
                  de fabricación y funcionamiento en condiciones normales de los
                  productos y sólo se harán efectivos estos términos si el
                  equipo ha sido usado correctamente. Esto incluye: – De acuerdo
                  a las especificaciones técnicas indicadas para cada producto.
                  – En condiciones ambientales acorde con las especificaciones
                  indicadas por el fabricante. – En uso específico para la
                  función con que fue diseñado de fábrica. – En condiciones de
                  operación eléctricas acorde con las especificaciones y
                  tolerancias indicadas.
                  <br />
                  COMPROBACIÓN ANTIFRAUDE
                  <br />
                  La compra del cliente puede ser aplazada para la comprobación
                  antifraude. También puede ser suspendida por más tiempo para
                  una investigación más rigurosa, para evitar transacciones
                  fraudulentas.
                  <br />
                  PRIVACIDAD
                  <br />
                  Este https://adulotylingerie.com.uy garantiza que la
                  información personal que usted envía cuenta con la seguridad
                  necesaria. Los datos ingresados por usuario o en el caso de
                  requerir una validación de los pedidos no serán entregados a
                  terceros, salvo que deba ser revelada en cumplimiento a una
                  orden judicial o requerimientos legales. La suscripción a
                  boletines de correos electrónicos publicitarios es voluntaria
                  y podría ser seleccionada al momento de crear su cuenta.
                  Aduloty reserva los derechos de cambiar o de modificar estos
                  términos sin previo aviso.
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </section>
          </Col>
          <Col md={4} className="py-5 ">
            <Card>
              <Card.Body>
                <h2 className="fw-bold">Tu Compra</h2>
                <hr />
                <div className="mb-0">
                  {cart.products.map((pr, index) => (
                    <p key={index}>
                      {pr.quantity} X {pr.title}
                      <br />
                      Subtotal: ${pr.quantity * pr.price}
                    </p>
                  ))}
                  <hr />
                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder="Ingresa un código de descuento"
                      aria-label="Ingresa un código de descuento"
                      aria-describedby="basic-addon2"
                      style={{
                        borderColor: "rgb(252, 146, 209)",
                        color: "rgb(252, 146, 209)",
                      }}
                      onChange={(e) => setCodeValue(e.target.value)}
                    />
                    <Button
                      onClick={() => handleSubmit2()}
                      disabled={total != cart.total}
                      variant="outline-light"
                      id="button-addon2"
                      style={{
                        borderColor: "rgb(252, 146, 209)",
                        color: "rgb(252, 146, 209)",
                      }}
                    >
                      Aplicar
                    </Button>
                  </InputGroup>
                  <hr />
                  <p style={{ color: "rgb(252, 146, 209)" }}>{msj}</p>
                  <p>TOTAL: ${total}</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
