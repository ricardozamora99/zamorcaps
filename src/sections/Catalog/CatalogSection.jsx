import CatalogSlider from "./CatalogSlider/CatalogSlider";
import zamorLogodf from "../../Images/logo ZAMOR CAPS.jpg";
import styles from "./CatalogSection.module.css";

// Images moved to: src/Images/ImagenesCapsZC/
import img01 from "../../Images/ImagenesCapsZC/01.png";
import img02 from "../../Images/ImagenesCapsZC/02.jpg";
import img03 from "../../Images/ImagenesCapsZC/03.jpg";
import img04 from "../../Images/ImagenesCapsZC/04.png";
import img05 from "../../Images/ImagenesCapsZC/05.png";
import img06 from "../../Images/ImagenesCapsZC/06.png";
import img07 from "../../Images/ImagenesCapsZC/07.png";
import img08 from "../../Images/ImagenesCapsZC/08.png";
import img09 from "../../Images/ImagenesCapsZC/09.png";

export default function CatalogSection() {
  const items1 = [
    { img: img01, name: "Gorra 1" },
    { img: img02, name: "Gorra 2" },
    { img: img03, name: "Gorra 3" },
    { img: img04, name: "Gorra 4" },
    { img: img05, name: "Gorra 5" },
    { img: img06, name: "Gorra 6" },
    { img: img07, name: "Gorra 7" },
    { img: img08, name: "Gorra 8" },
    { img: img09, name: "Gorra 9" },
  ];

  const items2 = [
    { img: zamorLogodf, name: "Bolso 1" },
    { img: zamorLogodf, name: "Bolso 2" },
    { img: zamorLogodf, name: "Bolso 3" },
    { img: zamorLogodf, name: "Bolso 4" },
    { img: zamorLogodf, name: "Bolso 5" },
    { img: zamorLogodf, name: "Bolso 6" },
  ];

  return (
    <section id="catalogo" className={styles.section}>
      <h2 className={styles.h2}>CATÁLOGO</h2>
      <p className={styles.sub}>Aqui puedes ver algunos de nuestros productos.</p>

      <h3 id="gorras" className={styles.title}>GORRAS</h3>
      <CatalogSlider items={items1} />

      <p className={styles.description}>
        Para ver el catálogo completo, haz clic en <strong>"VER CATÁLOGO"</strong>.
      </p>

      <h3 id="bolsos" className={styles.title}>BOLSOS</h3>
      <p className={styles.description}>Proximamente disponibles.</p>

      <CatalogSlider items={items2} />
    </section>
  );
}
