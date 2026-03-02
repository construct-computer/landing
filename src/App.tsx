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
    let cancelled = false;

    // ── Assets to track ──
    // Video (heaviest — weighted 60%)
    const video = document.createElement("video");
    video.src = "/scroll.mp4";
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    let videoProgress = 0;
    let videoReady = false;

    // Images & secondary assets to preload (weighted 30% combined)
    const assetSrcs = [
      "/logo.png",
      "/blur1.png",
      "/blur2.png",
      "/blur3.png",
      "/cli.png",
      "/notifications.png",
      "/work.png",
      "/scroll-poster.jpg",
    ];
    let imagesLoaded = 0;
    const totalImages = assetSrcs.length;

    // Weights
    const VIDEO_WEIGHT = 0.6;
    const IMAGE_WEIGHT = 0.3;
    const BASE_WEIGHT = 0.1; // instant 10% so it never looks stuck at 0

    const updateProgress = () => {
      if (cancelled) return;
      const p = BASE_WEIGHT
        + VIDEO_WEIGHT * videoProgress
        + IMAGE_WEIGHT * (totalImages > 0 ? imagesLoaded / totalImages : 1);
      setProgress(Math.min(p, 1));
    };

    // ── Poll video buffer for smooth progress ──
    const pollInterval = setInterval(() => {
      if (!video.duration || !video.buffered.length) return;
      const buffered = video.buffered.end(video.buffered.length - 1);
      videoProgress = buffered / video.duration;
      updateProgress();
    }, 150);

    const onVideoReady = () => {
      videoProgress = 1;
      videoReady = true;
      updateProgress();
      checkAllDone();
    };
    video.addEventListener("canplaythrough", onVideoReady);

    // ── Preload images ──
    assetSrcs.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = img.onerror = () => {
        imagesLoaded++;
        updateProgress();
        if (imagesLoaded >= totalImages) checkAllDone();
      };
    });

    // ── Completion logic ──
    const finish = () => {
      if (cancelled) return;
      cancelled = true;
      clearInterval(pollInterval);
      clearTimeout(fallbackTimeout);
      setProgress(1);
      setFadeOut(true);
      setTimeout(() => {
        setReady(true);
        document.body.style.overflow = "";
      }, 600);
      video.removeEventListener("canplaythrough", onVideoReady);
      video.pause();
      video.removeAttribute("src");
      video.load();
    };

    const checkAllDone = () => {
      if (videoReady && imagesLoaded >= totalImages) finish();
    };

    // Fallback — don't block forever
    const fallbackTimeout = setTimeout(finish, 15000);

    // Kick off initial progress so it's not stuck at 0
    updateProgress();

    return () => {
      cancelled = true;
      clearInterval(pollInterval);
      clearTimeout(fallbackTimeout);
      video.removeEventListener("canplaythrough", onVideoReady);
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
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
            className="text-white/50 text-xl md:text-2xl italic tracking-tight text-center px-6"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Construct is loading
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
