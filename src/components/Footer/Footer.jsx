import { useEffect, useRef } from "react";
import "../../styles/Footer/Footer.scss";
import { MENU_ITEMS } from "../../config/navigation";
import { CONTACT_ITEMS } from "../../config/contacts";

// contact items moved to config/contacts.js

function Footer({ onNavigate }) {
  const footerRef = useRef(null);

useEffect(() => {
  const footer = footerRef.current;
  if (!footer) return;

  // Estado inicial invisible y estrecho
  footer.style.opacity = "0";
  footer.style.width = getStartWidth();

  function getStartWidth() {
    const w = window.innerWidth;
    if (w < 768)  return "85vw";
    if (w < 1200) return "55vw";
    return "35vw";
  }

  const update = () => {
    const scrollY   = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const ZONE      = 600;
    const start     = Math.max(0, maxScroll - ZONE);
    const progress  = Math.min(1, Math.max(0, (scrollY - start) / ZONE));

    const w = window.innerWidth;
    const startVw = w < 768 ? 85 : w < 1200 ? 55 : 35;
    const currentVw = startVw + (100 - startVw) * progress;

    footer.style.opacity = progress;
    footer.style.width   = `${currentVw}vw`;
  };

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update, { passive: true }); // recalcula si cambia viewport
  update();
  return () => {
    window.removeEventListener("scroll", update);
    window.removeEventListener("resize", update);
  };
}, []);

  const handleMenuClick = (e, href) => {
    e.preventDefault();
    if (onNavigate) onNavigate(href.replace("#", ""));
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (onNavigate) onNavigate("home");
  };

  return (
    <footer ref={footerRef} className="footer" aria-label="Footer">
      <div className="footer__initials" aria-hidden="true">S.M.</div>

      <div className="footer__cols">
        <nav className="footer__col" aria-label="Menú footer">
          <span className="footer__col-title">Menu</span>
          <ul className="footer__col-list">
            {MENU_ITEMS.map(({ label, href }) => (
              <li key={label}>
                <a href={href} className="footer__link" onClick={(e) => handleMenuClick(e, href)}>
                  <span className="footer__link-dot" aria-hidden="true" />
                  <span className="footer__link-text">{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer__col" aria-label="Contacto footer">
          <span className="footer__col-title">Contact</span>
          <ul className="footer__col-list">
            {CONTACT_ITEMS.map(({ label, href, external }) => (
              <li key={label}>
                <a
                  href={href}
                  className="footer__link"
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <span className="footer__link-dot" aria-hidden="true" />
                  <span className="footer__link-text">{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="footer__back">
        <span className="footer__back-label">Back to top</span>
        <button className="footer__back-btn" onClick={handleBackToTop} aria-label="Volver al inicio">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      </div>
    </footer>
  );
}

export default Footer;