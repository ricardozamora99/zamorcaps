import { useEffect, useMemo, useState } from "react";
import { sanity } from "../../sanityClient";
import "./CatalogPage.css";

const PAGE_SIZE = 12; // 3x4

export default function CatalogPage({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  // Filters
  const [type, setType] = useState("all"); // all | cap | bag
  const [maxPrice, setMaxPrice] = useState(0); // set after load
  const [page, setPage] = useState(1);

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

    // nice step: 5k up to 100k, else 10k
    const step = max <= 100000 ? 5000 : 10000;

    return { min, max, step };
  }, [availableProducts]);

  // Initialize slider max once data arrives
  useEffect(() => {
    if (!priceBounds.max) return;
    setMaxPrice((prev) => (prev ? prev : priceBounds.max));
  }, [priceBounds.max]);

  // Apply filters
  const filtered = useMemo(() => {
    const byType = (p) => {
      if (type === "all") return true;
      return p?.category === type;
    };

    const byPrice = (p) => {
      const v = Number(p?.price);
      if (!Number.isFinite(v) || v <= 0) return true; // if no price, keep it
      return v <= Number(maxPrice || 0);
    };

    return availableProducts.filter((p) => byType(p) && byPrice(p));
  }, [availableProducts, type, maxPrice]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);

  useEffect(() => {
    // if filters reduce pages, clamp page
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
    setMaxPrice(priceBounds.max || 0);
    setPage(1);
  };

  const maxShown = Number(maxPrice || 0);

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
              <div className="filtersLabel">Precio máximo</div>
              <div className="priceTop">
                <span className="priceHint">Hasta</span>
                <span className="priceValue">
                  {priceBounds.max ? `${formatCOP(maxShown)} COP` : "—"}
                </span>
              </div>

              <input
                className="priceRange"
                type="range"
                min={priceBounds.min || 0}
                max={priceBounds.max || 0}
                step={priceBounds.step || 1000}
                value={priceBounds.max ? maxShown : 0}
                onChange={(e) => {
                  setMaxPrice(Number(e.target.value));
                  setPage(1);
                }}
                disabled={!priceBounds.max}
                aria-label="Precio máximo"
              />

              <div className="priceMinMax" aria-hidden="true">
                <span>{priceBounds.min ? `${formatCOP(priceBounds.min)} COP` : "—"}</span>
                <span>{priceBounds.max ? `${formatCOP(priceBounds.max)} COP` : "—"}</span>
              </div>

              <div className="filtersNote">
                * Si un producto no tiene precio, lo dejamos visible.
              </div>
            </div>

            <div className="filtersDivider" />

            <div className="filtersMeta">
              <div className="filtersCount">
                Mostrando <strong>{filtered.length}</strong> producto(s)
              </div>
              <div className="filtersSmall">
                Página <strong>{safePage}</strong> de <strong>{totalPages}</strong>
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
                    {url ? (
                      <img className="catalogImg" src={url} alt={p.title} loading="lazy" />
                    ) : (
                      <div className="catalogNoImg">Sin imagen</div>
                    )}
                  </div>

                  <div className="catalogBody">
                    <h3 className="catalogName">{p.title}</h3>

                    <p className="catalogDesc">
                      {p.description || "Descripción pendiente."}
                    </p>

                    <p className="catalogPrice">
                      <span>Precio:</span>{" "}
                      <strong>
                        {p?.price ? `${formatCOP(p.price)} COP` : "—"}
                      </strong>
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

            {/* Empty state */}
            {pagedItems.length === 0 && (
              <div className="catalogEmpty">
                <strong>No hay productos con esos filtros.</strong>
                <span>Prueba subiendo el precio máximo o cambiando el tipo.</span>
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
    </main>
  );
}
