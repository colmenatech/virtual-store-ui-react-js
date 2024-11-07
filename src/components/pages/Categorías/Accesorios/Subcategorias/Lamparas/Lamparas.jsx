// Importa React para definir un componente funcional.
import React from 'react';
import './stylelamparas.css';
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

// Define el componente LamparasProducto que lista todos los productos de tipo Espejos.
const LamparasProducto = () => {
    // Define una lista de productos con sus propiedades id, nombre, precio e imagen.
    const productos = [
        { id: 1, nombre: 'Lámpara Biconica', precio: 500, img: require('./img/lampara_biconica.jpg') },
        { id: 2, nombre: 'Lámpara Blanca', precio: 300, img: require('./img/lampara_blanca.jpg') },
        { id: 3, nombre: 'Lámpara Cuadrada', precio: 150, img: require('./img/lampara_cuadrada.jpg') },
        { id: 4, nombre: 'Lámpara de Luna', precio: 400, img: require('./img/lampara_de_luna.jpg') },
        { id: 5, nombre: 'Lámpara de Mesa', precio: 250, img: require('./img/lampara_de_mesa.jpg') },
        { id: 6, nombre: 'Lámpara Flor', precio: 700, img: require('./img/lampara_flor.jpg') },
        { id: 7, nombre: 'Lámpara Irregular Blanca', precio: 120, img: require('./img/lampara_irregular_blanca.jpg') },
        { id: 8, nombre: 'Lámpara Larga', precio: 400, img: require('./img/lampara_larga.jpg') },
        { id: 9, nombre: 'Lámpara de Madera', precio: 350, img: require('./img/lampara_madera.jpg') },
        { id: 10, nombre: 'Lámpara Negra', precio: 90, img: require('./img/lampara_negra.jpg') },
        { id: 11, nombre: 'Lámpara Pie', precio: 50, img: require('./img/lampara_pie.jpg') },
        { id: 12, nombre: 'Trio Lámparas de Madera', precio: 200, img: require('./img/trio_lamparas_madera.jpg') },
    ];

    // Renderiza el componente. Muestra un título y un grid de productos que son mapeados desde el array de productos.
    return (
        <div className="sala-productos">
            <div className="title-container"> {/* Contenedor del título */}
            <h1>Productos de Accesorios</h1>
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

// Exporta el componente EspejosProducto para que pueda ser utilizado en otras partes de la aplicación.
export default LamparasProducto;
