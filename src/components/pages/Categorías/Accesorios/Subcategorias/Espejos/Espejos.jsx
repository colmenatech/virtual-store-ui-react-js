// Importa React para definir un componente funcional.
import React from 'react'; // Importa la librería React, necesaria para crear componentes en React.
import './Espejos.css';  // Importa el archivo de estilos CSS para los productos en la categoría 'Espejos'.
import { FaShoppingCart } from 'react-icons/fa';  // Importa el ícono de un carrito de compras desde la librería react-icons.
import { useCart } from '../../../../shopping_cart/CartContext';   // Importa el hook 'useCart' desde el contexto del carrito de compras para acceder a la funcionalidad del carrito.

// Componente ProductoItem
const ProductoItem = ({ producto }) => {  // Define el componente funcional ProductoItem, que recibe un objeto 'producto' como prop.
    const { dispatch } = useCart();  // Desestructura 'dispatch' del hook useCart, para poder despachar acciones al carrito.
    
    // Función para agregar un producto al carrito
    const addToCart = () => {  // Define la función que se ejecutará al hacer clic en el botón para agregar el producto al carrito.
        dispatch({ type: 'ADD_TO_CART', payload: producto });  // Despacha una acción al carrito con el tipo 'ADD_TO_CART' y el producto como carga útil.
    };

    return (
        <div className="product-card"> {/* Devuelve un div con la clase 'product-card' que representará la tarjeta del producto.*/}
            <img src={producto.img} alt={producto.nombre} />  {/* Muestra una imagen del producto, usando la URL 'producto.img' y el nombre del producto como texto alternativo.*/}
            <h3>{producto.descripcion}</h3> {/* Muestra la descripción del producto dentro de un elemento <h3>.*/}
            <p>${producto.precio}</p> {/* Muestra el precio del producto dentro de un párrafo. */}
            <button onClick={addToCart} className="add-to-cart-button">  {/* Define un botón con la clase 'add-to-cart-button', que ejecuta la función addToCart al hacer clic. */}
                <FaShoppingCart /> Agregar al carrito  {/* Muestra el ícono de carrito de compras y el texto 'Agregar al carrito' en el botón. */}
            </button>
        </div>
    );
};

// Define el componente EspejosProducto que lista todos los productos de tipo Espejos.
const EspejosProducto = () => {
    // Define una lista de productos con sus propiedades id, nombre, precio e imagen.
    const productos = [
        { id: 1, nombre: 'Espejo baño cuadrado', precio: 500, descripcion: 'Espejo cuadrado para baño', img: require('./img/espejo_baño_cuadrado.jpg') },  // Primer producto: espejo cuadrado para baño con su precio y descripción
        { id: 2, nombre: 'Espejo champague italiano', precio: 300, descripcion: 'Espejo elegante de estilo italiano', img: require('./img/espejo_champague_italiano.jpg') },  // Segundo producto: espejo de estilo italiano, elegante, con su precio y descripción
        { id: 3, nombre: 'Espejo cuadrado negro', precio: 150, descripcion: 'Espejo cuadrado de marco negro', img: require('./img/espejo_cuadrado_negro.jpg') }, // Tercer producto: espejo cuadrado con marco negro y su descripción
        { id: 4, nombre: 'Espejo para escritorio', precio: 400, descripcion: 'Espejo pequeño para escritorio', img: require('./img/espejo_de_escritorio.jpg')}, // Cuarto producto: espejo pequeño ideal para escritorio
        { id: 5, nombre: 'Espejo de pie', precio: 250, descripcion: 'Espejo de pie moderno', img: require('./img/espejo_de_pie.jpg') },  // Quinto producto: espejo de pie moderno con su descripción
        { id: 6, nombre: 'Espejo irregular negro', precio: 700, descripcion: 'Espejo irregular con marco negro', img: require('./img/espejo_irregular_negro.jpg') },  // Sexto producto: espejo con un diseño irregular y marco negro
        { id: 7, nombre: 'Espejo irregular rosado', precio: 120, descripcion: 'Espejo irregular de color rosado', img: require('./img/espejo_irregular_rosado.jpg') },  // Séptimo producto: espejo irregular con color rosado
        { id: 8, nombre: 'Espejo con marco de madera', precio: 400, descripcion: 'Espejo con marco de madera natural', img: require('./img/espejo_marco_madera.jpg') },  // Octavo producto: espejo con marco de madera natural
        { id: 9, nombre: 'Espejo moderno para recibidor', precio: 350, descripcion: 'Espejo moderno ideal para recibidores', img: require('./img/espejo_moderno_recibidor.jpg') },  // Noveno producto: espejo moderno diseñado para recibidores
        { id: 10, nombre: 'Espejo redondo dorado', precio: 90, descripcion: 'Espejo redondo con marco dorado', img: require('./img/espejo_redondo_dorado.jpg')},  // Décimo producto: espejo redondo con marco dorado
        { id: 11, nombre: 'Espejo redondo con luz led', precio: 50, descripcion: 'Espejo redondo con iluminación led', img: require('./img/espejo_redondo_led.jpg')},  // Undécimo producto: espejo redondo con iluminación LED
        { id: 12, nombre: 'Espejo redondo sencillo', precio: 200, descripcion: 'Espejo redondo de diseño sencillo', img: require('./img/espejo_redondo_sencillo.jpg')} // Duodécimo producto: espejo redondo de diseño simple
    ];

    // Renderiza el componente. Muestra un título y un grid de productos que son mapeados desde el array de productos.
    return (
        <div className="sala-productos">  {/* Contenedor principal de los productos*/}
        <div className="title-container">  {/* Contenedor del título*/}
            <h1>Productos de Espejos</h1>  {/* Título que se muestra en la parte superior*/}
            <div className="decorative-line"></div>  {/* Línea decorativa debajo del título (para estilo visual)*/}
            </div>
            <div className="productos-grid">  {/* Contenedor que tendrá la cuadrícula de productos*/}
                {productos.map((producto) => (  // Se mapea el array 'productos' y para cada producto se renderiza un componente ProductoItem
                    <ProductoItem key={producto.id} producto={producto} />   // Se pasa cada producto como propiedad al componente ProductoItem, utilizando su id como clave única
                ))}
            </div>
        </div>
    );
};

// Exporta el componente EspejosProducto para que pueda ser utilizado en otras partes de la aplicación.
export default EspejosProducto;
