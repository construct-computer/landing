import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FrameSequence from "./components/FrameSequence";
import Features from "./components/Features";
import Integrations from "./components/Integrations";
import BentoGrid from "./components/BentoGrid";
import CtaSection from "./components/CtaSection";
import Footer from "./components/Footer";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";

function HomePage() {
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsConditions />} />
    </Routes>
  );
}

export default App;
