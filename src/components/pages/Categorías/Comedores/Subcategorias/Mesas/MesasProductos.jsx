import React, { useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../../../shopping_cart/CartContext';   
import axios from 'axios';
import Cookies from 'js-cookie';  // Importa la librería para manejar las cookies

const ProductoItem = ({ producto }) => {
    const { dispatch } = useCart();
    
    const addToCart = () => {
        dispatch({ type: 'ADD_TO_CART', payload: producto });
    };

    return (
        <div className="product-card">
            <img src={producto.image_url} alt={producto.name} /> {/* Cambié 'producto.img' por 'producto.image_url' */}
            <h3>{producto.name}</h3> {/* Cambié 'producto.descripcion' por 'producto.name' */}
            <h4>{producto.description}</h4>
            <p>${producto.price}</p> {/* Cambié 'producto.precio' por 'producto.price' */}
            <button onClick={addToCart} className="add-to-cart-button">
                <FaShoppingCart /> Agregar al carrito
            </button>
        </div>
    );
};

const MesasProducto = () => {
    const [productos, setProductos] = useState([]);  // Estado para almacenar los productos obtenidos.

    useEffect(() => {
        const token = Cookies.get('token');  // Obtener el token de las cookies

        if (!token) {
            console.error('No estás autenticado');
            return;
        }

        axios.get('http://localhost:8000/api/user-profile/products/subcategoryclient/6', {
            headers: {
                Authorization: `Bearer ${token}`,  // Incluir el token en los headers
            },
        })
        .then(response => {
            setProductos(response.data.products);  // Aquí se accede a 'products' en la respuesta.
        })
        .catch(error => {
            console.error('Hubo un error al obtener los productos:', error);
        });
    }, []);  // Se ejecuta solo una vez cuando el componente se monta.

    return (
        <div className="sala-productos">
            <div className="title-container">
                <h1>Mesas</h1>
                <div className="decorative-line"></div>
            </div>
            <div className="productos-grid">
                {productos.length > 0 && 
                    productos.map((producto) => (
                        <ProductoItem key={producto.id} producto={producto} />
                    ))
                }
            </div>
        </div>
    );
};

export default MesasProducto; // Exporta el componente MesasProducto para que pueda ser utilizado en otras partes de la aplicación.
