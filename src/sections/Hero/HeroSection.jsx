import gorraMain from "../../Images/gorraMain.png";
import styles from "./HeroSection.module.css";

export default function HeroSection({ closeMenu }) {
  return (
    <section id="inicio" className={styles.section}>
      <div className={styles.container}>
        {/* LEFT */}
        <div className={styles.content}>
          <p className={styles.kicker}>ZAMOR CAPS • GORRAS PREMIUM • COLOMBIA</p>

          <h1 className={styles.title}>
            <span className={styles.titleLine}>
              ESTILO <span className={styles.danger}>QUE QUEMA.</span>
            </span>
            <span className={styles.titleLine}>CALIDAD QUE PERDURA.</span>
          </h1>

          <p className={styles.subtitle}>
            Descubre la colección exclusiva de gorras con diseño premium hechas en Colombia.
          </p>

          <div className={styles.ctas}>
            <a
              href="https://drive.google.com/drive/folders/19QsZ9V0THpxjEcf9RHdYEYg8-zgPJx3h?usp=sharing"
              className={styles.btnPrimary}
              target="_blank"
              rel="noreferrer"
              onClick={closeMenu}
            >
              VER CATÁLOGO
            </a>

            <a href="#catalogo" className={styles.btnGhost} onClick={closeMenu}>
              Ver productos
            </a>
          </div>

          <div className={styles.trustRow}>
            <span className={styles.trustItem}>✓ Calidad premium</span>
            <span className={styles.trustItem}>✓ Envíos rápidos</span>
            <span className={styles.trustItem}>✓ Atención directa</span>
          </div>
        </div>

        {/* RIGHT */}
        <div className={styles.visual}>
          <img
            src={gorraMain}
            className={styles.productImg}
            alt="Gorra Red Flame"
            draggable="false"
          />
        </div>
      </div>
    </section>
  );
}
