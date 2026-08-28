import "./Sizes.css";

const sizes = [
  { label: "500ML", people: "Serve 2 pessoas" },
  { label: "750ML", people: "Serve 3 pessoas" },
  { label: "1000ML", people: "Serve 4 pessoas" },
  { label: "1500ML", people: "Serve 5+ pessoas" },
];

function Sizes() {
  return (
    <section className="sizes" id="tamanhos">
      <h2>
        <span className="arrow">→</span> ESCOLHA SEU{" "}
        <span>TAMANHO</span> <span className="arrow">←</span>
      </h2>

      <div className="sizes-container">
        {sizes.map((size) => (
          <div className="size-card" key={size.label}>
            <img
              src="/img/mocoto-potes.jpg"
              alt={`Pote de Mocotó ${size.label}`}
            />
            <h3>{size.label}</h3>
            <p>{size.people}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Sizes;
