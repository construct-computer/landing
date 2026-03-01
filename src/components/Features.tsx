import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* App icons using PNGs from /public/icons/ with custom hover states */
function AppIcon({ src, alt }: { src: string; alt: string }) {
  // Safari: rotate 270deg springy
  if (alt === "Safari") {
    return (
      <div className="relative group mx-0.5 md:mx-2 cursor-pointer feat-icon-wrap">
        <img
          src={src}
          alt={alt}
          className="w-6 h-6 md:w-16 md:h-16 object-contain shrink-0
                     drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)]
                     transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                     group-hover:rotate-270"
          draggable={false}
        />
      </div>
    );
  }

  // Twitter/X: tilt + slide, plus popover notification
  if (alt === "X / Twitter") {
    return (
      <div className="relative group mx-0.5 md:mx-2 cursor-pointer feat-icon-wrap">
        {/* Notification popover */}
        <div
          className="absolute top-0 right-0 translate-x-[70%] md:translate-x-[90%] 
                     pointer-events-none opacity-0 group-hover:opacity-100
                     translate-y-2 group-hover:-translate-y-6 md:group-hover:-translate-y-12
                     transition-all duration-300 ease-out z-50
                     flex flex-col gap-2 md:gap-3 items-start"
        >
          {/* Top bubble: gained 1 follower */}
          <div className="relative px-3 py-1.5 md:px-5 md:py-2.5 bg-[#090909] border-[1.5px] border-white/30 rounded-full shadow-2xl flex items-center text-white/90 text-[10px] md:text-[15px] font-[Geist] tracking-wide whitespace-nowrap">
            gained 1 <span className="text-[#6cb4ee] ml-[4px]">follower</span>
            {/* Tail */}
            {/* <div className="absolute -left-[4px] md:-left-[5px] bottom-[6px] md:bottom-[8px] w-[8px] h-[8px] md:w-[10px] md:h-[10px] bg-[#090909] border-l-[1.5px] border-b-[1.5px] border-white/30 rotate-45 rounded-[1px] -z-10" /> */}
          </div>

          {/* Bottom bubble: repost done! */}
          <div className="relative px-3 py-1.5 md:px-5 md:py-2.5 bg-[#090909] border-[1.5px] border-white/30 rounded-[20px] shadow-2xl flex items-center text-white/90 text-[10px] md:text-[15px] font-[Geist] tracking-wide whitespace-nowrap ml-4 md:ml-6">
            repost done!
          </div>
        </div>

        <img
          src={src}
          alt={alt}
          className="w-6 h-6 md:w-16 md:h-16 object-contain shrink-0
                     drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)]
                     transition-all duration-300 ease-out
                     group-hover:-translate-y-2 group-hover:translate-x-3 group-hover:-rotate-12"
          draggable={false}
        />
      </div>
    );
  }

  // Default / Mail / GitHub: Tilt and slide up/right
  return (
    <div className="relative group mx-0.5 md:mx-2 cursor-pointer feat-icon-wrap">
      <img
        src={src}
        alt={alt}
        className="w-6 h-6 md:w-16 md:h-16 object-contain shrink-0
                   drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)]
                   transition-all duration-300 ease-out
                   group-hover:-translate-y-2 group-hover:translate-x-3 group-hover:-rotate-12"
        draggable={false}
      />
    </div>
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
      const icons = lineEl.querySelectorAll<HTMLElement>(".feat-icon-wrap");
      const allItems = lineEl.querySelectorAll<HTMLElement>(".feat-text, .feat-icon-wrap");

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
        if (item.classList.contains("feat-icon-wrap")) {
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
    <section ref={sectionRef} className="relative pb-28 md:pb-40 -mt-[100vh] overflow-hidden z-10 w-full font-[Geist]">
      {/* Top gradient: transparent to black — blends with frame fade */}
      <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-transparent to-black pointer-events-none z-0" />
      {/* Black fill for the rest */}
      <div className="absolute top-[40%] left-0 right-0 bottom-0 bg-black pointer-events-none z-0" />

      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-white/[0.02] blur-3xl pointer-events-none z-0" />

      <div ref={contentRef} className="relative z-10 w-full md:w-max max-w-[100vw] mx-auto px-1 md:px-6 text-center pt-[35vh] md:pt-[45vh] scale-100 origin-center ">
        {/* Line 1 */}
        <div ref={(el) => { linesRef.current[0] = el; }} className="mb-2 md:mb-4 flex items-center justify-center whitespace-nowrap gap-x-1 md:gap-x-2">
          <span className="feat-text text-[15px] sm:text-[20px] md:text-5xl text-white font-medium">
            Now, Managing Your <span className="text-[#6cb4ee] italic" style={font}>Mails,</span>
          </span>
          <AppIcon src="/icons/email.png" alt="Mail" />
          <span className="feat-text text-[15px] sm:text-[20px] md:text-5xl text-white font-medium">
            Making <span className="text-[#6cb4ee] italic" style={font}>Workflows,</span>
          </span>
        </div>

        {/* Line 2 */}
        <div ref={(el) => { linesRef.current[1] = el; }} className="mb-2 md:mb-4 flex items-center justify-center whitespace-nowrap gap-x-1 md:gap-x-2">
          <span className="feat-text text-[15px] sm:text-[20px] md:text-5xl text-white font-medium">
            Handling <span className="text-[#6cb4ee] italic" style={font}>Codebase</span>
          </span>
          <AppIcon src="/icons/github.png" alt="GitHub" />
          <span className="feat-text text-[15px] sm:text-[20px] md:text-5xl text-white font-medium">
            Accessing <span className="text-[#6cb4ee] italic" style={font}>Socials,</span>
          </span>
          <AppIcon src="/icons/twitter.png" alt="X / Twitter" />
        </div>

        {/* Line 3 */}
        <div ref={(el) => { linesRef.current[2] = el; }} className="flex items-center justify-center whitespace-nowrap gap-x-1 md:gap-x-2">
          <span className="feat-text text-[15px] sm:text-[20px] md:text-5xl text-white font-medium">
            Deep Searching on
          </span>
          <AppIcon src="/icons/safari.png" alt="Safari" />
          <span className="feat-text text-[15px] sm:text-[20px] md:text-5xl text-[#6cb4ee] italic pr-1" style={font}>
            Browser.
          </span>
        </div>
      </div>
    </section>
  );
}
