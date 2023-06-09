import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export default function Leagues() {
    const [leagues, setLeagues] = useState([])

    async function fetchLeagues() {
        const response = await fetch(`https://api.opendota.com/api/leagues`)
        const jsonLeagueData = await response.json()
        setLeagues(jsonLeagueData.filter((item) => {
            return item.tier === "premium" && item.name !== "adsf" && item.name.includes("2023")
        }))
    }

    useEffect(()=>{
        fetchLeagues()
    }
    ,[])


    return (
        <>
        {leagues && leagues.map((item) => {
            return (
                <section>
                    <div><Link className="link" to={`/leagues/${item.leagueid}`}>{item.name} || {item.leagueid}</Link></div>
                </section>
            )
        })}
        </>
    )
}