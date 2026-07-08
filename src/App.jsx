import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './Componentes/Layout/Layout'
import Productos from './Componentes/Productos/Productos'
import FormularioContainer from './Componentes/FormularioContainer/FormularioContainer'
import Cart from "./Componentes/Carrito/Cart";
import ProductoDetalle from './Componentes/Productos/ProductoDetalle/ProductoDetalle'
import Login from './Componentes/Login/Login'
import Registro from './Componentes/Registro/Registro'


function App() {

  return (

    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<h1>Página de Inicio</h1>} />
        {/* <Route path="/productos" element={<ItemListContainer Mensaje={"Productos destacados"}/>} /> */}
        <Route path="/Productos" element={<Productos Mensaje="Todos los productos" />} />
        <Route path="/Nuevo Producto" element={<FormularioContainer />} />
        <Route path='/Carrito' element={<Cart />} />
        <Route path="/productos/:id" element={<ProductoDetalle />} />
        <Route path="/Login" element={<Login />} />
        <Route path='/Registro' element={<Registro />} />

        {/* <Route path="/alta" element={
            <ProtectedRoute rolesPermitidos={['admin']}>
              <Gestion />
            </ProtectedRoute>
          }
        />
      </Route> */}
    </Route>
    </Routes >
  );
}

export default App;

/* descomentar la de Gestion cuando la termine de armar asi ya esta protegida 
y agregar la de cupones
*/