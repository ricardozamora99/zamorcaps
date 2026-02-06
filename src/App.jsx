import "./App.css";
import { useEffect, useMemo, useState } from "react";

import Navbar from "./components/Navbar/Navbar";
import HeroSection from "./sections/Hero/HeroSection";
import AboutSection from "./sections/About/AboutSection";
import CatalogSection from "./sections/Catalog/CatalogSection";
import RecommendationsSection from "./sections/Recommendations/RecommendationsSection";
import HowToBuySection from "./sections/HowToBuy/HowToBuySection";
import ContactSection from "./sections/Contact/ContactSection";
import Footer from "./components/Footer/Footer";

// PON AQUÍ TU NÚMERO (formato internacional sin + ni espacios)
// Colombia ejemplo: 573001112233
const WHATSAPP_NUMBER = "573157270599";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);

  // Carrito (wishlist) global
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]); 
  // cartItems: [{ id, title, image, qty }]

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
    // product: { id, title, image }
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

      <main>
        <HeroSection />
        <AboutSection />

        <CatalogSection onAddToCart={addToCart} />

        <RecommendationsSection />
        <HowToBuySection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
