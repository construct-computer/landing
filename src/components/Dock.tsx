import { useRef, useState } from "react";

interface DockItemConfig {
  id: string;
  label: string;
  icon: string;
}

const dockItems: DockItemConfig[] = [
  { id: "terminal", label: "Terminal", icon: "/icons/terminal.png" },
  { id: "chrome",   label: "Browser",  icon: "/icons/chrome.png" },
  { id: "email",    label: "Mail",     icon: "/icons/email.png" },
  { id: "github",   label: "GitHub",   icon: "/icons/github.png" },
  { id: "vscode",   label: "VS Code",  icon: "/icons/vscode.png" },
  { id: "safari",   label: "Safari",   icon: "/icons/safari.png" },
  { id: "meet",     label: "Meet",     icon: "/icons/meet.png" },
  { id: "files",    label: "Files",    icon: "/icons/file.png" },
  { id: "drive",    label: "Drive",    icon: "/icons/drive.png" },
  { id: "twitter",  label: "Twitter",  icon: "/icons/twitter.png" },
];

// Gaussian magnification constants
const MAX_SCALE = 1.6;
const SIGMA = 60;
const PUSH_FACTOR = 22;

function DockItem({
  item,
  mouseX,
}: {
  item: DockItemConfig;
  mouseX: number | null;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [bouncing, setBouncing] = useState(false);

  let scale = 1;
  let translateX = 0;

  if (mouseX !== null && ref.current) {
    const rect = ref.current.getBoundingClientRect();
    const iconCenterX = rect.left + rect.width / 2;
    const distance = Math.abs(mouseX - iconCenterX);
    const signedDistance = iconCenterX - mouseX;

    scale =
      1 +
      (MAX_SCALE - 1) *
        Math.exp(-(distance * distance) / (2 * SIGMA * SIGMA));

    const normalized = signedDistance / (SIGMA * 1.2);
    translateX =
      Math.abs(normalized) < 0.15
        ? 0
        : normalized * (scale - 1) * PUSH_FACTOR;
  }

  const lift = (scale - 1) * 18;
  const bounceOffset = bouncing ? 22 : 0;

  return (
    <div
      ref={ref}
      className="relative group flex flex-col items-center cursor-pointer"
      onClick={() => {
        if (bouncing) return;
        setBouncing(true);
        setTimeout(() => setBouncing(false), 300);
      }}
    >
      {/* Tooltip */}
      <div
        className="pointer-events-none absolute -top-12
                   opacity-0 scale-95
                   group-hover:opacity-100 group-hover:scale-100
                   transition-all duration-200
                   flex flex-col items-center z-50"
      >
        <div
          className="px-3 py-1 text-xs text-white rounded-md
                     bg-black/80 backdrop-blur-md whitespace-nowrap"
        >
          {item.label}
        </div>
        <div className="w-2 h-2 bg-black/80 rotate-45 -mt-1" />
      </div>

      {/* Icon */}
      <div
        className="relative w-14 h-14 flex items-center justify-center
                   transition-transform duration-100
                   ease-[cubic-bezier(0.34,1.56,0.64,1)]
                   will-change-transform"
        style={{
          transform: `translateX(${translateX}px) translateY(-${lift + bounceOffset}px) scale(${scale})`,
        }}
      >
        <img
          src={item.icon}
          alt={item.label}
          className="w-11 h-11 object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]"
          draggable={false}
        />
      </div>
    </div>
  );
}

export default function Dock() {
  const dockRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState<number | null>(null);

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[3]">
      <div className="relative">
        {/* Glass shelf */}
        <div
          className="absolute bottom-0 -inset-x-5 h-[46px]
                     bg-gradient-to-b from-white/[0.06] to-white/[0.12]
                     backdrop-blur-2xl border-t border-white/[0.08]
                     rounded-2xl"
          style={{
            clipPath: "polygon(3% 0%, 97% 0%, 100% 100%, 0% 100%)",
          }}
        />
        {/* Shelf top edge highlight */}
        <div
          className="absolute -inset-x-5 h-px bg-white/10 rounded-full"
          style={{ bottom: 45 }}
        />

        {/* Icons row */}
        <div
          ref={dockRef}
          className="relative flex items-end gap-0.5 px-5 pb-[8px]"
          onMouseMove={(e) => setMouseX(e.clientX)}
          onMouseLeave={() => setMouseX(null)}
        >
          {dockItems.map((item) => (
            <DockItem key={item.id} item={item} mouseX={mouseX} />
          ))}
        </div>
      </div>
    </div>
  );
}
