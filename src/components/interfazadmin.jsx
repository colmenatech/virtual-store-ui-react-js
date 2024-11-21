import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function InterfazAdmin() {
    const navigate = useNavigate();
    const handleLogout = () => navigate('/login');

    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showCategoryForm, setShowCategoryForm] = useState(false);
    const [showSubcategoryForm, setShowSubcategoryForm] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [currentCategoryId, setCurrentCategoryId] = useState(null);
    const [newName, setNewName] = useState('');
    const [selectedCategoryName, setSelectedCategoryName] = useState('');

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
            <header className="flex justify-between items-center bg-[#ececec] p-3 shadow-md">
                <h1 className="text-3xl font-serif">Panel de Administración</h1>
                <button className="bg-[#381008] text-white px-4 py-2 rounded-md hover:bg-[#960500]" onClick={handleLogout}>
                    Cerrar Sesión
                </button>
            </header>

            {/* Categories */}
            <div className="mt-10 bg-white p-5 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Gestionar Categorías</h2>
                <button className="bg-[#381008] text-white px-4 py-2 rounded-md hover:bg-[#960500] mb-4" onClick={() => setShowCategoryForm(true)}>
                    Agregar Categoría
                </button>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {categories.map(category => (
                        <div key={category.id} className="bg-white p-4 rounded-lg shadow-md text-center">
                            <h3 className="text-lg font-semibold">{category.name}</h3>
                            <div className="mt-4">
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
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Subcategories */}
            <div className="mt-10 bg-white p-5 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Gestionar Subcategorías</h2>
                <button className="bg-[#381008] text-white px-4 py-2 rounded-md hover:bg-[#960500] mb-4" onClick={() => setShowSubcategoryForm(true)}>
                    Agregar Subcategoría
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
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

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
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default InterfazAdmin;