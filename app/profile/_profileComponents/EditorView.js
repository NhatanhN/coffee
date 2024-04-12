import { useState, useEffect } from "react"
import styles from "./editorView.module.css"
import DonationPage from "@/app/_components/DonationPage"

export default function EditDonationPageView() {
    const [isLoading, setIsLoading] = useState(true)
    const [donationPageID, setDonationPageID] = useState(-1)
    const [isEditing, setIsEditing] = useState()

    useEffect(() => {
        loadDonationPage()
    }, [])

    const loadDonationPage = async () => {

        //load coffee e.g
        /**
         * const res = await fetch(...)
         * setCoffee(res)
         * setDonationPageID(id)
         */
        setIsLoading(false)
    }

    const createDonationPage = async () =>  {
        /**
         * // create coffee
         * const res = await fetch(...)
         * setCoffee(res)
         */

        
        setIsEditing(true)
        setDonationPageID(1)
    }

    const saveDonationPage = async () => {
        // fetch(...)
        setIsEditing(false)
    }

    const stopClickPropogation = (e) => {
        e.stopPropagation()
    }

    return (
        <>
        {isLoading ? (
            <div className={styles.container}>
                <p>⏳ loading ⌛</p>
            </div>
        ) : donationPageID == -1 ? (
            <div className={styles.container}>
                <h3>Donation page currently inactive</h3>
                <button 
                    onClick={createDonationPage}
                    className={styles.button}
                >
                    Create donation page
                </button>
            </div>
        ) : (
            <DonationPage id={donationPageID} enableEdit={isEditing} />
        )}
        </>
    )
}