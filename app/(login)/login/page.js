import Link from "next/link";
import styles from "../login.module.css"

export default function Login() {
    return (
        <>
        <h2>Sign In</h2>
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