import React, { useState, useEffect } from 'react';
import { FaEdit, FaPlusCircle, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Importar Cookies
// Componente funcional para mostrar la lista de productos
const ProductosList = () => {
  const [productos, setProductos] = useState([]); // Estado local para almacenar la lista de productos
  const navigate = useNavigate(); // Hook para manejar la navegación entre páginas

  // Obtener el token de autenticación desde las cookies
  const token = Cookies.get('token');

  useEffect(() => {
      // Verifica si el usuario está autenticado
      if (!token) {
          console.error('No estás autenticado'); // Muestra un error si no hay token
          return; // Detiene la ejecución si el token no existe
      }

      // Realiza una solicitud para obtener la lista de productos
      fetch('http://localhost:8000/api/user-profile/products', {
          headers: {
              Authorization: `Bearer ${token}`, // Incluye el token en los encabezados para autenticar la solicitud
          },
      })
          .then((response) => {
              // Verifica si la respuesta de la API es exitosa
              if (!response.ok) {
                  throw new Error('Error en la respuesta de la API'); // Lanza un error si la respuesta no es válida
              }
              return response.json(); // Convierte la respuesta en un objeto JSON
          })
          .then((data) => {
              // Comprueba si la respuesta contiene un arreglo de productos
              if (Array.isArray(data.products)) {
                  setProductos(data.products); // Actualiza el estado con la lista de productos
              } else {
                  console.error('La respuesta de la API no contiene un arreglo de productos:', data); // Muestra un error si el formato es incorrecto
              }
          })
          .catch((error) => console.error('Error al obtener los productos:', error)); // Maneja errores en la solicitud
  }, [token]); // El efecto depende del token para evitar ejecuciones innecesarias

  
 // Función para manejar el cierre de sesión, redirige al usuario a la interfaz de administración
const handleLogout = () => navigate('/interfazadmin'); // Redirige a la página '/interfazadmin'

// Función para manejar la creación de un nuevo producto, redirige a la página de creación de producto
const handleCreateProduct = () => navigate('/crearproducto'); // Redirige a la página '/crearproducto'

// Función para manejar la edición de un producto, redirige a la página de edición de producto con el ID
const handleActProduct = (id) => {
    navigate(`/actproducto/${id}`);  // Redirige a la página de edición del producto con el ID correspondiente

    // Verifica si el usuario está autenticado antes de continuar
    if (!token) {
        console.error('No estás autenticado'); // Muestra un error en consola si no hay token
        return; // Detiene la ejecución si no está autenticado
    }
};

// Función para manejar la eliminación de un producto
const handleDeleteProduct = (id) => {
    // Verifica si el usuario está autenticado antes de intentar eliminar el producto
    if (!token) {
        console.error('No estás autenticado'); // Muestra un error en consola si no hay token
        return; // Detiene la ejecución si no está autenticado
    }

    // Realiza una solicitud DELETE para eliminar el producto con el ID especificado
    fetch(`http://localhost:8000/api/user-profile/products/${id}`, {
        method: 'DELETE', // Especifica que la solicitud será de tipo DELETE
        headers: {
            Authorization: `Bearer ${token}`, // Incluye el token de autenticación en los encabezados
        },
    })
        .then(() => {
            // Si la eliminación es exitosa, actualiza el estado de la lista de productos
            setProductos(productos.filter((producto) => producto.id !== id)); // Filtra el producto eliminado de la lista
        })
        .catch((error) => console.error('Error al eliminar el producto:', error)); // Maneja errores si la solicitud falla
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
