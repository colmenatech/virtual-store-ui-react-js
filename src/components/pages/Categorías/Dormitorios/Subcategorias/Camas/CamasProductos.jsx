
import React from 'react'; // Importa React para definir un componente funcional.
import './Camas.css'; // Importa el archivo CSS correctamente
import { FaShoppingCart } from 'react-icons/fa'; // Importa el icono 'FaShoppingCart' desde la librería 'react-icons/fa' para mostrar un icono de carrito de compras.
import { useCart } from '../../../../shopping_cart/CartContext';  // Importa el hook 'useCart' desde el contexto 'CartContext' para acceder al estado del carrito y sus funciones.
// Componente ProductoItem
const ProductoItem = ({ producto }) => {  // Define el componente 'ProductoItem' que recibe 'producto' como una propiedad (prop).
    const { dispatch } = useCart();  // Usa el hook 'useCart' para obtener el método 'dispatch', que se utilizará para enviar acciones al carrito.
    
    // Función para agregar un producto al carrito
    const addToCart = () => { // Se define la función 'addToCart', que se ejecutará al hacer clic en el botón de "Agregar al carrito"
        dispatch({ type: 'ADD_TO_CART', payload: producto });  // Se llama a 'dispatch' para enviar una acción al estado global, con el tipo 'ADD_TO_CART' y el producto como datos (payload)
    };
    return (
        <div className="product-card">  {/* Contenedor principal de la tarjeta de producto con la clase CSS 'product-card'*/}
        <img src={producto.img} alt={producto.nombre} />  {/* Imagen del producto, el atributo 'alt' es el nombre del producto*/}
        <h3>{producto.nombre}</h3>  {/* Muestra el nombre del producto en un título*/}
        <p>{producto.descripcion}</p>  {/* Muestra la descripción del producto*/}
        <p>${producto.precio}</p>  {/* Muestra el precio del producto con el símbolo de dólar*/}
        <button onClick={addToCart} className="add-to-cart-button">  {/* Botón para agregar el producto al carrito, al hacer clic se ejecuta la función addToCart*/}
            <FaShoppingCart /> Agregar al carrito  {/* Icono de carrito de compras seguido del texto "Agregar al carrito"*/}
            </button>
        </div>
    );
};

// Define el componente CamasProductos que lista todos los productos de tipo Camas.
const CamasProductos = () => {
    // Define una lista de productos con sus propiedades id, nombre, precio e imagen.
    const productos = [
        { id: 1, nombre: 'Cama Alisdair', precio: 1200, img: require('./img/cama_alisdair.jpg') }, // Producto 1: Cama Alisdair
        { id: 2, nombre: 'Cama Anarasia', precio: 950, img: require('./img/cama_anarasia.jpg') }, // Producto 2: Cama Anarasia
        { id: 3, nombre: 'Cama Baystorm', precio: 1100, img: require('./img/cama_baystorm.jpg') }, // Producto 3: Cama Baystorm
        { id: 4, nombre: 'Cama Bolanburg', precio: 1250, img: require('./img/cama_bolanburg.jpg') }, // Producto 4: Cama Bolanburg
        { id: 5, nombre: 'Cama California', precio: 900, img: require('./img/cama_california.jpg') }, // Producto 5: Cama California
        { id: 6, nombre: 'Cama Dolante', precio: 1400, img: require('./img/cama_dolante.jpg') }, // Producto 6: Cama Dolante
        { id: 7, nombre: 'Cama Rusticbrown', precio: 1400, img: require('./img/cama_rusticbrown.jpg') }, // Producto 7: Cama Rusticbrown (error en el id)
        { id: 8, nombre: 'Cama Starmore', precio: 1400, img: require('./img/cama_starmore.jpg') }, // Producto 8: Cama Starmore (error en el id)
        { id: 9, nombre: 'Cama Tapizada', precio: 1400, img: require('./img/cama_tapizada.jpg') }, // Producto 9: Cama Tapizada (error en el id)
        { id: 10, nombre: 'Cama Vineyord', precio: 1400, img: require('./img/cama_vineyord.jpg') }, // Producto 10: Cama Vineyord (error en el id)
        { id: 11, nombre: 'Cama Willenburg', precio: 1400, img: require('./img/cama_willenburg.jpg') }, // Producto 11: Cama Willenburg (error en el id)
        { id: 12, nombre: 'Cama Maribel', precio: 1400, img: require('./img/csms_maribel.jpg') }, // Producto 12: Cama Maribel (error en el id)
    ];

    // Renderiza el componente. Muestra un título y un grid de productos que son mapeados desde el array de productos.
    return (
        <div className="sala-productos">
           <div className="title-container"> {/* Contenedor del título */}
            <h1>Camas</h1> {/*Título principal de la sección*/}
            <div className="decorative-line"></div> {/* Línea decorativa */}
            </div>
            <div className="productos-grid"> {/* Renderiza la lista de productos dentro de un contenedor de grid. */}
                {/* Recorre la lista de productos y para cada uno renderiza un componente CamasItems */}
                {productos.map((producto) => (
                    <ProductoItem key={producto.id} producto={producto} /> // Crea un componente ProductoItem por cada elemento de la lista 'productos'
                    // 'key' es un identificador único para cada producto y se usa para optimizar el renderizado
                    // 'producto' se pasa como prop al componente ProductoItem
                ))}
            </div>
        </div>
    );
};

// Exporta el componente CamasProductos para que pueda ser utilizado en otras partes de la aplicación.
export default CamasProductos;
