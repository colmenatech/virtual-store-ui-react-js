import React, { useState } from 'react';
import applepay from './img/applepay.png';
import visa from './img/Visa.png';
import mastercard from './img/mastercard.png';
import paypal from './img/paypal.png';
import logo from './img/logo.png';
import mesa from './img/mesa.jpg';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const navigate = useNavigate();
  const handleCheckout = () => {
    navigate('/factura');
  };

  return (
    <div className="container mx-auto px-4 font-serif">
      {/* Cabecera del carrito con logo */}
      <header className="flex justify-between py-2 bg-white">
        <img src={logo} alt="logo" className="w-[190px] h-[170px] mr-5" />
      </header>

      {/* Mensaje de Descuento */}
      <div className="bg-[#5d0909] text-white text-center py-2">
        <p>Válido para tener un descuento extra de 15% después de la compra</p>
      </div>

      {/* Sección que muestra los artículos en el carrito */}
      <div className="border border-[#ddd] p-4 bg-white">
        <h2 className="text-xl font-semibold mb-4">TODOS LOS ARTÍCULOS (1)</h2>
        <div className="flex items-center mb-5">
          {/* Checkbox indicando que el artículo está seleccionado */}
          <input type="checkbox" checked readOnly className="mr-4" />
          
          {/* Imagen del artículo en el carrito */}
          <img src={mesa} alt="Artículo Comfort Haven" className="w-[150px] h-[150px] mr-5" />
          
          {/* Detalles del artículo */}
          <div className="flex-1">
            <h3 className="font-bold">COMFORT HAVEN</h3>
            <p>Mesa</p>
            <p>Descripción: Circular</p>
            <p>Precio: ₡50000</p>
            <p className="mt-2">Usuarios han dado 5 estrellas</p>
          </div>

          {/* Control para cambiar la cantidad del artículo */}
          <div className="flex items-center">
            <label htmlFor="quantity" className="mr-2">Cant:</label>
            <select
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              className="border p-1 rounded"
            >
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
      <div className="mt-5 p-4 border border-[#ddd] bg-[#f9f9f9]">
        <h2 className="text-xl font-semibold mb-4">Resumen Del Pedido</h2>
        <p>Precio Estimado: </p>
        <p>Premio: 21 Puntos de COMFORT HAVEN</p>
        {/* Botón para proceder a la compra */}
        <button
          className="bg-[#381008] text-white py-2 px-6 rounded mt-4 hover:bg-[#DFCCC8] transition-colors"
          onClick={handleCheckout}
        >
          Comprar ahora
        </button>
      </div>

      {/* Sección que muestra los métodos de pago aceptados */}
      <div className="mt-5">
        <h3 className="text-lg font-semibold">Aceptamos</h3>
        <div className="flex space-x-4 mt-2">
          {/* Íconos de los métodos de pago disponibles */}
          <img src={visa} alt="Visa" className="w-[50px] h-auto object-contain" />
          <img src={mastercard} alt="MasterCard" className="w-[50px] h-auto object-contain" />
          <img src={paypal} alt="PayPal" className="w-[50px] h-auto object-contain" />
          <img src={applepay} alt="Apple Pay" className="w-[50px] h-auto object-contain" />
        </div>
      </div>
    </div>
  );
};

export default Cart;
