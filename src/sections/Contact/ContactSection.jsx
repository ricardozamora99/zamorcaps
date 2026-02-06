import igIcon from "../../Images/instagram.png";
import ttIcon from "../../Images/tik-tok.png";
import waIcon from "../../Images/whatsapp.png";
import styles from "./ContactSection.module.css";

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;

const buildWaLink = (msg) => {
  const text = encodeURIComponent(msg);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
};

const WA_LINK = buildWaLink("Hola Zamor Caps! Quiero hacer un pedido.");

export default function ContactSection() {
  return (
    <section id="contacto" className={`section ${styles.contactSection}`}>
      <header className={styles.head}>
        <span className={styles.kicker}>Contacto</span>
        <h2 className={styles.title}>Hablemos</h2>
        <p className={styles.sub}>
          Respuesta rápida por WhatsApp. También nos encuentras en Instagram y TikTok.
        </p>
      </header>

      <div className={styles.grid}>
        {/* WhatsApp */}
        <a
          className={`${styles.card} ${styles.wa}`}
          href={WA_LINK}
          target="_blank"
          rel="noreferrer"
          aria-label="Abrir WhatsApp de Zamor Caps"
        >
          <div className={styles.cardTop}>
            <span className={styles.iconWrap}>
              <img src={waIcon} alt="WhatsApp" className={styles.icon} />
            </span>
            <span className={styles.badge}>Recomendado</span>
          </div>

          <div className={styles.cardBody}>
            <h3 className={styles.h3}>WhatsApp</h3>
            <p className={styles.p}>Pide disponibilidad, precio y coordina entrega.</p>
            <div className={styles.meta}>
              <span className={styles.handle}>+57 315 7270599</span>
              <span className={styles.arrow} aria-hidden="true">↗</span>
            </div>
          </div>
        </a>

        {/* Instagram */}
        <a
          className={`${styles.card} ${styles.ig}`}
          href="https://www.instagram.com/zamor_caps/"
          target="_blank"
          rel="noreferrer"
          aria-label="Abrir Instagram de Zamor Caps"
        >
          <div className={styles.cardTop}>
            <span className={styles.iconWrap}>
              <img src={igIcon} alt="Instagram" className={styles.icon} />
            </span>
            <span className={styles.badgeSoft}>Novedades</span>
          </div>

          <div className={styles.cardBody}>
            <h3 className={styles.h3}>Instagram</h3>
            <p className={styles.p}>Lanzamientos, fotos reales y nuevos drops.</p>
            <div className={styles.meta}>
              <span className={styles.handle}>@zamor_caps</span>
              <span className={styles.arrow} aria-hidden="true">↗</span>
            </div>
          </div>
        </a>

        {/* TikTok */}
        <a
          className={`${styles.card} ${styles.tt}`}
          href="https://www.tiktok.com/@zamorcaps"
          target="_blank"
          rel="noreferrer"
          aria-label="Abrir TikTok de Zamor Caps"
        >
          <div className={styles.cardTop}>
            <span className={styles.iconWrap}>
              <img src={ttIcon} alt="TikTok" className={styles.icon} />
            </span>
            <span className={styles.badgeSoft}>Videos</span>
          </div>

          <div className={styles.cardBody}>
            <h3 className={styles.h3}>TikTok</h3>
            <p className={styles.p}>Outfits, detalles y showcases de gorras.</p>
            <div className={styles.meta}>
              <span className={styles.handle}>@zamorcaps</span>
              <span className={styles.arrow} aria-hidden="true">↗</span>
            </div>
          </div>
        </a>
      </div>

      {/* Bottom CTA */}
      <div className={styles.strip}>
        <div className={styles.stripLeft}>
          <strong>¿Listo para pedir?</strong>
          <span>Envíanos tu carrito o el nombre del producto.</span>
        </div>

        <a className={styles.stripBtn} href={WA_LINK} target="_blank" rel="noreferrer">
          Abrir WhatsApp
        </a>
      </div>
    </section>
  );
}
