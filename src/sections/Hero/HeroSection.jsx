import { useNavigate } from "react-router-dom";
import gorraMain from "../../Images/gorraMain.png";
import styles from "./HeroSection.module.css";

export default function HeroSection({ closeMenu }) {
  const navigate = useNavigate();

  return (
    <section id="inicio" className={styles.section}>
      <div className={styles.container}>
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
            <button
              type="button"
              className={styles.btnPrimary}
              onClick={() => {
                closeMenu?.();
                navigate("/catalogo");
              }}
            >
              VER CATÁLOGO
            </button>

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
