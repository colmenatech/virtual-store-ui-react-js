// Importa React para definir un componente funcional.
import React from 'react';
import './Mesas.css'; // Importa el archivo CSS correctamente
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../../../shopping_cart/CartContext';
// Componente ProductoItem
const ProductoItem = ({ producto }) => {
    const { dispatch } = useCart();
    
    // Función para agregar un producto al carrito
    const addToCart = () => {
        dispatch({ type: 'ADD_TO_CART', payload: producto }); // Despacha una acción al reducer para agregar el producto al carrito
    };
    return (
        // Contenedor de la tarjeta del producto
        <div className="product-card">
            <img src={producto.img} alt={producto.nombre} />{/* Imagen del producto */}
            <h3>{producto.nombre}</h3>{/* Nombre del producto */}
            <p>{producto.descripcion}</p>{/* Descripción del producto */}
            <p>${producto.precio}</p>{/* Precio del producto */}
            <button onClick={addToCart} className="add-to-cart-button">{/* Botón para agregar el producto al carrito */}
                <FaShoppingCart /> Agregar al carrito{/* Icono de carrito */}
            </button>
        </div>
    );
};

// Define el componente MesasProducto que lista todos los productos de tipo Lamparas.
const MesasProducto = () => {
    // Define una lista de productos con sus propiedades id, nombre, precio e imagen.
    const productos = [
        
    { id: 1, nombre: 'Mesa Bolanburg', precio: 50000, img: require('./img/mesa_bolanburg.jpg') },// Producto 1: Mesa Bolanburg - Contiene el id, nombre, precio y la imagen del producto.
    { id: 2, nombre: 'Mesa Caitbrook', precio: 100000, img: require('./img/mesa_caitbrook.jpg') },// Producto 2: Mesa Caitbrook - Contiene los detalles de este segundo producto.
    { id: 3, nombre: 'Mesa Extensión Haddigan', precio: 150000, img: require('./img/mesa_extension_haddigan.jpg') },// Producto 3: Mesa Extensión Haddigan - Detalles del tercer producto en la lista.
    { id: 4, nombre: 'Mesa Glambrey', precio: 200000, img: require('./img/mesa_glambrey.jpg') },// Producto 4: Mesa Glambrey - Información sobre el cuarto producto, con su id, nombre, precio e imagen.
    { id: 5, nombre: 'Mesa Haddigan', precio: 250000, img: require('./img/mesa_haddigan.jpg') },// Producto 5: Mesa Haddigan - Propiedades de este producto, incluido su nombre, precio e imagen.
    { id: 6, nombre: 'Mesa Kavara', precio: 100000, img: require('./img/mesa_kavara.jpg') },// Producto 6: Mesa Kavara - Contiene los mismos detalles: id, nombre, precio e imagen.
    { id: 7, nombre: 'Mesa Kimonte', precio: 120000, img: require('./img/mesa_kimonte.jpg') },// Producto 7: Mesa Kimonte - Descripción del producto con su respectiva imagen.
    { id: 8, nombre: 'Mesa Moriville', precio: 125000, img: require('./img/mesa_moriville.jpg') },// Producto 8: Mesa Moriville - Detalles sobre el producto como el nombre, precio y la imagen.
    { id: 9, nombre: 'Mesa Owingsville', precio: 140000, img: require('./img/mesa_owingsville.jpg') },// Producto 9: Mesa Owingsville - Similar a los anteriores, contiene la información básica.
    { id: 10, nombre: 'Mesa Ralene', precio: 90000, img: require('./img/mesa_ralene.jpg') },// Producto 10: Mesa Ralene - Este producto también tiene propiedades como id, nombre, precio e imagen.
    { id: 11, nombre: 'Mesa Whitesburg', precio: 110000, img: require('./img/mesa_whitesburg.jpg') },// Producto 11: Mesa Whitesburg - Información completa del producto con su imagen correspondiente.
    { id: 12, nombre: 'Mesa Woodanville', precio: 175000, img: require('./img/mesa_woodanville.jpg') },// Producto 12: Mesa Woodanville - El último producto con todos los detalles necesarios.
    ];

    // Renderiza el componente. Muestra un título y un grid de productos que son mapeados desde el array de productos.
    return (
        <div className="sala-productos">
            <div className="title-container"> {/* Contenedor del título */}
            <h1>Mesas</h1>
            <div className="decorative-line"></div> {/* Línea decorativa */}
            </div>
            {/* Renderiza la lista de productos dentro de un contenedor de grid. */}
            <div className="productos-grid">
                {/* Recorre la lista de productos y para cada uno renderiza un componente MesasItem */}
                {productos.map((producto) => ( // Cada producto se pasa como prop 'producto' al componente ProductoItem
                    <ProductoItem key={producto.id} producto={producto} /> // 'key' ayuda a React a identificar cada elemento de forma única para la eficiencia en la renderización
                ))}
            </div>
        </div>
    );
};

export default MesasProducto; // Exporta el componente MesasProducto para que pueda ser utilizado en otras partes de la aplicación.
