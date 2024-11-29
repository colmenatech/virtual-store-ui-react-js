import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function InterfazAdmin() {
    const navigate = useNavigate();

    // Función para manejar el cierre de sesión, redirige a la página de login
    const handleLogout = () => {
        // Eliminar las cookies
        Cookies.remove('token');
        Cookies.remove('user');
        
        // Redirigir al login
        navigate('/login');
    };

    // Estados para las categorías
    const [categories, setCategories] = useState([]);
    const [showCategoryForm, setShowCategoryForm] = useState(false);
    const [isCategoryUpdate, setIsCategoryUpdate] = useState(false);
    const [currentCategoryId, setCurrentCategoryId] = useState(null);
    const [categoryName, setCategoryName] = useState('');

    // Estados para las subcategorías
    const [subcategories, setSubcategories] = useState([]);
    const [filteredSubcategories, setFilteredSubcategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showSubcategoryForm, setShowSubcategoryForm] = useState(false);
    const [isSubcategoryUpdate, setIsSubcategoryUpdate] = useState(false);
    const [subcategoryName, setSubcategoryName] = useState('');
    const [currentSubcategoryId, setCurrentSubcategoryId] = useState(null);

    // Obtener el token de las cookies
    const token = Cookies.get('token');

    // Configuración de axios con el token
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:8000/api/', // Base URL de tu API
        headers: {
            'Authorization': `Bearer ${token}`, // Incluir token en el header
            'Content-Type': 'application/json',
        },
    });

    useEffect(() => {
        const initializeData = async () => {
            await fetchCategories(); // Cargar categorías
            await fetchSubcategories(); // Cargar subcategorías
        };
    
        initializeData();
    }, []);
    

    // Obtener las categorías
    const fetchCategories = async () => {
        try {
            const response = await axiosInstance.get('user-profile/categories');
            if (Array.isArray(response.data.categories)) {
                setCategories(response.data.categories);
            } else {
                console.error('La respuesta de la API no es un array:', response.data);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    // Obtener las subcategorías
    const fetchSubcategories = async () => {
        try {
            const response = await axiosInstance.get('user-profile/subcategories');
    
            if (Array.isArray(response.data.subcategories)) {
                const allSubcategories = response.data.subcategories;
    
                // Actualizar estados
                setSubcategories(allSubcategories);
    
                // Sincronizar el filtro si hay una categoría seleccionada
                if (selectedCategory) {
                    setFilteredSubcategories(allSubcategories.filter(
                        (subcat) => subcat.category_id === selectedCategory.id
                    ));
                } else {
                    setFilteredSubcategories(allSubcategories); // Mostrar todas si no hay filtro
                }
            } else {
                console.error('La respuesta de la API no es válida:', response.data);
            }
        } catch (error) {
            console.error('Error al obtener las subcategorías:', error);
        }
    };
    
    // Maneja la adición de una nueva categoría
    const handleAddCategory = () => {
        setIsCategoryUpdate(false);
        setCategoryName('');
        setShowCategoryForm(true);
    };

    // Maneja la actualización de una categoría existente
    const handleUpdateCategory = (categoryName, categoryId) => {
        setIsCategoryUpdate(true);
        setCurrentCategoryId(categoryId);
        setCategoryName(categoryName);
        setShowCategoryForm(true);
    };

    // Maneja el envío del formulario de categoría
    const handleCategoryFormSubmit = async (e) => {
        e.preventDefault();
        if (isCategoryUpdate) {
            // Actualizar categoría
            try {
                await axiosInstance.put(`user-profile/categories/${currentCategoryId}`, { name: categoryName });
                alert('Categoría actualizada');
            } catch (error) {
                console.error('Error updating category:', error);
            }
        } else {
            // Agregar nueva categoría
            try {
                await axiosInstance.post('user-profile/categories', { name: categoryName });
                alert('Categoría agregada');
            } catch (error) {
                console.error('Error adding category:', error);
            }
        }
        setShowCategoryForm(false);
        fetchCategories(); // Recargar categorías
    };

    // Eliminar categoría
    const handleDeleteCategory = async (categoryId) => {
        try {
            await axiosInstance.delete(`user-profile/categories/${categoryId}`);
            alert('Categoría eliminada');
            fetchCategories(); // Recargar categorías
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    // Maneja la adición de una nueva subcategoría
    const handleAddSubcategory = () => {
        setIsSubcategoryUpdate(false);
        setSubcategoryName('');
        setShowSubcategoryForm(true);
    };

    // Maneja la actualización de una subcategoría existente
    const handleUpdateSubcategory = (subcategoryName, subcategoryId) => {
        setIsSubcategoryUpdate(true);
        setSubcategoryName(subcategoryName);
        setCurrentSubcategoryId(subcategoryId);
        setShowSubcategoryForm(true);
    };

    // Redirigir a la lista de productos
    const handleProductosList = () => navigate('/productoslist');

    const handleSubcategoryFormSubmit = async (e) => {
        e.preventDefault();
    
        if (!subcategoryName || !selectedCategory?.id) {
            alert('Por favor, complete todos los campos.');
            return;
        }
    
        try {
            if (isSubcategoryUpdate) {
                // Actualizar subcategoría existente
                await axiosInstance.put(`user-profile/subcategories/${currentSubcategoryId}`, {
                    name: subcategoryName,
                    category_id: selectedCategory.id,
                });
                alert('Subcategoría actualizada exitosamente');
            } else {
                // Crear nueva subcategoría
                await axiosInstance.post('user-profile/subcategories', {
                    name: subcategoryName,
                    category_id: selectedCategory.id,
                });
                alert('Subcategoría agregada exitosamente');
            }
    
            // Cerrar el formulario
            setShowSubcategoryForm(false);
    
            // Recargar subcategorías
            await fetchSubcategories();
        } catch (error) {
            console.error('Error al guardar la subcategoría:', error);
            alert('Hubo un error al guardar la subcategoría.');
        }
    };
    
    
    // Eliminar subcategoría
    const handleDeleteSubcategory = async (subcategoryId) => {
        try {
            await axiosInstance.delete(`user-profile/subcategories/${subcategoryId}`);
            alert('Subcategoría eliminada');
            fetchSubcategories(); // Recargar subcategorías
        } catch (error) {
            console.error('Error deleting subcategory:', error);
        }
    };
    const handleCategoryFilterChange = (e) => {
        const categoryId = parseInt(e.target.value) || null;
    
        setSelectedCategory(categories.find(cat => cat.id === categoryId) || null);
    
        // Actualizar las subcategorías filtradas según la categoría seleccionada
        if (categoryId) {
            setFilteredSubcategories(subcategories.filter(
                (subcat) => subcat.category_id === categoryId
            ));
        } else {
            setFilteredSubcategories(subcategories); // Mostrar todas si no hay selección
        }
    };
    

    return (
        <div className="p-5">
            {/* Encabezado */}
            <header className="flex justify-between items-center bg-[#ececec] p-3 shadow-md">
                <h1 className="text-3xl font-serif">Panel de Administración</h1>
                <button className="bg-[#381008] text-white px-4 py-2 rounded-md hover:bg-[#960500]" onClick={handleLogout}>
                    Cerrar Sesión
                </button>
            </header>

            {/* Categorías */}
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
                                <button className="bg-[#5d0909] text-white px-3 py-1 rounded-md hover:bg-red-600" onClick={() => handleDeleteCategory(category.id)}>
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Formulario de Categoría */}
            {showCategoryForm && (
                <form className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 p-5" onSubmit={handleCategoryFormSubmit}>
                    <div className="bg-[#F0F0F0] p-5 rounded-lg shadow-lg w-full max-w-sm text-center">
                        <h3 className="text-lg font-bold mb-3">{isCategoryUpdate ? 'Actualizar Categoría' : 'Agregar Categoría'}</h3>
                        <input
                            type="text"
                            placeholder="Nombre de la Categoría"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                        />
                        <button type="submit" className="bg-[#7A3939] text-white px-4 py-2 rounded-md hover:bg-[#5E2B2B]">
                            {isCategoryUpdate ? 'Actualizar' : 'Agregar'}
                        </button>
                    </div>
                </form>
            )}

            {/* Subcategorías */}
            <div className="mt-10 bg-white p-5 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Gestionar Subcategorías</h2>
                <button className="bg-[#381008] text-white px-4 py-2 rounded-md hover:bg-[#960500] mb-4 mr-4" onClick={handleAddSubcategory}>
                    Agregar Subcategoría
                </button>
                <button className="bg-[#381008] text-white px-4 py-2 rounded-md hover:bg-[#960500] mb-4" onClick={handleProductosList}>
                    Lista de Productos
                </button>

             
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {filteredSubcategories.map(subcategory => (
                        <div key={subcategory.id} className="bg-white p-4 rounded-lg shadow-md text-center">
                            <h3 className="text-lg font-semibold">{subcategory.name}</h3>
                            <div className="mt-4">
                                <button className="bg-gray-400 text-white px-3 py-1 rounded-md mr-2 hover:bg-gray-600" onClick={() => handleUpdateSubcategory(subcategory.name, subcategory.id)}>
                                    Actualizar
                                </button>
                                <button className="bg-[#5d0909] text-white px-3 py-1 rounded-md hover:bg-red-600" onClick={() => handleDeleteSubcategory(subcategory.id)}>
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

          {/* Formulario de Subcategoría */}
{showSubcategoryForm && (
    <form
        className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 p-5"
        onSubmit={handleSubcategoryFormSubmit}
    >
        <div className="bg-[#F0F0F0] p-5 rounded-lg shadow-lg w-full max-w-sm text-center">
            <h3 className="text-lg font-bold mb-3">
                {isSubcategoryUpdate ? 'Actualizar Subcategoría' : 'Agregar Subcategoría'}
            </h3>
            {/* Campo para nombre de la subcategoría */}
            <input
                type="text"
                placeholder="Nombre de la Subcategoría"
                value={subcategoryName}
                onChange={(e) => setSubcategoryName(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            />
            
            {/* Dropdown para seleccionar categoría */}
            <select
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                value={selectedCategory?.id || ''}
                onChange={(e) => {
                    const selected = categories.find(cat => cat.id === parseInt(e.target.value));
                    setSelectedCategory(selected || null);
                }}
            >
                <option value="">Seleccione una categoría</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>

            {/* Botón de acción */}
            <button
                type="submit"
                className="bg-[#7A3939] text-white px-4 py-2 rounded-md hover:bg-[#5E2B2B]"
            >
                {isSubcategoryUpdate ? 'Actualizar' : 'Agregar'}
            </button>
        </div>
    </form>
)}

        </div>
    );
}

export default InterfazAdmin;
