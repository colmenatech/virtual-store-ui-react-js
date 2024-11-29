import React, { useState, useContext, useEffect, useRef } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import { AuthContext } from '../../AuthContext';

const CartMenu = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart, dispatch } = useCart();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const cartMenuRef = useRef(null); // Referencia para el contenedor del carrito

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCartClick = () => {
    if (!user) {
      alert("Debes iniciar sesión para acceder al carrito.");
      navigate("/Login");
    } else {
      setIsCartOpen(!isCartOpen);
    }
  };

  // Detectar clic fuera del menú del carrito
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartMenuRef.current && !cartMenuRef.current.contains(event.target)) {
        setIsCartOpen(false); // Cierra el carrito si se hace clic fuera de él
      }
    };

    if (isCartOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCartOpen]);

  return (
    <div className="relative" ref={cartMenuRef}>
      {/* Icono del carrito */}
      <button className="p-2 relative" onClick={handleCartClick}>
        <ShoppingCart className="text-texto_color" size={24} />
        {totalItems > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-white bg-primario rounded-full">
            {totalItems}
          </span>
        )}
      </button>

      {/* Menú del carrito */}
      {isCartOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-fondo border border-secundario shadow-lg rounded-lg z-50">
          <div className="p-4 border-b border-secundario">
            <h2 className="font-bold text-lg text-texto_color">Carrito de Compras</h2>
            {cart.length > 0 ? (
              <>
                <ul className="mt-4 space-y-4">
                  {cart.map((item) => (
                    <li key={item.id} className="flex justify-between items-center">
                      <img src={item.image_url} alt={item.name} className="w-12 h-12 object-cover rounded" />
                      <div className="ml-4 flex-1">
                        <h3 className="text-sm font-semibold text-texto_color">{item.name}</h3>
                        <p className="text-xs text-secundario">{item.description}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold text-texto_color">x{item.quantity}</span>
                        <p className="text-sm text-texto_color">₡{item.price}</p>
                        <button onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item })} className="text-primario text-sm">Eliminar</button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 text-right text-texto_color">
                  <div className="flex justify-between mb-2">
                    <span>Transporte</span>
                    <span>₡2,500</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>₡{totalPrice + 2500}</span>
                  </div>
                </div>
                <Link to="/carrito-checkout" className="block mt-4 text-center py-2 bg-primario text-white font-semibold rounded">
                  CONFIRMAR
                </Link>
              </>
            ) : (
              <p className="text-center text-secundario">El carrito está vacío</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartMenu;
