import React, { createContext, useContext, useState } from 'react';

type CartContextType = {
    cartCount: number;
    setCartCount: React.Dispatch<React.SetStateAction<number>>;
    cartItems: { [key: string]: boolean };
    setCartItems: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
    disabledButtons: { [key: string]: boolean };
    setDisabledButtons: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
};

type DocCartContextType = {
    docCartCount: number;
    setDocCartCount: React.Dispatch<React.SetStateAction<number>>;
    docCartItems: { [key: string]: boolean };
    setDocCartItems: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
    docDisabledButtons: { [key: string]: boolean };
    setDocDisabledButtons: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
};

const CartContext = createContext<CartContextType | null>(null);

const DocCartContext = createContext<DocCartContextType | null>(null); 

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
};

export const useDocCart = () => {
    const context = useContext(DocCartContext);
    if (!context) throw new Error("useDocCart must be used within a CartProvider");
    return context;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartCount, setCartCount] = useState(0);
    const [cartItems, setCartItems] = useState<{ [key: string]: boolean }>({});
    const [disabledButtons, setDisabledButtons] = useState<{ [key: string]: boolean }>({});

    return (
        <CartContext.Provider
            value={{ cartCount, setCartCount, cartItems, setCartItems, disabledButtons, setDisabledButtons }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const DocCartProvider = ({ children }: { children: React.ReactNode }) => {
    const [docCartCount, setDocCartCount] = useState(0);
    const [docCartItems, setDocCartItems] = useState<{ [key: string]: boolean }>({});
    const [docDisabledButtons, setDocDisabledButtons] = useState<{ [key: string]: boolean }>({});

    return (
        <DocCartContext.Provider
            value={{ docCartCount, setDocCartCount, docCartItems, setDocCartItems, docDisabledButtons, setDocDisabledButtons }}
        >
            {children}
        </DocCartContext.Provider>
    );
};