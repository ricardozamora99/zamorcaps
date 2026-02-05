import { useState } from "react";
import estilosGorras from "../../Images/estilosGorras.png";
import styles from "./RecommendationsSection.module.css";

export default function RecommendationsSection() {
  const [reco, setReco] = useState("");

  return (
    <section id="recomendaciones" className={`section ${styles.rec}`}>
      <h2>RECOMENDACIONES</h2>
      <p className={styles.sub}>Guía rápida para elegir tipo, talla y color.</p>

      <div className={styles.block}>
        <h3>1) Elige tu tipo de gorra</h3>

        <div className={styles.cards}>
          <article className={styles.card}>
            <h4>Fitted (sellada)</h4>
            <p>
              <strong>Para quién:</strong> si quieres talla exacta.
            </p>
            <p>
              <strong>Ajuste:</strong> talla en cm (exacta).
            </p>
            <p className={styles.tip}>
              <strong>Tip:</strong> si estás entre dos tallas, sube 1.
            </p>
          </article>

          <article className={styles.card}>
            <h4>Snapback</h4>
            <p>
              <strong>Para quién:</strong> si prefieres ajustar fácil.
            </p>
            <p>
              <strong>Ajuste:</strong> ajustable con broche.
            </p>
            <p className={styles.tip}>
              <strong>Tip:</strong> ideal si es regalo o duda de talla.
            </p>
          </article>

          <article className={styles.card}>
            <h4>Strapback</h4>
            <p>
              <strong>Para quién:</strong> si buscas ajuste fino y cómodo.
            </p>
            <p>
              <strong>Ajuste:</strong> ajustable con correa.
            </p>
            <p className={styles.tip}>
              <strong>Tip:</strong> look más casual / diario.
            </p>
          </article>

          <article className={styles.card}>
            <h4>Trucker</h4>
            <p>
              <strong>Para quién:</strong> si quieres frescura.
            </p>
            <p>
              <strong>Ajuste:</strong> normalmente ajustable.
            </p>
            <p className={styles.tip}>
              <strong>Tip:</strong> perfecta para calor y verano.
            </p>
          </article>
        </div>
      </div>

      <img
        src={estilosGorras}
        alt="Tipos de gorra (parte trasera)"
        className={styles.banner}
      />

      <div className={styles.block}>
        <h3>2) ¿Qué talla soy?</h3>

        <div className={styles.sizeSteps}>
          <div className={styles.sizeStep}>
            <div className={styles.badge}>1</div>
            <p>
              <strong>Mide</strong> tu cabeza con cinta métrica (circunferencia en
              cm).
            </p>
          </div>

          <div className={styles.sizeStep}>
            <div className={styles.badge}>2</div>
            <p>
              <strong>Compara</strong> con rangos:
              <br />
              <span className={styles.pill}>56–57 cm</span>{" "}
              <span className={styles.pill}>58–59 cm</span>{" "}
              <span className={styles.pill}>60–61 cm</span>
            </p>
          </div>

          <div className={styles.sizeStep}>
            <div className={styles.badge}>3</div>
            <p>
              <strong>Si dudas:</strong> mejor ajustable (Snapback/Strapback).
              <br />
              <strong>En Fitted:</strong> si aprieta/molesta, sube talla.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.block}>
        <h3>3) Colores según tu estilo</h3>

        <div className={styles.swatches}>
          <div className={styles.swatch}>
            <span className={`${styles.dot} ${styles.cBlack}`}></span>
            <div>
              <strong>Negro</strong>
              <p>Combina con todo</p>
            </div>
          </div>

          <div className={styles.swatch}>
            <span className={`${styles.dot} ${styles.cRed}`}></span>
            <div>
              <strong>Rojo</strong>
              <p>Destaca / outfit simple</p>
            </div>
          </div>

          <div className={styles.swatch}>
            <span className={`${styles.dot} ${styles.cWhite}`}></span>
            <div>
              <strong>Blanco</strong>
              <p>Fresco y limpio</p>
            </div>
          </div>

          <div className={styles.swatch}>
            <span className={`${styles.dot} ${styles.cBeige}`}></span>
            <div>
              <strong>Beige</strong>
              <p>Estilo casual</p>
            </div>
          </div>

          <div className={styles.swatch}>
            <span className={`${styles.dot} ${styles.cNavy}`}></span>
            <div>
              <strong>Azul marino</strong>
              <p>Más elegante</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.block}>
        <h3>4) Recomendación rápida</h3>
        <p className={styles.mini}>Elige una opción y te decimos la mejor.</p>

        <div className={styles.quick}>
          <button
            className={styles.qbtn}
            onClick={() => setReco("Entonces te va mejor una Fitted (talla exacta en cm).")}
          >
            Quiero talla exacta
          </button>

          <button
            className={styles.qbtn}
            onClick={() => setReco("Entonces te va mejor una Snapback o Strapback (ajustable).")}
          >
            Quiero ajustar
          </button>

          <button
            className={styles.qbtn}
            onClick={() => setReco("Entonces te va mejor una Trucker (más fresca).")}
          >
            Para calor
          </button>

          <button
            className={styles.qbtn}
            onClick={() => setReco("Entonces te va mejor una Snapback (estilo urbano).")}
          >
            Outfit urbano
          </button>
        </div>

        {reco && (
          <p className={styles.answer}>
            ✅ {reco}{" "}
            <button
              className={styles.clear}
              onClick={() => setReco("")}
              aria-label="Cerrar"
            >
              ×
            </button>
          </p>
        )}
      </div>
    </section>
  );
}
