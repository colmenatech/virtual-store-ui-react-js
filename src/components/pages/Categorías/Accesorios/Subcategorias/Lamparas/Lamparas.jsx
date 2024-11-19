
import React from 'react'; // Importa React para definir un componente funcional.
import './stylelamparas.css'; // Importa un archivo CSS específico para los estilos de este componente.
import { FaShoppingCart } from 'react-icons/fa'; // Importa el icono del carrito de compras desde la librería react-icons.
import { useCart } from '../../../../shopping_cart/CartContext'; // Importa el hook personalizado useCart desde el contexto del carrito para gestionar su estado.

const ProductoItem = ({ producto }) => { // Define el componente funcional ProductoItem, que recibe un objeto 'producto' como prop.
    const { dispatch } = useCart(); // Extrae la función dispatch del contexto del carrito, la cual permite actualizar su estado.
    
    // Función para agregar un producto al carrito
    const addToCart = () => { // Define una función para agregar el producto al carrito, disparando una acción.
        dispatch({ type: 'ADD_TO_CART', payload: producto }); // Envía una acción de tipo 'ADD_TO_CART' junto con el producto como payload al contexto del carrito.
    };
    return (
        <div className="product-card">  
            <img src={producto.img} alt={producto.nombre} /> {/* Muestra la imagen del producto utilizando la propiedad 'img' de la prop 'producto'. */}
            <h3>{producto.nombre}</h3> {/* Muestra el nombre del producto. */}
            <p>{producto.descripcion}</p> {/* Muestra la descripción del producto. */}
            <p>${producto.precio}</p> {/* Muestra el precio del producto con formato monetario. */}
            <button onClick={addToCart} className="add-to-cart-button"> {/* Botón para agregar el producto al carrito, que llama a la función addToCart al hacer clic. */}
                <FaShoppingCart /> Agregar al carrito  {/* Incluye un icono de carrito y el texto "Agregar al carrito". */}
            </button>
        </div>
    );
};

// Define el componente LamparasProducto que lista todos los productos de tipo Espejos.
const LamparasProducto = () => {
    // Define una lista de productos con sus propiedades id, nombre, precio e imagen.
    const productos = [
        { id: 1, nombre: 'Lámpara Biconica', precio: 500, img: require('./img/lampara_biconica.jpg') }, // Producto 1: Lámpara Biconica, con precio 500 y una imagen asociada.
        { id: 2, nombre: 'Lámpara Blanca', precio: 300, img: require('./img/lampara_blanca.jpg') }, // Producto 2: Lámpara Blanca, con precio 300 y una imagen asociada.
        { id: 3, nombre: 'Lámpara Cuadrada', precio: 150, img: require('./img/lampara_cuadrada.jpg') }, // Producto 3: Lámpara Cuadrada, con precio 150 y una imagen asociada.
        { id: 4, nombre: 'Lámpara de Luna', precio: 400, img: require('./img/lampara_de_luna.jpg') },  // Producto 4: Lámpara de Luna, con precio 400 y una imagen asociada.
        { id: 5, nombre: 'Lámpara de Mesa', precio: 250, img: require('./img/lampara_de_mesa.jpg') }, // Producto 5: Lámpara de Mesa, con precio 250 y una imagen asociada.
        { id: 6, nombre: 'Lámpara Flor', precio: 700, img: require('./img/lampara_flor.jpg') }, // Producto 6: Lámpara Flor, con precio 700 y una imagen asociada.
        { id: 7, nombre: 'Lámpara Irregular Blanca', precio: 120, img: require('./img/lampara_irregular_blanca.jpg') }, // Producto 7: Lámpara Irregular Blanca, con precio 120 y una imagen asociada.
        { id: 8, nombre: 'Lámpara Larga', precio: 400, img: require('./img/lampara_larga.jpg') }, // Producto 8: Lámpara Larga, con precio 400 y una imagen asociada.
        { id: 9, nombre: 'Lámpara de Madera', precio: 350, img: require('./img/lampara_madera.jpg') },  // Producto 9: Lámpara de Madera, con precio 350 y una imagen asociada.
        { id: 10, nombre: 'Lámpara Negra', precio: 90, img: require('./img/lampara_negra.jpg') }, // Producto 10: Lámpara Negra, con precio 90 y una imagen asociada.
        { id: 11, nombre: 'Lámpara Pie', precio: 50, img: require('./img/lampara_pie.jpg') }, // Producto 11: Lámpara Pie, con precio 50 y una imagen asociada.
        { id: 12, nombre: 'Trio Lámparas de Madera', precio: 200, img: require('./img/trio_lamparas_madera.jpg') }, // Producto 12: Trio de Lámparas de Madera, con precio 200 y una imagen asociada.
    ];

    // Renderiza el componente. Muestra un título y un grid de productos que son mapeados desde el array de productos.
    return (
        <div className="sala-productos"> {/* Contenedor principal con la clase 'sala-productos' para los estilos generales.*/}
            <div className="title-container"> {/* Contenedor del título */}
            <h1>Productos de Accesorios</h1> {/* Título principal de la sección. */}
            <div className="decorative-line"></div> {/* Línea decorativa */}
            </div>
            <div className="productos-grid">  {/* Contenedor en formato grid para organizar los productos en una cuadrícula. */}
                {productos.map((producto) => (  // Mapea la lista de productos y genera un componente ProductoItem para cada uno.
                 <ProductoItem key={producto.id} producto={producto} /> // Renderiza el componente ProductoItem, pasando el producto como prop. Utiliza la propiedad 'id' como clave única para cada elemento en el mapeo.
                ))}
            </div>
        </div>
    );
};


export default LamparasProducto; // Exporta el componente EspejosProducto para que pueda ser utilizado en otras partes de la aplicación.
