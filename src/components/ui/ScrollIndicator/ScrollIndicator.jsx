import "../../../styles/ui/ScrollIndicator/ScrollIndicator.scss";

function ScrollIndicator() {
  return (
    <div className="scroll-indicator" aria-label="Scroll hacia abajo">
      <div className="scroll-indicator__track">
        <div className="scroll-indicator__dot" />
      </div>
    </div>
  );
}

export default ScrollIndicator;