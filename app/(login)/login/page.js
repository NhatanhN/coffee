"use client"

import Link from "next/link";
import styles from "../login.module.css"

export default function Login() {

    const handleLogin = (e) => {
        e.preventDefault()

        const payload = {
            username: e.target.username.value,
            password: e.target.password.value
        }
        console.log(payload)

        /**
         * 
        const res = await fetch(url, {
            method: "POST",
            body: JSON.stringify(payload)
        })
         */
        // make sure to set the action attribute on the form
        // make sure to set the proper keys for sessionStorage
        
    }

    return (
        <>
        <h2>Sign In</h2>
        {/**set action attribute on this form */}
        <form action="" onSubmit={handleLogin} className={styles.formContainer} method="POST">
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