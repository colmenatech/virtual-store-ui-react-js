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
        dispatch({ type: 'ADD_TO_CART', payload: producto });
    };
    return (
        <div className="product-card">
            <img src={producto.img} alt={producto.nombre} />
            <h3>{producto.nombre}</h3>
            <p>{producto.descripcion}</p>
            <p>${producto.precio}</p>
            <button onClick={addToCart} className="add-to-cart-button">
                <FaShoppingCart /> Agregar al carrito
            </button>
        </div>
    );
};

// Define el componente MesasProducto que lista todos los productos de tipo Lamparas.
const MesasProducto = () => {
    // Define una lista de productos con sus propiedades id, nombre, precio e imagen.
    const productos = [
        { id: 1, nombre: 'Mesa Bolanburg', precio: 50000, img: require('./img/mesa_bolanburg.jpg') },
        { id: 2, nombre: 'Mesa Caitbrook', precio: 100000, img: require('./img/mesa_caitbrook.jpg') },
        { id: 3, nombre: 'Mesa Extensión Haddigan', precio: 150000, img: require('./img/mesa_extension_haddigan.jpg') },
        { id: 4, nombre: 'Mesa Glambrey', precio: 200000, img: require('./img/mesa_glambrey.jpg') },
        { id: 5, nombre: 'Mesa Haddigan', precio: 250000, img: require('./img/mesa_haddigan.jpg') },
        { id: 6, nombre: 'Mesa Kavara', precio: 100000, img: require('./img/mesa_kavara.jpg') },
        { id: 7, nombre: 'Mesa Kimonte', precio: 120000, img: require('./img/mesa_kimonte.jpg') },
        { id: 8, nombre: 'Mesa Moriville', precio: 125000, img: require('./img/mesa_moriville.jpg') },
        { id: 9, nombre: 'Mesa Owingsville', precio: 140000, img: require('./img/mesa_owingsville.jpg') },
        { id: 10, nombre: 'Mesa Ralene', precio: 90000, img: require('./img/mesa_ralene.jpg') },
        { id: 11, nombre: 'Mesa Whitesburg', precio: 110000, img: require('./img/mesa_whitesburg.jpg') },
        { id: 12, nombre: 'Mesa Woodanville', precio: 175000, img: require('./img/mesa_woodanville.jpg') },
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
                {productos.map((producto) => (
                    <ProductoItem key={producto.id} producto={producto} />
                ))}
            </div>
        </div>
    );
};

// Exporta el componente MesasProducto para que pueda ser utilizado en otras partes de la aplicación.
export default MesasProducto;
