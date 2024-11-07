// Importa React para definir un componente funcional.
import React from 'react';
import './Camas.css'; // Importa el archivo CSS correctamente
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

// Define el componente CamasProductos que lista todos los productos de tipo Camas.
const CamasProductos = () => {
    // Define una lista de productos con sus propiedades id, nombre, precio e imagen.
    const productos = [
        { id: 1, nombre: 'Cama Alisdair', precio: 1200, img: require('./img/cama_alisdair.jpg') },
        { id: 2, nombre: 'Cama Anarasia', precio: 950, img: require('./img/cama_anarasia.jpg') },
        { id: 3, nombre: 'Cama Baystorm', precio: 1100, img: require('./img/cama_baystorm.jpg') },
        { id: 4, nombre: 'Cama Bolanburg', precio: 1250, img: require('./img/cama_bolanburg.jpg') },
        { id: 5, nombre: 'Cama California', precio: 900, img: require('./img/cama_california.jpg') },
        { id: 6, nombre: 'Cama Dolante', precio: 1400, img: require('./img/cama_dolante.jpg') },
        { id: 6, nombre: 'Cama Rusticbrown', precio: 1400, img: require('./img/cama_rusticbrown.jpg') },
        { id: 6, nombre: 'Cama Starmore', precio: 1400, img: require('./img/cama_starmore.jpg') },
        { id: 6, nombre: 'Cama Tapizada', precio: 1400, img: require('./img/cama_tapizada.jpg') },
        { id: 6, nombre: 'Cama Vineyord', precio: 1400, img: require('./img/cama_vineyord.jpg') },
        { id: 6, nombre: 'Cama Willenburg', precio: 1400, img: require('./img/cama_willenburg.jpg') },
        { id: 6, nombre: 'Cama Maribel', precio: 1400, img: require('./img/csms_maribel.jpg') },
    ];

    // Renderiza el componente. Muestra un título y un grid de productos que son mapeados desde el array de productos.
    return (
        <div className="sala-productos">
           <div className="title-container"> {/* Contenedor del título */}
            <h1>Camas</h1>
            <div className="decorative-line"></div> {/* Línea decorativa */}
            </div>
            {/* Renderiza la lista de productos dentro de un contenedor de grid. */}
            <div className="productos-grid">
                {/* Recorre la lista de productos y para cada uno renderiza un componente CamasItems */}
                {productos.map((producto) => (
                    <ProductoItem key={producto.id} producto={producto} />
                ))}
            </div>
        </div>
    );
};

// Exporta el componente CamasProductos para que pueda ser utilizado en otras partes de la aplicación.
export default CamasProductos;
