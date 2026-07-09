import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/config";
import Productos from '../Productos';

function ProductoDetalle() {

    const { id } = useParams();

    const [producto, setProducto] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        if (!id) return;

        const obtenerProducto = async () => {

            try {
                //  para ver pq no me traia el producto 

                console.log("ID de la URL:", id);   

                const queryId = query(
                    collection(db, "productos"),
                    where("id", "==", Number(id))
                );

                const respuesta = await getDocs(queryId);
                //ver que encuentra el await
                console.log("Cantidad de documentos:", respuesta.size);
                if (respuesta.empty) {

                    setError("Producto no encontrado");
                    return;

                }

                const productoEncontrado = {
                    ...respuesta.docs[0].data(),
                    idFirestore: respuesta.docs[0].id
                };

                setProducto(productoEncontrado);

            } catch (error) {

                console.error(error);
                setError("Error al cargar el producto");

            } finally {

                setCargando(false);

            }

        };

        obtenerProducto();

    }, [id]);

    if (cargando) {
        return <h2>Cargando detalle del producto...</h2>;
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    return (

        <div className="container mt-4">

            <h2>{producto.nombre}</h2>

            <img
                src={producto.imagen}
                alt={producto.nombre}
                style={{
                    maxWidth: "300px",
                    width: "100%"
                }}
            />

            <h4 className="mt-3">
                ${producto.precio}
            </h4>

            {
                producto.stock && (
                    <p>
                        Stock: {producto.stock}
                    </p>
                )
            }
            {/* // hacer que aparesca la descripcion aca */}
            {
                producto.variantes?.length > 0 && (

                    <div>

                        <h5>Variantes</h5>

                        {
                            producto.variantes.map((variante) => (

                                <div key={variante.id}>

                                    {variante.nombre}

                                    {" - "}

                                    Stock: {variante.stock}

                                </div>

                            ))
                        }

                    </div>

                )
            }

        </div>

    );

}

export default ProductoDetalle;