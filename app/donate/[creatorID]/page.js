"use client"

import DonationPage from "@/app/_components/DonationPage"
import Header from "@/app/_components/Header"

export default function DonationPageRoute({ creatorID }) {
    return (
        <>
        <Header />
        <DonationPage id={creatorID}/>
        </>
    )
}