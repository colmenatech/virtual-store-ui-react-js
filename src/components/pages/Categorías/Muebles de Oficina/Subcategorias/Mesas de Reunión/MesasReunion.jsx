import React from 'react'; // Importa React y el componente ProductoItem para utilizar dentro de la lista de productos.
import './MesasReunion.css'; // Importa el archivo CSS correctamente
import { FaShoppingCart } from 'react-icons/fa'; // Importa el icono de carrito de compras desde react-icons
// Componente ProductoItem que recibe un objeto "producto" como prop
const ProductoItem = ({ producto }) => {
    return (
        <div className="product-card"> {/* Crea una tarjeta de producto */}
        <img src={producto.img} alt={producto.nombre} /> {/* Muestra la imagen del producto usando la URL pasada en la prop "producto" */}
        <h3>{producto.nombre}</h3> {/* Muestra el nombre del producto */}
        <p>{producto.descripcion}</p> {/* Muestra la descripción del producto */}
        <p>${producto.precio}</p> {/* Muestra el precio del producto con el símbolo "$" */}
        <button className="add-to-cart-button"> {/* Botón para agregar el producto al carrito */}
            <FaShoppingCart /> {/* Icono del carrito de compras */}
            Agregar al carrito {/* Texto que acompaña el icono */}
            </button>
        </div>
    );
};

// Define el componente sofas, que representará una lista de productos específicos de sala.
const mesasreunion = () => {
    // Lista de productos que contiene información básica sobre cada uno, incluye un id, nombre, precio e imagen asociada a cada producto.
    const productos = [
        { id: 1, nombre: 'Mesa Ordinaria', precio: 500, img: require('./img/mesa_6.jpg') }, // Producto 1: Mesa Ordinaria, precio 500, imagen de 'mesa_6.jpg'
        { id: 2, nombre: 'Mesa Blanca', precio: 300, img: require('./img/mesa_blanca.jpg') }, // Producto 2: Mesa Blanca, precio 300, imagen de 'mesa_blanca.jpg'
        { id: 3, nombre: 'Mesa Cuadrada', precio: 150, img: require('./img/mesa_cuadrada.jpg') }, // Producto 3: Mesa Cuadrada, precio 150, imagen de 'mesa_cuadrada.jpg'
        { id: 4, nombre: 'Mesa Grande', precio: 400, img: require('./img/mesa_grande.jpg') }, // Producto 4: Mesa Grande, precio 400, imagen de 'mesa_grande.jpg'
        { id: 5, nombre: 'Mesa de Madera', precio: 250, img: require('./img/mesa_madera.jpg') }, // Producto 5: Mesa de Madera, precio 250, imagen de 'mesa_madera.jpg'
        { id: 6, nombre: 'Mesa Mediana', precio: 700, img: require('./img/mesa_mediana.jpg') }, // Producto 6: Mesa Mediana, precio 700, imagen de 'mesa_mediana.jpg'
        { id: 7, nombre: 'Mesa de Metal', precio: 120, img: require('./img/mesa_metal.jpg') }, // Producto 7: Mesa de Metal, precio 120, imagen de 'mesa_metal.jpg'
        { id: 8, nombre: 'Mesa Negra', precio: 400, img: require('./img/mesa_negra.jpg') }, // Producto 8: Mesa Negra, precio 400, imagen de 'mesa_negra.jpg'
        { id: 9, nombre: 'Mesa Pequeña', precio: 350, img: require('./img/mesa_pequeña.jpg') }, // Producto 9: Mesa Pequeña, precio 350, imagen de 'mesa_pequeña.jpg'
        { id: 10, nombre: 'Mesa Redonda', precio: 90, img: require('./img/mesa_redonda.jpg') }, // Producto 10: Mesa Redonda, precio 90, imagen de 'mesa_redonda.jpg'
        { id: 11, nombre: 'Mesa de Trabajo', precio: 50, img: require('./img/mesa_trabajo.jpg') }, // Producto 11: Mesa de Trabajo, precio 50, imagen de 'mesa_trabajo.jpg'
        { id: 12, nombre: 'Mesa de Vidrio', precio: 200, img: require('./img/mesa_vidrio.jpg') }, // Producto 12: Mesa de Vidrio, precio 200, imagen de 'mesa_vidrio.jpg'
    ];

    // Renderiza el componente sofas. Muestra título y un grid de productos,
    // Cada producto se renderiza utilizando el componente ProductoItem.
    return (
        <div className="sala-productos">
            <div className="title-container"> {/* Contenedor del título */}
            <h1>Productos de Muebles de Oficina</h1>
            <div className="decorative-line"></div> {/* Línea decorativa */}
            </div>
            <div className="productos-grid"> {/* cuadrícula de producto */}
                {productos.map((producto) => (  // Mapea los productos para crear un componente ProductoItem por cada uno.
                    <ProductoItem key={producto.id} producto={producto} />  // Se pasa el producto como prop y se utiliza el id como clave.
                ))}
            </div>
        </div>
    );
};

export default mesasreunion;

