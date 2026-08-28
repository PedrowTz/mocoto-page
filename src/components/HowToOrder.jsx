import { Fragment } from "react";
import "./HowToOrder.css";

const steps = [
  {
    number: 1,
    icon: "🥘",
    title: "ESCOLHA O TAMANHO",
    text: "Escolha o tamanho ideal para você e sua família.",
  },
  {
    number: 2,
    icon: "📱",
    title: "FAÇA SEU PEDIDO",
    text: "Peça pelo iFood de forma rápida e segura.",
  },
  {
    number: 3,
    icon: "🏠",
    title: "RECEBA OU RETIRE",
    text: "Receba em casa ou retire no local combinado.",
  },
];

function HowToOrder() {
  return (
    <section className="how-to-order" id="como-pedir">
      <h2>
        <span className="arrow">→</span> COMO PEDIR? <span className="arrow">←</span>
      </h2>

      <div className="steps-container">
        {steps.map((step, i) => (
          <Fragment key={step.number}>
            <div className="step">
              <div className="step-number">{step.number}</div>
              <div className="step-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
            {i < steps.length - 1 && <span className="step-arrow">→</span>}
          </Fragment>
        ))}
      </div>
    </section>
  );
}

export default HowToOrder;
