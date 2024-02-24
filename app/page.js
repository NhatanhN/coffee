import Header from "./_components/Header"
import styles from "./app.module.css"

export default function Landing() {
    return (
        <div className={styles.container}>
            <Header />
            <main className={styles.mainContainer}>
                <p>make this look good :C</p>
            </main>
        </div>
    )
}