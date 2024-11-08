import React from 'react';
import { FaEdit, FaPlusCircle, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// Componente ProductosList
const ProductosList = () => {
  // Lista de productos con una imagen de ejemplo
  const productos = [
    { 
      id: 1, nombre: 'Librero Mariposa', precio: 57000, // img: require('../img/librero_mariposa.jpg'), 
    },
    // Puedes agregar más productos aquí
  ];
  
  const navigate = useNavigate();
  const handleLogout = () => navigate('/interfazadmin');
  const handleCreateProduct = () => {
    navigate('/crearproducto'); // Redirige a la interfaz de "Crear Producto"
  };

  const handleActProduct = () => {
    navigate('/actproducto'); // Redirige a la interfaz de "Actualizar Producto"
  };

  return (
    <div className="bg-fondo text-texto_color p-8">
      <h1 className="text-3xl font-bold text-primario mb-6">Listado de Productos</h1>
      <nav class="absolute top-0 right-0 p-9"><button className="bg-[#381008] text-white px-4 py-2 rounded-md hover:bg-[#960500]" onClick={handleLogout}>Regresar</button></nav>
      <table className="w-full border border-red-300 shadow-md rounded-lg overflow-hidden">
        
        <thead>
          <tr className="bg-[#381008]"> {/* Fondo rojo para el encabezado */}
            <th className="p-4 text-left text-white text-2xl">Producto</th> {/* Texto blanco */}
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id} className="border-b border-gray-300">
              <td className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={producto.img}
                    alt={producto.nombre}
                    width="60"
                    height="60"
                    className="rounded-lg shadow-md mr-2"
                  />
                  {producto.nombre}
                </div>
                <div className="space-x-2">
                  <button className="bg-acento text-white px-2 py-1 rounded-lg hover:bg-primario flex items-center space-x-1" onClick={handleActProduct}>
                    <FaEdit /> <span>Actualizar</span>
                  </button>
                  <button className="bg-secundario text-white px-2 py-1 rounded-lg hover:bg-primario flex items-center space-x-1">
                    <FaTrash /> <span>Eliminar</span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="fixed bottom-5 right-5 bg-primario text-white p-3 rounded-full shadow-md hover:bg-secundario flex items-center justify-center"
        onClick={handleCreateProduct}
      >
        <FaPlusCircle size={24} />
      </button>
    </div>
  );
};

export default ProductosList;
