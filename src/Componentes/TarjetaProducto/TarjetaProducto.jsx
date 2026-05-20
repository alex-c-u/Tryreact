function TarjetaProducto({imagen, nombre, precio}){
    return (
        <div>
            <img src={imagen} alt={nombre} />
            <h3>{nombre}</h3>
            <p>${precio}</p>
            <button>comprar</button>
        </div>
    );
}

export default TarjetaProducto