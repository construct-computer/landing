import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animate } from "animejs";
import WaitlistForm from "./WaitlistForm";

gsap.registerPlugin(ScrollTrigger);

export default function CtaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  const videoSrc = "/bg_h.mp4";

  useEffect(() => {
    if (!sectionRef.current) return;
    const triggers: ScrollTrigger[] = [];

    // Play video when in view (force play for iOS)
    const video = videoRef.current;
    if (video) {
      const forcePlay = () => { video.play().catch(() => { }); };
      triggers.push(ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        onEnter: forcePlay,
        onEnterBack: forcePlay,
        onLeaveBack: () => video.pause(),
        onLeave: () => video.pause(),
      }));
    }

    // Content reveal
    if (contentRef.current) {
      triggers.push(ScrollTrigger.create({
        trigger: contentRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          if (logoRef.current) {
            animate(logoRef.current, {
              opacity: [0, 1],
              scale: [0.5, 1],
              duration: 1000,
              ease: "outBack",
            });
          }
          if (headingRef.current) {
            animate(headingRef.current, {
              opacity: [0, 1],
              translateY: [40, 0],
              duration: 1000,
              ease: "outExpo",
              delay: 200,
            });
          }
          if (subRef.current) {
            animate(subRef.current, {
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 900,
              ease: "outExpo",
              delay: 400,
            });
          }
          if (btnRef.current) {
            animate(btnRef.current, {
              opacity: [0, 1],
              translateY: [20, 0],
              duration: 800,
              ease: "outExpo",
              delay: 600,
            });
          }
        },
      }));
    }

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-48 bg-black overflow-hidden">
      {/* Background video — portrait on mobile */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black pointer-events-none" />

      {/* Content */}
      <div ref={contentRef} className="relative z-10 flex flex-col items-center justify-center text-center px-6">
        <img
          ref={logoRef}
          src="/logo.png"
          alt="Construct Computer"
          className="w-20 h-20 md:w-36 md:h-36 object-contain mb-6 md:mb-8 opacity-0"
        />

        <h2
          ref={headingRef}
          className="text-3xl md:text-5xl font-normal italic text-white leading-tight opacity-0"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          Be The First To Try
          <br />
          The Most Powerful{" "}
          <span className="text-[#6cb4ee]">Agentic Protocol</span>
        </h2>

        <p ref={subRef} className="mt-4 md:mt-6 text-white/50 text-sm md:text-lg max-w-lg opacity-0 px-4">
          Join our wait list and, become part of the new meta.
        </p>

        <div ref={btnRef} className="mt-8 md:mt-10 opacity-0">
          <WaitlistForm size="lg" />
        </div>
      </div>
    </section>
  );
}
