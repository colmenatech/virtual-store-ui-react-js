// Importa React para definir un componente funcional.
import React from 'react';
import './Espejos.css';
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

// Define el componente EspejosProducto que lista todos los productos de tipo Espejos.
const EspejosProducto = () => {
    // Define una lista de productos con sus propiedades id, nombre, precio e imagen.
    const productos = [
        { id: 1, nombre: 'Espejo baño cuadrado', precio: 500, descripcion: 'Espejo cuadrado para baño', img: require('./img/espejo_baño_cuadrado.jpg') },
        { id: 2, nombre: 'Espejo champague italiano', precio: 300, descripcion: 'Espejo elegante de estilo italiano', img: require('./img/espejo_champague_italiano.jpg') },
        { id: 3, nombre: 'Espejo cuadrado negro', precio: 150, descripcion: 'Espejo cuadrado de marco negro', img: require('./img/espejo_cuadrado_negro.jpg') },
        { id: 4, nombre: 'Espejo para escritorio', precio: 400, descripcion: 'Espejo pequeño para escritorio', img: require('./img/espejo_de_escritorio.jpg') },
        { id: 5, nombre: 'Espejo de pie', precio: 250, descripcion: 'Espejo de pie moderno', img: require('./img/espejo_de_pie.jpg') },
        { id: 6, nombre: 'Espejo irregular negro', precio: 700, descripcion: 'Espejo irregular con marco negro', img: require('./img/espejo_irregular_negro.jpg') },
        { id: 7, nombre: 'Espejo irregular rosado', precio: 120, descripcion: 'Espejo irregular de color rosado', img: require('./img/espejo_irregular_rosado.jpg') },
        { id: 8, nombre: 'Espejo con marco de madera', precio: 400, descripcion: 'Espejo con marco de madera natural', img: require('./img/espejo_marco_madera.jpg') },
        { id: 9, nombre: 'Espejo moderno para recibidor', precio: 350, descripcion: 'Espejo moderno ideal para recibidores', img: require('./img/espejo_moderno_recibidor.jpg') },
        { id: 10, nombre: 'Espejo redondo dorado', precio: 90, descripcion: 'Espejo redondo con marco dorado', img: require('./img/espejo_redondo_dorado.jpg') },
        { id: 11, nombre: 'Espejo redondo con luz led', precio: 50, descripcion: 'Espejo redondo con iluminación led', img: require('./img/espejo_redondo_led.jpg') },
        { id: 12, nombre: 'Espejo redondo sencillo', precio: 200, descripcion: 'Espejo redondo de diseño sencillo', img: require('./img/espejo_redondo_sencillo.jpg') },
    ];

    // Renderiza el componente. Muestra un título y un grid de productos que son mapeados desde el array de productos.
    return (
        <div className="sala-productos">
            <div className="title-container">
                <h1>Productos de Espejos</h1>
                <div className="decorative-line"></div>
            </div>
            <div className="productos-grid">
                {productos.map((producto) => (
                    <ProductoItem key={producto.id} producto={producto} />
                ))}
            </div>
        </div>
    );
};

// Exporta el componente EspejosProducto para que pueda ser utilizado en otras partes de la aplicación.
export default EspejosProducto;
