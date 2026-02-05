import { useEffect, useState } from "react";
import { sanity } from "../../sanityClient";

export default function SanityTestSection() {
  const [items, setItems] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    sanity
      .fetch(`
        *[_type == "product"] | order(_createdAt desc){
          _id,
          title,
          images[]{
            asset->{
              url
            }
          }
        }
      `)
      .then(setItems)
      .catch((err) => {
        console.error("Sanity fetch error:", err);
        setErrorMsg("No pude leer productos desde Sanity.");
      });
  }, []);

  return (
    <section style={{ padding: "32px", borderTop: "1px solid #ddd" }}>
      <h2 style={{ marginBottom: "20px" }}>Sanity Test (potencial real)</h2>

      {errorMsg && <p>{errorMsg}</p>}
      {!errorMsg && items.length === 0 && <p>Cargando...</p>}

      <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
        {items.map((p) => {
          const url = p?.images?.[0]?.asset?.url;

          return (
            <div
              key={p._id}
              style={{
                width: "220px",
                border: "1px solid #e5e5e5",
                borderRadius: "12px",
                overflow: "hidden",
                background: "#fff",
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
              }}
            >
              {url ? (
                <img
                  src={url}
                  alt={p.title}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "180px",
                    display: "grid",
                    placeItems: "center",
                    background: "#f2f2f2",
                    color: "#666",
                    fontSize: "14px",
                  }}
                >
                  Sin imagen
                </div>
              )}

              <div style={{ padding: "12px", textAlign: "center" }}>
                <strong>{p.title}</strong>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
