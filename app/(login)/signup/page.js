import Link from "next/link";
import styles from "../login.module.css"

export default function SignUp() {
    return (
        <>
        <h2>Register Account</h2>
        <form className={styles.formContainer} method="POST">
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