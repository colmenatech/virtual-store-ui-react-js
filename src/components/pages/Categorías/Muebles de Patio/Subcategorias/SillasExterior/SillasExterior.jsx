// Importa React para definir un componente funcional.
import React from 'react';
import './SillasExterior.css';
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
const SillasExteriorProducto = () => {
    // Define una lista de productos con sus propiedades id, nombre, precio e imagen.
    const productos = [
        { id: 1, nombre: 'Banca Blanca de Metal', precio: 500, img: require('./img/banca_blanca_metal.jpg') },
        { id: 2, nombre: 'Banca Colgante', precio: 400, img: require('./img/banca_colgante.jpg') },
        { id: 3, nombre: 'Banca Mesedora', precio: 300, img: require('./img/banca_mesedora.jpg') },
        { id: 4, nombre: 'Banca de Metal y Madera', precio: 450, img: require('./img/banca_metal_madera.jpg') },
        { id: 5, nombre: 'Juego de Sillas Colgantes', precio: 350, img: require('./img/juego_sillas_colgantes.jpg') },
        { id: 6, nombre: 'Mesedora de Madera', precio: 600, img: require('./img/mesedora_madera.jpg') },
        { id: 7, nombre: 'Mesedora Redonda', precio: 600, img: require('./img/mesedora_redonda.jpg') },
        { id: 8, nombre: 'Silla Acolchada', precio: 600, img: require('./img/silla_acolchada.jpg') },
        { id: 9, nombre: 'Silla de Aluminio', precio: 600, img: require('./img/silla_aluminio.jpg') },
        { id: 10, nombre: 'Silla Colgante', precio: 600, img: require('./img/silla_colgante.jpg') },
        { id: 11, nombre: 'Silla Cuadrada', precio: 600, img: require('./img/silla_cuadrada.jpg') },
        { id: 12, nombre: 'Silla de Madera', precio: 600, img: require('./img/silla_madera.jpg') },

    ];

    // Renderiza el componente. Muestra un título y un grid de productos que son mapeados desde el array de productos.
    return (
        <div className="sala-productos">
            <div className="title-container"> {/* Contenedor del título */}
            <h1>Productos de Muebles de Patio</h1>
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
export default SillasExteriorProducto;
