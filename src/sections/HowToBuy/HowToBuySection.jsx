import { useMemo, useState } from "react";
import styles from "./HowToBuySection.module.css";

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;

const buildWaLink = (msg) => {
  const text = encodeURIComponent(msg);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
};

export default function HowToBuySection() {
  const WA_LINK = useMemo(
    () => buildWaLink("Hola Zamor Caps! Quiero hacer un pedido."),
    []
  );

  const [open, setOpen] = useState(1); // 1|2|3  (por defecto abre el 01)
  const toggle = (id) => setOpen((prev) => (prev === id ? 0 : id));

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
        <article className={`${styles.card} ${open === 1 ? styles.open : ""}`}>
          <button
            type="button"
            className={styles.summary}
            onClick={() => toggle(1)}
            aria-expanded={open === 1}
          >
            <div className={styles.summaryLeft}>
              <span className={styles.num}>01</span>
              <h3 className={styles.h3}>Elige tu producto</h3>
            </div>
            <span className={styles.icon} aria-hidden="true">🧢</span>
          </button>

          <div className={styles.details} data-open={open === 1 ? "1" : "0"}>
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
          </div>
        </article>

        {/* STEP 2 */}
        <article className={`${styles.card} ${open === 2 ? styles.open : ""}`}>
          <button
            type="button"
            className={styles.summary}
            onClick={() => toggle(2)}
            aria-expanded={open === 2}
          >
            <div className={styles.summaryLeft}>
              <span className={styles.num}>02</span>
              <h3 className={styles.h3}>Escríbenos por WhatsApp</h3>
            </div>
            <span className={styles.icon} aria-hidden="true">💬</span>
          </button>

          <div className={styles.details} data-open={open === 2 ? "1" : "0"}>
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
          </div>
        </article>

        {/* STEP 3 */}
        <article className={`${styles.card} ${open === 3 ? styles.open : ""}`}>
          <button
            type="button"
            className={styles.summary}
            onClick={() => toggle(3)}
            aria-expanded={open === 3}
          >
            <div className={styles.summaryLeft}>
              <span className={styles.num}>03</span>
              <h3 className={styles.h3}>Confirmación y entrega</h3>
            </div>
            <span className={styles.icon} aria-hidden="true">🚚</span>
          </button>

          <div className={styles.details} data-open={open === 3 ? "1" : "0"}>
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
          </div>
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