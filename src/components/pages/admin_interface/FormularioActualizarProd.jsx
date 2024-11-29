import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

// Componente funcional para actualizar un producto
const FormularioActualizarProducto = () => {
    // Definimos un estado local "producto" utilizando useState
    // Este estado almacenará los datos del producto que se va a actualizar
    const [producto, setProducto] = useState({
        nombre: '',        // Nombre del producto
        descripcion: '',   // Descripción del producto
        precio: '',        // Precio del producto
        stock: '',         // Cantidad de stock disponible
        subcategoria: '',  // Subcategoría a la que pertenece el producto
        estado: '',        // Estado del producto (por ejemplo, activo/inactivo)
        imagen: '',        // URL o referencia a la imagen del producto
    });

    // Definimos otro estado local "cargando" para indicar si se está cargando información
    const [cargando, setCargando] = useState(true); // Estado inicial: true (se está cargando)

   // Objeto que relaciona nombres de subcategorías con sus identificadores únicos
const subcategorias = {
    'Relojes': 17,             // Subcategoría "Relojes" con ID 17
    'Lámparas': 18,            // Subcategoría "Lámparas" con ID 18
    'Espejos': 19,             // Subcategoría "Espejos" con ID 19
    'Sofás': 14,               // Subcategoría "Sofás" con ID 14
    'Muebles para TV': 15,     // Subcategoría "Muebles para TV" con ID 15
    'Mesas de centro': 16,     // Subcategoría "Mesas de centro" con ID 16
    'Mesas de exterior': 12,   // Subcategoría "Mesas de exterior" con ID 12
    'Sillas de exterior': 11,  // Subcategoría "Sillas de exterior" con ID 11
    'Toldos': 13,              // Subcategoría "Toldos" con ID 13
    'Escritorios': 8,          // Subcategoría "Escritorios" con ID 8
    'Libreros': 9,             // Subcategoría "Libreros" con ID 9
    'Sillas de estudio': 10,   // Subcategoría "Sillas de estudio" con ID 10
    'Juegos de comedor': 5,    // Subcategoría "Juegos de comedor" con ID 5
    'Mesas': 6,                // Subcategoría "Mesas" con ID 6
    'Sillas': 7,               // Subcategoría "Sillas" con ID 7
    'Camas': 2,                // Subcategoría "Camas" con ID 2
    'Cómodas con espejo': 3,   // Subcategoría "Cómodas con espejo" con ID 3
    'Mesas de noche': 4,       // Subcategoría "Mesas de noche" con ID 4
};


   // Array que define los posibles estados de un producto
const estados = ['activo', 'inactivo']; // "activo" y "inactivo" son los estados posibles

// Hook de React Router para obtener parámetros de la URL
const { id } = useParams(); // Extrae el parámetro "id" de la URL

// Hook de React Router para manejar la navegación entre páginas
const navigate = useNavigate(); // Proporciona una función para redirigir al usuario

// Hook useEffect que se ejecuta al montar el componente o cuando cambien las dependencias
useEffect(() => {
    // Obtiene el token almacenado en las cookies
    const token = Cookies.get('token'); // Recupera el token de autenticación desde las cookies

    // Verifica si el token no está presente
    if (!token) {
        console.error('No estás autenticado'); // Muestra un mensaje de error en la consola
        return; // Sale de la función useEffect si no hay token
    }
    
        // Llamada a la API para obtener los datos de un producto
        axios.get(`http://localhost:8000/api/user-profile/products/${id}`, {
        headers: {
         Authorization: `Bearer ${token}`, // Incluye el token de autenticación en los encabezados
            },
        })
        .then((response) => {
            // Maneja la respuesta exitosa de la API
            const data = response.data.product; // Asegúrate de acceder correctamente al objeto `product`
    
            // Actualiza el estado del producto con los datos recibidos de la API
            setProducto({
                nombre: data.name,              // Asigna el nombre del producto
                descripcion: data.description,  // Asigna la descripción
                precio: data.price,             // Asigna el precio
                stock: data.stock,              // Asigna la cantidad en stock
                subcategoria: data.subcategory_id, // Asigna el ID de la subcategoría
                estado: data.status,            // Asigna el estado (activo/inactivo)
                imagen: data.image_url,         // Asigna la URL de la imagen
                });
                setCargando(false); // Marcar que los datos están cargados
            })
            .catch((error) => {
                console.error('Error al cargar los datos del producto:', error);
            });
    }, [id]);

   // Función para manejar el cierre de sesión o navegación a otra página
const handleLogout = () => navigate('/productoslist'); 
// Redirige al usuario a la página '/productoslist' al cerrar sesión o salir del formulario

// Función para manejar cambios en los campos del formulario
const handleChange = (e) => {
    const { name, value } = e.target; // Extrae el nombre y valor del campo que se modificó
    setProducto(prevState => ({
        ...prevState,      // Copia el estado anterior del producto
        [name]: value,     // Actualiza solo el campo correspondiente
    }));
};

// Función para manejar el envío del formulario
const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que la página se recargue al enviar el formulario

    const token = Cookies.get('token'); // Obtiene el token de autenticación desde las cookies
    if (!token) {
        console.error('No estás autenticado'); // Muestra un error si el token no está presente
        return; // Termina la ejecución si no hay token
    }

    console.log(producto); // Imprime los datos del producto en la consola para depuración


       // Crear un objeto FormData para enviar datos en un formato multipart/form-data
const formData = new FormData();

// Agregar los campos del producto al objeto FormData
formData.append('name', producto.nombre);            // Nombre del producto
formData.append('description', producto.descripcion); // Descripción del producto
formData.append('price', producto.precio);            // Precio del producto
formData.append('stock', producto.stock);             // Cantidad en stock del producto
formData.append('subcategory_id', producto.subcategoria); // ID de la subcategoría
formData.append('status', producto.estado);           // Estado del producto (activo/inactivo)
formData.append('image_url', producto.imagen);        // URL de la imagen del producto


try {
    // Realizar una solicitud PUT para actualizar un producto
    const response = await axios.put(
        `http://localhost:8000/api/user-profile/products/${id}`, // URL de la API con el ID del producto
        formData, // Datos del producto encapsulados en un objeto FormData
        {
            headers: {
                Authorization: `Bearer ${token}`, // Token de autenticación incluido en los encabezados
                'Content-Type': 'application/json', // Especificar el tipo de contenido
                // Nota: Si estás enviando `formData`, no es necesario especificar 'Content-Type'.
            },
        }
    );

    // Comprobar si la solicitud fue exitosa
    if (response.status === 200) {
        console.log('Producto actualizado correctamente'); // Mensaje en la consola si la respuesta es exitosa
        navigate('/productoslist'); // Redirige al usuario a la lista de productos
    }
    } catch (error) {
    // Manejar errores que ocurren durante la solicitud
    console.error('Error al actualizar el producto:', error);
    }
    };

    if (cargando) {
        return <p>Cargando...</p>; // O un spinner
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-5 bg-white rounded-lg shadow-lg">
            <nav className="absolute top-0 right-0 p-9">
                <button
                    type="button"
                    className="bg-[#381008] text-white px-4 py-2 rounded-md hover:bg-[#960500]"
                    onClick={handleLogout}
                >
                    Regresar
                </button>
            </nav>
    
            <h2 className="text-center text-2xl mb-5 text-vino-800">Actualizar Producto</h2>
    
            <label className="block mb-2 font-bold text-gray-800">
                Producto (Imagen):
                <input
                    type="text"
                    name="imagen"
                    value={producto.imagen}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border border-vino-900 rounded bg-rose-100 text-gray-800"
                    placeholder="Introduce la URL de la imagen"
                />
            </label>
    
            <label className="block mb-2 font-bold text-gray-800">
                Nombre:
                <input
                    type="text"
                    name="nombre"
                    value={producto.nombre}
                    onChange={handleChange}
                    required
                    className="w-full p-2 mb-4 border border-vino-900 rounded bg-rose-100 text-gray-800"
                />
            </label>
    
            <label className="block mb-2 font-bold text-gray-800">
                Descripción:
                <textarea
                    name="descripcion"
                    value={producto.descripcion}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border border-vino-900 rounded bg-rose-100 text-gray-800"
                />
            </label>
    
            <label className="block mb-2 font-bold text-gray-800">
                Precio:
                <input
                    type="text"
                    name="precio"
                    value={producto.precio}
                    onChange={handleChange}
                    required
                    className="w-full p-2 mb-4 border border-vino-900 rounded bg-rose-100 text-gray-800"
                />
            </label>
    
            <label className="block mb-2 font-bold text-gray-800">
                Stock:
                <input
                    type="number"
                    name="stock"
                    value={producto.stock}
                    onChange={handleChange}
                    required
                    className="w-full p-2 mb-4 border border-vino-900 rounded bg-rose-100 text-gray-800"
                />
            </label>
    
            <label className="block mb-2 font-bold text-gray-800">
                Subcategoría:
                <select
                    name="subcategoria"
                    value={producto.subcategoria}
                    onChange={handleChange}
                    required
                    className="w-full p-2 mb-4 border border-vino-900 rounded bg-rose-100 text-gray-800"
                >
                    <option value="">Selecciona una subcategoría</option>
                    {Object.keys(subcategorias).map((subcat, index) => (
                        <option key={index} value={subcategorias[subcat]}>
                            {subcat}
                        </option>
                    ))}
                </select>
            </label>
    
            <label className="block mb-2 font-bold text-gray-800">
                Estado:
                <select
                    name="estado"
                    value={producto.estado}
                    onChange={handleChange}
                    required
                    className="w-full p-2 mb-4 border border-vino-900 rounded bg-rose-100 text-gray-800"
                >
                    <option value="">Selecciona un estado</option>
                    {estados.map((estado, index) => (
                        <option key={index} value={estado}>
                            {estado}
                        </option>
                    ))}
                </select>
            </label>
    
            <button
                type="submit"
                className="w-full p-3 bg-[#381008] text-white rounded hover:bg-[#960500] transition duration-300"
            >
                Actualizar Producto
            </button>
        </form>
    );
    };
    
    export default FormularioActualizarProducto;