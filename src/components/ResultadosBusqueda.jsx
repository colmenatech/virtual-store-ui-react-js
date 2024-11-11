import { useLocation, Link } from 'react-router-dom';

export default function ResultadosBusqueda() {
  const location = useLocation();
  const results = location.state?.results || [];

  return (
    <div className="container mx-auto px-4 py-8 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-dark">Resultados de Búsqueda</h2>
      {results.length > 0 ? (
        <ul className="space-y-2">
          {results.map((result, index) => (
            <li key={index} className="flex items-center space-x-2">
              <Link
                to={result.to}
                className="text-primario hover:text-acento hover:underline transition-colors duration-200"
              >
                {result.category} - {result.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No se encontraron resultados.</p>
      )}
    </div>
  );
}
