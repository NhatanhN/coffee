import { useEffect, useState } from "react"
import ProfileImage from "./ProfileImage"
import DonationBox from "./DonationBox"
import styles from "./donationPage.module.css"
import { databaseURL } from "../constants"

export default function DonationPage({ id, enableEdit }) {
    const [pageData, setPageData] = useState()
    const [uneditedPageData, setUneditedPageData] = useState()
    const [isEditing, setIsEditing] = useState()
    const [newImage, setNewImage] = useState()
    const [showButtons, setShowButtons] = useState()
    

    useEffect(() => {

        // 4 testing
        getPageData()
        const data = {
            bannerImageID: "darkgreen",
            creatorID: 1234,
            creatorUsername: "bookie",
            title: "Bookie's donation page",
            text: "This is bookie's donation page 🚗"
        }
        setPageData(data)
        setUneditedPageData(data)
        /**
         * 
         */
    }, [])

    const getPageData = async () => {
        const testID = 8
        const res = await fetch(`${databaseURL}/page/viewpage/?id=${testID}`, {
            method: "GET"
        })
        console.log(res)
    }

    const changeTitle = (e) => {
        setPageData({...pageData, title: e.target.value})
    }

    const changeText = (e) => {
        setPageData({...pageData, text: e.target.value})
    }

    const changeImage = (e) => {
        const imgSrc = URL.createObjectURL(e.target.files[0])
        setNewImage({
            file: e.target.files[0],
            url: imgSrc
        })
    }

    const resetChanges = (e) => {
        setPageData(uneditedPageData)
        setNewImage()

        const banner = document.getElementById("bannerImage")
        if (banner) banner.value = ""
    }

    const updatePage = (e) => {
        e.preventDefault()

    }

    return (
        <>
        {pageData == null ? (
            <p>loading page</p>
        ) : (
            <>
            {enableEdit && (
                <div className={styles.editButtonsContainer}>
                    {showButtons && (
                        <>
                        <form
                            onSubmit={updatePage}
                        >
                            <button className={styles.editButtons} disabled={!isEditing}>
                                Submit changes
                            </button>
                        </form>
                        <button className={styles.editButtons} onClick={resetChanges}>
                            Reset changes
                        </button>
                        <br />
                        <button className={styles.editButtons} onClick={() => setIsEditing(!isEditing)}>
                            {isEditing ? "View page" : "Edit page"}
                        </button>
                        <br />
                        </>
                    )}
                    <button className={styles.editButtons} onClick={() => setShowButtons(!showButtons)}>
                        {showButtons ? "Hide buttons" : "Show buttons"}
                    </button>
                </div>
            )}

            <div className={styles.container}>
                <div 
                    className={styles.banner}
                    style={{
                        background: newImage ? `url(${newImage.url})` : pageData.bannerImageID
                    }}
                >
                    <div className={styles.creatorImage}>
                        <ProfileImage />
                    </div>
                </div>

                {isEditing ? (
                    <>
                    {/** editing */}

                    <div className={styles.editContainer}>
                        <label htmlFor="bannerImage">Banner: </label>
                        <input 
                            type="file" 
                            id="bannerImage"
                            name="bannerImage" 
                            accept="image/*" 
                            onChange={changeImage}
                        />

                        <label htmlFor="title">Title: </label>
                        <textarea
                            name="title"
                            className={styles.inputTitle}
                            value={pageData.title}
                            onChange={changeTitle}
                            required
                        />

                        <label htmlFor="body">Body: </label>
                        <textarea
                            name="body"
                            className={styles.inputText}
                            value={pageData.text}
                            onChange={changeText}
                            required
                        />
                    </div>
                    </>
                ) : (
                    <>
                    {/** viewing */}

                    <div className={styles.viewContainer}>
                        <div className={styles.titleContainer}>
                            <h2>{pageData.title}</h2>
                        </div>

                        <div className={styles.textContainer}>
                            <p>{pageData.text}</p>
                        </div>

                    </div>
                    </>
                )}

                <div className={styles.leftBorder}>
                    <DonationBox
                        userData={{
                            userID: pageData.creatorID,
                            username: pageData.creatorUsername    
                        }}
                        disabled
                    />
                </div>
            </div>
            </>
        )}
        </>
    )
}