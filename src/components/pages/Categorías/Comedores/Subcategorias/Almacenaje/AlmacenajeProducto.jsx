// Importa React para definir un componente funcional.
import React from 'react';
import './Almacenaje.css'; // Importa el archivo CSS correctamente
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

// Define el componente AlmacenajeProducto que lista todos los productos de tipo Lamparas.
const AlmacenajeProducto = () => {
    // Define una lista de productos con sus propiedades id, nombre, precio e imagen.
    const productos = [
        { id: 1, nombre: 'Almacenaje caitbrook', precio: 300000, img: require('./img/almacenaje_caitbrook.jpg') },
        { id: 2, nombre: 'Almacenaje Haddigan', precio: 350000, img: require('./img/almacenaje_haddigan.jpg') },
        { id: 3, nombre: 'Almacenaje havalance', precio: 250000, img: require('./img/almacenaje_havalance.jpg') },
        { id: 4, nombre: 'Almacenaje Johnelle', precio: 400000, img: require('./img/almacenaje_johnelle.jpg') },
        { id: 5, nombre: 'Almacenaje Moriville', precio: 250000, img: require('./img/almacenaje_moriville.jpg') },
        { id: 6, nombre: 'Almacenaje Ralene', precio: 400000, img: require('./img/almacenaje_ralene.jpg') },
        { id: 7, nombre: 'Almacenaje Realyn', precio: 120000, img: require('./img/almacenaje_realyn.jpg') },
        { id: 8, nombre: 'Almacenaje Tylercreek', precio: 400000, img: require('./img/almacenaje_tylercreek.jpg') },
        { id: 9, nombre: 'Almacenaje Valebeck', precio: 350000, img: require('./img/almacenaje_valebeck.jpg') },
        { id: 10, nombre: 'Almacenaje Whitesburg', precio: 150000, img: require('./img/almacenaje_whitesburg.jpg') },
        { id: 11, nombre: 'Almacenaje Bolanburg', precio: 250000, img: require('./img/gabinete_bolanburg.jpg') },
        { id: 12, nombre: 'Gabinete Tylercreek', precio: 200000, img: require('./img/gabinete_tylercreek.jpg') },
    ];

    // Renderiza el componente. Muestra un título y un grid de productos que son mapeados desde el array de productos.
    return (
        <div className="sala-productos">
             <div className="title-container"> {/* Contenedor del título */}
            <h1>Almacenaje</h1>
            <div className="decorative-line"></div> {/* Línea decorativa */}
            </div>
            {/* Renderiza la lista de productos dentro de un contenedor de grid. */}
            <div className="productos-grid">
                {/* Recorre la lista de productos y para cada uno renderiza un componente RelojesItem */}
                {productos.map((producto) => (
                    <ProductoItem key={producto.id} producto={producto} />
                ))}
            </div>
        </div>
    );
};

// Exporta el componente AlmacenajeProducto para que pueda ser utilizado en otras partes de la aplicación.
export default AlmacenajeProducto;
