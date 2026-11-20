import { IFOOD_URL, WHATSAPP_URL } from "../links";
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
              href={WHATSAPP_URL}
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
        href={IFOOD_URL}
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
