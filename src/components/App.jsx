import "../styles/App.scss";
import Hero from "./Home/Hero";
import PageLoader from "./Loader/PageLoader";

function App() {
  return (
    <>
      <PageLoader />
      <Hero />
    </>
  );
}

export default App;
