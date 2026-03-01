import { useEffect, useRef } from "react";
import { animate } from "animejs";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!navRef.current) return;
    animate(navRef.current, {
      opacity: [0, 1],
      translateY: [-20, 0],
      duration: 1000,
      ease: "outCubic",
      delay: 300,
    });
  }, []);

  return (
    <nav
      ref={navRef}
      aria-label="Main navigation"
      className="fixed top-0 left-0 right-0 z-50 opacity-0"
      style={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2 no-underline">
          <span className="text-white text-lg font-semibold italic tracking-tight">
            Construct
          </span>
        </a>

        {/* Nav links — add your own hrefs here */}
        <div className="hidden md:flex items-center gap-8">
        </div>

        <a
          href="#hero"
          className="px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium text-white rounded-full no-underline
                     border border-white/20 hover:border-white/40 transition-all duration-200
                     bg-white/5 hover:bg-white/10"
        >
          Join Waitlist
        </a>
      </div>
    </nav>
  );
}
