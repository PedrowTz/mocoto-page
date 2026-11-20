import "./Features.css";

const features = [
  {
    icon: "🍲",
    title: "RECEITA CASEIRA",
    text: "Sabor tradicional que lembra comida de mãe.",
  },
  {
    icon: "🌿",
    title: "INGREDIENTES SELECIONADOS",
    text: "Tudo fresquinho para garantir o melhor sabor.",
  },
  {
    icon: "❤️",
    title: "FEITO COM CARINHO",
    text: "Cada pedido é preparado com muito amor.",
  },
  {
    icon: "🛵",
    title: "DELIVERY RÁPIDO",
    text: "Levamos até você com todo cuidado.",
  },
];

function Features() {
  return (
    <section className="features" id="sobre">
      <div className="features-container">
        {features.map((f) => (
          <div className="feature-card" key={f.title}>
            <span className="feature-icon">{f.icon}</span>
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
