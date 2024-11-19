import React from 'react';// Importa React para definir un componente funcional.
import './mesasnoche.css'; // Importa el archivo CSS correctamente
import { FaShoppingCart } from 'react-icons/fa';  // Importa el icono de carrito de compras de la librería react-icons
import { useCart } from '../../../../shopping_cart/CartContext';  // Importa el contexto del carrito para manejar acciones relacionadas con él

// Componente ProductoItem: Renderiza información de un producto y permite agregarlo al carrito
const ProductoItem = ({ producto }) => {
    const { dispatch } = useCart(); // Obtiene la función dispatch del contexto del carrito para despachar acciones
    
    // Función para agregar un producto al carrito
    const addToCart = () => {
        dispatch({ type: 'ADD_TO_CART', payload: producto }); // Envía una acción al contexto para agregar el producto al carrito
    };
    return (
        <div className="product-card">{/* Contenedor de la tarjeta del producto */}
           <img src={producto.img} alt={producto.nombre} /> {/* Imagen del producto */}
           <h3>{producto.nombre}</h3> {/* Nombre del producto */}
           <p>{producto.descripcion}</p> {/* Descripción del producto */}
           <p>${producto.precio}</p> {/* Precio del producto */}
           <button onClick={addToCart} className="add-to-cart-button"> {/* Botón para agregar al carrito */}
            <FaShoppingCart /> Agregar al carrito {/* Icono y texto del botón */}
            </button>
        </div>
    );
};

// Define el componente MesasNocheProducto que lista todos los productos de tipo Mesas de Noche.
const MesasNocheProducto = () => {
    // Define una lista de productos con sus propiedades id, nombre, precio e imagen.
    const productos = [
        { id: 1, nombre: 'Mesa de Noche Anarasia', precio: 200, img: require('./img/mesa_noche_anarasia.jpg') }, // Primer producto: Mesa de Noche Anarasia con diseño elegante, precio $200.
        { id: 2, nombre: 'Mesa de Noche Bellaby', precio: 150, img: require('./img/mesa_noche_bellaby.jpg') }, // Segundo producto: Mesa de Noche Bellaby, ideal para dormitorios modernos, precio $150.
        { id: 3, nombre: 'Mesa de Noche Bolanburg', precio: 100, img: require('./img/mesa_noche_bolanburg.jpg') }, // Tercer producto: Mesa de Noche Bolanburg, económica y funcional, precio $100.
        { id: 4, nombre: 'Mesa de Noche Veladora', precio: 250, img: require('./img/mesa_veladora.jpg') }, // Cuarto producto: Mesa de Noche Veladora, estilo clásico, precio $250.
        { id: 5, nombre: 'Mesa de Noche Culverbach', precio: 175, img: require('./img/mesa_noche_culverbach.jpg') }, // Quinto producto: Mesa de Noche Culverbach, diseño contemporáneo, precio $175.
        { id: 6, nombre: 'Mesa de Noche Flynnter', precio: 300, img: require('./img/mesa_noche_flynnter.jpg') }, // Sexto producto: Mesa de Noche Flynnter, madera sólida, precio premium de $300.
        { id: 7, nombre: 'Mesa de Noche Juararo', precio: 300, img: require('./img/mesa_noche_juararo.jpg') }, // Séptimo producto: Mesa de Noche Juararo, resistente y duradera, precio $300.
        { id: 8, nombre: 'Mesa de Noche Maribel', precio: 300, img: require('./img/mesa_noche_maribel.jpg') }, // Octavo producto: Mesa de Noche Maribel, diseño minimalista, precio $300.
        { id: 9, nombre: 'Mesa de Noche Porter', precio: 300, img: require('./img/mesa_noche_porter.jpg') }, // Noveno producto: Mesa de Noche Porter, acabados detallados, precio $300.
        { id: 10, nombre: 'Mesa de Noche Starmore', precio: 300, img: require('./img/mesa_noche_starmore.jpg') }, // Décimo producto: Mesa de Noche Starmore, estilo industrial, precio $300.
        { id: 11, nombre: 'Mesa de Noche Vineyard', precio: 300, img: require('./img/mesa_noche_vineyard.jpg') }, // Undécimo producto: Mesa de Noche Vineyard, líneas modernas, precio $300.
        { id: 12, nombre: 'Mesa de Noche Willowton', precio: 300, img: require('./img/mesa_noche_willowton.jpg') }, // Duodécimo producto: Mesa de Noche Willowton, estilo rústico, precio $300.
    ];

    // Renderiza el componente. Muestra un título y un grid de productos que son mapeados desde el array de productos.
    return (
        <div className="sala-productos">
           <div className="title-container"> {/* Contenedor del título */}
            <h1>Mesas de noche</h1>
            <div className="decorative-line"></div> {/* Línea decorativa */}
            </div>
            {/* Renderiza la lista de productos dentro de un contenedor de grid. */}
            <div className="productos-grid">
                {/* Recorre la lista de productos y para cada uno renderiza un componente MesasNocheItem */}
                {productos.map((producto) => (
                    <ProductoItem key={producto.id} producto={producto} />
                ))}
            </div>
        </div>
    );
};
export default MesasNocheProducto; // Exporta el componente MesasNocheProducto para que pueda ser utilizado en otras partes de la aplicación.
