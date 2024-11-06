import React from "react";
import './modal.css'

const LoginModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 relative w-11/12 max-w-md">
        <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-900" onClick={onClose}>
          &times; {/* Botón de cerrar el modal */}
        </button>
        {children}
      </div>
    </div>
  );
};

export default LoginModal;
