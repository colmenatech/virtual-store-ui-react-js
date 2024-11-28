import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import axios from "axios";
import Cookies from "js-cookie";  // For handling cookies

const SHIPPING_COST = 2500;

const OrderSummary = () => {
  const { cart, dispatch } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [savedCards, setSavedCards] = useState([]);
  const [showCardForm, setShowCardForm] = useState(false);
  const [useSavedCard, setUseSavedCard] = useState(null);
  const [newCard, setNewCard] = useState({
    
  number: "",
  expiryDate: "",
  cvv: "",
  name: "",
  type: "creditCard",
  
  });

  // Apply coupon logic
  const applyCoupon = () => {
    if (coupon === 'DESCUENTO30') {
      setDiscount(0.3);
    } else {
      setDiscount(0);
      alert('Cupón inválido');
    }
  };

  // Cart update functions
  const increaseQuantity = (id) => {
    dispatch({ type: 'ADD_TO_CART', payload: { id } });
  };

  const decreaseQuantity = (id) => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: { id } });
  };

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
  };

  // Subtotal and total calculations
  const subtotal = cart.reduce((total, item) => {
    const validPrice = !isNaN(parseFloat(item.price)) ? parseFloat(item.price) : 0;
    return total + validPrice * (item.quantity || 1);
  }, 0);

  const discountAmount = subtotal * discount;
  const total = subtotal - discountAmount + SHIPPING_COST;

  // Get saved cards when the component mounts
  useEffect(() => {
    const fetchSavedCards = async () => {
      const token = Cookies.get('token');  // Get token from cookies
      if (!token) {
        alert("You must be logged in to view your saved cards");
        return;
      }

      try {
        const response = await axios.get("http://localhost:8000/api/user-profile/cards", {
          headers: { Authorization: `Bearer ${token}` }  // Attach token to the request
        });
        setSavedCards(response.data);
      } catch (error) {
        console.error("Error fetching saved cards:", error);
        alert("Failed to load saved cards. Please try again.");
      }
    };
    fetchSavedCards();
  }, []);

  // Handle purchase button click
  const handlePurchaseClick = () => {
    if (savedCards.length > 0) {
      const confirmation = window.confirm("¿Quieres usar una tarjeta guardada?");
      if (confirmation) {
        setUseSavedCard(true);
        setShowCardForm(false);
      } else {
        setUseSavedCard(false);
        setShowCardForm(true);
      }
    } else {
      setShowCardForm(true);
    }
  };

  // Handle changes in the new card form
  const handleNewCardChange = (e) => {
    const { name, value } = e.target;
    setNewCard({ ...newCard, [name]: value });
  };

  // Handle new card submission
  const handleNewCardSubmit = async () => {
    const token = Cookies.get('token');  // Obtiene el token de las cookies
    if (!token) {
      alert("You must be logged in to add a card");
      return;
    }
    console.log('Datos enviados:', newCard);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/user-profile/cards", 
        newCard, 
        { headers: { Authorization: `Bearer ${token}` } } // Adjunta el token a la solicitud
      );
      alert("Tarjeta agregada exitosamente");
      setShowCardForm(false);
      setUseSavedCard(false);
    } catch (error) {
      // Manejo extendido de errores
      if (error.response && error.response.data) {
        console.error('Errores del servidor:', error.response.data.errors);
        alert(`Errores de validación: ${JSON.stringify(error.response.data.errors)}`);
      } else {
        console.error('Error desconocido:', error.message);
        alert("Error al agregar la tarjeta");
      }
    }
  };
  


  return (
    <div className="container mx-auto p-2 font-serif">
     
      {/* mensaje de descuento */}
      <div className="flex flex-col items-center bg-[#5d0909] text-white text-center py-5">
        <p className="text-lg md:text-xm font-semibold">
        ¡Aprovecha tus productos seleccionados y no los dejes escapar! Completa tu compra ahora.
        </p>
      </div>

      {/* Lista de artículos */}
      <div className="mt-6 p-4 border rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Todos los Artículos ({cart.length})</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">Tu carrito está vacío.</p>
        ) : (
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="flex items-center mb-4 border-b pb-4">
                <img
                  src={item.image_url || '/placeholder.png'}
                  alt={item.name || 'Producto'}
                  className="w-36 h-36 object-cover rounded mr-4"
                />
                <div className="flex-grow">
                  <h3 className="text-lg font-bold">{item.name || 'Sin nombre'}</h3>
                  <p className="text-gray-600">Descripción: {item.description || 'N/A'}</p>
                  <p className="text-gray-800 font-semibold">
                    Precio: ₡{(!isNaN(parseFloat(item.price)) ? parseFloat(item.price) : 0).toFixed(2)}
                  </p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="bg-gray-300 text-gray-700 px-2 py-1 rounded"
                    >
                      -
                    </button>
                    <span className="mx-4">{item.quantity || 1}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="bg-gray-300 text-gray-700 px-2 py-1 rounded"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:underline mt-2 block"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Resumen del pedido */}
      <div className="mt-6 p-4 bg-gray-100 border rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Resumen del Pedido</h2>
        <div className="space-y-2">
          <div className="flex justify-between text-gray-700">
            <span>Subtotal:</span>
            <span>₡{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Descuento:</span>
            <span>-₡{discountAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Costo de Transporte:</span>
            <span>₡{SHIPPING_COST.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-900 font-bold">
            <span>Total:</span>
            <span>₡{total.toFixed(2)}</span>
          </div>
        </div>

       {/* Selección de método de pago */}
       <label className="flex items-center text-gray-700">
        <input
          type="radio"
          name="paymentMethod"
          value="creditCard"
          checked={paymentMethod === "creditCard"}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="mr-2"
        />
        Mastercard
      </label>
      <label className="flex items-center text-gray-700">
        <input
          type="radio"
          name="paymentMethod"
          value="paypal"
          checked={paymentMethod === "paypal"}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="mr-2"
        />
        PayPal
      </label>
      <label className="flex items-center text-gray-700">
        <input
          type="radio"
          name="paymentMethod"
          value="bankTransfer"
          checked={paymentMethod === "bankTransfer"}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="mr-2"
        />
        Visa
      </label>
      <label className="flex items-center text-gray-700">
      <input
        type="radio"
        name="paymentMethod"
        value="visa"
        checked={paymentMethod === "visa"}
        onChange={(e) => {
          const selectedType = e.target.value;
          setPaymentMethod(selectedType);
          setNewCard((prev) => ({ ...prev, type: selectedType }));
        }}
        className="mr-2"
      />
      Visa
    </label>
 

      {/* Botón de compra */}
      <div className="mt-6 text-left">
        <button
          onClick={handlePurchaseClick}
          className="bg-[#381008] text-white py-2 px-6 rounded-lg hover:bg-[#DFCCC8]"
        >
          Comprar ahora ({cart.length})
        </button>
      </div>

      {/* Formulario de tarjeta */}
      {showCardForm && (
        <div className="mt-4 border p-4 rounded-lg">
          <h3 className="text-lg font-bold">Agregar nueva tarjeta</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Número de tarjeta</label>
            <input
              type="text"
              name="number"
              value={newCard.number}
              onChange={handleNewCardChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Fecha de expiración</label>
            <input
              type="text"
              name="expiryDate"
              value={newCard.expiryDate}
              onChange={handleNewCardChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">CVV</label>
            <input
              type="text"
              name="cvv"
              value={newCard.cvv}
              onChange={handleNewCardChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Nombre</label>
            <input
              type="text"
              name="name"
              value={newCard.name}
              onChange={handleNewCardChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <button
            onClick={handleNewCardSubmit}
            className="bg-[#381008] text-white py-2 px-6 rounded-lg hover:bg-[#DFCCC8]"
          >
            Guardar tarjeta
          </button>
        </div>
      )}

      {/* Cupón de descuento */}
      <h3 className="text-lg font-bold mt-6 mb-2">Cupón de Descuento</h3>
      <div className="flex">
        <input
          type="text"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          className="w-60 p-2 border rounded-lg placeholder:text-sm mr-4 "
          placeholder="Ingresa tu cupón"
        />
        <button
          onClick={applyCoupon}
          className="bg-[#5d0909] text-white px-4 rounded-lg"
        >
          Aplicar
        </button>
      </div>
    </div>
    </div>
  );
};

export default OrderSummary;
