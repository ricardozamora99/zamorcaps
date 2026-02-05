import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* top row */}
        <div className={styles.top}>
          <div>
            <div className={styles.title}>Zamor Caps</div>
            <div className={styles.sub}>
              Gorras personalizadas · Envíos · Atención por WhatsApp
            </div>
          </div>

          <nav className={styles.nav} aria-label="Footer">
            <a className={styles.link} href="#catalogo">Catálogo</a>
            <a className={styles.link} href="#como-comprar">Cómo comprar</a>
            <a className={styles.link} href="#contacto">Contacto</a>
          </nav>
        </div>

        {/* middle grid */}
        <div className={styles.grid}>
          <div className={styles.block}>
            <div className={styles.label}>Nota</div>
            <p className={styles.text}>
              La información de tallas, tipos y colores es una guía orientativa.
              La disponibilidad puede variar según stock.
            </p>
          </div>

          <div className={styles.block}>
            <div className={styles.label}>Atención</div>
            <p className={styles.text}>
              ¿Quieres cotizar o pedir una gorra? Escríbenos y te ayudamos en minutos.
            </p>
          </div>

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
          </div>
        </div>

        {/* bottom row */}
        <div className={styles.bottom}>
          <div className={styles.copy}>
            © {year} Zamor Caps. Todos los derechos reservados.
          </div>

          <div className={styles.disclaimer}>
            Sitio informativo. Colores y disponibilidad pueden variar.
          </div>
        </div>
      </div>
    </footer>
  );
}
