import React from 'react';  // Se importa React y el useState

function Factura() {  // Se define el componente funcional Factura
  return ( 
    <div id='principal' className="bg-no-repeat bg-right bg-cover h-screen">  {/* Contenedor principal */}
      
      <div className="max-w-xl bg-aliceblue mx-auto p-5 border-4 border-white rounded-lg shadow-md font-sans">  {/* Estilo de la factura */}
        <h1 className="text-center text-black">Su factura</h1>  {/* Título de la factura */}
        
        <div className="mb-5">  {/* Bloque de información del cliente */}
          <h2 className="text-lg font-semibold">Cliente:</h2>  {/* Subtítulo para la sección del cliente */}
          <p>Nombre del Cliente</p>  {/* Información del cliente */}
          <p>Dirección: Calle Ejemplo 123</p>  {/* Dirección del cliente */}
          <p>Teléfono: (123) 456-7890</p>  {/* Teléfono del cliente */}
        </div>
        
        <div className="mb-5">  {/* Bloque para los detalles de los productos */}
          <h2 className="text-lg font-semibold">Detalle</h2>  {/* Subtítulo para la sección de detalles */}
          
          <table className="w-full border-collapse">  {/* Tabla para listar los productos */}
            <thead>  {/* Encabezado de la tabla */}
              <tr>
                <th className="border border-gray-700 p-2">Descripción</th>  {/* Columna para la descripción del producto */}
                <th className="border border-gray-700 p-2">Cantidad</th>  {/* Columna para la cantidad del producto */}
                <th className="border border-gray-700 p-2">Precio</th>  {/* Columna para el precio del producto */}
              </tr>
            </thead>
            <tbody>  {/* Cuerpo de la tabla con los productos */}
              <tr>
                <td className="border border-gray-700 p-2">Producto 1</td>  {/* Primer producto */}
                <td className="border border-gray-700 p-2">2</td>  {/* Cantidad del primer producto */}
                <td className="border border-gray-700 p-2">$10.00</td>  {/* Precio del primer producto */}
              </tr>
              <tr>
                <td className="border border-gray-700 p-2">Producto 2</td>  {/* Segundo producto */}
                <td className="border border-gray-700 p-2">1</td>  {/* Cantidad del segundo producto */}
                <td className="border border-gray-700 p-2">$15.00</td>  {/* Precio del segundo producto */}
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mb-5">  {/* Sección para mostrar el total */}
          <h2 className="text-lg font-semibold">Total: $35.00</h2>  {/* Se muestra el total de la factura */}
        </div>
        
        <div className="flex justify-center items-center mb-5">  {/* Contenedor para los botones */}
          <button className="bg-[#381008] text-white px-4 py-2 rounded-md hover:bg-[#960500] mb-4">
            Descargar Factura
          </button>  {/* Botón para descargar la factura */}
        </div>

      </div>
      
      <div className="text-center italic text-white font-extrabold text-3xl my-5">  {/* Bloque para el mensaje de agradecimiento */}
        <p>¡Gracias por su compra!</p>  {/* Mensaje de agradecimiento */}
      </div>

    </div>
  );
}

export default Factura;  // Se exporta el componente Factura
