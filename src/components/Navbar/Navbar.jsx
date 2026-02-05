import zamorLogo from "../../Images/logo ZAMOR CAPSnoBG.png";
import styles from "./Navbar.module.css";

export default function Navbar({
  menuOpen,
  catalogOpen,
  closeMenu,
  setMenuOpen,
  setCatalogOpen,
}) {
  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        <nav className={styles.wrap}>
          <a href="#inicio" className={styles.home} aria-label="Inicio" onClick={closeMenu}>
            <img src={zamorLogo} alt="Zamor Caps" className={styles.logo} />
          </a>

          <button
            className={styles.toggle}
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

          <ul className={`${styles.menu} ${menuOpen ? styles.menuOpen : ""}`}>
            <li
              className={`${styles.dropdown} ${catalogOpen ? styles.dropdownOpen : ""}`}
              onMouseLeave={() => {
                // opcional: en desktop, si sales del dropdown, lo cierra
                if (window.innerWidth > 900) setCatalogOpen(false);
              }}
            >
              <button
                className={styles.linkBtn}
                type="button"
                aria-expanded={catalogOpen}
                onClick={() => setCatalogOpen((v) => !v)}
              >
                CATÁLOGO{" "}
                <span className={`${styles.chev} ${catalogOpen ? styles.chevUp : ""}`}>
                  ▾
                </span>
              </button>

              <ul className={styles.dropdownMenu}>
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
              <a href="#recomendaciones" onClick={closeMenu}>RECOMENDACIONES</a>
            </li>

            <li>
              <a href="#como-comprar" onClick={closeMenu}>CÓMO COMPRAR</a>
            </li>

            <li>
              <a href="#contacto" onClick={closeMenu}>CONTACTO</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
