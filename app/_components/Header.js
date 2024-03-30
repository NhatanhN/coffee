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
     * change this when backend functionality becomes available
     */
    const [username, setUsername] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [isModalActive, setIsModalActive] = useState(false)
    const [isSearchResultsLoading, setIsSearchResultsLoading] = useState(true)
    const [searchResults, setSearchResults] = useState()

    const handleSearch = async (e) => {
        e.preventDefault() 


        console.log("search button pressed")
        setIsSearchResultsLoading(true)
        //fetch results
        //setIsSearchResultsLoading(false)
        //setSearchResults(...)
    }

    const toggleModal = () => {
        setIsModalActive(!isModalActive)
    }

    const stopClickPropogation = (e) => {
        e.stopPropagation()
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
                    <div className={styles.searchBar} onClick={toggleModal}>
                        <p className={styles.searchBarText}>Search for coffees</p>
                        <p>🔍</p>
                    </div>
                )}

                {
                    isLoading ? (
                        <p className={styles.linkPlaceholder}></p>
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

            {/**
             * Search modal
             */}
            {isModalActive && (
                <div className={styles.modalContainer} onClick={toggleModal}>
                    <div className={styles.searchContainer} onClick={stopClickPropogation}>
                        <form className={styles.modalFormContainer} onSubmit={handleSearch}>
                            <input 
                                type="text"
                                placeholder="Search for coffees"
                                className={styles.input + " " + styles.modalFormInput}
                            />
                            <button className={styles.formButton}>🔍</button>
                        </form>

                        <div>
                            {isSearchResultsLoading ? (
                                <p className={styles.searchLoading}>loading ⌛</p>
                            ) : (
                                <ul>
                                    {
                                        //searchResults.map(...)
                                    }
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}