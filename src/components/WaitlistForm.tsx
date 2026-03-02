import { useState } from "react";
import WaitlistPopup from "./WaitlistPopup";

type Size = "sm" | "md" | "lg";

interface Props {
  size?: Size;
  className?: string;
  text?: string;
}

const sizeStyles: Record<Size, string> = {
  sm: "px-5 py-2.5 text-xs min-h-[44px] flex items-center justify-center",
  md: "px-6 py-2.5 text-sm min-h-[44px] flex items-center justify-center",
  lg: "px-8 py-3.5 text-base",
};

export default function WaitlistForm({ size = "md", className = "", text = "Join Waitlist" }: Props) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const s = sizeStyles[size];

  return (
    <>
      <button
        onClick={() => setIsPopupOpen(true)}
        className={`rounded-full text-white/90 whitespace-nowrap
                    bg-white/1
                    border border-white/50 shadow-[0_0_20px_rgba(255,255,255,0.03)]
                    hover:bg-cyan-500/15 hover:border-cyan-500/30 hover:text-white
                    transition-all duration-300  font-medium
                    ${s} ${className}`}
      >
        {text}
      </button>

      {/* Render the popup in the DOM. It handles its own visibility state (isOpen) */}
      <WaitlistPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </>
  );
}
