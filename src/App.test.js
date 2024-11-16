// Importa las funciones necesarias para las pruebas
import { render, screen } from '@testing-library/react';  // 'render' es para renderizar el componente, 'screen' es para acceder a los elementos renderizados
import App from './App';  // Importa el componente 'App' que será probado

// Define una prueba (test) que verifica el funcionamiento del componente
test('renders learn react link', () => {
  // Renderiza el componente 'App' dentro del DOM de prueba
  render(<App />);

  // Busca un elemento de texto que contenga "learn react" (ignorando mayúsculas/minúsculas)
  const linkElement = screen.getByText(/learn react/i);

  // Verifica que el elemento encontrado esté presente en el documento
  expect(linkElement).toBeInTheDocument();
});
