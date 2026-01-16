import estilosGorras from "../../Images/estilosGorras.png";

export default function RecommendationsSection() {
  return (
    <section id="recomendaciones" className="section rec">
      <h2>RECOMENDACIONES</h2>
      <p className="rec-sub">Guía rápida para elegir tipo, talla y color.</p>

      <div className="rec-block">
        <h3>1) Elige tu tipo de gorra</h3>

        <div className="rec-cards">
          <article className="rec-card">
            <h4>Fitted (sellada)</h4>
            <p>
              <strong>Para quién:</strong> si quieres talla exacta.
            </p>
            <p>
              <strong>Ajuste:</strong> talla en cm (exacta).
            </p>
            <p className="tip">
              <strong>Tip:</strong> si estás entre dos tallas, sube 1.
            </p>
          </article>

          <article className="rec-card">
            <h4>Snapback</h4>
            <p>
              <strong>Para quién:</strong> si prefieres ajustar fácil.
            </p>
            <p>
              <strong>Ajuste:</strong> ajustable con broche.
            </p>
            <p className="tip">
              <strong>Tip:</strong> ideal si es regalo o duda de talla.
            </p>
          </article>

          <article className="rec-card">
            <h4>Strapback</h4>
            <p>
              <strong>Para quién:</strong> si buscas ajuste fino y cómodo.
            </p>
            <p>
              <strong>Ajuste:</strong> ajustable con correa.
            </p>
            <p className="tip">
              <strong>Tip:</strong> look más casual / diario.
            </p>
          </article>

          <article className="rec-card">
            <h4>Trucker</h4>
            <p>
              <strong>Para quién:</strong> si quieres frescura.
            </p>
            <p>
              <strong>Ajuste:</strong> normalmente ajustable.
            </p>
            <p className="tip">
              <strong>Tip:</strong> perfecta para calor y verano.
            </p>
          </article>
        </div>
      </div>

      <img
        src={estilosGorras}
        alt="Tipos de gorra (parte trasera)"
        className="cap-banner"
      />

      <div className="rec-block">
        <h3>2) ¿Qué talla soy?</h3>

        <div className="size-steps">
          <div className="size-step">
            <div className="badge">1</div>
            <p>
              <strong>Mide</strong> tu cabeza con cinta métrica (circunferencia en
              cm).
            </p>
          </div>

          <div className="size-step">
            <div className="badge">2</div>
            <p>
              <strong>Compara</strong> con rangos:
              <br />
              <span className="pill">56–57 cm</span>{" "}
              <span className="pill">58–59 cm</span>{" "}
              <span className="pill">60–61 cm</span>
            </p>
          </div>

          <div className="size-step">
            <div className="badge">3</div>
            <p>
              <strong>Si dudas:</strong> mejor ajustable (Snapback/Strapback).
              <br />
              <strong>En Fitted:</strong> si aprieta/molesta, sube talla.
            </p>
          </div>
        </div>
      </div>

      <div className="rec-block">
        <h3>3) Colores según tu estilo</h3>

        <div className="swatches">
          <div className="swatch">
            <span className="dot c-black"></span>
            <div>
              <strong>Negro</strong>
              <p>Combina con todo</p>
            </div>
          </div>

          <div className="swatch">
            <span className="dot c-red"></span>
            <div>
              <strong>Rojo</strong>
              <p>Destaca / outfit simple</p>
            </div>
          </div>

          <div className="swatch">
            <span className="dot c-white"></span>
            <div>
              <strong>Blanco</strong>
              <p>Fresco y limpio</p>
            </div>
          </div>

          <div className="swatch">
            <span className="dot c-beige"></span>
            <div>
              <strong>Beige</strong>
              <p>Estilo casual</p>
            </div>
          </div>

          <div className="swatch">
            <span className="dot c-navy"></span>
            <div>
              <strong>Azul marino</strong>
              <p>Más elegante</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rec-block">
        <h3>4) Recomendación rápida</h3>
        <p className="rec-mini">Elige una opción y te decimos la mejor.</p>

        <div className="quick">
          <button
            className="qbtn"
            onClick={() =>
              alert("Entonces te va mejor una Fitted (talla exacta en cm).")
            }
          >
            Quiero talla exacta
          </button>
          <button
            className="qbtn"
            onClick={() =>
              alert("Entonces te va mejor una Snapback o Strapback (ajustable).")
            }
          >
            Quiero ajustar
          </button>
          <button
            className="qbtn"
            onClick={() => alert("Entonces te va mejor una Trucker (más fresca).")}
          >
            Para calor
          </button>
          <button
            className="qbtn"
            onClick={() =>
              alert("Entonces te va mejor una Snapback (estilo urbano).")
            }
          >
            Outfit urbano
          </button>
        </div>
      </div>
    </section>
  );
}
