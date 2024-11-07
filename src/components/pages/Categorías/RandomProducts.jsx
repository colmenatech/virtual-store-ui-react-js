import React, { useEffect, useState } from 'react';

const RandomProducts = ({ categories }) => {
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    const getRandomProducts = (num) => {
      const allProducts = categories.flatMap(category => category.products); // Unifica todos los productos de las categorías
      const shuffled = [...allProducts].sort(() => 0.5 - Math.random()); // Mezcla aleatoriamente los productos
      return shuffled.slice(0, num); // Devuelve los primeros 'num' productos aleatorios
    };

    setRandomProducts(getRandomProducts(4)); // Cambia el número según cuántos productos deseas mostrar
  }, [categories]);

  return (
    <div className="bg-fondo py-8 px-4">
      <h2 className="text-2xl font-bold text-center text-primario mb-6">Productos Aleatorios</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {randomProducts.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-md p-4 text-center">
            <img
              src={`./assets/img/${product.image}`}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="font-semibold text-primario">{product.name}</h3>
            <p className="text-secundario mb-4">${product.price.toFixed(2)}</p>
            <a href={`/productos/${product.id}`} className="text-primario hover:underline">
              Ver Producto
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RandomProducts;
