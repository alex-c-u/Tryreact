import React, { createContext, useContext, useState } from "react";
import {
    collection,
    query,
    where,
    getDocs
} from "firebase/firestore";

import { db } from "../../firebase/config";

export const CartContext = createContext();

export const useCart = () => {
const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart debe ser usado dentro de un CartProvider");
    }

    return context;
};

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([]);

    const [descuento, setDescuento] = useState(0);

    const [cuponAplicado, setCuponAplicado] = useState(null);

    // ==========================
    // Agregar producto
    // ==========================

    const addToCart = (producto, quantity = 1) => {

        setCart((prevCart) => {

            const itemExistente = prevCart.find(
                item => item.cartId === producto.cartId
            );

            if (itemExistente) {

                return prevCart.map(item =>

                    item.cartId === producto.cartId
                        ? {
                            ...item,
                            quantity: item.quantity + quantity
                        }
                        : item

                );

            }

            return [

                ...prevCart,

                {
                    ...producto,
                    quantity
                }

            ];

        });

    };

    // ==========================
    // Actualizar cantidad
    // ==========================

    const updateQuantity = (cartId, quantity) => {

        if (quantity <= 0) {

            removeFromCart(cartId);

            return;

        }

        setCart(prevCart =>

            prevCart.map(item =>

                item.cartId === cartId
                    ? {
                        ...item,
                        quantity
                    }
                    : item

            )

        );

    };

    // ==========================
    // Eliminar producto
    // ==========================

    const removeFromCart = (cartId) => {

        setCart(prevCart =>

            prevCart.filter(item => item.cartId !== cartId)

        );

    };

    // ==========================
    // Vaciar carrito
    // ==========================

    const clearCart = () => {

        setCart([]);

        setDescuento(0);

        setCuponAplicado(null);

    };

    // ==========================
    // Cantidad total
    // ==========================

    const getCartQuantity = () => {

        return cart.reduce(

            (total, item) => total + item.quantity,

            0

        );

    };

    // ==========================
    // Subtotal
    // ==========================

    const getCartTotal = () => {

        return cart.reduce(

            (acc, item) => acc + item.precio * item.quantity,

            0

        );

    };

    // ==========================
    // Total con descuento
    // ==========================

    const getTotalConDescuento = () => {

        const total = getCartTotal();

        return total - (total * descuento) / 100;

    };

    // ==========================
    // Aplicar cupón
    // ==========================

    const aplicarCupon = async (codigo) => {

        const consulta = query(

            collection(db, "cupones"),

            where("codigo", "==", codigo.toUpperCase())

        );

        const respuesta = await getDocs(consulta);

        if (respuesta.empty) {

            setDescuento(0);

            setCuponAplicado(null);

            return {

                ok: false,

                mensaje: "Cupón inexistente."

            };

        }

        const cupon = respuesta.docs[0].data();

        setDescuento(cupon.descuento);

        setCuponAplicado(cupon.codigo);

        return {

            ok: true,

            mensaje: `Cupón ${cupon.codigo} aplicado (${cupon.descuento}% de descuento).`

        };

    };

    // ==========================
    // Provider
    // ==========================

    return (

        <CartContext.Provider

            value={{

                cart,

                addToCart,

                updateQuantity,

                removeFromCart,

                clearCart,

                getCartQuantity,

                getCartTotal,

                getTotalConDescuento,

                descuento,

                cuponAplicado,

                aplicarCupon

            }}

        >

            {children}

        </CartContext.Provider>

    );

};