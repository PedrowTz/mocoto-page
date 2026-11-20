import { useLayoutEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IFOOD_URL } from "../links";
import "./FloatingOrder.css";

/* Botão flutuante do iFood: aparece depois da primeira cena
   e some quando o rodapé (que já tem o botão grande) entra na tela. */

function FloatingOrder() {
  const [pastHero, setPastHero] = useState(false);
  const [atFooter, setAtFooter] = useState(false);

  useLayoutEffect(() => {
    const hero = ScrollTrigger.create({
      trigger: "#inicio",
      start: () => `top+=${window.innerHeight * 0.6} top`,
      onToggle: (self) => setPastHero(self.isActive),
      end: "max",
    });

    const footer = ScrollTrigger.create({
      trigger: "#contato",
      start: "top bottom",
      onToggle: (self) => setAtFooter(self.isActive),
      end: "max",
    });

    return () => {
      hero.kill();
      footer.kill();
    };
  }, []);

  const visible = pastHero && !atFooter;

  return (
    <a
      className={`floating-order ${visible ? "is-visible" : ""}`}
      href={IFOOD_URL}
      target="_blank"
      rel="noreferrer"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
    >
      <span className="floating-order-icon">🛵</span>
      <span className="floating-order-text">PEDIR NO IFOOD</span>
    </a>
  );
}

export default FloatingOrder;
