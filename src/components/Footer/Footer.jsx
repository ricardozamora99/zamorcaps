export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p>
          <strong>Zamor Caps</strong> — La información de tallas, tipos y colores
          es una guía orientativa. La disponibilidad puede variar según stock.
        </p>

        <p className="footer-small">
          © {new Date().getFullYear()} Zamor Caps. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
