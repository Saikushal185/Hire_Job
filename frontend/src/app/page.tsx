"use client";

import styles from "./page.module.css";
import { FileText, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <div className={styles.hero}>
                    <div className={styles.iconWrapper}>
                        <FileText size={64} className={styles.icon} />
                    </div>
                    <h1 className={styles.title}>Resume Parser</h1>
                    <p className={styles.description}>
                        Upload your resume to automatically match with the best job opportunities.
                        <br />
                        <span className={styles.comingSoon}>Implementation Coming Later</span>
                    </p>

                    <div className={styles.actions}>
                        <Link href="/jobs" className={styles.primaryButton}>
                            Browse Jobs <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
