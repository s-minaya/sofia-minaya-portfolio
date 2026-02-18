import "../../styles/Navigation/MenuButton.scss";

function MenuButton({ onClick, isMenuOpen }) {
  return (
    <button
      className="menu-button"
      onClick={onClick}
      aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
      aria-expanded={isMenuOpen}
    >
      <span className="menu-button__icon" aria-hidden="true">
        <span className="menu-button__icon-bar" />
      </span>
      <span className="menu-button__text">Menu</span>
    </button>
  );
}

export default MenuButton;