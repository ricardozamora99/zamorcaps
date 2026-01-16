export default function HowToBuySection() {
  return (
    <section id="como-comprar" className="section">
      <h2>CÓMO COMPRAR</h2>

      <ol className="steps">
        <li className="step">
          <h3>1) Elige tu producto</h3>
          <p>Ve al catálogo y selecciona la gorra o bolso que te guste.</p>
        </li>

        <li className="step">
          <h3>2) Escríbenos por WhatsApp</h3>
          <p>Envíanos la referencia del producto, color y cantidad.</p>
          <a
            className="btn-link"
            href="https://wa.me/573008725008?text=Hola%20Zamor%20Caps!%20Quiero%20hacer%20un%20pedido."
            target="_blank"
            rel="noreferrer"
          >
            Pedir por WhatsApp
          </a>
        </li>

        <li className="step">
          <h3>3) Confirmación y entrega</h3>
          <p>Confirmamos disponibilidad, precio y entrega/envío. ¡Listo!</p>
        </li>
      </ol>
    </section>
  );
}
