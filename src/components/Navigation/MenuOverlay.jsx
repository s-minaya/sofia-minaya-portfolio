import { useEffect } from "react";
import "../../styles/Navigation/MenuOverlay.scss";

const MENU_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
];

function MenuOverlay({ isOpen, onClose, onNavigate }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  return (
    <div className={`menu-overlay ${isOpen ? "menu-overlay--visible" : ""}`}>
      <button
        className="menu-overlay__close"
        onClick={onClose}
        aria-label="Cerrar menú"
      >
        <span className="menu-overlay__close-icon" />
        Close
      </button>
      <nav className="menu-overlay__nav">
        <ul className="menu-overlay__list">
          {MENU_ITEMS.map((item, index) => (
            <li
              key={item.label}
              className="menu-overlay__item"
              style={{ "--item-index": index }}
            >
              <a
                href={item.href}
                className="menu-overlay__link"
                onClick={(e) => {
                  e.preventDefault();
                  if (onNavigate) onNavigate(item.href.replace("#", ""));
                  onClose();
                }}
              >
                {/* Punto que aparece al hover y "empuja" el texto */}
                <span className="menu-overlay__dot" aria-hidden="true"></span>
                <span className="menu-overlay__text-inner">
                  {item.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default MenuOverlay;