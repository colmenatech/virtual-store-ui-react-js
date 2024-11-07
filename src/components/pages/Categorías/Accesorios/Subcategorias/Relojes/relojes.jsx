// Importa React para definir un componente funcional.
import React from 'react';
// Importa el componente RelojesItem que se usará para renderizar cada producto.
import './relojes.css';
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

// Define el componente LamparasProducto que lista todos los productos de tipo Lamparas.
const Relojes = () => {
    // Define una lista de productos con sus propiedades id, nombre, precio e imagen.
    const productos = [
        { id: 1, nombre: 'Reloj digital de mesa', precio: 500, img: require('./img/reloj_digital_mesa.jpg') },
        { id: 2, nombre: 'Reloj con forma de luna decorativo', precio: 300, img: require('./img/reloj_forma_luna.jpg') },
        { id: 3, nombre: 'Reloj con forma de gato decorativo', precio: 150, img: require('./img/reloj_gato.jpg') },
        { id: 4, nombre: 'Reloj moderno nordico color azul', precio: 400, img: require('./img/reloj_moderno_azul.jpg') },
        { id: 5, nombre: 'Reloj moderno nordico color dorado', precio: 250, img: require('./img/reloj_moderno_dorado.jpg') },
        { id: 6, nombre: 'Reloj moderno nordico color negro', precio: 700, img: require('./img/reloj_moderno_negro.jpg') },
        { id: 7, nombre: 'Reloj digital grande de pared', precio: 120, img: require('./img/reloj_pared_digital.jpg') },
        { id: 8, nombre: 'Reloj de pared con pendulo', precio: 400, img: require('./img/reloj_pendulo.jpg') },
        { id: 9, nombre: 'Reloj con forma de pluma decorativo', precio: 350, img: require('./img/reloj_pluma.jpg') },
        { id: 10, nombre: 'Reloj estilo romano color negro', precio: 90, img: require('./img/reloj_romano_negro.jpg') },
        { id: 11, nombre: 'Reloj estilo romano', precio: 50, img: require('./img/reloj_romano.jpg') },
        { id: 12, nombre: 'Reloj grande de pared estilo sencillo', precio: 200, img: require('./img/reloj_sencillo_grande.jpg') },
    ];

    // Renderiza el componente. Muestra un título y un grid de productos que son mapeados desde el array de productos.
    return (
        <div className="sala-productos">
            <div className="title-container"> {/* Contenedor del título */}
            <h1>Productos de Accesorios</h1>
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

// Exporta el componente RelojesProducto para que pueda ser utilizado en otras partes de la aplicación.
export default Relojes;
