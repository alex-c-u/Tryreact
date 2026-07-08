import React, { createContext, useContext, useState } from "react";

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

    // Agregar un producto

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

    // Cambiar cantidad

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

    // Eliminar un producto

    const removeFromCart = (cartId) => {

        setCart(prevCart =>

            prevCart.filter(item => item.cartId !== cartId)

        );

    };

    // Vaciar carrito

    const clearCart = () => {

        setCart([]);

    };

    // Cantidad total de productos

    const getCartQuantity = () => {

        return cart.reduce(

            (total, item) => total + item.quantity,

            0

        );

    };

    // Precio total

    const getCartTotal = () => {

        return cart.reduce(

            (total, item) => total + (item.precio * item.quantity),

            0

        );

    };

    return (

        <CartContext.Provider

            value={{

                cart,

                addToCart,

                updateQuantity,

                removeFromCart,

                clearCart,

                getCartQuantity,

                getCartTotal

            }}

        >

            {children}

        </CartContext.Provider>

    );

};

    //asegurarme que ande el removeItem
    //asegurarme que ande isInCart
    //ver si me gustan asi o hacerlos de otra forma