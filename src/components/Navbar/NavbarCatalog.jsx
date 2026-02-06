import zamorLogo from "../../Images/logo ZAMOR CAPSnoBG.png";
import styles from "./Navbar.module.css";

export default function NavbarCatalog({
  cartOpen,
  setCartOpen,
  cartCount,
}) {
  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        <nav className={styles.wrap}>
          <div className={styles.brand} aria-label="Zamor Caps">
            <img src={zamorLogo} alt="Zamor Caps" className={styles.logo} />
            <div className={styles.brandText}>
              <span className={styles.brandName}>Zamor Caps</span>
            </div>
          </div>

          <div className={styles.actions}>
            <button
              className={styles.cartBtn}
              type="button"
              aria-label="Abrir carrito"
              aria-expanded={cartOpen}
              onClick={() => setCartOpen((v) => !v)}
            >
              <span className={styles.cartIcon} aria-hidden="true">🛒</span>
              <span className={styles.cartText}>Carrito</span>
              <span className={styles.cartBadge} aria-label={`${cartCount} items`}>
                {cartCount}
              </span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
