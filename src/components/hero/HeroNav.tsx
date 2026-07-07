"use client";
import { useState } from "react";
import styles from "./hero.module.css";

const LINKS = [
    { label: "Loja", href: "#" },
    { label: "Comprar Ingressos", href: "#" },
    { label: "Eventos", href: "#" },
];

export function HeroNav({ onWatchTrailer }: { onWatchTrailer: () => void }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className={styles.nav}>
            <div className={styles.brand}>Obsession</div>

            <div className={styles.navactions}>
                <div className={styles.navlinks}>
                    {LINKS.map((l) => (
                        <a key={l.label} className={styles.navlink} href={l.href}>
                            {l.label}
                        </a>
                    ))}
                </div>

                <button className={styles.trailerbtn} onClick={onWatchTrailer}>
                    <span className={styles.tridot} />
                    Assistir Trailer
                </button>

                <button
                    type="button"
                    className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ""}`}
                    aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
                    aria-expanded={menuOpen}
                    aria-controls="hero-mobile-menu"
                    onClick={() => setMenuOpen((v) => !v)}
                >
                    <span className={styles.hbar} />
                    <span className={styles.hbar} />
                    <span className={styles.hbar} />
                </button>
            </div>

            <div
                id="hero-mobile-menu"
                className={`${styles.mobilemenu} ${menuOpen ? styles.mobilemenuOpen : ""}`}
            >
                {LINKS.map((l) => (
                    <a
                        key={l.label}
                        className={styles.mobilelink}
                        href={l.href}
                        onClick={() => setMenuOpen(false)}
                    >
                        {l.label}
                    </a>
                ))}
            </div>
        </nav>
    );
}
