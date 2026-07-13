import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/config';
import TarjetaProducto from '../TarjetaProducto/TarjetaProducto';


function Productos({ Mensaje, soloDestacados = false }) {

    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {

        const obtenerProductos = async () => {

            try {

                let consulta;

                if (soloDestacados) {

                    consulta = query(
                        collection(db, "productos"),
                        where("destacado", "==", true)
                    );

                } else {

                    consulta = collection(db, "productos");

                }

                const respuesta = await getDocs(consulta);

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

    }, [soloDestacados]);

    if (cargando) {
        return <h2>Cargando productos...</h2>;
    }

    if (error) {
        return <h2>Error: {error}</h2>;
    }

    if (productos.length === 0) {
        return <h2>No hay productos para mostrar.</h2>;
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