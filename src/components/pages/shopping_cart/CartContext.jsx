// src/CartContext.js

// Importa React y varios hooks de React: createContext para crear un contexto, 
// useReducer para manejar el estado con un reductor, y useContext para acceder al contexto.
import React, { createContext, useReducer, useContext } from 'react';

// Crea un contexto para el carrito de compras y lo almacena en CartContext.
const CartContext = createContext();

// Define una función reductora para manejar el estado del carrito y las acciones relacionadas.
const cartReducer = (state, action) => {
  switch (action.type) { // Evalúa el tipo de acción para determinar cómo actualizar el estado.
    case 'ADD_TO_CART': // Acción para agregar un producto al carrito.
      // Busca si el producto ya está en el carrito.
      const existingItemIndex = state.findIndex(item => item.id === action.payload.id);
      if (existingItemIndex > -1) { // Si el producto ya existe en el carrito...
        // Crea una nueva versión del carrito actualizando la cantidad del producto existente.
        const updatedCart = state.map((item, index) => {
          if (index === existingItemIndex) { // Encuentra el producto existente.
            return { ...item, quantity: item.quantity + 1 }; // Incrementa su cantidad.
          }
          return item; // Deja los demás productos sin cambios.
        });
        return updatedCart; // Retorna el carrito actualizado.
      }
      // Si el producto no existe en el carrito, lo agrega con una cantidad inicial de 1.
      return [...state, { ...action.payload, quantity: 1 }];
    case 'REMOVE_FROM_CART': // Acción para eliminar un producto del carrito.
      // Filtra los productos para excluir el que coincide con el ID del payload.
      return state.filter(item => item.id !== action.payload.id);
    case 'DECREASE_QUANTITY': // Acción para disminuir la cantidad de un producto.
      // Actualiza la cantidad del producto y elimina aquellos cuya cantidad sea menor o igual a 0.
      return state.map(item => 
        item.id === action.payload.id 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      ).filter(item => item.quantity > 0); // Filtra productos con cantidad mayor a 0.
    default: // Si la acción no coincide con ningún caso definido...
      return state; // Retorna el estado actual sin cambios.
  }
};

// Componente proveedor para el contexto del carrito.
export const CartProvider = ({ children }) => {
  // Usa useReducer para manejar el estado del carrito y su despachador de acciones.
  const [cart, dispatch] = useReducer(cartReducer, []); // Estado inicial es un arreglo vacío.

  return (
    // Proporciona el estado y el despachador del carrito a través del contexto.
    <CartContext.Provider value={{ cart, dispatch }}>
      {children} {/* Renderiza los componentes hijos dentro del proveedor. */}
    </CartContext.Provider>
  );
};

// Hook personalizado para acceder fácilmente al contexto del carrito.
export const useCart = () => useContext(CartContext); // Retorna el valor del contexto del carrito.
