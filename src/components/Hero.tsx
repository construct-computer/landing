import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animate } from "animejs";
import WaitlistForm from "./WaitlistForm";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const videoSrc = "/bg_h.mp4";

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // ── Force autoplay on mobile (iOS ignores autoplay attribute) ──
    const video = videoRef.current;
    let videoObserver: IntersectionObserver | null = null;
    if (video) {
      // Play/pause based on visibility — most reliable on iOS
      videoObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        },
        { threshold: 0.1 }
      );
      videoObserver.observe(video);

      // Also retry on tab switch back
      const onVisible = () => {
        if (document.visibilityState === "visible") video.play().catch(() => {});
      };
      document.addEventListener("visibilitychange", onVisible);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (section as any).__cleanupVideo = () => {
        document.removeEventListener("visibilitychange", onVisible);
        videoObserver?.disconnect();
      };
    }

    // ── Entrance animations (animejs) ──
    if (headingRef.current) {
      animate(headingRef.current, {
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 1200,
        ease: "outExpo",
        delay: 400,
      });
    }
    if (subRef.current) {
      animate(subRef.current, {
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 1000,
        ease: "outExpo",
        delay: 700,
      });
    }
    if (logoRef.current) {
      animate(logoRef.current, {
        opacity: [0, 1],
        scale: [0.6, 1],
        duration: 1200,
        ease: "outBack",
        delay: 900,
      });
    }
    if (ctaRef.current) {
      animate(ctaRef.current, {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 1000,
        ease: "outExpo",
        delay: 1200,
      });
    }

    // ── Parallax fade-out on scroll (fromTo so reverse works) ──
    gsap.fromTo(
      contentRef.current,
      { opacity: 1, y: 0 },
      {
        opacity: 0,
        y: -80,
        scrollTrigger: {
          trigger: section,
          start: "50% top",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (section as any).__cleanupVideo?.();
      ScrollTrigger.getAll()
        .filter((t) => section?.contains(t.trigger as Element))
        .forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-[100dvh] bg-black overflow-hidden"
    >
      {/* Background video — portrait on mobile, landscape on desktop */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover mt-20"
        style={{ objectPosition: "center 60%" }}
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      {/* Darken overlay */}
      <div className="absolute inset-0 bg-black/50" />
      {/* Bottom fade to black — blends into frame sequence */}
      <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-b from-transparent to-black pointer-events-none z-[1]" />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center h-full px-6"
      >
        {/* Heading */}
        <div ref={headingRef} className="text-center opacity-0">
          <h1
            className="text-white font-normal italic text-center"
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "clamp(2rem, 5vw, 3.24rem)",
              lineHeight: "1.12",
              letterSpacing: "0",
            }}
          >
            <span className="text-[#6cb4ee]">AI Agents </span>That Work on
            <br />
            Your <span className="text-[#6cb4ee]">Behalf</span>
          </h1>
        </div>

        {/* Subtitle */}
        <p
          ref={subRef}
          className="mt-4 md:mt-5 text-sm md:text-lg text-white/50 text-center max-w-xl leading-relaxed opacity-0 px-4"
        >
          Persistent AI agents with their own cloud computer.
          <br className="hidden md:block" />
          Watch them work in real-time from your web desktop.
        </p>

        {/* Logo */}
        <img
          ref={logoRef}
          src="/logo.png"
          alt="Construct logo"
          className="mt-6 md:mt-8 w-36 h-36 md:w-64 md:h-64 object-contain opacity-0"
          draggable={false}
        />

        {/* CTA */}
        <div ref={ctaRef} className="mt-6 md:mt-8 opacity-0">
          <WaitlistForm size="lg" />
        </div>
      </div>
    </section>
  );
}
