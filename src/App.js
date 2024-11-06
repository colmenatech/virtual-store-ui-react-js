import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
/* import Catalogo from './pages/Catalogo';
import Nosotros from './pages/Nosotros';
import Contacto from './pages/Contacto'; */
/*mport IniciarSesion from './components/pages/AddressForm';
import Carrito from './components/pages/Cart';*/
/* import Salas from './pages/Salas';
import Comedores from './pages/Comedores';
import Dormitorios from './pages/Dormitorios';
import MueblesDePatio from './pages/MueblesDePatio';
import MueblesDeOficina from './pages/MueblesDeOficina';
import Accesorios from './pages/Accesorios'; */

function App() {
  return (
    <Router>
      <Home />
      <Routes>
        {/* <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} /> */}
         {/*<Route path="/iniciar-sesion" element={<IniciarSesion />} />
        <Route path="/carrito" element={<Carrito />} />*/}
        {/* <Route path="/productos/salas" element={<Salas />} />
        <Route path="/productos/comedores" element={<Comedores />} />
        <Route path="/productos/dormitorios" element={<Dormitorios />} />
        <Route path="/productos/muebles-de-patio" element={<MueblesDePatio />} />
        <Route path="/productos/muebles-de-oficina" element={<MueblesDeOficina />} />
        <Route path="/productos/accesorios" element={<Accesorios />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
