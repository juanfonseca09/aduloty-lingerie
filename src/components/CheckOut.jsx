import React, { useState } from "react";
import "./Carrito.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "../useForm";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'


export const CheckOut = () => {
  const { form, changed } = useForm({});
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);
  const [preferenceId, setPreferenceId] = useState(null);

  const cart = useSelector((state) => state.cart);

  initMercadoPago('APP_USR-f7b6bfc8-4e97-4660-bccd-b08d01067244');

  const createPreference = async () => {
    try {
      const items = cart.products.map((product) => ({
        description: product.title,
        price: product.price,
        quantity: 1,
      }));

      const response = await axios.post("http://localhost:5000/api/checkout/create_preference", { items });

      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error);
    }
  };


  

  const handleSubmit = async (e) => {
    const formData = e.currentTarget;
    let newUser = form;
    if (formData.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    e.preventDefault();
    setValidated(true);
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
    // const req = await fetch("http://localhost:5000/api/orders"{
    //   method: "POST",
    //   body: JSON.stringify(newUser),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // const data = await request.json();
    // console.log(data);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <section >
            <div className="py-5">
              <div className="d-flex ">
                
                  <Card>
                    <Card.Body className="p-5 text-center">
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
                              Dirección de Entrega
                            </Form.Label>
                            <Form.Control
                              required
                              type="adress"
                              placeholder="Ingrese su Dirección"
                              name="adress"
                              onChange={changed}
                            />
                            <Form.Control.Feedback type="invalid">
                              Ingrese una dirección valida!
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
                              Número de Telefono
                            </Form.Label>
                            <Form.Control
                              required
                              type="tel"
                              placeholder="Ingrese su número"
                              name="number"
                              pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}"
                              onChange={changed}
                            />
                            <Form.Control.Feedback type="invalid">
                              Ingrese un número de telefono valido!
                            </Form.Control.Feedback>
                          </Form.Group>
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
                        <div className="carrito">
                          <button
                          
                            className="btn btn-outline-light btn-custom btn-lg px-5"
                            type="submit"
                          >
                            Pagar
                          </button>
                          </div>
                          {preferenceId && <Wallet initialization={{ preferenceId }} />}
                        </Form>
                      </div>
                    </Card.Body>
                  </Card>
                
              </div>
            </div>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Terminos y Condiciones</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
                velit eaque aspernatur nam eveniet fugit culpa provident
                molestias architecto sit vitae soluta libero nihil dolores
                dolorem, vero commodi est perspiciatis.
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
                <p>Subtotal: ${cart.total}</p>
                <p>IVA: $99</p>
                <p>Envio: $999</p>
                <p>Total: ${cart.total}</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
