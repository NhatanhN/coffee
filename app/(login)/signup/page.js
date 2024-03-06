"use client"

import Link from "next/link";
import styles from "../login.module.css"

export default function SignUp() {

    const handleSignup = (e) => {
        e.preventDefault()

        const password1 = e.target.password1.value
        const password2 = e.target.password2.value
        const username = e.target.username.value
        // check to see if username already exists
        if (0 == 1) {
            console.log("handleSignup: username is already taken")
            //TODO: handle error
            return 
        }

        if (password1.length < 5 || password2.length < 5) {
            console.log("handleSignup: passwords must be at least 5 characters")
            //TODO: handle error
            return
        }

        if (password1 != password2) {
            console.log("handleSignup: passwords do not match")
            //TODO: handle error
            return
        }

        const payload = {
            username: e.target.username.value,
            password: password1
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
        <h2>Register Account</h2>
        {/**set action attribute on this form */}
        <form onSubmit={handleSignup} action="" className={styles.formContainer} method="POST">
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