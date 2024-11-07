// Importa React para definir un componente funcional.
import React from 'react';
import './JuegosComedor.css'; // Importa el archivo CSS correctamente
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

// Define el componente JuegoComedorProducto que lista todos los productos de tipo Lamparas.
const JuegoComedorProducto = () => {
    // Define una lista de productos con sus propiedades id, nombre, precio e imagen.
    const productos = [
        { id: 1, nombre: 'Comedor Bancabrids', precio: 400000, img: require('./img/comedor_bancabridson.jpg') },
        { id: 2, nombre: 'Comedor Bar Bridson', precio: 300000, img: require('./img/comedor_bar_bridson.jpg') },
        { id: 3, nombre: 'Comedor Bar Odium', precio: 150000, img: require('./img/comedor_bar_odium.jpg') },
        { id: 4, nombre: 'Comedor Bar Skempton', precio: 400000, img: require('./img/comedor_bar_skempton.jpg') },
        { id: 5, nombre: 'Comedor Benox', precio: 250000, img: require('./img/comedor_benox.jpg') },
        { id: 6, nombre: 'Comedor Caitbrook', precio: 700000, img: require('./img/comedor_caitbrook.jpg') },
        { id: 7, nombre: 'Comedor Hallanden', precio: 120000, img: require('./img/comedor_hallanden.jpg') },
        { id: 8, nombre: 'Comedor Hyndell', precio: 300000, img: require('./img/comedor_hyndell.jpg') },
        { id: 9, nombre: 'Comedor Maysville', precio: 350000, img: require('./img/comedor_maysville.jpg') },
        { id: 10, nombre: 'Comedor Sanbriar', precio: 120000, img: require('./img/comedor_sanbriar.jpg') },
        { id: 11, nombre: 'Comedor Skempton', precio: 150000, img: require('./img/comedor_skempton.jpg') },
        { id: 12, nombre: 'Comedor Stonehollow', precio: 200000, img: require('./img/comedor_stonehollow.jpg') },
    ];

    // Renderiza el componente. Muestra un título y un grid de productos que son mapeados desde el array de productos.
    return (
        <div className="sala-productos">
            <div className="title-container"> {/* Contenedor del título */}
            <h1>Juegos de comedor</h1>
            <div className="decorative-line"></div> {/* Línea decorativa */}
            </div>
            {/* Renderiza la lista de productos dentro de un contenedor de grid. */}
            <div className="productos-grid">
                {/* Recorre la lista de productos y para cada uno renderiza un componente JuegosComedorItem */}
                {productos.map((producto) => (
                    <ProductoItem key={producto.id} producto={producto} />
                ))}
            </div>
        </div>
    );
};

// Exporta el componente JuegoComedorProducto para que pueda ser utilizado en otras partes de la aplicación.
export default JuegoComedorProducto;
