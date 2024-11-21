import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function InterfazAdmin() {
<<<<<<< Updated upstream
    const navigate = useNavigate();
    const handleLogout = () => navigate('/login');

    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
=======
    const navigate = useNavigate();// Navegación para redirigir a otras páginas
    const handleLogout = () => navigate('/Login');// Función para cerrar sesión y redirigir a la página de login

    // Estado para las subcategorías, inicializado con datos de ejemplo
    const [subcategories, setSubcategories] = useState([
        { id: 1, name: 'Sofas', categoryId: 1 },
        { id: 2, name: 'Muebles TV', categoryId: 1 },
        { id: 3, name: 'Mesas de Centro', categoryId: 1 },
        { id: 4, name: 'Juegos de Comedor', categoryId: 2 },
        { id: 5, name: 'Mesas', categoryId: 2 },
        { id: 6, name: 'Sillas', categoryId: 2 },
        { id: 7, name: 'Camas', categoryId: 3 },
        { id: 8, name: 'Cómodas con Espejo', categoryId: 3 },
        { id: 9, name: 'Mesas de Noche', categoryId: 3 },
        { id: 10, name: 'Mesas de Exterior', categoryId: 4 },
        { id: 11, name: 'Sillas de Exterior', categoryId: 4 },
        { id: 12, name: 'Toldos', categoryId: 4 },
        { id: 13, name: 'Escritorios', categoryId: 5 },
        { id: 14, name: 'Libreros', categoryId: 5 },
        { id: 15, name: 'Sillas de Estudio', categoryId: 5 },
        { id: 16, name: 'Relojes', categoryId: 6 },
        { id: 17, name: 'Lámparas', categoryId: 6 },
        { id: 18, name: 'Espejos', categoryId: 6 },
    ]);

    // Estado para las categorías principales
    const [categories, setCategories] = useState([
        { id: 1, name: 'Salas' },
        { id: 2, name: 'Comedores' },
        { id: 3, name: 'Dormitorios' },
        { id: 4, name: 'Muebles de Patio' },
        { id: 5, name: 'Muebles de Oficina' },
        { id: 6, name: 'Accesorios' },
    ]);

     // Filtrar las subcategorías según la categoría seleccionada
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const filteredSubcategories = selectedCategory
        ? subcategories.filter(subcategory => subcategory.categoryId === selectedCategory.id)
        : subcategories;

    // Estados para manejar la visibilidad de los formularios y otros detalles
>>>>>>> Stashed changes
    const [showCategoryForm, setShowCategoryForm] = useState(false);
    const [showSubcategoryForm, setShowSubcategoryForm] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [currentCategoryId, setCurrentCategoryId] = useState(null);
    const [newName, setNewName] = useState('');
    const [selectedCategoryName, setSelectedCategoryName] = useState('');

<<<<<<< Updated upstream
    // Fetch categories and subcategories
    useEffect(() => {
        fetchCategories();
        fetchSubcategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/user-profile/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchSubcategories = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/user-profile/subcategories');
            setSubcategories(response.data);
        } catch (error) {
            console.error('Error fetching subcategories:', error);
        }
    };

    // Form submission logic
    const handleSubmit = async (e) => {
=======
    // Función para mostrar el formulario para agregar una categoría
    const handleAddCategory = () => {
        setIsUpdate(false);
        setNewName('');
        setShowCategoryForm(true);
    };

    // Función para mostrar el formulario para actualizar una categoría
    const handleUpdateCategory = (categoryName) => {
        setIsUpdate(true);
        setCurrentCategory(categoryName);
        setNewName(categoryName);
        setShowCategoryForm(true);
    };

    // Función para mostrar el formulario para agregar una subcategoría
    const handleAddSubcategory = () => {
        setIsUpdate(false);
        setNewName('');
        setSelectedCategoryName('');
        setShowSubcategoryForm(true);
    };

    // Función para mostrar el formulario para actualizar una subcategoría
    const handleUpdateSubcategory = (subcategoryName) => {
        setIsUpdate(true);
        setCurrentCategory(subcategoryName);
        setNewName(subcategoryName);
        setSelectedCategoryName('');
        setShowSubcategoryForm(true);
    };

    // Función para navegar a la lista de productos
    const handleProductosList = () => navigate('/productoslist');

    // Función para manejar el envío de los formularios (Agregar o Actualizar)
    const handleFormSubmit = (e) => {
>>>>>>> Stashed changes
        e.preventDefault();
        
        try {
            // Define URL and method based on whether it's an update or create
            const url = currentCategoryId
                ? `http://localhost:8000/api/user-profile/${showCategoryForm ? 'categories' : 'subcategories'}/${currentCategoryId}`
                : `http://localhost:8000/api/user-profile/${showCategoryForm ? 'categories' : 'subcategories'}`;
            
            const method = isUpdate ? 'put' : 'post';
            
            // Only include category_id if creating a subcategory
            const data = {
                name: newName,
                ...(showSubcategoryForm && { category_id: selectedCategory?.id })
            };

            await axios({
                method: method,
                url: url,
                data: data,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Reset form and reload data
            setShowCategoryForm(false);
            setShowSubcategoryForm(false);
            setIsUpdate(false);
            setCurrentCategoryId(null);
            setNewName('');
            fetchCategories();
            fetchSubcategories();
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
        }
    };

    const handleDelete = async (id, isCategory) => {
        try {
            const url = `http://localhost:8000/api/user-profile/${isCategory ? 'categories' : 'subcategories'}/${id}`;
            await axios.delete(url);
            fetchCategories();
            fetchSubcategories();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const filteredSubcategories = selectedCategory
        ? subcategories.filter(subcategory => subcategory.category_id === selectedCategory.id)
        : subcategories;

    return (
        <div className="p-5">
            {/* Encabezado con título y botón de cierre de sesión */}
            <header className="flex justify-between items-center bg-[#ececec] p-3 shadow-md">
                <h1 className="text-3xl font-serif">Panel de Administración</h1>
                <button className="bg-[#381008] text-white px-4 py-2 rounded-md hover:bg-[#960500]" onClick={handleLogout}>
                    Cerrar Sesión
                </button>
            </header>

<<<<<<< Updated upstream
            {/* Categories */}
            <div className="mt-10 bg-white p-5 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Gestionar Categorías</h2>
                <button className="bg-[#381008] text-white px-4 py-2 rounded-md hover:bg-[#960500] mb-4" onClick={() => setShowCategoryForm(true)}>
=======
            {/* Sección para gestionar categorías */}
            <div className="mt-10 bg-white p-5 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Gestionar Categorías</h2>

                {/* Botón para agregar nueva categoría */}
                <button className="bg-[#381008] text-white px-4 py-2 rounded-md hover:bg-[#960500] mb-4" onClick={handleAddCategory}>
>>>>>>> Stashed changes
                    Agregar Categoría
                </button>

                {/* Muestra las categorías existentes en un formato de tarjetas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {categories.map(category => (
                        <div key={category.id} className="bg-white p-4 rounded-lg shadow-md text-center">
                            <h3 className="text-lg font-semibold">{category.name}</h3>
                            <div className="mt-4">
<<<<<<< Updated upstream
                                <button
                                    className="bg-gray-400 text-white px-3 py-1 rounded-md mr-2 hover:bg-gray-600"
                                    onClick={() => {
                                        setIsUpdate(true);
                                        setCurrentCategoryId(category.id);
                                        setNewName(category.name);
                                        setShowCategoryForm(true);
                                    }}
                                >
                                    Actualizar
                                </button>
                                <button
                                    className="bg-[#5d0909] text-white px-3 py-1 rounded-md hover:bg-red-600"
                                    onClick={() => handleDelete(category.id, true)}
                                >
=======

                                {/* Botón para actualizar categoría */}
                                <button className="bg-gray-400 text-white px-3 py-1 rounded-md mr-2 hover:bg-gray-600" onClick={() => handleUpdateCategory(category.name)}>
                                    Actualizar
                                </button>

                                 {/* Botón para eliminar categoría (no implementado) */}
                                <button className="bg-[#5d0909] text-white px-3 py-1 rounded-md hover:bg-red-600">
>>>>>>> Stashed changes
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

<<<<<<< Updated upstream
            {/* Subcategories */}
            <div className="mt-10 bg-white p-5 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Gestionar Subcategorías</h2>
                <button className="bg-[#381008] text-white px-4 py-2 rounded-md hover:bg-[#960500] mb-4" onClick={() => setShowSubcategoryForm(true)}>
                    Agregar Subcategoría
                </button>
=======
            {/* Formulario para agregar o actualizar categoría */}
            {showCategoryForm && (
                <form className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 p-5" onSubmit={handleFormSubmit}>
                    <div className="bg-[#F0F0F0] p-5 rounded-lg shadow-lg w-full max-w-sm text-center">
                        <h3 className="text-lg font-bold mb-3">{isUpdate ? 'Actualizar Categoría' : 'Agregar Categoría'}</h3>
                        <input
                            type="text"
                            placeholder="Nombre de la Categoría"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className="w-full p-2 mb-4 border border-gray-300 rounded-md"/>

                            {/* Botón para enviar el formulario */}
                        <button type="submit" className="bg-[#7A3939] text-white px-4 py-2 rounded-md hover:bg-[#5E2B2B]">
                            {isUpdate ? 'Actualizar' : 'Agregar'}
                        </button>
                    </div>
                </form>
            )}

            {/* Sección para gestionar subcategorías */}
            <div className="mt-10 bg-white p-5 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Gestionar Subcategorías</h2>

                {/* Botón para agregar subcategoría */}
                <button className="bg-[#381008] text-white px-4 py-2 rounded-md hover:bg-[#960500] mb-4 mr-4" onClick={handleAddSubcategory}>
                    Agregar Subcategoría
                </button>

                {/* Botón para navegar a la lista de productos */}
                <button className="bg-[#381008] text-white px-4 py-2 rounded-md hover:bg-[#960500] mb-4" onClick={handleProductosList}>
                    Lista de Productos
                </button>
>>>>>>> Stashed changes

                {/* Filtro para mostrar subcategorías por categoría */}
                <div className="mb-4">
                    {/* Etiqueta para el filtro */}
                    <label htmlFor="categorySelect" className="mr-2 font-semibold">Filtrar por Categoría:</label>
                    {/* Menú desplegable para seleccionar una categoría */}
                    <select
                        id="categorySelect"
                        onChange={(e) => {
                             // Obtiene el ID de la categoría seleccionada y la encuentra en el array de categorías
                            const categoryId = parseInt(e.target.value);
                            const category = categories.find(cat => cat.id === categoryId);
                            setSelectedCategory(category); // Actualiza el estado con la categoría seleccionada
                        }}
                        className="p-2 rounded-md border border-gray-300">
                            {/* Opción para mostrar todas las categorías */}
                        <option value="">Todas</option>
                        {/* Se mapean las categorías y se muestran como opciones */}
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                
                {/* Muestra las subcategorías filtradas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {filteredSubcategories.map(subcategory => (
                        <div key={subcategory.id} className="bg-white p-4 rounded-lg shadow-md text-center">
                            {/* Nombre de la subcategoría */}
                            <h3 className="text-lg font-semibold">{subcategory.name}</h3>

                            {/* Botones para actualizar y eliminar subcategorías */}
                            <div className="mt-4">
<<<<<<< Updated upstream
                                <button
                                    className="bg-gray-400 text-white px-3 py-1 rounded-md mr-2 hover:bg-gray-600"
                                    onClick={() => {
                                        setIsUpdate(true);
                                        setCurrentCategoryId(subcategory.id);
                                        setNewName(subcategory.name);
                                        setSelectedCategoryName(categories.find(cat => cat.id === subcategory.category_id)?.name || '');
                                        setShowSubcategoryForm(true);
                                    }}
                                >
                                    Actualizar
                                </button>
                                <button
                                    className="bg-[#5d0909] text-white px-3 py-1 rounded-md hover:bg-red-600"
                                    onClick={() => handleDelete(subcategory.id, false)}
                                >
=======
                                {/* Botón de actualizar subcategoría */}
                                <button className="bg-gray-400 text-white px-3 py-1 rounded-md mr-2 hover:bg-gray-600" onClick={() => handleUpdateSubcategory(subcategory.name)}>
                                    Actualizar
                                </button>
                                {/* Botón de eliminar subcategoría (aún sin funcionalidad) */}
                                <button className="bg-[#5d0909] text-white px-3 py-1 rounded-md hover:bg-red-600">
>>>>>>> Stashed changes
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

<<<<<<< Updated upstream
            {/* Forms */}
            {(showCategoryForm || showSubcategoryForm) && (
                <form className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 p-5" onSubmit={handleSubmit}>
                <div className="bg-[#F0F0F0] p-5 rounded-lg shadow-lg w-full max-w-sm text-center">
                    <h3 className="text-lg font-bold mb-3">{isUpdate ? 'Actualizar' : 'Agregar'} {showCategoryForm ? 'Categoría' : 'Subcategoría'}</h3>
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                    />
                        {showSubcategoryForm && (
                            <select
                                className="w-full p-2 mb-4 rounded-md border border-gray-300"
                                value={selectedCategoryName}
                                onChange={(e) => setSelectedCategoryName(e.target.value)}
                            >
                                <option value="">Seleccionar Categoría</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.name}>{category.name}</option>
                                ))}
                            </select>
                        )}
                        <button type="submit" className="bg-[#7A3939] text-white px-4 py-2 rounded-md hover:bg-[#5d0909]">
                            {isUpdate ? 'Actualizar' : 'Guardar'}
=======
            {/* Formulario para agregar o actualizar una subcategoría */}
            {showSubcategoryForm && (
                <form className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 p-5" onSubmit={handleFormSubmit}>
                    {/* Contenedor del formulario */}
                    <div className="bg-[#F0F0F0] p-5 rounded-lg shadow-lg w-full max-w-sm text-center">
                         {/* Título que cambia según si es una actualización o un agregado */}
                        <h3 className="text-lg font-bold mb-3">{isUpdate ? 'Actualizar Subcategoría' : 'Agregar Subcategoría'}</h3>
                        {/* Campo de texto para el nombre de la subcategoría */}
                        <input
                            type="text"
                            placeholder="Nombre de la Subcategoría"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className="w-full p-2 mb-4 border border-gray-300 rounded-md"/>

                        {/* Menú desplegable para seleccionar la categoría a la que pertenece la subcategoría */}
                        <select
                            className="w-full p-2 mb-4 rounded-md border border-gray-300"
                            value={selectedCategoryName}
                            onChange={(e) => setSelectedCategoryName(e.target.value)}>
                             {/* Opción para no seleccionar ninguna categoría */}
                            <option value="">Seleccionar Categoría</option>
                            {/* Se mapean las categorías y se muestran como opciones */}
                            {categories.map(category => (
                                <option key={category.id} value={category.name}>{category.name}</option>
                            ))}
                        </select>
                        {/* Botón de envío para agregar o actualizar */}
                        <button type="submit" className="bg-[#7A3939] text-white px-4 py-2 rounded-md hover:bg-[#5E2B2B]">
                            {isUpdate ? 'Actualizar' : 'Agregar'}
>>>>>>> Stashed changes
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default InterfazAdmin;