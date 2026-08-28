import "./Favorite.css";

function Favorite() {
  return (
    <section className="favorite" id="sobre">
      <div className="favorite-image">
        <img src="/img/mocoto-prato.jpg" alt="Prato de Mocotó da Rosinha" />
      </div>

      <div className="favorite-text">
        <h2>
          O QUERIDINHO <span>DA ROSINHA</span> ♡
        </h2>
        <p>
          Feito com ingredientes selecionados, temperado na medida certa e
          cozido com tempo e carinho.
        </p>
        <p className="highlight">Experimente e apaixone-se!</p>
      </div>
    </section>
  );
}

export default Favorite;
