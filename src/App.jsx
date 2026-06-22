import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './Componentes/Layout/Layout'
import Productos from './Componentes/Productos/Productos'
import FormularioContainer from './Componentes/FormularioContainer/FormularioContainer'
import Cart from "./Componentes/Carrito/Cart";



function App() {

  return (

    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<h1>Página de Inicio</h1>} />
        {/* <Route path="/productos" element={<ItemListContainer Mensaje={"Productos destacados"}/>} /> */}
        <Route path="/Productos" element={<Productos Mensaje="Todos los productos" />} />
        <Route path="/Nuevo Producto" element={<FormularioContainer />} />
        <Route path='/Carrito' element={<Cart />} />
        <Route />
      </Route>
    </Routes>
  );
}

export default App;