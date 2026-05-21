import styles from "./TarjetaProducto.modulo.css";

function TarjetaProducto({ imagen, nombre, precio }) {
    return (
        <div className={StyleSheet.card}>
            <img src={imagen} alt={nombre} className={styles.image} />
            <h3>{nombre}</h3>
            <p>${precio}</p>
            <button>comprar</button>
        </div>
    );
}

export default TarjetaProducto

/*
<TarjetaProducto 
          imagen="./src/assets/hero.png" 
          nombre="producto 1"
          precio={1000}
        />
*/