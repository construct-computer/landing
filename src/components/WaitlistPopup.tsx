import { useState, useRef, useEffect, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";

const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbyYPSnHhbdiF0E24x_yeLrsdXAPQUf_NqI7z8cCeAtn16-IY8ROs9ZwE4BKjPWqyQSY/exec";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export default function WaitlistPopup({ isOpen, onClose }: Props) {
    const [email, setEmail] = useState("");
    const [state, setState] = useState<"idle" | "error" | "sending" | "done">("idle");
    const overlayRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";

            const tl = gsap.timeline();

            if (overlayRef.current) {
                tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" }, 0);
            }

            if (modalRef.current) {
                tl.fromTo(
                    modalRef.current,
                    { opacity: 0, y: 20, scale: 0.95 },
                    { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.2)" },
                    0.1
                );
            }

            // Small delay to focus input
            setTimeout(() => {
                if (inputRef.current) inputRef.current.focus();
            }, 500);

        } else {
            document.body.style.overflow = "";
            setState("idle");
            setEmail("");
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    const handleClose = () => {
        if (!isOpen) return;

        const tl = gsap.timeline({
            onComplete: onClose
        });

        if (modalRef.current) {
            tl.to(modalRef.current, { opacity: 0, scale: 0.95, y: 10, duration: 0.2, ease: "power2.in" }, 0);
        }

        if (overlayRef.current) {
            tl.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: "power2.in" }, 0.1);
        }
    };

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

            // Auto close after success
            setTimeout(() => {
                handleClose();
            }, 3000);
        } catch {
            setState("error");
        }
    };

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center  overflow-hidden">
            {/* Backdrop */}
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-black/60 backdrop-blur-md opacity-0"
                onClick={handleClose}
            />

            {/* Modal Container */}
            <div
                ref={modalRef}
                className="relative z-10 w-full max-w-[500px] mx-4 p-10 
                   bg-[#050505] border border-white/10 rounded-[32px] 
                   flex flex-col items-center justify-center
                   shadow-2xl shadow-black/80 opacity-0"
            >
                {/* Close Button top right */}
                <button
                    onClick={handleClose}
                    className="absolute top-5 right-5 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-colors"
                >
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M1 13L13 1M1 1L13 13" />
                    </svg>
                </button>

                {/* 3D App Icon */}
                <div className="mb-6 pointer-events-none drop-shadow-[0_8px_20px_rgba(108,180,238,0.2)]">
                    <img
                        src="/logo.png"
                        alt="Construct"
                        className="w-24 h-24 md:w-28 md:h-28 object-contain mix-blend-screen opacity-90"
                    />
                </div>

                {/* Title */}
                <h2
                    className="text-2xl md:text-3xl font-medium italic text-white mb-4"
                    style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                >
                    ConstructComputer
                </h2>

                {/* Subtitle */}
                <p className="text-sm text-white/50 text-center mb-10 max-w-[80%]  not-italic">
                    Join our wait list and, become part of the new meta.
                </p>

                {/* Form area */}
                <div className="w-full relative px-2 md:px-6">
                    {/* Subtle green glowing line across the top of the input area */}
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4ade80]/50 to-transparent -translate-y-6 pointer-events-none" />

                    {state === "done" ? (
                        <div className="flex items-center justify-center h-12 w-full bg-white/5 rounded-full border border-white/10 text-[#6cb4ee]">
                            You're on the list!
                        </div>
                    ) : (
                        <form
                            onSubmit={submit}
                            className={`flex items-center w-full h-12 rounded-full border border-white/10
                          bg-white/[0.04] backdrop-blur-sm
                          focus-within:border-white/30 transition-all duration-300`}
                        >
                            <input
                                ref={inputRef}
                                type="email"
                                required
                                placeholder="Enter your Email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (state === "error") setState("idle");
                                }}
                                className={`flex-1 bg-transparent text-white placeholder-white/40 outline-none
                            rounded-l-full px-5 py-3 text-sm`}
                            />
                            <button
                                type="submit"
                                disabled={state === "sending"}
                                className={`h-[90%] mx-[2px] rounded-full text-white whitespace-nowrap not-italic
                            bg-white/10 border border-white/10 shadow-[inner_0_0_10px_rgba(255,255,255,0.05)]
                            hover:bg-white/15 hover:border-white/30
                            disabled:opacity-50 disabled:cursor-wait
                            transition-all duration-200 px-5 text-sm font-medium `}
                            >
                                {state === "sending" ? "..." : state === "error" ? "Retry" : "Join Waitlist"}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
}
