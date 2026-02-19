import { useEffect, useRef } from "react";
import "../../styles/Footer/Footer.scss";

const MENU_ITEMS = [
  { label: "Home",  href: "#home"  },
  { label: "Work",  href: "#work"  },
  { label: "About", href: "#about" },
];

const CONTACT_ITEMS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sofia-minaya", external: true  },
  { label: "Github",   href: "https://github.com/s-minaya",              external: true  },
  { label: "Email",    href: "mailto:minaya.sofia@gmail.com",             external: false },
];

function Footer({ onNavigate }) {
  const footerRef = useRef(null);

useEffect(() => {
  const footer = footerRef.current;
  if (!footer) return;

  footer.style.opacity = "0";

  const update = () => {
    const scrollY   = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const ZONE      = 600;
    const start     = Math.max(0, maxScroll - ZONE);
    const progress  = Math.min(1, Math.max(0, (scrollY - start) / ZONE));

    footer.style.opacity = progress;
  };

  window.addEventListener("scroll", update, { passive: true });
  update();
  return () => window.removeEventListener("scroll", update);
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