import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FormularioActualizarProducto = ({ productoInicial }) => {
    const [producto, setProducto] = useState({
        id: '',
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        categoria: '',
        subcategoria: '',
        estado: '',
        imagen: null,
    });

    useEffect(() => {
        if (productoInicial) {
            setProducto(productoInicial);
        }
    }, [productoInicial]);
    const navigate = useNavigate();
    const handleLogout = () => navigate('/productoslist');
    const categorias = ['Accesorios', 'Sala', 'Muebles de patio', 'Muebles de oficina', 'Comedores', 'Dormitorios'];
    const subcategorias = {
        Accesorios: ['Relojes', 'Lampáras', 'Espejos'],
        Sala: ['Sofas', 'Muebles para TV', 'Mesas de centro'],
        Mueblesdepatio: ['Mesas de exterior', 'Sillas de exterior', 'Toldos'],
        Mueblesdeoficina: ['Escritorios', 'Libreros', 'Sillas de estudio'],
        Comedores: ['Juegos de comedor', 'Mesas', 'Sillas'],
        Dormitorios: ['Camas', 'Cómodas con espejo', 'Mesas de noche'],
    };
    const estados = ['Activo', 'Inactivo'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto({ ...producto, [name]: value });
        if (name === 'categoria') {
            setProducto((prev) => ({ ...prev, subcategoria: '' }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setProducto({ ...producto, imagen: file });
    };

    const handlePriceChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        setProducto({ ...producto, precio: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Producto actualizado:', producto);

        const formData = new FormData();
        formData.append('id', producto.id);
        formData.append('nombre', producto.nombre);
        formData.append('descripcion', producto.descripcion);
        formData.append('precio', producto.precio);
        formData.append('stock', producto.stock);
        formData.append('categoria', producto.categoria);
        formData.append('subcategoria', producto.subcategoria);
        formData.append('estado', producto.estado);
        if (producto.imagen) {
            formData.append('imagen', producto.imagen);
        }
        // Aquí harías la petición PUT o PATCH con fetch() o axios para actualizar `formData`.
    };

    return (
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-5 bg-white rounded-lg shadow-lg">
            <nav class="absolute top-4 right-0 -translate-x-0 px-4"><button className="bg-[#381008] text-white px-4 py-2 rounded-md hover:bg-[#960500]" onClick={handleLogout}>
                    Regresar
                </button></nav>
            
            <h2 className="text-center text-2xl mb-5 text-red-800">Actualizar Producto</h2>

            <label className="block mb-2 font-bold text-gray-800">Producto (Imagen):
                <input 
                    type="file"
                    name="imagen"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full p-2 mb-4 border border-red-900 rounded bg-red-100 text-gray-800"
                />
            </label>
            
            <label className="block mb-2 font-bold text-gray-800">Identificación:
                <input 
                    type="text"
                    name="id"
                    value={producto.id}
                    onChange={handleChange}
                    required
                    readOnly
                    className="w-full p-2 mb-4 border border-red-900 rounded bg-red-100 text-gray-800"
                />
            </label>

            <label className="block mb-2 font-bold text-gray-800">Nombre:
                <input 
                    type="text"
                    name="nombre"
                    value={producto.nombre}
                    onChange={handleChange}
                    required
                    className="w-full p-2 mb-4 border border-red-900 rounded bg-red-100 text-gray-800"
                />
            </label>

            <label className="block mb-2 font-bold text-gray-800">Descripción:
                <textarea 
                    name="descripcion"
                    value={producto.descripcion}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border border-red-900 rounded bg-red-100 text-gray-800"
                />
            </label>

            <label className="block mb-2 font-bold text-gray-800">Precio:
                <div className="flex items-center mb-4">
                    <span className="mr-2">₡</span>
                    <input
                        type="text"
                        name="precio"
                        value={producto.precio}
                        onChange={handlePriceChange}
                        required
                        className="flex-1 p-2 border border-red-900 rounded bg-red-100 text-gray-800"
                        placeholder="0"
                    />
                </div>
            </label>

            <label className="block mb-2 font-bold text-gray-800">Stock:
                <input 
                    type="number"
                    name="stock"
                    value={producto.stock}
                    onChange={handleChange}
                    required
                    className="w-full p-2 mb-4 border border-red-900 rounded bg-red-100 text-gray-800"
                />
            </label>

            <label className="block mb-2 font-bold text-gray-800">Categoría:
                <select 
                    name="categoria"
                    value={producto.categoria}
                    onChange={handleChange}
                    required
                    className="w-full p-2 mb-4 border border-red-900 rounded bg-red-100 text-gray-800"
                >
                    <option value="">Selecciona una categoría</option>
                    {categorias.map((cat, index) => (
                        <option key={index} value={cat}>{cat}</option>
                    ))}
                </select>
            </label>

            <label className="block mb-2 font-bold text-gray-800">Subcategoría:
                <select 
                    name="subcategoria"
                    value={producto.subcategoria}
                    onChange={handleChange}
                    required
                    disabled={!producto.categoria}
                    className="w-full p-2 mb-4 border border-red-900 rounded bg-red-100 text-gray-800"
                >
                    <option value="">Selecciona una subcategoría</option>
                    {producto.categoria &&
                        subcategorias[producto.categoria].map((subcat, index) => (
                            <option key={index} value={subcat}>{subcat}</option>
                        ))}
                </select>
            </label>

            <label className="block mb-2 font-bold text-gray-800">Estado:
                <select 
                    name="estado"
                    value={producto.estado}
                    onChange={handleChange}
                    required
                    className="w-full p-2 mb-4 border border-red-900 rounded bg-red-100 text-gray-800"
                >
                    <option value="">Selecciona un estado</option>
                    {estados.map((estado, index) => (
                        <option key={index} value={estado}>{estado}</option>
                    ))}
                </select>
            </label>

            <button type="submit" className="w-full p-3 bg-[#381008] text-white rounded hover:bg-[#960500] transition duration-300">Actualizar Producto</button>
        </form>
    );
};

export default FormularioActualizarProducto;
