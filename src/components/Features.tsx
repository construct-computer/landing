import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* App icons using PNGs from /public/icons/ */
function AppIcon({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className="feat-icon w-8 h-8 md:w-12 md:h-12 mx-1 md:mx-1.5 object-contain shrink-0
                 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]
                 transition-transform duration-300 hover:scale-110"
      draggable={false}
    />
  );
}

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<(HTMLDivElement | null)[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Per-line staggered entrance: text spans slide up, icons bounce in
    linesRef.current.forEach((lineEl, lineIdx) => {
      if (!lineEl) return;

      const spans = lineEl.querySelectorAll<HTMLElement>(".feat-text");
      const icons = lineEl.querySelectorAll<HTMLElement>(".feat-icon");
      const allItems = lineEl.querySelectorAll<HTMLElement>(".feat-text, .feat-icon");

      // Timeline per line, triggered on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: lineEl,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        delay: lineIdx * 0.15,
      });

      // Set initial state
      gsap.set(spans, { opacity: 0, y: 40, filter: "blur(8px)" });
      gsap.set(icons, { opacity: 0, scale: 0, rotation: -20 });

      // Animate each item in order (text and icons interleaved)
      allItems.forEach((item, i) => {
        const offset = i * 0.08;
        if (item.classList.contains("feat-icon")) {
          tl.to(item, {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.6,
            ease: "back.out(2)",
          }, offset);
        } else {
          tl.to(item, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.7,
            ease: "power3.out",
          }, offset);
        }
      });
    });

    // Subtle parallax drift on the whole content block as user scrolls past
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        y: -30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => sectionRef.current?.contains(t.trigger as Element))
        .forEach((t) => t.kill());
    };
  }, []);

  const font = { fontFamily: "Georgia, 'Times New Roman', serif" };

  return (
    <section ref={sectionRef} className="relative pb-28 md:pb-40 -mt-[100vh] overflow-hidden z-10">
      {/* Top gradient: transparent to black — blends with frame fade */}
      <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-transparent to-black pointer-events-none z-0" />
      {/* Black fill for the rest */}
      <div className="absolute top-[40%] left-0 right-0 bottom-0 bg-black pointer-events-none z-0" />

      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-white/[0.02] blur-3xl pointer-events-none z-0" />

      <div ref={contentRef} className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 text-center pt-[35vh] md:pt-[45vh]">
        {/* Line 1 */}
        <div ref={(el) => { linesRef.current[0] = el; }} className="mb-2 flex items-center justify-center flex-wrap gap-y-2">
          <span className="feat-text text-xl md:text-4xl text-white italic" style={font}>
            Now, Managing Your <span className="text-[#6cb4ee]">Mails</span>
          </span>
          <AppIcon src="/icons/email.png" alt="Mail" />
          <span className="feat-text text-xl md:text-4xl text-white italic" style={font}>
            Making <span className="text-[#6cb4ee]">Workflows,</span>
          </span>
        </div>

        {/* Line 2 */}
        <div ref={(el) => { linesRef.current[1] = el; }} className="mb-2 flex items-center justify-center flex-wrap gap-y-2">
          <span className="feat-text text-xl md:text-4xl text-white italic" style={font}>
            Handling <span className="text-[#6cb4ee]">Codebases</span>
          </span>
          <AppIcon src="/icons/github.png" alt="GitHub" />
          <span className="feat-text text-xl md:text-4xl text-white italic" style={font}>
            Accessing <span className="text-[#6cb4ee]">Socials,</span>
          </span>
          <AppIcon src="/icons/twitter.png" alt="X / Twitter" />
        </div>

        {/* Line 3 */}
        <div ref={(el) => { linesRef.current[2] = el; }} className="flex items-center justify-center flex-wrap gap-y-2">
          <span className="feat-text text-xl md:text-4xl text-white italic" style={font}>
            Deep Searching on
          </span>
          <AppIcon src="/icons/safari.png" alt="Safari" />
          <span className="feat-text text-xl md:text-4xl text-[#6cb4ee] italic" style={font}>
            Browser.
          </span>
        </div>
      </div>
    </section>
  );
}
