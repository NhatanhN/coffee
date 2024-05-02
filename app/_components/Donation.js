"use client"

import { useState, useEffect } from "react"
import styles from "./donation.module.css"
import Link from "next/link"
import { databaseURL } from "../constants"
import "../globals.css"

export default function Donation({ id }) {
    const [data, setData] = useState()

    useEffect(() => {
        /**
         * fetch data here
        setData({
            pageID: 1,
            pageTitle: "beep boop's donation page",
            creatorName: "beep boop",
            date: "December 17, 1995 03:24:00",
            price: 5,
        })
         */
        //loadData()
    }, [])

    const loadData = async () => {
        
    }

    return (
        <>
        {data == null ? (
            <div>
                <p>Loading</p>
            </div>
        ) : (
            <div className={styles.container}>
                <div className={styles.description}>
                    <Link 
                        target="_blank" 
                        href={`${databaseURL}/donate/${data.pageID}`}
                        className={styles.link}
                    >
                        <h4 className={styles.title}>{data.pageTitle}</h4>
                    </Link>
                    <p className={styles.smallFont}>{data.creatorName}</p>
                    <p className={styles.smallFont}>Given on {data.date}</p>
                </div>
                <p className={styles.price}>{data.price} points</p>
            </div>
        )}
        </>
    )

}