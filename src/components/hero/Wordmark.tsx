"use client";
import { motion, useTransform, type MotionValue } from "framer-motion";
import styles from "./hero.module.css";

type Props = {
    bearSrc: string;
    nikkiSrc: string;
    coupleSrc: string;
    reveal: MotionValue<number>;
};

export function Wordmark({ bearSrc, nikkiSrc, coupleSrc, reveal }: Props) {
    const splitOpacity = useTransform(reveal, (v) => 1 - v);

    return (
        <>
            <svg className={styles.svgDefs} aria-hidden focusable="false">
                <defs>
                    <filter
                        id="halation"
                        x="-60%"
                        y="-60%"
                        width="220%"
                        height="220%"
                        colorInterpolationFilters="sRGB"
                    >
                        <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="b1" />
                        <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="b2" />
                        <feGaussianBlur in="SourceAlpha" stdDeviation="14" result="b3" />
                        <feMerge result="glowAlpha">
                            <feMergeNode in="b3" />
                            <feMergeNode in="b2" />
                            <feMergeNode in="b1" />
                        </feMerge>
                        <feFlood floodColor="#ffffff" result="white" />
                        <feComposite
                            in="white"
                            in2="glowAlpha"
                            operator="in"
                            result="whiteGlow"
                        />
                        <feComponentTransfer in="whiteGlow" result="softGlow">
                            <feFuncA type="linear" slope="0.5" />
                        </feComponentTransfer>
                        <feMerge>
                            <feMergeNode in="softGlow" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
            </svg>

            <div className={styles.word}>
                <motion.div className={styles.wordPhoto} style={{ opacity: splitOpacity }}>
                    <span
                        className={`${styles.wordLayer} ${styles.wordLeft}`}
                        style={{ backgroundImage: `url(${bearSrc})` }}
                    >
                        Obsession
                    </span>
                    <span
                        className={`${styles.wordLayer} ${styles.wordRight}`}
                        style={{ backgroundImage: `url(${nikkiSrc})` }}
                    >
                        Obsession
                    </span>
                </motion.div>

                <motion.span
                    className={`${styles.wordLayer} ${styles.wordCouple}`}
                    style={{ backgroundImage: `url(${coupleSrc})`, opacity: reveal }}
                    aria-hidden
                >
                    Obsession
                </motion.span>

                <span className={`${styles.wordLayer} ${styles.wordWhite}`} aria-hidden>
                    Obsession
                </span>
            </div>
        </>
    );
}
