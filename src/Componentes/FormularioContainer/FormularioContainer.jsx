import React, { useState } from 'react';
import FormularioProducto from '../FormularioProducto/FormularioProducto'

import { getFirestore, collection, addDoc } from 'firebase/firestore';

export function FormularioContainer() {

    const [datosForm, setDatosForm] = useState({
        nombre: '',
        precio: '',
        stock: '',
        categoria: '',
        detalle: ''
    });
    // 1. Nuevo estado para el archivo de imagen
    const [imagenFile, setImagenFile] = useState(null);
    const manejarCambioImagen = (evento) => {
        setImagenFile(evento.target.files[0]);
    };


    const manejarCambio = (evento) => {
        const { name, value } = evento.target;
        setDatosForm({
            ...datosForm,
            [name]: value
        });
    };
    const manejarEnvio = async (evento) => {
        evento.preventDefault();
        // Validamos que el usuario haya seleccionado una imagen
        if (!imagenFile) {
            alert("Por favor, selecciona una imagen para el producto.");
            return;
        }
        // --- Lógica para subir la imagen a Imgbb ---
        const apiKey = '08a248e8e0ba55f2b3e8e183d38fb195'; // 🚨 ¡Reemplazá esto con tu clave!
        const formData = new FormData();
        formData.append('image', imagenFile);
        try {
            console.log("Subiendo imagen a Imgbb...");
            const respuestaImgbb = await
                fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                    method: 'POST',
                    body: formData,
                });
            const datosImgbb = await respuestaImgbb.json();
            if (datosImgbb.success) {
                console.log("Imagen subida con éxito. URL:", datosImgbb.data.url);
                // Unimos la URL de la imagen con el resto de los datos del formulario
                
                const productoCompleto = {
                    ...datosForm,
                    // Agregamos la URL obtenida
                    imagen: datosImgbb.data.url
                };
                // Por el momento hacemos un console.log
                console.log('Enviando producto a Firebase:', productoCompleto);
                
                const db= getFirestore();
                const productosCollection = collection (db, "productos");
                await addDoc (productosCollection, productoCompleto);
            } else {
                throw new Error('La subida de la imagen a Imgbb falló.');
            }
            //reseteamos form si todo fue exitoso
        } catch (error) {
            console.error("Error en el proceso de envío:", error);
            alert("Hubo un error al subir la imagen. Por favor, intentá denuevo.");
        }
    };
    return (
        <FormularioProducto
            datosForm={datosForm}
            manejarCambio={manejarCambio}
            manejarEnvio={manejarEnvio}
            // Pasamos la nueva función como prop
            manejarCambioImagen={manejarCambioImagen}
        />
    );


}

export default FormularioContainer;