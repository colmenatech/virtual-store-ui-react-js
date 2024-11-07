// Importa React para definir un componente funcional.
import React from 'react';
import './MesasExterior.css';
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

// Define el componente EscritorioProducto que lista todos los productos de tipo Escritorios.
const MesasExteriorProducto = () => {
    // Define una lista de productos con sus propiedades id, nombre, precio e imagen.
    const productos = [
        { id: 1, nombre: 'Mesa con Banquitas', precio: 500, img: require('./img/descarga.jpg') },
        { id: 2, nombre: 'Mesa Desplegable', precio: 400, img: require('./img/Gartentisch Schwarz 140x80x75 cm Poly Rattan Akazienholz.jpg') },
        { id: 3, nombre: 'Mesa de Madera blanca', precio: 300, img: require('./img/Liza - Negro - Mesa auxiliar - Schuller.jpg') },
        { id: 4, nombre: 'Mesa de Madera', precio: 450, img: require('./img/Mesa de comedor redonda extensible con marco de aluminio.jpg') },
        { id: 5, nombre: 'Mesa de Madera', precio: 350, img: require('./img/Mesa Plegable Stuk Nairobi Blanca.jpg') },
        { id: 6, nombre: 'Mesa de Marmol', precio: 600, img: require('./img/Plateau De Table Carrée En Inox Gris 70x70cm.jpg') },
        { id: 7, nombre: 'Mesa Cuadrada Color Negro', precio: 600, img: require('./img/Salon De Jardin 2 Bancs Et 4 Chaises En Acier Vert Cactus.jpg') },
        { id: 8, nombre: 'Mesa de plastico', precio: 600, img: require('./img/Table de jardin en bois, marron, rustique Jeanette.jpg') },
        { id: 9, nombre: 'Mesa Redonda de Madera', precio: 600, img: require('./img/Table extérieur en bois (en sapin),  avec pieds en fer de forme X_  2,80 de longueur.jpg') },
        { id: 10, nombre: 'Mesa Color Verde', precio: 600, img: require('./img/vidaXL Tuintafel 85x85x74 cm massief acaciahout.jpg') },
        { id: 11, nombre: 'Mesa de Vidrio', precio: 600, img: require('./img/descarga.jpg') },
        { id: 12, nombre: 'Mesa de Madera', precio: 600, img: require('./img/descarga.jpg') },

    ];

    // Renderiza el componente. Muestra un título y un grid de productos que son mapeados desde el array de productos.
    return (
        <div className="sala-productos">
            <div className="title-container"> {/* Contenedor del título */}
            <h1>Productos de Muebles de Patio</h1>
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

// Exporta el componente EscritorioProducto para que pueda ser utilizado en otras partes de la aplicación.
export default MesasExteriorProducto;
