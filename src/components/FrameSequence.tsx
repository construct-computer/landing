import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Dock from "./Dock";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 1021;
const FRAME_PAD = 4;

function getFrameSrc(index: number): string {
  const clamped = Math.min(Math.max(index, 1), FRAME_COUNT);
  const padded = String(clamped).padStart(FRAME_PAD, "0");
  return `/frames/frame_${padded}.jpg`;
}

export default function FrameSequence() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const frameObj = useRef({ value: 0 });

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Navbar height + extra breathing room
    const NAV_HEIGHT = 80;

    // ── Size canvas to viewport minus navbar and handle resize ──
    function resizeCanvas() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight - NAV_HEIGHT;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // ── Draw image as "contain" — fits entire image, centered, no crop ──
    function drawContain(img: HTMLImageElement) {
      if (!ctx || !canvas) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      const scale = Math.min(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, 0, 0, iw, ih, dx, dy, dw, dh);
    }

    // ── Preload frames ──
    const images: HTMLImageElement[] = [];
    let firstRendered = false;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFrameSrc(i);
      img.onload = () => {
        if (!firstRendered) {
          firstRendered = true;
          drawContain(img);
        }
      };
      images.push(img);
    }

    function render(index: number) {
      if (!ctx || !canvas) return;
      const img = images[Math.round(index)];
      if (img && img.complete) {
        drawContain(img);
      }
    }

    // ── Scroll-driven frame scrubbing ──
    // All frames complete in the first 80% of scroll.
    // The remaining 20% is reserved for the fade to black.
    gsap.to(frameObj.current, {
      value: FRAME_COUNT - 1,
      ease: "none",
      scrollTrigger: {
        trigger: wrapper,
        start: "top top",
        end: "80% bottom",
        scrub: 0.4,
      },
      onUpdate: () => render(frameObj.current.value),
    });

    // ── Fade to black AFTER all frames have played ──
    if (fadeRef.current) {
      gsap.fromTo(
        fadeRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: wrapper,
            start: "82% bottom",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      ScrollTrigger.getAll()
        .filter((t) => wrapper?.contains(t.trigger as Element))
        .forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative bg-black" style={{ height: "600vh" }}>
      {/* Canvas in normal flow, centered */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute left-0 right-0 w-full h-fit rounded-3xl"
          style={{ top: 80, height: "calc(100% - 80px)" }}
        />

        {/* Dock at bottom of screen */}
        <Dock />

        {/* Top fade from black — blends from hero */}
        <div className="absolute top-0 left-0 right-0 h-[25%] bg-gradient-to-b from-black to-transparent pointer-events-none z-[4]" />

        {/* Fade-to-black overlay at end */}
        <div
          ref={fadeRef}
          className="absolute inset-0 bg-black pointer-events-none z-[4]"
        />
      </div>
    </div>
  );
}
