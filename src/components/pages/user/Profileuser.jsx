import React, { useState, useRef, useEffect } from 'react'; // Importa React y hooks necesarios
import applepay from './img/applepay.png'; // Importa la imagen de Apple Pay
import visa from './img/Visa.png'; // Importa la imagen de Visa
import mastercard from './img/mastercard.png'; // Importa la imagen de Mastercard
import paypal from './img/paypal.png'; // Importa la imagen de PayPal

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
  const [wishlist, setWishlist] = useState([ // Lista de deseos con productos
    { id: 1, name: 'Producto 1', description: 'Descripción del Producto 1' },
    { id: 2, name: 'Producto 2', description: 'Descripción del Producto 2' },
    { id: 3, name: 'Producto 3', description: 'Descripción del Producto 3' },
  ]);
  const [userName, setUserName] = useState('Nombre de Usuario');// Nombre del usuario
  const [profilePic, setProfilePic] = useState('https://via.placeholder.com/100'); // Foto de perfil del usuario

   // Refs para desplazarse a las secciones del perfil
  const ordersRef = useRef(null);
  const wishlistRef = useRef(null);
  const paymentRef = useRef(null);
  const notificationsRef = useRef(null);
  const settingsRef = useRef(null);

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

  const handleAddCard = () => { // Función para agregar una tarjeta a la lista
    let isValid = false;
    if (cardType === 'visa' && cardNumber.startsWith('4') && cardNumber.length === 16) {
      isValid = true;
    } else if (['bcr', 'bn', 'bac'].includes(cardType) && (cardNumber.startsWith('4') || cardNumber.startsWith('5')) && cardNumber.length === 16) {
      isValid = true;
    }

    if (isValid) {
      const cardData = { number: cardNumber, type: cardType.toUpperCase() }; // Crear un objeto con la tarjeta
      if (editingIndex !== null) {
        const updatedCards = [...cardList]; // Si se está editando una tarjeta, se actualiza en la lista
        updatedCards[editingIndex] = cardData;
        setCardList(updatedCards);
        setEditingIndex(null);
      } else {
        setCardList([...cardList, cardData]); // Añadir la tarjeta a la lista
      }
      setCardNumber('');
      setCardType('');
      setShowInput(false);
    } else {
      alert('Número de tarjeta inválido según el tipo seleccionado.'); // Alerta si el número de tarjeta es inválido
    }
  };

  const handleEditCard = (index) => { // Función para editar una tarjeta existente
    setCardNumber(cardList[index].number);
    setCardType(cardList[index].type);
    setEditingIndex(index);
    setShowInput(true);
  };

  const handleDeleteCard = (index) => { // Función para eliminar una tarjeta de la lista
    const updatedCards = cardList.filter((_, i) => i !== index);
    setCardList(updatedCards);
  };

  const handleDeleteWishlistItem = (id) => { // Función para eliminar un item de la lista de deseos
    const updatedWishlist = wishlist.filter(item => item.id !== id);
    setWishlist(updatedWishlist);
  };

  const handleViewWishlistItem = (item) => { // Función para ver los detalles de un item de la lista de deseos
    alert(`Nombre: ${item.name}\nDescripción: ${item.description}`);
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

  return ( // Devuelve la estructura JSX del componente
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
          <li className="cursor-pointer p-2 rounded-md bg-[#9E9E9E] text-white hover:bg-[#7C7C7C]" onClick={() => scrollToSection(ordersRef)}>Mis Órdenes</li>
          <li className="cursor-pointer p-2 rounded-md bg-[#9E9E9E] text-white hover:bg-[#7C7C7C]" onClick={() => scrollToSection(wishlistRef)}>Wishlist</li>
          <li className="cursor-pointer p-2 rounded-md bg-[#9E9E9E] text-white hover:bg-[#7C7C7C]" onClick={() => scrollToSection(paymentRef)}>Métodos de Pago</li>
          <li className="cursor-pointer p-2 rounded-md bg-[#9E9E9E] text-white hover:bg-[#7C7C7C]" onClick={() => scrollToSection(notificationsRef)}>Notificaciones</li>
          <li className="cursor-pointer p-2 rounded-md bg-[#9E9E9E] text-white hover:bg-[#7C7C7C]" onClick={() => scrollToSection(settingsRef)}>Configuración</li>
        </ul>

        <button className="mt-4 bg-[#5A0A09] text-white px-4 py-2 rounded-lg hover:bg-[#430704] transition" onClick={() => window.location.href = '/'}>Regresar al Inicio</button>
      </div>

      {/* Sección de contenido */}
      <div className="flex-1 p-8 space-y-6">
        <section ref={ordersRef} className="p-5 rounded-lg bg-white shadow-md">
          <h3 className="text-xl font-bold text-[#5A0A09]">Mis Órdenes</h3>
          <p>Resumen de tus órdenes anteriores...</p>
        </section>

        {/* Wishlist */}
        <section ref={wishlistRef} className="p-5 rounded-lg bg-white shadow-md">
          <h3 className="text-xl font-bold text-[#5A0A09]">Wishlist</h3>
          {wishlist.length > 0 ? (
            <ul className="space-y-3">
              {wishlist.map(item => (
                <li key={item.id} className="flex justify-between">
                  <span>{item.name}</span>
                  <div>
                    <button onClick={() => handleViewWishlistItem(item)} className="bg-[#5A0A09] text-white px-4 py-1 rounded-md hover:bg-[#430704] transition">Ver</button>
                    <button onClick={() => handleDeleteWishlistItem(item.id)} className="bg-[#5D0909] text-white px-4 py-1 rounded-md hover:bg-[#4B0606] transition ml-2">Eliminar</button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No tienes productos en tu wishlist</p>
          )}
        </section>

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
      <ul className="mt-4">
        {/* Mostrar tarjetas añadidas */}
        {cardList.length > 0 ? (
          cardList.map((card, index) => (
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
          ))
        ) : (
          <p>No hay métodos de pago guardados.</p>
        )}
      </ul>
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
              <span className="ml-2">Tema Claro</span>
            </label>
            
            <label className="flex items-center">
              <input type="radio" value="gray" checked={theme === 'gray'} onChange={() => handleThemeChange('gray')} />
              <span className="ml-2">Tema Gris</span>
            </label>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfileUser;
