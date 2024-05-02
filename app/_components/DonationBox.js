"use client"

import { useState } from "react"
import styles from "./donationBox.module.css"
import { databaseURL } from "../constants"

export default function DonationBox({ pageID, userData, disabled }) {
    const [formDonating, setFormDonating] = useState()
    const [isLoggedIn, setIsLoggedIn] = useState()
    const [donatedValue, setDonatedValue] = useState()

    const handleDonate = async (e) => {
        e.preventDefault()

        const userID = sessionStorage.getItem("userID")
        if (userID == null) {
            setIsLoggedIn(false)
            return
        }

        const res = await fetch(`${databaseURL}/pagedonation/${userID}/${pageID}/`, {
            method: "POST",
            body: new FormData(e.target)
        })

        if (res.ok) {
            setDonatedValue(e.target.donation_amt.value)
        }
    }

    return (
        <div>
            <strong>
                <button 
                    className={styles.titleButton}
                    onClick={() => setFormDonating(!formDonating)}
                >
                    {formDonating ? "Donate " : "Subscribe"} 
                </button> 
                To <b>{userData.username}</b>
            </strong>
            <form onSubmit={handleDonate}>
                <label htmlFor="donation_amt">Number of points: </label>
                <input 
                    className={styles.donationInput}
                    name="donation_amt"
                    type="number"
                    min="1"
                    max="100"
                    required
                />

                <button className={styles.donateButton} disabled={disabled}>
                    Give {formDonating ? "Donation " : "Subscription"} 
                </button>
            </form>

            {isLoggedIn == false ? (
                <p className={styles.errorMsg}>You are not logged in.</p>
            ) : donatedValue > 0 ? (
                <p className={styles.donatedMsg}>You have donated {donatedValue} points!</p>
            ) : (<></>)}
        </div>
    )
}