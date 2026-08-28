import "./hero.css";

function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-container">
        <div className="hero-text">
          <h1>
            MOCOTÓ
            <span>DA ROSINHA</span>
          </h1>

          <p className="tagline">Sabor que é raiz! ♡</p>

          <p className="description">
            Mocotó caseiro, caprichado e preparado com aquele sabor que
            abraça.
          </p>

          <p className="sides">🍚 Acompanha arroz, pirão, limão e farinha</p>

          <div className="info">
            <div>
              <strong>📅 SÁBADOS E DOMINGOS</strong>
              <small>Das 11:00 às 15:00</small>
            </div>
            <div>
              <strong>🛵 DELIVERY E RETIRADA</strong>
              <small>Peça onde estiver</small>
            </div>
          </div>

          <div className="hero-buttons">
            <a
              className="btn-primary"
              href="https://www.ifood.com.br/delivery/sao-luis-ma/mocoto-da-rosinha-joao-paulo/36e9d49b-e6c4-4060-af50-6d95c3bce4c1"
              target="_blank"
              rel="noreferrer"
            >
              🛵 PEDIR PELO IFOOD <span>→</span>
            </a>
            <a className="btn-outline" href="#tamanhos">
              📖 CONHECER O CARDÁPIO
            </a>
          </div>
        </div>
      </div>

      <a
        href="#tamanhos"
        className="scroll-indicator"
        aria-label="Rolar para a próxima seção"
      >
        ⌄
      </a>
    </section>
  );
}

export default Hero;
