import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs, deleteDoc, doc, updateDoc, addDoc } from "firebase/firestore";

const estadoInicial = {
    codigo: "",
    descuento: ""
};

const GestionCupones = () => {

    const [datosForm, setDatosForm] = useState(estadoInicial);
    const [cupones, setCupones] = useState([]);
    const [cuponAEditar, setCuponAEditar] = useState(null);

    const obtenerCupones = async () => {

        const respuesta = await getDocs(collection(db, "cupones"));

        const lista = respuesta.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        setCupones(lista);
    };

    useEffect(() => {
        obtenerCupones();
    }, []);

    const manejarCambio = (e) => {

        setDatosForm({
            ...datosForm,
            [e.target.name]: e.target.value
        });

    };

    const manejarEnvio = async (e) => {

        e.preventDefault();

        if (!datosForm.codigo || !datosForm.descuento) {
            alert("Complete todos los campos");
            return;
        }

        if (cuponAEditar) {

            await updateDoc(
                doc(db, "cupones", cuponAEditar.id),
                {
                    codigo: datosForm.codigo,
                    descuento: Number(datosForm.descuento)
                }
            );

        } else {

            await addDoc(
                collection(db, "cupones"),
                {
                    codigo: datosForm.codigo,
                    descuento: Number(datosForm.descuento)
                }
            );

        }

        setDatosForm(estadoInicial);
        setCuponAEditar(null);

        await obtenerCupones();

    };
 
    const editarCupon = (cupon) => {

        setCuponAEditar(cupon);

        setDatosForm({
            codigo: cupon.codigo,
            descuento: cupon.descuento
        });

    };

    const eliminarCupon = async (id) => {

        await deleteDoc(doc(db, "cupones", id));

        if (cuponAEditar?.id === id) {
            setCuponAEditar(null);
            setDatosForm(estadoInicial);
        }

        obtenerCupones();

    };

    const cancelarEdicion = () => {
        setCuponAEditar(null);
        setDatosForm(estadoInicial);
    };

    return (
        <div>

            <h2>Gestión de Cupones</h2>

            <form onSubmit={manejarEnvio}>

                <input
                    type="text"
                    name="codigo"
                    placeholder="Código"
                    value={datosForm.codigo}
                    onChange={manejarCambio}
                />

                <input
                    type="number"
                    name="descuento"
                    placeholder="Descuento"
                    value={datosForm.descuento}
                    onChange={manejarCambio}
                />

                <button type="submit">
                    {cuponAEditar ? "Actualizar Cupón" : "Crear Cupón"}
                </button>

                {
                    cuponAEditar &&
                    <button
                        type="button"
                        onClick={cancelarEdicion}
                    >
                        Cancelar
                    </button>
                }

            </form>

            <hr />

            <h3>Cupones vigentes</h3>

            <div className="table-responsive">

                <table className="table table-striped table-bordered align-middle">

                    <thead className="table-dark">

                        <tr>
                            <th>Codigo Cupon</th>
                            <th>Descuento</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {cupones.map((cupon) => (

                            <tr key={cupon.id}>

                                <td>{cupon.codigo}</td>

                                <td>{cupon.descuento}%</td>

                                <td>

                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => editarCupon(cupon)}
                                    >
                                        Editar
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => eliminarCupon(cupon.id)}
                                    >
                                        Eliminar
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
};


export default GestionCupones;