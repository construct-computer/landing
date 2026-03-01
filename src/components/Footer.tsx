import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const tween = gsap.fromTo(
      footerRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <footer ref={footerRef} className="relative bg-[#000000] py-10 opacity-0 ">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 text-center md:text-left">
          {/* Left: Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-3">
              <img
                src="/construictbwicon.png"
                alt="Construct"
                className="w-6 h-6 object-contain"
              />
              <span className="text-white font-medium text-lg italic" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
                ConstructComputer
              </span>
            </div>
            <span className="text-white/40 text-xs  tracking-wide"

            >
              @2026 Construct Computer. All rights reserved.
            </span>
          </div>

          {/* Center: Links */}
          <div className="flex flex-col items-center md:items-start gap-3 text-xs text-white/70">
            <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>

          {/* Right: Social Icons */}
          <div className="flex items-center gap-5 opacity-60">
            <a href="https://x.com/use_construct" target="_blank" className="hover:opacity-100 transition-opacity">
              <img src="/x-icon.png" alt="X / Twitter" className="w-5 h-5 object-contain" />
            </a>
            <a href="https://discord.gg/puArEQHYN9" target="_blank" className="hover:opacity-100 transition-opacity">
              <img src="/discord-Icon.png" alt="Discord" className="w-6 h-6 object-contain" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
