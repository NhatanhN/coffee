"use client"

import { useState } from "react"
import styles from "./donationBox.module.css"
import { databaseURL } from "../constants"

export default function DonationBox({ pageID, userData, disabled }) {
    const [formDonating, setFormDonating] = useState()
    const [errMsg, setErrMsg] = useState()
    const [donatedValue, setDonatedValue] = useState()

    const handleDonate = async (e) => {
        e.preventDefault()

        const userID = sessionStorage.getItem("userID")
        if (userID == null) {
            setErrMsg("You are not logged in.")
            return
        }

        if (formDonating) {
            const res = await fetch(`${databaseURL}/pagedonation/${userID}/${pageID}/`, {
                method: "POST",
                body: new FormData(e.target)
            })
    
            if (res.ok) {
                setDonatedValue(e.target.donation_amt.value)
            } else {
                setErrMsg("Transaction cancelled, error connecting to server.")
            }
        } else {
            const data = new FormData()
            data.append("amt", e.target.donation_amt.value)
            const res = await fetch(`${databaseURL}/pagesubscription/${userID}/${pageID}/${null}/`, {
                method: "POST",
                body: data
            })

            if (res.ok) {
                setDonatedValue(e.target.donation_amt.value)
            } else {
                setErrMsg("Transaction cancelled, error connecting to server.")
            }
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

            {errMsg != "" ? (
                <p className={styles.errorMsg}>{errMsg}</p>
            ) : donatedValue > 0 ? (
                <p className={styles.donatedMsg}>You have {formDonating ? "donated" : "subscribed for"} {donatedValue} points!</p>
            ) : (<></>)}
        </div>
    )
}