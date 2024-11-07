// Importa React para definir un componente funcional.
import React from 'react';
// Importa el componente MueblesSalaItems que se usará para renderizar cada producto.
import './MueblesSala.css';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../../../shopping_cart/CartContext';
// Componente ProductoItem
const ProductoItem = ({ producto }) => {
    const { dispatch } = useCart();
    
    // Función para agregar un producto al carrito
    const addToCart = () => {
        dispatch({ type: 'ADD_TO_CART', payload: producto });
    };
    return (
        <div className="product-card">
            <img src={producto.img} alt={producto.nombre} />
            <h3>{producto.nombre}</h3>
            <p>{producto.descripcion}</p>
            <p>${producto.precio}</p>
            <button onClick={addToCart} className="add-to-cart-button">
                <FaShoppingCart /> Agregar al carrito
            </button>
        </div>
    );
};
// Define el componente MueblesSalaProductos que lista todos los productos de tipo MueblesSala.
const MueblesSalaProductos = () => {
    // Define una lista de productos con sus propiedades id, nombre, precio e imagen.
    const productos = [
        { id: 1, nombre: 'Mesa Airdon', precio: 500, img: require('./img/mesa_airdon.jpg') },
        { id: 2, nombre: 'Mesa Hollynyx', precio: 300, img: require('./img/mesa_hollynyx.jpg') },
        { id: 3, nombre: 'Mesa Kisper', precio: 150, img: require('./img/mesa_kisper.jpg') },
        { id: 4, nombre: 'Mesa Laney', precio: 400, img: require('./img/mesa_laney.jpg') },
        { id: 5, nombre: 'Mesa Mallacar', precio: 250, img: require('./img/mesa_mallacar.jpg') },
        { id: 6, nombre: 'Mesa Maysville', precio: 700, img: require('./img/mesa_maysville.jpg') },
        { id: 7, nombre: 'Mesa Rollynx', precio: 120, img: require('./img/mesa_rollynx.jpg') },
        { id: 8, nombre: 'Mesa Stanah', precio: 400, img: require('./img/mesa_stanah.jpg') },
        { id: 9, nombre: 'Mesa Theo', precio: 350, img: require('./img/mesa_theo.jpg') },
        { id: 10, nombre: 'Mesa Todoe', precio: 90, img: require('./img/mesa_todoe.jpg') },
        { id: 11, nombre: 'Mesa TylerCreek', precio: 80, img: require('./img/mesa_tylercreek.jpg') },
        { id: 12, nombre: 'Mesa Waston', precio: 200, img: require('./img/mesa_waston.jpg') },
    ];

    // Renderiza el componente. Muestra un título y un grid de productos que son mapeados desde el array de productos.
    return (
        <div className="sala-productos">
            <div className="title-container"> {/* Contenedor del título */}
            <h1>Productos de Salas</h1>
            <div className="decorative-line"></div> {/* Línea decorativa */}
            </div>
            <div className="productos-grid">
                {productos.map((producto) => (
                    // Mapea los productos para crear un componente ProductoItem por cada uno.
                    // Se pasa el producto como prop y se utiliza el id como clave.
                    <ProductoItem key={producto.id} producto={producto} />
                ))}
            </div>
        </div>
    );
};

// Exporta el componente OttomansProductos para que pueda ser utilizado en otras partes de la aplicación.
export default MueblesSalaProductos;
