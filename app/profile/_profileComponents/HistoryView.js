"use client"

import { useState, useEffect } from "react"
import Subscription from "@/app/_components/Subscription"
import styles from "./historyView.module.css"
import Donation from "@/app/_components/Donation"

export default function HistoryView() {
    const [subscriptions, setSubscriptions] = useState()
    const [donations, setDonations] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        /**
         * fetch donations & subscription info here
         */
        setDonations([])
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
                <h3 className={styles.header}>Subscriptions</h3>
                {subscriptions.length == 0 && (
                    <div className={styles.noItemsToShow}>
                        <p>No subscription history</p>
                    </div>
                )}
                {subscriptions.map((e) => 
                    <div key={e} className={styles.donationItem}>
                        <Subscription id={e}/>
                    </div>
                )}

                <div className={styles.divider} />
                
                <h3 className={styles.header}>Donations</h3>
                {donations.length == 0 && (
                    <div className={styles.noItemsToShow}>
                        <p>No donation history</p>
                    </div>
                )}
                {donations.map((e) =>
                    <div key={e} className={styles.donationItem}>
                        <Donation id={e}/>
                    </div>
                )}
            </div>
        )}
        </>
    )
}