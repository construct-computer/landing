import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FrameSequence from "./components/FrameSequence";
import Features from "./components/Features";
import Integrations from "./components/Integrations";
import BentoGrid from "./components/BentoGrid";
import CtaSection from "./components/CtaSection";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <FrameSequence />
        <Features />
        <Integrations />
        <BentoGrid />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
