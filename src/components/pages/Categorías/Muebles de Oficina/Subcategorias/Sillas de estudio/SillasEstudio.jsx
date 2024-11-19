import React from 'react'; // Importa React para definir un componente funcional.
import './SillasEstudio.css'; // Importa los estilos específicos para las sillas de estudio desde el archivo CSS.
import { FaShoppingCart } from 'react-icons/fa'; // Importa el icono de carrito de compras desde la biblioteca react-icons.
import { useCart } from '../../../../shopping_cart/CartContext'; // Importa el contexto de carrito desde la ubicación definida en el proyecto.

// Define el componente ProductoItem que representa un producto individual
const ProductoItem = ({ producto }) => {
    // Obtiene la función dispatch del contexto de carrito para manejar acciones
    const { dispatch } = useCart();
    
    // Función para agregar un producto al carrito
    const addToCart = () => {
        // Envía una acción al contexto para agregar el producto al carrito
        dispatch({ type: 'ADD_TO_CART', payload: producto });
    };
    // Retorna el diseño visual del producto.
    return ( 
        <div className="product-card"> {/* Contenedor principal de la tarjeta del producto */}
        <img src={producto.img} alt={producto.nombre} /> {/* Muestra la imagen del producto */}
        <h3>{producto.nombre}</h3> {/* Muestra el nombre del producto */}
        <p>{producto.descripcion}</p> {/* Muestra la descripción del producto */}
        <p>${producto.precio}</p> {/* Muestra el precio del producto */}
        <button onClick={addToCart} className="add-to-cart-button"> {/* Botón para agregar al carrito */}
            <FaShoppingCart /> Agregar al carrito {/* Icono y texto del botón */}
            </button>
        </div>
    );
};

// Define el componente EscritorioProducto que lista todos los productos de tipo Escritorios.
const SillasProducto = () => {
    // Lista de productos para la sección "Sillas de Estudio".
const productos = [
    { id: 1, nombre: 'Silla Gamer Blanca', precio: 500, img: require('./img/silla_gamer_blanca.jpg') },  // Producto 1: Silla Gamer Blanca, precio 500, con imagen especificada.
    { id: 2, nombre: 'Silla Gris con Ruedas', precio: 400, img: require('./img/silla_gris_ruedas.jpg') }, // Producto 2: Silla Gris con Ruedas, precio 400, con imagen especificada.
    { id: 3, nombre: 'Silla Acolchada', precio: 300, img: require('./img/silla_acolchada.jpg') }, // Producto 3: Silla Acolchada, precio 300, con imagen especificada.
    { id: 4, nombre: 'Silla Blanca con Ruedas', precio: 450, img: require('./img/silla_blanca_ruedas.jpg') },  // Producto 4: Silla Blanca con Ruedas, precio 450, con imagen especificada.
    { id: 5, nombre: 'Silla Gamer Negra', precio: 350, img: require('./img/silla_gamer_negra.jpg') },  // Producto 5: Silla Gamer Negra, precio 350, con imagen especificada.
    { id: 6, nombre: 'Silla Gamer Rosada', precio: 600, img: require('./img/silla_gamer_rosada.jpg') },  // Producto 6: Silla Gamer Rosada, precio 600, con imagen especificada.
    { id: 7, nombre: 'Silla Gris', precio: 600, img: require('./img/silla_gris.jpg') },  // Producto 7: Silla Gris, precio 600, con imagen especificada.
    { id: 8, nombre: 'Silla Negra', precio: 600, img: require('./img/silla_negra.jpg') }, // Producto 8: Silla Negra, precio 600, con imagen especificada.
    { id: 9, nombre: 'Silla Negra con Ruedas', precio: 600, img: require('./img/silla_negra_ruedas.jpg') },  // Producto 9: Silla Negra con Ruedas, precio 600, con imagen especificada.
    { id: 10, nombre: 'Silla Redonda Blanca', precio: 600, img: require('./img/silla_redonda_blanca.jpg') }, // Producto 10: Silla Redonda Blanca, precio 600, con imagen especificada.
    { id: 11, nombre: 'Silla Redonda Negra', precio: 600, img: require('./img/silla_redonda_negra.jpg') }, // Producto 11: Silla Redonda Negra, precio 600, con imagen especificada.
    { id: 12, nombre: 'Silla Sencilla', precio: 600, img: require('./img/silla_sencilla.jpg') }, // Producto 12: Silla Sencilla, precio 600, con imagen especificada.
];

    // Renderiza el componente. Muestra un título y un grid de productos que son mapeados desde el array de productos.
    return (
        <div className="sala-productos">
             
            <div className="title-container">  {/* Contenedor principal para la sección de productos */}
            <h1>Productos de Muebles de Oficina</h1> {/* Título de la sección */}
            <div className="decorative-line"></div> {/* Línea decorativa */}
            </div>
            <div className="productos-grid">  {/* Sección que contiene la cuadrícula de productos */}
                {productos.map((producto) => ( // Mapea los productos para crear un componente ProductoItem por cada uno.
                    <ProductoItem key={producto.id} producto={producto} /> // Se pasa el producto como prop y se utiliza el id como clave.
                ))}
            </div>
        </div>
    );
};

// Exporta el componente EscritorioProducto para que pueda ser utilizado en otras partes de la aplicación.
export default SillasProducto;
