import React, { useState, useEffect } from 'react';
import TarjetaProducto from '../TarjetaProducto/TarjetaProducto';

function Productos({ Mensaje }) {

    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {

        fetch('/data/productos.json')

            .then((respuesta) => {

                if (!respuesta.ok) {
                    throw new Error('No se pudo cargar la información');
                }

                return respuesta.json();
            })

            .then((datos) => {
                setProductos(datos);
            })

            .catch((error) => {
                setError(error.message);
            })

            .finally(() => {
                setCargando(false);
            });

    }, []);

    if (cargando) {
        return <h2>Cargando productos...</h2>;
    }

    if (error) {
        return <h2>Error: {error}</h2>;
    }

    return (

        <div className="container mt-4">

            <h1>{Mensaje}</h1>

            <div className="row">

                {productos.map((producto) => (

                    <TarjetaProducto
                        key={producto.id}
                        {...producto}
                    />

                ))}

            </div>

        </div>
    );
}

export default Productos;