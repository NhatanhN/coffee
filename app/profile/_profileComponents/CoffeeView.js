import { useState, useEffect } from "react"
import styles from "./coffeeView.module.css"

export default function CoffeeView() {
    const [isLoading, setIsLoading] = useState(true)
    const [coffee, setCoffee] = useState()

    useEffect(() => {
        loadCoffee()
    }, [])

    const loadCoffee = async () => {

        //load coffee e.g
        /**
         * const res = await fetch(...)
         * setCoffee(res)
         */
        setIsLoading(false)
    }

    const createCoffee = async () =>  {
        /**
         * // create coffee
         * const res = await fetch(...)
         * setCoffee(res)
         */

        //testing behavior
        setCoffee({
            bannerImageID: "firebrick", // would be an ID for an image accessible like https:// (...)/image/(bannerImageID)
            creatorID: sessionStorage.getItem("userID"),
            title: `${sessionStorage.getItem("username")}'s donation page`,
            text: `this is the patreon page for ${sessionStorage.getItem("username")}`
        })
    }

    const saveCoffee = async () => {

    }

    const stopClickPropogation = (e) => {
        e.stopPropagation()
    }

    return (
        <div className={styles.container}>
            {isLoading ? (
                <p>⏳ loading ⌛</p>
            ) : coffee == null ? (
                <>
                <h3>Coffee page currently inactive</h3>
                </>
            ) : (
                <p>coffee</p>
            )}
        </div>
    )
}