import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (producto) => {
    setCartItems((prev) => {
      // Verifica si el producto ya existe en el carrito
      const exist = prev.find(item => item.id === producto.id);

      if (exist) {
        // Si existe, incrementa la cantidad en 1
        return prev.map(item =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }

      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => 
      prev.filter(item => item.id !== id) // Filtra y quita el producto con ese id
    );
  };

  const updateQuantity = (id, cantidad) => {
    setCartItems((prev) => {
      if (cantidad <= 0) {
        // cantidad 0 o menos elimina el producto del carrito
        return prev.filter(item => item.id !== id);
      } else {
        // mayor a 0 actualiza la cantidad
        return prev.map(item =>
          item.id === id
            ? { ...item, cantidad } // Actualiza la cantidad
            : item // Deja el resto igual
        );
      }
    });
  };

  // Calcula el total del carrito sumando precio * cantidad de cada producto
  const total = cartItems.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  const globalCart = {
    cartItems, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    total 
  }

  return (
    <CartContext.Provider value={globalCart}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;