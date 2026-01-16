import gorraMain from "../../Images/gorraMain.png";

export default function HeroSection({ closeMenu }) {
  return (
    <section id="inicio" className="hero-container">
      <div className="hero-content">
        <h1 className="hero-title">
          ESTILO <span className="text-danger">QUE QUEMA.</span>
          <br />
          CALIDAD QUE PERDURA.
        </h1>
        <p className="hero-subtitle">
          Descubre la colección exclusiva de gorras con diseño premium hechas en
          Colombia.
        </p>
<a
  href="https://drive.google.com/drive/folders/19QsZ9V0THpxjEcf9RHdYEYg8-zgPJx3h?usp=sharing"
  className="btn-primary"
  target="_blank"
  rel="noreferrer"
  onClick={closeMenu}
>
  VER CATÁLOGO
</a>

      </div>

      <div className="hero-visual">
        <img src={gorraMain} className="hero-product-img" alt="Gorra Red Flame" />
        <div className="hero-blob"></div>
      </div>
    </section>
  );
}
