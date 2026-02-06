import { useEffect, useMemo, useState } from "react";
import { sanity } from "../../sanityClient";
import styles from "./CatalogSection.module.css";
import { useNavigate } from "react-router-dom";


export default function CatalogSection({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  // Modal (lightbox)
  const [open, setOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    sanity
      .fetch(`
        *[_type == "product"] | order(_createdAt desc){
          _id,
          title,
          description,
          available,
          price,
          images[]{
            asset->{url}
          }
        }
      `)
      .then((data) => setProducts(data || []))
      .catch((err) => {
        console.error("Sanity fetch error:", err);
        setErrorMsg("No pude leer productos desde Sanity.");
      });
  }, []);

  // Helpers
  const isAvail = (p) => p?.available !== false;

  const formatCOP = (value) => {
    if (value === undefined || value === null || Number.isNaN(value)) return "—";
    try {
      return new Intl.NumberFormat("es-CO").format(value);
    } catch {
      return String(value);
    }
  };

  // SOLO gorras disponibles, y SOLO 9
  const gorras = useMemo(() => {
    return (products || []).filter(isAvail).slice(0, 9);
  }, [products]);

  const openProduct = (p) => {
    setActiveProduct(p);
    setActiveIndex(0);
    setOpen(true);
  };

  const closeProduct = () => {
    setOpen(false);
    setActiveProduct(null);
    setActiveIndex(0);
  };

  // cerrar con ESC + flechas
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeProduct();
      if (e.key === "ArrowRight") setActiveIndex((i) => i + 1);
      if (e.key === "ArrowLeft") setActiveIndex((i) => Math.max(0, i - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const activeImages = activeProduct?.images || [];
  const maxIndex = Math.max(0, activeImages.length - 1);
  const safeIndex = Math.min(activeIndex, maxIndex);
  const bigUrl = activeImages?.[safeIndex]?.asset?.url;
  const navigate = useNavigate();


  return (
    <section
      id="catalogo"
      className={`section ${styles.section}`}
      aria-labelledby="catalogo-title"
    >
      <header className={styles.head}>
        <p className={styles.kicker}>Catálogo</p>
        <h2 id="catalogo-title" className={styles.h2}>
          Nuestros productos
        </h2>
        <p className={styles.sub}>
          Guarda tus favoritos en el carrito y pregúntanos por WhatsApp.
        </p>
      </header>

      <h3 id="gorras" className={styles.title}>GORRAS</h3>

      {errorMsg && <p className={styles.stateError}>{errorMsg}</p>}
      {!errorMsg && products.length === 0 && (
        <p className={styles.stateLoading}>Cargando productos...</p>
      )}

      <div className={styles.grid}>
        {gorras.map((p) => {
          const url = p?.images?.[0]?.asset?.url;
          const available = isAvail(p);

          return (
            <article key={p._id} className={styles.card}>
              <div className={styles.media}>
                {/* SOLO IMAGEN abre modal */}
                <button
                  className={styles.imgBtn}
                  type="button"
                  onClick={() => openProduct(p)}
                  aria-label={`Ver ${p.title} en grande`}
                >
                  {url ? (
                    <img
                      className={styles.img}
                      src={url}
                      alt={p.title}
                      loading="lazy"
                    />
                  ) : (
                    <div className={styles.noImg}>Sin imagen</div>
                  )}
                </button>

                <div className={styles.badges}>
                  <span
                    className={`${styles.badge} ${
                      available ? styles.badgeOk : styles.badgeOff
                    }`}
                  >
                    {available ? "Disponible" : "Agotado"}
                  </span>
                </div>
              </div>

              <div className={styles.body}>
                <h4 className={styles.name}>{p.title}</h4>

                {p.description ? (
                  <p className={styles.desc}>{p.description}</p>
                ) : (
                  <p className={styles.descMuted}>Descripción pendiente.</p>
                )}

                <p className={styles.priceLine}>
                  <span className={styles.priceLabel}>Precio:</span>{" "}
                  <span className={styles.priceValue}>
                    {formatCOP(p.price)} {p.price ? "COP" : ""}
                  </span>
                </p>

                <div className={styles.actions}>
                  <a className={styles.ctaGhost} href="#contacto">
                    Preguntar
                  </a>

                  <button
                    className={styles.cta}
                    type="button"
                    disabled={!available}
                    onClick={() =>
                      onAddToCart?.({
                        id: p._id,
                        title: p.title,
                        image: url || "",
                        price: p.price ?? null,
                      })
                    }
                  >
                    {available ? "Añadir al carrito" : "Agotado"}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Botón debajo del catálogo (por ahora NO hace nada) */}
      <div className={styles.bottomRow}>
        <button
          className={styles.viewAllBtn}
          type="button"
          onClick={() => navigate("/catalogo")}
          aria-label="Ver catálogo completo (próximamente)"
        >
          Ver catálogo completo
        </button>
      </div>

      <h3 id="bolsos" className={styles.title}>BOLSOS</h3>
      <p className={styles.description}>Próximamente disponibles.</p>

      {/* MODAL / LIGHTBOX */}
      {open && (
        <>
          <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-label="Vista del producto"
          >
            <div className={styles.modalCard}>
              <div className={styles.modalHead}>
                <strong className={styles.modalTitle}>
                  {activeProduct?.title}
                </strong>
                <button
                  className={styles.modalClose}
                  onClick={closeProduct}
                  aria-label="Cerrar"
                  type="button"
                >
                  ✕
                </button>
              </div>

              <div className={styles.modalMedia}>
                {bigUrl ? (
                  <img
                    className={styles.modalImg}
                    src={bigUrl}
                    alt={activeProduct?.title || "Producto"}
                  />
                ) : (
                  <div className={styles.modalNoImg}>Sin imagen</div>
                )}

                <button
                  className={styles.navLeft}
                  onClick={() => setActiveIndex((i) => Math.max(0, i - 1))}
                  aria-label="Anterior"
                  disabled={safeIndex <= 0}
                  type="button"
                >
                  ‹
                </button>
                <button
                  className={styles.navRight}
                  onClick={() => setActiveIndex((i) => Math.min(maxIndex, i + 1))}
                  aria-label="Siguiente"
                  disabled={safeIndex >= maxIndex}
                  type="button"
                >
                  ›
                </button>
              </div>

              <div className={styles.modalBody}>
                <p className={styles.modalDesc}>
                  {activeProduct?.description || "Descripción pendiente."}
                </p>

                <p className={styles.modalPrice}>
                  <span>Precio:</span>{" "}
                  <strong>
                    {formatCOP(activeProduct?.price)}{" "}
                    {activeProduct?.price ? "COP" : ""}
                  </strong>
                </p>
              </div>
            </div>
          </div>

          <button
            className={styles.backdrop}
            onClick={closeProduct}
            aria-label="Cerrar vista"
            type="button"
          />
        </>
      )}
    </section>
  );
}
