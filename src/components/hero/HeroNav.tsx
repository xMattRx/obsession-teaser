import styles from "./hero.module.css";

export function HeroNav({ onWatchTrailer }: { onWatchTrailer: () => void }) {
    return (
        <nav className={styles.nav}>
            <div className={styles.brand}>Obsession</div>
            <div className={styles.navlinks}>
                <a className={styles.navlink} href="#">Loja</a>
                <a className={styles.navlink} href="#">Comprar Ingressos</a>
                <a className={styles.navlink} href="#">Eventos</a>
                <button className={styles.trailerbtn} onClick={onWatchTrailer}>
                    <span className={styles.tridot} />
                    Assistir Trailer
                </button>
            </div>
        </nav>
    );
}
