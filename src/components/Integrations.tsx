import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ICONS = [
  { name: "Twitter", icon: "/icons/twitter.png" },
  { name: "Drive", icon: "/icons/drive.png" },
  { name: "Email", icon: "/icons/email.png" },
  { name: "GitHub", icon: "/icons/github.png" },
  { name: "File", icon: "/icons/file.png" },
  { name: "Meet", icon: "/icons/meet.png" },
  { name: "Safari", icon: "/icons/safari.png" },
  { name: "Terminal", icon: "/icons/terminal.png" },
  { name: "Chrome", icon: "/icons/chrome.png" },
  { name: "VS Code", icon: "/icons/vscode.png" },
];

const SPEED = 0.35; // radians per second

export default function Integrations() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const iconElsRef = useRef<HTMLDivElement[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!sectionRef.current) return;

    /* Responsive orbit radii */
    const mobile = window.innerWidth < 768;
    const rx = mobile ? 140 : 280;
    const ry = mobile ? 60 : 100;

    // Logo zoom-in on scroll
    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Text slide in
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // ── 3D Orbital animation ──
    const icons = iconElsRef.current;
    if (orbitRef.current && icons.length > 0) {
      // Per-icon entrance progress (0 → 1), driven by GSAP tweens
      const entrance = icons.map(() => ({ v: 0 }));

      ScrollTrigger.create({
        trigger: orbitRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          // Stagger entrance — each icon fades in at its orbital position
          icons.forEach((_, i) => {
            gsap.to(entrance[i], {
              v: 1,
              duration: 1,
              ease: "power2.out",
              delay: i * 0.1,
            });
          });

          // Start orbit immediately — entrance blends in smoothly
          let start = 0;
          const tick = (now: number) => {
            if (!start) start = now;
            const elapsed = (now - start) / 1000;

            icons.forEach((el, i) => {
              const ep = entrance[i].v; // 0 → 1 entrance progress
              if (ep < 0.001) {
                el.style.opacity = "0";
                return;
              }

              const baseAngle = (i / icons.length) * 2 * Math.PI;
              const angle = baseAngle + elapsed * SPEED;

              const x = rx * Math.cos(angle);
              const y = ry * Math.sin(angle);

              // depth: sin(angle) → +1 = bottom/front, −1 = top/behind
              const depth = Math.sin(angle);
              const t = (depth + 1) / 2; // 0 = fully behind … 1 = fully in front

              const orbitScale = 0.4 + t * 0.7;
              const orbitOpacity = 0.08 + t * 0.92;
              const zIdx = depth > 0 ? 20 : 5;

              // Blend orbit values with entrance progress
              const scale = orbitScale * (0.3 + ep * 0.7);  // starts small, reaches full orbit scale
              const opacity = orbitOpacity * ep;

              el.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
              el.style.opacity = String(opacity);
              el.style.zIndex = String(zIdx);
            });

            rafRef.current = requestAnimationFrame(tick);
          };

          rafRef.current = requestAnimationFrame(tick);
        },
      });
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      ScrollTrigger.getAll()
        .filter((t) => sectionRef.current?.contains(t.trigger as Element))
        .forEach((t) => t.kill());
    };
  }, []);

  const font = { fontFamily: "Georgia, 'Times New Roman', serif" };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100vh] py-20 bg-black overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Background Video */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/featuresBgVid.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        {/* Darkening overlay */}
        <div className="absolute inset-0 bg-black/60" />
        {/* Top fade out */}
        <div className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-b from-black to-transparent" />
        {/* Bottom fade out */}
        <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-white/[0.015] blur-[100px]" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-white/[0.01] blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-white/[0.01] blur-[80px]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col gap-12 md:gap-0 items-center justify-center">
        {/* Top text — centred on all devices */}
        <div ref={textRef} className="opacity-0 text-center relative z-20">
          <h2
            className="text-3xl md:text-5xl text-white leading-tight italic"
            style={font}
          >
            <span className="text-[#6cb4ee]">Construct</span> makes it all
            <br />
            possible
          </h2>
          <p className="mt-5 text-white/40 text-sm md:text-base leading-relaxed max-w-md mx-auto">
            Agents on Construct can control and manage all the application and
            functionalities available to the OS.
          </p>
        </div>

        {/* Bottom: logo + orbiting icons */}
        <div className="relative flex items-center justify-center w-full min-h-[400px] md:min-h-[550px] -mt-4 md:-mt-24 pointer-events-none">
          {/* Centre logo */}
          <div
            ref={logoRef}
            className="relative z-10 opacity-0 flex items-center justify-center"
          >
            <div className="absolute w-44 h-44 md:w-80 md:h-80 rounded-full bg-[#6cb4ee]/[0.07] blur-[60px] pointer-events-none" />
            <img
              src="/logo.png"
              alt="Construct"
              className="relative w-40 h-40 md:w-80 md:h-80 object-contain
                         drop-shadow-[0_0_40px_rgba(108,180,238,0.15)]"
            />
          </div>

          {/* Orbiting icons — each starts centred, animated by rAF */}
          <div ref={orbitRef} className="absolute inset-0 pointer-events-none">
            <div className="relative w-full h-full">
              {ICONS.map((app, i) => {
                const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
                return (
                  <div
                    key={app.name}
                    ref={(el) => {
                      if (el) iconElsRef.current[i] = el;
                    }}
                    className="absolute opacity-0"
                    style={{
                      left: "50%",
                      top: "50%",
                      width: isMobile ? 64 : 80,
                      height: isMobile ? 64 : 80,
                      marginLeft: isMobile ? -32 : -40,
                      marginTop: isMobile ? -32 : -40,
                      willChange: "transform, opacity",
                    }}
                  >
                    <img
                      src={app.icon}
                      alt={app.name}
                      className="w-full h-full object-contain
                                 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                      draggable={false}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
