import styles from "./Footer.module.css";

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;

const buildWaLink = (msg) => {
  const text = encodeURIComponent(msg);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
};

const WA_LINK = buildWaLink("Hola Zamor Caps! Quiero hacer un pedido.");

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} aria-label="Footer">
      <div className={styles.inner}>
        {/* TOP ROW */}
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.title}>Zamor Caps</div>
            <div className={styles.sub}>
              Gorras premium · Envíos · Atención por WhatsApp
            </div>

            <div className={styles.trust}>
              <span className={styles.trustPill}>✓ Respuesta rápida</span>
              <span className={styles.trustPill}>✓ Envíos coordinados</span>
              <span className={styles.trustPill}>✓ Calidad premium</span>
            </div>
          </div>

          <nav className={styles.nav} aria-label="Navegación del footer">
            <a className={styles.link} href="#catalogo">Catálogo</a>
            <a className={styles.link} href="#recomendaciones">Recomendaciones</a>
            <a className={styles.link} href="#como-comprar">Cómo comprar</a>
            <a className={styles.link} href="#contacto">Contacto</a>
          </nav>
        </div>

        {/* GRID */}
        <div className={styles.grid}>
          {/* Nota */}
          <div className={styles.block}>
            <div className={styles.label}>Nota</div>
            <p className={styles.text}>
              La información de tallas, tipos y colores es una guía orientativa.
              La disponibilidad puede variar según stock.
            </p>
          </div>

          {/* Atención + CTA */}
          <div className={styles.block}>
            <div className={styles.label}>Atención</div>
            <p className={styles.text}>
              ¿Quieres cotizar o pedir una gorra? Escríbenos y te ayudamos en minutos.
            </p>

            <a
              className={styles.whatsBtn}
              href={WA_LINK}
              target="_blank"
              rel="noreferrer"
            >
              Escribir por WhatsApp
              <span className={styles.whatsArrow} aria-hidden="true">↗</span>
            </a>

            <div className={styles.miniNote}>
              Horario: respuesta rápida (según disponibilidad).
            </div>
          </div>

          {/* Créditos */}
          <div className={styles.block}>
            <div className={styles.label}>Créditos</div>

            <div className={styles.credits}>
              <span className={styles.creditsLabel}>Built by</span>
              <a
                className={styles.creditsLink}
                href="https://www.linkedin.com/in/ricardo-zamora-80b714193/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <span className={styles.creditsSep}>·</span>
              <a
                className={styles.creditsLink}
                href="https://github.com/ricardozamora99"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </div>

            <div className={styles.sep} />

            <div className={styles.microLinks}>
              <a className={styles.microLink} href="#catalogo">Productos</a>
              <span className={styles.dot}>•</span>
              <a className={styles.microLink} href="#contacto">Soporte</a>
              <span className={styles.dot}>•</span>
              <a className={styles.microLink} href="#como-comprar">Proceso</a>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className={styles.bottom}>
          <div className={styles.copy}>
            © {year} Zamor Caps. Todos los derechos reservados.
          </div>

          <div className={styles.disclaimer}>
            Sitio informativo. Colores, bordados y disponibilidad pueden variar.
          </div>
        </div>
      </div>
    </footer>
  );
}
