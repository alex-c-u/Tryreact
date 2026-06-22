import { useState } from 'react';
import { useCart } from '../../context/CartContext/CartContext';
import styles from "./TarjetaProducto.module.css";


function TarjetaProducto({
  id,
  nombre,
  precio,
  stock,
  imagen
}) {

  const producto = {
    id,
    nombre,
    precio,
    stock,
    imagen
  };

  const [favorito, setFavorito] = useState(false);
  const [cantidad, setCantidad] = useState(0);

  const {
    addToCart,
    updateCartQuantity
  } = useCart();

  const toggleFavorito = () => {
    setFavorito(!favorito);
  };

  const agregarInicial = () => {

    setCantidad(1);

    addToCart(producto, 1);
  };

  const incrementar = () => {

    if (cantidad < stock) {

      const nuevaCantidad = cantidad + 1;

      setCantidad(nuevaCantidad);

      updateCartQuantity(id, nuevaCantidad);
    }
  };

  const decrementar = () => {

    const nuevaCantidad = cantidad - 1;

    setCantidad(nuevaCantidad);

    updateCartQuantity(id, nuevaCantidad);
  };

  return (

    <div className="col-md-4 mb-4">

      <div className={`card ${styles.card}`}>

        <img
          src={imagen}
          className={`card-img-top ${styles.cardImg}`}
          alt={nombre}
        />

        <div className="card-body">

          <h5 className="card-title">
            {nombre}
          </h5>

          <p className="card-text">
            Precio: ${precio}
          </p>

          <p>
            Stock disponible: {stock}
          </p>

          <div className="d-flex justify-content-between align-items-center">

            {cantidad === 0 ? (

              <button
                className="btn btn-primary"
                onClick={agregarInicial}
              >
                Agregar al carrito
              </button>

            ) : (

              <div className="d-flex align-items-center gap-2">

                <button
                  className="btn btn-danger"
                  onClick={decrementar}
                >
                  -
                </button>

                <span className="fw-bold">
                  {cantidad}
                </span>

                <button
                  className="btn btn-success"
                  onClick={incrementar}
                  disabled={cantidad >= stock}
                >
                  +
                </button>

              </div>

            )}

            <span
              className={styles.estrella}
              onClick={toggleFavorito}
            >
              {favorito ? '⭐' : '☆'}
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}

export default TarjetaProducto;
/*
<TarjetaProducto 
          imagen="./src/assets/hero.png" 
          nombre="producto 1"
          precio={1000}
        />

*/