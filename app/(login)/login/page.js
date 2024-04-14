"use client"

import Link from "next/link";
import styles from "../login.module.css"
import { databaseURL } from "@/app/constants";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function Login() {
    const [statusMsg, setStatusMsg] = useState()
    const router = useRouter()

    const handleLogin = async (e) => {
        e.preventDefault()

        const data = new FormData(e.target)

        let res
        try {
            res = await fetch(databaseURL + "/login/", {
                method: "POST",
                body: data
            })
        } catch (e) {
            setStatusMsg("Failed to connect to server.")
            return
        }
        
        const json = await res.json()

        if (json.error) {
            setStatusMsg(json.error)
            return
        }

        sessionStorage.setItem("username", json.username)
        sessionStorage.setItem("userID", json.userid)
        router.push("/profile")
    }

    return (
        <>
        <h2>Sign In</h2>
        <form 
            action={`${databaseURL}/login/`} 
            onSubmit={handleLogin}
            className={styles.formContainer} 
            method="POST"
        >
            <label htmlFor="username">Username</label>
            <div className={styles.inputContainer}>
                <p>👤</p>
                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    className={styles.formInput}
                />
            </div>

            <label htmlFor="password">Password</label>
            <div className={styles.inputContainer}>
                <p>🔒</p>
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className={styles.formInput}
                />
            </div>

            {statusMsg && (
                <div className={styles.centerItems}>
                    <p className={styles.status}>{statusMsg}</p>
                </div>
            )}

            <button className={styles.formButton}>Sign In</button>
        </form>
        <Link 
            className={styles.link} 
            href="/signup"
        >
            Register a new Account
        </Link>
        </>
    )
}