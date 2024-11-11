import React, { useState, useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa'; // Icono de carrito
import { useCart } from '../shopping_cart/CartContext'; // Asegúrate de tener el contexto de carrito configurado

const RandomProducts = ({ onHide }) => {
  const { dispatch } = useCart(); // Accedemos al dispatch del contexto del carrito
  const [products, setProducts] = useState([]);

  useEffect(() => {
    
    const sampleProducts = [
      { id: 1, nombre: 'Espejo baño cuadrado', precio: 500, },
      { id: 2, nombre: 'Espejo champague italiano', precio: 300, },
      { id: 3, nombre: 'Espejo cuadrado negro', precio: 150, },
      { id: 4, nombre: 'Espejo para escritorio', precio: 400, },
      { id: 5, nombre: 'Espejo de pie', precio: 250, },
      { id: 6, nombre: 'Espejo irregular negro', precio: 700, },
      { id: 7, nombre: 'Espejo irregular rosado', precio: 120, },
      { id: 8, nombre: 'Espejo con marco de madera', precio: 400, },
      { id: 9, nombre: 'Espejo moderno para recibidor', precio: 350, },
      { id: 10, nombre: 'Espejo redondo dorado', precio: 90, },
      { id: 11, nombre: 'Espejo redondo con luz led', precio: 50, },
      { id: 12, nombre: 'Espejo redondo sencillo', precio: 200, },
      { id: 13, nombre: 'Lámpara Biconica', precio: 500, },
      { id: 14, nombre: 'Lámpara Blanca', precio: 300, },
      { id: 15, nombre: 'Lámpara Cuadrada', precio: 150, },
      { id: 16, nombre: 'Lámpara de Luna', precio: 400, },
      { id: 17, nombre: 'Lámpara de Mesa', precio: 250, },
      { id: 18, nombre: 'Lámpara Flor', precio: 700, },
      { id: 19, nombre: 'Lámpara Irregular Blanca', precio: 120, },
      { id: 20, nombre: 'Lámpara Larga', precio: 400, },
      { id: 21, nombre: 'Lámpara de Madera', precio: 350, },
      { id: 22, nombre: 'Lámpara Negra', precio: 90, },
      { id: 23, nombre: 'Lámpara Pie', precio: 50, },
      { id: 24, nombre: 'Trio Lámparas de Madera', precio: 200, },
      { id: 25, nombre: 'Reloj digital de mesa', precio: 500, },
      { id: 26, nombre: 'Reloj con forma de luna decorativo', precio: 300, },
      { id: 27, nombre: 'Reloj con forma de gato decorativo', precio: 150, },
      { id: 28, nombre: 'Reloj moderno nordico color azul', precio: 400, },
      { id: 29, nombre: 'Reloj moderno nordico color dorado', precio: 250, },
      { id: 30, nombre: 'Reloj moderno nordico color negro', precio: 700, },
      { id: 31, nombre: 'Reloj digital grande de pared', precio: 120, },
      { id: 32, nombre: 'Reloj de pared con pendulo', precio: 400, },
      { id: 33, nombre: 'Reloj con forma de pluma decorativo', precio: 350, },
      { id: 34, nombre: 'Reloj estilo romano color negro', precio: 90, },
      { id: 35, nombre: 'Reloj estilo romano', precio: 50, },
      { id: 36, nombre: 'Reloj grande de pared estilo sencillo', precio: 200, },
    ];

    const randomProducts = sampleProducts.sort(() => 0.5 - Math.random()).slice(0, 20);
    setProducts(randomProducts);
  }, []);

  // Función para agregar un producto al carrito
  const addToCart = (producto, e) => {
    e.stopPropagation(); // Evita que el clic en el botón propague y cierre el componente
    dispatch({ type: 'ADD_TO_CART', payload: producto });
  };

  return (
    <section className="p-8 text-center">
      <div className="bg-[#5d0909] rounded-lg py-4 px-6 mb-8 shadow-lg">
        <h2 className="text-3xl text-white font-semibold mb-2">Productos Recomendados</h2>
        <div className="w-10 h-1 bg-white mx-auto mt-2 rounded"></div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8"> {/* Cambié aquí para tener 4 columnas en pantallas grandes */}
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
            onClick={onHide} // Solo cierra el componente cuando se hace clic fuera del botón
          >
            <div className="p-4">
              <img 
                src={product.img || "https://via.placeholder.com/250"} 
                alt={product.nombre} 
                className="w-full h-48 object-cover mb-4" // Ajusta la imagen al tamaño adecuado
              />
              <p className="text-gray-600 mb-2 text-xl">{product.nombre}</p>
              <p className="text-black-600 text-m">${product.precio}</p>
              <button
                onClick={(e) => addToCart(product, e)} // Pasa el evento para detener la propagación
                className="bg-[#381008] text-white rounded-md py-2 px-4 flex items-center justify-center gap-2 hover:bg-[#bc5353] transition-colors mx-auto block"
              >
                <FaShoppingCart /> 
                <span>Agregar al carrito</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RandomProducts;
