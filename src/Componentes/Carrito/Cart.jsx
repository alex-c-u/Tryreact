import React, { useState } from "react";
import { useCart } from '../../context/CartContext/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import {
    collection,
    query,
    where,
    getDocs,
    doc,
    updateDoc
} from "firebase/firestore";
import { db } from "../../firebase/config";
import styles from "../../Componentes/Carrito/Cart.module.css";

function Cart() {

    const navigate = useNavigate();

    const [codigoCupon, setCodigoCupon] = useState("");
    const [mensajeCupon, setMensajeCupon] = useState("");

    const {

        aplicarCupon,
        descuento,
        getCartTotal,
        getTotalConDescuento,
        cart,
        updateQuantity,
        removeFromCart,
        clearCart,

    } = useCart();


    const aplicarCodigo = async () => {

        const respuesta = await aplicarCupon(codigoCupon);

        setMensajeCupon(respuesta.mensaje);

    };


    const finalizarCompra = async () => {

        try {

            for (const item of cart) {

                const consulta = query(
                    collection(db, "productos"),
                    where("id", "==", item.id)
                );

                const respuesta = await getDocs(consulta);

                if (respuesta.empty) {
                    alert(`No se encontró el producto ${item.nombre}`);
                    return;
                }

                const documento = respuesta.docs[0];

                const datos = documento.data();

                if (datos.stock < item.quantity) {

                    alert(
                        `No hay suficiente stock de ${item.nombre}.`
                    );

                    return;
                }

                await updateDoc(

                    doc(db, "productos", documento.id),

                    {

                        stock: datos.stock - item.quantity

                    }

                );

            }

            clearCart();

            alert("¡Gracias por tu compra!");

            navigate("/");

        }

        catch (error) {

            console.error(error);

            alert("Ocurrió un error al finalizar la compra.");

        }

    };


    if (cart.length === 0) {

        return (

            <div className="container mt-5 text-center">

                <h2>Tu carrito está vacío.</h2>

                <Link
                    to="/productos"
                    className="btn btn-primary mt-3"
                >
                    ¡Empeza a comprar!
                </Link>

            </div>

        );

    }


    return (

        <div className={styles.container}>

            <h2 className={styles.titulo}>Mi carrito</h2>

            {

                cart.map(item => (

                    <div
                        key={item.cartId}
                        className={`card mb-3 ${styles.cardProducto}`}
                    >

                        <div className="row g-0">

                            <div className="col-md-3 text-center">

                                <img
                                    src={item.imagen}
                                    alt={item.nombre}
                                    className={styles.imagen}
                                />

                            </div>

                            <div className="col-md-9">

                                <div className="card-body">

                                    <h4>{item.nombre}</h4>

                                    {

                                        item.variante && (

                                            <p>

                                                <strong>Variante:</strong>{" "}

                                                {item.variante.nombre}

                                            </p>

                                        )

                                    }

                                    <p>

                                        Precio: ${item.precio}

                                    </p>

                                    <div className="d-flex align-items-center gap-3">

                                        <button
                                            className="btn btn-danger"
                                            onClick={() => {

                                                if (item.quantity === 1) {

                                                    removeFromCart(item.cartId);

                                                }

                                                else {

                                                    updateQuantity(

                                                        item.cartId,

                                                        item.quantity - 1

                                                    );

                                                }

                                            }}
                                        >

                                            -

                                        </button>

                                        <span className={styles.cantidad}>

                                            {item.quantity}

                                        </span>

                                        <button
                                            className="btn btn-success"
                                            onClick={() =>
                                                updateQuantity(
                                                    item.cartId,
                                                    item.quantity + 1
                                                )
                                            }
                                            disabled={item.quantity >= item.stock}
                                        >

                                            +

                                        </button>

                                    </div>

                                    <p className="mt-3">

                                        <strong>Subtotal:</strong>

                                        {" "}

                                        $

                                        {item.precio * item.quantity}

                                    </p>

                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={() =>
                                            removeFromCart(item.cartId)
                                        }
                                    >

                                        Eliminar

                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                ))

            }

            <hr />

            <div className={`card ${styles.cupon}`}>

                <div className="card-body">

                    <h5>Cupón de descuento</h5>

                    <div className="input-group">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ej: BIENVENIDA"
                            value={codigoCupon}
                            onChange={(e) => setCodigoCupon(e.target.value)}
                        />

                        <button
                            className="btn btn-primary"
                            onClick={aplicarCodigo}
                        >

                            Aplicar

                        </button>

                    </div>

                    {

                        mensajeCupon && (

                            <div
                                className={`alert mt-3 ${descuento > 0
                                    ? "alert-success"
                                    : "alert-danger"
                                    }`}
                            >

                                {mensajeCupon}

                            </div>

                        )

                    }

                </div>

            </div>

            <div className={styles.resumen}>

                <h5>

                    Subtotal

                    <span className="float-end">

                        ${getCartTotal().toFixed(2)}

                    </span>

                </h5>

                {

                    descuento > 0 && (

                        <h5 className="text-success">

                            Descuento ({descuento}%)

                            <span className="float-end">

                                -$

                                {(getCartTotal() * descuento / 100).toFixed(2)}

                            </span>

                        </h5>

                    )

                }

                <hr />

                <h4 className={styles.total}>

                    Total

                    <span className="float-end">

                        ${getTotalConDescuento().toFixed(2)}

                    </span>

                </h4>

            </div>

            <div className={styles.botones}>

                <button
                    className="btn btn-warning"
                    onClick={clearCart}
                >

                    Vaciar carrito

                </button>

                <button
                    className="btn btn-success"
                    onClick={finalizarCompra}
                >

                    Finalizar compra

                </button>

            </div>

        </div>

    );

}

export default Cart;