import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MensajeInfo from "../components/MensajeInfo";
import { UserContext } from '../store/UserContext';
import { CartContext } from '../store/CartContext';

const Cart = () => {
  const { user } = useContext(UserContext);
  const { cartItems, removeFromCart, updateQuantity, total } = useContext(CartContext);

  if (!user) {
    return (
      <>
        <Navbar />
        <MensajeInfo
          emoji="🚫"
          mensaje="Debes iniciar sesión"
          botonTexto="Ir a Login"
          botonLink="/login"
          color="red"
        />
      </>
    );
  }

  if (cartItems.length === 0) {
    return (
      <>
        <Navbar />
        <MensajeInfo
          emoji="🛒"
          mensaje="Tu carrito está vacío."
          botonTexto="Ir a productos"
          botonLink="/productos"
          color="#ff9800"
        />
      </>
    );
  }

  // Sumar cantidades de todos los productos en el carrito
  const cantidadTotal = cartItems.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <div>
      <Navbar />
      <div className="cart-container">
        <h2>Tu Carrito</h2>

        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.imagen} alt={item.nombre} />
                <div className="item-details">
                  <h4>{item.nombre}</h4>
                  <p className="tipo">{item.tipo}</p>
                  <p className="price">
                    Total: ${(item.precio * item.cantidad).toLocaleString()}
                  </p>

                  <div className="item-quantity">
                    <button onClick={() => updateQuantity(item.id, item.cantidad - 1)}>-</button>
                    <span>{item.cantidad}</span>
                    <button onClick={() => updateQuantity(item.id, item.cantidad + 1)}>+</button>
                  </div>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>✖</button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Resumen</h3>
            <p>Cantidad: <strong>{cantidadTotal}</strong></p>
            <p>Total: <strong>${total.toLocaleString()}</strong></p>
            <button className="checkout-btn">Finalizar compra</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
