//Importaciones y dependencias necesarias
import { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, AuthContext } from './components/AuthContext';
import Login from './components/Login';
import SignUp from './components/SignUp';
import InterfazAdmin from './components/interfazadmin';
import User from './components/pages/user/Profileuser';
import Nosotros from './components/pages/links/About';
import Contacto from './components/pages/links/Contact';
import Navbar from './components/Navbar';
import ListaProductos from './components/pages/admin_interface/ProductosList';
import CrearProducto from './components/pages/admin_interface/FormularioCrearProducto';
import ActualizarProducto from './components/pages/admin_interface/FormularioActualizarProd';
import Cart from './components/pages/shopping_cart/CartMenu';
import Cartt from './components/pages/shopping_cart/Payment_Method';
import Factura from './components/pages/shopping_cart/Factura';
import ResultadosBusqueda from './components/ResultadosBusqueda';
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
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // Rutas donde el Navbar no debe mostrarse para admin
  const noNavbarRoutesForAdmin = ["/Login", "/interfazadmin", "/productoslist", "/crearproducto", "/actproducto"];
  
   // Determina si se debe mostrar el Navbar
   const showNavbar = !user || (user.type === "cliente" && !noNavbarRoutesForAdmin.includes(location.pathname));

  return (
    <>
      {/* Renderiza el Navbar según el tipo de usuario */}
      {showNavbar && <Navbar />}
      <Routes>
        {/* Ruta inicial para mostrar el Navbar sin autenticación */}
        <Route path="/" element={<Navigate to={!user ? "/navbar" : "/user"} replace />} />

        {/* Rutas públicas */}

        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        
        {/* Ruta independiente para InterfazAdmin sin Navbar */}
        <Route path="/interfazadmin" element={<ProtectedRoute userType="admin"><InterfazAdmin /></ProtectedRoute>} />

        {/* Rutas protegidas para administrador */}
        <Route path="/productoslist" element={<ProtectedRoute userType="admin"><ListaProductos /></ProtectedRoute>} />
        <Route path="/crearproducto" element={<ProtectedRoute userType="admin"><CrearProducto /></ProtectedRoute>} />
        <Route path="/actproducto" element={<ProtectedRoute userType="admin"><ActualizarProducto /></ProtectedRoute>} />
        
        {/* Rutas protegidas para cliente */}
        <Route path="/*" element={<ProtectedRoute userType="cliente"><ClienteRoutes /></ProtectedRoute>} />
        
      </Routes></>
  );
}

function ProtectedRoute({ userType, children }) {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" />;
  if (userType && user.type !== userType) return <Navigate to="/" />;
  return children;
}


function ClienteRoutes() {
  return (
    <Routes>
      {/* Rutas de cliente */}
      <Route path="/user" element={<User />} />
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/carrito" element={<Cart />} />
      <Route path="/carritoo" element={<Cartt />} />
      <Route path="/factura" element={<Factura />} />
      <Route path="/resultados-busqueda" element={<ResultadosBusqueda />} />
      
      {/* Rutas de productos agrupadas por categorías */}
          <Route path="/productos/accesorios/relojes" element={<Relojes />} />
          <Route path="/productos/accesorios/lámparas" element={<Lamparas />} />
          <Route path="/productos/accesorios/espejos" element={<Espejos />} />
          <Route path="/productos/salas/sofás" element={<Sofas />} />
          <Route path="/productos/salas/muebles-para-tv" element={<MueblesTV />} />
          <Route path="/productos/salas/mesas-de-centro" element={<MesasCentro />} />
          <Route path="/productos/muebles-de-patio/mesas-de-exterior" element={<MesasExterior />} />
          <Route path="/productos/muebles-de-patio/sillas-de-exterior" element={<SillasExterior />} />
          <Route path="/productos/muebles-de-patio/toldos" element={<Toldos />} />
          <Route path="/productos/muebles-de-oficina/escritorios" element={<Escritorios />} />
          <Route path="/productos/muebles-de-oficina/libreros" element={<Libreros />} />
          <Route path="/productos/muebles-de-oficina/sillas-de-estudio" element={<SillasEstudio />} />
          <Route path="/productos/comedores/juego-comedor" element={<JuegoComedor />} />
          <Route path="/productos/comedores/mesas" element={<MesasComedor />} />
          <Route path="/productos/comedores/sillas" element={<SillasComedor />} />
          <Route path="/productos/dormitorios/camas" element={<Camas />} />
          <Route path="/productos/dormitorios/comodas-con-espejo" element={<ComodasConEspejo />} />
          <Route path="/productos/dormitorios/mesas-de-noche" element={<MesasNoche />} />
          </Routes>
  );
}

export default App;