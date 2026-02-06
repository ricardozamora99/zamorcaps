import styles from "./AboutSection.module.css";

export default function AboutSection() {
  return (
    <section
      className={`section ${styles.about}`}
      id="about"
      aria-labelledby="about-title"
    >
      <div className={styles.inner}>
        <header className={styles.head}>
          <p className={styles.kicker}>Zamor Caps</p>

          <h2 id="about-title" className={styles.title}>
            Gorras premium hechas en Colombia
          </h2>

          <p className={styles.sub}>
            Diseños exclusivos, materiales de calidad y atención rápida por WhatsApp.
            Compra simple, respuesta rápida y entregas coordinadas.
          </p>
        </header>

        <div className={styles.grid} role="list">
          <article className={styles.card} role="listitem">
            <div className={styles.icon} aria-hidden="true">🔥</div>
            <h3 className={styles.cardTitle}>Diseño que destaca</h3>
            <p className={styles.cardText}>
              Colecciones con estilo único: bordados, colores y detalles que se notan.
            </p>
          </article>

          <article className={styles.card} role="listitem">
            <div className={styles.icon} aria-hidden="true">🧵</div>
            <h3 className={styles.cardTitle}>Calidad real</h3>
            <p className={styles.cardText}>
              Materiales premium y acabados cuidados. Una gorra que dura y se siente bien.
            </p>
          </article>

          <article className={styles.card} role="listitem">
            <div className={styles.icon} aria-hidden="true">⚡</div>
            <h3 className={styles.cardTitle}>Compra fácil</h3>
            <p className={styles.cardText}>
              Pides por WhatsApp, confirmamos disponibilidad y coordinamos entrega/envío.
            </p>
          </article>
        </div>

        <aside className={styles.strip} aria-label="Asesoría rápida">
          <div className={styles.stripLeft}>
            <p className={styles.stripTitle}>¿Buscas algo en particular?</p>
            <p className={styles.stripSub}>Escríbenos y te asesoramos en minutos.</p>
          </div>

          <a className={styles.stripBtn} href="#contacto">
            Ir a contacto
            <span className={styles.btnArrow} aria-hidden="true">→</span>
          </a>
        </aside>
      </div>
    </section>
  );
}
