import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Dock from "./Dock";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 1021;

function getFrameSrc(i: number): string {
  return `/frames/frame_${String(Math.min(Math.max(i, 1), FRAME_COUNT)).padStart(4, "0")}.jpg`;
}

/** Bounds of the image drawn in contain mode, relative to the sticky container */
interface FrameBounds {
  x: number;
  y: number;
  w: number;
  h: number;
}

export default function FrameSequence() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const frameObj = useRef({ value: 0 });
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const boundsRef = useRef<FrameBounds>({ x: 0, y: 0, w: 0, h: 0 });
  const [bounds, setBounds] = useState<FrameBounds>({ x: 0, y: 0, w: 0, h: 0 });
  const [dockVisible, setDockVisible] = useState(false);

  const NAV_HEIGHT = 80;

  /** Draw current frame and update bounds */
  const drawFrame = useCallback(
    (img: HTMLImageElement) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      if (!iw || !ih) return;

      const scale = Math.min(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, 0, 0, iw, ih, dx, dy, dw, dh);

      // Update bounds (CSS pixels, relative to sticky container)
      const dpr = window.devicePixelRatio || 1;
      const newBounds: FrameBounds = {
        x: dx / dpr,
        y: dy / dpr + NAV_HEIGHT,
        w: dw / dpr,
        h: dh / dpr,
      };

      // Only trigger state update if bounds actually changed
      const prev = boundsRef.current;
      if (
        Math.abs(prev.x - newBounds.x) > 1 ||
        Math.abs(prev.y - newBounds.y) > 1 ||
        Math.abs(prev.w - newBounds.w) > 1 ||
        Math.abs(prev.h - newBounds.h) > 1
      ) {
        boundsRef.current = newBounds;
        setBounds(newBounds);
      }
    },
    []
  );

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── Resize canvas at device pixel ratio for sharp rendering ──
    function resizeCanvas() {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight - NAV_HEIGHT;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      // Re-draw current frame after resize
      const idx = Math.round(frameObj.current.value);
      const img = imagesRef.current[idx];
      if (img?.complete) drawFrame(img);
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // ── Preload frames ──
    let firstRendered = false;
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFrameSrc(i);
      img.onload = () => {
        if (!firstRendered) {
          firstRendered = true;
          drawFrame(img);
        }
      };
      imagesRef.current.push(img);
    }

    function render(index: number) {
      const img = imagesRef.current[Math.round(index)];
      if (img?.complete) drawFrame(img);
    }

    // ── Scroll-driven frame scrubbing: 0-80% of wrapper ──
    gsap.to(frameObj.current, {
      value: FRAME_COUNT - 1,
      ease: "none",
      scrollTrigger: {
        trigger: wrapper,
        start: "top top",
        end: "80% bottom",
        scrub: 0.4,
      },
      onUpdate: () => {
        const idx = frameObj.current.value;
        render(idx);
        setDockVisible(idx >= 40);
      },
    });

    // ── Fade to black: 82-100% of wrapper ──
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
  }, [drawFrame]);

  return (
    <div ref={wrapperRef} className="relative bg-black" style={{ height: "600vh" }}>
      <div ref={stickyRef} className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute left-0 right-0"
          style={{ top: NAV_HEIGHT }}
        />

        {/* Dock — anchored to the bottom edge of the rendered frame image, slides in at frame 40 */}
        {bounds.w > 0 && (
          <div
            className="absolute left-0 right-0 z-[3] transition-all duration-700 ease-out"
            style={{
              top: bounds.y + bounds.h - 64,
              opacity: dockVisible ? 1 : 0,
              transform: dockVisible ? "translateY(0)" : "translateY(60px)",
              pointerEvents: dockVisible ? "auto" : "none",
            }}
          >
            <Dock />
          </div>
        )}

        {/* Top fade from black — blends from hero */}
        <div className="absolute top-0 left-0 right-0 h-[25%] bg-gradient-to-b from-black to-transparent pointer-events-none z-[4]" />

        {/* Fade-to-black overlay at end */}
        <div
          ref={fadeRef}
          className="absolute inset-0 bg-black pointer-events-none z-[5]"
        />
      </div>
    </div>
  );
}
