import React, { useState, useEffect } from 'react';
import { FaEdit, FaPlusCircle, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProductosList = () => {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();
  const token = Cookies.get('token');

  useEffect(() => {
    if (!token) {
      console.error('No estás autenticado');
      return;
    }

    // Obtener la lista de productos
    fetch('http://localhost:8000/api/user-profile/products', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error('Error en la respuesta de la API');
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data.products)) setProductos(data.products);
        else console.error('La respuesta no contiene un arreglo de productos:', data);
      })
      .catch((error) => console.error('Error al obtener los productos:', error));
  }, [token]);

  // Obtener producto por ID
  const fetchProductById = (id) => {
    if (!token) {
      console.error('No estás autenticado');
      return;
    }

    fetch(`http://localhost:8000/api/user-profile/productsclient/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error('Error en la respuesta de la API');
        return response.json();
      })
      .then((data) => console.log('Producto obtenido por ID:', data))
      .catch((error) => console.error('Error al obtener el producto por ID:', error));
  };

  // Obtener productos por subcategoría
  const fetchProductsBySubcategory = (subcategoryId) => {
    if (!token) {
      console.error('No estás autenticado');
      return;
    }

    fetch(`http://localhost:8000/api/user-profile/products/subcategoryclient/${subcategoryId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error('Error en la respuesta de la API');
        return response.json();
      })
      .then((data) => console.log('Productos obtenidos por subcategoría:', data))
      .catch((error) => console.error('Error al obtener productos por subcategoría:', error));
  };

  const handleLogout = () => navigate('/interfazadmin');
  const handleCreateProduct = () => navigate('/crearproducto');

  const handleActProduct = (id) => {
    if (!token) {
      console.error('No estás autenticado');
      return;
    }
    navigate(`/actproducto/${id}`);
  };

  const handleDeleteProduct = (id) => {
    if (!token) {
      console.error('No estás autenticado');
      return;
    }

    fetch(`http://localhost:8000/api/user-profile/products/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        setProductos(productos.filter((producto) => producto.id !== id));
      })
      .catch((error) => console.error('Error al eliminar el producto:', error));
  };

  return (
    <div className="bg-fondo text-texto_color p-8">
      <h1 className="text-3xl font-bold text-primario mb-6">Listado de Productos</h1>
      <nav className="absolute top-0 right-0 p-9">
        <button
          className="bg-[#381008] text-white px-4 py-2 rounded-md hover:bg-[#960500]"
          onClick={handleLogout}
        >
          Regresar
        </button>
      </nav>
      <table className="w-full border border-red-300 shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-[#381008]">
            <th className="p-4 text-left text-white text-2xl">Productos</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id} className="border-b border-gray-300">
              <td className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={producto.image_url}
                    alt={producto.name}
                    width="60"
                    height="60"
                    className="rounded-lg shadow-md mr-2"
                  />
                  {producto.name}
                </div>
                <div className="space-x-2">
                  <button
                    className="bg-acento text-white px-2 py-1 rounded-lg hover:bg-primario flex items-center space-x-1"
                    onClick={() => handleActProduct(producto.id)}
                  >
                    <FaEdit /> <span>Actualizar</span>
                  </button>
                  <button
                    className="bg-secundario text-white px-2 py-1 rounded-lg hover:bg-primario flex items-center space-x-1"
                    onClick={() => handleDeleteProduct(producto.id)}
                  >
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