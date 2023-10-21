import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { Inicio } from '../components/Inicio';
import { Carrito } from '../components/Carrito';
import { Productos } from '../components/Productos';
import { Producto } from '../components/Producto';
import { CheckOut } from '../components/CheckOut';
import { Preguntas } from '../components/Preguntas';
import '../App.css'

export const MyRoutes = () => {
  return (
    <div className="bkgr">
        <Routes>
            <Route path='/' element={<Navigate to="/inicio"/>} />
            <Route path='/inicio' element={<Inicio/>} />
            <Route path='/carrito' element={<Carrito/>} />
            <Route path='/productos' element={<Productos />} />
            <Route path='/preguntas-frecuentes' element={<Preguntas />} />
            <Route path='/producto/:id' element={<Producto/>} />    
            <Route path='/checkout' element={<CheckOut/>} />         
        </Routes>
    </div>
  )
}
