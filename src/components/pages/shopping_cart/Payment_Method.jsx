import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Cookies from "js-cookie";  // For handling cookies

const SHIPPING_COST = 2500;

const OrderSummary = () => {
  // Hook para navegar a diferentes rutas en la aplicación.
  const navigate = useNavigate();
  // Hook personalizado para obtener el carrito de compras y su función de despacho
  //para manejar acciones relacionadas con el carrito.
  const { cart, dispatch } = useCart();
   // Estado para almacenar el método de pago seleccionado por el usuario.
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
   // Estado para guardar el cupón ingresado por el usuario.
  const [coupon, setCoupon] = useState('');
  // Estado para almacenar el descuento aplicado basado en el cupón u otras condiciones.
  const [discount, setDiscount] = useState(0);
   // Estado para almacenar las tarjetas guardadas del usuario.
  const [savedCards, setSavedCards] = useState([]);
   // Estado booleano para mostrar u ocultar el formulario de una nueva tarjeta.
  const [showCardForm, setShowCardForm] = useState(null);
   // Estado booleano para determinar si el usuario quiere usar una tarjeta guardada.
  const [useSavedCard, setUseSavedCard] = useState(null);
  // Estado para almacenar los datos de una nueva tarjeta ingresada por el usuario.
  const [newCard, setNewCard] = useState({
    number: "", // Número de la tarjeta.
    expiryDate: "", // Fecha de expiración de la tarjeta.
    cvv: "", // Código de seguridad de la tarjeta.
    name: "", // Nombre del titular de la tarjeta.
    type: "creditCard", // Tipo de tarjeta, por defecto es 'creditCard'.
  });


  const applyCoupon = () => {
     // Si el cupón es válido, establece un descuento del 30% (0.3 en decimal).
    if (coupon === 'DESCUENTO30') {
      setDiscount(0.3);
      // Si el cupón no es válido, se asegura de que el descuento sea 0.
    } else {
      // Muestra un mensaje de alerta al usuario indicando que el cupón es inválido.
      setDiscount(0);
      alert('Cupón inválido');
    }
  };

// Incrementa la cantidad de un producto en el carrito.
// Incrementa la cantidad de un producto en el carrito.
const increaseQuantity = (id) => { 
  // Envía una acción al contexto o estado global para añadir una unidad del producto especificado por su 'id'.
  dispatch({ type: 'ADD_TO_CART', payload: { id } }); 
};

// Decrementa la cantidad de un producto en el carrito.
const decreaseQuantity = (id) => {
  // Envía una acción al contexto o estado global para disminuir una unidad del producto especificado por su 'id'.
  dispatch({ type: 'DECREASE_QUANTITY', payload: { id } }); 
};

// Elimina un producto del carrito.
const removeFromCart = (id) => {
  // Envía una acción al contexto o estado global para quitar completamente el producto especificado por su 'id' del carrito.
  dispatch({ type: 'REMOVE_FROM_CART', payload: { id } }); 
};

  
 // Calcula el subtotal del carrito sumando el precio de cada producto multiplicado por su cantidad.
const subtotal = cart.reduce((total, item) => { 
  // Verifica si el precio del producto es un número válido. Si no lo es, asigna 0 como precio.
  const validPrice = !isNaN(parseFloat(item.price)) ? parseFloat(item.price) : 0; 
  // Suma al total el precio válido multiplicado por la cantidad del producto. Si no hay cantidad definida, se asume 1.
  return total + validPrice * (item.quantity || 1); 
}, 0); // Inicializa el acumulador del subtotal en 0.

// Calcula el monto del descuento basado en el subtotal y el descuento actual.
const discountAmount = subtotal * discount; 

// Calcula el total sumando el subtotal, restando el monto del descuento y añadiendo el costo de envío.
const total = subtotal - discountAmount + SHIPPING_COST; 


useEffect(() => { 
  // Función asíncrona para obtener las tarjetas guardadas del usuario desde una API.
  const fetchSavedCards = async () => {
      const token = Cookies.get('token'); // Obtiene el token de autenticación almacenado en las cookies.
      if (!token) {
          // Si no hay token, no se realiza la solicitud y se detiene la ejecución.
          // Maneja esta situación silenciosamente sin alertas al usuario.
          return; 
      }
      try {
          // Realiza una solicitud GET a la API para obtener las tarjetas guardadas del usuario.
          const response = await axios.get("http://localhost:8000/api/user-profile/cards", {
              headers: { Authorization: `Bearer ${token}` }, // Incluye el token en los encabezados para autenticación.
          });
          
          // Si la respuesta contiene datos válidos (y es un array), establece esas tarjetas en el estado.
          if (response.data && Array.isArray(response.data)) {
              setSavedCards(response.data); 
          } else {
              // Si no hay datos o la estructura no es la esperada, establece el estado como un array vacío.
              setSavedCards([]); 
          }
      } catch (error) {
          // En caso de error en la solicitud, lo registra en la consola, pero no interrumpe la experiencia del usuario.
          console.error("Error al obtener las tarjetas:", error.message); 
      }
  };

  // Llama a la función fetchSavedCards cuando el componente se monta.
  fetchSavedCards();
}, []); // El array vacío indica que este efecto solo se ejecutará una vez al montar el componente.


 // Maneja el clic en el botón para añadir una nueva tarjeta
const handlePurchaseClick = () => { 
  // Muestra un mensaje en la consola indicando que el botón fue clickeado.
  console.log("Botón de 'Añadir Tarjeta' clickeado");

  // Cambia el estado `showCardForm` a `true` para mostrar el formulario de agregar una nueva tarjeta,
  // sin importar si ya hay tarjetas guardadas.
  setShowCardForm(true);

  // Registra en la consola el valor actual de `showCardForm` después de modificarlo.
  console.log("Estado showCardForm después de hacer clic:", showCardForm);
};

// Maneja la selección de una tarjeta guardada por su `cardId`.
const handleSavedCardSelect = (cardId) => {
  // Busca la tarjeta seleccionada en la lista de tarjetas guardadas utilizando su ID.
  const selectedCard = savedCards.find(card => card.id === cardId);

  // Establece la tarjeta seleccionada en el estado `useSavedCard`.
  setUseSavedCard(selectedCard);
};

// Maneja los cambios en el formulario para agregar una nueva tarjeta.
const handleNewCardChange = (e) => {
  // Extrae el nombre del campo (`name`) y su valor (`value`) del evento del formulario.
  const { name, value } = e.target;

  // Actualiza el estado `newCard` con el nuevo valor del campo correspondiente.
  setNewCard(prevState => ({
      ...prevState, // Copia el estado actual para no sobrescribir otros campos.
      [name]: value // Actualiza solo el campo que cambió.
  }));
};

const handleNewCardSubmit = async () => { 
  // Obtiene el token de autenticación almacenado en las cookies.
  const token = Cookies.get('token');  
  if (!token) {
      // Si no hay token, muestra una alerta indicando que el usuario debe iniciar sesión.
      alert("Iniciar sesión para crear una cuenta");
      return; // Termina la ejecución de la función.
  }

  // Muestra en la consola los datos de la nueva tarjeta que se enviarán.
  console.log('Datos enviados:', newCard);

  try {
      // Realiza una solicitud POST a la API para agregar una nueva tarjeta.
      const response = await axios.post(
          "http://localhost:8000/api/user-profile/cards", 
          newCard, // Los datos de la nueva tarjeta que se enviarán en el cuerpo de la solicitud.
          { headers: { Authorization: `Bearer ${token}` } } // Adjunta el token en los encabezados para autenticación.
      );

      // Si la solicitud es exitosa, muestra una alerta de confirmación al usuario.
      alert("Tarjeta agregada exitosamente");

      // Oculta el formulario de agregar tarjeta.
      setShowCardForm(false);

      // Resetea la tarjeta seleccionada para asegurarse de que no quede ninguna tarjeta preseleccionada.
      setUseSavedCard(null); 
  } catch (error) {
      // Manejo extendido de errores en caso de que la solicitud falle.
      if (error.response && error.response.data) {
          // Si el error tiene una respuesta del servidor, muestra los detalles de los errores de validación.
          console.error('Errores del servidor:', error.response.data.errors);
          alert(`Errores de validación: ${JSON.stringify(error.response.data.errors)}`);
      } else {
          // Si no hay una respuesta clara del servidor, muestra un mensaje genérico de error.
          console.error('Error desconocido:', error.message);
          alert("Error al agregar la tarjeta");
      }
  }
};


const processPayment = async () => {
  // Obtiene el token de autenticación almacenado en las cookies.
  const token = Cookies.get('token'); 
  if (!token) {
      // Si no hay token, muestra un mensaje y detiene la ejecución.
      alert("Debes iniciar sesión para procesar el pago");
      return; 
  }
  
    // Determina el `user_id` dependiendo de si se usa una tarjeta guardada o una nueva.
    const userId = useSavedCard ? useSavedCard.user_id : newCard.user_id;
    if (!userId) {
        // Si no se puede obtener el `user_id`, muestra un mensaje de error y detiene la ejecución.
        alert("No se pudo obtener el user_id");
        return;
    }
  

   // Prepara los datos de pago para enviarlos a la API.
  const paymentData = {
    user_id: userId, // ID del usuario que realiza el pago.
    products: cart.map(item => ({
        product_id: item.id,        // ID del producto.
        quantity: item.quantity,   // Cantidad del producto.
        price: item.price          // Precio del producto.
    })),
    // Si se usa una tarjeta guardada, agrega su ID; de lo contrario, incluye los datos de la nueva tarjeta.
    ...(useSavedCard ? { cardId: useSavedCard.id } : { ...newCard })
    };
  
    try {
      // Realiza una solicitud POST a la API para procesar el pago.
      const response = await axios.post(
          "http://localhost:8000/api/user-profile/checkout", // Endpoint de la API para el proceso de checkout.
          paymentData, // Datos de pago construidos previamente.
          { headers: { Authorization: `Bearer ${token}` } } // Incluye el token en los encabezados para autenticar la solicitud.
      );
    
      // Muestra en la consola la respuesta completa de la API para propósitos de depuración.
    console.log('Respuesta completa de la API:', response.data);

    // Verifica si la respuesta de la API contiene el mensaje esperado indicando éxito.
    if (response.data && response.data.message === "Compra finalizada y factura generada.") {
        // Obtiene el ID de la factura generado por la API.
        const invoiceId = response.data.invoice.id;
    
       // Muestra en la consola el ID de la factura para depuración.
      console.log('ID de la factura:', invoiceId);

      if (invoiceId) {
           // Si hay un ID de factura, informa al usuario que el pago fue exitoso.
          alert("Pago procesado exitosamente");

           // Redirige al usuario a la página de la factura utilizando su ID.
          navigate(`/factura/${invoiceId}`);
      } else {
           // Si no se obtiene un ID de factura, informa al usuario del error.
          alert("Error: No se pudo obtener el ID de la factura.");
      }
  } else {
       // Si la respuesta de la API no contiene el mensaje esperado, muestra un error genérico.
      alert("Error al procesar la compra");
       console.error('Respuesta del servidor:', response.data); // Registra la respuesta completa para analizar el error.
  }

    } catch (error) {
    // Manejo de errores en caso de que la solicitud a la API falle.
    console.error("Error al procesar el pago:", error);

    if (error.response) {
        // Si el error incluye una respuesta del servidor, muestra detalles adicionales.
        console.error('Detalles del error:', error.response.data);
    }

    // Notifica al usuario que ocurrió un error durante el procesamiento del pago.
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
