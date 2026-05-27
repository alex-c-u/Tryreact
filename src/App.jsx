import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Layout from './Componentes/Layout/Layout'
import './App.css'
import Productos from './Componentes/Productos/Productos'
import ItemListContainer from './Componentes/ItemListConteiner/ItemListConteiner'
import FormularioContainer from './Componentes/FormularioContainer/FormularioContainer'
import FormularioProducto from './Componentes/FormularioProducto/FormularioProducto'
import TarjetaProducto from './Componentes/TarjetaProducto/TarjetaProducto'

function App() {

  return (

    <Routes>{/*envuelve a las demás para mostrar Header y Footer siempre */}
      <Route element={<Layout />}>
        <Route path="/" element={<h1>Página de Inicio</h1>} />
        <Route path="/productos" element={<ItemListContainer Mensaje={"Productos destacados"}/>} />
        <Route path="/destacados" element={<TarjetaProducto Mensaje={"Todos los productos"}/>} />
        <Route path="/Nuevo Producto" element={<FormularioContainer />} />
        {/* <Route path='/Carrito">Carrito' element={Carrito}/> */}
      </Route>
    </Routes>);

}

export default App;

// Cambiar productos y productos destacados el ItemListContainer y el Productos x TarjetaProducto, arreglar TarjetaProducto
// Agregar en el footer 
  // Las imagenes del equipo
// Crear componente Carrito