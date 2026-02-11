import "./App.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

import HeroSection from "./sections/Hero/HeroSection";
import AboutSection from "./sections/About/AboutSection";
import CatalogSection from "./sections/Catalog/CatalogSection";
import RecommendationsSection from "./sections/Recommendations/RecommendationsSection";
import HowToBuySection from "./sections/HowToBuy/HowToBuySection";
import ContactSection from "./sections/Contact/ContactSection";
import Footer from "./components/Footer/Footer";

import CatalogPage from "./pages/Catalog/CatalogPage";

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;

export default function App() {
  const { pathname } = useLocation();
  const isCatalogPage = pathname === "/catalogo";

  const [menuOpen, setMenuOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);

  // Carrito global
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  // cartItems: [{ id, title, image, qty, price?, stock?, productId? }]

  // ✅ Toast global para mostrar en Navbar cuando hay límite
  const [cartToast, setCartToast] = useState("");
  const toastTimerRef = useRef(null);

  const showCartToast = (msg) => {
    setCartToast(msg);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setCartToast(""), 2200);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setCatalogOpen(false);
  };

  const closeAll = () => {
    closeMenu();
    setCartOpen(false);
  };

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900) {
        setMenuOpen(false);
        setCatalogOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const cartCount = useMemo(
    () => cartItems.reduce((acc, it) => acc + (it.qty || 0), 0),
    [cartItems]
  );

  const addToCart = (product) => {
    // product: { id, title, image, price?, stock?, productId? }
    setCartItems((prev) => {
      const idx = prev.findIndex((x) => x.id === product.id);

      const incomingStock = Number(product?.stock);
      const hasStock = Number.isFinite(incomingStock);
      const limit = hasStock ? Math.max(0, incomingStock) : null;

      if (idx >= 0) {
        const copy = [...prev];
        const current = copy[idx];
        const nextQty = (current.qty || 1) + 1;

        if (limit !== null && nextQty > limit) {
          showCartToast(`No puedes agregar más. Stock disponible: ${limit}`);
          return prev;
        }

        copy[idx] = {
          ...current,
          // por si el stock llega ahora y antes no existía
          stock: limit !== null ? limit : current.stock,
          productId: product.productId ?? current.productId ?? null,
          qty: nextQty,
        };
        return copy;
      }

      const initialQty = 1;
      if (limit !== null && initialQty > limit) {
        showCartToast(`No disponible. Stock: ${limit}`);
        return prev;
      }

      return [
        ...prev,
        {
          ...product,
          stock: limit !== null ? limit : product.stock,
          qty: 1,
        },
      ];
    });

    // UX: abrir carrito al añadir
    setCartOpen(true);
  };

  const setQty = (id, nextQty) => {
    setCartItems((prev) => {
      const qRaw = Math.max(0, Number(nextQty || 0));
      const item = prev.find((x) => x.id === id);
      if (!item) return prev;

      const s = Number(item?.stock);
      const hasStock = Number.isFinite(s);
      const limit = hasStock ? Math.max(0, s) : null;

      const q = limit !== null ? Math.min(qRaw, limit) : qRaw;

      if (limit !== null && qRaw > limit) {
        showCartToast(`No puedes agregar más. Stock disponible: ${limit}`);
      }

      if (q === 0) return prev.filter((x) => x.id !== id);
      return prev.map((x) => (x.id === id ? { ...x, qty: q } : x));
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((x) => x.id !== id));
  };

  const buildWhatsAppUrl = () => {
    const lines = [
      "Hola Zamor Caps 👋",
      "",
      "Quisiera cotizar el precio y disponibilidad de:",
      "",
      ...cartItems.map((it) => `• ${it.title}  x${it.qty}`),
      "",
      "Gracias 🙌",
    ];
    const text = encodeURIComponent(lines.join("\n"));
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
  };

  return (
    <>
      <Navbar
        variant={isCatalogPage ? "catalog" : "home"}
        menuOpen={menuOpen}
        catalogOpen={catalogOpen}
        closeMenu={closeMenu}
        setMenuOpen={setMenuOpen}
        setCatalogOpen={setCatalogOpen}
        // carrito
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        cartItems={cartItems}
        cartCount={cartCount}
        setQty={setQty}
        removeFromCart={removeFromCart}
        buildWhatsAppUrl={buildWhatsAppUrl}
        closeAll={closeAll}
        // ✅ toast
        cartToast={cartToast}
      />

      <Routes>
        <Route
          path="/"
          element={
            <main>
              <HeroSection closeMenu={closeAll} />
              <AboutSection />
              <CatalogSection onAddToCart={addToCart} />
              <RecommendationsSection />
              <HowToBuySection />
              <ContactSection />
            </main>
          }
        />

        <Route path="/catalogo" element={<CatalogPage onAddToCart={addToCart} />} />
      </Routes>

      <Footer />
    </>
  );
}
