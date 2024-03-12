"use client"

import styles from "./accountView.module.css"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function AccountView({ userData, setUserData}) {
    const [isModalActive, setIsModalActive] = useState(false)
    const [subscriptions, setSubscriptions] = useState()

    const router = useRouter()

    const onSignout = () => {
        sessionStorage.clear()
        router.push("/")
    }

    const onDeactivateAcc = () => {
        console.log("deactivate acc button pressed")
    }


    return (
        <>
        <div className={styles.start}>
            <div className={styles.imageBox}>
                <Image 
                    src="/thing.png" 
                    alt="user's profile picture" 
                    width="100"
                    height="100"
                    className={styles.profileImage}
                />
                <button 
                    className={styles.changePicButton}
                    onClick={() => setIsModalActive(!isModalActive)}
                >
                    change profile picture
                </button>
            </div>
            <div className={styles.userInfoBox}>
                <p>{userData.username}</p>
                <p>{userData.userID}</p>
            </div>
            <button 
                className={styles.logoutButton}
                onClick={onSignout}
            >
                Sign Out
            </button>
        </div>

        <div className={styles.middle}>
            <em>No active subscriptions</em>
        </div>

        <div className={styles.end}>
            <button 
                className={styles.deactivateButton}
                onClick={onDeactivateAcc}
            >
                Deactivate Account
            </button>
        </div>
        </>
    )
}