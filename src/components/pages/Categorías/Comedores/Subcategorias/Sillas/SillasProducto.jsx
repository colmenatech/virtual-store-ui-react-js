// Importa React para definir un componente funcional.
import React from 'react';
import './Sillas.css'; // Importa el archivo CSS correctamente
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

// Define el componente SillasProducto que lista todos los productos de tipo Lamparas.
const SillasProducto = () => {
    // Define una lista de productos con sus propiedades id, nombre, precio e imagen.
    const productos = [
        { id: 1, nombre: 'Sillas Berringer', precio: 40000, img: require('./img/silla_berringer.jpg') },
        { id: 2, nombre: 'Sillas Bolanburg', precio: 30000, img: require('./img/silla_bolanburg.jpg') },
        { id: 3, nombre: 'Sillas Centiar', precio: 90000, img: require('./img/silla_centiar.jpg') },
        { id: 4, nombre: 'Sillas Glambrey', precio: 40000, img: require('./img/silla_glambrey.jpg') },
        { id: 5, nombre: 'Sillas Haddigan', precio: 25000, img: require('./img/silla_haddigan.jpg') },
        { id: 6, nombre: 'Sillas Madanere', precio: 10000, img: require('./img/silla_madanere.jpg') },
        { id: 7, nombre: 'Sillas Owingsville', precio: 12000, img: require('./img/silla_owingsville.jpg') },
        { id: 8, nombre: 'Sillas Realyn', precio: 40000, img: require('./img/silla_realyn.jpg') },
        { id: 9, nombre: 'Sillas Tripton', precio: 35000, img: require('./img/silla_tripton.jpg') },
        { id: 10, nombre: 'Sillas Tylercreek', precio: 90000, img: require('./img/silla_tylercreek.jpg') },
        { id: 11, nombre: 'Sillas Whitesburg', precio: 50000, img: require('./img/silla_whitesburg.jpg') },
        { id: 12, nombre: 'Sillas Woodanville', precio: 20000, img: require('./img/silla_woodanville.jpg') },
    ];

    // Renderiza el componente. Muestra un título y un grid de productos que son mapeados desde el array de productos.
    return (
        <div className="sala-productos">
            <div className="title-container"> {/* Contenedor del título */}
            <h1>Sillas</h1>
            <div className="decorative-line"></div> {/* Línea decorativa */}
            </div>
            {/* Renderiza la lista de productos dentro de un contenedor de grid. */}
            <div className="productos-grid">
                {/* Recorre la lista de productos y para cada uno renderiza un componente SillasItem */}
                {productos.map((producto) => (
                    <ProductoItem key={producto.id} producto={producto} />
                ))}
            </div>
        </div>
    );
};

// Exporta el componente SillasProducto para que pueda ser utilizado en otras partes de la aplicación.
export default SillasProducto;
