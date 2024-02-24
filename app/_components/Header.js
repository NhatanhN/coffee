"use client"

import Link from "next/link"
import styles from "./header.module.css"
import "../globals.css"

export default function Header() {
    const handleSearch = () => {
        console.log("search button pressed")
    }

    return (
        <div className={styles.container}>
            <div className={styles.start}>
                🦆🌟
            </div>

            <div className={styles.middle}/>

            <div className={styles.end}>
                <form className={styles.form}>
                    <input 
                        type="text"
                        placeholder="Search for (patreons)"
                        className={styles.input}
                    />
                    <button 
                        className={styles.formButton} 
                        onClick={handleSearch}
                    >
                        🔍
                    </button>
                </form>
                <Link href="/login" className={styles.link}>
                    <strong>Log in</strong>
                </Link>
                <Link href="/signup" className={styles.link}>
                    <strong>Sign up</strong>
                </Link>
            </div>

        </div>
    )
}