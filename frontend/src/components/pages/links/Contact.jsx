import React, { useState } from 'react';


const ContacForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    phone: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let newErrors = {};

    // Validación del nombre y apellido
    if (formData.name.length < 3) newErrors.name = 'El nombre debe tener más de 3 letras';
    if (formData.lastname.length < 3) newErrors.lastname = 'El apellido debe tener más de 3 letras';
    
    // Validación de teléfono con 8 dígitos
    if (!formData.phone) {
      newErrors.phone = 'El número de teléfono es requerido';
    } else if (!/^\d{8}$/.test(formData.phone)) {
      newErrors.phone = 'El número de teléfono debe tener exactamente 8 dígitos';
    }

    // Validación del correo electrónico
    if (!formData.email) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El correo electrónico no es válido';
    }

    // Validación del mensaje
    const wordCount = formData.message.split(/\s+/).filter(word => word.length > 0).length;
    if (!formData.message) {
      newErrors.message = 'El mensaje es requerido';
    } else if (wordCount < 15) {
      newErrors.message = 'El mensaje debe contener más de 50 palabras';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Datos guardados', formData);
      alert('Mensaje enviado con éxito!');
      setFormData({
        name: '',
        lastname: '',
        phone: '',
        email: '',
        message: '',
      });
    }
  };

  return (
    <div className="flex justify-between max-w-3xl mx-auto gap-8">
      <form onSubmit={handleSubmit} className="flex-1 p-8 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-center text-gray-800 mb-6">Contáctanos</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="font-bold text-gray-700 mt-4 block">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ingresa tu nombre"
              className="w-full p-2 mt-2 border border-gray-300 rounded"
            />
            {errors.name && <span className="text-red-600">{errors.name}</span>}
          </div>

          <div>
            <label htmlFor="lastname" className="font-bold text-gray-700 mt-4 block">Apellidos</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              placeholder="Ingresa tus apellidos"
              className="w-full p-2 mt-2 border border-gray-300 rounded"
            />
            {errors.lastname && <span className="text-red-600">{errors.lastname}</span>}
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="font-bold text-gray-700 mt-4 block">Teléfono:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Ingresa tu teléfono de 8 dígitos"
            maxLength={8} // Limitar a 8 caracteres
            className="w-full p-2 mt-2 border border-gray-300 rounded"
          />
          {errors.phone && <p className="text-red-600">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="email" className="font-bold text-gray-700 mt-4 block">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ingresa tu correo electrónico"
            className="w-full p-2 mt-2 border border-gray-300 rounded"
          />
          {errors.email && <p className="text-red-600">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="message" className="font-bold text-gray-700 mt-4 block">Mensaje</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Escribe tu mensaje aquí..."
            rows="4"
            className="w-full p-2 mt-2 border border-gray-300 rounded"
          />
          {errors.message && <p className="text-red-600">{errors.message}</p>}
        </div>

        <button type="submit" className="w-full mt-6 p-2 bg-red-800 text-white text-lg rounded hover:bg-red-700">
          Enviar Mensaje
        </button>
      </form>

      <div className="flex-none w-80 p-8 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-gray-800 mb-4">Información de la Tienda</h2>
        <p className="font-bold text-gray-700">Nombre:</p>
        <p className="text-gray-600">Tienda Virtual</p>
        <p className="font-bold text-gray-700">Teléfono:</p>
        <p className="text-gray-600">+506 1234 5678</p>
        <p className="font-bold text-gray-700">Correo:</p>
        <p className="text-gray-600">contacto@tiendavirtual.com</p>
        <p className="font-bold text-gray-700">Horario:</p>
        <p className="text-gray-600">Lunes a Viernes, 9:00 AM - 6:00 PM</p>
      </div>
    </div>
  );
};

export default ContacForm;
