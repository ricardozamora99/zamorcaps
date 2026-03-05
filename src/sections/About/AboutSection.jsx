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
            <p className={`${styles.cardText} ${styles.textLong}`}>
              Colecciones con estilo único: bordados, colores y detalles que se notan.
            </p>
            <p className={`${styles.cardText} ${styles.textShort}`}>
              Bordados y detalles que destacan.
            </p>
          </article>

          <article className={styles.card} role="listitem">
            <div className={styles.icon} aria-hidden="true">🧵</div>
            <h3 className={styles.cardTitle}>Calidad real</h3>
            <p className={`${styles.cardText} ${styles.textLong}`}>
              Materiales premium y acabados cuidados. Una gorra que dura y se siente bien.
            </p>
            <p className={`${styles.cardText} ${styles.textShort}`}>
              Material premium, dura más.
            </p>
          </article>

          <article className={styles.card} role="listitem">
            <div className={styles.icon} aria-hidden="true">⚡</div>
            <h3 className={styles.cardTitle}>Compra fácil</h3>
            <p className={`${styles.cardText} ${styles.textLong}`}>
              Pides por WhatsApp, confirmamos disponibilidad y coordinamos entrega/envío.
            </p>
            <p className={`${styles.cardText} ${styles.textShort}`}>
              Pide por WhatsApp, rápido.
            </p>
          </article>

          {/* ✅ NUEVA CARD */}
          <article className={styles.card} role="listitem">
            <div className={styles.icon} aria-hidden="true">🇨🇴</div>
            <h3 className={styles.cardTitle}>Envíos a Colombia</h3>
            <p className={`${styles.cardText} ${styles.textLong}`}>
              Enviamos a todo Colombia. Coordinamos el envío y te damos seguimiento del pedido.
            </p>
            <p className={`${styles.cardText} ${styles.textShort}`}>
              Envíos a todo el país.
            </p>
          </article>
        </div>

      </div>
    </section>
  );
}