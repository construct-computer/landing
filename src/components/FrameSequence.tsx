import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Dock from "./Dock";

gsap.registerPlugin(ScrollTrigger);

/** Bounds of the video frame drawn in contain-mode, relative to sticky container */
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
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const posterRef = useRef<HTMLImageElement | null>(null);
  const boundsRef = useRef<FrameBounds>({ x: 0, y: 0, w: 0, h: 0 });
  const seekingRef = useRef(false);
  const targetTimeRef = useRef(0);
  const videoReadyRef = useRef(false);
  const [bounds, setBounds] = useState<FrameBounds>({ x: 0, y: 0, w: 0, h: 0 });
  const [dockVisible, setDockVisible] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [videoReady, setVideoReady] = useState(false);

  const NAV_HEIGHT = 80;
  const [isMobile] = useState(() => window.innerWidth < 768);

  /** Draw a source (video or poster image) to canvas in contain-mode */
  const drawToCanvas = useCallback(
    (source: HTMLVideoElement | HTMLImageElement) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const sw =
        source instanceof HTMLVideoElement
          ? source.videoWidth
          : source.naturalWidth;
      const sh =
        source instanceof HTMLVideoElement
          ? source.videoHeight
          : source.naturalHeight;
      if (!sw || !sh) return;

      const scale = Math.min(cw / sw, ch / sh);
      const dw = sw * scale;
      const dh = sh * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(source, dx, dy, dw, dh);

      // Update bounds (CSS pixels)
      const dpr = window.devicePixelRatio || 1;
      const newBounds: FrameBounds = {
        x: dx / dpr,
        y: dy / dpr + NAV_HEIGHT,
        w: dw / dpr,
        h: dh / dpr,
      };

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

  /** Draw whatever is available — video if ready, otherwise poster */
  const drawFrame = useCallback(() => {
    if (videoReadyRef.current && videoRef.current?.videoWidth) {
      drawToCanvas(videoRef.current);
    } else if (posterRef.current?.complete && posterRef.current.naturalWidth) {
      drawToCanvas(posterRef.current);
    }
  }, [drawToCanvas]);

  /** Seek to a specific time, coalescing concurrent seeks */
  const seekTo = useCallback((time: number) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    targetTimeRef.current = Math.max(0, Math.min(time, video.duration));

    if (!seekingRef.current) {
      seekingRef.current = true;
      video.currentTime = targetTimeRef.current;
    }
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    // ── Load poster image for instant first paint ──
    const poster = new Image();
    poster.src = "/scroll-poster.jpg";
    posterRef.current = poster;
    poster.onload = () => drawFrame();

    // ── Create hidden video element ──
    const video = document.createElement("video");
    video.src = "/scroll.mp4";
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    videoRef.current = video;

    // ── Track download progress ──
    const onProgress = () => {
      if (!video.duration || !video.buffered.length) return;
      const bufferedEnd = video.buffered.end(video.buffered.length - 1);
      setLoadProgress(bufferedEnd / video.duration);
    };
    video.addEventListener("progress", onProgress);

    // ── Mark video ready once enough data is available ──
    const onCanPlay = () => {
      videoReadyRef.current = true;
      setVideoReady(true);
      drawFrame();
    };
    video.addEventListener("canplaythrough", onCanPlay);

    // ── Seek completion — draw and chain if target moved ──
    const onSeeked = () => {
      seekingRef.current = false;
      if (videoReadyRef.current) drawFrame();

      if (
        video.duration &&
        Math.abs(video.currentTime - targetTimeRef.current) > 0.02
      ) {
        seekingRef.current = true;
        video.currentTime = targetTimeRef.current;
      }
    };
    video.addEventListener("seeked", onSeeked);

    // Draw first video frame when metadata arrives
    const onLoaded = () => {
      videoReadyRef.current = true;
      setVideoReady(true);
      drawFrame();
    };
    video.addEventListener("loadeddata", onLoaded);

    // ── Resize canvas at device pixel ratio ──
    function resizeCanvas() {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight - NAV_HEIGHT;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      drawFrame();
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // ── Scroll-driven video scrubbing: 0-80% of wrapper ──
    const progressObj = { value: 0 };
    gsap.to(progressObj, {
      value: 1,
      ease: "none",
      scrollTrigger: {
        trigger: wrapper,
        start: "top top",
        end: "80% bottom",
        scrub: 0.4,
      },
      onUpdate: () => {
        if (video.duration) {
          seekTo(progressObj.value * video.duration);
        }
        setDockVisible(progressObj.value > 0.04);
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
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("loadeddata", onLoaded);
      video.removeEventListener("progress", onProgress);
      video.removeEventListener("canplaythrough", onCanPlay);
      video.pause();
      video.removeAttribute("src");
      video.load();
      videoRef.current = null;
      posterRef.current = null;
      ScrollTrigger.getAll()
        .filter((t) => wrapper?.contains(t.trigger as Element))
        .forEach((t) => t.kill());
    };
  }, [drawFrame, seekTo]);

  // Shorter scroll on mobile
  const scrollHeight = isMobile ? "300vh" : "600vh";

  return (
    <div
      ref={wrapperRef}
      className="relative bg-black"
      style={{ height: scrollHeight }}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute left-0 right-0"
          style={{ top: NAV_HEIGHT }}
        />

        {/* Loading progress bar — visible until video is fully buffered */}
        {!videoReady && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[6] flex flex-col items-center gap-2">
            <div className="w-48 h-[2px] rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-white/40 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${Math.round(loadProgress * 100)}%` }}
              />
            </div>
            <span className="text-white/30 text-xs">Loading</span>
          </div>
        )}

        {/* Dock — desktop only, anchored to bottom of rendered frame */}
        {!isMobile && bounds.w > 0 && (
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
