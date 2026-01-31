import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        try {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                const parsed = JSON.parse(savedCart);
                return Array.isArray(parsed) ? parsed : [];
            }
        } catch (error) {
            console.error("Error parsing cart from localStorage", error);
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item._id === product._id);
            if (existingItem) {
                toast.success(`Updated ${product.name} quantity`);
                return prevCart.map((item) =>
                    item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            toast.success(`${product.name} added to cart!`);
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
        toast.error('Removed from cart');
    };

    const updateQuantity = (productId, amount) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item._id === productId
                    ? { ...item, quantity: Math.max(1, item.quantity + amount) }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('cart');
    };

    const totalAmount = cart.reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0);
    const totalItems = cart.reduce((total, item) => total + (item.quantity || 0), 0);

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            totalAmount,
            totalItems
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
