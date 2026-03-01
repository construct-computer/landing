import { useState, useRef, type FormEvent } from "react";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyYPSnHhbdiF0E24x_yeLrsdXAPQUf_NqI7z8cCeAtn16-IY8ROs9ZwE4BKjPWqyQSY/exec";

type Size = "sm" | "md" | "lg";

interface Props {
  size?: Size;
  className?: string;
}

const sizeStyles: Record<Size, { wrapper: string; input: string; button: string }> = {
  sm: {
    wrapper: "h-9 text-xs gap-0",
    input:  "px-3 py-1.5 text-xs min-w-[160px]",
    button: "px-3 py-1.5 text-xs font-medium",
  },
  md: {
    wrapper: "h-12 text-sm gap-0",
    input:  "px-5 py-3 text-sm min-w-[220px]",
    button: "px-6 py-3 text-sm font-medium",
  },
  lg: {
    wrapper: "h-14 text-base gap-0",
    input:  "px-6 py-3.5 text-sm md:text-base min-w-[240px]",
    button: "px-6 md:px-8 py-3.5 text-sm md:text-base font-semibold",
  },
};

export default function WaitlistForm({ size = "md", className = "" }: Props) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const inputRef = useRef<HTMLInputElement>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;

    setState("sending");
    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify({ email: trimmed }),
        mode: "no-cors",
      });
      setState("done");
      setEmail("");
    } catch {
      setState("error");
    }
  };

  const s = sizeStyles[size];

  if (state === "done") {
    return (
      <div className={`flex items-center ${s.wrapper} ${className}`}>
        <span className="text-[#6cb4ee] font-medium px-2">You're on the list!</span>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className={`flex items-center rounded-full border border-white/15
                  bg-white/[0.04] backdrop-blur-sm
                  focus-within:border-white/30 transition-all duration-300
                  ${s.wrapper} ${className}`}
    >
      <input
        ref={inputRef}
        type="email"
        required
        placeholder="Enter your email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (state === "error") setState("idle");
        }}
        className={`bg-transparent text-white placeholder-white/30 outline-none
                    rounded-l-full ${s.input}`}
      />
      <button
        type="submit"
        disabled={state === "sending"}
        className={`rounded-full text-white whitespace-nowrap
                    bg-white/10 border border-white/20
                    hover:bg-white/15 hover:border-white/30
                    disabled:opacity-50 disabled:cursor-wait
                    transition-all duration-200
                    ${s.button}`}
      >
        {state === "sending" ? "..." : state === "error" ? "Retry" : "Join Waitlist"}
      </button>
    </form>
  );
}
