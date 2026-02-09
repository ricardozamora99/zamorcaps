// CatalogPage.jsx
import { useEffect, useMemo, useState } from "react";
import { sanity } from "../../sanityClient";
import "./CatalogPage.css";

const PAGE_SIZE = 12; // 3x4

export default function CatalogPage({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  // Filters
  const [type, setType] = useState("all"); // all | cap | bag
  const [minPrice, setMinPrice] = useState(0); // set after load
  const [maxPrice, setMaxPrice] = useState(0); // set after load
  const [page, setPage] = useState(1);

  // ===== Modal (lightbox) — igual al landing =====
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
          category,
          price,
          images[]{ asset->{url} }
        }
      `)
      .then((data) => setProducts(data || []))
      .catch((err) => {
        console.error("Sanity fetch error:", err);
        setErrorMsg("No pude leer productos desde Sanity.");
      });
  }, []);

  const formatCOP = (value) => {
    if (value === undefined || value === null || Number.isNaN(Number(value))) return "—";
    return new Intl.NumberFormat("es-CO").format(Number(value));
  };

  // Only available products
  const availableProducts = useMemo(() => {
    return (products || []).filter((p) => p?.available !== false);
  }, [products]);

  // Compute dynamic price bounds from available products
  const priceBounds = useMemo(() => {
    const prices = availableProducts
      .map((p) => Number(p?.price))
      .filter((v) => Number.isFinite(v) && v > 0);

    const min = prices.length ? Math.min(...prices) : 0;
    const max = prices.length ? Math.max(...prices) : 0;

    const step = max <= 100000 ? 5000 : 10000;

    return { min, max, step };
  }, [availableProducts]);

  // Initialize sliders once data arrives
  useEffect(() => {
    if (!priceBounds.max) return;

    setMinPrice((prev) => (prev ? prev : priceBounds.min));
    setMaxPrice((prev) => (prev ? prev : priceBounds.max));
  }, [priceBounds.min, priceBounds.max]);

  // Clamp if bounds change
  useEffect(() => {
    if (!priceBounds.max) return;
    setMinPrice((v) => Math.max(priceBounds.min, Math.min(v, priceBounds.max)));
    setMaxPrice((v) => Math.max(priceBounds.min, Math.min(v, priceBounds.max)));
  }, [priceBounds.min, priceBounds.max]);

  const safeMin = Math.min(Number(minPrice || 0), Number(maxPrice || 0));
  const safeMax = Math.max(Number(minPrice || 0), Number(maxPrice || 0));

  // Apply filters + SORT BY PRICE (ASC)
  const filtered = useMemo(() => {
    const byType = (p) => {
      if (type === "all") return true;
      return p?.category === type;
    };

    const byPriceRange = (p) => {
      const v = Number(p?.price);
      if (!Number.isFinite(v) || v <= 0) return true; // if no price, keep it
      return v >= safeMin && v <= safeMax;
    };

    const list = availableProducts.filter((p) => byType(p) && byPriceRange(p));

    // ✅ sort by price (low -> high). No-price items go LAST.
    const sorted = [...list].sort((a, b) => {
      const pa = Number(a?.price);
      const pb = Number(b?.price);

      const aHas = Number.isFinite(pa) && pa > 0;
      const bHas = Number.isFinite(pb) && pb > 0;

      if (aHas && bHas) return pa - pb;
      if (aHas && !bHas) return -1;
      if (!aHas && bHas) return 1;
      return 0;
    });

    return sorted;
  }, [availableProducts, type, safeMin, safeMax]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);

  useEffect(() => {
    if (page !== safePage) setPage(safePage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPages]);

  const pagedItems = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, safePage]);

  const goTo = (p) => setPage(Math.min(Math.max(1, p), totalPages));

  const resetFilters = () => {
    setType("all");
    setMinPrice(priceBounds.min || 0);
    setMaxPrice(priceBounds.max || 0);
    setPage(1);
  };

  // Range UI percentages for highlight bar
  const rangeUI = useMemo(() => {
    const min = priceBounds.min || 0;
    const max = priceBounds.max || 0;
    const span = Math.max(1, max - min);

    const minPct = max ? ((safeMin - min) / span) * 100 : 0;
    const maxPct = max ? ((safeMax - min) / span) * 100 : 100;

    return {
      minPct: Math.max(0, Math.min(100, minPct)),
      maxPct: Math.max(0, Math.min(100, maxPct)),
    };
  }, [priceBounds.min, priceBounds.max, safeMin, safeMax]);

  // ===== Modal helpers (igual al landing) =====
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

  // cerrar con ESC + flechas (clamp)
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

  return (
    <main className="catalogPage">
      <header className="catalogHead">
        <h1 className="catalogTitle">Catálogo completo</h1>
        <p className="catalogSub">
          Filtra por tipo y precio. Guarda favoritos en el carrito para cotizar por WhatsApp.
        </p>
      </header>

      {errorMsg && <p className="catalogError">{errorMsg}</p>}
      {!errorMsg && products.length === 0 && (
        <p className="catalogLoading">Cargando productos...</p>
      )}

      <section className="catalogLayout" aria-label="Catálogo con filtros">
        {/* ===== LEFT FILTERS ===== */}
        <aside className="filters" aria-label="Filtros">
          <div className="filtersCard">
            <div className="filtersTitleRow">
              <strong className="filtersTitle">Filtros</strong>
              <button className="filtersReset" type="button" onClick={resetFilters}>
                Reset
              </button>
            </div>

            <div className="filtersBlock">
              <div className="filtersLabel">Tipo</div>
              <div className="segmented" role="tablist" aria-label="Filtro por tipo">
                <button
                  className={`segBtn ${type === "all" ? "segActive" : ""}`}
                  type="button"
                  onClick={() => {
                    setType("all");
                    setPage(1);
                  }}
                >
                  Todos
                </button>
                <button
                  className={`segBtn ${type === "cap" ? "segActive" : ""}`}
                  type="button"
                  onClick={() => {
                    setType("cap");
                    setPage(1);
                  }}
                >
                  Gorras
                </button>
                <button
                  className={`segBtn ${type === "bag" ? "segActive" : ""}`}
                  type="button"
                  onClick={() => {
                    setType("bag");
                    setPage(1);
                  }}
                >
                  Bolsos
                </button>
              </div>
            </div>

            <div className="filtersBlock">
              <div className="filtersLabel">Rango de precio</div>

              <div className="priceTop">
                <span className="priceHint">Desde</span>
                <span className="priceValue">
                  {priceBounds.max ? `${formatCOP(safeMin)} COP` : "—"}
                </span>
              </div>

              <div className="priceTop">
                <span className="priceHint">Hasta</span>
                <span className="priceValue">
                  {priceBounds.max ? `${formatCOP(safeMax)} COP` : "—"}
                </span>
              </div>

              <div
                className="rangeWrap"
                style={{
                  "--minPct": `${rangeUI.minPct}%`,
                  "--maxPct": `${rangeUI.maxPct}%`,
                }}
              >
                <div className="rangeTrack" aria-hidden="true" />
                <input
                  className="priceRange priceRangeMin"
                  type="range"
                  min={priceBounds.min || 0}
                  max={priceBounds.max || 0}
                  step={priceBounds.step || 1000}
                  value={priceBounds.max ? safeMin : 0}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    setMinPrice(v);
                    if (v > safeMax) setMaxPrice(v);
                    setPage(1);
                  }}
                  disabled={!priceBounds.max}
                  aria-label="Precio mínimo"
                />

                <input
                  className="priceRange priceRangeMax"
                  type="range"
                  min={priceBounds.min || 0}
                  max={priceBounds.max || 0}
                  step={priceBounds.step || 1000}
                  value={priceBounds.max ? safeMax : 0}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    setMaxPrice(v);
                    if (v < safeMin) setMinPrice(v);
                    setPage(1);
                  }}
                  disabled={!priceBounds.max}
                  aria-label="Precio máximo"
                />
              </div>

              <div className="priceMinMax" aria-hidden="true">
                <span>{priceBounds.min ? `${formatCOP(priceBounds.min)} COP` : "—"}</span>
                <span>{priceBounds.max ? `${formatCOP(priceBounds.max)} COP` : "—"}</span>
              </div>

              <div className="filtersNote">Agrega al carrito y contáctanos por WhatsApp.</div>
            </div>

            <div className="filtersDivider" />

            <div className="filtersMeta">
              <div className="filtersCount">
                Mostrando <strong>{filtered.length}</strong> producto(s)
              </div>
              <div className="filtersSmall">
                Página <strong>{safePage}</strong> de <strong>{totalPages}</strong>
              </div>
              <div className="filtersSmall">
                Orden: <strong>Precio (menor → mayor)</strong>
              </div>
            </div>
          </div>
        </aside>

        {/* ===== RIGHT: GRID ===== */}
        <div className="catalogRight">
          <div className="catalogGrid" role="list" aria-label="Productos">
            {pagedItems.map((p) => {
              const url = p?.images?.[0]?.asset?.url;
              const isAvailable = p?.available !== false;

              return (
                <article key={p._id} className="catalogCard" role="listitem">
                  <div className="catalogMedia">
                    <button
                      className="catalogImgBtn"
                      type="button"
                      onClick={() => openProduct(p)}
                      aria-label={`Ver ${p.title} en grande`}
                    >
                      {url ? (
                        <img className="catalogImg" src={url} alt={p.title} loading="lazy" />
                      ) : (
                        <div className="catalogNoImg">Sin imagen</div>
                      )}
                    </button>
                  </div>

                  <div className="catalogBody">
                    <h3 className="catalogName">{p.title}</h3>

                    <p className="catalogDesc">{p.description || "Descripción pendiente."}</p>

                    <p className="catalogPrice">
                      <span>Precio:</span>{" "}
                      <strong>{p?.price ? `${formatCOP(p.price)} COP` : "—"}</strong>
                    </p>

                    <button
                      className="catalogBtn"
                      type="button"
                      disabled={!isAvailable}
                      onClick={() =>
                        onAddToCart?.({
                          id: p._id,
                          title: p.title,
                          image: url || "",
                          price: p.price ?? null,
                        })
                      }
                    >
                      {isAvailable ? "Añadir al carrito" : "Agotado"}
                    </button>
                  </div>
                </article>
              );
            })}

            {pagedItems.length === 0 && (
              <div className="catalogEmpty">
                <strong>No hay productos con esos filtros.</strong>
                <span>Prueba ampliando el rango o cambiando el tipo.</span>
                <button className="emptyBtn" type="button" onClick={resetFilters}>
                  Reset filtros
                </button>
              </div>
            )}
          </div>

          {/* ===== Pagination (below grid) ===== */}
          <div className="pager" aria-label="Paginación">
            <button
              className="pagerBtn"
              type="button"
              onClick={() => goTo(safePage - 1)}
              disabled={safePage <= 1}
            >
              ← Anterior
            </button>

            <div className="pagerNums" role="navigation" aria-label="Páginas">
              {Array.from({ length: totalPages }).slice(0, 12).map((_, i) => {
                const n = i + 1;
                return (
                  <button
                    key={n}
                    className={`pagerNum ${n === safePage ? "pagerActive" : ""}`}
                    type="button"
                    onClick={() => goTo(n)}
                    aria-label={`Ir a página ${n}`}
                  >
                    {n}
                  </button>
                );
              })}

              {totalPages > 12 && <span className="pagerDots">…</span>}

              {totalPages > 12 && (
                <button
                  className={`pagerNum ${totalPages === safePage ? "pagerActive" : ""}`}
                  type="button"
                  onClick={() => goTo(totalPages)}
                  aria-label={`Ir a página ${totalPages}`}
                >
                  {totalPages}
                </button>
              )}
            </div>

            <button
              className="pagerBtn"
              type="button"
              onClick={() => goTo(safePage + 1)}
              disabled={safePage >= totalPages}
            >
              Siguiente →
            </button>
          </div>
        </div>
      </section>

      {/* ===== MODAL / LIGHTBOX (igual al landing) ===== */}
      {open && (
        <>
          <div className="catalogModal" role="dialog" aria-modal="true" aria-label="Vista del producto">
            <div className="catalogModalCard">
              <div className="catalogModalHead">
                <strong className="catalogModalTitle">{activeProduct?.title}</strong>
                <button
                  className="catalogModalClose"
                  onClick={closeProduct}
                  aria-label="Cerrar"
                  type="button"
                >
                  ✕
                </button>
              </div>

              <div className="catalogModalMedia">
                {bigUrl ? (
                  <img className="catalogModalImg" src={bigUrl} alt={activeProduct?.title || "Producto"} />
                ) : (
                  <div className="catalogModalNoImg">Sin imagen</div>
                )}

                <button
                  className="catalogNavLeft"
                  onClick={() => setActiveIndex((i) => Math.max(0, i - 1))}
                  aria-label="Anterior"
                  disabled={safeIndex <= 0}
                  type="button"
                >
                  ‹
                </button>
                <button
                  className="catalogNavRight"
                  onClick={() => setActiveIndex((i) => Math.min(maxIndex, i + 1))}
                  aria-label="Siguiente"
                  disabled={safeIndex >= maxIndex}
                  type="button"
                >
                  ›
                </button>
              </div>

              <div className="catalogModalBody">
                <p className="catalogModalDesc">{activeProduct?.description || "Descripción pendiente."}</p>

                <p className="catalogModalPrice">
                  <span>Precio:</span>{" "}
                  <strong>
                    {formatCOP(activeProduct?.price)} {activeProduct?.price ? "COP" : ""}
                  </strong>
                </p>

                <div className="catalogModalActions">
                  <button
                    className="catalogModalBtn"
                    type="button"
                    disabled={activeProduct?.available === false}
                    onClick={() => {
                      const first = activeProduct?.images?.[0]?.asset?.url || "";
                      onAddToCart?.({
                        id: activeProduct?._id,
                        title: activeProduct?.title,
                        image: first,
                        price: activeProduct?.price ?? null,
                      });
                      closeProduct();
                    }}
                  >
                    {activeProduct?.available === false ? "Agotado" : "Añadir al carrito"}
                  </button>

                  <button className="catalogModalGhost" type="button" onClick={closeProduct}>
                    Seguir viendo
                  </button>
                </div>
              </div>
            </div>
          </div>

          <button className="catalogBackdrop" onClick={closeProduct} aria-label="Cerrar vista" type="button" />
        </>
      )}
    </main>
  );
}
