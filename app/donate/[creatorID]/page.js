"use client"

import DonationPage from "@/app/_components/DonationPage"
import Header from "@/app/_components/Header"

export default function DonationPageRoute({ params }) {
    return (
        <>
        <Header />
        <DonationPage id={params.creatorID}/>
        </>
    )
}