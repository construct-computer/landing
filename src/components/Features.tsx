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
      className="w-10 h-10 md:w-12 md:h-12 rounded-xl shadow-lg mx-1.5 object-cover shrink-0"
      draggable={false}
    />
  );
}

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    linesRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
          delay: i * 0.12,
        }
      );
    });

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => sectionRef.current?.contains(t.trigger as Element))
        .forEach((t) => t.kill());
    };
  }, []);

  const font = { fontFamily: "Georgia, 'Times New Roman', serif" };

  return (
    <section ref={sectionRef} className="relative pb-28 md:pb-40 -mt-[50vh] overflow-hidden z-10">
      {/* Top gradient: transparent to black — blends with frame fade */}
      <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-transparent to-black pointer-events-none z-0" />
      {/* Black fill for the rest */}
      <div className="absolute top-[40%] left-0 right-0 bottom-0 bg-black pointer-events-none z-0" />

      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-white/[0.02] blur-3xl pointer-events-none z-0" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Line 1 */}
        <div ref={(el) => { linesRef.current[0] = el; }} className="mb-2 opacity-0 flex items-center justify-center flex-wrap gap-y-2">
          <span className="text-2xl md:text-4xl text-white italic" style={font}>
            Now, Managing Your <span className="text-[#6cb4ee]">Mails</span>
          </span>
          <AppIcon src="/icons/email.png" alt="Mail" />
          <span className="text-2xl md:text-4xl text-white italic" style={font}>
            Making <span className="text-[#6cb4ee]">Workflows,</span>
          </span>
        </div>

        {/* Line 2 */}
        <div ref={(el) => { linesRef.current[1] = el; }} className="mb-2 opacity-0 flex items-center justify-center flex-wrap gap-y-2">
          <span className="text-2xl md:text-4xl text-white italic" style={font}>
            Handling <span className="text-[#6cb4ee]">Codebases</span>
          </span>
          <AppIcon src="/icons/github.png" alt="GitHub" />
          <span className="text-2xl md:text-4xl text-white italic" style={font}>
            Accessing <span className="text-[#6cb4ee]">Socials,</span>
          </span>
          <AppIcon src="/icons/twitter.png" alt="X / Twitter" />
        </div>

        {/* Line 3 */}
        <div ref={(el) => { linesRef.current[2] = el; }} className="opacity-0 flex items-center justify-center flex-wrap gap-y-2">
          <span className="text-2xl md:text-4xl text-white italic" style={font}>
            Deep Searching on
          </span>
          <AppIcon src="/icons/safari.png" alt="Safari" />
          <span className="text-2xl md:text-4xl text-[#6cb4ee] italic" style={font}>
            Browser.
          </span>
        </div>
      </div>
    </section>
  );
}
