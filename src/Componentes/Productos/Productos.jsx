import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';

import TarjetaProducto from '../TarjetaProducto/TarjetaProducto';


function Productos({ Mensaje }) {

    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);
    
    useEffect(() => {

        const obtenerProductos = async () => {

            try {

                const productosRef = collection(db, "productos");

                const respuesta = await getDocs(productosRef);

                const listaProductos = respuesta.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setProductos(listaProductos);

            } catch (error) {

                setError(error.message);

            } finally {

                setCargando(false);

            }

        };

        obtenerProductos();

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
// <Link to={`/productos/${prod.id}`}>Ver detalle</Link>