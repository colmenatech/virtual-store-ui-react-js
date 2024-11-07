// Importa React para definir un componente funcional.
import React from 'react';
import './Librero.css';
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
// Define el componente LibreroProducto que lista todos los productos de tipo Libreros.
const LibreroProducto = () => {
    // Define una lista de productos con sus propiedades id, nombre, precio e imagen.
    const productos = [
        { id: 1, nombre: 'Librero con forma de arbol', precio: 700, img: require('./img/librero_arbol.jpg') },
        { id: 2, nombre: 'Librero flotante de pared', precio: 600, img: require('./img/librero_flotante.jpg') },
        { id: 3, nombre: 'Librero extra grande', precio: 500, img: require('./img/librero_grande.jpg') },
        { id: 4, nombre: 'Librero color gris', precio: 750, img: require('./img/librero_gris.jpg') },
        { id: 5, nombre: 'Librero forma irregular', precio: 650, img: require('./img/librero_irregular.jpg') },
        { id: 6, nombre: 'Librero con forma de manzana', precio: 900, img: require('./img/librero_manzana.jpg') },
        { id: 7, nombre: 'Librero con forma de mariposa pequeña', precio: 900, img: require('./img/librero_mariposa_pequeño.jpg') },
        { id: 8, nombre: 'Librero color negro', precio: 900, img: require('./img/librero_negro.jpg') },
        { id: 9, nombre: 'Librero con pisos', precio: 900, img: require('./img/librero_pisos.jpg') },
        { id: 10, nombre: 'Librero con forma de Yin Yang', precio: 900, img: require('./img/librero_yingyang.jpg') },
        { id: 11, nombre: 'Set de libreros', precio: 900, img: require('./img/set_libreros.jpg') },
        { id: 12, nombre: 'Librero Mariposa', precio: 900, img: require('./img/librero_mariposa.jpg') },

        





    ];

    // Renderiza el componente. Muestra un título y un grid de productos que son mapeados desde el array de productos.
    return (
        <div className="sala-productos">
            <div className="title-container"> {/* Contenedor del título */}
            <h1>Productos de Muebles de Oficina</h1>
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

// Exporta el componente LibreroProducto para que pueda ser utilizado en otras partes de la aplicación.
export default LibreroProducto;
