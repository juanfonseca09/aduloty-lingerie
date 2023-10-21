import React, { useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './HeaderStyles.css';
import { NavLink } from 'react-router-dom'
import { FaHome, FaShoppingCart, FaListUl, FaQuestionCircle } from 'react-icons/fa'

export const HeaderNav = () => {


    const collapseRef = useRef(null);
  
    const hideBars = () => {
      collapseRef.current.setAttribute("class", "navbar-collapse collapse");
    };

  return (
    <Navbar expand="lg" className="navbar-custom py-3">
      <Container>
        <Navbar.Brand to="#home" className="d-flex">
          <img alt="" src="/logo.png" className='img-fluid' />{'   '}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" ref={collapseRef} className="justify-content-center">
          <Nav>
            <NavLink to='/inicio' onClick={hideBars}><FaHome className='mb-1' size={17}/> Inicio</NavLink>
            <NavLink to='/productos' onClick={hideBars}><FaListUl className='mb-1' size={17}/> Productos</NavLink>
            <NavLink to='/carrito' onClick={hideBars}><FaShoppingCart className='mb-1' size={17}/> Mi Carrito</NavLink>
            <NavLink to='/preguntas-frecuentes' onClick={hideBars}><FaQuestionCircle className='mb-1' size={17}/> Preguntas Frecuentes</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
