"use client"

import Link from "next/link"
import styles from "./header.module.css"
import "../globals.css"
import { useState, useEffect } from "react"

/**
 * @prop {String} username | 
 * @prop {boolean} enableSearchBar | displays the search patreon box
 */
export default function Header( { enableSearchBar } ) {

    /**
     * change this when backend functionality becomes available !!!!!!
     */
    const [username, setUsername] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const handleSearch = () => {
        console.log("search button pressed")
    }

    useEffect(() => {
        const name = sessionStorage.getItem("username")
        if (name != null) {
            setUsername(name)
        }
        setIsLoading(false)
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.start}>
                <Link href="/" className={styles.homepageLink}>🦆🌟</Link>
            </div>

            <div className={styles.middle}/>

            <div className={styles.end}>
                {enableSearchBar && (
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
                )}

                {
                    isLoading ? (
                        <p className={styles.linkPlacerholder}></p>
                    ) : username == null ? (
                        <>
                        <Link href="/login" className={styles.link}>
                            <strong>Log in</strong>
                        </Link>
                        <Link href="/signup" className={styles.link}>
                            <strong>Sign up</strong>
                        </Link>
                        </>
                    ) : (
                        <Link href="/profile" className={styles.link}>
                            <strong>{username}</strong>
                        </Link>
                    )
                }
                
            </div>

        </div>
    )
}