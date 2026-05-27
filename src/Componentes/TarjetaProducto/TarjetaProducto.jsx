import { useState } from 'react';
import styles from "./TarjetaProducto.module.css";

function TarjetaProducto({ nombre, precio, imagen, stock }) {

  const [favorito, setFavorito] = useState(false);

  const [cantidad, setCantidad] = useState(0);

  const toggleFavorito = () => {
    setFavorito(!favorito);
  };

  const agregarProducto = () => {

    if (cantidad < stock) {
      setCantidad(cantidad + 1);
    }
  };

  const quitarProducto = () => {

    if (cantidad > 0) {
      setCantidad(cantidad - 1);
    }
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

          <h5 className="card-title">{nombre}</h5>

          <p className="card-text">
            Precio: ${precio}
          </p>

          <p>
            Stock disponible: {stock}
          </p>

          <div className="d-flex justify-content-between align-items-center">

            {
              cantidad === 0 ? (

                <button
                  className="btn btn-primary"
                  onClick={agregarProducto}
                >
                  Comprar
                </button>

              ) : (

                <div className="d-flex align-items-center gap-2">

                  <button
                    className="btn btn-danger"
                    onClick={quitarProducto}
                  >
                    -
                  </button>

                  <span>{cantidad}</span>

                  <button
                    className="btn btn-success"
                    onClick={agregarProducto}
                    disabled={cantidad >= stock}
                  >
                    +
                  </button>

                </div>

              )
            }

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