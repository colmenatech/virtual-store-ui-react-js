import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Cookies from "js-cookie";  // For handling cookies

const SHIPPING_COST = 2500;

const OrderSummary = () => {
  const navigate = useNavigate();
  const { cart, dispatch } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [savedCards, setSavedCards] = useState([]);
  const [showCardForm, setShowCardForm] = useState(null);
  const [useSavedCard, setUseSavedCard] = useState(null); // Usamos null para indicar que no hay tarjeta seleccionada aún
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

  useEffect(() => {
    const fetchSavedCards = async () => {
      const token = Cookies.get('token'); // Obtén el token
      if (!token) {
        // No mostrar nada o manejarlo sin alertas
        return;
      }
      try {
        const response = await axios.get("http://localhost:8000/api/user-profile/cards", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data && Array.isArray(response.data)) {
          setSavedCards(response.data);
        } else {
          setSavedCards([]);
        }
      } catch (error) {
        // Evitar mostrar errores si la solicitud falla
        console.error("Error al obtener las tarjetas:", error.message);
      }
    };
  
    fetchSavedCards();
  }, []);
; // Solo se ejecuta una vez cuando el componente se monta

  const handlePurchaseClick = () => {

      console.log("Botón de 'Añadir Tarjeta' clickeado");
     
    
    // Siempre mostrar el formulario de agregar tarjeta sin importar si hay tarjetas guardadas o no.
    setShowCardForm(true);
    console.log("Estado showCardForm después de hacer clic:", showCardForm);  // Verifica el valor de showCardForm

  };
  
  
  // Función para manejar la selección de tarjeta guardada
  const handleSavedCardSelect = (cardId) => {
    const selectedCard = savedCards.find(card => card.id === cardId);
    setUseSavedCard(selectedCard);
  };

  // Función para manejar los cambios en el formulario de nueva tarjeta
  const handleNewCardChange = (e) => {
    const { name, value } = e.target;
    setNewCard(prevState => ({
      ...prevState,
      [name]: value
    }));
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
      setUseSavedCard(null); // Reseteamos la tarjeta seleccionada
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

  const processPayment = async () => {
    const token = Cookies.get('token');
    if (!token) {
      alert("Debes iniciar sesión para procesar el pago");
      return;
    }
  
    // Verificar que useSavedCard contenga una tarjeta seleccionada
    const userId = useSavedCard ? useSavedCard.user_id : newCard.user_id;
    if (!userId) {
      alert("No se pudo obtener el user_id");
      return;
    }
  
    // Preparar los datos para el pago
    const paymentData = {
      user_id: userId,
      products: cart.map(item => ({
        product_id: item.id,
        quantity: item.quantity,
        price: item.price
      })),
      ...(useSavedCard ? { cardId: useSavedCard.id } : { ...newCard })
    };
  
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user-profile/checkout",
        paymentData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    
      console.log('Respuesta completa de la API:', response.data);  // Ver respuesta completa de la API
    
      if (response.data && response.data.message === "Compra finalizada y factura generada.") {
        const invoiceId = response.data.invoice.id;  // Accediendo correctamente al ID de la factura
    
        console.log('ID de la factura:', invoiceId);  // Verifica si el ID de la factura es correcto
    
        if (invoiceId) {
          alert("Pago procesado exitosamente");
          navigate(`/factura/${invoiceId}`);  // Redirigir usando el ID de la factura
        } else {
          alert("Error: No se pudo obtener el ID de la factura.");
        }
      } else {
        alert("Error al procesar la compra");
        console.error('Respuesta del servidor:', response.data);  // Imprimir toda la respuesta para depuración
      }
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      if (error.response) {
        console.error('Detalles del error:', error.response.data);
      }
      alert("Error al procesar el pago. Inténtalo de nuevo.");
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
        value="mastercard"
        checked={paymentMethod === "mastercard"}
        onChange={(e) => {
          const selectedType = e.target.value;
          setPaymentMethod(selectedType);
          setNewCard((prev) => ({ ...prev, type: selectedType }));
        }}
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
        onChange={(e) => {
          const selectedType = e.target.value;
          setPaymentMethod(selectedType);
          setNewCard((prev) => ({ ...prev, type: selectedType }));
        }}
        className="mr-2"
      />
      PayPal
    </label>
      <label className="flex items-center text-gray-700">
      <input
        type="radio"
        name="paymentMethod"
        value="applepay"
        checked={paymentMethod === "applepay"}
        onChange={(e) => {
          const selectedType = e.target.value;
          setPaymentMethod(selectedType);
          setNewCard((prev) => ({ ...prev, type: selectedType }));
        }}
        className="mr-2"
      />
      ApplePay
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
    onClick={handlePurchaseClick} // Este es el manejador que activa el estado showCardForm a true
    className="bg-[#381008] text-white py-2 px-6 rounded-lg hover:bg-[#DFCCC8]"
  >
    Añadir Tarjeta
  </button>
</div>

{/* Mostrar formulario para agregar una nueva tarjeta, siempre que showCardForm sea true */}
{showCardForm && (
   <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
   <div className="bg-white p-6 rounded-lg max-w-md w-full">
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
       <label className="block text-gray-700">Fecha de expiración (MM/AA)</label>
       <input
         type="text"
         name="expiryDate"
         value={newCard.expiryDate}
         onChange={handleNewCardChange}
         className="w-full p-2 border rounded-lg"
         placeholder="MM/AA"
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
       className="bg-[#381008] text-white py-2 px-6 rounded-lg hover:bg-[#DFCCC8] mt-2"
     >
       Guardar tarjeta
     </button>
   </div>
 </div>
)}

{/* Mostrar tarjetas guardadas si existen */}
{savedCards.length > 0 && (
  <div className="mt-4">
    <h3 className="text-lg font-bold">O Selecciona una tarjeta guardada</h3>
    <ul>
      {savedCards.map((card) => (
        <li key={card.id} className="mb-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="savedCard"
              value={card.id}
              onChange={() => handleSavedCardSelect(card.id)}
              className="mr-2"
            />
            {`**** **** **** ${card.number.slice(-4)}, Titular: ${card.name}`}
          </label>
        </li>
      ))}
    </ul>
  </div>
)}

{/* Botón de "Comprar ahora", solo se muestra si hay tarjetas guardadas */}
{savedCards.length > 0 && (
  <button
    onClick={processPayment}
    className="bg-[#381008] text-white py-2 px-6 rounded-lg hover:bg-[#DFCCC8] mt-4"
  >
    Comprar ahora ({cart.length})
  </button>
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
