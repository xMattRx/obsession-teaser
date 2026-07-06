"use client";
import bear from "@/assets/bear.jpeg";
import nikki from "@/assets/nikki.jpeg";
import couple from "@/assets/nikki-bear.jpg";
import { motion, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import styles from "./hero.module.css";

// Fundo da hero. Ocupa a section inteira, atrás do texto. Faz um cross-fade da
// composição split (Bear | Nikki) para UMA única foto (o casal) dirigido pelo
// MotionValue `reveal` (0 -> 1) — o MESMO valor que o Wordmark usa no recorte
// do texto, para fundo e texto compartilharem fonte e estado da timeline.
export function HeroSplitImages({ reveal }: { reveal: MotionValue<number> }) {
    const splitOpacity = useTransform(reveal, (v) => 1 - v);

    return (
        <>
            {/* Split inicial: Bear (esquerda) | Nikki (direita), fundo inteiro. */}
            <motion.div className={styles.split} style={{ opacity: splitOpacity }}>
                <div className={`${styles.half} ${styles.left}`}>
                    <div className={`${styles.portrait} ${styles["p-bear"]}`}>
                        <Image
                            src={bear}
                            alt="Bear"
                            fill
                            sizes="50vw"
                            loading="eager"
                            placeholder="blur"
                            style={{ objectFit: "cover", objectPosition: "center 30%" }}
                        />
                    </div>
                    <div className={styles.cap}>
                        <div className={styles.cn}>Bear</div>
                    </div>
                </div>
                <div className={`${styles.half} ${styles.right}`}>
                    <div className={`${styles.portrait} ${styles["p-nikki"]}`}>
                        <Image
                            src={nikki}
                            alt="Nikki"
                            fill
                            sizes="50vw"
                            loading="eager"
                            placeholder="blur"
                            style={{ objectFit: "cover", objectPosition: "center 25%" }}
                        />
                    </div>
                    <div className={styles.cap}>
                        <div className={styles.cn}>Nikki</div>
                    </div>
                </div>
            </motion.div>

            {/* Foto ÚNICA do casal — substitui o split ocupando o fundo inteiro
                (cover, centralizada). Mesma fonte usada no recorte do texto. */}
            <motion.div className={styles.coupleBg} style={{ opacity: reveal }}>
                <Image
                    src={couple}
                    alt="Nikki e Bear"
                    fill
                    sizes="100vw"
                    placeholder="blur"
                    style={{ objectFit: "cover", objectPosition: "center 38%" }}
                />
            </motion.div>

            <div className={styles.divider} />
        </>
    );
}
