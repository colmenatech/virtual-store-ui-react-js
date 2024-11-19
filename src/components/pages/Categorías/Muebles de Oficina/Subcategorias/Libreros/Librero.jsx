import React from 'react';// Importa React para definir un componente funcional.
import './Librero.css';  // Importa el archivo CSS para los estilos específicos del componente
import { FaShoppingCart } from 'react-icons/fa';  // Importa el icono de carrito de compras desde la librería react-icons
import { useCart } from '../../../../shopping_cart/CartContext'; // Importa el hook useCart desde el contexto de carrito, que permite interactuar con el carrito de compras 

// Componente ProductoItem que recibe un objeto producto como prop
const ProductoItem = ({ producto }) => {
    const { dispatch } = useCart();  // Extrae la función dispatch desde el hook useCart para actualizar el estado del carrito
    const addToCart = () => { // Función que maneja la acción de agregar un producto al carrito
        dispatch({ type: 'ADD_TO_CART', payload: producto }); // Dispara una acción al contexto de carrito para agregar el producto
    };
    
    // Retorna la estructura JSX que representa el producto en una tarjeta
    return (
        <div className="product-card"> {/* Muestra la imagen del producto. Utiliza el src y alt desde el objeto producto */}
            <img src={producto.img} alt={producto.nombre} />  {/* Muestra el nombre del producto */}
            <h3>{producto.nombre}</h3>   {/* Muestra una breve descripción del producto */}
            <p>{producto.descripcion}</p>   {/* Muestra el precio del producto en formato numérico con símbolo de dólar */} 
            <p>${producto.precio}</p>  {/* Botón para agregar el producto al carrito, al hacer click se llama a la función addToCart */}
            <button onClick={addToCart} className="add-to-cart-button">  {/* Icono de carrito de compras */}
                <FaShoppingCart /> Agregar al carrito
            </button>
        </div>
    );
};

// Define el componente LibreroProducto que lista todos los productos de tipo Libreros.
const LibreroProducto = () => {
    // Define una lista de productos con sus propiedades id, nombre, precio e imagen.
const productos = [
    { id: 1, nombre: 'Librero con forma de arbol', precio: 700, img: require('./img/librero_arbol.jpg') }, // Primer producto: Librero con forma de árbol, precio 700, y una imagen asociada.
    { id: 2, nombre: 'Librero flotante de pared', precio: 600, img: require('./img/librero_flotante.jpg') }, // Segundo producto: Librero flotante de pared, precio 600, y su imagen.
    { id: 3, nombre: 'Librero extra grande', precio: 500, img: require('./img/librero_grande.jpg') }, // Tercer producto: Librero extra grande, precio 500, y la imagen correspondiente
    { id: 4, nombre: 'Librero color gris', precio: 750, img: require('./img/librero_gris.jpg') }, // Cuarto producto: Librero color gris, precio 750, con su imagen
    { id: 5, nombre: 'Librero forma irregular', precio: 650, img: require('./img/librero_irregular.jpg') }, // Quinto producto: Librero con forma irregular, precio 650, e imagen asociada
    { id: 6, nombre: 'Librero con forma de manzana', precio: 900, img: require('./img/librero_manzana.jpg') },  // Sexto producto: Librero con forma de manzana, precio 900, e imagen
    { id: 7, nombre: 'Librero con forma de mariposa pequeña', precio: 900, img: require('./img/librero_mariposa_pequeño.jpg') },  // Séptimo producto: Librero con forma de mariposa pequeña, precio 900, y su imagen
    { id: 8, nombre: 'Librero color negro', precio: 900, img: require('./img/librero_negro.jpg') }, // Octavo producto: Librero color negro, precio 900, e imagen asociada
    { id: 9, nombre: 'Librero con pisos', precio: 900, img: require('./img/librero_pisos.jpg') },  // Noveno producto: Librero con pisos, precio 900, con su imagen
    { id: 10, nombre: 'Librero con forma de Yin Yang', precio: 900, img: require('./img/librero_yingyang.jpg') }, // Décimo producto: Librero con forma de Yin Yang, precio 900, e imagen
    { id: 11, nombre: 'Set de libreros', precio: 900, img: require('./img/set_libreros.jpg') },  // Undécimo producto: Set de libreros, precio 900, con su imagen
    { id: 12, nombre: 'Librero Mariposa', precio: 900, img: require('./img/librero_mariposa.jpg') }  // Duodécimo producto: Librero Mariposa, precio 900, y su imagen correspondiente
];

    // Renderiza el componente. Muestra un título y un grid de productos que son mapeados desde el array de productos.
    return (
        <div className="sala-productos">
            <div className="title-container"> {/* Contenedor del título */}
            <h1>Productos de Muebles de Oficina</h1> {/* Título principal de la sección que indica que se trata de productos de muebles de oficina */}
            <div className="decorative-line"></div> {/* Línea decorativa */}
            </div>
            <div className="productos-grid">  {/* cuadrícula de productos */}
                {productos.map((producto) => (  // Mapea los productos para crear un componente ProductoItem por cada uno.
                    <ProductoItem key={producto.id} producto={producto} />  // Se pasa el producto como prop y se utiliza el id como clave.
                ))}
            </div>
        </div>
    );
};

export default LibreroProducto;  // Exporta el componente LibreroProducto para que pueda ser utilizado en otras partes de la aplicación.
