import { useEffect, useState } from "react"

import ProfileImage from "./ProfileImage"
import DonationBox from "./DonationBox"
import { databaseURL } from "../constants"
import styles from "./donationPage.module.css"
import "../globals.css"

export default function DonationPage({ creatorID, enableEdit }) {
    const [pageData, setPageData] = useState()
    const [uneditedPageData, setUneditedPageData] = useState()
    const [isEditing, setIsEditing] = useState()
    const [newImage, setNewImage] = useState()
    const [showButtons, setShowButtons] = useState()
    

    useEffect(() => {
        getPageData()
    }, [])

    const getPageData = async () => {
        const res = await fetch(`${databaseURL}/page/viewpage/${creatorID}/`, {
            method: "GET"
        })

        if (res.ok) {
            let json = await res.json()
            json = {
                ...json,
                bannerURL: `${databaseURL}/image/${json.imageid}/`,
                creatorImageURL: `${databaseURL}/image/${json.imageid}/`
            }
            setPageData(json)
            setUneditedPageData(json)
        }
    }
    
    const updatePage = async (e) => {
        e.preventDefault()

        const data = new FormData(e.target)
        const res = await fetch(`${databaseURL}/page/updatepage/${pageData.id}/`, {
            method: "POST",
            body: data
        })
        getPageData()
    }
    
    const deletePage = async (e) => {
        const pageID = pageData.id
        const res = await fetch(`${databaseURL}/page/deletepage/${pageID}/`, {
            method: "DELETE"
        })
    }

    const changeTitle = (e) => {
        setPageData({...pageData, title: e.target.value})
    }

    const changeText = (e) => {
        setPageData({...pageData, description: e.target.value})
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
    
    return (
        <>
        {pageData == null ? (
            <div className={styles.loadingContainer}>
                <p>loading page</p>
            </div>
        ) : (
            <>
            {enableEdit && (
                <div className={styles.editButtonsContainer}>
                    {showButtons && (
                        <>
                        <form
                            id="updateForm"
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
                        <button className={styles.editButtons} onClick={deletePage}>
                            Delete page
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
                        background: newImage ? `url(${newImage.url})` : `url(${pageData.bannerURL})`
                    }}
                >
                    <div className={styles.creatorImage}>
                        <ProfileImage src={`${pageData.creatorImageURL}`} alt={"Page owner's profile picture"} />
                    </div>
                </div>

                {isEditing ? (
                    <>
                    {/** editing */}

                    <div className={styles.editContainer}>
                        <label htmlFor="image">Banner: </label>
                        <input 
                            form="updateForm"
                            type="file" 
                            id="image"
                            name="image" 
                            accept="image/*" 
                            onChange={changeImage}
                        />

                        <label htmlFor="title">Title: </label>
                        <textarea
                            form="updateForm"
                            name="title"
                            className={styles.inputTitle}
                            value={pageData.title}
                            onChange={changeTitle}
                        />

                        <label htmlFor="description">Body: </label>
                        <textarea
                            form="updateForm"
                            name="description"
                            className={styles.inputText}
                            value={pageData.description}
                            onChange={changeText}
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
                            <p>{pageData.description}</p>
                        </div>

                    </div>
                    </>
                )}

                <div className={styles.leftBorder}>
                    <DonationBox
                        pageID = {pageData.id}
                        userData={{
                            id: pageData.creatorID,
                            username: pageData.creatorUsername    
                        }}
                        disabled={enableEdit}
                    />
                </div>
            </div>
            </>
        )}
        </>
    )
}