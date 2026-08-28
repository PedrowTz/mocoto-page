import "./Testimonials.css";

const testimonials = [
  {
    text: "Sabor incrível! O melhor mocotó que já comi.",
    name: "Juliana S.",
    initial: "J",
  },
  {
    text: "Tudo sempre fresquinho e bem temperado. Recomendo!",
    name: "Carlos A.",
    initial: "C",
  },
  {
    text: "Virou tradição aqui em casa todo final de semana!",
    name: "Mariana L.",
    initial: "M",
  },
];

function Testimonials() {
  return (
    <section className="testimonials">
      <h2>
        <span className="arrow">→</span> O QUE NOSSOS CLIENTES{" "}
        <span>DIZEM</span> <span className="arrow">←</span>
      </h2>

      <div className="testimonials-container">
        {testimonials.map((t) => (
          <div className="testimonial-card" key={t.name}>
            <div className="stars">★★★★★</div>
            <p>"{t.text}"</p>
            <div className="testimonial-author">
              <span className="avatar">{t.initial}</span>
              {t.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
