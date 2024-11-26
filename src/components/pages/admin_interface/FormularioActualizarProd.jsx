import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const FormularioActualizarProducto = () => {
    const [producto, setProducto] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        subcategoria: '',
        estado: '',
        imagen: '',
    });
    const [cargando, setCargando] = useState(true); // Estado para controlar la carga de datos

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
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            console.error('No estás autenticado');
            return;
        }

        axios.get(`http://localhost:8000/api/user-profile/products/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                const data = response.data.product; // Asegúrate de acceder a `product`
                setProducto({
                    nombre: data.name,
                    descripcion: data.description,
                    precio: data.price,
                    stock: data.stock,
                    subcategoria: data.subcategory_id,
                    estado: data.status,
                    imagen: data.image_url,
                });
                setCargando(false); // Marcar que los datos están cargados
            })
            .catch((error) => {
                console.error('Error al cargar los datos del producto:', error);
            });
    }, [id]);

    const handleLogout = () => navigate('/productoslist');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = Cookies.get('token');
        if (!token) {
            console.error('No estás autenticado');
            return;
        }
        console.log(producto);


        const formData = new FormData();
        formData.append('name', producto.nombre);
        formData.append('description', producto.descripcion);
        formData.append('price', producto.precio);
        formData.append('stock', producto.stock);
        formData.append('subcategory_id', producto.subcategoria);  // subcategoria_id
        formData.append('status', producto.estado);
        formData.append('image_url', producto.imagen);  // image_url
        

        try {
            const response = await axios.put(
                `http://localhost:8000/api/user-profile/products/${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                }
            );

            if (response.status === 200) {
                console.log('Producto actualizado correctamente');
                navigate('/productoslist');
            }
        } catch (error) {
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