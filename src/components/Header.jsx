import { useState } from "react";
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

  return (
    <header className="site-header">
      <div className="header-container">
        <a href="#inicio" className="brand" onClick={close}>
          <img src="/img/logo.jpg" alt="Mocotó da Rosinha" className="brand-logo" />
        </a>

        <nav className={`nav ${open ? "nav-open" : ""}`}>
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
          className={`hamburger ${open ? "hamburger-open" : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menu"
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
