import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Layout from './Componentes/Layout/Layout'
import './App.css'
//import TarjetaProducto from './Componentes/TarjetaProducto/TarjetaProducto'
import ItemListContainer from './Componentes/ItemListConteiner/ItemListConteiner'


function App() {
  return (
    <Layout>
      {}
       <ItemListContainer Mensaje="Nuestros productos destacados"/>
    </Layout>
     
  );
}

export default App;

