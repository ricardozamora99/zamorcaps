import styles from "./AboutSection.module.css";

export default function AboutSection() {
  return (
    <section className={`section ${styles.about}`} id="about">
      <div className={styles.head}>
        <h2>Sobre Zamor Caps</h2>
        <p className={styles.sub}>
          Gorras premium hechas en Colombia. Diseños exclusivos, materiales de calidad y atención rápida por WhatsApp.
        </p>
      </div>

      <div className={styles.grid}>
        <article className={styles.card}>
          <div className={styles.icon}>🔥</div>
          <h3>Diseño que destaca</h3>
          <p>Colecciones con estilo único: bordados, colores y detalles que se notan.</p>
        </article>

        <article className={styles.card}>
          <div className={styles.icon}>🧵</div>
          <h3>Calidad real</h3>
          <p>Materiales premium y acabados cuidados. Una gorra que dura y se siente bien.</p>
        </article>

        <article className={styles.card}>
          <div className={styles.icon}>⚡</div>
          <h3>Compra fácil</h3>
          <p>Pides por WhatsApp, confirmamos disponibilidad y coordinamos entrega/envío.</p>
        </article>
      </div>

      <div className={styles.strip}>
        <div className={styles.stripLeft}>
          <strong>¿Buscas algo en particular?</strong>
          <span>Escríbenos y te asesoramos en minutos.</span>
        </div>

        <a className={styles.stripBtn} href="#contacto">
          Ir a contacto
        </a>
      </div>
    </section>
  );
}
