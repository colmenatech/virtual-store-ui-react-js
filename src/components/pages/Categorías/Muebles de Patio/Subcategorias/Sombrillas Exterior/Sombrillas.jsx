// Importa React para definir un componente funcional.
import React from 'react';
import './Sombrillas.css';
import { FaShoppingCart } from 'react-icons/fa';
// Componente ProductoItem
const ProductoItem = ({ producto }) => {
    return (
        <div className="product-card">
            <img src={producto.img} alt={producto.nombre} />
            <h3>{producto.nombre}</h3>
            <p>{producto.descripcion}</p>
            <p>${producto.precio}</p>
            <button className="add-to-cart-button">
                <FaShoppingCart /> Agregar al carrito
            </button>
        </div>
    );
};

// Define el componente EscritorioProducto que lista todos los productos de tipo Escritorios.
const SombrillasProducto = () => {
    // Define una lista de productos con sus propiedades id, nombre, precio e imagen.
    const productos = [
        { id: 1, nombre: 'Sombrilla Sencilla', precio: 500, img: require('./img/sombrilla.jpg') },
        { id: 2, nombre: 'Sombrilla Azul', precio: 400, img: require('./img/sombrilla_azul.jpg') },
        { id: 3, nombre: 'Sombrilla Blanca', precio: 300, img: require('./img/sombrilla_blanca.jpg') },
        { id: 4, nombre: 'Sombrilla Blanca Redonda', precio: 450, img: require('./img/sombrilla_blanca_redonda.jpg') },
        { id: 5, nombre: 'Sombrilla con Luz', precio: 350, img: require('./img/sombrilla_con_luz.jpg') },
        { id: 6, nombre: 'Sombrilla Cuadrada', precio: 600, img: require('./img/sombrilla_cuadrada.jpg') },
        { id: 7, nombre: 'Sombrilla de Pared', precio: 600, img: require('./img/sombrilla_de_pared.jpg') },
        { id: 8, nombre: 'Sombrilla Decorativa', precio: 600, img: require('./img/sombrilla_decorativa.jpg') },
        { id: 9, nombre: 'Sombrilla Roja', precio: 600, img: require('./img/sombrilla_roja.jpg') },
        { id: 10, nombre: 'Sombrilla Roja Redonda', precio: 600, img: require('./img/sombrilla_roja_redonda.jpg') },
        { id: 11, nombre: 'Sombrilla Rosa', precio: 600, img: require('./img/sombrilla_rosa.jpg') },
        { id: 12, nombre: 'Sombrilla Rosa Cuadrada', precio: 600, img: require('./img/sombrilla_rosa_cuadrada.jpg') },

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
export default SombrillasProducto;
