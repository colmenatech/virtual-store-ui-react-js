//Importaciones y depedencias nesecarias 
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CartProvider } from './components/pages//shopping_cart/CartContext';
// Importamos los proyectos para la navegacion
import Navbar from './components/Navbar';
import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx';
import Contacto from './components/pages/links/Contact.jsx';
import Nosotros from './components/pages/links/About.jsx';
import InterfazAdmin from './components/pages/admin_interface/interfazadmin.jsx';
import InterfazProductos from './components/pages/admin_interface/ProductosList.jsx'
// Importamos las subcatergorias
import ProductoEspejos from './components/pages/Espejos.jsx';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Enlaces del Navbar */}
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/nosotros" element={<Nosotros />} />
          {/* Iniciar Seccion */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/interfazadmin" element={<InterfazAdmin />} />
          <Route path="/productoslist" element={<InterfazProductos />} />
          {/* Productos */}
          <Route path="/espejos" element={<ProductoEspejos />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;