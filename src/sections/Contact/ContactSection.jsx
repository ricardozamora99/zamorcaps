import igIcon from "../../Images/instagram.png";
import ttIcon from "../../Images/tik-tok.png";
import waIcon from "../../Images/whatsapp.png";

export default function ContactSection() {
  return (
    <section id="contacto" className="section">
      <h2>CONTACTO</h2>

      <div className="contact">
        <a
          className="contact-item"
          href="https://wa.me/573008725008?text=Hola%20Zamor%20Caps!%20Quiero%20hacer%20un%20pedido."
          target="_blank"
          rel="noreferrer"
        >
          <span className="contact-left">
            <img src={waIcon} alt="WhatsApp" className="contact-icon" />
            <strong>WhatsApp</strong>
          </span>
          <span>+57 300 8725008</span>
        </a>

        <a
          className="contact-item"
          href="https://www.instagram.com/zamor_caps/"
          target="_blank"
          rel="noreferrer"
        >
          <span className="contact-left">
            <img src={igIcon} alt="Instagram" className="contact-icon" />
            <strong>Instagram </strong>
          </span>
          <span>@zamor_caps</span>
        </a>

        <a
          className="contact-item"
          href="https://www.tiktok.com/@zamorcaps?_t=ZS-8yu2w6y8aDQ&_r=1&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGn1-sMVmLYmebG9T2ibcuM080osOsIXL4a730KTDarR3ERBU4SgRR9s2r13As_aem_J2kCtqCSJ8Cjt8GUkHZkmw"
          target="_blank"
          rel="noreferrer"
        >
          <span className="contact-left">
            <img src={ttIcon} alt="TikTok" className="contact-icon" />
            <strong>TikTok </strong>
          </span>
          <span>@zamorcaps</span>
        </a>
      </div>
    </section>
  );
}
