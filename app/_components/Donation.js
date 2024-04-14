"use client"

import { useState, useEffect } from "next/amp"

export default function Donation({ id }) {
    const [data, setData] = useState()

    useEffect(() => {
        /**
         * fetch data here
         */
        setData({
            pageTitle: "beep boop's donation page",
            creatorName: "beep boop",
            date: "December 17, 1995 03:24:00",
            price: 5,
        })

        setIsLoading(false)
    })

    return (
        <>
        {data == null ? (
            <div>
                <p>Loading</p>
            </div>
        ) : (
            <div>
                <p>data</p>
            </div>
        )}
        </>
    )

}