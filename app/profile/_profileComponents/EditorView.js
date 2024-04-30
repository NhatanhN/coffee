"use client"

import { useState, useEffect } from "react"
import styles from "./editorView.module.css"
import DonationPage from "@/app/_components/DonationPage"
import { databaseURL } from "@/app/constants"

export default function EditDonationPageView() {
    const [isLoading, setIsLoading] = useState(true)
    const [hasPage, setHasPage] = useState(false)
    const [userID, setUserID] = useState()

    useEffect(() => {
        loadDonationPage()
        setUserID(sessionStorage.getItem("userID"))
    }, [])

    const loadDonationPage = async () => {
        try {
            const id = sessionStorage.getItem("userID")
            const res = await fetch(`${databaseURL}/page/viewpage/${id}/`)
            if (res.ok) setHasPage(true)
        } catch (e) {
    
        } finally {
            setIsLoading(false)
        }
        
    }

    const createDonationPage = async () =>  {
        const id = sessionStorage.getItem("userID")
        const username = sessionStorage.getItem("username")
        const defaultImage = await fetch("/tile.png")

        const data = new FormData()
        data.append("title", `${username}'s donation page`)
        data.append("description", `default description for ${username}`)
        data.append("image", await defaultImage.blob())

        const res = await fetch(`${databaseURL}/page/createpage/${id}/`, {
            method: "POST",
            body: data,
        })

        setHasPage(true)
    }

    return (
        <>
        {isLoading ? (
            <div className={styles.container}>
                <p>⏳ loading ⌛</p>
            </div>
        ) : !hasPage ? (
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
            <DonationPage creatorID={userID} enableEdit />
        )}
        </>
    )
}