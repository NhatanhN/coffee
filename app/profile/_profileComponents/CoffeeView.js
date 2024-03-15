import { useState, useEffect } from "react"
import styles from "./coffeeView.module.css"

export default function CoffeeView() {
    const [isLoading, setIsLoading] = useState(true)
    const [isModalActive, setIsModalActive] = useState(false)
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
        console.log("loadingCoffee")
        setIsLoading(false)
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
                <button onClick={() => setIsModalActive(!isModalActive)}>
                    Create a coffee by clicking here
                </button>
                </>
            ) : (
                <p>coffee</p>
            )}
            {isModalActive && (
                <div 
                    className={styles.modalContainer}
                    onClick={() => setIsModalActive(!isModalActive)}
                >
                    <div
                        className={styles.formContainer}
                        onClick={stopClickPropogation}
                    >
                        <form >
                            <p>box</p>

                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}