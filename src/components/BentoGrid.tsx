import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BentoGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    if (headingRef.current) {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%", toggleActions: "play none none reverse" },
        }
      );
    }

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(card,
        { opacity: 0, y: 70, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play none none reverse" },
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
    <section ref={sectionRef} className="relative py-28 md:py-40 bg-black overflow-hidden">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] rounded-full bg-white/[0.02] blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-14 opacity-0">
          <h2 className="text-3xl md:text-4xl text-white italic leading-tight" style={font}>
            Scalable, Flexible and a <span className="text-[#6cb4ee]">Scholar</span>
          </h2>
          <p className="mt-3 text-white/40 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            Agent on Construct can utilize it's assets, using cloud and compute to
            scale complex automations. The model is improves and learns all the time
          </p>
        </div>

        {/* Bento grid — 2 cols, 2 rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1: "It Tells You When..." — top-left */}
          <div
            ref={(el) => { cardsRef.current[0] = el; }}
            className="relative rounded-2xl border border-white/[0.06] overflow-hidden opacity-0 min-h-[340px]"
          >
            {/* Blurred warm image bg */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#3a2a1a]/80 via-[#1a1a1a]/60 to-[#111]" />
            <div className="absolute top-0 inset-x-0 h-[55%] bg-gradient-to-br from-amber-900/30 via-orange-800/20 to-transparent blur-sm" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="relative z-10 p-7 flex flex-col justify-end h-full">
              <h3 className="text-lg md:text-xl text-white italic text-center leading-snug" style={font}>
                It Tells You When
                <br />So You Can <span className="text-[#6cb4ee]">Relax A Bit</span>
              </h3>
              <p className="mt-2 text-white/35 text-xs text-center leading-relaxed max-w-[260px] mx-auto">
                Agents on Construct notifies you of the progress and completion via mail or on telegram
              </p>
            </div>
          </div>

          {/* Card 2: "Accountable and Logged..." — top-right, spans 2 rows */}
          <div
            ref={(el) => { cardsRef.current[1] = el; }}
            className="relative rounded-2xl border border-white/[0.06] overflow-hidden opacity-0 md:row-span-2 min-h-[340px]"
          >
            {/* Purple-blue gradient bg */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-800/50 via-blue-700/40 to-cyan-500/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

            <div className="relative z-10 p-7 flex flex-col h-full">
              <h3 className="text-lg md:text-xl text-white italic text-center leading-snug" style={font}>
                Accountable and Logged
                <br />On the <span className="text-[#6cb4ee]">Cloud.</span>
              </h3>
              <p className="mt-2 text-white/50 text-xs text-center leading-relaxed max-w-[280px] mx-auto">
                Agents on Construct maintain every record of their action. These records are on the cloud and can be accessed from everywhere
              </p>
              <a
                href="#"
                className="mt-4 mx-auto inline-flex items-center gap-1.5 text-xs font-medium text-white
                           bg-black/40 border border-white/15 rounded-full px-4 py-2
                           hover:bg-black/60 transition-all no-underline"
              >
                See how
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Card 3: "Pick Where You Left..." — bottom-left */}
          <div
            ref={(el) => { cardsRef.current[2] = el; }}
            className="relative rounded-2xl border border-white/[0.06] overflow-hidden opacity-0 min-h-[340px]"
          >
            {/* Dark bg with subtle image hint */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e] to-[#0a0a0f]" />
            <div className="absolute bottom-0 inset-x-0 h-[45%] bg-gradient-to-t from-[#222]/60 to-transparent" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="relative z-10 p-7 flex flex-col h-full">
              <h3 className="text-lg md:text-xl text-white italic text-center leading-snug" style={font}>
                Pick Where You Left
                <br />Your Agent Has <span className="text-[#6cb4ee]">Improved</span>
              </h3>
              <p className="mt-2 text-white/35 text-xs text-center leading-relaxed max-w-[280px] mx-auto">
                Agents on Construct keeps scraping and researching. And provides better result after every left conversation
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
