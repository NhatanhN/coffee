"use client"

import { useEffect, useState } from "react"
import Header from "../_components/Header"
import styles from "./profile.module.css"

export default function Profile() {
    const [userID, setUserID] = useState()

    useEffect(() => {
        if (sessionStorage.getItem("userID") == null) {
            console.log("user is not logged in")
            /**
             * redirect to login page
             */
            return
        }

        setUserID(sessionStorage.getItem("userID"))
    }, [])


    return (
        <div className={styles.container}>
            <Header/>
            <main className={styles.mainContainer}>

            <p>this is the profile page</p>
            <p>user: {userID}</p>
            </main>
        </div>
    )
}