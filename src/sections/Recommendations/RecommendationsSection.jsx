import { useState } from "react";
import estilosGorras from "../../Images/estilosGorras.png";
import styles from "./RecommendationsSection.module.css";

export default function RecommendationsSection() {
  const [pick, setPick] = useState("");

  return (
    <section id="recomendaciones" className={`section ${styles.rec}`}>
      {/* ===== HERO / STATEMENT ===== */}
      <header className={styles.head}>
        <span className={styles.kicker}>Recomendaciones</span>
        <h2 className={styles.title}>
          Elige tu gorra <span>como un experto</span>
        </h2>
        <p className={styles.sub}>
          Ajuste, estilo y comodidad. Te guiamos para que elijas la gorra perfecta.
        </p>
      </header>

      {/* ===== TIPOS DE GORRA ===== */}
      <div className={styles.types} role="list">
        <article className={styles.typeCard} role="listitem">
          <h3>Fitted</h3>
          <p>Talla exacta, ajuste firme, look premium.</p>
          <span className={styles.tag}>Precisión</span>
        </article>

        <article className={styles.typeCard} role="listitem">
          <h3>Snapback</h3>
          <p>Ajustable, versátil y urbano.</p>
          <span className={styles.tag}>Versátil</span>
        </article>

        <article className={styles.typeCard} role="listitem">
          <h3>Strapback</h3>
          <p>Ajuste cómodo para uso diario.</p>
          <span className={styles.tag}>Confort</span>
        </article>

        <article className={styles.typeCard} role="listitem">
          <h3>Trucker</h3>
          <p>Más fresca, ideal para calor.</p>
          <span className={styles.tag}>Verano</span>
        </article>
      </div>

      {/* ===== GUIDE PANEL (TU IMAGEN) ===== */}
      <div className={styles.guide}>
        <div className={styles.guideText}>
          <h3 className={styles.guideTitle}>Guía visual rápida</h3>
          <p className={styles.guideSub}>
            Mira la parte trasera y el sistema de ajuste. Si es regalo o dudas de talla,
            lo ajustable siempre gana.
          </p>

          <div className={styles.guideBadges}>
            <span className={styles.badge}>Ajustable</span>
            <span className={styles.badge}>Talla exacta</span>
            <span className={styles.badge}>Comodidad</span>
          </div>
        </div>

        <figure className={styles.figure}>
          <img
            src={estilosGorras}
            alt="Guía de tipos de gorra (parte trasera y ajuste)"
            className={styles.banner}
            loading="lazy"
          />
          <figcaption className={styles.caption}>
            Tip: si buscas frescura, Trucker. Si quieres talla exacta, Fitted.
          </figcaption>
        </figure>
      </div>

      {/* ===== QUICK PICK ===== */}
      <div className={styles.pick}>
        <h3 className={styles.pickTitle}>¿Qué estás buscando?</h3>
        <p className={styles.pickSub}>Elige una opción y te recomendamos la mejor.</p>

        <div className={styles.actions}>
          <button onClick={() => setPick("Te recomendamos una Fitted: talla exacta y acabado premium.")}>
            Ajuste exacto
          </button>
          <button onClick={() => setPick("Snapback o Strapback: ajuste flexible y estilo urbano.")}>
            Ajustable
          </button>
          <button onClick={() => setPick("Trucker: más fresca, ideal para calor.")}>
            Clima cálido
          </button>
          <button onClick={() => setPick("Snapback: combina mejor con outfits urbanos.")}>
            Outfit urbano
          </button>
        </div>

        {pick && (
          <div className={styles.result} role="status" aria-live="polite">
            <span className={styles.check} aria-hidden="true">✔</span>
            <p className={styles.resultText}>{pick}</p>
            <button className={styles.close} onClick={() => setPick("")} aria-label="Cerrar">
              ×
            </button>
          </div>
        )}
      </div>

      {/* ===== CTA ===== */}
      <div className={styles.cta}>
        <p>
          ¿Aún con dudas? Te asesoramos directo por WhatsApp en minutos.
        </p>
        <a href="#contacto">Hablar con un asesor</a>
      </div>
    </section>
  );
}
