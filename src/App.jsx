import "./App.css";
import Header from "./components/Header";
import Hero from "./components/hero";
import Sizes from "./components/Sizes";
import Favorite from "./components/Favorite";
import Features from "./components/Features";
import HowToOrder from "./components/HowToOrder";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <Sizes />
        <Favorite />
        <Features />
        <HowToOrder />
        <Testimonials />
      </main>

      <Footer />
    </>
  );
}

export default App;
