// CatalogPage.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { sanity } from "../../sanityClient";
import "./CatalogPage.css";

const PAGE_SIZE = 12; // 3x4

export default function CatalogPage({ onAddToCart }) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  // Reference used to return to the beginning of the catalog
  const catalogTopRef = useRef(null);

  // Filters
  const [type, setType] = useState("all");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [page, setPage] = useState(1);

  // ===== Modal (lightbox)
  const [open, setOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // ============================================================
  // LOAD PRODUCTS FROM SANITY
  // ============================================================

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
          stock,
          images[]{ asset->{url} }
        }
      `)
      .then((data) => setProducts(data || []))
      .catch((err) => {
        console.error("Sanity fetch error:", err);
        setErrorMsg("No pude leer productos desde Sanity.");
      });
  }, []);

  // ============================================================
  // HELPERS
  // ============================================================

  const formatCOP = (value) => {
    if (
      value === undefined ||
      value === null ||
      Number.isNaN(Number(value))
    ) {
      return "—";
    }

    return new Intl.NumberFormat("es-CO").format(Number(value));
  };

  // Define stock number
  const getStock = (p) => {
    const s = Number(p?.stock);

    if (Number.isFinite(s)) return s;

    // Fallback for old products without stock field
    return p?.available === false ? 0 : 1;
  };

  const isInStock = (p) =>
    getStock(p) > 0 && p?.available !== false;

  // ============================================================
  // AVAILABLE PRODUCTS
  // ============================================================

  const availableProducts = useMemo(() => {
    return (products || []).filter((p) => isInStock(p));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  // ============================================================
  // PRICE BOUNDS
  // ============================================================

  const priceBounds = useMemo(() => {
    const prices = availableProducts
      .map((p) => Number(p?.price))
      .filter((v) => Number.isFinite(v) && v > 0);

    const min = prices.length ? Math.min(...prices) : 0;
    const max = prices.length ? Math.max(...prices) : 0;

    const step = max <= 100000 ? 5000 : 10000;

    return { min, max, step };
  }, [availableProducts]);

  // Initialize sliders when products arrive
  useEffect(() => {
    if (!priceBounds.max) return;

    setMinPrice((prev) => (prev ? prev : priceBounds.min));
    setMaxPrice((prev) => (prev ? prev : priceBounds.max));
  }, [priceBounds.min, priceBounds.max]);

  // Clamp slider values if bounds change
  useEffect(() => {
    if (!priceBounds.max) return;

    setMinPrice((v) =>
      Math.max(
        priceBounds.min,
        Math.min(v, priceBounds.max)
      )
    );

    setMaxPrice((v) =>
      Math.max(
        priceBounds.min,
        Math.min(v, priceBounds.max)
      )
    );
  }, [priceBounds.min, priceBounds.max]);

  const safeMin = Math.min(
    Number(minPrice || 0),
    Number(maxPrice || 0)
  );

  const safeMax = Math.max(
    Number(minPrice || 0),
    Number(maxPrice || 0)
  );

  // ============================================================
  // FILTER + SORT
  // ============================================================

  const filtered = useMemo(() => {
    const byType = (p) => {
      if (type === "all") return true;
      return p?.category === type;
    };

    const byPriceRange = (p) => {
      const v = Number(p?.price);

      if (!Number.isFinite(v) || v <= 0) {
        return true;
      }

      return v >= safeMin && v <= safeMax;
    };

    const list = availableProducts.filter(
      (p) => byType(p) && byPriceRange(p)
    );

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

  // ============================================================
  // PAGINATION
  // ============================================================

  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / PAGE_SIZE)
  );

  const safePage = Math.min(page, totalPages);

  useEffect(() => {
    if (page !== safePage) {
      setPage(safePage);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPages]);

  const pagedItems = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;

    return filtered.slice(
      start,
      start + PAGE_SIZE
    );
  }, [filtered, safePage]);

  // ------------------------------------------------------------
  // Smart pagination
  //
  // Examples:
  //
  // 1 2 3 4 5
  //
  // 1 2 3 4 5 … 30
  //
  // 1 … 14 15 16 … 30
  //
  // 1 … 26 27 28 29 30
  // ------------------------------------------------------------

  const paginationItems = useMemo(() => {
    // If there are only a few pages, show all of them
    if (totalPages <= 7) {
      return Array.from(
        { length: totalPages },
        (_, i) => i + 1
      );
    }

    // Near the beginning
    if (safePage <= 4) {
      return [
        1,
        2,
        3,
        4,
        5,
        "ellipsis-right",
        totalPages,
      ];
    }

    // Near the end
    if (safePage >= totalPages - 3) {
      return [
        1,
        "ellipsis-left",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    // Middle
    return [
      1,
      "ellipsis-left",
      safePage - 1,
      safePage,
      safePage + 1,
      "ellipsis-right",
      totalPages,
    ];
  }, [safePage, totalPages]);

  const goTo = (targetPage) => {
    const nextPage = Math.min(
      Math.max(1, targetPage),
      totalPages
    );

    if (nextPage === safePage) return;

    setPage(nextPage);

    // Return smoothly to the beginning of the catalog
    requestAnimationFrame(() => {
      catalogTopRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  // ============================================================
  // RESET FILTERS
  // ============================================================

  const resetFilters = () => {
    setType("all");
    setMinPrice(priceBounds.min || 0);
    setMaxPrice(priceBounds.max || 0);
    setPage(1);
  };

  // ============================================================
  // RANGE UI
  // ============================================================

  const rangeUI = useMemo(() => {
    const min = priceBounds.min || 0;
    const max = priceBounds.max || 0;
    const span = Math.max(1, max - min);

    const minPct = max
      ? ((safeMin - min) / span) * 100
      : 0;

    const maxPct = max
      ? ((safeMax - min) / span) * 100
      : 100;

    return {
      minPct: Math.max(
        0,
        Math.min(100, minPct)
      ),

      maxPct: Math.max(
        0,
        Math.min(100, maxPct)
      ),
    };
  }, [
    priceBounds.min,
    priceBounds.max,
    safeMin,
    safeMax,
  ]);

  // ============================================================
  // MODAL HELPERS
  // ============================================================

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

  const activeImages =
    activeProduct?.images || [];

  const maxIndex = Math.max(
    0,
    activeImages.length - 1
  );

  const safeIndex = Math.min(
    activeIndex,
    maxIndex
  );

  const bigUrl =
    activeImages?.[safeIndex]?.asset?.url;

  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") {
        closeProduct();
      }

      if (e.key === "ArrowRight") {
        setActiveIndex((i) =>
          Math.min(maxIndex, i + 1)
        );
      }

      if (e.key === "ArrowLeft") {
        setActiveIndex((i) =>
          Math.max(0, i - 1)
        );
      }
    };

    window.addEventListener(
      "keydown",
      onKey
    );

    return () =>
      window.removeEventListener(
        "keydown",
        onKey
      );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, maxIndex]);

  // ============================================================
  // JSX
  // ============================================================

  return (
    <main
      className="catalogPage"
      ref={catalogTopRef}
    >
      {/* ===== HEADER ===== */}

      <header className="catalogHead">
        <h1 className="catalogTitle">
          Catálogo completo
        </h1>

        <p className="catalogSub">
          Filtra por tipo y precio. Guarda
          favoritos en el carrito para cotizar
          por WhatsApp.
        </p>
      </header>

      {errorMsg && (
        <p className="catalogError">
          {errorMsg}
        </p>
      )}

      {!errorMsg &&
        products.length === 0 && (
          <p className="catalogLoading">
            Cargando productos...
          </p>
        )}

      <section
        className="catalogLayout"
        aria-label="Catálogo con filtros"
      >
        {/* ====================================================
            LEFT FILTERS
            ==================================================== */}

        <aside
          className={`filters ${
            filtersOpen
              ? "filtersOpen"
              : ""
          }`}
          aria-label="Filtros"
        >
          {/* Mobile top bar */}

          <div className="filtersBar">
            <button
              type="button"
              className="filtersBarBtn"
              onClick={() =>
                setFiltersOpen(true)
              }
              aria-label="Abrir filtros"
            >
              <span
                className="filtersBarIcon"
                aria-hidden="true"
              >
                ⚙️
              </span>

              Filtrar
            </button>

            <div
              className="filtersBarMeta"
              aria-label="Resumen"
            >
              <span>
                <strong>
                  {filtered.length}
                </strong>{" "}
                productos
              </span>

              <span className="filtersBarDot">
                •
              </span>

              <span>
                Pág{" "}
                <strong>
                  {safePage}
                </strong>
                /
                <strong>
                  {totalPages}
                </strong>
              </span>
            </div>

            <button
              className="filtersReset"
              type="button"
              onClick={resetFilters}
            >
              Reset
            </button>
          </div>

          {/* Mobile backdrop */}

          <button
            className="filtersBackdrop"
            type="button"
            onClick={() =>
              setFiltersOpen(false)
            }
            aria-label="Cerrar filtros"
          />

          {/* Filter panel */}

          <div className="filtersCard">
            <div className="filtersTitleRow">
              <strong className="filtersTitle">
                Filtros
              </strong>

              <button
                className="filtersClose"
                type="button"
                onClick={() =>
                  setFiltersOpen(false)
                }
                aria-label="Cerrar"
              >
                ✕
              </button>
            </div>

            {/* ===== TYPE ===== */}

            <div className="filtersBlock">
              <div className="filtersLabel">
                Tipo
              </div>

              <div
                className="segmented"
                role="tablist"
                aria-label="Filtro por tipo"
              >
                <button
                  className={`segBtn ${
                    type === "all"
                      ? "segActive"
                      : ""
                  }`}
                  type="button"
                  onClick={() => {
                    setType("all");
                    setPage(1);
                  }}
                >
                  Todos
                </button>

                <button
                  className={`segBtn ${
                    type === "cap"
                      ? "segActive"
                      : ""
                  }`}
                  type="button"
                  onClick={() => {
                    setType("cap");
                    setPage(1);
                  }}
                >
                  Gorras
                </button>

                <button
                  className={`segBtn ${
                    type === "bag"
                      ? "segActive"
                      : ""
                  }`}
                  type="button"
                  onClick={() => {
                    setType("bag");
                    setPage(1);
                  }}
                >
                  Bolsos
                </button>

                <button
                  className={`segBtn ${
                    type === "carriel"
                      ? "segActive"
                      : ""
                  }`}
                  type="button"
                  onClick={() => {
                    setType("carriel");
                    setPage(1);
                  }}
                >
                  Carrieles
                </button>
              </div>
            </div>

            {/* ===== PRICE ===== */}

            <div className="filtersBlock">
              <div className="filtersLabel">
                Rango de precio
              </div>

              <div className="priceTop">
                <span className="priceHint">
                  Desde
                </span>

                <span className="priceValue">
                  {priceBounds.max
                    ? `${formatCOP(
                        safeMin
                      )} COP`
                    : "—"}
                </span>
              </div>

              <div className="priceTop">
                <span className="priceHint">
                  Hasta
                </span>

                <span className="priceValue">
                  {priceBounds.max
                    ? `${formatCOP(
                        safeMax
                      )} COP`
                    : "—"}
                </span>
              </div>

              <div
                className="rangeWrap"
                style={{
                  "--minPct":
                    `${rangeUI.minPct}%`,

                  "--maxPct":
                    `${rangeUI.maxPct}%`,
                }}
              >
                <div
                  className="rangeTrack"
                  aria-hidden="true"
                />

                <input
                  className="priceRange priceRangeMin"
                  type="range"
                  min={priceBounds.min || 0}
                  max={priceBounds.max || 0}
                  step={
                    priceBounds.step ||
                    1000
                  }
                  value={
                    priceBounds.max
                      ? safeMin
                      : 0
                  }
                  onChange={(e) => {
                    const v = Number(
                      e.target.value
                    );

                    setMinPrice(v);

                    if (v > safeMax) {
                      setMaxPrice(v);
                    }

                    setPage(1);
                  }}
                  disabled={
                    !priceBounds.max
                  }
                  aria-label="Precio mínimo"
                />

                <input
                  className="priceRange priceRangeMax"
                  type="range"
                  min={priceBounds.min || 0}
                  max={priceBounds.max || 0}
                  step={
                    priceBounds.step ||
                    1000
                  }
                  value={
                    priceBounds.max
                      ? safeMax
                      : 0
                  }
                  onChange={(e) => {
                    const v = Number(
                      e.target.value
                    );

                    setMaxPrice(v);

                    if (v < safeMin) {
                      setMinPrice(v);
                    }

                    setPage(1);
                  }}
                  disabled={
                    !priceBounds.max
                  }
                  aria-label="Precio máximo"
                />
              </div>

              <div
                className="priceMinMax"
                aria-hidden="true"
              >
                <span>
                  {priceBounds.min
                    ? `${formatCOP(
                        priceBounds.min
                      )} COP`
                    : "—"}
                </span>

                <span>
                  {priceBounds.max
                    ? `${formatCOP(
                        priceBounds.max
                      )} COP`
                    : "—"}
                </span>
              </div>

              <div className="filtersNote">
                Agrega al carrito y
                contáctanos por WhatsApp.
              </div>
            </div>

            <div className="filtersDivider" />

            {/* ===== META ===== */}

            <div className="filtersMeta">
              <div className="filtersCount">
                Mostrando{" "}
                <strong>
                  {filtered.length}
                </strong>{" "}
                producto(s)
              </div>

              <div className="filtersSmall">
                Página{" "}
                <strong>
                  {safePage}
                </strong>{" "}
                de{" "}
                <strong>
                  {totalPages}
                </strong>
              </div>

              <div className="filtersSmall">
                Orden:{" "}
                <strong>
                  Precio (menor → mayor)
                </strong>
              </div>
            </div>

            {/* Mobile actions */}

            <div className="filtersActions">
              <button
                className="filtersApply"
                type="button"
                onClick={() =>
                  setFiltersOpen(false)
                }
              >
                Ver productos
              </button>

              <button
                className="filtersReset filtersResetWide"
                type="button"
                onClick={resetFilters}
              >
                Reset
              </button>
            </div>
          </div>
        </aside>

        {/* ====================================================
            PRODUCTS
            ==================================================== */}

        <div className="catalogRight">
          <div
            className="catalogGrid"
            role="list"
            aria-label="Productos"
          >
            {pagedItems.map((p) => {
              const url =
                p?.images?.[0]?.asset?.url;

              const stock =
                getStock(p);

              const canBuy =
                stock > 0 &&
                p?.available !== false;

              return (
                <article
                  key={p._id}
                  className="catalogCard"
                  role="listitem"
                >
                  {/* ===== IMAGE ===== */}

                  <div className="catalogMedia">
                    <button
                      className="catalogImgBtn"
                      type="button"
                      onClick={() =>
                        openProduct(p)
                      }
                      aria-label={`Ver ${p.title} en grande`}
                    >
                      {url ? (
                        <img
                          className="catalogImg"
                          src={url}
                          alt={p.title}
                          loading="lazy"
                        />
                      ) : (
                        <div className="catalogNoImg">
                          Sin imagen
                        </div>
                      )}
                    </button>
                  </div>

                  {/* ===== BODY ===== */}

                  <div className="catalogBody">
                    <div className="catalogTopRow">
                      <h3 className="catalogName">
                        {p.title}
                      </h3>
                    </div>

                    <p className="catalogDesc">
                      {p.description ||
                        "Descripción pendiente."}
                    </p>

                    <div className="catalogMetaRow">
                      <p className="catalogPrice">
                        <span>
                          Precio:
                        </span>{" "}

                        <strong>
                          {p?.price
                            ? `${formatCOP(
                                p.price
                              )} COP`
                            : "—"}
                        </strong>
                      </p>

                      <div
                        className="unitsInline"
                        aria-label="Unidades disponibles"
                      >
                        <span className="unitsLabel">
                          UN
                        </span>

                        <strong className="unitsValue">
                          {stock}
                        </strong>
                      </div>
                    </div>

                    <button
                      className="catalogBtn"
                      type="button"
                      disabled={!canBuy}
                      onClick={() =>
                        onAddToCart?.({
                          id: p._id,
                          title: p.title,
                          image: url || "",
                          price:
                            p.price ??
                            null,
                          stock,
                        })
                      }
                    >
                      {canBuy
                        ? "Añadir al carrito"
                        : "Agotado"}
                    </button>
                  </div>
                </article>
              );
            })}

            {pagedItems.length === 0 && (
              <div className="catalogEmpty">
                <strong>
                  No hay productos con esos
                  filtros.
                </strong>

                <span>
                  Prueba ampliando el rango
                  o cambiando el tipo.
                </span>

                <button
                  className="emptyBtn"
                  type="button"
                  onClick={resetFilters}
                >
                  Reset filtros
                </button>
              </div>
            )}
          </div>

          {/* ==================================================
              SMART PAGINATION
              ================================================== */}

          {totalPages > 1 && (
            <div
              className="pager"
              aria-label="Paginación"
            >
              {/* Previous */}

              <button
                className="pagerBtn"
                type="button"
                onClick={() =>
                  goTo(safePage - 1)
                }
                disabled={safePage <= 1}
                aria-label="Página anterior"
              >
                ← Anterior
              </button>

              {/* Numbers */}

              <div
                className="pagerNums"
                role="navigation"
                aria-label="Páginas del catálogo"
              >
                {paginationItems.map(
                  (item) => {
                    if (
                      item ===
                        "ellipsis-left" ||
                      item ===
                        "ellipsis-right"
                    ) {
                      return (
                        <span
                          key={item}
                          className="pagerDots"
                          aria-hidden="true"
                        >
                          …
                        </span>
                      );
                    }

                    return (
                      <button
                        key={item}
                        className={`pagerNum ${
                          item === safePage
                            ? "pagerActive"
                            : ""
                        }`}
                        type="button"
                        onClick={() =>
                          goTo(item)
                        }
                        aria-label={`Ir a página ${item}`}
                        aria-current={
                          item === safePage
                            ? "page"
                            : undefined
                        }
                      >
                        {item}
                      </button>
                    );
                  }
                )}
              </div>

              {/* Next */}

              <button
                className="pagerBtn"
                type="button"
                onClick={() =>
                  goTo(safePage + 1)
                }
                disabled={
                  safePage >= totalPages
                }
                aria-label="Página siguiente"
              >
                Siguiente →
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ======================================================
          MODAL / LIGHTBOX
          ====================================================== */}

      {open && (
        <>
          <div
            className="catalogModal"
            role="dialog"
            aria-modal="true"
            aria-label="Vista del producto"
          >
            <div className="catalogModalCard">
              {/* Modal header */}

              <div className="catalogModalHead">
                <div className="catalogModalHeadLeft">
                  <strong className="catalogModalTitle">
                    {activeProduct?.title}
                  </strong>
                </div>

                <button
                  className="catalogModalClose"
                  onClick={closeProduct}
                  aria-label="Cerrar"
                  type="button"
                >
                  ✕
                </button>
              </div>

              {/* Modal image */}

              <div className="catalogModalMedia">
                {bigUrl ? (
                  <img
                    className="catalogModalImg"
                    src={bigUrl}
                    alt={
                      activeProduct?.title ||
                      "Producto"
                    }
                  />
                ) : (
                  <div className="catalogModalNoImg">
                    Sin imagen
                  </div>
                )}

                <button
                  className="catalogNavLeft"
                  onClick={() =>
                    setActiveIndex((i) =>
                      Math.max(
                        0,
                        i - 1
                      )
                    )
                  }
                  aria-label="Anterior"
                  disabled={
                    safeIndex <= 0
                  }
                  type="button"
                >
                  ‹
                </button>

                <button
                  className="catalogNavRight"
                  onClick={() =>
                    setActiveIndex((i) =>
                      Math.min(
                        maxIndex,
                        i + 1
                      )
                    )
                  }
                  aria-label="Siguiente"
                  disabled={
                    safeIndex >=
                    maxIndex
                  }
                  type="button"
                >
                  ›
                </button>
              </div>

              {/* Modal body */}

              <div className="catalogModalBody">
                <p className="catalogModalDesc">
                  {activeProduct?.description ||
                    "Descripción pendiente."}
                </p>

                <div className="catalogModalMeta">
                  <p className="catalogModalPrice">
                    <span>
                      Precio:
                    </span>{" "}

                    <strong>
                      {formatCOP(
                        activeProduct?.price
                      )}{" "}
                      {activeProduct?.price
                        ? "COP"
                        : ""}
                    </strong>
                  </p>

                  <div
                    className="unitsInline unitsInlineModal"
                    aria-label="Unidades disponibles"
                  >
                    <span className="unitsLabel">
                      UN
                    </span>

                    <strong className="unitsValue">
                      {getStock(
                        activeProduct
                      )}
                    </strong>
                  </div>
                </div>

                <div className="catalogModalActions">
                  <button
                    className="catalogModalBtn"
                    type="button"
                    disabled={
                      !(
                        getStock(
                          activeProduct
                        ) > 0 &&
                        activeProduct
                          ?.available !==
                          false
                      )
                    }
                    onClick={() => {
                      const first =
                        activeProduct
                          ?.images?.[0]
                          ?.asset?.url ||
                        "";

                      const stock =
                        getStock(
                          activeProduct
                        );

                      onAddToCart?.({
                        id:
                          activeProduct
                            ?._id,

                        title:
                          activeProduct
                            ?.title,

                        image: first,

                        price:
                          activeProduct
                            ?.price ??
                          null,

                        stock,
                      });

                      closeProduct();
                    }}
                  >
                    {getStock(
                      activeProduct
                    ) > 0 &&
                    activeProduct
                      ?.available !==
                      false
                      ? "Añadir al carrito"
                      : "Agotado"}
                  </button>

                  <button
                    className="catalogModalGhost"
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
            className="catalogBackdrop"
            onClick={closeProduct}
            aria-label="Cerrar vista"
            type="button"
          />
        </>
      )}
    </main>
  );
}