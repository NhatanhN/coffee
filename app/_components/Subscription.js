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
            pageID: 1,
            creatorName: "beep boop",
            dateOpened: "December 17, 1995",
            price: 3,
            /*
            dateClosed: "February 17, 1996"
            */
        })
    }, [])


    return (
        <>
        {data == null ? (
            <div className={styles.loadingContainer}>
                <p>loading subscription data</p>
            </div>
        ) : (
            <div className={styles.container}>
                <div className={styles.description}>
                    <Link 
                        className={styles.link}
                        href={`${websiteRoot}/donate/${data.pageID}`}
                    >
                        <h4 className={styles.title}>{data.pageTitle}</h4>
                    </Link>

                    <p className={styles.smallFont}>{data.creatorName}</p>
                    {data.dateClosed ? (
                        <>
                        <p className={styles.smallFont}>Subscribed from {data.dateOpened} to {data.dateClosed}</p>
                        <em className={styles.smallFont}>Inactive</em>
                        </>
                    ) : (
                        <p className={styles.smallFont}>Subscribed at {data.dateOpened}</p>
                    )}
                </div>

                <p className={styles.price}>{data.price} points</p>
            </div>
        )}
        </>
    )
}