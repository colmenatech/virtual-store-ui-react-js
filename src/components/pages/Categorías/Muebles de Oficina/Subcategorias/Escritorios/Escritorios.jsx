import React from 'react'; // Importa React para definir un componente funcional.
import './Escritorio.css'; // Importa los estilos del componente desde 'Escritorio.css'
import { FaShoppingCart } from 'react-icons/fa'; // Importa el ícono de carrito de compras desde react-icons
import { useCart } from '../../../../shopping_cart/CartContext'; // Importa el hook 'useCart' desde el contexto del carrito para acceder a las funcionalidades del carrito
// Componente ProductoItem: este componente representa un solo producto en la lista
const ProductoItem = ({ producto }) => {
    // Accede al 'dispatch' del contexto de carrito para realizar acciones (agregar producto, eliminar, etc.)
    const { dispatch } = useCart();
    
    // Función para agregar un producto al carrito
    const addToCart = () => {
        // Envía una acción al contexto para agregar el producto al carrito
        dispatch({ type: 'ADD_TO_CART', payload: producto });
    };
     // Estructura JSX que representa cómo se muestra un producto en la interfaz
    return (
        <div className="product-card"> {/* Contenedor de la tarjeta de producto */}
            <img src={producto.img} alt={producto.nombre} /> {/* Imagen del producto */}
            <h3>{producto.nombre}</h3> {/* Nombre del producto */}
            <p>{producto.descripcion}</p> {/* Descripción del producto */}
            <p>${producto.precio}</p> {/* Precio del producto */}
            <button onClick={addToCart} className="add-to-cart-button"> {/* Botón para agregar el producto al carrito, ejecuta 'addToCart' al hacer clic */}
                <FaShoppingCart /> Agregar al carrito  {/* Ícono de carrito de compras */}
            </button>
        </div>
    );
};

// Define el componente EscritorioProducto que lista todos los productos de tipo Escritorios.
const EscritorioProducto = () => {
    // Define una lista de productos con sus propiedades id, nombre, precio e imagen.
    const productos = [
        { id: 1, nombre: 'Escritorio Blanco', precio: 500, img: require('./img/escritorio_blanco.jpg') }, // Producto 1: Escritorio Blanco, precio 500, imagen
        { id: 2, nombre: 'Escritorio Esquinero', precio: 400, img: require('./img/escritorio_esquinero_negro.jpg') }, // Producto 2: Escritorio Esquinero, precio 400, imagen
        { id: 3, nombre: 'Escritorio Esquinero Rosa', precio: 300, img: require('./img/escritorio_esquinero_rosado.jpg') }, // Producto 3: Escritorio Esquinero Rosa, precio 300, imagen
        { id: 4, nombre: 'Escritorio Flotante', precio: 450, img: require('./img/escritorio_flotante .jpg') }, // Producto 4: Escritorio Flotante, precio 450, imagen
        { id: 5, nombre: 'Escritorio con Gabetas', precio: 350, img: require('./img/escritorio_gabetas.jpg') }, // Producto 5: Escritorio con Gabetas, precio 350, imagen
        { id: 6, nombre: 'Escritorio Gamer', precio: 600, img: require('./img/escritorio_gamer.jpg') }, // Producto 6: Escritorio Gamer, precio 600, imagen
        { id: 7, nombre: 'Escritorio Grande', precio: 600, img: require('./img/escritorio_grande.jpg') }, // Producto 7: Escritorio Grande, precio 600, imagen
        { id: 8, nombre: 'Escritorio Gris', precio: 600, img: require('./img/escritorio_gris_moderno.jpg') }, // Producto 8: Escritorio Gris, precio 600, imagen
        { id: 9, nombre: 'Escritorio de Madera', precio: 600, img: require('./img/escritorio_madera.jpg') }, // Producto 9: Escritorio de Madera, precio 600, imagen
        { id: 10, nombre: 'Escritorio Moderno', precio: 600, img: require('./img/escritorio_moderno.jpg') }, // Producto 10: Escritorio Moderno, precio 600, imagen
        { id: 11, nombre: 'Escritorio Negro', precio: 600, img: require('./img/escritorio_negro.jpg') }, // Producto 11: Escritorio Negro, precio 600, imagen
        { id: 12, nombre: 'Escritorio Pequeño', precio: 600, img: require('./img/escritorio_pequeño.jpg') }, // Producto 12: Escritorio Pequeño, precio 600, imagen
    ];

    // Renderiza el componente. Muestra un título y un grid de productos que son mapeados desde el array de productos.
    return (
        <div className="sala-productos">
            <div className="title-container"> {/* Contenedor del título */}
            <h1>Productos de Muebles de Oficina</h1>
            <div className="decorative-line"></div> {/* Línea decorativa */}
            </div>
            <div className="productos-grid"> {/* Grid de productos */}
                {productos.map((producto) => ( // Mapea los productos para crear un componente ProductoItem por cada uno.
                    <ProductoItem key={producto.id} producto={producto} /> // Se pasa el producto como prop y se utiliza el id como clave.
                ))}
            </div>
        </div>
    ); 
};

// Exporta el componente EscritorioProducto para que pueda ser utilizado en otras partes de la aplicación.
export default EscritorioProducto;
