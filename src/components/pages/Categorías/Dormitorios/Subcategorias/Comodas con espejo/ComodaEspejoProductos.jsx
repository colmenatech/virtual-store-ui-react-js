// Importa React para definir un componente funcional.
import React from 'react';
import './comodas.css'; // Importa el archivo CSS correctamente
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

// Define el componente ComodaEspejoProductos que lista todos los productos de tipo Comodas con Espejo.
const ComodaEspejoProductos = () => {
    // Define una lista de productos con sus propiedades id, nombre, precio e imagen.
    const productos = [
        { id: 1, nombre: 'Comoda Zelen con Espejo', precio: 1300, img: require('./img/cama_zelen.jpg') },
        { id: 2, nombre: 'Comoda Alisdair con Espejo', precio: 1100, img: require('./img/comoda_alisdair.jpg') },
        { id: 3, nombre: 'Comoda Anarasia con Espejo', precio: 900, img: require('./img/comoda_anarasia.jpg') },
        { id: 4, nombre: 'Comoda Bostwick con Espejo', precio: 1200, img: require('./img/comoda_bostwick.jpg') },
        { id: 5, nombre: 'Comoda Brinxton con Espejo', precio: 1000, img: require('./img/comoda_brinxton.jpg') },
        { id: 6, nombre: 'Comoda Culverbach con Espejo', precio: 1500, img: require('./img/comoda_culverbach.jpg') },
        { id: 7, nombre: 'Comoda Flynnter con Espejo', precio: 1500, img: require('./img/comoda_flynnter.jpg') },
        { id: 8, nombre: 'Comoda Juararo con Espejo', precio: 1500, img: require('./img/comoda_juararo.jpg') },
        { id: 9, nombre: 'Comoda Maribel con Espejo', precio: 1500, img: require('./img/comoda_maribel.jpg') },
        { id: 10, nombre: 'Comoda Porter con Espejo', precio: 1500, img: require('./img/comoda_porter.jpg') },
        { id: 11, nombre: 'Comoda Starmore con Espejo', precio: 1500, img: require('./img/comoda_starmore.jpg') },
        { id: 12, nombre: 'Comoda Vineyard con Espejo', precio: 1500, img: require('./img/comoda_vineyard.jpg') },


    ];

    // Renderiza el componente. Muestra un título y un grid de productos que son mapeados desde el array de productos.
    return (
        <div className="sala-productos">
           <div className="title-container"> {/* Contenedor del título */}
            <h1>Comódas con espejo</h1>
            <div className="decorative-line"></div> {/* Línea decorativa */}
            </div>
            {/* Renderiza la lista de productos dentro de un contenedor de grid. */}
            <div className="productos-grid">
                {/* Recorre la lista de productos y para cada uno renderiza un componente ComodaEspejoItem */}
                {productos.map((producto) => (
                    <ProductoItem key={producto.id} producto={producto} />
                ))}
            </div>
        </div>
    );
};

// Exporta el componente ComodaEspejoProductos para que pueda ser utilizado en otras partes de la aplicación.
export default ComodaEspejoProductos;
