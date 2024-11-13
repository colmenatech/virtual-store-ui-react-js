import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function InterfazAdmin() {
    const navigate = useNavigate();
    const handleLogout = () => navigate('/login');

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

    const [categories, setCategories] = useState([
        { id: 1, name: 'Salas' },
        { id: 2, name: 'Comedores' },
        { id: 3, name: 'Dormitorios' },
        { id: 4, name: 'Muebles de Patio' },
        { id: 5, name: 'Muebles de Oficina' },
        { id: 6, name: 'Accesorios' },
    ]);

    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const filteredSubcategories = selectedCategory
        ? subcategories.filter(subcategory => subcategory.categoryId === selectedCategory.id)
        : subcategories;

    const [showCategoryForm, setShowCategoryForm] = useState(false);
    const [showSubcategoryForm, setShowSubcategoryForm] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [currentCategory, setCurrentCategory] = useState('');
    const [newName, setNewName] = useState('');
    const [selectedCategoryName, setSelectedCategoryName] = useState('');

    const handleAddCategory = () => {
        setIsUpdate(false);
        setNewName('');
        setShowCategoryForm(true);
    };

    const handleUpdateCategory = (categoryName) => {
        setIsUpdate(true);
        setCurrentCategory(categoryName);
        setNewName(categoryName);
        setShowCategoryForm(true);
    };

    const handleAddSubcategory = () => {
        setIsUpdate(false);
        setNewName('');
        setSelectedCategoryName('');
        setShowSubcategoryForm(true);
    };

    const handleUpdateSubcategory = (subcategoryName) => {
        setIsUpdate(true);
        setCurrentCategory(subcategoryName);
        setNewName(subcategoryName);
        setSelectedCategoryName('');
        setShowSubcategoryForm(true);
    };

    const handleProductosList = () => navigate('/productoslist');

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
                                <button className="bg-gray-400 text-white px-3 py-1 rounded-md mr-2 hover:bg-gray-600" onClick={() => handleUpdateCategory(category.name)}>
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
