import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const FormularioProducto = () => {
        const [producto, setProducto] = useState({
            nombre: '',
            descripcion: '',
            precio: '',
            stock: '',
            subcategoria: '',  // Solo subcategoría aquí
            estado: '',
            imagen: '',
        });
    
        // Subcategorías con sus IDs
        const subcategorias = {
            'Relojes': 17,
            'Lámparas': 18,
            'Espejos': 19,
            'Sofás': 14,
            'Muebles para TV': 15,
            'Mesas de centro': 16,
            'Mesas de exterior': 12,
            'Sillas de exterior': 11,
            'Toldos': 13,
            'Escritorios': 8,
            'Libreros': 9,
            'Sillas de estudio': 10,
            'Juegos de comedor': 5,
            'Mesas': 6,
            'Sillas': 7,
            'Camas': 2,
            'Cómodas con espejo': 3,
            'Mesas de noche': 4,
        };
    

    const estados = ['activo', 'inactivo'];
    const navigate = useNavigate();

    const handleLogout = () => navigate('/productoslist');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto(prevState => ({
            ...prevState,
            [name]: value,  // Actualiza el valor del campo correspondiente
        }));
    };
    const handleImageChange = (e) => {
        const url = e.target.value;  // Aquí se obtiene la URL de la imagen
        setProducto({ ...producto, imagen: url });
    };

    const handlePriceChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        setProducto({ ...producto, precio: value });
    };
    const [error, setError] = useState('');
    const handleSubmit = async (e) => {
        const token = Cookies.get('token'); // Obtener el token de las cookies
        e.preventDefault(); // Evita la recarga de la página.
    
        const formData = new FormData();
        formData.append("name", producto.nombre);
        formData.append("description", producto.descripcion);  // Cambiar 'descripcion' a 'description'
        formData.append("price", producto.precio);  // Cambiar 'precio' a 'price'
        formData.append("stock", producto.stock);
        formData.append("subcategory_id", producto.subcategoria);  // Cambiar 'subcategoria' a 'subcategory_id'
        formData.append("status", producto.estado);  // Cambiar 'estado' a 'status'
        formData.append("image_url", producto.imagen);  // Enviar la URL de la imagen
    
            if (!token) {
              setError('No estás autenticado');
              return;
            }
        
            try {
                const response = await axios.post(
                    'http://localhost:8000/api/user-profile/products', 
                    formData,  // Usar formData aquí
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, // Agregar el token en los encabezados de la solicitud
                        },
                    }
                );
        
              if (response.status === 201) {
                // Lógica después de crear el producto con éxito
                console.log('Producto creado correctamente');
                navigate('/products'); // Redirigir a la lista de productos o cualquier otra página
              }
            } catch (error) {
              setError('Hubo un error al crear el producto');
              console.error('Error en la creación del producto:', error);
            }
          };
        

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

            <h2 className="text-center text-2xl mb-5 text-vino-800">Crear Producto</h2>

            <label className="block mb-2 font-bold text-gray-800">
                Producto (Imagen):
                <input
                    type="text"
                    name="imagen"
                    value={producto.imagen} // Ahora se usa la URL de la imagen
                    onChange={handleImageChange}
                    className="w-full p-2 mb-4 border border-vino-900 rounded bg-rose-100 text-gray-800"
                    placeholder="Introduce la URL de la imagen"
                />
            </label>

            <label className="block mb-2 font-bold text-gray-800">
                Nombre:
                    <input
                        type="text"
                        name="nombre"
                        value={producto.nombre} // Aquí se usa 'producto.nombre'
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
                <div className="flex items-center mb-4">
                    <span className="mr-2">₡</span>
                    <input
                        type="text"
                        name="precio"
                        value={producto.precio}
                        onChange={handlePriceChange}
                        required
                        className="flex-1 p-2 border border-vino-900 rounded bg-rose-100 text-gray-800"
                        placeholder="0"
                    />
                </div>
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
                Crear Producto
            </button>
        </form>
    );
};

export default FormularioProducto;
