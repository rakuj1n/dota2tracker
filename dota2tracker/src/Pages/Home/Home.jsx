import { useState, useEffect } from "react"
import ProMatches from "./ProMatches"
import Leagues from "./Leagues"


export default function Home() {

    return (
        <>
            <h1>Home Page</h1>
            <h2>Recent Pro Matches</h2>
            <Leagues />
            <ProMatches />
        </>
    )
}