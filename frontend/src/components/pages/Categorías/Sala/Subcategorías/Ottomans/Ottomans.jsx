// Importa React para definir un componente funcional.
import React from 'react';
// Importa el componente OttomansItem que se usará para renderizar cada producto.
import './Ottomans.css';
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
// Define el componente OttomansProductos que lista todos los productos de tipo Ottoman.
const OttomansProductos = () => {
    // Define una lista de productos con sus propiedades id, nombre, precio e imagen.
    const productos = [
        { id: 1, nombre: 'Ottoman Accrington', precio: 500, img: require('./img/ottoman_accrington.jpg') },
        { id: 2, nombre: 'Ottoman Baceno', precio: 300, img: require('./img/ottoman_baceno.jpg') },
        { id: 3, nombre: 'Ottoman Darcy Azul', precio: 150, img: require('./img/ottoman_darcy_azul.jpg') },
        { id: 4, nombre: 'Ottoman Darcy Negro', precio: 400, img: require('./img/ottoman_darcy_negro.jpg') },
        { id: 5, nombre: 'Ottoman Darcy', precio: 250, img: require('./img/ottoman_darcy.jpg') },
        { id: 6, nombre: 'Ottoman Dorsten', precio: 700, img: require('./img/ottoman_dorsten.jpg') },
        { id: 7, nombre: 'Ottoman Extra Grande', precio: 120, img: require('./img/ottoman_extra_grande.jpg') },
        { id: 8, nombre: 'Ottoman Harlesom', precio: 400, img: require('./img/ottoman_harlesom.jpg') },
        { id: 9, nombre: 'Ottoman Monaghan', precio: 350, img: require('./img/ottoman_monaghan.jpg') },
        { id: 10, nombre: 'Ottoman Nicorvo', precio: 90, img: require('./img/ottoman_nicorvo.jpg') },
        { id: 11, nombre: 'Ottoman Olsberg', precio: 50, img: require('./img/ottoman_olsberg.jpg') },
        { id: 12, nombre: 'Ottoman Traemore', precio: 200, img: require('./img/ottoman_traemore.jpg') },
    ];

    // Renderiza el componente. Muestra un título y un grid de productos que son mapeados desde el array de productos.
    return (
        <div className="sala-productos">
            <div className="title-container"> {/* Contenedor del título */}
            <h1>Productos de Salas</h1>
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

// Exporta el componente OttomansProductos para que pueda ser utilizado en otras partes de la aplicación.
export default OttomansProductos;
