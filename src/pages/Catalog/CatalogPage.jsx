import { useEffect, useMemo, useState } from "react";
import { sanity } from "../../sanityClient";
import "./CatalogPage.css";

export default function CatalogPage({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    sanity
      .fetch(`
        *[_type == "product"] | order(_createdAt desc){
          _id,
          title,
          description,
          available,
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
    if (value === undefined || value === null || Number.isNaN(value)) return "—";
    return new Intl.NumberFormat("es-CO").format(value);
  };

  const availableProducts = useMemo(() => {
    return (products || []).filter((p) => p?.available !== false);
  }, [products]);

  return (
    <main className="catalogPage">
      <header className="catalogHead">
        <h1 className="catalogTitle">Catálogo completo</h1>
        <p className="catalogSub">Aquí están todos los productos disponibles.</p>
      </header>

      {errorMsg && <p className="catalogError">{errorMsg}</p>}
      {!errorMsg && products.length === 0 && (
        <p className="catalogLoading">Cargando productos...</p>
      )}

      <div className="catalogGrid">
        {availableProducts.map((p) => {
          const url = p?.images?.[0]?.asset?.url;
          const isAvailable = p?.available !== false;

          return (
            <article key={p._id} className="catalogCard">
              <div className="catalogMedia">
                {url ? (
                  <img className="catalogImg" src={url} alt={p.title} loading="lazy" />
                ) : (
                  <div className="catalogNoImg">Sin imagen</div>
                )}
              </div>

              <div className="catalogBody">
                <h3 className="catalogName">{p.title}</h3>
                <p className="catalogDesc">{p.description || "Descripción pendiente."}</p>

                <p className="catalogPrice">
                  <span>Precio:</span> <strong>{formatCOP(p.price)} {p.price ? "COP" : ""}</strong>
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
      </div>
    </main>
  );
}
