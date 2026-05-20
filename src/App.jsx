import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Layout from './Componentes/Layout/Layout'
import './App.css'
import TarjetaProducto from './Componentes/TarjetaProducto/TarjetaProducto'


function App() {
  return (
      <Layout>
        <h2>productos destacados</h2>
        <TarjetaProducto 
          imagen="./src/assets/hero.png" 
          nombre="producto 1"
          precio={1000}
        />

      </Layout>
  );
}

export default App;

