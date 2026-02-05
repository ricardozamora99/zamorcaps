import { useRef } from "react";
import styles from "./CatalogSlider.module.css";

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

    const card = el.querySelector(`.${styles.card}`);
    const cardW = card ? card.getBoundingClientRect().width : 260;
    const gap = 18;
    el.scrollBy({ left: dir * (cardW * 2 + gap * 2), behavior: "smooth" });
  };

  return (
    <div className={styles.slider}>
      <button
        className={`${styles.arrow} ${styles.left}`}
        onClick={() => scrollByCards(-1)}
        aria-label="Anterior"
      >
        ‹
      </button>

      <div className={styles.track} ref={trackRef}>
        {items.map((it, idx) => (
          <article className={styles.card} key={idx}>
            <div className={styles.imgWrap}>
              {it.href ? (
                <a href={it.href} target="_blank" rel="noopener noreferrer">
                  <ImgWithFallback srcs={it.img} alt={`Producto ${idx + 1}`} />
                </a>
              ) : (
                <ImgWithFallback srcs={it.img} alt={`Producto ${idx + 1}`} />
              )}
            </div>

            {(it.talla || it.tipo) && (
              <div className={styles.meta}>
                {it.talla && (
                  <div>
                    <strong>Talla:</strong> {it.talla}
                  </div>
                )}
                {it.tipo && (
                  <div>
                    <strong>Tipo:</strong> {it.tipo}
                  </div>
                )}
              </div>
            )}
          </article>
        ))}
      </div>

      <button
        className={`${styles.arrow} ${styles.right}`}
        onClick={() => scrollByCards(1)}
        aria-label="Siguiente"
      >
        ›
      </button>
    </div>
  );
}
