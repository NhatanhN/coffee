import Header from "./_components/Header"
import styles from "./app.module.css"
import Image from 'next/image'
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
                        <div className={styles.imageContainer}>
                            <Image
                                src="/donating.png"
                                alt="cursor hovering over a donation button"
                                width={80}
                                height={80}
                                className={styles.png}
                            />
                        </div>
                    </div>
                    <div className={`${styles.card} ${styles.red}`}>
                        <h4>Create a donation page</h4>
                        <div className={styles.imageContainer}>
                            <Image
                                src="/create-page.png"
                                alt="cursor hovering over a create page button"
                                width={80}
                                height={80}
                                className={styles.png}
                            />
                        </div>
                    </div>
                    <div className={`${styles.card} ${styles.yellow}`}>
                        <h4>Made with Next.js and Django</h4>
                        <div className={styles.svgContainer}>
                            <Image
                                src="/nextjs-icon.svg"
                                alt="next.js icon"
                                width={70}
                                height={70}
                                style={{
                                    width: "45%",
                                    height: "auto",
                                    alignSelf: "flex-start"
                                }}
                            />
                            <Image
                                src="/django.svg"
                                alt="django icon"
                                width={70}
                                height={70}
                                style={{
                                    width: "60%",
                                    height: "auto",
                                    alignSelf: "flex-end"
                                }}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}