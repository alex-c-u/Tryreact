import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './Componentes/Layout/Layout'
import Productos from './Componentes/Productos/Productos'
import FormularioContainer from './Componentes/FormularioContainer/FormularioContainer'
import Carrito from "./Componentes/Carrito/Carrito";


function App() {

  return (

    <Routes>{/*envuelve a las demás para mostrar Header y Footer siempre */}
      <Route element={<Layout />}>
        <Route path="/" element={<h1>Página de Inicio</h1>} />
        {/* <Route path="/productos" element={<ItemListContainer Mensaje={"Productos destacados"}/>} /> */}
        <Route path="/productos"element={<Productos Mensaje="Todos los productos"/>}/>
        <Route path="/Nuevo Producto" element={<FormularioContainer />} />
        <Route path="/carrito" element={<Carrito />} />
      </Route>
    </Routes>);

}

export default App;