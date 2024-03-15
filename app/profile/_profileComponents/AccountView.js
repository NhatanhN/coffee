"use client"

import ProfileImage from "@/app/_components/ProfileImage"
import styles from "./accountView.module.css"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function AccountView({ userData, setUserData}) {
    const [subscriptions, setSubscriptions] = useState([])
    const [isModalActive, setIsModalActive] = useState(false)
    const [newProfilePic, setNewProfilePic] = useState()

    const router = useRouter()

    const onSignout = () => {
        sessionStorage.clear()
        router.push("/")
    }

    const onDeactivateAcc = () => {
        console.log("deactivate acc button pressed")
    }

    const stopClickPropogation = (e) => {
        e.stopPropagation()
    }

    const updateProfilePic = (e) => {
        const imgSrc = URL.createObjectURL(e.target.files[0])
        setNewProfilePic(imgSrc)
    }
    
    const submitForm = (e) => {
        e.preventDefault()
        console.log("button pressed")
    }

    useEffect(() => {
        /**
         * fetch active subscription data here
         * e.g.
         * const res = await fetch(...)
         * setSubscriptions(res)
         */
    })

    return (
        <>
        {isModalActive && (
            <div 
                className={styles.modalContainer}
                onClick={() => setIsModalActive(!isModalActive)}
            >
                <div 
                    className={styles.formContainer}
                    onClick={stopClickPropogation}
                >
                    <form
                        className={styles.updateImgForm}
                        method="POST"
                    >
                        <h2>Update profile image</h2>
                        <ProfileImage src={newProfilePic} alt={"profile pic to be uploaded"}/>
                        <div>
                            <label htmlFor="image" className={styles.label}>
                                Select new profile image
                            </label>
                            <br />
                            <input 
                                type="file" 
                                name="image" 
                                accept="image/*" 
                                capture="user" 
                                onChange={updateProfilePic}
                            />
                        </div>
                        <button
                            className={styles.formButton}
                            onClick={submitForm}
                        >
                            Update profile image
                        </button>
                    </form>
                </div>
            </div>
        )}

        <div className={styles.start}>
            <div className={styles.imageBox}>
                <ProfileImage />
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
            {
                subscriptions.length == 0 ? (
                    <div className={styles.noSubscriptionsContainer}>
                        <em>☀🌻✌No active subscriptions</em>
                    </div>
                ) : (
                    <em>display active subscriptions here</em>
                )
            }
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