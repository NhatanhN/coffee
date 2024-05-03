"use client"

import Link from "next/link"
import styles from "./header.module.css"
import "../globals.css"
import { useState, useEffect } from "react"
import { databaseURL } from "../constants"

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

        setIsSearchResultsLoading(true)
        const query = e.target.q.value
        //fetch results
        const res = await fetch(`${databaseURL}/page/searchpage/${query}/`)
        
        if (!res.ok) {
            setSearchResults([])
            setIsSearchResultsLoading(false)
            return
        }

        const json = await res.json()
        setSearchResults(json)
        setIsSearchResultsLoading(false)
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
                <Link href="/" className={styles.homepageLink}>🏡</Link>
            </div>

            <div className={styles.middle}/>

            <div className={styles.end}>
                {enableSearchBar && (
                    <div className={styles.searchBar} onClick={toggleModal}>
                        <p className={styles.searchBarText}>Search for donation pages</p>
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
                                name="q"
                                type="text"
                                placeholder="Search for a donation page"
                                className={styles.input + " " + styles.modalFormInput}
                            />
                            <button className={styles.formButton}>🔍</button>
                        </form>

                        <div className={styles.searchResultsContainer}>
                            {isSearchResultsLoading ? (
                                <p className={styles.searchLoading}>loading ⌛</p>
                            ) : searchResults[0] == undefined ? (
                                <div>
                                    {/* search results should be empty here */}
                                    <p>No search results.</p>
                                </div>
                            ) : (
                                <div>
                                {searchResults.map(e => 
                                    <div key={e.id} className={styles.searchEntry}>
                                        <Link 
                                            href={`/donate/${e.creatorid}`} 
                                            className={styles.searchLink}
                                        >
                                            <div>
                                                <strong>{e.title}</strong>
                                                <p>{e.creator_username}</p>
                                            </div>
                                        </Link>
                                    </div>
                                )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}