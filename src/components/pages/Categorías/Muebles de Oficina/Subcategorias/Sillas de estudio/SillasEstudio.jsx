// Importa React para definir un componente funcional.
import React from 'react';
import './SillasEstudio.css';
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
const SillasProducto = () => {
    // Define una lista de productos con sus propiedades id, nombre, precio e imagen.
    const productos = [
        { id: 1, nombre: 'Silla Gamer Blanca', precio: 500, img: require('./img/silla_ gamer_blanca.jpg') },
        { id: 2, nombre: 'Silla Gris con Ruedas', precio: 400, img: require('./img/silla_ gris_ruedas.jpg') },
        { id: 3, nombre: 'Silla Acolchada', precio: 300, img: require('./img/silla_acolchada.jpg') },
        { id: 4, nombre: 'Silla Blanca con Ruedas', precio: 450, img: require('./img/silla_blanca_ruedas.jpg') },
        { id: 5, nombre: 'Silla Gamer Negra', precio: 350, img: require('./img/silla_gamer_negra.jpg') },
        { id: 6, nombre: 'Silla Gamer Rosada', precio: 600, img: require('./img/silla_gamer_rosada.jpg') },
        { id: 7, nombre: 'Silla Gris', precio: 600, img: require('./img/silla_gris.jpg') },
        { id: 8, nombre: 'Silla Negra', precio: 600, img: require('./img/silla_negra.jpg') },
        { id: 9, nombre: 'Silla Negra con Ruedas', precio: 600, img: require('./img/silla_negra_ruedas.jpg') },
        { id: 10, nombre: 'Silla Redonda Blanca', precio: 600, img: require('./img/silla_redonda_blanca.jpg') },
        { id: 11, nombre: 'Silla Redonda Negra', precio: 600, img: require('./img/silla_redonda_negra.jpg') },
        { id: 12, nombre: 'Silla Sencilla', precio: 600, img: require('./img/silla_sencilla.jpg') },

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
export default SillasProducto;
