import Image from "next/image"
import styles from "./profileImage.module.css"

export default function ProfileImage({ src, alt }) {
    return (
        <Image 
            src={src ?? "/thing.png"}
            alt={alt ?? "placeholder user profile image"}
            width="100"
            height="100"
            className={styles.profileImage}
        />
    )
}