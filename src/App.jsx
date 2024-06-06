import ButtonGradient from "./assets/svg/ButtonGradient";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";

const App = () => {
  return (
    <>
      <div className="pt-[0rem] lg:pt-[5.25rem] overflow-hidden">
        {/*<Header />*/}
        <Hero />
        {/*<Footer />*/}
      </div>

      <ButtonGradient />
    </>
  );
};

export default App;
