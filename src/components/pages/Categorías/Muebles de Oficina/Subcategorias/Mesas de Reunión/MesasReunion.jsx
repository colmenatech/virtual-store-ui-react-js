// Importa React y el componente ProductoItem para utilizar dentro de la lista de productos.
import React from 'react';
import './MesasReunion.css'; // Importa el archivo CSS correctamente
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

// Define el componente sofas, que representará una lista de productos específicos de sala.
const mesasreunion = () => {
    // Lista de productos que contiene información básica sobre cada uno, 
    // incluye un id, nombre, precio e imagen asociada a cada producto.
    const productos = [
        { id: 1, nombre: 'Mesa Ordinaria', precio: 500, img: require('./img/mesa_6.jpg') },
        { id: 2, nombre: 'Mesa Blanca', precio: 300, img: require('./img/mesa_blanca.jpg') },
        { id: 3, nombre: 'Mesa Cuadrada', precio: 150, img: require('./img/mesa_cuadrada.jpg') },
        { id: 4, nombre: 'Mesa Grande', precio: 400, img: require('./img/mesa_grande.jpg') },
        { id: 5, nombre: 'Mesa de Madera', precio: 250, img: require('./img/mesa_madera.jpg') },
        { id: 6, nombre: 'Mesa Mediana', precio: 700, img: require('./img/mesa_mediana.jpg') },
        { id: 7, nombre: 'Mesa de Metal', precio: 120, img: require('./img/mesa_metal.jpg') },
        { id: 8, nombre: 'Mesa Negra', precio: 400, img: require('./img/mesa_negra.jpg') },
        { id: 9, nombre: 'Mesa Pequeña', precio: 350, img: require('./img/mesa_pequeña.jpg') },
        { id: 10, nombre: 'Mesa Redonda', precio: 90, img: require('./img/mesa_redonda.jpg') },
        { id: 11, nombre: 'Mesa de Trabajo', precio: 50, img: require('./img/mesa_trabajo.jpg') },
        { id: 12, nombre: 'Mesa de Vidrio', precio: 200, img: require('./img/mesa_vidrio.jpg') },
    ];

    // Renderiza el componente sofas. Muestra título y un grid de productos,
    // Cada producto se renderiza utilizando el componente ProductoItem.
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

export default mesasreunion;

