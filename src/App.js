import { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, AuthContext } from './components/AuthContext';
import Login from './components/Login';
import SignUp from './components/SignUp';
import InterfazAdmin from './components/interfaz_admin/interfazadmin';
import Home from './components/Home';
import User from './components/Menú/pages/user/Profileuser';
import Nosotros from './components/Menú/pages/SobreNosotros/SobreNosotros';
import Contacto from './components/Menú/pages/Contacto/ContacForm';
import Navbar from './components/Navbar';
import ListaProductos from './components/interfaz_admin/ProductosList';
import CrearProducto from './components/interfaz_admin/FormularioCrearProducto';
import ActualizarProducto from './components/interfaz_admin/FormularioActualizarProd';
import Cart from './components/carrito_de_compras/Cart';
import Factura from './components/interfaz_factura/Factura';
import { CartProvider } from './components/pages/shopping_cart/CartContext';

// Importar componentes de subcategorías
import Relojes from './components/Menú/pages/Categorías/Accesorios/Subcategorias/Relojes/relojes';
import Lamparas from './components/Menú/pages/Categorías/Accesorios/Subcategorias/Lamparas/Lamparas';
import Espejos from './components/Menú/pages/Categorías/Accesorios/Subcategorias/Espejos/Espejos';
import Sofas from './components/Menú/pages/Categorías/Sala/Subcategorías/Sofas/sofas';
import MueblesTV from './components/Menú/pages/Categorías/Sala/Subcategorías/Muebles para TV/muebles_para_tv';
import MesasCentro from './components/Menú/pages/Categorías/Sala/Subcategorías/Mesas de centro/MueblesSalas';
import MesasExterior from './components/Menú/pages/Categorías/Muebles de Patio/Subcategorias/Mesas de Exterior/MesasExterior';
import SillasExterior from './components/Menú/pages/Categorías/Muebles de Patio/Subcategorias/SillasExterior/SillasExterior';
import Toldos from './components/Menú/pages/Categorías/Muebles de Patio/Subcategorias/Toldos/Toldos';
import Escritorios from './components/Menú/pages/Categorías/Muebles de Oficina/Subcategorias/Escritorios/Escritorios';
import Libreros from './components/Menú/pages/Categorías/Muebles de Oficina/Subcategorias/Libreros/Librero';
import SillasEstudio from './components/Menú/pages/Categorías/Muebles de Oficina/Subcategorias/Sillas de estudio/SillasEstudio';
import JuegoComedor from './components/Menú/pages/Categorías/Comedores/Subcategorias/Juegos de comedor/JuegosComedorProductos';
import MesasComedor from './components/Menú/pages/Categorías/Comedores/Subcategorias/Mesas/MesasProductos';
import SillasComedor from './components/Menú/pages/Categorías/Comedores/Subcategorias/Sillas/SillasProducto';
import Camas from './components/Menú/pages/Categorías/Dormitorios/Subcategorias/Camas/CamasProductos';
import ComodasConEspejo from './components/Menú/pages/Categorías/Dormitorios/Subcategorias/Comodas con espejo/ComodaEspejoProductos';
import MesasNoche from './components/Menú/pages/Categorías/Dormitorios/Subcategorias/Mesas de Noche/MesasNocheProducto';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppLayout />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

function AppLayout() {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const isAuthPage = ['/login', '/signup'].includes(location.pathname.toLowerCase());

  if (isAuthPage) {
    return (
      <div className="auth-layout">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />

          {/* Rutas protegidas de admin */}
          <Route path="/interfazadmin" element={
            <ProtectedRoute userType="admin">
              <InterfazAdmin />
            </ProtectedRoute>
          } />
          <Route path="/productoslist" element={
            <ProtectedRoute userType="admin">
              <ListaProductos />
            </ProtectedRoute>
          } />
          <Route path="/crearproducto" element={
            <ProtectedRoute userType="admin">
              <CrearProducto />
            </ProtectedRoute>
          } />
          <Route path="/actproducto" element={
            <ProtectedRoute userType="admin">
              <ActualizarProducto />
            </ProtectedRoute>
          } />

          {/* Rutas protegidas de cliente */}
          <Route path="/user" element={
            <ProtectedRoute userType="cliente">
              <User />
            </ProtectedRoute>
          } />
          <Route path="/carrito" element={
            <ProtectedRoute userType="cliente">
              <Cart />
            </ProtectedRoute>
          } />
          <Route path="/factura" element={
            <ProtectedRoute userType="cliente">
              <Factura />
            </ProtectedRoute>
          } />

          {/* Rutas de productos */}
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
      </main>
    </div>
  );
}

function ProtectedRoute({ userType, children }) {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" />;
  if (userType && user.type !== userType) return <Navigate to="/" />;
  return children;
}

export default App;