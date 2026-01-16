import zamorLogo from "../../Images/logo ZAMOR CAPSnoBG.png";

export default function Navbar({ menuOpen, catalogOpen, closeMenu, setMenuOpen, setCatalogOpen }) {
  return (
    <header className="navbar">
      <div className="nav-inner">
        <nav className="nav-wrap">
          <a
            href="#inicio"
            className="nav-home"
            aria-label="Inicio"
            onClick={closeMenu}
          >
            <img src={zamorLogo} alt="Zamor Caps" className="nav-home-logo" />
          </a>

          <button
            className="nav-toggle"
            type="button"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            onClick={() => {
              setMenuOpen((v) => {
                const next = !v;
                if (!next) setCatalogOpen(false);
                return next;
              });
            }}
          >
            {menuOpen ? "✕" : "☰"}
          </button>

          <ul className={`nav-menu ${menuOpen ? "is-open" : ""}`}>
            <li className="dropdown">
              <button
                className="nav-link-btn nav-catalog-btn"
                type="button"
                aria-expanded={catalogOpen}
                onClick={() => setCatalogOpen((v) => !v)}
              >
                CATÁLOGO{" "}
                <span className={`chev ${catalogOpen ? "up" : ""}`}>▾</span>
              </button>

              <ul className={`dropdown-menu ${catalogOpen ? "is-open" : ""}`}>
                <li>
                  <a href="#gorras" onClick={closeMenu}>
                    GORRAS
                  </a>
                </li>
                <li>
                  <a href="#bolsos" onClick={closeMenu}>
                    BOLSOS
                  </a>
                </li>
              </ul>
            </li>

            <li>
              <a href="#recomendaciones" onClick={closeMenu}>
                RECOMENDACIONES
              </a>
            </li>
            <li>
              <a href="#como-comprar" onClick={closeMenu}>
                CÓMO COMPRAR
              </a>
            </li>
            <li>
              <a href="#contacto" onClick={closeMenu}>
                CONTACTO
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
