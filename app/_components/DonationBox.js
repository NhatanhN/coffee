"use client"

import { useState } from "react"
import styles from "./donationBox.module.css"
import { databaseURL } from "../constants"

export default function DonationBox({ pageID, userData, disabled }) {
    const [formDonating, setFormDonating] = useState()

    const handleDonate = async (e) => {
        e.preventDefault()

        const res = await fetch(`${databaseURL}/page/pagedonation/${pageID}/${userData.id}/`, {
            method: "POST",
            body: new FormData(e.target)
        })
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
                To {userData.username}
            </strong>
            <form onSubmit={handleDonate}>
                <label htmlFor="donation_amt">Number of points: </label>
                <input 
                    className={styles.donationInput}
                    name="donation_amt"
                    type="number"
                    min="1"
                    max="100"
                />

                <button className={styles.donateButton} disabled={disabled}>
                    Give {formDonating ? "Donation " : "Subscription"} 
                </button>
            </form>
        </div>
    )
}