"use client";
import { useEffect, useRef, useState } from "react";

// Volume baixo para a música tema tocar apenas "de leve" ao fundo.
const AMBIENT_VOLUME = 0.25;
const FADE_MS = 1500;

export function AmbientAudio() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const fadeRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const [playing, setPlaying] = useState(false);

    const stopFade = () => {
        if (fadeRef.current) {
            clearInterval(fadeRef.current);
            fadeRef.current = null;
        }
    };

    // Sobe o volume de 0 até AMBIENT_VOLUME suavemente ao longo de FADE_MS.
    const fadeIn = (audio: HTMLAudioElement) => {
        stopFade();
        const stepMs = 50;
        const steps = FADE_MS / stepMs;
        let current = 0;
        audio.volume = 0;
        audio.muted = false;
        fadeRef.current = setInterval(() => {
            current += 1;
            const next = Math.min(AMBIENT_VOLUME, (current / steps) * AMBIENT_VOLUME);
            audio.volume = next;
            if (next >= AMBIENT_VOLUME) stopFade();
        }, stepMs);
    };

    const play = (audio: HTMLAudioElement) => {
        audio
            .play()
            .then(() => {
                setPlaying(true);
                fadeIn(audio);
            })
            .catch(() => setPlaying(false));
    };

    // Navegadores só permitem autoplay quando mudo; liberamos o som (com
    // fade-in) no primeiro clique/toque em qualquer lugar da página.
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.volume = 0;

        const start = () => play(audio);

        window.addEventListener("pointerdown", start, { once: true });
        return () => {
            window.removeEventListener("pointerdown", start);
            stopFade();
        };
    }, []);

    const toggle = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (playing) {
            stopFade();
            audio.muted = true;
            setPlaying(false);
            return;
        }

        play(audio);
    };

    return (
        <>
            <audio
                ref={audioRef}
                src="/audio/little-dippers-forever.mp3"
                loop
                autoPlay
                muted
            />
            <button
                onClick={toggle}
                aria-label={playing ? "Desativar música" : "Ativar música"}
                className="fixed bottom-6 left-6 z-[90] rounded-full border border-white/30 bg-white/5 px-4 py-3 text-xs tracking-widest text-white/70 backdrop-blur transition hover:border-white/60 hover:text-white"
            >
                {playing ? "🔊 Música" : "🔇 Música"}
            </button>
        </>
    );
}
