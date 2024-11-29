import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
      <footer className="footer" style={{ fontSize: '16px', padding: '50px', backgroundColor: '#eeebeb' }}>
        <div className="footer-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '50px' }}>
          {/* Información de contacto */}
          <div className="contact-info" style={{ textAlign: 'left' }}>
            <p><strong>Información de Contacto</strong></p>
            <p>Teléfono: +506 1234-5678</p>
            <p>Correo Electrónico: comfothaven@gmail.com</p>
            <p>Horario de Atención: Lunes a Viernes: 9am a 6pm</p>
          </div>
          
          {/* Enlace "Sobre Nosotros" */}
          <div style={{ textAlign: 'right' }}>
            <a href="/SobreNosotros" className="footer-link" style={{ marginBottom: '10px', display: 'block' }}>Sobre Nosotros</a>
          </div>
        </div>
  
        {/* Línea horizontal y derechos de autor */}
        <hr style={{ margin: '20px 0', borderTop: '1px solid #ccc' }} />
        <div style={{ textAlign: 'center', fontSize: '14px', color: '#555' }}>
          <p>Todos los derechos reservados © Comfort Haven 2024</p>
        </div>
      </footer>
    );
  };
  
  
  

export default Footer;