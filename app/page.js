import Header from "./_components/Header"
import styles from "./app.module.css"


export default function Landing() {
    return (
        <div className={styles.container}>
            <Header enableSearchBar />
            <main className={styles.mainContainer}>
                <p>landing page</p>
            </main>
        </div>
    )
}