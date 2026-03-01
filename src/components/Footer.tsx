import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const columns = [
  { title: "Products", links: [] as string[] },
  { title: "Features", links: [] as string[] },
  { title: "API", links: [] as string[] },
  { title: "Company", links: [] as string[] },
  { title: "Resources", links: [] as string[] },
];

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
    <footer ref={footerRef} className="relative bg-black border-t border-white/[0.06] opacity-0">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Link columns — add your own links here */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-white font-semibold text-sm mb-4">{col.title}</h4>
              <ul className="space-y-2.5 list-none p-0 m-0">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/40 hover:text-white/70 text-sm transition-colors no-underline"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row items-center justify-center gap-4 text-center">
          <div className="flex flex-col items-center gap-3">
            <span className="text-white font-bold text-lg italic">Construct Computer</span>
            <div className="flex items-center gap-4 text-sm text-white/40 flex-wrap justify-center">
              <span>&copy;2026 the branding people. All rights reserved.</span>
              {/* Add your own policy links here */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
