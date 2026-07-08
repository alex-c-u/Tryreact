import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/config";
import Productos from '../Productos';

const ProductoDetalle = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);

    useEffect(() => {
        // fetch('')
        //     .then(response => response.json())
        //     .then(data => {
        //         const productoEncontrado = data.find(p.id ===)
        //         setProducto(productoEncontrado);
        //     })
        //     .catch(error => console.error("Error al cargar el producto."))


        if (!id) return;

        //para buscar con id de firestore:
        // const docRef = doc(db, "productos", id);

        //para buscar con id de producto:
        const queryId = query(
            collection(db, "productos"),
            where("id", "==", Number(id))
        );


        getDocs(queryId)
            .then((resp) => {
                if (resp.empty) {
                    console.log("no se encontro el producto");
                    return;
                }

                setProducto({
                    ...resp.docs[0].data(),
                    idFirestore: resp.docs[0].id
                })
                // i f (resp.exists()) { // Verificamos si el documento existe
                //     setProducto({ ...resp.data(), id: resp.id });
                // } else {
                //     console.log("No se encontró el producto");
                // }

            })
            .catch((error) => {
                console.error("error al cargar el producto:")
            });
    }, [id]);
    if (!producto) {
        return <h2>Cargargando detalle del producto...</h2>
    }
    if (!producto.id) {
        <h2> producto no encontrado</h2>
    }

    return (
        <div>
            <h2>Detalle del Producto</h2>
            <Productos {...producto} />
        </div>
    )
}

export default ProductoDetalle;