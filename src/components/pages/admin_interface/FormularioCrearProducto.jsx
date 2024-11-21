import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FormularioProducto = () => {
    // Estado para manejar los datos del producto
    const [producto, setProducto] = useState({
<<<<<<< Updated upstream
        id: '',// Identificador único del producto.
        nombre: '', // Nombre del producto.
        descripcion: '', // Descripción del producto.
        precio: '', // Precio del producto.
        stock: '', // Cantidad disponible en inventario.
        categoria: '', // Categoría principal del producto.
        subcategoria: '', // Subcategoría específica dentro de la categoría.
        estado: '', // Estado del producto (por ejemplo, activo o inactivo).
=======
        id: '',
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        categoria: '',
        subcategoria: '',
        estado: '',
>>>>>>> Stashed changes
        imagen: null, // Archivo para la imagen del producto
    });

    // Listado de categorías y subcategorías para selección dinámica
    const categorias = ['Accesorios', 'Sala', 'Muebles de patio', 'Muebles de oficina', 'Comedores', 'Dormitorios'];
    const subcategorias = {
        Accesorios: ['Relojes', 'Lampáras', 'Espejos'],// Subcategorías para la categoría "Accesorios".
        Sala: ['Sofas', 'Muebles para TV', 'Mesas de centro'], // Subcategorías para la categoría "Sala".
        Mueblesdepatio: ['Mesas de exterior', 'Sillas de exterior', 'Toldos'], // Para "Muebles de patio".
        Mueblesdeoficina: ['Escritorios', 'Libreros', 'Sillas de estudio'], // Para "Muebles de oficina".
        Comedores: ['Juegos de comedor', 'Mesas', 'Sillas'], // Para "Comedores".
        Dormitorios: ['Camas', 'Cómodas con espejo', 'Mesas de noche'], // Para "Dormitorios".
    };

    // Estados posibles para el producto
    const estados = ['Activo', 'Inactivo'];

    // Hook de React Router para manejar navegación
    const navigate = useNavigate();

    // Función para regresar a la lista de productos
    const handleLogout = () => navigate('/productoslist');

    // Función para manejar cambios en los inputs del formulario
    const handleChange = (e) => {
<<<<<<< Updated upstream
        const { name, value } = e.target;// Obtiene el nombre y el valor del input que se modificó.
        setProducto({ ...producto, [name]: value }); // Actualiza el estado del producto con el nuevo valor.
=======
        const { name, value } = e.target;
        setProducto({ ...producto, [name]: value });
>>>>>>> Stashed changes

        // Limpia la subcategoría si se cambia la categoría
        if (name === 'categoria') {
            setProducto((prev) => ({ ...prev, subcategoria: '' })); // Evita inconsistencias entre categoría y subcategoría.
        }
    };

    // Función para manejar la carga de la imagen
    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Selecciona el archivo
<<<<<<< Updated upstream
        setProducto({ ...producto, imagen: file }); // Actualiza el estado del producto con la imagen cargada.
=======
        setProducto({ ...producto, imagen: file });
>>>>>>> Stashed changes
    };

    // Función para permitir solo números en el precio
    const handlePriceChange = (e) => {
<<<<<<< Updated upstream
        const value = e.target.value.replace(/\D/g, ''); // Reemplaza cualquier carácter no numérico con una cadena vacía.
        setProducto({ ...producto, precio: value }); // Actualiza el estado del producto con el precio limpio.
=======
        const value = e.target.value.replace(/\D/g, ''); // Remueve caracteres no numéricos
        setProducto({ ...producto, precio: value });
>>>>>>> Stashed changes
    };

    // Función para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault(); // Evita la recarga de la página
<<<<<<< Updated upstream
        console.log('Producto creado:', producto); // Previene la acción predeterminada del formulario (recargar la página).

        // Prepara los datos del producto para enviar al backend
        const formData = new FormData();
        formData.append('id', producto.id); // Agrega el ID del producto.
        formData.append('nombre', producto.nombre); // Agrega el nombre del producto.
        formData.append('descripcion', producto.descripcion); // Agrega la descripción del producto.
        formData.append('precio', producto.precio); // Agrega el precio del producto.
        formData.append('stock', producto.stock); // Agrega la cantidad disponible (stock) del producto.
        formData.append('categoria', producto.categoria); // Agrega la categoría seleccionada.
        formData.append('subcategoria', producto.subcategoria); // Agrega la subcategoría seleccionada.
        formData.append('estado', producto.estado); // Agrega el estado (activo/inactivo) del producto.
=======
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

