import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* Floating app icon data — explicit offsets from center (px) */
/* 10 icons distributed evenly around an ellipse (rx=210, ry=185) */
const ICON_NAMES = [
  { name: "Twitter",  icon: "/icons/twitter.png"  },
  { name: "Drive",    icon: "/icons/drive.png"     },
  { name: "Email",    icon: "/icons/email.png"     },
  { name: "GitHub",   icon: "/icons/github.png"    },
  { name: "File",     icon: "/icons/file.png"      },
  { name: "Meet",     icon: "/icons/meet.png"      },
  { name: "Safari",   icon: "/icons/safari.png"    },
  { name: "Terminal", icon: "/icons/terminal.png"  },
  { name: "Chrome",   icon: "/icons/chrome.png"    },
  { name: "VS Code",  icon: "/icons/vscode.png"    },
];
const RX = 210;
const RY = 185;
const APP_ICONS = ICON_NAMES.map((item, i) => {
  const angle = (i / ICON_NAMES.length) * 2 * Math.PI - Math.PI / 2;
  return { ...item, ox: Math.cos(angle) * RX, oy: Math.sin(angle) * RY };
});

export default function Integrations() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const iconElsRef = useRef<HTMLDivElement[]>([]);

  /* ── Mouse-proximity repel effect ── */
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!iconsRef.current) return;
    const rect = iconsRef.current.getBoundingClientRect();
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Logo zoom-in on scroll, then stays
    if (logoRef.current) {
      gsap.fromTo(logoRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 1, ease: "back.out(1.4)",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none none" },
        }
      );
    }

    // Text slide in
    if (textRef.current) {
      gsap.fromTo(textRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: textRef.current, start: "top 82%", toggleActions: "play none none reverse" },
        }
      );
    }

    // Icons stagger entrance + start floating
    if (iconsRef.current) {
      const els = iconsRef.current.querySelectorAll<HTMLDivElement>(".app-icon");
      iconElsRef.current = Array.from(els);

      ScrollTrigger.create({
        trigger: iconsRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          // Stagger entrance — use GSAP so transforms don't conflict
          iconElsRef.current.forEach((el, i) => {
            const entranceDelay = i * 0.08;

            gsap.fromTo(el,
              { opacity: 0, scale: 0.2 },
              {
                opacity: 1,
                scale: 1,
                duration: 0.9,
                ease: "back.out(1.7)",
                delay: entranceDelay,
                onComplete: () => {
                  // Start floating only after this icon's entrance is done
                  const duration = 3 + (i % 3) * 0.8;
                  const yAmp = 8 + (i % 4) * 3;
                  const xAmp = 4 + (i % 3) * 2;

                  gsap.to(el, {
                    y: `+=${yAmp}`,
                    x: `+=${xAmp}`,
                    duration,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                  });
                },
              }
            );
          });
        },
      });
    }

    // Mouse proximity repel loop
    const container = iconsRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);

      const tick = () => {
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;

        iconElsRef.current.forEach((el) => {
          const rect = el.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          const elCx = rect.left - containerRect.left + rect.width / 2;
          const elCy = rect.top - containerRect.top + rect.height / 2;

          const dx = elCx - mx;
          const dy = elCy - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 150;

          if (dist < maxDist && dist > 0) {
            const force = ((maxDist - dist) / maxDist) * 18;
            const pushX = (dx / dist) * force;
            const pushY = (dy / dist) * force;
            gsap.to(el, {
              "--repelX": `${pushX}px`,
              "--repelY": `${pushY}px`,
              duration: 0.3,
              ease: "power2.out",
              overwrite: "auto",
            });
          } else {
            gsap.to(el, {
              "--repelX": "0px",
              "--repelY": "0px",
              duration: 0.6,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
        });

        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      container?.removeEventListener("mousemove", handleMouseMove);
      ScrollTrigger.getAll()
        .filter((t) => sectionRef.current?.contains(t.trigger as Element))
        .forEach((t) => t.kill());
    };
  }, [handleMouseMove]);

  const font = { fontFamily: "Georgia, 'Times New Roman', serif" };

  return (
    <section ref={sectionRef} className="relative py-28 md:py-40 bg-black overflow-hidden">
      {/* Dark swirl-like radial bg */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-white/[0.015] blur-[100px]" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-white/[0.01] blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-white/[0.01] blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-[1fr_1.5fr] gap-12 items-center">
        {/* Left text */}
        <div ref={textRef} className="opacity-0">
          <h2 className="text-3xl md:text-5xl text-white leading-tight italic" style={font}>
            <span className="text-[#6cb4ee]">Construct</span> makes it
            <br />all possible
          </h2>
          <p className="mt-5 text-white/40 text-sm leading-relaxed max-w-xs">
            Agents on Construct can control and manage all the application and functionalities available to the OS.
          </p>
        </div>

        {/* Right: logo + floating icons */}
        <div className="relative flex items-center justify-center min-h-[420px] md:min-h-[480px]">
          {/* Center logo */}
          <div
            ref={logoRef}
            className="relative z-10 opacity-0
                       flex items-center justify-center"
          >
            {/* Radial glow behind logo */}
            <div className="absolute w-56 h-56 md:w-72 md:h-72 rounded-full bg-[#6cb4ee]/[0.07] blur-[60px] pointer-events-none" />
            <img
              src="/logo.png"
              alt="Construct"
              className="relative w-48 h-48 md:w-64 md:h-64 object-contain
                         drop-shadow-[0_0_40px_rgba(108,180,238,0.15)]"
            />
          </div>

          {/* Floating app icons */}
          <div ref={iconsRef} className="absolute inset-0 z-20">
            {APP_ICONS.map((app) => (
              <div
                key={app.name}
                className="app-icon absolute opacity-0 cursor-pointer"
                style={{
                  left: `calc(50% + ${app.ox}px - 28px)`,
                  top: `calc(50% + ${app.oy}px - 28px)`,
                  translate: "var(--repelX, 0px) var(--repelY, 0px)",
                }}
              >
                <img
                  src={app.icon}
                  alt={app.name}
                  className="w-14 h-14 md:w-16 md:h-16 object-contain
                             drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]
                             transition-all duration-300 ease-out
                             hover:scale-125 hover:drop-shadow-[0_4px_20px_rgba(108,180,238,0.4)] hover:-translate-y-1"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
