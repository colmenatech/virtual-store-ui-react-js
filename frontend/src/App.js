//Importaciones y depedencias nesecarias 
import { useRef, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './components/AuthContext';
import Login from './components/Login';
import SignUp from './components/SignUp';
import InterfazAdmin from './components/pages/admin_interface/interfazadmin';
//import Home from './components/Home';
import User from './components/pages/user/Profileuser';
import Nosotros from './components/pages/links/About';
import Contacto from './components/pages/links/Contact';
import Navbar from './components/Navbar';
import ListaProductos from './components/pages/admin_interface/ProductosList';
import CrearProducto from './components/pages/admin_interface/FormularioCrearProducto';
import ActualizarProducto from './components/pages/admin_interface/FormularioActualizarProd';
import Cart from './components/pages/shopping_cart/CartMenu';
import Factura from './components/pages/shopping_cart/Factura';
import { CartProvider } from './components/pages/shopping_cart/CartContext';


// Importar componentes de subcategorías
import Relojes from './components/pages/Categorías/Accesorios/Subcategorias/Relojes/relojes';
import Lamparas from './components/pages/Categorías/Accesorios/Subcategorias/Lamparas/Lamparas';
import Espejos from './components/pages/Categorías/Accesorios/Subcategorias/Espejos/Espejos';
import Sofas from './components/pages/Categorías/Sala/Subcategorías/Sofas/sofas';
import MueblesTV from './components/pages/Categorías/Sala/Subcategorías/Muebles para TV/muebles_para_tv';
import MesasCentro from './components/pages/Categorías/Sala/Subcategorías/Mesas de centro/MueblesSalas';
import MesasExterior from './components/pages/Categorías/Muebles de Patio/Subcategorias/Mesas de Exterior/MesasExterior';
import SillasExterior from './components/pages/Categorías/Muebles de Patio/Subcategorias/SillasExterior/SillasExterior';
import Toldos from './components/pages/Categorías/Muebles de Patio/Subcategorias/Toldos/Toldos';
import Escritorios from './components/pages/Categorías/Muebles de Oficina/Subcategorias/Escritorios/Escritorios';
import Libreros from './components/pages/Categorías/Muebles de Oficina/Subcategorias/Libreros/Librero';
import SillasEstudio from './components/pages/Categorías/Muebles de Oficina/Subcategorias/Sillas de estudio/SillasEstudio';
import JuegoComedor from './components/pages/Categorías/Comedores/Subcategorias/Juegos de comedor/JuegosComedorProductos';
import MesasComedor from './components/pages/Categorías/Comedores/Subcategorias/Mesas/MesasProductos';
import SillasComedor from './components/pages/Categorías/Comedores/Subcategorias/Sillas/SillasProducto';
import Camas from './components/pages/Categorías/Dormitorios/Subcategorias/Camas/CamasProductos';
import ComodasConEspejo from './components/pages/Categorías/Dormitorios/Subcategorias/Comodas con espejo/ComodaEspejoProductos';
import MesasNoche from './components/pages/Categorías/Dormitorios/Subcategorias/Mesas de Noche/MesasNocheProducto';



function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <MainRoutes />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

function MainRoutes() {
  const { user } = useContext(AuthContext); // Acceder al contexto de autenticación

  return (
    <>
      {window.location.pathname !== "/Login" && window.location.pathname !== "/SignUp" && user && <Navbar />}
      <Routes>
        {/* Redirigir a Home al inicio y evitar que se muestre el Navbar */}
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/interfazadmin" element={<InterfazAdmin />} />
        <Route path="/productoslist" element={<ProtectedRoute userType="admin"><ListaProductos /></ProtectedRoute>} />
        <Route path="/crearproducto" element={<ProtectedRoute userType="admin"><CrearProducto /></ProtectedRoute>} />
        <Route path="/actproducto" element={<ProtectedRoute userType="admin"><ActualizarProducto /></ProtectedRoute>} />
        <Route path="/*" element={<ProtectedRoute userType="cliente"><ClienteRoutes /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

function ProtectedRoute({ userType, children }) {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/Login" />;
  if (user.type !== userType) return <Navigate to="/" />;
  return children;
}

function ClienteRoutes() {
  return (
    <>
      <Routes>
        <Route path="/user" element={<User />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/carrito" element={<Cart />} />
        <Route path="/factura" element={<Factura />} />
    
        {/* Rutas de subcategorías */}
        {/* Accesorios */}
        <Route path="/productos/accesorios/relojes" element={<Relojes />} />
        <Route path="/productos/accesorios/lámparas" element={<Lamparas />} />
        <Route path="/productos/accesorios/espejos" element={<Espejos />} />

        {/* Sala */}
        <Route path="/productos/salas/sofás" element={<Sofas />} />
        <Route path="/productos/salas/muebles-para-tv" element={<MueblesTV />} />
        <Route path="/productos/salas/mesas-de-centro" element={<MesasCentro />} />

        {/* Muebles de Patio */}
        <Route path="/productos/muebles-de-patio/mesas-de-exterior" element={<MesasExterior />} />
        <Route path="/productos/muebles-de-patio/sillas-de-exterior" element={<SillasExterior />} />
        <Route path="/productos/muebles-de-patio/toldos" element={<Toldos />} />

        {/* Muebles de Oficina */}
        <Route path="/productos/muebles-de-oficina/escritorios" element={<Escritorios />} />
        <Route path="/productos/muebles-de-oficina/libreros" element={<Libreros />} />
        <Route path="/productos/muebles-de-oficina/sillas-de-estudio" element={<SillasEstudio />} />

        {/* Comedores */}
        <Route path="/productos/comedores/juego-comedor" element={<JuegoComedor />} />
        <Route path="/productos/comedores/mesas" element={<MesasComedor />} />
        <Route path="/productos/comedores/sillas" element={<SillasComedor />} />

        {/* Dormitorios */}
        <Route path="/productos/dormitorios/camas" element={<Camas />} />
        <Route path="/productos/dormitorios/comodas-con-espejo" element={<ComodasConEspejo />} />
        <Route path="/productos/dormitorios/mesas-de-noche" element={<MesasNoche />} />
      </Routes>
    </>
  );
}

export default App;
