import React from 'react';
//import { Link } from 'react-router-dom'; // Importa el componente Link para navegación entre rutas

const SobreNosotros = () => {
  return (
    <div className="font-sans p-5">
      <header className="text-center bg-[#3d1e1e] p-5">
        <h1 className="text-white">Sobre Nosotros</h1>
      </header>

      <section className="mt-5 mb-5 p-5 bg-[#eeecec] rounded-lg text-center">
        <h2>Bienvenidos a Comfort Haven</h2>
        <p>
          En Comfort Haven, transformamos cada espacio en un refugio excepcional, gracias a muebles diseñados 
          para inspirar y realzar la esencia de un verdadero hogar. <br />
          Nos dedicamos a ofrecer productos y servicios de la más alta calidad, 
          ideales para quienes desean ir más allá de lo convencional: <br /> 
          buscan estilo, durabilidad y la profunda satisfacción de sentirse en casa.
        </p>
      </section>

      <section className="mt-5 mb-5 p-5 bg-[#eeecec] rounded-lg text-center">
        <h2>Misión</h2>
        <p>
          En Comfort Haven, nos dedicamos a transformar espacios en hogares mediante la provisión 
          de muebles de diseño excepcional, calidad y durabilidad. <br />
          Nuestro compromiso es ofrecer piezas que 
          no solo embellezcan los entornos, sino que también enriquezcan la vida de nuestros clientes, <br />
          contribuyendo a la creación de recuerdos duraderos en cada rincón.
        </p>
      </section>

      <section className="mt-5 mb-5 p-5 bg-[#eeecec] rounded-lg text-center">
        <h2>Visión</h2>
        <p>
          En Comfort Haven, queremos ser el destino favorito para quienes buscan muebles que mezclen estilo y calidad. <br />
          Nuestro objetivo es inspirar a nuestros clientes a crear espacios que 
          reflejen su esencia y vivan cada momento con elegancia y comodidad.
        </p>
      </section>

      <section className="mt-5 mb-5 p-5 bg-[#eeecec] rounded-lg text-center">
        <h2>Valores</h2>
        <ul className="list-none p-0">
          <li className="py-1">∙ Comodidad</li>
          <li className="py-1">∙ Excelencia</li>
          <li className="py-1">∙ Calidad</li>
          <li className="py-1">∙ Confianza</li>
          <li className="py-1">∙ Flexibilidad</li>
        </ul>
      </section>
    </div>
  );
};

export default SobreNosotros;
