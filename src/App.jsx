





import "./App.css";

import { useState, useEffect } from "react";

import CatalogSection from "./Catalog/CatalogSection";
import RecommendationsSection from "./sections/Recommendations/RecommendationsSection";
import HowToBuySection from "./sections/HowToBuy/HowToBuySection";
import ContactSection from "./sections/Contact/ContactSection";
import HeroSection from "./sections/Hero/HeroSection";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";





function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
    setCatalogOpen(false);
  };

  // Si agrandas pantalla, cierra menú móvil y submenú
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

  return (
    <>
      {/* NAVBAR */}
<Navbar
  menuOpen={menuOpen}
  catalogOpen={catalogOpen}
  closeMenu={closeMenu}
  setMenuOpen={setMenuOpen}
  setCatalogOpen={setCatalogOpen}
/>

<main>
      {/* HERO */}
<HeroSection closeMenu={closeMenu} />


      {/* CATÁLOGO */}
<CatalogSection />


      {/* RECOMENDACIONES */}
<RecommendationsSection />


      {/* CÓMO COMPRAR */}
<HowToBuySection />


      {/* CONTACTO */}
<ContactSection />
</main>

<Footer />

    </>
  );
}

export default App;
