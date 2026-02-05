import gorraMain from "../../Images/gorraMain.png";
import styles from "./HeroSection.module.css";

export default function HeroSection({ closeMenu }) {
  return (
    <section id="inicio" className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          ESTILO <span className={styles.danger}>QUE QUEMA.</span>
          <br />
          CALIDAD QUE PERDURA.
        </h1>

        <p className={styles.subtitle}>
          Descubre la colección exclusiva de gorras con diseño premium hechas en
          Colombia.
        </p>

        <a
          href="https://drive.google.com/drive/folders/19QsZ9V0THpxjEcf9RHdYEYg8-zgPJx3h?usp=sharing"
          className={styles.btnPrimary}
          target="_blank"
          rel="noreferrer"
          onClick={closeMenu}
        >
          VER CATÁLOGO
        </a>
      </div>

      <div className={styles.visual}>
        <img
          src={gorraMain}
          className={styles.productImg}
          alt="Gorra Red Flame"
        />
        <div className={styles.blob} />
      </div>
    </section>
  );
}

