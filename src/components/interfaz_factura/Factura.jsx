import React, { useState } from 'react';  // Se importa React y el useState
import './Factura.css';  // Se importa el archivo de estilos CSS para la factura

function Factura() {  // Se define el componente funcional Factura
  return ( 
    <div id='principal'>  {/* Se crea el contenedor principal con id "principal" */}
      
      <div className="factura">  {/* Se crea un div con la clase CSS "factura" */}
        <h1>Su factura</h1>  {/* Título de la factura */}
        
        <div className="factura-info">  {/* Bloque de información del cliente */}
          <h2>Cliente:</h2>  {/* Subtítulo para la sección del cliente */}
          <p>Nombre del Cliente</p>  {/* Información del cliente */}
          <p>Dirección: Calle Ejemplo 123</p>  {/* Dirección del cliente */}
          <p>Teléfono: (123) 456-7890</p>  {/* Teléfono del cliente */}
        </div>
        
        <div className="factura-items">  {/* Bloque para los detalles de los productos */}
          <h2>Detalle</h2>  {/* Subtítulo para la sección de detalles */}
          
          <table>  {/* Tabla para listar los productos */}
            <thead>  {/* Encabezado de la tabla */}
              <tr>
                <th>Descripción</th>  {/* Columna para la descripción del producto */}
                <th>Cantidad</th>  {/* Columna para la cantidad del producto */}
                <th>Precio</th>  {/* Columna para el precio del producto */}
              </tr>
            </thead>
            <tbody>  {/* Cuerpo de la tabla con los productos */}
              <tr>
                <td>Producto 1</td>  {/* Primer producto */}
                <td>2</td>  {/* Cantidad del primer producto */}
                <td>$10.00</td>  {/* Precio del primer producto */}
              </tr>
              <tr>
                <td>Producto 2</td>  {/* Segundo producto */}
                <td>1</td>  {/* Cantidad del segundo producto */}
                <td>$15.00</td>  {/* Precio del segundo producto */}
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="factura-total">  {/* Sección para mostrar el total */}
          <h2>Total: $35.00</h2>  {/* Se muestra el total de la factura */}
        </div>
        
        <br />  {/* Salto de línea */}
        
        <div className="Buttoncontainer">  {/* Contenedor para los botones */}
          <button id="button">Descargar factura</button>  {/* Botón para descargar la factura */}
          <button id="inicio">Inicio</button>  {/* Botón para volver a la página de inicio */}
        </div>

      </div>
      
      <br />  {/* Salto de línea */}
      
      <div className="gracias">  {/* Bloque para el mensaje de agradecimiento */}
        <p>¡Gracias por su compra!</p>  {/* Mensaje de agradecimiento */}
      </div>

    </div>
  );
}

export default Factura;  // Se exporta el componente Factura
