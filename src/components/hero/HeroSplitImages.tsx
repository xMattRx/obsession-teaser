"use client";
import bear from "@/assets/bear.jpeg";
import nikki from "@/assets/nikki.jpeg";
import couple from "@/assets/nikki-bear.jpg";
import { motion, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import styles from "./hero.module.css";

export function HeroSplitImages({ reveal }: { reveal: MotionValue<number> }) {
    const splitOpacity = useTransform(reveal, (v) => 1 - v);

    return (
        <>
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
