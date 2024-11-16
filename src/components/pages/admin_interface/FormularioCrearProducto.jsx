import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FormularioProducto = () => {
    // Estado para manejar los datos del producto
    const [producto, setProducto] = useState({
        id: '',
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        categoria: '',
        subcategoria: '',
        estado: '',
        imagen: null, // Archivo para la imagen del producto
    });

    // Listado de categorías y subcategorías para selección dinámica
    const categorias = ['Accesorios', 'Sala', 'Muebles de patio', 'Muebles de oficina', 'Comedores', 'Dormitorios'];
    const subcategorias = {
        Accesorios: ['Relojes', 'Lampáras', 'Espejos'],
        Sala: ['Sofas', 'Muebles para TV', 'Mesas de centro'],
        Mueblesdepatio: ['Mesas de exterior', 'Sillas de exterior', 'Toldos'],
        Mueblesdeoficina: ['Escritorios', 'Libreros', 'Sillas de estudio'],
        Comedores: ['Juegos de comedor', 'Mesas', 'Sillas'],
        Dormitorios: ['Camas', 'Cómodas con espejo', 'Mesas de noche'],
    };

    // Estados posibles para el producto
    const estados = ['Activo', 'Inactivo'];

    // Hook de React Router para manejar navegación
    const navigate = useNavigate();

    // Función para regresar a la lista de productos
    const handleLogout = () => navigate('/productoslist');

    // Función para manejar cambios en los inputs del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto({ ...producto, [name]: value });

        // Limpia la subcategoría si se cambia la categoría
        if (name === 'categoria') {
            setProducto((prev) => ({ ...prev, subcategoria: '' }));
        }
    };

    // Función para manejar la carga de la imagen
    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Selecciona el archivo
        setProducto({ ...producto, imagen: file });
    };

    // Función para permitir solo números en el precio
    const handlePriceChange = (e) => {
        const value = e.target.value.replace(/\D/g, ''); // Remueve caracteres no numéricos
        setProducto({ ...producto, precio: value });
    };

    // Función para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault(); // Evita la recarga de la página
        console.log('Producto creado:', producto); // Debugging

        // Prepara los datos del producto para enviar al backend
        const formData = new FormData();
        formData.append('id', producto.id);
        formData.append('nombre', producto.nombre);
        formData.append('descripcion', producto.descripcion);
        formData.append('precio', producto.precio);
        formData.append('stock', producto.stock);
        formData.append('categoria', producto.categoria);
        formData.append('subcategoria', producto.subcategoria);
        formData.append('estado', producto.estado);

        // Agrega la imagen si existe
        if (producto.imagen) {
            formData.append('imagen', producto.imagen);
        }

        // Aquí deberías realizar una solicitud HTTP con fetch o axios para enviar los datos
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-5 bg-white rounded-lg shadow-lg">
            {/* Botón para regresar a la lista de productos */}
            <nav className="absolute top-0 right-0 p-9">
                <button
                    className="bg-[#381008] text-white px-4 py-2 rounded-md hover:bg-[#960500]"
                    onClick={handleLogout}
                >
                    Regresar
                </button>
            </nav>

            {/* Título del formulario */}
            <h2 className="text-center text-2xl mb-5 text-vino-800">Crear Producto</h2>

            {/* Campo para cargar la imagen del producto */}
            <label className="block mb-2 font-bold text-gray-800">
                Producto (Imagen):
                <input
                    type="file"
                    name="imagen"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full p-2 mb-4 border border-vino-900 rounded bg-rose-100 text-gray-800"
                />
            </label>

            {/* Campo para el ID del producto */}
            <label className="block mb-2 font-bold text-gray-800">
                Identificación:
                <input
                    type="text"
                    name="id"
                    value={producto.id}
                    onChange={handleChange}
                    required
                    className="w-full p-2 mb-4 border border-vino-900 rounded bg-rose-100 text-gray-800"
                />
            </label>

            {/* Campo para el nombre del producto */}
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

            {/* Campo para la descripción del producto */}
            <label className="block mb-2 font-bold text-gray-800">
                Descripción:
                <textarea
                    name="descripcion"
                    value={producto.descripcion}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border border-vino-900 rounded bg-rose-100 text-gray-800"
                />
            </label>

            {/* Campo para el precio del producto */}
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

            {/* Campo para el stock del producto */}
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

            {/* Selector de categoría */}
            <label className="block mb-2 font-bold text-gray-800">
                Categoría:
                <select
                    name="categoria"
                    value={producto.categoria}
                    onChange={handleChange}
                    required
                    className="w-full p-2 mb-4 border border-vino-900 rounded bg-rose-100 text-gray-800"
                >
                    <option value="">Selecciona una categoría</option>
                    {categorias.map((cat, index) => (
                        <option key={index} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </label>

            {/* Selector de subcategoría */}
            <label className="block mb-2 font-bold text-gray-800">
                Subcategoría:
                <select
                    name="subcategoria"
                    value={producto.subcategoria}
                    onChange={handleChange}
                    required
                    disabled={!producto.categoria} // Deshabilita si no hay categoría seleccionada
                    className="w-full p-2 mb-4 border border-vino-900 rounded bg-rose-100 text-gray-800"
                >
                    <option value="">Selecciona una subcategoría</option>
                    {producto.categoria &&
                        subcategorias[producto.categoria].map((subcat, index) => (
                            <option key={index} value={subcat}>
                                {subcat}
                            </option>
                        ))}
                </select>
            </label>

            {/* Selector de estado */}
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

            {/* Botón para enviar el formulario */}
            <button
                type="submit"
                className="w-full p-3 bg-[#381008] text-white rounded hover:bg-[#960500] transition duration-300">
                Crear Producto
            </button>
        </form>
    );
};

export default FormularioProducto;