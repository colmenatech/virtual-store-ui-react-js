// Importa React para definir un componente funcional.
import React from 'react';
import './mesasnoche.css'; // Importa el archivo CSS correctamente
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

// Define el componente MesasNocheProducto que lista todos los productos de tipo Mesas de Noche.
const MesasNocheProducto = () => {
    // Define una lista de productos con sus propiedades id, nombre, precio e imagen.
    const productos = [
        { id: 1, nombre: 'Mesa de Noche Anarasia', precio: 200, img: require('./img/mesa_noche_anarasia.jpg') },
        { id: 2, nombre: 'Mesa de Noche Bellaby', precio: 150, img: require('./img/mesa_noche_bellaby.jpg') },
        { id: 3, nombre: 'Mesa de Noche Bolanburg', precio: 100, img: require('./img/mesa_noche_bolanburg.jpg') },
        { id: 4, nombre: 'Mesa de Noche Veladora', precio: 250, img: require('./img/mesa_veladora.jpg') },
        { id: 5, nombre: 'Mesa de Noche Culverbach', precio: 175, img: require('./img/mesa_noche_culverbach.jpg') },
        { id: 6, nombre: 'Mesa de Noche Flynnter', precio: 300, img: require('./img/mesa_noche_flynnter.jpg') },
        { id: 7, nombre: 'Mesa de Noche Juararo', precio: 300, img: require('./img/mesa_noche_juararo.jpg') },
        { id: 6, nombre: 'Mesa de Noche Maribel', precio: 300, img: require('./img/mesa_noche_maribel.jpg') },
        { id: 6, nombre: 'Mesa de Noche Porter', precio: 300, img: require('./img/mesa_noche_porter.jpg') },
        { id: 6, nombre: 'Mesa de Noche Starmore', precio: 300, img: require('./img/mesa_noche_starmore.jpg') },
        { id: 6, nombre: 'Mesa de Noche Vineyard', precio: 300, img: require('./img/mesa_noche_vineyard.jpg') },
        { id: 6, nombre: 'Mesa de Noche Willowton', precio: 300, img: require('./img/mesa_noche_willowton.jpg') },
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

// Exporta el componente MesasNocheProducto para que pueda ser utilizado en otras partes de la aplicación.
export default MesasNocheProducto;
