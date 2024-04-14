"use client"

import { useState, useEffect } from "react"
import Subscription from "@/app/_components/Subscription"
import styles from "./historyView.module.css"

export default function HistoryView() {
    const [subscriptions, setSubscriptions] = useState()
    const [donations, setDonations] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        /**
         * fetch donations & subscription info here
         */
        setDonations([1, 2, 3])
        setSubscriptions([2, 3, 4])
        setIsLoading(false)
    }, [])

    return (
        <>
        {isLoading ? (
            <div className={styles.loadingContainer}>
                <p>loading</p>
            </div>
        ) : (
            <div className={styles.mainContainer}>
                <h3>Subscriptions</h3>
                {subscriptions.map((e) => 
                    <div key={e} className={styles.donationItem}>
                        <Subscription id={e}/>
                    </div>
                )}

                <div className={styles.divider} />
                
                <h3>Donations</h3>
            </div>
        )}
        </>
    )
}