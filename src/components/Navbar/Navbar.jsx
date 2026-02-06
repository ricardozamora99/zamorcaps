import { useEffect, useRef, useState } from "react";
import zamorLogo from "../../Images/logo ZAMOR CAPSnoBG.png";
import styles from "./Navbar.module.css";


export default function Navbar({
  menuOpen,
  catalogOpen,
  closeMenu,
  setMenuOpen,
  setCatalogOpen,

  // NUEVO: carrito global
  cartOpen,
  setCartOpen,
  cartItems,
  cartCount,
  setQty,
  removeFromCart,
  buildWhatsAppUrl,
  closeAll,
}) {
  const closeTimerRef = useRef(null);

  const openCatalog = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setCatalogOpen(true);
  };

  const scheduleCloseCatalog = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => setCatalogOpen(false), 200); // 1 second
  };

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);



  // Close cart when resizing to desktop if you want
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900) {
        setCartOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);



  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        <nav className={styles.wrap}>
          {/* LEFT: Brand */}
          <a
            href="#inicio"
            className={styles.brand}
            aria-label="Inicio"
            onClick={closeAll}
          >
            <img src={zamorLogo} alt="Zamor Caps" className={styles.logo} />
            <div className={styles.brandText}>
              <span className={styles.brandName}>Zamor Caps</span>
              <span className={styles.brandTag}>Gorras premium • Colombia</span>
            </div>
          </a>

          {/* RIGHT: Actions */}
          <div className={styles.actions}>
            {/* Desktop links */}
            <ul className={styles.menu}>
              <li
                className={`${styles.dropdown} ${catalogOpen ? styles.dropdownOpen : ""}`}
                onMouseEnter={() => {
                  if (window.innerWidth > 900) openCatalog();
                }}
                onMouseLeave={() => {
                  if (window.innerWidth > 900) scheduleCloseCatalog();
                }}
              >
                {/* CLICK goes to #catalogo */}
                <a
                  href="#catalogo"
                  className={styles.catalogLink}
                  onClick={(e) => {
                    // close other UI (mobile menu/cart) but DO NOT prevent scroll
                    setCartOpen(false);
                    closeMenu();
                    setCatalogOpen(false);
                  }}
                >
                  Catálogo
                  <span className={`${styles.chev} ${catalogOpen ? styles.chevUp : ""}`}>▾</span>
                </a>

                {/* Dropdown stays open while hovering it */}
                <ul
                  className={styles.dropdownMenu}
                  onMouseEnter={() => {
                    if (window.innerWidth > 900) openCatalog();
                  }}
                  onMouseLeave={() => {
                    if (window.innerWidth > 900) scheduleCloseCatalog();
                  }}
                >
                  <li>
                    <a href="#gorras" onClick={closeAll}>Gorras</a>
                  </li>
                  <li>
                    <a href="#bolsos" onClick={closeAll}>Bolsos</a>
                  </li>
                </ul>
              </li>


              <li>
                <a href="#recomendaciones" onClick={closeAll}>
                  Recomendaciones
                </a>
              </li>
              <li>
                <a href="#como-comprar" onClick={closeAll}>
                  Cómo comprar
                </a>
              </li>
              <li>
                <a href="#contacto" onClick={closeAll}>
                  Contacto
                </a>
              </li>
            </ul>

            {/* Cart button (works on desktop + mobile) */}
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

            {/* Mobile hamburger */}
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
                setCartOpen(false);
              }}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu panel */}
      <div className={`${styles.mobilePanel} ${menuOpen ? styles.mobileOpen : ""}`}>
        <a href="#gorras" onClick={closeAll}>Gorras</a>
        <a href="#bolsos" onClick={closeAll}>Bolsos</a>
        <a href="#recomendaciones" onClick={closeAll}>Recomendaciones</a>
        <a href="#como-comprar" onClick={closeAll}>Cómo comprar</a>
        <a href="#contacto" onClick={closeAll}>Contacto</a>
      </div>

      {/* Cart panel */}
      <aside className={`${styles.cartPanel} ${cartOpen ? styles.cartOpen : ""}`}>
        <div className={styles.cartHead}>
          <strong>Tu carrito</strong>
          <button className={styles.cartClose} onClick={() => setCartOpen(false)}>
            ✕
          </button>
        </div>

        <div className={styles.cartBody}>
          {cartItems.length === 0 ? (
            <p className={styles.cartEmpty}>
              Aún no agregas productos. En el catálogo presiona
              <strong> “Añadir al carrito”</strong> y aquí se arma tu lista.
            </p>
          ) : (
            <div className={styles.cartList}>
              {cartItems.map((it) => (
                <div key={it.id} className={styles.cartItem}>
                  <div className={styles.cartThumb}>
                    {it.image ? (
                      <img src={it.image} alt={it.title} />
                    ) : (
                      <div className={styles.cartNoImg}>—</div>
                    )}
                  </div>

                  <div className={styles.cartMeta}>
                    <div className={styles.cartName}>{it.title}</div>
                    <div className={styles.cartPrice}>Precio: —</div>
                  </div>

                  <div className={styles.cartQty}>
                    <button
                      className={styles.qtyBtn}
                      onClick={() => setQty(it.id, (it.qty || 1) - 1)}
                      aria-label={`Restar cantidad de ${it.title}`}
                    >
                      −
                    </button>

                    <span className={styles.qtyNum}>{it.qty || 1}</span>

                    <button
                      className={styles.qtyBtn}
                      onClick={() => setQty(it.id, (it.qty || 1) + 1)}
                      aria-label={`Sumar cantidad de ${it.title}`}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className={styles.cartRemove}
                    onClick={() => removeFromCart(it.id)}
                    aria-label={`Quitar ${it.title} del carrito`}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>


      <div className={styles.cartFoot}>
        <a
          className={styles.cartCTA}
          href={cartItems.length ? buildWhatsAppUrl() : "#catalogo"}
          onClick={() => {
            if (cartItems.length) closeAll();
          }}
          target="_blank"
          rel="noreferrer"
        >
          {cartItems.length ? "Preguntar precio por WhatsApp" : "Ir al catálogo"}
        </a>
      </div>
      </aside>

      {/* Backdrop for cart (click to close) */}
      <button
        className={`${styles.backdrop} ${cartOpen ? styles.backdropOn : ""}`}
        aria-label="Cerrar carrito"
        onClick={() => setCartOpen(false)}
      />
    </header>
  );
}
