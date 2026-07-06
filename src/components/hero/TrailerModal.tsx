"use client";
import { useEffect } from "react";

// Trailer oficial completo de Obsession (Curry Barker) — parte após "v=" na URL do YouTube.
const YOUTUBE_ID = "gMC8kkwbIQQ";

export function TrailerModal({ onClose }: { onClose: () => void }) {
    // Fecha com ESC e trava o scroll do fundo enquanto o modal está aberto.
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onKey);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [onClose]);

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label="Trailer de Obsession"
            onClick={onClose}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm animate-[fadeIn_.25s_ease]"
        >
            <button
                onClick={onClose}
                aria-label="Fechar trailer"
                style={{
                    top: "max(1.25rem, env(safe-area-inset-top))",
                    right: "max(1.25rem, env(safe-area-inset-right))",
                }}
                className="absolute z-[101] inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-white/30 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:border-white/60 hover:text-white"
            >
                Fechar ✕
            </button>

            <div
                onClick={(e) => e.stopPropagation()}
                className="relative aspect-video w-[min(1100px,92vw)] overflow-hidden rounded-xl border border-white/10 bg-black shadow-[0_40px_120px_rgba(0,0,0,0.7)]"
            >
                <iframe
                    className="absolute inset-0 h-full w-full"
                    src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0`}
                    title="Trailer de Obsession"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
        </div>
    );
}
