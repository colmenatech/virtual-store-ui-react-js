// Importa React para definir un componente funcional.
import React from 'react';
// Importa el componente RelojesItem que se usará para renderizar cada producto.
import './relojes.css';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../../../shopping_cart/CartContext';
// Componente ProductoItem: Representa un producto individual y permite agregarlo al carrito.
const ProductoItem = ({ producto }) => { 
    // Extrae la función dispatch del contexto del carrito, permitiendo enviar acciones al estado global del carrito.
    const { dispatch } = useCart();
    
    // Función para agregar un producto al carrito.
    // Utiliza dispatch para enviar una acción de tipo 'ADD_TO_CART' con el producto como payload.
    const addToCart = () => {
        dispatch({ type: 'ADD_TO_CART', payload: producto });
    };

    // Renderiza la tarjeta del producto con su información y un botón para agregarlo al carrito.
    return (
        <div className="product-card">  {/* Contenedor principal de la tarjeta del producto. */}
            <img src={producto.img} alt={producto.nombre} />  {/* Imagen del producto con texto alternativo. */}
            <h3>{producto.nombre}</h3>  {/* Nombre del producto. */}
            <p>{producto.descripcion}</p>  {/* Descripción del producto. */}
            <p>${producto.precio}</p>  {/* Precio del producto en formato de moneda. */}
            <button onClick={addToCart} className="add-to-cart-button">  {/* Botón para agregar el producto al carrito. */}
                <FaShoppingCart />{/* Ícono de carrito de compras. */} 
                Agregar al carrito   {/* Texto del botón. */}
            </button>
        </div>
    );
};

// Define el componente LamparasProducto que lista todos los productos de tipo Lamparas.
const Relojes = () => {
    // Define una lista de productos con sus propiedades id, nombre, precio e imagen.
    const productos = [
        { id: 1, nombre: 'Reloj digital de mesa', precio: 500, img: require('./img/reloj_digital_mesa.jpg') },// Primer producto: identificador, nombre, precio y ruta de imagen.
        { id: 2, nombre: 'Reloj con forma de luna decorativo', precio: 300, img: require('./img/reloj_forma_luna.jpg') }, // Segundo producto: identificador, nombre, precio y ruta de imagen.
        { id: 3, nombre: 'Reloj con forma de gato decorativo', precio: 150, img: require('./img/reloj_gato.jpg') }, // Tercer producto: identificador, nombre, precio y ruta de imagen.
        { id: 4, nombre: 'Reloj moderno nordico color azul', precio: 400, img: require('./img/reloj_moderno_azul.jpg') }, // Cuarto producto: identificador, nombre, precio y ruta de imagen.
        { id: 5, nombre: 'Reloj moderno nordico color dorado', precio: 250, img: require('./img/reloj_moderno_dorado.jpg') }, // Quinto producto: identificador, nombre, precio y ruta de imagen.
        { id: 6, nombre: 'Reloj moderno nordico color negro', precio: 700, img: require('./img/reloj_moderno_negro.jpg') }, // Sexto producto: identificador, nombre, precio y ruta de imagen.
        { id: 7, nombre: 'Reloj digital grande de pared', precio: 120, img: require('./img/reloj_pared_digital.jpg') }, // Séptimo producto: identificador, nombre, precio y ruta de imagen.
        { id: 8, nombre: 'Reloj de pared con pendulo', precio: 400, img: require('./img/reloj_pendulo.jpg') }, // Octavo producto: identificador, nombre, precio y ruta de imagen.
        { id: 9, nombre: 'Reloj con forma de pluma decorativo', precio: 350, img: require('./img/reloj_pluma.jpg') }, // Noveno producto: identificador, nombre, precio y ruta de imagen.
        { id: 10, nombre: 'Reloj estilo romano color negro', precio: 90, img: require('./img/reloj_romano_negro.jpg') }, // Décimo producto: identificador, nombre, precio y ruta de imagen.
        { id: 11, nombre: 'Reloj estilo romano', precio: 50, img: require('./img/reloj_romano.jpg') }, // Undécimo producto: identificador, nombre, precio y ruta de imagen.
        { id: 12, nombre: 'Reloj grande de pared estilo sencillo', precio: 200, img: require('./img/reloj_sencillo_grande.jpg') }, // Duodécimo producto: identificador, nombre, precio y ruta de imagen.
    ];

    // Renderiza el componente. Muestra un título y un grid de productos que son mapeados desde el array de productos.
    return (
        <div className="sala-productos"> {/*  Contenedor principal de los productos con una clase de estilo "sala-productos".*/}
            <div className="title-container"> {/* Contenedor del título */}
            <h1>Productos de Accesorios</h1> {/* Título de la sección que muestra los productos.*/}
            <div className="decorative-line"></div> {/* Línea decorativa */}
            </div>
            <div className="productos-grid"> {/* Contenedor que organiza los productos en una cuadrícula (grid).*/}
            
                {productos.map((producto) => (  // Itera sobre el array de productos utilizando map().
                    <ProductoItem key={producto.id} producto={producto} /> // Componente ProductoItem que recibe un producto y su id como clave única.
                ))}
            </div>
        </div>
    );
};

export default Relojes; // Exporta el componente RelojesProducto para que pueda ser utilizado en otras partes de la aplicación.
