import { useEffect, useState } from "react";
import "./Header.css";

const links = [
  { href: "#inicio", label: "INÍCIO" },
  { href: "#tamanhos", label: "CARDÁPIO" },
  { href: "#sobre", label: "SOBRE" },
  { href: "#como-pedir", label: "COMO PEDIR" },
  { href: "#contato", label: "CONTATO" },
];

function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  // Com o menu aberto no celular: trava a rolagem do fundo e fecha com Esc
  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="header-container">
        <a href="#inicio" className="brand" onClick={close}>
          <img src="/img/recortes/logo.webp" alt="Mocotó da Rosinha" className="brand-logo" />
        </a>

        <nav className={`nav ${open ? "nav-open" : ""}`}>
          <button type="button" className="nav-back" onClick={close}>
            ← VOLTAR
          </button>

          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className={i === 0 ? "active" : ""}
              onClick={close}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className={`hamburger ${open ? "hamburger-open" : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}

export default Header;
