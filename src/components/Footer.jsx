import "./Footer.css";

function Footer() {
  return (
    <footer className="site-footer" id="contato">
      <div className="footer-container">
        <div className="footer-item">
          <span className="footer-icon">📍</span>
          <div>
            <strong>ONDE ESTAMOS</strong>
            <small>São Luís - MA</small>
            <small>Retirada no local (Bairro João Paulo)</small>
          </div>
        </div>

        <div className="footer-item">
          <span className="footer-icon">📅</span>
          <div>
            <strong>DIAS DE FUNCIONAMENTO</strong>
            <small>Sábado e Domingo</small>
            <small>Das 11:00 às 15:00</small>
          </div>
        </div>

        <div className="footer-item">
          <span className="footer-icon">🛵</span>
          <div>
            <strong>DELIVERY</strong>
            <small>Via iFood e retirada</small>
          </div>
        </div>

        <div className="footer-item">
          <span className="footer-icon">💬</span>
          <div>
            <strong>FALE CONOSCO</strong>
            <a
              className="footer-whatsapp"
              href="https://wa.me/5598984252023?text=Ol%C3%A1%2C%20quero%20fazer%20um%20pedido%21"
              target="_blank"
              rel="noreferrer"
            >
              (98) 98425-2023 WhatsApp
            </a>
          </div>
        </div>
      </div>

      <a
        className="footer-cta"
        href="https://www.ifood.com.br/delivery/sao-luis-ma/mocoto-da-rosinha-joao-paulo/36e9d49b-e6c4-4060-af50-6d95c3bce4c1"
        target="_blank"
        rel="noreferrer"
      >
        🛵 PEDIR AGORA PELO IFOOD
      </a>

      <p className="footer-credits">Criado por: João Pedro</p>
    </footer>
  );
}

export default Footer;
