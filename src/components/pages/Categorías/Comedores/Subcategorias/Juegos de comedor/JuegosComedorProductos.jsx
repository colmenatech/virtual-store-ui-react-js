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
        // Despacha una acción para agregar el producto al carrito, pasando el producto como payload
        dispatch({ type: 'ADD_TO_CART', payload: producto });
    };
    return (
        <div className="product-card"> {/* Contenedor de la tarjeta del producto */}
            <img src={producto.img} alt={producto.nombre} />  {/* Muestra la imagen del producto */}
            <h3>{producto.nombre}</h3>  {/* Muestra el nombre del producto */}
            <p>{producto.descripcion}</p>  {/* Muestra la descripción del producto */}
            <p>${producto.precio}</p>  {/* Muestra el precio del producto con un símbolo de dólar */}
            <button onClick={addToCart} className="add-to-cart-button"> {/* Botón para agregar el producto al carrito */}
                <FaShoppingCart /> Agregar al carrito  {/* Ícono y texto del botón */}
            </button>
        </div>
    );
};

// Define el componente JuegoComedorProducto que lista todos los productos de tipo Lamparas.
const JuegoComedorProducto = () => {
    // Define una lista de productos con sus propiedades id, nombre, precio e imagen.
    const productos = [
        { id: 1, nombre: 'Comedor Bancabrids', precio: 400000, img: require('./img/comedor_bancabridson.jpg') }, // Comedor Bancabrids: precio 400,000, imagen del comedor Bancabrids
        { id: 2, nombre: 'Comedor Bar Bridson', precio: 300000, img: require('./img/comedor_bar_bridson.jpg') }, // Comedor Bar Bridson: precio 300,000, imagen del comedor Bar Bridson
        { id: 3, nombre: 'Comedor Bar Odium', precio: 150000, img: require('./img/comedor_bar_odium.jpg') }, // Comedor Bar Odium: precio 150,000, imagen del comedor Bar Odium
        { id: 4, nombre: 'Comedor Bar Skempton', precio: 400000, img: require('./img/comedor_bar_skempton.jpg') }, // Comedor Bar Skempton: precio 400,000, imagen del comedor Bar Skempton
        { id: 5, nombre: 'Comedor Benox', precio: 250000, img: require('./img/comedor_benox.jpg') }, // Comedor Benox: precio 250,000, imagen del comedor Benox
        { id: 6, nombre: 'Comedor Caitbrook', precio: 700000, img: require('./img/comedor_caitbrook.jpg') }, // Comedor Caitbrook: precio 700,000, imagen del comedor Caitbrook
        { id: 7, nombre: 'Comedor Hallanden', precio: 120000, img: require('./img/comedor_hallanden.jpg') }, // Comedor Hallanden: precio 120,000, imagen del comedor Hallanden
        { id: 8, nombre: 'Comedor Hyndell', precio: 300000, img: require('./img/comedor_hyndell.jpg') }, // Comedor Hyndell: precio 300,000, imagen del comedor Hyndell
        { id: 9, nombre: 'Comedor Maysville', precio: 350000, img: require('./img/comedor_maysville.jpg') }, // Comedor Maysville: precio 350,000, imagen del comedor Maysville
        { id: 10, nombre: 'Comedor Sanbriar', precio: 120000, img: require('./img/comedor_sanbriar.jpg') }, // Comedor Sanbriar: precio 120,000, imagen del comedor Sanbriar
        { id: 11, nombre: 'Comedor Skempton', precio: 150000, img: require('./img/comedor_skempton.jpg') }, // Comedor Skempton: precio 150,000, imagen del comedor Skempton
        { id: 12, nombre: 'Comedor Stonehollow', precio: 200000, img: require('./img/comedor_stonehollow.jpg') }, // Comedor Stonehollow: precio 200,000, imagen del comedor Stonehollow
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

export default JuegoComedorProducto;// Exporta el componente JuegoComedorProducto para que pueda ser utilizado en otras partes de la aplicación.
