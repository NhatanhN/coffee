import Header from "./_components/Header"
import styles from "./app.module.css"
import "./globals.css"

export default function Landing() {
    return (
        <div className={styles.container}>
            <Header enableSearchBar />
            <main className={styles.mainContainer}>
                <div className={styles.titleContainer}>
                    <h1 className={styles.title}>Donations Page Project</h1>
                </div>

                <div className={styles.cardContainer}>
                    <div className={`${styles.card} ${styles.green}`}>
                        <h4>Donate to a creator</h4>
                    </div>
                    <div className={`${styles.card} ${styles.red}`}>
                        <h4>Or create your own donation page</h4>
                    </div>
                    <div className={`${styles.card} ${styles.yellow}`}>
                        <h4>Made with Next.js and Django</h4>
                    </div>
                </div>
            </main>
        </div>
    )
}