import bear from "@/assets/bear.jpeg";
import nikki from "@/assets/nikki.jpeg";
import Image from "next/image";
import styles from "./hero.module.css";

export function HeroSplitImages() {
    return (
        <>
            <div className={styles.split}>
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
            </div>
            <div className={styles.divider} />
        </>
    );
}
