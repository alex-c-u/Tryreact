function TarjetaProducto({imagen, nombre, precio}){
    return (
        <div className={styles.card}>
            <img src={imagen} alt={nombre} />
            <h3>{nombre}</h3>
            <p className={styles.price}>${precio}</p>
            <button>Comprar</button>
        </div>
    );
}

export default TarjetaProducto