"use client"

import Link from "next/link";
import styles from "../login.module.css"
import { databaseURL } from "@/app/constants";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
    const [statusMsg, setStatusMsg] = useState()
    const router = useRouter()

    const handleSignup = async (e) => {
        e.preventDefault()

        setStatusMsg()
        const password1 = e.target.password1.value
        const password2 = e.target.password2.value
        const username = e.target.username.value

        if (password1.length < 5 || password2.length < 5) {
            setStatusMsg("Passwords must be at least 5 characters.")
            return
        }

        if (password1 != password2) {
            setStatusMsg("Passwords do not match.")
            return
        }

        const formData = new FormData()
        formData.append("username", username)
        formData.append("password", password1)
        const defaultImage = await fetch("/thing.png")
        formData.append("image", await defaultImage.blob())

        let res
        try {
            res = await fetch(`${databaseURL}/register/`, {
                method: "POST",
                body: formData
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
        sessionStorage.setItem("profilePicID", json.profile_pic)
        router.push("/profile")
    }

    return (
        <>
        <h2>Register Account</h2>
        <form 
            onSubmit={handleSignup} 
            action={`${databaseURL}/register/`} 
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

            <label htmlFor="password1">Password</label>
            <div className={styles.inputContainer}>
                <p>🔒</p>
                <input
                    type="password"
                    placeholder="Password"
                    name="password1"
                    className={styles.formInput}
                />
            </div>

            <label htmlFor="password2">Reenter Password</label>
            <div className={styles.inputContainer}>
                <p>🔑</p>
                <input
                    type="password"
                    placeholder="Reenter Password"
                    name="password2"
                    className={styles.formInput}
                />
            </div>

            {statusMsg && (
                <div className={styles.centerItems}>
                    <p className={styles.status}>{statusMsg}</p>
                </div>
            )}

            <button className={styles.formButton}>Register</button>
        </form>
        <Link 
            className={styles.link} 
            href="/login"
        >
            Use Existing Account
        </Link>
        </>
    )
}