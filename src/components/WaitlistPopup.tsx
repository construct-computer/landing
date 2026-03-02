import { useState, useRef, useEffect, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";

const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbwaRZqjoeY5virReK6xblbih_SWHFo213tAty13WLSgdmJwKoLXYHL2nBXlcUVrmi4q/exec";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export default function WaitlistPopup({ isOpen, onClose }: Props) {
    const [email, setEmail] = useState("");
    const [about, setAbout] = useState("");
    const [state, setState] = useState<"idle" | "error" | "sending" | "done">("idle");
    const [aboutWarning, setAboutWarning] = useState(false);
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

            // Focus input on desktop only — iOS keyboard causes viewport jump
            if (window.innerWidth >= 768) {
                setTimeout(() => {
                    if (inputRef.current) inputRef.current.focus();
                }, 500);
            }

        } else {
            document.body.style.overflow = "";
            setState("idle");
            setEmail("");
            setAbout("");
            setAboutWarning(false);
        }
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

        if (!about.trim()) {
            setAboutWarning(true);
            return;
        }

        setState("sending");
        try {
            await fetch(SCRIPT_URL, {
                method: "POST",
                body: JSON.stringify({ email: trimmed, about: about.trim() }),
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

    // Escape key to close
    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto py-4">
            {/* Backdrop */}
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-black/60 backdrop-blur-md opacity-0"
                onClick={handleClose}
            />

            {/* Modal Container */}
            <div
                ref={modalRef}
                className="relative z-10 w-full max-w-[500px] mx-4 p-6 md:p-10 
                   bg-[#050505] border border-white/10 rounded-[32px] 
                   flex flex-col items-center justify-center
                   shadow-2xl shadow-black/80 opacity-0"
            >
                {/* Close Button top right */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-colors"
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
                    Construct
                </h2>

                {/* Subtitle */}
                <p className="text-sm text-white/60 text-center mb-10 max-w-[90%] not-italic leading-relaxed">
                    Join our waitlist for early access to autonomous AI agents.
                    <br />
                    <span className="text-[#6cb4ee]">Select applicants may get early closed beta access.</span>
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
                            className="flex flex-col gap-3 w-full"
                        >
                            {/* Email */}
                            <label className="text-xs text-white/30 ml-4 -mb-2.5">Email</label>
                            <div className="flex items-center w-full h-12 rounded-2xl border border-white/10
                              bg-white/[0.04] backdrop-blur-sm
                              focus-within:border-white/30 transition-all duration-300">
                                <input
                                    ref={inputRef}
                                    type="email"
                                    required
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (state === "error") setState("idle");
                                    }}
                                    className="flex-1 bg-transparent text-white placeholder-white/40 outline-none
                                        rounded-full px-5 py-3 text-sm"
                                />
                            </div>

                            {/* About */}
                            <label className="text-xs text-white/30 ml-3 -mb-2.5">
                                Tell us about yourself <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                placeholder="How did you find us? What do you work on? What would you build with Construct?"
                                required
                                value={about}
                                onChange={(e) => {
                                    setAbout(e.target.value);
                                    if (aboutWarning) setAboutWarning(false);
                                }}
                                rows={4}
                                className={`w-full bg-white/[0.04] backdrop-blur-sm text-white placeholder-white/40
                                    outline-none rounded-3xl px-5 py-3 text-sm resize-none
                                    border transition-all duration-300
                                    ${aboutWarning
                                        ? "border-red-500/60 focus:border-red-500/80"
                                        : "border-white/10 focus:border-white/30"
                                    }`}
                            />
                            {aboutWarning && (
                                <p className="text-xs text-red-400 ml-3 -mt-1.5">Please tell us a bit about yourself</p>
                            )}

                            {/* Submit button */}
                            <button
                                type="submit"
                                disabled={state === "sending"}
                                className="h-12 w-full rounded-full text-white whitespace-nowrap not-italic
                                    bg-white/10 border border-white/10
                                    hover:bg-white/15 hover:border-white/30
                                    disabled:opacity-50 disabled:cursor-wait
                                    transition-all duration-200 text-sm font-medium"
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
