// Importa React y el componente ProductoItem para utilizar dentro de la lista de productos.
import React from 'react';
import './muebles_para_tv.css'; // Importa el archivo CSS correctamente
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

// Define el componente mueblestv, que representará una lista de productos específicos de sala.
const mueblestv = () => {
    // Lista de productos que contiene información básica sobre cada uno, 
    // incluye un id, nombre, precio e imagen asociada a cada producto.
    const productos = [
        { id: 1, nombre: 'Soporte para TV Bellaby', precio: 500, img: require('./img/soporte_bellaby.jpg') },
        { id: 2, nombre: 'Soporte para TV Bolanburg', precio: 300, img: require('./img/soporte_bolanburg.jpg') },
        { id: 3, nombre: 'Soporte para TV Budmore', precio: 150, img: require('./img/soporte_budmore.jpg') },
        { id: 4, nombre: 'Soporte para TV Chanceen', precio: 400, img: require('./img/soporte_chanceen.jpg') },
        { id: 5, nombre: 'Soporte para TV Harpan', precio: 250, img: require('./img/soporte_harpan.jpg') },
        { id: 6, nombre: 'Soporte para TV Realyn', precio: 700, img: require('./img/soporte_realyn.jpg') },
        { id: 7, nombre: 'Soporte para TV Roddinton', precio: 120, img: require('./img/soporte_roddinton.jpg') },
        { id: 8, nombre: 'Soporte para TV Someford', precio: 400, img: require('./img/soporte_sommeford.jpg') },
        { id: 9, nombre: 'Soporte para TV Todoe', precio: 350, img: require('./img/soporte_todoe.jpg') },
        { id: 10, nombre: 'Soporte para TV TylerCreek', precio: 90, img: require('./img/soporte_tylercreek.jpg') },
        { id: 11, nombre: 'Soporte para TV Willowton', precio: 50, img: require('./img/soporte_willowton.jpg') },
        { id: 12, nombre: 'Soporte para TV Trinell', precio: 200, img: require('./img/trinell_soporte.jpg') },
    ];

    // Renderiza el componente sofas. Muestra título y un grid de productos,
    // Cada producto se renderiza utilizando el componente ProductoItem.
    return (
        <div className="sala-productos">
            <div className="title-container"> {/* Contenedor del título */}
            <h1>Productos de Sala</h1>
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

export default mueblestv;
