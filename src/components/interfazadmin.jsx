import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function InterfazAdmin() {
    // Hook de navegación de react-router-dom para redirigir a diferentes rutas
    const navigate = useNavigate();

    // Función para manejar el cierre de sesión, redirige a la página de login
    const handleLogout = () => {
        // Eliminar las cookies
        Cookies.remove('token');
        Cookies.remove('user');
        
        // Redirigir al login
        navigate('/login');
    };

    // Estado para almacenar las categorías
    const [categories, setCategories] = useState([]);
    // Estado para almacenar las subcategorías
    const [subcategories, setSubcategories] = useState([]);
    // Estado para la categoría seleccionada
    const [selectedCategory, setSelectedCategory] = useState(null);
    // Estado para controlar la visibilidad del formulario de categoría
    const [showCategoryForm, setShowCategoryForm] = useState(false);
    // Estado para controlar la visibilidad del formulario de subcategoría
    const [showSubcategoryForm, setShowSubcategoryForm] = useState(false);
    // Estado para determinar si se está actualizando una categoría
    const [isUpdate, setIsUpdate] = useState(false);
    // Estado para almacenar el ID de la categoría actual
    const [currentCategoryId, setCurrentCategoryId] = useState(null);
    // Estado para el nuevo nombre de la categoría
    const [newName, setNewName] = useState('');
    // Estado para el nombre de la categoría seleccionada
    const [selectedCategoryName, setSelectedCategoryName] = useState('');

    // Efecto para obtener las categorías y subcategorías al montar el componente
    useEffect(() => {
        fetchCategories();
        fetchSubcategories();
    }, []);

    // Función para obtener las categorías de la API
    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/user-profile/categories');
            setCategories(response.data);
            setSelectedCategory(response.data[0]); // Establecer la primera categoría como seleccionada por defecto
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    // Función para obtener las subcategorías de la API
    const fetchSubcategories = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/user-profile/subcategories');
            setSubcategories(response.data);
        } catch (error) {
            console.error('Error fetching subcategories:', error);
        }
    };

    // Filtrar las subcategorías basadas en la categoría seleccionada
    const filteredSubcategories = selectedCategory
        ? subcategories.filter(subcategory => subcategory.categoryId === selectedCategory.id)
        : subcategories;

    // Maneja la adición de una nueva categoría
    const handleAddCategory = () => {
        setIsUpdate(false);
        setNewName('');
        setShowCategoryForm(true);
    };

    // Maneja la actualización de una categoría existente
    const handleUpdateCategory = (categoryName, categoryId) => {
        setIsUpdate(true);
        setCurrentCategoryId(categoryId);
        setNewName(categoryName);
        setShowCategoryForm(true);
    };

    // Maneja la adición de una nueva subcategoría
    const handleAddSubcategory = () => {
        setIsUpdate(false);
        setNewName('');
        setSelectedCategoryName('');
        setShowSubcategoryForm(true);
    };

    // Maneja la actualización de una subcategoría existente
    const handleUpdateSubcategory = (subcategoryName) => {
        setIsUpdate(true);
        setNewName(subcategoryName);
        setShowSubcategoryForm(true);
    };

    // Redirigir a la lista de productos
    const handleProductosList = () => navigate('/productoslist');

    // Maneja el envío de los formularios de categoría y subcategoría
    const handleFormSubmit = (e) => {
        e.preventDefault();
        alert(`${isUpdate ? 'Actualizar' : 'Agregar'}: ${newName}`);
        setShowCategoryForm(false);
        setShowSubcategoryForm(false);
    };

    return (
        <div className="p-5">
            <header className="flex justify-between items-center bg-[#ececec] p-3 shadow-md">
                <h1 className="text-3xl font-serif">Panel de Administración</h1>
                <button className="bg-[#381008] text-white px-4 py-2 rounded-md hover:bg-[#960500]" onClick={handleLogout}>
                    Cerrar Sesión
                </button>
            </header>

            <div className="mt-10 bg-white p-5 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Gestionar Categorías</h2>
                <button className="bg-[#381008] text-white px-4 py-2 rounded-md hover:bg-[#960500] mb-4" onClick={handleAddCategory}>
                    Agregar Categoría
                </button>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {categories.map(category => (
                        <div key={category.id} className="bg-white p-4 rounded-lg shadow-md text-center">
                            <h3 className="text-lg font-semibold">{category.name}</h3>
                            <div className="mt-4">
                                <button className="bg-gray-400 text-white px-3 py-1 rounded-md mr-2 hover:bg-gray-600" onClick={() => handleUpdateCategory(category.name, category.id)}>
                                    Actualizar
                                </button>
                                <button className="bg-[#5d0909] text-white px-3 py-1 rounded-md hover:bg-red-600">
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {showCategoryForm && (
                <form className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 p-5" onSubmit={handleFormSubmit}>
                    <div className="bg-[#F0F0F0] p-5 rounded-lg shadow-lg w-full max-w-sm text-center">
                        <h3 className="text-lg font-bold mb-3">{isUpdate ? 'Actualizar Categoría' : 'Agregar Categoría'}</h3>
                        <input
                            type="text"
                            placeholder="Nombre de la Categoría"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                        />
                        <button type="submit" className="bg-[#7A3939] text-white px-4 py-2 rounded-md hover:bg-[#5E2B2B]">
                            {isUpdate ? 'Actualizar' : 'Agregar'}
                        </button>
                    </div>
                </form>
            )}

            <div className="mt-10 bg-white p-5 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Gestionar Subcategorías</h2>
                <button className="bg-[#381008] text-white px-4 py-2 rounded-md hover:bg-[#960500] mb-4 mr-4" onClick={handleAddSubcategory}>
                    Agregar Subcategoría
                </button>
                <button className="bg-[#381008] text-white px-4 py-2 rounded-md hover:bg-[#960500] mb-4" onClick={handleProductosList}>
                    Lista de Productos
                </button>

                <div className="mb-4">
                    <label htmlFor="categorySelect" className="mr-2 font-semibold">Filtrar por Categoría:</label>
                    <select
                        id="categorySelect"
                        onChange={(e) => {
                            const categoryId = parseInt(e.target.value);
                            const category = categories.find(cat => cat.id === categoryId);
                            setSelectedCategory(category);
                        }}
                        className="p-2 rounded-md border border-gray-300"
                    >
                        <option value="">Todas</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {filteredSubcategories.map(subcategory => (
                        <div key={subcategory.id} className="bg-white p-4 rounded-lg shadow-md text-center">
                            <h3 className="text-lg font-semibold">{subcategory.name}</h3>
                            <div className="mt-4">
                                <button className="bg-gray-400 text-white px-3 py-1 rounded-md mr-2 hover:bg-gray-600" onClick={() => handleUpdateSubcategory(subcategory.name)}>
                                    Actualizar
                                </button>
                                <button className="bg-[#5d0909] text-white px-3 py-1 rounded-md hover:bg-red-600">
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {showSubcategoryForm && (
                <form className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 p-5" onSubmit={handleFormSubmit}>
                    <div className="bg-[#F0F0F0] p-5 rounded-lg shadow-lg w-full max-w-sm text-center">
                        <h3 className="text-lg font-bold mb-3">{isUpdate ? 'Actualizar Subcategoría' : 'Agregar Subcategoría'}</h3>
                        <input
                            type="text"
                            placeholder="Nombre de la Subcategoría"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                        />
                        <button type="submit" className="bg-[#7A3939] text-white px-4 py-2 rounded-md hover:bg-[#5E2B2B]">
                            {isUpdate ? 'Actualizar' : 'Agregar'}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default InterfazAdmin;
