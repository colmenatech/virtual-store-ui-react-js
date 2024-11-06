import React, { useState } from 'react';
import './interfazadmin.css'; // Importamos los estilos personalizados desde el archivo CSS

function InterfazAdmin() {
    // Estado para manejar los productos disponibles
    const [products, setProducts] = useState([
        { id: 1, name: 'Mesa', description: 'Circular', price: 50000, image: '/images/mesa.jpg' },
        { id: 2, name: 'Armario', description: 'Madera', price: 150000, image: '/images/armario.jpg' },
        { id: 3, name: 'Sillas', description: 'Vintage', price: 40000, image: '/images/sillas.jpg' },
    ]);

    // Estado para manejar las categorías disponibles
    const [categories, setCategories] = useState([
        { id: 1, name: 'Salas' },
        { id: 2, name: 'Comedores' },
        { id: 3, name: 'Dormitorios' },
        { id: 4, name: 'Muebles de Patio' },
        { id: 5, name: 'Muebles de Oficina' },
        { id: 6, name: 'Accesorios' },
    ]);

    return (
        <div className="interfaz-admin">
            {/* Sección del encabezado con título y logo */}
            <header className="dashboard-header">
                <h1>Panel de Administración</h1>
                {/* Botón de cierro de sesión */}
                <nav>
                    <button className="close">Cerrar Sesión</button>
                </nav>
            </header>

            {/* Sección para gestionar productos */}
            <div className="products-section">
                <h2>Gestionar Productos</h2>
                {/* Botón para agregar un nuevo producto */}
                <button className="add-btn">Agregar nuevo Producto</button>

                {/* Muestra la lista de productos en formato grid */}
                <div className="products-grid">
                    {products.map(product => (
                        // Cada producto se renderiza como una tarjeta (card) con su imagen, nombre, descripción y precio
                        <div key={product.id} className="product-card">
                            <img src={product.image} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <span>₡{product.price}</span>
                            {/* Botones para editar o eliminar el producto */}
                            <div className="actions">
                                <button className="edit-btn">Editar</button>
                                <button className="delete-btn">Eliminar</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sección para gestionar categorías */}
            <div className="categories-section">
                <h2>Gestionar Categorías</h2>
                {/* Botón para agregar una nueva categoría */}
                <button className="add-btn">Agregar nueva Categoría</button>

                {/* Muestra la lista de categorías en formato grid */}
                <div className="categories-grid">
                    {categories.map(category => (
                        // Cada categoría se renderiza como una tarjeta (card) con su nombre
                        <div key={category.id} className="category-card">
                            <h3>{category.name}</h3>
                            {/* Botones para editar o eliminar la categoría */}
                            <div className="actions">
                                <button className="edit-btn">Editar</button>
                                <button className="delete-btn">Eliminar</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default InterfazAdmin; // Exportamos el componente para que pueda ser utilizado en otros archivos
