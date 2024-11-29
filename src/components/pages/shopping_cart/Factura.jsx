import React, { useEffect, useState } from 'react';  // Usar useState y useEffect para manejar el estado 
import { useParams } from 'react-router-dom';  // Importar useParams para obtener parámetros de la URL
import { jsPDF } from "jspdf";  // Importar la librería jsPDF para generar el PDF
import axios from 'axios';  // Importar axios para hacer solicitudes HTTP
import Cookies from 'js-cookie';  // Importar js-cookie para leer las cookies
import logo from './img/logo.png';  // Importar el logo de la empresa

function Factura() {
  const { invoiceId } = useParams();  // Obtener el invoiceId desde los parámetros de la URL
  const [factura, setFactura] = useState(null);  // Establecer el estado para almacenar los datos de la factura

  useEffect(() => {
    // Verificar si hay un token en las cookies
    const token = Cookies.get('token');
    if (!token) {
      // Si no hay token, redirigir al login (puedes usar react-router para redirigir)
      window.location.href = '/login';
      return;
    }

    // Asegurarse de que el invoiceId no sea nulo o vacío antes de hacer la solicitud
    if (invoiceId && invoiceId !== 'null') {
      const obtenerFactura = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/user-profile/checkout/${invoiceId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setFactura(response.data);  // Establecer los datos de la factura en el estado
        } catch (error) {
          console.error('Error al obtener la factura', error);
        }
      };

      obtenerFactura();  // Llamar a la función para obtener la factura
    } else {
      console.error("El ID de la factura no es válido.");
    }
  }, [invoiceId]);  // Dependencia en invoiceId

  // Si los datos de la factura aún no han llegado, mostrar un mensaje de carga
 

  // Función para generar el PDF de la factura
  function generarFacturaPDF() {
    if (!factura) return;  // Asegurarse de que los datos de la factura estén disponibles

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
    doc.text(`Factura número ${factura.id}`, 105, 40, null, null, 'center');  // Título centrado de la factura
    
    doc.setFontSize(12);  // Cambia el tamaño de fuente para la información del cliente
    doc.text('Cliente:', 10, 50);  // Etiqueta de "Cliente"

    // Agregar información de cliente ficticio (si no hay cliente en la API)
    const cliente = { nombre: 'Nombre Cliente', direccion: 'Dirección Cliente', telefono: 'Teléfono Cliente' };
    doc.text(cliente.nombre, 30, 60);  // Mostrar el nombre del cliente
    doc.text(`Dirección: ${cliente.direccion}`, 30, 70);  // Dirección del cliente
    doc.text(`Teléfono: ${cliente.telefono}`, 30, 80);  // Teléfono del cliente
    
    doc.text('Detalle', 10, 100);  // Título de la sección de detalles
    
    // Tabla de productos
    doc.text('Descripción', 10, 110);  // Columna de descripción
    doc.text('Cantidad', 100, 110);  // Columna de cantidad
    doc.text('Precio', 150, 110);  // Columna de precio
    
    factura.detailinvoices.forEach((producto, index) => {
      const yPosition = 120 + (index * 10);
      doc.text(`Producto ID: ${producto.product_id}`, 10, yPosition);  // Mostrar el ID del producto (puedes reemplazarlo con el nombre si tienes)
      doc.text(producto.quantity.toString(), 100, yPosition);  // Cantidad del producto
      doc.text(`$${producto.price}`, 150, yPosition);  // Precio del producto
    });

    doc.text(`Total: $${factura.total}`, 10, 150);  // Muestra el total de la compra

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
    <div id='principal' className="bg-no-repeat bg-right bg-cover h-screen p-4">  
      <div className="max-w-4xl mx-auto p-6 bg-white border-4 border-gray-300 rounded-lg shadow-xl font-sans">  
        <h1 className="text-center text-3xl font-bold text-black mb-4">Su factura</h1>  

        <div className="mb-6">
          <h2 className="text-xl font-semibold">Cliente:</h2>
          {/* Información del cliente ficticio */}
          <p>{'Nombre Cliente'}</p>
          <p>Dirección: {'Dirección Cliente'}</p>
          <p>Teléfono: {'Teléfono Cliente'}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold">Detalle</h2>

          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="border border-gray-700 p-3 text-left">Descripción</th>
                <th className="border border-gray-700 p-3 text-left">Cantidad</th>
                <th className="border border-gray-700 p-3 text-left">Precio</th>
              </tr>
            </thead>
            <tbody>
              {factura.detailinvoices.map((producto, index) => (
                <tr key={index}>
                  <td className="border border-gray-700 p-3">{`Producto ID: ${producto.product_id}`}</td>
                  <td className="border border-gray-700 p-3">{producto.quantity}</td>
                  <td className="border border-gray-700 p-3">${producto.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold">Total: ${factura.total}</h2>
        </div>

        <div className="flex justify-center items-center mb-6">
          <button 
            className="bg-[#381008] text-white px-6 py-3 rounded-md hover:bg-[#960500] mb-4"
            onClick={generarFacturaPDF}
          >
            Descargar Factura
          </button>
        </div>

      </div>

      <div className="text-center italic text-white font-extrabold text-3xl mt-6">
        <p>¡Gracias por su compra!</p>
      </div>
    </div>
  );
}

export default Factura;
