import React, { useState } from 'react'; // Correcta importación de useState
import './Factura.css'; // Archivo de estilos CSS para la factura
import { jsPDF } from "jspdf"; // Librería jsPDF para generar el PDF
import logo from './imagenes/logo.jpg'; // Logo de la empresa

function Factura() {
  // Estado para manejar el carrito
  const [cart, setCart] = useState([
    { nombre: 'Producto 1', quantity: 2, precio: 5000 },
    { nombre: 'Producto 2', quantity: 1, precio: 8000 },
  ]);

  // Función para generar la factura en PDF
  function generarFacturaPDF() {
    const doc = new jsPDF();

    // Agregar el logo de la empresa
    doc.addImage(logo, 'JPEG', 20, 10, 30, 30);

    // Información de la empresa
    doc.setFontSize(14);
    doc.text('Comfort Haven', 105, 10, null, null, 'center');
    doc.setFontSize(10);
    doc.text('Teléfono: +506 1234-5678', 105, 15, null, null, 'center');
    doc.text('Email: comforthaven@gmail.com', 105, 20, null, null, 'center');

    // Información de la factura
    doc.setFontSize(16);
    doc.text('Factura número 123', 105, 40, null, null, 'center');

    doc.setFontSize(12);
    doc.text('Cliente:', 10, 50);
    doc.text('Nombre del Cliente', 30, 60);
    doc.text('Dirección: Calle Ejemplo 123', 30, 70);
    doc.text('Teléfono: (123) 456-7890', 30, 80);

    // Tabla de productos
    doc.text('Detalle', 10, 100);
    doc.text('Descripción', 10, 110);
    doc.text('Cantidad', 100, 110);
    doc.text('Precio', 150, 110);

    cart.forEach((item, index) => {
      const yPosition = 120 + index * 10;
      doc.text(item.nombre, 10, yPosition);
      doc.text(`${item.quantity}`, 100, yPosition);
      doc.text(`₡${item.precio}`, 150, yPosition);
    });

    // Total dinámico
    const totalPrice = cart.reduce((acc, item) => acc + item.precio * item.quantity, 0);
    doc.text(`Total: ₡${totalPrice}`, 10, 150 + cart.length * 10);

    // Salto de línea antes de la fecha y hora
    const totalYPosition = 160 + cart.length * 10;

    // Fecha y hora de la compra
    const fechaActual = new Date();
    const fecha = fechaActual.toLocaleDateString();
    const hora = fechaActual.toLocaleTimeString();
    doc.text(`Fecha de compra: ${fecha}`, 10, totalYPosition + 10);
    doc.text(`Hora de compra: ${hora}`, 10, totalYPosition + 20);

    // Generar el PDF
    doc.save('factura.pdf');
  }

  return (
    <div id='principal'>
      <div className="factura">
        <h1>Factura número 123</h1>
        <div className="factura-info">
          <h2>Cliente:</h2>
          <p>Nombre del Cliente</p>
          <p>Dirección: Calle Ejemplo 123</p>
          <p>Teléfono: (123) 456-7890</p>
        </div>
        <div className="factura-items">
          <h2>Detalle</h2>
          <table>
            <thead>
              <tr>
                <th>Descripción</th>
                <th>Cantidad</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>{item.nombre}</td>
                  <td>{item.quantity}</td>
                  <td>₡{item.precio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="factura-total">
          <h2>Total: ₡{cart.reduce((acc, item) => acc + item.precio * item.quantity, 0)}</h2>
        </div>

        <div className="Buttoncontainer">
          <button id="button" onClick={generarFacturaPDF}>
            Descargar factura
          </button>
          <button id="inicio">Inicio</button>
        </div>
      </div>

      <div className="gracias">
        <p>¡Gracias por su compra!</p>
      </div>
    </div>
  );
}

export default Factura;