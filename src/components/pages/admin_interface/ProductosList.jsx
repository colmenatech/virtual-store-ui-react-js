import React from 'react'; // Importa React para poder crear el componente.
import { FaEdit, FaPlusCircle, FaTrash } from 'react-icons/fa'; // Importa los íconos de React Icons para editar, agregar y eliminar productos.
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate de react-router-dom para navegar entre rutas.

// Componente ProductosList
const ProductosList = () => { // Declara el componente ProductosList.
  // Lista de productos con una imagen de ejemplo (comentada).
  const productos = [
    { 
      id: 1, // ID único del producto
      nombre: 'Librero Mariposa', // Nombre del producto
      precio: 57000, // Precio del producto
      // img: require('../img/librero_mariposa.jpg'), // Ruta de la imagen del producto.
    },
  ];
  
  const navigate = useNavigate(); // Inicializa el hook useNavigate para gestionar la navegación entre páginas.
  const handleLogout = () => navigate('/interfazadmin'); // Función para redirigir a la página de administración al hacer logout.
  const handleCreateProduct = () => { // Función para redirigir a la página de "Crear Producto" al hacer clic en el botón.
    navigate('/crearproducto'); // Redirige a la interfaz de "Crear Producto"
  };

  const handleActProduct = () => {
    navigate('/actproducto'); // Redirige a la interfaz de "Actualizar Producto"
  };

  return (
    <div className="bg-fondo text-texto_color p-8"> {/* Contenedor principal con fondo y colores de texto personalizados */}
      <h1 className="text-3xl font-bold text-primario mb-6">Listado de Productos</h1> {/* Título con tamaño de texto, color y margen inferior */}
      <nav class="absolute top-0 right-0 p-9">  {/* Barra de navegación con un botón "Regresar" */}
      <button className="bg-[#381008] text-white px-4 py-2 rounded-md hover:bg-[#960500]" // Estilo para el botón (color de fondo, texto, padding, bordes, efecto hover)
      onClick={handleLogout}> {/* Al hacer clic, llama a la función handleLogout (probablemente para cerrar sesión)*/}
        Regresar</button></nav>  {/* Texto que aparece en el botón */}
      <table className="w-full border border-red-300 shadow-md rounded-lg overflow-hidden"> {/* Tabla con bordes, sombra y redondeo */}
        
        <thead>
          <tr className="bg-[#381008]"> {/* Fondo rojo para el encabezado */}
            <th className="p-4 text-left text-white text-2xl">Producto</th> {/* Columna con texto alineado a la izquierda, blanco, y tamaño de texto 2xl */}
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => ( // Itera sobre la lista de productos y genera una fila por cada producto
            <tr key={producto.id} className="border-b border-gray-300"> {/* Fila de la tabla con un borde inferior gris */}
              <td className="p-4 flex items-center justify-between"> {/* Celda con padding y flexbox para alinear los elementos */}
                <div className="flex items-center"> {/* Contenedor para imagen y nombre del producto */}
                  <img
                    src={producto.img} // Imagen del producto
                    alt={producto.nombre} // Texto alternativo con el nombre del producto
                    width="60" // Ancho de la imagen
                    height="60" // Alto de la imagen
                    className="rounded-lg shadow-md mr-2" // Redondea la imagen, agrega sombra y margen derecho
                  />
                  {producto.nombre} {/* Nombre del producto */}
                </div>
                <div className="space-x-2">  {/* Contenedor para los botones con espacio entre ellos */}
                  <button className="bg-acento text-white px-2 py-1 rounded-lg hover:bg-primario flex items-center space-x-1" // Estilo del botón de actualizar (color de fondo, texto, padding, bordes, efecto hover)
                  onClick={handleActProduct}> {/* Al hacer clic, redirige a la página de actualización del producto*/}
                    <FaEdit /> <span>Actualizar</span>  {/* Ícono de edición y texto "Actualizar" */}
                  </button>
                  <button className="bg-secundario text-white px-2 py-1 rounded-lg hover:bg-primario flex items-center space-x-1"> {/*  Estilo del botón de eliminar */}
                    <FaTrash /> <span>Eliminar</span> {/* Ícono de basura y texto "Eliminar" */}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="fixed bottom-5 right-5 bg-primario text-white p-3 rounded-full shadow-md hover:bg-secundario flex items-center justify-center" // Estilo para el botón de crear (posicionado de forma fija en la esquina inferior derecha)
        onClick={handleCreateProduct} // Al hacer clic, llama a la función `handleCreateProduct` (probablemente para crear un nuevo producto)
        >
        <FaPlusCircle size={24} /> {/* Ícono de añadir producto */}
      </button>
    </div>
  );
};

export default ProductosList; // Exporta el componente "ProductosList" para que pueda ser utilizado en otras partes del proyecto
