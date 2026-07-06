"use client";

import bear from "@/assets/bear.jpeg";
import nikki from "@/assets/nikki.jpeg";
import nikkiBear from "@/assets/nikki-bear.jpg";
import wishWillow from "@/assets/wish-willow.png";
import { animate, useMotionValue } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AmbientAudio } from "./AmbientAudio";
import { HeroNav } from "./HeroNav";
import { HeroSplitImages } from "./HeroSplitImages";
import { TrailerModal } from "./TrailerModal";
import { Wordmark } from "./Wordmark";
import styles from "./hero.module.css";

// Cinematic reveal timeline:
//   1  split-screen (Bear | Nikki) no fundo; letras emergem recortadas dele.
//   2  split estabelecido (fundo + recorte do texto).
//   3  CROSS-FADE: o fundo split e o recorte trocam JUNTOS para a foto única
//      do casal (~1s), dirigidos pelo mesmo MotionValue coupleReveal.
//   4  casal mantido; texto começa a encolher, tagline entra.
//   5  texto sobe e faz cross-fade para branco com halação; card de produto.
const COUPLE_PHASE = 3;
const STEPS: readonly [phase: number, delayMs: number][] = [
    [2, 1500],
    [3, 3200],
    [4, 5200],
    [5, 7000],
];

export function Hero() {
    const [phase, setPhase] = useState(1);
    const [trailerOpen, setTrailerOpen] = useState(false);
    const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

    // Fonte de verdade ÚNICA da troca de imagem de fundo: 0 = split (Bear|Nikki),
    // 1 = foto do casal. Consumida pelo fundo (HeroSplitImages) e pelo recorte do
    // texto (Wordmark), então os dois cruzam em perfeita sincronia.
    const coupleReveal = useMotionValue(0);
    useEffect(() => {
        const controls = animate(coupleReveal, phase >= COUPLE_PHASE ? 1 : 0, {
            duration: phase >= COUPLE_PHASE ? 1 : 0.6,
            ease: [0.7, 0, 0.2, 1],
        });
        return () => controls.stop();
    }, [phase, coupleReveal]);

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
            <HeroSplitImages reveal={coupleReveal} />

            <div className={styles.darken} />

            <div className={styles.wordmark}>
                <Wordmark
                    bearSrc={bear.src}
                    nikkiSrc={nikki.src}
                    coupleSrc={nikkiBear.src}
                    reveal={coupleReveal}
                />
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
