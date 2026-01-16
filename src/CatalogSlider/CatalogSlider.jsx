import { useRef } from "react";

function ImgWithFallback({ srcs, alt }) {
  const first = Array.isArray(srcs) ? srcs[0] : srcs;

  const handleError = (e) => {
    if (!Array.isArray(srcs)) return;

    const imgEl = e.currentTarget;
    const i = Number(imgEl.dataset.i || "0");
    const next = i + 1;

    if (next < srcs.length) {
      imgEl.dataset.i = String(next);
      imgEl.src = srcs[next];
    }
  };

  return (
    <img
      src={first}
      alt={alt}
      data-i="0"
      onError={handleError}
      loading="lazy"
    />
  );
}

export default function CatalogSlider({ items }) {
  const trackRef = useRef(null);

  const scrollByCards = (dir = 1) => {
    const el = trackRef.current;
    if (!el) return;

    const card = el.querySelector(".catalog-card");
    const cardW = card ? card.getBoundingClientRect().width : 260;
    const gap = 18;
    el.scrollBy({ left: dir * (cardW * 2 + gap * 2), behavior: "smooth" });
  };

  return (
    <div className="catalog-slider">
      <button className="catalog-arrow left" onClick={() => scrollByCards(-1)} aria-label="Anterior">
        ‹
      </button>

      <div className="catalog-track" ref={trackRef}>
        {items.map((it, idx) => (
          <article className="catalog-card" key={idx}>
            <div className="catalog-img">
              {it.href ? (
                <a href={it.href} target="_blank" rel="noopener noreferrer">
                  <ImgWithFallback srcs={it.img} alt={`Producto ${idx + 1}`} />
                </a>
              ) : (
                <ImgWithFallback srcs={it.img} alt={`Producto ${idx + 1}`} />
              )}
            </div>

            {(it.talla || it.tipo) && (
              <div className="catalog-meta">
                {it.talla && <div><strong>Talla:</strong> {it.talla}</div>}
                {it.tipo && <div><strong>Tipo:</strong> {it.tipo}</div>}
              </div>
            )}
          </article>
        ))}
      </div>

      <button className="catalog-arrow right" onClick={() => scrollByCards(1)} aria-label="Siguiente">
        ›
      </button>
    </div>
  );
}
