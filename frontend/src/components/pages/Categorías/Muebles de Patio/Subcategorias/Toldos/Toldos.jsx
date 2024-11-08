// Importa React para definir un componente funcional.
import React from 'react';
import './Toldos.css';
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
const ToldosProducto = () => {
    // Define una lista de productos con sus propiedades id, nombre, precio e imagen.
    const productos = [
        { id: 1, nombre: 'Toldo Ordinario', precio: 500, img: require('./img/toldo.jpg') },
        { id: 2, nombre: 'Toldo Azul', precio: 400, img: require('./img/toldo_azul.jpg') },
        { id: 3, nombre: 'Toldo Café', precio: 300, img: require('./img/toldo_cafe.jpg') },
        { id: 4, nombre: 'Toldo Colgante', precio: 450, img: require('./img/toldo_colgante.jpg') },
        { id: 5, nombre: 'Toldo Negro', precio: 350, img: require('./img/toldo_negro.jpg') },
        { id: 6, nombre: 'Toldo Sencillo Negro', precio: 600, img: require('./img/toldo_negro_.jpg') },
        { id: 7, nombre: 'Toldo Rectangular', precio: 600, img: require('./img/toldo_rectangular.jpg') },
        { id: 8, nombre: 'Toldo Rojo', precio: 600, img: require('./img/toldo_rojo.jpg') },
        { id: 9, nombre: 'Toldo Rojo Rectangular', precio: 600, img: require('./img/toldo_rojo_rectangular.jpg') },
        { id: 10, nombre: 'Toldo Sencillo', precio: 600, img: require('./img/toldo_sencillo.jpg') },
        { id: 11, nombre: 'Toldo Verde', precio: 600, img: require('./img/toldo_verde.jpg') },
        { id: 12, nombre: 'Toldo Verde y Cuadrado', precio: 600, img: require('./img/toldo_verde_cuadrado.jpg') },

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
export default ToldosProducto;
