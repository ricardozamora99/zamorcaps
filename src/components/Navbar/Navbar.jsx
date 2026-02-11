// Navbar.jsx (solo muestro el Navbar completo con el cambio de cartToast)
import { useEffect, useRef } from "react";
import zamorLogo from "../../Images/logo ZAMOR CAPSnoBG.png";
import styles from "./Navbar.module.css";

export default function Navbar({
  variant = "home", // "home" | "catalog"

  menuOpen,
  catalogOpen,
  closeMenu,
  setMenuOpen,
  setCatalogOpen,

  // carrito global
  cartOpen,
  setCartOpen,
  cartItems,
  cartCount,
  setQty,
  removeFromCart,
  buildWhatsAppUrl,
  closeAll,

  // ✅ NUEVO
  cartToast = "",
}) {
  const closeTimerRef = useRef(null);

  const isCatalogVariant = variant === "catalog";

  // ===== scroll hide/show =====
  const lastYRef = useRef(0);
  const tickingRef = useRef(false);
  const hiddenRef = useRef(false);

  const openCatalog = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setCatalogOpen(true);
  };

  const scheduleCloseCatalog = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => setCatalogOpen(false), 200);
  };

  const formatCOP = (n) =>
    Number(n || 0).toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    });

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
  }, [setCartOpen]);

  // ===== scroll logic (hide on down, show on up) =====
  useEffect(() => {
    const el = document.querySelector(`.${styles.navbar}`);
    if (!el) return;

    lastYRef.current = window.scrollY || 0;
    el.classList.remove(styles.navHidden);
    hiddenRef.current = false;

    const TOP_LOCK = 10;
    const HIDE_AFTER = 80;
    const DELTA = 8;

    const apply = () => {
      tickingRef.current = false;

      // si hay UI abierta, no ocultar
      if (menuOpen || cartOpen) {
        if (hiddenRef.current) {
          el.classList.remove(styles.navHidden);
          hiddenRef.current = false;
        }
        lastYRef.current = window.scrollY || 0;
        return;
      }

      const y = window.scrollY || 0;
      const lastY = lastYRef.current;
      const diff = y - lastY;

      if (y <= TOP_LOCK) {
        if (hiddenRef.current) {
          el.classList.remove(styles.navHidden);
          hiddenRef.current = false;
        }
        lastYRef.current = y;
        return;
      }

      if (Math.abs(diff) < DELTA) return;

      if (diff > 0) {
        if (y > HIDE_AFTER && !hiddenRef.current) {
          el.classList.add(styles.navHidden);
          hiddenRef.current = true;
        }
      } else {
        if (hiddenRef.current) {
          el.classList.remove(styles.navHidden);
          hiddenRef.current = false;
        }
      }

      lastYRef.current = y;
    };

    const onScroll = () => {
      if (!tickingRef.current) {
        tickingRef.current = true;
        window.requestAnimationFrame(apply);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen, cartOpen, styles.navbar, styles.navHidden]);

  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        <nav className={styles.wrap}>
          {/* LEFT: Brand */}
          <a
            href={isCatalogVariant ? "/#inicio" : "#inicio"}
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
            {!isCatalogVariant && (
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
                  <a
                    href="#catalogo"
                    className={styles.catalogLink}
                    onClick={() => {
                      setCartOpen(false);
                      closeMenu();
                      setCatalogOpen(false);
                    }}
                  >
                    Catálogo
                    <span className={`${styles.chev} ${catalogOpen ? styles.chevUp : ""}`}>▾</span>
                  </a>

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

                <li><a href="#recomendaciones" onClick={closeAll}>Recomendaciones</a></li>
                <li><a href="#como-comprar" onClick={closeAll}>Cómo comprar</a></li>
                <li><a href="#contacto" onClick={closeAll}>Contacto</a></li>
              </ul>
            )}

            <button
              className={styles.cartBtn}
              type="button"
              aria-label="Abrir carrito"
              aria-expanded={cartOpen}
              onClick={() => {
                if (isCatalogVariant) {
                  setMenuOpen?.(false);
                  setCatalogOpen?.(false);
                }
                setCartOpen((v) => !v);
              }}
            >
              <span className={styles.cartIcon} aria-hidden="true">🛒</span>
              <span className={styles.cartText}>Carrito</span>
              <span className={styles.cartBadge} aria-label={`${cartCount} items`}>
                {cartCount}
              </span>
            </button>

            {!isCatalogVariant && (
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
            )}
          </div>
        </nav>
      </div>

      {!isCatalogVariant && (
        <div className={`${styles.mobilePanel} ${menuOpen ? styles.mobileOpen : ""}`}>
          <a href="#gorras" onClick={closeAll}>Gorras</a>
          <a href="#bolsos" onClick={closeAll}>Bolsos</a>
          <a href="#recomendaciones" onClick={closeAll}>Recomendaciones</a>
          <a href="#como-comprar" onClick={closeAll}>Cómo comprar</a>
          <a href="#contacto" onClick={closeAll}>Contacto</a>
        </div>
      )}

      {/* Cart panel (always) */}
      <aside className={`${styles.cartPanel} ${cartOpen ? styles.cartOpen : ""}`}>
        <div className={styles.cartHead}>
          <strong>Tu carrito</strong>
          <button
            className={styles.cartClose}
            type="button"
            onClick={() => setCartOpen(false)}
            aria-label="Cerrar carrito"
          >
            ✕
          </button>
        </div>

        {/* ✅ TOAST */}
        {cartToast ? (
          <div className={styles.cartToast} role="status" aria-live="polite">
            {cartToast}
          </div>
        ) : null}

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
                    {it.image ? <img src={it.image} alt={it.title} /> : <div className={styles.cartNoImg}>—</div>}
                  </div>

                  <div className={styles.cartMeta}>
                    <div className={styles.cartName}>{it.title}</div>
                    <div className={styles.cartPrice}>Precio: {formatCOP(it.price)}</div>
                  </div>

                  <div className={styles.cartQty}>
                    <button
                      className={styles.qtyBtn}
                      type="button"
                      onClick={() => setQty(it.id, (it.qty || 1) - 1)}
                      aria-label={`Restar cantidad de ${it.title}`}
                    >
                      −
                    </button>

                    <span className={styles.qtyNum}>{it.qty || 1}</span>

                    <button
                      className={styles.qtyBtn}
                      type="button"
                      onClick={() => setQty(it.id, (it.qty || 1) + 1)}
                      aria-label={`Sumar cantidad de ${it.title}`}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className={styles.cartRemove}
                    type="button"
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
            href={cartItems.length ? buildWhatsAppUrl() : (isCatalogVariant ? "/catalogo" : "#catalogo")}
            onClick={() => {
              if (cartItems.length) closeAll();
            }}
            target={cartItems.length ? "_blank" : undefined}
            rel={cartItems.length ? "noreferrer" : undefined}
          >
            {cartItems.length ? "Preguntar precio por WhatsApp" : "Ir al catálogo"}
          </a>
        </div>
      </aside>

      <button
        className={`${styles.backdrop} ${cartOpen ? styles.backdropOn : ""}`}
        aria-label="Cerrar carrito"
        onClick={() => setCartOpen(false)}
        type="button"
      />
    </header>
  );
}
