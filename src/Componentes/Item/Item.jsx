import { useState } from "react";
import Contador from "../Contador/Contador";

function Item({ nombre, precio, stock }) {
    const [EsFavorito, setEsFavorito] = useState(false)

    const CompraClick = () => {// Quiero que se ejecute cuando le doy clic
        alert(`¡Agregaste ${nombre} al carrito!`);
    };

    const MarcarComoFavorito = () => {
        setEsFavorito(!EsFavorito)
    }

    return (
        <div>
            <h3>{nombre}</h3>
            <p>Precio: ${precio}</p>
            <p>Stock disponible: {stock}</p>
            <button style={
                {
                    cursor: "pointer",
                    marginLeft: "10px"
                }
            } onClick={CompraClick}>Comprar</button>
           {/* <Contador></Contador> */}

            <span
                style={
                    {
                        cursor: "pointer",
                        marginLeft: "10px"
                    }
                }
                onClick={MarcarComoFavorito}>{EsFavorito ? '⭐' : '☆'}</span>
        </div>
    );
}


export default Item;

