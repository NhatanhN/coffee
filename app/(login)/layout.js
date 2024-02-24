import "../globals.css";
import styles from "./login.module.css"

export default function LoginLayout({ children }) {
  return (
    <div className={styles.pageContainer}>
            <main className={styles.mainContainer}>
                {children}
            </main>
        </div>
  );
}
