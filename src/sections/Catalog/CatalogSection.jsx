// CatalogSection.jsx
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
          stock,
          productId,
          images[]{ asset->{url} }
        }
      `)
      .then((data) => setProducts(data || []))
      .catch((err) => {
        console.error("Sanity fetch error:", err);
        setErrorMsg("No pude leer productos desde Sanity.");
      });
  }, []);

  // Helpers
  const formatCOP = (value) => {
    if (value === undefined || value === null || Number.isNaN(Number(value))) return "—";
    return new Intl.NumberFormat("es-CO").format(Number(value));
  };

  // 👇 Igual al CatalogPage: stock real + fallback
  const getStock = (p) => {
    const s = Number(p?.stock);
    if (Number.isFinite(s)) return s;
    return p?.available === false ? 0 : 1;
  };

  const isInStock = (p) => getStock(p) > 0 && p?.available !== false;

  // SOLO productos disponibles (stock>0) y SOLO 6
  const gorras = useMemo(() => {
    return (products || []).filter(isInStock).slice(0, 6);
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

  const activeImages = activeProduct?.images || [];
  const maxIndex = Math.max(0, activeImages.length - 1);
  const safeIndex = Math.min(activeIndex, maxIndex);
  const bigUrl = activeImages?.[safeIndex]?.asset?.url;

  // cerrar con ESC + flechas (con clamp)
  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") closeProduct();
      if (e.key === "ArrowRight") setActiveIndex((i) => Math.min(maxIndex, i + 1));
      if (e.key === "ArrowLeft") setActiveIndex((i) => Math.max(0, i - 1));
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, maxIndex]);

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
          Algunos de nuestros favoritos del momento. Agrega al carrito y pregúntanos por WhatsApp.
        </p>
      </header>

      <h3 id="gorras" className={styles.title}>
        GORRAS
      </h3>

      {errorMsg && <p className={styles.stateError}>{errorMsg}</p>}
      {!errorMsg && products.length === 0 && (
        <p className={styles.stateLoading}>Cargando productos...</p>
      )}

      <div className={styles.grid}>
        {gorras.map((p) => {
          const url = p?.images?.[0]?.asset?.url;
          const stock = getStock(p);
          const canBuy = stock > 0 && p?.available !== false;

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
                    <img className={styles.img} src={url} alt={p.title} loading="lazy" />
                  ) : (
                    <div className={styles.noImg}>Sin imagen</div>
                  )}
                </button>

                <div className={styles.badges}>
                  <span
                    className={`${styles.badge} ${canBuy ? styles.badgeOk : styles.badgeOff}`}
                  >
                    {canBuy ? "Disponible" : "Agotado"}
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

                {/* ✅ IMPORTANTE: pasar stock y productId */}
                <button
                  className={styles.ctaFull}
                  type="button"
                  disabled={!canBuy}
                  onClick={() =>
                    onAddToCart?.({
                      id: p._id,
                      title: p.title,
                      image: url || "",
                      price: p.price ?? null,
                      stock,
                      productId: p.productId || null,
                    })
                  }
                >
                  {canBuy ? "Añadir al carrito" : "Agotado"}
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Botón debajo del catálogo */}
      <div className={styles.bottomRow}>
        <button
          className={styles.viewAllBtn}
          type="button"
          onClick={() => navigate("/catalogo")}
          aria-label="Ver catálogo completo"
        >
          Ver catálogo completo
        </button>
      </div>

      <h3 id="bolsos" className={styles.title}>
        BOLSOS
      </h3>
      <p className={styles.description}>Próximamente disponibles.</p>

      {/* ===== MODAL / LIGHTBOX ===== */}
      {open && (
        <>
          <div
            className={styles.catalogModal}
            role="dialog"
            aria-modal="true"
            aria-label="Vista del producto"
          >
            <div className={styles.catalogModalCard}>
              <div className={styles.catalogModalHead}>
                <strong className={styles.catalogModalTitle}>
                  {activeProduct?.title}
                </strong>
                <button
                  className={styles.catalogModalClose}
                  onClick={closeProduct}
                  aria-label="Cerrar"
                  type="button"
                >
                  ✕
                </button>
              </div>

              <div className={styles.catalogModalMedia}>
                {bigUrl ? (
                  <img
                    className={styles.catalogModalImg}
                    src={bigUrl}
                    alt={activeProduct?.title || "Producto"}
                  />
                ) : (
                  <div className={styles.catalogModalNoImg}>Sin imagen</div>
                )}

                <button
                  className={styles.catalogNavLeft}
                  onClick={() => setActiveIndex((i) => Math.max(0, i - 1))}
                  aria-label="Anterior"
                  disabled={safeIndex <= 0}
                  type="button"
                >
                  ‹
                </button>
                <button
                  className={styles.catalogNavRight}
                  onClick={() => setActiveIndex((i) => Math.min(maxIndex, i + 1))}
                  aria-label="Siguiente"
                  disabled={safeIndex >= maxIndex}
                  type="button"
                >
                  ›
                </button>
              </div>

              <div className={styles.catalogModalBody}>
                <p className={styles.catalogModalDesc}>
                  {activeProduct?.description || "Descripción pendiente."}
                </p>

                <p className={styles.catalogModalPrice}>
                  <span>Precio:</span>{" "}
                  <strong>
                    {formatCOP(activeProduct?.price)}{" "}
                    {activeProduct?.price ? "COP" : ""}
                  </strong>
                </p>

                <div className={styles.catalogModalActions}>
                  <button
                    className={styles.catalogModalBtn}
                    type="button"
                    disabled={!isInStock(activeProduct)}
                    onClick={() => {
                      const first = activeProduct?.images?.[0]?.asset?.url || "";
                      const stock = getStock(activeProduct);

                      onAddToCart?.({
                        id: activeProduct?._id,
                        title: activeProduct?.title,
                        image: first,
                        price: activeProduct?.price ?? null,
                        stock,
                        productId: activeProduct?.productId || null,
                      });

                      closeProduct();
                    }}
                  >
                    {isInStock(activeProduct) ? "Añadir al carrito" : "Agotado"}
                  </button>

                  <button
                    className={styles.catalogModalGhost}
                    type="button"
                    onClick={closeProduct}
                  >
                    Seguir viendo
                  </button>
                </div>
              </div>
            </div>
          </div>

          <button
            className={styles.catalogBackdrop}
            onClick={closeProduct}
            aria-label="Cerrar vista"
            type="button"
          />
        </>
      )}
    </section>
  );
}
