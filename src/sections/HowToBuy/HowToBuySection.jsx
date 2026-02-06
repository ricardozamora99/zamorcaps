import styles from "./HowToBuySection.module.css";

const WA_LINK =
  "https://wa.me/573008725008?text=Hola%20Zamor%20Caps!%20Quiero%20hacer%20un%20pedido.";

export default function HowToBuySection() {
  return (
    <section id="como-comprar" className={`section ${styles.buy}`}>
      <header className={styles.head}>
        <span className={styles.kicker}>Proceso</span>
        <h2 className={styles.title}>Cómo comprar</h2>
        <p className={styles.sub}>
          Compra simple, rápida y sin enredos. En 3 pasos coordinamos tu pedido.
        </p>
      </header>

      <div className={styles.grid}>
        {/* STEP 1 */}
        <article className={styles.card}>
          <div className={styles.top}>
            <span className={styles.num}>01</span>
            <span className={styles.icon} aria-hidden="true">🧢</span>
          </div>

          <h3 className={styles.h3}>Elige tu producto</h3>

          <p className={styles.p}>
            Ve al catálogo, guarda tus favoritos en el carrito o copia el nombre del
            producto que te gustó.
          </p>

          <div className={styles.mini}>
            <span className={styles.pill}>Catálogo</span>
            <span className={styles.pill}>Carrito</span>
            <span className={styles.pill}>Favoritos</span>
          </div>

          <a className={styles.ctaGhost} href="#catalogo">
            Ver catálogo
          </a>

          <p className={styles.note}>
            Tip: si dudas entre dos, guarda ambos y lo decides por WhatsApp.
          </p>
        </article>

        {/* STEP 2 */}
        <article className={styles.card}>
          <div className={styles.top}>
            <span className={styles.num}>02</span>
            <span className={styles.icon} aria-hidden="true">💬</span>
          </div>

          <h3 className={styles.h3}>Escríbenos por WhatsApp</h3>

          <p className={styles.p}>
            Envíanos lo que quieres: <strong>modelo</strong>, <strong>color</strong> y{" "}
            <strong>cantidad</strong>. Te confirmamos precio y disponibilidad.
          </p>

          <div className={styles.mini}>
            <span className={styles.pill}>Modelo</span>
            <span className={styles.pill}>Color</span>
            <span className={styles.pill}>Cantidad</span>
          </div>

          <a className={styles.ctaWhats} href={WA_LINK} target="_blank" rel="noreferrer">
            Pedir por WhatsApp
          </a>

          <p className={styles.note}>
            Tip: si ya usaste el carrito, envíanos la lista completa.
          </p>
        </article>

        {/* STEP 3 */}
        <article className={styles.card}>
          <div className={styles.top}>
            <span className={styles.num}>03</span>
            <span className={styles.icon} aria-hidden="true">🚚</span>
          </div>

          <h3 className={styles.h3}>Confirmación y entrega</h3>

          <p className={styles.p}>
            Confirmamos disponibilidad y coordinamos el método de entrega/envío con
            tiempo estimado. ¡Listo!
          </p>

          <div className={styles.mini}>
            <span className={styles.pill}>Entrega</span>
            <span className={styles.pill}>Envío</span>
            <span className={styles.pill}>Confirmación</span>
          </div>

          <a className={styles.ctaGhost} href="#contacto">
            Ver contacto
          </a>

          <p className={styles.note}>
            Tip: si es para regalo, te ayudamos a escoger estilo y talla.
          </p>
        </article>
      </div>

      {/* Bottom strip CTA */}
      <div className={styles.strip}>
        <div className={styles.stripLeft}>
          <strong>¿Quieres que te asesoremos?</strong>
          <span>Te respondemos rápido y te ayudamos a elegir.</span>
        </div>

        <a className={styles.stripBtn} href={WA_LINK} target="_blank" rel="noreferrer">
          Hablar ahora
        </a>
      </div>
    </section>
  );
}
