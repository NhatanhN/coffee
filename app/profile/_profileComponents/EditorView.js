"use client"

import { useState, useEffect } from "react"
import styles from "./editorView.module.css"
import DonationPage from "@/app/_components/DonationPage"
import { databaseURL } from "@/app/constants"

export default function EditDonationPageView() {
    const [isLoading, setIsLoading] = useState(true)
    const [donationPageID, setDonationPageID] = useState(-1)
    const [isEditing, setIsEditing] = useState()

    useEffect(() => {
        loadDonationPage()
    }, [])

    const loadDonationPage = async () => {
        try {
           const id = sessionStorage.getItem("userID")
           const res = await fetch(`${databaseURL}/page/viewpage/${id}/`)
           const json = await res.json()
           if (json.length > 0) setDonationPageID(json[0].id)
        } catch (e) {

        } finally {
            setIsLoading(false)
        }
    }

    const createDonationPage = async () =>  {
        const id = sessionStorage.getItem("userID")
        const username = sessionStorage.getItem("username")
        const image = await fetch("/tile.png")

        const data = new FormData()
        data.append("title", `${username}'s donation page`)
        data.append("description", `default description for ${username}`)
        data.append("image", await image.blob())

        console.log(data)
        const res = await fetch(`${databaseURL}/page/createpage/${id}/`, {
            method: "POST",
            body: data,
        })

        //setIsEditing(true)
        //setDonationPageID(1)
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