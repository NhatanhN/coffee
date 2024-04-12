import { useState } from "react"
import styles from "./donationBox.module.css"

/**
 * 
 * @param {*} userData: {userID: number, username: string}
 * @returns 
 */
export default function DonationBox({ userData, disabled}) {
    const [formDonating, setFormDonating] = useState()

    const handleDonate = (e) => {
        e.preventDefault()
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
            <form>
                <label htmlFor="amount">Number of points: </label>
                <input 
                    className={styles.donationInput}
                    name="amount"
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