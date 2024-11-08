// Importa React para definir un componente funcional.
import React from 'react';
import './almacenamiento.css'; // Importa el archivo CSS correctamente
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

// Define el componente AlmacenamientoProducto que lista todos los productos de tipo Almacenamiento.
const AlmacenamientoProductos = () => {
    // Define una lista de productos con sus propiedades id, nombre, precio e imagen.
    const productos = [
        { id: 1, nombre: 'Armario Azul de madera', precio: 1200, img: require('./img/armario_azul_madera.jpg') },
        { id: 2, nombre: 'Armario color azul', precio: 350, img: require('./img/armario_azul.jpg') },
        { id: 3, nombre: 'Armario blanco de madera', precio: 200, img: require('./img/armario_blanco_madera.jpg') },
        { id: 4, nombre: 'Armario blanco pequeño', precio: 150, img: require('./img/armario_blanco_pequeño.jpg') },
        { id: 5, nombre: 'Armario Blanco', precio: 400, img: require('./img/armario_blanco.jpg') },
        { id: 6, nombre: 'Armario Grande', precio: 80, img: require('./img/armario_gigante.jpg') },
        { id: 7, nombre: 'Armario negro', precio: 80, img: require('./img/armario_negro.jpg') },
        { id: 8, nombre: 'Armario verde', precio: 80, img: require('./img/armario_verde.jpg') },
        { id: 9, nombre: 'Gabetero Blanco pequeño', precio: 80, img: require('./img/gabetero_blanco_pequeño.jpg') },
        { id: 10, nombre: 'Gabetero blanco', precio: 80, img: require('./img/gabetero_blanco.jpg') },
        { id: 11, nombre: 'Gabetero con espejo', precio: 80, img: require('./img/gabetero_espejo.jpg') },
        { id: 12, nombre: 'Gabetero negro con espejo', precio: 80, img: require('./img/gabetero_negro_espejo.jpg') },
        
    ];

    // Renderiza el componente. Muestra un título y un grid de productos que son mapeados desde el array de productos.
    return (
        <div className="sala-productos">
            <div className="title-container"> {/* Contenedor del título */}
            <h1>Almacenamiento</h1>
            <div className="decorative-line"></div> {/* Línea decorativa */}
            </div>
            <div className="productos-grid">
                {/* Recorre la lista de productos y para cada uno renderiza un componente AlmacenamientoItem */}
                {productos.map((producto) => (
                    <ProductoItem key={producto.id} producto={producto} />
                ))}
            </div>
        </div>
    );
};

// Exporta el componente AlmacenamientoProducto para que pueda ser utilizado en otras partes de la aplicación.
export default AlmacenamientoProductos;
