// Importa React para definir un componente funcional.
import React from 'react';
import './Escritorio.css';
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

// Define el componente EscritorioProducto que lista todos los productos de tipo Escritorios.
const EscritorioProducto = () => {
    // Define una lista de productos con sus propiedades id, nombre, precio e imagen.
    const productos = [
        { id: 1, nombre: 'Escritorio Blanco', precio: 500, img: require('./img/escritorio_blanco.jpg') },
        { id: 2, nombre: 'Escritorio Esquinero', precio: 400, img: require('./img/escritorio_esquinero_negro.jpg') },
        { id: 3, nombre: 'Escritorio Esquinero Rosa', precio: 300, img: require('./img/escritorio_esquinero_rosado.jpg') },
        { id: 4, nombre: 'Escritorio Flotante', precio: 450, img: require('./img/escritorio_flotante .jpg') },
        { id: 5, nombre: 'Escritorio con Gabetas', precio: 350, img: require('./img/escritorio_gabetas.jpg') },
        { id: 6, nombre: 'Escritorio Gamer', precio: 600, img: require('./img/escritorio_gamer.jpg') },
        { id: 7, nombre: 'Escritorio Grande', precio: 600, img: require('./img/escritorio_grande.jpg') },
        { id: 8, nombre: 'Escritorio Gris', precio: 600, img: require('./img/escritorio_gris_moderno.jpg') },
        { id: 9, nombre: 'Escritorio de Madera', precio: 600, img: require('./img/escritorio_madera.jpg') },
        { id: 10, nombre: 'Escritorio Moderno', precio: 600, img: require('./img/escritorio_moderno.jpg') },
        { id: 11, nombre: 'Escritorio Negro', precio: 600, img: require('./img/escritorio_negro.jpg') },
        { id: 12, nombre: 'Escritorio Pequeño', precio: 600, img: require('./img/escritorio_pequeño.jpg') },

    ];

    // Renderiza el componente. Muestra un título y un grid de productos que son mapeados desde el array de productos.
    return (
        <div className="sala-productos">
            <div className="title-container"> {/* Contenedor del título */}
            <h1>Productos de Muebles de Oficina</h1>
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

// Exporta el componente EscritorioProducto para que pueda ser utilizado en otras partes de la aplicación.
export default EscritorioProducto;