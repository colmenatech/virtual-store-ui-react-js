import React from "react";
import './modal.css'

const modal_cart = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-lg font-semibold">Carrito</h2>
              <button className="text-gray-600 hover:text-red-500" onClick={onClose}>
                X
              </button>
            </div>
            <div className="p-4">
              {children}
            </div>
          </div>
        </div>
      );
  };
  
  export default modal_cart;