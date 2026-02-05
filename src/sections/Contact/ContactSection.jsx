import igIcon from "../../Images/instagram.png";
import ttIcon from "../../Images/tik-tok.png";
import waIcon from "../../Images/whatsapp.png";
import styles from "./ContactSection.module.css";

export default function ContactSection() {
  return (
    <section id="contacto" className="section">
      <h2>CONTACTO</h2>

      <div className={styles.contact}>
        <a
          className={styles.item}
          href="https://wa.me/573157270599?text=Hola%20Zamor%20Caps!%20Quiero%20hacer%20un%20pedido."
          target="_blank"
          rel="noreferrer"
        >
          <span className={styles.left}>
            <img src={waIcon} alt="WhatsApp" className={styles.icon} />
            <strong>WhatsApp</strong>
          </span>
          <span>+57 315 7270599</span>
        </a>

        <a
          className={styles.item}
          href="https://www.instagram.com/zamor_caps/"
          target="_blank"
          rel="noreferrer"
        >
          <span className={styles.left}>
            <img src={igIcon} alt="Instagram" className={styles.icon} />
            <strong>Instagram </strong>
          </span>
          <span>@zamor_caps</span>
        </a>

        <a
          className={styles.item}
          href="https://www.tiktok.com/@zamorcaps?_t=ZS-8yu2w6y8aDQ&_r=1&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGn1-sMVmLYmebG9T2ibcuM080osOsIXL4a730KTDarR3ERBU4SgRR9s2r13As_aem_J2kCtqCSJ8Cjt8GUkHZkmw"
          target="_blank"
          rel="noreferrer"
        >
          <span className={styles.left}>
            <img src={ttIcon} alt="TikTok" className={styles.icon} />
            <strong>TikTok </strong>
          </span>
          <span>@zamorcaps</span>
        </a>
      </div>
    </section>
  );
}
