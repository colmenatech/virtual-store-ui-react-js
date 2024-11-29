import React, { useState, useRef, useEffect } from 'react'; // Importa React y hooks necesarios
import applepay from './img/applepay.png'; // Importa la imagen de Apple Pay
import visa from './img/Visa.png'; // Importa la imagen de Visa
import mastercard from './img/mastercard.png'; // Importa la imagen de Mastercard
import paypal from './img/paypal.png'; // Importa la imagen de PayPal
import axios from 'axios';
import Cookies from 'js-cookie';  // Importar js-cookie para leer las cookies

const ProfileUser = () => { // Define el componente ProfileUser
  // Define varios estados para la gestión de datos de usuario y configuración
  const [editMode, setEditMode] = useState(false); // Modo de edición para el nombre de usuario
  const [theme, setTheme] = useState("light"); // Tema actual, por defecto es claro
  const [notifications, setNotifications] = useState(true); // Configuración de notificaciones activadas
  const [muteNotifications, setMuteNotifications] = useState(false); // Configuración para silenciar notificaciones
  const [cardNumber, setCardNumber] = useState(''); // Número de tarjeta de crédito
  const [cardType, setCardType] = useState(''); // Tipo de tarjeta de crédito (Visa, PayPal, etc.)
  const [cardList, setCardList] = useState([]); // Lista de tarjetas añadidas
  const [editingIndex, setEditingIndex] = useState(null); // Índice de la tarjeta que se está editando
  const [showInput, setShowInput] = useState(false); // Estado para mostrar el formulario de añadir tarjeta
  const [userName, setUserName] = useState('Nombre de Usuario');// Nombre del usuario
  const [profilePic, setProfilePic] = useState('https://via.placeholder.com/100'); // Foto de perfil del usuario
  const [savedCards, setSavedCards] = useState([]); // Estado para las tarjetas guardadas


   // Refs para desplazarse a las secciones del perfil
  const paymentRef = useRef(null);
  const notificationsRef = useRef(null);
  const settingsRef = useRef(null);

  const handleDeleteCard = async (index) => {
    const token = Cookies.get('token');
    if (!token) {
      alert("Debes estar autenticado para eliminar una tarjeta.");
      return;
    }
  
    // Verifica que el índice y la tarjeta sean válidos antes de acceder al id
    if (!cardList[index]) {
      alert("Tarjeta no encontrada.");
      return;
    }
  
    const cardId = cardList[index].id; // Obtener el ID de la tarjeta a eliminar
    try {
      await axios.delete(
        `http://localhost:8000/api/user-profile/cards/${cardId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      const updatedCards = cardList.filter((_, idx) => idx !== index);
      setCardList(updatedCards);
      alert("Tarjeta eliminada con éxito.");
    } catch (error) {
      console.error('Error al eliminar la tarjeta:', error);
      alert("Hubo un error al eliminar la tarjeta.");
    }
  };
  
  const handleEditCard = async (index) => {
    const token = Cookies.get('token');
    if (!token) {
      alert("Debes estar autenticado para editar una tarjeta.");
      return;
    }
  
    // Verifica que el índice y la tarjeta sean válidos antes de acceder al id
    if (!cardList[index]) {
      alert("Tarjeta no encontrada.");
      return;
    }
  
    let isValid = false;
    if (cardNumber.length === 16) {
      isValid = true; // Validación básica
    }
  
    if (isValid) {
      const cardData = { number: cardNumber, type: cardType.toUpperCase() };
      try {
        const response = await axios.put(
          `http://localhost:8000/api/user-profile/cards/${cardList[index].id}`,
          cardData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
  
        const updatedCards = [...cardList];
        updatedCards[index] = response.data;
        setCardList(updatedCards);
  
        setCardNumber('');
        setCardType('');
        setShowInput(false);
        setEditingIndex(null);
  
        alert("Tarjeta actualizada con éxito.");
      } catch (error) {
        console.error('Errores del servidor:', error.response.data.errors);
        alert(`Errores de validación: ${JSON.stringify(error.response.data.errors)}`);
      }
    } else {
      alert('Número de tarjeta inválido.');
    }
  };
  

  const scrollToSection = (ref) => { // Función para desplazarse a una sección específica
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleThemeChange = (newTheme) => { // Cambiar el tema de la interfaz
    setTheme(newTheme);
  };

  useEffect(() => {
    // Efecto que cambia los estilos del body según el tema seleccionado
    document.body.className = ''; // Resetear clases de body
    if (theme === 'light') {
      document.body.style.backgroundColor = '#FFFFFF';// Fondo blanco para el tema claro
      document.body.style.color = '#3E3E4A'; // Texto oscuro
    } else {
      document.body.style.backgroundColor = '#B2B3BD';// Fondo gris para el tema oscuro
      document.body.style.color = '#3E3E4A'; // Texto oscuro
    }
  }, [theme]); // Ejecutar el efecto cuando el tema cambie



  const handleAddCard = async () => {
    // Asegúrate de que el usuario esté autenticado
    const token = Cookies.get('token');
    if (!token) {
      alert("Debes estar autenticado para agregar una tarjeta.");
      return;
    }
  
    // Validar el número de tarjeta
    let isValid = false;
    if (cardNumber.length === 16) {
      isValid = true; // Validación básica, puedes agregar más reglas
    }
  
    if (isValid) {
      const cardData = { number: cardNumber, type: cardType.toUpperCase() };
  
      try {
        // Realizar la solicitud para agregar la tarjeta
        let response;
        if (editingIndex !== null) {
          // Si estamos editando una tarjeta, usamos PUT
          response = await axios.put(
            `http://localhost:8000/api/user-profile/cards/${cardList[editingIndex].id}`, 
            cardData, 
            { headers: { Authorization: `Bearer ${token}` } }
          );
          
          // Actualiza la tarjeta en la lista
          const updatedCards = [...cardList];
          updatedCards[editingIndex] = response.data;
          setCardList(updatedCards);
          setEditingIndex(null);
        } else {
          // Si estamos añadiendo una nueva tarjeta, usamos POST
          response = await axios.post(
            "http://localhost:8000/api/user-profile/cards", 
            cardData, 
            { headers: { Authorization: `Bearer ${token}` } }
          );
          
          // Añadir la tarjeta a la lista local
          setCardList([...cardList, response.data]);
        }
  
        // Resetea los campos del formulario
        setCardNumber('');
        setCardType('');
        setShowInput(false);
        alert("Tarjeta añadida con éxito.");
      } catch (error) {
        // Manejo extendido de errores
        if (error.response && error.response.data) {
          console.error('Errores del servidor:', error.response.data.errors);
          alert(`Errores de validación: ${JSON.stringify(error.response.data.errors)}`);
        } else {
          console.error('Error desconocido:', error.message);
          alert("Hubo un error al agregar la tarjeta.");
        }
      }
    } else {
      alert('Número de tarjeta inválido según el tipo seleccionado.');
    }
  };
  
  const handleProfilePicChange = (e) => { // Función para cambiar la foto de perfil
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result); // Establece la nueva foto de perfil
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveProfilePic = () => { // Función para eliminar la foto de perfil
    setProfilePic('https://via.placeholder.com/100');
  };

   // useEffect para cargar las tarjetas guardadas
   useEffect(() => {
    const fetchSavedCards = async () => {
      const token = Cookies.get('token'); // Obtén el token
      if (!token) {
        // Si no hay token, no hacemos nada
        return;
      }
      try {
        const response = await axios.get("http://localhost:8000/api/user-profile/cards", {
          headers: { Authorization: `Bearer ${token}` }, // Envía el token en las cabeceras
        });
        
        if (response.data && Array.isArray(response.data)) {
          setSavedCards(response.data); // Establece las tarjetas guardadas
        } else {
          setSavedCards([]); // Si no es una lista válida, establece un arreglo vacío
        }
      } catch (error) {
        // No mostrar alerta, solo loguear el error
        console.error("Error al obtener las tarjetas:", error.message);
      }
    };
  
    fetchSavedCards(); // Llamada a la función cuando el componente se monta
  }, []); // El efecto se ejecuta solo una vez cuando el componente se monta


  // Devuelve la estructura JSX del componente
  return ( 
    <div className={`flex ${theme === 'gray' ? 'bg-[#B2B3BD]' : theme === 'light' ? 'bg-[#FFFFFF]' : 'bg-[#3E3E4A]'} text-gray-800 font-sans`}>
      {/* Barra lateral con las opciones del perfil */}
      <div className="w-64 p-5 bg-white border-r border-gray-300 shadow-lg">
        <img src={profilePic} alt="Avatar" className="w-48 h-48 rounded-full border-4 border-gray-400 mb-5" />

        {editMode ? (
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Nombre de usuario"
            className="w-full mb-2 p-2 border rounded-md border-gray-300 focus:border-gray-500"
          />
        ) : (
          <h2 className="text-2xl font-bold text-[#5A0A09] mb-4">{userName}</h2>
        )}

         {/* Botones de editar perfil */}
        {editMode ? (
          <div>
            <button onClick={() => setEditMode(false)} className="bg-[#5A0A09] text-white px-4 py-2 rounded-lg hover:bg-[#430704] transition">Guardar Cambios</button>
            <button onClick={() => setEditMode(false)} className="bg-[#9E9E9E] text-white px-4 py-2 rounded-lg hover:bg-[#7C7C7C] transition">Cancelar Cambios</button>
          </div>
        ) : (
          <button onClick={() => setEditMode(true)} className="bg-[#5A0A09] text-white px-4 py-2 rounded-lg hover:bg-[#430704] transition">Editar Perfil</button>
        )}

        {/* Opciones de foto de perfil */}
        {editMode && (
          <>
            <input type="file" accept="image/*" onChange={handleProfilePicChange} className="mt-3" />
            <button onClick={handleRemoveProfilePic} className="bg-[#5D0909] text-white px-4 py-2 rounded-lg hover:bg-[#4B0606] transition mt-2">Eliminar Foto de Perfil</button>
          </>
        )}

        {/* Menú lateral con enlaces */}
        <ul className="mt-6 space-y-2">
          <li className="cursor-pointer p-2 rounded-md bg-[#9E9E9E] text-white hover:bg-[#7C7C7C]" onClick={() => scrollToSection(paymentRef)}>Métodos de Pago</li>
          <li className="cursor-pointer p-2 rounded-md bg-[#9E9E9E] text-white hover:bg-[#7C7C7C]" onClick={() => scrollToSection(notificationsRef)}>Notificaciones</li>
          <li className="cursor-pointer p-2 rounded-md bg-[#9E9E9E] text-white hover:bg-[#7C7C7C]" onClick={() => scrollToSection(settingsRef)}>Configuración</li>
        </ul>

        <button className="mt-4 bg-[#5A0A09] text-white px-4 py-2 rounded-lg hover:bg-[#430704] transition" onClick={() => window.location.href = '/'}>Regresar al Inicio</button>
      </div>

      {/* Sección de contenido */}
      <div className="flex-1 p-8 space-y-6">

        {/* Métodos de Pago */}
        <section ref={paymentRef} className="p-5 rounded-lg bg-white shadow-md">
      <h3 className="text-xl font-bold text-[#5A0A09]">Métodos de Pago</h3>
      <button
        className='bg-[#5A0A09] text-white px-4 py-2 rounded-lg hover:bg-[#430704] transition'
        onClick={() => setShowInput(!showInput)}
      >
        Añadir Tarjeta
      </button>
      {showInput && (
        <div className="mt-4">
          <input
            type="text"
            placeholder="Número de Tarjeta"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="border rounded-lg p-2 mb-2 w-full"
          />
          <select
            value={cardType}
            onChange={(e) => setCardType(e.target.value)}
            className="border rounded-lg p-2 mb-2 w-full"
          >
            <option value="">Selecciona Tipo de Tarjeta</option>
            <option value="applepay">ApplePay</option>
            <option value="visa">Visa</option>
            <option value="paypal">PayPal</option>
            <option value="mastercard">Mastercard</option>
          </select>
          <button
            className="bg-[#5A0A09] text-white px-4 py-2 rounded-lg hover:bg-[#430704] transition"
            onClick={handleAddCard}
          >
            Añadir
          </button>
        </div>
      )}

        <h3>Tarjetas guardadas</h3>
        {savedCards.length > 0 ? (
          <ul className="mt-4">
            {savedCards.map((card, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{card.type}: {card.number}</span>
                <div className="flex items-center space-x-2">
                  {card.type === 'applepay' && <img src={applepay} alt="Apple Pay" className="w-5 h-5" />}
                  {card.type === 'visa' && <img src={visa} alt="Visa" className="w-5 h-5" />}
                  {card.type === 'paypal' && <img src={paypal} alt="PayPal" className="w-5 h-5" />}
                  {card.type === 'mastercard' && <img src={mastercard} alt="Mastercard" className="w-5 h-5" />}
                  <button className='btn' onClick={() => handleEditCard(index)}>Editar</button>
                  <button className='btn' onClick={() => handleDeleteCard(index)}>Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tienes métodos de pago guardados.</p>
        )}
      </section>

    {/* Notificaciones */}
        <section ref={notificationsRef} className="p-5 rounded-lg bg-white shadow-md">
          <h3 className="text-xl font-bold text-[#5A0A09]">Notificaciones</h3>
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={notifications} onChange={() => setNotifications(!notifications)} />
              <span className="ml-2">Recibir Notificaciones</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={muteNotifications} onChange={() => setMuteNotifications(!muteNotifications)} />
              <span className="ml-2">Silenciar Notificaciones</span>
            </label>
          </div>
        </section>

        {/* Configuraciones */}
        <section ref={settingsRef} className="p-5 rounded-lg bg-white shadow-md">
          <h3 className="text-xl font-bold text-[#5A0A09]">Configuración</h3>
          <div>
            <label className="flex items-center">
              <input type="radio" value="light" checked={theme === 'light'} onChange={() => handleThemeChange('light')} />
              <span className="ml-2">Modo Claro</span>
            </label>
            
            <label className="flex items-center">
              <input type="radio" value="black" checked={theme === 'black'} onChange={() => handleThemeChange('black')} />
              <span className="ml-2">Modo Oscuro</span>
            </label>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfileUser;
