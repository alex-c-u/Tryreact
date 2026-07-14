import { useState } from 'react';
import { useCart } from '../../context/CartContext/CartContext';
import { Link } from 'react-router-dom';
import styles from "./TarjetaProducto.module.css";

function TarjetaProducto({ id, nombre, precio, imagen, stock, variantes = []
}) {

    const { addToCart, updateQuantity, removeFromCart } = useCart();

    const [favorito, setFavorito] = useState(false);

    const [cantidad, setCantidad] = useState(0);

    const [varianteSeleccionada, setVarianteSeleccionada] = useState(
        variantes.length > 0 ? variantes[0] : null
    );

    const stockDisponible = varianteSeleccionada
        ? varianteSeleccionada.stock
        : stock;

    const precioActual = varianteSeleccionada?.precio || precio;

    const imagenActual = varianteSeleccionada?.imagen || imagen;

    const toggleFavorito = () => {
        setFavorito(!favorito);
    };

    const cartId = varianteSeleccionada
        ? `${id}-${varianteSeleccionada.id}`
        : id;
    const producto = {
        cartId,
        id,
        nombre,
        precio: precioActual,
        imagen: imagenActual,
        variante: varianteSeleccionada || null,
        stock: stockDisponible
    };

    const agregarProducto = () => {
        if (cantidad >= stockDisponible) return;

        const nuevaCantidad = cantidad + 1;

        setCantidad(nuevaCantidad);

        if (cantidad === 0) {

            addToCart(producto, 1);

        } else {

            updateQuantity(cartId, nuevaCantidad);

        }

    };

    const quitarProducto = () => {

        if (cantidad === 0) return;

        const nuevaCantidad = cantidad - 1;

        setCantidad(nuevaCantidad);

        if (nuevaCantidad === 0) {

            removeFromCart(cartId);

        } else {

            updateQuantity(cartId, nuevaCantidad);

        }

    };

    return (

        <div className="col-md-4 mb-4">

            <div className={`card h-100 ${styles.card}`}>

                <img
                    src={imagenActual}
                    className={`card-img-top ${styles.cardImg}`}
                    alt={nombre}
                />

                <div className="card-body">

                    <h5>{nombre}</h5>

                    <h6>  ${precioActual}  </h6>

                    <Link to={`/productos/${id}`} > Ver detalle </Link>

                    {
                        variantes.length > 0 && (

                            <>

                                <p className="mb-1">

                                    <strong>Color</strong>

                                </p>

                                <div className="d-flex gap-2 mb-3">

                                    {
                                        variantes.map((variante) => (

                                            <button

                                                key={variante.id}

                                                title={variante.nombre}

                                                onClick={() => {

                                                    setVarianteSeleccionada(variante);

                                                    setCantidad(0);

                                                }}

                                                style={{
                                                    width: "30px",
                                                    height: "30px",
                                                    borderRadius: "50%",
                                                    border:

                                                        varianteSeleccionada.id === variante.id

                                                            ? "3px solid black"

                                                            : "1px solid #ccc",

                                                    backgroundColor: variante.color,

                                                    cursor: "pointer"
                                                }}

                                            />

                                        ))
                                    }

                                </div>

                            </>

                        )
                    }

                    <p>
                        Stock:
                        <strong> {stockDisponible} </strong>
                    </p>



                    {

                        cantidad === 0 ? (

                            <button

                                className="btn btn-primary w-100"

                                onClick={agregarProducto}

                            >

                                Agregar al carrito

                            </button>

                        ) : (

                            <div className="d-flex justify-content-center align-items-center gap-3">

                                <button

                                    className="btn btn-danger"

                                    onClick={quitarProducto}

                                >

                                    -

                                </button>

                                <span
                                    style={{
                                        fontWeight: "bold",
                                        fontSize: "18px"
                                    }}
                                >

                                    {cantidad}

                                </span>

                                <button

                                    className="btn btn-success"

                                    onClick={agregarProducto}

                                    disabled={
                                        cantidad >= stockDisponible
                                    }

                                >

                                    +

                                </button>

                            </div>

                        )

                    }

                    <div className="text-end mt-3">

                        <span

                            className={styles.estrella}

                            style={{
                                cursor: "pointer",
                                fontSize: "28px"
                            }}

                            onClick={toggleFavorito}

                        >

                            {

                                favorito

                                    ? "⭐"

                                    : "☆"

                            }

                        </span>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default TarjetaProducto;