//Importaciones y dependencias necesarias
import { useContext} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation} from 'react-router-dom';
import { AuthProvider, AuthContext } from './components/AuthContext';
import Login from './components/Login';
import SignUp from './components/SignUp';
import InterfazAdmin from './components/interfazadmin';
import MiPerfil from './components/pages/user/Profileuser';
import Nosotros from './components/pages/links/About';
import Contacto from './components/pages/links/Contact';
import Navbar from './components/Navbar';
import ListaProductos from './components/pages/admin_interface/ProductosList';
import CrearProducto from './components/pages/admin_interface/FormularioCrearProducto';
import ActualizarProducto from './components/pages/admin_interface/FormularioActualizarProd';
import Cart from './components/pages/shopping_cart/CartMenu';
import CartPay from './components/pages/shopping_cart/Payment_Method';
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
    // AuthProvider envuelve toda la aplicación para proporcionar autenticación a cualquier componente que lo necesite
    <AuthProvider> 
      {/* CartProvider proporciona el contexto del carrito de compras a toda la aplicación */}
      <CartProvider> 
        {/* Router maneja la navegación en la aplicación */}
        <Router>
          {/* MainRoutes contiene todas las rutas definidas para la aplicación */}
          <MainRoutes />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

function MainRoutes() { 
  // Extrae 'user' del contexto de autenticación utilizando useContext
  const { user } = useContext(AuthContext);

  // Obtiene la ubicación actual de la aplicación utilizando useLocation
  const location = useLocation();
 
  const noNavbarRoutes = ["/login", "/signup", "/interfazadmin", "/actproducto/:id", "/crearproducto", "/productoslist"];

  // Verifica si la ruta actual es una de las que no debe mostrar el Navbar
  const isNoNavbarRoute = noNavbarRoutes.includes(location.pathname)||location.pathname.includes("/actproducto/");

  // Mostrar el Navbar solo si no estamos en una ruta prohibida
  // Aseguramos que el Navbar siempre se muestre en cualquier ruta de productos, incluso si no hay usuario autenticado
  const publicRoutes = [
    "/productos/accesorios/relojes",
    "/productos/accesorios/lamparas",
    "/productos/accesorios/espejos",
    "/productos/salas/sofas",
    "/productos/salas/muebles-para-tv",
    "/productos/salas/mesas-de-centro",
    "/productos/muebles-de-patio/mesas-de-exterior",
    "/productos/muebles-de-patio/sillas-de-exterior",
    "/productos/muebles-de-patio/toldos",
    "/productos/muebles-de-oficina/escritorios",
    "/productos/muebles-de-oficina/libreros",
    "/productos/muebles-de-oficina/sillas-de-estudio",
    "/productos/comedores/juego-comedor",
    "/productos/comedores/mesas",
    "/productos/comedores/sillas",
    "/productos/dormitorios/camas",
    "/productos/dormitorios/comodas-con-espejo",
    "/productos/dormitorios/mesas-de-noche",
    "/nosotros",
    "/contacto",
    "/resultados-busqueda",
  ];

  const showNavbar = !isNoNavbarRoute || location.pathname.startsWith(publicRoutes);

  return (
    <>
      {/* Solo renderiza el Navbar si se debe mostrar */}
      {showNavbar && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            (() => {
              console.log("User en ruta inicial:", user); // Verificar que el valor de 'user' es correcto

              if (user === null) {
                return <Navigate to="/" replace />;
              } else if (user.type === 'admin') {
                return <Navigate to="/interfazadmin" replace />;
              } else {
                return <Navigate to="/user" replace />;
              }
            })()
          }
        />

        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/resultados-busqueda" element={<ResultadosBusqueda />} />

        {/* Rutas de productos agrupadas por categorías */}
        <Route path="/productos/accesorios/relojes" element={<Relojes />} />
        <Route path="/productos/accesorios/lamparas" element={<Lamparas />} />
        <Route path="/productos/accesorios/espejos" element={<Espejos />} />
        <Route path="/productos/salas/sofas" element={<Sofas />} />
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

        {/* Ruta independiente para InterfazAdmin sin Navbar */}
        <Route path="/interfazadmin" element={<ProtectedRoute userType="admin"><InterfazAdmin /></ProtectedRoute>} />

        {/* Rutas protegidas para administrador */}
        <Route path="/productoslist" element={<ProtectedRoute userType="admin"><ListaProductos /></ProtectedRoute>} />
        <Route path="/crearproducto" element={<ProtectedRoute userType="admin"><CrearProducto /></ProtectedRoute>} />
        <Route path="/actproducto/:id" element={<ProtectedRoute userType="admin"><ActualizarProducto /></ProtectedRoute>} />

        {/* Rutas protegidas para cliente */}
        <Route path="/*" element={<ProtectedRoute userType="client"><ClienteRoutes /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

// Definición de la función ProtectedRoute, que toma como argumentos las propiedades userType y children
function ProtectedRoute({ userType, children }) {
  
  // Uso del hook useContext para obtener el objeto user del contexto AuthContext
  const { user } = useContext(AuthContext);

  // Verifica si el usuario no está autenticado. Si no lo está, redirige a la página de login
  if (!user) return <Navigate to="/login" />;

  // Verifica si se ha especificado un tipo de usuario y si el tipo de usuario del usuario actual no coincide con el esperado. Si es así, redirige a la página de inicio
  if (userType && user.type !== userType) return <Navigate to="/" />;

  // Si el usuario está autenticado y el tipo de usuario coincide (si se especificó), renderiza los componentes hijos
  return children;
}

function ClienteRoutes() {
  return (
    <Routes>
      {/* Rutas de cliente */}
      <Route path="/perfil" element={<MiPerfil />} />
      <Route path="/carrito" element={<Cart />} />
      <Route path="/carrito-checkout" element={<CartPay />} />
      <Route path="/factura/:invoiceId" element={<Factura />} />
    </Routes>
  );
}

export default App;