>>>>>>> Stashed changes
        // Agrega la imagen si existe
        if (producto.imagen) {
            formData.append('imagen', producto.imagen);
        }
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
        // Aquí deberías realizar una solicitud HTTP con fetch o axios para enviar los datos
    };

    return (
        // Formulario principal para enviar los datos del producto
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-5 bg-white rounded-lg shadow-lg">
            {/* Botón para regresar a la lista de productos */}
            <nav className="absolute top-0 right-0 p-9">
                <button
                    className="bg-[#381008] text-white px-4 py-2 rounded-md hover:bg-[#960500]"
<<<<<<< Updated upstream
                    onClick={handleLogout} // Llama a la función `handleLogout` para manejar la acción de regresar.
=======
                    onClick={handleLogout}
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                    type="file"// Input para cargar archivos, específicamente imágenes.
        name="imagen" // Nombre del campo, utilizado para identificarlo.
        accept="image/*" // Restringe los archivos permitidos a imágenes (png, jpg, etc.).
        onChange={handleImageChange} // Maneja el evento de cambio cuando se selecciona un archivo.
        className="w-full p-2 mb-4 border border-vino-900 rounded bg-rose-100 text-gray-800" // Estilización del input.
=======
                    type="file"
                    name="imagen"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full p-2 mb-4 border border-vino-900 rounded bg-rose-100 text-gray-800"
>>>>>>> Stashed changes
                />
            </label>

            {/* Campo para el ID del producto */}
            <label className="block mb-2 font-bold text-gray-800">
                Identificación:
                <input
<<<<<<< Updated upstream
                    type="text"// Input para cargar archivos, específicamente imágenes.
                    name="imagen" // Nombre del campo, utilizado para identificarlo.
                    accept="image/*" // Restringe los archivos permitidos a imágenes (png, jpg, etc.).
                    onChange={handleImageChange} // Maneja el evento de cambio cuando se selecciona un archivo.
                    className="w-full p-2 mb-4 border border-vino-900 rounded bg-rose-100 text-gray-800" // Estilización del input.
=======
                    type="text"
                    name="id"
                    value={producto.id}
                    onChange={handleChange}
                    required
                    className="w-full p-2 mb-4 border border-vino-900 rounded bg-rose-100 text-gray-800"
>>>>>>> Stashed changes
                />
            </label>

            {/* Campo para el nombre del producto */}
            <label className="block mb-2 font-bold text-gray-800">
                Nombre:
                <input
<<<<<<< Updated upstream
                    type="text"// Campo de texto para ingresar el ID del producto.
                    name="id" // Nombre del campo, utilizado para identificarlo en el formulario.
                    value={producto.id} // Vincula el valor del campo con el estado del producto.
                    onChange={handleChange} // Llama a la función handleChange para actualizar el estado al modificar el campo.
                    required // Indica que este campo es obligatorio.
                    className="w-full p-2 mb-4 border border-vino-900 rounded bg-rose-100 text-gray-800" // Estilos para el campo.
=======
                    type="text"
                    name="nombre"
                    value={producto.nombre}
                    onChange={handleChange}
                    required
                    className="w-full p-2 mb-4 border border-vino-900 rounded bg-rose-100 text-gray-800"
>>>>>>> Stashed changes
                />
            </label>

            {/* Campo para la descripción del producto */}
            <label className="block mb-2 font-bold text-gray-800">
                Descripción:
                <textarea
<<<<<<< Updated upstream
                    name="descripcion" // Nombre del campo, utilizado para identificarlo en el formulario.
                    value={producto.descripcion} // Vincula el valor del campo con el estado del producto.
                    onChange={handleChange} // Llama a la función handleChange para actualizar el estado al modificar el campo.
                    className="w-full p-2 mb-4 border border-vino-900 rounded bg-rose-100 text-gray-800" // Estilos aplicados al campo.
=======
                    name="descripcion"
                    value={producto.descripcion}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border border-vino-900 rounded bg-rose-100 text-gray-800"
>>>>>>> Stashed changes
                />
            </label>

            {/* Campo para el precio del producto */}
            <label className="block mb-2 font-bold text-gray-800">
                Precio:
                <div className="flex items-center mb-4">
                    <span className="mr-2">₡</span>
                    <input
                        type="text" // Campo de texto para ingresar el precio del producto.
                        name="precio" // Nombre del campo, utilizado para identificarlo en el formulario.
                        value={producto.precio} // Vincula el valor del campo con el estado `producto.precio`.
                        onChange={handlePriceChange} // Llama a la función `handlePriceChange` para manejar el cambio de valor.
                        required // Indica que el campo es obligatorio.
                        className="flex-1 p-2 border border-vino-900 rounded bg-rose-100 text-gray-800" // Estilo visual del campo.
                        placeholder="0" // Texto de ayuda que se muestra cuando el campo está vacío.
                    />
                </div>
            </label>

            {/* Campo para el stock del producto */}
            <label className="block mb-2 font-bold text-gray-800">
<<<<<<< Updated upstream
                Stock: {/* Título del campo */}
                <input
                    type="number" // El campo solo acepta números, específicamente para el stock.
                    name="stock" // Nombre del campo para identificarlo.
                    value={producto.stock} // Valor del campo vinculado al estado `producto.stock`.
                    onChange={handleChange} // Llama a la función `handleChange` cuando el valor cambia.
                    required // Hace que este campo sea obligatorio.
                    className="w-full p-2 mb-4 border border-vino-900 rounded bg-rose-100 text-gray-800" // Estilo visual del campo.
=======
                Stock:
                <input
                    type="number"
                    name="stock"
                    value={producto.stock}
                    onChange={handleChange}
                    required
                    className="w-full p-2 mb-4 border border-vino-900 rounded bg-rose-100 text-gray-800"
>>>>>>> Stashed changes
                />
            </label>

            {/* Selector de categoría */}
            <label className="block mb-2 font-bold text-gray-800">
<<<<<<< Updated upstream
                Categoría: {/* Título del campo */}
                <select
                    name="categoria" // Nombre del campo para la categoría.
                    value={producto.categoria} // Vincula el valor al estado `producto.categoria`.
                    onChange={handleChange} // Llama a `handleChange` al cambiar la selección.
                    required // Hace que este campo sea obligatorio.
                    className="w-full p-2 mb-4 border border-vino-900 rounded bg-rose-100 text-gray-800" // Estilo del selector.
                >
                    <option value="">Selecciona una categoría</option> {/* Opción predeterminada, que solicita seleccionar una categoría */}
                    {categorias.map((cat, index) => ( // Mapea las categorías y las inserta como opciones.
                        <option key={index} value={cat}>
                            {cat} {/* Nombre de la categoría */}
=======
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
>>>>>>> Stashed changes
                        </option>
                    ))}
                </select>
            </label>

            {/* Selector de subcategoría */}
            <label className="block mb-2 font-bold text-gray-800">
<<<<<<< Updated upstream
                Subcategoría: {/* Título del campo */}
                <select
                    name="subcategoria" // Nombre del campo para la subcategoría.
                    value={producto.subcategoria} // Vincula el valor al estado `producto.subcategoria`.
                    onChange={handleChange} // Llama a `handleChange` al cambiar la subcategoría.
                    required // Hace que este campo sea obligatorio.
                    disabled={!producto.categoria} // Deshabilita el campo si no se ha seleccionado una categoría.
                    className="w-full p-2 mb-4 border border-vino-900 rounded bg-rose-100 text-gray-800" // Estilo del selector.
                >
                    <option value="">Selecciona una subcategoría</option>
                    {producto.categoria &&  // Verifica que haya una categoría seleccionada antes de mostrar subcategorías.
                        subcategorias[producto.categoria].map((subcat, index) => ( // Mapea las subcategorías correspondientes a la categoría seleccionada.
                            <option key={index} value={subcat}>
                                {subcat}   {/* Nombre de la subcategoría */}
=======
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
>>>>>>> Stashed changes
                            </option>
                        ))}
                </select>
            </label>

            {/* Selector de estado */}
            <label className="block mb-2 font-bold text-gray-800">
<<<<<<< Updated upstream
                Estado: {/* Título del campo */}
                <select
                    name="estado" // Nombre del campo para el estado.
                    value={producto.estado} // Vincula el valor al estado `producto.estado`.
                    onChange={handleChange} // Llama a `handleChange` al cambiar el estado.
                    required // Hace que este campo sea obligatorio.
                    className="w-full p-2 mb-4 border border-vino-900 rounded bg-rose-100 text-gray-800" // Estilo del selector.
                >
                    <option value="">Selecciona un estado</option>
                    {estados.map((estado, index) => ( // Mapea los estados y los inserta como opciones.
                        <option key={index} value={estado}>
                            {estado}  {/* Nombre del estado */}
=======
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
>>>>>>> Stashed changes
                        </option>
                    ))}
                </select>
            </label>

            {/* Botón para enviar el formulario */}
            <button
<<<<<<< Updated upstream
                type="submit"  // El tipo de botón es "submit" para enviar el formulario.
                className="w-full p-3 bg-[#381008] text-white rounded hover:bg-[#960500] transition duration-300"> {/* Estilo del botón (ancho completo, padding, color de fondo, hover effect). */}
                Crear Producto  {/* Texto del botón */}
=======
                type="submit"
                className="w-full p-3 bg-[#381008] text-white rounded hover:bg-[#960500] transition duration-300">
                Crear Producto
>>>>>>> Stashed changes
            </button>
        </form>
    );
}

export default FormularioProducto;