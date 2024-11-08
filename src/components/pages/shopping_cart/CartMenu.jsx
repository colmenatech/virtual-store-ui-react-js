import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';

const CartMenu = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart, dispatch } = useCart();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0); // Calcula el número total de artículos en el carrito
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0); // Calcula el precio total de los artículos en el carrito

  return (
    <div className="relative">
      {/* Icono del carrito y número de artículos */}
      <button className="p-2 relative" onClick={() => setIsCartOpen(!isCartOpen)}>
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
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" /> {/* Imagen del producto */}
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

                {/* Totales */}
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

                {/* Botón de confirmar */}
                <Link to="/factura" className="block mt-4 text-center py-2 bg-primario text-white font-semibold rounded">
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
