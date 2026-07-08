import React from 'react';
import { useCart } from '../../context/CartContext/CartContext';
import { Link } from 'react-router-dom';


function Cart() {

    const {
        cart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getCartTotal
    } = useCart();

    if (cart.length === 0) {

        return (

            <div className="container mt-5">

                <h2>Tu carrito está vacío.</h2>

            </div>

        );

    }

    return (

        <div className="container mt-4">

            <h2>Mi carrito</h2>

            {

                cart.map(item => (

                    <div

                        key={item.cartId}

                        className="card mb-3"

                    >

                        <div className="row g-0">

                            <div className="col-md-3 text-center">

                                <img

                                    src={item.imagen}

                                    alt={item.nombre}

                                    className="img-fluid rounded p-2"

                                    style={{

                                        maxHeight: "180px",

                                        objectFit: "contain"

                                    }}

                                />

                            </div>

                            <div className="col-md-9">

                                <div className="card-body">

                                    <h4>

                                        {item.nombre}

                                    </h4>

                                    {

                                        item.variante && (

                                            <p>

                                                <strong>

                                                    Variante:

                                                </strong>

                                                {" "}

                                                {item.variante.nombre}

                                            </p>

                                        )

                                    }

                                    <p>

                                        Precio:

                                        ${item.precio}

                                    </p>

                                    <div

                                        className="d-flex align-items-center gap-3"

                                    >

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

                                        <span>

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

                                            disabled={

                                                item.quantity >= item.stock

                                            }

                                        >

                                            +

                                        </button>

                                    </div>

                                    <p className="mt-3">

                                        <strong>

                                            Subtotal:

                                        </strong>

                                        {" "}

                                        $

                                        {

                                            item.precio *

                                            item.quantity

                                        }

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

            <h3>

                Total:

                ${getCartTotal()}

            </h3>

            <button

                className="btn btn-warning"

                onClick={clearCart}

            >

                Vaciar carrito

            </button>
            
            <button
                
                className="btn-finalizar"

                onClick={()=>
                {
                    clearCart()
                    alert("Gracias por compra")
                }
                }

            >

                Finalizar Compra

            </button>

        </div>

    );

}

export default Cart;

{/* <Link to="/" onClick={() => {
                clearCart()
                alert("Gracias por comprar")
                }} className="btn-finalizar">
                Finalizar Compra
</Link> */}
