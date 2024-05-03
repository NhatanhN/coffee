"use client"

import ProfileImage from "@/app/_components/ProfileImage"
import styles from "./accountView.module.css"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { databaseURL } from "@/app/constants"

export default function AccountView({ userData, setUserData}) {
    const [isModalActive, setIsModalActive] = useState(false)
    const [newProfilePic, setNewProfilePic] = useState()
    const [profilePicSrc, setProfilePicSrc] = useState()
    const [donationAmt, setDonationAmt] = useState(-1)
    const [subscriptionAmt, setSubscriptionAmt] = useState(-1)
    
    const router = useRouter()

    const onSignout = () => {
        sessionStorage.clear()
        router.push("/")
    }

    const onDeleteAccount = async () => {
        const id = sessionStorage.getItem("userID")
        const res = await fetch(`${databaseURL}/page/deletepage/${id}/`, {
            method: "DELETE"
        })
        sessionStorage.clear()
        router.push("/")
    }

    const stopClickPropogation = (e) => {
        e.stopPropagation()
    }

    const updateProfilePic = (e) => {
        const imgSrc = URL.createObjectURL(e.target.files[0])
        setNewProfilePic(imgSrc)
    }
    
    // uploads updated profile pic 
    const submitForm = async (e) => {
        e.preventDefault()
        /*
        const data = new FormData()
        const image = await fetch(newProfilePic)
        data.append("image", await image.blob())
        
        // Must upload to a specified update image endpoint !!
        const res = await fetch(``, {
            method: "POST",
            body: data
        })

        const json = await res.json()
        sessionStorage.setItem("profilePicID", json.imageid)
        setIsModalActive(false)
        const picID = sessionStorage.getItem("profilePicID")
        setProfilePicSrc(`${databaseURL}/image/${picID}`)
        */
    }
    
    const loadDonationStats = async () => {
        const userID = sessionStorage.getItem("userID")
        const pageDataResponse = await fetch(`${databaseURL}/page/viewpage/${userID}`)
        if (!pageDataResponse.ok) return

        const { id } = await pageDataResponse.json()
        const pageAmtResponse = await fetch(`${databaseURL}/pageamt/${id}/`)
        const { total_donation } = await pageAmtResponse.json()
        setDonationAmt(total_donation)

        const subViewResponse = await fetch(`${databaseURL}/subscriptionview/${id}`)
        const { total_subscription } = await subViewResponse.json()
        setSubscriptionAmt(total_subscription)
    }

    useEffect(() => {
        const picID = sessionStorage.getItem("profilePicID")
        setProfilePicSrc(`${databaseURL}/image/${picID}`)
        loadDonationStats()
    }, [])

    return (
        <>
        <div className={styles.start}>
            <div className={styles.imageBox}>
                <ProfileImage src={profilePicSrc} alt={"your profile picture"} />
                <button 
                    className={styles.changePicButton}
                    onClick={() => setIsModalActive(!isModalActive)}
                >
                    change profile picture
                </button>
            </div>
            <div className={styles.userInfoBox}>
                <p>Username: {userData.username}</p>
                <p>ID: {userData.userID}</p>
            </div>
            <button 
                className={styles.logoutButton}
                onClick={onSignout}
            >
                Sign Out
            </button>
        </div>

        <div className={styles.middle}>
            {donationAmt == -1 ? (
                <div className={styles.middleHeader}>
                    <p>Create a donation page to view page statistics.</p>
                </div>
            ) : (
                <>
                <h3 className={styles.middleHeader}>{userData.username}'s donation page</h3>
                <p>Total points from donations: {donationAmt} points</p>
                <p>Total number of subscriptions: {subscriptionAmt}</p>
                </>
            )}
        </div>

        <div className={styles.end}>
            <button 
                className={styles.deleteAccount}
                onClick={onDeleteAccount}
            >
                Delete Account
            </button>
        </div>

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
                        onSubmit={submitForm}
                    >
                        <h2>Update profile image</h2>
                        <ProfileImage src={newProfilePic ?? profilePicSrc} alt={"profile pic to be uploaded"}/>
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
                        <button className={styles.formButton}>
                            Update profile image
                        </button>
                    </form>
                </div>
            </div>
        )}
        </>
    )
}