import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BentoGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const notifImgRef = useRef<HTMLImageElement>(null);
  const cliImgRef = useRef<HTMLDivElement>(null);
  const workImgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // ── Heading entrance ──
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // ── Card entrance animations ──
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 70, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
            delay: i * 0.12,
          }
        );
      });

      // ── Card 1: Notifications image — slide up + gentle float ──
      if (notifImgRef.current && cardsRef.current[0]) {
        gsap.fromTo(
          notifImgRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current[0],
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            delay: 0.35,
          }
        );

        // Continuous gentle float
        gsap.to(notifImgRef.current, {
          y: -6,
          duration: 3,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 1.6,
        });
      }

      // ── Card 2: CLI image — slide up from below ──
      if (cliImgRef.current && cardsRef.current[1]) {
        gsap.fromTo(
          cliImgRef.current,
          { y: 70, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current[1],
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            delay: 0.45,
          }
        );
      }

      // ── Card 3: Work image — scale + slide in ──
      if (workImgRef.current && cardsRef.current[2]) {
        gsap.fromTo(
          workImgRef.current,
          { y: 35, scale: 0.95, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current[2],
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            delay: 0.4,
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const font = { fontFamily: "Georgia, 'Times New Roman', serif" };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-40 bg-black overflow-hidden"
    >
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] rounded-full bg-white/[0.02] blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 md:px-6">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-14 opacity-0">
          <h2
            className="text-3xl md:text-5xl text-white italic leading-tight"
            style={font}
          >
            Scalable, Flexible and a{" "}
            <span className="text-[#6cb4ee]">Scholar</span>
          </h2>
          <p className="mt-4 text-white/40 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            Agent on Construct can utilize it's assets, using cloud and compute
            to scale complex automations. The model improves and learns all
            the time
          </p>
        </div>

        {/* Bento grid — 2 cols */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* ── Card 1: "It Tells You When..." — top-left ── */}
          <div
            ref={(el) => {
              cardsRef.current[0] = el;
            }}
            className="relative rounded-2xl border border-white/[0.06] overflow-hidden opacity-0 min-h-[340px] md:min-h-[420px]"
          >
            {/* blur1 background — warm sunset */}
            <img
              src="/blur1.png"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />
            {/* Bottom fade so text is readable */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
            {/* Top edge highlight */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="relative z-10 p-7 flex flex-col h-full">
              {/* Notifications image — centered in top area */}
              <div className="flex-1 flex items-center justify-center pt-8">
                <img
                  ref={notifImgRef}
                  src="/notifications.png"
                  alt="Notifications"
                  className="w-[90%] max-w-[380px] opacity-0"
                  draggable={false}
                />
              </div>

              {/* Text at bottom */}
              <div>
                <h3
                  className="text-lg md:text-xl text-white italic text-center leading-snug"
                  style={font}
                >
                  It Tells You When
                  <br />
                  So You Can{" "}
                  <span className="text-[#6cb4ee]">Relax A Bit</span>
                </h3>
                <p className="mt-3 text-white/40 text-xs text-center leading-relaxed max-w-[280px] mx-auto">
                  Agents on Construct notifies you of the progress and completion
                  via mail or on telegram
                </p>
              </div>
            </div>
          </div>

          {/* ── Card 2: "Accountable and Logged..." — right, spans 2 rows ── */}
          <div
            ref={(el) => {
              cardsRef.current[1] = el;
            }}
            className="relative rounded-2xl border border-white/[0.06] overflow-hidden opacity-0 md:row-span-2 aspect-[1/2]"
          >
            {/* blur3 background — purple/cyan diagonal */}
            <img
              src="/blur3.png"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />
            {/* Slight darken for text contrast */}
            <div className="absolute inset-0 bg-black/20" />
            {/* Top edge highlight */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <div className="relative z-10 p-7 pt-14 flex flex-col h-full">
              <h3
                className="text-lg md:text-xl text-white italic text-center leading-snug"
                style={font}
              >
                Accountable and Logged
                <br />
                On the <span className="text-[#6cb4ee]">Cloud.</span>
              </h3>
              <p className="mt-3 text-white/50 text-xs text-center leading-relaxed max-w-[300px] mx-auto">
                Agents on Construct maintain every record of their action. These
                records are on the cloud and can be accessed from everywhere
              </p>


            </div>

            {/* CLI terminal image — sticks to the right */}
            <div ref={cliImgRef} className="absolute bottom-0 right-0 z-10 w-[75%] opacity-0">
              <img
                src="/cli.png"
                alt="CLI terminal"
                className="w-full"
                draggable={false}
              />
            </div>
          </div>

          {/* ── Card 3: "Pick Where You Left..." — bottom-left ── */}
          <div
            ref={(el) => {
              cardsRef.current[2] = el;
            }}
            className="relative rounded-2xl border border-white/[0.06] overflow-hidden opacity-0 min-h-[340px] md:min-h-[420px]"
          >
            {/* blur2 background — dark with subtle top-right glow */}
            <img
              src="/blur2.png"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />
            {/* Top edge highlight */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="relative z-10 p-7 flex flex-col h-full">
              <h3
                className="text-lg md:text-xl text-white italic text-center leading-snug"
                style={font}
              >
                Pick Where You Left
                <br />
                Your Agent Has{" "}
                <span className="text-[#6cb4ee]">Improved</span>
              </h3>
              <p className="mt-3 text-white/40 text-xs text-center leading-relaxed max-w-[280px] mx-auto">
                Agents on Construct keeps scraping and researching. And provides
                better result after every left conversation
              </p>

            </div>

            {/* Work interface image — sticks to the bottom */}
            <div ref={workImgRef} className="absolute bottom-0 left-16 right-16 z-0 opacity-0">
              <img
                src="/work.png"
                alt="Work interface"
                className="w-full"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
