import React, { createContext, useContext, useState } from "react";

type CartItem = {
  id: string | number;
  name: string;
  price: number;
  store: string;
  category: string;
  image: any;
  quantity: number;
};

type DocCartItem = {
  id: string | number;
  name: string;
  price: number;
  store: string;
  category: string;
  image: any;
  quantity: number;
};

type CartContextType = {
  cartCount: number;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
  cartItems: { [key: string]: CartItem };
  setCartItems: React.Dispatch<
    React.SetStateAction<{ [key: string]: CartItem }>
  >;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  disabledButtons: { [key: string]: boolean };
  setDisabledButtons: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >;
};

type DocCartContextType = {
  docCartCount: number;
  setDocCartCount: React.Dispatch<React.SetStateAction<number>>;
  docCartItems: { [key: string]: DocCartItem };
  setDocCartItems: React.Dispatch<
    React.SetStateAction<{ [key: string]: DocCartItem }>
  >;
  addToCart: (item: Omit<DocCartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  docDisabledButtons: { [key: string]: boolean };
  setDocDisabledButtons: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >;
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
  if (!context)
    throw new Error("useDocCart must be used within a CartProvider");
  return context;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartCount, setCartCount] = useState<number>(0);
  const [cartItems, setCartItems] = useState<{ [key: string]: CartItem }>({});
  const [disabledButtons, setDisabledButtons] = useState<{
    [key: string]: boolean;
  }>({});

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCartItems((prev) => {
      const existingItem = prev[item.id];
      if (existingItem) {
        return {
          ...prev,
          [item.id]: {
            ...existingItem,
            quantity: existingItem.quantity + 1,
            image: item.image, // Ensure image is preserved
          },
        };
      }
      return {
        ...prev,
        [item.id]: {
          ...item,
          quantity: 1,
          image: item.image,
        },
      };
    });
    setCartCount((prev) => prev + 1);
    setDisabledButtons((prev) => ({ ...prev, [item.id]: true }));
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => {
      const newItems = { ...prev };
      delete newItems[id];
      return newItems;
    });
    setCartCount((prev) => prev - 1);
    setDisabledButtons((prev) => ({ ...prev, [id]: false }));
  };

  return (
    <CartContext.Provider
      value={{
        cartCount,
        setCartCount,
        cartItems,
        setCartItems,
        disabledButtons,
        setDisabledButtons,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const DocCartProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [docCartCount, setDocCartCount] = useState<number>(0);
  const [docCartItems, setDocCartItems] = useState<{ [key: string]: DocCartItem }>(
    {}
  );
  const [docDisabledButtons, setDocDisabledButtons] = useState<{
    [key: string]: boolean;
  }>({});

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setDocCartItems((prev) => {
      const existingItem = prev[item.id];
      if (existingItem) {
        return {
          ...prev,
          [item.id]: {
            ...existingItem,
            quantity: existingItem.quantity + 1,
            image: item.image, // Ensure image is preserved
          },
        };
      }
      return {
        ...prev,
        [item.id]: {
          ...item,
          quantity: 1,
          image: item.image,
        },
      };
    });
    setDocCartCount((prev) => prev + 1);
    setDocDisabledButtons((prev) => ({ ...prev, [item.id]: true }));
  };

  const removeFromCart = (id: string) => {
    setDocCartItems((prev) => {
      const newItems = { ...prev };
      delete newItems[id];
      return newItems;
    });
    setDocCartCount((prev) => prev - 1);
    setDocDisabledButtons((prev) => ({ ...prev, [id]: false }));
  };

  return (
    <DocCartContext.Provider
      value={{
        docCartCount,
        setDocCartCount,
        docCartItems,
        setDocCartItems,
        docDisabledButtons,
        setDocDisabledButtons,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </DocCartContext.Provider>
  );
};
