import React from 'react';  // Se importa React y el useState
import { jsPDF } from "jspdf";  // Importar la librería jsPDF para generar el PDF
import logo from './img/logo.png';  // Importar el logo de la empresa

function Factura() {  // Se define el componente funcional Factura

  // Función para generar la factura en PDF
  function generarFacturaPDF() {
    const doc = new jsPDF();

    // Agregar el logo de la empresa
    doc.addImage(logo, 'JPEG', 20, 10, 30, 30);  // Coloca el logo en la esquina superior izquierda

    // Información de la empresa en la parte superior
    doc.setFontSize(14);  // Establece el tamaño de fuente para el nombre de la empresa
    doc.text('Comfort Haven', 105, 10, null, null, 'center');  // Muestra el nombre de la empresa centrado en la parte superior
    doc.setFontSize(10);  // Cambia el tamaño de fuente para el teléfono y el correo electrónico
    doc.text('Teléfono: +506 1234-5678', 105, 15, null, null, 'center');  // Muestra el teléfono de la empresa
    doc.text('Email: comforthaven@gmail.com', 105, 20, null, null, 'center');  // Muestra el correo electrónico de la empresa
    
    // Información de la factura
    doc.setFontSize(16);  // Cambia el tamaño de fuente para el título de la factura
    doc.text('Factura número 123', 105, 40, null, null, 'center');  // Título centrado de la factura
    
    doc.setFontSize(12);  // Cambia el tamaño de fuente para la información del cliente
    doc.text('Cliente:', 10, 50);  // Etiqueta de "Cliente"
    doc.text('Nombre del Cliente', 30, 60);  // Muestra el nombre del cliente
    doc.text('Dirección: Calle Ejemplo 123', 30, 70);  // Dirección del cliente
    doc.text('Teléfono: (123) 456-7890', 30, 80);  // Teléfono del cliente
    
    doc.text('Detalle', 10, 100);  // Título de la sección de detalles
    
    // Tabla de productos
    doc.text('Descripción', 10, 110);  // Columna de descripción
    doc.text('Cantidad', 100, 110);  // Columna de cantidad
    doc.text('Precio', 150, 110);  // Columna de precio
    
    doc.text('Producto 1', 10, 120);  // Nombre del primer producto
    doc.text('2', 100, 120);  // Cantidad del primer producto
    doc.text('$10.00', 150, 120);  // Precio del primer producto

    doc.text('Producto 2', 10, 130);  // Nombre del segundo producto
    doc.text('1', 100, 130);  // Cantidad del segundo producto
    doc.text('$15.00', 150, 130);  // Precio del segundo producto

    doc.text('Total: $35.00', 10, 150);  // Muestra el total de la compra

    // Fecha y hora de la compra
    const fechaActual = new Date();  // Crea un objeto de fecha actual
    const fecha = fechaActual.toLocaleDateString();  // Convierte la fecha a una cadena legible
    const hora = fechaActual.toLocaleTimeString();  // Convierte la hora a una cadena legible
    doc.text(`Fecha de compra: ${fecha}`, 10, 170);  // Muestra la fecha de la compra
    doc.text(`Hora de compra: ${hora}`, 10, 180);  // Muestra la hora de la compra

    // Generar el PDF
    doc.save('factura.pdf');  // Guarda el archivo PDF con el nombre 'factura.pdf'
  }

  return ( 
    <div id='principal' className="bg-no-repeat bg-right bg-cover h-screen p-4">  {/* Contenedor principal */}    
      
      <div className="max-w-4xl mx-auto p-6 bg-white border-4 border-gray-300 rounded-lg shadow-xl font-sans">  {/* Estilo de la factura */}        
        <h1 className="text-center text-3xl font-bold text-black mb-4">Su factura</h1>  {/* Título de la factura */}
        
        <div className="mb-6">  {/* Bloque de información del cliente */}
          <h2 className="text-xl font-semibold">Cliente:</h2>  {/* Subtítulo para la sección del cliente */}
          <p>Nombre del Cliente</p>  {/* Información del cliente */}
          <p>Dirección: Calle Ejemplo 123</p>  {/* Dirección del cliente */}
          <p>Teléfono: (123) 456-7890</p>  {/* Teléfono del cliente */}
        </div>
        
        <div className="mb-6">  {/* Bloque para los detalles de los productos */}
          <h2 className="text-xl font-semibold">Detalle</h2>  {/* Subtítulo para la sección de detalles */}
          
          <table className="w-full border-collapse text-sm">  {/* Tabla para listar los productos */}
            <thead>  {/* Encabezado de la tabla */}
              <tr>
                <th className="border border-gray-700 p-3 text-left">Descripción</th>  {/* Columna para la descripción del producto */}
                <th className="border border-gray-700 p-3 text-left">Cantidad</th>  {/* Columna para la cantidad del producto */}
                <th className="border border-gray-700 p-3 text-left">Precio</th>  {/* Columna para el precio del producto */}
              </tr>
            </thead>
            <tbody>  {/* Cuerpo de la tabla con los productos */}
              <tr>
                <td className="border border-gray-700 p-3">Producto 1</td>  {/* Primer producto */}
                <td className="border border-gray-700 p-3">2</td>  {/* Cantidad del primer producto */}
                <td className="border border-gray-700 p-3">$10.00</td>  {/* Precio del primer producto */}
              </tr>
              <tr>
                <td className="border border-gray-700 p-3">Producto 2</td>  {/* Segundo producto */}
                <td className="border border-gray-700 p-3">1</td>  {/* Cantidad del segundo producto */}
                <td className="border border-gray-700 p-3">$15.00</td>  {/* Precio del segundo producto */}
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mb-6">  {/* Sección para mostrar el total */}
          <h2 className="text-xl font-semibold">Total: $35.00</h2>  {/* Se muestra el total de la factura */}
        </div>
        
        <div className="flex justify-center items-center mb-6">  {/* Contenedor para los botones */}
          <button 
            className="bg-[#381008] text-white px-6 py-3 rounded-md hover:bg-[#960500] mb-4"
            onClick={generarFacturaPDF}
          >
            Descargar Factura
          </button>  {/* Botón para descargar la factura */}
        </div>

      </div>
      
      <div className="text-center italic text-white font-extrabold text-3xl mt-6">  {/* Bloque para el mensaje de agradecimiento */}
        <p>¡Gracias por su compra!</p>  {/* Mensaje de agradecimiento */}
      </div>

    </div>
  );
}

export default Factura;  // Se exporta el componente Factura
