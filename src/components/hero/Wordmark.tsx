"use client";
import { motion, useTransform, type MotionValue } from "framer-motion";
import styles from "./hero.module.css";

type Props = {
    bearSrc: string;
    nikkiSrc: string;
    /** Foto do casal (src/assets/nikki-bear.jpg) — mesma fonte do fundo. */
    coupleSrc: string;
    /** Progresso do cross-fade split -> casal (0..1), COMPARTILHADO com o
     *  fundo da section (HeroSplitImages). É a única fonte de verdade da troca
     *  de imagem: quando o fundo vira o casal, o recorte do texto vira junto. */
    reveal: MotionValue<number>;
};

// Recorte "photo-in-text" de OBSESSION. As letras usam background-clip: text
// sobre a MESMA imagem que preenche o fundo da section, então acompanham a
// troca de fundo automaticamente:
//   - .wordPhoto (split Bear|Nikki): opacidade = 1 - reveal
//   - .wordCouple (foto única do casal, cover): opacidade = reveal
//   - .wordWhite (branco + halação): entra por cima na fase final (via CSS)
export function Wordmark({ bearSrc, nikkiSrc, coupleSrc, reveal }: Props) {
    const splitOpacity = useTransform(reveal, (v) => 1 - v);

    return (
        <>
            {/* Halação: feGaussianBlur (raios crescentes) -> feMerge, recolorido
                para branco e com a opacidade reduzida (feComponentTransfer).
                Aplicado SÓ na camada branca (não quebra o photo-in-text). */}
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
                {/* Split — Bear (esquerda) + Nikki (direita). Some conforme o
                    casal entra (mesmo reveal do fundo). */}
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

                {/* Casal — imagem única, cover, mesmo enquadramento do fundo. */}
                <motion.span
                    className={`${styles.wordLayer} ${styles.wordCouple}`}
                    style={{ backgroundImage: `url(${coupleSrc})`, opacity: reveal }}
                    aria-hidden
                >
                    Obsession
                </motion.span>

                {/* Branco com halação — entra por cima na fase final. */}
                <span className={`${styles.wordLayer} ${styles.wordWhite}`} aria-hidden>
                    Obsession
                </span>
            </div>
        </>
    );
}
