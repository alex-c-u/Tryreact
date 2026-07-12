import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs, deleteDoc, doc, updateDoc, addDoc } from "firebase/firestore";
import FormularioProducto from '../FormularioProducto/FormularioProducto';


const Gestion = () => {

    const [productos, setProductos] = useState([]);

    const estadoInicialForm = {
        id: "",
        nombre: "",
        categoria: "",
        marca: "",
        precio: "",
        stock: "",
        detalle: "",
        imagen: "",
        destacado: false
    };

    const [datosForm, setDatosForm] = useState(estadoInicialForm);

    const [imagenFile, setImagenFile] = useState(null);

    const [loading, setLoading] = useState(false);

    const [errores, setErrores] = useState({});

    const manejarCambio = (evento) => {
        const { name, value } = evento.target;
        setDatosForm({
            ...datosForm,
            [name]: value
        });
    };

    const manejarCambioImagen = (evento) => {
        setImagenFile(evento.target.files[0]);
    };

    const CargarProductos = async () => {
        const productosRef = collection(db, "productos");
        const resp = await getDocs(productosRef);
        setProductos(
            resp.docs.map((doc) => ({ ...doc.data(), idFirestore: doc.id }))
        );
    };


    useEffect(() => {
        CargarProductos();

    }, []);



    const handleDelete = async (id) => {
        const confirmacion = window.confirm("¿Está seguro de que desea eliminar este producto? ");
        if (confirmacion) {
            const docRef = doc(db, "productos", id);
            await deleteDoc(docRef);
            
            setProductos(productos.filter(prod => prod.id !== id));
            alert("Producto eliminado.");
        }
    }

    const [productoAEditar, setProductoAEditar] = useState(null);
    const manejarEditar = (producto) => {
        setProductoAEditar(producto);
        setDatosForm(producto)
    };

    const modoEdicion = productoAEditar !== null;

    const manejarEnvio = async (evento) => {
        evento.preventDefault();
        evento.preventDefault();

        const nuevosErrores = {};

        if (!datosForm.id) {
            nuevosErrores.id = "Ingrese un ID.";
        }

        if (!datosForm.nombre.trim()) {
            nuevosErrores.nombre = "Ingrese un nombre.";
        }

        if (!datosForm.categoria.trim()) {
            nuevosErrores.categoria = "Ingrese una categoría.";
        }

        if (!datosForm.marca.trim()) {
            nuevosErrores.marca = "Ingrese una marca.";
        }

        if (!datosForm.precio) {
            nuevosErrores.precio = "Ingrese un precio.";
        }

        if (!datosForm.stock) {
            nuevosErrores.stock = "Ingrese el stock.";
        }

        if (!datosForm.detalle.trim()) {
            nuevosErrores.detalle = "Ingrese una descripción.";
        }

        if (!imagenFile && !productoAEditar) {
            nuevosErrores.imagen = "Seleccione una imagen.";
        }

        if (Object.keys(nuevosErrores).length > 0) {
            setErrores(nuevosErrores);
            return;
        }

        setErrores({});

        setLoading(true);
        setLoading(true);
        console.log("Loading...")

        
        const apiKey = '08a248e8e0ba55f2b3e8e183d38fb195'; 
        const formData = new FormData();
        formData.append('image', imagenFile);

        let urlImagen = datosForm.imagen;

        try {
            if (imagenFile) {
                const formData = new FormData();
                formData.append("image", imagenFile);

                console.log("Subiendo imagen a ImgBB...");

                const respuestaImgbb = await
                    fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                        method: 'POST',
                        body: formData,
                    });

                const datosImgbb = await respuestaImgbb.json();


                if (datosImgbb.success) {
                    console.log("Imagen subida con éxito. URL:", datosImgbb.data.url);

                    urlImagen = datosImgbb.data.url;

                } else {
                    throw new Error('La subida de la imagen a Imgbb falló.');
                }
            }

            const productoCompleto = {
                id: Number(datosForm.id),
                nombre: datosForm.nombre.trim(),
                categoria: datosForm.categoria.trim(),
                marca: datosForm.marca.trim(),
                precio: Number(datosForm.precio),
                stock: Number(datosForm.stock),
                detalle: datosForm.detalle.trim(),
                destacado: Boolean(false),
                imagen: urlImagen
            };
            // Por el momento hacemos un console.log
            console.log('Enviando producto a Firebase:', productoCompleto);


            const productosCollection = collection(db, "productos");

            if (productoAEditar) {
                const docRef = doc(
                    db,
                    "productos",
                    productoAEditar.idFirestore
                );

                await updateDoc(docRef, productoCompleto);
                alert("Producto actualizado correctamente");
            } else {
                await addDoc(productosCollection, productoCompleto);
                alert("Producto guardado correctamente");
            }

            await CargarProductos();

            setDatosForm(estadoInicialForm);
            setImagenFile(null);
            setProductoAEditar(null);

        }

        catch (error) {
            console.error("Error en el proceso de envío:", error);
            alert("Hubo un error al subir la imagen. Por favor, intentá denuevo.");
        }

        finally {
            setLoading(false);

        }
       
    };

    return (
        <div>
            <h2>Gestión de Productos</h2>
            <hr />
            <FormularioProducto
                datosForm={datosForm}
                manejarCambio={manejarCambio}
                manejarCambioImagen={manejarCambioImagen}
                manejarEnvio={manejarEnvio}
                loading={loading}
                modoEdicion={modoEdicion}
                errores={errores}
            />

            <hr />
            <div className="table-responsive">

                <table className="table table-striped table-bordered align-middle">

                    <thead className="table-dark">

                        <tr>
                            <th>Imagen</th>

                            <th>ID Producto</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Acciones</th>
                        </tr>

                    </thead>

                    <tbody>

                        {productos.map((prod) => (

                            <tr key={prod.idFirestore}>

                                <td style={{ width: "90px" }}>

                                    {prod.imagen && (

                                        <img
                                            src={prod.imagen}
                                            alt={prod.nombre}
                                            style={{
                                                width: "70px",
                                                height: "70px",
                                                objectFit: "cover",
                                                borderRadius: "8px"
                                            }}
                                        />

                                    )}

                                </td>

                                <td>{prod.id}</td>

                                <td>{prod.nombre}</td>

                                <td>${prod.precio}</td>

                                <td>{prod.stock}</td>

                                <td>

                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => manejarEditar(prod)}
                                    >
                                        Editar
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(prod.idFirestore)}
                                    >
                                        Eliminar
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div >
    );
};

export default Gestion;