import React, { useState } from 'react';
import './css/Cart.css'; 
// Importación de dependencias necesarias para usar iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcVisa, faCcMastercard, faCcPaypal, faApplePay } from '@fortawesome/free-brands-svg-icons';

const Cart = () => {
  // Estado inicial de la cantidad seleccionada (inicialmente 1)
  const [quantity, setQuantity] = useState(1);

  // Función para manejar el cambio de cantidad seleccionada
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  return (
    <div className="cart-container">
      {/* Cabecera del carrito con logo */}
      <header className="cart-header">
        <img src="/images/logo.png" alt="logo" className='logo'/>
        <nav>
          <button className="volver">Volver al Inicio</button>
        </nav>
      </header>

      {/* Mensaje de Descuento */}
      <div className="discount-message">
        <p>Válido para tener un descuento extra de 15% después de la compra</p>
      </div>

      {/* Sección que muestra los artículos en el carrito */}
      <div className="cart-items">
        <h2>TODOS LOS ARTÍCULOS (1)</h2>
        <div className="cart-item">
          {/* Checkbox indicando que el artículo está seleccionado */}
          <input type="checkbox" checked readOnly />
          
          {/* Imagen del artículo en el carrito */}
          <img
            src="/images/mesa.jpg" 
            alt="Artículo conforthaven"
            className="cart-item-image"
          />
          
          {/* Detalles del artículo */}
          <div className="cart-item-details">
            <h3>COMFORT HAVEN</h3>
            <p>Mesa</p>
            <p>Descripción: Circular</p>
            <p>Precio: ₡50000</p>
            <br></br>
            <p>Usuarios han dado 5 estrellas</p>
          </div>

          {/* Control para cambiar la cantidad del artículo */}
          <div className="cart-item-quantity">
            <label htmlFor="quantity">Cant:</label>
            <select id="quantity" value={quantity} onChange={handleQuantityChange}>
              {/* Genera opciones de 1 a 10 para seleccionar cantidad */}
              {[...Array(10).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Resumen del pedido con precio estimado y puntos de recompensa */}
      <div className="order-summary">
        <h2>Resumen Del Pedido</h2>
        <p>Precio Estimado: </p>
        <p>Premio: 21 Puntos de COMFORT HAVEN</p>
        {/* Botón para proceder a la compra */}
        <button className="checkout-button">Comprar ahora (1)</button>
      </div>

      {/* Sección que muestra los métodos de pago aceptados */}
      <div className="payment-methods">
        <h3>Aceptamos</h3>
        <div className="payment-icons">
          {/* Íconos de los métodos de pago disponibles */}
          <img src="/images/Visa.png" alt="Visa" className='visa-logo'/>
          <img src="/images/mastercard.png" alt="MasterCard" className='mastercard-logo'/>
          <img src="/images/paypal.png" alt="PayPal" className='paypal-logo'/>
          <img src="/images/applepay.png" alt="Apple Pay" className='applepay-logo'/>
        </div>
      </div>
    </div>
  );
};

export default Cart;
