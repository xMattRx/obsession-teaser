"use client";
import { useEffect, useRef, useState } from "react";

const AMBIENT_VOLUME = 0.25;
const FADE_MS = 1500;

export function useAmbientAudio() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const fadeRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const [playing, setPlaying] = useState(false);

    const stopFade = () => {
        if (fadeRef.current) {
            clearInterval(fadeRef.current);
            fadeRef.current = null;
        }
    };

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

    const audio = (
        <audio
            ref={audioRef}
            src="/audio/little-dippers-forever.mp3"
            loop
            autoPlay
            muted
        />
    );

    return { playing, toggle, audio };
}
