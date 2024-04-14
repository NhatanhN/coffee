import Link from "next/link"
import { useEffect, useState } from "react"
import styles from "./subscription.module.css"

import { websiteRoot } from "../constants"
import "../globals.css"

export default function Subscription({ id }) {
    const [data, setData] = useState()

    useEffect(() => {
        setData({
            pageTitle: "beep boop's donation page",
            creatorName: "beep boop",
            dateOpened: "December 17, 1995 03:24:00",
            price: 3,
            /*
            dateClosed: "December 17, 1995 03:24:00"
            */
        })
    }, [])


    return (
        <div className={styles.container}>
            {data == null ? (
                <p className={styles.loading}>
                    loading subscription data
                </p>
            ) : (
                <>
                <Link 
                    className={styles.title}
                    target="_blank"
                    href={`${websiteRoot}/donate/${id}`}
                >
                    <h4>{data.pageTitle}</h4>
                </Link>
                <p className={styles.creatorName}>{data.creatorName}</p>
                {data.dateClosed ? (
                    <p className={styles.date}>Subscribed from {data.dateOpened} to {data.dateClosed}</p>
                ) : (
                    <p className={styles.date}>Subscribed at {data.dateOpened}</p>
                )}
                <p className={styles.price}>{data.price} points</p>
                </>
            )}
        </div>
    )
}