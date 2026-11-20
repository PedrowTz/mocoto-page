import "./App.css";
import Header from "./components/Header";
import Story from "./components/Story";
import Sizes from "./components/Sizes";
import Features from "./components/Features";
import HowToOrder from "./components/HowToOrder";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import FloatingOrder from "./components/FloatingOrder";

function App() {
  return (
    <>
      <Header />

      <main>
        <Story />
        <Sizes />
        <Features />
        <HowToOrder />
        <Testimonials />
      </main>

      <Footer />
      <FloatingOrder />
    </>
  );
}

export default App;
