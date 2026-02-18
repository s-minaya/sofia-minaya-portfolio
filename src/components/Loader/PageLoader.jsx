import "../../styles/Loader/PageLoader.scss";
import usePageLoader from "../../hooks/usePageLoader";

function PageLoader() {
  const { displayedText, phase } = usePageLoader();

  if (phase === "done") return null;

  return (
    <div className="page-loader" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`page-loader__block page-loader__block--${i}${
            phase === "exit" ? " page-loader__block--exit" : ""
          }`}
        >
          {i === 1 && (
            <span className="page-loader__text">
              {displayedText}
              <span className="page-loader__cursor" />
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export default PageLoader;