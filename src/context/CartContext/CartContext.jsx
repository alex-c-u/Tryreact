import React, { useState, useContext, createContext } from 'react';
export const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error('useCart debe ser usado dentro de un CartProvider');
    }

    return context;
};

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([]);

    const addToCart = (product, quantity) => {

        const itemInCart = cart.find(
            item => item.id === product.id
        );

        if (itemInCart) {

            const updatedCart = cart.map(item =>
                item.id === product.id
                    ? {
                        ...item,
                        quantity: item.quantity + quantity
                    }
                    : item
            );

            setCart(updatedCart);

        } else {

            setCart(prevCart => [
                ...prevCart,
                {
                    ...product,
                    quantity
                }
            ]);
        }
    };

    const updateCartQuantity = (productId, quantity) => {

        if (quantity <= 0) {

            setCart(prevCart =>
                prevCart.filter(item => item.id !== productId)
            );

            return;
        }

        setCart(prevCart =>
            prevCart.map(item =>
                item.id === productId
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const getCartQuantity = () => {
        return cart.reduce(
            (acc, item) => acc + item.quantity,
            0
        );
    };

    const getCartTotal = () => {
        return cart.reduce(
            (acc, item) => acc + item.precio * item.quantity,
            0
        );
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                updateCartQuantity,
                clearCart,
                getCartQuantity,
                getCartTotal
            }}
        >
            {children}
        </CartContext.Provider>
    );
};