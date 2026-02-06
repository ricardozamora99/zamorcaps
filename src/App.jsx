import "./App.css";
import { useEffect, useMemo, useState } from "react";
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
  // cartItems: [{ id, title, image, qty, price? }]

  const closeMenu = () => {
    setMenuOpen(false);
    setCatalogOpen(false);
  };

  const closeAll = () => {
    closeMenu();
    setCartOpen(false);
  };

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
    // product: { id, title, image, price? }
    setCartItems((prev) => {
      const idx = prev.findIndex((x) => x.id === product.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: (copy[idx].qty || 1) + 1 };
        return copy;
      }
      return [...prev, { ...product, qty: 1 }];
    });

    // UX: abrir carrito al añadir
    setCartOpen(true);
  };

  const setQty = (id, nextQty) => {
    setCartItems((prev) => {
      const q = Math.max(0, Number(nextQty || 0));
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

        <Route
          path="/catalogo"
          element={<CatalogPage onAddToCart={addToCart} />}
        />
      </Routes>

      <Footer />
    </>
  );
}
