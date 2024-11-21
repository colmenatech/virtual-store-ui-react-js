// Importa React y los hooks useState y useEffect para manejar estado y efectos secundarios.
import React, { useState, useEffect } from 'react';
// Importa useNavigate de react-router-dom para la navegación entre rutas.
import { useNavigate } from 'react-router-dom';

// Componente funcional para el formulario de actualización de productos.
const FormularioActualizarProducto = ({ productoInicial }) => {
    // Estado local para manejar los datos del producto que se actualiza.
    const [producto, setProducto] = useState({
        id: '', // ID del producto.
        nombre: '', // Nombre del producto.
        descripcion: '', // Descripción del producto.
        precio: '', // Precio del producto.
        stock: '', // Cantidad en stock del producto.
        categoria: '', // Categoría del producto.
        subcategoria: '', // Subcategoría del producto.
        estado: '', // Estado del producto (Activo/Inactivo).
        imagen: null, // Archivo de imagen asociado al producto.
    });

    // Efecto para cargar los datos iniciales del producto cuando se reciben como prop.
    useEffect(() => {
        if (productoInicial) { // Verifica si hay datos iniciales.
            setProducto(productoInicial); // Actualiza el estado con los datos iniciales.
        }
    }, [productoInicial]); // Se ejecuta cada vez que cambia productoInicial.

    const navigate = useNavigate();// Hook para la navegación entre páginas.
    const handleLogout = () => navigate('/productoslist');// Función para manejar el regreso a la lista de productos.
    const categorias = ['Accesorios', 'Sala', 'Muebles de patio', 'Muebles de oficina', 'Comedores', 'Dormitorios'];// Lista de categorías disponibles.

    // Objeto que define las subcategorías por cada categoría.
    const subcategorias = {
        Accesorios: ['Relojes', 'Lampáras', 'Espejos'], // Categoría: "Accesorios". Contiene subcategorías relacionadas con accesorios decorativos y funcionales.
        Sala: ['Sofas', 'Muebles para TV', 'Mesas de centro'], // Categoría: "Sala". Subcategorías con elementos típicos para salas de estar.
        Mueblesdepatio: ['Mesas de exterior', 'Sillas de exterior', 'Toldos'], // Categoría: "Muebles de patio". Subcategorías enfocadas en muebles para uso al aire libre.
        Mueblesdeoficina: ['Escritorios', 'Libreros', 'Sillas de estudio'],  // Categoría: "Muebles de oficina". Subcategorías que agrupan muebles utilizados en espacios de trabajo.
        Comedores: ['Juegos de comedor', 'Mesas', 'Sillas'], // Categoría: "Comedores". Subcategorías relacionadas con muebles y accesorios para comedores.
        Dormitorios: ['Camas', 'Cómodas con espejo', 'Mesas de noche'], // Categoría: "Dormitorios". Subcategorías que incluyen elementos comunes para habitaciones.
    };

    // Lista de estados posibles para el producto.
    const estados = ['Activo', 'Inactivo'];

    // Manejador para cambios en los campos del formulario.
    const handleChange = (e) => {
        const { name, value } = e.target; // Obtiene el nombre y valor del campo modificado.
        setProducto({ ...producto, [name]: value }); // Actualiza el estado del producto.
        if (name === 'categoria') { // Si cambia la categoría...
            setProducto((prev) => ({ ...prev, subcategoria: '' })); // Resetea la subcategoría.
        }
    };

    // Manejador para cambios en el campo de imagen.
    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Obtiene el archivo seleccionado.
        setProducto({ ...producto, imagen: file }); // Actualiza el estado con la nueva imagen.
    };

    // Manejador para cambios en el campo de precio, permitiendo solo números.
    const handlePriceChange = (e) => {
        const value = e.target.value.replace(/\D/g, ''); // Elimina caracteres no numéricos.
        setProducto({ ...producto, precio: value }); // Actualiza el precio del producto.
    };

    // Manejador para enviar el formulario.
    const handleSubmit = (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario.
        console.log('Producto actualizado:', producto); // Imprime los datos del producto en la consola.

        // Crea un objeto FormData para enviar datos, incluidos archivos.
        const formData = new FormData();
<<<<<<< Updated upstream
        formData.append('id', producto.id); // Identificador único del producto.
        formData.append('nombre', producto.nombre); // Nombre del producto.
        formData.append('descripcion', producto.descripcion); // Descripción del producto.
        formData.append('precio', producto.precio);  // Precio del producto.
        formData.append('stock', producto.stock); // Cantidad de unidades disponibles.
        formData.append('categoria', producto.categoria); // Categoría a la que pertenece el producto.
        formData.append('subcategoria', producto.subcategoria); // Subcategoría del producto.
        formData.append('estado', producto.estado); // Estado del producto.
        // Se verifica si el producto incluye una imagen. Esto es importante para evitar errores al intentar añadir un archivo que podría no existir.
=======
        formData.append('id', producto.id);
        formData.append('nombre', producto.nombre);
        formData.append('descripcion', producto.descripcion);
        formData.append('precio', producto.precio);
        formData.append('stock', producto.stock);
        formData.append('categoria', producto.categoria);
        formData.append('subcategoria', producto.subcategoria);
        formData.append('estado', producto.estado);
>>>>>>> Stashed changes
        if (producto.imagen) { // Solo agrega la imagen si está definida.
            formData.append('imagen', producto.imagen);
        }
        // Aquí podrías hacer la petición PUT o PATCH para actualizar el producto usando fetch o axios.
    };

    // Retorna el formulario para actualizar los datos del producto.
    return (
<<<<<<< Updated upstream
        // El formulario está configurado con un evento `onSubmit` que ejecutará la función `handleSubmit` cuando se envíe.
=======
>>>>>>> Stashed changes
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-5 bg-white rounded-lg shadow-lg">
            {/* Botón para regresar a la lista de productos */}
            <nav className="absolute top-4 right-0 -translate-x-0 px-4">
                <button className="bg-[#381008] text-white px-4 py-2 rounded-md hover:bg-[#960500]" onClick={handleLogout}>
                    Regresar
                </button>
            </nav>
<<<<<<< Updated upstream

            <h2 className="text-center text-2xl mb-5 text-red-800">Actualizar Producto</h2>
            {/* Campo para seleccionar una imagen */}
            <label className="block mb-2 font-bold text-gray-800">Producto (Imagen):
                <input 
                    type="file"// Especifica que este campo acepta archivos.
                    name="imagen" // Nombre del campo, útil para identificarlo en el backend.
                    accept="image/*" // Restringe el tipo de archivos aceptados a imágenes (jpg, png, etc.).
                    onChange={handleImageChange} // Asocia un evento `onChange` para manejar la selección de la imagen.
=======

            <h2 className="text-center text-2xl mb-5 text-red-800">Actualizar Producto</h2>

            {/* Campo para seleccionar una imagen */}
            <label className="block mb-2 font-bold text-gray-800">Producto (Imagen):
                <input 
                    type="file"
                    name="imagen"
                    accept="image/*"
                    onChange={handleImageChange}
>>>>>>> Stashed changes
                    className="w-full p-2 mb-4 border border-red-900 rounded bg-red-100 text-gray-800"
                />
            </label>

            {/* Los demás campos del formulario están definidos de manera similar. */}
            {/* Continúa con cada campo siguiendo el mismo formato. */}
        </form>
    );
};

// Exporta el componente para ser utilizado en otras partes de la aplicación.
export default FormularioActualizarProducto;
