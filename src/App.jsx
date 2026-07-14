import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './Componentes/Layout/Layout';
import Productos from './Componentes/Productos/Productos';
import Cart from "./Componentes/Carrito/Cart";
import ProductoDetalle from './Componentes/Productos/ProductoDetalle/ProductoDetalle'
import Login from './Componentes/Login/Login';
import Registro from './Componentes/Registro/Registro';
import Gestion from './Componentes/GestionProductos/GestionProductos';
import GestionCupones from './Componentes/GestionCupones/GestionCupones';

function App() {

  return (

    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Productos Mensaje="Productos destacados" soloDestacados={true} />} />
        <Route path="/Productos" element={<Productos Mensaje="Todos los productos" />} />
        <Route path='/Carrito' element={<Cart />} />
        <Route path="/productos/:id" element={<ProductoDetalle />} />
        <Route path="/Login" element={<Login />} />
        <Route path='/Registro' element={<Registro />} />
        <Route path='/Gestion' element={<Gestion />} />
        <Route path='/GestionCupones' element={<GestionCupones />} />
      </Route>
    </Routes >
  );
}

export default App;