"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Header from "../_components/Header"
import styles from "./profile.module.css"

import AccountView from "./_profileComponents/AccountView"
import EditorView from "./_profileComponents/EditorView"
import HistoryView from "./_profileComponents/HistoryView"

export default function Profile() {
    const [isLoading, setIsLoading] = useState(true)
    const [userData, setUserData] = useState()
    const [activeView, setActiveView] = useState(1)
    const router = useRouter()

    useEffect(() => {
        if (sessionStorage.getItem("userID") == null) {
            //user is not logged in
            router.replace("/")
            return
        }

        //fetch data here e.g.
        //data = fetch(userID)
        //setUserData(data)
        setUserData({
            username: sessionStorage.getItem("username"),
            userID: sessionStorage.getItem("userID"),
        })
        setIsLoading(false)
    }, [])

    const styleActive = {
        color: "var(--color-dark-blue-hover)",
        backgroundColor: "lightgray"
    }


    return (
        <div className={styles.container}>
            <Header/>
            <main className={styles.mainContainer}>

            <nav className={styles.nav}>
                <button 
                    className={styles.navButton} 
                    onClick={() => setActiveView(1)}
                    style={activeView == 1 ? styleActive : {}}
                >
                    My Account
                </button>
                <button 
                    className={styles.navButton}
                    onClick={() => setActiveView(2)}
                    style={activeView == 2 ? styleActive : {}}
                >
                    Coffee
                </button>
                <button 
                    className={styles.navButton}
                    onClick={() => setActiveView(3)}
                    style={activeView == 3 ? styleActive : {}}
                >
                    Transaction History
                </button>
            </nav>

            <section className={styles.content}>
                {isLoading ? (
                    <p>loading</p>
                ) : activeView == 1 ? (
                    <AccountView userData={userData} setUserData={setUserData}/>
                ) : activeView == 2 ? (
                    <EditorView userData={userData} setUserData={setUserData}/>
                ) : (
                    <HistoryView userData={userData} setUserData={setUserData}/>
                )
                }
            </section>
            </main>
        </div>
    )
}