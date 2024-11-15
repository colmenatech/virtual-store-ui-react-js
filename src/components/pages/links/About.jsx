import React from 'react';
//import { Link } from 'react-router-dom'; // Importa el componente Link para navegación entre rutas

const SobreNosotros = () => {
  return (
    <div className="font-sans p-5">
      <header className="text-center bg-[#3d1e1e] p-5">
        <h1 className="text-white text-xl">Sobre Nosotros</h1>
      </header>

      <section className="mt-5 mb-5 p-5 bg-[#eeecec] rounded-lg text-center">
        <h2 className='font-bold text-xl'>Bienvenidos a Comfort Haven</h2>
        <p>
          En Comfort Haven, transformamos cada espacio en un refugio excepcional, gracias a muebles diseñados 
          para inspirar y realzar la esencia de un verdadero hogar. <br />
          Nos dedicamos a ofrecer productos y servicios de la más alta calidad, 
          ideales para quienes desean ir más allá de lo convencional: <br /> 
          buscan estilo, durabilidad y la profunda satisfacción de sentirse en casa.
        </p>
      </section>

    
      <section className="mt-5 mb-5 p-5 bg-[#eeecec] rounded-lg text-center">
      <h2 className='font-bold text-xl'>Fundación de Comfort Haven</h2>
        <p> Comfort Haven nació en 2024 con una visión clara: llenar un vacío en el mercado de muebles y decoración al ofrecer un lugar donde<br /> las personas  pudieran encontrar opciones que combinaran calidad accesible con estilo y funcionalidad.<br />
          Desde sus primeros días, la tienda ha buscado no solo proporcionar muebles, sino también experiencias que ayuden a transformar hogares en espacios acogedores, reflejando las personalidades y necesidades de sus clientes. Inspirados por la idea de crear un verdadero refugio en casa, sus fundadores se centraron en investigar materiales sostenibles y métodos de producción éticos, garantizando que cada pieza fuera duradera y respetuosa con el medio ambiente.<br />
          Comfort Haven desarrolló una línea de productos que abarca desde muebles elegantes y modernos hasta accesorios decorativos únicos.
          La tienda comenzó con una selección limitada de productos y fue expandiendo su catálogo a medida que los clientes respondían positivamente, buscando piezas prácticas y duraderas.<br />
          A lo largo del 2024, Comfort Haven se ha ido adaptando a nuevas tendencias y necesidades, manteniendo su compromiso de ofrecer productos de diseño atractivo y funcional. Hoy en día, la tienda sigue creciendo, con la misión de seguir ofreciendo lo mejor para sus clientes, siempre enfocada en la comodidad, la calidad y un servicio excepcional que convierte cada hogar en un lugar especial.
        </p>

      </section>
      <section className="mt-5 mb-5 p-5 bg-[#eeecec] rounded-lg text-center">
        <h2 className='font-bold text-xl'>Misión</h2>
        <p>
          En Comfort Haven, nos dedicamos a transformar espacios en hogares mediante la provisión 
          de muebles de diseño excepcional, calidad y durabilidad. <br />
          Nuestro compromiso es ofrecer piezas que 
          no solo embellezcan los entornos, sino que también enriquezcan la vida de nuestros clientes, <br />
          contribuyendo a la creación de recuerdos duraderos en cada rincón.
        </p>
      </section>
      <section className="mt-5 mb-5 p-5 bg-[#eeecec] rounded-lg text-center">
        <h2 className='font-bold text-xl'>Visión</h2>
        <p>En Comfort Haven, queremos ser el destino favorito para quienes buscan muebles que mezclen estilo y calidad. <br />
            Nuestro objetivo es inspirar a nuestros clientes a crear espacios que 
            reflejen su esencia y vivan cada momento con elegancia y comodidad.
        </p>
      </section>

      <section className="mt-5 mb-5 p-5 bg-[#eeecec] rounded-lg text-center">
        <h2 className='font-bold text-xl'>Valores</h2>
        <ul className="list-none p-0">
          <li className="py-1">∙ Comodidad</li>
          <li className="py-1">∙ Excelencia</li>
          <li className="py-1">∙ Calidad</li>
          <li className="py-1">∙ Confianza</li>
          <li className="py-1">∙ Flexibilidad</li>
        </ul>
      </section>

      <section className="NuestroEquipo" style={{ textAlign: 'center', backgroundColor: '#eeebeb' }}>
  <h2 className='font-bold text-xl'style={{ marginBottom: '20px' }}>Nuestro Equipo</h2> {/* Añadir margen al título */}
  <div style={{ display: 'flex', justifyContent: 'center', gap: '100px' }}>
      
    {/* Front-end Team */}
    <ul style={{ listStyleType: 'none', padding: '0', margin: '0' }}>
      <h5 style={{ marginBottom: '10px' }}>Front-end</h5> {/* Añadir margen al subtítulo */}
      <li>Valery</li>
      <li>Allison</li>
      <li>Johayling</li>
      <li>Konny</li>
      <li>Esteban</li>
    </ul>

    {/* Back-end Team */}
    <ul style={{ listStyleType: 'none', padding: '0', margin: '0' }}>
      <h5 style={{ marginBottom: '10px' }}>Back-end</h5> {/* Añadir margen al subtítulo */}
      <li>Veronica</li>
      <li>Lucia</li>
      <li>Bianca</li>
      <li>Danna</li>
    </ul>
  </div>
</section>

    </div>
  );
};

export default SobreNosotros;
