import { useParams } from "react-router-dom";

function ProductPage() {
  const { category, subcategory } = useParams();

  let Component;

  // En función de la categoría y subcategoría, importamos el componente adecuado
  if (category === "accesorios") {
    if (subcategory === "relojes") {
      Component = Relojes;
    } else if (subcategory === "lamparas") {
      Component = Lamparas;
    } else if (subcategory === "espejos") {
      Component = Espejos;
    }
  } else if (category === "salas") {
    if (subcategory === "sofas") {
      Component = Sofas;
    } else if (subcategory === "muebles-para-tv") {
      Component = MueblesTV;
    } else if (subcategory === "mesas-de-centro") {
      Component = MesasCentro;
    }
  } else if (category === "muebles-de-patio") {
    if (subcategory === "mesas-de-exterior") {
      Component = MesasExterior;
    } else if (subcategory === "sillas-de-exterior") {
      Component = SillasExterior;
    } else if (subcategory === "toldos") {
      Component = Toldos;
    }
  } else if (category === "muebles-de-oficina") {
    if (subcategory === "escritorios") {
      Component = Escritorios;
    } else if (subcategory === "libreros") {
      Component = Libreros;
    } else if (subcategory === "sillas-de-estudio") {
      Component = SillasEstudio;
    }
  } else if (category === "comedores") {
    if (subcategory === "juego-comedor") {
      Component = JuegoComedor;
    } else if (subcategory === "mesas") {
      Component = MesasComedor;
    } else if (subcategory === "sillas") {
      Component = SillasComedor;
    }
  } else if (category === "dormitorios") {
    if (subcategory === "camas") {
      Component = Camas;
    } else if (subcategory === "comodas-con-espejo") {
      Component = ComodasConEspejo;
    } else if (subcategory === "mesas-de-noche") {
      Component = MesasNoche;
    }
  }

  return Component ? <Component /> : <div>Subcategoría no encontrada</div>;
}

export default ProductPage;
