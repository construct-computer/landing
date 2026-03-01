import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FrameSequence from "./components/FrameSequence";
import Features from "./components/Features";
import Integrations from "./components/Integrations";
import BentoGrid from "./components/BentoGrid";
import CtaSection from "./components/CtaSection";
import Footer from "./components/Footer";

function App() {
  const [ready, setReady] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";

    const video = document.createElement("video");
    video.src = "/scroll.mp4";
    video.muted = true;
    video.preload = "auto";

    const onProgress = () => {
      if (!video.duration || !video.buffered.length) return;
      const buffered = video.buffered.end(video.buffered.length - 1);
      setProgress(buffered / video.duration);
    };

    const onReady = () => {
      setProgress(1);
      setFadeOut(true);
      setTimeout(() => {
        setReady(true);
        document.body.style.overflow = "";
      }, 600);
      cleanup();
    };

    // Fallback timeout — don't block forever
    const timeout = setTimeout(onReady, 15000);

    const cleanup = () => {
      clearTimeout(timeout);
      video.removeEventListener("canplaythrough", onReady);
      video.removeEventListener("progress", onProgress);
      video.pause();
      video.removeAttribute("src");
      video.load();
    };

    video.addEventListener("progress", onProgress);
    video.addEventListener("canplaythrough", onReady);

    return cleanup;
  }, []);

  return (
    <div className="bg-black min-h-screen">
      {/* Full-screen loader */}
      {!ready && (
        <div
          className={`fixed inset-0 z-[999] bg-black flex items-center justify-center
                      transition-opacity duration-500 ${fadeOut ? "opacity-0" : "opacity-100"}`}
        >
          <span
            className="text-white/50 text-sm italic tracking-tight"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Construct is Loading
            <span className="text-white/30 tabular-nums ml-2">
              {Math.round(progress * 100)}%
            </span>
          </span>
        </div>
      )}

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
