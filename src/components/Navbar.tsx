import { useEffect, useRef } from "react";
import { animate } from "animejs";
import WaitlistForm from "./WaitlistForm";

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
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4" style={{ paddingTop: "max(1rem, env(safe-area-inset-top))" }}>
        <a href="#" className="flex items-center gap-2 no-underline">
          <span className="text-white text-lg font-semibold italic tracking-tight">
            Construct
          </span>
        </a>

        {/* Nav links — add your own hrefs here */}
        <div className="hidden md:flex items-center gap-8">
        </div>

        <WaitlistForm
          size="sm"
          text="Join Waitlist"
          className="!bg-white/5 hover:!bg-white/10 !border-white/20 hover:!border-white/40 !shadow-none font-medium !text-white/80"
        />
      </div>
    </nav>
  );
}
