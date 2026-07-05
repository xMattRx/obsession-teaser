"use client";

import wishWillow from "@/assets/wish-willow.png";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AmbientAudio } from "./AmbientAudio";
import { HeroNav } from "./HeroNav";
import { HeroSplitImages } from "./HeroSplitImages";
import { TrailerModal } from "./TrailerModal";
import styles from "./hero.module.css";

// Cinematic reveal sequence: split portraits collapse into a spinning blob,
// which resolves into the OBSESSION wordmark, tagline, and product card.
const STEPS: readonly [phase: number, delayMs: number][] = [
    [2, 1600],
    [3, 3300],
    [4, 5000],
    [5, 6600],
];

export function Hero() {
    const [phase, setPhase] = useState(1);
    const [trailerOpen, setTrailerOpen] = useState(false);
    const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

    const clear = useCallback(() => {
        timers.current.forEach(clearTimeout);
        timers.current = [];
    }, []);

    const schedule = useCallback(() => {
        timers.current = STEPS.map(([p, t]) =>
            setTimeout(() => setPhase(p), t)
        );
    }, []);

    const run = useCallback(() => {
        clear();
        setPhase(1);
        schedule();
    }, [clear, schedule]);

    // On mount phase is already 1, so just arm the sequence timers.
    useEffect(() => {
        schedule();
        return clear;
    }, [schedule, clear]);

    const skip = useCallback(() => {
        clear();
        setPhase(5);
    }, [clear]);

    return (
        <div className={styles.stage} data-phase={phase}>
            <HeroSplitImages />

            <div className={styles.blobwrap}>
                <div className={styles.blob} />
            </div>

            <div className={styles.wordmark}>
                <div className={styles.word}>Obsession</div>
            </div>

            <div className={styles.glow} />

            <div className={styles.tag}>
                <div className={styles.tagline}>Cuidado Com O Que Você Deseja</div>
                <button className={styles.trailerbtn2} onClick={() => setTrailerOpen(true)}>
                    <span className={styles.playtri} />
                    Assistir Trailer
                </button>
            </div>

            <div className={styles.product}>
                <div className={styles.pcard}>
                    <div className={styles.willow}>
                        <Image
                            src={wishWillow}
                            alt="Réplica do amuleto One Wish Willow"
                            fill
                            sizes="230px"
                            placeholder="blur"
                            style={{ objectFit: "contain", objectPosition: "center", padding: "18px" }}
                        />
                        <div className={styles.wtag}>One Wish Willow · réplica</div>
                    </div>
                    <div className={styles.pmeta}>
                        <div className={styles.kick}>Como Visto No Filme</div>
                        <h3>One&nbsp;Wish&nbsp;Willow</h3>
                        <p>
                            Réplica em resina feita à mão do antigo amuleto dos
                            desejos. Quebre o galho e faça seu pedido. Algumas
                            coisas, uma vez concedidas, não podem ser desfeitas.
                        </p>
                        <div className={styles.prow}>
                            <span className={styles.price}>R$34,00</span>
                            <button className={styles.buy} onClick={() => { }}>
                                Comprar Agora
                            </button>
                            <button className={styles.how} onClick={() => { }}>
                                Como Funciona
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <HeroNav onWatchTrailer={() => setTrailerOpen(true)} />

            {trailerOpen && <TrailerModal onClose={() => setTrailerOpen(false)} />}

            <AmbientAudio />

            <div className={styles.grain} />
            <div className={styles.vig} />
            <div
                className={styles.progress}
                style={{ width: `${((phase - 1) / 4) * 100}%` }}
            />

            <div className={styles.controls}>
                <button className={styles.ctl} onClick={run}>
                    ↻ Repetir
                </button>
                <button className={styles.ctl} onClick={skip}>
                    Pular ↴
                </button>
            </div>
        </div>
    );
}
