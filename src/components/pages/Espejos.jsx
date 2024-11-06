// src/components/Espejos.jsx
import React from 'react';
import { useCart } from './shopping_cart/CartContext';

const ProductoEspejos = () => {
  const { dispatch } = useCart();

  // Lista de espejos disponibles
  const espejos = [
    { id: 1, name: 'Espejo Redondo', price: 50, image: 'ruta/a/la/imagen1.jpg', description: 'Espejo redondo elegante.' },
    { id: 2, name: 'Espejo Cuadrado', price: 75, image: 'ruta/a/la/imagen2.jpg', description: 'Espejo cuadrado moderno.' },
    // Añade más productos según sea necesario
  ];

  // Función para agregar un producto al carrito
  const addToCart = (espejo) => {
    dispatch({ type: 'ADD_TO_CART', payload: espejo });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {espejos.map((espejo) => (
        <div key={espejo.id} className="border p-4">
          <h2 className="text-xl text-texto_color">{espejo.name}</h2>
          <p className="text-texto_color">${espejo.price}</p>
          <button onClick={() => addToCart(espejo)} className="mt-2 px-4 py-2 bg-primario text-white">
            Añadir al Carrito
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductoEspejos;
