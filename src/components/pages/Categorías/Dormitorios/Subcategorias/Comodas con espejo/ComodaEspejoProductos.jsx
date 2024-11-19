import React from 'react';// Importa React para definir un componente funcional.
import './comodas.css'; // Importa el archivo CSS correctamente
import { FaShoppingCart } from 'react-icons/fa';// Importa el ícono del carrito de compras de react-icons
import { useCart } from '../../../../shopping_cart/CartContext';// Importa el hook useCart desde el contexto de carrito de compras
// Componente ProductoItem que recibe un objeto 'producto' como prop
const ProductoItem = ({ producto }) => {
    // Usa el hook useCart para obtener la función 'dispatch' del contexto de carrito
    
    // Función que se ejecuta cuando el usuario hace clic en "Agregar al carrito"
    const addToCart = () => {
        // Despacha una acción al contexto de carrito para agregar el producto
        // Se pasa 'type: ADD_TO_CART' para indicar el tipo de acción y 'payload: producto' para pasar el producto a agregar
        dispatch({ type: 'ADD_TO_CART', payload: producto });
    };
    return (
        <div className="product-card">
            <img src={producto.img} alt={producto.nombre} /> {/* Muestra la imagen del producto */}
            <h3>{producto.nombre}</h3>  {/* Muestra el nombre del producto */}
            <p>{producto.descripcion}</p>  {/* Muestra la descripción del producto */}
            <p>${producto.precio}</p> {/* Muestra el precio del producto */}
            <button onClick={addToCart} className="add-to-cart-button"> {/* Botón para agregar el producto al carrito */}
                <FaShoppingCart /> Agregar al carrito {/* Ícono de carrito de compras */}
            </button>
        </div>
    );
};

// Define el componente ComodaEspejoProductos que lista todos los productos de tipo Comodas con Espejo.
const ComodaEspejoProductos = () => {
    // Define una lista de productos con sus propiedades id, nombre, precio e imagen.
    const productos = [
        { id: 1, nombre: 'Comoda Zelen con Espejo', precio: 1300, img: require('./img/cama_zelen.jpg') }, // Comoda Zelen con espejo, precio 1300, imagen asociada
        { id: 2, nombre: 'Comoda Alisdair con Espejo', precio: 1100, img: require('./img/comoda_alisdair.jpg') }, // Comoda Alisdair con espejo, precio 1100, imagen asociada
        { id: 3, nombre: 'Comoda Anarasia con Espejo', precio: 900, img: require('./img/comoda_anarasia.jpg') }, // Comoda Anarasia con espejo, precio 900, imagen asociada
        { id: 4, nombre: 'Comoda Bostwick con Espejo', precio: 1200, img: require('./img/comoda_bostwick.jpg') }, // Comoda Bostwick con espejo, precio 1200, imagen asociada
        { id: 5, nombre: 'Comoda Brinxton con Espejo', precio: 1000, img: require('./img/comoda_brinxton.jpg') }, // Comoda Brinxton con espejo, precio 1000, imagen asociada
        { id: 6, nombre: 'Comoda Culverbach con Espejo', precio: 1500, img: require('./img/comoda_culverbach.jpg') }, // Comoda Culverbach con espejo, precio 1500, imagen asociada
        { id: 7, nombre: 'Comoda Flynnter con Espejo', precio: 1500, img: require('./img/comoda_flynnter.jpg') }, // Comoda Flynnter con espejo, precio 1500, imagen asociada
        { id: 8, nombre: 'Comoda Juararo con Espejo', precio: 1500, img: require('./img/comoda_juararo.jpg') }, // Comoda Juararo con espejo, precio 1500, imagen asociada
        { id: 9, nombre: 'Comoda Maribel con Espejo', precio: 1500, img: require('./img/comoda_maribel.jpg') }, // Comoda Maribel con espejo, precio 1500, imagen asociada
        { id: 10, nombre: 'Comoda Porter con Espejo', precio: 1500, img: require('./img/comoda_porter.jpg') }, // Comoda Porter con espejo, precio 1500, imagen asociada
        { id: 11, nombre: 'Comoda Starmore con Espejo', precio: 1500, img: require('./img/comoda_starmore.jpg') }, // Comoda Starmore con espejo, precio 1500, imagen asociada
        { id: 12, nombre: 'Comoda Vineyard con Espejo', precio: 1500, img: require('./img/comoda_vineyard.jpg') }, // Comoda Vineyard con espejo, precio 1500, imagen asociada
    ];

    // Renderiza el componente. Muestra un título y un grid de productos que son mapeados desde el array de productos.
    return (
        <div className="sala-productos">
           <div className="title-container"> {/* Contenedor del título */}
            <h1>Comódas con espejo</h1>
            <div className="decorative-line"></div> {/* Línea decorativa */}
            </div>
            <div className="productos-grid"> {/* Renderiza la lista de productos dentro de un contenedor de grid. */}
                {/* Recorre la lista de productos y para cada uno renderiza un componente ComodaEspejoItem */}
                {productos.map((producto) => (
                    <ProductoItem key={producto.id} producto={producto} /> // Crea un componente ProductoItem por cada elemento de la lista 'productos'.
                ))}
            </div>
        </div>
    );
};

export default ComodaEspejoProductos; // Exporta el componente ComodaEspejoProductos para que pueda ser utilizado en otras partes de la aplicación.
